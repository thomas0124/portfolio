# トーマスのPortfolio
## このリポジトリについて
このリポジトリは、私のポートフォリオを管理するためのリポジトリです

URL: [トーマスのポートフォリオ](https://portfolio-thomas0124.vercel.app/)

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
app/
    ├─ about/
    ├─ globals.css
    ├─ layout.tsx
    ├─ page.tsx
    └─ opengraph-image.png
components/
    ├─ Header.tsx
    ├
    ├
    └─ Footer.tsx
    ├─ ui/
        ├─ button.tsx
        ├
        ├
        └─ toaster.tsx
hooks/
    ├─ use-toast.ts
lib/
    ├─ utils.ts
public/
    ├─ ...svg
    ├─
    ├─
    └─ ...svg
types/
    ├─ troika-three-tstx.d.ts

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
- Open Graph
- ESLint
- Prettier
- Husky
- Docker
- GitHub Actions
- Vercel