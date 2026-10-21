import nodemailer from 'nodemailer'
import net from 'node:net'
import tls from 'node:tls'

export type MailSettings = {
  EMAIL_SERVER_HOST?: string
  EMAIL_SERVER_PORT?: string
  EMAIL_SERVER_SECURE?: string
  EMAIL_SERVER_USER?: string
  EMAIL_SERVER_PASSWORD?: string
  YOUR_EMAIL?: string
}

export async function withMailTransport<Result>(
  settings: MailSettings,
  operation: (transport: ReturnType<typeof nodemailer.createTransport>) => Promise<Result>,
  timeout = 15000
): Promise<Result> {
  const host = settings.EMAIL_SERVER_HOST
  const port = Number(settings.EMAIL_SERVER_PORT)
  const secure = settings.EMAIL_SERVER_SECURE === 'true'
  let cleanupSocket: (() => void) | undefined
  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: true,
    tls: { servername: host },
    getSocket: (_options, callback) => {
      const connection = secure ? tls.connect({ host, port, servername: host }) : net.connect({ host, port })
      const readyEvent = secure ? 'secureConnect' : 'connect'
      let settled = false
      const onError = (error: Error) => {
        if (settled) return
        settled = true
        connection.removeListener(readyEvent, onReady)
        callback(error, undefined)
      }
      const onReady = () => {
        if (settled) return
        settled = true
        callback(null, { connection, secured: secure })
      }
      connection.once('error', onError)
      connection.once(readyEvent, onReady)
      cleanupSocket = () => {
        settled = true
        connection.removeListener(readyEvent, onReady)
        connection.removeListener('error', onError)
        connection.destroy()
      }
    },
    auth: { user: settings.EMAIL_SERVER_USER, pass: settings.EMAIL_SERVER_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true
  })
  let deadline: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      operation(transport),
      new Promise<never>((_resolve, reject) => {
        deadline = setTimeout(() => reject(new Error('SMTP deadline exceeded')), timeout)
      })
    ])
  } finally {
    clearTimeout(deadline)
    transport.close()
    cleanupSocket?.()
  }
}
