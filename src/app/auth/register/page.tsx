'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      await register(name, email, password)
      router.push("/dashboard")
    } catch (error: any) {
      const msg = error?.response?.data?.message || "No se pudo registrar"
      setErr(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative z-10 min-h-screen grid place-items-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-6 space-y-5 shadow-xl"
      >
        {/* Botón para volver */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
        >
          ← Volver al inicio
        </a>

        <h1 className="text-2xl font-semibold text-center">Crear cuenta</h1>

        <div className="space-y-2">
          <label className="text-sm opacity-80">Nombre</label>
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 focus:border-white/40 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm opacity-80">Email</label>
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 focus:border-white/40 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm opacity-80">Contraseña</label>
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 focus:border-white/40 focus:outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {err && <p className="text-sm text-red-400">{err}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-white text-black py-2 font-medium hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        <p className="text-sm opacity-70 text-center">
          ¿Ya tienes cuenta?{" "}
          <a className="underline hover:text-white" href="/auth/login">
            Inicia sesión
          </a>
        </p>
      </form>
    </main>
  )
}
