# Intersection Observer API

Intersection Observer APIは、要素がビューポート（画面）に入ったかどうかを効率的に監視できるAPIです。スクロール連動エフェクトや画像の遅延読み込みに最適です。

## 📚 学習内容

- Intersection Observerの基本
- スクロール連動エフェクト
- 画像の遅延読み込み（Lazy Loading）
- 無限スクロール
- オプション設定
- 実践的な使用例

---

## なぜIntersection Observerが必要なのか？

### 従来の方法の問題

```javascript
// ❌ 従来の方法（scrollイベント）
window.addEventListener('scroll', () => {
  const element = document.getElementById('target');
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // スクロールのたびに実行される（数百回/秒）
  if (rect.top < windowHeight && rect.bottom > 0) {
    element.classList.add('visible');
  }
});
```

**問題点：**
- スクロールのたびに実行される
- `getBoundingClientRect()`は重い処理
- レスポンシブ対応時、ウィンドウサイズ変更の度に再計算が必要
- パフォーマンスが悪い

---

### Intersection Observerによる解決

```javascript
// ✅ Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 交差状態が変わった時だけ実行される
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(document.getElementById('target'));
```

**利点：**
- 交差状態が変わった時だけ実行
- ブラウザが自動的に最適化
- レスポンシブに自動対応
- パフォーマンスが良い

---

## 基本的な使い方

### ステップ1: Observerを作成

```javascript
const observer = new IntersectionObserver((entries) => {
  // 交差状態が変わった時に実行されるコールバック
  entries.forEach(entry => {
    console.log('要素:', entry.target);
    console.log('交差している:', entry.isIntersecting);
  });
});
```

---

### ステップ2: 要素を監視

```javascript
// 監視したい要素を取得
const target = document.getElementById('target');

// 監視を開始
observer.observe(target);
```

---

### ステップ3: 監視を停止（必要に応じて）

```javascript
// 特定の要素の監視を停止
observer.unobserve(target);

// すべての監視を停止
observer.disconnect();
```

---

## 実践例

### 例1: スクロール連動アニメーション

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>スクロールアニメーション</title>
  <style>
    .box {
      width: 300px;
      height: 200px;
      margin: 100vh 0;
      background: #3498db;
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 0.6s, transform 0.6s;
    }

    .box.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <div class="box">ボックス 1</div>
  <div class="box">ボックス 2</div>
  <div class="box">ボックス 3</div>

  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 一度表示したら監視を停止（最適化）
          observer.unobserve(entry.target);
        }
      });
    });

    // すべての.boxを監視
    document.querySelectorAll('.box').forEach(box => {
      observer.observe(box);
    });
  </script>
</body>
</html>
```

---

### 例2: 画像の遅延読み込み（Lazy Loading）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>画像の遅延読み込み</title>
  <style>
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      margin: 20px 0;
      background: #f0f0f0;
    }

    img[data-src] {
      filter: blur(10px);
      transition: filter 0.3s;
    }

    img.loaded {
      filter: blur(0);
    }
  </style>
</head>
<body>
  <!-- data-src に実際の画像URLを指定 -->
  <img data-src="image1.jpg" alt="画像1">
  <img data-src="image2.jpg" alt="画像2">
  <img data-src="image3.jpg" alt="画像3">

  <script>
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // data-srcから実際のsrcに設定
          img.src = img.dataset.src;

          // 読み込み完了時の処理
          img.onload = () => {
            img.classList.add('loaded');
            img.removeAttribute('data-src');
          };

          // 監視を停止
          imageObserver.unobserve(img);
        }
      });
    });

    // すべてのdata-srcを持つ画像を監視
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  </script>
</body>
</html>
```

---

### 例3: 無限スクロール

```javascript
const postsContainer = document.getElementById('posts');
const loader = document.getElementById('loader');

let currentPage = 1;
let isLoading = false;

// ローダー要素を監視
const loadMoreObserver = new IntersectionObserver((entries) => {
  const loaderEntry = entries[0];

  if (loaderEntry.isIntersecting && !isLoading) {
    loadMorePosts();
  }
});

loadMoreObserver.observe(loader);

async function loadMorePosts() {
  isLoading = true;
  loader.textContent = '読み込み中...';

  try {
    const response = await fetch(`/api/posts?page=${currentPage}`);
    const posts = await response.json();

    // 投稿を追加
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(article);
    });

    currentPage++;
    loader.textContent = 'さらに読み込む';
  } catch (error) {
    loader.textContent = '読み込みに失敗しました';
    console.error('エラー:', error);
  } finally {
    isLoading = false;
  }
}
```

---

## オプション設定

### rootMargin

ビューポートの範囲を拡張または縮小します。

```javascript
const observer = new IntersectionObserver((entries) => {
  // コールバック
}, {
  // 画面の上下に100px余裕を持たせる
  rootMargin: '100px 0px'
});

// 画面中央で判定
const centerObserver = new IntersectionObserver((entries) => {
  // コールバック
}, {
  rootMargin: '-50% 0px'
});
```

**値の形式：**
- CSS の margin と同じ（上 右 下 左）
- 例: `'10px 20px 30px 40px'`
- 例: `'100px 0px'`（上下のみ）

---

### threshold

要素の表示割合のしきい値を設定します。

```javascript
// 要素が50%表示されたら実行
const observer = new IntersectionObserver((entries) => {
  // コールバック
}, {
  threshold: 0.5
});

// 複数のしきい値を設定
const multiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log('表示割合:', entry.intersectionRatio);
  });
}, {
  threshold: [0, 0.25, 0.5, 0.75, 1.0]
});
```

**値：**
- `0`: 1pxでも表示されたら（デフォルト）
- `0.5`: 50%表示されたら
- `1.0`: 完全に表示されたら
- `[0, 0.5, 1.0]`: 配列で複数指定

---

### root

監視の基準となる要素を指定します。

```javascript
// 特定の要素をスクロールコンテナとして使用
const container = document.getElementById('scrollContainer');

const observer = new IntersectionObserver((entries) => {
  // コールバック
}, {
  root: container  // nullの場合はビューポート
});
```

---

## entryオブジェクトの主要プロパティ

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 監視対象の要素
    console.log('要素:', entry.target);

    // 交差しているか（boolean）
    console.log('交差:', entry.isIntersecting);

    // 表示割合（0.0〜1.0）
    console.log('表示割合:', entry.intersectionRatio);

    // 交差している矩形
    console.log('交差矩形:', entry.intersectionRect);

    // 要素の矩形
    console.log('要素の矩形:', entry.boundingClientRect);

    // ルート要素の矩形
    console.log('ルート矩形:', entry.rootBounds);
  });
});
```

---

## 実践的なパターン

### パターン1: フェードイン + スライド

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1  // 10%表示されたら
});

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(el);
});
```

---

### パターン2: 進捗表示（スクロール連動アニメーション）

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const progress = entry.intersectionRatio * 100;
    entry.target.style.setProperty('--progress', `${progress}%`);
  });
}, {
  threshold: Array.from({ length: 101 }, (_, i) => i / 100)
});

document.querySelectorAll('.progress-bar').forEach(el => {
  observer.observe(el);
});
```

---

### パターン3: 目次のハイライト

```javascript
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`nav a[href="#${id}"]`);

    if (entry.isIntersecting) {
      // 現在のセクションをハイライト
      navLinks.forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}, {
  rootMargin: '-50% 0px'  // 画面中央で判定
});

sections.forEach(section => tocObserver.observe(section));
```

---

### パターン4: ビデオの自動再生/停止

```javascript
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;

    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.5  // 50%表示されたら
});

document.querySelectorAll('video').forEach(video => {
  videoObserver.observe(video);
});
```

---

## よくある質問

### Q1: 一度だけ実行したい場合は？

**A: 実行後にunobserve()を呼びます。**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // ✅ 監視を停止
      observer.unobserve(entry.target);
    }
  });
});
```

---

### Q2: 要素が画面から出た時も検知したい

**A: isIntersectingがfalseの時を処理します。**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('画面に入りました');
    } else {
      console.log('画面から出ました');
    }
  });
});
```

---

### Q3: 複数の要素を一度に監視できる？

**A: はい、observe()を複数回呼べます。**

```javascript
const observer = new IntersectionObserver((entries) => {
  // すべての要素がentriesに入る
});

document.querySelectorAll('.target').forEach(el => {
  observer.observe(el);
});
```

---

## パフォーマンス比較

### ベンチマーク結果

```javascript
// スクロールイベント
let scrollCount = 0;
window.addEventListener('scroll', () => {
  scrollCount++;
});

// 1回のスクロールで: 100〜500回実行

// Intersection Observer
let observerCount = 0;
const observer = new IntersectionObserver(() => {
  observerCount++;
});

// 1回のスクロールで: 2回実行（入る時と出る時）

// 結果: 50〜250倍の削減！
```

---

## 実践演習

### 演習1: 基本的なフェードイン

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Intersection Observer 演習</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
    }

    .box {
      width: 80%;
      height: 200px;
      margin: 50vh auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.6s, transform 0.6s;
    }

    .box.visible {
      opacity: 1;
      transform: scale(1);
    }
  </style>
</head>
<body>
  <div class="box">ボックス 1</div>
  <div class="box">ボックス 2</div>
  <div class="box">ボックス 3</div>
  <div class="box">ボックス 4</div>

  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('.box').forEach(box => {
      observer.observe(box);
    });
  </script>
</body>
</html>
```

---

## まとめ

### 重要ポイント

1. **Intersection Observerは効率的**
   - スクロールイベントより50〜250倍効率的
   - ブラウザが自動最適化

2. **基本的な使い方**
   ```javascript
   const observer = new IntersectionObserver(callback, options);
   observer.observe(element);
   ```

3. **主要なオプション**
   - `rootMargin`: 判定範囲の調整
   - `threshold`: 表示割合のしきい値
   - `root`: 基準要素

4. **使用場面**
   - スクロール連動アニメーション
   - 画像の遅延読み込み
   - 無限スクロール
   - 目次のハイライト
   - ビデオの自動再生/停止

5. **パフォーマンス**
   - scrollイベントを置き換える
   - レスポンシブに自動対応
   - 再計算不要

### チェックリスト

- [ ] Intersection Observerの仕組みを理解した
- [ ] スクロール連動アニメーションを実装できる
- [ ] 画像の遅延読み込みを実装できる
- [ ] オプション（rootMargin, threshold）を使える
- [ ] unobserve()で監視を停止できる

---

## 参考リンク

- [MDN - Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)
- [ICS MEDIA - Intersection Observerの活用](https://ics.media/entry/190902/)

---

**次のステップ:** [matchMedia API](./02_match-media.md)
