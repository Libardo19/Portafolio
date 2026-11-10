import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Hero } from '@/components/sections/Hero'
import { Introduction } from '@/components/sections/Introduction'
import { Skills } from '@/components/sections/Skills'
import { JsonLd } from '@/components/seo/JsonLd'
import { getSite } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSite()
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: '/' }
  }
}

export default async function HomePage() {
  const site = await getSite()
  return (
    <>
      <JsonLd profile={site.profile} />
      <Hero hero={site.hero} profile={site.profile} />
      <Introduction introduction={site.introduction} profile={site.profile} />
      <ExperienceTimeline copy={site.sections.experience} items={site.experience} />
      <FeaturedProjects copy={site.sections.projects} projects={site.projects} />
      <Skills
        copy={site.sections.skills}
        groups={site.skills}
        marquee={site.marquee}
        projects={site.projects}
      />
      <Contact copy={site.sections.contact} profile={site.profile} />
    </>
  )
}
