# WCAG基礎

WCAG（Web Content Accessibility Guidelines）は、W3Cが定めるWebアクセシビリティの国際標準です。

## WCAGの4原則（POUR）

すべてのガイドラインは、以下の4つの原則に基づいています。

### 1. Perceivable（知覚可能）

**ユーザーが情報を知覚できること**

#### 代替テキスト

```html
<!-- ✅ 情報を伝える画像 -->
<img src="chart.png" alt="2024年の売上は前年比120%増加">

<!-- ✅ 装飾的な画像 -->
<img src="decoration.png" alt="">

<!-- ❌ 不適切 -->
<img src="chart.png" alt="画像">
<img src="chart.png"> <!-- altがない -->
```

#### 音声・動画コンテンツ

```html
<!-- ✅ 字幕付き動画 -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="ja" label="日本語">
</video>

<!-- ✅ トランスクリプト（文字起こし）の提供 -->
<details>
  <summary>動画の文字起こし</summary>
  <p>この動画では...</p>
</details>
```

#### 十分なコントラスト

```css
/* ✅ WCAG AA: 4.5:1以上 */
.text {
  color: #333333;
  background-color: #ffffff;
  /* コントラスト比: 12.6:1 */
}

/* ❌ 不十分 */
.text-bad {
  color: #999999;
  background-color: #ffffff;
  /* コントラスト比: 2.8:1 */
}
```

### 2. Operable（操作可能）

**ユーザーがインターフェースを操作できること**

#### キーボード操作

```html
<!-- ✅ ネイティブ要素を使用 -->
<button type="button" onclick="handleClick()">
  クリック
</button>

<!-- ❌ キーボードで操作できない -->
<div onclick="handleClick()">
  クリック
</div>

<!-- ⚠️ やむを得ない場合 -->
<div
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="handleKeyDown(event)">
  クリック
</div>
```

```javascript
function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}
```

#### フォーカスの視覚化

```css
/* ✅ 明確なフォーカス表示 */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* ❌ フォーカスを削除 */
*:focus {
  outline: none; /* 絶対にやらない */
}
```

#### スキップリンク

```html
<body>
  <!-- ✅ メインコンテンツへスキップ -->
  <a href="#main" class="skip-link">
    メインコンテンツへスキップ
  </a>

  <nav>
    <!-- ナビゲーション -->
  </nav>

  <main id="main">
    <!-- メインコンテンツ -->
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### 3. Understandable（理解可能）

**情報とUIの操作方法が理解できること**

#### 言語の指定

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <title>ページタイトル</title>
</head>
<body>
  <p>これは日本語のテキストです。</p>

  <!-- 部分的に英語 -->
  <p lang="en">This is English text.</p>
</body>
</html>
```

#### 明確なリンクテキスト

```html
<!-- ✅ 明確 -->
<a href="/about">会社概要</a>
<a href="/contact">お問い合わせフォーム</a>

<!-- ❌ 不明確 -->
<a href="/about">こちら</a>
<a href="/contact">クリック</a>
```

#### エラーの識別と修正方法

```html
<form>
  <div>
    <label for="email">メールアドレス（必須）:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-invalid="true"
      aria-describedby="email-error">
    <span id="email-error" role="alert">
      有効なメールアドレスを入力してください（例: user@example.com）
    </span>
  </div>
</form>
```

### 4. Robust（堅牢）

**様々な支援技術で利用できること**

#### 正しいHTML

```html
<!-- ✅ 正しいマークアップ -->
<ul>
  <li>項目1</li>
  <li>項目2</li>
</ul>

<!-- ❌ 不正なマークアップ -->
<ul>
  <div>項目1</div> <!-- ulの直下にdivは不正 -->
</ul>
```

#### セマンティックHTML

```html
<!-- ✅ セマンティック -->
<nav>
  <ul>
    <li><a href="/">ホーム</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>記事タイトル</h1>
    <p>本文...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024</p>
</footer>

<!-- ❌ 非セマンティック -->
<div class="nav">
  <div class="nav-item">ホーム</div>
</div>

<div class="main">
  <div class="article">
    <div class="title">記事タイトル</div>
    <div>本文...</div>
  </div>
</div>
```

## HTMLアクセシビリティ実装

### 見出し階層

```html
<!-- ✅ 正しい階層 -->
<h1>ページタイトル</h1>
  <h2>セクション1</h2>
    <h3>サブセクション1-1</h3>
    <h3>サブセクション1-2</h3>
  <h2>セクション2</h2>

<!-- ❌ 階層を飛ばす -->
<h1>ページタイトル</h1>
  <h3>セクション1</h3> <!-- h2を飛ばしている -->
```

### フォームの実装

#### label要素との関連付け

```html
<!-- ✅ 方法1: for属性とid属性 -->
<label for="username">ユーザー名:</label>
<input type="text" id="username" name="username">

<!-- ✅ 方法2: 入れ子 -->
<label>
  ユーザー名:
  <input type="text" name="username">
</label>
```

#### グループ化

```html
<fieldset>
  <legend>配送方法</legend>
  <label>
    <input type="radio" name="shipping" value="standard">
    通常配送
  </label>
  <label>
    <input type="radio" name="shipping" value="express">
    速達
  </label>
</fieldset>
```

#### 必須項目

```html
<label for="email">
  メールアドレス
  <abbr title="必須" aria-label="必須">*</abbr>
</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true">
```

### テーブルのアクセシビリティ

#### 見出しセルの指定

```html
<table>
  <caption>2024年売上実績</caption>
  <thead>
    <tr>
      <th scope="col">月</th>
      <th scope="col">売上</th>
      <th scope="col">前年比</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1月</th>
      <td>100万円</td>
      <td>+10%</td>
    </tr>
  </tbody>
</table>
```

#### 複雑なテーブル

```html
<table>
  <tr>
    <th id="month">月</th>
    <th id="product-a">製品A</th>
    <th id="product-b">製品B</th>
  </tr>
  <tr>
    <th id="jan" headers="month">1月</th>
    <td headers="jan product-a">100</td>
    <td headers="jan product-b">150</td>
  </tr>
</table>
```

## 実践例

### アクセシブルなナビゲーション

```html
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="/" aria-current="page">ホーム</a></li>
    <li><a href="/about">会社概要</a></li>
    <li><a href="/contact">お問い合わせ</a></li>
  </ul>
</nav>
```

### アクセシブルなフォーム

```html
<form>
  <h2>お問い合わせフォーム</h2>

  <div class="form-group">
    <label for="name">
      お名前 <abbr title="必須">*</abbr>
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      aria-required="true">
  </div>

  <div class="form-group">
    <label for="email">
      メールアドレス <abbr title="必須">*</abbr>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-required="true"
      aria-describedby="email-hint">
    <small id="email-hint">
      返信用のメールアドレスを入力してください
    </small>
  </div>

  <div class="form-group">
    <label for="message">
      お問い合わせ内容 <abbr title="必須">*</abbr>
    </label>
    <textarea
      id="message"
      name="message"
      required
      aria-required="true"
      rows="5"></textarea>
  </div>

  <button type="submit">送信</button>
</form>
```

### アクセシブルなカード

```html
<article class="card">
  <img src="product.jpg" alt="商品名 - 正面から撮影">
  <h2>
    <a href="/products/123">商品名</a>
  </h2>
  <p>商品の説明文...</p>
  <p>
    <strong>価格:</strong>
    <span aria-label="10,000円">¥10,000</span>
  </p>
  <a href="/products/123">詳細を見る</a>
</article>
```

## チェックリスト

### 必須項目

- [ ] すべての画像に適切な`alt`属性
- [ ] 見出し（h1〜h6）を階層的に使用
- [ ] フォームの各入力に`label`を関連付け
- [ ] リンクテキストが明確
- [ ] `html`要素に`lang`属性

### 推奨項目

- [ ] スキップリンクの実装
- [ ] フォーカス表示が明確
- [ ] コントラスト比がWCAG AA基準を満たす
- [ ] エラーメッセージが分かりやすい
- [ ] キーボードだけで操作可能

## ブラウザ・ツールでのチェック

### Chrome Lighthouse

```
1. Chrome DevToolsを開く（F12）
2. 「Lighthouse」タブを選択
3. 「Accessibility」にチェック
4. 「Analyze page load」をクリック
```

### アクセシビリティツリーの確認

```
Chrome DevTools → Elements → Accessibility
```

## まとめ

### 重要なポイント

1. **セマンティックHTMLが基本**
   - 適切な要素を使用
   - ARIAは補完的に使用

2. **キーボード操作を確保**
   - すべての機能にキーボードでアクセス可能
   - フォーカスが視覚的に分かる

3. **代替コンテンツを提供**
   - 画像に適切なalt
   - 動画に字幕

4. **テストを実施**
   - 自動ツール
   - 手動チェック
   - スクリーンリーダー

## 関連リンク

- [WCAG 2.1 日本語訳](https://waic.jp/docs/WCAG21/)
- [MDN - アクセシビリティ](https://developer.mozilla.org/ja/docs/Web/Accessibility)
- [WebAIM - WCAG Checklist](https://webaim.org/standards/wcag/checklist)
