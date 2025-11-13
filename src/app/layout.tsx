import type { Metadata } from "next"
import "./globals.css"
import AppShell from "@/components/AppShell"

// === SEO Metadata (muy importante) ===============================
export const metadata = {
  title: "Voryng | Auditorías Web y Ciberseguridad para PYMEs",
  description:
    "Analiza y protege tu web con WebGuard. Detecta vulnerabilidades críticas, cabeceras inseguras y configuraciones SSL en segundos.",
  keywords: [
    "voryng",
    "webguard",
    "auditoría web",
    "seguridad web",
    "ciberseguridad para pymes",
    "análisis ssl",
    "cabeceras http",
    "escaneo web"
  ],
  openGraph: {
    title: "Voryng | Auditorías Web y Ciberseguridad",
    description:
      "WebGuard analiza tu sitio web y detecta vulnerabilidades críticas. Empieza gratis.",
    url: "https://voryng.com",
    siteName: "Voryng",
    images: [
      {
        url: "https://voryng.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Voryng análisis web"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  alternates: {
    canonical: "https://voryng.com"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen text-white overflow-x-hidden bg-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
