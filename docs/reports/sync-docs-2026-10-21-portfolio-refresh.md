# Documentation sync and integration evidence

- Date: 2026-10-21
- Plan: `docs/plans/active/2026-10-20-portfolio-refresh.md`
- Maintainer: doc-maintainer subagent
- Verdict: PASS for documentation sync; mail and legacy cutover remain pending

## Documentation alignment

Updated README architecture, public URL, local/validation commands and project
map; deployment status, cutover/rollback instructions; active plan progress;
and [dependency audit follow-up](../tech-debt/dependency-audit.md).
Read the source manifest, redirect configuration and existing reports. No harness
workflow, skill, template or agent guidance changed. This documentation pass
does not rerun application tests or independently certify SMTP delivery.

## Verification evidence

- [Self-review](self-review-2026-10-21-portfolio-refresh.md): PASS. The lead
  additionally reviewed the final preview User-Agent restoration after observing
  DMM return 404 without it and 200 with it.
- [Static verification](verify-2026-10-21-portfolio-refresh.md): PASS for static
  checks; its deployment-pending statements describe the earlier check time.
  README/plan drift identified there is resolved by this sync.
- [Behavioral tests](test-2026-10-21-portfolio-refresh.md): eight API tests and
  local desktop/mobile browser smoke checks pass; mail transport is mocked.
- Lead reports production build and Worker dry-run pass, and full repository
  verification passes: `docs/evidence/verify-2026-10-21-024829.log`.
- Lead deployed Worker version `21833c0f-3399-4aeb-a7dd-98d0626d5058` at
  `https://thomas-portfolio.qingshuitouzhen.workers.dev`. All five pages, robots,
  sitemap and both OGP images return 200; unknown route returns 404; invalid
  contact and preview requests return 400.
- Lead's production browser smoke passes for all five routes at 1440px and
  390px, without horizontal overflow or JavaScript errors. Role/profile controls,
  mobile menu, theme, reduced motion and JavaScript-disabled content pass.
  Form success/failure checks still mock delivery and do not validate SMTP.

## Production performance observation

The lead collected one desktop browser observation on each deployment. Source
artifacts are temporary `/tmp/portfolio-before.json` and
`/tmp/portfolio-after-production.json`; their headline values are retained here.

| Measure | Previous Vercel site | Cloudflare refresh |
| --- | ---: | ---: |
| Encoded subresource bytes | 8,438,256 | 283,954 |
| Resource entries | 502 | 22 |
| Observed LCP | 2260 ms | 816 ms |
| Observed CLS | Not compared | 0 |

The previous page loaded 478 font resources totaling 8,184,144 encoded bytes.
These figures summarize Resource Timing entries rather than total page transfer
including the document and protocol overhead. They are uncontrolled observations
from different deployments, not field Core Web Vitals, repeated benchmarks or a
mobile performance score. Local browser checks separately cover 1440px and 390px.

## Open operational checks

- Existing SMTP secrets were transferred without secret files. Current Gmail
  app-password authentication fails with `EAUTH` in Node and workerd. Valid
  credentials, subsequent authentication and actual delivery remain unverified.
- Vercel remains intact. Redirect configuration is prepared but not deployed;
  complete mail checks before cutover and prevent Git auto-deploys from replacing
  the redirect. Cloudflare deployments remain manual.
- The lead skipped cross-review because the skill's committed diff range is empty
  under the no-commit instruction. No commit or PR was created.
- The dependency audit has 26 findings requiring separate triage; passing runtime
  checks does not imply a clean transitive dependency audit.
