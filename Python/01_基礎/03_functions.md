# 関数

再利用可能なコードブロックである関数について学びます。

## 📖 関数とは

関数は、特定の処理をまとめて名前をつけたものです。同じ処理を何度も書く代わりに、関数として定義して呼び出すことができます。

### 基本的な関数の定義

```python
def greet():
    print("Hello, World!")

# 関数の呼び出し
greet()  # Hello, World!
```

### 引数のある関数

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
```

### 戻り値のある関数

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8

# 直接使うこともできる
print(add(10, 20))  # 30
```

## 🎯 引数の種類

### 位置引数

```python
def introduce(name, age):
    print(f"私の名前は{name}で、{age}歳です")

introduce("太郎", 25)  # 私の名前は太郎で、25歳です
```

### キーワード引数

```python
def introduce(name, age):
    print(f"私の名前は{name}で、{age}歳です")

# 引数名を指定して呼び出す
introduce(age=25, name="太郎")  # 順番を変えてもOK
introduce(name="花子", age=30)
```

### デフォルト引数

```python
def greet(name, message="こんにちは"):
    print(f"{message}、{name}さん")

greet("太郎")              # こんにちは、太郎さん
greet("花子", "おはよう")  # おはよう、花子さん
```

### 可変長引数（*args）

```python
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(10, 20, 30, 40)) # 100
```

### キーワード可変長引数（**kwargs）

```python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="太郎", age=25, city="東京")
# 出力:
# name: 太郎
# age: 25
# city: 東京
```

## 📦 複数の戻り値

```python
def calculate(a, b):
    sum_result = a + b
    diff = a - b
    product = a * b
    return sum_result, diff, product

# タプルとして返される
result = calculate(10, 5)
print(result)  # (15, 5, 50)

# 分割代入で受け取る
s, d, p = calculate(10, 5)
print(f"和: {s}, 差: {d}, 積: {p}")
# 和: 15, 差: 5, 積: 50
```

## 🔍 スコープ（変数の有効範囲）

### ローカル変数とグローバル変数

```python
# グローバル変数
global_var = "グローバル"

def my_function():
    # ローカル変数
    local_var = "ローカル"
    print(global_var)  # グローバル変数を参照できる
    print(local_var)

my_function()
print(global_var)  # OK
# print(local_var)  # エラー: ローカル変数は関数外で参照できない
```

### global キーワード

```python
count = 0

def increment():
    global count  # グローバル変数を変更する宣言
    count += 1

increment()
increment()
print(count)  # 2
```

**注意**: global を多用するのは推奨されません。戻り値を使う方が良いコードになります。

## λ ラムダ式（無名関数）

短い関数を1行で定義できます。

```python
# 通常の関数
def square(x):
    return x ** 2

# ラムダ式
square = lambda x: x ** 2

print(square(5))  # 25

# よく使われる例: sorted()のkey引数
students = [
    {"name": "太郎", "score": 85},
    {"name": "花子", "score": 92},
    {"name": "次郎", "score": 78}
]

# スコアでソート
sorted_students = sorted(students, key=lambda s: s["score"])
print(sorted_students)
```

## 💻 実践例

### 例1: 温度変換関数

```python
def celsius_to_fahrenheit(celsius):
    """摂氏を華氏に変換する"""
    return celsius * 9/5 + 32

def fahrenheit_to_celsius(fahrenheit):
    """華氏を摂氏に変換する"""
    return (fahrenheit - 32) * 5/9

# 使用例
print(f"25°C = {celsius_to_fahrenheit(25):.1f}°F")
print(f"77°F = {fahrenheit_to_celsius(77):.1f}°C")
```

### 例2: リストの統計情報

```python
def statistics(numbers):
    """リストの統計情報を返す"""
    if not numbers:
        return None

    total = sum(numbers)
    count = len(numbers)
    average = total / count
    minimum = min(numbers)
    maximum = max(numbers)

    return {
        "合計": total,
        "平均": average,
        "最小": minimum,
        "最大": maximum
    }

scores = [85, 92, 78, 95, 88]
stats = statistics(scores)
print(stats)
# {'合計': 438, '平均': 87.6, '最小': 78, '最大': 95}
```

### 例3: 入力検証関数

```python
def is_valid_email(email):
    """簡易的なメールアドレス検証"""
    if "@" not in email:
        return False
    if "." not in email:
        return False
    if email.startswith("@") or email.endswith("@"):
        return False
    return True

# テスト
print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid.email"))     # False
print(is_valid_email("@example.com"))      # False
```

### 例4: 再帰関数（階乗）

```python
def factorial(n):
    """階乗を計算する（再帰）"""
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5 * 4 * 3 * 2 * 1)
print(factorial(3))  # 6 (3 * 2 * 1)
```

## 📝 ドキュメント文字列（docstring）

関数の説明を書く推奨される方法です。

```python
def calculate_area(width, height):
    """
    長方形の面積を計算する

    Args:
        width (float): 幅
        height (float): 高さ

    Returns:
        float: 面積
    """
    return width * height

# ドキュメントの確認
print(calculate_area.__doc__)
help(calculate_area)
```

## 🎨 Pythonic な関数の書き方

### 1つの関数は1つの責任

```python
# Good - 各関数が1つの役割
def validate_email(email):
    return "@" in email and "." in email

def send_email(email, message):
    if not validate_email(email):
        return False
    # メール送信処理
    return True

# Bad - 複数の責任が混在
def validate_and_send_email(email, message):
    # 検証とメール送信が混在している
    pass
```

### 早期リターン

```python
# Good - 早期リターンで読みやすい
def get_discount(price, is_member):
    if price < 1000:
        return 0
    if is_member:
        return price * 0.2
    return price * 0.1

# Bad - ネストが深い
def get_discount(price, is_member):
    if price >= 1000:
        if is_member:
            return price * 0.2
        else:
            return price * 0.1
    else:
        return 0
```

## ⚠️ よくある間違い

### デフォルト引数にミュータブルな値を使わない

```python
# Bad - リストがデフォルト引数
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))   # ['apple']
print(add_item("banana"))  # ['apple', 'banana'] - 予期しない動作！

# Good - Noneを使う
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

## 🎯 学習チェックポイント

- [ ] def を使って関数を定義できる
- [ ] 引数と戻り値を理解している
- [ ] デフォルト引数を使える
- [ ] *args と **kwargs を理解している
- [ ] ラムダ式を書ける
- [ ] ドキュメント文字列を書ける

## 📝 練習問題

### 問題1: BMI計算

体重（kg）と身長（m）を引数に取り、BMIを計算して返す関数を作成してください。

```python
def calculate_bmi(weight, height):
    # ここにコードを書く
    pass

# テスト
print(calculate_bmi(70, 1.75))  # 約22.86
```

### 問題2: リストのフィルタリング

リストから偶数だけを抽出する関数を作成してください。

```python
def filter_even(numbers):
    # ここにコードを書く
    pass

# テスト
print(filter_even([1, 2, 3, 4, 5, 6]))  # [2, 4, 6]
```

### 問題3: フィボナッチ数列

n番目のフィボナッチ数を返す関数を再帰で実装してください。

```python
def fibonacci(n):
    # ここにコードを書く
    pass

# テスト
print(fibonacci(10))  # 55
```

## 🔗 参考リンク

- [Python公式チュートリアル - 関数の定義](https://docs.python.org/ja/3/tutorial/controlflow.html#defining-functions)
- [PEP 257 - Docstring規約](https://pep257-ja.readthedocs.io/)

## ⏭️ 次のステップ

関数を理解したら、次は[例外処理](./04_exceptions.md)を学びましょう。
