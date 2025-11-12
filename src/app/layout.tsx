import type { Metadata } from "next"
import "./globals.css"
import AppShell from "@/components/AppShell"

export const metadata: Metadata = {
  title: "Voryng",
  description: "Voryng – WebGuard",
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
