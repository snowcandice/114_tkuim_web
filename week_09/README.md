## 如何啟動後端（npm install、npm run dev）?
1. 建立資料夾結構 : 
mkdir -p Week09/server Week09/tests Week09/client
cd Week09/server
npm init -y
npm install express cors dotenv nanoid
npm install -D nodemon
npm pkg set type="module"
2. 設定 package.json Script
3. 建立 .env
4. 撰寫 app.js（放在 server/ 根目錄）
5. 建立 routes/signup.js
6. 啟動伺服器 : npm run dev

## 如何啟動前端（Live Server / Vite）?

## API 端點文件與測試方式 ?
