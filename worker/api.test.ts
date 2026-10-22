import assert from 'node:assert/strict'
import { test } from 'node:test'
import nodemailer from 'nodemailer'
import net from 'node:net'
import tls from 'node:tls'
import worker, { allowedUrl, boundedText, escapeHtml, preview } from './index'
import { withMailTransport } from './mail'

const environment = {
  NEXT_PUBLIC_SITE_URL: 'http://localhost:8787',
  ASSETS: { fetch: async () => new Response('asset') },
  CONTACT_LIMITER: { limit: async () => ({ success: true }) },
  PREVIEW_LIMITER: { limit: async () => ({ success: true }) }
}

function contact(body: unknown, origin = 'http://localhost:8787'): Request {
  return new Request('http://localhost:8787/api/contact', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

test('preview origins reject prefixes, credentials, ports, HTTP and private hosts', () => {
  assert.equal(allowedUrl('https://note.com/article'), true)
  for (const url of [
    'https://note.com.evil.test/',
    'https://note.com@evil.test/',
    'https://user@note.com/',
    'https://note.com:444/',
    'http://note.com/',
    'https://127.0.0.1/'
  ]) {
    assert.equal(allowedUrl(url), false, url)
  }
})

test('bounded reader rejects streamed responses over its byte budget', async () => {
  await assert.rejects(boundedText(new Response('あいう').body, 8), /too large/)
  assert.equal(await boundedText(new Response('あいう').body, 9), 'あいう')
})

test('contact rejects cross-origin, malformed and oversized payloads without sending', async () => {
  assert.equal(
    (await worker.fetch(contact({ email: 'a@b.com', message: 'hello' }, 'https://evil.test'), environment)).status,
    403
  )
  for (const body of [
    null,
    { email: 123, message: 'hello' },
    { email: 'bad', message: 'hello' },
    { email: 'a@b.com', message: ' ' },
    { email: 'a@b.com', message: 'a'.repeat(5001) },
    { email: 'a@b.com', message: 'a'.repeat(17000) }
  ]) {
    assert.equal((await worker.fetch(contact(body), environment)).status, 400)
  }
  assert.equal((await worker.fetch(contact({ email: 'a@b.com', message: 'hello' }), environment)).status, 503)
})

test('contact respects binding rate limit and escapes email HTML', async () => {
  const limited = { ...environment, CONTACT_LIMITER: { limit: async () => ({ success: false }) } }
  assert.equal((await worker.fetch(contact({ email: 'a@b.com', message: 'hello' }), limited)).status, 429)
  assert.equal(escapeHtml('<img src=x>&"\' c'), '&lt;img src=x&gt;&amp;&quot;&#39; c')
})

test('preview never follows redirects outside the exact allowlist', async (context) => {
  let count = 0
  context.mock.method(globalThis, 'fetch', async () => {
    count++
    return new Response(null, { status: 302, headers: { Location: 'https://127.0.0.1/private' } })
  })
  assert.equal(
    (await preview(new Request('https://portfolio.test/api/og-preview?url=https://note.com/article'))).status,
    502
  )
  assert.equal(count, 1)
})

test('preview extracts metadata and discards executable image URLs', async (context) => {
  context.mock.method(globalThis, 'fetch', async (_url: unknown, options?: RequestInit) => {
    assert.match(new Headers(options?.headers).get('User-Agent') || '', /portfolio-ogfetch/)
    return new Response(
      '<meta content="A title" property="og:title"><meta property="og:image" content="javascript:alert(1)">',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  })
  const response = await preview(new Request('https://portfolio.test/api/og-preview?url=https://note.com/article'))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { title: 'A title', description: null, image: null, siteName: null })
})

test('contact success sends escaped data only to the configured recipient using a mocked transport', async (context) => {
  let sent: Record<string, unknown> = {}
  let closed = false
  context.mock.method(nodemailer, 'createTransport', () => ({
    sendMail: async (options: Record<string, unknown>) => {
      sent = options
    },
    close: () => {
      closed = true
    }
  }))
  const response = await worker.fetch(contact({ email: 'sender@example.com', message: '<script>alert(1)</script>' }), {
    ...environment,
    EMAIL_SERVER_HOST: 'smtp.example.com',
    EMAIL_SERVER_PORT: '587',
    EMAIL_SERVER_SECURE: 'false',
    EMAIL_SERVER_USER: 'portfolio@example.com',
    EMAIL_SERVER_PASSWORD: 'fixture',
    YOUR_EMAIL: 'owner@example.com'
  })
  assert.equal(response.status, 200)
  assert.equal(sent.to, 'owner@example.com')
  assert.equal(sent.replyTo, 'sender@example.com')
  assert.equal(closed, true)
  assert.match(sent.html as string, /&lt;script&gt;/)
})

test('SMTP deadline closes a stalled transport without waiting for socket timers', async (context) => {
  let closed = false
  context.mock.method(nodemailer, 'createTransport', () => ({
    verify: () => new Promise(() => {}),
    close: () => {
      closed = true
    }
  }))
  await assert.rejects(
    withMailTransport({}, (transport) => transport.verify(), 10),
    /SMTP deadline exceeded/
  )
  assert.equal(closed, true)
})

for (const secure of [false, true]) {
  test(`SMTP uses a hostname socket with verified TLS (implicit TLS: ${secure})`, async (context) => {
    const connection = new net.Socket()
    let closed = false
    let callbacks = 0
    context.mock.method(secure ? tls : net, 'connect', (options: Record<string, unknown>) => {
      assert.equal(options.host, 'smtp.example.com')
      assert.equal(options.port, secure ? 465 : 587)
      if (secure) {
        assert.equal(options.servername, 'smtp.example.com')
        assert.notEqual(options.rejectUnauthorized, false)
      }
      queueMicrotask(() => connection.emit(secure ? 'secureConnect' : 'connect'))
      return connection
    })
    context.mock.method(
      nodemailer,
      'createTransport',
      (options: {
        requireTLS: boolean
        tls: { servername: string }
        getSocket: (
          options: unknown,
          callback: (error: Error | null, result?: { connection: net.Socket; secured: boolean }) => void
        ) => void
      }) => {
        assert.equal(options.requireTLS, true)
        assert.equal(options.tls.servername, 'smtp.example.com')
        return {
          verify: () =>
            new Promise((resolve, reject) => {
              options.getSocket({}, (error, result) => {
                callbacks++
                if (error) return reject(error)
                assert.equal(result?.connection, connection)
                assert.equal(result?.secured, secure)
                connection.emit(secure ? 'secureConnect' : 'connect')
                resolve(true)
              })
            }),
          close: () => {
            closed = true
          }
        }
      }
    )
    assert.equal(
      await withMailTransport(
        {
          EMAIL_SERVER_HOST: 'smtp.example.com',
          EMAIL_SERVER_PORT: secure ? '465' : '587',
          EMAIL_SERVER_SECURE: String(secure)
        },
        (transport) => transport.verify()
      ),
      true
    )
    assert.equal(callbacks, 1)
    assert.equal(closed, true)
    assert.equal(connection.destroyed, true)
  })
}

for (const fails of [false, true]) {
  test(`SMTP closes a socket before handoff on ${fails ? 'connection failure' : 'deadline'}`, async (context) => {
    const connection = new net.Socket()
    let closed = false
    context.mock.method(net, 'connect', () => {
      if (fails) queueMicrotask(() => connection.emit('error', new Error('connection failed')))
      return connection
    })
    context.mock.method(
      nodemailer,
      'createTransport',
      (options: { getSocket: (options: unknown, callback: (error: Error | null) => void) => void }) => ({
        verify: () =>
          new Promise((_resolve, reject) =>
            options.getSocket({}, (error) => {
              if (error) reject(error)
            })
          ),
        close: () => {
          closed = true
        }
      })
    )
    await assert.rejects(
      withMailTransport(
        { EMAIL_SERVER_HOST: 'smtp.example.com', EMAIL_SERVER_PORT: '587' },
        (transport) => transport.verify(),
        10
      ),
      fails ? /connection failed/ : /SMTP deadline exceeded/
    )
    assert.equal(closed, true)
    assert.equal(connection.destroyed, true)
    assert.equal(connection.listenerCount('connect'), 0)
  })
}
