# Picture要素（レスポンシブ画像）

`<picture>`要素を使うと、画面サイズや解像度、画像フォーマットに応じて、最適な画像を出し分けることができます。

## 基本的な使い方

### シンプルな例

```html
<picture>
  <source srcset="image-large.jpg" media="(min-width: 1024px)">
  <source srcset="image-medium.jpg" media="(min-width: 768px)">
  <img src="image-small.jpg" alt="説明">
</picture>
```

## Picture要素の構造

### 構成要素

```html
<picture>
  <!-- source要素: 条件付き画像 -->
  <source srcset="画像パス" media="メディアクエリ">
  <source srcset="画像パス" type="MIMEタイプ">

  <!-- img要素: フォールバック（必須） -->
  <img src="デフォルト画像" alt="説明">
</picture>
```

### 動作の仕組み

1. ブラウザは上から順に`<source>`要素を評価
2. 条件（media、type）に一致する最初の`<source>`を選択
3. どれも一致しなければ`<img>`の`src`を使用
4. `alt`属性は`<img>`要素に指定

## 使用例

### パターン1：画面幅による出し分け

```html
<picture>
  <!-- デスクトップ -->
  <source
    srcset="/images/hero-desktop.jpg"
    media="(min-width: 1024px)">

  <!-- タブレット -->
  <source
    srcset="/images/hero-tablet.jpg"
    media="(min-width: 768px)">

  <!-- モバイル（フォールバック） -->
  <img
    src="/images/hero-mobile.jpg"
    alt="メインビジュアル"
    width="375"
    height="250">
</picture>
```

**メリット:**
- モバイルには小さい画像
- デスクトップには大きい画像
- 帯域幅の最適化

### パターン2：次世代フォーマットの採用

```html
<picture>
  <!-- AVIF（最高圧縮率） -->
  <source srcset="/images/photo.avif" type="image/avif">

  <!-- WebP（広くサポート） -->
  <source srcset="/images/photo.webp" type="image/webp">

  <!-- JPEG（フォールバック） -->
  <img src="/images/photo.jpg" alt="写真">
</picture>
```

**ブラウザの動作:**
- AVIFサポート → AVIFを使用
- AVIFなし、WebPあり → WebPを使用
- どちらもなし → JPEGを使用

### パターン3：アートディレクション

画面サイズに応じて異なる構図の画像を表示します。

```html
<picture>
  <!-- デスクトップ：横長の画像 -->
  <source
    srcset="/images/landscape.jpg"
    media="(min-width: 1024px)">

  <!-- モバイル：縦長の画像 -->
  <img
    src="/images/portrait.jpg"
    alt="商品写真"
    width="375"
    height="500">
</picture>
```

**使用場面:**
- モバイルは人物をクローズアップ
- デスクトップは広い風景

### パターン4：高解像度ディスプレイ対応

```html
<picture>
  <source
    srcset="
      /images/photo@1x.jpg 1x,
      /images/photo@2x.jpg 2x,
      /images/photo@3x.jpg 3x"
    media="(min-width: 1024px)">

  <img
    src="/images/photo@1x.jpg"
    alt="高解像度対応画像"
    width="800"
    height="600">
</picture>
```

**ディスプレイ別の動作:**
- 通常ディスプレイ → @1x
- Retinaディスプレイ → @2x
- 高解像度モバイル → @3x

### パターン5：複合的な条件

```html
<picture>
  <!-- デスクトップ + 次世代フォーマット -->
  <source
    srcset="/images/hero-desktop.avif"
    media="(min-width: 1024px)"
    type="image/avif">
  <source
    srcset="/images/hero-desktop.webp"
    media="(min-width: 1024px)"
    type="image/webp">
  <source
    srcset="/images/hero-desktop.jpg"
    media="(min-width: 1024px)">

  <!-- タブレット + 次世代フォーマット -->
  <source
    srcset="/images/hero-tablet.avif"
    media="(min-width: 768px)"
    type="image/avif">
  <source
    srcset="/images/hero-tablet.webp"
    media="(min-width: 768px)"
    type="image/webp">
  <source
    srcset="/images/hero-tablet.jpg"
    media="(min-width: 768px)">

  <!-- モバイル（フォールバック） -->
  <img
    src="/images/hero-mobile.jpg"
    alt="メインビジュアル"
    width="375"
    height="250"
    loading="eager">
</picture>
```

## srcset属性の高度な使い方

### 幅記述子（w記述子）

```html
<img
  srcset="
    /images/small.jpg 400w,
    /images/medium.jpg 800w,
    /images/large.jpg 1200w,
    /images/xlarge.jpg 1600w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1000px) 50vw,
         800px"
  src="/images/medium.jpg"
  alt="レスポンシブ画像">
```

**解説:**

- `srcset`: 画像の実際の幅を指定
- `sizes`: 画面サイズに応じた表示幅を指定
- ブラウザが最適な画像を自動選択

### sizes属性の書き方

```html
sizes="
  (max-width: 600px) 100vw,    <!-- 600px以下なら画面幅いっぱい -->
  (max-width: 1000px) 50vw,    <!-- 1000px以下なら画面幅の50% -->
  800px"                        <!-- それ以外は800px -->
```

## Lazy Loadingとの組み合わせ

```html
<picture>
  <source
    srcset="/images/photo.webp"
    type="image/webp">
  <img
    src="/images/photo.jpg"
    alt="写真"
    width="800"
    height="600"
    loading="lazy">
</picture>
```

**重要:** `loading`属性は`<img>`要素に指定します。

## ベストプラクティス

### 1. 必ずimg要素を含める

```html
<!-- ✅ 正しい -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="説明">
</picture>

<!-- ❌ 間違い -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <!-- img要素がない -->
</picture>
```

### 2. alt属性はimg要素に指定

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="ここに代替テキスト">
  <!--                   ↑ img要素に指定 -->
</picture>
```

### 3. width/height属性を指定

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img
    src="image.jpg"
    alt="説明"
    width="800"
    height="600">
  <!--  ↑ CLS防止のため必須 -->
</picture>
```

### 4. メディアクエリは大きい順に

```html
<!-- ✅ 正しい順序 -->
<picture>
  <source srcset="large.jpg" media="(min-width: 1024px)">
  <source srcset="medium.jpg" media="(min-width: 768px)">
  <img src="small.jpg" alt="説明">
</picture>

<!-- ❌ 間違った順序 -->
<picture>
  <source srcset="small.jpg" media="(max-width: 767px)">
  <!-- 最初にマッチするとそれが選ばれる -->
  <source srcset="medium.jpg" media="(max-width: 1023px)">
  <img src="large.jpg" alt="説明">
</picture>
```

## 画像フォーマットの特徴

### AVIF

```html
<source srcset="image.avif" type="image/avif">
```

- **圧縮率**: 最高（JPEGの約50%）
- **品質**: 非常に高い
- **対応**: Chrome 85+, Firefox 93+, Safari 16.1+

### WebP

```html
<source srcset="image.webp" type="image/webp">
```

- **圧縮率**: 高い（JPEGの約30%削減）
- **品質**: 高い
- **対応**: Chrome 23+, Firefox 65+, Safari 14+

### JPEG/PNG

```html
<img src="image.jpg" alt="説明">
```

- **圧縮率**: 標準
- **品質**: 標準
- **対応**: 全ブラウザ

## 実践例

### ヒーローイメージ

```html
<picture>
  <!-- デスクトップ -->
  <source
    srcset="/images/hero-desktop.avif"
    media="(min-width: 1024px)"
    type="image/avif"
    width="1920"
    height="800">
  <source
    srcset="/images/hero-desktop.webp"
    media="(min-width: 1024px)"
    type="image/webp">

  <!-- タブレット -->
  <source
    srcset="/images/hero-tablet.avif"
    media="(min-width: 768px)"
    type="image/avif">
  <source
    srcset="/images/hero-tablet.webp"
    media="(min-width: 768px)"
    type="image/webp">

  <!-- モバイル -->
  <img
    src="/images/hero-mobile.jpg"
    alt="最新のWebテクノロジー"
    width="375"
    height="250"
    loading="eager">
</picture>
```

### 商品画像

```html
<picture>
  <source srcset="/products/item-123.avif" type="image/avif">
  <source srcset="/products/item-123.webp" type="image/webp">
  <img
    src="/products/item-123.jpg"
    alt="商品名 - カラー: ブラック, サイズ: M"
    width="600"
    height="600"
    loading="lazy">
</picture>
```

## CSSとの組み合わせ

### object-fitで切り抜き

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img
    src="image.jpg"
    alt="説明"
    class="hero-image"
    width="1920"
    height="1080">
</picture>
```

```css
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
}
```

### aspect-ratioで比率維持

```css
picture {
  display: block;
  aspect-ratio: 16 / 9;
}

picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## パフォーマンス最適化

### 推奨される画像サイズ

| デバイス | 推奨幅 | 用途 |
|---------|--------|------|
| モバイル | 375px〜750px | スマートフォン |
| タブレット | 768px〜1536px | タブレット |
| デスクトップ | 1024px〜2048px | PC |

### ファイルサイズの目安

- **ヒーローイメージ**: 100〜300KB
- **コンテンツ画像**: 50〜150KB
- **サムネイル**: 10〜30KB

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 38+ (2014年) |
| Firefox | 38+ (2015年) |
| Safari | 9.1+ (2016年) |
| Edge | 13+ (2015年) |
| iOS Safari | 9.3+ (2016年) |

## まとめ

### 使用すべき場面
- ✅ レスポンシブデザイン
- ✅ 次世代フォーマットの採用
- ✅ アートディレクション
- ✅ 高解像度ディスプレイ対応

### メリット
- ✅ 最適な画像を自動選択
- ✅ 帯域幅の節約
- ✅ パフォーマンス向上
- ✅ ユーザー体験の改善

### 実装のポイント
1. 必ず`<img>`要素を含める
2. `alt`属性は`<img>`に指定
3. `width`/`height`属性を指定
4. 次世代フォーマット（AVIF、WebP）を優先

## 関連リンク

- [MDN - &lt;picture&gt;要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/picture)
- [MDN - レスポンシブ画像](https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [実装例](../../../examples/html/images/)
