# Lazy Loading（遅延読み込み）

Lazy Loadingは、画面に表示される直前まで画像の読み込みを遅延させる技術です。HTML標準の`loading`属性を使うことで、JavaScriptなしで実装できます。

## 基本的な使い方

### シンプルな実装

```html
<img src="image.jpg" alt="説明" loading="lazy">
```

たった1つの属性を追加するだけで、遅延読み込みが実装できます。

## loading属性の値

### `lazy` - 遅延読み込み

```html
<img src="image.jpg" alt="説明" loading="lazy">
```

- **動作**: 画面に近づいたら読み込み開始
- **使用場面**: ファーストビュー外の画像

### `eager` - 即座に読み込み

```html
<img src="hero.jpg" alt="メインビジュアル" loading="eager">
```

- **動作**: ページ読み込みと同時に読み込み
- **使用場面**: ファーストビューの重要な画像

### デフォルト動作

`loading`属性を指定しない場合、ブラウザのデフォルト動作になります（通常は`eager`と同等）。

## メリット

### 1. 初期読み込み時間の短縮

ファーストビューに必要な画像だけを読み込むため、ページ表示が高速化します。

**Before（Lazy Loading なし）:**
```
初期読み込み: 100枚の画像 = 10MB
読み込み時間: 5秒
```

**After（Lazy Loading あり）:**
```
初期読み込み: 5枚の画像 = 500KB
読み込み時間: 0.5秒
```

### 2. 帯域幅の節約

ユーザーがスクロールしなければ、下の画像は読み込まれません。

- モバイルユーザーのデータ通信量削減
- サーバーの帯域幅節約
- コスト削減

### 3. 実装が簡単

JavaScriptやライブラリ不要で、HTML属性1つで実装できます。

## 実装例

### 基本的な画像

```html
<img
  src="/images/photo.jpg"
  alt="風景写真"
  width="800"
  height="600"
  loading="lazy">
```

### Picture要素との組み合わせ

```html
<picture>
  <source
    srcset="/images/photo.webp"
    type="image/webp">
  <img
    src="/images/photo.jpg"
    alt="風景写真"
    width="800"
    height="600"
    loading="lazy">
</picture>
```

**重要:** `loading`属性は`<img>`要素に指定します。

### iframe要素

iframeにも`loading="lazy"`が使用できます。

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  loading="lazy"
  title="動画タイトル">
</iframe>
```

## 使い分けガイド

### loading="lazy"を使うべき画像

```html
<!-- ✅ ファーストビュー外の画像 -->
<img src="content1.jpg" alt="コンテンツ" loading="lazy">
<img src="content2.jpg" alt="コンテンツ" loading="lazy">
<img src="footer-logo.jpg" alt="ロゴ" loading="lazy">

<!-- ✅ 大量の画像リスト -->
<ul class="gallery">
  <li><img src="photo1.jpg" alt="写真1" loading="lazy"></li>
  <li><img src="photo2.jpg" alt="写真2" loading="lazy"></li>
  <!-- ...100枚以上 -->
</ul>
```

### loading="eager"を使うべき画像

```html
<!-- ✅ ファーストビューの重要な画像 -->
<img src="hero.jpg" alt="メインビジュアル" loading="eager">

<!-- ✅ ロゴ -->
<img src="logo.svg" alt="サイトロゴ" loading="eager">

<!-- ✅ LCP（Largest Contentful Paint）に影響する画像 -->
<img src="main-product.jpg" alt="商品画像" loading="eager">
```

### 指定不要（デフォルト）

```html
<!-- ファーストビューだが、特に重要でない -->
<img src="icon.svg" alt="アイコン">
```

## 読み込みのタイミング

### ブラウザの判断基準

ブラウザは以下の要素を考慮して、読み込みを開始します：

- **スクロール位置**: 画面に近づいたか
- **ネットワーク速度**: 高速なら早めに読み込み
- **デバイスの性能**: 高性能なら早めに読み込み

### 一般的な読み込み開始距離

多くのブラウザでは、画像が画面に表示される **約1000〜3000px手前** で読み込みを開始します。

```
[ユーザーの画面]
       ↓
  約2000px (読み込み開始距離)
       ↓
[Lazy Loadingされる画像]
```

## ベストプラクティス

### 1. width/height属性を必ず指定

```html
<!-- ✅ 良い例 -->
<img
  src="image.jpg"
  alt="説明"
  width="800"
  height="600"
  loading="lazy">

<!-- ❌ 悪い例 -->
<img src="image.jpg" alt="説明" loading="lazy">
<!-- レイアウトシフトが発生 -->
```

**理由:** サイズが未指定だと、画像読み込み後にレイアウトがずれます（CLS問題）。

### 2. ファーストビューの画像には使わない

```html
<!-- ❌ 悪い例 -->
<header>
  <img src="hero.jpg" alt="メインビジュアル" loading="lazy">
  <!-- 遅延読み込みでLCPが悪化 -->
</header>

<!-- ✅ 良い例 -->
<header>
  <img src="hero.jpg" alt="メインビジュアル" loading="eager">
  <!-- または loading 属性なし -->
</header>
```

### 3. alt属性は必須

```html
<!-- ✅ 良い例 -->
<img src="image.jpg" alt="青空と山の風景" loading="lazy">

<!-- ❌ 悪い例 -->
<img src="image.jpg" loading="lazy">
<!-- アクセシビリティとSEOに悪影響 -->
```

## JavaScriptとの併用

### 読み込み完了の検出

```javascript
const img = document.querySelector('img[loading="lazy"]');

img.addEventListener('load', () => {
  console.log('画像が読み込まれました');
  img.classList.add('loaded');
});
```

### Intersection Observerとの併用

より細かい制御が必要な場合は、Intersection Observer APIを使用します。

```javascript
// loading="lazy"非対応ブラウザのフォールバック
if ('loading' in HTMLImageElement.prototype) {
  // ネイティブLazy Loading対応
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Intersection Observerでフォールバック
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img.lazy');
  images.forEach(img => imageObserver.observe(img));
}
```

## パフォーマンス指標への影響

### LCP（Largest Contentful Paint）

**注意:** ファーストビューの画像に`loading="lazy"`を使うとLCPが悪化します。

```html
<!-- ❌ LCPが悪化 -->
<img src="hero.jpg" alt="メイン画像" loading="lazy">

<!-- ✅ LCPに好影響 -->
<img src="hero.jpg" alt="メイン画像">
```

### CLS（Cumulative Layout Shift）

width/height属性を指定すれば、CLSは改善されます。

```html
<img
  src="image.jpg"
  alt="説明"
  width="800"
  height="600"
  loading="lazy">
```

### FID（First Input Delay）

Lazy Loadingにより、初期読み込みが軽量化されるため、FIDが改善されます。

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 77+ (2019年9月) |
| Firefox | 75+ (2020年4月) |
| Safari | 15.4+ (2022年3月) |
| Edge | 79+ (2020年1月) |
| iOS Safari | 15.4+ (2022年3月) |

### 非対応ブラウザのフォールバック

```html
<img
  src="fallback.jpg"
  data-src="image.jpg"
  alt="説明"
  class="lazy"
  loading="lazy">
```

非対応ブラウザでは`src`がすぐに読み込まれます。

## 実践例

### ブログ記事

```html
<article>
  <!-- ファーストビュー：即座に読み込み -->
  <img
    src="/images/hero.jpg"
    alt="記事のメイン画像"
    width="1200"
    height="600"
    loading="eager">

  <p>記事の導入文...</p>

  <!-- コンテンツ内：遅延読み込み -->
  <img
    src="/images/diagram.jpg"
    alt="図解"
    width="800"
    height="400"
    loading="lazy">

  <img
    src="/images/screenshot.jpg"
    alt="スクリーンショット"
    width="800"
    height="600"
    loading="lazy">
</article>
```

### 画像ギャラリー

```html
<div class="gallery">
  <div class="item">
    <img
      src="/images/thumb1.jpg"
      alt="作品1"
      width="400"
      height="300"
      loading="lazy">
  </div>
  <div class="item">
    <img
      src="/images/thumb2.jpg"
      alt="作品2"
      width="400"
      height="300"
      loading="lazy">
  </div>
  <!-- ...100枚以上 -->
</div>
```

### ECサイトの商品一覧

```html
<ul class="products">
  <li class="product">
    <img
      src="/images/product1.jpg"
      alt="商品名1"
      width="300"
      height="300"
      loading="lazy">
    <h3>商品名1</h3>
    <p>¥10,000</p>
  </li>
  <!-- ...多数の商品 -->
</ul>
```

## SEOへの影響

### Googleの見解

Googleはネイティブなlazy loadingを推奨しています。

- ✅ `loading="lazy"`はクローラーが正しく認識
- ✅ SEOへの悪影響なし
- ✅ むしろページ速度向上でSEOに好影響

### 注意点

- すべての画像をlazyにしない（ファーストビューは除外）
- `alt`属性は必須
- 構造化データには影響なし

## まとめ

### メリット
- ✅ 初期読み込み時間の大幅短縮
- ✅ 帯域幅の節約
- ✅ 実装が非常に簡単
- ✅ JavaScriptライブラリ不要
- ✅ SEOに好影響

### デメリット
- ❌ ファーストビューに使うとLCP悪化
- ❌ 古いブラウザは非対応

### 推奨される使い方
1. ファーストビュー外のすべての画像に`loading="lazy"`
2. ファーストビューの画像には`loading="eager"`または属性なし
3. 必ず`width`/`height`属性を指定

## 関連リンク

- [MDN - loading属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img#attr-loading)
- [Web.dev - Browser-level image lazy-loading](https://web.dev/browser-level-image-lazy-loading/)
- [実装例](../../../examples/html/images/)
