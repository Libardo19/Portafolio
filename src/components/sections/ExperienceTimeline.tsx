import type { CSSProperties } from 'react'
import type { Experience, SectionCopy } from '@/content/types'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Línea de tiempo: el riel se dibuja con el scroll y cada puesto entra al aparecer. */
export function ExperienceTimeline({ copy, items }: { copy: SectionCopy; items: Experience[] }) {
  return (
    <section id="experiencia" className="container-page py-20 sm:py-28">
      <SectionHeader copy={copy} index={2} />
      <ol className="relative mt-14 space-y-12 pl-8 sm:pl-10">
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-line" />
        <span
          aria-hidden
          className="timeline-rail absolute top-2 bottom-2 left-[5px] w-0.5 bg-brand"
        />
        {items.map((item, index) => (
          <li
            key={`${item.company}-${item.role}`}
            className="relative grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8"
            data-reveal
            style={{ '--reveal-delay': index * 80 } as CSSProperties}
          >
            <span
              aria-hidden
              className={`absolute top-2 -left-8 size-3 rounded-full ring-4 ring-surface sm:-left-10 ${item.current ? 'bg-brand' : 'bg-line'}`}
            />
            <p className="font-mono text-sm text-muted">{item.period}</p>
            <div>
              <h3 className="text-xl font-semibold">
                {item.role} <span className="text-brand">· {item.company}</span>
              </h3>
              <p className="mt-2 text-muted">{item.summary}</p>
              <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-brand" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
