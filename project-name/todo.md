# 個人待辦清單系統 (Personal Todo System) 規劃

## 1. 系統方向 (System Direction)
本系統旨在建立一個外觀精美、操作流暢的個人化待辦事項管理工具。
- **核心技術**: 全端統一使用 **JavaScript**。
- **前端 (Frontend)**: 專注於高互動性與現代化 UI/UX。
    - 技術: 建議使用 **React** 或 **Vue** (現代化前端框架)，搭配 Vite 建置。
    - 風格: 採用現代極簡風格 (Minimalist)、玻璃擬態 (Glassmorphism) 或深色模式 (Dark Mode)。
- **後端 (Backend)**: 提供穩定且快速的 API 服務。
    - 技術: Node.js 環境。
    - 框架: Express.js 或 Koa.js。
- **資料儲存 (Database)**:
    - **核心**: MongoDB (NoSQL 資料庫)。
    - **部署**: 使用 Docker 容器化部署 (Docker Compose)。

## 2. 系統功能 (System Functions)

### 核心功能 (Core Features)
1.  **待辦事項管理 (CRUD)**
    - **新增 (Create)**: 快速建立事項，支援標題與詳細描述。
    - **讀取 (Read)**: 列表顯示，支援分頁或無限捲動。
    - **更新 (Update)**: 編輯內容、標記完成/未完成。
    - **刪除 (Delete)**: 移除不再需要的項目 (支援軟刪除或永久刪除)。

2.  **狀態與分類 (Status & Categorization)**
    - **狀態追蹤**: 待辦 (Pending)、進行中 (In Progress)、已完成 (Completed)。
    - **優先級**: 高 (High)、中 (Medium)、低 (Low) 標示。
    - **標籤系統 (Tags)**: 可自定義標籤 (如: 工作、生活、學習)。

3.  **搜尋與過濾 (Search & Filter)**
    - 關鍵字即時搜尋。
    - 依狀態、優先級或標籤篩選顯示內容。

### API 規格與開發規範 (API & Dev Standards)
- **API 設計 (RESTful)**:
    - `POST /api/todos`: 新增待辦事項。
    - `GET /api/todos`: 取得所有待辦事項。
    - `GET /api/todos/:id`: 取得特定待辦事項。
    - `PUT /api/todos/:id`: 更新待辦事項。
    - `DELETE /api/todos/:id`: 刪除待辦事項。
- **回應格式**: 統一 JSON 格式，包含 `success` (boolean), `data`, `message`。
- **錯誤處理**: HTTP 狀態碼 (200, 201, 400, 404, 500)。

### 版本控制與部署 (Git & Deployment)
- **Git**:
    - 至少 5 次 commit。
    - 訊息格式: `feat`, `fix`, `docs`, `style`, `refactor` (e.g., `feat: 新增待辦列表頁面`)。
- **部署**: 本機部署 (Localhost)，附帶完整操作手冊。

### 進階體驗 (User Experience)
- **拖放排序 (Drag & Drop)**: 直覺地調整事項順序。
- **微動畫 (Micro-animations)**: 按鈕回饋、列表載入動畫、完成時的慶祝特效。
- **響應式設計 (Responsive)**: 完美支援桌機與手機版面。

## 3. 開發架構 (Architecture)

### 目錄結構
```
project-name/
├── frontend/          # 負責使用者介面與前端互動邏輯
│   ├── src/           # 前端主要原始碼
│   ├── public/        # 靜態資源（圖片、圖示等）
│   └── package.json   # 前端套件管理與執行指令設定
├── backend/           # 負責系統 API、資料處理與核心商業邏輯
│   ├── controllers/   # 請求處理與商業邏輯控制
│   ├── models/        # 資料模型與結構定義
│   ├── routes/        # API 路由設定
│   └── package.json   # 後端套件與啟動設定
├── docs/              # 存放系統設計與技術相關文件
│   ├── api-spec.md    # API 規格文件
│   ├── architecture.png # 系統架構圖
│   └── flowchart.png  # 系統流程圖
├── README.md          # 專案整體說明、安裝方式與使用指引
└── todo.md            # 專案規劃文件
```
