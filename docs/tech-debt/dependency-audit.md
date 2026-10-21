# Dependency audit follow-up

- Recorded: 2026-10-21, portfolio refresh
- Status: open; separate dependency triage required

The lead's clean `npm ci --ignore-scripts` passed. `npm audit` reported 26
inherited/transitive findings. This is not evidence that every finding is
production-reachable, nor a clean dependency-security verdict.

Re-run the audit against the current lockfile, distinguish runtime from tooling
paths, inspect advisory reachability, and apply compatible fixes with regression
checks. Major or forced dependency upgrades need their own scoped change; do not
use `npm audit fix --force` as an unreviewed migration step.
