# アクセシブルなタブUI

タブUIは、複数のコンテンツを切り替えて表示するインターフェースです。アクセシブルに実装するには、適切なARIAロールとキーボード操作が必要です。

## タブUIの構成要素

タブUIは3つのパーツで構成されます：

1. **タブリスト**: 複数のタブをグループ化
2. **タブ**: パネル切り替えのトリガー
3. **タブパネル**: コンテンツを表示するエリア

```
[タブ1] [タブ2] [タブ3]  ← タブリスト
――――――――――――――――――
タブ1の内容              ← タブパネル
```

## 基本的な実装

### HTML

```html
<div class="tabs">
  <!-- タブリスト -->
  <div role="tablist" aria-label="設定">
    <!-- タブ -->
    <button
      role="tab"
      id="tab-1"
      aria-selected="true"
      aria-controls="panel-1">
      一般
    </button>
    <button
      role="tab"
      id="tab-2"
      aria-selected="false"
      aria-controls="panel-2"
      tabindex="-1">
      プライバシー
    </button>
    <button
      role="tab"
      id="tab-3"
      aria-selected="false"
      aria-controls="panel-3"
      tabindex="-1">
      通知
    </button>
  </div>

  <!-- タブパネル -->
  <div
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1">
    <h2>一般設定</h2>
    <p>一般設定の内容...</p>
  </div>

  <div
    role="tabpanel"
    id="panel-2"
    aria-labelledby="tab-2"
    hidden>
    <h2>プライバシー設定</h2>
    <p>プライバシー設定の内容...</p>
  </div>

  <div
    role="tabpanel"
    id="panel-3"
    aria-labelledby="tab-3"
    hidden>
    <h2>通知設定</h2>
    <p>通知設定の内容...</p>
  </div>
</div>
```

### 重要な属性

#### タブリスト

```html
<div role="tablist" aria-label="設定">
```

- `role="tablist"`: タブのグループを示す
- `aria-label`: タブリストの名前（複数ある場合は必須）

#### タブ

```html
<button
  role="tab"
  id="tab-1"
  aria-selected="true"
  aria-controls="panel-1">
  タブ名
</button>
```

- `role="tab"`: タブであることを示す
- `id`: パネルの`aria-labelledby`と関連付け
- `aria-selected`: 選択状態（"true" または "false"）
- `aria-controls`: 制御するパネルのID
- `tabindex`: 未選択時は`"-1"`（キーボードナビゲーション用）

#### タブパネル

```html
<div
  role="tabpanel"
  id="panel-1"
  aria-labelledby="tab-1">
  コンテンツ
</div>
```

- `role="tabpanel"`: タブパネルであることを示す
- `id`: タブの`aria-controls`と関連付け
- `aria-labelledby`: ラベルとなるタブのID
- `hidden`: 非表示のパネルに指定

## キーボード操作

### 必須の操作

| キー | 動作 |
|------|------|
| Tab | タブリストに入る／タブリストから出る |
| ← | 前のタブに移動 |
| → | 次のタブに移動 |
| Home | 最初のタブに移動 |
| End | 最後のタブに移動 |

### JavaScript実装

```javascript
class TabManager {
  constructor(tablist) {
    this.tablist = tablist;
    this.tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    this.panels = this.tabs.map(tab =>
      document.getElementById(tab.getAttribute('aria-controls'))
    );

    this.init();
  }

  init() {
    // タブのクリックイベント
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.selectTab(index);
      });

      // キーボードイベント
      tab.addEventListener('keydown', (e) => {
        this.handleKeyDown(e, index);
      });
    });
  }

  selectTab(index) {
    // すべてのタブを非選択に
    this.tabs.forEach((tab, i) => {
      const isSelected = i === index;

      tab.setAttribute('aria-selected', isSelected);
      tab.tabIndex = isSelected ? 0 : -1;

      if (this.panels[i]) {
        this.panels[i].hidden = !isSelected;
      }
    });

    // 選択したタブにフォーカス
    this.tabs[index].focus();
  }

  handleKeyDown(e, currentIndex) {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = this.tabs.length - 1;
        e.preventDefault();
        break;

      case 'ArrowRight':
        newIndex = currentIndex + 1;
        if (newIndex >= this.tabs.length) newIndex = 0;
        e.preventDefault();
        break;

      case 'Home':
        newIndex = 0;
        e.preventDefault();
        break;

      case 'End':
        newIndex = this.tabs.length - 1;
        e.preventDefault();
        break;

      default:
        return;
    }

    this.selectTab(newIndex);
  }
}

// 初期化
document.querySelectorAll('[role="tablist"]').forEach(tablist => {
  new TabManager(tablist);
});
```

## 自動アクティベーション vs 手動アクティベーション

### 自動アクティベーション（推奨）

矢印キーでタブを移動すると、すぐにパネルが切り替わります。

**メリット:**
- 素早い操作
- 直感的

**デメリット:**
- 大量のコンテンツがある場合、パフォーマンス問題

### 手動アクティベーション

矢印キーでタブを移動し、EnterまたはSpaceで選択します。

**メリット:**
- 重いコンテンツに適している
- 誤操作を防げる

**デメリット:**
- 操作が1ステップ増える

## CSS実装

### 基本的なスタイル

```css
/* タブリスト */
[role="tablist"] {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #ddd;
  margin-bottom: 1rem;
}

/* タブ */
[role="tab"] {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  transition: all 0.2s;
}

/* ホバー */
[role="tab"]:hover {
  color: #333;
  background-color: #f5f5f5;
}

/* フォーカス */
[role="tab"]:focus {
  outline: 2px solid #0066cc;
  outline-offset: -2px;
}

/* 選択中のタブ */
[role="tab"][aria-selected="true"] {
  color: #0066cc;
  border-bottom-color: #0066cc;
  font-weight: bold;
}

/* タブパネル */
[role="tabpanel"] {
  padding: 1rem;
}

/* 非表示のパネル */
[role="tabpanel"][hidden] {
  display: none;
}
```

### アニメーション付きパネル

```css
[role="tabpanel"] {
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

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
```

## 実践例

### 設定画面のタブ

```html
<section class="settings">
  <h1>設定</h1>

  <div role="tablist" aria-label="設定カテゴリ">
    <button
      role="tab"
      id="tab-profile"
      aria-selected="true"
      aria-controls="panel-profile">
      プロフィール
    </button>
    <button
      role="tab"
      id="tab-account"
      aria-selected="false"
      aria-controls="panel-account"
      tabindex="-1">
      アカウント
    </button>
    <button
      role="tab"
      id="tab-privacy"
      aria-selected="false"
      aria-controls="panel-privacy"
      tabindex="-1">
      プライバシー
    </button>
  </div>

  <div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile">
    <h2>プロフィール設定</h2>
    <form>
      <!-- プロフィールフォーム -->
    </form>
  </div>

  <div role="tabpanel" id="panel-account" aria-labelledby="tab-account" hidden>
    <h2>アカウント設定</h2>
    <form>
      <!-- アカウントフォーム -->
    </form>
  </div>

  <div role="tabpanel" id="panel-privacy" aria-labelledby="tab-privacy" hidden>
    <h2>プライバシー設定</h2>
    <form>
      <!-- プライバシーフォーム -->
    </form>
  </div>
</section>
```

### 商品詳細のタブ

```html
<div class="product-details">
  <div role="tablist" aria-label="商品情報">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-description">
      説明
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-specs"
      tabindex="-1">
      仕様
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-reviews"
      tabindex="-1">
      レビュー
    </button>
  </div>

  <div role="tabpanel" id="panel-description">
    <h2>商品説明</h2>
    <p>この商品は...</p>
  </div>

  <div role="tabpanel" id="panel-specs" hidden>
    <h2>商品仕様</h2>
    <dl>
      <dt>サイズ:</dt>
      <dd>W100 × H50 × D30 mm</dd>
    </dl>
  </div>

  <div role="tabpanel" id="panel-reviews" hidden>
    <h2>カスタマーレビュー</h2>
    <div class="reviews">
      <!-- レビュー一覧 -->
    </div>
  </div>
</div>
```

## よくある間違い

### ❌ タブにリンク要素を使う

```html
<!-- ❌ 間違い -->
<a href="#panel-1" role="tab">タブ1</a>

<!-- ✅ 正しい -->
<button role="tab" aria-controls="panel-1">タブ1</button>
```

**理由:** タブはページ内の状態を切り替えるものであり、ナビゲーションではありません。

### ❌ パネルにtabindexを設定しない

```html
<!-- ❌ フォーカスできない -->
<div role="tabpanel">
  コンテンツ
</div>

<!-- ✅ 必要に応じてtabindex="0" -->
<div role="tabpanel" tabindex="0">
  長いコンテンツ...
</div>
```

### ❌ aria-selectedを更新しない

```javascript
// ❌ 状態が同期されない
tab.onclick = () => {
  showPanel(panelId);
  // aria-selectedを更新していない
};

// ✅ 状態を適切に更新
tab.onclick = () => {
  tab.setAttribute('aria-selected', 'true');
  showPanel(panelId);
};
```

## アクセシビリティチェックリスト

- [ ] タブは`<button>`または`<a>`要素を使用
- [ ] 各タブに`role="tab"`を指定
- [ ] `aria-selected`で選択状態を示す
- [ ] `aria-controls`でパネルと関連付け
- [ ] 未選択のタブは`tabindex="-1"`
- [ ] パネルに`role="tabpanel"`を指定
- [ ] `aria-labelledby`でタブと関連付け
- [ ] 矢印キーでタブ間を移動できる
- [ ] Home/Endキーで最初/最後に移動できる

## ブラウザ・スクリーンリーダーでのテスト

### 確認項目

1. **キーボード操作**
   - Tabキーでタブリストに入れるか
   - 矢印キーでタブを移動できるか
   - Enter/Spaceでタブを選択できるか

2. **スクリーンリーダー**
   - タブの数が読み上げられるか
   - 選択状態が読み上げられるか
   - パネルの内容が適切に読み上げられるか

## まとめ

### アクセシブルなタブUIの要件

1. **適切なARIAロール**
   - tablist、tab、tabpanel

2. **適切な属性**
   - aria-selected
   - aria-controls
   - aria-labelledby

3. **キーボード操作**
   - 矢印キー
   - Home/End

4. **フォーカス管理**
   - 選択されたタブにtabindex="0"
   - 未選択のタブにtabindex="-1"

## 関連リンク

- [WAI-ARIA Authoring Practices - Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)
- [MDN - ARIA: tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)
- [実装例](../../../examples/html/tabs/)
