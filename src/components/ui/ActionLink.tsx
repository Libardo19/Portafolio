import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Download, MessageCircle } from 'lucide-react'
import type { Action, Profile } from '@/content/types'
import { cn } from '@/lib/cn'
import { isDownload, isExternal, isPendingWhatsapp, resolveAction } from '@/lib/actions'

type Variant = 'primary' | 'secondary'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-on-brand hover:opacity-90',
  secondary: 'border border-line bg-card text-ink hover:border-brand'
}

/** Botón magnético que resuelve `whatsapp`, `email`, `cv`, rutas internas o URLs. */
export function ActionLink({
  action,
  profile,
  variant = 'primary',
  className
}: {
  action: Action
  profile: Profile
  variant?: Variant
  className?: string
}) {
  // Sin número no hay botón de WhatsApp: un botón que dice WhatsApp y no abre WhatsApp engaña.
  if (action.to === 'whatsapp' && isPendingWhatsapp(profile.whatsapp)) return null
  const href = resolveAction(action.to, profile)
  const external = isExternal(href)
  const download = isDownload(href)
  const isWhatsapp = href.startsWith('https://wa.me/')
  const classes = cn(
    'magnetic inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors',
    variants[variant],
    className
  )

  const Icon =
    action.to === 'cv' || download
      ? Download
      : isWhatsapp || action.to === 'whatsapp'
        ? MessageCircle
        : external
          ? ArrowUpRight
          : ArrowRight
  const icon = <Icon className="size-4" aria-hidden />

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: '' } : {})}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {action.label}
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {action.label}
      {icon}
    </Link>
  )
}
