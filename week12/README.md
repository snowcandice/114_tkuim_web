# Week12 – 登入、驗證與權限控管（Express + MongoDB + JWT）

本專案為 Week11 報名系統的延伸，加入 **使用者登入（Authentication）** 與  
**權限控管（Authorization）** 機制，避免未登入或未授權的使用者任意操作資料。

系統特色包含：
- 使用 bcrypt 儲存密碼雜湊（不存明碼）
- JWT 登入驗證與 Middleware 保護 API
- 角色與資料擁有者（owner）權限控管
- 前後端完整串接（登入 / 登出 / CRUD）

---

## 一、系統架構與技術

- **後端**：Node.js、Express
- **資料庫**：MongoDB（Docker）
- **驗證機制**：JWT（JSON Web Token）
- **密碼安全**：bcrypt
- **測試**：Vitest + Supertest + Mongo Memory Server
- **前端**：原生 HTML + JavaScript（fetch）

---

## 二、Authentication vs Authorization 說明

- **Authentication（身份驗證）**
  - 確認「你是誰」
  - 例如：Email + Password 登入

- **Authorization（授權）**
  - 確認「你可以做什麼」
  - 依角色（student / admin）或資料擁有者限制 CRUD

| 身份 | 可讀資料 | 可修改 | 可刪除 |
|----|----|----|----|
| 未登入 | ❌ | ❌ | ❌ |
| student | 只能看自己的 | 只能改自己的 | 只能刪自己的 |
| admin | 全部 | 全部 | 全部 |

---

## 三、環境需求

- Node.js v18+
- Docker / Docker Compose
- npm

---

## 四、專案啟動方式

### 1️⃣ 設定環境變數

在 `Week12/server` 目錄下建立 `.env` 檔案：

```env
PORT=3001
MONGO_URI=mongodb://week12-admin:week12-pass@localhost:27017/week12
JWT_SECRET=請設定一組長且隨機的字串
