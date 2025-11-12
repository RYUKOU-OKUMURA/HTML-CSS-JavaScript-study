# HTML基礎編

HTMLの基本的な概念と構造について学びます。

## HTMLとは

HTML（HyperText Markup Language）は、Webページの構造を定義するマークアップ言語です。

### HTMLの役割

- **構造の定義**: 見出し、段落、リストなどの文書構造を定義
- **意味の付与**: コンテンツに意味を持たせる（セマンティック）
- **リンクの作成**: ページ間の接続を可能にする

## 基本的なHTML文書の構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル</title>
</head>
<body>
  <h1>見出し</h1>
  <p>段落のテキスト</p>
</body>
</html>
```

### 各部分の説明

#### `<!DOCTYPE html>`
- HTML5の文書であることを宣言
- 必ず文書の最初に記述

#### `<html lang="ja">`
- HTML文書のルート要素
- `lang="ja"`で日本語のページであることを示す
- アクセシビリティやSEOで重要

#### `<head>`セクション
文書のメタ情報を記述します。ページには表示されません。

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ページの説明">
  <title>ページタイトル</title>
  <link rel="stylesheet" href="style.css">
</head>
```

**重要な要素:**
- `<meta charset="UTF-8">`: 文字エンコーディングの指定（必須）
- `<meta name="viewport">`: レスポンシブデザインのための設定（必須）
- `<title>`: ブラウザのタブに表示されるタイトル（必須）
- `<meta name="description">`: 検索結果に表示される説明文（推奨）

#### `<body>`セクション
ページに実際に表示されるコンテンツを記述します。

## よく使う基本要素

### 見出し（Heading）

```html
<h1>最も重要な見出し</h1>
<h2>セクションの見出し</h2>
<h3>サブセクションの見出し</h3>
<h4>より小さな見出し</h4>
<h5>さらに小さな見出し</h5>
<h6>最も小さな見出し</h6>
```

**ポイント:**
- `<h1>`は1ページに1つが基本
- 階層を飛ばさない（h2の次にh4は使わない）
- SEOとアクセシビリティで重要

### 段落（Paragraph）

```html
<p>これは段落のテキストです。</p>
<p>別の段落です。</p>
```

### リンク（Anchor）

```html
<!-- 外部リンク -->
<a href="https://example.com">外部サイト</a>

<!-- 同じサイト内のリンク -->
<a href="/about.html">会社概要</a>

<!-- 別タブで開く -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  別タブで開く
</a>

<!-- ページ内リンク -->
<a href="#section1">セクション1へ</a>
```

**重要な属性:**
- `href`: リンク先のURL
- `target="_blank"`: 新しいタブで開く
- `rel="noopener noreferrer"`: セキュリティ対策（`target="_blank"`と併用）

### 画像（Image）

```html
<img src="image.jpg" alt="画像の説明" width="800" height="600">
```

**重要な属性:**
- `src`: 画像ファイルのパス（必須）
- `alt`: 代替テキスト（必須・アクセシビリティで重要）
- `width`/`height`: 画像のサイズ（推奨・レイアウトシフト防止）

### リスト（List）

#### 順序なしリスト

```html
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>
```

#### 順序ありリスト

```html
<ol>
  <li>最初の項目</li>
  <li>2番目の項目</li>
  <li>3番目の項目</li>
</ol>
```

### ボタン（Button）

```html
<!-- 通常のボタン -->
<button type="button">クリック</button>

<!-- フォーム送信ボタン -->
<button type="submit">送信</button>

<!-- リセットボタン -->
<button type="reset">リセット</button>
```

**重要:**
- `type`属性は必ず指定する
- デフォルトは`type="submit"`なので、通常のボタンには`type="button"`を指定

## セマンティック構造要素

HTML5では、ページの構造を意味的に表現する要素が追加されました。

```html
<body>
  <header>
    <!-- ヘッダー（サイトロゴ、ナビゲーションなど） -->
    <nav>
      <!-- ナビゲーション -->
    </nav>
  </header>

  <main>
    <!-- メインコンテンツ -->
    <article>
      <!-- 独立したコンテンツ（ブログ記事など） -->
      <h1>記事タイトル</h1>
      <section>
        <!-- 関連するコンテンツのグループ -->
        <h2>セクションタイトル</h2>
      </section>
    </article>

    <aside>
      <!-- 補足情報（サイドバーなど） -->
    </aside>
  </main>

  <footer>
    <!-- フッター（著作権表示など） -->
  </footer>
</body>
```

### 各要素の役割

| 要素 | 役割 |
|------|------|
| `<header>` | ヘッダー（ページまたはセクションの導入部） |
| `<nav>` | ナビゲーション（主要なリンク集） |
| `<main>` | メインコンテンツ（ページに1つのみ） |
| `<article>` | 独立したコンテンツ（記事、投稿など） |
| `<section>` | 関連するコンテンツのセクション |
| `<aside>` | 補足情報（サイドバー、広告など） |
| `<footer>` | フッター（著作権、連絡先など） |

## フォーム要素

```html
<form action="/submit" method="post">
  <label for="name">名前:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">メールアドレス:</label>
  <input type="email" id="email" name="email" required>

  <label for="message">メッセージ:</label>
  <textarea id="message" name="message" rows="5"></textarea>

  <button type="submit">送信</button>
</form>
```

**重要なポイント:**
- `<label>`の`for`属性と`<input>`の`id`属性を一致させる
- `type`属性で入力タイプを指定（text、email、password など）
- `required`属性で必須項目を指定

## 次のステップ

基礎を理解したら、次は以下を学習しましょう：

1. [セマンティックHTML編](../02-semantic-html/README.md) - より意味のあるマークアップ
2. [画像最適化編](../03-images/README.md) - パフォーマンス向上
3. [アクセシビリティ編](../04-accessibility/README.md) - すべてのユーザーへの配慮

## 参考リンク

- [MDN - HTML basics](https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [HTML Standard](https://html.spec.whatwg.org/)
