# HTML / CSS / JavaScript 学習リポジトリ

このリポジトリは、モダンなHTML / CSS / JavaScriptの学習資料を集めた教科書的なリソースです。初学者から中級者まで、段階的に学習できるように構成されています。

## 📚 資料について

この資料は、[令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)の記事を参考に、各トピックを詳しく解説・拡張したものです。

iOS Safari 15系以上でサポートされている、2024年現在のモダンな実装方法を中心に扱っています。

## 🎯 対象者

- Web開発を始めたばかりの初学者
- 基礎的なHTML/CSS/JavaScriptは理解しているが、モダンな書き方を学びたい方
- 実務で使える実践的な知識を身につけたい方

---

## 📖 学習コンテンツ

### 📄 HTML学習ガイド

モダンなHTML開発のための包括的なガイドです。

**[HTML学習ガイド →](./HTML/README.md)**

#### 主なトピック

1. **基礎編** - HTMLの基本構造とよく使う要素
2. **セマンティックHTML編** - Details/Summary、Dialog、Hgroup、Search
3. **画像最適化編** - Lazy Loading、Picture要素、Decoding属性
4. **アクセシビリティ編** - WCAG基礎、WAI-ARIA、アクセシブルなUI

---

### 🎨 CSS学習ガイド

現代のWeb開発に必須のCSSテクニックを6つのカテゴリーに分けて解説しています。

**[CSS学習ガイド →](./CSS/README.md)**

#### [01. セレクタ編](./CSS/01_セレクタ/)

**学習内容:**
- `:has()` - 親セレクタとして使える画期的なセレクタ
- `:is()` - セレクタをまとめて簡潔に記述
- `:where()` - 詳細度0で上書きしやすいスタイル
- セレクタの詳細度（Specificity）の理解

[📄 詳細を見る](./CSS/01_セレクタ/README.md)

---

#### [02. レイアウト編](./CSS/02_レイアウト/)

**学習内容:**
- Grid Layout - 2次元レイアウトの基礎から応用
- Subgrid - 複数要素の高さを自動的に揃える
- gap - アイテム間の余白を簡単に設定
- 配置プロパティ - inset、margin-inline、place-content

[📄 詳細を見る](./CSS/02_レイアウト/README.md)

---

#### [03. 視覚効果編](./CSS/03_視覚効果/)

**学習内容:**
- filter - ぼかし、明度、グレースケールなどの視覚効果
- mix-blend-mode - Photoshopのようなブレンドモード
- clip-path - 要素を図形で切り抜く
- transform独立プロパティ - translate、scale、rotateを個別制御

[📄 詳細を見る](./CSS/03_視覚効果/README.md)

---

#### [04. モダンプロパティ編](./CSS/04_モダンプロパティ/)

**学習内容:**
- currentColor - 色の同期を簡単に
- clamp() - メディアクエリ不要のレスポンシブサイズ
- 新ビューポートユニット - svh、dvh、lvh（モバイル対応）
- word-break - 正しいテキスト折り返し

[📄 詳細を見る](./CSS/04_モダンプロパティ/README.md)

---

#### [05. アクセシビリティ編](./CSS/05_アクセシビリティ/)

**学習内容:**
- モダンメディアクエリ - Range Syntaxで簡潔に
- any-hover - 入力方式に応じたホバー対応
- prefers-reduced-motion - アニメーション削減設定への対応
- Visually Hidden - スクリーンリーダー対応

[📄 詳細を見る](./CSS/05_アクセシビリティ/README.md)

---

#### [06. 実装パターン編](./CSS/06_実装パターン/)

**学習内容:**
- アコーディオン - Details要素のアニメーション
- タブUI - アクセシブルな実装
- カードレイアウト - Grid + Subgrid
- レスポンシブ画像ギャラリー
- スムーススクロール

[📄 詳細を見る](./CSS/06_実装パターン/README.md)

---

### 💻 JavaScript学習ガイド ✨NEW

モダンなJavaScript開発を学ぶための包括的なガイドです。

**[JavaScript学習ガイド →](./JavaScript/README.md)**

#### 主なトピック

1. **基礎編** - Script読み込み（defer/async）、モジュール、ES6基礎知識
2. **非同期処理編** - async/await、AbortController
3. **パフォーマンス最適化編** - デバウンス（Debounce）
4. **ブラウザAPI編** - Intersection Observer API、matchMedia API

**学習内容の例:**
- ✅ defer/asyncの違いと使い分け
- ✅ type="module"でスコープ管理
- ✅ let/const、アロー関数、クラス構文
- ✅ async/awaitで読みやすい非同期コード
- ✅ デバウンスで検索ボックスを最適化
- ✅ Intersection Observerでスクロール連動エフェクト
- ✅ matchMediaでレスポンシブなJavaScript

---

### 🐍 Python学習ガイド ✨NEW

モダンなPython開発を学ぶための包括的なガイドです。

**[Python学習ガイド →](./Python/README.md)**

#### 主なトピック

1. **基礎編** - 変数とデータ型、制御構文、関数、例外処理
2. **データ構造編** - リスト、辞書、タプル、セット、内包表記
3. **オブジェクト指向編** - クラス、継承、特殊メソッド、デコレータ
4. **標準ライブラリ編** - ファイル操作、日付・時刻、JSON、正規表現

**学習内容の例:**
- ✅ Pythonの基本文法とデータ型
- ✅ リスト、辞書などのデータ構造の使い分け
- ✅ クラスを使ったオブジェクト指向プログラミング
- ✅ pathlibやdatetimeなど実践的な標準ライブラリ
- ✅ Pythonic なコードスタイル

---

## 🚀 学習の進め方

### ステップ1: 基礎から順番に学ぶ

```
1. HTML基礎 → セマンティックHTML → 画像最適化 → アクセシビリティ
2. CSSセレクタ → レイアウト → 視覚効果 → モダンプロパティ → アクセシビリティ
3. JavaScript基礎 → 非同期処理 → パフォーマンス最適化 → ブラウザAPI
4. Python基礎 → データ構造 → オブジェクト指向 → 標準ライブラリ
```

### ステップ2: デモで実際の動きを確認

各セクションに実装可能なサンプルコードが含まれています。

### ステップ3: 自分で書いて試す

1. サンプルコードを読む
2. 自分で同じものを書いてみる
3. 少し変更して動作を確認
4. 自分のプロジェクトで使ってみる

### ステップ4: 実践プロジェクトに挑戦

学んだ知識を活かして、以下のようなプロジェクトに挑戦しましょう：

- **カードグリッド** - Grid Layout + Subgridで統一感のあるカード
- **ダークモード対応サイト** - currentColorとCSS変数で効率的に
- **アクセシブルなフォーム** - 適切なメディアクエリとVisually Hidden
- **レスポンシブLP** - clamp()とモダンなビューポートユニット
- **検索機能** - デバウンスとfetch APIで最適化
- **スクロールアニメーション** - Intersection Observerで実装

---

## 📂 フォルダ構造

```
HTML-CSS-JavaScript-study/
├── README.md                    # このファイル
├── HTML/                        # HTML学習資料
│   ├── README.md
│   ├── 01_基礎/
│   ├── 02_セマンティックHTML/
│   ├── 03_画像最適化/
│   ├── 04_アクセシビリティ/
│   └── 05_パフォーマンス/
├── CSS/                         # CSS学習資料
│   ├── README.md
│   ├── 01_セレクタ/
│   ├── 02_レイアウト/
│   ├── 03_視覚効果/
│   ├── 04_モダンプロパティ/
│   ├── 05_アクセシビリティ/
│   └── 06_実装パターン/
├── JavaScript/                  # JavaScript学習資料
│   ├── README.md
│   ├── 01_基礎/
│   ├── 02_非同期処理/
│   ├── 03_パフォーマンス最適化/
│   └── 04_ブラウザAPI/
├── Python/                      # Python学習資料
│   ├── README.md
│   ├── 01_基礎/
│   ├── 02_データ構造/
│   ├── 03_オブジェクト指向/
│   └── 04_標準ライブラリ/
└── examples/                    # 実装サンプル
    ├── HTML/
    ├── CSS/
    └── JavaScript/
```

---

## 🎓 学習目標

このリポジトリで学習を完了すると、以下のスキルが身につきます：

### HTML
- ✅ セマンティックなHTMLを書ける
- ✅ モダンなHTML要素（dialog、details、searchなど）を使える
- ✅ 画像のパフォーマンス最適化ができる
- ✅ アクセシビリティに配慮したマークアップができる

### CSS
- ✅ モダンなセレクタ（:has()、:is()、:where()）を使える
- ✅ Grid LayoutとSubgridでレイアウトを作成できる
- ✅ filterやmix-blend-modeで視覚効果を実装できる
- ✅ clamp()やビューポートユニットでレスポンシブ対応できる
- ✅ アクセシビリティに配慮したCSSを書ける

### JavaScript
- ✅ モダンなJavaScript構文（ES6+）を使える
- ✅ async/awaitで非同期処理を適切に書ける
- ✅ パフォーマンスを考慮した実装ができる
- ✅ モダンなブラウザAPIを活用できる
- ✅ スコープとモジュールを理解して使える

### Python
- ✅ Pythonの基本文法を理解し、簡単なプログラムを書ける
- ✅ リスト、辞書などのデータ構造を適切に使い分けられる
- ✅ クラスを使ったオブジェクト指向プログラミングができる
- ✅ 標準ライブラリを活用して実践的なコードが書ける
- ✅ Pythonic なコードスタイルを身につけられる

---

## 🔧 開発環境

### 推奨ツール

- **エディタ**: VS Code、WebStorm、Cursor
- **ブラウザ**: Chrome（DevToolsが強力）
- **拡張機能**:
  - Live Server（ローカルサーバー）
  - Prettier（コードフォーマット）
  - ESLint（JavaScriptの品質チェック）
  - axe DevTools（アクセシビリティチェック）

### チェックツール

- **Lighthouse**: パフォーマンス・アクセシビリティ測定
- **WAVE**: アクセシビリティチェック
- **Can I use**: ブラウザ対応確認

---

## 📝 学習のヒント

### コードを書く時の心構え

1. **まずは動かす** - 完璧を目指さず、まず動くものを作る
2. **少しずつ改善** - 動いたら、少しずつ改良していく
3. **失敗を恐れない** - エラーは学びのチャンス
4. **実際に使う** - 学んだことは必ず実践で使う

### ブラウザの開発者ツールを活用

- **要素の検証** - 右クリック → 検証
- **スタイルの編集** - リアルタイムでCSSを変更して実験
- **Console** - console.logでJavaScriptのデバッグ
- **Network** - API通信の監視
- **レスポンシブモード** - 様々な画面サイズで確認
- **アクセシビリティチェック** - Lighthouseで評価

### 困った時のリソース

- **MDN Web Docs** - 公式ドキュメント（日本語対応）
- **Can I use** - ブラウザ対応状況を確認
- **Stack Overflow** - 質問と回答のコミュニティ
- **JavaScript.info** - JavaScriptの詳細なチュートリアル

---

## 🎓 学習チェックリスト

各セクションを学習したら、チェックを入れていきましょう。

### HTML
- [ ] セマンティックなHTML要素を理解した
- [ ] Details/Summary、Dialogを使える
- [ ] 画像の遅延読み込みを実装できる
- [ ] アクセシビリティに配慮できる

### CSS
- [ ] `:has()`、`:is()`、`:where()`の違いを理解した
- [ ] Grid Layoutの基本を理解した
- [ ] filterとtransitionを組み合わせたホバー効果を作れる
- [ ] clamp()でレスポンシブなサイズ設定ができる
- [ ] prefers-reduced-motionに対応できる

### JavaScript
- [ ] defer/asyncの違いを理解し、使い分けられる
- [ ] type="module"でスコープを管理できる
- [ ] async/awaitで非同期処理を書ける
- [ ] デバウンスを実装できる
- [ ] Intersection Observerでスクロール連動を実装できる
- [ ] matchMediaでレスポンシブなJavaScriptを書ける

### Python
- [ ] 変数とデータ型を理解している
- [ ] if文、for文、while文を使える
- [ ] 関数を定義できる
- [ ] リスト、辞書を使ってデータを管理できる
- [ ] クラスを定義してインスタンスを作成できる
- [ ] pathlibやdatetimeなど標準ライブラリを使える

### 実践
- [ ] カードグリッドを作成した
- [ ] レスポンシブなレイアウトを作成した
- [ ] アクセシブルなコンポーネントを作成した
- [ ] 実際のプロジェクトで学んだ知識を使った

---

## 💡 推奨される学習順序

### レベル1: 初学者

1. [HTML基礎](./HTML/01_基礎/README.md)
2. [セマンティックHTML](./HTML/02_セマンティックHTML/README.md)
3. [CSSセレクタ編](./CSS/01_セレクタ/README.md)
4. [JavaScript基礎編](./JavaScript/01_基礎/README.md)
5. [Python基礎編](./Python/01_基礎/README.md)

### レベル2: 中級者

1. [CSSレイアウト編](./CSS/02_レイアウト/README.md)
2. [JavaScript非同期処理編](./JavaScript/02_非同期処理/README.md)
3. [Pythonデータ構造編](./Python/02_データ構造/README.md)
4. [画像最適化](./HTML/03_画像最適化/README.md)
5. 実際のプロジェクトに適用

### レベル3: 上級者

1. [JavaScriptパフォーマンス最適化編](./JavaScript/03_パフォーマンス最適化/README.md)
2. [JavaScriptブラウザAPI編](./JavaScript/04_ブラウザAPI/README.md)
3. [Pythonオブジェクト指向編](./Python/03_オブジェクト指向/README.md)
4. [Python標準ライブラリ編](./Python/04_標準ライブラリ/README.md)
5. すべてのベストプラクティスを組み合わせる
6. パフォーマンス測定とチューニング

---

## 🔗 参考リンク

### 公式ドキュメント

- [MDN Web Docs](https://developer.mozilla.org/ja/)
- [HTML Standard](https://html.spec.whatwg.org/)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)
- [ECMAScript仕様](https://tc39.es/ecma262/)

### 学習リソース

- [Web.dev](https://web.dev/)
- [JavaScript.info](https://ja.javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)

### ツール

- [Can I use](https://caniuse.com/)
- [Clippy - clip-path maker](https://bennettfeely.com/clippy/)
- [Babel REPL](https://babeljs.io/repl)

### 元記事

- [令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)

---

## 🤝 コントリビューション

このリポジトリへの貢献を歓迎します！

- タイポや誤りの修正
- 新しいサンプルコードの追加
- ドキュメントの改善
- 翻訳（英語など）

## 📄 ライセンス

この学習資料は教育目的で作成されています。自由に学習・参照してください。

---

**Happy Learning! 楽しく学んでいきましょう！** 🎉📚✨
