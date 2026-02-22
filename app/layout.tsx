import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-thomas0124.vercel.app/'),
  title: 'thomas’s portfolio',
  description: 'トーマスのポートフォリオ',
  openGraph: {
    type: 'website',
    title: "thomas's portfolio",
    description: 'トーマスのポートフォリオ',
    url: 'https://portfolio-thomas0124.vercel.app/',
    siteName: "thomas's portfolio",
    images: [
      {
        url: 'https://portfolio-thomas0124.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Tomas_engineer',
    title: "thomas's portfolio",
    description: 'トーマスのポートフォリオ',
    images: ['https://portfolio-thomas0124.vercel.app/twitter-image.png'],
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
