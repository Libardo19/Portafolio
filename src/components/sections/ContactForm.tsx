'use client'

import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { LIMITS, validateContact } from '@/lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const errorText: Record<string, string> = {
  rate_limited: 'Enviaste varios mensajes seguidos. Intenta de nuevo en unos minutos.',
  not_configured: 'El formulario aún no está activo. Escríbeme por WhatsApp o por correo.',
  send_failed: 'No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.'
}

const fields = [
  { name: 'name', label: 'Nombre', type: 'text', autoComplete: 'name', max: LIMITS.name },
  { name: 'email', label: 'Correo', type: 'email', autoComplete: 'email', max: LIMITS.email }
] as const

/**
 * Formulario de contacto. Con JavaScript envía por fetch y muestra el estado aquí mismo;
 * sin JavaScript hace un POST normal a /api/contact, que redirige a /mensaje-enviado.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const input = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? '')
    }
    const found = validateContact(input)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('idle')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const body = (await response.json().catch(() => ({}))) as {
        error?: string
        errors?: Record<string, string>
      }
      if (response.ok) {
        form.reset()
        setStatus('sent')
        setNotice('¡Gracias! Tu mensaje llegó. Te respondo pronto al correo que dejaste.')
        return
      }
      if (body.errors) setErrors(body.errors)
      setStatus('error')
      setNotice(errorText[body.error ?? ''] ?? errorText.send_failed)
    } catch {
      setStatus('error')
      setNotice(errorText.send_failed)
    }
  }

  const control =
    'w-full rounded-lg border border-line bg-surface px-3.5 text-ink transition-colors focus:border-brand aria-invalid:border-red-600'
  const errorClass = 'text-sm text-red-700 dark:text-red-400'

  return (
    <form
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="relative flex flex-col gap-5 rounded-card border border-line bg-card p-6 sm:p-8"
      data-reveal
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label htmlFor={`contact-${field.name}`} className="text-sm font-semibold">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            maxLength={field.max}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
            className={`${control} min-h-12`}
          />
          {errors[field.name] ? (
            <p id={`contact-${field.name}-error`} className={errorClass}>
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-semibold">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={LIMITS.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${control} resize-y py-3`}
        />
        {errors.message ? (
          <p id="contact-message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>
      {/* Campo trampa contra bots: fuera de la vista y del orden de tabulación. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-website">No llenar este campo</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="magnetic inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold text-on-brand transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
        <Send className="size-4" aria-hidden />
      </button>
      <p role="status" className={status === 'error' ? errorClass : 'text-sm text-muted'}>
        {status === 'sent' || status === 'error' ? notice : 'Te respondo al correo que dejes aquí.'}
      </p>
    </form>
  )
}
