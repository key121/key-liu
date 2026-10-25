# 劉展麟｜個人品牌網站

中信房屋 冠軍商仲 微笑台北店 店協理 劉展麟 的個人網站（純靜態 HTML/CSS/JS，無需建置），部署於 GitHub Pages：
https://key121.github.io/key-liu/

## 如何修改內容
所有文字、實績、媒體採訪、獎項、服務連結、社群連結都在 **`data/site.json`**，改完推上 main 即自動更新。

- **新增獎項**：在 `awards.groups[].items` 加一筆 `{ "year", "title", "org", "detail", "photos":[{ "src", "thumb", "caption" }] }`，照片放 `assets/awards/`（建議長邊 1600px，另存 `-thumb.jpg` 約 800px）。
- **新增媒體採訪**：在 `press` 加一筆 `{ "outlet", "title", "url", "thumb", "video", "date" }`，縮圖 800×450 放 `assets/press/`（請下載到本地，勿外連）。縮圖失效會自動顯示媒體名稱卡片。
- **實績卡片**：`stats`（第一張 `feature:true` 為主卡）。
- 文案規範：一律寫「13年多」；不使用無法查證的排名或比較性用語。

## 本機預覽
```
python3 -m http.server 8000
```
開啟 http://localhost:8000/（需用伺服器開啟，直接點 index.html 無法讀取 JSON）。

製作人：劉展麟
