# モダンPython学習ガイド

このガイドは、Python 3.8以降のモダンなPython開発を学ぶための教科書的な資料です。初学者から中級者まで、段階的に学習できるように構成されています。

## 📚 学習の進め方

このガイドは以下の順序で学習することを推奨します:

1. **基礎編** - Pythonの基本文法とプログラミングの基礎
2. **データ構造編** - リスト、辞書、タプル、セットの使い方
3. **オブジェクト指向編** - クラス、継承、ポリモーフィズム
4. **標準ライブラリ編** - よく使う標準ライブラリの活用

## 📖 目次

### 1. 基礎編

Pythonプログラミングの基礎となる知識を学びます。

- [基礎編概要](./01_基礎/README.md)
- [変数とデータ型](./01_基礎/01_variables-and-types.md)
- [制御構文](./01_基礎/02_control-flow.md)
- [関数](./01_基礎/03_functions.md)
- [例外処理](./01_基礎/04_exceptions.md)

**学習内容:**
- 変数の定義と基本的なデータ型（int, float, str, bool）
- 条件分岐（if-elif-else）とループ（for, while）
- 関数の定義と引数（位置引数、キーワード引数、デフォルト引数）
- 例外処理（try-except-finally）
- Pythonic な書き方の基礎

---

### 2. データ構造編

Pythonの強力なデータ構造を深く理解します。

- [データ構造概要](./02_データ構造/README.md)
- [リスト（List）](./02_データ構造/01_lists.md)
- [辞書（Dictionary）](./02_データ構造/02_dictionaries.md)
- [タプルとセット](./02_データ構造/03_tuples-and-sets.md)
- [内包表記](./02_データ構造/04_comprehensions.md)

**学習内容:**
- リストの操作とメソッド
- 辞書によるキーと値のマッピング
- タプルとセットの使い分け
- リスト内包表記、辞書内包表記
- イテレータとジェネレータの基礎

---

### 3. オブジェクト指向編

Pythonのオブジェクト指向プログラミングを学びます。

- [オブジェクト指向概要](./03_オブジェクト指向/README.md)
- [クラスとインスタンス](./03_オブジェクト指向/01_classes.md)
- [継承とポリモーフィズム](./03_オブジェクト指向/02_inheritance.md)
- [特殊メソッド](./03_オブジェクト指向/03_special-methods.md)
- [プロパティとデコレータ](./03_オブジェクト指向/04_properties.md)

**学習内容:**
- クラスの定義とインスタンスの生成
- 継承による機能拡張
- 特殊メソッド（`__init__`, `__str__`, `__repr__`など）
- @propertyデコレータの使い方
- クラスメソッドと静的メソッド

---

### 4. 標準ライブラリ編

実践的なPython開発に必要な標準ライブラリを学びます。

- [標準ライブラリ概要](./04_標準ライブラリ/README.md)
- [ファイル操作（os, pathlib）](./04_標準ライブラリ/01_file-operations.md)
- [日付と時刻（datetime）](./04_標準ライブラリ/02_datetime.md)
- [JSON操作](./04_標準ライブラリ/03_json.md)
- [正規表現（re）](./04_標準ライブラリ/04_regex.md)

**学習内容:**
- pathlibによるモダンなファイルパス操作
- datetimeモジュールで日付・時刻を扱う
- JSONデータの読み書き
- 正規表現によるパターンマッチング
- コレクションモジュール（defaultdict, Counter）

---

## 🎯 学習目標

このガイドを完了すると、以下のスキルが身につきます:

- ✅ Pythonの基本文法を理解し、簡単なプログラムを書ける
- ✅ リスト、辞書などのデータ構造を適切に使い分けられる
- ✅ クラスを使ったオブジェクト指向プログラミングができる
- ✅ 標準ライブラリを活用して実践的なコードが書ける
- ✅ Pythonic なコードスタイルを身につけられる

## 💻 実装サンプル

各トピックには実装可能なサンプルコードが含まれています。実際に動かして理解を深めましょう。

### サンプルの実行方法

```bash
# Pythonのインストール確認
python3 --version

# サンプルコードの実行
python3 sample.py

# インタラクティブシェルで試す
python3
>>> print("Hello, Python!")
```

## 📝 学習のヒント

### 1. コードを実際に書く

読むだけでなく、必ず自分で書いて動かしましょう。エラーに遭遇することも重要な学習です。

### 2. 対話型シェル（REPL）を活用

Pythonの対話型シェルで小さなコードを試しながら学ぶと理解が深まります。

```bash
python3
>>> # ここで試しに色々なコードを実行してみよう
```

### 3. 小さく始めて段階的に

最初から完璧を目指さず、まず動くものを作り、徐々に改善していきましょう。

### 4. 公式ドキュメントを読む習慣

Pythonの公式ドキュメントは非常に充実しています。わからないことがあればまず公式ドキュメントを確認しましょう。

## 🔧 推奨される開発環境

### エディタ・IDE
- **VS Code**（推奨） - 軽量で拡張機能が豊富
- **PyCharm** - Python専用IDE、プロフェッショナル向け
- **Cursor** - AI統合エディタ
- **Jupyter Notebook** - データ分析・学習に最適

### 便利な拡張機能（VS Code）
- **Python** - Microsoft公式のPython拡張
- **Pylance** - 高速な言語サーバー
- **autopep8** または **Black** - コードフォーマッター
- **Pylint** または **Flake8** - コード品質チェック

### Pythonのバージョン管理
- **pyenv** - 複数のPythonバージョンを管理
- **venv** - 仮想環境の作成（標準ライブラリ）

```bash
# 仮想環境の作成
python3 -m venv myenv

# 仮想環境の有効化（macOS/Linux）
source myenv/bin/activate

# 仮想環境の有効化（Windows）
myenv\Scripts\activate
```

## 📚 参考リソース

### 公式ドキュメント
- [Python公式ドキュメント（日本語）](https://docs.python.org/ja/3/) - 最も信頼できるリファレンス
- [PEP 8](https://pep8-ja.readthedocs.io/) - Pythonコーディング規約

### オンライン学習
- [Python.org チュートリアル](https://docs.python.org/ja/3/tutorial/)
- [Real Python](https://realpython.com/) - 実践的なチュートリアル（英語）
- [PyQ](https://pyq.jp/) - Python専門のオンライン学習プラットフォーム

### 書籍
- 「入門 Python 3」- Bill Lubanovic著
- 「Effective Python」- Brett Slatkin著
- 「退屈なことはPythonにやらせよう」- Al Sweigart著

### ツール
- [Python Tutor](https://pythontutor.com/) - コードの実行を視覚化
- [PEP 8 オンラインチェッカー](http://pep8online.com/) - コードスタイルチェック

## 🎓 学習チェックリスト

### 基礎編
- [ ] 変数とデータ型を理解している
- [ ] if文、for文、while文を使える
- [ ] 関数を定義できる
- [ ] 例外処理（try-except）を使える
- [ ] Pythonic な書き方を意識できる

### データ構造編
- [ ] リストの操作（追加、削除、スライス）ができる
- [ ] 辞書を使ってデータを管理できる
- [ ] タプルとセットの違いを理解している
- [ ] リスト内包表記を使える
- [ ] イテレータの概念を理解している

### オブジェクト指向編
- [ ] クラスを定義してインスタンスを作成できる
- [ ] 継承を使ってクラスを拡張できる
- [ ] 特殊メソッドを理解している
- [ ] @propertyデコレータを使える
- [ ] クラスメソッドと静的メソッドの違いがわかる

### 標準ライブラリ編
- [ ] pathlibでファイルパスを扱える
- [ ] datetimeで日付・時刻を操作できる
- [ ] JSONファイルの読み書きができる
- [ ] 基本的な正規表現を書ける
- [ ] 標準ライブラリのドキュメントを読める

## ⚠️ Pythonバージョンについて

このガイドでは、Python 3.8以降のサポートを基本としています。

### 推奨バージョン
- **Python 3.10+** - 最新の機能を使用可能
- **Python 3.8+** - 多くの環境で利用可能

### バージョン確認方法

```bash
python3 --version
# または
python --version
```

古いPython 2.x系はサポート終了しているため、必ずPython 3.x系を使用してください。

## 🚀 次のステップ

このガイドを完了したら、以下にチャレンジしましょう:

### 1. 実践プロジェクトの作成
- **ToDoアプリ** - ファイルI/Oとデータ構造の練習
- **スクレイピングツール** - requests + BeautifulSoup
- **簡単なWebアプリ** - Flask or FastAPI

### 2. より高度なトピック
- **非同期処理** - asyncio、async/await
- **テスト** - pytest、unittest
- **型ヒント** - typing モジュール
- **仮想環境とパッケージ管理** - pip、poetry

### 3. 人気のライブラリ・フレームワーク
- **データ分析**: pandas、NumPy、Matplotlib
- **Webフレームワーク**: Django、Flask、FastAPI
- **機械学習**: scikit-learn、TensorFlow、PyTorch
- **自動化**: Selenium、Playwright

### 4. Webフロントエンドと連携
このリポジトリで学んだHTML/CSS/JavaScriptと組み合わせて、フルスタック開発にチャレンジしましょう:
- FastAPI + React
- Flask + Vue.js
- Django + vanilla JavaScript

## 🐍 Pythonの哲学

Pythonには「The Zen of Python」という哲学があります。Pythonらしいコードを書くための指針として参考にしましょう。

```python
import this
```

を実行すると表示される格言:

- **Beautiful is better than ugly.** - 醜いよりも美しい方が良い
- **Explicit is better than implicit.** - 暗黙的よりも明示的な方が良い
- **Simple is better than complex.** - 複雑よりもシンプルな方が良い
- **Readability counts.** - 可読性は重要

## 🔧 トラブルシューティング

### よくあるエラーと対処法

**SyntaxError**
- インデントが正しいか確認
- 括弧やクォートが閉じられているか確認

**NameError**
- 変数名のスペルミスを確認
- 変数が定義される前に使われていないか確認

**IndentationError**
- タブとスペースを混在させない
- 一貫したインデント（通常はスペース4つ）を使用

**ModuleNotFoundError**
- パッケージがインストールされているか確認: `pip install パッケージ名`
- 仮想環境が有効になっているか確認

---

## 更新履歴

- 2024年 - 初版作成

---

**それでは、Pythonの学習を始めましょう！** 🐍✨
