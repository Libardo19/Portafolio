import type { Metadata } from 'next'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSite } from '@/lib/content'
import { placeProjects } from '@/lib/projects'

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSite()
  return {
    title: pages.projects.seo.title,
    description: pages.projects.seo.description,
    alternates: { canonical: '/proyectos' }
  }
}

export default async function ProjectsPage() {
  const { pages, projects } = await getSite()
  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeader
        as="h1"
        copy={{
          eyebrow: pages.projects.eyebrow,
          title: pages.projects.title,
          text: pages.projects.text
        }}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {placeProjects(projects).map(({ project, reverse, full }, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index % 2}
            headingLevel="h2"
            reverse={reverse}
            full={full}
          />
        ))}
      </div>
    </div>
  )
}
