'use client'

import { useState, useEffect } from "react"
import Protected from "@/components/Protected"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/lib/api"

import { ScoreCard } from "@/components/webguard/ScoreCard"
import { RiskList } from "@/components/webguard/RiskList"
import { GoodPoints } from "@/components/webguard/GoodPoints"
import { TechnicalAccordion } from "@/components/webguard/TechnicalAccordion"
import { UpgradeCTA } from "@/components/webguard/UpgradeCTA"

type ScanResult = {
  url: string
  global_score?: number
  quick_score?: number
  grade: string
  risks: Array<{ title: string; severity: string; why: string }>
  good_points: string[]
  summary?: Record<string, any>
  findings?: any[]
  tls_info?: Record<string, any>
  dns_email?: Record<string, any>
  headers?: Record<string, string>
  cookies?: Array<{ name: string; secure?: boolean; httpOnly?: boolean }>
}

export default function WebGuardPage() {
  const { token, user } = useAuth()

  const isPro = user?.plan === "pro"

  const [domain, setDomain] = useState("")
  const [mode, setMode] = useState<"quick" | "pro">("quick")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ScanResult | null>(null)

  const [history, setHistory] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  // ⭐ Obtener historial al cargar la página (si user es Pro)
  useEffect(() => {
    if (!token) return
    fetchHistory()
  }, [token])

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true)
      const json = await apiFetch("/webguard/history", {}, token!)
      setHistory(json.scans)
    } catch (err: any) {
      console.error("Error history:", err.message)
    } finally {
      setLoadingHistory(false)
    }
  }

  const onAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setData(null)

    if (!/^https?:\/\//i.test(domain)) {
      return setError("Incluye el protocolo, ej: https://midominio.com")
    }

    // 👇 Si el usuario no es Pro, forzamos quick
    const finalMode = isPro ? mode : "quick"

    try {
      setLoading(true)
      const json = await apiFetch(
        "/webguard/analyze",
        { method: "POST", body: JSON.stringify({ url: domain, mode: finalMode }) },
        token ?? undefined
      )
      setData(json)

      // refrescar historial si es Pro
      if (isPro) fetchHistory()

    } catch (err: any) {
      setError(err.message || "No se pudo analizar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Protected>
      <main className="relative z-10 mx-auto max-w-4xl p-6 space-y-8">

        {/* 🔹 Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">WebGuard</h1>
        </header>

        {/* 🔹 Formulario */}
        <form
          onSubmit={onAnalyze}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-3 backdrop-blur-md"
        >
          <input
            className="flex-1 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-white placeholder-white/40"
            placeholder="https://tu-dominio.com"
            value={domain}
            onChange={(e)=>setDomain(e.target.value.trim())}
          />

          {/* Modo de análisis */}
          <div className="flex gap-3">
            <button
              type="button"
              className={`px-4 py-2 rounded-xl border ${
                mode === "quick" ? "bg-white text-black" : "bg-black border-white/20"
              }`}
              onClick={() => setMode("quick")}
            >
              Quick Scan
            </button>

            <button
              type="button"
              disabled={!isPro}
              className={`px-4 py-2 rounded-xl border ${
                mode === "pro"
                  ? "bg-white text-black"
                  : "bg-black border-white/20 text-white/50"
              } ${!isPro && "opacity-40 cursor-not-allowed"}`}
              onClick={() => isPro && setMode("pro")}
            >
              Pro Scan
            </button>
          </div>

          <button
            disabled={loading}
            className="rounded-xl bg-white text-black px-5 py-2 disabled:opacity-60 font-semibold hover:bg-neutral-200 transition"
          >
            {loading ? "Analizando..." : "Analizar"}
          </button>
        </form>

        {/* 🔹 Error */}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* 🔹 Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 p-6 animate-pulse bg-white/[0.03]">
            Cargando resultados…
          </div>
        )}

        {/* 🔹 Resultado */}
        {data && (
          <section className="space-y-8">
            <ScoreCard score={data.quick_score ?? data.global_score} grade={data.grade} />
            <RiskList risks={data.risks} />
            <GoodPoints points={data.good_points} />
            <TechnicalAccordion headers={data.headers} cookies={data.cookies} />
          </section>
        )}

        {/* 🔹 Premium Feature CTA */}
        {!isPro && <UpgradeCTA />}

        {/* 🔥 HISTORIAL (solo PRO) */}
        {isPro && (
          <section className="rounded-2xl border border-white/10 p-6 bg-white/[0.03] backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4">Historial de escaneos</h2>

            {loadingHistory && (
              <p className="text-white/60">Cargando historial…</p>
            )}

            {!loadingHistory && history.length === 0 && (
              <p className="text-white/50 text-sm">Todavía no tienes escaneos.</p>
            )}

            <div className="space-y-3">
              {history.map((scan) => (
                <div
                  key={scan.id}
                  className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/10"
                >
                  <div>
                    <p className="font-semibold">{scan.url}</p>
                    <p className="text-white/40 text-sm">{new Date(scan.created_at).toLocaleString()}</p>
                  </div>

                  <a
                    href={`/webguard/scan/${scan.id}`}
                    className="text-sm px-3 py-1 bg-white text-black rounded-lg hover:bg-neutral-200"
                  >
                    Ver detalles
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </Protected>
  )
}
