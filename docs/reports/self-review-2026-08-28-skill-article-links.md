# Self-review report: skill-article-links

- Date: 2026-08-28
- Plan: docs/plans/active/2026-08-25-skill-article-links.md
- Reviewer: reviewer subagent
- Scope: Diff quality only (naming, readability, unnecessary changes, typos, null safety, debug code, secrets, exception handling, security, maintainability). Spec compliance, tests, static analysis, and doc-drift are out of scope.

## Evidence reviewed

- `git diff develop...HEAD` — 3 files, +76 / -18
  - `c772d54` feat: Skill 型に articles フィールドを追加し代表的スキルに記事データを追記
  - `52ed6a2` feat: SkillsContainer にホバー/タップ対応の記事ツールチップを追加
- Full read of `components/skills/skills-container.tsx`, `data/skills.ts`, `types/skill.d.ts`
- Cross-referenced `docs/plans/active/2026-08-25-skill-article-links.md` (plan lines 33, 65, 122 confirm placeholder URLs are an intentional deferral)
- Repo-wide grep for `note.com` / `tomas_0124` to confirm username consistency

## Findings

| Severity | Area | Finding | Evidence | Recommendation |
| --- | --- | --- | --- | --- |
| MEDIUM | maintainability | All 6 article URLs are non-functional placeholders (`https://note.com/tomas_0124/n/placeholder-<skill>`). They would 404 if a user clicks them in production. | `data/skills.ts:4,7,10,11,13` | Documented as an intentional deferral in the plan (lines 33, 65, 122) — user will supply real URLs. Not a blocker, but must be replaced before the links are usable. Tracked as tech debt below. |
| LOW | security | Non-null assertion `skill.articles!` bypasses the type checker in the render branch. It is safe here because it is guarded by `hasArticles` in the same scope, but the assertion is more fragile than optional chaining if the guard is ever refactored. | `skills-container.tsx:60` | Optional: replace `skill.articles!.map(...)` with `skill.articles?.map(...)` or hoist a local `const articles = skill.articles` narrowed via the `hasArticles` guard, to avoid the `!` escape hatch. |
| LOW | readability | `onMouseEnter={() => hasArticles && setActiveSkill(skill.name)}` uses `&&` for a side effect. Works, but a short-circuit-for-effect idiom reads less clearly than an explicit `if`, especially next to the `onClick` handler which does use an explicit `if`. | `skills-container.tsx:39` | Optional: `onMouseEnter={() => { if (hasArticles) setActiveSkill(skill.name) }}` for consistency with the `onClick` handler two lines down. |
| LOW | maintainability | `onMouseLeave={() => setActiveSkill(null)}` fires for every card, including cards without articles (where `activeSkill` is already null for that card). Harmless (idempotent state set), but slightly noisier than gating on `hasArticles` like the other two handlers. | `skills-container.tsx:40` | Optional: no change needed; noting for completeness. |

## Positive notes

- Security handled correctly: external links use `target="_blank"` with `rel="noopener noreferrer"` — no reverse-tabnabbing risk (`skills-container.tsx:64-65`).
- Click-outside dismissal is implemented defensively: `mousedown` listener scoped via `containerRef.current.contains(...)`, and the `useEffect` returns a cleanup that removes the listener — no leak. The inner `Link` calls `e.stopPropagation()` so tapping a link on mobile does not immediately collapse the tooltip (`skills-container.tsx:13-21, 67`).
- Conditional rendering guard `hasArticles && isActive` cleanly satisfies the "no tooltip for skills without articles" requirement; cards without `articles` render exactly as before.
- `note.com` username `tomas_0124` is internally consistent across all 6 entries. (Note the GitHub handle elsewhere in the repo is `thomas0124` with an `h` — these are different platforms, so not a typo, but worth the author double-checking the note.com handle is correct.)
- No debug code (`console.log`), no commented-out code, no hardcoded secrets/credentials, no TODO markers introduced.
- The type change is minimal and correctly optional (`articles?`), preserving backward compatibility for the majority of skills that have no articles.

## Tech debt identified

| Debt item | Impact | Why deferred | Trigger to pay down | Related plan/report |
| --- | --- | --- | --- | --- |
| Placeholder article URLs in `data/skills.ts` (6 entries, `placeholder-*`) | Links are non-functional / 404 in production until replaced | Intentional per plan — user supplies real note.com URLs after implementation | Before the article links are advertised to users / next content update | docs/plans/active/2026-08-25-skill-article-links.md (lines 33, 65, 122) |

## Recommendation

- Merge: PASS_WITH_NOTES. No CRITICAL findings; no merge blocker from a diff-quality standpoint. The placeholder URLs are a documented, intentional deferral, not an accidental leftover.
- Follow-ups (all optional / non-blocking):
  1. Replace the 6 placeholder URLs with real note.com article URLs before the links are surfaced to users (tracked as tech debt).
  2. Consider replacing the `skill.articles!` non-null assertion with optional chaining or a narrowed local.
  3. Confirm the `tomas_0124` note.com handle is correct (differs from the `thomas0124` GitHub handle used elsewhere in the repo).
