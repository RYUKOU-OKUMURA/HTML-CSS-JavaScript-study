# CSS モダンレイアウト編

## 目次
1. [Grid Layout](#grid-layout)
2. [Subgrid](#subgrid)
3. [gap プロパティ](#gap-プロパティ)
4. [配置プロパティ](#配置プロパティ)
   - [inset](#inset)
   - [margin-inline: auto](#margin-inline-auto)
   - [place-content: center](#place-content-center)
5. [その他の便利なプロパティ](#その他の便利なプロパティ)

---

## Grid Layout

### 概要
CSS Grid Layoutは、**2次元のレイアウトシステム**で、行と列を同時に制御できる強力な仕様です。Flexboxが1次元（横または縦）のレイアウトに対し、Gridは格子状のレイアウトを簡単に実現できます。

### 基本概念

#### グリッドコンテナーとグリッドアイテム
```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
</div>
```

```css
.grid-container {
  display: grid; /* グリッドコンテナーを定義 */
  grid-template-columns: 1fr 1fr 1fr; /* 3列のグリッド */
  gap: 20px; /* アイテム間の余白 */
}
```

### 主要なプロパティ

#### 1. grid-template-columns / grid-template-rows
列と行のサイズを定義します。

```css
/* 固定幅 */
.grid {
  grid-template-columns: 200px 300px 200px;
}

/* 割合指定（fr単位） */
.grid {
  grid-template-columns: 1fr 2fr 1fr; /* 1:2:1の比率 */
}

/* repeat()関数で繰り返し */
.grid {
  grid-template-columns: repeat(3, 1fr); /* 1fr 1fr 1fr と同じ */
}

/* minmax()で最小・最大値を設定 */
.grid {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}
```

#### 2. auto-fill と auto-fit
レスポンシブなカラム数を自動調整します。

```css
/* 画面幅に応じて自動的にカラム数が変わる */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

**auto-fill vs auto-fit の違い:**
- `auto-fill`: 余白があっても列を維持（空の列が残る）
- `auto-fit`: 余白がある場合、列を伸ばして埋める

#### 3. grid-template-areas
名前付きエリアでレイアウトを定義します。

```css
.grid-container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

#### 4. grid-column / grid-row
アイテムの配置を直接指定します。

```css
.item {
  /* 1列目から3列目まで（2列分） */
  grid-column: 1 / 3;
  /* または */
  grid-column: span 2; /* 2列分を占める */
}
```

### 実用的なレイアウトパターン

#### パターン1: カードグリッド
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;
}
```

#### パターン2: Holy Grail Layout（ヘッダー・サイドバー・メイン・フッター）
```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 20px;
}
```

#### パターン3: レスポンシブ3カラム → 1カラム
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* メディアクエリ不要！画面幅が狭くなると自動的に1カラムになる */
```

### ブラウザサポート
- ✅ Chrome 57+
- ✅ Edge 16+
- ✅ Safari 10.1+
- ✅ Firefox 52+

---

## Subgrid

### 概要
Subgridは、**親グリッドの行や列を子グリッドが継承**できる機能です。複数のカード内の要素の高さを自動的に揃えることができます。

### 従来の問題
JavaScriptなしでは、複数のカード内の見出しや説明文の高さを動的に揃えることができませんでした。

### Subgridによる解決

#### HTML構造
```html
<div class="card-container">
  <div class="card">
    <h2 class="card-title">タイトル</h2>
    <img class="card-image" src="..." alt="">
    <p class="card-description">説明文</p>
    <div class="card-label">ラベル</div>
  </div>
  <!-- 複数のカード -->
</div>
```

#### CSS実装
```css
/* 親グリッド */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

/* 子グリッド（Subgrid） */
.card {
  display: grid;
  grid-template-rows: subgrid; /* ★ ここがポイント */
  grid-row: span 4; /* 親の4行分を占める */
  row-gap: 12px;
}
```

### Subgridの効果

1. **自動的に高さが揃う**: 各カードのタイトル、画像、説明文、ラベルがそれぞれ同じ高さになります
2. **レスポンシブ対応**: ウィンドウサイズが変わっても自動的に調整されます
3. **JavaScriptが不要**: CSSだけで完結します

### gap の上書き
親グリッドの`gap`を子グリッド内で上書きできます。

```css
.card-container {
  gap: 40px; /* カード間の余白 */
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4;
  row-gap: 12px; /* カード内の要素間の余白（上書き） */
}
```

### ブラウザサポート（2023年9月に全ブラウザ対応完了）
- ✅ Chrome 117+
- ✅ Edge 117+
- ✅ Safari 16+
- ✅ Firefox 71+

---

## gap プロパティ

### 概要
`gap`プロパティは、**Grid や Flexbox のアイテム間の余白**を簡単に設定できます。従来のmarginと異なり、アイテム間にのみ余白が適用されます。

### 基本構文
```css
.container {
  display: grid; /* または display: flex */
  gap: 20px; /* 行と列の両方に20px */
}

/* 行と列で異なる値 */
.container {
  gap: 20px 40px; /* 行: 20px, 列: 40px */
}

/* 個別指定 */
.container {
  row-gap: 20px;
  column-gap: 40px;
}
```

### 従来の方法との比較

#### 従来の方法（margin を使用）
```css
.item {
  margin-right: 20px;
  margin-bottom: 20px;
}

/* 最後の要素のmarginを打ち消す必要がある */
.item:last-child {
  margin-right: 0;
}

.item:nth-child(3n) {
  margin-right: 0;
}
```

#### gap を使用（推奨）
```css
.container {
  display: grid;
  gap: 20px; /* これだけ！ */
}
```

### Flexbox での使用
```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Flexboxでも使える */
}
```

### ブラウザサポート
- ✅ Chrome 84+ (Flexbox)、57+ (Grid)
- ✅ Edge 84+ (Flexbox)、16+ (Grid)
- ✅ Safari 14.1+ (Flexbox)、10.1+ (Grid)
- ✅ Firefox 63+ (Flexbox)、52+ (Grid)

---

## 配置プロパティ

### inset

#### 概要
`inset`プロパティは、`top`、`right`、`bottom`、`left`を一度に設定できるショートハンドです。

#### 基本構文
```css
/* 従来の方法 */
.element {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* inset を使用 */
.element {
  position: absolute;
  inset: 0; /* 親要素全体に広がる */
}
```

#### 値の指定パターン
```css
/* 1値: 全方向 */
inset: 10px;

/* 2値: 上下、左右 */
inset: 10px 20px;

/* 3値: 上、左右、下 */
inset: 10px 20px 30px;

/* 4値: 上、右、下、左 */
inset: 10px 20px 30px 40px;
```

#### 実用例: オーバーレイ
```css
.overlay {
  position: fixed;
  inset: 0; /* 画面全体を覆う */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
```

#### 論理プロパティ版
```css
/* インライン方向とブロック方向 */
.element {
  inset-inline: 0; /* 左右（LTRの場合） */
  inset-block: 0; /* 上下 */
}
```

### margin-inline: auto

#### 概要
`margin-inline: auto`は、**インライン方向（横方向）で要素を中央揃え**にする論理プロパティです。

#### 基本構文
```css
/* 従来の方法 */
.element {
  margin-left: auto;
  margin-right: auto;
}

/* margin-inline を使用 */
.element {
  margin-inline: auto;
}
```

#### margin: 0 auto との違い
```css
/* margin: 0 auto は上下もゼロにしてしまう */
.element {
  margin: 0 auto; /* 上下のmarginが消える */
}

/* margin-inline: auto は左右のみ */
.element {
  margin-inline: auto; /* 上下のmarginは保持される */
  margin-block: 20px; /* 上下は別途指定可能 */
}
```

#### 実用例
```css
.container {
  max-width: 1200px;
  margin-inline: auto; /* 中央揃え */
  padding-inline: 20px; /* 左右のパディング */
}
```

### place-content: center

#### 概要
`place-content: center`は、**Grid レイアウトで行列全体を中央配置**するショートハンドです。

#### 基本構文
```css
/* place-content は justify-content と align-content のショートハンド */
.container {
  display: grid;
  place-content: center; /* 縦横中央 */
}

/* これは以下と同じ */
.container {
  display: grid;
  justify-content: center; /* 横方向中央 */
  align-content: center; /* 縦方向中央 */
}
```

#### Flexbox との比較
```css
/* Flexbox（3行必要） */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid（2行で済む） */
.grid-center {
  display: grid;
  place-content: center;
}
```

#### 完全な中央配置の実装
```css
.center-box {
  display: grid;
  place-content: center;
  min-height: 100vh; /* 画面全体の高さ */
}
```

#### place-items との違い
```css
/* place-content: 複数要素をまとめて中央配置 */
.container {
  display: grid;
  place-content: center; /* グリッド全体を中央に */
}

/* place-items: 各セル内で要素を中央配置 */
.container {
  display: grid;
  place-items: center; /* 各グリッドアイテムをセル内で中央に */
}
```

---

## その他の便利なプロパティ

### object-fit

#### 概要
`object-fit`は、`img`や`video`要素のサイズ調整方法を制御します。`background-size`の`img`版です。

#### 使用例
```css
.image {
  width: 300px;
  height: 200px;
  object-fit: cover; /* アスペクト比を保ちながらコンテナを埋める */
}
```

#### 値の種類
- `fill`: デフォルト。縦横比を無視して引き伸ばす
- `contain`: アスペクト比を保ち、全体が収まるようにする
- `cover`: アスペクト比を保ち、コンテナを埋める（はみ出る部分は切れる）
- `none`: リサイズしない
- `scale-down`: `none`と`contain`の小さい方

### aspect-ratio

#### 概要
`aspect-ratio`は、要素のアスペクト比を指定します。従来の`padding-top`トリックが不要になります。

#### 基本構文
```css
/* 従来の方法（padding-topトリック） */
.box {
  width: 100%;
  padding-top: 56.25%; /* 16:9の比率 */
  position: relative;
}

/* aspect-ratio を使用 */
.box {
  width: 100%;
  aspect-ratio: 16 / 9; /* 16:9の比率 */
}
```

#### 実用例
```css
/* 正方形 */
.square {
  aspect-ratio: 1 / 1;
}

/* 16:9の動画コンテナ */
.video-container {
  aspect-ratio: 16 / 9;
}

/* 4:3の画像 */
.image-43 {
  aspect-ratio: 4 / 3;
}
```

### width: fit-content

#### 概要
`width: fit-content`は、要素の幅を**子要素のコンテンツに合わせて自動調整**します。

#### 使用例
```css
/* ボタンの幅をテキストに合わせる */
.button {
  width: fit-content;
  margin-inline: auto; /* 中央揃え */
}

/* タグのリスト */
.tag {
  width: fit-content;
  padding: 5px 15px;
  background-color: #e0e0e0;
  border-radius: 20px;
}
```

---

## まとめ

### 学習のポイント

1. **Grid Layout** - 2次元レイアウトの基本
2. **Subgrid** - 複数要素の高さを自動的に揃える
3. **gap** - アイテム間の余白を簡単に設定
4. **配置プロパティ** - inset、margin-inline、place-contentで簡潔なコード

### 実務での推奨事項

- カードグリッドには`repeat(auto-fit, minmax())`を活用
- Subgridで複雑なカードレイアウトを簡単に実装
- `gap`を使ってmarginの複雑な調整を不要に
- 論理プロパティ（margin-inline等）で多言語対応を考慮

### 参考リンク

- [MDN - CSS Grid Layout](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)
- [MDN - Subgrid](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Subgrid)
- [MDN - gap](https://developer.mozilla.org/ja/docs/Web/CSS/gap)
- [Can I use - Grid](https://caniuse.com/css-grid)
- [Can I use - Subgrid](https://caniuse.com/css-subgrid)
