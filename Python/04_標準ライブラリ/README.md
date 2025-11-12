# Python標準ライブラリ編

実践的なPython開発に必要な標準ライブラリの使い方を学びます。

## 📚 学習内容

### 1. [ファイル操作（os, pathlib）](./01_file-operations.md)
- pathlibによるモダンなパス操作
- ファイルの読み書き
- ディレクトリの作成と削除
- ファイル情報の取得

### 2. [日付と時刻（datetime）](./02_datetime.md)
- 日付と時刻の作成
- 日付の計算と比較
- 文字列との相互変換
- タイムゾーンの扱い

### 3. [JSON操作](./03_json.md)
- JSONの読み込みと書き込み
- Pythonオブジェクトとの変換
- カスタムエンコーダー
- エラー処理

### 4. [正規表現（re）](./04_regex.md)
- パターンマッチング
- 文字列の検索と置換
- グループ化とキャプチャ
- よく使うパターン

## 🎯 学習目標

この章を完了すると、以下のことができるようになります:

- ✅ pathlibでファイルパスを扱える
- ✅ datetimeで日付・時刻を操作できる
- ✅ JSONファイルの読み書きができる
- ✅ 正規表現で文字列を処理できる

## 📦 よく使う標準ライブラリ一覧

### ファイル・システム操作
- **pathlib** - オブジェクト指向なパス操作
- **os** - OSレベルの操作
- **shutil** - 高レベルなファイル操作
- **glob** - ファイル名のパターンマッチング

### データ処理
- **json** - JSON形式の処理
- **csv** - CSV形式の処理
- **pickle** - Pythonオブジェクトのシリアライズ
- **collections** - 特殊なコンテナ型

### 日付・時刻
- **datetime** - 日付と時刻の操作
- **time** - 時間関連の関数
- **calendar** - カレンダー関連

### 文字列処理
- **re** - 正規表現
- **string** - 文字列定数とテンプレート
- **textwrap** - テキストの折り返し

### 数学・乱数
- **math** - 数学関数
- **random** - 乱数生成
- **statistics** - 統計関数

### その他
- **sys** - システム固有のパラメータと関数
- **argparse** - コマンドライン引数の解析
- **logging** - ロギング機能

## 💻 実践例

### 例1: ファイル操作の基本

```python
from pathlib import Path

# ファイルパスの作成
file_path = Path("data") / "users.txt"

# ファイルへの書き込み
file_path.write_text("Alice\nBob\nCharlie", encoding="utf-8")

# ファイルの読み込み
content = file_path.read_text(encoding="utf-8")
print(content)

# 行ごとに処理
for line in file_path.read_text().splitlines():
    print(f"ユーザー: {line}")
```

### 例2: JSONファイルの読み書き

```python
import json
from pathlib import Path

# データの作成
users = [
    {"name": "Alice", "age": 25, "email": "alice@example.com"},
    {"name": "Bob", "age": 30, "email": "bob@example.com"}
]

# JSONファイルへの書き込み
file_path = Path("users.json")
file_path.write_text(json.dumps(users, indent=2, ensure_ascii=False))

# JSONファイルの読み込み
loaded_users = json.loads(file_path.read_text())
for user in loaded_users:
    print(f"{user['name']}: {user['email']}")
```

### 例3: 日付の計算

```python
from datetime import datetime, timedelta

# 現在の日時
now = datetime.now()
print(f"現在: {now:%Y年%m月%d日 %H:%M:%S}")

# 7日後
future = now + timedelta(days=7)
print(f"7日後: {future:%Y年%m月%d日}")

# 日付の差
birthday = datetime(2024, 12, 25)
days_until = (birthday - now).days
print(f"あと{days_until}日")
```

### 例4: 正規表現でメール検証

```python
import re

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# テスト
emails = [
    "user@example.com",
    "invalid.email",
    "test@domain.co.jp"
]

for email in emails:
    result = "有効" if is_valid_email(email) else "無効"
    print(f"{email}: {result}")
```

## 🎨 Pythonic な標準ライブラリの使い方

### pathlibを使う（os.pathより推奨）

```python
# Good - pathlib
from pathlib import Path
path = Path("data") / "file.txt"
if path.exists():
    content = path.read_text()

# Old - os.path
import os
path = os.path.join("data", "file.txt")
if os.path.exists(path):
    with open(path) as f:
        content = f.read()
```

### with文でリソース管理

```python
# Good - with文を使う
from pathlib import Path
with open("data.txt", "r") as f:
    content = f.read()

# Bad - 手動でクローズ
f = open("data.txt", "r")
content = f.read()
f.close()  # 忘れる可能性がある
```

### collectionsの活用

```python
from collections import defaultdict, Counter

# defaultdict - キーが存在しない場合のデフォルト値
word_count = defaultdict(int)
for word in ["apple", "banana", "apple"]:
    word_count[word] += 1

# Counter - 要素の出現回数をカウント
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counter = Counter(words)
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]
```

## 📝 練習問題

### レベル1: 基礎

1. テキストファイルを読み込んで行数を数えてください
2. 現在の日時を "YYYY-MM-DD HH:MM:SS" 形式で表示してください
3. 辞書をJSONファイルに保存し、読み込んでください

### レベル2: 応用

1. 指定したディレクトリ内のすべての.txtファイルを一覧表示してください
2. 2つの日付の間の日数を計算してください
3. テキストから電話番号（XXX-XXXX-XXXX形式）を抽出してください

### レベル3: チャレンジ

1. CSVファイルを読み込んで、特定の列でソートして新しいCSVに書き出してください
2. ログファイルから特定のエラーメッセージを含む行を抽出してください
3. 複数のJSONファイルをマージして1つのファイルにしてください

## 🔗 参考リンク

- [Python標準ライブラリ](https://docs.python.org/ja/3/library/)
- [pathlib公式ドキュメント](https://docs.python.org/ja/3/library/pathlib.html)
- [datetime公式ドキュメント](https://docs.python.org/ja/3/library/datetime.html)
- [正規表現HOWTO](https://docs.python.org/ja/3/howto/regex.html)

## ⏭️ 次のステップ

標準ライブラリを学んだら、実践的なプロジェクトに挑戦しましょう！

### プロジェクトアイデア
- ToDoアプリ（JSONでデータ保存）
- ログファイル分析ツール
- 簡単なWebスクレイピング（requestsライブラリ）
- コマンドラインツール（argparse使用）
