# セマンティックHTML編

セマンティック（意味的な）HTMLとは、要素が持つ意味を活用してコンテンツを適切にマークアップすることです。

## なぜセマンティックHTMLが重要なのか

### 1. アクセシビリティの向上
スクリーンリーダーなどの支援技術が、コンテンツの構造と意味を正しく理解できます。

### 2. SEOの改善
検索エンジンが、ページの内容をより正確に理解できます。

### 3. メンテナンス性の向上
コードの意図が明確になり、他の開発者（または将来の自分）が理解しやすくなります。

### 4. CSSとJavaScriptの簡潔化
意味のある要素を使うことで、余計なclassやidが不要になります。

## セマンティックHTMLの例

### ❌ 非セマンティック

```html
<div class="header">
  <div class="nav">
    <div class="nav-item">ホーム</div>
    <div class="nav-item">会社概要</div>
  </div>
</div>

<div class="main">
  <div class="article">
    <div class="title">記事タイトル</div>
    <div class="content">記事の内容...</div>
  </div>
</div>
```

### ✅ セマンティック

```html
<header>
  <nav>
    <a href="/">ホーム</a>
    <a href="/about">会社概要</a>
  </nav>
</header>

<main>
  <article>
    <h1>記事タイトル</h1>
    <p>記事の内容...</p>
  </article>
</main>
```

## モダンなセマンティック要素

このセクションでは、モダンなWebサイト構築に役立つセマンティック要素を学びます。

### 1. Details/Summary要素

アコーディオンUIを実装するためのネイティブHTML要素です。JavaScriptなしで動作し、アクセシビリティが自動的に確保されます。

[詳しく学ぶ →](./01-details-summary.md)

```html
<details>
  <summary>クリックして開く</summary>
  <p>ここに隠されたコンテンツ</p>
</details>
```

### 2. Dialog要素

モーダルウィンドウを実装するためのネイティブ要素です。従来はライブラリが必要でしたが、標準機能として利用できます。

[詳しく学ぶ →](./02-dialog.md)

```html
<dialog id="myDialog">
  <h2>モーダルタイトル</h2>
  <p>モーダルの内容</p>
  <button type="button">閉じる</button>
</dialog>
```

### 3. Hgroup要素

見出しとその副題をグループ化するための要素です。正しい文書構造を保ちながら、副題を表現できます。

[詳しく学ぶ →](./03-hgroup.md)

```html
<hgroup>
  <h1>メインタイトル</h1>
  <p>サブタイトルや説明</p>
</hgroup>
```

### 4. Search要素

検索機能を実装するための要素です。ARIAのsearchロールに対応するネイティブ要素として追加されました。

[詳しく学ぶ →](./04-search.md)

```html
<search>
  <form>
    <label for="query">検索:</label>
    <input type="search" id="query" name="q">
    <button type="submit">検索</button>
  </form>
</search>
```

## セマンティック要素の選び方

### フローチャート

```
コンテンツは独立していますか？
├─ はい → <article>を検討
└─ いいえ
    ├─ 関連するコンテンツのグループですか？
    │   └─ はい → <section>を検討
    └─ 補足情報ですか？
        └─ はい → <aside>を検討
```

### 一般的な使い分け

| 要素 | 使用場面 | 例 |
|------|----------|-----|
| `<article>` | 独立したコンテンツ | ブログ記事、ニュース記事、フォーラムの投稿 |
| `<section>` | 関連するコンテンツの区分 | 章、タブパネル、テーマごとのグループ |
| `<aside>` | 補足的なコンテンツ | サイドバー、引用、広告 |
| `<nav>` | ナビゲーション | メインメニュー、パンくずリスト |
| `<header>` | 導入部・ヘッダー | ページヘッダー、記事の導入部 |
| `<footer>` | フッター・末尾情報 | 著作権、関連リンク、著者情報 |

## よくある間違い

### 1. すべてのグループ化に`<section>`を使う

```html
<!-- ❌ 間違い -->
<section class="wrapper">
  <section class="container">
    <section class="box">
      内容
    </section>
  </section>
</section>

<!-- ✅ 正しい -->
<div class="wrapper">
  <div class="container">
    <section>
      <h2>意味のあるセクション</h2>
      <p>内容</p>
    </section>
  </div>
</div>
```

**ポイント:** レイアウト目的だけなら`<div>`を使う。`<section>`は意味的なグループ化に使う。

### 2. 見出しのない`<section>`や`<article>`

```html
<!-- ❌ 間違い -->
<section>
  <p>内容だけ</p>
</section>

<!-- ✅ 正しい -->
<section>
  <h2>セクションのタイトル</h2>
  <p>内容</p>
</section>
```

**ポイント:** `<section>`と`<article>`には必ず見出し要素を含める。

### 3. 複数の`<main>`要素

```html
<!-- ❌ 間違い -->
<body>
  <main>トップページのコンテンツ</main>
  <main>サイドバーのコンテンツ</main>
</body>

<!-- ✅ 正しい -->
<body>
  <main>トップページのコンテンツ</main>
  <aside>サイドバーのコンテンツ</aside>
</body>
```

**ポイント:** `<main>`要素は1ページに1つだけ。

## 実践例：ブログ記事ページ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>セマンティックHTMLの重要性 - テックブログ</title>
</head>
<body>
  <header>
    <hgroup>
      <h1>テックブログ</h1>
      <p>Web開発の最新情報</p>
    </hgroup>
    <nav aria-label="メインナビゲーション">
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/articles">記事一覧</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h1>セマンティックHTMLの重要性</h1>
        <p>
          <time datetime="2024-05-13">2024年5月13日</time>
          著者: <span>山田太郎</span>
        </p>
      </header>

      <section>
        <h2>セマンティックHTMLとは</h2>
        <p>セマンティックHTMLは...</p>
      </section>

      <section>
        <h2>メリット</h2>
        <p>主なメリットは...</p>
      </section>

      <footer>
        <p>タグ: HTML, アクセシビリティ, SEO</p>
      </footer>
    </article>

    <aside>
      <h2>関連記事</h2>
      <ul>
        <li><a href="/articles/1">HTMLの基礎</a></li>
        <li><a href="/articles/2">CSSの基礎</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 テックブログ. All rights reserved.</p>
  </footer>
</body>
</html>
```

## チェックリスト

セマンティックHTMLを書く際のチェックリスト：

- [ ] 見出し（h1〜h6）は階層を守って使っている
- [ ] リスト構造は`<ul>`、`<ol>`、`<dl>`を使っている
- [ ] ナビゲーションには`<nav>`を使っている
- [ ] メインコンテンツは`<main>`で囲んでいる
- [ ] 独立したコンテンツは`<article>`を使っている
- [ ] 意味的なセクションは`<section>`を使っている
- [ ] レイアウト目的だけなら`<div>`を使っている
- [ ] ボタンには`type`属性を指定している
- [ ] フォームの各入力には`<label>`を関連付けている

## 次のステップ

各セマンティック要素について詳しく学びましょう：

1. [Details/Summary要素（アコーディオン）](./01-details-summary.md)
2. [Dialog要素（モーダル）](./02-dialog.md)
3. [Hgroup要素（見出しグループ）](./03-hgroup.md)
4. [Search要素（検索フォーム）](./04-search.md)

## 参考リンク

- [MDN - HTML要素リファレンス](https://developer.mozilla.org/ja/docs/Web/HTML/Element)
- [HTML5 Doctor - Element Index](http://html5doctor.com/element-index/)
