import Link from 'next/link'
import type { Site } from '@/content/types'
import { ThemeToggle } from '@/components/motion/ThemeToggle'
import { MobileMenu } from './MobileMenu'

export function SiteHeader({ site }: { site: Site }) {
  const { profile, nav } = site
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-lg font-medium"
          aria-label={`${profile.name}, inicio`}
        >
          {profile.name.toLowerCase()}
          <span className="text-brand">_</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  )
}
