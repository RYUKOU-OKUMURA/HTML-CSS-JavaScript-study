# 変数とデータ型

Pythonの基礎となる変数とデータ型について学びます。

## 📖 変数とは

変数は、データを保存するための「箱」のようなものです。Pythonでは、型宣言なしで変数を作成できます。

### 基本的な変数の定義

```python
# 変数の定義
name = "Alice"
age = 25
height = 165.5
is_student = True

# 変数の内容を表示
print(name)      # Alice
print(age)       # 25
print(height)    # 165.5
print(is_student)  # True
```

### 変数の命名規則

```python
# Good - Pythonらしい命名
user_name = "Bob"
total_count = 100
is_valid = True

# Bad - 推奨されない命名
userName = "Bob"    # キャメルケースは使わない（関数・変数）
UserName = "Bob"    # パスカルケースはクラス名のみ
user-name = "Bob"   # ハイフンは使えない（エラーになる）
2user = "Bob"       # 数字で始められない（エラーになる）
```

**命名ルール:**
- 英字、数字、アンダースコア（_）のみ使用可能
- 数字で始めることはできない
- 予約語（if, for, classなど）は使えない
- 小文字とアンダースコアで単語を区切る（スネークケース）

## 📊 基本的なデータ型

### 1. 整数（int）

```python
# 整数型
x = 10
y = -5
big_number = 1000000

# 型の確認
print(type(x))  # <class 'int'>

# 算術演算
print(10 + 5)   # 15 (加算)
print(10 - 5)   # 5  (減算)
print(10 * 5)   # 50 (乗算)
print(10 / 5)   # 2.0 (除算 - 結果はfloat)
print(10 // 3)  # 3  (整数除算)
print(10 % 3)   # 1  (剰余)
print(2 ** 3)   # 8  (べき乗)
```

### 2. 浮動小数点数（float）

```python
# 浮動小数点数型
pi = 3.14
temperature = -2.5
scientific = 1.5e2  # 150.0

print(type(pi))  # <class 'float'>

# 算術演算
print(3.14 * 2)    # 6.28
print(10.0 / 3)    # 3.3333333333333335
```

### 3. 文字列（str）

```python
# 文字列の定義
name = "Alice"
message = 'Hello, World!'
multiline = """これは
複数行の
文字列です"""

print(type(name))  # <class 'str'>

# 文字列の結合
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)  # John Doe

# 文字列の繰り返し
print("Ha" * 3)  # HaHaHa

# 文字列の長さ
print(len("Hello"))  # 5

# 文字列のメソッド
text = "hello world"
print(text.upper())       # HELLO WORLD
print(text.capitalize())  # Hello world
print(text.replace("world", "Python"))  # hello Python
```

### 4. 真偽値（bool）

```python
# 真偽値
is_active = True
is_deleted = False

print(type(is_active))  # <class 'bool'>

# 比較演算
print(5 > 3)   # True
print(5 < 3)   # False
print(5 == 5)  # True
print(5 != 3)  # True

# 論理演算
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

## 🔄 型変換

### 暗黙的な型変換

```python
# intとfloatの演算 -> floatになる
result = 10 + 3.5
print(result)       # 13.5
print(type(result)) # <class 'float'>
```

### 明示的な型変換

```python
# 文字列から数値へ
age_str = "25"
age = int(age_str)
print(age + 5)  # 30

price_str = "19.99"
price = float(price_str)
print(price * 2)  # 39.98

# 数値から文字列へ
count = 100
count_str = str(count)
print("Count: " + count_str)  # Count: 100

# 真偽値への変換
print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False (空文字列)
print(bool("Hello")) # True
print(bool([]))      # False (空リスト)
print(bool([1, 2]))  # True
```

## 🔍 f文字列（フォーマット文字列）

Python 3.6以降の推奨される文字列フォーマット方法です。

```python
name = "Alice"
age = 25
height = 165.5

# f文字列を使った文字列フォーマット
message = f"My name is {name}. I am {age} years old."
print(message)  # My name is Alice. I am 25 years old.

# 式の埋め込み
print(f"Next year, I will be {age + 1} years old.")
# Next year, I will be 26 years old.

# 小数点以下の桁数指定
print(f"Height: {height:.1f}cm")  # Height: 165.5cm
print(f"Pi: {3.14159:.2f}")       # Pi: 3.14
```

### 従来のフォーマット方法（参考）

```python
# format()メソッド
message = "My name is {}. I am {} years old.".format(name, age)

# %演算子（古い方法）
message = "My name is %s. I am %d years old." % (name, age)
```

**推奨**: f文字列が最も読みやすく、パフォーマンスも良いため、基本的にf文字列を使いましょう。

## 💻 実践例

### 例1: 変数を使った計算

```python
# 消費税計算プログラム
price = 1000
tax_rate = 0.10

tax = price * tax_rate
total = price + tax

print(f"商品価格: {price}円")
print(f"消費税: {tax}円")
print(f"合計: {total}円")
```

**出力:**
```
商品価格: 1000円
消費税: 100.0円
合計: 1100.0円
```

### 例2: 文字列操作

```python
# ユーザー情報の表示
first_name = "太郎"
last_name = "山田"
age = 30

full_name = last_name + " " + first_name
print(f"氏名: {full_name}")
print(f"年齢: {age}歳")
print(f"名前の文字数: {len(full_name)}文字")
```

**出力:**
```
氏名: 山田 太郎
年齢: 30歳
名前の文字数: 4文字
```

### 例3: 型変換の実践

```python
# 入力を受け取って計算する
birth_year = input("生まれた年を入力してください: ")
birth_year = int(birth_year)  # 文字列を整数に変換

current_year = 2024
age = current_year - birth_year

print(f"あなたは{age}歳です")
```

## ⚠️ よくあるエラー

### TypeError: 型の不一致

```python
# エラーになる例
age = 25
message = "I am " + age + " years old."  # TypeError

# 正しい方法1: str()で変換
message = "I am " + str(age) + " years old."

# 正しい方法2: f文字列を使う（推奨）
message = f"I am {age} years old."
```

### ValueError: 変換できない値

```python
# エラーになる例
age = int("twenty-five")  # ValueError: invalid literal for int()

# 正しい方法
age = int("25")  # OK
```

## 🎯 学習チェックポイント

- [ ] 変数を定義し、値を代入できる
- [ ] 変数の命名規則を理解している
- [ ] int, float, str, boolの違いを説明できる
- [ ] type()関数で型を確認できる
- [ ] 型変換（int(), float(), str()）を使える
- [ ] f文字列で変数を埋め込める

## 📝 練習問題

### 問題1: 自己紹介プログラム

以下の変数を定義し、f文字列を使って自己紹介文を表示してください。

```python
name = "あなたの名前"
age = 年齢
hobby = "趣味"

# ここにコードを書く
```

### 問題2: 温度変換

摂氏から華氏に変換するプログラムを書いてください。
公式: 華氏 = 摂氏 × 9/5 + 32

```python
celsius = 25  # 摂氏25度

# ここにコードを書く
# fahrenheitを計算し、結果を表示
```

### 問題3: 型変換の実践

以下のコードを完成させてください。

```python
num_str = "42"
price_str = "19.99"

# num_strを整数に変換してnum_intに代入

# price_strを浮動小数点数に変換してpriceに代入

# num_intとpriceを使って以下を計算
# 「42個の商品を19.99円で買ったときの合計金額」

# 結果をf文字列で表示
```

## 🔗 参考リンク

- [Python公式ドキュメント - 組み込み型](https://docs.python.org/ja/3/library/stdtypes.html)
- [PEP 8 - 命名規則](https://pep8-ja.readthedocs.io/ja/latest/#naming-conventions)
- [Python公式チュートリアル - 文字列](https://docs.python.org/ja/3/tutorial/introduction.html#strings)

## ⏭️ 次のステップ

変数とデータ型を理解したら、次は[制御構文](./02_control-flow.md)を学びましょう。
