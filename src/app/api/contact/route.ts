import { LIMITS, validateContact, type ContactInput } from '@/lib/contact'

/**
 * Recibe el formulario de contacto y lo reenvía al correo de Libardo con Resend.
 * - Con JavaScript llega como JSON y responde JSON.
 * - Sin JavaScript llega como formulario y redirige a /mensaje-enviado (o de vuelta al formulario).
 * Variables: RESEND_API_KEY, CONTACT_TO_EMAIL y, opcional, CONTACT_FROM_EMAIL.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
/** Límite por IP en memoria: por instancia, suficiente contra spam casual (no es un WAF). */
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

async function readInput(request: Request): Promise<{ input: ContactInput; isForm: boolean }> {
  const type = request.headers.get('content-type') ?? ''
  if (type.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Partial<ContactInput>
    return {
      isForm: false,
      input: {
        name: String(body.name ?? ''),
        email: String(body.email ?? ''),
        message: String(body.message ?? ''),
        website: String(body.website ?? '')
      }
    }
  }
  const form = await request.formData().catch(() => new FormData())
  return {
    isForm: true,
    input: {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
      website: String(form.get('website') ?? '')
    }
  }
}

export async function POST(request: Request) {
  const { input, isForm } = await readInput(request)
  const reply = (status: number, body: Record<string, unknown>, redirectTo: string) =>
    isForm
      ? Response.redirect(new URL(redirectTo, request.url), 303)
      : Response.json(body, { status })

  // Campo trampa: las personas no lo ven; si viene lleno, se finge éxito y no se envía nada.
  if (input.website) return reply(200, { ok: true }, '/mensaje-enviado')

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (rateLimited(ip)) return reply(429, { error: 'rate_limited' }, '/#contacto')

  const errors = validateContact(input)
  if (Object.keys(errors).length) return reply(400, { error: 'invalid', errors }, '/#contacto')

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) return reply(503, { error: 'not_configured' }, '/#contacto')

  const name = input.name.trim().slice(0, LIMITS.name)
  const email = input.email.trim()
  const message = input.message.trim().slice(0, LIMITS.message)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portafolio <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Portafolio: mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`
    })
  }).catch(() => null)

  if (!response?.ok) return reply(502, { error: 'send_failed' }, '/#contacto')
  return reply(200, { ok: true }, '/mensaje-enviado')
}
