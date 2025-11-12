# Decoding属性（デコード制御）

`decoding`属性は、ブラウザに対して画像のデコード方法についてのヒントを提供します。

## 基本的な使い方

### 構文

```html
<img src="image.jpg" alt="説明" decoding="async">
```

## decoding属性の値

### `async` - 非同期デコード

```html
<img src="image.jpg" alt="説明" decoding="async">
```

- **動作**: 画像を非同期的にデコード
- **効果**: メインスレッドをブロックしない
- **使用場面**: ほとんどの画像

### `sync` - 同期デコード

```html
<img src="critical-image.jpg" alt="重要な画像" decoding="sync">
```

- **動作**: 画像を同期的にデコード
- **効果**: デコード完了まで待機
- **使用場面**: 即座に表示すべき重要な画像（まれ）

### `auto` - ブラウザに任せる（デフォルト）

```html
<img src="image.jpg" alt="説明" decoding="auto">
<!-- または属性を省略 -->
<img src="image.jpg" alt="説明">
```

- **動作**: ブラウザが最適な方法を選択
- **効果**: ブラウザの判断に委ねる
- **使用場面**: 特別な理由がない限りこれで十分

## デコードとダウンロードの違い

### loading属性（ダウンロード制御）

```html
<img src="image.jpg" loading="lazy">
```

- **制御対象**: 画像ファイルのダウンロード
- **タイミング**: いつダウンロードを開始するか

### decoding属性（デコード制御）

```html
<img src="image.jpg" decoding="async">
```

- **制御対象**: ダウンロード済み画像のデコード処理
- **タイミング**: いつデコードを実行するか

### プロセスの流れ

```
1. ダウンロード（loading属性で制御）
   ↓
2. デコード（decoding属性で制御）
   ↓
3. 表示
```

## よくある誤解

### 誤解1: デコード完了までコンテンツが表示されない

**間違い:**
```
「async だと画像がデコードされるまで下のコンテンツが表示されない」
```

**正しい理解:**
```
「デコード完了前でも下のコンテンツは表示される」
```

画像のデコード処理とコンテンツのレンダリングは独立しています。

### 誤解2: すべてのダウンロード画像がデコードされる

**間違い:**
```
「ダウンロードされた画像はすぐにデコードされる」
```

**正しい理解:**
```
「ビューポート近くの画像のみデコード処理される」
```

ブラウザは効率化のため、表示に必要な画像だけをデコードします。

## パフォーマンスへの影響

### キャッシュなしの場合

```
sync と async で顕著な差はなし
```

ネットワークからのダウンロード時間が支配的なため、デコード方法の違いは目立ちません。

### キャッシュありの場合

#### decoding="async"
```
ダウンロード → 表示開始 → デコード → 画像表示
                  ↑
           FP、FCP、LCPが早い
```

- **メリット**: 初期表示が速い
- **デメリット**: 画像が後から表示される（チラツキ）

#### decoding="sync"
```
ダウンロード → デコード → 表示開始 → 画像表示
                            ↑
                       すべて同時
```

- **メリット**: 画像とコンテンツが同時表示
- **デメリット**: 初期表示がやや遅い

## 推奨される使い方

### 基本的な推奨

```html
<!-- 特に指定しない（auto） -->
<img src="image.jpg" alt="説明">
```

**理由:**
- ブラウザが最適な方法を選択
- `async`使用時のチラツキを回避
- ほとんどの場合、これで十分

### async を使うべき場面

```html
<img src="large-image.jpg" alt="大きな画像" decoding="async">
```

**条件:**
- 非常に大きな画像
- デコード時間が長い画像
- ページのレンダリングをブロックしたくない

### sync を使うべき場面（まれ）

```html
<img src="logo.svg" alt="ロゴ" decoding="sync">
```

**条件:**
- 即座に表示すべき重要な画像
- デコード時間が非常に短い画像
- チラツキを絶対に避けたい

## 実装例

### 通常の画像

```html
<img
  src="/images/content.jpg"
  alt="コンテンツ画像"
  width="800"
  height="600"
  loading="lazy">
<!-- decoding属性は省略 -->
```

### 大きな画像

```html
<img
  src="/images/large-photo.jpg"
  alt="高解像度写真"
  width="2000"
  height="1500"
  loading="lazy"
  decoding="async">
```

### ヒーローイメージ

```html
<img
  src="/images/hero.jpg"
  alt="メインビジュアル"
  width="1920"
  height="1080"
  loading="eager">
<!-- decoding属性は省略（autoがベスト） -->
```

### Picture要素との組み合わせ

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img
    src="image.jpg"
    alt="説明"
    width="800"
    height="600"
    loading="lazy"
    decoding="async">
</picture>
```

## Core Web Vitalsへの影響

### LCP（Largest Contentful Paint）

**キャッシュなし:**
- `async`と`sync`で大きな差はなし

**キャッシュあり:**
- `sync`: デコード完了後にLCP測定
- `async`: デコード前にLCP測定（やや有利）

### CLS（Cumulative Layout Shift）

`decoding`属性は直接影響しません。CLS対策には`width`/`height`属性を使用します。

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 65+ (2018年) |
| Firefox | 63+ (2018年) |
| Safari | 11.1+ (2018年) |
| Edge | 79+ (2020年) |

**注意:** すべてのモダンブラウザで対応していますが、効果は限定的です。

## 実際の使用頻度

### 推奨される優先度

```
1. loading属性（必須級）
2. width/height属性（必須級）
3. alt属性（必須）
4. decoding属性（オプション）
```

`decoding`属性は、他の最適化を実装した後に検討すべきオプションです。

## まとめ

### 推奨される実装

```html
<!-- ほとんどの場合 -->
<img
  src="image.jpg"
  alt="説明"
  width="800"
  height="600"
  loading="lazy">

<!-- 大きな画像の場合 -->
<img
  src="large-image.jpg"
  alt="大きな画像"
  width="2000"
  height="1500"
  loading="lazy"
  decoding="async">
```

### メリット
- ✅ メインスレッドのブロッキング防止
- ✅ パフォーマンスの微調整

### デメリット
- ❌ 効果が限定的
- ❌ `async`でチラツキの可能性

### 結論

**基本的には`decoding`属性なし（auto）を推奨します。**

- `loading="lazy"`の方が重要
- `width`/`height`属性の方が重要
- `decoding`は最適化の最終段階で検討

## 参考リンク

- [MDN - decoding属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img#attr-decoding)
- [HTML Standard - decoding](https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-decoding)
