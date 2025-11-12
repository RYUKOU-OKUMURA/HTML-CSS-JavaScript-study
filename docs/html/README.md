# モダンHTML学習ガイド

このガイドは、2024年以降のモダンなHTML開発を学ぶための教科書的な資料です。初学者から中級者まで、段階的に学習できるように構成されています。

## 📚 学習の進め方

このガイドは以下の順序で学習することを推奨します：

1. **基礎編** - HTMLの基本概念と構造
2. **セマンティックHTML編** - 意味のあるマークアップ
3. **画像最適化編** - パフォーマンスとUX向上
4. **アクセシビリティ編** - すべてのユーザーに配慮した設計
5. **パフォーマンス最適化編** - ページ速度の高速化

## 📖 目次

### 1. 基礎編
- [HTMLの基本](./01-basics/README.md)
  - HTMLとは何か
  - 基本的な構造
  - よく使う要素

### 2. セマンティックHTML編
モダンなHTMLでは、意味のある要素を使うことが重要です。

- [セマンティックHTML概要](./02-semantic-html/README.md)
- [Details/Summary要素（アコーディオン）](./02-semantic-html/01-details-summary.md)
- [Dialog要素（モーダル）](./02-semantic-html/02-dialog.md)
- [Hgroup要素（見出しグループ）](./02-semantic-html/03-hgroup.md)
- [Search要素（検索フォーム）](./02-semantic-html/04-search.md)

### 3. 画像最適化編
Webパフォーマンスの鍵となる画像の最適化について学びます。

- [画像最適化概要](./03-images/README.md)
- [Lazy Loading（遅延読み込み）](./03-images/01-lazy-loading.md)
- [Picture要素（レスポンシブ画像）](./03-images/02-picture-element.md)
- [Decoding属性（デコード制御）](./03-images/03-decoding.md)
- [ぼかし効果とプレースホルダー](./03-images/04-blur-effect.md)

### 4. アクセシビリティ編
すべてのユーザーが使いやすいWebサイトを作るための知識です。

- [アクセシビリティ概要](./04-accessibility/README.md)
- [WCAG基礎](./04-accessibility/01-wcag-basics.md)
- [WAI-ARIA](./04-accessibility/02-wai-aria.md)
- [アクセシブルなタブUI](./04-accessibility/03-accessible-tabs.md)

### 5. パフォーマンス最適化編
ページ速度とCore Web Vitalsを改善するための技術です。

- [パフォーマンス最適化概要](./05-performance/README.md)
- [Link Preload（リソースの先読み）](./05-performance/01-link-preload.md)

## 💻 実装サンプル

各トピックの実装サンプルは[examples](../../examples/html/)フォルダにあります：

- [アコーディオンのサンプル](../../examples/html/accordion/)
- [モーダルのサンプル](../../examples/html/modal/)
- [画像最適化のサンプル](../../examples/html/images/)
- [タブUIのサンプル](../../examples/html/tabs/)

## 🎯 学習目標

このガイドを完了すると、以下のスキルが身につきます：

- ✅ セマンティックなHTMLを書ける
- ✅ パフォーマンスを考慮した画像実装ができる
- ✅ アクセシビリティに配慮したマークアップができる
- ✅ モダンなHTML要素を適切に使える
- ✅ ブラウザ対応を考慮した実装ができる
- ✅ Core Web Vitalsを改善できる
- ✅ リソースの最適な読み込み方法を選択できる

## 📝 注意事項

### ブラウザ対応

このガイドでは、iOS Safari 15系以上のサポートを基本としています。一部の機能はそれ以降のバージョンが必要な場合があります。各セクションでブラウザ対応状況を記載しています。

### コードの実行

サンプルコードは実際に動作するように作成されています。ローカルで試す場合は、適切なWebサーバー上で実行してください。

## 🔗 参考リンク

- [MDN Web Docs](https://developer.mozilla.org/ja/)
- [HTML Standard](https://html.spec.whatwg.org/)
- [Can I use](https://caniuse.com/) - ブラウザ対応状況の確認

## 更新履歴

- 2024年 - 初版作成
