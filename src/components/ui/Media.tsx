import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import type { ImageRef } from '@/content/types'
import { cn } from '@/lib/cn'

/**
 * Imagen con proporción fija. Sin `src` pinta un marcador honesto con la foto que falta:
 * en una propuesta nunca se usa stock que parezca del cliente.
 */
export function Media({
  image,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false
}: {
  image: ImageRef
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!image.src) {
    return (
      <div
        role="img"
        aria-label={`Foto pendiente: ${image.pending ?? image.alt}`}
        data-pending-image
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-line bg-surface-alt p-6 text-center',
          className
        )}
      >
        <div className="flex max-w-56 flex-col items-center gap-3 text-muted">
          <ImageIcon className="size-8" aria-hidden />
          <p className="text-sm leading-snug">
            <span className="font-semibold text-ink">Foto pendiente</span>
            <br />
            {image.pending ?? image.alt}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden rounded-card bg-surface-alt', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}
