"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function DowngradePage() {
  const router = useRouter();
  const { user, token, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDowngrade = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFetch(
        "/user/downgrade",
        { method: "POST" },
        token ?? undefined
      );

      // Actualizamos estado local
      setUser((prev) => prev ? { ...prev, plan: "free" } : prev);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "No se pudo cambiar al plan gratuito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <main className="max-w-lg mx-auto mt-24 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg space-y-8">

        <h1 className="text-3xl font-bold text-white">Cambiar a plan Free</h1>

        <p className="text-gray-300">
          Perderás el acceso a WebGuard Pro, historial de escaneos y
          análisis avanzados. Puedes volver a PRO en cualquier momento.
        </p>

        {error && <p className="text-red-400">{error}</p>}

        <button
          onClick={onDowngrade}
          disabled={loading}
          className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Confirmar cambio a Free"}
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
