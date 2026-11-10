import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowLeft } from 'lucide-react'
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram'
import { getSite } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { caseStudy } = await getSite()
  return {
    title: `${caseStudy.title} · Caso de estudio`,
    description: caseStudy.lead,
    alternates: { canonical: `/proyectos/${caseStudy.slug}` }
  }
}

export default async function CaseStudyPage() {
  const { caseStudy } = await getSite()
  return (
    <article className="container-page py-16 sm:py-24">
      <Link
        href="/proyectos"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Todos los proyectos
      </Link>

      <header className="mt-6 max-w-3xl" data-reveal>
        <p className="eyebrow">
          {'// '}
          {caseStudy.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{caseStudy.title}</h1>
        <p className="mt-5 text-xl text-muted">{caseStudy.lead}</p>
      </header>

      <div className="mt-12" data-reveal>
        <ArchitectureDiagram caption={caseStudy.note} />
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]" aria-labelledby="reto">
        <h2 id="reto" className="text-3xl font-semibold" data-reveal>
          El reto
        </h2>
        <div className="space-y-4 text-lg text-muted" data-reveal>
          {caseStudy.context.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="decisiones">
        <h2 id="decisiones" className="text-3xl font-semibold" data-reveal>
          Decisiones de diseño
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudy.decisions.map((decision, index) => (
            <li
              key={decision.title}
              className="spotlight rounded-card border border-line bg-card p-6"
              data-reveal
              style={{ '--reveal-delay': (index % 3) * 90 } as CSSProperties}
            >
              <p className="font-mono text-sm text-brand">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-xl font-semibold">{decision.title}</h3>
              <p className="mt-2 text-muted">{decision.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]" aria-labelledby="resultado">
        <h2 id="resultado" className="text-3xl font-semibold" data-reveal>
          Resultado
        </h2>
        <div data-reveal>
          {caseStudy.result.map((paragraph) => (
            <p key={paragraph} className="text-lg text-muted">
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
            {caseStudy.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-card px-2.5 py-1 font-mono text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
