"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

type DomainItem = { url: string };
type ScanItem = {
  id: string;
  url: string;
  score: number | null;
  grade: string | null;
  created_at: string;
};

export default function HistoryPage() {
  const { token, user } = useAuth();
  const [domains, setDomains] = useState<DomainItem[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load domains on start
  useEffect(() => {
    const loadDomains = async () => {
      const json = await apiFetch("/webguard/domains", { method: "GET" }, token!);
      setDomains(json);
    };
    loadDomains();
  }, [token]);

  const loadScans = async (domain: string) => {
    setSelectedDomain(domain);
    setLoading(true);

    const json = await apiFetch(`/webguard/domains/${domain}`, { method: "GET" }, token!);
    setScans(json);

    setLoading(false);
  };

  return (
    <Protected>
      <main className="max-w-4xl mx-auto p-6 space-y-10">

        <h1 className="text-3xl font-bold">Historial de análisis</h1>

        {/* LISTA DE DOMINIOS */}
        <section className="space-y-4 p-5 rounded-xl bg-white/[0.04] border border-white/10">
          <h2 className="text-xl font-semibold mb-3">Dominios analizados</h2>

          {domains.length === 0 && (
            <p className="text-white/60 text-sm">
              Aún no has analizado ningún dominio con WebGuard PRO.
            </p>
          )}

          <div className="space-y-2">
            {domains.map((d, i) => (
              <button
                key={i}
                onClick={() => loadScans(d.url)}
                className={`w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition ${
                  selectedDomain === d.url ? "bg-white/10" : "bg-black/20"
                }`}
              >
                {d.url}
              </button>
            ))}
          </div>
        </section>

        {/* SCANS DEL DOMINIO */}
        {selectedDomain && (
          <section className="space-y-4 p-5 rounded-xl bg-white/[0.04] border border-white/10">
            <h2 className="text-xl font-semibold">
              Scans realizados para: <span className="text-blue-400">{selectedDomain}</span>
            </h2>

            {loading && <p className="text-white/60">Cargando scans…</p>}

            {!loading && scans.length === 0 && (
              <p className="text-white/60 text-sm">No hay scans para este dominio.</p>
            )}

            {!loading && scans.length > 0 && (
              <div className="space-y-3">
                {scans.map((scan) => (
                  <div
                    key={scan.id}
                    className="rounded-xl p-4 bg-black/30 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">
                          Score: {scan.score ?? "—"} | Grade: {scan.grade ?? "—"}
                        </p>
                        <p className="text-white/60 text-sm">
                          {new Date(scan.created_at).toLocaleString()}
                        </p>
                      </div>

                      <Link
                        href={`/webguard/report/${scan.id}`}
                        className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition"
                      >
                        Ver informe →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </main>
    </Protected>
  );
}
