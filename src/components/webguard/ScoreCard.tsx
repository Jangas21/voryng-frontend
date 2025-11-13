"use client"

interface ScoreCardProps {
  score: number
  grade: string
}

export const ScoreCard = ({ score, grade }: ScoreCardProps) => {
  // Determinar color según score
  let colorClass = "text-yellow-400 border-yellow-400"
  let riskText = "Riesgo medio"

  if (score >= 80) {
    colorClass = "text-green-400 border-green-400"
    riskText = "Riesgo bajo"
  } else if (score < 60) {
    colorClass = "text-red-400 border-red-400"
    riskText = "Riesgo alto"
  }

  return (
    <div className="p-6 border rounded-xl bg-black/40 backdrop-blur-md shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-2 text-white">Seguridad general</h2>

      <div className={`text-5xl font-extrabold ${colorClass}`}>
        {score}/100
      </div>

      <div className="text-lg text-white/70 mt-2">
        Grado: <span className="font-semibold text-white">{grade}</span>
      </div>

      <div className={`text-md mt-1 font-medium ${colorClass}`}>
        {riskText}
      </div>
    </div>
  )
}
