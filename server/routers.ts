import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { MercadoLibreAPI, getMLAuthUrl, shouldRefreshToken } from "./mercadolibre";
import { calculateRiskScore, generateAlerts, calculateAlertPriority, translateMLRule } from "./riskEngine";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  mlAccounts: router({
    // Get all ML accounts for current user
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getMlAccountsByUserId(ctx.user.id);
    }),

    // Get single ML account
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.id);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }
        return account;
      }),

    // Get OAuth URL for connecting ML account
    getAuthUrl: protectedProcedure.query(({ ctx }) => {
      // TODO: Replace with actual ML app credentials
      const clientId = process.env.ML_CLIENT_ID || "YOUR_ML_CLIENT_ID";
      const redirectUri = process.env.ML_REDIRECT_URI || `${process.env.VITE_APP_URL || 'http://localhost:3000'}/ml-callback`;
      
      return {
        url: getMLAuthUrl(clientId, redirectUri, ctx.user.id.toString())
      };
    }),

    // Handle OAuth callback and create ML account
    connectAccount: protectedProcedure
      .input(z.object({ 
        code: z.string(),
        state: z.string().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        const clientId = process.env.ML_CLIENT_ID || "YOUR_ML_CLIENT_ID";
        const clientSecret = process.env.ML_CLIENT_SECRET || "YOUR_ML_CLIENT_SECRET";
        const redirectUri = process.env.ML_REDIRECT_URI || `${process.env.VITE_APP_URL || 'http://localhost:3000'}/ml-callback`;

        // Exchange code for tokens
        const tokens = await MercadoLibreAPI.getTokens(input.code, clientId, clientSecret, redirectUri);
        
        // Get user info
        const mlApi = new MercadoLibreAPI(tokens.access_token);
        const userInfo = await mlApi.getUserInfo(tokens.user_id);

        // Calculate token expiry
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + tokens.expires_in);

        // Create ML account
        const account = await db.createMlAccount({
          userId: ctx.user.id,
          mlUserId: tokens.user_id,
          nickname: userInfo.nickname,
          email: userInfo.email,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          tokenExpiresAt: expiresAt,
          siteId: userInfo.site_id,
          accountStatus: "active",
          riskScore: "0.00",
          riskLevel: "low"
        });

        return account;
      }),

    // Sync metrics from ML API
    syncMetrics: protectedProcedure
      .input(z.object({ accountId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        // Refresh token if needed
        let accessToken = account.accessToken;
        if (shouldRefreshToken(account.tokenExpiresAt)) {
          const clientId = process.env.ML_CLIENT_ID || "YOUR_ML_CLIENT_ID";
          const clientSecret = process.env.ML_CLIENT_SECRET || "YOUR_ML_CLIENT_SECRET";
          const tokens = await MercadoLibreAPI.refreshToken(account.refreshToken, clientId, clientSecret);
          
          const expiresAt = new Date();
          expiresAt.setSeconds(expiresAt.getSeconds() + tokens.expires_in);
          
          await db.updateMlAccountTokens(account.id, tokens.access_token, tokens.refresh_token, expiresAt);
          accessToken = tokens.access_token;
        }

        // Get metrics from ML
        const mlApi = new MercadoLibreAPI(accessToken, account.siteId);
        const metrics = await mlApi.calculateMetrics(account.mlUserId);

        // Save metrics to DB
        await db.createMetric({
          mlAccountId: account.id,
          date: new Date(),
          totalOrders: 100, // TODO: Get from ML API
          cancelledOrders: Math.round(metrics.cancellationRate),
          cancellationRate: metrics.cancellationRate.toString(),
          totalClaims: Math.round(metrics.claimRate * 10),
          validClaims: Math.round(metrics.claimRate * 7),
          excludedClaims: Math.round(metrics.claimRate * 3),
          claimRate: metrics.claimRate.toString(),
          avgResponseTime: metrics.avgResponseTime,
          lateResponses: 0,
          totalListings: 50, // TODO: Get from ML API
          outOfStock: metrics.outOfStockCount,
          pausedListings: 0,
          listingsWithIssues: 0,
          reputationScore: metrics.reputationScore.toString()
        });

        // Calculate risk score
        const riskResult = calculateRiskScore({
          cancellationRate: metrics.cancellationRate,
          claimRate: metrics.claimRate,
          responseTime: metrics.avgResponseTime,
          stockIssues: metrics.outOfStockCount,
          reputationScore: metrics.reputationScore,
          lateResponses: 0,
          pausedListings: 0
        });

        // Update account risk score
        await db.updateMlAccountRisk(account.id, riskResult.score.toString(), riskResult.level);

        // Save risk history
        await db.createRiskHistory({
          mlAccountId: account.id,
          riskScore: riskResult.score.toString(),
          riskLevel: riskResult.level,
          factors: riskResult.factors
        });

        return { success: true, riskScore: riskResult };
      }),
  }),

  risk: router({
    // Get current risk score
    getScore: protectedProcedure
      .input(z.object({ accountId: z.number() }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return {
          score: parseFloat(account.riskScore),
          level: account.riskLevel,
          accountId: account.id
        };
      }),

    // Get risk history
    getHistory: protectedProcedure
      .input(z.object({ accountId: z.number(), days: z.number().default(30) }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return db.getRiskHistory(input.accountId, input.days);
      }),

    // Get recommendations from AI
    getRecommendations: protectedProcedure
      .input(z.object({ accountId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        const metrics = await db.getLatestMetrics(input.accountId, 7);
        const alerts = await db.getActiveAlerts(input.accountId);

        const prompt = `Eres un asistente preventivo para vendedores de Mercado Libre. Analiza estas métricas y alertas, y genera recomendaciones específicas y accionables:

Métricas recientes:
${JSON.stringify(metrics.slice(0, 3), null, 2)}

Alertas activas:
${JSON.stringify(alerts.slice(0, 5), null, 2)}

Genera 3-5 recomendaciones priorizadas en español, con lenguaje claro y directo. Enfócate en acciones preventivas, no en predicciones.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "Eres un experto en prevención de riesgos para vendedores de Mercado Libre. Hablas en modo asistente preventivo, no autoritario." },
            { role: "user", content: prompt }
          ]
        });

        return {
          recommendations: response.choices[0]?.message?.content || "No se pudieron generar recomendaciones en este momento."
        };
      }),
  }),

  alerts: router({
    // Get active alerts
    getActive: protectedProcedure
      .input(z.object({ accountId: z.number() }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return db.getActiveAlerts(input.accountId);
      }),

    // Get all alerts (with pagination)
    getAll: protectedProcedure
      .input(z.object({ accountId: z.number(), limit: z.number().default(50) }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return db.getAlertsByAccount(input.accountId, input.limit);
      }),

    // Update alert status
    updateStatus: protectedProcedure
      .input(z.object({ 
        alertId: z.number(),
        status: z.enum(["active", "acknowledged", "resolved", "ignored"])
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Verify alert belongs to user's account
        await db.updateAlertStatus(input.alertId, input.status, new Date());
        
        // Record interaction for AI learning
        const alert = await db.getAlertsByAccount(0, 1); // TODO: Get specific alert
        if (alert.length > 0) {
          await db.createAlertInteraction({
            alertId: input.alertId,
            mlAccountId: alert[0]!.mlAccountId,
            action: input.status === "acknowledged" ? "acknowledged" : 
                    input.status === "resolved" ? "resolved" : 
                    input.status === "ignored" ? "ignored" : "viewed",
            timeTaken: 0 // TODO: Calculate from alert creation
          });
        }

        return { success: true };
      }),

    // Generate AI suggestion for alert
    getAISuggestion: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ input }) => {
        // TODO: Get alert details and generate AI suggestion
        const prompt = `Genera una sugerencia contextual y accionable para esta alerta de Mercado Libre. Usa lenguaje claro y directo.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "Eres un asistente preventivo que ayuda a vendedores de ML a evitar penalizaciones." },
            { role: "user", content: prompt }
          ]
        });

        return {
          suggestion: response.choices[0]?.message?.content || ""
        };
      }),
  }),

  metrics: router({
    // Get latest metrics
    getLatest: protectedProcedure
      .input(z.object({ accountId: z.number(), days: z.number().default(30) }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return db.getLatestMetrics(input.accountId, input.days);
      }),

    // Get metrics by date range
    getByDateRange: protectedProcedure
      .input(z.object({ 
        accountId: z.number(),
        startDate: z.date(),
        endDate: z.date()
      }))
      .query(async ({ input, ctx }) => {
        const account = await db.getMlAccountById(input.accountId);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("Account not found or unauthorized");
        }

        return db.getMetricsByDateRange(input.accountId, input.startDate, input.endDate);
      }),
  }),

  knowledge: router({
    // Get all articles
    getAll: publicProcedure.query(async () => {
      return db.getAllKnowledgeArticles(true);
    }),

    // Get article by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await db.getKnowledgeArticleBySlug(input.slug);
        if (article) {
          await db.incrementArticleView(article.id);
        }
        return article;
      }),

    // Translate ML rule
    translateRule: publicProcedure
      .input(z.object({ ruleType: z.string() }))
      .query(({ input }) => {
        return {
          translation: translateMLRule(input.ruleType)
        };
      }),
  }),

  notifications: router({
    // Get user preferences
    getPreferences: protectedProcedure.query(async ({ ctx }) => {
      return db.getNotificationPreferences(ctx.user.id);
    }),

    // Update preferences
    updatePreferences: protectedProcedure
      .input(z.object({
        emailEnabled: z.boolean().optional(),
        whatsappEnabled: z.boolean().optional(),
        whatsappNumber: z.string().optional(),
        weeklyReportEnabled: z.boolean().optional(),
        monthlyReportEnabled: z.boolean().optional(),
        alertThreshold: z.enum(["all", "medium", "high", "critical"]).optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await db.upsertNotificationPreferences({
          userId: ctx.user.id,
          ...input
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
