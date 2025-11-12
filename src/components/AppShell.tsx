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
        <footer className="border-t border-white/10 py-10 text-center text-white/60">
          © {new Date().getFullYear()} Voryng — Seguridad práctica para crecer.
        </footer>
      </AuthProvider>
    </>
  )
}
