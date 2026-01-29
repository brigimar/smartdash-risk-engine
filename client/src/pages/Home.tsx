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
  Twitter
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
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href={getLoginUrl()}>
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">Login</Button>
            </a>
            <a href={getLoginUrl()}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full">Sign Up</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Multi-tenancy Libre SMEs & NestJS & Supabase
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                SMARTDASH: Unlocking for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">E-commerce Growth</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                Una arquitectura robusta basada en NestJS y Supabase que garantiza seguridad, escalabilidad y mitigación de riesgos en tiempo real para vendedores y agencias.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl text-lg font-semibold group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-xl text-lg font-semibold">
                  Documentation
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-50"></div>
              <img 
                src="https://raw.githubusercontent.com/brigimar/smartdash-risk-engine/main/attached_assets/hero-illustration.png" 
                alt="SmartDash Security Illustration" 
                className="relative z-10 w-full drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://illustrations.popsy.co/white/security.svg";
                }}
              />
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <section id="features" className="py-24 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Seamless Integration & Payments</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Soluciones especializadas para cada actor del ecosistema de Mercado Libre.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Vendedores de ML",
                  desc: "Monitoreo crítico de vulnerabilidades y prevención de penalizaciones silenciosas.",
                  icon: Shield
                },
                {
                  title: "PYMEs",
                  desc: "Integración de datos heterogéneos (ERP, Excel) y orquestación de flujos de trabajo.",
                  icon: Layers
                },
                {
                  title: "Estudios Contables",
                  desc: "Gestión multi-inquilino segura con segregación de datos mediante RLS.",
                  icon: Lock
                }
              ].map((profile, i) => (
                <Card key={i} className="bg-[#1E293B]/50 border-white/5 hover:border-blue-500/50 transition-all group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <profile.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{profile.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{profile.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-b from-blue-600/20 to-transparent p-12 rounded-[3rem] border border-white/5">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Multi-Tenant Scale Architectures</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">NestJS Framework</h4>
                        <p className="text-slate-400">Arquitectura modular orientada a microservicios para máxima escalabilidad.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Supabase & RLS</h4>
                        <p className="text-slate-400">Seguridad a nivel de fila (Row Level Security) para aislamiento total de datos.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Risk Scoring Engine</h4>
                        <p className="text-slate-400">Cálculo en tiempo real desacoplado mediante colas de mensajes resilientes.</p>
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
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm">Risk Engine</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm">ML Integration</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm">SME Dashboard</div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-sm">Audit Logs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">Flexible Plans for Every Need</h2>
              <p className="text-slate-400">Escala tu gestión de riesgos según el tamaño de tu operación.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Starter", price: "49", features: ["1 Mercado Libre Account", "Basic Reports", "Risk Alerts", "Email Support"] },
                { name: "Growth", price: "140", features: ["Up to 10 Accounts", "Advanced IA Insights", "Priority Support", "WhatsApp Alerts"], popular: true },
                { name: "Enterprise", price: "Custom", features: ["Unlimited Accounts", "API Access", "Dedicated Manager", "SLA Guarantee"] }
              ].map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-blue-500 bg-blue-500/5' : 'border-white/5 bg-[#1E293B]/50'} space-y-6`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase">Most Popular</div>}
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.price !== "Custom" && <span className="ml-1 text-slate-400">/month</span>}
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-12 rounded-xl font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                    {plan.price === "Custom" ? "Contact Sales" : "Sign Up Now"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold tracking-tighter">SMARTDASH</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Protegiendo el crecimiento del e-commerce con tecnología de vanguardia y análisis de riesgos en tiempo real.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Globe className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold">Product</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold">Legal</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} SmartDash Risk Engine. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
