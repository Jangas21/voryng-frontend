'use client'

import { AuthProvider } from "@/context/AuthContext"
import Navbar from "@/components/Navbar"
import LiquidBackground from "@/components/LiquidBackground"
import NetworkBackground from "@/components/NetworkBackground"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidBackground />
      <NetworkBackground />
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-white/10 py-10 text-center text-white/60 text-sm">
          <div className="mb-2">
            © {new Date().getFullYear()} Voryng — Seguridad práctica para crecer.
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="/legal/aviso-legal"
              className="hover:text-white transition"
            >
              Aviso legal
            </a>
            <span>·</span>
            <a
              href="/legal/privacidad"
              className="hover:text-white transition"
            >
              Privacidad
            </a>
            <span>·</span>
            <a
              href="/legal/cookies"
              className="hover:text-white transition"
            >
              Cookies
            </a>
          </div>
        </footer>
      </AuthProvider>
    </>
  )
}
