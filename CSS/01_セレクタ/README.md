# CSS モダンセレクタ編

## 目次
1. [:has() セレクタ](#has-セレクタ)
2. [:is() セレクタ](#is-セレクタ)
3. [:where() セレクタ](#where-セレクタ)
4. [セレクタの詳細度（Specificity）](#セレクタの詳細度specificity)

---

## :has() セレクタ

### 概要
`:has()`セレクタは、**特定の子要素や後続要素を持つ親要素**を条件付きでスタイリングできる画期的なセレクタです。従来はJavaScriptや追加のクラスが必要だった処理が、CSSだけで実現できます。

### 基本構文
```css
親要素:has(子要素セレクタ) {
  /* スタイル */
}
```

### 主な使用例

#### 1. 画像を含むカードのスタイリング
```css
/* 画像がある場合のみカードに特別なスタイルを適用 */
.card:has(.card-img) {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}

/* 画像がない場合は通常のレイアウト */
.card {
  display: block;
}
```

#### 2. フォーカス状態の検出
```css
/* フォームがフォーカスを持っている場合、フォーム全体のスタイルを変更 */
form:has(:focus) {
  border: 2px solid #0066cc;
  box-shadow: 0 0 8px rgba(0, 102, 204, 0.3);
}
```

#### 3. 後続要素の確認
```css
/* h2の直後にpがある場合、そのh2のマージンを調整 */
h2:has(+ p) {
  margin-bottom: 0.5rem;
}
```

### 実践的な活用場面

**動的なレイアウト調整**
```css
/* リスト内のアイテムが5個以上ある場合、コンパクト表示に切り替え */
.list:has(> li:nth-child(5)) {
  column-count: 2;
  column-gap: 20px;
}
```

**エラー状態の表示**
```css
/* エラーメッセージを含む入力欄の親要素を強調 */
.form-group:has(.error-message) {
  background-color: #fff3f3;
  border-left: 4px solid #ff0000;
}
```

### ブラウザサポート（2023年6月時点）
- ✅ Chrome 105+
- ✅ Edge 105+
- ✅ Safari 15.4+
- ✅ Opera 91+
- ❌ Firefox（開発中）

---

## :is() セレクタ

### 概要
`:is()`セレクタは、**複数のセレクタをまとめて記述**し、コードの重複を削減できます。従来の長いセレクタリストを簡潔に書けるため、保守性が大幅に向上します。

### 基本構文
```css
:is(セレクタ1, セレクタ2, セレクタ3) {
  /* 共通のスタイル */
}
```

### 従来の方法との比較

#### 従来の方法（冗長）
```css
h1 { color: #00adb5; }
h2 { color: #00adb5; }
h3 { color: #00adb5; }
h4 { color: #00adb5; }
```

#### :is()を使用した方法（簡潔）
```css
:is(h1, h2, h3, h4) {
  color: #00adb5;
}
```

### 実践的な活用例

#### 1. 複雑なセレクタの簡略化
```css
/* 従来の方法 */
.header a:hover,
.sidebar a:hover,
.footer a:hover {
  color: #ff6b6b;
}

/* :is()を使用 */
:is(.header, .sidebar, .footer) a:hover {
  color: #ff6b6b;
}
```

#### 2. Sassとの組み合わせ
```scss
.container {
  p {
    color: #333;

    &:first-child {
      margin-top: 0;
    }

    /* h2の直後のpタグのスタイル */
    &:is(h2 + *) {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
}
```

#### 3. 状態の組み合わせ
```css
/* ボタンのホバー、フォーカス、アクティブ状態を一括指定 */
button:is(:hover, :focus, :active) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

### セレクタの詳細度について
`:is()`セレクタの詳細度は、**引数内で最も詳細度が高いセレクタの詳細度**になります。

```css
/* 詳細度: (0, 1, 0) - .classの詳細度 */
:is(.button, #id, p) {
  color: blue;
}
```

### ブラウザサポート
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Safari 14+
- ✅ Firefox 78+
- ✅ Opera 74+

---

## :where() セレクタ

### 概要
`:where()`セレクタは`:is()`と同じ構文ですが、**詳細度が常に0**という重要な違いがあります。これにより、上書きしやすいベーススタイルを作成できます。

### 基本構文
```css
:where(セレクタ1, セレクタ2, セレクタ3) {
  /* 詳細度0のスタイル */
}
```

### :is()との違い

```css
/* :is() - 詳細度: (0, 1, 0) */
:is(.button, .link) {
  color: blue;
}

/* :where() - 詳細度: (0, 0, 0) */
:where(.button, .link) {
  color: blue;
}

/* 通常のクラスセレクタで簡単に上書き可能 */
.button {
  color: red; /* :where()は上書きされる */
}
```

### 実践的な活用場面

#### 1. リセットCSSやベーススタイル
```css
/* ベースのリンクスタイル（詳細度0） */
:where(a) {
  color: #0066cc;
  text-decoration: none;
}

/* 特定の場所では簡単に上書き可能 */
.special-link {
  color: #ff6b6b; /* 詳細度(0,1,0)で上書き可能 */
}
```

#### 2. デザインシステムのデフォルトスタイル
```css
/* フレームワークのデフォルトスタイル */
:where(.btn) {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #e0e0e0;
}

/* プロジェクト固有のスタイルで簡単に上書き */
.btn {
  background-color: #0066cc;
}
```

#### 3. 条件付きスタイルの基本設定
```css
/* すべての見出しに基本スタイル（上書きしやすい） */
:where(h1, h2, h3, h4, h5, h6) {
  font-family: 'Arial', sans-serif;
  line-height: 1.4;
  margin: 0;
}

/* 個別の見出しで簡単にカスタマイズ */
h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
```

### 使い分けのポイント

| セレクタ | 詳細度 | 使用場面 |
|---------|--------|---------|
| `:is()` | 引数の最大値 | 通常のセレクタのまとめ、コードの簡潔化 |
| `:where()` | 常に0 | リセットCSS、ベーススタイル、上書き前提のスタイル |

### ブラウザサポート
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Safari 14+
- ✅ Firefox 78+
- ✅ Opera 74+

---

## セレクタの詳細度（Specificity）

### 詳細度の計算方法

CSSの詳細度は`(a, b, c)`の3つの値で表されます：

- **a**: IDセレクタの数
- **b**: クラス、属性、疑似クラスの数
- **c**: 要素、疑似要素の数

### 詳細度の比較例

```css
/* (0, 0, 1) - 要素セレクタ */
p { color: black; }

/* (0, 1, 0) - クラスセレクタ */
.text { color: blue; }

/* (0, 1, 1) - クラス + 要素 */
p.text { color: green; }

/* (1, 0, 0) - IDセレクタ */
#content { color: red; }

/* (0, 1, 1) - :is()の詳細度 */
:is(.text) p { color: purple; }

/* (0, 0, 1) - :where()の詳細度（常に0なのでcの1だけ） */
:where(.text) p { color: orange; }
```

### 詳細度の注意点

1. **!importantは最強**（ただし使用は推奨されない）
2. **インラインスタイルは(1, 0, 0, 0)** - IDより強い
3. **:is()は内部の最大詳細度を継承**
4. **:where()は常に詳細度0**

---

## まとめ

### 学習のポイント

1. **:has()** - 子要素の有無で親をスタイリング（親セレクタ）
2. **:is()** - セレクタをまとめて簡潔に記述
3. **:where()** - 上書きしやすいベーススタイルを作成

### 実務での推奨事項

- コンポーネントの状態管理には`:has()`を活用
- 繰り返しの多いセレクタは`:is()`で簡潔化
- フレームワークのデフォルトスタイルは`:where()`で実装
- 詳細度の違いを理解して適切に使い分ける

### 参考リンク

- [Can I use - :has()](https://caniuse.com/css-has)
- [Can I use - :is()](https://caniuse.com/css-matches-pseudo)
- [Can I use - :where()](https://caniuse.com/mdn-css_selectors_where)
- [MDN - :has()](https://developer.mozilla.org/ja/docs/Web/CSS/:has)
- [MDN - :is()](https://developer.mozilla.org/ja/docs/Web/CSS/:is)
- [MDN - :where()](https://developer.mozilla.org/ja/docs/Web/CSS/:where)
