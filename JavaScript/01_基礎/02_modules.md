# モジュール（type="module"）

JavaScriptのモジュールシステムを使うと、コードを整理し、スコープを管理し、グローバル変数の衝突を防ぐことができます。

## 📚 学習内容

- モジュールとは何か
- type="module"の使い方
- スコープの隔離
- グローバル変数の衝突を防ぐ方法
- import/exportの基礎

---

## なぜモジュールが必要なのか？

### 問題: グローバル変数の衝突

複数のJavaScriptファイルを読み込むと、変数名が衝突する可能性があります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>変数衝突の例</title>
</head>
<body>
  <h1>変数衝突の問題</h1>

  <script src="common.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

```javascript
// common.js
var userName = '田中太郎';
console.log('common.js:', userName); // "田中太郎"

// app.js
var userName = '佐藤花子'; // ❌ 同じ変数名を再宣言
console.log('app.js:', userName);    // "佐藤花子"
```

**結果：**
```
common.js: 田中太郎
app.js: 佐藤花子
```

`common.js`の`userName`が`app.js`で上書きされてしまいます。これは**グローバルスコープの汚染**と呼ばれる問題です。

---

## 解決策: type="module"

`type="module"`を使うと、各スクリプトファイルが**独自のスコープ**を持つようになります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>モジュールの例</title>
</head>
<body>
  <h1>モジュールで変数衝突を回避</h1>

  <script src="common.js"></script>
  <!-- ✅ type="module" を追加 -->
  <script src="app.js" type="module"></script>
</body>
</html>
```

```javascript
// common.js（通常のスクリプト）
var userName = '田中太郎';
console.log('common.js:', userName); // "田中太郎"

// app.js（モジュール）
var userName = '佐藤花子';
console.log('app.js:', userName);    // "佐藤花子"

// ✅ 衝突しない！各ファイルが独自のスコープを持つ
```

**結果：**
```
common.js: 田中太郎
app.js: 佐藤花子
```

両方の`userName`が正しく動作します。

---

## モジュールの特徴

### 1. 独自のスコープ

モジュール内の変数は、そのモジュール内でのみ有効です。

```javascript
// module1.js
const greeting = 'こんにちは'; // module1.jsのスコープ内のみ

// module2.js
const greeting = 'Hello';      // module2.jsのスコープ内のみ

// ✅ 衝突しない
```

### 2. strictモードが自動適用

モジュールは自動的に`'use strict'`が適用されます。

```javascript
// module.js（type="module"）

// ❌ strictモードでは変数宣言が必須
name = 'JavaScript'; // Error: name is not defined

// ✅ 正しい書き方
const name = 'JavaScript';
```

### 3. defer動作がデフォルト

`type="module"`は自動的に`defer`と同じ動作をします。

```html
<!-- この2つは同じ動作 -->
<script src="app.js" type="module"></script>
<script src="app.js" defer></script>
```

---

## import/export の基礎

モジュール間でコードを共有するには、`export`と`import`を使います。

### 基本的な export/import

```javascript
// utils.js
// ✅ 関数をエクスポート
export function greet(name) {
  return `こんにちは、${name}さん！`;
}

export function add(a, b) {
  return a + b;
}

// 変数もエクスポート可能
export const PI = 3.14159;
```

```javascript
// app.js
// ✅ インポート
import { greet, add, PI } from './utils.js';

console.log(greet('太郎'));  // "こんにちは、太郎さん！"
console.log(add(2, 3));       // 5
console.log(PI);              // 3.14159
```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>import/export の例</title>
</head>
<body>
  <h1>モジュールのインポート</h1>

  <!-- type="module" を指定 -->
  <script type="module" src="app.js"></script>
</body>
</html>
```

---

### default export

各モジュールは1つの`default export`を持つことができます。

```javascript
// calculator.js
export default class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }
}
```

```javascript
// app.js
// default exportは{}なしでインポート
import Calculator from './calculator.js';

const calc = new Calculator();
console.log(calc.add(10, 5));      // 15
console.log(calc.subtract(10, 5)); // 5
```

---

### 名前を変えてインポート

```javascript
// utils.js
export function validateEmail(email) {
  return email.includes('@');
}

// app.js
// "as" で名前を変更
import { validateEmail as checkEmail } from './utils.js';

console.log(checkEmail('test@example.com')); // true
```

---

### すべてをインポート

```javascript
// utils.js
export function greet(name) {
  return `こんにちは、${name}さん`;
}

export function goodbye(name) {
  return `さようなら、${name}さん`;
}

export const APP_NAME = 'MyApp';
```

```javascript
// app.js
// すべてを1つのオブジェクトとしてインポート
import * as utils from './utils.js';

console.log(utils.greet('太郎'));        // "こんにちは、太郎さん"
console.log(utils.goodbye('花子'));      // "さようなら、花子さん"
console.log(utils.APP_NAME);             // "MyApp"
```

---

## 実践例: 実際のプロジェクト構成

### プロジェクト構造

```
my-app/
├── index.html
├── js/
│   ├── app.js          # メインアプリ
│   ├── utils.js        # ユーティリティ関数
│   ├── api.js          # API通信
│   └── components/
│       ├── header.js   # ヘッダーコンポーネント
│       └── footer.js   # フッターコンポーネント
```

---

### index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>モジュールの実践例</title>
</head>
<body>
  <div id="header"></div>
  <main id="content">
    <h1>ようこそ</h1>
  </main>
  <div id="footer"></div>

  <!-- メインアプリのみをロード -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

---

### js/utils.js

```javascript
// ユーティリティ関数をエクスポート
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

---

### js/api.js

```javascript
// API通信の関数
export async function fetchUsers() {
  const response = await fetch('https://api.example.com/users');
  return response.json();
}

export async function fetchUserById(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  return response.json();
}
```

---

### js/components/header.js

```javascript
// ヘッダーコンポーネント
export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <h1>My App</h1>
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  `;
  return header;
}
```

---

### js/components/footer.js

```javascript
import { formatDate } from '../utils.js';

export function createFooter() {
  const footer = document.createElement('footer');
  const today = formatDate(new Date());
  footer.innerHTML = `
    <p>&copy; 2024 My App - 最終更新: ${today}</p>
  `;
  return footer;
}
```

---

### js/app.js

```javascript
// メインアプリケーション
import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { fetchUsers } from './api.js';
import { debounce } from './utils.js';

// ヘッダーとフッターを挿入
document.getElementById('header').appendChild(createHeader());
document.getElementById('footer').appendChild(createFooter());

// ユーザー一覧を取得
async function loadUsers() {
  try {
    const users = await fetchUsers();
    console.log('ユーザー:', users);
  } catch (error) {
    console.error('エラー:', error);
  }
}

// デバウンスされた検索
const debouncedSearch = debounce((query) => {
  console.log('検索:', query);
}, 300);

// アプリ初期化
loadUsers();
```

---

## モジュールの利点

### 1. スコープの隔離

変数やクラスの衝突を防ぎます。

```javascript
// module1.js
const config = { theme: 'dark' };

// module2.js
const config = { theme: 'light' }; // ✅ 衝突しない
```

---

### 2. コードの再利用

共通の関数を複数のファイルで使えます。

```javascript
// utils.js
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// login.js
import { validateEmail } from './utils.js';
// validateEmailを使用

// register.js
import { validateEmail } from './utils.js';
// validateEmailを使用
```

---

### 3. 依存関係の明示

どのモジュールがどのモジュールに依存しているかが明確です。

```javascript
// app.js
import { fetchUsers } from './api.js';
import { createHeader } from './components/header.js';
import { formatDate } from './utils.js';

// この3つのモジュールに依存していることが一目瞭然
```

---

### 4. 保守性の向上

機能ごとにファイルを分割でき、コードが整理されます。

```
js/
├── api/          # API関連
├── components/   # UIコンポーネント
├── utils/        # ユーティリティ
└── app.js        # メイン
```

---

## よくある質問

### Q1: 古いブラウザでも動く？

**A: モダンブラウザでは動作しますが、古いブラウザではサポートされていません。**

**サポート状況：**
- ✅ Chrome 61+
- ✅ Firefox 60+
- ✅ Safari 11+
- ✅ Edge 16+

古いブラウザをサポートする必要がある場合は、Webpack や Vite などのバンドラーを使用します。

---

### Q2: npmのパッケージをimportできる？

**A: ブラウザでは直接importできませんが、バンドラーを使えば可能です。**

```javascript
// ❌ ブラウザでは動かない
import lodash from 'lodash';

// ✅ Webpack/Viteなどを使えば動く
import _ from 'lodash';
```

モダンな開発では、Vite や Webpack を使うのが一般的です。

---

### Q3: 拡張子（.js）は必須？

**A: はい、ブラウザでは拡張子が必須です。**

```javascript
// ❌ 拡張子なしは動かない
import { greet } from './utils';

// ✅ 拡張子を含める
import { greet } from './utils.js';
```

---

## 実践演習

### 演習1: 簡単なモジュールを作る

以下のファイルを作成して、モジュールの動作を確認しましょう。

**math.js:**
```javascript
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

**app.js:**
```javascript
import { add, multiply } from './math.js';

console.log('2 + 3 =', add(2, 3));           // 5
console.log('2 × 3 =', multiply(2, 3));      // 6
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>モジュール演習</title>
</head>
<body>
  <h1>コンソールを開いて結果を確認</h1>
  <script type="module" src="app.js"></script>
</body>
</html>
```

---

### 演習2: クラスをエクスポート

**User.js:**
```javascript
export default class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `こんにちは、${this.name}です。${this.age}歳です。`;
  }
}
```

**app.js:**
```javascript
import User from './User.js';

const user = new User('太郎', 25);
console.log(user.introduce()); // "こんにちは、太郎です。25歳です。"
```

---

## まとめ

### 重要ポイント

1. **type="module"でスコープを隔離**
   - グローバル変数の衝突を防ぐ
   - 各モジュールが独自のスコープを持つ

2. **export/importで共有**
   - 必要な機能だけをエクスポート
   - 明示的にインポート

3. **コードを整理**
   - 機能ごとにファイルを分割
   - 保守性と再利用性が向上

4. **自動的にdefer動作**
   - HTMLパース後に実行される

### チェックリスト

- [ ] type="module"の役割を理解した
- [ ] グローバル変数の衝突問題を理解した
- [ ] export/importの基本を理解した
- [ ] 実際にモジュールを作成して動かした
- [ ] プロジェクトでモジュールを使えるようになった

---

## 参考リンク

- [MDN - JavaScript modules](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)
- [MDN - import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import)
- [MDN - export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export)
- [元記事 - Zenn](https://zenn.dev/kagan/articles/731ca08f45b8c1)

---

**次のステップ:** [ES6基礎知識](./03_es6-basics.md)
