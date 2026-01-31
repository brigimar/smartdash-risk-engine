import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            ¿Qué Pasa Sin SmartDash vs. Con SmartDash?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Comparamos dos escenarios: uno donde operás a ciegas y otro donde tenés el control total.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Escenario de Desastre */}
          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-6 w-6" />
                Sin SmartDash: Operación a Ciegas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-white mb-1">📉 Lunes 10 AM</p>
                  <p className="text-slate-300 text-sm">Tu mejor producto se quedó sin stock. No te enterás hasta que un cliente reclama.</p>
                  <p className="text-red-400 font-bold text-sm mt-2">💸 Pérdida: $2,400 USD</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-white mb-1">📊 Miércoles 3 PM</p>
                  <p className="text-slate-300 text-sm">Tus ventas cayeron 35%. Recién lo ves en el reporte de fin de mes.</p>
                  <p className="text-red-400 font-bold text-sm mt-2">💸 Pérdida: $5,600 USD</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-white mb-1">⚠️ Viernes 6 PM</p>
                  <p className="text-slate-300 text-sm">Mercado Libre te suspende la cuenta por tasa de cancelaciones. Te enteras por email.</p>
                  <p className="text-red-400 font-bold text-sm mt-2">💸 Pérdida: $12,000+ USD (mes completo)</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-white mb-1">😰 Fin de Semana</p>
                  <p className="text-slate-300 text-sm">Estrés total. No dormís. Tu equipo está desorientado.</p>
                  <p className="text-red-400 font-bold text-sm mt-2">💸 Costo Emocional: Invaluable</p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/30">
                <p className="text-sm font-semibold text-red-400">
                  Total de la Semana: $20,000+ USD en pérdidas evitables
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Escenario con SmartDash */}
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                Con SmartDash: Control Total
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-white mb-1">📱 Lunes 9:45 AM</p>
                  <p className="text-slate-300 text-sm">Recibís un WhatsApp: "Stock crítico en Auriculares Pro. Quedan 3 unidades. Reabastecer hoy."</p>
                  <p className="text-green-400 font-bold text-sm mt-2">✅ Acción: Reabastecer inmediatamente</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-white mb-1">📱 Miércoles 2:30 PM</p>
                  <p className="text-slate-300 text-sm">Alerta: "Ventas cayeron 30% vs. promedio. Posible cambio de mercado. Revisar competencia."</p>
                  <p className="text-green-400 font-bold text-sm mt-2">✅ Acción: Ajustar precios y estrategia</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-white mb-1">📱 Viernes 10 AM</p>
                  <p className="text-slate-300 text-sm">Alerta preventiva: "Tasa de cancelaciones en 5.8%. Si llega a 6%, ML te suspenderá. Mejora tiempos de envío."</p>
                  <p className="text-green-400 font-bold text-sm mt-2">✅ Acción: Coordinar con logística</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-white mb-1">😌 Fin de Semana</p>
                  <p className="text-slate-300 text-sm">Tranquilidad. Sabés que SmartDash está monitoreando. Tu equipo está alineado y proactivo.</p>
                  <p className="text-green-400 font-bold text-sm mt-2">✅ Beneficio: Paz mental</p>
                </div>
              </div>

              <div className="pt-4 border-t border-green-500/30">
                <p className="text-sm font-semibold text-green-400">
                  Total Evitado: $20,000+ USD en pérdidas + Tranquilidad Mental
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Section */}
        <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
          <h3 className="text-2xl font-bold mb-4">💰 El ROI es Obvio</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">Costo Mensual de SmartDash</p>
              <p className="text-3xl font-bold text-cyan-400">$79</p>
              <p className="text-xs text-slate-500 mt-1">Plan Professional</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Pérdida Promedio Evitada/Mes</p>
              <p className="text-3xl font-bold text-green-400">$4,800+</p>
              <p className="text-xs text-slate-500 mt-1">Basado en casos reales</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Retorno de Inversión</p>
              <p className="text-3xl font-bold text-yellow-400">60x</p>
              <p className="text-xs text-slate-500 mt-1">En el primer mes</p>
            </div>
          </div>
          <p className="text-slate-300 mt-6">
            SmartDash no es un gasto. Es la herramienta más rentable que podés contratar para tu negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
