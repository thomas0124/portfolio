import type { Metadata } from 'next'

export function pageMetadata(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: "thomas's portfolio",
      description: 'Shimizu Toma - Software Developer Portfolio',
      url: path,
      siteName: "thomas's portfolio",
      images: [{ url: '/opengraph-image.png', width: 630, height: 630 }]
    }
  }
}
