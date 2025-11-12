# 画像最適化編

Webサイトのパフォーマンスにおいて、画像の最適化は最も重要な要素の一つです。このセクションでは、モダンな画像実装のベストプラクティスを学びます。

## なぜ画像最適化が重要なのか

### パフォーマンスへの影響

Webページの容量の約50〜70%は画像が占めています。

- **ページ読み込み速度の向上**: 画像の最適化で読み込み時間を大幅に短縮
- **帯域幅の節約**: 特にモバイルユーザーにとって重要
- **SEOの改善**: Googleはページ速度をランキング要因として評価

### ユーザー体験の向上

- **初期表示の高速化**: コンテンツがすぐに見える
- **スムーズなスクロール**: 遅延読み込みで動作が軽快
- **データ通信量の削減**: モバイルユーザーに優しい

## 画像最適化の3本柱

このセクションで学ぶ主要な技術：

### 1. Lazy Loading（遅延読み込み）

画面に表示される直前まで画像の読み込みを遅延させる技術です。

[詳しく学ぶ →](./01-lazy-loading.md)

```html
<img src="image.jpg" alt="説明" loading="lazy">
```

**メリット:**
- 初期読み込み時間の短縮
- 帯域幅の節約
- HTML属性1つで実装可能

### 2. Picture要素（レスポンシブ画像）

画面サイズや解像度に応じて、最適な画像を出し分ける技術です。

[詳しく学ぶ →](./02-picture-element.md)

```html
<picture>
  <source srcset="image-mobile.jpg" media="(max-width: 767px)">
  <source srcset="image-tablet.jpg" media="(max-width: 1023px)">
  <img src="image-desktop.jpg" alt="説明">
</picture>
```

**メリット:**
- デバイスに最適な画像サイズ
- アートディレクション対応
- 次世代フォーマット（WebP、AVIF）の段階的採用

### 3. Decoding属性（デコード制御）

画像のデコード方法をブラウザに指示する技術です。

[詳しく学ぶ →](./03-decoding.md)

```html
<img src="image.jpg" alt="説明" decoding="async">
```

**メリット:**
- メインスレッドのブロッキング防止
- パフォーマンスの微調整

## 基本的なベストプラクティス

### 必須の実装

```html
<img
  src="image.jpg"
  alt="画像の説明"
  width="800"
  height="600"
  loading="lazy">
```

**各属性の役割:**

| 属性 | 役割 | 重要度 |
|------|------|--------|
| `src` | 画像ファイルのパス | 必須 |
| `alt` | 代替テキスト（アクセシビリティ・SEO） | 必須 |
| `width`/`height` | レイアウトシフト防止 | 強く推奨 |
| `loading` | 遅延読み込み | 推奨 |
| `decoding` | デコード制御 | オプション |

## レイアウトシフトの防止

### 問題：CLS（Cumulative Layout Shift）

画像のサイズが指定されていないと、読み込み後にレイアウトがずれます。

```html
<!-- ❌ 悪い例 -->
<img src="image.jpg" alt="説明">
<!-- 画像読み込み後にコンテンツが下にずれる -->
```

### 解決策：width/height属性の指定

```html
<!-- ✅ 良い例 -->
<img src="image.jpg" alt="説明" width="800" height="600">
<!-- ブラウザが事前にスペースを確保 -->
```

### CSSとの組み合わせ

```html
<img
  src="image.jpg"
  alt="説明"
  width="800"
  height="600"
  style="max-width: 100%; height: auto;">
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

**ポイント:**
- HTML属性でアスペクト比を指定
- CSSでレスポンシブ対応

## 画像フォーマットの選択

### 用途別の推奨フォーマット

| 用途 | 推奨フォーマット | 理由 |
|------|----------------|------|
| 写真 | WebP → JPEG | 高品質・小サイズ |
| イラスト・アイコン | SVG → PNG | スケーラブル |
| アニメーション | WebP → GIF | 小サイズ・高品質 |
| 背景パターン | SVG → PNG | 繰り返しパターンに最適 |

### 次世代フォーマットの採用

```html
<picture>
  <!-- 最新フォーマット -->
  <source srcset="image.avif" type="image/avif">

  <!-- フォールバック -->
  <source srcset="image.webp" type="image/webp">

  <!-- 従来フォーマット -->
  <img src="image.jpg" alt="説明">
</picture>
```

**フォーマット別の特徴:**

- **AVIF**: 最高の圧縮率（対応ブラウザ増加中）
- **WebP**: 広くサポート、優れた圧縮率
- **JPEG**: 全ブラウザ対応、フォールバック用

## 実装パターン

### パターン1：基本的な画像

```html
<img
  src="/images/photo.jpg"
  alt="青空と山の風景"
  width="1200"
  height="800"
  loading="lazy">
```

### パターン2：レスポンシブ画像

```html
<picture>
  <source
    srcset="/images/photo-mobile.jpg"
    media="(max-width: 767px)">
  <source
    srcset="/images/photo-tablet.jpg"
    media="(max-width: 1023px)">
  <img
    src="/images/photo-desktop.jpg"
    alt="青空と山の風景"
    width="1200"
    height="800"
    loading="lazy">
</picture>
```

### パターン3：高解像度ディスプレイ対応

```html
<img
  src="/images/photo.jpg"
  srcset="
    /images/photo.jpg 1x,
    /images/photo@2x.jpg 2x,
    /images/photo@3x.jpg 3x"
  alt="青空と山の風景"
  width="800"
  height="600"
  loading="lazy">
```

### パターン4：次世代フォーマット + レスポンシブ

```html
<picture>
  <!-- モバイル -->
  <source
    srcset="/images/photo-mobile.avif"
    media="(max-width: 767px)"
    type="image/avif">
  <source
    srcset="/images/photo-mobile.webp"
    media="(max-width: 767px)"
    type="image/webp">

  <!-- デスクトップ -->
  <source srcset="/images/photo.avif" type="image/avif">
  <source srcset="/images/photo.webp" type="image/webp">

  <!-- フォールバック -->
  <img
    src="/images/photo.jpg"
    alt="青空と山の風景"
    width="1200"
    height="800"
    loading="lazy">
</picture>
```

## CSSでの画像最適化

### object-fit（背景画像の代替）

`background-image`の代わりに`<img>`と`object-fit`を使用します。

```html
<img
  src="photo.jpg"
  alt="説明"
  class="hero-image"
  width="1920"
  height="1080"
  loading="eager">
```

```css
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
}
```

**メリット:**
- Lazy loading対応
- アクセシビリティ向上（alt属性）
- SEO改善

### aspect-ratio（縦横比の維持）

```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## パフォーマンス測定

### Core Web Vitals

Googleが定めるパフォーマンス指標：

| 指標 | 内容 | 目標値 |
|------|------|--------|
| **LCP** | Largest Contentful Paint | 2.5秒以下 |
| **CLS** | Cumulative Layout Shift | 0.1以下 |
| **FID** | First Input Delay | 100ms以下 |

### 測定ツール

- **Lighthouse**: Chrome DevToolsの監査機能
- **PageSpeed Insights**: Googleの速度測定ツール
- **WebPageTest**: 詳細なパフォーマンス分析

## チェックリスト

画像実装のチェックリスト：

- [ ] すべての画像に`alt`属性を指定
- [ ] `width`と`height`属性を指定（CLS防止）
- [ ] ファーストビュー以外の画像に`loading="lazy"`
- [ ] 適切な画像フォーマットを選択
- [ ] レスポンシブ対応が必要な場合は`<picture>`を使用
- [ ] 画像を適切なサイズに圧縮
- [ ] 次世代フォーマット（WebP、AVIF）を検討

## 次のステップ

各技術について詳しく学びましょう：

1. [Lazy Loading（遅延読み込み）](./01-lazy-loading.md)
2. [Picture要素（レスポンシブ画像）](./02-picture-element.md)
3. [Decoding属性（デコード制御）](./03-decoding.md)

## 参考リンク

- [MDN - レスポンシブ画像](https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Web.dev - 画像の最適化](https://web.dev/fast/#optimize-your-images)
- [Can I use - Picture element](https://caniuse.com/picture)
