# ヒーローセクション背景画像の設定方法

## 現在の状況
- `images/hero-background.jpg` ファイルが存在しないため、背景画像が表示されません
- 現在は美しいグラデーション背景で代替表示されています

## 背景画像を追加する方法

### 1. 画像ファイルの準備
推奨される画像の仕様：
- ファイル名: `hero-background.jpg`
- 推奨サイズ: 1920×1080px以上（高解像度対応）
- フォーマット: JPG, PNG, WebP
- 内容: 企業のイメージに合う風景、オフィス、抽象的なデザインなど

### 2. ファイル配置
画像ファイルを以下の場所に配置してください：
```
/images/hero-background.jpg
```

### 3. CSSの有効化
画像ファイルを配置後、以下のいずれかの方法でCSSを有効化：

#### 方法A: HTMLにクラス追加
`index.html`のヒーローセクションに`hero-with-bg-image`クラスを追加：
```html
<section id="home" class="hero hero-with-bg-image">
```

#### 方法B: CSS直接修正
`css/style.css`の225行目のコメントを削除：
```css
background-image: url('../images/hero-background.jpg');
```

## 推奨画像の特徴
- 暗めの色調（テキストが白色のため）
- コントラストが適度にある
- 企業のブランドイメージに合致
- 高品質で鮮明

## トラブルシューティング
- ブラウザのキャッシュをクリア（Ctrl+F5 / Cmd+Shift+R）
- ファイルパスが正しいか確認
- ファイル名に空白や特殊文字がないか確認