import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Database,
  Layers,
  Lock,
  Globe,
  Mail,
  Instagram,
  Twitter,
  MessageCircle,
  AlertCircle,
  TrendingDown,
  DollarSign,
  Brain,
  Zap,
  Package,
  TrendingUp,
  Tag,
  Eye,
  RotateCw,
  Trash2
} from "lucide-react";
import WizardForm from "@/components/WizardForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white text-left">{question}</span>
        <span className={`text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 text-slate-300">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white selection:bg-blue-500/30">
      <Header />

      <main className="pt-20">
        {/* Hero Section - NUEVO POSICIONAMIENTO */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
                🚨 Sistema Nervioso de Alertas
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                SmartDash: Te avisa <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">qué está por pasar</span> y cuánto te va a costar si no actuás.
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Dejá de operar a ciegas. Un sistema nervioso de alertas predictivas que protege tu plata y tu tranquilidad, conectándose a lo que ya usás: Mercado Libre, Tango, Excel y AFIP.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Evitá Pérdidas de Guita</p>
                    <p className="text-slate-400 text-sm">Antes de que pierdas un peso, SmartDash ya te está avisando.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Alertas por WhatsApp al Toque</p>
                    <p className="text-slate-400 text-sm">No es un email que ignorás. Es un WhatsApp que te llega al celu y actuás al instante.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Sin Cambiar Nada de Tu Laburo</p>
                    <p className="text-slate-400 text-sm">Seguís usando Excel, Tango y ML como siempre. Nosotros observamos y te avisamos.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/demo">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold group">
                    Probar Demo Protegida
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-xl text-lg font-semibold">
                  Empezá Gratis
                </Button>
              </div>

              <p className="text-sm text-slate-400">
                Plan gratis disponible • Sin tarjeta de crédito • Cancelá cuando quieras
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-50"></div>
              <img 
                src="/assets/hero-final.png" 
                alt="SmartDash - Sistema de Integración Multi-Plataforma" 
                className="relative z-10 w-full drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Wizard Form Section - Chequeo de Riesgo en 60 Segundos */}
        <section id="wizard" className="py-24 bg-[#0F172A] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 lg:sticky lg:top-28">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                ¿Su sistema actual puede avisarle antes de que ocurra una pérdida?
              </h2>
              <p className="text-lg text-slate-300">
                Realice este diagnóstico rápido para verificar compatibilidad y descubra cómo blindar su capital sin cambiar su forma de trabajar.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Diagnóstico en 60 Segundos</p>
                    <p className="text-slate-400 text-sm">Rápido, sin compromiso y enfocado en su realidad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Privacidad Garantizada</p>
                    <p className="text-slate-400 text-sm">No visualizamos ventas, precios ni datos sensibles. Solo transformamos sus reportes en avisos accionables.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full">
              <WizardForm />
            </div>
          </div>
        </section>

        {/* Problem Section - NUEVO ENFOQUE EN RIESGO SISTÉMICO */}

        {/* Problem Section - NUEVO ENFOQUE EN RIESGO SISTÉMICO */}
        <section id="problem" className="py-24 bg-red-500/5 border-y border-red-500/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">El Riesgo que Nadie te Está Midiendo</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Operás saltando entre sistemas. Cada macana te cuesta guita. Y nadie te avisa hasta que es tarde.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "El Costo de No Saber",
                  desc: "Mercado Libre y los sistemas contables son punitivos y automáticos. Cuando te enterás del error, ya perdiste la guita o te suspendieron la cuenta. No hay vuelta atrás.",
                  icon: AlertCircle,
                  color: "text-red-400"
                },
                {
                  title: "Riesgo Asimétrico",
                  desc: "Una sola macana puede destruir meses de laburo. No es un evento aislado, es un riesgo acumulativo que nadie te está midiendo. Cada error se suma.",
                  icon: TrendingDown,
                  color: "text-orange-400"
                },
                {
                  title: "Estrés por Fragmentación",
                  desc: "Operar saltando entre planillas de Excel, Tango y paneles de venta te quema la cabeza. El dolor no es operativo, es económico y psicológico.",
                  icon: Zap,
                  color: "text-yellow-400"
                }
              ].map((problem, i) => (
                <Card key={i} className="bg-[#1E293B]/50 border-red-500/20 hover:border-red-500/50 transition-all">
                  <CardHeader>
                    <problem.icon className={`h-10 w-10 ${problem.color} mb-2`} />
                    <CardTitle className="text-xl text-white">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{problem.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section - NUEVA NARRATIVA DE INTEGRACIÓN */}
        <section id="solution" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Cómo SmartDash Te Salva el Laburo</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                No reemplazamos nada. Solo observamos, interpretamos y te avisamos al toque.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <Database className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Integración Invisible</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">No te pedimos que cambies nada. Mandanos tu cierre de caja por mail o una foto por WhatsApp como hacés siempre. Nosotros interpretamos los datos por vos.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Conectamos con Mercado Libre, Tango, Excel
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Leemos tus datos sin que hagas nada
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Cero fricción, cero cambios
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <MessageCircle className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Alertas Críticas por WhatsApp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">Si tus ventas caen un 30%, si el stock está por quebrar o si hay un desvío en Tango, recibís un WhatsApp al toque. Simple y accionable.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Alertas en tiempo real al celu
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Acciones claras para evitar pérdidas
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Sin spam, solo lo que importa
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <Brain className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Risk Engine Predictivo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">Calculamos tu Risk Score en tiempo real. Traducimos reglas opacas a acciones claras para evitar multas, penalizaciones y pérdidas de ventas.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Predicción de riesgos antes de que pasen
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Cálculo de pérdida evitada
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Dashboard con métricas que importan
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="py-24 bg-blue-500/5 border-y border-blue-500/10">
          <div className="max-w-4xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">Por Qué Importa Ahora</h2>
              <p className="text-slate-400 text-lg">
                Mercado Libre cambió las reglas. Los márgenes se achicaron. Un error te cuesta real.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#1E293B]/50 border border-white/5 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-red-400">📉</span> Antes (Sin SmartDash)
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• Operás sin saber qué riesgo tenés</li>
                  <li>• Te enteras de los problemas cuando es tarde</li>
                  <li>• Pierdes guita sin saber por qué</li>
                  <li>• Estrés constante por no controlar nada</li>
                  <li>• Cada mes es un sorpresa</li>
                </ul>
              </div>

              <div className="p-8 bg-[#1E293B]/50 border border-blue-500/30 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-green-400">📈</span> Ahora (Con SmartDash)
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• Sabés exactamente qué riesgo tenés</li>
                  <li>• Actuás ANTES de que pase el desastre</li>
                  <li>• Evitás pérdidas antes de que ocurran</li>
                  <li>• Tranquilidad de saber que estás cubierto</li>
                  <li>• Control total de tu negocio</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Planes para Todos</h2>
              <p className="text-slate-400">Empezá gratis, escalá cuando necesites. Sin sorpresas.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Emprendedor", 
                  price: "$0", 
                  period: "Siempre gratis",
                  features: ["1 cuenta de Mercado Libre", "Risk Score básico", "5 alertas por mes", "Soporte por email"],
                  cta: "Empezar Ahora"
                },
                { 
                  name: "Vendedor", 
                  price: "$29", 
                  period: "/mes",
                  features: ["Hasta 3 cuentas", "Alertas ilimitadas", "WhatsApp incluido", "IA básica", "Soporte prioritario"],
                  cta: "Probá Gratis",
                  popular: true
                },
                { 
                  name: "Agencia", 
                  price: "$79", 
                  period: "/mes",
                  features: ["Hasta 10 cuentas", "IA completa + WhatsApp", "Dashboard multi-cuenta", "Reportes automáticos", "Account manager"],
                  cta: "Contactanos"
                }
              ].map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/50' : 'border-white/5 bg-[#1E293B]/50'} space-y-6 hover:border-blue-500/50 transition-all`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase">
                      La Más Piola
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-slate-400">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-12 rounded-xl font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Alerts Section - El Escudo del Negocio */}
        <section id="alerts" className="py-24 bg-gradient-to-b from-cyan-500/5 to-transparent border-y border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold">El Escudo de su Negocio</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Seis defensas proactivas que protegen su capital. Cada alerta es una oportunidad para evitar pérdidas reales.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Stock Crítico de Best Sellers",
                  desc: "Monitoreo de niveles mínimos en sus productos de alta rotación.",
                  impact: "Evita lucro cesante por falta de productos estrella",
                  icon: Package,
                  color: "from-cyan-400 to-blue-400"
                },
                {
                  num: "02",
                  title: "Desvío Anormal de Ventas",
                  desc: "Detección de caídas de facturación fuera de la estacionalidad prevista.",
                  impact: "Reacción inmediata ante cambios en el mercado o competencia",
                  icon: TrendingDown,
                  color: "from-blue-400 to-purple-400"
                },
                {
                  num: "03",
                  title: "Inconsistencia en Precios",
                  desc: "Identificación de errores en etiquetas o precios fuera de rango.",
                  impact: "Protege el margen de ganancia frente a fallas humanas",
                  icon: Tag,
                  color: "from-purple-400 to-pink-400"
                },
                {
                  num: "04",
                  title: "Vigilancia de Reputación",
                  desc: "Alerta temprana sobre métricas que comprometen su visibilidad en plataformas.",
                  impact: "Evita penalizaciones y degradación de categoría (Gold/Plata)",
                  icon: Eye,
                  color: "from-pink-400 to-red-400"
                },
                {
                  num: "05",
                  title: "Anomalías en Devoluciones",
                  desc: "Detección de picos en reclamos o fallas logísticas recurrentes.",
                  impact: "Reduce costos operativos por logística inversa",
                  icon: RotateCw,
                  color: "from-red-400 to-orange-400"
                },
                {
                  num: "06",
                  title: "Optimización de Capital",
                  desc: "Identificación de productos sin rotación ('muertos') en los últimos 30 días.",
                  impact: "Libera flujo de caja inmovilizado en stock obsoleto",
                  icon: Trash2,
                  color: "from-orange-400 to-yellow-400"
                }
              ].map((alert, i) => {
                const IconComponent = alert.icon;
                return (
                  <div key={i} className="group relative p-6 rounded-2xl bg-[#1E293B]/50 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300"></div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-4xl font-bold text-cyan-400/40 group-hover:text-cyan-400/60 transition-colors">{alert.num}</span>
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${alert.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{alert.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{alert.desc}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">💰 Valor de Negocio</p>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">{alert.impact}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-cyan-400" />
                <p className="font-semibold text-white">Todas estas notificaciones llegan directamente a su WhatsApp</p>
              </div>
              <p className="text-slate-400 text-sm">Sin aplicaciones pesadas, sin configuraciones complejas. Recibe alertas críticas al instante en el canal que ya usas.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">¿Cuánta Guita Estás Perdiendo Hoy?</h2>
            <p className="text-xl text-slate-300">SmartDash te avisa antes de que sea tarde. Empezá a prevenir desastres ahora mismo.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold">
                  Empezá Gratis Ahora
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-xl text-lg font-semibold">
                Agendar Demo
              </Button>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-transparent to-cyan-500/5 border-y border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Autoridades que Confían en SmartDash</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Empresas y emprendedores que ya están protegiendo su capital
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "SmartDash nos alertó sobre un desvío de ventas que habría costado $15,000 USD. Actuamos en 2 horas.",
                  author: "Carlos M.",
                  role: "CEO, Tienda de eCommerce",
                  impact: "Pérdida Evitada: $15,000"
                },
                {
                  quote: "Las notificaciones por WhatsApp son game-changer. No tengo que estar pegado a un dashboard.",
                  author: "María L.",
                  role: "Vendedora Mercado Libre",
                  impact: "Tiempo Ahorrado: 5h/semana"
                },
                {
                  quote: "Detectó un shadowban potencial en nuestro canal antes de que Mercado Libre nos penalizara.",
                  author: "Juan P.",
                  role: "Gerente de Operaciones",
                  impact: "Reputación Preservada"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-cyan-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">\"{testimonial.quote}\"</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                    <p className="text-cyan-400 text-sm font-semibold mt-2">✓ {testimonial.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 bg-[#0B1120]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Preguntas Frecuentes</h2>
              <p className="text-slate-400">Todo lo que necesitás saber sobre SmartDash</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "¿Cuánto cuesta SmartDash?",
                  a: "Tenemos un plan gratuito para empezar. Los planes pagos comienzan desde $29/mes. Sin tarjeta de crédito requerida para probar."
                },
                {
                  q: "¿Cuánto tiempo tarda la integración?",
                  a: "Menos de 5 minutos. No necesitás cambiar nada de tu forma de trabajar. SmartDash se conecta a tus sistemas existentes."
                },
                {
                  q: "¿Qué datos visualiza SmartDash?",
                  a: "Solo datos operacionales: stock, ventas, precios y métricas de reputación. Nunca vemos datos sensibles como contraseñas o números de tarjeta."
                },
                {
                  q: "¿Funciona con Mercado Libre, Tango y Excel?",
                  a: "Sí. SmartDash se integra nativamente con Mercado Libre, Tango Gestión, Excel/CSV y AFIP. También soporta otras plataformas."
                },
                {
                  q: "¿Puedo cancelar en cualquier momento?",
                  a: "Claro. Sin contratos de largo plazo, sin penalizaciones. Cancelás cuando quieras desde tu panel."
                },
                {
                  q: "¿Cómo recibo las alertas?",
                  a: "Por WhatsApp al instante. También por email si lo prefieres. Configurás el canal que más te convenga."
                }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
