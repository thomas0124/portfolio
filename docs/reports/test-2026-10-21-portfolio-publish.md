# Test report: Portfolio publication follow-up

- Date: 2026-10-21
- Plan: `docs/plans/active/2026-10-20-portfolio-refresh.md`
- Tester: delegated test specialist
- Scope: SMTP socket regression, Worker API behavior, local browser regression, production Home role animation.
- Evidence: `docs/evidence/test-2026-10-21-portfolio-publish.log`

## Test execution

| Suite / Command | Result | Coverage |
| --- | --- | --- |
| `npm test` | PASS: 12 passed, 0 failed, 0 skipped | Repository's explicit behavioral entrypoint (`test:api`); API validation, preview allowlist/redirect/body bounds, mocked contact success, SMTP deadline and native socket lifecycle |
| `node /tmp/portfolio-smoke.cjs http://localhost:8787` | PASS | Five routes at 1440px and 390px; interactions and no-JavaScript homepage |
| `node /tmp/portfolio-role-smoke.cjs https://thomas-portfolio.qingshuitouzhen.workers.dev` | PASS | Full production role cycle and live reduced-motion change |

The project-specific `npm test` runner was used instead of the generic harness wrapper. No lint, typecheck, formatter, or static-analysis command was run by this tester.

## Regression checks

- SMTP creates hostname sockets with verified TLS for implicit TLS and STARTTLS modes; deadline and connection failures close sockets before handoff.
- Contact rejects cross-origin, malformed, oversized and rate-limited requests; mocked success escapes user input and uses the configured recipient.
- External preview fetching rejects unsafe origins and redirects, bounds streamed response size, and excludes executable image URLs.
- Both browser sizes render all five routes with HTTP 200, visible main content, no horizontal overflow, and no page errors.
- Reduced motion leaves the seasonal canvas stationary, disables infinite CSS animation, and shows a stable Software Developer role.
- Portrait reaction, mobile menu, dark theme, mocked contact success toast/reset, and mocked failure toast/input preservation pass.
- Homepage content remains readable without JavaScript.
- Production role animation reaches Hackathon Winner, Full-Stack Developer, AI Engineer, and Software Developer, then stays static after reduced motion is enabled.

## Failure analysis

No failures observed. No fixes or exclusions required for these checks.

## Test gaps

- No actual email was sent; browser and unit contact success paths mock delivery. Inbox receipt and spam placement remain unverified. The parent's separate Cloudflare SMTP authentication probe is not a delivery test and was not rerun here.
- Numeric statement, branch, and function coverage were not collected.
- Browser scripts are temporary external harnesses; the repository retains their execution evidence, not the scripts themselves.
- Browser checks use Chromium only; broad cross-browser/device coverage and field performance are outside this run.
- GitHub publication and the old Vercel redirect are not exercised by these behavioral checks.

## Verdict

PASS for the executed behavioral suites. No behavioral test failure blocks PR creation; real email delivery remains explicitly unverified.
