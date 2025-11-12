// Voryng Animated Landing – drop this file into src/app/page.tsx
// Dependencies: tailwindcss, framer-motion
// Install: npm i framer-motion
// Tailwind already set by create-next-app. Works on mobile → desktop.

'use client'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from 'react'


// --- UI Primitives ---------------------------------------------------------
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

function Button({ children, href, onClick, variant = 'primary' }: { children: React.ReactNode; href?: string; onClick?: () => void; variant?: 'primary'|'ghost' }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/40'
  const styles = variant === 'primary'
    ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.99]'
    : 'border border-white/15 text-white hover:bg-white/5'
  if (href) return <a href={href} className={`${base} ${styles}`}>{children}</a>
  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
}

function IntroLogo({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      {/* 👇 mismo layoutId */}
      <motion.img
        layoutId="voryng-logo"
        src="/logo.png"
        alt="Voryng"
        initial={{ opacity: 0, scale: 1.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => {
          // pequeño retraso para que se vea el logo y luego disparamos el swap
          setTimeout(onDone, 500)
        }}
        className="h-28 w-auto drop-shadow-2xl" // grande en el centro
      />
    </div>
  )
}

// --- Sticky sections to fake non-scrolling foreground ---------------------
function StickySection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative h-[120svh]">
      <div className="sticky top-16">
        <Container className="py-24 md:py-32">{children}</Container>
      </div>
    </section>
  )
}

// --- Sections --------------------------------------------------------------
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
        <Pill>Seguridad inteligente para PYMEs</Pill>
        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
          Protección continua con{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-white to-white/70 bg-clip-text text-transparent">
            Voryng
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          WebGuard y CloudGuard monitorizan tu web e infraestructura, detectan
          riesgos y priorizan acciones. Enfocado al 80/20 real.
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
    <StickySection id="about">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Quiénes somos</h2>
          <p className="mt-3 text-white/70">
            Somos un equipo apasionado por la ciberseguridad práctica. Construimos herramientas que simplifican decisiones: qué corregir hoy, qué monitorizar mañana.
          </p>
          <ul className="mt-6 space-y-3 text-white/80">
            <li>• Enfoque 80/20 (valor en días, no meses)</li>
            <li>• Informes accionables y claros</li>
            <li>• Integración sencilla con tu stack</li>
          </ul>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-white/10 to-white/0" />
          <p className="mt-3 text-sm text-white/60">Demo visual del panel (placeholder)</p>
        </motion.div>
      </div>
    </StickySection>
  )
}

function Products() {
  const cards = [
    {
      title: 'WebGuard',
      desc: 'Analiza tu dominio, cabeceras, SSL, cookies y expone un dashboard de hallazgos priorizados.'
    },
    {
      title: 'Dashboards',
      desc: 'Histórico de scans, comparativas y progreso por sprint para equipos.'
    },
  ]
  return (
    <StickySection id="products">
      <h2 className="text-3xl font-semibold">Cómo funciona</h2>
      <p className="mt-2 max-w-2xl text-white/70">Herramientas modulares que puedes usar juntas o por separado.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <motion.div key={c.title} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-white/70">{c.desc}</p>
            <div className="mt-6 flex gap-2">
              <Button href={c.title === 'WebGuard' ? '/webguard' : '#'} variant="ghost">Ver más</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </StickySection>
  )
}

function Plans() {
  const tiers = [
    { name: 'Free', price: '0€', features: ['1 dominio', '1 scan/semana', 'Informe básico'] },
    { name: 'Pro', price: '29€', features: ['5 dominios', 'Scans diarios', 'PDF profesional'], highlight: true },
    { name: 'Business', price: '99€', features: ['20 dominios', 'Alertas y API', 'Soporte prioritario'] },
  ]
  return (
    <StickySection id="plans">
      <h2 className="text-3xl font-semibold">Planes</h2>
      <p className="mt-2 max-w-2xl text-white/70">Empieza gratis y escálalo cuando lo necesites.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tiers.map(t => (
          <motion.div key={t.name} whileHover={{ y: -6 }} className={`rounded-3xl p-6 border ${t.highlight ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/[0.03]'}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <span className="text-2xl">{t.price}</span>
            </div>
            <ul className="mt-4 space-y-2 text-white/80">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <Button href="/auth/register" className="mt-6">Empezar</Button>
          </motion.div>
        ))}
      </div>
    </StickySection>
  )
}

function Contact() {
  return (
    <StickySection id="contact">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Contacto</h2>
          <p className="mt-2 text-white/70">Cuéntanos tu caso y te proponemos un plan claro en 48h.</p>
          <div className="mt-6 space-y-2 text-white/80">
            <p>📧 hola@voryng.com</p>
            <p>🕘 L–V 9:00–18:00</p>
          </div>
        </div>
        <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 grid gap-3">
          <input placeholder="Nombre" className="rounded-xl border border-white/10 bg-transparent px-3 py-2" />
          <input placeholder="Email" className="rounded-xl border border-white/10 bg-transparent px-3 py-2" />
          <textarea placeholder="Mensaje" rows={4} className="rounded-xl border border-white/10 bg-transparent px-3 py-2" />
          <Button>Enviar</Button>
          <p className="text-xs text-white/60">(Pendiente de conectar al backend)</p>
        </form>
      </div>
    </StickySection>
  )
}


// --- Main page -------------------------------------------------------------
export default function Page() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="relative min-h-screen text-white">
      <LayoutGroup>
        <AnimatePresence>
          {showIntro && (
            <IntroLogo onDone={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <main className="relative z-10">
          <StickySection id="home"><Hero /></StickySection>
          <StickySection id="about"><About /></StickySection>
          <StickySection id="products"><Products /></StickySection>
          <StickySection id="plans"><Plans /></StickySection>
          <StickySection id="contact"><Contact /></StickySection>
        </main>
        <footer className="border-t border-white/10 py-10 text-center text-white/60">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} Voryng — Seguridad práctica para crecer.
          </div>
        </footer>
      </LayoutGroup>
    </div>
  )
}
