# パフォーマンス最適化編

JavaScriptのパフォーマンスを最適化することは、優れたユーザー体験を提供するために重要です。この章では、実践的な最適化テクニックを学びます。

## 📚 この章で学ぶこと

### 1. [デバウンス（Debounce）](./01_debounce.md)

イベントの頻繁な実行を制御する技術を学びます。

**学習内容：**
- デバウンスとは何か
- デバウンスの実装方法
- 検索ボックスの最適化
- フォーム自動保存
- ボタンの二重クリック防止

**重要度：⭐⭐⭐⭐⭐**
実務で非常によく使われる必須のテクニックです。

---

## 🎯 学習目標

この章を完了すると、以下ができるようになります：

- ✅ デバウンスの仕組みを理解できる
- ✅ デバウンス関数を実装できる
- ✅ 検索ボックスを最適化できる
- ✅ フォーム自動保存を実装できる
- ✅ ボタンの二重クリックを防止できる

## 💡 パフォーマンス最適化が重要な理由

### 1. ユーザー体験の向上

高速で反応の良いアプリケーションは、ユーザーに快適な体験を提供します。

### 2. サーバー負荷の軽減

不要なリクエストを減らすことで、サーバーの負荷を軽減できます。

### 3. ネットワークトラフィックの削減

無駄な通信を減らすことで、データ使用量を節約できます。

### 4. バッテリー消費の削減

頻繁な処理を減らすことで、モバイルデバイスのバッテリー消費を抑えられます。

---

## 📊 最適化の効果を測定する

### パフォーマンス測定ツール

```javascript
// シンプルな測定
console.time('処理時間');
// 処理
console.timeEnd('処理時間');

// より詳細な測定
const start = performance.now();
// 処理
const end = performance.now();
console.log(`実行時間: ${end - start}ms`);
```

### ブラウザ開発者ツール

- **Performance タブ**: 処理のタイムライン表示
- **Network タブ**: ネットワークリクエストの監視
- **Console タブ**: ログの確認

---

## 🔧 その他の最適化テクニック

この章では主にデバウンスを扱いますが、他にも重要な最適化テクニックがあります。

### スロットリング（Throttling）

デバウンスと似ていますが、一定間隔で必ず実行する点が異なります。

```javascript
// スロットリングの例（スクロールイベントなどに使用）
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 使用例: スクロールイベント
window.addEventListener('scroll', throttle(() => {
  console.log('スクロール位置:', window.scrollY);
}, 200));
```

### メモ化（Memoization）

計算結果をキャッシュして、同じ計算を繰り返さないようにします。

```javascript
function memoize(func) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用例: 重い計算
const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

### 遅延読み込み（Lazy Loading）

必要になるまでリソースの読み込みを遅らせます。

```javascript
// 画像の遅延読み込み
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

---

## 📝 学習の進め方

### ステップ1: デバウンスを理解する

まず、デバウンスの概念と仕組みを理解します。

### ステップ2: 実装してみる

自分でデバウンス関数を実装してみます。

### ステップ3: 実際のプロジェクトで使う

検索ボックスやフォームなど、実際の機能に適用します。

### ステップ4: 効果を測定する

最適化前後でパフォーマンスを測定し、改善を確認します。

---

## 🎓 パフォーマンス最適化のベストプラクティス

### 1. 測定してから最適化する

```javascript
// ❌ 憶測で最適化しない
// 「この処理は遅いはずだから最適化しよう」

// ✅ 測定してから最適化する
console.time('処理');
// 処理
console.timeEnd('処理');
// 「この処理は実際に遅いので最適化しよう」
```

### 2. 過度な最適化を避ける

- すべてをデバウンスする必要はない
- パフォーマンスと可読性のバランスを取る
- 必要な場所にのみ適用する

### 3. ユーザー体験を優先

- 最適化によってユーザー体験が悪化しないか確認
- フィードバックの遅延は避ける
- ローディング表示を適切に使う

---

## 📚 参考リソース

### 公式ドキュメント
- [MDN - Performance API](https://developer.mozilla.org/ja/docs/Web/API/Performance)
- [MDN - Intersection Observer](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)

### 便利なライブラリ
- [Lodash](https://lodash.com/) - debounce, throttleなどのユーティリティ
- [Underscore.js](https://underscorejs.org/) - 同様のユーティリティ

### おすすめ記事
- [JavaScript Debounce Example - FreeCodeCamp](https://www.freecodecamp.org/news/javascript-debounce-example/)

---

**準備ができたら、次のページに進みましょう！**

👉 [デバウンス（Debounce）](./01_debounce.md)
