# 端午節 LIFF 公告｜GitHub Pages 版

## GitHub Pages 部署

請將本資料夾內的檔案直接上傳到 GitHub repository 根目錄：

- `.nojekyll`
- `index.html`
- `style.css`
- `config.js`
- `app.js`
- `README.md`

不要把整個 `dragonboat-liff` 資料夾再放進 repository，否則網址會多一層目錄。

前往：

`Settings → Pages → Build and deployment → Source: Deploy from a branch`

選擇：

- Branch：`main`
- Folder：`/(root)`

假設 GitHub 使用者名稱是 `USERNAME`，repository 名稱是 `dragonboat-liff`，
網站網址通常是：

`https://USERNAME.github.io/dragonboat-liff/`

此網址就是 LINE Developers 的 LIFF Endpoint URL。

取得 LIFF ID 後，編輯 `config.js`：

```js
liffId: "1234567890-AbCdEfGh",
```

儲存並 Commit。GitHub Pages 會在新的 commit 後重新部署。
