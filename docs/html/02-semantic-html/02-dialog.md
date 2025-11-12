# Dialog要素（モーダル）

`<dialog>`要素は、HTML標準のモーダルウィンドウ実装です。従来はライブラリが必要でしたが、ネイティブ機能として利用できます。

## 基本的な使い方

### HTMLマークアップ

```html
<!-- モーダルを開くボタン -->
<button type="button" data-modal-open="myModal">
  モーダルを開く
</button>

<!-- ダイアログ要素 -->
<dialog id="myModal" aria-labelledby="modalTitle" aria-describedby="modalDesc">
  <h2 id="modalTitle">モーダルタイトル</h2>
  <p id="modalDesc">モーダルの内容がここに入ります。</p>
  <button type="button" data-modal-close>閉じる</button>
</dialog>
```

### JavaScript

```javascript
const openButton = document.querySelector('[data-modal-open="myModal"]');
const dialog = document.getElementById('myModal');
const closeButton = dialog.querySelector('[data-modal-close]');

// モーダルを開く
openButton.addEventListener('click', () => {
  dialog.showModal();
});

// モーダルを閉じる
closeButton.addEventListener('click', () => {
  dialog.close();
});
```

## Dialog要素が提供する機能

### ✅ 自動的に提供される機能

1. **Escキーで閉じる**
   - ユーザーがEscキーを押すと自動的に閉じる

2. **背面コンテンツの不活性化**
   - モーダル表示中は背面のコンテンツにフォーカスが当たらない

3. **最上位レイヤー表示**
   - `z-index`に関係なく、常に最前面に表示される

4. **`::backdrop`疑似要素**
   - 背景オーバーレイをCSSで簡単にスタイリングできる

### ⚠️ カスタム実装が必要な機能

1. **背面スクロールの抑制**
2. **オーバーレイクリックで閉じる処理**
3. **フォーカス管理（開く前の要素に戻す）**
4. **開閉アニメーション**

## showModal() vs show()

Dialog要素には2つのメソッドがあります。

### showModal() - モーダルとして表示

```javascript
dialog.showModal();
```

- 背面が不活性化される
- `::backdrop`が表示される
- Escキーで閉じられる
- **推奨: ほとんどの場合これを使用**

### show() - 通常の表示

```javascript
dialog.show();
```

- 背面も操作可能
- `::backdrop`は表示されない
- モーダルではなく、通常のダイアログ
- **使用場面: 非モーダルなダイアログ（まれ）**

## 完全な実装例

### HTML

```html
<button type="button" id="openModal">
  ログイン
</button>

<dialog
  id="loginModal"
  aria-labelledby="loginTitle"
  aria-describedby="loginDesc"
  autofocus>
  <div class="modal-container">
    <header>
      <h2 id="loginTitle">ログイン</h2>
      <button
        type="button"
        class="close-button"
        aria-label="閉じる"
        data-modal-close>
        <span aria-hidden="true">&times;</span>
      </button>
    </header>

    <p id="loginDesc">アカウント情報を入力してください</p>

    <form method="dialog">
      <div>
        <label for="email">メールアドレス</label>
        <input type="email" id="email" required>
      </div>

      <div>
        <label for="password">パスワード</label>
        <input type="password" id="password" required>
      </div>

      <div class="modal-actions">
        <button type="submit" value="cancel">キャンセル</button>
        <button type="submit" value="login">ログイン</button>
      </div>
    </form>
  </div>
</dialog>
```

### CSS

```css
/* UAスタイルシートのリセット */
dialog {
  width: unset;
  max-width: unset;
  max-height: unset;
  padding: unset;
  border: none;
  background-color: unset;
}

/* カスタムスタイル */
dialog {
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 背景オーバーレイ */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* モーダルの内容 */
.modal-container {
  padding: 1.5rem;
}

.modal-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* 背面スクロール抑制 */
body:has(dialog[open]) {
  overflow: hidden;
}
```

### JavaScript（完全版）

```javascript
class ModalManager {
  constructor(dialogElement) {
    this.dialog = dialogElement;
    this.isAnimating = false;
    this.lastFocusedElement = null;

    this.init();
  }

  init() {
    // 開くボタンを設定
    const openButton = document.querySelector(
      `[data-modal-open="${this.dialog.id}"]`
    );
    if (openButton) {
      openButton.addEventListener('click', () => this.open());
    }

    // 閉じるボタンを設定
    const closeButtons = this.dialog.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    // オーバーレイクリックで閉じる
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this.close();
      }
    });

    // Escキーのイベントをリッスン
    this.dialog.addEventListener('cancel', (e) => {
      // デフォルトのEsc動作をキャンセルし、カスタム処理を実行
      e.preventDefault();
      this.close();
    });

    // フォームのsubmitイベント
    const form = this.dialog.querySelector('form[method="dialog"]');
    if (form) {
      form.addEventListener('submit', (e) => {
        const value = e.submitter?.value;
        console.log('フォーム送信:', value);
        this.close();
      });
    }
  }

  open() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.lastFocusedElement = document.activeElement;

    this.dialog.showModal();

    // アニメーション用の属性を追加
    requestAnimationFrame(() => {
      this.dialog.setAttribute('data-state', 'open');
      this.isAnimating = false;
    });
  }

  async close() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.dialog.setAttribute('data-state', 'closing');

    // アニメーション終了を待つ
    await this.waitForAnimation();

    this.dialog.close();
    this.dialog.removeAttribute('data-state');

    // フォーカスを戻す
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }

    this.isAnimating = false;
  }

  waitForAnimation() {
    return new Promise(resolve => {
      const duration = 300; // アニメーション時間（ms）
      setTimeout(resolve, duration);
    });
  }
}

// 初期化
document.querySelectorAll('dialog').forEach(dialog => {
  new ModalManager(dialog);
});
```

### アニメーション用CSS

```css
/* アニメーションの追加 */
dialog {
  opacity: 0;
  transform: translateY(-20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    overlay 0.3s ease allow-discrete,
    display 0.3s ease allow-discrete;
}

dialog[data-state="open"] {
  opacity: 1;
  transform: translateY(0);
}

dialog[data-state="closing"] {
  opacity: 0;
  transform: translateY(-20px);
}

dialog::backdrop {
  opacity: 0;
  transition:
    opacity 0.3s ease,
    overlay 0.3s ease allow-discrete,
    display 0.3s ease allow-discrete;
}

dialog[data-state="open"]::backdrop {
  opacity: 1;
}

/* ブラウザ互換性のため */
@starting-style {
  dialog[data-state="open"] {
    opacity: 0;
    transform: translateY(-20px);
  }

  dialog[data-state="open"]::backdrop {
    opacity: 0;
  }
}
```

## アクセシビリティ

### 必須の実装

```html
<dialog
  aria-labelledby="modalTitle"   <!-- モーダルのタイトルを参照 -->
  aria-describedby="modalDesc"   <!-- モーダルの説明を参照 -->
  autofocus>                      <!-- 初期フォーカス位置 -->

  <h2 id="modalTitle">タイトル</h2>
  <p id="modalDesc">説明文</p>

  <button aria-label="閉じる">   <!-- 視覚的に明確でない場合 -->
    ×
  </button>
</dialog>
```

### ❌ 避けるべき実装

```html
<!-- tabindexは使用しない -->
<dialog tabindex="0">  <!-- NG -->

<!-- ネストしたダイアログ -->
<dialog>
  <dialog>  <!-- NG -->
  </dialog>
</dialog>
```

## フォームとの統合

`method="dialog"`を使うと、フォーム送信でモーダルが閉じます。

```html
<dialog id="confirmDialog">
  <form method="dialog">
    <p>本当に削除しますか？</p>
    <button type="submit" value="cancel">キャンセル</button>
    <button type="submit" value="confirm">削除</button>
  </form>
</dialog>
```

```javascript
const dialog = document.getElementById('confirmDialog');

dialog.addEventListener('close', () => {
  const returnValue = dialog.returnValue;

  if (returnValue === 'confirm') {
    console.log('削除が確認されました');
    // 削除処理
  } else {
    console.log('キャンセルされました');
  }
});
```

## 実践例

### 確認ダイアログ

```javascript
function showConfirmDialog(message) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
      <div style="padding: 1.5rem;">
        <p>${message}</p>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
          <button type="button" value="cancel">キャンセル</button>
          <button type="button" value="confirm">OK</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const confirmed = button.value === 'confirm';
        dialog.close();
        dialog.remove();
        resolve(confirmed);
      });
    });
  });
}

// 使用例
const deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', async () => {
  const confirmed = await showConfirmDialog('本当に削除しますか？');

  if (confirmed) {
    console.log('削除実行');
  }
});
```

### 画像ギャラリー

```html
<div class="gallery">
  <img src="thumb1.jpg" alt="画像1" data-full="full1.jpg">
  <img src="thumb2.jpg" alt="画像2" data-full="full2.jpg">
</div>

<dialog id="imageModal">
  <button type="button" data-modal-close aria-label="閉じる">×</button>
  <img id="modalImage" src="" alt="">
</dialog>
```

```javascript
const gallery = document.querySelectorAll('.gallery img');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

gallery.forEach(img => {
  img.addEventListener('click', () => {
    modalImage.src = img.dataset.full;
    modalImage.alt = img.alt;
    imageModal.showModal();
  });
});
```

## ブラウザ対応

| ブラウザ | 対応バージョン | 注意事項 |
|----------|---------------|----------|
| Chrome | 37+ (2014〜) | 完全サポート |
| Firefox | 98+ (2022〜) | 完全サポート |
| Safari | 15.4+ (2022〜) | `::backdrop`のカスタムプロパティは16.4+ |
| Edge | 79+ (2020〜) | 完全サポート |
| iOS Safari | 15.4+ (2022〜) | |

## まとめ

### メリット
- ✅ ネイティブ機能で実装が簡単
- ✅ アクセシビリティが自動的に確保される
- ✅ ライブラリ不要
- ✅ パフォーマンスが良い

### デメリット
- ❌ アニメーションにはやや複雑な実装が必要
- ❌ 古いブラウザは未対応（ポリフィルが必要）

### 使用すべき場面
- モーダルダイアログ
- 確認ダイアログ
- ログインフォーム
- 画像ビューアー

### 使用を避けるべき場面
- 古いブラウザサポートが必須の場合
- 非常に複雑なモーダルUI

## 関連リンク

- [MDN - &lt;dialog&gt;要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/dialog)
- [実装例](../../../examples/html/modal/)
- [Polyfill](https://github.com/GoogleChrome/dialog-polyfill)
