import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto-sans-jp' })

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-thomas0124.vercel.app/'),
  title: "thomas's portfolio",
  description: 'Shimizu Toma - Software Developer Portfolio',
  openGraph: {
    type: 'website',
    title: "thomas's portfolio",
    description: 'Shimizu Toma - Software Developer Portfolio',
    url: 'https://portfolio-thomas0124.vercel.app/',
    siteName: "thomas's portfolio",
    images: [
      {
        url: 'https://portfolio-thomas0124.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Tomas_engineer',
    title: "thomas's portfolio",
    description: 'Shimizu Toma - Software Developer Portfolio',
    images: ['https://portfolio-thomas0124.vercel.app/twitter-image.png']
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
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
