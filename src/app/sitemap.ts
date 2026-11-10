import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/proyectos`, lastModified: now, priority: 0.8 },
    { url: `${siteUrl}/proyectos/video-ia`, lastModified: now, priority: 0.8 },
    { url: `${siteUrl}/cv`, lastModified: now, priority: 0.7 }
  ]
}
