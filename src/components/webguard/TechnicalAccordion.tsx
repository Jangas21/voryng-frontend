"use client"

import { useState } from "react"

export const TechnicalAccordion = ({
  headers,
  cookies
}: {
  headers?: Record<string, string>
  cookies?: Array<{ name: string; secure?: boolean; httpOnly?: boolean }>
}) => {
  
  const [open, setOpen] = useState(false)

  if (!headers && !cookies) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-lg font-semibold mb-3 text-white hover:opacity-80"
      >
        {open ? "▼ Detalles técnicos" : "► Detalles técnicos"}
      </button>

      {open && (
        <div className="space-y-6">
          
          {/* HEADERS */}
          {headers && (
            <div>
              <h3 className="font-semibold mb-2">Cabeceras</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(headers).map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-white/10 p-3">
                    <p className="text-xs opacity-60">{k}</p>
                    <p className="text-sm break-words">{String(v)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COOKIES */}
          {cookies && cookies.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Cookies</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {cookies.map((c, i) => (
                  <div key={i} className="rounded-xl border border-white/10 p-3">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs opacity-70">
                      secure: {String(c.secure)} | httpOnly: {String(c.httpOnly)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
