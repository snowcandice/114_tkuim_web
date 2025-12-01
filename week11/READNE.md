## 1. 環境需求
* Node.js
* npm
* Docker & Docker Compose: 用於運行 MongoDB 資料庫容器
* API 測試工具: Postman 

## 2. 啟動指令
* 啟動資料庫服務：進入week11/docker目錄，使用Docker Compose 啟動 MongoDB 容器。
<br>
程式碼:
<br>
docker compose up -d

* 啟動Node.js API服務：進入week/server目錄，安裝依賴並啟動Node.js服務。
<br>
程式碼:
<br>
npm install 
<br>
npm run dev

* 在week11/server目錄建立.env檔案，程式碼如下。這些變數用於Node.js服務連接Docker容器中的MongoDB。
<br>
程式碼:
<br>
PORT=3001
<br>
MONGODB_URI=mongodb://
<br>
week11-user:week11-pass@localhost:27017/week11?
<br>
authSource=week11
<br>
ALLOWED_ORIGIN=http://localhost:5173

* 在week11/docker目錄建立mongo-init.js檔案。這個程式會在容器第一次啟動時，建立您 Node.js 服務需要的資料庫和使用者。
<br>
程式碼:
<br>
```js
db.createUser({
  user: 'week11-user',
  pwd: 'week11-pass',
  roles: [{ role: 'readWrite', db: 'week11' }]
});
```js
db.createCollection('participants');
db.participants.insertOne({
  name: '示範學員',
  email: 'demo@example.com',
  phone: '0912345678',
  createdAt: new Date()
});

## 3. 測試方式
* 使用Postman，對以下 API 端點進行測試。

| 動作       | 方法 | URL                       | Body 範例 (JSON)                                                                 | 預期結果                                 |
|------------|------|---------------------------|----------------------------------------------------------------------------------|------------------------------------------|
| 建立報名   | `POST`  | `/api/signup`              | `{ "name": "新同學", "email": "new@example.com", "phone": "0911222333" }`                | 201 Created，回傳 `{ "id": "692d48bf363e4e3cd31569e3" }`      |
| 清單（預設） | `GET`   | `/api/signup`              | （無 Body）                                                                       | 200 OK，回傳 `page: 1`, `limit: 10`      |
| 清單（分頁） | `GET`   | `/api/signup?page=2&limit=5` | （無 Body）                                                                       | 200 OK，回傳 `page: 2`, `limit: 5`       |
| 更新資料   | `PATCH` | `/api/signup/{{valid_id}}` | `{ "phone": "0911000111", "status": "approved" }`                                | 200 OK，回傳 `{ "updated": 1 }`          |
| 刪除資料   | `DELETE`| `/api/signup/{{valid_id}}` | （無 Body）                                                                       | 204 No Content                           |


* Mongo Shell 驗證指令範例
這些指令可用於 mongosh 中，直接驗證資料庫操作結果，並示範 skip/limit
<br>
程式碼:
<br>
 進入 shell 之後執行
 <br>
use week11 

驗證 Email 唯一索引是否生效
<br>
db.participants.createIndex({ email: 1 }, { unique: true }) 
<br>
示範分頁：跳過前 1 筆資料，取出接下來 10 筆
<br>
db.participants.find().sort({ createdAt: -1 }).skip(1).limit(10)
<br>
獲取總數 (用於驗證 GET /total)
<br>
db.participants.countDocuments({})

## 4. 常見問題
* GET /api/signup?page=2... 沒有回傳資料：資料庫中總資料數量不足，所以才沒有回傳。
* PATCH 或 DELETE 請求回傳 500 Internal Server Error：通常是 ID 格式錯誤 或 變數未賦值。

## 5. MongoDB Compass 截圖
![截圖](<螢幕擷取畫面 2025-12-01 220046.png>)