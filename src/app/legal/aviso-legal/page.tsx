export default function AvisoLegalPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-8 text-white/80">
        <h1 className="mb-6 text-3xl font-semibold text-white">
          Aviso Legal
        </h1>

        <p className="mb-4">
          <strong>Voryng</strong> es una plataforma de análisis de seguridad web
          en fase beta, orientada a ayudar a profesionales, freelancers y pequeñas
          empresas a detectar configuraciones inseguras en sus sitios web.
        </p>

        <h2 className="mt-8 mb-2 text-xl font-medium text-white">
          Titular del sitio
        </h2>
        <p className="mb-4">
          Responsable: Voryng<br />
          Correo de contacto:{" "}
          <a
            href="mailto:contact@voryng.com"
            className="underline hover:text-white"
          >
            contact@voryng.com
          </a>
        </p>

        <h2 className="mt-8 mb-2 text-xl font-medium text-white">
          Condiciones de uso
        </h2>
        <p className="mb-4">
          El acceso y uso de este sitio atribuye la condición de usuario e implica
          la aceptación de las presentes condiciones. El usuario se compromete a
          hacer un uso adecuado del sitio y a no emplearlo para fines ilícitos o
          contrarios a la buena fe.
        </p>

        <h2 className="mt-8 mb-2 text-xl font-medium text-white">
          Limitación de responsabilidad
        </h2>
        <p>
          Los análisis proporcionados por Voryng son automáticos y con fines
          informativos. No constituyen una auditoría de seguridad profesional ni
          garantizan la ausencia de vulnerabilidades.
        </p>
      </section>
    </main>
  )
}
