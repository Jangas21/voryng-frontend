"use client"

export const GoodPoints = ({ points }: { points: string[] }) => {
  if (!points || points.length === 0) return null

  return (
    <div className="rounded-2xl border border-green-400/30 bg-green-400/5 p-6 space-y-3">
      <h2 className="text-xl font-semibold text-green-400">Puntos positivos</h2>

      {points.map((g, i) => (
        <div
          key={i}
          className="border border-green-400/30 p-3 rounded-xl text-green-200"
        >
          ✔ {g}
        </div>
      ))}
    </div>
  )
}
