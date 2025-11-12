# ES6基礎知識

ES6（ES2015）は、JavaScriptに多くの新機能を追加した重要なアップデートです。現代のJavaScript開発では必須の知識となっています。

## 📚 学習内容

- let/constによる変数宣言
- アロー関数
- テンプレート文字列
- 分割代入
- スプレッド構文
- デフォルト引数
- クラス構文
- for...ofループ
- Promiseの基礎

---

## 1. let/constによる変数宣言

### 従来の問題: var

`var`には以下の問題がありました：

```javascript
// 問題1: 再宣言が可能
var name = '太郎';
var name = '花子'; // エラーにならない
console.log(name); // "花子"

// 問題2: 関数スコープ（ブロックスコープではない）
if (true) {
  var age = 25;
}
console.log(age); // 25（ifの外でもアクセス可能）

// 問題3: 巻き上げ（hoisting）
console.log(x); // undefined（エラーではない）
var x = 10;
```

---

### let: 再代入可能な変数

```javascript
// ✅ ブロックスコープ
if (true) {
  let age = 25;
  console.log(age); // 25
}
// console.log(age); // ❌ Error: age is not defined

// ✅ 再宣言不可
let name = '太郎';
// let name = '花子'; // ❌ Error: Identifier 'name' has already been declared

// ✅ 再代入は可能
let score = 80;
score = 90;
console.log(score); // 90
```

---

### const: 再代入不可の定数

```javascript
// ✅ 定数の宣言
const PI = 3.14159;
// PI = 3.14; // ❌ Error: Assignment to constant variable

// ✅ オブジェクトのプロパティは変更可能
const user = { name: '太郎', age: 25 };
user.age = 26;          // ✅ OK
user.email = 'a@b.com'; // ✅ OK
console.log(user);      // { name: '太郎', age: 26, email: 'a@b.com' }

// ❌ オブジェクト自体の再代入は不可
// user = { name: '花子' }; // Error

// ✅ 配列の要素は変更可能
const numbers = [1, 2, 3];
numbers.push(4);    // ✅ OK
console.log(numbers); // [1, 2, 3, 4]

// ❌ 配列自体の再代入は不可
// numbers = [5, 6, 7]; // Error
```

---

### 使い分けのルール

```javascript
// ⭐ 基本的にはconstを使う
const userName = '太郎';
const maxRetries = 3;
const colors = ['red', 'green', 'blue'];

// 再代入が必要な場合のみlet
let counter = 0;
counter++;

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += i;
}

// ❌ varは使わない
// var oldStyle = 'これは古いスタイル';
```

---

## 2. アロー関数

### 基本構文

```javascript
// 従来の関数
function add(a, b) {
  return a + b;
}

// ✅ アロー関数
const add = (a, b) => {
  return a + b;
};

// ✅ 1行の場合はreturnを省略可能
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```

---

### さまざまな書き方

```javascript
// 引数が1つの場合、()を省略可能
const double = x => x * 2;
console.log(double(5)); // 10

// 引数がない場合、()が必要
const greet = () => 'こんにちは';
console.log(greet()); // "こんにちは"

// 複数行の場合、{}とreturnが必要
const calculateTotal = (price, tax) => {
  const subtotal = price * tax;
  return subtotal;
};

// オブジェクトを返す場合、()で囲む
const createUser = (name, age) => ({ name, age });
console.log(createUser('太郎', 25)); // { name: '太郎', age: 25 }
```

---

### thisの挙動の違い

アロー関数は独自の`this`を持たず、外側のスコープの`this`を使います。

```javascript
// 従来の関数での問題
const person = {
  name: '太郎',
  hobbies: ['読書', 'ゲーム'],
  showHobbies: function() {
    this.hobbies.forEach(function(hobby) {
      // ❌ thisがpersonを指さない
      console.log(this.name + 'の趣味: ' + hobby);
    });
  }
};

// ✅ アロー関数で解決
const person = {
  name: '太郎',
  hobbies: ['読書', 'ゲーム'],
  showHobbies: function() {
    this.hobbies.forEach(hobby => {
      // ✅ thisがpersonを指す
      console.log(this.name + 'の趣味: ' + hobby);
    });
  }
};

person.showHobbies();
// "太郎の趣味: 読書"
// "太郎の趣味: ゲーム"
```

---

### setTimeoutでの使用例

```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // ✅ アロー関数でthisを維持
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds + '秒');
    }, 1000);
  }
}

const timer = new Timer();
timer.start(); // 1秒, 2秒, 3秒...
```

---

## 3. テンプレート文字列

### 基本的な使い方

```javascript
// 従来の文字列連結
const name = '太郎';
const age = 25;
const message = 'こんにちは、' + name + 'さん。' + age + '歳ですね。';

// ✅ テンプレート文字列（バックティック `）
const message = `こんにちは、${name}さん。${age}歳ですね。`;
console.log(message); // "こんにちは、太郎さん。25歳ですね。"
```

---

### 式の埋め込み

```javascript
const price = 1000;
const tax = 0.1;

// ✅ 計算式を埋め込める
const total = `合計: ${price * (1 + tax)}円`;
console.log(total); // "合計: 1100円"

// ✅ 関数呼び出しも可能
const formatPrice = (price) => `¥${price.toLocaleString()}`;
const message = `価格: ${formatPrice(123456)}`;
console.log(message); // "価格: ¥123,456"
```

---

### 複数行の文字列

```javascript
// 従来の方法
const html = '<div>\n' +
             '  <h1>タイトル</h1>\n' +
             '  <p>本文</p>\n' +
             '</div>';

// ✅ テンプレート文字列（改行がそのまま使える）
const html = `
<div>
  <h1>タイトル</h1>
  <p>本文</p>
</div>
`;
```

---

## 4. 分割代入

### 配列の分割代入

```javascript
// 従来の方法
const colors = ['red', 'green', 'blue'];
const first = colors[0];
const second = colors[1];

// ✅ 分割代入
const [first, second, third] = ['red', 'green', 'blue'];
console.log(first);  // "red"
console.log(second); // "green"
console.log(third);  // "blue"

// 一部だけ取得
const [primary, , tertiary] = ['red', 'green', 'blue'];
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// デフォルト値
const [a, b, c = 'yellow'] = ['red', 'green'];
console.log(c); // "yellow"
```

---

### オブジェクトの分割代入

```javascript
const user = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com'
};

// 従来の方法
const name = user.name;
const age = user.age;

// ✅ 分割代入
const { name, age, email } = user;
console.log(name);  // "太郎"
console.log(age);   // 25
console.log(email); // "taro@example.com"

// 別名をつける
const { name: userName, age: userAge } = user;
console.log(userName); // "太郎"
console.log(userAge);  // 25

// デフォルト値
const { name, age, country = '日本' } = user;
console.log(country); // "日本"
```

---

### 関数の引数での分割代入

```javascript
// オブジェクトを引数で受け取る
function showUser({ name, age, email }) {
  console.log(`名前: ${name}`);
  console.log(`年齢: ${age}`);
  console.log(`メール: ${email}`);
}

const user = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com'
};

showUser(user);
// 名前: 太郎
// 年齢: 25
// メール: taro@example.com

// デフォルト値も設定可能
function createUser({ name, age = 20, country = '日本' }) {
  return { name, age, country };
}

console.log(createUser({ name: '花子' }));
// { name: '花子', age: 20, country: '日本' }
```

---

## 5. スプレッド構文

### 配列のスプレッド

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 従来の方法
const combined = arr1.concat(arr2);

// ✅ スプレッド構文
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 配列の複製
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3]（変更されない）
console.log(copy);     // [1, 2, 3, 4]

// 配列の展開
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers)); // 5
```

---

### オブジェクトのスプレッド

```javascript
const user = { name: '太郎', age: 25 };
const address = { city: '東京', country: '日本' };

// ✅ オブジェクトの結合
const userWithAddress = { ...user, ...address };
console.log(userWithAddress);
// { name: '太郎', age: 25, city: '東京', country: '日本' }

// オブジェクトの複製と一部変更
const updatedUser = { ...user, age: 26 };
console.log(updatedUser); // { name: '太郎', age: 26 }

// プロパティの上書き
const defaults = { theme: 'light', language: 'ja' };
const userSettings = { theme: 'dark' };
const settings = { ...defaults, ...userSettings };
console.log(settings); // { theme: 'dark', language: 'ja' }
```

---

## 6. デフォルト引数

```javascript
// 従来の方法
function greet(name) {
  name = name || 'ゲスト';
  return 'こんにちは、' + name + 'さん';
}

// ✅ デフォルト引数
function greet(name = 'ゲスト') {
  return `こんにちは、${name}さん`;
}

console.log(greet('太郎')); // "こんにちは、太郎さん"
console.log(greet());       // "こんにちは、ゲストさん"

// 複数のデフォルト引数
function createUser(name, age = 20, country = '日本') {
  return { name, age, country };
}

console.log(createUser('太郎'));
// { name: '太郎', age: 20, country: '日本' }

console.log(createUser('花子', 25));
// { name: '花子', age: 25, country: '日本' }
```

---

## 7. クラス構文

### 基本的なクラス

```javascript
// ✅ クラスの定義
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `こんにちは、${this.name}です。${this.age}歳です。`;
  }

  haveBirthday() {
    this.age++;
  }
}

// インスタンスの作成
const user = new User('太郎', 25);
console.log(user.introduce()); // "こんにちは、太郎です。25歳です。"

user.haveBirthday();
console.log(user.introduce()); // "こんにちは、太郎です。26歳です。"
```

---

### 継承

```javascript
// 親クラス
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name}が鳴いています`;
  }
}

// ✅ 子クラス（継承）
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 親クラスのコンストラクタを呼び出す
    this.breed = breed;
  }

  speak() {
    return `${this.name}がワンワン！`;
  }

  getBreed() {
    return `犬種: ${this.breed}`;
  }
}

const dog = new Dog('ポチ', '柴犬');
console.log(dog.speak());    // "ポチがワンワン！"
console.log(dog.getBreed()); // "犬種: 柴犬"
```

---

## 8. for...ofループ

```javascript
const colors = ['red', 'green', 'blue'];

// 従来のforループ
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// forEachメソッド
colors.forEach(color => {
  console.log(color);
});

// ✅ for...ofループ（最も読みやすい）
for (const color of colors) {
  console.log(color);
}
// "red"
// "green"
// "blue"

// 文字列にも使える
for (const char of 'Hello') {
  console.log(char);
}
// "H" "e" "l" "l" "o"
```

---

## 9. Promiseの基礎

### Promiseとは

非同期処理を扱うためのオブジェクトです。

```javascript
// Promiseの作成
const promise = new Promise((resolve, reject) => {
  // 非同期処理
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve('成功しました！'); // 成功時
    } else {
      reject('エラーが発生しました'); // 失敗時
    }
  }, 1000);
});

// Promiseの使用
promise
  .then(result => {
    console.log(result); // "成功しました！"
  })
  .catch(error => {
    console.error(error);
  });
```

---

### 実践例: データ取得

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: '太郎' },
        2: { id: 2, name: '花子' }
      };

      const user = users[id];

      if (user) {
        resolve(user);
      } else {
        reject('ユーザーが見つかりません');
      }
    }, 1000);
  });
}

// 使用例
fetchUser(1)
  .then(user => {
    console.log('ユーザー:', user.name);
    return fetchUser(2); // チェーン
  })
  .then(user => {
    console.log('ユーザー:', user.name);
  })
  .catch(error => {
    console.error('エラー:', error);
  });
```

---

## 実践演習

### 演習1: ES6の機能を組み合わせる

```javascript
// ユーザークラスを作成
class User {
  constructor({ name, age, email }) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  getProfile() {
    return `
      名前: ${this.name}
      年齢: ${this.age}歳
      メール: ${this.email}
    `;
  }
}

// ユーザーを作成
const users = [
  new User({ name: '太郎', age: 25, email: 'taro@example.com' }),
  new User({ name: '花子', age: 23, email: 'hanako@example.com' }),
  new User({ name: '次郎', age: 30, email: 'jiro@example.com' })
];

// for...ofで全ユーザーを表示
for (const user of users) {
  console.log(user.getProfile());
}
```

---

### 演習2: データ処理

```javascript
// 商品データ
const products = [
  { id: 1, name: 'ノートPC', price: 100000 },
  { id: 2, name: 'マウス', price: 3000 },
  { id: 3, name: 'キーボード', price: 8000 }
];

// 分割代入とスプレッド構文で価格を更新
const updatePrice = (product, discount = 0) => ({
  ...product,
  price: product.price * (1 - discount),
  discounted: discount > 0
});

// アロー関数とmap
const discountedProducts = products.map(product =>
  updatePrice(product, 0.1)
);

console.log(discountedProducts);
```

---

## まとめ

### ES6の主要機能

1. **let/const** - 適切なスコープ管理
2. **アロー関数** - 簡潔な関数定義とthisの扱い
3. **テンプレート文字列** - 読みやすい文字列
4. **分割代入** - データの取り出しが簡単
5. **スプレッド構文** - 配列・オブジェクトの操作
6. **クラス** - オブジェクト指向プログラミング
7. **for...of** - 読みやすいループ
8. **Promise** - 非同期処理の管理

### チェックリスト

- [ ] let/constを使い分けられる
- [ ] アロー関数を書ける
- [ ] テンプレート文字列を使える
- [ ] 分割代入を理解した
- [ ] スプレッド構文を使える
- [ ] クラスを定義できる
- [ ] for...ofループを使える
- [ ] Promiseの基本を理解した

---

## 参考リンク

- [MDN - JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [ES6の基礎知識 - Qiita](https://qiita.com/soarflat/items/b251caf9cb59b72beb9b)
- [JavaScript.info](https://ja.javascript.info/)

---

**次のステップ:** [非同期処理編](../02_非同期処理/README.md)
