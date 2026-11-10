/** Validación del formulario de contacto, compartida por el formulario y la ruta del API. */

export type ContactInput = { name: string; email: string; message: string; website?: string }

export const LIMITS = { name: 80, email: 120, message: 3000, minMessage: 10 }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: ContactInput): Record<string, string> {
  const errors: Record<string, string> = {}
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()
  if (!name) errors.name = 'Escribe tu nombre.'
  else if (name.length > LIMITS.name) errors.name = `Máximo ${LIMITS.name} caracteres.`
  if (!EMAIL.test(email) || email.length > LIMITS.email) errors.email = 'Revisa el correo.'
  if (message.length < LIMITS.minMessage)
    errors.message = `Cuéntame un poco más (mínimo ${LIMITS.minMessage} caracteres).`
  else if (message.length > LIMITS.message) errors.message = `Máximo ${LIMITS.message} caracteres.`
  return errors
}
