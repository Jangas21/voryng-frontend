'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

function Button({ children, href, onClick, variant = 'primary' }: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
}) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/40'
  const styles = variant === 'primary'
    ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.99]'
    : 'border border-white/15 text-white hover:bg-white/5'
  if (href) return <Link href={href} className={`${base} ${styles}`}>{children}</Link>
  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (pathname.startsWith("/auth")) return null

  return (
    <header className="sticky top-0 z-40 w-full bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.img
            layoutId="voryng-logo"
            src="/logo.png"
            alt="Voryng"
            className="h-6 w-auto"
          />
          <span className="font-semibold tracking-tight">Voryng</span>
        </Link>

        {/* MENÚ */}
        <nav className="hidden gap-6 md:flex text-sm text-white/80">
          <Link href="/#about" className="hover:text-white">Quiénes somos</Link>
          <Link href="/#products" className="hover:text-white">Productos</Link>
          <Link href="/#plans" className="hover:text-white">Planes</Link>
          <Link href="/#contact" className="hover:text-white">Contacto</Link>
        </nav>

        {/* BOTONES DERECHA */}
        {mounted && (
          <div className="hidden md:flex gap-2">
            {user ? (
              <>
                <Button href="/dashboard" variant="ghost">Dashboard</Button>
                <Button onClick={() => { logout(); router.push("/"); }}>Cerrar sesión</Button>
              </>
            ) : (
              <>
                <Button href="/auth/login" variant="ghost">Entrar</Button>
                <Button href="/auth/register">Crear cuenta</Button>
              </>
            )}
          </div>
        )}

        <MobileMenu user={user} logout={logout} />
      </Container>
    </header>
  )
}

function MobileMenu({ user, logout }: { user: any; logout: () => void }) {
  const router = useRouter()
  return (
    <details className="md:hidden group">
      <summary className="list-none p-2 rounded-xl border border-white/15 text-white/80 cursor-pointer select-none">
        <span>☰</span>
      </summary>
      <div className="mt-2 rounded-2xl border border-white/10 bg-black/90 p-4 text-sm flex flex-col gap-3">
        <Link href="/#about" className="hover:text-white">Quiénes somos</Link>
        <Link href="/#products" className="hover:text-white">Productos</Link>
        <Link href="/#plans" className="hover:text-white">Planes</Link>
        <Link href="/#contact" className="hover:text-white">Contacto</Link>

        <div className="pt-2 grid grid-cols-2 gap-2">
          {user ? (
            <>
              <Button href="/dashboard" variant="ghost">Dashboard</Button>
              <Button onClick={() => { logout(); router.push("/"); }}>Salir</Button>
            </>
          ) : (
            <>
              <Button href="/auth/login" variant="ghost">Entrar</Button>
              <Button href="/auth/register">Crear cuenta</Button>
            </>
          )}
        </div>
      </div>
    </details>
  )
}
