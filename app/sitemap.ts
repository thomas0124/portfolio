import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/about', '/projects', '/stack', '/contact'].map((path) => ({
    url: `${siteUrl}${path}`
  }))
}
