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
  TrendingUp
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
            <a href="#features" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="#architecture" className="hover:text-white transition-colors">Tecnología</a>
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
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
                ⚠️ ¡Ojo! Tu negocio está en riesgo
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Evitá el <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">quilombo</span> de Mercado Libre
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                SmartDash te avisa al toque—directo por WhatsApp—antes de que Mercado Libre te baje la visibilidad, te suspenda la cuenta o te bloquee el negocio. A la hora de la verdad, nosotros te cubrimos las espaldas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Alertas por WhatsApp</p>
                    <p className="text-slate-400 text-sm">Recibís las notificaciones al instante en tu celu, sin esperar emails que no lees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Risk Score en Tiempo Real</p>
                    <p className="text-slate-400 text-sm">Sabés exactamente qué tan en riesgo está tu cuenta, cada segundo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Prevención, No Reacción</p>
                    <p className="text-slate-400 text-sm">Te avisamos antes de que pase, no después. Así salvás tu laburo.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold group">
                    Probá Gratis Ahora
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-xl text-lg font-semibold">
                  Ver Documentación
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
                alt="SmartDash - Seguridad Multi-Tenant" 
                className="relative z-10 w-full drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-red-500/5 border-y border-red-500/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">El Quilombo que Nadie Resuelve</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Mercado Libre penaliza sin avisar. Cuando te enteras, ya perdiste laburo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Penalizaciones Silenciosas",
                  desc: "ML te baja la visibilidad sin decirte nada (shadowban). Una tasa de cancelaciones del 5% puede destruir meses de laburo.",
                  icon: AlertCircle,
                  color: "text-red-400"
                },
                {
                  title: "Reglas Opacas",
                  desc: "¿Restricción? ¿Suspensión? ¿Bloqueo? Nadie sabe la diferencia hasta que te pasa. Ahí recién entendes.",
                  icon: Lock,
                  color: "text-orange-400"
                },
                {
                  title: "Riesgo que se Acumula",
                  desc: "No es un evento puntual. Cada error pequeño se suma hasta que ML te cierra la puerta de golpe.",
                  icon: TrendingUp,
                  color: "text-yellow-400"
                }
              ].map((problem, i) => (
                <Card key={i} className="bg-[#1E293B]/50 border-red-500/20 hover:border-red-500/50 transition-all">
                  <CardHeader>
                    <problem.icon className={`h-10 w-10 ${problem.color} mb-2`} />
                    <CardTitle className="text-xl text-white">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{problem.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Cómo SmartDash Te Salva las Papas</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                No predecimos el futuro. Evitamos que el pasado se repita.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Risk Score en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">Sabés exactamente el nivel de riesgo de tu cuenta (Bajo, Medio, Alto, Crítico) cada segundo.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Monitoreo continuo de cancelaciones y reclamos
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Umbrales que vos configurás
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Historial para ver tendencias
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <MessageCircle className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Alertas por WhatsApp (¡La Clave!)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">Te avisamos al toque, directo al celu. Nada de emails que no lees. Vos recibís el mensaje y actuás.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Notificaciones al instante por WhatsApp
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Priorización automática por urgencia
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Explicación clara de qué hacer
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <Layers className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">IA que Entiende tu Negocio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">La IA aprende de tu laburo y te sugiere acciones antes de que sea tarde.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Sugerencias basadas en tu historial
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      "Las últimas 2 veces que ignoraste esto..."
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Lenguaje claro, sin tecnicismos
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1E293B]/50 border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <CardHeader>
                  <Database className="h-10 w-10 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white">Panel para Agencias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">¿Gestionás múltiples vendedores? SmartDash es tu aliado.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Ves todas las cuentas de una
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Filtros por nivel de riesgo
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Reportes automáticos
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-24 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-b from-blue-600/20 to-transparent p-12 rounded-[3rem] border border-white/5">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Tecnología que Funciona</h2>
                  <p className="text-lg text-slate-300">SmartDash está construido con lo mejor de la tecnología moderna para que vos no tengas que preocuparte por nada.</p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Backend Robusto (NestJS)</h4>
                        <p className="text-slate-400">Arquitectura modular que escala sin quilombos.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Base de Datos Segura (Supabase)</h4>
                        <p className="text-slate-400">Tus datos aislados, protegidos y siempre disponibles.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Motor de Riesgos en Tiempo Real</h4>
                        <p className="text-slate-400">Calcula, analiza y te avisa sin demoras.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square bg-blue-500/10 rounded-full blur-3xl absolute inset-0"></div>
                  <div className="relative bg-[#0B1120] border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="flex flex-col items-center gap-8">
                      <div className="px-6 py-3 bg-blue-600 rounded-xl font-bold">Supabase</div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm font-medium hover:bg-white/10 transition-colors">Motor de Riesgos</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm font-medium hover:bg-white/10 transition-colors">Mercado Libre</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm font-medium hover:bg-white/10 transition-colors">Dashboard</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm font-medium hover:bg-white/10 transition-colors">Auditoría</div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <div className="mt-16 p-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <MessageCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">¿Necesitás más? Hablemos</h3>
                  <p className="text-slate-300">Si gestionás un montón de cuentas o tenés necesidades especiales, armamos un plan a medida. Contactanos sin compromiso.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Dejá de Apagar Incendios</h2>
            <p className="text-xl text-slate-300">Empezá a prevenir quilombos con SmartDash. Tu negocio te lo va a agradecer.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold">
                  Probá Gratis Ahora
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
              Protegemos tu negocio en Mercado Libre con tecnología de punta y análisis de riesgos en tiempo real. Porque tu laburo merece estar seguro.
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
              <li><a href="#" className="hover:text-white transition-colors">Tecnología</a></li>
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
            <p>Hecho con 🇦🇷 en Argentina, para vendedores de Mercado Libre.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
