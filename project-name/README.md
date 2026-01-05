# 個人待辦事項系統 (Personal Todo System)

這是一個使用 **React**、**Node.js (Express)**、**MongoDB** 和 **Docker** 建構的現代化全端待辦事項應用程式。

## 專案功能
-  現代化 Glassmorphism 使用者介面
-  建立、讀取、更新、刪除待辦事項 (CRUD)
-  狀態與優先級管理
-  容器化的 MongoDB 資料庫
-  響應式設計 (Responsive Design)

## 加分項目實現說明

### 1. 設計模式應用 (Design Patterns)
- **後端 (Backend)**:
  - **MVC Pattern**: 採用 Controller (業務邏輯)、Model (資料定義)、Route (路由分發) 分層架構。
  - **Repository Pattern (Implicit)**: 使用 Mongoose Models 作為資料存取層，封裝了對 MongoDB 的直接操作。
  - **Singleton Pattern**: 資料庫連線實例 (`server.js` 中的 `mongoose.connect`) 與 Express App 實例在執行期間皆為單例。
- **前端 (Frontend)**:
  - **Observer Pattern**: 使用 React `Context API` (`AuthContext`) 實作全域狀態管理，當登入狀態改變時，所有訂閱的元件 (Observer) 會自動更新。
  - **Component Pattern**: 將樣式與邏輯封裝於獨立元件 (`TodoItem`, `TodoForm`)，提高重用性與可維護性。

### 2. 登入與權限管理
- **實作方式**: 採用 JWT (JSON Web Token) 認證機制。
- **流程**: 使用者登入 -> 後端簽發 Token -> 前端儲存 Token (Local Storage) -> 用戶端請求帶上 Header `Authorization: Bearer <token>` -> 後端 Middleware 驗證權限。
- **安全性**: 密碼經過 bcrypt 加密儲存，並實作 `authMiddleware` 保護私有路由。

## 技術選擇
- **React**: 擁有龐大的生態系統與元件化開發模式，適合建構互動性高的現代化 UI。
- **Node.js + Express**: 輕量、高效且與前端共用 JavaScript 語言，降低開發切換成本。
- **MongoDB**: NoSQL 資料庫的靈活性非常適合處理待辦事項這類結構多變的資料 (JSON-like)。
- **Docker**: 提供一致的開發與部署環境，消除「在我的電腦上可以跑」的問題。

## 系統架構

### 架構圖
本專案採用經典的前後端分離架構，資料庫使用 MongoDB 進行資料持久化。

```mermaid
graph TD
    Client["前端應用 (React + Vite)"]
    Server["後端 API (Node.js + Express)"]
    DB[("資料庫 MongoDB")]

    Client -->|HTTP Request / JSON| Server
    Server -->|Mongoose ODM| DB
    DB -->|Data| Server
    Server -->|JSON Response| Client
```

### 使用者流程圖 (登入與新增事項)
以下展示使用者登入系統並新增一個待辦事項的資料流向。

```mermaid
sequenceDiagram
    participant U as 使用者
    participant F as "前端 (React)"
    participant B as "後端 (Express)"
    participant D as "資料庫 (MongoDB)"

    Note over U, F: 使用者登入
    U->>F: 輸入帳號密碼並送出
    F->>B: POST /api/auth/login
    B->>D: 查詢使用者資料
    D-->>B: 回傳使用者資訊
    B->>B: 驗證密碼 & 簽發 Token (JWT)
    B-->>F: 回傳 Access Token
    F-->>U: 登入成功，導向首頁

    Note over U, F: 新增待辦事項
    U->>F: 輸入事項內容並點擊新增
    F->>B: POST /api/todos (Header: Bearer Token)
    B->>B: 驗證 Token 合法性
    B->>D: 寫入新的 Todo 文件
    D-->>B: 回傳寫入結果
    B-->>F: 回傳新事項資料 (201 Created)
    F-->>U: 更新畫面列表
```

## 安裝與執行指引

### 先決條件
請確保您的電腦已安裝以下軟體：
- [Node.js](https://nodejs.org/) (v14 或更高版本)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

### 1. 啟動資料庫
使用 Docker Compose 快速啟動 MongoDB 服務：
```bash
docker-compose up -d
```

### 2. 後端設定與啟動
進入後端目錄，安裝依賴套件並啟動伺服器：
```bash
cd backend
npm install
# 啟動開發伺服器 (預設埠號 5000)
npm run dev
```

### 3. 前端設定與啟動
進入前端目錄，安裝依賴套件並啟動開發伺服器：
```bash
cd frontend
npm install
# 啟動前端開發環境 (預設埠號 5173)
npm run dev
```

啟動後，請在瀏覽器開啟 `http://localhost:5173` 即可使用應用程式。

## 專案結構說明
- `backend/`: 後端 API 程式碼、Mongoose 模型與控制器
- `frontend/`: 前端 React + Vite 應用程式原始碼
- `docs/`: 專案文件與資源
- `docker-compose.yml`: Docker 編排設定檔

## API 參考文件
詳細的 API 規格請參閱 [docs/api-spec.md](docs/api-spec.md)。
