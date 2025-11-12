# CSS 実装パターン集

このセクションでは、実務でよく使われる具体的な実装パターンを紹介します。

## 目次
1. [Details要素の開閉アニメーション](#details要素の開閉アニメーション)
2. [アクセシブルなタブUI](#アクセシブルなタブui)

---

## Details要素の開閉アニメーション

### 概要
`<details>`要素はHTML標準のアコーディオン機能ですが、デフォルトでは開閉時のアニメーションがありません。ここでは、滑らかなアニメーションを実装する2つの方法を紹介します。

### 方法1: CSSのみの実装（モダンブラウザ向け）

#### ::details-content 疑似要素を使用

```html
<details>
  <summary>クリックして開く</summary>
  <div class="details-content">
    <p>ここに詳細な内容が表示されます。</p>
  </div>
</details>
```

```css
/* 基本スタイル */
details {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

summary {
  cursor: pointer;
  font-weight: bold;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none; /* デフォルトの三角マーカーを非表示 */
}

/* 開閉アニメーション */
details::details-content {
  transition:
    height 0.4s ease,
    opacity 0.4s ease,
    content-visibility 0.4s allow-discrete;
  height: 0;
  opacity: 0;
  overflow: clip;
}

details[open]::details-content {
  opacity: 1;
  height: auto;
}
```

**ブラウザサポート:**
- Chrome 120+（実験的機能）
- Safari（未対応）
- Firefox（未対応）

**注意:** この方法は最新のブラウザでのみ動作します。

---

### 方法2: JavaScriptを使用（全ブラウザ対応）

#### Web Animations APIを活用

```html
<details class="animated-details">
  <summary>クリックして開く</summary>
  <div class="details-content">
    <div class="details-inner">
      <p>ここに詳細な内容が表示されます。</p>
      <p>複数の段落も問題ありません。</p>
    </div>
  </div>
</details>
```

```css
/* 基本スタイル */
.animated-details {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
}

.animated-details summary {
  cursor: pointer;
  font-weight: bold;
  list-style: none;
  padding: 16px;
  user-select: none;
}

.animated-details summary::-webkit-details-marker {
  display: none;
}

/* コンテンツ部分 */
.details-content {
  overflow: hidden;
  height: 0;
  opacity: 0;
}

.details-inner {
  padding: 0 16px 16px;
}

/* 開いている状態 */
.animated-details[open] .details-content {
  height: auto;
  opacity: 1;
}
```

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.animated-details');

  detailsElements.forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.details-content');

    // デフォルトの開閉を無効化
    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (details.open) {
        // 閉じるアニメーション
        closeDetails(details, content);
      } else {
        // 開くアニメーション
        openDetails(details, content);
      }
    });
  });
});

// 開くアニメーション
function openDetails(details, content) {
  details.open = true;

  const openingAnimKeyframes = [
    { height: 0, opacity: 0 },
    { height: content.scrollHeight + 'px', opacity: 1 }
  ];

  content.animate(openingAnimKeyframes, {
    duration: 400,
    easing: 'ease-out'
  });
}

// 閉じるアニメーション
function closeDetails(details, content) {
  const closingAnimKeyframes = [
    { height: content.scrollHeight + 'px', opacity: 1 },
    { height: 0, opacity: 0 }
  ];

  const animation = content.animate(closingAnimKeyframes, {
    duration: 400,
    easing: 'ease-in'
  });

  // アニメーション終了後に閉じる
  animation.onfinish = () => {
    details.open = false;
  };
}
```

**重要なポイント:**
1. **直下の要素には上下paddingを指定しない**: `.details-content`にpaddingを指定すると高さの計算が狂います
2. **内側要素でpaddingを設定**: `.details-inner`でpaddingを指定
3. **scrollHeightを使用**: コンテンツの実際の高さを取得

**ブラウザサポート:**
- すべてのモダンブラウザ（IE11を除く）

---

## アクセシブルなタブUI

### 概要
タブUIは、複数のコンテンツを切り替えて表示するパターンです。アクセシビリティに配慮した実装には、**WAI-ARIA**属性とキーボード操作のサポートが必須です。

### コンポーネント構成

タブUIは以下の3つの要素で構成されます：

1. **タブリスト** (`role="tablist"`) - タブのコンテナ
2. **タブ** (`role="tab"`) - 選択可能なトリガー
3. **タブパネル** (`role="tabpanel"`) - コンテンツエリア

---

### HTML構造

```html
<div class="tabs-container">
  <!-- タブリスト -->
  <div role="tablist" aria-label="コンテンツタブ">
    <button
      role="tab"
      aria-controls="panel-1"
      aria-selected="true"
      tabindex="0"
      id="tab-1"
    >
      タブ1
    </button>
    <button
      role="tab"
      aria-controls="panel-2"
      aria-selected="false"
      tabindex="-1"
      id="tab-2"
    >
      タブ2
    </button>
    <button
      role="tab"
      aria-controls="panel-3"
      aria-selected="false"
      tabindex="-1"
      id="tab-3"
    >
      タブ3
    </button>
  </div>

  <!-- タブパネル -->
  <section
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1"
    tabindex="0"
  >
    <h2>コンテンツ1</h2>
    <p>タブ1の内容がここに表示されます。</p>
  </section>

  <section
    role="tabpanel"
    id="panel-2"
    aria-labelledby="tab-2"
    tabindex="0"
    hidden
  >
    <h2>コンテンツ2</h2>
    <p>タブ2の内容がここに表示されます。</p>
  </section>

  <section
    role="tabpanel"
    id="panel-3"
    aria-labelledby="tab-3"
    tabindex="0"
    hidden
  >
    <h2>コンテンツ3</h2>
    <p>タブ3の内容がここに表示されます。</p>
  </section>
</div>
```

---

### CSS実装

```css
/* タブコンテナ */
.tabs-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* タブリスト */
[role="tablist"] {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 24px;
}

/* タブボタン */
[role="tab"] {
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  transition: color 0.2s, border-color 0.2s;
  position: relative;
  top: 2px; /* ボーダーと重ねる */
}

/* ホバー状態（ポインターデバイスのみ） */
@media (any-hover: hover) {
  [role="tab"]:hover {
    color: #0066cc;
  }
}

/* フォーカス状態（キーボード） */
[role="tab"]:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  color: #0066cc;
}

/* 選択状態 */
[role="tab"][aria-selected="true"] {
  color: #0066cc;
  border-bottom-color: #0066cc;
}

/* タブパネル */
[role="tabpanel"] {
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  animation: fadeIn 0.3s ease;
}

[role="tabpanel"]:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

[role="tabpanel"][hidden] {
  display: none;
}

/* フェードインアニメーション */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* アニメーション削減設定への対応 */
@media (prefers-reduced-motion: reduce) {
  [role="tabpanel"] {
    animation: none;
  }
}
```

---

### JavaScript実装

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const tablist = document.querySelector('[role="tablist"]');
  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  // タブクリック時
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });

    // キーボード操作
    tab.addEventListener('keydown', (e) => {
      const currentIndex = Array.from(tabs).indexOf(tab);
      let targetTab = null;

      switch (e.key) {
        case 'ArrowRight':
          // 次のタブへ
          targetTab = tabs[currentIndex + 1] || tabs[0];
          break;
        case 'ArrowLeft':
          // 前のタブへ
          targetTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
          break;
        case 'Home':
          // 最初のタブへ
          targetTab = tabs[0];
          break;
        case 'End':
          // 最後のタブへ
          targetTab = tabs[tabs.length - 1];
          break;
        default:
          return;
      }

      if (targetTab) {
        e.preventDefault();
        activateTab(targetTab);
        targetTab.focus();
      }
    });
  });

  // タブをアクティブ化
  function activateTab(targetTab) {
    // すべてのタブを非アクティブ化
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });

    // すべてのパネルを非表示
    panels.forEach((panel) => {
      panel.hidden = true;
    });

    // 選択されたタブをアクティブ化
    targetTab.setAttribute('aria-selected', 'true');
    targetTab.setAttribute('tabindex', '0');

    // 対応するパネルを表示
    const targetPanelId = targetTab.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetPanelId);
    targetPanel.hidden = false;
  }
});
```

---

### WAI-ARIA属性の説明

#### タブリスト
- **`role="tablist"`**: タブのコンテナであることを示す
- **`aria-label`**: タブリストのラベル（スクリーンリーダー用）

#### タブ
- **`role="tab"`**: タブであることを示す
- **`aria-controls`**: 紐付けるパネルのID
- **`aria-selected`**: 選択状態（`true` / `false`）
- **`tabindex`**: フォーカス管理
  - 選択中: `0`（Tabキーでフォーカス可能）
  - 非選択: `-1`（矢印キーのみでフォーカス可能）
- **`id`**: パネルから参照されるID

#### タブパネル
- **`role="tabpanel"`**: タブパネルであることを示す
- **`aria-labelledby`**: 紐付けるタブのID
- **`tabindex="0"`**: パネル自体もフォーカス可能にする
- **`hidden`**: 非表示状態を制御

---

### キーボード操作のサポート

アクセシブルなタブUIでは、以下のキーボード操作が必須です：

| キー | 動作 |
|------|------|
| **Tab** | タブリストにフォーカス移動、パネル内を移動 |
| **→（右矢印）** | 次のタブへ移動（自動アクティベーション） |
| **←（左矢印）** | 前のタブへ移動（自動アクティベーション） |
| **Home** | 最初のタブへ移動 |
| **End** | 最後のタブへ移動 |

**自動アクティベーション**: 矢印キーでフォーカスが移動すると同時にタブが切り替わる（上記の実装例）

**手動アクティベーション**: 矢印キーでフォーカスのみ移動し、Enter/Spaceで確定する方式もあります。

---

### アクセシビリティのポイント

1. **フォーカス管理**: 未選択のタブは`tabindex="-1"`にして、矢印キーのみで移動可能にする
2. **スクリーンリーダー対応**: `role`と`aria-*`属性を正しく設定
3. **キーボード操作**: Tab、矢印キー、Home、Endキーをサポート
4. **ビジュアルフィードバック**: `:focus-visible`でキーボードフォーカスを明示
5. **アニメーション配慮**: `prefers-reduced-motion`に対応

---

### ブラウザサポート

- すべてのモダンブラウザ（IE11を除く）

---

### 参考リンク

- [WAI-ARIA Authoring Practices - Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [MDN - ARIA: tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)

---

## まとめ

### 学習のポイント

1. **Details要素のアニメーション** - CSSのみ or JavaScriptで実装
2. **アクセシブルなタブUI** - WAI-ARIA + キーボード操作が必須

### 実務での推奨事項

- Details要素: 全ブラウザ対応が必要ならJavaScript版を使用
- タブUI: WAI-ARIAとキーボード操作は必ず実装
- すべてのインタラクティブ要素で`prefers-reduced-motion`に対応
- キーボード操作とスクリーンリーダーでテストする習慣をつける

---

## デモファイル

実際に動作するデモは`examples/`フォルダにあります：

- [Details開閉アニメーション（CSS版）](./examples/details-animation-css.html)
- [Details開閉アニメーション（JavaScript版）](./examples/details-animation-js.html)
- [アクセシブルなタブUI](./examples/accessible-tabs.html)
