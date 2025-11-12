# ブラウザAPI編

モダンブラウザには、効率的で強力なAPIが多数用意されています。この章では、実践的なブラウザAPIの使い方を学びます。

## 📚 この章で学ぶこと

### 1. [Intersection Observer API](./01_intersection-observer.md)

要素の表示状態を監視する効率的なAPIを学びます。

**学習内容：**
- Intersection Observerとは
- スクロール連動エフェクトの実装
- 遅延読み込み（Lazy Loading）
- 無限スクロールの実装
- 従来のscrollイベントとの違い

**重要度：⭐⭐⭐⭐⭐**
モダンなWebサイトで必須の知識です。

---

### 2. [matchMedia API](./02_match-media.md)

JavaScriptでメディアクエリを扱う方法を学びます。

**学習内容：**
- matchMediaの基本
- レスポンシブなJavaScript
- resizeイベントからの移行
- ブレークポイントの監視
- 効率的なレスポンシブ処理

**重要度：⭐⭐⭐⭐**
レスポンシブ対応に不可欠な知識です。

---

## 🎯 学習目標

この章を完了すると、以下ができるようになります：

- ✅ Intersection Observerでスクロール連動エフェクトを実装できる
- ✅ 画像の遅延読み込みを実装できる
- ✅ 無限スクロールを実装できる
- ✅ matchMediaでレスポンシブなJavaScriptを書ける
- ✅ ブレークポイントの変化を監視できる

## 💡 なぜモダンなAPIを使うべきか

### 従来の方法の問題

```javascript
// ❌ 従来の方法（非効率）
window.addEventListener('scroll', () => {
  const element = document.getElementById('target');
  const rect = element.getBoundingClientRect();

  // スクロールのたびに計算が実行される
  if (rect.top < window.innerHeight) {
    element.classList.add('visible');
  }
});

// 問題点:
// - スクロールのたびに実行される
// - getBoundingClientRect() は重い処理
// - パフォーマンスが悪い
```

### モダンなAPIの利点

```javascript
// ✅ Intersection Observer（効率的）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 交差状態が変わった時だけ実行される
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(document.getElementById('target'));

// 利点:
// - 交差状態が変わった時だけ実行
// - ブラウザが最適化
// - パフォーマンスが良い
```

---

## 🔧 この章で扱うブラウザAPI

### Intersection Observer API

**できること：**
- 要素がビューポートに入ったか検知
- 要素の表示割合を取得
- スクロール連動アニメーション
- 画像の遅延読み込み
- 無限スクロール

**ブラウザ対応：**
- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

---

### matchMedia API

**できること：**
- メディアクエリの判定
- ブレークポイントの監視
- デバイスの向きの検知
- ダークモードの検知

**ブラウザ対応：**
- Chrome 9+
- Firefox 6+
- Safari 5.1+
- Edge 12+
- IE 10+（addListenerは非対応）

---

## 📊 パフォーマンス比較

### スクロールイベント vs Intersection Observer

```javascript
// パフォーマンステスト
let scrollEventCount = 0;
let intersectionEventCount = 0;

// ❌ scrollイベント
window.addEventListener('scroll', () => {
  scrollEventCount++;
  console.log('scrollイベント実行回数:', scrollEventCount);
});

// ✅ Intersection Observer
const observer = new IntersectionObserver(() => {
  intersectionEventCount++;
  console.log('Intersection Observer実行回数:', intersectionEventCount);
});

// 結果（1回のスクロールで）:
// scrollイベント: 100回以上
// Intersection Observer: 2回（入る時と出る時）
```

---

### resizeイベント vs matchMedia

```javascript
let resizeEventCount = 0;
let matchMediaEventCount = 0;

// ❌ resizeイベント
window.addEventListener('resize', () => {
  resizeEventCount++;
  // ウィンドウサイズ変更中、何度も実行される
});

// ✅ matchMedia
const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addEventListener('change', () => {
  matchMediaEventCount++;
  // ブレークポイントを跨いだ時だけ実行される
});

// 結果（ウィンドウサイズを変更）:
// resizeイベント: 数十回
// matchMedia: 1回（ブレークポイント通過時のみ）
```

---

## 🎓 学習のポイント

### 1. 従来の方法と比較する

新しいAPIを学ぶ際は、従来の方法との違いを理解することが重要です。

### 2. ブラウザ対応を確認する

モダンなAPIはすべてのブラウザで対応しているわけではありません。[Can I use](https://caniuse.com/)で確認しましょう。

### 3. 実際に動かして確認する

概念を理解したら、必ず実際のコードで動作を確認しましょう。

### 4. パフォーマンスを測定する

開発者ツールのPerformanceタブでパフォーマンスを測定し、改善効果を確認しましょう。

---

## 📝 実践プロジェクトの例

この章で学ぶ知識を使って、以下のようなプロジェクトを作成できます：

### プロジェクト1: スクロールアニメーション付きLP

```javascript
// Intersection Observerでスクロール連動アニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
});

document.querySelectorAll('.animate').forEach(el => {
  observer.observe(el);
});
```

---

### プロジェクト2: 画像ギャラリー（遅延読み込み）

```javascript
// 画像の遅延読み込み
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

---

### プロジェクト3: レスポンシブナビゲーション

```javascript
// matchMediaでレスポンシブなナビゲーション
const mobileQuery = window.matchMedia('(max-width: 768px)');

function handleNavigation(e) {
  const nav = document.getElementById('nav');

  if (e.matches) {
    // モバイル表示
    nav.classList.add('mobile');
  } else {
    // デスクトップ表示
    nav.classList.remove('mobile');
  }
}

// 初期化
handleNavigation(mobileQuery);

// 変更を監視
mobileQuery.addEventListener('change', handleNavigation);
```

---

## 📚 参考リソース

### 公式ドキュメント
- [MDN - Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)
- [MDN - Window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)

### おすすめ記事
- [Intersection Observerの活用 - ICS MEDIA](https://ics.media/entry/190902/)
- [matchMediaの実装 - Zenn](https://zenn.dev/no4_dev/articles/878f4afbff6668d4e28a-2)

### ツール
- [Can I use](https://caniuse.com/) - ブラウザ対応確認

---

**準備ができたら、次のページに進みましょう！**

👉 [Intersection Observer API](./01_intersection-observer.md)
