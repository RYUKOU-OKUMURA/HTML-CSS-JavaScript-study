# 例外処理

エラーを適切に処理する方法について学びます。

## 📖 例外とは

プログラム実行中に発生するエラーのことを「例外」と呼びます。例外を適切に処理することで、プログラムがクラッシュするのを防ぐことができます。

## 🛡️ try-except 基本

### 基本的な例外処理

```python
try:
    # エラーが発生する可能性のあるコード
    num = int(input("数字を入力してください: "))
    result = 100 / num
    print(f"結果: {result}")
except:
    # エラーが発生した場合の処理
    print("エラーが発生しました")
```

### 特定の例外を捕捉

```python
try:
    num = int(input("数字を入力してください: "))
    result = 100 / num
    print(f"結果: {result}")
except ValueError:
    print("数値を入力してください")
except ZeroDivisionError:
    print("ゼロで割ることはできません")
```

### 例外オブジェクトの取得

```python
try:
    num = int("abc")
except ValueError as e:
    print(f"エラー: {e}")
    # エラー: invalid literal for int() with base 10: 'abc'
```

## 🔄 try-except-else-finally

### else節 - エラーが発生しなかった場合

```python
try:
    num = int(input("数字を入力してください: "))
    result = 100 / num
except ValueError:
    print("数値を入力してください")
except ZeroDivisionError:
    print("ゼロで割ることはできません")
else:
    # 例外が発生しなかった場合のみ実行
    print(f"結果: {result}")
```

### finally節 - 必ず実行される

```python
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("ファイルが見つかりません")
else:
    print("ファイル読み込み成功")
finally:
    # エラーの有無に関わらず実行される
    # ファイルのクローズなどに使用
    try:
        file.close()
    except:
        pass
    print("処理を終了します")
```

**より良い方法**: with文を使う（後述）

## 📋 主な例外の種類

### ValueError - 不適切な値

```python
try:
    age = int("twenty")
except ValueError:
    print("数値に変換できません")
```

### ZeroDivisionError - ゼロ除算

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("ゼロで割ることはできません")
```

### TypeError - 型エラー

```python
try:
    result = "10" + 5
except TypeError:
    print("文字列と数値は結合できません")
```

### IndexError - インデックス範囲外

```python
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError:
    print("リストの範囲外です")
```

### KeyError - 存在しないキー

```python
try:
    user = {"name": "Alice", "age": 25}
    print(user["email"])
except KeyError:
    print("指定されたキーが存在しません")
```

### FileNotFoundError - ファイルが存在しない

```python
try:
    with open("missing.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("ファイルが見つかりません")
```

## 🎯 raise - 例外を発生させる

### 例外を発生させる

```python
def divide(a, b):
    if b == 0:
        raise ValueError("割る数は0にできません")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(f"エラー: {e}")
```

### 例外の再送出

```python
try:
    num = int(input("正の数を入力してください: "))
    if num < 0:
        raise ValueError("負の数は無効です")
except ValueError as e:
    print(f"エラー: {e}")
    raise  # 例外を再度発生させる
```

## 🔨 カスタム例外

独自の例外クラスを定義できます。

```python
class InvalidAgeError(Exception):
    """年齢が無効な場合の例外"""
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("年齢は0以上でなければなりません")
    if age > 150:
        raise InvalidAgeError("年齢は150以下でなければなりません")
    return age

try:
    user_age = set_age(-5)
except InvalidAgeError as e:
    print(f"エラー: {e}")
```

## 💻 実践例

### 例1: 安全な数値入力

```python
def get_integer_input(prompt):
    """
    整数入力を受け取る（エラー処理付き）
    """
    while True:
        try:
            value = int(input(prompt))
            return value
        except ValueError:
            print("整数を入力してください")

# 使用例
age = get_integer_input("年齢を入力してください: ")
print(f"あなたは{age}歳です")
```

### 例2: ファイル読み込みの安全な実装

```python
def read_file_safely(filename):
    """
    ファイルを安全に読み込む
    """
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"エラー: {filename} が見つかりません")
        return None
    except PermissionError:
        print(f"エラー: {filename} を読み込む権限がありません")
        return None
    except Exception as e:
        print(f"予期しないエラーが発生しました: {e}")
        return None

# 使用例
content = read_file_safely("data.txt")
if content:
    print(content)
```

### 例3: リトライロジック

```python
def fetch_data_with_retry(max_retries=3):
    """
    失敗時にリトライする処理
    """
    for attempt in range(max_retries):
        try:
            # データ取得処理（例）
            result = risky_operation()
            return result
        except ConnectionError:
            if attempt < max_retries - 1:
                print(f"接続失敗。リトライします... ({attempt + 1}/{max_retries})")
            else:
                print("最大リトライ回数に達しました")
                raise

def risky_operation():
    # 実際の処理（例）
    import random
    if random.random() < 0.7:  # 70%の確率で失敗
        raise ConnectionError("接続に失敗しました")
    return "データ取得成功"
```

### 例4: バリデーション付きユーザー登録

```python
class UserRegistrationError(Exception):
    """ユーザー登録エラー"""
    pass

def register_user(username, email, age):
    """
    ユーザー登録（バリデーション付き）
    """
    try:
        # ユーザー名のバリデーション
        if len(username) < 3:
            raise UserRegistrationError("ユーザー名は3文字以上必要です")

        # メールアドレスのバリデーション
        if "@" not in email:
            raise UserRegistrationError("有効なメールアドレスを入力してください")

        # 年齢のバリデーション
        age = int(age)
        if age < 13:
            raise UserRegistrationError("13歳以上でなければ登録できません")

        # 登録処理（ここでは省略）
        return {"username": username, "email": email, "age": age}

    except ValueError:
        raise UserRegistrationError("年齢は数値で入力してください")

# 使用例
try:
    user = register_user("太郎", "taro@example.com", "25")
    print(f"登録成功: {user}")
except UserRegistrationError as e:
    print(f"登録失敗: {e}")
```

## 🎨 with文 - コンテキストマネージャ

ファイル操作などでリソースを確実に解放する推奨される方法です。

```python
# Good - with文を使う
with open("data.txt", "r") as f:
    content = f.read()
    print(content)
# ファイルは自動的にクローズされる

# Bad - 手動でクローズ（finallyを忘れるリスク）
f = open("data.txt", "r")
try:
    content = f.read()
    print(content)
finally:
    f.close()
```

## ⚠️ アンチパターン

### 広すぎる例外捕捉

```python
# Bad - すべての例外を捕捉
try:
    risky_operation()
except:
    pass  # エラーを無視するのは危険

# Good - 特定の例外のみ捕捉
try:
    risky_operation()
except ValueError:
    handle_value_error()
except TypeError:
    handle_type_error()
```

### 例外の黙殺

```python
# Bad
try:
    important_operation()
except Exception:
    pass  # エラーを無視

# Good - 最低限ログを残す
try:
    important_operation()
except Exception as e:
    print(f"エラー: {e}")
    # またはロギング
```

## 🎯 学習チェックポイント

- [ ] try-except で例外を処理できる
- [ ] 特定の例外を捕捉できる
- [ ] else節とfinally節の使い分けがわかる
- [ ] raiseで例外を発生させられる
- [ ] カスタム例外を定義できる
- [ ] with文を使ってリソースを管理できる

## 📝 練習問題

### 問題1: 安全な割り算

ゼロ除算エラーを処理する関数を作成してください。

```python
def safe_divide(a, b):
    # ここにコードを書く
    pass

# テスト
print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # エラーメッセージを表示してNoneを返す
```

### 問題2: リスト要素の安全な取得

範囲外のインデックスを処理する関数を作成してください。

```python
def safe_get(lst, index, default=None):
    # ここにコードを書く
    pass

# テスト
numbers = [1, 2, 3]
print(safe_get(numbers, 1))    # 2
print(safe_get(numbers, 10))   # None
print(safe_get(numbers, 10, 0))  # 0
```

### 問題3: ユーザー入力の検証

以下の条件を満たす関数を作成してください:
- 1から100の整数を受け付ける
- 範囲外または数値以外の入力はエラー

```python
def get_valid_number():
    # ここにコードを書く
    # 正しい入力があるまで繰り返し
    pass

# テスト
number = get_valid_number()
print(f"入力された数値: {number}")
```

## 🔗 参考リンク

- [Python公式チュートリアル - エラーと例外](https://docs.python.org/ja/3/tutorial/errors.html)
- [Python公式ドキュメント - 組み込み例外](https://docs.python.org/ja/3/library/exceptions.html)
- [PEP 343 - with文](https://www.python.org/dev/peps/pep-0343/)

## ⏭️ 次のステップ

基礎編を完了したら、次は[データ構造編](../02_データ構造/README.md)を学びましょう。
