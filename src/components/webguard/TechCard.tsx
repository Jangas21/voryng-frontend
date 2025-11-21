"use client";

type TechData = {
  server?: string | null
  x_powered_by?: string | null
  exposes_technology?: boolean
}

type Props = {
  data?: TechData
}

export function TechCard({ data }: Props) {
  if (!data) return null

  const { server, x_powered_by, exposes_technology } = data

  const hasInfo = server || x_powered_by

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg space-y-4">
      <h3 className="text-xl font-semibold">🧬 Tecnologías expuestas</h3>

      {!hasInfo && (
        <p className="text-sm text-white/60">
          No se ha detectado información sensible de tecnologías en las cabeceras principales.
        </p>
      )}

      {hasInfo && (
        <div className="space-y-3 text-sm text-white/80">
          {server && (
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wide">Servidor</p>
              <p>{server}</p>
            </div>
          )}

          {x_powered_by && (
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wide">X-Powered-By</p>
              <p>{x_powered_by}</p>
            </div>
          )}

          {exposes_technology && (
            <p className="text-xs text-yellow-300">
              Esta información puede ayudar a un atacante a identificar versiones vulnerables
              o tecnologías específicas. Considera minimizar lo que expones en las cabeceras.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
