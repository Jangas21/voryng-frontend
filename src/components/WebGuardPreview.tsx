"use client"

export function WebGuardPreview() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-[#0b0d0f]/60 backdrop-blur-md p-6 shadow-xl overflow-hidden">
      <div className="relative space-y-6">
        {/* Score */}
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            Seguridad general
          </h2>
          <p className="text-4xl font-bold text-green-400">91/100</p>
          <p className="text-white/70">Grado: <span className="font-semibold">A</span></p>
          <p className="text-green-500 text-sm font-medium">Riesgo bajo</p>
        </div>

        {/* Riesgos */}
        <div>
          <h3 className="text-red-400 font-semibold text-lg mb-3">Riesgos detectados</h3>

          <div className="space-y-3">

            <div className="border border-red-500/20 rounded-lg p-3 bg-red-900/10">
              <p className="font-semibold text-white/90">Falta Content-Security-Policy</p>
              <p className="text-sm text-white/60">
                Sin CSP, tu web permite ejecución de scripts no autorizados (riesgo XSS).
              </p>
            </div>

            <div className="border border-red-500/20 rounded-lg p-3 bg-red-900/10">
              <p className="font-semibold text-white/90">Referrer-Policy ausente</p>
              <p className="text-sm text-white/60">
                Los navegadores pueden filtrar URLs internas cuando el usuario navega a otros sitios.
              </p>
            </div>

          </div>
        </div>

        {/* Puntos positivos */}
        <div>
          <h3 className="text-green-400 font-semibold text-lg mb-3">Puntos positivos</h3>

          <div className="flex items-center gap-2 border border-green-500/20 rounded-lg p-3 bg-green-900/10">
            <span className="text-green-400 text-lg">✔</span>
            <p className="text-white/90">Certificado SSL válido</p>
          </div>
        </div>

        {/* Botón CTA */}
        <a
          href="/webguard"
          className="block w-full text-center mt-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white font-semibold border border-white/20"
        >
          Ver análisis completo →
        </a>
      </div>
    </div>
  )
}
