# モダンJavaScript学習ガイド

このガイドは、2024年以降のモダンなJavaScript開発を学ぶための教科書的な資料です。初学者から中級者まで、段階的に学習できるように構成されています。

## 📚 学習の進め方

このガイドは以下の順序で学習することを推奨します：

1. **基礎編** - JavaScript読み込みとES6の基本
2. **非同期処理編** - Promise、async/awaitの理解
3. **パフォーマンス最適化編** - 実践的な最適化テクニック
4. **ブラウザAPI編** - モダンなブラウザAPIの活用

## 📖 目次

### 1. 基礎編

モダンなJavaScript開発の基礎となる知識を学びます。

- [基礎編概要](./01_基礎/README.md)
- [Script読み込み（defer/async）](./01_基礎/01_script-loading.md)
- [モジュール（type="module"）](./01_基礎/02_modules.md)
- [ES6基礎知識](./01_基礎/03_es6-basics.md)

**学習内容：**
- scriptタグのdefer/async属性の使い分け
- モジュールによるスコープ管理
- let/const、アロー関数、クラス構文
- 分割代入、テンプレート文字列
- Promiseによる非同期処理の基礎

---

### 2. 非同期処理編

JavaScriptの非同期処理を深く理解します。

- [非同期処理概要](./02_非同期処理/README.md)
- [async/await](./02_非同期処理/01_async-await.md)
- [AbortController](./02_非同期処理/02_abort-controller.md)

**学習内容：**
- async/awaitによる読みやすい非同期コード
- Promise.allを使った並列処理
- try/catchによるエラーハンドリング
- AbortControllerでリクエストを中断する方法

---

### 3. パフォーマンス最適化編

実践的なパフォーマンス最適化テクニックを学びます。

- [パフォーマンス最適化概要](./03_パフォーマンス最適化/README.md)
- [デバウンス（Debounce）](./03_パフォーマンス最適化/01_debounce.md)

**学習内容：**
- デバウンスの仕組みと実装
- 検索ボックスの最適化
- フォーム自動保存の実装
- ボタンの二重クリック防止

---

### 4. ブラウザAPI編

モダンなブラウザAPIを使った効率的な実装を学びます。

- [ブラウザAPI概要](./04_ブラウザAPI/README.md)
- [Intersection Observer API](./04_ブラウザAPI/01_intersection-observer.md)
- [matchMedia API](./04_ブラウザAPI/02_match-media.md)

**学習内容：**
- Intersection Observerでスクロール連動エフェクト
- 従来のscrollイベントとの違い
- matchMediaでレスポンシブなJavaScript
- resizeイベントからの移行方法

---

## 🎯 学習目標

このガイドを完了すると、以下のスキルが身につきます：

- ✅ モダンなJavaScriptの構文（ES6+）を使える
- ✅ async/awaitで非同期処理を適切に書ける
- ✅ パフォーマンスを考慮した実装ができる
- ✅ モダンなブラウザAPIを活用できる
- ✅ スコープとモジュールを理解して使える

## 💻 実装サンプル

各トピックには実装可能なサンプルコードが含まれています。実際に動かして理解を深めましょう。

### サンプルの実行方法

```bash
# ローカルサーバーを起動（VS Code Live Serverなどを使用）
# または、ブラウザで直接HTMLファイルを開く
```

## 📝 学習のヒント

### 1. コードを実際に書く

読むだけでなく、必ず自分で書いて動かしましょう。エラーに遭遇することも重要な学習です。

### 2. ブラウザの開発者ツールを活用

- **Console**: console.logで変数の中身を確認
- **Network**: API通信の状態を確認
- **Debugger**: ブレークポイントでコードの動きを追う

### 3. 小さく始めて段階的に

最初から完璧を目指さず、まず動くものを作り、徐々に改善していきましょう。

### 4. 公式ドキュメントを読む習慣

MDNは最も信頼できる情報源です。わからないことがあればまずMDNを確認しましょう。

## 🔧 推奨される開発環境

### エディタ
- VS Code（推奨）
- WebStorm
- Cursor

### 便利な拡張機能（VS Code）
- ESLint - コード品質チェック
- Prettier - コードフォーマット
- Live Server - ローカルサーバー
- JavaScript (ES6) code snippets - スニペット

### ブラウザ
- Chrome（DevToolsが強力）
- Firefox Developer Edition
- Safari（iOS対応確認用）

## 📚 参考リソース

### 公式ドキュメント
- [MDN Web Docs](https://developer.mozilla.org/ja/) - 最も信頼できるリファレンス
- [ECMAScript仕様](https://tc39.es/ecma262/)

### オンライン学習
- [JavaScript.info](https://ja.javascript.info/) - 詳細な日本語チュートリアル
- [Web.dev](https://web.dev/learn/javascript/) - Googleの学習サイト

### ツール
- [Can I use](https://caniuse.com/) - ブラウザ対応確認
- [Babel REPL](https://babeljs.io/repl) - ES6+のトランスパイル確認

## 🎓 学習チェックリスト

### 基礎編
- [ ] defer/asyncの違いを理解し、使い分けられる
- [ ] type="module"でスコープを管理できる
- [ ] let/constを適切に使い分けられる
- [ ] アロー関数を書ける
- [ ] 分割代入を使える
- [ ] テンプレート文字列を使える
- [ ] Promiseの基本を理解している

### 非同期処理編
- [ ] async/awaitで非同期処理を書ける
- [ ] try/catchでエラーハンドリングできる
- [ ] Promise.allで並列処理ができる
- [ ] AbortControllerでリクエストを中断できる

### パフォーマンス最適化編
- [ ] デバウンスを実装できる
- [ ] 検索ボックスを最適化できる
- [ ] ボタンの二重クリックを防止できる

### ブラウザAPI編
- [ ] Intersection Observerでスクロール連動を実装できる
- [ ] matchMediaでレスポンシブな処理を書ける
- [ ] 従来の方法との違いを説明できる

## ⚠️ ブラウザ対応について

このガイドでは、iOS Safari 15系以上のサポートを基本としています。各セクションで具体的なブラウザ対応状況を記載しています。

### 主要ブラウザの対応状況

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

古いブラウザをサポートする必要がある場合は、Babelなどのトランスパイラの使用を検討してください。

## 🚀 次のステップ

このガイドを完了したら、以下にチャレンジしましょう：

1. **実践プロジェクトの作成**
   - ToDo アプリ
   - 天気予報アプリ
   - 画像ギャラリー

2. **フレームワークの学習**
   - React
   - Vue.js
   - Svelte

3. **より高度なトピック**
   - TypeScript
   - テスト（Jest、Vitest）
   - バンドラー（Vite、Webpack）

## 🔗 元記事

この学習資料は、以下の記事を参考に作成されています：

- [令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)

## 更新履歴

- 2024年 - 初版作成

---

**それでは、JavaScriptの学習を始めましょう！**
