import type { ActionTarget, Profile } from '@/content/types'

/** Número de WhatsApp sin definir: los botones llevan a la sección de contacto. */
export const isPendingWhatsapp = (whatsapp: string) => !/^\d{10,15}$/.test(whatsapp)

export function whatsappLink(profile: Profile, message?: string) {
  if (isPendingWhatsapp(profile.whatsapp)) return '/#contacto'
  const text = message ?? `Hola ${profile.name}, vi tu portafolio y me gustaría hablar contigo.`
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`
}

/** Convierte el destino de un botón del contenido en un href real. */
export function resolveAction(to: ActionTarget, profile: Profile): string {
  switch (to) {
    case 'whatsapp':
      return whatsappLink(profile)
    case 'email':
      return profile.email ? `mailto:${profile.email}` : '/#contacto'
    case 'cv':
      return profile.cvPdf || '/cv'
    default:
      return to
  }
}

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)
export const isDownload = (href: string) => href.endsWith('.pdf')
