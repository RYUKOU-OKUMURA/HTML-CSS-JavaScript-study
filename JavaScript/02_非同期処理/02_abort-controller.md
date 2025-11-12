# AbortController

AbortControllerは、非同期処理（特にfetchリクエスト）を中断するためのAPIです。ユーザーがページを離れたり、検索クエリを変更したときにリクエストをキャンセルできます。

## 📚 学習内容

- AbortControllerの基本
- fetchリクエストの中断
- タイムアウトの実装
- 複数リクエストの一括中断
- 実践的な使用例

---

## なぜAbortControllerが必要なのか？

### 問題: リクエストをキャンセルできない

```javascript
// 問題のあるコード
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;

  // ユーザーが高速に入力すると、古いリクエストも実行され続ける
  const response = await fetch(`/api/search?q=${query}`);
  const results = await response.json();

  displayResults(results);
});
```

**問題点：**
- ユーザーが「JavaSc」と入力すると、「J」「Ja」「Jav」「Java」「JavaS」「JavaSc」の6回のリクエストが発生
- すべてのリクエストが完了するまで続く
- 古い結果が後から表示される可能性がある

---

## AbortControllerの基本

### コントローラーの作成

```javascript
// ✅ AbortControllerを作成
const controller = new AbortController();

// signal プロパティを取得
const signal = controller.signal;

// リクエストを中断
controller.abort();
```

---

### fetchでの使用

```javascript
async function fetchWithAbort() {
  // コントローラーを作成
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    // signalをfetchに渡す
    const response = await fetch('/api/data', { signal });
    const data = await response.json();
    console.log('データ:', data);
  } catch (error) {
    // 中断された場合
    if (error.name === 'AbortError') {
      console.log('リクエストが中断されました');
    } else {
      console.error('エラー:', error);
    }
  }
}
```

---

## 実践例

### 例1: 検索のキャンセル

```javascript
let searchController = null;

const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;

  // ✅ 前回のリクエストをキャンセル
  if (searchController) {
    searchController.abort();
  }

  // 新しいコントローラーを作成
  searchController = new AbortController();
  const signal = searchController.signal;

  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`/api/search?q=${query}`, { signal });
    const results = await response.json();

    // 結果を表示
    resultsDiv.innerHTML = results
      .map(item => `<div>${item.name}</div>`)
      .join('');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('検索がキャンセルされました');
    } else {
      console.error('エラー:', error);
      resultsDiv.innerHTML = '<div>エラーが発生しました</div>';
    }
  }
});
```

---

### 例2: タイムアウトの実装

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const signal = controller.signal;

  // タイムアウト設定
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); // リクエスト成功時はタイマークリア
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('タイムアウトしました');
    }
    throw error;
  }
}

// 使用例
try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
  console.log('データ:', data);
} catch (error) {
  console.error('エラー:', error.message);
}
```

---

### 例3: AbortSignal.timeout (モダンな方法)

```javascript
// ✅ AbortSignal.timeout を使った簡潔な書き方
async function fetchWithTimeoutModern(url, timeout = 5000) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeout)
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new Error('タイムアウトしました');
    }
    throw error;
  }
}
```

**ブラウザ対応：**
- Chrome 103+
- Safari 16+
- Firefox 100+

---

### 例4: 複数リクエストの一括中断

```javascript
async function loadDashboard() {
  const controller = new AbortController();
  const signal = controller.signal;

  // キャンセルボタン
  const cancelButton = document.getElementById('cancel');
  cancelButton.addEventListener('click', () => {
    controller.abort();
    console.log('すべてのリクエストをキャンセルしました');
  });

  try {
    // すべてのリクエストに同じsignalを渡す
    const [user, stats, notifications] = await Promise.all([
      fetch('/api/user', { signal }).then(r => r.json()),
      fetch('/api/stats', { signal }).then(r => r.json()),
      fetch('/api/notifications', { signal }).then(r => r.json())
    ]);

    console.log('すべて取得完了');
    displayDashboard({ user, stats, notifications });
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('読み込みがキャンセルされました');
    } else {
      console.error('エラー:', error);
    }
  }
}
```

---

### 例5: 動画ダウンロードの中断

```javascript
const downloadButton = document.getElementById('download');
const cancelButton = document.getElementById('cancel');
const progressBar = document.getElementById('progress');

let downloadController = null;

downloadButton.addEventListener('click', async () => {
  downloadController = new AbortController();
  const signal = downloadController.signal;

  cancelButton.disabled = false;

  try {
    const response = await fetch('/api/videos/large-video.mp4', { signal });
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      // 進捗を更新
      const progress = (receivedLength / contentLength) * 100;
      progressBar.value = progress;
      console.log(`進捗: ${progress.toFixed(2)}%`);
    }

    console.log('ダウンロード完了');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('ダウンロードがキャンセルされました');
      progressBar.value = 0;
    } else {
      console.error('エラー:', error);
    }
  }
});

cancelButton.addEventListener('click', () => {
  if (downloadController) {
    downloadController.abort();
    cancelButton.disabled = true;
  }
});
```

---

### 例6: ページ離脱時の中断

```javascript
let pageController = null;

async function loadPageData() {
  // 前回のリクエストをキャンセル
  if (pageController) {
    pageController.abort();
  }

  pageController = new AbortController();
  const signal = pageController.signal;

  try {
    const response = await fetch('/api/page-data', { signal });
    const data = await response.json();
    renderPage(data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('エラー:', error);
    }
  }
}

// ページ離脱時に中断
window.addEventListener('beforeunload', () => {
  if (pageController) {
    pageController.abort();
  }
});
```

---

## signalのイベントリスナー

### abort イベントの監視

```javascript
const controller = new AbortController();
const signal = controller.signal;

// 中断時のイベントリスナー
signal.addEventListener('abort', () => {
  console.log('リクエストが中断されました');
  console.log('中断理由:', signal.reason);
});

// リクエストを中断
controller.abort('ユーザーがキャンセルしました');
```

---

### abort理由の指定

```javascript
const controller = new AbortController();

// 理由を指定して中断
controller.abort('タイムアウトしました');

// signalから理由を取得
console.log(controller.signal.reason); // "タイムアウトしました"
```

---

## デバウンスとの組み合わせ

検索機能でよく使われるパターンです。

```javascript
let searchController = null;
let debounceTimer = null;

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;

  // 前回のタイマーをクリア
  clearTimeout(debounceTimer);

  // 前回のリクエストをキャンセル
  if (searchController) {
    searchController.abort();
  }

  // デバウンス: 300ms後に実行
  debounceTimer = setTimeout(async () => {
    if (query.length < 2) return;

    searchController = new AbortController();
    const signal = searchController.signal;

    try {
      const response = await fetch(`/api/search?q=${query}`, { signal });
      const results = await response.json();
      displayResults(results);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('エラー:', error);
      }
    }
  }, 300);
});
```

---

## よくある質問

### Q1: AbortControllerは再利用できる？

**A: いいえ、一度abort()を呼んだら再利用できません。**

```javascript
const controller = new AbortController();
controller.abort();

// ❌ 同じコントローラーは再利用できない
// 新しいコントローラーを作成する必要がある
const newController = new AbortController();
```

---

### Q2: abort()を複数回呼んでも大丈夫？

**A: はい、複数回呼んでも問題ありません（冪等性）。**

```javascript
const controller = new AbortController();

controller.abort(); // 1回目
controller.abort(); // 2回目（エラーにならない）
controller.abort(); // 3回目（エラーにならない）
```

---

### Q3: すべての非同期処理で使える？

**A: いいえ、signalに対応したAPIでのみ使えます。**

**対応しているAPI:**
- ✅ fetch()
- ✅ addEventListener()（一部のイベント）
- ✅ ReadableStream

**対応していないAPI:**
- ❌ setTimeout/setInterval
- ❌ Promise（標準のPromise）
- ❌ XMLHttpRequest

---

## 実践演習

### 演習1: 基本的な中断

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>AbortController 演習</title>
</head>
<body>
  <button id="start">リクエスト開始</button>
  <button id="cancel">キャンセル</button>
  <div id="result"></div>

  <script>
    let controller = null;

    document.getElementById('start').addEventListener('click', async () => {
      controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { signal });
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        if (error.name === 'AbortError') {
          document.getElementById('result').textContent = 'キャンセルされました';
        } else {
          document.getElementById('result').textContent = 'エラー: ' + error.message;
        }
      }
    });

    document.getElementById('cancel').addEventListener('click', () => {
      if (controller) {
        controller.abort();
      }
    });
  </script>
</body>
</html>
```

---

### 演習2: タイムアウト付きリクエスト

```javascript
async function fetchPostWithTimeout(postId, timeout = 3000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { signal }
    );
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('タイムアウト');
    }
    throw error;
  }
}

// テスト
try {
  const post = await fetchPostWithTimeout(1, 3000);
  console.log('投稿:', post.title);
} catch (error) {
  console.error('エラー:', error.message);
}
```

---

## まとめ

### 重要ポイント

1. **AbortController**でリクエストを中断できる
   - 不要なリクエストをキャンセル
   - ネットワークとサーバーの負荷を軽減

2. **signal**をfetchに渡す
   - `fetch(url, { signal })`

3. **abort()**で中断
   - `controller.abort()`

4. **AbortError**でキャッチ
   - `error.name === 'AbortError'`

5. **再利用できない**
   - 新しいリクエストには新しいコントローラーが必要

### ユースケース

- ✅ 検索のキャンセル
- ✅ タイムアウトの実装
- ✅ ページ離脱時の中断
- ✅ ファイルダウンロードのキャンセル
- ✅ 複数リクエストの一括中断

### チェックリスト

- [ ] AbortControllerを作成できる
- [ ] signalをfetchに渡せる
- [ ] abort()でリクエストを中断できる
- [ ] AbortErrorを適切にハンドリングできる
- [ ] タイムアウトを実装できる
- [ ] 実際のアプリで使える

---

## 参考リンク

- [MDN - AbortController](https://developer.mozilla.org/ja/docs/Web/API/AbortController)
- [MDN - AbortSignal](https://developer.mozilla.org/ja/docs/Web/API/AbortSignal)
- [MDN - Using Fetch](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)

---

**次のステップ:** [パフォーマンス最適化編](../03_パフォーマンス最適化/README.md)
