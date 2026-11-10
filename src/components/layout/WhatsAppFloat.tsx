import { MessageCircle } from 'lucide-react'
import type { Profile } from '@/content/types'
import { isPendingWhatsapp, whatsappLink } from '@/lib/actions'

/** Botón flotante de WhatsApp. Sin número definido no se muestra. */
export function WhatsAppFloat({ profile }: { profile: Profile }) {
  if (isPendingWhatsapp(profile.whatsapp)) return null
  return (
    <a
      href={whatsappLink(profile)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${profile.name} por WhatsApp`}
      className="no-print fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-[#063b1d] shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  )
}
