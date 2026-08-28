# Verify: skill-article-links
Date: 2026-08-28
Verifier: verifier subagent

## Verdict
PASS

## Static analysis

| Check | Command | Result |
|-------|---------|--------|
| lint | `bun run lint` (next lint --dir src) + `npx next lint` (all dirs) | PASS |
| tsc | `npx tsc --noEmit` | PASS |
| build | `bun run build` | PASS |
| run-static-verify.sh | `./scripts/run-static-verify.sh` (typescript pack) | PASS |

Note: The `package.json` `lint` script runs `next lint --dir src` but the repo has no `src/` directory — changed files live in `components/` and `types/`. The lint was additionally run against `components/` and without `--dir` restriction; both returned zero errors. AC7 is satisfied by the broader check.

## Spec compliance

| Condition | File | Status | Evidence |
|-----------|------|--------|----------|
| AC1/AC3: `articles` フィールド追加済み | `types/skill.d.ts` | PASS | Line 4: `articles?: { title: string; url: string }[]` — optional, correct shape |
| AC1/AC3: 記事データあり | `data/skills.ts` | PASS | 5 skills (React, Next.js, TypeScript, Ruby, Python) each have a placeholder `articles` entry |
| AC3: 記事のないスキルはツールチップ非表示 | `components/skills/skills-container.tsx` | PASS | Line 29: `const hasArticles = skill.articles && skill.articles.length > 0` — conditional rendering guarded by `hasArticles` |
| AC1: マウスオーバーでツールチップ表示 | `components/skills/skills-container.tsx` | PASS | Lines 39–40: `onMouseEnter` / `onMouseLeave` set/clear `activeSkill`; tooltip renders only when `hasArticles && isActive` (line 56) |
| AC2: 別タブ開き | `components/skills/skills-container.tsx` | PASS | Lines 64–65: `target="_blank" rel="noopener noreferrer"` on every article link |
| AC4: モバイルタップトグル | `components/skills/skills-container.tsx` | PASS | Lines 41–45: `onClick` toggles `activeSkill`; `useEffect` (lines 13–21) closes on outside `mousedown` with ref-based containment |
| AC4: 新規ライブラリなし | `package.json` | PASS | No `@radix-ui/react-tooltip` or other new tooltip packages added |
| AC5: build clean | `bun run build` | PASS | Exit 0; all 12 pages generated |
| AC6: TypeScript エラーなし | `npx tsc --noEmit` | PASS | Exit 0, no output |
| AC7: ESLint エラーなし | `npx next lint` | PASS | "No ESLint warnings or errors" |

## Findings

### Finding 1 — lint script scope gap (LOW, non-blocking)
`package.json` defines `"lint": "next lint --dir src"` but there is no `src/` directory in this project. The changed files (`components/`, `types/`, `data/`) are outside that path. `next lint --dir src` exits 0 because there is nothing to lint in a non-existent directory. This is a pre-existing issue in the project lint script, not introduced by this PR. Lint against the actual changed directories passes (verified above).

### Finding 2 — placeholder article URLs (informational, not a blocker)
`data/skills.ts` contains placeholder URLs (`https://note.com/tomas_0124/n/placeholder-*`). Per the plan's open questions section, this is intentional — the user will update these after implementation. The type contract and conditional rendering are correct.

### Finding 3 — tooltip overflow at screen edges (unverified)
AC scrolls to plan risk "ツールチップが親の `overflow-hidden` でクリップされる". The component uses `absolute z-50 bottom-full left-1/2 -translate-x-1/2`. Whether cards at the right/left grid edge clip their tooltip remains a visual/behavioral concern that cannot be confirmed by static analysis — this is a `/test` matter (manual or snapshot).

## Unverified

- AC1 / AC4 behavioral confirmation (hover/tap interactions) — requires browser; responsibility of `/test`
- Tooltip overflow at grid edges — visual confirmation needed
- Placeholder URLs resolving to real articles — user action required after PR

## Evidence log

`docs/evidence/verify-2026-08-28-064238.log` — raw output from `./scripts/run-static-verify.sh`
