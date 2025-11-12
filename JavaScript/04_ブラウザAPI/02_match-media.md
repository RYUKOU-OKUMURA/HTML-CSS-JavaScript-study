# matchMedia API

matchMedia APIは、JavaScriptでCSSのメディアクエリを扱うためのAPIです。レスポンシブなJavaScriptを効率的に実装できます。

## 📚 学習内容

- matchMediaの基本
- レスポンシブなJavaScript
- resizeイベントからの移行
- ブレークポイントの監視
- ダークモードの検知
- 実践的な使用例

---

## なぜmatchMediaが必要なのか?

### 従来の方法の問題

```javascript
// ❌ 従来の方法（resizeイベント）
window.addEventListener('resize', () => {
  const width = window.innerWidth;

  // ウィンドウサイズ変更中、何度も実行される
  if (width >= 768) {
    // タブレット/デスクトップ
    showDesktopNav();
  } else {
    // モバイル
    showMobileNav();
  }
});
```

**問題点：**
- リサイズのたびに実行される（数十回/秒）
- ブレークポイントを跨いでいなくても実行される
- パフォーマンスが悪い

---

### matchMediaによる解決

```javascript
// ✅ matchMedia
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleMediaChange(e) {
  if (e.matches) {
    // タブレット/デスクトップ
    showDesktopNav();
  } else {
    // モバイル
    showMobileNav();
  }
}

// 初期化
handleMediaChange(mediaQuery);

// ブレークポイントを跨いだ時だけ実行される
mediaQuery.addEventListener('change', handleMediaChange);
```

**利点：**
- ブレークポイントを跨いだ時だけ実行
- CSSと同じメディアクエリを使用
- パフォーマンスが良い

---

## 基本的な使い方

### ステップ1: MediaQueryListを取得

```javascript
// メディアクエリを指定
const mediaQuery = window.matchMedia('(min-width: 768px)');

console.log('マッチしている:', mediaQuery.matches); // true or false
```

---

### ステップ2: 現在の状態を確認

```javascript
const mediaQuery = window.matchMedia('(min-width: 768px)');

if (mediaQuery.matches) {
  console.log('画面幅は768px以上です');
} else {
  console.log('画面幅は768px未満です');
}
```

---

### ステップ3: 変更を監視

```javascript
const mediaQuery = window.matchMedia('(min-width: 768px)');

// ✅ addEventListenerを使用（推奨）
mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    console.log('768px以上になりました');
  } else {
    console.log('768px未満になりました');
  }
});

// ⚠️ addListener は非推奨
// mediaQuery.addListener(callback);
```

---

## 実践例

### 例1: レスポンシブなナビゲーション

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>レスポンシブナビゲーション</title>
  <style>
    .nav-desktop {
      display: none;
    }

    .nav-mobile {
      display: none;
    }

    .nav-desktop.active {
      display: block;
      background: #3498db;
      padding: 20px;
      color: white;
    }

    .nav-mobile.active {
      display: block;
      background: #e74c3c;
      padding: 20px;
      color: white;
    }
  </style>
</head>
<body>
  <div class="nav-desktop">デスクトップナビゲーション</div>
  <div class="nav-mobile">モバイルナビゲーション</div>

  <script>
    const desktopNav = document.querySelector('.nav-desktop');
    const mobileNav = document.querySelector('.nav-mobile');
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    function handleNavigation(e) {
      if (e.matches) {
        // デスクトップ
        desktopNav.classList.add('active');
        mobileNav.classList.remove('active');
      } else {
        // モバイル
        desktopNav.classList.remove('active');
        mobileNav.classList.add('active');
      }
    }

    // 初期表示
    handleNavigation(mediaQuery);

    // 変更を監視
    mediaQuery.addEventListener('change', handleNavigation);
  </script>
</body>
</html>
```

---

### 例2: 複数のブレークポイント

```javascript
// ブレークポイントの定義
const breakpoints = {
  mobile: window.matchMedia('(max-width: 767px)'),
  tablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
  desktop: window.matchMedia('(min-width: 1024px)')
};

function handleBreakpointChange() {
  if (breakpoints.mobile.matches) {
    console.log('モバイル表示');
    applyMobileLayout();
  } else if (breakpoints.tablet.matches) {
    console.log('タブレット表示');
    applyTabletLayout();
  } else if (breakpoints.desktop.matches) {
    console.log('デスクトップ表示');
    applyDesktopLayout();
  }
}

// 初期化
handleBreakpointChange();

// すべてのブレークポイントを監視
Object.values(breakpoints).forEach(mq => {
  mq.addEventListener('change', handleBreakpointChange);
});

function applyMobileLayout() {
  document.body.className = 'layout-mobile';
}

function applyTabletLayout() {
  document.body.className = 'layout-tablet';
}

function applyDesktopLayout() {
  document.body.className = 'layout-desktop';
}
```

---

### 例3: ダークモードの検知

```javascript
// ダークモードの検知
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function handleDarkMode(e) {
  if (e.matches) {
    // ダークモード
    document.body.classList.add('dark-theme');
    console.log('ダークモードが有効です');
  } else {
    // ライトモード
    document.body.classList.remove('dark-theme');
    console.log('ライトモードが有効です');
  }
}

// 初期化
handleDarkMode(darkModeQuery);

// 変更を監視（ユーザーがOSの設定を変更した時）
darkModeQuery.addEventListener('change', handleDarkMode);
```

---

### 例4: デバイスの向きの検知

```javascript
// 縦向き/横向きの検知
const portraitQuery = window.matchMedia('(orientation: portrait)');
const landscapeQuery = window.matchMedia('(orientation: landscape)');

function handleOrientation() {
  if (portraitQuery.matches) {
    console.log('縦向き');
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
  } else if (landscapeQuery.matches) {
    console.log('横向き');
    document.body.classList.add('landscape');
    document.body.classList.remove('portrait');
  }
}

// 初期化
handleOrientation();

// 変更を監視
portraitQuery.addEventListener('change', handleOrientation);
landscapeQuery.addEventListener('change', handleOrientation);
```

---

### 例5: タッチデバイスの検知

```javascript
// ホバー可能かどうかの検知
const hoverQuery = window.matchMedia('(hover: hover)');

function handleHover(e) {
  if (e.matches) {
    // マウスなどのホバーデバイスあり
    console.log('ホバー可能なデバイス');
    enableHoverEffects();
  } else {
    // タッチデバイスなど
    console.log('タッチデバイス');
    disableHoverEffects();
  }
}

handleHover(hoverQuery);
hoverQuery.addEventListener('change', handleHover);

function enableHoverEffects() {
  document.body.classList.add('hover-enabled');
}

function disableHoverEffects() {
  document.body.classList.remove('hover-enabled');
}
```

---

## よく使うメディアクエリ

### 画面幅

```javascript
// 画面幅
const mobile = window.matchMedia('(max-width: 767px)');
const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
const desktop = window.matchMedia('(min-width: 1024px)');

// 範囲指定
const mediumUp = window.matchMedia('(min-width: 768px)');
const largeDown = window.matchMedia('(max-width: 1023px)');
```

---

### カラースキーム

```javascript
// ダークモード
const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

// ライトモード
const lightMode = window.matchMedia('(prefers-color-scheme: light)');
```

---

### デバイスの向き

```javascript
// 縦向き
const portrait = window.matchMedia('(orientation: portrait)');

// 横向き
const landscape = window.matchMedia('(orientation: landscape)');
```

---

### ホバーの可否

```javascript
// ホバー可能（マウスなど）
const canHover = window.matchMedia('(hover: hover)');

// ホバー不可（タッチデバイス）
const cannotHover = window.matchMedia('(hover: none)');
```

---

### アニメーション削減設定

```javascript
// アニメーション削減を希望
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleMotion(e) {
  if (e.matches) {
    // アニメーションを無効化
    document.body.classList.add('reduce-motion');
  } else {
    document.body.classList.remove('reduce-motion');
  }
}

handleMotion(reduceMotion);
reduceMotion.addEventListener('change', handleMotion);
```

---

## 実践的なパターン

### パターン1: レスポンシブ画像の切り替え

```javascript
const imageElement = document.getElementById('hero-image');
const desktopQuery = window.matchMedia('(min-width: 1024px)');

function updateImage(e) {
  if (e.matches) {
    // デスクトップ用の大きい画像
    imageElement.src = 'hero-desktop.jpg';
  } else {
    // モバイル用の小さい画像
    imageElement.src = 'hero-mobile.jpg';
  }
}

updateImage(desktopQuery);
desktopQuery.addEventListener('change', updateImage);
```

---

### パターン2: レスポンシブなスライダー設定

```javascript
import Swiper from 'swiper';

const tabletQuery = window.matchMedia('(min-width: 768px)');
let swiper = null;

function initSwiper() {
  if (tabletQuery.matches) {
    // タブレット以上: 複数スライド表示
    swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 20
    });
  } else {
    // モバイル: 1スライドのみ
    swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 10
    });
  }
}

function handleSwiperChange(e) {
  // 既存のスライダーを破棄
  if (swiper) {
    swiper.destroy();
  }

  // 新しい設定で再初期化
  initSwiper();
}

// 初期化
initSwiper();

// ブレークポイント変更時に再初期化
tabletQuery.addEventListener('change', handleSwiperChange);
```

---

### パターン3: モーダルの動作切り替え

```javascript
const modal = document.getElementById('modal');
const mobileQuery = window.matchMedia('(max-width: 767px)');

function handleModal(e) {
  if (e.matches) {
    // モバイル: フルスクリーンモーダル
    modal.classList.add('fullscreen');
  } else {
    // デスクトップ: 中央配置モーダル
    modal.classList.remove('fullscreen');
  }
}

handleModal(mobileQuery);
mobileQuery.addEventListener('change', handleModal);
```

---

## パフォーマンス比較

### resizeイベント vs matchMedia

```javascript
let resizeCount = 0;
let matchMediaCount = 0;

// ❌ resizeイベント
window.addEventListener('resize', () => {
  resizeCount++;
  console.log('resizeイベント:', resizeCount);
});

// ✅ matchMedia
const mq = window.matchMedia('(min-width: 768px)');
mq.addEventListener('change', () => {
  matchMediaCount++;
  console.log('matchMedia:', matchMediaCount);
});

// ウィンドウサイズを変更した結果:
// resizeイベント: 50回以上
// matchMedia: 1回（ブレークポイント通過時のみ）
```

---

## よくある質問

### Q1: addListenerとaddEventListenerの違いは？

**A: addListenerは非推奨です。addEventListenerを使いましょう。**

```javascript
const mq = window.matchMedia('(min-width: 768px)');

// ❌ 非推奨
mq.addListener((e) => { /* ... */ });

// ✅ 推奨
mq.addEventListener('change', (e) => { /* ... */ });
```

---

### Q2: 複数のメディアクエリを同時に監視できる？

**A: はい、複数のMediaQueryListを作成できます。**

```javascript
const mobile = window.matchMedia('(max-width: 767px)');
const tablet = window.matchMedia('(min-width: 768px)');

mobile.addEventListener('change', handleMobile);
tablet.addEventListener('change', handleTablet);
```

---

### Q3: 初期化時の処理は？

**A: addEventListener前に一度手動で呼び出します。**

```javascript
const mq = window.matchMedia('(min-width: 768px)');

function handleChange(e) {
  // 処理
}

// ✅ 初期化
handleChange(mq);

// 変更を監視
mq.addEventListener('change', handleChange);
```

---

## 実践演習

### 演習1: シンプルなレスポンシブメッセージ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>matchMedia 演習</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
    }

    #message {
      padding: 20px;
      border-radius: 8px;
      font-size: 18px;
      text-align: center;
    }

    .mobile {
      background: #e74c3c;
      color: white;
    }

    .desktop {
      background: #3498db;
      color: white;
    }
  </style>
</head>
<body>
  <div id="message"></div>

  <script>
    const messageEl = document.getElementById('message');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    function updateMessage(e) {
      if (e.matches) {
        messageEl.textContent = 'モバイル表示（768px未満）';
        messageEl.className = 'mobile';
      } else {
        messageEl.textContent = 'デスクトップ表示（768px以上）';
        messageEl.className = 'desktop';
      }
    }

    // 初期化
    updateMessage(mobileQuery);

    // 変更を監視
    mobileQuery.addEventListener('change', updateMessage);
  </script>
</body>
</html>
```

---

### 演習2: ダークモード切り替え

```javascript
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 保存された設定を読み込む
let darkMode = localStorage.getItem('darkMode');

if (darkMode === null) {
  // 設定がない場合はOSの設定を使用
  darkMode = prefersDark.matches ? 'enabled' : 'disabled';
}

// 初期化
applyDarkMode(darkMode === 'enabled');

// ボタンクリックで切り替え
darkModeToggle.addEventListener('click', () => {
  const isEnabled = document.body.classList.contains('dark-theme');
  const newMode = !isEnabled;

  applyDarkMode(newMode);
  localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
});

// OSの設定変更を監視
prefersDark.addEventListener('change', (e) => {
  // 保存された設定がない場合のみ
  if (localStorage.getItem('darkMode') === null) {
    applyDarkMode(e.matches);
  }
});

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-theme');
    darkModeToggle.textContent = 'ライトモード';
  } else {
    document.body.classList.remove('dark-theme');
    darkModeToggle.textContent = 'ダークモード';
  }
}
```

---

## まとめ

### 重要ポイント

1. **matchMediaは効率的**
   - ブレークポイント通過時のみ実行
   - resizeイベントより50倍以上効率的

2. **基本的な使い方**
   ```javascript
   const mq = window.matchMedia('(min-width: 768px)');
   mq.addEventListener('change', callback);
   ```

3. **初期化を忘れない**
   ```javascript
   handleChange(mq);  // 初期化
   mq.addEventListener('change', handleChange);
   ```

4. **よく使うメディアクエリ**
   - 画面幅: `(min-width: 768px)`
   - ダークモード: `(prefers-color-scheme: dark)`
   - 向き: `(orientation: portrait)`
   - ホバー: `(hover: hover)`

5. **addListenerは非推奨**
   - `addEventListener`を使用する

### 使用場面

- ✅ レスポンシブナビゲーション
- ✅ 画像の切り替え
- ✅ スライダーの設定変更
- ✅ ダークモード対応
- ✅ デバイスの向き対応

### チェックリスト

- [ ] matchMediaの基本を理解した
- [ ] レスポンシブなJavaScriptを書ける
- [ ] 初期化処理を適切に行える
- [ ] 複数のブレークポイントを扱える
- [ ] ダークモードに対応できる

---

## 参考リンク

- [MDN - Window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)
- [Zenn - matchMediaの実装](https://zenn.dev/no4_dev/articles/878f4afbff6668d4e28a-2)

---

**お疲れ様でした！JavaScript学習ガイドを完了しました！** 🎉
