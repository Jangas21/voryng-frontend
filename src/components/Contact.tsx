"use client"

import { Button } from "@/app/page" 
// Si tu Button está en otro archivo, dímelo y lo ajusto

export function Contact() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">Contacto</h2>
        <p className="mt-2 text-white/70">
          ¿Quieres utilizar WebGuard en tu empresa? Escríbenos y te respondemos en 48h.
        </p>

        <div className="mt-6 space-y-2 text-white/80">
          <p>📧 contact@voryng.com</p>
          <p>🕘 L–V 9:00–18:00</p>
        </div>
      </div>

      <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 grid gap-3">
        <input
          placeholder="Nombre"
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <input
          placeholder="Email"
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <textarea
          placeholder="Mensaje"
          rows={4}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 focus:outline-none"
        />

        <Button>Enviar</Button>

        <p className="text-xs text-white/60">(Pendiente de conectar al backend)</p>
      </form>
    </div>
  )
}
