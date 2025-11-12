# デバウンス（Debounce）

デバウンスは、連続して発生するイベントを制御し、最後のイベントから一定時間経過後に一度だけ関数を実行するテクニックです。

## 📚 学習内容

- デバウンスの概念
- デバウンスの実装方法
- 検索ボックスの最適化
- フォーム自動保存
- ボタンの二重クリック防止
- 実践的な使用例

---

## デバウンスとは？

### 問題: イベントが頻繁に発生する

```javascript
// 問題のあるコード
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;

  // ❌ キー入力のたびにAPIリクエスト
  const results = await fetch(`/api/search?q=${query}`);
  console.log('検索実行:', query);
});

// "JavaScript" と入力すると...
// 検索実行: J
// 検索実行: Ja
// 検索実行: Jav
// 検索実行: Java
// 検索実行: JavaS
// 検索実行: JavaSc
// 検索実行: JavaScr
// 検索実行: JavaScri
// 検索実行: JavaScrip
// 検索実行: JavaScript

// 合計10回のAPIリクエスト！
```

---

### 解決策: デバウンス

デバウンスを使うと、ユーザーが入力を止めてから一定時間後に一度だけ実行されます。

```javascript
// ✅ デバウンスを適用
const searchInput = document.getElementById('search');

let timerId;

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;

  // 前のタイマーをクリア
  clearTimeout(timerId);

  // 新しいタイマーを設定（300ms後に実行）
  timerId = setTimeout(async () => {
    const results = await fetch(`/api/search?q=${query}`);
    console.log('検索実行:', query);
  }, 300);
});

// "JavaScript" と入力しても...
// 検索実行: JavaScript （最後の1回だけ）
```

---

## デバウンスの仕組み

### タイムライン図

```
ユーザー入力: J → a → v → a → [300ms待機] → 実行

イベント:    ↓   ↓   ↓   ↓
タイマー:    S   C   C   C                      → 実行
             ↓   S   S   S
             キャンセル

S = タイマー開始
C = タイマーキャンセル
```

1. イベントが発生する
2. タイマーを開始する
3. 次のイベントが来たらタイマーをキャンセル
4. 再度タイマーを開始する
5. タイマーが完了したら関数を実行する

---

## デバウンス関数の実装

### 基本的な実装

```javascript
function debounce(func, delay) {
  let timerId;

  return function(...args) {
    // 前のタイマーをクリア
    clearTimeout(timerId);

    // 新しいタイマーを設定
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用例
const search = debounce((query) => {
  console.log('検索:', query);
}, 300);

// 何度呼んでも300ms後に1回だけ実行される
search('J');
search('Ja');
search('Jav');
search('JavaScript'); // これだけが実行される
```

---

### アロー関数での実装

```javascript
const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};
```

---

## 実践例

### 例1: 検索ボックス

```javascript
// HTML
// <input type="text" id="search" placeholder="検索...">
// <div id="results"></div>

const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

// デバウンス関数
function debounce(func, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 検索関数
async function searchItems(query) {
  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }

  try {
    resultsDiv.innerHTML = '検索中...';

    const response = await fetch(`/api/search?q=${query}`);
    const results = await response.json();

    resultsDiv.innerHTML = results
      .map(item => `<div class="item">${item.name}</div>`)
      .join('');
  } catch (error) {
    resultsDiv.innerHTML = 'エラーが発生しました';
    console.error('検索エラー:', error);
  }
}

// ✅ デバウンスを適用
const debouncedSearch = debounce(searchItems, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

### 例2: フォーム自動保存

```javascript
// フォームの入力内容を自動保存
const form = document.getElementById('editForm');
const saveStatus = document.getElementById('saveStatus');

// 自動保存関数
async function autoSave() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  saveStatus.textContent = '保存中...';

  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    saveStatus.textContent = '保存しました';

    // 2秒後にメッセージを消す
    setTimeout(() => {
      saveStatus.textContent = '';
    }, 2000);
  } catch (error) {
    saveStatus.textContent = '保存に失敗しました';
    console.error('保存エラー:', error);
  }
}

// ✅ デバウンスを適用（2秒間入力がなければ保存）
const debouncedAutoSave = debounce(autoSave, 2000);

// すべての入力要素に適用
form.addEventListener('input', debouncedAutoSave);
```

---

### 例3: ウィンドウリサイズ

```javascript
// ウィンドウサイズ変更時の処理
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(`ウィンドウサイズ: ${width} x ${height}`);

  // レイアウトの再計算など
  recalculateLayout();
}

// ✅ デバウンスを適用
const debouncedResize = debounce(handleResize, 200);

window.addEventListener('resize', debouncedResize);
```

---

### 例4: スクロール位置の保存

```javascript
// スクロール位置をlocalStorageに保存
function saveScrollPosition() {
  const scrollY = window.scrollY;
  localStorage.setItem('scrollPosition', scrollY);
  console.log('スクロール位置を保存:', scrollY);
}

// ✅ デバウンスを適用
const debouncedSaveScroll = debounce(saveScrollPosition, 500);

window.addEventListener('scroll', debouncedSaveScroll);

// ページ読み込み時に復元
window.addEventListener('load', () => {
  const savedPosition = localStorage.getItem('scrollPosition');
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition));
  }
});
```

---

## 先頭トリガー型デバウンス

通常のデバウンスは最後に実行しますが、最初に実行するパターンもあります。

### immediate オプション付きデバウンス

```javascript
function debounce(func, delay, immediate = false) {
  let timerId;

  return function(...args) {
    const callNow = immediate && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);

    if (callNow) {
      func.apply(this, args);
    }
  };
}

// 使用例: ボタンの二重クリック防止
const button = document.getElementById('submitButton');

const handleClick = debounce(() => {
  console.log('ボタンがクリックされました');
  // API送信など
}, 1000, true); // immediate = true

button.addEventListener('click', handleClick);

// 最初のクリックは即座に実行
// 1秒以内の追加クリックは無視される
```

---

## デバウンスとスロットリングの違い

### デバウンス

最後のイベントから一定時間後に実行

```
イベント: ●●●●●          ●●●
実行:               🔵      🔵
          ↑ 300ms後  ↑ 300ms後
```

**使用場面：**
- 検索ボックス
- フォーム自動保存
- ウィンドウリサイズ

---

### スロットリング

一定間隔で必ず実行

```
イベント: ●●●●●●●●●●●●●●●●
実行:     🔵    🔵    🔵    🔵
         ↑200ms ↑200ms ↑200ms
```

**使用場面：**
- スクロールイベント
- マウス移動
- アニメーション

---

### スロットリングの実装

```javascript
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

// 使用例: スクロール進捗の表示
const updateScrollProgress = throttle(() => {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / height) * 100;

  document.getElementById('progress').style.width = progress + '%';
}, 100);

window.addEventListener('scroll', updateScrollProgress);
```

---

## ライブラリの使用

### Lodash

```javascript
// Lodash のデバウンスを使用
import { debounce } from 'lodash';

const search = debounce((query) => {
  console.log('検索:', query);
}, 300);
```

### Underscore.js

```javascript
// Underscore.js のデバウンスを使用
const search = _.debounce((query) => {
  console.log('検索:', query);
}, 300);
```

---

## よくある質問

### Q1: デバウンスの遅延時間はどのくらいが適切？

**A: 用途によって異なりますが、以下が目安です。**

- **検索ボックス**: 300ms（ユーザーが一息つく時間）
- **フォーム自動保存**: 1000-2000ms（頻繁すぎないように）
- **ウィンドウリサイズ**: 150-300ms（反応は速く）
- **二重クリック防止**: 500-1000ms

---

### Q2: デバウンスをキャンセルできる？

**A: はい、タイマーIDを保持すればキャンセルできます。**

```javascript
function debounce(func, delay) {
  let timerId;

  const debounced = function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };

  // キャンセル用メソッド
  debounced.cancel = function() {
    clearTimeout(timerId);
  };

  return debounced;
}

const search = debounce(searchFunc, 300);

// 検索をキャンセル
search.cancel();
```

---

### Q3: async関数でも使える？

**A: はい、問題なく使えます。**

```javascript
const debouncedFetch = debounce(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  const results = await response.json();
  return results;
}, 300);
```

---

## パフォーマンスの比較

### デバウンスなし

```javascript
let requestCount = 0;

searchInput.addEventListener('input', async (e) => {
  requestCount++;
  console.log('リクエスト数:', requestCount);
  await fetch(`/api/search?q=${e.target.value}`);
});

// "JavaScript" と入力
// → 10回のリクエスト
```

### デバウンスあり

```javascript
let requestCount = 0;

const debouncedSearch = debounce(async (query) => {
  requestCount++;
  console.log('リクエスト数:', requestCount);
  await fetch(`/api/search?q=${query}`);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// "JavaScript" と入力
// → 1回のリクエスト（90%削減！）
```

---

## 実践演習

### 演習1: 基本的なデバウンス

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>デバウンス演習</title>
  <style>
    #counter {
      font-size: 24px;
      margin: 20px;
    }
  </style>
</head>
<body>
  <input type="text" id="input" placeholder="入力してください">
  <div id="counter">実行回数: 0</div>

  <script>
    let executionCount = 0;
    const counterDiv = document.getElementById('counter');

    function debounce(func, delay) {
      let timerId;
      return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
      };
    }

    const handleInput = debounce((value) => {
      executionCount++;
      counterDiv.textContent = `実行回数: ${executionCount} (入力: "${value}")`;
    }, 500);

    document.getElementById('input').addEventListener('input', (e) => {
      handleInput(e.target.value);
    });
  </script>
</body>
</html>
```

---

### 演習2: 検索機能の実装

```javascript
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

function debounce(func, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

async function search(query) {
  if (!query) {
    resultsDiv.innerHTML = '';
    return;
  }

  resultsDiv.innerHTML = '検索中...';

  try {
    // JSONPlaceholderで実際にテスト
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&q=${query}`
    );
    const posts = await response.json();

    resultsDiv.innerHTML = posts
      .map(post => `<div><strong>${post.title}</strong></div>`)
      .join('');
  } catch (error) {
    resultsDiv.innerHTML = 'エラーが発生しました';
  }
}

const debouncedSearch = debounce(search, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

## まとめ

### 重要ポイント

1. **デバウンスは頻繁なイベントを制御**
   - 最後のイベントから一定時間後に実行
   - 不要なAPI呼び出しを削減

2. **実装は簡単**
   - setTimeoutとclearTimeoutを使用
   - 高階関数で実装

3. **適用場面**
   - 検索ボックス（300ms）
   - フォーム自動保存（1-2秒）
   - ウィンドウリサイズ（150-300ms）
   - スクロール位置の保存（500ms）

4. **immediate オプション**
   - 最初に実行するパターン
   - ボタンの二重クリック防止に使用

5. **スロットリングとの違い**
   - デバウンス: 最後のイベント後に実行
   - スロットリング: 一定間隔で実行

### パフォーマンス改善効果

- ✅ APIリクエスト: 90%以上削減
- ✅ サーバー負荷: 大幅に軽減
- ✅ ネットワークトラフィック: 削減
- ✅ ユーザー体験: 向上

### チェックリスト

- [ ] デバウンスの仕組みを理解した
- [ ] デバウンス関数を実装できる
- [ ] 検索ボックスに適用できる
- [ ] 適切な遅延時間を選択できる
- [ ] immediate オプションを理解した
- [ ] スロットリングとの違いを理解した

---

## 参考リンク

- [JavaScript Debounce Example - FreeCodeCamp](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [MDN - setTimeout](https://developer.mozilla.org/ja/docs/Web/API/setTimeout)
- [Lodash - debounce](https://lodash.com/docs/#debounce)

---

**次のステップ:** [ブラウザAPI編](../04_ブラウザAPI/README.md)
