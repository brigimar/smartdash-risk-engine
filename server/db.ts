import { eq, and, desc, sql, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  mlAccounts, 
  InsertMlAccount,
  MlAccount,
  metrics,
  InsertMetric,
  Metric,
  alerts,
  InsertAlert,
  Alert,
  alertInteractions,
  InsertAlertInteraction,
  riskHistory,
  InsertRiskHistory,
  knowledgeArticles,
  InsertKnowledgeArticle,
  KnowledgeArticle,
  reports,
  InsertReport,
  notificationPreferences,
  InsertNotificationPreference,
  NotificationPreference
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ML Accounts
export async function createMlAccount(account: InsertMlAccount): Promise<MlAccount> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(mlAccounts).values(account);
  const [created] = await db.select().from(mlAccounts).where(eq(mlAccounts.id, Number(result.insertId)));
  return created!;
}

export async function getMlAccountsByUserId(userId: number): Promise<MlAccount[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(mlAccounts).where(eq(mlAccounts.userId, userId)).orderBy(desc(mlAccounts.createdAt));
}

export async function getMlAccountById(id: number): Promise<MlAccount | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const [account] = await db.select().from(mlAccounts).where(eq(mlAccounts.id, id)).limit(1);
  return account;
}

export async function updateMlAccountRisk(id: number, riskScore: string, riskLevel: "low" | "medium" | "high" | "critical"): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(mlAccounts).set({ riskScore, riskLevel, updatedAt: new Date() }).where(eq(mlAccounts.id, id));
}

export async function updateMlAccountTokens(id: number, accessToken: string, refreshToken: string, expiresAt: Date): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(mlAccounts).set({ 
    accessToken, 
    refreshToken, 
    tokenExpiresAt: expiresAt,
    updatedAt: new Date() 
  }).where(eq(mlAccounts.id, id));
}

// Metrics
export async function createMetric(metric: InsertMetric): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(metrics).values(metric);
}

export async function getLatestMetrics(mlAccountId: number, limit: number = 30): Promise<Metric[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(metrics).where(eq(metrics.mlAccountId, mlAccountId)).orderBy(desc(metrics.date)).limit(limit);
}

export async function getMetricsByDateRange(mlAccountId: number, startDate: Date, endDate: Date): Promise<Metric[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(metrics)
    .where(and(
      eq(metrics.mlAccountId, mlAccountId),
      gte(metrics.date, startDate),
      lte(metrics.date, endDate)
    ))
    .orderBy(metrics.date);
}

// Alerts
export async function createAlert(alert: InsertAlert): Promise<Alert> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(alerts).values(alert);
  const [created] = await db.select().from(alerts).where(eq(alerts.id, Number(result.insertId)));
  return created!;
}

export async function getActiveAlerts(mlAccountId: number): Promise<Alert[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(alerts)
    .where(and(
      eq(alerts.mlAccountId, mlAccountId),
      eq(alerts.status, "active")
    ))
    .orderBy(desc(alerts.priority), desc(alerts.createdAt));
}

export async function getAlertsByAccount(mlAccountId: number, limit: number = 50): Promise<Alert[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(alerts)
    .where(eq(alerts.mlAccountId, mlAccountId))
    .orderBy(desc(alerts.createdAt))
    .limit(limit);
}

export async function updateAlertStatus(
  id: number, 
  status: "active" | "acknowledged" | "resolved" | "ignored",
  timestamp?: Date
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const updateData: any = { status, updatedAt: new Date() };
  
  if (status === "acknowledged" && timestamp) {
    updateData.acknowledgedAt = timestamp;
  } else if (status === "resolved" && timestamp) {
    updateData.resolvedAt = timestamp;
  }

  await db.update(alerts).set(updateData).where(eq(alerts.id, id));
}

// Alert Interactions (for AI learning)
export async function createAlertInteraction(interaction: InsertAlertInteraction): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(alertInteractions).values(interaction);
}

export async function getAlertInteractionHistory(mlAccountId: number, limit: number = 100): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(alertInteractions)
    .where(eq(alertInteractions.mlAccountId, mlAccountId))
    .orderBy(desc(alertInteractions.createdAt))
    .limit(limit);
}

// Risk History
export async function createRiskHistory(history: InsertRiskHistory): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(riskHistory).values(history);
}

export async function getRiskHistory(mlAccountId: number, days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return db.select().from(riskHistory)
    .where(and(
      eq(riskHistory.mlAccountId, mlAccountId),
      gte(riskHistory.createdAt, startDate)
    ))
    .orderBy(riskHistory.createdAt);
}

// Knowledge Articles
export async function getAllKnowledgeArticles(published: boolean = true): Promise<KnowledgeArticle[]> {
  const db = await getDb();
  if (!db) return [];

  const query = published 
    ? db.select().from(knowledgeArticles).where(eq(knowledgeArticles.published, true))
    : db.select().from(knowledgeArticles);

  return query.orderBy(desc(knowledgeArticles.createdAt));
}

export async function getKnowledgeArticleBySlug(slug: string): Promise<KnowledgeArticle | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const [article] = await db.select().from(knowledgeArticles).where(eq(knowledgeArticles.slug, slug)).limit(1);
  return article;
}

export async function incrementArticleView(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(knowledgeArticles)
    .set({ viewCount: sql`${knowledgeArticles.viewCount} + 1` })
    .where(eq(knowledgeArticles.id, id));
}

// Reports
export async function createReport(report: InsertReport): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(reports).values(report);
}

export async function getUserReports(userId: number, limit: number = 10): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reports)
    .where(eq(reports.userId, userId))
    .orderBy(desc(reports.createdAt))
    .limit(limit);
}

// Notification Preferences
export async function getNotificationPreferences(userId: number): Promise<NotificationPreference | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const [prefs] = await db.select().from(notificationPreferences).where(eq(notificationPreferences.userId, userId)).limit(1);
  return prefs;
}

export async function upsertNotificationPreferences(prefs: InsertNotificationPreference): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(notificationPreferences).values(prefs).onDuplicateKeyUpdate({
    set: {
      emailEnabled: prefs.emailEnabled,
      whatsappEnabled: prefs.whatsappEnabled,
      whatsappNumber: prefs.whatsappNumber,
      weeklyReportEnabled: prefs.weeklyReportEnabled,
      monthlyReportEnabled: prefs.monthlyReportEnabled,
      alertThreshold: prefs.alertThreshold,
      updatedAt: new Date()
    }
  });
}
