# GitHub Copilot Custom Instructions
# Claude 3.5 Sonnet 相当の推論厳密さで GPT-4.1 Agent Mode を最大化するためのリポジトリ標準ガイド

---

## 1. グローバル原則
1. **Chain-of-Thought** を `<!-- COT: … -->` コメントで逐次公開すること。  
2. **PLAN → EDIT → TEST → SELF-REVIEW → COMMIT** の agentic ループを最低 1 周。  
3. ユニットテスト緑化・リンター (`eslint`, `black`, `markdownlint` など) エラーゼロを満たすまでコミット禁止。  
4. 生成コードは標準ライブラリ優先。新規依存追加時は理由を冒頭コメントに記述。  
5. RAG で **MCP** サーバ (`db`,`api`,`web`) を活用し、曖昧名を解決。  
6. **セキュリティファースト**: OWASP Top-10 該当箇所を静的解析し、警告ゼロに。  
7. 多言語バインディング変更時はクロスファイル影響を確認してから PR を作成。

---

## 2. コーディング規約（言語非依存）
- 変数: lowerCamel／定数: UPPER_SNAKE／公開 API: UpperCamel  
- すべての関数に **docstring** で *前提条件 / 事後条件* を明示。  
- エラー処理は例外 or Result 型。  
- テストは AAA パターン、**カバレッジ ≥ 90 %**。  
- 並列処理はデータ競合検査をパスすること（例: `go test -race`）。

---

## 3. Pull Request / Commit ポリシー
| 項目 | 要件 |
|------|------|
| PR タイトル | `[Feat|Fix|Refactor]: 要約 (≤ 50 chars)` |
| PR 本文 | Copilot 生成の **変更概要サマリ** を含める |
| Commit msg | imperative present + JIRA キー (例: `ABC-123: add OAuth flow`) |

---

## 4. チャット時キーワード
| キーワード | 効果例 |
|-----------|--------|
| `@plan`   | 例: `@plan migrate to FastAPI` |
| `@tests`  | 例: `@tests for utils/date.ts` |
| `@security` | 例: `@security review payment.ts` |
| `@explain`  | 例: `@explain data_loader.py` |

---

## 5. 禁止事項
- ライセンス不明コードの貼付  
- 機密情報の外部 API 送信  
- 1 M token 超の巨大コンテキスト投入 (コスト管理必須)

---

## 6. 参考資料
- Custom Instructions Guide: <https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot>  
- Markdown Prompting: <https://visualstudiomagazine.com/articles/2025/05/12/vs-code-1-10-showcases-detailed-markdown-copilot-prompting.aspx>  
- Copilot Best Practices: <https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot>

> **NOTE**: 本ファイルの改訂には Pull Request と 2 名以上のレビュー承認が必須。