# dark-mode-toggle

- Status: Draft
- Owner: Claude Code
- Date: 2026-08-25
- Related request: ダークモード・ライトモードを手動で切り替えできるトグルボタンを追加する
- Related issue: N/A
- Type: feat
- Branch: feat/dark-mode-toggle
- Supersedes: PR #29（`feat/dark-mode` — OS 連動専用実装を置き換える）

## Objective

`next-themes` を使ってダークモードの手動切り替えを実装する。デフォルトは OS 設定に従い、Header のトグルボタンでライト/ダークを手動上書きでき、選択は localStorage に永続化される。PR #29 を閉じてこの PR で置き換える。

## Scope

- `next-themes` パッケージのインストール（`bun add next-themes`）
- `tailwind.config.js`: `darkMode: 'media'` → `darkMode: 'class'`
- `app/globals.css`: `@media (prefers-color-scheme: dark) { :root {...} }` → `.dark { ... }`（next-themes が `<html class="dark">` を付与する）
- `app/layout.tsx`: `ThemeProvider` でアプリをラップ
- `components/layout/Header.tsx`: 太陽/月アイコンのトグルボタンを追加

## Non-goals

- アニメーション付きのカラースキーム切り替えトランジション
- システム設定以外のテーマ（セピア・ハイコントラスト等）
- ページごとの独立したテーマ設定

## Assumptions

- `next-themes` の `ThemeProvider` は `"use client"` が必要。`app/layout.tsx` に `providers.tsx` を切り出す（Next.js App Router の慣例）
- `defaultTheme="system"` で OS 設定をデフォルトとし、`enableSystem={true}` を設定
- `attribute="class"` で `<html>` に `class="dark"` を付与（Tailwind `darkMode: 'class'` と合わせる）
- トグルアイコン: `lucide-react` がなければ絵文字（☀️/🌙）で代替。実装時に確認
- PR #29 は本 PR 作成時に閉じる（`gh pr close 29`）

## Affected areas

| ファイル | 変更内容 |
|---|---|
| `package.json` / `bun.lockb` | `next-themes` を追加 |
| `tailwind.config.js` | `darkMode: 'class'` に変更 |
| `app/globals.css` | `.dark { ... }` ブロックに書き換え |
| `app/layout.tsx` | `ThemeProvider` を追加（または `providers.tsx` 経由） |
| `components/layout/Header.tsx` | テーマトグルボタンを追加 |

## Design decisions

**Critical forks: None**

- テーマ管理ライブラリ: `next-themes` を採用。理由: SSR ヒドレーション時のフラッシュ（FOUC）を防ぐ `suppressHydrationWarning` を自動処理する。App Router の慣例に沿った実装。自前実装は localStorage + useEffect だけでは FOUC が避けられない。
- Tailwind の `darkMode`: `'media'` → `'class'` に変更。next-themes が `<html class="dark">` を管理するため。
- globals.css の切り替え: `@media (prefers-color-scheme: dark)` ブロックを `.dark` クラスベースに書き換え。変数値は PR #29 と同一。
- PR #29 の扱い: 本 PR は PR #29 を完全に置き換えるため、PR 作成後に `gh pr close 29` で閉じる。

## Acceptance criteria

- [ ] AC1: Header にトグルボタンが表示され、クリックでダーク/ライトが切り替わる
- [ ] AC2: ダークモードでは全ページが暗い背景・明るい文字色で表示される
- [ ] AC3: ライトモードでは既存のベージュ系デザインが表示される
- [ ] AC4: ページリロード後も選択したテーマが維持される（localStorage 永続化）
- [ ] AC5: OS のダークモード設定に追従するシステムデフォルトが機能する（手動上書きなし状態で）
- [ ] AC6: `bun run build` がエラーなく完了する
- [ ] AC7: TypeScript 型エラーがない
- [ ] AC8: ESLint エラーがない

## Implementation outline

1. **スライス 1: next-themes インストール＋ Tailwind 設定変更**
   - `bun add next-themes` をワークツリー内で実行
   - `tailwind.config.js`: `darkMode: 'media'` → `'class'`
   - 検証: `npx tsc --noEmit`

2. **スライス 2: globals.css ダーク変数をクラスベースに書き換え**
   - `@media (prefers-color-scheme: dark) { :root {...} }` → `.dark { ... }`（変数値は変更しない）
   - 検証: `bun run lint`

3. **スライス 3: ThemeProvider をレイアウトに追加**
   - `app/providers.tsx` を新規作成（`'use client'` + `ThemeProvider` エクスポート）
   - `app/layout.tsx` で `<Providers>` でラップ、`<html>` に `suppressHydrationWarning` を追加
   - 検証: `bun run build`

4. **スライス 4: Header にトグルボタンを追加**
   - `'use client'` はすでに存在。`useTheme` から `theme` / `setTheme` を取得
   - ☀️/🌙 ボタンをデスクトップナビ・モバイルメニュー両方に配置
   - 検証: `bun run lint` + `bun run build`

## Verify plan

- 静的解析:
  - `bun run lint`（ESLint）
  - `npx tsc --noEmit`（型チェック）
- スペック適合:
  - `tailwind.config.js` に `darkMode: 'class'` が存在すること
  - `globals.css` に `.dark { ... }` ブロックが存在し、`@media` ブロックがないこと
  - `app/layout.tsx` または `providers.tsx` に `ThemeProvider` が存在すること
  - `Header.tsx` に `useTheme` の使用が存在すること
- ドキュメントドリフト: なし（ライブラリ追加のみ）
- キャプチャするエビデンス:
  - `bun run lint` の出力
  - `npx tsc --noEmit` の出力
  - `bun run build` の成功ログ

## Test plan

- ユニットテスト: 該当なし
- 回帰テスト:
  - ライトモードでの全ページ表示が壊れていないこと（目視）
  - トグルボタンが PC・モバイル両方で表示されること（目視）
- エッジケース:
  - ページ遷移後もテーマが維持されること
  - localStorage を消去すると OS 設定に戻ること
- キャプチャするエビデンス:
  - Chrome ダーク/ライト切り替えの目視確認メモ
  - モバイルサイズでのトグルボタン確認

## Risks and mitigations

| リスク | 影響 | 対処 |
|---|---|---|
| FOUC（初期レンダリング時の色チラつき） | UX の低下 | `suppressHydrationWarning` + next-themes の `enableSystem` で対処済み |
| `providers.tsx` の `'use client'` が Server Component と衝突 | ビルドエラー | `layout.tsx` から分離し `<Providers>` のみクライアント化する慣例に従う |
| PR #29 とのコンフリクト | マージ不可 | この PR は develop ベースで独立しているため競合なし。PR #29 を閉じる |
| lucide-react が未インストール | アイコン表示できない | 実装時に確認し、なければ絵文字で代替 |

## Rollout or rollback notes

- ロールアウト: PR マージ + Vercel 自動デプロイ。PR #29 をマージ前に閉じる。
- ロールバック: `next-themes` アンインストール + 4ファイルを元に戻すだけ。

## Open questions

- なし

## Progress checklist

- [x] Plan reviewed
- [x] Branch created（feat/dark-mode-toggle）
- [ ] Implementation started
- [ ] Review artifact created
- [ ] Verification artifact created
- [ ] Test artifact created
- [ ] PR created
