# CSS モダンプロパティ編

## 目次
1. [currentColor](#currentcolor)
2. [clamp()](#clamp)
3. [新しいビューポートユニット（svh, dvh, lvh）](#新しいビューポートユニットsvh-dvh-lvh)
4. [word-break](#word-break)
5. [border-radius: 100vmax](#border-radius-100vmax)

---

## currentColor

### 概要
`currentColor`は、**要素の`color`プロパティの値を他のプロパティで参照**できるキーワードです。CSS変数のように機能し、色の同期が簡単になります。

### 基本構文
```css
.element {
  color: #0066cc;
  border: 2px solid currentColor; /* #0066ccが適用される */
  box-shadow: 0 2px 4px currentColor; /* #0066ccが適用される */
}
```

### 実用例

#### ボタンのバリエーション
```css
.button {
  border: 2px solid currentColor;
  box-shadow: 0 2px 4px currentColor;
  transition: color 0.3s;
}

.button-primary {
  color: #0066cc; /* これを変えるだけで border と box-shadow も変わる */
}

.button-danger {
  color: #ff0000;
}

.button-success {
  color: #4caf50;
}
```

#### SVGアイコンの色同期
```html
<button class="icon-button">
  <svg fill="currentColor" width="24" height="24">
    <path d="..."/>
  </svg>
  テキスト
</button>
```

```css
.icon-button {
  color: #333;
}

.icon-button:hover {
  color: #0066cc; /* テキストとアイコンが同時に変わる */
}
```

#### リンクの装飾
```css
a {
  color: #0066cc;
  text-decoration-color: currentColor;
  border-bottom: 2px solid currentColor;
}

a:hover {
  color: #ff6b6b; /* すべての装飾が一緒に変わる */
}
```

### メリット

1. **保守性の向上**: 色を1箇所で管理
2. **コードの簡潔化**: 同じ色を何度も書かない
3. **動的な色変更**: テキストと装飾の色を自動同期

### ブラウザサポート
- ✅ すべてのモダンブラウザで対応

---

## clamp()

### 概要
`clamp()`関数は、**最小値、推奨値、最大値を指定**して、レスポンシブなサイズ設定を実現します。メディアクエリなしで、柔軟なサイズ調整が可能です。

### 基本構文
```css
.element {
  font-size: clamp(最小値, 推奨値, 最大値);
}
```

**動作:**
- 推奨値が最小値より小さい → 最小値を使用
- 推奨値が最小値〜最大値の範囲内 → 推奨値を使用
- 推奨値が最大値より大きい → 最大値を使用

### 実用例

#### レスポンシブなフォントサイズ
```css
h1 {
  /* 画面幅に応じて24px〜48pxの間で調整 */
  font-size: clamp(24px, 5vw, 48px);
}

p {
  /* 最小16px、最大20px */
  font-size: clamp(16px, 1.5vw, 20px);
}
```

#### 推奨値の計算式
```css
/* ビューポート幅に応じて滑らかに変化 */
.container {
  /* 320pxの画面で16px、1920pxの画面で24px */
  font-size: clamp(16px, 1rem + 0.5vw, 24px);
}
```

#### コンテナの幅
```css
.container {
  /* 最小320px、最大1200px */
  width: clamp(320px, 90vw, 1200px);
  margin-inline: auto;
}
```

#### パディング・マージン
```css
.section {
  /* レスポンシブなパディング */
  padding: clamp(20px, 5vw, 80px);
}
```

### 計算ツール

複雑な計算式を作成するには、オンラインツールが便利です：
- [Min-Max Calculator](https://min-max-calculator.9elements.com/)

### ブラウザサポート
- ✅ Chrome 79+
- ✅ Edge 79+
- ✅ Safari 13.1+
- ✅ Firefox 75+

---

## 新しいビューポートユニット（svh, dvh, lvh）

### 概要
従来の`vh`は、モバイルブラウザのアドレスバーの表示/非表示で高さが変わる問題がありました。新しいビューポートユニットはこの問題を解決します。

### 3つの主要ユニット

#### svh（Small Viewport Height）
ビューポートが**最小の状態**の高さ（アドレスバー表示時）

```css
.hero {
  height: 100svh; /* 常に画面いっぱい、スクロールで高さが変わらない */
}
```

**使用場面:**
- ヒーローイメージ
- ファーストビュー
- 高さを固定したいセクション

#### lvh（Large Viewport Height）
ビューポートが**最大の状態**の高さ（アドレスバー非表示時）

```css
.fullscreen {
  height: 100lvh;
}
```

従来の`100vh`は`100lvh`と同じ動作でした。

#### dvh（Dynamic Viewport Height）
ビューポートサイズの**変化に動的に対応**

```css
.modal {
  height: 100dvh; /* アドレスバーの表示/非表示に応じて高さが変わる */
}
```

**使用場面:**
- モーダルウィンドウ
- ナビゲーション
- フルスクリーンメニュー

### 使い分けのガイドライン

| ユニット | 用途 | 高さの変化 |
|---------|-----|-----------|
| `svh` | ヒーローイメージ、固定高さのセクション | 変わらない |
| `lvh` | 最大サイズを基準にしたい場合 | 変わらない |
| `dvh` | モーダル、ナビゲーション | 変わる |

### その他のバリエーション

```css
/* 幅のバージョン */
width: 100svw; /* Small Viewport Width */
width: 100lvw; /* Large Viewport Width */
width: 100dvw; /* Dynamic Viewport Width */

/* インライン方向 */
width: 100svi; /* Small Viewport Inline */
width: 100lvi; /* Large Viewport Inline */
width: 100dvi; /* Dynamic Viewport Inline */

/* ブロック方向 */
height: 100svb; /* Small Viewport Block */
height: 100lvb; /* Large Viewport Block */
height: 100dvb; /* Dynamic Viewport Block */

/* 最小・最大 */
width: 100svmin; /* 幅と高さの小さい方 */
width: 100svmax; /* 幅と高さの大きい方 */
```

### 実用例

#### ヒーローセクション（推奨）
```css
.hero {
  height: 100svh; /* スクロールしても高さが変わらない */
  display: grid;
  place-content: center;
}
```

#### モーダル
```css
.modal {
  position: fixed;
  inset: 0;
  height: 100dvh; /* アドレスバーに追従 */
  overflow-y: auto;
}
```

### ブラウザサポート（2022年11月以降、全ブラウザ対応）
- ✅ Chrome 108+
- ✅ Edge 108+
- ✅ Safari 15.4+
- ✅ Firefox 101+

---

## word-break

### 概要
`word-break`は、**テキストの折り返し方法**を制御します。従来の`break-word`は非推奨になりました。

### 値の種類

#### normal（デフォルト）
```css
.text {
  word-break: normal; /* 単語の途中では折り返さない */
}
```

#### break-all
```css
.text {
  word-break: break-all; /* 必要に応じて単語の途中でも折り返す */
}
```

**使用場面:**
- URL
- 長いハッシュ値
- 英単語が長いテキスト

#### keep-all
```css
.text {
  word-break: keep-all; /* 単語内での折り返しは行わない */
}
```

CJK（中国語・日本語・韓国語）でも単語単位で折り返します。

### 非推奨の値

```css
/* ❌ 非推奨 */
.text {
  word-break: break-word;
}

/* ✅ 代わりにこちらを使用 */
.text {
  overflow-wrap: anywhere;
}
```

### overflow-wrap との違い

```css
/* word-break: break-all */
/* どこでも折り返す */
word-break: break-all;

/* overflow-wrap: anywhere */
/* どうしても収まらない場合のみ折り返す */
overflow-wrap: anywhere;
```

### 実用例

#### URL の表示
```css
.url {
  word-break: break-all;
  /* または */
  overflow-wrap: anywhere;
}
```

#### 日本語と英語の混在テキスト
```css
.text {
  overflow-wrap: break-word; /* 単語が長すぎる場合のみ折り返す */
  word-break: normal; /* 通常は単語単位 */
}
```

### ブラウザサポート
- ✅ すべてのモダンブラウザで対応

---

## border-radius: 100vmax

### 概要
`border-radius: 100vmax`を使うと、**どんなサイズのボタンでも完全な角丸**を実現できます。

### 従来の方法の問題

```css
/* 固定値 - ボタンサイズが変わると形が崩れる */
.button {
  border-radius: 20px;
}

/* 50% - 正方形以外では楕円になる */
.button {
  border-radius: 50%;
}
```

### 100vmax を使った解決

```css
.button {
  padding: 10px 30px;
  border-radius: 100vmax; /* どんなサイズでも完全な角丸 */
}
```

**メリット:**
- パディングやフォントサイズが変わっても、常に完全な角丸
- 正方形でなくても綺麗な角丸（ピルシェイプ）
- レスポンシブ対応が簡単

### 実用例

#### ボタン
```css
.button {
  display: inline-block;
  padding: 12px 32px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 100vmax;
  cursor: pointer;
}
```

#### タグ・バッジ
```css
.tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: #e0e0e0;
  border-radius: 100vmax;
  font-size: 14px;
}
```

#### 検索バー
```css
.search-input {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 100vmax;
  width: 300px;
}
```

### vmax とは

`vmax`は、ビューポートの幅と高さの**大きい方**を基準とする単位です。
- `1vmax` = ビューポートの幅または高さの大きい方の1%
- `100vmax` = 十分に大きい値（完全な角丸を保証）

### ブラウザサポート
- ✅ すべてのモダンブラウザで対応

---

## まとめ

### 学習のポイント

1. **currentColor** - 色の同期を簡単に
2. **clamp()** - メディアクエリ不要のレスポンシブサイズ
3. **svh/dvh/lvh** - モバイルブラウザのビューポート問題を解決
4. **word-break** - 正しいテキスト折り返し（break-wordは非推奨）
5. **100vmax** - 完璧な角丸ボタン

### 実務での推奨事項

- SVGアイコンは`currentColor`で色を同期
- フォントサイズは`clamp()`でレスポンシブに
- ヒーローセクションは`100svh`を使用
- 長いURLには`overflow-wrap: anywhere`
- ボタンの角丸は`border-radius: 100vmax`

### 参考リンク

- [MDN - currentColor](https://developer.mozilla.org/ja/docs/Web/CSS/color_value#currentcolor)
- [MDN - clamp()](https://developer.mozilla.org/ja/docs/Web/CSS/clamp)
- [MDN - Viewport units](https://developer.mozilla.org/ja/docs/Web/CSS/length#viewport-percentage_lengths)
- [MDN - word-break](https://developer.mozilla.org/ja/docs/Web/CSS/word-break)
- [MDN - border-radius](https://developer.mozilla.org/ja/docs/Web/CSS/border-radius)
- [Min-Max Calculator](https://min-max-calculator.9elements.com/)
