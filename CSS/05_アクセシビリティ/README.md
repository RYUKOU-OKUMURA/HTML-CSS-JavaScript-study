# CSS アクセシビリティ編

## 目次
1. [モダンメディアクエリ](#モダンメディアクエリ)
2. [any-hover メディア特性](#any-hover-メディア特性)
3. [prefers-reduced-motion](#prefers-reduced-motion)
4. [Visually Hidden](#visually-hidden)

---

## モダンメディアクエリ

### 概要
CSSメディアクエリの書き方が進化し、より**簡潔で直感的な構文**（Range Syntax）が使えるようになりました。

### 従来の書き方

```css
/* 従来の方法（冗長） */
@media screen and (min-width: 768px) {
  /* タブレット以上 */
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* タブレットのみ */
}
```

### 新しい書き方（Range Syntax）

#### 1. screen キーワードの省略
```css
/* ✅ 推奨（screenは省略可能） */
@media (min-width: 768px) {
  /* タブレット以上 */
}
```

#### 2. 範囲構文を使用
```css
/* 従来の方法 */
@media (min-width: 768px) {
  /* 768px以上 */
}

/* 範囲構文（より直感的） */
@media (width >= 768px) {
  /* 768px以上 */
}
```

#### 3. 範囲を簡潔に記述
```css
/* 従来の方法 */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 768px〜1024px */
}

/* 範囲構文 */
@media (768px <= width <= 1024px) {
  /* 768px〜1024px */
}
```

### 実用的な例

#### モバイルファースト
```css
/* ベーススタイル（モバイル） */
.container {
  padding: 20px;
}

/* タブレット以上 */
@media (width >= 768px) {
  .container {
    padding: 40px;
  }
}

/* デスクトップ以上 */
@media (width >= 1024px) {
  .container {
    padding: 60px;
    max-width: 1200px;
    margin-inline: auto;
  }
}
```

#### 特定の範囲
```css
/* タブレットのみ */
@media (768px <= width < 1024px) {
  .sidebar {
    width: 200px;
  }
}
```

#### 高さの条件
```css
/* 画面が低い場合 */
@media (height < 600px) {
  .header {
    height: 40px; /* ヘッダーを小さく */
  }
}
```

### ブラウザサポート
- ✅ Chrome 104+
- ✅ Edge 104+
- ✅ Safari 16.4+
- ✅ Firefox 63+

---

## any-hover メディア特性

### 概要
`any-hover`メディア特性は、**デバイスがホバー操作に対応しているか**を検出します。画面サイズではなく、**入力方式**で判定するため、より正確です。

### 問題: 画面サイズでの判定は不正確

```css
/* ❌ 間違ったアプローチ */
@media (max-width: 768px) {
  /* モバイルだと仮定してホバーを無効化 */
  .button:hover {
    /* スタイルなし */
  }
}
```

**問題点:**
- 小型のポインターデバイス（小さなラップトップなど）でもホバーが無効化される
- iPadでMagic Keyboardを使っている場合、ホバーが使えるのに無効化される

### 正しいアプローチ: any-hover

```css
/* ✅ 推奨: ホバー可能なデバイスのみ */
@media (any-hover: hover) {
  .button:hover {
    background-color: #0052a3;
    transform: translateY(-2px);
  }
}
```

### hover vs any-hover の違い

```css
/* hover: 主な入力デバイスがホバーに対応 */
@media (hover: hover) {
  /* ... */
}

/* any-hover: いずれかの入力デバイスがホバーに対応 */
@media (any-hover: hover) {
  /* ... */
}
```

**推奨:** `any-hover`の方がより多くのケースをカバーします。

### 実装例

#### ボタンのホバー効果
```css
.button {
  background-color: #0066cc;
  transition: background-color 0.3s, transform 0.3s;
}

/* フォーカス状態（キーボード対応） */
.button:focus-visible {
  background-color: #0052a3;
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* ホバー状態（ポインター対応） */
@media (any-hover: hover) {
  .button:hover {
    background-color: #0052a3;
    transform: translateY(-2px);
  }
}
```

#### カードのホバー演出
```css
.card {
  transition: box-shadow 0.3s, transform 0.3s;
}

@media (any-hover: hover) {
  .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
}
```

### アクセシビリティのポイント

1. **:focus-visible も必ず実装**: キーボードユーザーのため
2. **ホバーだけに頼らない**: 重要な情報はホバーなしでも表示
3. **タッチデバイスでの代替**: ホバーの代わりにタップやクリックで同じ情報を表示

### ブラウザサポート
- ✅ Chrome 41+
- ✅ Edge 16+
- ✅ Safari 9+
- ✅ Firefox 64+

---

## prefers-reduced-motion

### 概要
`prefers-reduced-motion`は、**ユーザーがOSでアニメーション削減を設定している場合**を検出します。画面酔いや視覚疲労を感じるユーザーへの配慮です。

### OSでの設定方法

- **Windows 10/11**: 設定 → 簡単操作 → ディスプレイ → アニメーションを表示する
- **macOS**: システム環境設定 → アクセシビリティ → ディスプレイ → 視差効果を減らす
- **iOS**: 設定 → アクセシビリティ → 動作 → 視差効果を減らす
- **Android**: 設定 → ユーザー補助 → アニメーションを無効化

### 基本構文

```css
@media (prefers-reduced-motion: reduce) {
  /* アニメーションを削減・無効化 */
}
```

### 実装パターン

#### パターン1: 完全に無効化（簡単だが推奨されない）

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

**問題点:** フェードイン/アウトなども無効化され、要素が突然消える

#### パターン2: アニメーション時間を短縮（推奨）

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

**メリット:**
- 「パッと変化する」即座の表示
- 不透明度のアニメーションなども機能する
- 要素の非表示を防げる

### 個別対応の例

```css
/* 通常時: 滑らかなアニメーション */
.modal {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* アニメーション削減設定時 */
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none; /* アニメーションなし */
  }
}
```

### スクロールアニメーション

```css
/* 通常時: 滑らかなスクロール */
html {
  scroll-behavior: smooth;
}

/* アニメーション削減設定時: 即座にジャンプ */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### 視差効果（Parallax）

```css
.parallax {
  background-attachment: fixed;
}

@media (prefers-reduced-motion: reduce) {
  .parallax {
    background-attachment: scroll; /* 視差効果を無効化 */
  }
}
```

### アクセシビリティのベストプラクティス

1. **全体的なアプローチ**: グローバルに1ms設定を適用
2. **装飾的なアニメーションは削減**: 回転、バウンドなど
3. **機能的なアニメーションは短縮**: フェード、スライドイン
4. **スクロールアニメーションは無効化**: `scroll-behavior: auto`

### ブラウザサポート
- ✅ Chrome 74+
- ✅ Edge 79+
- ✅ Safari 10.1+
- ✅ Firefox 63+

---

## Visually Hidden

### 概要
Visually Hidden（視覚的に隠す）は、**スクリーンリーダーには読み上げられるが、視覚的には非表示**にする技術です。アクセシビリティを向上させる重要なテクニックです。

### 用途

- スキップリンク（「メインコンテンツへ」）
- フォームラベルの補足説明
- アイコンのみのボタンに意味を追加
- ページ内リンクの説明

### 間違ったアプローチ

```css
/* ❌ これらはスクリーンリーダーでも読み上げられない */
.hidden {
  display: none;
}

.hidden {
  visibility: hidden;
}
```

### 正しい実装

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### なぜこの実装なのか

- `position: absolute` - レイアウトから除外
- `width: 1px; height: 1px` - 極小サイズ（0pxだと読み上げられない場合がある）
- `overflow: hidden` - はみ出しを隠す
- `clip: rect(0, 0, 0, 0)` - クリップ領域を0に
- `white-space: nowrap` - テキストの折り返しを防止
- `margin: -1px` - 1pxのスペースも消す

### 実用例

#### スキップリンク
```html
<a href="#main" class="visually-hidden focusable">
  メインコンテンツへスキップ
</a>

<main id="main">
  <!-- コンテンツ -->
</main>
```

```css
.visually-hidden {
  /* 上記のスタイル */
}

/* フォーカス時に表示 */
.visually-hidden.focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

#### アイコンのみのボタン
```html
<button class="close-button">
  <span class="visually-hidden">閉じる</span>
  <svg aria-hidden="true">
    <!-- ×アイコン -->
  </svg>
</button>
```

#### フォームラベルの補足
```html
<label for="email">
  メールアドレス
  <span class="visually-hidden">（例: example@example.com）</span>
</label>
<input type="email" id="email">
```

### ユーティリティクラスの拡張

```css
/* フォーカス可能バージョン */
.visually-hidden-focusable {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.visually-hidden-focusable:active,
.visually-hidden-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Tailwind CSS / Bootstrap での実装

多くのCSSフレームワークには、同様のユーティリティクラスが用意されています：

- **Tailwind CSS**: `sr-only`
- **Bootstrap**: `visually-hidden`

### ブラウザサポート
- ✅ すべてのブラウザとスクリーンリーダーで対応

---

## まとめ

### 学習のポイント

1. **モダンメディアクエリ** - Range Syntaxで簡潔に
2. **any-hover** - 画面サイズではなく入力方式で判定
3. **prefers-reduced-motion** - アニメーション削減設定への対応
4. **Visually Hidden** - スクリーンリーダー対応の基本

### アクセシビリティのチェックリスト

- [ ] ホバー効果は`any-hover`で条件分岐
- [ ] すべてのホバー状態に`:focus-visible`も実装
- [ ] アニメーションは`prefers-reduced-motion`に対応
- [ ] アイコンのみのボタンにVisually Hiddenでラベル追加
- [ ] スキップリンクを実装
- [ ] メディアクエリはRange Syntaxで記述

### 実務での推奨事項

- グローバルCSSに`prefers-reduced-motion`の1ms設定を追加
- すべてのホバー効果を`@media (any-hover: hover)`で囲む
- アイコンボタンには必ずテキストラベル（Visually Hidden）を追加
- キーボード操作をテストする習慣をつける

### 参考リンク

- [MDN - Media Queries](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries)
- [MDN - any-hover](https://developer.mozilla.org/ja/docs/Web/CSS/@media/any-hover)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-reduced-motion)
- [WebAIM - CSS in Action](https://webaim.org/techniques/css/)
- [A11y Project](https://www.a11yproject.com/)
