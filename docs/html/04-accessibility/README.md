# アクセシビリティ編

アクセシビリティ（A11y）とは、障害の有無に関わらず、すべてのユーザーがWebサイトを利用できるようにすることです。

## アクセシビリティの重要性

### すべてのユーザーのために

アクセシビリティは特定の人だけでなく、すべてのユーザーに利益をもたらします。

**恩恵を受けるユーザー:**
- 視覚障害者（スクリーンリーダー使用者）
- 聴覚障害者
- 運動障害者（キーボードのみで操作）
- 認知障害者
- 一時的な障害を持つ人（骨折など）
- 高齢者
- モバイルユーザー
- 遅い回線のユーザー

### 法的要件

多くの国で、Webアクセシビリティは法的要件となっています。

- **アメリカ**: ADA（Americans with Disabilities Act）
- **EU**: European Accessibility Act
- **日本**: 障害者差別解消法

### SEOの向上

アクセシブルなサイトは、検索エンジンにも理解しやすくなります。

- セマンティックHTML → 構造が明確
- 代替テキスト → 画像の内容を理解
- 見出し階層 → コンテンツの構造を理解

## WCAG（Web Content Accessibility Guidelines）

WCAGは、W3Cが定めるWebアクセシビリティの国際標準です。

### 4つの原則（POUR）

#### 1. Perceivable（知覚可能）
ユーザーが情報を知覚できること

**例:**
- 画像に代替テキスト
- 動画に字幕
- 十分なコントラスト比

#### 2. Operable（操作可能）
ユーザーがインターフェースを操作できること

**例:**
- キーボードで操作可能
- 十分な時間を提供
- フォーカスが見える

#### 3. Understandable（理解可能）
情報とUIの操作方法が理解できること

**例:**
- 明確な言語
- 一貫したナビゲーション
- エラーメッセージが分かりやすい

#### 4. Robust（堅牢）
様々な支援技術で利用できること

**例:**
- 正しいHTML
- WAI-ARIA の適切な使用

### 適合レベル

| レベル | 説明 | 目標 |
|--------|------|------|
| A | 最低限 | 基本的な対応 |
| AA | 推奨 | **一般的な目標** |
| AAA | 最高 | 理想的だが、すべて達成は困難 |

**推奨: WCAG 2.1 AA への適合を目指す**

## このセクションで学ぶこと

### 1. WCAG基礎

[詳しく学ぶ →](./01-wcag-basics.md)

- WCAGの基本ガイドライン
- HTMLでの実装方法
- 代替テキストの書き方
- キーボード操作
- フォームのアクセシビリティ

### 2. WAI-ARIA

[詳しく学ぶ →](./02-wai-aria.md)

- ARIAロール
- ARIAプロパティ
- ARIAステート
- 実装例とベストプラクティス

### 3. アクセシブルなタブUI

[詳しく学ぶ →](./03-accessible-tabs.md)

- タブUIの実装
- キーボード操作
- スクリーンリーダー対応

## 基本的な実装

### 代替テキスト

```html
<!-- ✅ 良い例 -->
<img src="sunset.jpg" alt="海に沈む夕日">

<!-- ❌ 悪い例 -->
<img src="sunset.jpg" alt="画像">
<img src="sunset.jpg"> <!-- altがない -->
```

### セマンティックHTML

```html
<!-- ✅ 良い例 -->
<button type="button">クリック</button>

<!-- ❌ 悪い例 -->
<div onclick="handleClick()">クリック</div>
```

### 見出し階層

```html
<!-- ✅ 良い例 -->
<h1>ページタイトル</h1>
<h2>セクション</h2>
<h3>サブセクション</h3>

<!-- ❌ 悪い例 -->
<h1>ページタイトル</h1>
<h3>セクション</h3> <!-- h2を飛ばしている -->
```

### キーボード操作

```html
<!-- ✅ 良い例: ボタンは自動的にフォーカス可能 -->
<button type="button">送信</button>

<!-- ❌ 悪い例: divはフォーカスできない -->
<div onclick="submit()">送信</div>

<!-- ⚠️ 必要な場合のみ -->
<div tabindex="0" role="button" onclick="submit()">送信</div>
```

## スクリーンリーダーテスト

### 主要なスクリーンリーダー

| OS | スクリーンリーダー | 価格 |
|----|------------------|------|
| Windows | NVDA | 無料 |
| Windows | JAWS | 有料（体験版あり） |
| macOS | VoiceOver | 無料（標準搭載） |
| iOS | VoiceOver | 無料（標準搭載） |
| Android | TalkBack | 無料（標準搭載） |

### VoiceOverの起動方法（Mac）

```
Command + F5
```

### 基本的な操作

| 操作 | ショートカット |
|------|---------------|
| 次の項目へ移動 | VO + →（VO = Control + Option） |
| 前の項目へ移動 | VO + ← |
| クリック | VO + Space |
| 見出しジャンプ | VO + Command + H |

## アクセシビリティチェックツール

### 自動チェックツール

1. **Lighthouse**（Chrome DevTools）
   - Chromeに標準搭載
   - アクセシビリティスコアを表示

2. **axe DevTools**（ブラウザ拡張）
   - 詳細な問題検出
   - 修正方法の提案

3. **WAVE**（ブラウザ拡張）
   - 視覚的に問題を表示
   - 無料版で基本機能利用可

### 手動チェック

自動ツールでは検出できない問題もあるため、手動チェックも重要です。

**チェック項目:**
- [ ] キーボードのみで操作できるか
- [ ] スクリーンリーダーで内容を理解できるか
- [ ] 画像を無効にしても内容が分かるか
- [ ] CSSを無効にしても構造が分かるか
- [ ] 十分なコントラスト比があるか

## コントラスト比

### WCAG AAの要件

| テキストサイズ | 最小コントラスト比 |
|---------------|------------------|
| 通常テキスト（18px未満） | 4.5:1 |
| 大きなテキスト（18px以上） | 3:1 |

### チェックツール

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: カラーピッカーにコントラスト比表示

### 実装例

```css
/* ✅ 良い例: コントラスト比 7:1 */
.text {
  color: #333333;
  background-color: #ffffff;
}

/* ❌ 悪い例: コントラスト比 2.5:1 */
.text-bad {
  color: #999999;
  background-color: #ffffff;
}
```

## フォームのアクセシビリティ

### label要素の関連付け

```html
<!-- ✅ 良い例 -->
<label for="email">メールアドレス:</label>
<input type="email" id="email" name="email">

<!-- ❌ 悪い例 -->
<span>メールアドレス:</span>
<input type="email" name="email">
```

### 必須項目の明示

```html
<label for="name">
  名前 <span aria-label="必須">*</span>
</label>
<input
  type="text"
  id="name"
  name="name"
  required
  aria-required="true">
```

### エラーメッセージ

```html
<label for="email">メールアドレス:</label>
<input
  type="email"
  id="email"
  name="email"
  aria-invalid="true"
  aria-describedby="email-error">
<span id="email-error" role="alert">
  有効なメールアドレスを入力してください
</span>
```

## 実践チェックリスト

### 基本

- [ ] すべての画像に`alt`属性
- [ ] 見出し（h1〜h6）を階層的に使用
- [ ] リンクテキストが明確
- [ ] フォームの各入力に`label`を関連付け

### キーボード操作

- [ ] Tabキーですべての操作可能な要素に移動できる
- [ ] フォーカスが視覚的に分かる
- [ ] Enterキーでリンクやボタンを実行できる
- [ ] Escキーでモーダルを閉じられる

### スクリーンリーダー

- [ ] ページタイトルが適切
- [ ] ランドマーク（header、nav、main、footer）を使用
- [ ] フォームのエラーがアナウンスされる
- [ ] 動的コンテンツの変更が通知される

### 色とコントラスト

- [ ] コントラスト比が基準を満たす
- [ ] 色だけで情報を伝えていない
- [ ] フォーカス表示が明確

## まとめ

### アクセシビリティ向上の手順

1. **セマンティックHTMLを使う**
   - 適切な要素を選択
   - 見出し階層を守る

2. **キーボード操作を確保**
   - フォーカス可能な要素を使用
   - フォーカス順序を確認

3. **代替コンテンツを提供**
   - 画像にalt属性
   - 動画に字幕

4. **ARIAで補完**
   - ネイティブHTMLで不足する場合のみ
   - 過剰に使わない

5. **テストする**
   - 自動ツール
   - スクリーンリーダー
   - キーボードのみでの操作

## 次のステップ

各トピックについて詳しく学びましょう：

1. [WCAG基礎](./01-wcag-basics.md)
2. [WAI-ARIA](./02-wai-aria.md)
3. [アクセシブルなタブUI](./03-accessible-tabs.md)

## 参考リンク

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN - アクセシビリティ](https://developer.mozilla.org/ja/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
