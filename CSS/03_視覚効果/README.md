# CSS 視覚効果編

## 目次
1. [filter プロパティ](#filter-プロパティ)
2. [mix-blend-mode](#mix-blend-mode)
3. [clip-path](#clip-path)
4. [transform の独立プロパティ](#transform-の独立プロパティ)
5. [transition](#transition)

---

## filter プロパティ

### 概要
`filter`プロパティは、要素に**視覚効果（フィルター）を適用**します。画像編集ソフトを使わずに、CSSだけでぼかし、明るさ調整、グレースケール化などが可能です。

### 主要なフィルター関数

#### 1. blur() - ぼかし効果
```css
.element {
  filter: blur(5px); /* 5pxのぼかし */
}
```

#### 2. brightness() - 明度調整
```css
.element {
  filter: brightness(1.5); /* 1.5倍明るく */
}

.element-dark {
  filter: brightness(0.5); /* 半分の明るさ */
}
```

#### 3. contrast() - コントラスト調整
```css
.element {
  filter: contrast(200%); /* コントラスト2倍 */
}
```

#### 4. grayscale() - グレースケール化
```css
.element {
  filter: grayscale(100%); /* 完全にモノクロ */
}

.element-hover:hover {
  filter: grayscale(0%); /* ホバー時にカラー復元 */
}
```

#### 5. saturate() - 彩度調整
```css
.element {
  filter: saturate(200%); /* 彩度2倍（鮮やか） */
}
```

#### 6. hue-rotate() - 色相回転
```css
.element {
  filter: hue-rotate(90deg); /* 色相を90度回転 */
}
```

#### 7. invert() - 色反転
```css
.element {
  filter: invert(100%); /* 完全に色反転 */
}
```

#### 8. opacity() - 透明度
```css
.element {
  filter: opacity(50%); /* 50%の透明度 */
}
```

#### 9. sepia() - セピア調
```css
.element {
  filter: sepia(100%); /* 完全にセピア調 */
}
```

#### 10. drop-shadow() - ドロップシャドウ
```css
.element {
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3));
}
```

**box-shadow との違い:**
- `drop-shadow()`: 要素の形状に沿った影（透明部分を除く）
- `box-shadow`: ボックス全体に影

### 複数のフィルターを組み合わせ

```css
.element {
  filter: brightness(1.2) contrast(110%) saturate(120%);
}
```

### transition と組み合わせた演出

```css
.image {
  filter: grayscale(100%) brightness(0.8);
  transition: filter 0.3s ease;
}

.image:hover {
  filter: grayscale(0%) brightness(1.2);
}
```

### 実用例

#### ホバー時に明るくする
```css
.thumbnail {
  filter: brightness(0.9);
  transition: filter 0.3s;
}

.thumbnail:hover {
  filter: brightness(1.2);
}
```

#### ホバー時のインタラクティブな演出（複数効果を組み合わせ）
```css
/* 画像のコンテナー */
.image-container {
  position: relative;
  overflow: hidden;
}

/* 画像本体 */
.image-container img {
  width: 100%;
  transition: filter 0.3s ease, transform 0.3s ease;
}

/* ホバー時: ぼかし + 明るく + 拡大 */
.image-container:hover img {
  filter: blur(8px) brightness(1.5);
  transform: scale(1.1);
}

/* オーバーレイテキスト */
.image-container .overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* ホバー時にテキストを表示 */
.image-container:hover .overlay-text {
  opacity: 1;
}
```

**ユースケース:**
- マウスオーバー時に追加情報を表示（SNSシェアカウント、記事メタ情報など）
- オウンドメディアで記事の反応度を視覚的に表現
- ポートフォリオサイトでの作品詳細表示

#### ぼかし背景（モーダル）
```css
.modal-backdrop {
  filter: blur(8px) brightness(1.5);
}
```

### パフォーマンス
モダンブラウザでは**ハードウェアアクセラレーション**により、60fpsでのアニメーションが可能です。

### ブラウザサポート
- ✅ Chrome 53+
- ✅ Edge 13+
- ✅ Safari 9.1+
- ✅ Firefox 35+

---

## mix-blend-mode

### 概要
`mix-blend-mode`は、**要素を重ねた時の合成方法**を指定します。Photoshopなどのデザインツールにあるブレンドモードと同じ効果をCSSで実現できます。

### 基本構文
```css
.overlay {
  mix-blend-mode: multiply; /* 乗算 */
}
```

### 主要なブレンドモード

#### 暗くする系

**multiply（乗算）**
```css
.element {
  mix-blend-mode: multiply;
}
```
- 暗い表現に使用
- 白は透明になる
- 黒は黒のまま

**darken（比較（暗）**
```css
.element {
  mix-blend-mode: darken;
}
```
- 上下で暗いピクセルを選択

**color-burn（焼き込みカラー）**
```css
.element {
  mix-blend-mode: color-burn;
}
```
- 乗算より強い暗化効果

#### 明るくする系

**screen（スクリーン）**
```css
.element {
  mix-blend-mode: screen;
}
```
- 明るい表現に使用
- 黒は透明になる
- 白は白のまま

**lighten（比較（明）**
```css
.element {
  mix-blend-mode: lighten;
}
```
- 上下で明るいピクセルを選択

**color-dodge（覆い焼きカラー）**
```css
.element {
  mix-blend-mode: color-dodge;
}
```
- より明るく、インパクト大

#### 両方の効果

**overlay（オーバーレイ）**
```css
.element {
  mix-blend-mode: overlay;
}
```
- 乗算とスクリーンの組み合わせ
- コントラスト向上

**soft-light（ソフトライト）**
```css
.element {
  mix-blend-mode: soft-light;
}
```
- オーバーレイより穏やか

**hard-light（ハードライト）**
```css
.element {
  mix-blend-mode: hard-light;
}
```
- ソフトライトより強い

#### 色ベース

**hue（色相）**
```css
.element {
  mix-blend-mode: hue;
}
```

**saturation（彩度）**
```css
.element {
  mix-blend-mode: saturation;
}
```

**color（カラー）**
```css
.element {
  mix-blend-mode: color;
}
```

**luminosity（輝度）**
```css
.element {
  mix-blend-mode: luminosity;
}
```

#### その他

**difference（差の絶対値）**
```css
.element {
  mix-blend-mode: difference;
}
```
- 色が反転する効果

**exclusion（除外）**
```css
.element {
  mix-blend-mode: exclusion;
}
```
- differenceより穏やか

### 実用例

#### テキストと背景画像の合成
```css
.hero {
  position: relative;
  background-image: url('background.jpg');
}

.hero-text {
  position: absolute;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  mix-blend-mode: overlay;
}
```

#### カラーオーバーレイ
```css
.image-wrapper {
  position: relative;
}

.color-overlay {
  position: absolute;
  inset: 0;
  background-color: #ff6b6b;
  mix-blend-mode: multiply;
  opacity: 0.6;
}
```

#### テキストと背景画像の合成（より詳細な例）
```html
<div class="hero-section">
  <img src="cherry-blossoms.jpg" alt="桜">
  <h1 class="hero-title">Cherry Blossoms</h1>
</div>
```

```css
.hero-section {
  position: relative;
  width: 100%;
  height: 400px;
}

.hero-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-title {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  mix-blend-mode: overlay;
  color: white;
  font-size: 150px;
  font-weight: bold;
  margin: 0;
}
```

**効果:** テキストと画像のコントラストが上がり、見栄えの印象が向上します。

#### スタッキングコンテキストの制御

背景の影響を受ける場合は、`isolation`プロパティを使用します：

```css
.isolated-container {
  isolation: isolate; /* 新しいスタッキングコンテキストを作成 */
}

.isolated-container .blend-element {
  mix-blend-mode: multiply;
}
```

**使用場面:**
- 親要素の背景に影響されたくない場合
- ブレンド効果を特定の範囲内に限定したい場合

### ブラウザサポート
- ✅ Chrome 41+
- ✅ Edge 79+
- ✅ Safari 8+
- ✅ Firefox 32+

---

## clip-path

### 概要
`clip-path`は、要素を**指定した図形で切り抜く**プロパティです。従来のborderハックなしで、三角形や円形、多角形を作成できます。

### 基本的な図形

#### 円形（circle）
```css
.element {
  clip-path: circle(50%); /* 50%の半径の円 */
}

/* 位置指定 */
.element {
  clip-path: circle(50% at 30% 30%); /* 左上寄りの円 */
}
```

#### 楕円形（ellipse）
```css
.element {
  clip-path: ellipse(40% 30%); /* 横40%、縦30%の楕円 */
}
```

#### inset（内接矩形）
```css
/* 上右下左の順 */
.element {
  clip-path: inset(10px 20px 30px 40px);
}

/* 角丸を追加 */
.element {
  clip-path: inset(10px round 10px);
}
```

#### polygon（多角形）
```css
/* 三角形 */
.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* 五角形 */
.pentagon {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* 台形 */
.trapezoid {
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}
```

### 実用例

#### 斜めのセクション区切り
```css
.section {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
```

#### 円形アバター
```css
.avatar {
  clip-path: circle(50%);
}
```

#### ホバー時のアニメーション
```css
.card {
  clip-path: inset(0 0 0 0);
  transition: clip-path 0.3s ease;
}

.card:hover {
  clip-path: inset(10px 10px 10px 10px round 20px);
}
```

### ツール

複雑な図形を作成するには、オンラインツールが便利です：
- [Clippy](https://bennettfeely.com/clippy/) - 視覚的にclip-pathを作成できるツール

### ブラウザサポート
- ✅ Chrome 55+
- ✅ Edge 79+
- ✅ Safari 9.1+
- ✅ Firefox 54+

---

## transform の独立プロパティ

### 概要
従来の`transform`プロパティは、複数の変形を1つのプロパティで指定していました。独立プロパティ（`translate`、`scale`、`rotate`）により、**それぞれ独立して制御**できるようになりました。

### 従来の方法との比較

#### 従来の方法
```css
/* 1つのtransformプロパティにまとめる */
.element {
  transform: translate(100px, 50px) rotate(45deg) scale(1.5);
}

/* 問題: 1つだけ変更したい場合も全部書き直す必要がある */
.element:hover {
  transform: translate(100px, 50px) rotate(45deg) scale(2); /* scaleだけ変更 */
}
```

#### 独立プロパティ
```css
.element {
  translate: 100px 50px;
  rotate: 45deg;
  scale: 1.5;
}

/* 利点: scaleだけ変更できる */
.element:hover {
  scale: 2; /* これだけでOK */
}
```

### 各プロパティの詳細

#### translate（移動）
```css
/* X軸のみ */
translate: 100px;

/* X軸とY軸 */
translate: 100px 50px;

/* X、Y、Z軸（3D） */
translate: 100px 50px 20px;

/* パーセンテージ */
translate: 50% 20%;
```

#### rotate（回転）
```css
/* 2D回転 */
rotate: 45deg;

/* 3D回転（軸を指定） */
rotate: x 45deg; /* X軸周りに回転 */
rotate: y 45deg; /* Y軸周りに回転 */
rotate: z 45deg; /* Z軸周りに回転（2D回転と同じ） */

/* ベクトル指定 */
rotate: 1 1 0 45deg;
```

#### scale（拡大縮小）
```css
/* 均等に拡大 */
scale: 1.5;

/* X軸とY軸で異なる値 */
scale: 1.5 2;

/* X、Y、Z軸（3D） */
scale: 1.5 2 1;
```

### 実用例

#### ホバー時に拡大 + 移動
```css
.card {
  translate: 0 0;
  scale: 1;
  transition: translate 0.3s, scale 0.3s;
}

.card:hover {
  translate: 0 -10px;
  scale: 1.05;
}
```

#### 異なるタイミングでアニメーション
```css
.element {
  translate: 0 0;
  rotate: 0deg;
  scale: 1;
}

.element.animate {
  translate: 100px 0;
  transition: translate 0.5s ease;
}

.element.animate-later {
  rotate: 360deg;
  scale: 1.5;
  transition: rotate 1s 0.5s ease, scale 0.8s 0.7s ease;
  /* rotateは0.5秒後、scaleは0.7秒後に開始 */
}
```

### メリット

1. **コードの簡潔性**: 1つの変形だけ変更する場合、他を書き直さなくて良い
2. **独立したアニメーション**: 各変形に異なる duration や easing を設定可能
3. **可読性**: どの変形を適用しているか明確

### ブラウザサポート
- ✅ Chrome 104+
- ✅ Edge 104+
- ✅ Safari 14.1+
- ✅ Firefox 72+

---

## transition

### 概要
`transition`は、CSSプロパティの変化を**アニメーション**させます。

### 基本構文
```css
.element {
  transition: property duration timing-function delay;
}
```

### 推奨される書き方

**❌ 非推奨（全プロパティが対象）**
```css
.element {
  transition: all 0.3s;
}
```

**✅ 推奨（明示的にプロパティを指定）**
```css
.element {
  transition: opacity 0.3s, transform 0.3s;
}
```

理由: `all`を使うと意図しないプロパティもアニメーション対象になり、パフォーマンスが低下する可能性があります。

### タイミング関数（easing）

```css
/* 等速 */
transition: opacity 0.3s linear;

/* 加速（最初遅く、最後速い） */
transition: opacity 0.3s ease-in;

/* 減速（最初速く、最後遅い） */
transition: opacity 0.3s ease-out;

/* 加速→減速 */
transition: opacity 0.3s ease-in-out;

/* カスタム（ベジェ曲線） */
transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
```

### 実用例

#### ボタンのホバー効果
```css
.button {
  background-color: #0066cc;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.button:hover {
  background-color: #0052a3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

#### フェードイン・フェードアウト
```css
.modal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.modal.show {
  opacity: 1;
  visibility: visible;
}
```

### パフォーマンスの良いプロパティ

以下のプロパティはGPUアクセラレーションが効き、60fpsでアニメーション可能：
- `opacity`
- `transform` (translate, scale, rotate)
- `filter`

**避けるべき:**
- `width`、`height`（レイアウト再計算が発生）
- `top`、`left`（代わりに`translate`を使用）
- `margin`、`padding`（レイアウト再計算が発生）

---

## まとめ

### 学習のポイント

1. **filter** - 画像加工が不要、CSSだけで視覚効果を実現
2. **mix-blend-mode** - デザインツールのようなブレンド効果
3. **clip-path** - borderハック不要で図形を作成
4. **独立プロパティ** - translate、scale、rotateを個別に制御
5. **transition** - 必ずプロパティを明示的に指定

### 実務での推奨事項

- `filter`と`transition`を組み合わせて滑らかなホバー効果
- `mix-blend-mode`でテキストと背景の印象的な合成
- `clip-path`でユニークなデザインを実現
- 独立プロパティで保守しやすいアニメーション
- パフォーマンスを考慮したプロパティ選択

### 参考リンク

- [MDN - filter](https://developer.mozilla.org/ja/docs/Web/CSS/filter)
- [MDN - mix-blend-mode](https://developer.mozilla.org/ja/docs/Web/CSS/mix-blend-mode)
- [MDN - clip-path](https://developer.mozilla.org/ja/docs/Web/CSS/clip-path)
- [MDN - translate](https://developer.mozilla.org/ja/docs/Web/CSS/translate)
- [Clippy - clip-path maker](https://bennettfeely.com/clippy/)
