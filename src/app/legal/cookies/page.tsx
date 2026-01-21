export default function PoliticaCookiesPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-8 text-white/80">
        <h1 className="mb-6 text-3xl font-semibold text-white">
          Política de Cookies
        </h1>

        <p className="mb-4">
          Voryng utiliza cookies propias y de terceros con fines técnicos y de
          seguridad, necesarias para el correcto funcionamiento del sitio.
        </p>

        <h2 className="mt-8 mb-2 text-xl font-medium text-white">
          Tipos de cookies utilizadas
        </h2>
        <ul className="mb-4 list-disc pl-6">
          <li>Cookies técnicas necesarias para la navegación</li>
          <li>Cookies de seguridad para prevenir abusos y accesos maliciosos</li>
        </ul>

        <p className="mb-4">
          Actualmente Voryng no utiliza cookies publicitarias ni de seguimiento
          avanzado.
        </p>

        <h2 className="mt-8 mb-2 text-xl font-medium text-white">
          Gestión de cookies
        </h2>
        <p>
          El usuario puede configurar su navegador para bloquear o eliminar las
          cookies. El bloqueo de algunas cookies puede afectar al correcto
          funcionamiento del sitio.
        </p>
      </section>
    </main>
  )
}
