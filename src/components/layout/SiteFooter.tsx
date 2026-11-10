import type { Site } from '@/content/types'

export function SiteFooter({ site }: { site: Site }) {
  const { profile } = site
  return (
    <footer className="no-print border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.fullName} · {profile.role}
        </p>
        <ul className="flex gap-5">
          {profile.social.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
