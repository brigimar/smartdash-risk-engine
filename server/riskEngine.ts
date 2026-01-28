/**
 * Risk Score Calculator and Alert Engine
 * Translates opaque ML rules into clear risk scores and actionable alerts
 */

export interface RiskFactors {
  cancellationRate: number;
  claimRate: number;
  responseTime: number;
  stockIssues: number;
  reputationScore: number;
  lateResponses: number;
  pausedListings: number;
}

export interface RiskScoreResult {
  score: number; // 0-100
  level: "low" | "medium" | "high" | "critical";
  factors: Record<string, number>;
  recommendations: string[];
}

export interface AlertConfig {
  type: "cancellation_spike" | "claim_increase" | "stock_critical" | "response_delay" | "quality_issue" | "reputation_drop" | "suspension_risk" | "fiscal_warning";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  actionRequired: string;
  threshold: number;
  currentValue: number;
}

/**
 * Calculate Risk Score based on multiple factors
 * Lower score = lower risk (0-100 scale)
 */
export function calculateRiskScore(factors: RiskFactors): RiskScoreResult {
  const weights = {
    cancellationRate: 0.25,      // 25% weight - critical for ML
    claimRate: 0.20,              // 20% weight - impacts reputation
    responseTime: 0.15,           // 15% weight - customer service
    stockIssues: 0.15,            // 15% weight - operational
    reputationScore: 0.15,        // 15% weight - overall health
    lateResponses: 0.05,          // 5% weight - minor factor
    pausedListings: 0.05          // 5% weight - minor factor
  };

  // Normalize factors to 0-100 scale (higher = more risk)
  const normalized = {
    cancellationRate: Math.min(factors.cancellationRate * 10, 100), // 10% cancellation = 100 risk
    claimRate: Math.min(factors.claimRate * 20, 100),                // 5% claims = 100 risk
    responseTime: Math.min((factors.responseTime / 1440) * 100, 100), // 24h = 100 risk
    stockIssues: Math.min((factors.stockIssues / 10) * 100, 100),    // 10 items = 100 risk
    reputationScore: 100 - factors.reputationScore,                   // Invert: low rep = high risk
    lateResponses: Math.min((factors.lateResponses / 5) * 100, 100), // 5 late = 100 risk
    pausedListings: Math.min((factors.pausedListings / 10) * 100, 100) // 10 paused = 100 risk
  };

  // Calculate weighted score
  let score = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    score += normalized[key as keyof typeof normalized] * weight;
  });

  // Determine risk level
  let level: "low" | "medium" | "high" | "critical";
  if (score < 25) level = "low";
  else if (score < 50) level = "medium";
  else if (score < 75) level = "high";
  else level = "critical";

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (normalized.cancellationRate > 30) {
    recommendations.push("Reducir tasa de cancelaciones: revisa tus tiempos de envío y disponibilidad de stock");
  }
  if (normalized.claimRate > 40) {
    recommendations.push("Gestionar reclamos activamente: responde rápido y ofrece soluciones");
  }
  if (normalized.responseTime > 50) {
    recommendations.push("Mejorar tiempo de respuesta: responde mensajes en menos de 2 horas");
  }
  if (normalized.stockIssues > 30) {
    recommendations.push("Actualizar inventario: evita quedarte sin stock o pausar publicaciones");
  }
  if (normalized.reputationScore > 50) {
    recommendations.push("Recuperar reputación: enfócate en mejorar la experiencia del comprador");
  }

  return {
    score: Math.round(score),
    level,
    factors: normalized,
    recommendations
  };
}

/**
 * Generate alerts based on thresholds and patterns
 */
export function generateAlerts(
  currentMetrics: RiskFactors,
  previousMetrics: RiskFactors | null,
  riskScore: RiskScoreResult
): AlertConfig[] {
  const alerts: AlertConfig[] = [];

  // 1. Cancellation Spike Alert
  if (currentMetrics.cancellationRate > 5) {
    const severity = currentMetrics.cancellationRate > 10 ? "critical" : 
                     currentMetrics.cancellationRate > 7 ? "high" : "medium";
    
    alerts.push({
      type: "cancellation_spike",
      severity,
      title: "Tasa de cancelaciones elevada",
      description: `Tu tasa de cancelaciones es del ${currentMetrics.cancellationRate.toFixed(1)}%. Mercado Libre penaliza cuentas con más del 5% de cancelaciones.`,
      actionRequired: "Revisa tu inventario y tiempos de envío. Evita publicar productos sin stock disponible.",
      threshold: 5,
      currentValue: currentMetrics.cancellationRate
    });
  }

  // 2. Claim Rate Alert
  if (currentMetrics.claimRate > 2) {
    const severity = currentMetrics.claimRate > 5 ? "critical" : 
                     currentMetrics.claimRate > 3 ? "high" : "medium";
    
    alerts.push({
      type: "claim_increase",
      severity,
      title: "Aumento en reclamos",
      description: `Tienes una tasa de reclamos del ${currentMetrics.claimRate.toFixed(1)}%. Esto puede afectar tu reputación y visibilidad.`,
      actionRequired: "Responde todos los reclamos en menos de 24 horas. Verifica que algunos reclamos puedan ser excluidos según las reglas de ML.",
      threshold: 2,
      currentValue: currentMetrics.claimRate
    });
  }

  // 3. Stock Critical Alert
  if (currentMetrics.stockIssues > 3) {
    alerts.push({
      type: "stock_critical",
      severity: currentMetrics.stockIssues > 5 ? "high" : "medium",
      title: "Problemas de inventario detectados",
      description: `Tienes ${currentMetrics.stockIssues} publicaciones sin stock o pausadas.`,
      actionRequired: "NO pauses publicaciones. En su lugar, actualiza el stock a 0 para mantener tu ranking de búsqueda.",
      threshold: 3,
      currentValue: currentMetrics.stockIssues
    });
  }

  // 4. Response Delay Alert
  if (currentMetrics.responseTime > 240) { // 4 hours
    const severity = currentMetrics.responseTime > 1440 ? "critical" : // 24h
                     currentMetrics.responseTime > 480 ? "high" : "medium"; // 8h
    
    alerts.push({
      type: "response_delay",
      severity,
      title: "Tiempo de respuesta lento",
      description: `Tu tiempo promedio de respuesta es de ${Math.round(currentMetrics.responseTime / 60)} horas.`,
      actionRequired: "Responde mensajes en menos de 2 horas. Configura notificaciones push en la app de ML.",
      threshold: 240,
      currentValue: currentMetrics.responseTime
    });
  }

  // 5. Reputation Drop Alert
  if (currentMetrics.reputationScore < 60) {
    alerts.push({
      type: "reputation_drop",
      severity: currentMetrics.reputationScore < 40 ? "critical" : "high",
      title: "Reputación en riesgo",
      description: `Tu score de reputación es ${currentMetrics.reputationScore}/100. Esto reduce tu visibilidad en búsquedas.`,
      actionRequired: "Enfócate en mejorar la experiencia: envíos rápidos, buena comunicación y resolución de problemas.",
      threshold: 60,
      currentValue: currentMetrics.reputationScore
    });
  }

  // 6. Suspension Risk Alert (based on overall risk score)
  if (riskScore.level === "critical" || riskScore.score > 80) {
    alerts.push({
      type: "suspension_risk",
      severity: "critical",
      title: "⚠️ RIESGO CRÍTICO DE SUSPENSIÓN",
      description: `Tu Risk Score es ${riskScore.score}/100. Múltiples factores están en zona de peligro.`,
      actionRequired: "ACCIÓN INMEDIATA REQUERIDA: Revisa todas las alertas activas y toma medidas correctivas hoy.",
      threshold: 80,
      currentValue: riskScore.score
    });
  }

  // 7. Pattern Detection: Worsening Trend
  if (previousMetrics) {
    const cancellationIncrease = currentMetrics.cancellationRate - previousMetrics.cancellationRate;
    const claimIncrease = currentMetrics.claimRate - previousMetrics.claimRate;
    
    if (cancellationIncrease > 2 || claimIncrease > 1) {
      alerts.push({
        type: "quality_issue",
        severity: "high",
        title: "Tendencia negativa detectada",
        description: `Tus métricas están empeorando: cancelaciones +${cancellationIncrease.toFixed(1)}%, reclamos +${claimIncrease.toFixed(1)}%.`,
        actionRequired: "Identifica la causa raíz: ¿cambió tu proveedor? ¿hay problemas logísticos? Actúa antes de que escale.",
        threshold: 0,
        currentValue: cancellationIncrease + claimIncrease
      });
    }
  }

  // Sort by severity (critical > high > medium > low)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return alerts;
}

/**
 * Calculate priority score for alert (0-100, higher = more urgent)
 */
export function calculateAlertPriority(alert: AlertConfig, userHistory?: any): number {
  let priority = 0;

  // Base priority from severity
  const severityPoints = {
    critical: 100,
    high: 75,
    medium: 50,
    low: 25
  };
  priority += severityPoints[alert.severity];

  // Adjust based on how far over threshold
  const excessRatio = alert.currentValue / alert.threshold;
  if (excessRatio > 2) priority += 20;
  else if (excessRatio > 1.5) priority += 10;

  // If user ignored similar alerts before, increase priority
  if (userHistory?.ignoredSimilarAlerts > 0) {
    priority += Math.min(userHistory.ignoredSimilarAlerts * 10, 30);
  }

  return Math.min(priority, 100);
}

/**
 * Translate ML opaque rules to clear actions
 */
export function translateMLRule(ruleType: string): string {
  const translations: Record<string, string> = {
    "high_cancellation": "Mercado Libre reduce tu visibilidad automáticamente cuando superas el 5% de cancelaciones. Cada cancelación cuenta, incluso las iniciadas por el comprador.",
    "claim_penalty": "Los reclamos afectan tu reputación de forma acumulativa. Sin embargo, algunos reclamos pueden ser excluidos si cumples ciertas condiciones (envío con tracking, respuesta rápida, etc.).",
    "pause_penalty": "Pausar publicaciones reduce tu ranking de búsqueda de forma permanente. Es mejor dejar el stock en 0 y mantener la publicación activa.",
    "response_time": "ML mide tu tiempo de respuesta promedio. Más de 4 horas puede reducir tu visibilidad. Más de 24 horas puede generar penalizaciones.",
    "reputation_levels": "Verde = excelente, Amarillo = bueno, Naranja = regular, Rojo = crítico. Cada nivel afecta tu posición en búsquedas y costos de comisión.",
    "shadowban": "ML puede reducir tu visibilidad sin notificarte (shadowban). Señales: caída súbita de visitas sin cambios en tus publicaciones."
  };

  return translations[ruleType] || "Regla no documentada de Mercado Libre.";
}
