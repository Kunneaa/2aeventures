# 2AE VENTURES

Website giới thiệu doanh nghiệp và catalog thực phẩm đông lạnh (nhập khẩu/xuất khẩu).

---

## 🛠 Tech Stack & Architecture

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python 3.11, Pydantic, JSONL Store)
- **Data (Single Source of Truth)**: Quản lý tập trung tại `data/catalog.json` và `data/images/`. Phân phối động qua symbolic links.
- **Deployment**: Docker, Render Blueprint (`render.yaml`)

---

## 📂 Project Structure

```text
2aeventures/
├── data/                    # Catalog gốc (catalog.json) & Ảnh gốc (images/)
├── backend/                 # Mã nguồn FastAPI backend (catalog.json trỏ symlink về root)
└── frontend/                # Mã nguồn Next.js frontend (catalog.json & images trỏ symlink về root)
```

---

## 🚀 Hướng Dẫn Phát Triển (Local)

### 1. Khởi chạy Backend
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
PYTHONPATH=. uvicorn app.main:app --reload --port 8000
```

### 2. Khởi chạy Frontend
```bash
cd frontend
npm ci
npm run dev
```
*Frontend tự động proxy các request `/api/v1` sang backend `http://localhost:8000`.*

---

## 🧪 Kiểm Thử (Testing)

* **Backend Tests**: `cd backend && PYTHONPATH=. pytest`
* **Frontend Checks**: `cd frontend && npm run lint && npm run type-check && npm run test:unit && npm run test:integration`

---

## 🌐 Deployment (Render)

Hệ thống deploy tự động qua Render blueprint (`render.yaml`):
- **API (backend)**: Chạy FastAPI qua `backend/Dockerfile` với build context ở thư mục gốc `.`.
- **Web (frontend)**: Chạy Next.js qua `frontend/Dockerfile` với build context ở thư mục gốc `.`.
