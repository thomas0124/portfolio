# Test report: Portfolio refresh

- Date: 2026-10-21
- Plan: `docs/plans/active/2026-10-20-portfolio-refresh.md`
- Tester: Codex tester subagent
- Scope: Worker API behaviors and local Cloudflare runtime browser/HTTP smoke checks.
- Evidence: `docs/evidence/test-2026-10-21-portfolio-refresh.log`

## Test execution

| Command | Result | Details |
| --- | --- | --- |
| `npm test` | PASS | 8 tests passed, 0 failed/skipped; 128 ms test duration. |
| `./scripts/run-test.sh` | PASS | Harness test entrypoint reran all 8 API tests successfully; 161 ms test duration. |
| `node /tmp/portfolio-smoke.cjs http://localhost:8787` | PASS | Five routes at 1440px and 390px; interactive controls, mock contact success/error, reduced motion, and homepage without JavaScript. |
| Inline Node fetch assertions against localhost:8787 | PASS after correcting test URL | Unknown page/API return 404; canonical and OGP use configured origin; both OGP images, robots and sitemap return 200; all seven experience previews return 200 with titles. |
| `node /tmp/portfolio-audit.cjs http://localhost:8787 /tmp/portfolio-test-final` | PASS | HTTP 200, no browser exceptions; local observation: LCP 124 ms, CLS 0, 22 subresources, 307141 encoded subresource bytes. |

## Coverage

- API normal paths: metadata extraction and successful contact with mocked mail transport.
- API error/regression paths: forbidden origins/redirects, invalid and oversized payloads, streaming byte limits, rate limiting, HTML escaping, unsafe preview image schemes, stalled SMTP deadline closure.
- Browser: initial text, no overflow, no Canvas or perpetual animations under reduced motion, role/portrait interactions, mobile menu, theme toggle, successful form reset and failure input retention.
- HTTP: metadata origin, accessible images, sitemap/robots, page/API 404, and all seven real experience-link previews including DMM.
- Statement/branch/function coverage percentages were not collected.

## Failure analysis

The initial ad-hoc HTTP check requested `/ogp-image.png`, an incorrect test assumption; the emitted metadata references `/opengraph-image.png`. The incorrect path returned 404 as expected for a nonexistent asset. The corrected request passed. No application change was required. Both outputs are preserved in the evidence log.

## Test gaps

- Actual email delivery is unverified: all form submission checks intercepted the endpoint or mocked transport. Parent reported existing Gmail authentication failure; credential replacement and subsequent authentication/delivery verification remain outstanding. No real email was sent.
- This run targets local Wrangler, not the deployed production URL; deployment, live bindings, secrets and legacy Vercel redirection require production checks.
- Performance figures are a single unthrottled localhost observation, not production Core Web Vitals or a mobile performance score.
- Chromium only; no Safari/Firefox or screen-reader testing. Browser scripts/screenshots remain temporary artifacts in `/tmp`.
- Static verification and full `./scripts/run-verify.sh` belong to parent/verifier and were not run by this tester.

## Verdict

PASS for executed behavioral tests. No failing application test remains. Production contact delivery is blocked on valid credentials and must not be claimed operational based on these mock-based tests.
