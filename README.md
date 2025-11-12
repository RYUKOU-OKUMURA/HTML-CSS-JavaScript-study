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