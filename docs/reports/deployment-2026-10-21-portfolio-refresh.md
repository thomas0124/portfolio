# Portfolio deployment evidence

## Published

- URL: https://thomas-portfolio.qingshuitouzhen.workers.dev
- Worker: `thomas-portfolio`
- Initial deployment version: `21833c0f-3399-4aeb-a7dd-98d0626d5058` (subsequent secret upload creates a newer version).
- `wrangler deploy` succeeded: 343 assets uploaded, Worker gzip 97.99 KiB, startup 15 ms.
- Six existing SMTP settings transferred from the authenticated Vercel portfolio project through memory and Wrangler stdin. No plaintext credentials saved in the repository or printed.

## Verification

- Clean dependency install: `npm ci --ignore-scripts` passed. Lifecycle hooks intentionally not exercised by this install.
- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm test` (8 cases), `./scripts/run-verify.sh` and Worker dry-run passed.
- Production `/`, `/about`, `/projects`, `/stack`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image.png`, `/twitter-image.png`: HTTP 200. Unknown route: HTTP 404.
- Exported production HTML uses the Cloudflare origin, not the old Vercel origin.
- Invalid contact payload and disallowed preview origin: HTTP 400 without sending mail.
- Chromium at 1440×1000 and 390×844: all five routes render, no horizontal overflow or uncaught JavaScript errors. Role and portrait reactions, menu, dark theme, reduced motion and JavaScript-disabled homepage passed.
- Contact success/error UI and preservation of failed input passed using mocked responses. No email was sent.
- Local previews for existing links passed, including DMM after restoring the original crawler User-Agent; without that header DMM returned HTTP 404.

## Performance observation

Single fresh Chromium contexts on the same desktop, without network or CPU throttling. These are observations, not field Core Web Vitals or Lighthouse scores. Resource totals below use `PerformanceResourceTiming.encodedBodySize`, excluding the main HTML document; they include browser prefetches and depend on viewport and browsing behavior.

| Measure | Original Vercel | Cloudflare |
| --- | ---: | ---: |
| Resource bytes | 8,438,256 | 283,954 |
| Resource requests | 502 | 22 |
| LCP | 2,260 ms | 816 ms |
| CLS | 0.00244 | 0 |

Original font requests accounted for 8,184,144 bytes across 478 requests. Reduced Japanese weights and disabling their indiscriminate preloading are the principal transfer reduction. The profile WebP is 30,478 bytes; the original runtime-optimized image was 11,296 bytes, so the improvement is not attributed to that image. Both square OGP assets decreased from 1,447,961 to 149,726 bytes and metadata now reflects their actual 630×630 dimensions.

## Outstanding external work

- SMTP authentication fails with `EAUTH / AUTH PLAIN` both in Node and workerd using the existing Gmail credentials. `verify()` establishes runtime compatibility but does not establish deliverability; no real delivery test performed. The user has been asked to update the Gmail app password in the existing Vercel production setting, without pasting it into chat.
- Cloudflare serves the new site. The old Vercel site remains unchanged; the prepared `deployment/vercel-redirect/` has not been deployed while mail authentication remains unresolved.
- Cloudflare automatic Git deployment is not configured; use the documented `npm run deploy` path.
- Changes remain uncommitted in the task worktree. No PR or merge was created. The original checkout is clean.
