"use client";

type Category = {
  score: number
  maxScore: number
  label: string
}

type Recommendation = {
  title: string
  area?: string
  recommendation: string
  severity: string
}

type Props = {
  categories?: Record<string, Category>
  overallRisk?: string
  recommendations?: Recommendation[]
}

function riskLabel(r?: string) {
  switch ((r || "").toLowerCase()) {
    case "low":
      return "Riesgo bajo"
    case "medium":
      return "Riesgo medio"
    case "high":
      return "Riesgo alto"
    case "critical":
      return "Riesgo crítico"
    default:
      return "Nivel de riesgo no determinado"
  }
}

function riskColor(r?: string) {
  switch ((r || "").toLowerCase()) {
    case "low":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    case "medium":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
    case "high":
      return "bg-orange-500/20 text-orange-300 border-orange-500/40"
    case "critical":
      return "bg-red-600/20 text-red-300 border-red-600/40"
    default:
      return "bg-white/10 text-white/70 border-white/20"
  }
}

export function SummaryCard({ categories, overallRisk, recommendations }: Props) {
  if (!categories && !overallRisk && !recommendations?.length) return null

  const catList = categories ? Object.values(categories) : []

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-xl font-semibold">Resumen ejecutivo del análisis</h3>

        {overallRisk && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${riskColor(
              overallRisk
            )}`}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            {riskLabel(overallRisk)}
          </div>
        )}
      </div>

      {/* Categorías con barras */}
      {catList.length > 0 && (
        <div className="space-y-3">
          {catList.map((c, idx) => {
            const pct =
              c.maxScore > 0 ? Math.max(0, Math.min(100, (c.score / c.maxScore) * 100)) : 0

            return (
              <div key={`${c.label}-${idx}`} className="space-y-1">
                <div className="flex justify-between text-xs text-white/70">
                  <span>{c.label}</span>
                  <span>
                    {c.score}/{c.maxScore} ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Recomendaciones clave */}
      {recommendations && recommendations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-white/80">
            Acciones prioritarias de seguridad
          </h4>
          <p className="text-xs text-white/60 mb-2">
            Empieza por estos puntos para mejorar rápidamente tu postura de seguridad.
          </p>

          <ul className="space-y-2 text-xs">
            {recommendations.slice(0, 5).map((rec, idx) => (
              <li
                key={`${rec.title}-${idx}`}
                className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
              >
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-white">
                    {idx + 1}. {rec.title}
                  </span>
                  {rec.area && (
                    <span className="text-[10px] uppercase tracking-wide text-white/50">
                      {rec.area}
                    </span>
                  )}
                </div>
                <p className="text-white/70 mt-1">{rec.recommendation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
