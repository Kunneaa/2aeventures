# 2AEVENTURES Website

Website giới thiệu 2AE Ventures, hiển thị catalog thực phẩm đông lạnh và nhận yêu cầu liên hệ/báo giá. Project hiện được tổ chức để deploy bằng Render Blueprint.

## Tech Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS.
- Backend: FastAPI, JSONL file storage.
- Deploy: Render Blueprint qua `render.yaml`.
- Runtime data: quote/contact lưu ở backend trong `BACKEND_DATA_DIR`.

## Cấu Trúc

```text
2aeventures/
├── render.yaml
├── RENDER_DEPLOY.md
├── backend/
│   ├── Dockerfile
│   ├── app/
│   ├── tests/
│   └── requirements*.txt
└── frontend/
    ├── Dockerfile
    ├── messages/
    ├── public/
    └── src/
```

Các thư mục local như `node_modules/`, `.next/`, `.venv/`, `data/`, `backups/` và cache đã được ignore.

## Frontend

Các phần chính nằm trong `frontend/src`:

- `app/[locale]`: home, about, products, product detail, cart, contact.
- `components`: layout, product card, chatbot, quick email, page memory.
- `store`: cart, catalog, language context.
- `services`: API client và service gọi backend.
- `lib`: mock catalog fallback, cookie helpers, quick email, search.

Chạy dev:

```bash
cd frontend
npm ci
npm run dev
```

Biến môi trường frontend:

```dotenv
NEXT_PUBLIC_API_URL=/api/v1
API_PROXY_TARGET=http://localhost:8000
NEXT_PUBLIC_APP_NAME=2AEVENTURES
NEXT_PUBLIC_DEFAULT_LOCALE=vi
NEXT_PUBLIC_ENABLED_LOCALES=vi,en
```

Trên Render, `API_PROXY_TARGET` trỏ về backend service Render.

## Backend

Các nhóm API chính:

- `GET /health`
- `GET /api/health`
- `GET /api/v1/products`
- `GET /api/v1/products/categories`
- `GET /api/v1/products/featured`
- `GET /api/v1/products/search?q=...`
- `GET /api/v1/products/category/{category_id}`
- `GET /api/v1/products/{product_id}`
- `POST /api/v1/quotes`
- `POST /api/v1/contact`
- `POST /api/v1/chat/session`
- `POST /api/v1/chat/send`
- `GET /api/v1/chat/suggestions`

Các endpoint đọc quote/contact cần header admin:

- `GET /api/v1/quotes`
- `GET /api/v1/quotes/{quote_id}`
- `GET /api/v1/contact`
- `GET /api/v1/contact/{message_id}`

Chạy dev:

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

Biến môi trường backend:

```dotenv
BACKEND_ENV=production
BACKEND_LOG_LEVEL=info
BACKEND_CORS_ORIGINS=https://twoae-demo-web.onrender.com
BACKEND_ADMIN_TOKEN=change-this-admin-token
BACKEND_DATA_DIR=./data
```

## Deploy Trên Render

Repo dùng `render.yaml` để tạo 2 web services:

- `twoae-demo-api`: FastAPI backend.
- `twoae-demo-web`: Next.js frontend.

Các bước chính:

1. Push code lên branch `main`.
2. Vào Render Dashboard, chọn **New > Blueprint**.
3. Kết nối repo GitHub và chọn branch `main`.
4. Để Blueprint Path mặc định là `render.yaml`.
5. Render tạo và deploy 2 services.

Chi tiết nằm trong `RENDER_DEPLOY.md`.

## Dữ Liệu Quote/Contact

Backend hiện lưu dữ liệu vào JSONL:

```text
quotes.jsonl
contacts.jsonl
```

Trên Render Free, filesystem là tạm thời. Dữ liệu có thể mất khi service restart/redeploy/spin down. Khi dùng chính thức để nhận lead ổn định, cần một trong hai hướng:

- Gắn Render Persistent Disk cho backend paid service.
- Chuyển sang managed database khi đã quyết định nơi lưu database.

## Kiểm Tra

Frontend:

```bash
cd frontend
npm run type-check
npm run test:unit
npm run test:integration
npm run build
```

Backend:

```bash
cd backend
python -m pytest
```

Render config:

```bash
cat render.yaml
```

## Ghi Chú

- Không commit `.env`.
- Không commit `data/` nếu chứa dữ liệu khách.
- Không commit build output hoặc dependency folders.
- Dockerfiles vẫn được giữ vì Render đang build từng service bằng Docker.
