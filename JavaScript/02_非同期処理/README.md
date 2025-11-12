# 非同期処理編

JavaScriptにおける非同期処理は、Web開発で最も重要な概念の一つです。この章では、async/awaitとAbortControllerを使った実践的な非同期処理を学びます。

## 📚 この章で学ぶこと

### 1. [async/await](./01_async-await.md)

Promiseをより読みやすく書くための構文を学びます。

**学習内容：**
- async関数の基本
- awaitの使い方
- エラーハンドリング（try/catch）
- Promise.allによる並列処理
- 実践的な使用例

**重要度：⭐⭐⭐⭐⭐**
現代のJavaScript開発で必須の知識です。

---

### 2. [AbortController](./02_abort-controller.md)

非同期処理を中断する方法を学びます。

**学習内容：**
- AbortControllerの基本
- fetchリクエストの中断
- タイムアウトの実装
- 複数リクエストの一括中断

**重要度：⭐⭐⭐⭐**
ユーザー体験の向上に重要な機能です。

---

## 🎯 学習目標

この章を完了すると、以下ができるようになります：

- ✅ async/awaitで非同期処理を読みやすく書ける
- ✅ try/catchで適切なエラーハンドリングができる
- ✅ Promise.allで並列処理を実装できる
- ✅ AbortControllerでリクエストを中断できる
- ✅ タイムアウト機能を実装できる

## 📝 学習の進め方

### ステップ1: Promiseの基礎を確認

まず、[ES6基礎知識](../01_基礎/03_es6-basics.md#9-promiseの基礎)でPromiseの基本を確認しておきましょう。

### ステップ2: async/awaitを学ぶ

Promiseチェーンよりも読みやすいasync/await構文を学びます。

### ステップ3: AbortControllerを学ぶ

リクエストの中断方法を学び、より良いユーザー体験を提供できるようになります。

## 💡 非同期処理が必要な場面

### 1. API通信

```javascript
// ユーザーデータの取得
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 2. ファイル読み込み

```javascript
// 画像の読み込み
async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
```

### 3. タイマー処理

```javascript
// 遅延実行
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

await delay(1000); // 1秒待つ
console.log('1秒経ちました');
```

### 4. データベース操作

```javascript
// データの保存
async function saveUser(user) {
  const result = await db.users.insert(user);
  return result;
}
```

## 🔧 開発者ツールでのデバッグ

### Consoleでの確認

```javascript
async function test() {
  console.log('開始');
  const data = await fetch('/api/data').then(r => r.json());
  console.log('データ:', data);
  console.log('完了');
}

test();
```

### Networkタブでの確認

1. 開発者ツールを開く（F12）
2. Networkタブを選択
3. API通信の状態を確認
   - Status（ステータスコード）
   - Time（処理時間）
   - Size（データサイズ）

## 📚 参考リソース

### 公式ドキュメント
- [MDN - async function](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)
- [MDN - AbortController](https://developer.mozilla.org/ja/docs/Web/API/AbortController)

### おすすめ記事
- [async/await入門 - Qiita](https://qiita.com/soarflat/items/1a9613e023200bbebcb3)

## 🎓 前提知識の確認

以下の知識があることを前提としています：

### 必須
- [ ] Promiseの基本を理解している
- [ ] then/catchの使い方を知っている
- [ ] アロー関数を書ける

### 推奨
- [ ] try/catch構文を知っている
- [ ] fetch APIの基本を知っている
- [ ] JavaScriptのイベントループを理解している

まだ理解していない項目がある場合は、[ES6基礎知識](../01_基礎/03_es6-basics.md)を先に学習することをお勧めします。

## ⚠️ よくある誤解

### 誤解1: async/awaitは同期処理にする

❌ **誤解：** async/awaitを使うと処理が同期的になる

✅ **正しい理解：** async/awaitは非同期処理を同期的に**見える**ように書くための構文糖衣

```javascript
// 非同期処理はバックグラウンドで実行される
async function fetchData() {
  console.log('1. 開始');
  const data = await fetch('/api/data'); // 待機中も他の処理は動く
  console.log('2. 完了');
}

fetchData();
console.log('3. この行は先に実行される');

// 出力順序: 1 → 3 → 2
```

### 誤解2: awaitは常に使うべき

❌ **誤解：** Promiseを返す関数には必ずawaitをつける

✅ **正しい理解：** 結果を使わない場合や並列実行したい場合は不要

```javascript
// 結果を使わない場合
async function logData() {
  // ❌ 不要なawait
  await console.log('Hello');

  // ✅ awaitは不要
  console.log('Hello');
}

// 並列実行したい場合
async function fetchMultiple() {
  // ❌ 順次実行（遅い）
  const user = await fetchUser();
  const posts = await fetchPosts();

  // ✅ 並列実行（速い）
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
}
```

---

**準備ができたら、次のページに進みましょう！**

👉 [async/await](./01_async-await.md)
