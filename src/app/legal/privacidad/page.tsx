export default function PoliticaPrivacidadPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-white/80">
      <h1 className="mb-6 text-3xl font-semibold text-white">
        Política de Privacidad
      </h1>

      <p className="mb-4">
        En Voryng respetamos y protegemos la privacidad de los usuarios conforme
        al Reglamento (UE) 2016/679 (RGPD).
      </p>

      <h2 className="mt-8 mb-2 text-xl font-medium text-white">
        Responsable del tratamiento
      </h2>
      <p className="mb-4">
        Voryng<br />
        Correo:{" "}
        <a
          href="mailto:contact@voryng.com"
          className="underline hover:text-white"
        >
          contact@voryng.com
        </a>
      </p>

      <h2 className="mt-8 mb-2 text-xl font-medium text-white">
        Datos que recopilamos
      </h2>
      <ul className="mb-4 list-disc pl-6">
        <li>Nombre y correo electrónico</li>
        <li>Dirección web analizada</li>
        <li>Datos técnicos básicos (IP, navegador) con fines de seguridad</li>
      </ul>

      <h2 className="mt-8 mb-2 text-xl font-medium text-white">
        Finalidad del tratamiento
      </h2>
      <ul className="mb-4 list-disc pl-6">
        <li>Atender solicitudes y consultas</li>
        <li>Proporcionar análisis de seguridad web</li>
        <li>Garantizar la seguridad y el correcto uso de la plataforma</li>
      </ul>

      <h2 className="mt-8 mb-2 text-xl font-medium text-white">
        Base legal
      </h2>
      <p className="mb-4">
        El tratamiento de los datos se basa en el consentimiento del usuario y
        en el interés legítimo para garantizar la seguridad del servicio.
      </p>

      <h2 className="mt-8 mb-2 text-xl font-medium text-white">
        Derechos del usuario
      </h2>
      <p>
        El usuario puede ejercer sus derechos de acceso, rectificación,
        supresión, oposición, limitación y portabilidad enviando un correo a{" "}
        <a
          href="mailto:contact@voryng.com"
          className="underline hover:text-white"
        >
          contact@voryng.com
        </a>.
      </p>
    </section>
  )
}
