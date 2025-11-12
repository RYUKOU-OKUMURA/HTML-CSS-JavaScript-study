# Details/Summary要素（アコーディオン）

`<details>`と`<summary>`要素を使うと、JavaScriptなしでアコーディオンUIを実装できます。

## 基本的な使い方

### シンプルな例

```html
<details>
  <summary>クリックして展開</summary>
  <p>ここに隠されたコンテンツが表示されます。</p>
</details>
```

### 実際の表示

<details>
  <summary>概要</summary>
  折りたたみ可能なコンテンツ
</details>

## 主な特徴

### ✅ JavaScriptが不要
- ブラウザのネイティブ機能で動作
- シンプルなマークアップだけで実装可能

### ✅ アクセシビリティが自動的に確保される
- **キーボード操作対応**: TabキーとEnter/Spaceキーで操作可能
- **スクリーンリーダー対応**: 展開/折りたたみ状態が自動的にアナウンスされる
- **検索対応**: ブラウザの検索機能で該当する要素が自動的に展開される

### ✅ セマンティックな構造
- コンテンツの構造が明確
- 検索エンジンにも理解しやすい

## 詳細な実装

### 複数のコンテンツを含める

```html
<details>
  <summary>よくある質問</summary>
  <div>
    <h3>配送について</h3>
    <p>通常、ご注文から3-5営業日でお届けします。</p>

    <h3>返品について</h3>
    <p>商品到着後14日以内であれば返品可能です。</p>
  </div>
</details>
```

### デフォルトで開いた状態にする

```html
<details open>
  <summary>デフォルトで開いている</summary>
  <p>このコンテンツは最初から表示されています。</p>
</details>
```

**注意:** `open`属性は論理属性なので、値は不要です。

### 排他的なアコーディオン（1つだけ開く）

HTML標準の`name`属性を使うと、同じ名前のdetails要素は1つだけ開くようになります。

```html
<details name="faq">
  <summary>質問1</summary>
  <p>回答1</p>
</details>

<details name="faq">
  <summary>質問2</summary>
  <p>回答2</p>
</details>

<details name="faq">
  <summary>質問3</summary>
  <p>回答3</p>
</details>
```

**ブラウザ対応:**
- Chrome 120+
- Safari 17.2+
- Firefox（未対応）

## CSSでスタイリング

### 基本的なスタイリング

```css
details {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

summary {
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

summary:hover {
  background-color: #e0e0e0;
}

/* 開いた状態のスタイル */
details[open] summary {
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #ccc;
}
```

### 三角アイコンをカスタマイズ

```css
/* デフォルトの三角を非表示 */
summary {
  list-style: none; /* Firefox, Chrome */
}

summary::-webkit-details-marker {
  display: none; /* Safari */
}

/* カスタムアイコンを追加 */
summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}
```

### CSSのみでアニメーション（モダンブラウザ）

```css
details {
  overflow: hidden;
}

details summary {
  display: block;
  list-style: none;
}

/* 開閉アニメーション */
details > *:not(summary) {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**注意:** より滑らかなアニメーションにはJavaScriptが必要です（後述）。

## JavaScriptでアニメーションを追加

CSSだけでは高さのアニメーションが難しいため、JavaScriptを使用します。

```javascript
document.querySelectorAll('details').forEach((details) => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('summary + *');

  // アニメーション中フラグ
  let isAnimating = false;

  summary.addEventListener('click', (e) => {
    // アニメーション中は無視
    if (isAnimating) {
      e.preventDefault();
      return;
    }

    // デフォルト動作を防止
    e.preventDefault();
    isAnimating = true;

    if (details.open) {
      // 閉じるアニメーション
      const animation = content.animate(
        [
          { height: content.offsetHeight + 'px', opacity: 1 },
          { height: 0, opacity: 0 }
        ],
        {
          duration: 300,
          easing: 'ease-out'
        }
      );

      animation.onfinish = () => {
        details.removeAttribute('open');
        isAnimating = false;
      };
    } else {
      // 開くアニメーション
      details.setAttribute('open', '');
      const height = content.offsetHeight;

      const animation = content.animate(
        [
          { height: 0, opacity: 0 },
          { height: height + 'px', opacity: 1 }
        ],
        {
          duration: 300,
          easing: 'ease-out'
        }
      );

      animation.onfinish = () => {
        isAnimating = false;
      };
    }
  });
});
```

## 実践例

### FAQ（よくある質問）

```html
<section>
  <h2>よくある質問</h2>

  <details name="faq">
    <summary>送料はいくらですか？</summary>
    <p>全国一律500円です。5,000円以上のご購入で送料無料になります。</p>
  </details>

  <details name="faq">
    <summary>支払い方法は何がありますか？</summary>
    <p>クレジットカード、銀行振込、代金引換、コンビニ払いがご利用いただけます。</p>
  </details>

  <details name="faq">
    <summary>返品・交換は可能ですか？</summary>
    <p>商品到着後14日以内であれば、未使用品に限り返品・交換が可能です。</p>
  </details>
</section>
```

### 仕様書・技術文書

```html
<article>
  <h1>API仕様書</h1>

  <details>
    <summary>認証エンドポイント</summary>
    <div>
      <h3>POST /api/auth/login</h3>
      <p>ユーザー認証を行います。</p>

      <h4>リクエスト</h4>
      <pre><code>{
  "email": "user@example.com",
  "password": "secret"
}</code></pre>

      <h4>レスポンス</h4>
      <pre><code>{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}</code></pre>
    </div>
  </details>

  <details>
    <summary>ユーザー情報エンドポイント</summary>
    <div>
      <h3>GET /api/users/:id</h3>
      <p>ユーザー情報を取得します。</p>
    </div>
  </details>
</article>
```

## アクセシビリティの注意点

### ✅ 推奨される実装

```html
<details>
  <summary>詳細を表示</summary>
  <div>
    <h3>セクションタイトル</h3>
    <p>コンテンツ</p>
  </div>
</details>
```

### ❌ 避けるべき実装

```html
<!-- summary内にインタラクティブ要素を入れない -->
<details>
  <summary>
    詳細 <button>削除</button> <!-- NG -->
  </summary>
  <p>コンテンツ</p>
</details>

<!-- summaryを省略しない -->
<details>
  <!-- summaryがない --> <!-- NG -->
  <p>コンテンツ</p>
</details>
```

## イベント処理

`<details>`要素は`toggle`イベントを発火します。

```javascript
const details = document.querySelector('details');

details.addEventListener('toggle', (e) => {
  if (details.open) {
    console.log('開きました');
    // データの読み込みなど
  } else {
    console.log('閉じました');
  }
});
```

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|---------------|
| Chrome | 12+ (2011〜) |
| Firefox | 49+ (2016〜) |
| Safari | 6+ (2012〜) |
| Edge | 79+ (2020〜) |
| iOS Safari | 6+ (2012〜) |

**`name`属性（排他的アコーディオン）:**
- Chrome 120+
- Safari 17.2+

## まとめ

### メリット
- ✅ JavaScriptなしで動作
- ✅ アクセシビリティが自動的に確保される
- ✅ シンプルな実装
- ✅ SEOフレンドリー

### デメリット
- ❌ 滑らかなアニメーションにはJavaScriptが必要
- ❌ スタイリングの自由度がやや低い
- ❌ 複雑なUIには不向き

### 使用すべき場面
- FAQ
- 仕様書・ドキュメント
- シンプルなアコーディオンUI
- プログレッシブエンハンスメント

## 関連リンク

- [MDN - &lt;details&gt;要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/details)
- [Web Animations API](https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API)
- [実装例](../../../examples/html/accordion/)
