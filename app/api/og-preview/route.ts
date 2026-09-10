import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://note.com',
  'https://jphacks.com',
  'https://hacku.yahoo.co.jp',
  'https://www.meijo-u.ac.jp',
  'https://dmm-corp.com',
]

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    return ALLOWED_ORIGINS.some((origin) => url.startsWith(origin))
  } catch {
    return false
  }
}

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i'),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return match[1].trim()
  }
  return null
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; portfolio-ogfetch/1.0)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'fetch failed' }, { status: 502 })
    }

    const html = await res.text()

    const title =
      extractMeta(html, 'og:title') ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      null
    const description =
      extractMeta(html, 'og:description') || extractMeta(html, 'description') || null
    const image = extractMeta(html, 'og:image') || null
    const siteName = extractMeta(html, 'og:site_name') || null

    return NextResponse.json(
      { title, description, image, siteName },
      { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 })
  }
}
