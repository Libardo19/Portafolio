import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'

function ProjectLink({ project }: { project: Project }) {
  if (!project.href) return null
  const external = project.href.startsWith('https://')
  const label = (
    <>
      {project.hrefLabel ?? 'Ver más'}
      <span className="sr-only">: {project.title}</span>
    </>
  )
  const classes = 'inline-flex min-h-11 items-center gap-2 font-semibold text-brand'
  if (external) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </a>
    )
  }
  return (
    <Link href={project.href} className={classes}>
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
      {items.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-xs">
          {tech}
        </li>
      ))}
    </ul>
  )
}

/** Captura en un marco de navegador con la versión de celular encima. */
function Showcase({ project }: { project: Project }) {
  if (!project.image?.src) return null
  const host = project.href?.startsWith('https://') ? new URL(project.href).host : project.title
  return (
    <div className="relative pr-6 pb-8 sm:pr-10">
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_70px_-35px_rgb(0_0_0/0.5)]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="ml-2 truncate rounded-md bg-surface-alt px-2 py-0.5 font-mono text-[11px] text-muted">
            {host}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 40rem, 92vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      {project.imageMobile?.src ? (
        <div className="absolute right-0 bottom-0 w-[24%] min-w-20 overflow-hidden rounded-[1.1rem] border-4 border-ink bg-ink shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2">
          <div className="relative aspect-[9/19.5]">
            <Image
              src={project.imageMobile.src}
              alt={project.imageMobile.alt}
              fill
              sizes="10rem"
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : null}
      {project.imageNote ? (
        <p className="absolute -bottom-1 left-0 max-w-[70%] text-xs text-muted">
          {project.imageNote}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Proyecto. Con captura se pinta como vitrina ancha (captura + texto); sin ella, como tarjeta.
 * Ambas se levantan al pasar el puntero y el borde lo sigue (spotlight).
 */
export function ProjectCard({
  project,
  index = 0,
  headingLevel = 'h3',
  reverse = false,
  full = false
}: {
  project: Project
  index?: number
  headingLevel?: 'h2' | 'h3'
  /** Vitrina con la captura a la derecha (para alternar entre vitrinas seguidas). */
  reverse?: boolean
  /** Tarjeta sin captura que ocupa toda la fila. */
  full?: boolean
}) {
  const Heading = headingLevel
  const wide = Boolean(project.image?.src)
  return (
    <article
      id={project.slug}
      className={cn(
        'spotlight group scroll-mt-24 rounded-card border border-line bg-card p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:p-7',
        wide
          ? cn(
              'grid items-center gap-8 md:col-span-full lg:gap-12 lg:p-10',
              reverse ? 'lg:grid-cols-[1fr_1.25fr]' : 'lg:grid-cols-[1.25fr_1fr]'
            )
          : cn('flex flex-col gap-4', full && 'md:col-span-full')
      )}
      data-reveal
      style={{ '--reveal-delay': index * 90 } as CSSProperties}
    >
      {wide ? (
        <div className={cn(reverse && 'lg:order-2')}>
          <Showcase project={project} />
        </div>
      ) : null}
      <div className={cn('flex flex-col gap-4', !wide && 'flex-1')}>
        <p className="font-mono text-xs text-muted">{project.context}</p>
        <Heading className={cn('font-semibold', wide ? 'text-3xl' : 'text-2xl')}>
          {project.title}
        </Heading>
        <p className="flex-1 text-muted">{project.summary}</p>
        {wide ? (
          <ul className="space-y-1.5 text-[15px] text-muted">
            {project.description.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-brand" />
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        <Stack items={project.stack} />
        <ProjectLink project={project} />
      </div>
    </article>
  )
}
