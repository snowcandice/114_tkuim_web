# Personal Todo System

A modern, full-stack Personal Todo Application built with **React**, **Node.js (Express)**, **MongoDB**, and **Docker**.

## Features
- ✨ Modern, Glassmorphism UI
- 📝 Create, Read, Update, Delete Todos
- 🏷️ Status and Priority Management
- 🐳 Dockerized MongoDB
- 📱 Responsive Design

## Prerequisites
- Node.js (v14+)
- Docker & Docker Compose
- Git

## Getting Started

### 1. Database Setup
Start the MongoDB container:
```bash
docker-compose up -d
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
# Start the server (default port 5000)
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
npm install axios react-icons
# Start the development server (default port 5173)
npm run dev
```

## Project Structure
- `backend/`: Express API and Mongoose models
- `frontend/`: React + Vite application
- `docs/`: Documentation and assets

## API
See [docs/api-spec.md](docs/api-spec.md) for details.
