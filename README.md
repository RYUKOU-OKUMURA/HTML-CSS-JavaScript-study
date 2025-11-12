# HTML / CSS / JavaScript 学習資料

初学者向けの詳細な学習資料です。モダンなWeb開発に必要な知識を、基礎から実践まで体系的に学べます。

## 📚 資料について

この資料は、[令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)の記事を参考に、各トピックを詳しく解説・拡張したものです。

iOS Safari 15系以上でサポートされている、2024年現在のモダンな実装方法を中心に扱っています。

## 🎯 対象者

- Web開発を始めたばかりの初学者
- 基礎的なHTML/CSSは理解しているが、モダンな書き方を学びたい方
- 実務で使える実践的な知識を身につけたい方

## 📖 学習コンテンツ

### CSS編

現代のWeb開発に必須のCSSテクニックを5つのカテゴリーに分けて解説しています。

#### [01. セレクタ編](./CSS/01_セレクタ/)
モダンなCSSセレクタの使い方を学びます。

**学習内容:**
- `:has()` - 親セレクタとして使える画期的なセレクタ
- `:is()` - セレクタをまとめて簡潔に記述
- `:where()` - 詳細度0で上書きしやすいスタイル
- セレクタの詳細度（Specificity）の理解

**実践例:**
- 条件付きスタイリング
- コードの簡潔化
- フレームワーク開発のベーススタイル

[📄 詳細を見る](./CSS/01_セレクタ/README.md) | [💻 デモを見る](./CSS/01_セレクタ/examples/)

---

#### [02. レイアウト編](./CSS/02_レイアウト/)
Grid Layoutを中心とした、モダンなレイアウト技術を学びます。

**学習内容:**
- **Grid Layout** - 2次元レイアウトの基礎から応用
- **Subgrid** - 複数要素の高さを自動的に揃える
- **gap** - アイテム間の余白を簡単に設定
- **配置プロパティ** - inset、margin-inline、place-content
- **その他** - object-fit、aspect-ratio、fit-content

**実践例:**
- レスポンシブカードグリッド
- Holy Grail Layout
- 完全中央配置

[📄 詳細を見る](./CSS/02_レイアウト/README.md) | [💻 デモを見る](./CSS/02_レイアウト/examples/)

---

#### [03. 視覚効果編](./CSS/03_視覚効果/)
filterやblendモードなど、視覚的なエフェクトを学びます。

**学習内容:**
- **filter** - ぼかし、明度、グレースケールなどの視覚効果
- **mix-blend-mode** - Photoshopのようなブレンドモード
- **clip-path** - 要素を図形で切り抜く
- **transform独立プロパティ** - translate、scale、rotateを個別制御
- **transition** - 滑らかなアニメーション

**実践例:**
- ホバー時のビジュアル演出
- カラーオーバーレイ
- 斜めのセクション区切り

[📄 詳細を見る](./CSS/03_視覚効果/README.md)

---

#### [04. モダンプロパティ編](./CSS/04_モダンプロパティ/)
最新のCSS機能と便利なプロパティを学びます。

**学習内容:**
- **currentColor** - 色の同期を簡単に
- **clamp()** - メディアクエリ不要のレスポンシブサイズ
- **新ビューポートユニット** - svh、dvh、lvh（モバイル対応）
- **word-break** - 正しいテキスト折り返し
- **border-radius: 100vmax** - 完璧な角丸ボタン

**実践例:**
- レスポンシブタイポグラフィ
- モバイルフレンドリーなビューポート
- SVGアイコンの色同期

[📄 詳細を見る](./CSS/04_モダンプロパティ/README.md)

---

#### [05. アクセシビリティ編](./CSS/05_アクセシビリティ/)
すべてのユーザーに配慮したWebサイト作りを学びます。

**学習内容:**
- **モダンメディアクエリ** - Range Syntaxで簡潔に
- **any-hover** - 入力方式に応じたホバー対応
- **prefers-reduced-motion** - アニメーション削減設定への対応
- **Visually Hidden** - スクリーンリーダー対応

**実践例:**
- アクセシブルなホバー効果
- アニメーション削減の実装
- スキップリンクの追加

[📄 詳細を見る](./CSS/05_アクセシビリティ/README.md)

---

#### [06. 実装パターン編](./CSS/06_実装パターン/)
実務でよく使われる具体的な実装パターンを学びます。

**学習内容:**
- **Details開閉アニメーション** - CSSのみ / JavaScript両方の実装
- **アクセシブルなタブUI** - WAI-ARIA + キーボード操作の完全実装

**実践例:**
- Details要素の滑らかな開閉アニメーション
- アクセシビリティに配慮したタブUI
- スクリーンリーダー対応の実装

**デモ:**
- [Details開閉アニメーション（JS版）](./CSS/06_実装パターン/examples/details-animation-js.html)
- [アクセシブルなタブUI](./CSS/06_実装パターン/examples/accessible-tabs.html)

[📄 詳細を見る](./CSS/06_実装パターン/README.md)

---

## 🚀 学習の進め方

### ステップ1: 基礎から順番に学ぶ
1. **セレクタ編** - CSSの基本であるセレクタから始めましょう
2. **レイアウト編** - モダンなレイアウト技術を習得
3. **視覚効果編** - 見た目を整える技術を学ぶ
4. **モダンプロパティ編** - 最新機能で効率化
5. **アクセシビリティ編** - すべてのユーザーへの配慮
6. **実装パターン編** - 実践的な実装パターンを習得

### ステップ2: デモで実際の動きを確認
各セクションの`examples/`フォルダに、実際に動くHTMLファイルがあります。

```bash
# ブラウザで開いて動作を確認
open CSS/01_セレクタ/examples/has-selector-demo.html
```

### ステップ3: 自分で書いて試す
1. デモのコードを読む
2. 自分で同じものを書いてみる
3. 少し変更して動作を確認
4. 自分のプロジェクトで使ってみる

### ステップ4: 実践プロジェクトに挑戦
学んだ知識を活かして、以下のようなプロジェクトに挑戦しましょう：

- **カードグリッド** - Grid Layout + Subgridで統一感のあるカード
- **ダークモード対応サイト** - currentColorとCSS変数で効率的に
- **アクセシブルなフォーム** - 適切なメディアクエリとVisually Hidden
- **レスポンシブLP** - clamp()とモダンなビューポートユニット

## 📝 学習のヒント

### コードを書く時の心構え
1. **まずは動かす** - 完璧を目指さず、まず動くものを作る
2. **少しずつ改善** - 動いたら、少しずつ改良していく
3. **失敗を恐れない** - エラーは学びのチャンス
4. **実際に使う** - 学んだことは必ず実践で使う

### ブラウザの開発者ツールを活用
- **要素の検証** - 右クリック → 検証
- **スタイルの編集** - リアルタイムでCSSを変更して実験
- **レスポンシブモード** - 様々な画面サイズで確認
- **アクセシビリティチェック** - Lighthouseで評価

### 困った時のリソース
- **MDN Web Docs** - 公式ドキュメント（日本語対応）
- **Can I use** - ブラウザ対応状況を確認
- **CSS Tricks** - 実践的なチュートリアル
- **Stack Overflow** - 質問と回答のコミュニティ

## 🔧 開発環境

### 推奨ツール
- **エディタ**: VS Code
  - 拡張機能: Live Server、CSS Peek、IntelliSense for CSS
- **ブラウザ**: Chrome / Firefox / Safari（最新版）
- **その他**: Git、npm（将来的に必要）

### 最小構成のHTMLテンプレート
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>練習ページ</title>
  <style>
    /* ここにCSSを書く */
  </style>
</head>
<body>
  <!-- ここにHTMLを書く -->
</body>
</html>
```

## 🎓 学習チェックリスト

各セクションを学習したら、チェックを入れていきましょう。

### CSS基礎
- [ ] `:has()`、`:is()`、`:where()`の違いを理解した
- [ ] セレクタの詳細度を理解した
- [ ] Grid Layoutの基本を理解した
- [ ] Subgridで高さを揃えることができる
- [ ] gapプロパティを使える

### CSS応用
- [ ] filterとtransitionを組み合わせたホバー効果を作れる
- [ ] mix-blend-modeを使った合成ができる
- [ ] clip-pathで図形を作成できる
- [ ] translate、scale、rotateを個別に制御できる
- [ ] clamp()でレスポンシブなサイズ設定ができる

### アクセシビリティ
- [ ] any-hoverを使ったホバー対応ができる
- [ ] prefers-reduced-motionに対応できる
- [ ] Visually Hiddenを実装できる
- [ ] キーボード操作をテストする習慣がついた

### 実践
- [ ] カードグリッドを作成した
- [ ] レスポンシブなレイアウトを作成した
- [ ] アクセシブルなコンポーネントを作成した
- [ ] 実際のプロジェクトで学んだ知識を使った

## 📚 今後の学習計画

### CSS上級編（今後追加予定）
- CSS Variables（カスタムプロパティ）
- CSS Container Queries
- CSS Nesting
- CSS Layers（@layer）

### HTML編（今後追加予定）
- セマンティックHTML
- アクセシブルなフォーム
- メタデータとSEO
- HTML5の新要素

### JavaScript編（今後追加予定）
- JavaScript基礎
- DOM操作
- イベント処理
- 非同期処理

## 🔗 参考リンク

### 公式ドキュメント
- [MDN Web Docs](https://developer.mozilla.org/ja/)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)

### ブラウザ対応確認
- [Can I use](https://caniuse.com/)

### 便利なツール
- [Clippy - clip-path maker](https://bennettfeely.com/clippy/)
- [Min-Max Calculator](https://min-max-calculator.9elements.com/)

### 元記事
- [令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)

## 📄 ライセンス

この学習資料は教育目的で作成されています。自由に学習・参照してください。

## 🤝 コントリビューション

改善提案や誤りの指摘は大歓迎です。Issueやプルリクエストをお待ちしています。

---

**Happy Learning! 楽しく学んでいきましょう！** 🎉
# HTML / CSS / JavaScript 学習リポジトリ

このリポジトリは、モダンなHTML / CSS / JavaScriptの学習資料を集めた教科書的なリソースです。初学者から中級者まで、段階的に学習できるように構成されています。

## 📚 目次

### HTML学習ガイド

モダンなHTML開発のための包括的なガイドです。

**[HTML学習ガイド →](./docs/html/README.md)**

#### 主なトピック

1. **基礎編**
   - HTMLの基本構造
   - よく使う要素
   - セマンティックHTML

2. **セマンティックHTML編**
   - Details/Summary（アコーディオン）
   - Dialog（モーダル）
   - Hgroup（見出しグループ）
   - Search（検索フォーム）

3. **画像最適化編**
   - Lazy Loading（遅延読み込み）
   - Picture要素（レスポンシブ画像）
   - Decoding属性

4. **アクセシビリティ編**
   - WCAG基礎
   - WAI-ARIA
   - アクセシブルなUI実装

### CSS学習ガイド（準備中）

Coming soon...

### JavaScript学習ガイド（準備中）

Coming soon...

## 🎯 学習の進め方

### 1. 基礎から順番に学ぶ

```
HTML基礎 → セマンティックHTML → 画像最適化 → アクセシビリティ
```

### 2. 実装サンプルで試す

各トピックには実装可能なサンプルコードが用意されています。

```
examples/
  html/
    accordion/    - Details/Summaryの実装例
    modal/        - Dialogの実装例
    images/       - 画像最適化の実装例
    tabs/         - タブUIの実装例
```

### 3. ドキュメントで深く理解する

詳細なドキュメントで各機能の仕組みを理解します。

```
docs/
  html/
    01-basics/           - HTML基礎
    02-semantic-html/    - セマンティックHTML
    03-images/           - 画像最適化
    04-accessibility/    - アクセシビリティ
```

## 📂 フォルダ構造

```
HTML-CSS-JavaScript-study/
├── README.md                    # このファイル
├── docs/                        # 学習ドキュメント
│   └── html/
│       ├── README.md            # HTML学習ガイド目次
│       ├── 01-basics/           # HTML基礎編
│       ├── 02-semantic-html/    # セマンティックHTML編
│       ├── 03-images/           # 画像最適化編
│       └── 04-accessibility/    # アクセシビリティ編
└── examples/                    # 実装サンプル
    └── html/
        ├── accordion/           # アコーディオンの例
        ├── modal/               # モーダルの例
        ├── images/              # 画像最適化の例
        └── tabs/                # タブUIの例
```

## 🚀 始め方

### 1. HTMLの学習を始める

```bash
# ドキュメントを読む
open docs/html/README.md

# 基礎から学ぶ
open docs/html/01-basics/README.md
```

### 2. サンプルコードを動かす

```bash
# アコーディオンの例を開く
open examples/html/accordion/index.html

# モーダルの例を開く
open examples/html/modal/index.html
```

## 📖 学習リソース

このリポジトリは、以下の情報源を参考に作成されています：

- [令和のHTML / CSS / JavaScriptの書き方50選](https://zenn.dev/necscat/articles/bc9bba54babaf5)
- [MDN Web Docs](https://developer.mozilla.org/ja/)
- [W3C HTML Standard](https://html.spec.whatwg.org/)
- [Web.dev](https://web.dev/)

## 🎓 学習目標

このリポジトリで学習を完了すると、以下のスキルが身につきます：

### HTML

- ✅ セマンティックなHTMLを書ける
- ✅ モダンなHTML要素（dialog、details、searchなど）を使える
- ✅ 画像のパフォーマンス最適化ができる
- ✅ アクセシビリティに配慮したマークアップができる

### CSS（準備中）

- レスポンシブデザイン
- Grid / Flexbox
- モダンなCSS機能

### JavaScript（準備中）

- モダンなJavaScript構文
- DOM操作
- 非同期処理

## 💡 推奨される学習順序

### レベル1: 初学者

1. [HTML基礎](./docs/html/01-basics/README.md)
2. [セマンティックHTML](./docs/html/02-semantic-html/README.md)
3. 実装サンプルを動かしてみる

### レベル2: 中級者

1. [画像最適化](./docs/html/03-images/README.md)
2. [アクセシビリティ](./docs/html/04-accessibility/README.md)
3. 実際のプロジェクトに適用

### レベル3: 上級者

1. すべてのベストプラクティスを組み合わせる
2. パフォーマンス測定とチューニング
3. クロスブラウザ対応

## 🛠️ 開発環境

### 推奨ツール

- **エディタ**: VSCode, WebStorm, Cursor
- **ブラウザ**: Chrome（DevToolsが強力）
- **拡張機能**:
  - Live Server（ローカルサーバー）
  - Prettier（コードフォーマット）
  - axe DevTools（アクセシビリティチェック）

### チェックツール

- **Lighthouse**: パフォーマンス・アクセシビリティ測定
- **WAVE**: アクセシビリティチェック
- **Can I use**: ブラウザ対応確認

## 📝 今後の予定

- [ ] CSS学習ガイドの作成
- [ ] JavaScript学習ガイドの作成
- [ ] より多くの実装サンプル
- [ ] 演習問題の追加
- [ ] 動画チュートリアル

## 🤝 コントリビューション

このリポジトリへの貢献を歓迎します！

- タイポや誤りの修正
- 新しいサンプルコードの追加
- ドキュメントの改善
- 翻訳（英語など）

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 参考リンク

### 公式ドキュメント

- [MDN Web Docs](https://developer.mozilla.org/ja/)
- [HTML Standard](https://html.spec.whatwg.org/)
- [W3C](https://www.w3.org/)

### 学習リソース

- [Web.dev](https://web.dev/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### ツール

- [Can I use](https://caniuse.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Happy Learning! 📚✨**
