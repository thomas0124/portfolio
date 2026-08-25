# Tech Debt: package.json に typecheck スクリプトがない

- 発見: 2026-08-25、dark-mode /verify フェーズ
- 影響: `./scripts/run-verify.sh` が型チェックをスキップするため、型エラーの自動検出ができない
- 対処案: `package.json` の scripts に `"typecheck": "tsc --noEmit"` を追加する
- 優先度: LOW
