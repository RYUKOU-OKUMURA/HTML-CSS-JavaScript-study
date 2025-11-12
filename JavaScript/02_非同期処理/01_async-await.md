# async/await

async/awaitは、Promiseを使った非同期処理をより読みやすく書くための構文です。複雑なPromiseチェーンを同期処理のように書けます。

## 📚 学習内容

- async関数の基本
- awaitの使い方
- エラーハンドリング
- Promise.allによる並列処理
- 実践的な使用例

---

## なぜasync/awaitが必要なのか？

### Promiseチェーンの問題

Promiseチェーンは読みにくくなりがちです。

```javascript
// Promiseチェーン（読みにくい）
function getUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/users/${user.id}/posts`);
    })
    .then(response => response.json())
    .then(posts => {
      return fetch(`/api/users/${posts[0].authorId}/profile`);
    })
    .then(response => response.json())
    .then(profile => {
      console.log('プロフィール:', profile);
      return profile;
    })
    .catch(error => {
      console.error('エラー:', error);
    });
}
```

### async/awaitで改善

```javascript
// ✅ async/await（読みやすい）
async function getUserData(userId) {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();

    const postsResponse = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsResponse.json();

    const profileResponse = await fetch(`/api/users/${posts[0].authorId}/profile`);
    const profile = await profileResponse.json();

    console.log('プロフィール:', profile);
    return profile;
  } catch (error) {
    console.error('エラー:', error);
  }
}
```

---

## async関数の基本

### asyncキーワード

関数の前に`async`をつけると、その関数は必ずPromiseを返します。

```javascript
// ✅ async関数は常にPromiseを返す
async function greet() {
  return 'こんにちは';
}

// これは以下と同じ
function greet() {
  return Promise.resolve('こんにちは');
}

// 使用例
greet().then(message => {
  console.log(message); // "こんにちは"
});
```

---

### さまざまな書き方

```javascript
// 関数宣言
async function fetchData() {
  return 'データ';
}

// 関数式
const fetchData = async function() {
  return 'データ';
};

// アロー関数
const fetchData = async () => {
  return 'データ';
};

// メソッド
const obj = {
  async fetchData() {
    return 'データ';
  }
};

// クラスメソッド
class API {
  async fetchData() {
    return 'データ';
  }
}
```

---

## awaitの使い方

### 基本的な使い方

`await`はPromiseの結果を待ちます。

```javascript
async function example() {
  // Promiseを返す関数
  const promise = new Promise(resolve => {
    setTimeout(() => resolve('完了'), 1000);
  });

  console.log('開始');
  const result = await promise; // 1秒待つ
  console.log('結果:', result); // "完了"
}

example();
```

---

### fetch APIでの使用

```javascript
// ✅ 実践的な例
async function getUser(id) {
  // リクエストを送信して待つ
  const response = await fetch(`https://api.example.com/users/${id}`);

  // JSONのパースを待つ
  const user = await response.json();

  return user;
}

// 使用例
async function displayUser() {
  const user = await getUser(1);
  console.log('ユーザー:', user.name);
}

displayUser();
```

---

### 複数のawait

```javascript
async function loadData() {
  console.log('1. ユーザー取得開始');
  const user = await getUser(1);
  console.log('2. ユーザー取得完了:', user.name);

  console.log('3. 投稿取得開始');
  const posts = await getPosts(user.id);
  console.log('4. 投稿取得完了:', posts.length, '件');

  console.log('5. コメント取得開始');
  const comments = await getComments(posts[0].id);
  console.log('6. コメント取得完了:', comments.length, '件');

  return { user, posts, comments };
}
```

---

## エラーハンドリング

### try/catch構文

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    // ステータスコードのチェック
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('エラーが発生しました:', error);
    // エラーを再スローするか、デフォルト値を返す
    return null;
  }
}

// 使用例
const user = await fetchUser(999); // 存在しないユーザー
if (user === null) {
  console.log('ユーザーが見つかりませんでした');
}
```

---

### エラーの種類に応じた処理

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    // エラーの種類で分岐
    if (error.name === 'TypeError') {
      console.error('ネットワークエラー:', error);
    } else if (error.name === 'SyntaxError') {
      console.error('JSON パースエラー:', error);
    } else {
      console.error('その他のエラー:', error);
    }

    // エラーを再スロー
    throw error;
  }
}
```

---

### finally句

```javascript
async function fetchWithLoader(url) {
  // ローディング表示
  showLoader();

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  } finally {
    // 成功・失敗に関わらず必ず実行される
    hideLoader();
  }
}
```

---

## 並列処理: Promise.all

### 順次実行（遅い）

```javascript
// ❌ 順次実行: 合計 6秒かかる
async function fetchSequential() {
  const user = await fetchUser(1);     // 2秒
  const posts = await fetchPosts(1);   // 2秒
  const comments = await fetchComments(1); // 2秒

  return { user, posts, comments };
}
```

---

### 並列実行（速い）

```javascript
// ✅ 並列実行: 最大 2秒（最も遅い処理の時間）
async function fetchParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),        // 並列に実行
    fetchPosts(1),       // 並列に実行
    fetchComments(1)     // 並列に実行
  ]);

  return { user, posts, comments };
}
```

---

### Promise.allのエラーハンドリング

```javascript
async function fetchMultiple() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(1),
      fetchPosts(1),
      fetchComments(1)
    ]);

    return { user, posts, comments };
  } catch (error) {
    // どれか1つでも失敗すると catch に来る
    console.error('どれかが失敗しました:', error);
  }
}
```

---

### Promise.allSettled: すべての結果を取得

```javascript
async function fetchMultipleWithAllResults() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(999) // 存在しない -> エラー
  ]);

  // すべての結果を確認
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`${index}: 成功`, result.value);
    } else {
      console.log(`${index}: 失敗`, result.reason);
    }
  });
}
```

---

## 実践例

### 例1: ユーザー検索

```javascript
// 検索フォーム
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;

  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }

  try {
    // API検索
    const response = await fetch(`/api/search?q=${query}`);
    const results = await response.json();

    // 結果を表示
    resultsDiv.innerHTML = results
      .map(user => `<div>${user.name}</div>`)
      .join('');
  } catch (error) {
    console.error('検索エラー:', error);
    resultsDiv.innerHTML = '<div>エラーが発生しました</div>';
  }
});
```

---

### 例2: フォーム送信

```javascript
const form = document.getElementById('userForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('送信に失敗しました');
    }

    const result = await response.json();
    alert('送信成功！');
    console.log('結果:', result);
  } catch (error) {
    alert('エラー: ' + error.message);
  }
});
```

---

### 例3: データの段階的読み込み

```javascript
async function loadDashboard() {
  // ステップ1: 基本情報をすぐ表示
  showLoader();

  try {
    const user = await fetchUser();
    displayUser(user);

    // ステップ2: 統計情報を並列取得
    const [stats, notifications] = await Promise.all([
      fetchStats(user.id),
      fetchNotifications(user.id)
    ]);

    displayStats(stats);
    displayNotifications(notifications);

    // ステップ3: 重くないデータは後で取得
    const recentActivity = await fetchRecentActivity(user.id);
    displayRecentActivity(recentActivity);
  } catch (error) {
    showError('データの読み込みに失敗しました');
  } finally {
    hideLoader();
  }
}
```

---

### 例4: リトライ機能

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(`試行 ${i + 1} 失敗:`, error);

      // 最後の試行でもエラーなら throw
      if (i === maxRetries - 1) {
        throw error;
      }

      // 待機時間を指数的に増やす（1秒、2秒、4秒...）
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 使用例
try {
  const data = await fetchWithRetry('/api/data', 3);
  console.log('データ取得成功:', data);
} catch (error) {
  console.error('3回試行しても失敗:', error);
}
```

---

## よくある質問

### Q1: awaitはasync関数の中でしか使えない？

**A: はい、通常はasync関数の中でのみ使えます。**

```javascript
// ❌ async関数の外では使えない
const data = await fetch('/api/data'); // Error

// ✅ async関数の中で使う
async function getData() {
  const data = await fetch('/api/data');
  return data;
}

// ⚠️ トップレベルawait（モダンな環境では可能）
// type="module" のスクリプトで使える
// await fetch('/api/data');
```

---

### Q2: asyncなしでawaitは使える？

**A: いいえ、awaitはasync関数の中でのみ使えます。**

```javascript
// ❌ エラー
function getData() {
  const data = await fetch('/api/data'); // Error
}

// ✅ 正しい
async function getData() {
  const data = await fetch('/api/data');
}
```

---

### Q3: async関数の中で通常の値を返したら？

**A: 自動的にPromiseでラップされます。**

```javascript
async function getValue() {
  return 42; // Promise.resolve(42) と同じ
}

getValue().then(value => {
  console.log(value); // 42
});
```

---

## 実践演習

### 演習1: 基本的なAPI取得

```javascript
// TODOリストを取得して表示
async function displayTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const todos = await response.json();

    const list = document.getElementById('todo-list');
    list.innerHTML = todos
      .map(todo => `
        <li>
          ${todo.completed ? '✅' : '⭕️'} ${todo.title}
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('エラー:', error);
  }
}

displayTodos();
```

---

### 演習2: 並列処理の実装

```javascript
// ユーザーと投稿を並列取得
async function getUserWithPosts(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json())
    ]);

    console.log('ユーザー:', user.name);
    console.log('投稿数:', posts.length);

    return { user, posts };
  } catch (error) {
    console.error('エラー:', error);
  }
}

getUserWithPosts(1);
```

---

## まとめ

### 重要ポイント

1. **async関数は常にPromiseを返す**
   - returnした値は自動的にPromise.resolve()でラップされる

2. **awaitはPromiseの結果を待つ**
   - 同期処理のように見えるが、実際は非同期

3. **try/catchでエラーハンドリング**
   - Promiseのcatchと同じ役割

4. **Promise.allで並列処理**
   - 複数の処理を同時に実行して高速化

5. **async/awaitは構文糖衣**
   - Promiseの上に構築された読みやすい構文

### チェックリスト

- [ ] async関数を書ける
- [ ] awaitでPromiseの結果を取得できる
- [ ] try/catchでエラーハンドリングできる
- [ ] Promise.allで並列処理できる
- [ ] 実際のAPIでasync/awaitを使える

---

## 参考リンク

- [MDN - async function](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)
- [async/await入門 - Qiita](https://qiita.com/soarflat/items/1a9613e023200bbebcb3)

---

**次のステップ:** [AbortController](./02_abort-controller.md)
