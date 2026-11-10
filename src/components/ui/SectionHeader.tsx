import type { SectionCopy } from '@/content/types'
import { cn } from '@/lib/cn'

/** Eyebrow numerado en monoespaciada + título (+ texto). */
export function SectionHeader({
  copy,
  index,
  className,
  as: Heading = 'h2'
}: {
  copy: SectionCopy
  index?: number
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={cn('max-w-2xl', className)} data-reveal>
      <p className="eyebrow">
        {index ? `${String(index).padStart(2, '0')} · ` : '// '}
        {copy.eyebrow}
      </p>
      <Heading className="mt-3 text-3xl font-semibold sm:text-4xl">{copy.title}</Heading>
      {copy.text ? <p className="mt-4 text-lg text-muted">{copy.text}</p> : null}
    </div>
  )
}
