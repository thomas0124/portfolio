# Test Report: dark-mode

- Date: 2026-08-25
- Verdict: PASS

## Test results

| Test | Result | Notes |
|---|---|---|
| `./scripts/run-test.sh` | PASS | No `test` script in package.json; harness correctly skips with "All verifiers passed" |
| `bun run build` (AC4) | PASS | 12 static pages + 1 dynamic route compiled without errors |
| ライト CSS 変数リグレッション | PASS | `:root` ライトモードブロック変更なし。全カラートークンがダークブロックにも定義済み。`--radius` のみ欠落（意図的：色ではなく geometry token のため不要） |
| `tailwind.config.js` `darkMode: 'media'` 設定 | PASS | line 5 に明示的に設定されていることを確認 |
| `@media (prefers-color-scheme: dark)` ブロック存在確認 | PASS | `app/globals.css` line 53 に存在 |
| ブラウザ目視確認 AC1/AC2/AC3 | UNVERIFIED | CI 環境では実施不可。手動確認要 |

## Evidence

### `./scripts/run-test.sh`

```
# Verification run
- Timestamp: 2026-08-25T05:57:44Z
- Mode: test
- Requested scope: changed

==> Language scope: full fallback (unclassified:.agents/skills/.gitkeep)
==> Language packs selected: typescript
==> Running typescript verifier
==> TypeScript project root: .
Skipping test: script not defined.

==> All verifiers passed.
```

### `bun run build`

```
▲ Next.js 14.1.4
✓ Compiled successfully
✓ Generating static pages (12/12)

Route (app)                              Size     First Load JS
┌ ○ /                                    4.34 kB         136 kB
├ ○ /_not-found                          883 B          85.2 kB
├ ○ /about                               3.91 kB         136 kB
├ λ /api/contact                         0 B                0 B
├ ○ /contact                             12.6 kB         139 kB
├ ○ /opengraph-image.png                 0 B                0 B
├ ○ /projects                            5.79 kB         138 kB
├ ○ /stack                               2.45 kB         134 kB
└ ○ /twitter-image.png                   0 B                0 B

Exit code: 0
```

### CSS 変数リグレッションチェック

ライトモード (`:root`) の全 CSS 変数と、ダークモード (`@media (prefers-color-scheme: dark) :root`) の CSS 変数を比較:

| Variable | Light | Dark |
|---|---|---|
| `--background` | 35 33% 97% | 30 15% 8% |
| `--foreground` | 0 0% 10% | 30 10% 93% |
| `--card` | 33 30% 93% | 30 15% 12% |
| `--card-foreground` | 0 0% 10% | 30 10% 93% |
| `--popover` | 35 33% 97% | 30 15% 8% |
| `--popover-foreground` | 0 0% 10% | 30 10% 93% |
| `--primary` | 0 0% 10% | 30 10% 93% |
| `--primary-foreground` | 35 33% 97% | 30 15% 8% |
| `--secondary` | 30 20% 92% | 30 12% 16% |
| `--secondary-foreground` | 0 0% 10% | 30 10% 93% |
| `--muted` | 30 15% 90% | 30 10% 18% |
| `--muted-foreground` | 20 6% 39% | 30 6% 58% |
| `--accent` | 193 38% 63% | 193 38% 63% (同値) |
| `--accent-foreground` | 0 0% 100% | 0 0% 100% (同値) |
| `--destructive` | 0 84.2% 60.2% | 0 70% 50% |
| `--destructive-foreground` | 0 0% 98% | 0 0% 98% (同値) |
| `--border` | 30 20% 88% | 30 12% 22% |
| `--input` | 30 20% 88% | 30 12% 22% |
| `--ring` | 193 38% 63% | 193 38% 63% (同値) |
| `--radius` | 0.75rem | 省略（意図的：色トークンではないため不要） |

ライトモードブロックは変更されていないことを確認。

Raw evidence: `docs/evidence/test-2026-08-25-dark-mode.log`

## Summary

全自動テストが PASS。AC4（`bun run build` エラーなし）が証明された。

- `./scripts/run-test.sh`: ユニットテスト・インテグレーションテストは定義されていない（CSS のみの変更のため仕様通り）。ハーネスは正常終了。
- `bun run build`: Next.js 14 で 12 ページの静的生成が成功。型チェックとコンパイルがエラーなし。
- CSS リグレッション: ライトモード `:root` ブロックは変更なし。ダークモードブロックに全カラートークンが定義されている。`--radius` の省略は意図的（geometry token）。
- `tailwind.config.js` `darkMode: 'media'`: 確認済み。

未検証（手動確認要）:
- AC1: OS ダークモード時のダークテーマ表示（目視）
- AC2: OS ライトモード時のリグレッションなし（目視）
- AC3: ダークモード時のコントラスト・文字色漏れなし（目視）
