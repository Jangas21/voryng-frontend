"use client";

import { useState } from "react";

type HeaderMap = Record<string, string>;
type CookieItem = {
  name: string;
  secure?: boolean;
  httpOnly?: boolean;
};

type TechnicalAccordionProps = {
  headers?: HeaderMap;
  cookies?: CookieItem[];
  tls?: Record<string, any>;
  dns?: Record<string, any>;
  findings?: Array<any>;
};

export function TechnicalAccordion({
  headers,
  cookies,
  tls,
  dns,
  findings,
}: TechnicalAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen(open === key ? null : key);
  };

  return (
    <div className="space-y-4">

      {/* HEADERS */}
      <AccordionItem
        title="HTTP Security Headers"
        open={open === "headers"}
        onClick={() => toggle("headers")}
      >
        {!headers && <p className="text-white/60">No disponible.</p>}
        {headers && (
          <div className="space-y-2">
            {Object.entries(headers).map(([k, v]) => (
              <div key={k} className="text-white/80 text-sm">
                <strong>{k}:</strong> {String(v)}
              </div>
            ))}
          </div>
        )}
      </AccordionItem>

      {/* COOKIES */}
      <AccordionItem
        title="Cookies"
        open={open === "cookies"}
        onClick={() => toggle("cookies")}
      >
        {!cookies || cookies.length === 0 && (
          <p className="text-white/60">No se encontraron cookies.</p>
        )}

        {cookies && cookies.length > 0 && (
          <ul className="space-y-2">
            {cookies.map((c, i) => (
              <li key={i} className="text-white/80 text-sm">
                <strong>{c.name}</strong> — Secure:{" "}
                {c.secure ? "Sí" : "No"} | HttpOnly:{" "}
                {c.httpOnly ? "Sí" : "No"}
              </li>
            ))}
          </ul>
        )}
      </AccordionItem>

      {/* TLS */}
      <AccordionItem
        title="TLS / SSL Details"
        open={open === "tls"}
        onClick={() => toggle("tls")}
      >
        {!tls && <p className="text-white/60">Solo disponible en PRO.</p>}

        {tls && (
          <div className="space-y-2 text-white/80 text-sm">
            {Object.entries(tls).map(([k, v]) => (
              <div key={k}>
                <strong>{k}:</strong>{" "}
                {typeof v === "object" ? JSON.stringify(v) : String(v)}
              </div>
            ))}
          </div>
        )}
      </AccordionItem>

      {/* DNS */}
      <AccordionItem
        title="DNS & Email Security"
        open={open === "dns"}
        onClick={() => toggle("dns")}
      >
        {!dns && <p className="text-white/60">Solo disponible en PRO.</p>}

        {dns && (
          <div className="space-y-2 text-white/80 text-sm">
            {Object.entries(dns).map(([k, v]) => (
              <div key={k}>
                <strong>{k}:</strong>{" "}
                {Array.isArray(v)
                  ? v.join(", ")
                  : typeof v === "object"
                  ? JSON.stringify(v)
                  : String(v)}
              </div>
            ))}
          </div>
        )}
      </AccordionItem>

      {/* FINDINGS */}
      <AccordionItem
        title="Findings Técnicos (PRO)"
        open={open === "findings"}
        onClick={() => toggle("findings")}
      >
        {!findings && (
          <p className="text-white/60">Solo disponible en PRO.</p>
        )}

        {findings && findings.length > 0 && (
          <ul className="space-y-4">
            {findings.map((f, i) => (
              <li key={i} className="text-white/80 text-sm p-3 border border-white/10 rounded-lg">
                <strong className="text-red-400">{f.title}</strong>
                <p className="text-white/70">{f.description}</p>
                <p className="text-green-400 text-sm mt-1">
                  Recomendación: {f.recommendation}
                </p>
              </li>
            ))}
          </ul>
        )}
      </AccordionItem>
    </div>
  );
}

function AccordionItem({
  title,
  children,
  open,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-white/10 rounded-xl bg-white/[0.03]">
      <button
        onClick={onClick}
        className="w-full text-left p-4 font-semibold text-white flex justify-between"
      >
        {title}
        <span className="text-white/50">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="p-4">{children}</div>}
    </div>
  );
}
