import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
  return NextResponse.json({ ok: true })
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    console.log("[api/contact] POST received", { name, email })

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 })
    }

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
    console.error("Error enviando mail:", error)
    return NextResponse.json({ error: "Error enviando correo" }, { status: 500 })
  }
}
