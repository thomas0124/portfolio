import type { Metadata, Viewport } from 'next'
import { Quicksand, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-zen-maru-gothic'
})

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
    <html lang="ja" className={`${quicksand.variable} ${zenMaruGothic.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
