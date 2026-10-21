# トーマスのPortfolio
## このリポジトリについて
このリポジトリは、私のポートフォリオを管理するためのリポジトリです

URL: [トーマスのポートフォリオ](https://thomas-portfolio.qingshuitouzhen.workers.dev/)

Next.js の静的出力を Cloudflare Workers Static Assets で配信し、問い合わせと外部 OGP プレビューのみ Worker で処理します。掲載内容・暖色の配色を維持し、表示待ちと常時アニメーションを削減しています。

2026-10-21 時点で Cloudflare 公開、Home の自動タイプライター表示の復元、現行シークレットでの SMTP 認証を確認済みです。実際のメール受信と旧 Vercel サイトのリダイレクトは未確認・未実施です。Cloudflare への公開は手動の `npm run deploy` で行い、Git push だけではデプロイされません。

## ローカル開発

Node.js 22 以上を使用します。

```sh
npm ci
npm run dev
```

`npm run dev` は UI 開発用です。API を含める場合は `npm run build` の後に `npm run preview` を実行します。公開 URL、SMTP シークレット、デプロイ、旧サイトの切替・ロールバック手順は [Cloudflare deployment](docs/cloudflare-deployment.md) を参照してください。

```sh
npm run lint
npx tsc --noEmit
npm test
npm run build
npx wrangler deploy --dry-run
./scripts/run-verify.sh
```

## 📚 開発ルール

### Commit Message

```
feat: 新しい機能
fix: バグの修正
doc: ドキュメントのみの変更
refactor: 仕様に影響がないコード改善(リファクタ)
chore: ビルド、補助ツール、ライブラリ関連
```

### Branch Name

```
feat/#2/機能名
fix/#3/修正箇所
doc/#1/ドキュメント名
refactor/#2/機能名
chore/#1/機能名

ex) feat/#1/add_login
```

## ポートフォリオの構成
```
.github/
    ├─ workflows/
.husky/
    ├─
app/
    ├─ about/
    ├─ contact/
    ├─ projects/
    ├─ stack/
worker/
    ├─ index.ts         # 問い合わせ・外部 OGP API
    ├─ mail.ts          # SMTP 送信
    ├─ api.test.ts
deployment/
    ├─ vercel-redirect/ # 旧サイト用・切替前は未デプロイ
docs/
    ├─ cloudflare-deployment.md
components/
    ├─ ui/
    ├─ skills/
data/
    ├─
hooks/
    ├─
lib/
    ├─
public/
    ├─
types/
    ├─
.lintstagedrc.js
compose.yml
dockerfile
```

## 技術スタック
- Next.js
- TypeScript
- Radix UI
- Tailwind CSS
- Shadcn/ui
- Lucide
- next-themes
- Open Graph
- ESLint
- Prettier
- Husky
- Docker
- GitHub Actions
- Cloudflare Workers / Static Assets
