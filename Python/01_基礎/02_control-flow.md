# 制御構文

プログラムの流れを制御する条件分岐とループについて学びます。

## 📖 条件分岐（if文）

### 基本的なif文

```python
age = 20

if age >= 18:
    print("あなたは成人です")
```

### if-else文

```python
age = 15

if age >= 18:
    print("あなたは成人です")
else:
    print("あなたは未成年です")
```

### if-elif-else文

```python
score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"あなたの成績は{grade}です")
```

## 🔁 ループ（繰り返し）

### for文 - リストやrangeで繰り返し

```python
# リストの要素を1つずつ処理
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 出力:
# apple
# banana
# cherry
```

### range()関数

```python
# 0から4まで（5は含まない）
for i in range(5):
    print(i)
# 出力: 0 1 2 3 4

# 1から5まで
for i in range(1, 6):
    print(i)
# 出力: 1 2 3 4 5

# 2ずつ増加
for i in range(0, 10, 2):
    print(i)
# 出力: 0 2 4 6 8
```

### while文 - 条件が真の間繰り返し

```python
count = 0

while count < 5:
    print(f"Count: {count}")
    count += 1

# 出力:
# Count: 0
# Count: 1
# Count: 2
# Count: 3
# Count: 4
```

## 🛑 break と continue

### break - ループを抜ける

```python
# 特定の条件でループを終了
for i in range(10):
    if i == 5:
        break
    print(i)

# 出力: 0 1 2 3 4
```

### continue - 次の繰り返しへスキップ

```python
# 偶数だけ表示
for i in range(10):
    if i % 2 != 0:  # 奇数の場合
        continue
    print(i)

# 出力: 0 2 4 6 8
```

### else節 - ループが正常終了したとき

```python
# breakされなかった場合にelse節が実行される
for i in range(5):
    print(i)
else:
    print("ループが正常に完了しました")

# 出力:
# 0 1 2 3 4
# ループが正常に完了しました

# breakされた場合はelse節は実行されない
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("この行は実行されません")

# 出力: 0 1 2
```

## 💻 実践例

### 例1: FizzBuzz

```python
# 1から20までの数字で、3の倍数なら"Fizz"、5の倍数なら"Buzz"、
# 両方の倍数なら"FizzBuzz"を表示

for num in range(1, 21):
    if num % 15 == 0:  # 3と5の両方で割り切れる
        print("FizzBuzz")
    elif num % 3 == 0:
        print("Fizz")
    elif num % 5 == 0:
        print("Buzz")
    else:
        print(num)
```

### 例2: リストから要素を検索

```python
names = ["Alice", "Bob", "Charlie", "David"]
search_name = "Charlie"

for name in names:
    if name == search_name:
        print(f"{search_name}が見つかりました！")
        break
else:
    print(f"{search_name}は見つかりませんでした")
```

### 例3: 入力検証ループ

```python
# 正しい入力があるまで繰り返し
while True:
    user_input = input("1から10の数字を入力してください: ")

    try:
        num = int(user_input)
        if 1 <= num <= 10:
            print(f"あなたが選んだ数字は{num}です")
            break
        else:
            print("1から10の範囲で入力してください")
    except ValueError:
        print("数字を入力してください")
```

### 例4: 九九の表

```python
# 九九の表を作成
for i in range(1, 10):
    for j in range(1, 10):
        result = i * j
        print(f"{result:3}", end=" ")  # 3桁で表示、改行なし
    print()  # 行の終わりで改行
```

## 🎨 Pythonic な書き方

### リスト内包表記（後で詳しく学習）

```python
# 通常のfor文
squares = []
for i in range(10):
    squares.append(i ** 2)

# Pythonicな書き方
squares = [i ** 2 for i in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### enumerate() - インデックスと値を同時に取得

```python
fruits = ["apple", "banana", "cherry"]

# 通常のfor文
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# Pythonicな書き方
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# 出力:
# 0: apple
# 1: banana
# 2: cherry
```

### zip() - 複数のリストを同時にループ

```python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name}は{age}歳です")

# 出力:
# Aliceは25歳です
# Bobは30歳です
# Charlieは35歳です
```

## ⚠️ よくある間違い

### インデントエラー

```python
# エラー: インデントが必要
if age >= 18:
print("成人です")  # IndentationError

# 正しい
if age >= 18:
    print("成人です")
```

### 無限ループ

```python
# 注意: 終了条件がないとプログラムが止まらない
count = 0
while count < 10:
    print(count)
    # count += 1 を忘れると無限ループ
```

### range()の範囲

```python
# range(5)は0から4まで（5は含まない）
for i in range(5):
    print(i)
# 出力: 0 1 2 3 4

# 1から5を含めるにはrange(1, 6)
for i in range(1, 6):
    print(i)
# 出力: 1 2 3 4 5
```

## 🎯 学習チェックポイント

- [ ] if-elif-elseを使った条件分岐が書ける
- [ ] for文でリストやrangeを繰り返せる
- [ ] while文で条件に基づいたループが書ける
- [ ] breakとcontinueの違いを理解している
- [ ] enumerate()とzip()を使える
- [ ] ネストしたループを書ける

## 📝 練習問題

### 問題1: 偶数・奇数判定

1から30までの数字をループで表示し、偶数なら"Even"、奇数なら"Odd"と表示してください。

```python
# ここにコードを書く
```

### 問題2: 合計値の計算

リストの数値の合計を計算してください（sum()関数を使わずに）。

```python
numbers = [10, 20, 30, 40, 50]
# ここにコードを書く
```

### 問題3: パスワード検証

以下の条件を満たすパスワード検証プログラムを作成してください:
- 長さが8文字以上
- 数字が含まれている

```python
password = "password123"

# ここに検証ロジックを書く
# 条件を満たしていれば"有効なパスワード"
# 満たしていなければエラーメッセージを表示
```

### 問題4: 九九の計算練習

ランダムな掛け算の問題を出題し、ユーザーの答えを確認するプログラムを作成してください。

```python
import random

# 1から9までのランダムな数を2つ生成
a = random.randint(1, 9)
b = random.randint(1, 9)

# ここにコードを書く
# ユーザーに問題を出して、正解・不正解を判定
```

## 🔗 参考リンク

- [Python公式チュートリアル - 制御フロー](https://docs.python.org/ja/3/tutorial/controlflow.html)
- [Python公式ドキュメント - enumerate()](https://docs.python.org/ja/3/library/functions.html#enumerate)
- [Python公式ドキュメント - zip()](https://docs.python.org/ja/3/library/functions.html#zip)

## ⏭️ 次のステップ

制御構文を理解したら、次は[関数](./03_functions.md)を学びましょう。
