import { defaultSiteUrl } from '../lib/site-defaults'
import { withMailTransport, type MailSettings } from './mail'

type Environment = Omit<Cloudflare.Env, 'ASSETS'> & {
  ASSETS: Pick<Cloudflare.Env['ASSETS'], 'fetch'>
} & MailSettings

const allowedOrigins = new Set([
  'https://note.com',
  'https://jphacks.com',
  'https://hacku.yahoo.co.jp',
  'https://www.meijo-u.ac.jp',
  'https://dmm-corp.com'
])

export function allowedUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return allowedOrigins.has(url.origin) && !url.username && !url.password
  } catch {
    return false
  }
}

export async function boundedText(body: ReadableStream<Uint8Array> | null, limit: number): Promise<string> {
  if (!body) return ''
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let result = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return result + decoder.decode()
      size += value.byteLength
      if (size > limit) throw new Error('body too large')
      result += decoder.decode(value, { stream: true })
    }
  } finally {
    await reader.cancel()
    reader.releaseLock()
  }
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character]!
  )
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function contact(request: Request, env: Environment): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } })
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl
  if (request.headers.get('Origin') !== siteUrl) return json({ message: '送信元を確認できません。' }, 403)
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ message: 'JSON形式で送信してください。' }, 415)
  }
  const { success } = await env.CONTACT_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'local' })
  if (!success) return json({ message: '時間をおいて再度お試しください。' }, 429)
  let payload: unknown
  try {
    payload = JSON.parse(await boundedText(request.body, 16384))
  } catch {
    return json({ message: '送信内容を確認してください。' }, 400)
  }
  if (!payload || typeof payload !== 'object' || !('email' in payload) || !('message' in payload)) {
    return json({ message: 'メールアドレスとメッセージは必須です。' }, 400)
  }
  const { email, message } = payload
  if (
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    email.length > 254 ||
    !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email) ||
    !message.trim() ||
    message.length > 5000
  ) {
    return json({ message: '有効なメールアドレスと5000文字以内のメッセージを入力してください。' }, 400)
  }
  const port = Number(env.EMAIL_SERVER_PORT)
  if (
    !env.EMAIL_SERVER_HOST ||
    ![465, 587].includes(port) ||
    !env.EMAIL_SERVER_USER ||
    !env.EMAIL_SERVER_PASSWORD ||
    !env.YOUR_EMAIL
  ) {
    return json({ message: '現在お問い合わせを送信できません。時間をおいて再度お試しください。' }, 503)
  }
  try {
    await withMailTransport(env, (transporter) =>
      transporter.sendMail({
        from: { name: 'お問い合わせフォーム', address: env.EMAIL_SERVER_USER },
        to: env.YOUR_EMAIL,
        replyTo: email,
        subject: 'ウェブサイトからの新しいメッセージ',
        text: `送信者: ${email}\n\n${message}`,
        html: `<p>送信者: ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
      })
    )
    return json({ message: '送信成功' })
  } catch {
    return json({ message: 'メッセージ送信中にエラーが発生しました。' }, 502)
  }
}

function extractMeta(html: string, property: string): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const attributes = Object.fromEntries(
      Array.from(tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g), (match) => [match[1].toLowerCase(), match[2]])
    )
    if (attributes.property === property || attributes.name === property) return attributes.content?.trim() || null
  }
  return null
}

export async function preview(request: Request): Promise<Response> {
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } })
  let target = new URL(request.url).searchParams.get('url') || ''
  if (!allowedUrl(target)) return json({ error: 'invalid url' }, 400)
  const signal = AbortSignal.timeout(5000)
  try {
    for (let redirects = 0; redirects <= 3; redirects++) {
      const response = await fetch(target, {
        redirect: 'manual',
        signal,
        headers: { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-ogfetch/1.0)' }
      })
      if (response.status >= 300 && response.status < 400) {
        await response.body?.cancel()
        const location = response.headers.get('location')
        if (!location) throw new Error('missing location')
        target = new URL(location, target).href
        if (!allowedUrl(target)) return json({ error: 'invalid redirect' }, 502)
        continue
      }
      if (!response.ok || !response.headers.get('content-type')?.toLowerCase().includes('text/html')) {
        await response.body?.cancel()
        return json({ error: 'fetch failed' }, 502)
      }
      const html = await boundedText(response.body, 512 * 1024)
      const imageValue = extractMeta(html, 'og:image')
      let image: string | null = null
      if (imageValue) {
        const candidate = new URL(imageValue, target)
        if (candidate.protocol === 'https:' && !candidate.username && !candidate.password) image = candidate.href
      }
      return Response.json(
        {
          title: extractMeta(html, 'og:title') || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || null,
          description: extractMeta(html, 'og:description') || extractMeta(html, 'description'),
          image,
          siteName: extractMeta(html, 'og:site_name')
        },
        { headers: { 'Cache-Control': 'public, max-age=3600' } }
      )
    }
    return json({ error: 'too many redirects' }, 502)
  } catch {
    return json({ error: 'fetch failed' }, 502)
  }
}

const worker = {
  async fetch(request: Request, env: Environment): Promise<Response> {
    const path = new URL(request.url).pathname
    if (path === '/api/contact') return contact(request, env)
    if (path === '/api/og-preview') {
      const { success } = await env.PREVIEW_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'local' })
      return success ? preview(request) : json({ error: 'too many requests' }, 429)
    }
    if (path.startsWith('/api/')) return json({ error: 'not found' }, 404)
    return env.ASSETS.fetch(request)
  }
}

export default worker
