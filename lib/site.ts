import { defaultSiteUrl } from './site-defaults'

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl
const parsedOrigin = new URL(configuredOrigin)

if (
  parsedOrigin.pathname !== '/' ||
  parsedOrigin.search ||
  parsedOrigin.hash ||
  parsedOrigin.username ||
  parsedOrigin.password ||
  !(parsedOrigin.protocol === 'https:' || (parsedOrigin.protocol === 'http:' && parsedOrigin.hostname === 'localhost'))
) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin (localhost is allowed for development)')
}

export const siteUrl = parsedOrigin.origin
