'use client'

import { useState } from "react"
import Protected from "@/components/Protected"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/lib/api"

type ScanResult = {
  domain: string
  score?: number
  headers?: Record<string,string>
  ssl?: { valid: boolean; issuer?: string; expiresInDays?: number }
  cookies?: Array<{ name: string; secure?: boolean; httpOnly?: boolean }>
  // añade los campos que devuelva tu backend
}

export default function WebGuardPage() {
  const { token } = useAuth()
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ScanResult | null>(null)

  const onAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setData(null)

    if (!/^https?:\/\//i.test(domain)) {
        return setError("Incluye el protocolo, por ejemplo: https://midominio.com")
    }

    try {
        setLoading(true)

        // 👇 aquí usas tu helper en lugar del fetch directo
        const json = await apiFetch(
        "/webguard/analyze",
        { method: "POST", body: JSON.stringify({ url: domain }) },
        token
        )

        setData(json) // guarda los resultados en el estado
    } catch (err: any) {
        setError(err.message || "No se pudo analizar")
    } finally {
        setLoading(false)
    }
  }

  return (
    <Protected>
      <main className="relative z-10 mx-auto max-w-4xl p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">WebGuard</h1>
        </header>

        <form onSubmit={onAnalyze} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex gap-3 flex-col sm:flex-row">
          <input
            className="flex-1 rounded-xl border border-white/15 bg-transparent px-3 py-2"
            placeholder="https://tu-dominio.com"
            value={domain}
            onChange={(e)=>setDomain(e.target.value.trim())}
          />
          <button
            disabled={loading}
            className="rounded-xl bg-white text-black px-5 py-2 disabled:opacity-60"
          >
            {loading ? "Analizando..." : "Analizar"}
          </button>
        </form>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Resultados */}
        {loading && (
          <div className="rounded-2xl border border-white/10 p-6 animate-pulse">
            Cargando resultados…
          </div>
        )}

        {data && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold">Resumen</h2>
              <p className="opacity-80 mt-1"><b>Dominio:</b> {data.domain}</p>
              {"score" in data && <p className="opacity-80"><b>Score:</b> {data.score}</p>}
            </div>

            {data.ssl && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold mb-2">SSL</h3>
                <p><b>Válido:</b> {data.ssl.valid ? "Sí" : "No"}</p>
                {data.ssl.issuer && <p><b>Issuer:</b> {data.ssl.issuer}</p>}
                {"expiresInDays" in data.ssl && <p><b>Expira en:</b> {data.ssl.expiresInDays} días</p>}
              </div>
            )}

            {data.headers && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold mb-2">Cabeceras</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(data.headers).map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-white/10 p-3">
                      <p className="text-xs opacity-60">{k}</p>
                      <p className="text-sm break-words">{String(v)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.cookies && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold mb-2">Cookies</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.cookies.map((c, i) => (
                    <div key={i} className="rounded-xl border border-white/10 p-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs opacity-70">secure: {String(c.secure)} | httpOnly: {String(c.httpOnly)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button className="rounded-xl border border-white/15 px-4 py-2">Guardar</button>
              <button className="rounded-xl bg-white text-black px-4 py-2">Descargar PDF</button>
            </div>
          </section>
        )}
      </main>
    </Protected>
  )
}
