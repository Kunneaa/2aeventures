# 2AE VENTURES Website

Website giới thiệu 2AE VENTURES, hiển thị catalog thực phẩm đông lạnh và nhận yêu cầu liên hệ/báo giá. Project hiện ưu tiên deploy bằng Render Blueprint với 2 service riêng: frontend Next.js và backend FastAPI.

## Tech Stack

- Frontend: Next.js 14, React, TypeScript, Tailwind CSS.
- Backend: FastAPI, Pydantic, JSONL file storage.
- Catalog: quản lý tập trung bằng JSON và sync sang frontend/backend.
- Deploy: Dockerfile cho từng service, Render Blueprint qua `render.yaml`.

## Cấu Trúc Chính

```text
2aeventures/
├── render.yaml
├── RENDER_DEPLOY.md
├── data/
│   └── catalog.json
├── scripts/
│   └── sync_catalog.py
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── app/
│   └── tests/
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── messages/
    ├── public/
    └── src/
```

Không commit `.env`, dependency folders, build output, cache hoặc dữ liệu khách. Có commit `data/catalog.json`, `backend/app/data/catalog.json` và `frontend/src/data/catalog.json` để Docker/Render build đúng catalog.

## Điểm Sửa Nhanh

- Brand, nội dung Home/About/Contact/Footer/Chatbot frontend: `frontend/src/config/brand.ts`.
- Hotline, email, địa chỉ, Google Maps, social links: `frontend/src/config/site.ts`.
- Catalog sản phẩm: `data/catalog.json`, sau đó chạy `python3 scripts/sync_catalog.py`.
- Ảnh sản phẩm: `frontend/public/images/products/`.
- Page chính: `frontend/src/app/[locale]/`.
- API backend: `backend/app/api/v1/`.
- Business logic backend: `backend/app/services/`.
- Lưu/đọc dữ liệu backend: `backend/app/repositories/`.
- Gợi ý chatbot backend: `backend/app/core/brand.py`.

## Catalog Sản Phẩm

Nguồn catalog chính:

```text
data/catalog.json
```

File này chứa `images`, `categories`, `products`, `featuredProductIds` và `homeFocusGroups`.

Quy trình thêm/sửa/xóa sản phẩm:

1. Cập nhật `data/catalog.json`.
2. Thêm hoặc thay ảnh trong `frontend/public/images/products/`.
3. Chạy:

```bash
python3 scripts/sync_catalog.py
```

Script sẽ validate dữ liệu rồi sync sang:

```text
backend/app/data/catalog.json
frontend/src/data/catalog.json
```

Không sửa tay 2 file copy này nếu không cần thiết.

## Chạy Local

Backend:

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm ci
npm run dev
```

Frontend local mặc định gọi backend qua proxy:

```dotenv
NEXT_PUBLIC_API_URL=/api/v1
API_PROXY_TARGET=http://localhost:8000
```

## Docker

Docker được giữ để Render build từng service riêng. Trước khi build Docker, nên sync catalog:

```bash
python3 scripts/sync_catalog.py
```

Build và chạy backend:

```bash
docker build -t 2ae-api ./backend
docker run --rm -p 8000:8000 \
  -e BACKEND_ENV=production \
  -e BACKEND_CORS_ORIGINS=http://localhost:3000 \
  -e BACKEND_ADMIN_TOKEN=local-admin-token \
  -e BACKEND_DATA_DIR=/app/data \
  2ae-api
```

Build và chạy frontend:

```bash
docker build -t 2ae-web ./frontend \
  --build-arg API_PROXY_TARGET=http://host.docker.internal:8000 \
  --build-arg NEXT_PUBLIC_API_URL=/api/v1

docker run --rm -p 3000:10000 \
  -e PORT=10000 \
  2ae-web
```

Ghi chú Docker:

- Backend image cần giữ `backend/app/data/catalog.json`; `.dockerignore` chỉ loại runtime data, không loại catalog app.
- Frontend Dockerfile build Next.js ở chế độ `standalone`.
- Với Render, frontend service chạy port `10000`; khi chạy local Docker, map `3000:10000`.

## Render

Repo dùng `render.yaml` ở root để tạo 2 web services:

- `twoae-demo-api`: FastAPI backend.
- `twoae-demo-web`: Next.js frontend.

Tạo Blueprint trên Render:

```text
Blueprint Name: 2aeventures
Branch: main
Blueprint Path: render.yaml
```

Biến chính trong `render.yaml`:

```text
BACKEND_CORS_ORIGINS=https://twoae-demo-web.onrender.com,https://2aeventures.com,https://www.2aeventures.com
BACKEND_DATA_DIR=/app/data
NEXT_PUBLIC_API_URL=/api/v1
API_PROXY_TARGET=https://twoae-demo-api.onrender.com
```

Nếu Render tạo URL service khác, sửa lại:

- Backend: `BACKEND_CORS_ORIGINS`.
- Frontend: `API_PROXY_TARGET`.

Nếu gắn custom domain `2aeventures.com` cho frontend Render, giữ domain đó trong `BACKEND_CORS_ORIGINS` để form contact/quote gọi backend được.

## Dữ Liệu Contact/Quote

Backend hiện lưu form vào JSONL:

```text
contacts.jsonl
quotes.jsonl
```

Vị trí lưu được quyết định bởi `BACKEND_DATA_DIR`.

Trên Render Free, filesystem là tạm thời. Dữ liệu có thể mất khi restart, redeploy hoặc spin down. Khi chạy chính thức, nên dùng Render Persistent Disk cho backend paid service hoặc chuyển sang database khi đã quyết định nơi lưu.

## Kiểm Tra

Sau khi sửa catalog:

```bash
python3 scripts/sync_catalog.py
```

Frontend:

```bash
cd frontend
npm run lint
npm run type-check
npm run test:unit
npm run test:integration
npm run build
```

Backend:

```bash
cd backend
python -m pytest tests
```

Kiểm tra Render config:

```bash
cat render.yaml
```

## Ghi Chú

- Không commit `.env`.
- Không commit `quotes.jsonl` hoặc `contacts.jsonl` nếu chứa dữ liệu khách.
- Không commit `.next/`, `node_modules/`, `.venv/`, cache hoặc build output.
- Khi đổi domain frontend, cập nhật lại CORS backend.
- Khi đổi backend Render URL, cập nhật lại `API_PROXY_TARGET` của frontend rồi redeploy frontend.
