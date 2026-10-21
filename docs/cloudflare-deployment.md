# Cloudflare deployment

Next.js exports the five portfolio routes as HTML/assets into `out/`. Cloudflare
Workers Static Assets serves these files without a Next.js runtime. Only `/api/*`
runs the Worker. The existing pages and contact request format are preserved.

## Verified deployment status (2026-10-21)

Design follow-up: removed the added signature/line-art branding at the user's
request and restored the original visual layout and seasonal background. The
background is capped at 30fps, pauses in hidden tabs and renders a still frame
when reduced motion is requested. Font, static-export and loading improvements remain.
Home's original automatic typing/deleting role display is restored; it pauses in
hidden tabs and shows static text with reduced motion. No signature was reintroduced.

- Public URL: https://thomas-portfolio.qingshuitouzhen.workers.dev
- Deployed version: `0058016d-73cd-463e-a0da-665ff69cce52` (Home and SMTP fixes).
- All five pages, robots, sitemap and both OGP images return 200; an unknown
  route returns 404 and invalid contact/preview requests return 400.
- The current Cloudflare SMTP secrets authenticate successfully using the shared
  mail implementation with native hostname sockets. They were not changed or
  exported during this diagnosis. The earlier `EAUTH` result concerned historical
  credentials and is not the current blocker. Authentication was checked with
  `verify()` in a protected, undeployed version; no email was sent, so actual inbox
  delivery remains unverified.
- Desktop/mobile checks passed on all five production routes, including themes,
  navigation and mocked contact responses; automatic role cycling and reduced
  motion passed. Twelve API/mail regression tests pass.
- Diagnostic preview URLs are disabled (`preview_urls: false`); the probe URL
  returns 404. Temporary probe code was excluded from Git and removed locally.
- GitHub's website URL points to Cloudflare; the Git remote remains GitHub.
- The old Vercel deployment remains intact. `deployment/vercel-redirect/`
  contains a prepared permanent redirect deployment; it has **not** been deployed.
  Complete email verification before redirecting the old site.

See [current publishing evidence](reports/mail-and-publish-2026-10-21.md) and
[documentation sync](reports/sync-docs-2026-10-21-portfolio-publish.md). Earlier
[integration evidence](reports/sync-docs-2026-10-21-portfolio-refresh.md) retains
historical measurements and their limits.

## Local verification

Use Node.js 22 or newer:

```sh
npm ci
npm run lint
npx tsc --noEmit
npm test
npm run build
npx wrangler deploy --dry-run
npm run preview
```

The default public origin is `https://thomas-portfolio.qingshuitouzhen.workers.dev`,
based on the authenticated account's Workers subdomain. For local contact checks,
use `NEXT_PUBLIC_SITE_URL=http://localhost:8787` when building and in `.dev.vars`.
`npm run dev`
is the Next.js UI development server; use `npm run build && npm run preview` to
exercise APIs with assets. Missing mail credentials return 503, never false success.
Copy `.dev.vars.example` to `.dev.vars` for local secrets when testing integration.
The test suite mocks mail delivery and does not send email.

## Production configuration and cutover

1. Authenticate with `npx wrangler login` or provide a scoped
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` through the CI secret store.
2. Confirm a real target hostname in the account. Configure a Workers custom
   domain or use the assigned `workers.dev` hostname; do not guess its suffix.
3. Set `NEXT_PUBLIC_SITE_URL` to that HTTPS origin without a trailing slash in the
   build environment. It drives canonical URLs, OGP URLs, sitemap and robots.
   Set the same `NEXT_PUBLIC_SITE_URL` Worker variable in `wrangler.jsonc` under
   `vars` or through the dashboard. The contact endpoint only accepts this Origin.
4. Transfer the existing SMTP settings as Worker secrets using
   `npx wrangler secret put NAME`: `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`,
   `EMAIL_SERVER_SECURE`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `YOUR_EMAIL`.
   Gmail uses port 587 with STARTTLS (`EMAIL_SERVER_SECURE=false`); implicit TLS
   on port 465 is also supported. Authentication requires the existing app password.
   The Worker uses Node compatibility and Nodemailer with native `net`/`tls`
   hostname sockets supplied through `getSocket`, avoiding Nodemailer's DNS
   preprocessing. Mandatory TLS, certificate/SNI checks, connection/greeting/socket
   timeouts and an overall 15-second deadline remain; cleanup also destroys a
   socket that has not yet been handed to Nodemailer.
   Verify SMTP authentication without
   sending mail before cutover. Do not put secrets in git.
5. Build with the production origin, inspect `out/sitemap.xml` and canonical/OG
   tags in exported pages, then run `npx wrangler deploy --dry-run`.
6. Deploy with `npm run deploy` using that same build environment. Verify `/`,
   `/about`, `/projects`, `/stack`, `/contact`, `/robots.txt`, `/sitemap.xml`, both
   OGP images, theme switching and preview links on the real URL. Check invalid
   contact submissions without sending email; one real delivery is a separate
   manual integration check.
7. Only after the Cloudflare URL is verified, configure the **old Vercel project**
   with a permanent redirect to the confirmed origin, preserving path/query.
   A redirect on Cloudflare cannot redirect traffic that still reaches Vercel.
   Use Vercel project domain redirects or a dedicated redirect-only deployment.
   Do not point the new hostname back to Vercel or enable a reverse redirect.
   Disable/disconnect the old project's automatic production Git deployments
   deliberately so a later push cannot replace the redirect. Record the previous
   integration settings and retain the old deployment for rollback.
8. Keep the previous Vercel deployment until production checks and email
   delivery pass. Roll back by disabling its redirect and restoring DNS if a
   custom hostname moved. Roll back Cloudflare with Workers deployment history.

The Cloudflare deployment is live and current SMTP authentication is verified,
but migration is not complete until actual delivery and the old Vercel redirect
have been verified.
Cloudflare deployment currently uses manual `npm run deploy`; GitHub-to-Cloudflare
automatic deployment is not configured. Frontend CI validates changes only.

## Runtime boundaries

Contact accepts JSON up to 16 KiB, validates a 254-character email and nonempty
message up to 5000 characters, requires the configured Origin, escapes HTML,
and allows three attempts per IP per minute through a Workers rate-limit binding.
Cloudflare's limiter is local to a location and eventually consistent; it is an
abuse deterrent, not a globally exact quota. Direct clients can spoof Origin, so
Origin is combined with limits rather than treated as authentication.

Preview requests permit only the five exact HTTPS origins already used by the
portfolio. Credentials and alternate ports are rejected; every redirect is
revalidated, with at most three redirects, a five-second fetch deadline and a
512 KiB streamed body limit. Preview traffic is limited to 30 requests/IP/minute.
Successful metadata responses have a one-hour browser cache.

Images are optimized as committed static assets. Next's runtime image optimizer
is disabled because no Next server runs in production. Re-optimize source images
when replacing them; do not upload unnecessarily large originals.

References: [Workers static assets](https://developers.cloudflare.com/workers/static-assets/),
[rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/),
[Next.js static export](https://nextjs.org/docs/app/guides/static-exports).
