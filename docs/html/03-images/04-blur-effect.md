# 画像のぼかし効果とプレースホルダー

画像読み込み中のユーザー体験を向上させるため、ぼかし効果を使ったプレースホルダー表示技術を学びます。

## なぜぼかし効果が必要なのか

### ユーザー体験の問題

```
❌ 従来の方法:
[空白]  →  [画像が突然表示]  ← レイアウトシフト

✅ ぼかし効果:
[ぼかし画像]  →  [高解像度画像にスムーズ移行]  ← 快適
```

### メリット

1. **視覚的な連続性**: 空白がなく、コンテンツの雰囲気が伝わる
2. **レイアウトシフトの防止**: CLS（Cumulative Layout Shift）の改善
3. **体感速度の向上**: 「何かが表示されている」安心感

## 実装方法

### 1. 基本的な実装（CSS filter）

最もシンプルな方法です。

```html
<div class="image-wrapper">
  <img
    src="image.jpg"
    alt="説明"
    class="blur-load"
    width="800"
    height="600"
    loading="lazy">
</div>
```

```css
.image-wrapper {
  position: relative;
  overflow: hidden;
}

.blur-load {
  /* 読み込み中はぼかす */
  filter: blur(20px);
  transition: filter 0.3s ease;
}

.blur-load.loaded {
  /* 読み込み完了後はクリアに */
  filter: blur(0);
}
```

```javascript
const images = document.querySelectorAll('.blur-load');

images.forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
});
```

### 2. 低解像度プレースホルダー（LQIP）

小さな画像を先に表示し、本画像に置き換える方法です。

```html
<div class="image-container" style="background-image: url('image-tiny.jpg');">
  <img
    data-src="image-full.jpg"
    alt="説明"
    class="lazy-image"
    width="800"
    height="600"
    loading="lazy">
</div>
```

```css
.image-container {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  /* 背景をぼかす */
  filter: blur(20px);
  transform: scale(1.1); /* ぼかしの端を隠す */
}

.lazy-image {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

.image-container.loaded {
  filter: blur(0);
  transform: scale(1);
}
```

```javascript
const containers = document.querySelectorAll('.image-container');

containers.forEach(container => {
  const img = container.querySelector('.lazy-image');

  // 画像の読み込み
  const fullSrc = img.dataset.src;
  img.src = fullSrc;

  img.addEventListener('load', () => {
    img.classList.add('loaded');
    container.classList.add('loaded');
  });
});
```

### 3. Base64エンコードされたプレースホルダー

非常に小さな画像をBase64でHTMLに埋め込みます。

```html
<div
  class="blur-up"
  style="background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRg...');">
  <img
    src="image.jpg"
    alt="説明"
    width="800"
    height="600"
    loading="lazy">
</div>
```

```css
.blur-up {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.blur-up::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(20px);
  transform: scale(1.1);
  transition: opacity 0.3s ease;
}

.blur-up img {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blur-up.loaded::before {
  opacity: 0;
}

.blur-up.loaded img {
  opacity: 1;
}
```

```javascript
document.querySelectorAll('.blur-up img').forEach(img => {
  img.addEventListener('load', () => {
    img.parentElement.classList.add('loaded');
  });
});
```

### 4. モダンな方法（aspect-ratio + object-fit）

```html
<div class="modern-image-wrapper">
  <img
    src="image-tiny.jpg"
    data-src="image-full.jpg"
    alt="説明"
    class="progressive-image"
    width="800"
    height="600">
</div>
```

```css
.modern-image-wrapper {
  position: relative;
  aspect-ratio: 800 / 600;
  overflow: hidden;
  background-color: #f0f0f0;
}

.progressive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  transition: filter 0.4s ease, transform 0.4s ease;
}

.progressive-image.loaded {
  filter: blur(0);
  transform: scale(1);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const fullSrc = img.dataset.src;

      // 新しい画像を読み込む
      const fullImg = new Image();
      fullImg.src = fullSrc;

      fullImg.addEventListener('load', () => {
        img.src = fullSrc;
        img.classList.add('loaded');
      });

      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('.progressive-image').forEach(img => {
  observer.observe(img);
});
```

## プレースホルダー画像の作成方法

### 1. 画像編集ツール

**ImageMagick（コマンドライン）:**

```bash
# 幅10pxにリサイズ（超低解像度）
convert image.jpg -resize 10x image-tiny.jpg

# さらに圧縮
convert image.jpg -resize 10x -quality 30 image-tiny.jpg
```

**Sharp（Node.js）:**

```javascript
const sharp = require('sharp');

sharp('image.jpg')
  .resize(20) // 幅20px
  .blur(2)
  .jpeg({ quality: 30 })
  .toFile('image-tiny.jpg');
```

### 2. Base64エンコード

```bash
# Linuxの場合
base64 image-tiny.jpg

# macOSの場合
base64 -i image-tiny.jpg
```

```javascript
// Node.js
const fs = require('fs');
const imageBuffer = fs.readFileSync('image-tiny.jpg');
const base64 = imageBuffer.toString('base64');
console.log(`data:image/jpeg;base64,${base64}`);
```

## 実践例

### ブログのヒーロー画像

```html
<article>
  <header class="article-header">
    <div
      class="hero-image blur-up"
      style="background-image: url('data:image/jpeg;base64,/9j/4AAQ...');">
      <img
        src="hero.jpg"
        alt="記事のメイン画像"
        width="1200"
        height="600"
        loading="eager">
    </div>
    <h1>記事タイトル</h1>
  </header>
</article>
```

```css
.hero-image {
  aspect-ratio: 2 / 1;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.hero-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(30px);
  transform: scale(1.2);
  transition: opacity 0.5s ease;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
  position: relative;
  z-index: 2;
}

.hero-image.loaded::before {
  opacity: 0;
}

.hero-image.loaded img {
  opacity: 1;
}
```

### ギャラリー

```html
<div class="gallery">
  <div class="gallery-item">
    <div class="image-placeholder" data-src="photo1.jpg">
      <img src="photo1-tiny.jpg" alt="写真1" width="400" height="300">
    </div>
  </div>
  <div class="gallery-item">
    <div class="image-placeholder" data-src="photo2.jpg">
      <img src="photo2-tiny.jpg" alt="写真2" width="400" height="300">
    </div>
  </div>
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.image-placeholder {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #e0e0e0;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(15px);
  transform: scale(1.1);
  transition: all 0.4s ease;
}

.image-placeholder.loaded img {
  filter: blur(0);
  transform: scale(1);
}
```

```javascript
class ImageLoader {
  constructor() {
    this.init();
  }

  init() {
    const placeholders = document.querySelectorAll('.image-placeholder');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    placeholders.forEach(placeholder => {
      observer.observe(placeholder);
    });
  }

  loadImage(placeholder) {
    const img = placeholder.querySelector('img');
    const fullSrc = placeholder.dataset.src;

    const fullImage = new Image();
    fullImage.src = fullSrc;

    fullImage.addEventListener('load', () => {
      img.src = fullSrc;
      placeholder.classList.add('loaded');
    });
  }
}

// 初期化
new ImageLoader();
```

## パフォーマンスへの影響

### メリット

| 指標 | 効果 |
|------|------|
| **CLS** | 大幅改善（レイアウトシフトなし） |
| **LCP** | 改善（プレースホルダーが先に表示） |
| **体感速度** | 向上（すぐに何か表示される） |

### デメリットと対策

**問題:** プレースホルダー画像も通信が発生

**対策:**
1. Base64埋め込み（HTMLに含める）
2. 極小サイズ（10-20px幅、<1KB）
3. SVGプレースホルダー（後述）

## SVGプレースホルダー

データ量が最小になる方法です。

```html
<div class="svg-placeholder">
  <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0e0e0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f5f5f5;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#grad1)" />
  </svg>
  <img
    data-src="image.jpg"
    alt="説明"
    width="800"
    height="600">
</div>
```

```css
.svg-placeholder {
  position: relative;
  background-color: #f0f0f0;
}

.svg-placeholder svg {
  display: block;
  filter: blur(20px);
  transition: opacity 0.3s ease;
}

.svg-placeholder img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.svg-placeholder.loaded svg {
  opacity: 0;
}

.svg-placeholder.loaded img {
  opacity: 1;
}
```

## ライブラリの活用

### lazysizes

人気のある遅延読み込みライブラリです。

```html
<script src="https://cdn.jsdelivr.net/npm/lazysizes@5/lazysizes.min.js" async></script>

<img
  data-src="image.jpg"
  data-srcset="image-320.jpg 320w, image-640.jpg 640w, image-1024.jpg 1024w"
  data-sizes="auto"
  class="lazyload blur-up"
  alt="説明"
  width="800"
  height="600">
```

### blurhash

画像のぼかしプレースホルダーを自動生成します。

```html
<canvas id="blurhash-canvas" width="800" height="600"></canvas>
<img
  data-src="image.jpg"
  alt="説明"
  width="800"
  height="600">

<script type="module">
  import { decode } from 'https://cdn.skypack.dev/blurhash';

  const hash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
  const pixels = decode(hash, 32, 32);

  const canvas = document.getElementById('blurhash-canvas');
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(32, 32);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
</script>
```

## ベストプラクティス

### ✅ 推奨される実装

```html
<!-- 1. aspect-ratioでレイアウトシフト防止 -->
<div class="image-wrapper" style="aspect-ratio: 16/9;">

  <!-- 2. Base64プレースホルダー（<1KB） -->
  <div class="placeholder" style="background-image: url('data:image/jpeg;base64,...');"></div>

  <!-- 3. 本画像は遅延読み込み -->
  <img
    data-src="image.jpg"
    alt="説明"
    width="1600"
    height="900"
    loading="lazy">
</div>
```

### ❌ 避けるべき実装

```html
<!-- プレースホルダーが大きすぎる -->
<img src="image-medium.jpg" data-src="image-full.jpg">
<!-- プレースホルダーは<1KBに -->

<!-- aspect-ratioがない -->
<img src="image.jpg" loading="lazy">
<!-- レイアウトシフトが発生 -->
```

## まとめ

### 効果的な使用場面
- ✅ ヒーロー画像
- ✅ 商品画像
- ✅ ギャラリー
- ✅ ブログのアイキャッチ画像

### メリット
- ✅ ユーザー体験の向上
- ✅ CLS（レイアウトシフト）の改善
- ✅ 体感速度の向上
- ✅ 視覚的な連続性

### 実装のポイント
1. プレースホルダーは極小サイズ（<1KB）
2. aspect-ratioでレイアウト確保
3. filter: blur()でスムーズな遷移
4. Intersection Observerで効率的な読み込み

## 関連リンク

- [ICS Media - 画像最適化](https://ics.media/entry/15393/)
- [MDN - filter](https://developer.mozilla.org/ja/docs/Web/CSS/filter)
- [BlurHash](https://blurha.sh/)
- [LQIP（Low Quality Image Placeholders）](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)
