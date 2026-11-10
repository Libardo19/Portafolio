import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { PrintButton } from '@/components/cv/PrintButton'
import { ActionLink } from '@/components/ui/ActionLink'
import { getSite } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSite()
  return {
    title: pages.cv.seo.title,
    description: pages.cv.seo.description,
    alternates: { canonical: '/cv' }
  }
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[12rem_1fr] print:break-inside-avoid">
      <h2 className="font-mono text-sm font-medium text-brand uppercase">{title}</h2>
      <div>{children}</div>
    </section>
  )
}

/** CV en web: mismo contenido que la home, ordenado para leer e imprimir. */
export default async function CvPage() {
  const { profile, pages, cv, experience, projects, skills } = await getSite()
  return (
    <div className="container-page max-w-4xl py-16 sm:py-24 print:py-0">
      <header className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div>
          <p className="eyebrow">
            {'// '}
            {pages.cv.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{profile.fullName}</h1>
          <p className="mt-2 text-xl text-muted">
            {profile.role} · {profile.city}
          </p>
          <p className="mt-2 text-sm text-muted">
            {[profile.email, ...profile.social.map((item) => item.url.replace('https://', ''))]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        <div className="no-print">
          {profile.cvPdf ? (
            <ActionLink action={{ label: 'Descargar PDF', to: 'cv' }} profile={profile} />
          ) : (
            <PrintButton label="Guardar como PDF" />
          )}
        </div>
      </header>

      <div className="mt-12 space-y-10" data-reveal>
        <Block title="Perfil">
          <p className="text-muted">{cv.summary}</p>
        </Block>

        <Block title="Experiencia">
          <ul className="space-y-6">
            {experience.map((item) => (
              <li key={`${item.company}-${item.role}`}>
                <p className="font-semibold">
                  {item.role} · {item.company}
                </p>
                <p className="font-mono text-sm text-muted">{item.period}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Proyectos">
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <p className="font-semibold">
                  {project.title}{' '}
                  <span className="font-normal text-muted">· {project.context}</span>
                </p>
                <p className="text-muted">{project.summary}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Habilidades">
          <dl className="space-y-2">
            {skills.map((group) => (
              <div key={group.title}>
                <dt className="inline font-semibold">{group.title}: </dt>
                <dd className="inline text-muted">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Educación">
          <ul className="space-y-2">
            {cv.education.map((item) => (
              <li key={item.title}>
                <p className="font-semibold">{item.title}</p>
                <p className="text-muted">
                  {item.place} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Idiomas">
          <ul className="space-y-1 text-muted">
            {cv.languages.map((language) => (
              <li key={language.name}>
                <span className="font-semibold text-ink">{language.name}:</span> {language.level}
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  )
}
