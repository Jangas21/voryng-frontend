// ---------------------------------------------
// Voryng Landing + SEO Perfecto (Sólo WebGuard)
// ---------------------------------------------

'use client'

import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { WebGuardPreview } from "@/components/WebGuardPreview"
import { Contact } from "@/components/Contact"


// === UI Components =========================================================

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  )
}

function Button({ children, href, onClick, variant = 'primary' }: { children: React.ReactNode; href?: string; onClick?: () => void; variant?: 'primary' | 'ghost' }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/40'
  const styles = variant === 'primary'
    ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.99]'
    : 'border border-white/15 text-white hover:bg-white/5'
  if (href) return <a href={href} className={`${base} ${styles}`}>{children}</a>
  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
}

// --- Intro Animated Logo ----------------------------------------------------

function IntroLogo({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <motion.img
        layoutId="voryng-logo"
        src="/logo.png"
        alt="Logo de Voryng"
        initial={{ opacity: 0, scale: 1.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => setTimeout(onDone, 500)}
        className="h-28 w-auto drop-shadow-2xl"
      />
    </div>
  )
}

// --- Sticky Section Wrapper -------------------------------------------------

function StickySection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative h-[120svh]">
      <div className="sticky top-16">
        <Container className="py-24 md:py-32">{children}</Container>
      </div>
    </section>
  )
}

// === Sections ===============================================================

function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center min-h-[calc(100vh-4rem)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6"
      >
        <Pill>WebGuard · Auditoría Web Automática</Pill>

        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
          Analiza y protege tu sitio web con{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-white to-white/70 bg-clip-text text-transparent">
            WebGuard
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-cyan-300">
          WebGuard está disponible en <strong>versión Beta pública</strong>. 
          El acceso es gratuito mientras seguimos mejorando la plataforma.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          WebGuard detecta vulnerabilidades críticas, analiza cabeceras HTTP, verifica SSL,
          evalúa cookies inseguras y genera un informe claro en segundos.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button href="#products">Ver cómo funciona</Button>
          <Button href="/auth/register" variant="ghost">
            Empezar gratis
          </Button>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 text-gray-500 text-sm z-10"
      >
        ↓ Desliza para ver más
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">Qué es WebGuard</h2>
        <p className="mt-3 text-white/70">
          WebGuard es la herramienta de auditoría web desarrollada por Voryng.
          Analiza automáticamente tu dominio y te muestra, en segundos,
          qué riesgos tienes y cómo solucionarlos.
        </p>
        <ul className="mt-6 space-y-3 text-white/80">
          <li>• Cabeceras HTTP seguras y mal configuradas</li>
          <li>• Certificados SSL expirados o inseguros</li>
          <li>• Cookies sin atributos de seguridad</li>
          <li>• Buenas prácticas esenciales para PYMEs</li>
        </ul>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
      >
        <WebGuardPreview />
        <p className="mt-3 text-sm text-white/60 text-center">Vista previa del panel WebGuard</p>
      </motion.div>

    </div>
  )
}

function Products() {
  return (
    <>
      <h2 className="text-3xl font-semibold">Cómo funciona WebGuard</h2>
      <p className="mt-2 max-w-2xl text-white/70">
        WebGuard realiza un análisis completo de tu sitio web y genera un dashboard
        claro con los hallazgos más críticos.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Análisis de cabeceras',
            desc: 'Detecta si tu web envía cabeceras seguras como HSTS, CSP o X-Frame-Options.',
          },
          {
            title: 'Verificación SSL',
            desc: 'Comprueba si el certificado es válido, caduca pronto o usa cifrado débil.',
          },
          {
            title: 'Revisión de cookies',
            desc: 'Detecta cookies sin HttpOnly, Secure o SameSite.',
          },
        ].map(c => (
          <motion.div key={c.title} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-white/70">{c.desc}</p>
            <div className="mt-6 flex gap-2">
              <Button href="/webguard" variant="ghost">Probar ahora</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

function Plans() {
  const tiers = [
    { name: 'Free', price: '0€', features: ['1 dominio', '1 análisis/semana', 'Informe básico'] },
    { name: 'Pro', price: '29€', features: ['5 dominios', 'Scans diarios', 'Exportación PDF'], highlight: true },
    { name: 'Business', price: '99€', features: ['20 dominios', 'Alertas y API', 'Soporte prioritario'] },
  ]

  return (
    <>
      <h2 className="text-3xl font-semibold">Planes WebGuard</h2>
      <p className="mt-2 max-w-2xl text-white/70">Escala cuando tu empresa lo necesite.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tiers.map(t => (
          <motion.div
            key={t.name}
            whileHover={{ y: -6 }}
            className={`rounded-3xl p-6 border ${t.highlight ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/[0.03]'}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <span className="text-2xl">{t.price}</span>
            </div>
            <ul className="mt-4 space-y-2 text-white/80">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-6">
              <Button href="/auth/register">Empezar</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}


// === MAIN PAGE =============================================================

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)

  // 🔧 SEO Schema automático
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "WebGuard by Voryng",
      url: "https://voryng.com",
      description: "WebGuard analiza cabeceras, SSL y cookies para detectar vulnerabilidades.",
      applicationCategory: "SecurityApplication",
      operatingSystem: "All",
      logo: "https://voryng.com/logo.png",
    })
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen text-white">
      <LayoutGroup>
        <AnimatePresence>
          {showIntro && <IntroLogo onDone={() => setShowIntro(false)} />}
        </AnimatePresence>

        <main className="relative z-10">
          <Hero />
          <StickySection id="about"><About /></StickySection>
          <StickySection id="products"><Products /></StickySection>
          <StickySection id="plans"><Plans /></StickySection>
          <StickySection id="contact"><Contact /></StickySection>
        </main>
      </LayoutGroup>
    </div>
  )
}
