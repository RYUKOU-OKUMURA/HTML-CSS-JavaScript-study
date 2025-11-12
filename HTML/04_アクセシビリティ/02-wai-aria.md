# WAI-ARIA

WAI-ARIA（Web Accessibility Initiative - Accessible Rich Internet Applications）は、HTMLの意味論で不足する部分を補完するための仕様です。

## WAI-ARIAとは

**重要な原則:**
> 「必要な時だけ使ってください」

正しいHTML要素が利用可能なら、ARIAより優先します。ARIAは、HTMLで実現できない場合の補完的な手段です。

## ARIAの3つの機能

### 1. ロール（Role）

要素が何か、もしくは何をするかを定義します。

#### ランドマークロール（ページ構造）

```html
<!-- ❌ ARIAを使う必要なし -->
<div role="navigation">
  <a href="/">ホーム</a>
</div>

<!-- ✅ ネイティブ要素を使用 -->
<nav>
  <a href="/">ホーム</a>
</nav>
```

**主要なランドマークロール:**

| ARIAロール | 対応するHTML要素 |
|-----------|----------------|
| `role="banner"` | `<header>` |
| `role="navigation"` | `<nav>` |
| `role="main"` | `<main>` |
| `role="complementary"` | `<aside>` |
| `role="contentinfo"` | `<footer>` |
| `role="search"` | `<search>` |

#### UIロール

```html
<!-- タブ付きインターフェース -->
<div role="tablist">
  <button role="tab" aria-selected="true">タブ1</button>
  <button role="tab" aria-selected="false">タブ2</button>
</div>
<div role="tabpanel">タブ1の内容</div>

<!-- アラート -->
<div role="alert">
  エラーが発生しました
</div>

<!-- ダイアログ -->
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">確認</h2>
  <p>本当に削除しますか？</p>
</div>
```

### 2. プロパティ（Property）

要素の性質を定義し、追加の意味を与えます。

#### aria-label

視覚的なラベルがない場合に使用します。

```html
<!-- ✅ アイコンのみのボタン -->
<button aria-label="メニューを閉じる">
  <svg><!-- × アイコン --></svg>
</button>

<!-- ✅ 検索フォーム -->
<input
  type="search"
  placeholder="検索..."
  aria-label="サイト内を検索">
```

#### aria-labelledby

複数の要素からラベルを参照します。

```html
<section aria-labelledby="section-title">
  <h2 id="section-title">セクションタイトル</h2>
  <p>コンテンツ...</p>
</section>

<dialog aria-labelledby="modal-title" aria-describedby="modal-desc">
  <h2 id="modal-title">確認</h2>
  <p id="modal-desc">この操作を実行しますか？</p>
</dialog>
```

#### aria-describedby

要素の説明を関連付けます。

```html
<label for="password">パスワード:</label>
<input
  type="password"
  id="password"
  aria-describedby="password-hint">
<span id="password-hint">
  8文字以上、英数字を含めてください
</span>
```

#### aria-required

フォーム入力が必須であることを示します。

```html
<label for="email">メールアドレス（必須）:</label>
<input
  type="email"
  id="email"
  required
  aria-required="true">
```

**注意:** HTML5の`required`属性と併用します。

#### aria-live

動的コンテンツの更新を通知します。

```html
<!-- polite: 現在の読み上げ完了後に通知 -->
<div aria-live="polite">
  検索結果: 5件
</div>

<!-- assertive: 即座に通知 -->
<div role="alert" aria-live="assertive">
  エラー: 保存に失敗しました
</div>
```

**aria-liveの値:**
- `off`: 通知しない（デフォルト）
- `polite`: 現在の読み上げ完了後に通知
- `assertive`: 即座に通知（緊急時のみ）

#### aria-atomic

更新時に全体を読み上げるかを指定します。

```html
<div aria-live="polite" aria-atomic="true">
  <h3>ランダムな引用</h3>
  <blockquote>
    <p id="quote"><!-- JavaScriptで更新 --></p>
  </blockquote>
</div>
```

- `true`: 更新時に全体を読み上げ
- `false`: 変更部分のみ読み上げ

### 3. ステート（State）

要素の現在の状態を定義します。JavaScriptで動的に変更されます。

#### aria-selected

選択状態を示します。

```html
<div role="tablist">
  <button role="tab" aria-selected="true">選択中</button>
  <button role="tab" aria-selected="false">未選択</button>
</div>
```

#### aria-expanded

展開・折りたたみ状態を示します。

```html
<button
  aria-expanded="false"
  aria-controls="menu">
  メニュー
</button>
<ul id="menu" hidden>
  <li>項目1</li>
  <li>項目2</li>
</ul>
```

```javascript
button.addEventListener('click', () => {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;
});
```

#### aria-disabled

無効状態を示します。

```html
<button aria-disabled="true" disabled>
  送信
</button>
```

**注意:** HTML5の`disabled`属性と併用します。

#### aria-invalid

入力値が無効であることを示します。

```html
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error">
<span id="email-error" role="alert">
  有効なメールアドレスを入力してください
</span>
```

#### aria-hidden

支援技術から隠します。

```html
<!-- ✅ 装飾的なアイコン -->
<button>
  <svg aria-hidden="true"><!-- アイコン --></svg>
  保存
</button>

<!-- ✅ 視覚的にのみ表示 -->
<span aria-hidden="true">→</span>
```

**警告:** コンテンツ全体を隠す場合は慎重に。

## 実装パターン

### タブ付きインターフェース

```html
<div role="tablist" aria-label="設定タブ">
  <button
    role="tab"
    id="tab-1"
    aria-selected="true"
    aria-controls="panel-1">
    一般
  </button>
  <button
    role="tab"
    id="tab-2"
    aria-selected="false"
    aria-controls="panel-2"
    tabindex="-1">
    プライバシー
  </button>
</div>

<div
  role="tabpanel"
  id="panel-1"
  aria-labelledby="tab-1">
  一般設定の内容
</div>

<div
  role="tabpanel"
  id="panel-2"
  aria-labelledby="tab-2"
  hidden>
  プライバシー設定の内容
</div>
```

### アコーディオン

```html
<div class="accordion">
  <h3>
    <button
      aria-expanded="false"
      aria-controls="content-1">
      セクション1
    </button>
  </h3>
  <div id="content-1" hidden>
    コンテンツ1
  </div>

  <h3>
    <button
      aria-expanded="false"
      aria-controls="content-2">
      セクション2
    </button>
  </h3>
  <div id="content-2" hidden>
    コンテンツ2
  </div>
</div>
```

### モーダルダイアログ

```html
<dialog
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  aria-modal="true">
  <h2 id="modal-title">確認</h2>
  <p id="modal-desc">本当に削除しますか？</p>
  <button>キャンセル</button>
  <button>削除</button>
</dialog>
```

**注意:** `<dialog>`要素は`role="dialog"`を暗黙的に持つため、通常は不要です。

### ライブリージョン（動的更新）

```html
<div role="status" aria-live="polite" aria-atomic="true">
  <p>読み込み中...</p>
</div>
```

```javascript
// 更新時
liveRegion.innerHTML = '<p>読み込み完了しました</p>';
```

### 検索候補（コンボボックス）

```html
<label for="search">検索:</label>
<input
  type="text"
  id="search"
  role="combobox"
  aria-expanded="false"
  aria-controls="suggestions"
  aria-autocomplete="list">

<ul id="suggestions" role="listbox" hidden>
  <li role="option">候補1</li>
  <li role="option">候補2</li>
</ul>
```

## ARIAの学習順序

### ステップ1: ロールを理解する

まず、ARIAロールの概念を理解します。

```html
<div role="button">クリック</div>
```

### ステップ2: HTMLの暗黙のロールを知る

各HTML要素が自動的に持つロールを知ります。

```html
<!-- これらは同等 -->
<button>クリック</button>
<div role="button">クリック</div>

<!-- ネイティブ要素を優先 -->
```

### ステップ3: ロールに基づいてプロパティ/ステートを使用

ロールによって、使用できるARIA属性が決まります。

```html
<!-- role="tab"に対して適切な属性 -->
<button
  role="tab"
  aria-selected="true"
  aria-controls="panel-1">
  タブ
</button>
```

### ステップ4: ツールで検証

markuplintなどのツールで自動検証します。

## よくある間違い

### ❌ 暗黙のロールを明示的に指定

```html
<!-- ❌ 冗長 -->
<button role="button">クリック</button>

<!-- ✅ roleは不要 -->
<button>クリック</button>
```

### ❌ HTML属性とARIA属性の重複

```html
<!-- ❌ aria-checkedが同期されない -->
<input type="checkbox" aria-checked="false">

<!-- ✅ HTMLの属性のみ -->
<input type="checkbox">
```

### ❌ role="presentation"の誤用

```html
<!-- ❌ セマンティクスを失う -->
<h1 role="presentation">タイトル</h1>

<!-- ✅ 適切な使用例: 装飾的な要素 -->
<table role="presentation">
  <!-- レイアウト目的のテーブル -->
</table>
```

### ❌ aria-labelとlabel要素の併用

```html
<!-- ❌ 冗長 -->
<label for="name">名前:</label>
<input id="name" aria-label="名前">

<!-- ✅ labelがあればaria-labelは不要 -->
<label for="name">名前:</label>
<input id="name">
```

## ベストプラクティス

### 1. ネイティブHTML要素を優先

```html
<!-- ✅ 推奨 -->
<button>クリック</button>

<!-- ❌ 非推奨 -->
<div role="button" tabindex="0">クリック</div>
```

### 2. ARIAは補完的に使用

```html
<!-- ✅ HTMLで実現できない場合にARIAを使用 -->
<div role="tablist">
  <!-- タブUIはHTMLにネイティブ要素がない -->
</div>
```

### 3. 動的な状態はJavaScriptで更新

```javascript
// ✅ 状態を適切に更新
button.setAttribute('aria-expanded', 'true');
panel.hidden = false;
```

### 4. ツールで検証

- markuplint
- axe DevTools
- WAVE

## まとめ

### 重要なポイント

1. **ネイティブHTMLが最優先**
   - ARIAは補完的な手段

2. **ロールベースで属性を選択**
   - 各ロールに適した属性を使用

3. **動的な状態を適切に管理**
   - JavaScriptで状態を更新

4. **過剰に使わない**
   - 必要な場合のみ使用

### 学習リソース

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN - ARIA](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)

## 関連リンク

- [WCAG基礎](./01-wcag-basics.md)
- [アクセシブルなタブUI](./03-accessible-tabs.md)
