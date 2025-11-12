# Python基礎編

Pythonプログラミングの基礎となる重要な概念を学びます。

## 📚 学習内容

### 1. [変数とデータ型](./01_variables-and-types.md)
- 変数の定義と命名規則
- 基本的なデータ型（int, float, str, bool）
- 型変換とtype()関数

### 2. [制御構文](./02_control-flow.md)
- 条件分岐（if-elif-else）
- ループ（for文、while文）
- break、continue、else節

### 3. [関数](./03_functions.md)
- 関数の定義と呼び出し
- 引数（位置引数、キーワード引数、デフォルト引数）
- 戻り値とreturn文
- ラムダ式（lambda）

### 4. [例外処理](./04_exceptions.md)
- try-except-finally
- 例外の種類
- raise文による例外の発生
- カスタム例外

## 🎯 学習目標

この章を完了すると、以下のことができるようになります:

- ✅ 変数を定義し、適切なデータ型を使い分けられる
- ✅ if文やループを使って制御フローを書ける
- ✅ 関数を定義して再利用可能なコードを書ける
- ✅ エラーを適切に処理できる

## 💡 Pythonic な書き方のヒント

### PEP 8 に従う

Pythonには公式のコーディング規約「PEP 8」があります。

```python
# Good - PEP 8に従った命名
user_name = "Alice"
total_count = 100

# Bad - Pythonらしくない命名
userName = "Alice"  # キャメルケース（変数には使わない）
TotalCount = 100     # パスカルケース（クラス名用）
```

### インデントはスペース4つ

```python
# Good
def greet(name):
    if name:
        print(f"Hello, {name}!")
    else:
        print("Hello, World!")

# Bad - インデント2つ（Pythonでは推奨されない）
def greet(name):
  if name:
    print(f"Hello, {name}!")
```

### 適切な空行

```python
# Good - 関数間に2行の空行
def function_one():
    pass


def function_two():
    pass


# クラス定義の前後も2行
class MyClass:
    pass
```

## 📝 練習問題

### レベル1: 基礎

1. 自分の名前と年齢を変数に格納し、表示するプログラムを書いてください。
2. 1から10までの数字を出力するプログラムを書いてください。
3. 偶数と奇数を判定する関数を作成してください。

### レベル2: 応用

1. 2つの数値を引数に取り、四則演算の結果を辞書で返す関数を作成してください。
2. リストから最大値を見つける関数を、組み込み関数を使わずに作成してください。
3. FizzBuzz問題: 1から100まで数えて、3の倍数で"Fizz"、5の倍数で"Buzz"、両方の倍数で"FizzBuzz"と表示してください。

### レベル3: チャレンジ

1. ユーザー入力を受け取り、入力が数値かどうか検証し、適切なエラー処理を行うプログラムを書いてください。
2. 再帰関数を使って階乗を計算する関数を作成してください。
3. デコレータの基礎: 関数の実行時間を測定するデコレータを作成してください。

## 🔗 参考リンク

- [Python公式チュートリアル - 制御フロー](https://docs.python.org/ja/3/tutorial/controlflow.html)
- [PEP 8 - Pythonコーディング規約](https://pep8-ja.readthedocs.io/)
- [Python公式ドキュメント - 組み込み型](https://docs.python.org/ja/3/library/stdtypes.html)

## ⏭️ 次のステップ

基礎編を完了したら、[データ構造編](../02_データ構造/README.md)に進みましょう。
