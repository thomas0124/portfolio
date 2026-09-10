# Tech debt: placeholder article URLs in skill data

- Identified: 2026-08-28
- Source: self-review (docs/reports/self-review-2026-08-28-skill-article-links.md)
- Plan: docs/plans/active/2026-08-25-skill-article-links.md (lines 33, 65, 122)

## Debt item

`data/skills.ts` ships 6 skill entries (React, Next.js, TypeScript, Ruby,
Python) whose `articles[].url` values are non-functional placeholders of the
form `https://note.com/tomas_0124/n/placeholder-<skill>`. Clicking these links
in production would 404.

## Why deferred

Intentional per the plan: the tooltip UI and data shape were implemented first,
and the user will supply the real note.com article URLs by editing
`data/skills.ts` directly (or during a later content update). The placeholders
let the feature ship and be reviewed without blocking on final copy.

## Impact

Low code risk (no crash, no security issue). Product risk: if the branch is
merged and deployed as-is, users can click article links that lead nowhere.

## Trigger to pay down

Before the article links are advertised to users, or at the next portfolio
content update — whichever comes first. Replace each `placeholder-*` URL with
the real note.com article URL.

## Also confirm

The note.com handle `tomas_0124` (no `h`) differs from the GitHub handle
`thomas0124` (with `h`) used elsewhere in the repo. Verify the note.com handle
is correct when the real URLs are added.
