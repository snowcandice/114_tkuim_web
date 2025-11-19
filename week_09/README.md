## 如何啟動後端（npm install、npm run dev）?
* 步驟一:進入server資料夾，安裝專案所需的所有套件
* 步驟二:使用 nodemon 啟動開發模式的伺服器。伺服器會自動監聽檔案變動並重新啟動

## 如何啟動前端（Live Server / Vite）?
* 啟動方式Live Server:
* 步驟一:在VS Code中，進入專案資料夾
* 步驟二:開啟html檔案
* 步驟三:在檔案編輯器中點擊右鍵，選擇 "Open with Live Server"

## API 端點文件與測試方式 ?
API端點文件方法有：
*GET /health(伺服器健康檢查)
*GET /api/signup(取得當前記憶體中所有報名者的清單與總數)
*GET /api/signup(提交新的報名資料)

測試方式cURL指令:
在新的終端機運行，先輸入curl http://localhost:3001/health，再輸入curl -X POST http://localhost:3001/api/signup -H "Content-Type: application/json" -d '{"name": "Test", "email": "a@a.com", "phone": "0912345678", "password": "passpass", "confirmPassword": "passpass", "interests": ["前端"], "terms": true}'

測試方式Postman:
先建立Collection與環境變數，建立一個名為Week09 Signup API 的 Collection，設定參數變數名稱為baseUrl、初始值http://localhost:3001，用GET {{baseUrl}}/health健康檢查。用POST {{baseUrl}}/api/signup選擇raw、格式選JSON，建立報名表單。在BODY貼上後端要求的所有欄位。用GET {{baseUrl}}/api/signup，查看報名清單。

測試方式VS Code REST Client:
先下載Rest Client，把指令貼在Week09/tests/api.http 檔案中，全選之後按右鍵選擇Send Request進行測試。

