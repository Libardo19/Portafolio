import Link from 'next/link'
import { Cloud, Database, GitBranch, LayoutTemplate, Server, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Project, SectionCopy, SkillGroup, SkillIcon } from '@/content/types'
import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/ui/SectionHeader'

const icons: Record<SkillIcon, typeof Server> = {
  server: Server,
  database: Database,
  layout: LayoutTemplate,
  cloud: Cloud,
  sparkles: Sparkles,
  git: GitBranch
}

const spans = { 2: 'lg:col-span-2', 3: 'md:col-span-2 lg:col-span-3' } as const

/** Enlace al proyecto: el caso de estudio si lo tiene, si no, su tarjeta en /proyectos. */
const projectHref = (project: Project) =>
  project.href?.startsWith('/') ? project.href : `/proyectos#${project.slug}`

/**
 * Habilidades en cuadrícula tipo bento: cada área dice qué hago con ella y en qué proyectos
 * la usé (sin porcentajes ni niveles inventados). Arriba, la cinta de tecnologías en bucle,
 * decorativa: las tarjetas repiten su contenido.
 */
export function Skills({
  copy,
  groups,
  marquee,
  projects
}: {
  copy: SectionCopy
  groups: SkillGroup[]
  marquee: string[]
  projects: Project[]
}) {
  const loop = [...marquee, ...marquee]
  const bySlug = new Map(projects.map((project) => [project.slug, project]))

  return (
    <section id="habilidades" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader copy={copy} index={4} />
      </div>

      <div className="marquee mt-12 overflow-hidden border-y border-line py-5" aria-hidden>
        <ul className="marquee-track">
          {loop.map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              className="flex items-center gap-8 pr-8 font-display text-2xl font-semibold whitespace-nowrap text-muted sm:text-3xl"
            >
              {tech}
              <span className="text-brand">/</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => {
          const Icon = icons[group.icon]
          const used = (group.usedIn ?? [])
            .map((slug) => bySlug.get(slug))
            .filter((project): project is Project => Boolean(project))
          return (
            <article
              key={group.title}
              className={cn(
                'spotlight group flex flex-col gap-5 rounded-card border border-line bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7',
                group.span && spans[group.span]
              )}
              data-reveal
              style={{ '--reveal-delay': (index % 3) * 90 } as CSSProperties}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-alt text-brand transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{group.summary}</p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[13px] transition-colors group-hover:border-brand/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {used.length ? (
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-sm">
                  <span className="font-mono text-xs text-muted">Usado en</span>
                  {used.map((project) => (
                    <Link
                      key={project.slug}
                      href={projectHref(project)}
                      className="inline-flex min-h-8 items-center font-semibold text-brand underline-offset-4 hover:underline"
                    >
                      {project.shortTitle ?? project.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
