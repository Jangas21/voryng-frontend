"use client";

type Props = {
  data?: {
    a?: string[];
    aaaa?: string[];
    mx?: Array<{ exchange: string; priority: number }>;
    txt?: string[];
    spf?: string | null;
    dmarc?: string | null;
    dkim?: string | null;
    caa?: string[] | null;
    ptr?: string | null;
    error?: string;
  };
};

export function DnsCard({ data }: Props) {
  if (!data) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg">
      <h3 className="text-xl font-semibold mb-4">📡 Registros DNS & Seguridad Email</h3>

      {data.error && (
        <p className="text-red-400 text-sm">{data.error}</p>
      )}

      {/* DNS BASICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-sm text-white/80">

        <div>
          <h4 className="text-white font-semibold mb-2">Registros A</h4>
          <p className="text-white/70">{data.a?.join(", ") || "—"}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Registros AAAA</h4>
          <p className="text-white/70">{data.aaaa?.join(", ") || "—"}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Registros MX</h4>
          {data.mx?.length ? (
            <ul className="text-white/70 space-y-1">
              {data.mx.map((m, i) => (
                <li key={i}>
                  {m.exchange} (prioridad {m.priority})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/70">—</p>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Registros TXT</h4>
          <p className="text-white/70">{data.txt?.join(" | ") || "—"}</p>
        </div>

      </div>

      {/* EMAIL SECURITY */}
      <div className="mt-8 space-y-4">

        <div>
          <h4 className="text-white font-semibold">SPF</h4>
          <p className={data.spf ? "text-green-400" : "text-red-400"}>
            {data.spf || "No definido"}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold">DMARC</h4>
          <p className={data.dmarc ? "text-green-400" : "text-red-400"}>
            {data.dmarc || "No definido"}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold">DKIM</h4>
          <p className={data.dkim ? "text-green-400" : "text-red-400"}>
            {data.dkim || "No definido"}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold">CAA</h4>
          <p className={data.caa ? "text-green-400" : "text-red-400"}>
            {data.caa?.join(", ") || "No definido"}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold">PTR</h4>
          <p className="text-white/70">{data.ptr || "—"}</p>
        </div>
      </div>
    </div>
  );
}
