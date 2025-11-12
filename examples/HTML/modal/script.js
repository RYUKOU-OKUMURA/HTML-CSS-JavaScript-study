class ModalManager {
  constructor(dialog) {
    this.dialog = dialog;
    this.lastFocusedElement = null;
    this.init();
  }

  init() {
    // オーバーレイクリックで閉じる
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this.close();
      }
    });

    // 閉じるボタン
    const closeButtons = this.dialog.querySelectorAll('[data-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    // 確認ボタン（確認ダイアログ用）
    const confirmButton = this.dialog.querySelector('[data-confirm]');
    if (confirmButton) {
      confirmButton.addEventListener('click', () => this.handleConfirm());
    }

    // Escキー対応
    this.dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.close();
    });

    // フォーム送信
    const form = this.dialog.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        const value = e.submitter?.value;
        console.log('フォーム送信:', value);
        this.close();
      });
    }
  }

  open() {
    this.lastFocusedElement = document.activeElement;
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }

  handleConfirm() {
    const resultElement = document.getElementById('confirmResult');
    if (resultElement) {
      resultElement.textContent = '削除が実行されました';
      resultElement.classList.add('show');
      setTimeout(() => {
        resultElement.classList.remove('show');
      }, 3000);
    }
    this.close();
  }
}

// すべてのダイアログを初期化
const dialogs = document.querySelectorAll('dialog');
const modalManagers = new Map();

dialogs.forEach(dialog => {
  const manager = new ModalManager(dialog);
  modalManagers.set(dialog.id, manager);
});

// モーダルを開くボタン
const openButtons = document.querySelectorAll('[data-modal]');
openButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const manager = modalManagers.get(modalId);
    if (manager) {
      manager.open();
    }
  });
});
