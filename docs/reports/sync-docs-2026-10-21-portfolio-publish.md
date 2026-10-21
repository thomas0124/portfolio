# Documentation sync: Portfolio publishing follow-up

- Date: 2026-10-21
- Verdict: **PASS** for documentation synchronization; publishing and delivery are not claimed complete.
- Scope: README, deployment guide and active portfolio-refresh plan.

## Synchronized status

- Production version `0058016d-73cd-463e-a0da-665ff69cce52` contains restored automatic Home roles and the SMTP native-hostname socket fix, without reintroducing signature branding.
- Current Cloudflare secrets authenticated using the shared mail implementation in a protected, expiring, undeployed probe. No password changes, secret exports or real email sends occurred. Historical `EAUTH` results are identified as superseded, not erased from earlier reports.
- Twelve API/mail tests pass, including four new regressions that failed before implementation. Production desktop/mobile checks cover all five routes, themes, menus and mocked contact success/failure; full role cycling and reduced motion also passed.
- GitHub's website URL now points to Cloudflare; Git origin remains GitHub. Cloudflare deployment remains manual, not triggered by push.
- Preview URLs are disabled, the diagnostic URL returns 404, and temporary diagnostic code was excluded from Git and deleted locally.

Evidence was cross-checked against `mail-and-publish-2026-10-21.md`, the follow-up review/verify/test reports, and the orchestrator's final production observations. This documentation pass did not independently rerun production or behavioral checks. Full verification evidence is `docs/evidence/verify-2026-10-21-142716.log`.

## Remaining work

- Commit/push and reviewable PR are pending at this snapshot; do not infer publication from a deployed Worker or updated GitHub website field.
- Actual inbox delivery remains a separate manual integration check. SMTP authentication is not proof of message delivery.
- The prepared Vercel redirect is not activated. Retain the old deployment until delivery is checked and verify redirects before declaring cutover complete.

No harness commands, templates, quality gates or workflow contracts changed in this follow-up; no harness instruction rewrites were needed. The verifier's stale-current-status documentation findings are resolved by this sync, while its historical report remains intact.
