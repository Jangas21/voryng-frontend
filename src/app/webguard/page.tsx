"use client";

import { useState } from "react";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

import { ScoreCard } from "@/components/webguard/ScoreCard";
import { RiskList } from "@/components/webguard/RiskList";
import { GoodPoints } from "@/components/webguard/GoodPoints";
import { TechnicalAccordion } from "@/components/webguard/TechnicalAccordion";
import { UpgradeCTA } from "@/components/webguard/UpgradeCTA";

type ScanResult = {
  url: string;
  quick_score: number;
  grade: string;
  risks: Array<{ title: string; severity: string; why: string }>;
  good_points: string[];
  summary?: Record<string, any>;
  findings?: any[];
  tls_info?: Record<string, any>;
  dns_email?: Record<string, any>;
  headers?: Record<string, string>;
  cookies?: Array<{
    name: string;
    secure?: boolean;
    httpOnly?: boolean;
  }>;
};

export default function WebGuardPage() {
  const { token } = useAuth();

  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScanResult | null>(null);

  const onAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setData(null);

    // Validación básica
    if (!/^https?:\/\//i.test(domain)) {
      return setError("Incluye el protocolo, ej: https://midominio.com");
    }

    try {
      setLoading(true);

      const json = await apiFetch(
        "/webguard/analyze",
        {
          method: "POST",
          body: JSON.stringify({ url: domain }),
        },
        token ?? undefined
      );

      setData(json);
    } catch (err: any) {
      setError(err.message || "No se pudo analizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <main className="relative z-10 mx-auto max-w-4xl p-6 space-y-6">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">WebGuard</h1>
        </header>

        {/* FORM */}
        <form
          onSubmit={onAnalyze}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex gap-3 flex-col sm:flex-row backdrop-blur-md"
        >
          <input
            className="flex-1 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-white placeholder-white/40"
            placeholder="https://tu-dominio.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value.trim())}
          />

          <button
            disabled={loading}
            className="rounded-xl bg-white text-black px-5 py-2 disabled:opacity-60 font-semibold hover:bg-neutral-200 transition"
          >
            {loading ? "Analizando..." : "Analizar"}
          </button>
        </form>

        {/* ERROR */}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-white/10 p-6 animate-pulse bg-white/[0.03]">
            Cargando resultados…
          </div>
        )}

        {/* ESTADO INICIAL */}
        {!loading && !data && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-lg text-center space-y-6">
            <h2 className="text-2xl font-semibold">Escanea tu sitio web</h2>
            <p className="text-white/70 max-w-xl mx-auto">
              WebGuard analiza tu web en segundos y detecta problemas de
              seguridad como headers faltantes, cookies inseguras y expiración
              del certificado SSL/TLS.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/60 mt-4">
              <p>✓ HTTPS & redirecciones</p>
              <p>✓ Cookies inseguras</p>
              <p>✓ Headers de seguridad faltantes</p>
              <p>✓ Certificado SSL/TLS</p>
            </div>

            <p className="text-white/50 text-sm">
              Introduce tu dominio arriba para comenzar
            </p>
          </div>
        )}

        {/* RESULTADOS */}
        {data && (
          <section className="space-y-8">
<<<<<<< HEAD
            <ScoreCard score={data.quick_score} grade={data.grade} />
=======
            <ScoreCard score={data.quick_score ?? data.global_score} grade={data.grade} />
>>>>>>> parent of 35da051 (fix: typescript)
            <RiskList risks={data.risks} />
            <GoodPoints points={data.good_points} />
            <TechnicalAccordion
              headers={data.headers}
              cookies={data.cookies}
            />
            <UpgradeCTA />
          </section>
        )}
      </main>
    </Protected>
  );
}
