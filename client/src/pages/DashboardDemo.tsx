import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  Users,
  Package,
  Eye,
  CheckCircle2,
  Clock,
  BarChart3,
  Download,
  Share2,
  ArrowRight,
  Zap
} from "lucide-react";

interface DemoRiskData {
  vertical: "core" | "creators" | "rrhh";
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  alerts: Array<{
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    impact: string;
    actionRequired: string;
  }>;
  metrics: {
    label: string;
    value: string | number;
    change: number;
  }[];
}

export default function DashboardDemo() {
  const { isAuthenticated, loading, user } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const [demoData, setDemoData] = useState<DemoRiskData[]>([]);
  const [selectedVertical, setSelectedVertical] = useState<"core" | "creators" | "rrhh">("core");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  useEffect(() => {
    // Generar datos de demostración simulando el Risk Engine
    const generateDemoData = () => {
      setIsGenerating(true);
      
      const coreData: DemoRiskData = {
        vertical: "core",
        riskScore: 68,
        riskLevel: "high",
        alerts: [
          {
            id: "alert-1",
            title: "Stock Crítico en Best Seller",
            description: "Tu producto más vendido (Auriculares Pro) está con solo 3 unidades en stock.",
            severity: "critical",
            impact: "Lucro cesante estimado: $2,400 USD",
            actionRequired: "Reabastecer inmediatamente"
          },
          {
            id: "alert-2",
            title: "Desvío Anormal de Ventas",
            description: "Las ventas cayeron un 32% respecto al promedio semanal. Posible cambio de mercado.",
            severity: "high",
            impact: "Pérdida proyectada: $1,200 USD esta semana",
            actionRequired: "Revisar competencia y ajustar precios"
          },
          {
            id: "alert-3",
            title: "Inconsistencia en Precios",
            description: "Detectamos 2 productos con precios fuera de rango (20% por debajo del costo).",
            severity: "high",
            impact: "Margen de ganancia comprometido: -$450 USD",
            actionRequired: "Corregir precios en Tango/Excel"
          }
        ],
        metrics: [
          { label: "Tasa de Cancelaciones", value: "6.2%", change: -2.1 },
          { label: "Reclamos Activos", value: "12", change: 3 },
          { label: "Tiempo Respuesta Promedio", value: "2.5h", change: 0.5 },
          { label: "Stock Disponible", value: "847 unidades", change: -156 }
        ]
      };

      const creatorsData: DemoRiskData = {
        vertical: "creators",
        riskScore: 54,
        riskLevel: "medium",
        alerts: [
          {
            id: "alert-4",
            title: "Riesgo de Desmonetización",
            description: "Tu tasa de engagement bajó 18% en los últimos 7 días. YouTube puede revisar tu elegibilidad.",
            severity: "high",
            impact: "Ingresos publicitarios en riesgo: $800-1,200 USD/mes",
            actionRequired: "Aumentar interacción: responde comentarios y crea contenido viral"
          },
          {
            id: "alert-5",
            title: "Potencial Shadowban en TikTok",
            description: "Detectamos patrones de violación de community guidelines en 3 videos recientes.",
            severity: "medium",
            impact: "Alcance reducido: -40% en próximos videos",
            actionRequired: "Revisar y editar contenido según políticas"
          },
          {
            id: "alert-6",
            title: "Caída de Retención de Audiencia",
            description: "El 45% de tu audiencia abandona después del minuto 2. Contenido poco atractivo.",
            severity: "medium",
            impact: "Pérdida de suscriptores: 200-300/mes",
            actionRequired: "Mejorar hooks iniciales y narrativa"
          }
        ],
        metrics: [
          { label: "Engagement Rate", value: "3.2%", change: -1.8 },
          { label: "Suscriptores Activos", value: "45,230", change: -320 },
          { label: "Ingresos Proyectados", value: "$1,050/mes", change: -180 },
          { label: "Videos Publicados (30d)", value: "8", change: -2 }
        ]
      };

      const rrhhData: DemoRiskData = {
        vertical: "rrhh",
        riskScore: 72,
        riskLevel: "high",
        alerts: [
          {
            id: "alert-7",
            title: "Riesgo Alto de Atrición - Talento Clave",
            description: "Juan López (Senior Developer) muestra patrones de búsqueda de empleo. Riesgo de salida: 85%.",
            severity: "critical",
            impact: "Costo de reemplazo: $45,000 USD (200% del salario anual)",
            actionRequired: "Reunión urgente: revisar compensación y desarrollo de carrera"
          },
          {
            id: "alert-8",
            title: "Baja Satisfacción en Equipo de Ventas",
            description: "3 de 5 vendedores reportan insatisfacción con comisiones. Riesgo de rotación: 60%.",
            severity: "high",
            impact: "Pérdida de productividad: -$8,000 USD/mes",
            actionRequired: "Revisar estructura de incentivos"
          },
          {
            id: "alert-9",
            title: "Ausentismo Elevado",
            description: "Tasa de ausentismo subió a 8.5% (normal: 3-4%). Posible problema de clima laboral.",
            severity: "medium",
            impact: "Productividad comprometida: -15%",
            actionRequired: "Encuesta anónima y reuniones 1-on-1"
          }
        ],
        metrics: [
          { label: "Rotación Anual", value: "18%", change: 6 },
          { label: "Satisfacción Laboral", value: "6.2/10", change: -1.5 },
          { label: "Costo Promedio Reemplazo", value: "$32,500", change: 2500 },
          { label: "Empleados en Riesgo", value: "7 de 42", change: 2 }
        ]
      };

      setDemoData([coreData, creatorsData, rrhhData]);
      setIsGenerating(false);
    };

    const timer = setTimeout(generateDemoData, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentData = demoData.find(d => d.vertical === selectedVertical);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      default: return "text-green-500";
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-500/10 border-red-500/30";
      case "high": return "bg-orange-500/10 border-orange-500/30";
      case "medium": return "bg-yellow-500/10 border-yellow-500/30";
      default: return "bg-green-500/10 border-green-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Demo Header */}
          <div className="mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              🎯 DEMO EN VIVO - Risk Engine Simulado
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Tu Diagnóstico de Riesgo en Tiempo Real
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              SmartDash analiza tus operaciones y genera alertas predictivas. Esta demostración muestra cómo el sistema protege tu capital en los tres verticales clave.
            </p>
          </div>

          {/* Vertical Selector */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { id: "core", label: "Core (eCommerce)", icon: Package },
              { id: "creators", label: "Creators (Digital)", icon: Eye },
              { id: "rrhh", label: "RR.HH. (Talento)", icon: Users }
            ].map((vertical) => {
              const Icon = vertical.icon;
              const isSelected = selectedVertical === vertical.id;
              return (
                <button
                  key={vertical.id}
                  onClick={() => setSelectedVertical(vertical.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-white/10 bg-white/5 hover:border-cyan-500/50"
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <p className="font-semibold text-sm">{vertical.label}</p>
                </button>
              );
            })}
          </div>

          {isGenerating ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto"></div>
                <p className="text-slate-400">Analizando datos y generando alertas...</p>
              </div>
            </div>
          ) : currentData ? (
            <div className="space-y-8">
              {/* Risk Score Card */}
              <Card className="border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Risk Score</span>
                    <Shield className={`h-6 w-6 ${getRiskColor(currentData.riskLevel)}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-end gap-6">
                    <div>
                      <div className="text-6xl font-bold text-cyan-400">{currentData.riskScore}</div>
                      <p className="text-slate-400 text-sm mt-2">de 100</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            currentData.riskLevel === "critical"
                              ? "bg-red-500"
                              : currentData.riskLevel === "high"
                              ? "bg-orange-500"
                              : currentData.riskLevel === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${currentData.riskScore}%` }}
                        />
                      </div>
                      <p className="text-right text-sm mt-2 font-semibold capitalize">
                        Nivel: <span className={getRiskColor(currentData.riskLevel)}>{currentData.riskLevel}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Grid */}
              <div className="grid md:grid-cols-4 gap-4">
                {currentData.metrics.map((metric, i) => (
                  <Card key={i} className="border-white/10 bg-slate-900/50">
                    <CardContent className="pt-6">
                      <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-sm mt-2 ${metric.change > 0 ? "text-red-400" : "text-green-400"}`}>
                        {metric.change > 0 ? "↑" : "↓"} {Math.abs(metric.change)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Alerts Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Alertas Críticas ({currentData.alerts.length})
                </h2>

                {currentData.alerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`border-2 ${getRiskBgColor(alert.severity)} transition-all hover:shadow-lg hover:shadow-cyan-500/20`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="flex-1">{alert.title}</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                          alert.severity === "critical" ? "bg-red-500/20 text-red-300" :
                          alert.severity === "high" ? "bg-orange-500/20 text-orange-300" :
                          "bg-yellow-500/20 text-yellow-300"
                        }`}>
                          {alert.severity}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-300">{alert.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">💰 Impacto Financiero</p>
                          <p className="font-semibold text-red-400">{alert.impact}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">⚡ Acción Requerida</p>
                          <p className="font-semibold text-cyan-400">{alert.actionRequired}</p>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-2">
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Alertar por WhatsApp
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/10">
                          Marcar como Leído
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA Section */}
              <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                <CardContent className="pt-8 pb-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">¿Listo para Proteger tu Negocio?</h3>
                    <p className="text-slate-300">
                      Esta demostración muestra solo una fracción de lo que SmartDash puede hacer. Con acceso completo, obtendrás:
                    </p>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        Alertas en tiempo real por WhatsApp
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        Análisis predictivo de riesgos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        Integración con tus sistemas actuales
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        Reportes personalizados y análisis
                      </li>
                    </ul>
                    <div className="flex gap-4 pt-4">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                        Comenzar Ahora Gratis
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/10">
                        Agendar Demo Personalizado
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Footer Note */}
              <div className="text-center text-slate-500 text-sm pt-8 border-t border-white/10">
                <p>
                  Esta es una demostración con datos simulados. Los datos reales provendrán de tus integraciones con Mercado Libre, Tango, Excel y otros sistemas.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
