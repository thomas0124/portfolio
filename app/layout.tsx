import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'thomas’s portfolio',
  description: 'トーマスのポートフォリオ'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <meta property="og:type" content="website" />
      <meta property="og:title" content="thomas's portfolio" />
      <meta property="og:description" content="トーマスのポートフォリオ" />
      <meta property="og:url" content="https://portfolio-thomas0124.vercel.app/" />
      <meta property="og:site_name" content="thomas's portfolio" />
      <meta property="og:image" content="https://portfolio-thomas0124.vercel.app/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="twitter:title" content="thomas's portfolio" />
      <meta property="twitter:description" content="トーマスのポートフォリオ" />
      <meta property="twitter:image" content="https://portfolio-thomas0124.vercel.app/twitter-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Tomas_engineer" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
