# Script読み込み（defer/async）

JavaScriptファイルの読み込み方法は、Webページのパフォーマンスに大きく影響します。この章では、`defer`と`async`属性を使った効率的なスクリプト読み込み方法を学びます。

## 📚 学習内容

- 3つのスクリプト読み込み方式
- defer属性の使い方と利点
- async属性の使い方と利点
- 実行順序の違い
- 実践的な使い分け

---

## なぜ重要なのか？

JavaScriptの読み込みと実行は、HTMLのパース（解析）をブロックします。大きなJavaScriptファイルを不適切に読み込むと、ユーザーが白い画面を長時間見ることになります。

**悪い例：**
```html
<head>
  <!-- ❌ bodyの前に大きなJSファイル -->
  <script src="large-library.js"></script>
</head>
<body>
  <!-- ユーザーはJSの読み込みが終わるまで何も見えない -->
  <h1>ようこそ</h1>
</body>
```

---

## 3つの読み込み方式

### 1. 同期的読込（デフォルト）

属性を指定しない場合、JavaScriptは同期的に読み込まれます。

```html
<script src="script.js"></script>
```

**動作の流れ：**

```
HTMLパース中
    ↓
scriptタグに遭遇
    ↓
HTMLパース停止 ⏸️
    ↓
JavaScriptダウンロード
    ↓
JavaScript実行
    ↓
HTMLパース再開 ▶️
```

**問題点：**
- ページの表示が遅れる
- JavaScriptのダウンロード中、ユーザーは何も見えない
- ユーザー体験が悪化

**使う場面：**
- ほぼ使わない（レガシーコード以外）

---

### 2. async属性

非同期にダウンロードし、ダウンロード完了後すぐに実行します。

```html
<script src="script.js" async></script>
```

**動作の流れ：**

```
HTMLパース中 ────────────────────────▶
          ↓
     scriptタグに遭遇
          ↓
     JSダウンロード開始（非同期）
          ↓
HTMLパース継続 ──────────▶ 一時停止 ⏸️
                         ↓
                    JS実行
                         ↓
                  HTMLパース再開 ▶️
```

**特徴：**
- ✅ HTMLパースを止めずにダウンロード
- ✅ ダウンロード完了後すぐに実行
- ❌ 実行順序が保証されない
- ❌ 実行時にHTMLパースは停止

**使う場面：**
- 他のスクリプトに依存しない独立したスクリプト
- Google Analyticsなどの解析ツール
- 広告スクリプト

**実例：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>async の例</title>

  <!-- Google Analytics（独立して動作） -->
  <script src="analytics.js" async></script>
</head>
<body>
  <h1>ようこそ</h1>
  <!-- コンテンツ -->
</body>
</html>
```

---

### 3. defer属性（推奨）

非同期にダウンロードし、HTMLパース完了後に実行します。

```html
<script src="script.js" defer></script>
```

**動作の流れ：**

```
HTMLパース中 ────────────────────────▶ 完了
          ↓                          ↓
     scriptタグに遭遇          DOMContentLoaded前
          ↓                          ↓
     JSダウンロード開始（非同期）    JS実行
          ↓                          ↓
HTMLパース継続 ──────────────▶  DOMContentLoaded
```

**特徴：**
- ✅ HTMLパースを止めずにダウンロード
- ✅ HTMLパース完了後に実行
- ✅ 複数のスクリプトは記述順に実行
- ✅ DOMContentLoadedイベント前に実行

**使う場面：**
- DOM操作が必要なスクリプト（ほとんどの場合）
- 他のスクリプトに依存するスクリプト
- ライブラリとアプリケーションコード

**実例：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>defer の例</title>

  <!-- ライブラリが先に実行される -->
  <script src="library.js" defer></script>
  <!-- アプリケーションコードが後に実行される -->
  <script src="app.js" defer></script>
</head>
<body>
  <div id="app">
    <!-- DOM要素 -->
  </div>
</body>
</html>
```

---

## 比較表

| 特徴 | 通常 | async | defer |
|------|------|-------|-------|
| HTMLパース中断（DL時） | ⏸️ する | しない ✅ | しない ✅ |
| HTMLパース中断（実行時） | ⏸️ する | ⏸️ する | しない ✅ |
| 実行タイミング | 即座 | DL完了後すぐ | HTMLパース後 |
| 実行順序保証 | ✅ ある | ❌ ない | ✅ ある |
| DOM操作 | ⚠️ 位置による | ⚠️ 不確定 | ✅ 安全 |
| 推奨度 | ❌ | △ | ⭐⭐⭐ |

---

## 実践的な使い分け

### パターン1: 基本的なWebサイト（推奨）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>

  <!-- メインのJavaScript（defer推奨） -->
  <script src="main.js" defer></script>

  <!-- 独立した解析ツール（async） -->
  <script src="analytics.js" async></script>
</head>
<body>
  <h1>ようこそ</h1>
  <button id="myButton">クリック</button>
</body>
</html>
```

```javascript
// main.js
// DOMが完全に読み込まれた後に実行されることが保証されている
document.getElementById('myButton').addEventListener('click', () => {
  console.log('ボタンがクリックされました！');
});
```

---

### パターン2: 複数のスクリプトファイル

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>複数スクリプト</title>

  <!-- ⭐ defer を使うと、この順序で実行される -->
  <script src="library.js" defer></script>     <!-- 1番目 -->
  <script src="utils.js" defer></script>       <!-- 2番目 -->
  <script src="app.js" defer></script>         <!-- 3番目 -->
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

```javascript
// library.js
const MyLibrary = {
  version: '1.0.0'
};

// utils.js
// library.jsが先に実行されているので、MyLibraryが存在する
const utils = {
  getVersion() {
    return MyLibrary.version;
  }
};

// app.js
// utils.jsも実行済み
console.log(utils.getVersion()); // "1.0.0"
```

---

### パターン3: 独立したスクリプト

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>独立スクリプト</title>

  <!-- これらは互いに依存しないので async でOK -->
  <script src="google-analytics.js" async></script>
  <script src="facebook-pixel.js" async></script>
  <script src="hotjar.js" async></script>

  <!-- メインアプリは defer -->
  <script src="app.js" defer></script>
</head>
<body>
  <h1>My App</h1>
</body>
</html>
```

---

## DOMContentLoadedとloadイベント

スクリプトの実行タイミングを理解するために、2つの重要なイベントを知っておきましょう。

### DOMContentLoaded

HTMLの解析が完了し、DOMツリーが構築された時点で発火します。

```javascript
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMの準備ができました！');
  // ここでDOM操作が安全にできる
});
```

### load

すべてのリソース（画像、CSS、JavaScriptなど）の読み込みが完了した時点で発火します。

```javascript
window.addEventListener('load', () => {
  console.log('すべてのリソースの読み込みが完了しました！');
  // 画像のサイズ取得などができる
});
```

### イベントの順序

```
HTMLパース開始
    ↓
defer スクリプト実行
    ↓
DOMContentLoaded 🔔
    ↓
画像などのリソース読み込み
    ↓
load 🔔
```

---

## よくある質問

### Q1: deferとasyncはどちらを使うべき？

**A: ほとんどの場合、deferを使いましょう。**

- ✅ **defer**: DOM操作が必要なスクリプト、依存関係があるスクリプト
- △ **async**: 完全に独立した解析ツールや広告スクリプト

### Q2: body の最後に書くのとdeferの違いは？

```html
<!-- パターンA: bodyの最後 -->
<body>
  <div id="app"></div>
  <script src="app.js"></script>
</body>

<!-- パターンB: headにdefer -->
<head>
  <script src="app.js" defer></script>
</head>
<body>
  <div id="app"></div>
</body>
```

**A: deferの方が良い理由：**
- ブラウザが早い段階でJSファイルを発見し、ダウンロードを開始できる
- HTMLのパースと並行してダウンロードが進む
- より高速

### Q3: moduleスクリプトはどうなる？

```html
<script type="module" src="app.js"></script>
```

**A: type="module"は自動的にdeferと同じ動作になります。**
- async を追加することも可能

---

## 実践演習

### 演習1: deferの動作確認

以下のコードを実行して、deferの動作を確認しましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>defer 動作確認</title>

  <script defer>
    console.log('3. defer スクリプト実行');
    console.log('DOMの状態:', document.body ? '利用可能' : '未構築');
  </script>

  <script>
    console.log('1. 通常のスクリプト実行（head内）');
    console.log('DOMの状態:', document.body ? '利用可能' : '未構築');
  </script>
</head>
<body>
  <h1>Hello, World!</h1>

  <script>
    console.log('2. 通常のスクリプト実行（body内）');
    console.log('DOMの状態:', document.body ? '利用可能' : '未構築');
  </script>
</body>
</html>
```

**予想される出力：**
```
1. 通常のスクリプト実行（head内）
DOMの状態: 未構築
2. 通常のスクリプト実行（body内）
DOMの状態: 利用可能
3. defer スクリプト実行
DOMの状態: 利用可能
```

---

### 演習2: 実行順序の確認

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>実行順序の確認</title>

  <script src="first.js" defer></script>
  <script src="second.js" defer></script>
  <script src="third.js" defer></script>
</head>
<body>
  <h1>実行順序テスト</h1>
</body>
</html>
```

```javascript
// first.js
console.log('1. first.js 実行');

// second.js
console.log('2. second.js 実行');

// third.js
console.log('3. third.js 実行');
```

---

## まとめ

### 重要ポイント

1. **defer を基本として使う**
   - DOM操作が必要なほとんどのケース
   - 実行順序が保証される
   - HTMLパースをブロックしない

2. **async は限定的に使う**
   - 完全に独立したスクリプト
   - 解析ツール、広告など

3. **通常の読み込みは避ける**
   - レガシーコード以外では使わない

### チェックリスト

- [ ] defer/asyncの違いを理解した
- [ ] HTMLパースとJavaScript実行の関係を理解した
- [ ] DOMContentLoadedとloadイベントの違いを理解した
- [ ] 実際にコードで動作を確認した
- [ ] 自分のプロジェクトでdeferを使えるようになった

---

## 参考リンク

- [MDN - script要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script)
- [MDN - defer属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script#attr-defer)
- [元記事 - Qiita](https://qiita.com/phanect/items/82c85ea4b8f9c373d684)

---

**次のステップ:** [モジュール（type="module"）](./02_modules.md)
