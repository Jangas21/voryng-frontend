export const runtime = "nodejs"

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptchaToken } = await req.json()

    // 1️⃣ Validaciones básicas
    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    // 2️⃣ Validar reCAPTCHA con Google
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    )

    const captchaData = await captchaRes.json()

    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json(
        { error: "Actividad sospechosa detectada" },
        { status: 403 }
      )
    }

    // 3️⃣ Envío de email (Zoho SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Voryng Contact" <${process.env.ZOHO_USER}>`,
      to: "contact@voryng.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[api/contact] error:", error)
    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    )
  }
}
