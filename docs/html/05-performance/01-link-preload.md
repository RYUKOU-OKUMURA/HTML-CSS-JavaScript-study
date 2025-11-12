# Link Preload（リソースの先読み）

`<link rel="preload">`は、ブラウザに対して「このリソースは重要なので優先的に読み込んでください」と指示するHTML機能です。

## 基本的な使い方

### シンプルな例

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="script.js" as="script">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

## preloadが解決する問題

### 問題：遅延発見リソース

通常、ブラウザは以下の流れでリソースを発見します：

```
1. HTMLをダウンロード
2. HTMLをパース
3. CSSを発見・ダウンロード
4. CSSをパース
5. フォントを発見・ダウンロード ← 遅い！
```

### 解決：事前にヒントを与える

```html
<head>
  <!-- HTMLのパース時点でフォントの存在を伝える -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 後でCSSが読み込まれる -->
  <link rel="stylesheet" href="style.css">
</head>
```

```
1. HTMLをダウンロード
2. HTMLをパース
3. フォントを先読み開始 ← 早い！
4. CSSをダウンロード・パース
5. フォントは既に取得済み ✓
```

## as属性（リソースタイプ）

`as`属性は必須で、リソースの種類を指定します。

### 主要なリソースタイプ

| as属性 | 使用場面 | 例 |
|--------|---------|-----|
| `style` | CSS | `<link rel="preload" href="style.css" as="style">` |
| `script` | JavaScript | `<link rel="preload" href="app.js" as="script">` |
| `font` | Webフォント | `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>` |
| `image` | 画像 | `<link rel="preload" href="hero.jpg" as="image">` |
| `fetch` | Fetch/XHR | `<link rel="preload" href="/api/data.json" as="fetch" crossorigin>` |
| `video` | 動画 | `<link rel="preload" href="video.mp4" as="video">` |
| `audio` | 音声 | `<link rel="preload" href="audio.mp3" as="audio">` |

## 実装例

### 1. Webフォントのpreload

フォントは最も効果が高いpreload対象です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">

  <!-- フォントのpreload（crossorigin必須） -->
  <link rel="preload"
        href="/fonts/NotoSansJP-Regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin>

  <link rel="preload"
        href="/fonts/NotoSansJP-Bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin>

  <!-- CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>フォントが高速に表示されます</h1>
</body>
</html>
```

**重要:** フォントのpreloadには`crossorigin`属性が必須です（CORSモードで取得されるため）。

### 2. ヒーロー画像のpreload

LCP（Largest Contentful Paint）改善に効果的です。

```html
<head>
  <!-- ヒーロー画像を優先的に読み込み -->
  <link rel="preload" href="/images/hero.jpg" as="image">

  <!-- 次世代フォーマットにも対応 -->
  <link rel="preload"
        href="/images/hero.webp"
        as="image"
        type="image/webp">
</head>
<body>
  <picture>
    <source srcset="/images/hero.webp" type="image/webp">
    <img src="/images/hero.jpg" alt="ヒーロー画像" width="1920" height="1080">
  </picture>
</body>
```

### 3. 動的にインポートされるJavaScriptのpreload

```html
<head>
  <!-- 後で動的にインポートされるモジュールを先読み -->
  <link rel="preload" href="/js/chart-library.js" as="script">
</head>
<body>
  <button id="showChart">チャートを表示</button>

  <script>
    document.getElementById('showChart').addEventListener('click', async () => {
      // すでにpreloadされているので高速
      const { Chart } = await import('/js/chart-library.js');
      new Chart();
    });
  </script>
</body>
```

### 4. CSSの非同期読み込み

クリティカルでないCSSを非同期で読み込みます。

```html
<head>
  <!-- preloadとして読み込み、読み込み完了後にスタイルシートとして適用 -->
  <link rel="preload"
        href="/styles/non-critical.css"
        as="style"
        onload="this.onload=null;this.rel='stylesheet'">

  <!-- JavaScriptが無効な環境用のフォールバック -->
  <noscript>
    <link rel="stylesheet" href="/styles/non-critical.css">
  </noscript>
</head>
```

### 5. API データのpreload

```html
<head>
  <!-- APIレスポンスを先読み -->
  <link rel="preload"
        href="/api/initial-data.json"
        as="fetch"
        crossorigin="anonymous">
</head>
<body>
  <script>
    // すでにブラウザキャッシュにあるので高速
    fetch('/api/initial-data.json')
      .then(res => res.json())
      .then(data => console.log(data));
  </script>
</body>
```

## type属性

特定のフォーマットを指定する場合に使用します。

```html
<!-- フォント -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- WebP画像 -->
<link rel="preload" href="image.webp" as="image" type="image/webp">

<!-- 動画 -->
<link rel="preload" href="video.mp4" as="video" type="video/mp4">
```

**メリット:** ブラウザが対応していない形式の場合、preloadをスキップできます。

## crossorigin属性

CORS（Cross-Origin Resource Sharing）が関係するリソースには必須です。

### crossoriginが必須なリソース

```html
<!-- フォント: 必須 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Fetch/XHR: 必須 -->
<link rel="preload" href="/api/data.json" as="fetch" crossorigin>
```

### crossoriginの値

```html
<!-- anonymous: 認証情報なし -->
<link rel="preload" href="font.woff2" as="font" crossorigin="anonymous">

<!-- 省略形（anonymousと同じ） -->
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- use-credentials: 認証情報あり -->
<link rel="preload" href="/api/data.json" as="fetch" crossorigin="use-credentials">
```

## メディアクエリでの条件付きpreload

特定の画面サイズでのみpreloadできます。

```html
<!-- デスクトップのみ -->
<link rel="preload"
      href="/images/hero-desktop.jpg"
      as="image"
      media="(min-width: 768px)">

<!-- モバイルのみ -->
<link rel="preload"
      href="/images/hero-mobile.jpg"
      as="image"
      media="(max-width: 767px)">
```

## preloadのベストプラクティス

### ✅ 推奨される使い方

```html
<!-- 1. Webフォント -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 2. LCPに影響する画像 -->
<link rel="preload" href="hero.jpg" as="image">

<!-- 3. クリティカルなCSS -->
<link rel="preload" href="critical.css" as="style">

<!-- 4. 早期に必要なJavaScript -->
<link rel="preload" href="app.js" as="script">
```

### ❌ 避けるべき使い方

```html
<!-- すべてのリソースをpreloadしない -->
<link rel="preload" href="image1.jpg" as="image">
<link rel="preload" href="image2.jpg" as="image">
<link rel="preload" href="image3.jpg" as="image">
<!-- ... 10個以上のpreload ... -->
<!-- 逆にパフォーマンスが悪化 -->
```

**ルール:** 本当に重要なリソース（2〜3個）だけをpreload

### ⚠️ フォントpreloadの注意点

```html
<!-- ❌ 間違い: crossoriginなし -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2">

<!-- ✅ 正しい: crossoriginあり -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

crossoriginがないと、フォントが2重にダウンロードされます。

## preloadとその他のリソースヒントの違い

### preload vs prefetch

| | preload | prefetch |
|---|---------|----------|
| **用途** | 今のページで使う | 次のページで使う |
| **優先度** | 高 | 低 |
| **実行タイミング** | すぐに | アイドル時 |

```html
<!-- preload: 今のページで使う -->
<link rel="preload" href="current-page.css" as="style">

<!-- prefetch: 次のページで使う -->
<link rel="prefetch" href="next-page.css" as="style">
```

### preload vs preconnect

| | preload | preconnect |
|---|---------|------------|
| **用途** | リソースを読み込む | 接続を確立 |
| **対象** | 具体的なファイル | ドメイン |

```html
<!-- preload: 特定のフォントを読み込む -->
<link rel="preload" href="https://fonts.gstatic.com/s/inter/font.woff2" as="font" crossorigin>

<!-- preconnect: フォントドメインに接続を確立 -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### preload vs dns-prefetch

```html
<!-- dns-prefetch: DNS解決のみ -->
<link rel="dns-prefetch" href="https://example.com">

<!-- preconnect: DNS解決 + TCP接続 + TLS -->
<link rel="preconnect" href="https://example.com">

<!-- preload: リソース本体も取得 -->
<link rel="preload" href="https://example.com/font.woff2" as="font" crossorigin>
```

## パフォーマンス測定

### Chrome DevToolsで確認

1. DevToolsを開く（F12）
2. **Network**タブを開く
3. ページをリロード
4. **Priority**列を確認

preloadされたリソースは「Highest」または「High」と表示されます。

### Lighthouseでの警告

**警告例:**
```
Preload key requests
Preload the following resources to improve performance:
  - /fonts/main.woff2
```

この警告が出たリソースをpreloadすると、パフォーマンスが改善されます。

### 未使用のpreloadの警告

```
Unused preloaded resources
The following resources were preloaded but never used:
  - /images/unused.jpg
```

使われていないpreloadは削除してください。

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 50+ (2016年4月) |
| Firefox | 85+ (2021年1月) |
| Safari | 11.1+ (2018年3月) |
| Edge | 79+ (2020年1月) |
| iOS Safari | 11.3+ (2018年3月) |

**注意:** 古いブラウザでは無視されるだけで、エラーにはなりません。

## 実践例

### SPA（Single Page Application）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>高速SPA</title>

  <!-- アプリケーションフォント -->
  <link rel="preload" href="/fonts/app.woff2" as="font" type="font/woff2" crossorigin>

  <!-- アプリケーションバンドル -->
  <link rel="preload" href="/js/app.bundle.js" as="script">

  <!-- 初期データ -->
  <link rel="preload" href="/api/init" as="fetch" crossorigin>

  <!-- クリティカルCSS -->
  <link rel="stylesheet" href="/css/critical.css">
</head>
<body>
  <div id="app"></div>
  <script src="/js/app.bundle.js" defer></script>
</body>
</html>
```

### Eコマースサイト

```html
<head>
  <!-- 商品画像（LCP） -->
  <link rel="preload" href="/images/product-hero.jpg" as="image">

  <!-- ブランドフォント -->
  <link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 外部決済スクリプトへの接続 -->
  <link rel="preconnect" href="https://checkout.stripe.com">
</head>
```

## よくある質問

### Q: preloadはいくつまで使える？

**A:** 技術的な制限はありませんが、**2〜4個程度**に抑えるのが推奨です。

理由：
- preloadしすぎると帯域幅を圧迫
- 本当に重要なリソースの優先度が下がる

### Q: すべてのフォントをpreloadすべき？

**A:** いいえ。ファーストビューで使用するフォントのみpreloadしてください。

```html
<!-- ✅ 良い例: メインフォントのみ -->
<link rel="preload" href="font-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- ❌ 悪い例: すべてのウェイトをpreload -->
<link rel="preload" href="font-thin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font-light.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font-medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font-black.woff2" as="font" type="font/woff2" crossorigin>
```

### Q: preloadとdeferの併用は？

**A:** 可能ですし、推奨されます。

```html
<!-- preloadで早期に読み込み開始、deferで実行を遅延 -->
<link rel="preload" href="app.js" as="script">
<script src="app.js" defer></script>
```

## まとめ

### メリット
- ✅ 重要なリソースを優先的に読み込み
- ✅ LCP（Largest Contentful Paint）の改善
- ✅ FOIT（Flash of Invisible Text）の軽減
- ✅ ページ表示の高速化

### デメリット
- ❌ 使いすぎると逆効果
- ❌ 正しく使わないとリソースの無駄

### 使用すべき場面
- ✅ Webフォント
- ✅ ヒーロー画像（LCP要素）
- ✅ クリティカルなCSS/JavaScript
- ✅ 早期に必要なAPIデータ

### 使用しない場面
- ❌ ファーストビュー外のリソース
- ❌ 条件付きで読み込まれるリソース
- ❌ 優先度の低いリソース

## 関連リンク

- [MDN - rel="preload"](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/rel/preload)
- [Web.dev - Preload critical assets](https://web.dev/preload-critical-assets/)
- [Resource Hints](https://www.w3.org/TR/resource-hints/)
