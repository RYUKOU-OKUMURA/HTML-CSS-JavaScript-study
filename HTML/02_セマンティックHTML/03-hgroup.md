# Hgroup要素（見出しグループ）

`<hgroup>`要素は、見出しとその副題をグループ化するためのHTML要素です。

## 基本的な使い方

### シンプルな例

```html
<hgroup>
  <h1>メインタイトル</h1>
  <p>サブタイトルや補足説明</p>
</hgroup>
```

## 現在の仕様

2023年8月の仕様更新により、hgroup要素の構成が明確になりました。

### ✅ 推奨される構成

**「1つの見出し要素 + 0個以上のp要素」**

```html
<hgroup>
  <h1>主題のテキスト</h1>
  <p>副題のテキスト</p>
</hgroup>
```

### ❌ 推奨されない構成

複数の見出し要素を含める方法は、現在の仕様に反しています。

```html
<!-- 古い仕様・非推奨 -->
<hgroup>
  <h1>メインタイトル</h1>
  <h2>サブタイトル</h2>  <!-- h要素は1つのみ -->
</hgroup>
```

## セマンティックな意味

### ARIAロールの変更

2023年の更新で、hgroup要素のARIAロールが変更されました：

- **以前**: `generic`（divと同じ）
- **現在**: `group`

これにより、`<hgroup>`は単なる`<div>`とは異なるセマンティックな意味を持つようになりました。

### スクリーンリーダーでの扱い

hgroup要素は、見出しと副題が関連していることを支援技術に伝えます。

```html
<hgroup>
  <h1>会社概要</h1>
  <p>私たちのミッション</p>
</hgroup>
```

スクリーンリーダーは「会社概要、見出しレベル1、グループ」のように読み上げます。

## 実装例

### ブログのヘッダー

```html
<header>
  <hgroup>
    <h1 translate="no">TECH BLOG</h1>
    <p>フロントエンドエンジニアの技術メモ</p>
  </hgroup>
</header>
```

**ポイント:**
- `translate="no"`でサイト名の翻訳を防止
- サブタイトルで具体的な説明を提供

### 記事のタイトル

```html
<article>
  <header>
    <hgroup>
      <h1>モダンHTMLの書き方</h1>
      <p>セマンティックHTMLで実現するアクセシブルなWebサイト</p>
    </hgroup>
    <p class="meta">
      <time datetime="2024-05-13">2024年5月13日</time>
      著者: 山田太郎
    </p>
  </header>

  <p>記事の本文...</p>
</article>
```

### 日本語+英語の見出し

同じ意味の日本語と英語は、主題+副題として扱えます。

```html
<section>
  <hgroup>
    <h2>会社概要</h2>
    <p lang="en">About Us</p>
  </hgroup>

  <p>会社の説明...</p>
</section>
```

**ポイント:**
- `lang="en"`で言語を明示
- SEOとアクセシビリティの向上

### プロダクト名とキャッチコピー

```html
<hgroup>
  <h1>SuperApp</h1>
  <p>すべてを一つのアプリで</p>
</hgroup>
```

## 他のマークアップ方法との比較

### 1. hgroup + p要素（✅ 推奨）

```html
<hgroup>
  <h1>主題</h1>
  <p>副題</p>
</hgroup>
```

**メリット:**
- セマンティック
- 主題と副題の明確な区別
- スクリーンリーダーで適切に読み上げ

**デメリット:**
- なし

### 2. h1内にspan

```html
<h1>
  主題
  <span class="subtitle">副題</span>
</h1>
```

**メリット:**
- シンプル

**デメリット:**
- 副題も見出しとして認識される
- セマンティックではない
- スクリーンリーダーで区別できない

### 3. content:attr()

```html
<h1 data-subtitle="副題">主題</h1>
```

```css
h1::after {
  content: attr(data-subtitle);
  display: block;
  font-size: 0.5em;
}
```

**メリット:**
- なし（デメリットが多すぎる）

**デメリット:**
- 翻訳ツールで翻訳されない
- 検索できない
- テキスト選択できない
- アクセシビリティ問題

## スタイリング

### 基本的なスタイル

```css
hgroup {
  margin-bottom: 2rem;
}

hgroup h1,
hgroup h2,
hgroup h3 {
  margin-bottom: 0.5rem;
}

hgroup p {
  color: #666;
  font-size: 1.2rem;
  font-weight: normal;
  margin: 0;
}
```

### ブログヘッダーのスタイル

```css
header hgroup {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
}

header hgroup h1 {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 0;
}

header hgroup p {
  font-size: 1rem;
  color: #888;
  margin-top: 0.5rem;
}
```

### 日英併記のスタイル

```css
hgroup {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

hgroup h2 {
  font-size: 2rem;
  margin: 0;
}

hgroup p {
  font-size: 1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}
```

結果：

```
会社概要 ABOUT US
```

## 避けるべき使い方

### ❌ role="doc-subtitle"の使用

```html
<!-- 非推奨 -->
<h1>タイトル</h1>
<p role="doc-subtitle">サブタイトル</p>
```

**問題点:**
- 支援技術で「heading level 2」と誤って読み上げられる
- 文書構造が不正確に認識される

### ❌ 複数の見出しを含める

```html
<!-- 古い仕様・非推奨 -->
<hgroup>
  <h1>タイトル</h1>
  <h2>サブタイトル</h2>
  <h3>さらにサブタイトル</h3>
</hgroup>
```

### ❌ 関連のないコンテンツのグループ化

```html
<!-- 間違った使い方 -->
<hgroup>
  <h1>タイトル</h1>
  <p>本文のテキスト...</p>  <!-- これは副題ではない -->
</hgroup>
```

## ブラウザ対応

| ブラウザ | 対応状況 |
|----------|---------|
| Chrome | サポート |
| Firefox | サポート |
| Safari | サポート |
| Edge | サポート |

**注意:** すべてのモダンブラウザで対応していますが、セマンティックな意味の解釈は2023年の仕様更新後のものです。

## アクセシビリティチェックリスト

- [ ] hgroup内に見出し要素は1つだけ
- [ ] 副題はp要素を使用
- [ ] 必要に応じてlang属性を指定
- [ ] 副題は本当に見出しの補足情報か確認
- [ ] スタイルで視覚的な階層が明確か確認

## まとめ

### 使用すべき場面
- ✅ 見出しに副題がある場合
- ✅ 日本語と英語の見出しを併記する場合
- ✅ プロダクト名とキャッチコピー
- ✅ 章タイトルと章の説明

### 使用しない場面
- ❌ 単純な見出しだけの場合（hgroupは不要）
- ❌ 本文テキストを含める場合
- ❌ 関連のない要素のグループ化

### メリット
- ✅ セマンティックなマークアップ
- ✅ アクセシビリティの向上
- ✅ 検索エンジンが構造を理解しやすい
- ✅ 将来の拡張性

## 関連リンク

- [HTML Standard - hgroup要素](https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element)
- [MDN - &lt;hgroup&gt;](https://developer.mozilla.org/ja/docs/Web/HTML/Element/hgroup)
