# skill-article-links

- Status: Draft
- Owner: Claude Code
- Date: 2026-08-25
- Related request: スキルカードにホバーでブログ記事リンクを表示するツールチップを追加する
- Related issue: N/A
- Type: feat
- Branch: feat/skill-article-links

## Objective

スキル一覧の各カードにブログ記事 URL を紐付け、PC ではマウスオーバー、モバイルではタップでツールチップを表示する。記事のないスキルは現状の表示を維持する。

## Scope

- `types/skill.d.ts`: `articles` フィールド（任意）を追加
- `data/skills.ts`: 記事があるスキルに `articles: [{ title, url }]` を追記
- `components/skills/skills-container.tsx`: ツールチップ付きカード UI に変更

## Non-goals

- 新しいライブラリ（Radix Tooltip 等）の導入
- スキルの追加・削除・並び替え
- 記事ページの作成
- アニメーションの大規模な追加

## Assumptions

- ツールチップは純粋な Tailwind CSS（`group-hover:` + `invisible/visible`）+ `useState` で実装
- モバイルタップ: カードをタップするとツールチップが開き、画面外タップで閉じる
- 記事リンクは `target="_blank" rel="noopener noreferrer"` で別タブ開き
- ユーザーが提供した note.com アカウント: `tomas_0124`。具体的な記事タイトルと URL のマッピングは実装後にユーザーが `data/skills.ts` を直接更新するか、/work 中に指示する

## Affected areas

| ファイル | 変更内容 |
|---|---|
| `types/skill.d.ts` | `articles?: { title: string; url: string }[]` を追加 |
| `data/skills.ts` | 記事があるスキルに `articles` 配列を追記 |
| `components/skills/skills-container.tsx` | ツールチップ付きカード UI に変更 |

## Design decisions

**Critical forks: None**

- ツールチップ実装方式: **Tailwind CSS 純粋実装**（`group-hover` + `invisible/visible`）+ `useState` によるモバイル対応を選択。追加ライブラリ不要。
- モバイル対応: `useState<string | null>` でアクティブスキル名を管理。`useEffect` でグローバル `mousedown` リスナーを設定し、ツールチップ外タップで閉じる。
- 複数記事の表示: リスト形式（`<ul>`）で縦に並べる。

## Acceptance criteria

- [ ] AC1: 記事が紐付いたスキルカードにマウスオーバーするとツールチップが表示され、記事タイトル＋リンクが見える
- [ ] AC2: ツールチップ内のリンクをクリックすると別タブで記事が開く
- [ ] AC3: 記事がないスキルカードはホバー時にツールチップが表示されない（現状のまま）
- [ ] AC4: モバイル（`< md`）でカードをタップするとツールチップが開き、画面外タップで閉じる
- [ ] AC5: `bun run build` がエラーなく完了する
- [ ] AC6: TypeScript 型エラーがない（`npx tsc --noEmit`）
- [ ] AC7: ESLint エラーがない（`bun run lint`）

## Implementation outline

1. **スライス 1: 型とデータの拡張**（`types/skill.d.ts`, `data/skills.ts`）
   - `Skill` 型に `articles?: { title: string; url: string }[]` を追加
   - `data/skills.ts` に提供済み URL を含む記事データをプレースホルダーとして追記
   - 検証: `npx tsc --noEmit`

2. **スライス 2: SkillsContainer にツールチップ UI を追加**（`components/skills/skills-container.tsx`）
   - `useState<string | null>` で activeSkill を管理
   - `onMouseEnter` / `onMouseLeave` でデスクトップ制御
   - `onClick` でモバイルタップトグル（記事ありスキルのみ）
   - `useEffect` でグローバル `mousedown` リスナーを設定
   - ツールチップ: `absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2` 配置、`bg-card border border-accent/20 rounded-lg shadow-lg p-3 w-56`
   - 各 `motion.div` に `relative` を追加してツールチップの基準点にする
   - 検証: `bun run lint` + `npx tsc --noEmit` + `bun run build`

## Verify plan

- 静的解析:
  - `bun run lint`（ESLint）
  - `npx tsc --noEmit`（型チェック）
- スペック適合:
  - `Skill` 型に `articles` フィールドが存在すること
  - ツールチップが `articles` の有無で条件付きレンダリングされること（`articles && articles.length > 0` の分岐）
  - 新規ライブラリが `package.json` に追加されていないこと
- ドキュメントドリフト: なし
- キャプチャするエビデンス:
  - `bun run lint` の出力
  - `npx tsc --noEmit` の出力
  - `bun run build` の成功ログ

## Test plan

- ユニットテスト: 該当なし（UI テストなし）
- 回帰テスト:
  - 記事なしスキルにツールチップが表示されないこと（目視）
  - 既存グリッドレイアウトが崩れていないこと（目視）
- エッジケース:
  - `articles` が空配列のスキル → ツールチップを表示しないこと
  - 記事が複数あるスキル → 全件リスト表示されること
  - 画面端のカード → ツールチップが `overflow` でクリップされないこと
- キャプチャするエビデンス:
  - Chrome ホバー動作の目視確認メモ
  - モバイルサイズ（375px）でのタップ動作確認

## Risks and mitigations

| リスク | 影響 | 対処 |
|---|---|---|
| ツールチップが親の `overflow-hidden` でクリップされる | 上端が切れる | `motion.div` に `relative overflow-visible` を確認。About ページのレイアウトを確認 |
| グローバル `mousedown` リスナーの干渉 | 他コンポーネントのクリック挙動を壊す | `useEffect` クリーンアップで必ずリスナーを削除 |
| `z-index` が Header と競合（Header は `z-50`） | ツールチップが Header の下に隠れる | `z-50` でほぼ問題なし。必要なら `z-[60]` |
| ツールチップ内リンクのタップでアクティブ状態が消える | モバイルで記事を開けない | `mousedown` リスナー判定時にツールチップ要素を除外する（`ref` で判定） |

## Rollout or rollback notes

- ロールアウト: PR マージのみ。Vercel 自動デプロイ。
- ロールバック: 3 ファイルの変更を元に戻すだけで完全に元の状態へ。

## Open questions

- どのスキルにどの記事 URL を紐付けるか（ユーザーが `data/skills.ts` で決定）。`/work` 中に指示がなければプレースホルダーを使用し、ユーザーが後で自由に編集できる状態で提出する。

## Progress checklist

- [x] Plan reviewed
- [x] Branch created（feat/skill-article-links）
- [x] Implementation started
- [x] Review artifact created
- [x] Verification artifact created
- [x] Test artifact created
- [ ] PR created
