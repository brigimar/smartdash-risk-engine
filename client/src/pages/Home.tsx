import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Bell,
  Brain
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              Prevención de Riesgos para Mercado Libre
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Evita Penalizaciones Invisibles
              <br />
              <span className="text-primary">Antes de que Destruyan tu Negocio</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              SmartDash Risk Engine traduce las reglas opacas de Mercado Libre en alertas preventivas claras. 
              Protege tu reputación, evita suspensiones y mantén tu negocio seguro.
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="gap-2">
                  Comenzar Gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/knowledge">
                <Button size="lg" variant="outline">
                  Ver Base de Conocimiento
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Plan gratuito disponible • No requiere tarjeta de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              El Problema que Nadie Más Resuelve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mercado Libre penaliza automáticamente, con reglas opacas y sin avisar. 
              Cuando te enteras, ya es tarde.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
                <CardTitle>Penalizaciones Silenciosas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ML reduce tu visibilidad sin notificarte (shadowban). Una tasa de cancelaciones del 5% puede destruir meses de trabajo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-900">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>Reglas Opacas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Restricción", "suspensión", "bloqueo"... ¿cuál es la diferencia? Nadie lo explica claramente hasta que te pasa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 dark:border-yellow-900">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>Riesgo Acumulativo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No es un evento puntual. Cada pequeño error se acumula hasta que ML toma acción drástica.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cómo Te Protegemos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No predecimos el futuro. Evitamos que el pasado se repita.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Risk Score en Tiempo Real</CardTitle>
                <CardDescription>
                  Calcula tu nivel de riesgo (Bajo/Medio/Alto/Crítico) basado en múltiples factores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Monitoreo continuo de cancelaciones, reclamos y stock
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Umbrales críticos personalizables
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Historial de evolución para detectar tendencias
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Bell className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Alertas Preventivas Inteligentes</CardTitle>
                <CardDescription>
                  Te avisamos ANTES de que ML penalice, no después
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Priorización automática por urgencia
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Notificaciones vía email y WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Traducción de reglas opacas a acciones claras
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Asistente Preventivo con IA</CardTitle>
                <CardDescription>
                  Aprende de tu comportamiento y sugiere acciones contextuales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Sugerencias basadas en tu historial
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Aprendizaje reflejado: "Las últimas 2 veces que ignoraste..."
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Lenguaje claro, no técnico
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Panel Multi-cuenta</CardTitle>
                <CardDescription>
                  Perfecto para agencias que gestionan múltiples vendedores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Vista consolidada de todas las cuentas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Filtros por nivel de riesgo
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Reportes automáticos semanales/mensuales
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes Simples y Transparentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Comienza gratis, escala cuando lo necesites
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gratuito</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <CardDescription>Para probar la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    1 cuenta de ML
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Risk Score básico
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    5 alertas/mes
                  </li>
                </ul>
                <a href={getLoginUrl()}>
                  <Button variant="outline" className="w-full">Comenzar</Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/mes</span></div>
                <CardDescription>Para vendedores individuales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Hasta 3 cuentas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Alertas ilimitadas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Asistente IA básico
                  </li>
                </ul>
                <a href={getLoginUrl()}>
                  <Button variant="outline" className="w-full">Elegir Plan</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg">
              <CardHeader>
                <div className="inline-flex px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
                  Más Popular
                </div>
                <CardTitle>Professional</CardTitle>
                <div className="text-3xl font-bold">$79<span className="text-sm font-normal">/mes</span></div>
                <CardDescription>Para agencias ML-first</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Hasta 10 cuentas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    IA completa + WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Dashboard multi-cuenta
                  </li>
                </ul>
                <a href={getLoginUrl()}>
                  <Button className="w-full">Elegir Plan</Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">$199<span className="text-sm font-normal">/mes</span></div>
                <CardDescription>Para grandes operaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Cuentas ilimitadas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    API access
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Account manager
                  </li>
                </ul>
                <a href={getLoginUrl()}>
                  <Button variant="outline" className="w-full">Contactar</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Deja de Apagar Fuegos. Empieza a Prevenirlos.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a las agencias y vendedores que ya protegen su negocio con SmartDash
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="gap-2">
              Comenzar Gratis Ahora
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
