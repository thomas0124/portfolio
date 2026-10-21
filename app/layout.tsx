import type { Metadata, Viewport } from 'next'
import { Quicksand, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { siteUrl } from '@/lib/site'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700'],
  preload: false,
  subsets: ['latin'],
  variable: '--font-zen-maru-gothic'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: "thomas's portfolio",
  description: 'Shimizu Toma - Software Developer Portfolio',
  openGraph: {
    type: 'website',
    title: "thomas's portfolio",
    description: 'Shimizu Toma - Software Developer Portfolio',
    url: siteUrl,
    siteName: "thomas's portfolio",
    images: [
      {
        url: '/opengraph-image.png',
        width: 630,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Tomas_engineer',
    title: "thomas's portfolio",
    description: 'Shimizu Toma - Software Developer Portfolio',
    images: ['/twitter-image.png']
  }
}

export const viewport: Viewport = {
  themeColor: '#FAF7F2'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${quicksand.variable} ${zenMaruGothic.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
