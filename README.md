# 端午節 LIFF 公告頁面

這是一個不需要後端的靜態 LIFF 網頁。使用者點擊 LIFF URL 後，會在 LINE 內看到端午節公告；按下「我知道了」會關閉 LIFF 視窗。

## 1. 修改公告內容

開啟 `config.js`，修改以下欄位：

- `liffId`：LINE Developers Console 產生的 LIFF ID
- `companyName`：公司名稱
- `period`：休假或服務調整日期
- `message`：公告內文
- `resumeText`：恢復服務時間或祝福語
- `contactUrl`：LINE 官方帳號加入好友／聊天室網址；留空則隱藏按鈕
- `showOncePerDevice`：設為 `true` 時，同一裝置確認後不再顯示

## 2. 部署到 HTTPS 網址

LIFF Endpoint URL 必須使用 HTTPS。可選擇：

### GitHub Pages

1. 建立 GitHub repository。
2. 將 `index.html`、`style.css`、`config.js`、`app.js` 上傳到 repository 根目錄。
3. 前往 **Settings → Pages**。
4. Source 選擇 **Deploy from a branch**。
5. Branch 選 `main`、資料夾選 `/root`。
6. 儲存後取得網址，例如：
   `https://你的帳號.github.io/你的專案/`

也可部署到 Cloudflare Pages、Netlify、Vercel 或公司既有 HTTPS 主機。

## 3. 建立 LINE Login Channel

1. 登入 LINE Developers Console。
2. 選擇公司使用的 Provider。
3. 建立 **LINE Login channel**，App type 選 **Web app**。
4. 若要連結既有 LINE 官方帳號：
   - 該官方帳號必須先啟用 Messaging API。
   - Messaging API channel 與 LINE Login channel 必須位於同一個 Provider。
   - 在 LINE Login channel 的 **Basic settings → Linked LINE Official Account** 選擇公司的官方帳號。

> LIFF 不能直接新增在 Messaging API channel；需使用 LINE Login channel 或 LINE MINI App channel。

## 4. 新增 LIFF App

1. 進入 LINE Login channel。
2. 開啟 **LIFF** 頁籤，按 **Add**。
3. 建議設定：
   - LIFF app name：`端午節服務公告`
   - Size：`Tall`
   - Endpoint URL：步驟 2 的 HTTPS 網址
   - Scopes：若只顯示公告，可只使用 `openid`
   - Add friend option：依需求選擇
4. 建立後複製 LIFF ID，例如：
   `1234567890-AbCdEfGh`
5. 將 LIFF ID 貼入 `config.js` 的 `liffId`。
6. 重新部署網頁。

## 5. 使用 LIFF URL

建立完成後會取得網址：

`https://liff.line.me/你的_LIFF_ID`

可將此網址放在：

- LINE 官方帳號圖文選單
- 圖文訊息
- 群發訊息按鈕
- Flex Message 按鈕
- 歡迎訊息

注意：一般 LINE 官方帳號聊天室不能在客戶進入時，未經點擊就自動開啟 LIFF。客戶仍需點擊 LIFF URL 或按鈕。

## 檔案結構

```text
dragonboat-liff/
├── index.html
├── style.css
├── config.js
├── app.js
└── README.md
```
