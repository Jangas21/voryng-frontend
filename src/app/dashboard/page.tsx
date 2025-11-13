"use client"

import Protected from "@/components/Protected"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <Protected>
      <main className="w-full flex flex-col items-center mt-20 mb-20 px-5 space-y-10">

        {/* =====================
            Bienvenida
        ====================== */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Hola, {user?.name} 👋</h1>
          <p className="text-gray-300 mt-2 text-lg">
            Bienvenido a tu panel de seguridad.
          </p>
        </div>


        {/* =====================
            Grid del Dashboard
        ====================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">

          {/* --------- WebGuard --------- */}
          <div className="rounded-xl p-7 bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-2">🛡️ WebGuard</h2>
            <p className="text-gray-300 mb-5">
              Analiza tu web al instante: SSL, cabeceras, cookies, tecnologías y más.
            </p>

            <Link
              href="/webguard"
              className="px-5 py-3 rounded-lg text-center bg-white text-black font-semibold hover:bg-gray-200 transition block w-full"
            >
              Realizar análisis
            </Link>

            {/* Quick scans NO se guardan */}
            <p className="text-gray-400 text-sm mt-4">
              Los análisis rápidos no se guardan todavía.
            </p>
          </div>


          {/* --------- CloudGuard --------- */}
          <div className="rounded-xl p-7 bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-2">☁️ CloudGuard (próximamente)</h2>
            <p className="text-gray-300 mb-5">
              Auditorías automáticas para AWS, Google Cloud y Azure.
            </p>

            <button
              disabled
              className="px-5 py-3 rounded-lg w-full text-center bg-gray-700 text-gray-400 font-semibold cursor-not-allowed"
            >
              Disponible pronto
            </button>
          </div>


          {/* --------- Cuenta --------- */}
          <div className="rounded-xl p-7 bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-2">👤 Tu cuenta</h2>

            <div className="text-gray-300 space-y-2 mb-6">
              <p><strong className="text-white">Nombre:</strong> {user?.name}</p>
              <p><strong className="text-white">Email:</strong> {user?.email}</p>
              <p><strong className="text-white">Plan:</strong> Gratuito</p>
            </div>

            <button
              onClick={logout}
              className="px-5 py-3 rounded-lg bg-red-500/80 text-white font-semibold hover:bg-red-600 transition w-full"
            >
              Cerrar sesión
            </button>
          </div>

        </div>

      </main>
    </Protected>
  )
}
