# Portfolio refresh

Branch: perf/portfolio-refresh
Related issue: N/A

## Objective
Preserve all portfolio copy, routes, warm palette and rounded layout while making content immediately readable, reducing continuous work, preparing and validating Cloudflare hosting, and unifying subtle personal visual details.

## Authorization and decisions
User requested all findings implemented. No further design approval needed for reversible details.
Critical forks: None. Prefer static Next.js export plus a small Cloudflare Worker for contact and assets; fixed external preview metadata may be generated at build time or served by a hardened Worker. Retain functioning contact semantics through an HTTPS mail API if SMTP runtime support is unsuitable. Production cutover requires actual account credentials and a verified target URL; never invent either.
The user now explicitly requests integration and push to the portfolio repository. Commit and push the migration through the repository's PR workflow; update GitHub's website URL (not the Git remote) to Cloudflare. All edits stay in this clean-default task worktree.

Follow-up scope: restore the original automatic Home role typewriter without the loading gate or signature; diagnose the newly updated production SMTP configuration without sending an email or exposing secrets. Preserve the user's updated Cloudflare secrets. Any temporary authentication probe must be protected, time-limited, and must not replace production.

## Acceptance criteria
- AC1: Homepage text and navigation appear in initial HTML without loading gate or opacity gate.
- AC2: Preserve content, routes, theme switch, contact, project browsing and experience links. Motion respects reduced-motion; no global cursor timers. Restored seasonal background is capped at 30fps and pauses in hidden tabs.
- AC3: Preserve the original visual design. Remove the added signature and seasonal line art, per the user's subsequent correction; no replacement branding.
- AC4: Cloudflare production build and local runtime serve routes, static assets, metadata, and validated API requests. Document secrets and real cutover steps; execute deployment only with available authenticated access and known URL.
- AC5: Single configured public origin drives metadata, canonical, sitemap and robots. OGP assets remain accessible. Legacy redirects are prepared without a redirect loop.
- AC6: External preview fetches use exact allowed origins, validate redirect destinations and bound response/time. Contact validates inputs, escapes HTML and includes abuse protection appropriate to available runtime.
- AC7: Typecheck, lint, production build, focused behavioral tests and repository verifier have recorded evidence. Distinguish measured results from estimates.

## Slices
1. UI performance and restrained identity: app pages/template/providers, components, hooks, CSS.
2. Hosting/API/metadata: package configuration, worker, app API and metadata routes, image delivery, deployment docs.
3. Review, verification, behavioral tests, docs and deployment availability assessment.

Parent integration scope: optimize the existing profile and square OGP images without changing their composition; correct OGP dimension metadata; align frontend CI with npm lockfile, build, API tests and Worker dry run. Browser smoke scripts live outside the repository and evidence is summarized in reports.

## Findings during implementation
- Publishing follow-up: the remote verify job lacked dependency installation. Add Node 22 and npm ci before its verifier, consistent with frontend CI; retain all verification gates. The commit-history secret scan also needs an exact exception for the historical mocked SMTP fixture, not any real credential.
- Follow-up SMTP diagnosis: current secrets successfully authenticate from a protected, expiring, undeployed version when native hostname sockets are supplied to Nodemailer. Default Nodemailer connection preparation failed before authentication (ECONNECTION on 587 / ESOCKET on 465). Keep the user's secrets, port and TLS settings unchanged; bypass Nodemailer's DNS preprocessing using getSocket with native net/tls hostname connections, retaining TLS verification and bounded cleanup. Four regression cases failed first and then passed after the fix. Implementer dispatch rejected overlapping uncommitted migration files, so this slice used the documented inline fallback.
- Design correction: user requested reverting visual changes because the signature felt copied. Removed signature component/usages and added role underline; restored original header/hero spacing and original seasonal particle artwork, retaining reduced-motion/visibility/frame-rate controls. Delegated restoration could not execute because the implementer role prohibited overlapping uncommitted changes; parent completed the narrowly scoped correction inline.
- Initial deployment history: Cloudflare authentication was renewed and the Worker deployed at `https://thomas-portfolio.qingshuitouzhen.workers.dev`. The then-existing Gmail credentials failed SMTP authentication (`EAUTH`). This historical result is superseded by successful authentication with the user's current Cloudflare secrets and the native-socket fix; actual delivery and Vercel redirect verification remain pending.
- Live-browser baseline reveals hundreds of Japanese font preload requests; reduce font weights and disable indiscriminate Japanese preloading.
- Existing OGP image files are 1254×1254 despite metadata declaring 1200×630. Preserve square composition and optimize to 630×630; profile WebP at 448×448.

## Verification and evidence
Use npm ci, npm run lint, npx tsc --noEmit, npm run build and Cloudflare build/preview checks. Run ./scripts/run-verify.sh. Record initial and final HTML/asset observations where possible, and exercise contact/preview validation without sending real email. Review via reviewer, verifier, tester and doc-maintainer sequentially.

## Risks and rollback
Static exports require replacing server routes and default image optimizer. Runtime credentials/domain may be unavailable. Avoid claiming deployment success without endpoint verification. Existing Vercel remains serving until a verified Cloudflare target is ready; retain rollback documentation.

## Progress
- [x] Inspect repository and isolate task worktree
- [x] UI slice
- [x] Hosting slice
- [x] Review / verify / test / docs (static and behavioral checks pass; external integration limits recorded)
- [x] Deployment or precise external blocker recorded
- [x] Diagnose SMTP connection failure and verify current credentials without changing secrets
- [ ] Verify actual inbox delivery (no real email sent during automated checks)
- [x] Restore automatic role typewriter and validate reduced motion
- [x] Update GitHub website URL to Cloudflare without changing the Git remote
- [x] Push migration with a reviewable PR: https://github.com/thomas0124/portfolio/pull/33
- [ ] Deploy and verify old Vercel permanent redirect after mail works

## Recorded results

Latest follow-up: production version `0058016d-73cd-463e-a0da-665ff69cce52`
contains the automatic Home role display and native SMTP socket fix. Four new
regressions failed before the fix; all 12 API/mail tests now pass. Static checks,
build, Worker dry run, and the full repository verifier passed
(`docs/evidence/verify-2026-10-21-142716.log`). Production desktop/mobile checks
covered all five routes, themes, navigation, mocked contact responses, full role
cycling and reduced motion. Current secrets authenticated with the shared mail
implementation in a protected undeployed version; no email was sent. Diagnostic
preview URLs are disabled and the probe returns 404. The migration is pushed as
PR #33 targeting develop; human review and merge remain pending. See [follow-up evidence](../../reports/mail-and-publish-2026-10-21.md)
and [documentation sync](../../reports/sync-docs-2026-10-21-portfolio-publish.md).

Historical initial migration results:

Self-review, static verification, eight API tests, production build, Worker dry run,
and desktop/mobile local browser checks pass. The full repository verifier passed
(`docs/evidence/verify-2026-10-21-024829.log`). Public pages and metadata assets are
reachable. See [documentation/integration report](../../reports/sync-docs-2026-10-21-portfolio-refresh.md)
and the linked review, verify and test reports for evidence and limitations.

A single desktop production observation recorded encoded subresource bytes falling
from 8,438,256 to 283,954 and resource entries from 502 to 22. Observed LCP was
2260 ms before and 816 ms after, with final CLS 0. These are uncontrolled browser
observations, not field Core Web Vitals or a repeatable performance benchmark.
No email delivery or completed hosting cutover is claimed.
