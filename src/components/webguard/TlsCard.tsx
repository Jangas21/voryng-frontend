"use client";

type Props = {
  data?: {
    valid?: boolean;
    issuer?: string;
    subject?: string;
    valid_from?: string;
    valid_to?: string;
    protocol?: string;
    fingerprint256?: string;
    fingerprint512?: string;
    days_remaining?: number;
    error?: string;
  };
};

export function TlsCard({ data }: Props) {
  if (!data) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg">
      <h3 className="text-xl font-semibold mb-4">🔐 Certificado TLS / SSL</h3>

      {data.error && (
        <p className="text-red-400 text-sm">{data.error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
        <div>
          <p className="text-white/60">Estado</p>
          <p className={data.valid ? "text-green-400" : "text-red-400"}>
            {data.valid ? "Válido" : "Inválido"}
          </p>
        </div>

        <div>
          <p className="text-white/60">Entidad emisora</p>
          <p>{data.issuer || "Desconocido"}</p>
        </div>

        <div>
          <p className="text-white/60">Dominio sujeto</p>
          <p>{data.subject || "Desconocido"}</p>
        </div>

        <div>
          <p className="text-white/60">Válido desde</p>
          <p>{data.valid_from}</p>
        </div>

        <div>
          <p className="text-white/60">Válido hasta</p>
          <p>{data.valid_to}</p>
        </div>

        <div>
          <p className="text-white/60">Días restantes</p>
          <p>{data.days_remaining ?? "—"}</p>
        </div>

        <div>
          <p className="text-white/60">Protocolo TLS</p>
          <p>{data.protocol || "Desconocido"}</p>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-white/60">Fingerprint SHA256</p>
          <p className="text-xs text-white/70 break-all">{data.fingerprint256}</p>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="text-white/60">Fingerprint SHA512</p>
          <p className="text-xs text-white/70 break-all">{data.fingerprint512}</p>
        </div>
      </div>
    </div>
  );
}
