# ピースサイン背景画像の設定完了

## 現在の設定

CSSは以下のピースサイン背景画像に対応済みです：

### ファイル名の想定
- `peace-sign.jpg`
- `peace-sign.jpeg` 
- `peace-sign.png`
- `hero-peace.jpg`
- その他のピースサイン関連画像

### 現在のCSS設定
```css
background-image: url('../images/peace-sign.jpg');
```

## 画像ファイルの配置手順

1. **ピースサイン画像を以下の場所に保存：**
   ```
   /images/peace-sign.jpg
   ```

2. **異なるファイル名の場合：**
   以下のファイルのパスを更新してください：
   - `css/style.css` 226行目と239行目

## 現在のカラーテーマ

**黄色と水色のピースサイン背景に最適化：**
- グラデーションオーバーレイ: 黄色（#FFD700）と水色（#00BFFF）
- テキストの視認性を確保するダークオーバーレイ
- アニメーション効果で黄色と水色の放射グラデーション

## 使用可能なファイル名

以下のいずれかのファイル名で画像を保存してください：
- `peace-sign.jpg` (推奨)
- `peace-sign.jpeg`
- `peace-sign.png`
- `hero-peace.jpg`
- `peace-background.jpg`

## 異なるファイル名を使用する場合

CSSファイルの以下の箇所を更新：
1. Line 226: `url('../images/YOUR_FILE_NAME.jpg')`
2. Line 239: `url('../images/YOUR_FILE_NAME.jpg')`

## ブラウザキャッシュクリア

画像変更後は以下のキーでリフレッシュ：
- **Windows**: Ctrl + F5
- **Mac**: Cmd + Shift + R
- **一般的な方法**: Ctrl/Cmd + R

## 確認事項

✅ CSS更新済み (黄色・水色対応)
✅ オーバーレイ調整済み
✅ アニメーション効果追加済み
❌ 画像ファイル配置待ち

画像ファイルを配置すれば、明るい黄色と水色のピースサイン背景が表示されます。