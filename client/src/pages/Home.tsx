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
  Zap
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

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
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">SMARTDASH</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Inicio</a>
            <a href="#problem" className="hover:text-white transition-colors">El Riesgo</a>
            <a href="#solution" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planes</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href={getLoginUrl()}>
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">Ingresar</Button>
            </a>
            <a href={getLoginUrl()}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full">Empezar Gratis</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section - NUEVO POSICIONAMIENTO */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
                🚨 Sistema Nervioso de Alertas
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                SmartDash: No te dice qué pasó. Te avisa <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">qué está por pasar</span> y cuánto te va a costar si no actuás.
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
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold group">
                    Empezá a Prevenir Gratis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-xl text-lg font-semibold">
                  Ver Alertas en WhatsApp
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

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">¿Cuánta Guita Estás Perdiendo Hoy?</h2>
            <p className="text-xl text-slate-300">SmartDash te avisa antes de que sea tarde. Empezá a prevenir desastres ahora mismo.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={getLoginUrl()}>
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
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold tracking-tighter">SMARTDASH</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              El sistema nervioso de alertas que protege tu plata. Prevención de pérdidas económicas en tiempo real. Porque tu laburo merece estar seguro.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold">Producto</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Cómo Funciona</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Planes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold">Legal</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} SmartDash Risk Engine. Todos los derechos reservados.</p>
            <p>Hecho con 🇦🇷 en Argentina, para vendedores que no quieren perder guita.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
