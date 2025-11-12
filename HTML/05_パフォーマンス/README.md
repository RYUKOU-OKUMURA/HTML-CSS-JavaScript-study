# パフォーマンス最適化編

Webサイトのパフォーマンス最適化は、ユーザー体験とSEOの両方に大きく影響します。このセクションでは、HTMLを使ったパフォーマンス最適化技術を学びます。

## パフォーマンス最適化の重要性

### ユーザー体験への影響

**ページ読み込み速度が遅いと:**
- 直帰率が増加
- コンバージョン率が低下
- ユーザー満足度が低下

**統計データ:**
- ページ読み込みが1秒遅れると、コンバージョン率が7%低下
- 3秒以上かかると、53%のユーザーが離脱

### SEOへの影響

Googleは2018年から、モバイル検索でページ速度をランキング要因として使用しています。

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): 2.5秒以下
- **FID** (First Input Delay): 100ms以下
- **CLS** (Cumulative Layout Shift): 0.1以下

## このセクションで学ぶこと

### 1. Link Preload（リソースの先読み）

[詳しく学ぶ →](./01-link-preload.md)

重要なリソースを事前に読み込み、ページ表示を高速化する技術です。

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

**メリット:**
- 重要なリソースの優先度を上げる
- レンダリングブロックを回避
- 初期表示の高速化

### 2. Resource Hints（リソースヒント）

ブラウザに対して、リソースの読み込みに関するヒントを提供します。

```html
<!-- DNS事前解決 -->
<link rel="dns-prefetch" href="https://example.com">

<!-- 接続の事前確立 -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- 次ページの先読み -->
<link rel="prefetch" href="/next-page.html">
```

## 基本的な最適化チェックリスト

### HTML構造

- [ ] 重要なCSSはインライン化またはpreload
- [ ] JavaScriptは`defer`または`async`属性を使用
- [ ] ファーストビューに必要なリソースを優先
- [ ] 不要なリソースは遅延読み込み

### リソースの読み込み

- [ ] 画像に`loading="lazy"`を使用
- [ ] フォントをpreload
- [ ] クリティカルパスのCSS最適化
- [ ] 外部リソースにはpreconnect

### パフォーマンス測定

- [ ] Lighthouse監査を実施
- [ ] Core Web Vitalsを確認
- [ ] 実機でテスト
- [ ] Network throttlingでテスト

## パフォーマンス測定ツール

### Chrome DevTools

**Lighthouse:**
1. DevToolsを開く（F12）
2. Lighthouseタブを選択
3. 「Generate report」をクリック

**Performance:**
- ページ読み込みの詳細な分析
- ボトルネックの特定

### オンラインツール

**PageSpeed Insights:**
- URL: https://pagespeed.web.dev/
- リアルユーザーデータを含む分析
- モバイルとデスクトップの両方

**WebPageTest:**
- URL: https://www.webpagetest.org/
- 詳細なウォーターフォール分析
- 様々な地域・デバイスでテスト

## 最適化の優先順位

### 1. クリティカルレンダリングパスの最適化

最初に表示されるコンテンツを最速で表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル</title>

  <!-- クリティカルCSS -->
  <style>
    /* ファーストビューに必要な最小限のCSS */
    body { margin: 0; font-family: system-ui; }
    .hero { height: 100vh; }
  </style>

  <!-- フォントのプリロード -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 残りのCSSは非同期読み込み -->
  <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
</head>
<body>
  <!-- コンテンツ -->
</body>
</html>
```

### 2. JavaScriptの最適化

```html
<!-- ✅ 推奨: defer属性 -->
<script src="script.js" defer></script>

<!-- ⚠️ 必要な場合のみ: async属性 -->
<script src="analytics.js" async></script>

<!-- ❌ 避ける: 属性なし -->
<script src="script.js"></script>
```

**defer vs async:**

| 属性 | 読み込み | 実行タイミング | 使用場面 |
|------|---------|---------------|---------|
| なし | 同期 | 即座（パースをブロック） | 避けるべき |
| `async` | 非同期 | 読み込み完了次第 | 分析スクリプトなど |
| `defer` | 非同期 | DOMContentLoaded前 | 通常のスクリプト |

### 3. 画像最適化

```html
<!-- 重要な画像: 即座に読み込み -->
<link rel="preload" as="image" href="hero.jpg">
<img src="hero.jpg" alt="ヒーロー画像" loading="eager">

<!-- その他の画像: 遅延読み込み -->
<img src="content.jpg" alt="コンテンツ画像" loading="lazy" width="800" height="600">
```

## 実践例

### ランディングページの最適化

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>高速ランディングページ</title>

  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- フォントのPreload -->
  <link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossorigin>

  <!-- クリティカルCSS -->
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; }
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  </style>

  <!-- メインCSSは非同期読み込み -->
  <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
</head>
<body>
  <section class="hero">
    <h1>高速表示されるランディングページ</h1>
  </section>

  <!-- JavaScript: defer -->
  <script src="/scripts/main.js" defer></script>

  <!-- 分析: async -->
  <script src="https://www.google-analytics.com/analytics.js" async></script>
</body>
</html>
```

## よくある間違い

### ❌ すべてpreloadする

```html
<!-- 悪い例: 過剰なpreload -->
<link rel="preload" href="style1.css" as="style">
<link rel="preload" href="style2.css" as="style">
<link rel="preload" href="style3.css" as="style">
<link rel="preload" href="image1.jpg" as="image">
<link rel="preload" href="image2.jpg" as="image">
<!-- preloadしすぎると逆効果 -->
```

**正しい方法:** 本当に重要なリソースだけをpreload

### ❌ preloadとprefetchを混同

```html
<!-- prefetch: 次のページで使うリソース -->
<link rel="prefetch" href="/next-page.css">

<!-- preload: 今のページで使う重要なリソース -->
<link rel="preload" href="/current-page-font.woff2" as="font" crossorigin>
```

### ❌ crossorigin属性の忘れ

```html
<!-- ❌ フォントのpreloadにcrossoriginがない -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2">

<!-- ✅ crossorigin必須 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

## まとめ

### 効果的な最適化手順

1. **測定**: 現状のパフォーマンスを測定
2. **特定**: ボトルネックを特定
3. **最適化**: 優先度の高い問題から対処
4. **検証**: 改善効果を測定
5. **繰り返し**: 継続的に改善

### パフォーマンス最適化の原則

- ✅ 重要なリソースを優先
- ✅ 不要なリソースは遅延
- ✅ リソースサイズを最小化
- ✅ ブラウザキャッシュを活用
- ✅ 継続的に測定・改善

## 次のステップ

詳しく学びましょう：

1. [Link Preload（リソースの先読み）](./01-link-preload.md)

## 参考リンク

- [Web.dev - Fast load times](https://web.dev/fast/)
- [MDN - Performance](https://developer.mozilla.org/ja/docs/Web/Performance)
- [Chrome DevTools - Performance](https://developer.chrome.com/docs/devtools/performance/)
