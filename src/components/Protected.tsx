'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Protected({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 animate-pulse">
          Cargando sesión…
        </div>
      </main>
    )
  }

  if (!user) return null

  return <>{children}</>
}
