"use client";

type Finding = {
  id?: string
  area?: string
  severity?: string
  title?: string
  description?: string
  recommendation?: string
}

type Props = {
  findings?: Finding[]
}

const severityOrder = ["critical", "high", "medium", "low"]

const severityColor: Record<string, string> = {
  critical: "bg-red-600/80 text-white",
  high: "bg-orange-500/80 text-white",
  medium: "bg-yellow-500/80 text-black",
  low: "bg-blue-500/80 text-white",
}

export function FindingsCard({ findings }: Props) {
  if (!findings || findings.length === 0) return null

  const grouped: Record<string, Finding[]> = {}
  for (const f of findings) {
    const sev = (f.severity || "other").toLowerCase()
    if (!grouped[sev]) grouped[sev] = []
    grouped[sev].push(f)
  }

  const orderedSeverities = [
    ...severityOrder.filter((s) => grouped[s]?.length),
    ...Object.keys(grouped).filter((s) => !severityOrder.includes(s)),
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg">
      <h3 className="text-xl font-semibold mb-4">🧪 Hallazgos técnicos detallados</h3>

      <p className="text-sm text-white/60 mb-4">
        Estos son los problemas de seguridad detectados, priorizados por severidad.
        Úsalos como checklist de remediación.
      </p>

      <div className="space-y-5">
        {orderedSeverities.map((sev) => (
          <div key={sev} className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              {sev === "critical" ? "Críticos"
                : sev === "high" ? "Alta prioridad"
                : sev === "medium" ? "Media prioridad"
                : sev === "low" ? "Baja prioridad"
                : sev.toUpperCase()}
            </h4>

            <div className="space-y-3">
              {grouped[sev].map((f, idx) => (
                <div
                  key={`${f.id || sev}-${idx}`}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {f.title || "Hallazgo sin título"}
                        </span>
                        {f.area && (
                          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                            {f.area}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        severityColor[sev] || "bg-white/10 text-white/70"
                      }`}
                    >
                      {sev}
                    </span>
                  </div>

                  {f.description && (
                    <p className="text-xs text-white/70 mt-2">
                      {f.description}
                    </p>
                  )}

                  {f.recommendation && (
                    <p className="text-xs text-green-300 mt-2">
                      <span className="font-semibold">Recomendación:</span>{" "}
                      {f.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
