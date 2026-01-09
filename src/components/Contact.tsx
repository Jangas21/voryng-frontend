"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/Button"
import { apiFetch } from "@/lib/api"

type ContactStatus = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<ContactStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    (field: "name" | "email" | "message") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Completa todos los campos.")
      setStatus("error")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Email no valido.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setError(null)

    try {
      console.log("[contact] sending to", (process.env.NEXT_PUBLIC_API_BASE_URL || "/api") + "/contact")
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(form),
      })

      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      console.error("[contact] send failed", err)
      setError("No pudimos enviar tu mensaje. Intenta de nuevo.")
      setStatus("error")
    }
  }

  const isLoading = status === "loading"

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">Contacto</h2>
        <p className="mt-2 text-white/70">
          Quieres utilizar WebGuard en tu empresa? Escribenos y te respondemos en 48h.
        </p>

        <div className="mt-6 space-y-2 text-white/80">
          <p>Email: contact@voryng.com</p>
          <p>Horario: L-V 9:00-18:00</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
      >
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange("name")}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <textarea
          placeholder="Mensaje"
          rows={4}
          value={form.message}
          onChange={handleChange("message")}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <div className="space-y-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
          {status === "success" && (
            <p className="text-sm text-green-400">
              Mensaje enviado. Te contactamos en 48h.
            </p>
          )}
          {status === "error" && error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>
      </form>
    </div>
  )
}
