# Cloudflare migration walkthrough

## Static frontend

`next.config.mjs` exports the five existing pages as static assets. Next.js is
updated to 15.5.28; deployment does not run a Next.js server. Homepage loading and
opacity gates are removed. Japanese font preloading/weights and image assets are
reduced; copy, routes, palette and rounded layout remain intact. The original
seasonal canvas artwork is retained with reduced-motion, visibility and 30fps
controls. The original automatic Home role typewriter is restored without Framer
Motion or a loading gate. The rejected signature is not included.

## Metadata and hosting

`lib/site.ts` centralizes the public origin for canonical links, OGP, sitemap and
robots. Image dimensions reflect the actual square OGP composition.
`wrangler.jsonc` serves `out/` directly and routes only `/api/*` through the Worker.
The confirmed production URL is
https://thomas-portfolio.qingshuitouzhen.workers.dev. GitHub's website field points
to it; the Git remote remains GitHub. Version preview URLs are disabled after
temporary SMTP diagnostics. Deployment is manual, not triggered by Git push.

## APIs and mail

`worker/index.ts` replaces Next.js route handlers. Contact applies origin checks,
bounded JSON input, field validation, HTML escaping and per-IP rate limits.
External preview fetching uses exact origins, revalidated redirects and bounded
time/body size. Contact toasts show success/failure and preserve failed messages.

`worker/mail.ts` retains Gmail SMTP settings as Cloudflare secrets. Native
hostname sockets avoid the Nodemailer connection-preparation failure reproduced
on Cloudflare. TLS validation and SNI remain enabled; STARTTLS is mandatory and
timeouts close sockets even before handoff. The user's updated credentials were
preserved and authenticate successfully. No real email was sent by validation.

## Verification and hand-off

Twelve API/mail tests cover validation, preview restrictions, mocked delivery,
timeouts and hostname/TLS socket lifecycles. Static verification, production
build, Worker dry run and desktop/mobile browser smoke checks pass. Follow-up
reports have the `portfolio-publish` suffix; earlier reports record historical
measurements and their limitations.

The old Vercel deployment remains available. Redirect configuration is prepared
but intentionally inactive until real inbox delivery is checked. Dependency audit
debt is recorded separately; it is not hidden by a forced lockfile upgrade.
The PR targets `develop` for human review and merge.
