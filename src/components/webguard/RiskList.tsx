"use client"

interface Risk {
  title: string
  severity: string
  why: string
}

export const RiskList = ({ risks }: { risks: Risk[] }) => {
  if (!risks || risks.length === 0) return null

  return (
    <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-red-400">Riesgos detectados</h2>

      {risks.map((r, i) => (
        <div
          key={i}
          className="rounded-xl border border-red-400/30 p-4"
        >
          <p className="font-semibold text-red-300">{r.title}</p>
          <p className="text-sm text-red-200 mt-1">{r.why}</p>
        </div>
      ))}
    </div>
  )
}
