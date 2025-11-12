# Search要素（検索フォーム）

`<search>`要素は、検索機能を実装するためのHTML要素です。2023年3月にHTML Standardに追加されました。

## 追加された背景

従来、WAI-ARIAで定義された8つのランドマークロール（landmark roles）のうち、**searchロールだけがネイティブなHTML要素を持っていませんでした**。

### ARIAのランドマークロール

| ARIAロール | 対応するHTML要素 |
|-----------|----------------|
| banner | `<header>` |
| complementary | `<aside>` |
| contentinfo | `<footer>` |
| form | `<form>` |
| main | `<main>` |
| navigation | `<nav>` |
| region | `<section>` |
| **search** | **なし** → `<search>`が追加 |

### 従来の実装

```html
<!-- 以前の実装方法 -->
<div role="search">
  <form>
    <label for="search">検索:</label>
    <input type="search" id="search" name="q">
    <button type="submit">検索</button>
  </form>
</div>
```

### 現在の実装

```html
<!-- モダンな実装 -->
<search>
  <form>
    <label for="search">検索:</label>
    <input type="search" id="search" name="q">
    <button type="submit">検索</button>
  </form>
</search>
```

## 基本的な使い方

### シンプルな検索フォーム

```html
<search>
  <form action="/search" method="get">
    <label for="siteSearch">サイト内検索:</label>
    <input type="search" id="siteSearch" name="q" placeholder="キーワード">
    <button type="submit">検索</button>
  </form>
</search>
```

### ラベルなしの検索フォーム

```html
<search>
  <form action="/search" method="get">
    <input
      type="search"
      name="q"
      placeholder="検索..."
      aria-label="サイト内を検索">
    <button type="submit" aria-label="検索を実行">
      <svg><!-- 検索アイコン --></svg>
    </button>
  </form>
</search>
```

**ポイント:**
- ラベルが視覚的にない場合は`aria-label`を必ず指定

## セマンティックな意味

### 暗黙のARIAロール

`<search>`要素は暗黙のロールとして**searchロール**を持ちます。

```html
<search>
  <!-- 自動的に role="search" が適用される -->
</search>
```

### アクセシビリティへの影響

スクリーンリーダーユーザーは、ランドマークロールを使ってページ内を素早く移動できます。

- **macOS VoiceOver**: Rotor機能でランドマークにジャンプ
- **NVDA/JAWS**: ランドマークのリストを表示

`<search>`要素により、ユーザーは検索フォームに直接ジャンプできます。

## 技術仕様

| 項目 | 説明 |
|------|------|
| コンテンツカテゴリー | フローコンテンツ、知覚可能コンテンツ |
| 許可される内容 | フローコンテンツ |
| タグの省略 | 不可 |
| 暗黙のARIAロール | `search` |
| DOMインターフェイス | `HTMLElement` |

## 実装例

### ヘッダー内の検索

```html
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="/">ホーム</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <search>
    <form action="/search" method="get">
      <input
        type="search"
        name="q"
        placeholder="サイト内検索"
        aria-label="サイト内を検索">
      <button type="submit">検索</button>
    </form>
  </search>
</header>
```

### フィルター機能付き検索

```html
<search>
  <form action="/products" method="get">
    <div>
      <label for="keyword">キーワード:</label>
      <input type="search" id="keyword" name="q">
    </div>

    <div>
      <label for="category">カテゴリー:</label>
      <select id="category" name="category">
        <option value="">すべて</option>
        <option value="electronics">電化製品</option>
        <option value="clothing">衣類</option>
      </select>
    </div>

    <div>
      <label for="minPrice">最低価格:</label>
      <input type="number" id="minPrice" name="min" min="0">
    </div>

    <button type="submit">検索</button>
  </form>
</search>
```

### 複数の検索フォーム

ページに複数の検索フォームがある場合は、`aria-label`で区別します。

```html
<!-- サイト全体の検索 -->
<search aria-label="サイト内検索">
  <form action="/search">
    <input type="search" name="q" placeholder="サイト内検索">
    <button type="submit">検索</button>
  </form>
</search>

<!-- 記事内の検索 -->
<search aria-label="記事内検索">
  <form action="/article/search">
    <input type="search" name="q" placeholder="記事内を検索">
    <button type="submit">検索</button>
  </form>
</search>
```

### フォームなしの検索UI

検索が即座に実行される場合（JavaScriptで処理）、`<form>`要素は必須ではありません。

```html
<search>
  <label for="liveSearch">ライブ検索:</label>
  <input
    type="search"
    id="liveSearch"
    placeholder="入力すると自動検索"
    oninput="performSearch(this.value)">
</search>
```

## スタイリング

### 基本的なスタイル

```css
search {
  display: block;
  margin: 1rem 0;
}

search form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

search input[type="search"] {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

search button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

search button:hover {
  background-color: #0056b3;
}
```

### ヘッダー内の検索バー

```css
header search {
  max-width: 400px;
}

header search form {
  position: relative;
}

header search input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 24px;
}

header search button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}
```

## WAI-ARIAとの関係

W3Cのガイドラインでは、**「必要なセマンティクスが組み込まれたネイティブ要素を使用できる場合は、ネイティブのものを使用する」**ことを推奨しています。

### ✅ 推奨

```html
<search>
  <!-- ネイティブ要素を優先 -->
</search>
```

### ⚠️ 互換性のため

記事公開時点（2023年3月）ではブラウザ実装が完了していなかったため、互換性のために併用が推奨されていました。

```html
<search role="search">
  <!-- 古いブラウザのためにrole属性を併記 -->
</search>
```

**現在（2024年）:**
- 主要ブラウザすべてが対応済み
- `role="search"`の併記は不要（冗長）

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 118+ (2023年10月) |
| Firefox | 118+ (2023年9月) |
| Safari | 17+ (2023年9月) |
| Edge | 118+ (2023年10月) |
| iOS Safari | 17+ (2023年9月) |

**注意:** iOS Safari 16.7以下は非対応

## 使用すべき場面

### ✅ 推奨される使用場面

- サイト内検索
- 商品検索
- 記事検索
- ドキュメント検索
- フィルター機能を含む検索UI

### ❌ 使用しない場面

- 検索以外のフォーム
- ログインフォーム
- お問い合わせフォーム

## アクセシビリティチェックリスト

- [ ] `<search>`要素を検索機能に使用している
- [ ] ラベルが視覚的にない場合は`aria-label`を指定
- [ ] 複数の検索がある場合は`aria-label`で区別
- [ ] `input`要素に`type="search"`を指定
- [ ] キーボードで操作可能

## まとめ

### メリット
- ✅ セマンティックなマークアップ
- ✅ アクセシビリティの自動的な向上
- ✅ スクリーンリーダーユーザーの利便性向上
- ✅ `role="search"`の記述が不要

### いつ使うか
- 検索フォームを実装する際は常に使用を検討
- アクセシビリティを重視するプロジェクト

### 移行方法

```html
<!-- 旧 -->
<div role="search">
  <form>...</form>
</div>

<!-- 新 -->
<search>
  <form>...</form>
</search>
```

## 関連リンク

- [HTML Standard - search要素](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element)
- [MDN - &lt;search&gt;](https://developer.mozilla.org/ja/docs/Web/HTML/Element/search)
- [WAI-ARIA - searchロール](https://www.w3.org/TR/wai-aria-1.2/#search)
