import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project, SectionCopy } from '@/content/types'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { placeProjects } from '@/lib/projects'
import { ProjectCard } from './ProjectCard'

export function FeaturedProjects({ copy, projects }: { copy: SectionCopy; projects: Project[] }) {
  const featured = placeProjects(projects.filter((project) => project.featured))
  return (
    <section id="proyectos" className="border-y border-line bg-surface-alt">
      <div className="container-page py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader copy={copy} index={3} />
          <Link
            href="/proyectos"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand"
            data-reveal
          >
            Ver todos los proyectos
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map(({ project, reverse, full }, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index % 2}
              reverse={reverse}
              full={full}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
