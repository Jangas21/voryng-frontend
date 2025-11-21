"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

import { ScoreCard } from "@/components/webguard/ScoreCard";
import { RiskList } from "@/components/webguard/RiskList";
import { GoodPoints } from "@/components/webguard/GoodPoints";
import { TechnicalAccordion } from "@/components/webguard/TechnicalAccordion";

export default function ScanReportPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadReport = async () => {
      setLoading(true);

      try {
        const json = await apiFetch(
          `/webguard/report/${id}`,
          { method: "GET" },
          token!
        );
        setData(json);
      } catch (err) {
        console.error("Error loading scan:", err);
      }

      setLoading(false);
    };

    loadReport();
  }, [id, token]);

  if (loading || !data) {
    return (
      <Protected>
        <main className="max-w-4xl mx-auto p-6 text-center">
          <div className="animate-pulse text-white/70">
            Cargando informe…
          </div>
        </main>
      </Protected>
    );
  }

  return (
    <Protected>
      <main className="max-w-4xl mx-auto p-6 space-y-10">

        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Informe de seguridad</h1>
          <p className="text-white/70 text-sm">
            Dominio: <span className="text-blue-400">{data.url}</span>
          </p>
          <p className="text-white/40 text-sm">
            Fecha: {new Date(data.created_at).toLocaleString()}
          </p>
        </header>

        {/* SCORE */}
        <ScoreCard
          score={data.score ?? data.quick_score ?? 0}
          grade={data.grade}
        />

        {/* RIESGOS PRINCIPALES */}
        <RiskList risks={data.risks} />

        {/* BUENAS PRÁCTICAS */}
        <GoodPoints points={data.good_points} />

        {/* SECCIONES DETALLADAS PRO */}
        <TechnicalAccordion
          headers={data.headers}
          cookies={data.cookies}
          tls={data.tls_info}
          dns={data.dns_email}
          findings={data.findings}
        />

      </main>
    </Protected>
  );
}
