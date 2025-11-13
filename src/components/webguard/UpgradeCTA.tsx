"use client"

export const UpgradeCTA = () => {
  return (
    <div className="mt-10 p-8 rounded-2xl border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.25)]">
      
      <h2 className="text-2xl font-bold text-purple-300 mb-3 text-center">
        🚀 Deep Scan Pro disponible
      </h2>

      <p className="text-purple-200/80 text-center max-w-xl mx-auto leading-relaxed">
        El Quick Scan revisó <span className="font-semibold text-purple-200">12 controles básicos</span>.  
        Con el <span className="font-semibold text-purple-200">Deep Scan Pro</span> podrás analizar más de 
        <span className="font-semibold text-purple-200"> 40 puntos críticos adicionales</span>, incluyendo:
      </p>

      <ul className="text-purple-200/90 mt-4 space-y-2 max-w-md mx-auto text-sm list-disc list-inside">
        <li>Scripts inseguros y recursos externos</li>
        <li>Mixed content que rompe HTTPS</li>
        <li>Fallas reales en Content-Security-Policy</li>
        <li>Formularios sin protección (CSRF)</li>
        <li>Servicios y terceros peligrosos</li>
        <li>Reporte PDF profesional de tu sitio</li>
      </ul>

      <div className="text-center mt-6">
        <button className="rounded-xl bg-purple-400 text-black font-semibold px-6 py-3 text-lg shadow hover:bg-purple-300 transition">
          🔓 Activar Deep Scan Pro
        </button>
      </div>

    </div>
  )
}
