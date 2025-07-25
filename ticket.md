# ticket.md

## child_clock 改善・追加タスク一覧

<!-- COT: ticket1,2,3（関数化・命名規約・テーマ永続化）を消化済みとしてチェック -->

### 1. コード品質・保守性
- [x] JavaScript の関数化・docstring追加（現状は即時関数＋グローバル変数のみ）
- [x] 変数名・定数名の命名規約統一（lowerCamel/UPPER_SNAKE/UpperCamel）
- [x] エラー処理の強化（例: DOM取得失敗時の例外）
- [x] コメント・JSDoc充実

### 2. テーマ切替
- [x] テーマ状態の永続化（localStorage等でリロード時も維持）
- [ ] CSS変数化によるテーマ切替の最適化
- [ ] テーマ切替時のアニメーション追加
- [ ] アクセシビリティ: テーマ切替時のコントラスト自動調整

#### 【設計方針】ユーザー設定可能な柔軟テーマシステム
- 目的: 子ども向けUIの楽しさ・視認性・多様性を両立し、誰でも直感的に色を選べる体験を提供する。
- 技術: 主要色（背景・文字・時計盤・針・星・ボタン等）をCSSカスタムプロパティ（変数）で一元管理。
- プリセット: パステル/ビビッド/モノトーン/高コントラスト等、用途・好みに応じた複数テーマを用意。
- カスタム: ユーザーが各色をカラーピッカーで自由に選択し「カスタムテーマ」として保存・適用可能。
- UI: テーマ選択はドロップダウン/パレット、カスタムは色ごとにピッカー表示。選択状態はlocalStorage保存。
- 適用: テーマ・カスタムテーマ切替時は時計盤・針・星・ボタン等の色も即時反映し、フェード等のアニメーション付き。
- アクセシビリティ: WCAG AA基準のコントラスト自動判定・警告。必要に応じ自動補正。
- 拡張性: テーマ定義はJSON等で管理し、将来的な追加・共有も容易に。
- ドキュメント: 設計・UI仕様・保存方式・アクセシビリティ要件をREADMEにも反映。

### 3. UI/UX
- [x] モバイル端末でのレイアウト最適化（レスポンシブ強化）
- [ ] 星の装飾の重なり・視認性調整
- [x] 時計盤の色・装飾のテーマ連動
- [x] テーマ切替ボタンの視認性・操作性向上

### 4. PWA/SEO
- [x] manifest.json の内容精査・アイコン追加
- [x] OGP画像のパス・内容確認
- [x] Service Worker のキャッシュ戦略見直し

### 5. テスト・CI
- [ ] ユニットテスト（JavaScriptロジック分離後）
- [x] ESLint/Stylelint/markdownlint の導入
- [ ] カバレッジ90%以上

### 6. セキュリティ
- [x] XSS等の脆弱性静的解析
- [x] Service Workerの安全性確認

### 7. その他
- [x] README.md の最新化
- [x] .gitignore の整理

---

> チケット消化時は本ファイルの該当項目にチェックを入れ、進捗管理を行うこと。
