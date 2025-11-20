"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function UpgradePage() {
  const router = useRouter();
  const { user, token, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUpgrade = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFetch(
        "/user/upgrade",
        { method: "POST" },
        token ?? undefined
      );

      // Actualizar user en el AuthContext
      setUser((prev) => prev ? { ...prev, plan: "pro" } : prev);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "No se pudo actualizar el plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <main className="max-w-lg mx-auto mt-24 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg space-y-6">
        <h1 className="text-3xl font-bold text-white">Mejorar a PRO 🚀</h1>

        <p className="text-gray-300">
          Obtén acceso completo a WebGuard PRO: historial de escaneos,
          análisis avanzados (TLS, DNS, cabeceras completas) y más.
        </p>

        <ul className="text-gray-200 list-disc pl-5 space-y-1">
          <li>Análisis avanzados ilimitados</li>
          <li>Historial completo de escaneos</li>
          <li>Puntuación global completa</li>
          <li>Recomendaciones profesionales</li>
        </ul>

        {error && <p className="text-red-400">{error}</p>}

        <button
          onClick={onUpgrade}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Mejorar ahora"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        >
          Cancelar
        </button>
      </main>
    </Protected>
  );
}
