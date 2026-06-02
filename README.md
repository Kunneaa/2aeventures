# 2AEVENTURES Website

Website giới thiệu và nhận yêu cầu báo giá cho 2AEVENTURES. Project gồm frontend Next.js, backend FastAPI, Caddy reverse proxy và Docker Compose để chạy toàn bộ hệ thống trên một máy riêng.

## Trạng Thái

- Frontend hỗ trợ tiếng Việt và tiếng Anh qua route `/:locale`.
- Trang sản phẩm hiển thị danh mục, tìm kiếm, lọc category và chi tiết sản phẩm.
- Giỏ hàng chỉ lưu danh sách sản phẩm quan tâm, không lưu số lượng.
- Form báo giá và form liên hệ gửi dữ liệu về backend.
- Dữ liệu quote/contact đang lưu file JSONL trong `data/`, chưa dùng database.
- Cookie chỉ nhớ trang/locale cuối cùng, không lưu tài khoản hoặc thông tin cá nhân.
- Chatbot hiện dùng backend nội bộ để trả lời theo catalog, chưa nối LLM thật.
- Caddy đứng trước frontend/backend, route `/api/*` về backend và các trang còn lại về frontend.

## Cấu Trúc Chính

```text
2aeventures/
├── .env.example
├── .gitignore
├── README.md
├── docker-compose.yml
├── docker-compose.prod.yml
├── caddy/
│   └── Caddyfile
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   └── tests/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── messages/
│   ├── public/
│   └── src/
├── scripts/
│   ├── backup.sh
│   ├── deploy.sh
│   ├── dev.sh
│   └── windows/
└── data/                # runtime data, không push Git
```

Các thư mục/file local như `.env`, `data/`, `backups/`, `node_modules/`, `.next/`, `.venv/`, cache và log đã được ignore.

## Frontend

Frontend nằm trong `frontend/src`.

Các phần chính:

- `app/[locale]`: home, about, products, product detail, cart, contact.
- `components`: header, footer, product card, chatbot, quick email, page memory.
- `services`: client gọi API backend.
- `store`: catalog, cart, language context.
- `lib`: mock data, cookie helpers, quick email, search helpers.
- `messages`: nội dung song ngữ.

Chạy riêng frontend khi phát triển:

```bash
cd frontend
npm ci
npm run dev
```

## Backend

Backend nằm trong `backend/app`.

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

Runtime data:

```text
data/quotes.jsonl
data/contacts.jsonl
```

## Environment

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Ví dụ `.env` production:

```dotenv
APP_HOSTS=yourdomain.com,www.yourdomain.com
APP_ORIGIN=https://yourdomain.com
HTTP_PORT=80
HTTPS_PORT=443

BACKEND_ENV=production
BACKEND_LOG_LEVEL=info
BACKEND_CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
BACKEND_ADMIN_TOKEN=replace-with-a-long-random-token
BACKEND_DATA_DIR=/app/data

NEXT_PUBLIC_API_URL=/api/v1
```

`BACKEND_ADMIN_TOKEN` dùng để đọc quote/contact qua API nội bộ. Khách vẫn gửi form bình thường qua `POST` dù không có token.

## Chạy Bằng Docker

Chạy production stack:

```bash
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Kiểm tra:

```bash
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml ps
curl http://127.0.0.1/healthz
```

Nếu chỉ chạy local nhanh, có thể dùng:

```bash
docker compose up -d --build
```

Mở thử:

```text
http://127.0.0.1/vi
```

## Chạy 24/7 Trên Máy Windows

Điều kiện:

- Cài Git.
- Cài Docker Desktop và bật WSL 2 backend.
- Bật `Start Docker Desktop when you sign in`.
- Tắt sleep/hibernate khi cắm nguồn.
- Cho phép inbound TCP `80` và `443` trong Windows Defender Firewall.
- Nếu dùng domain thật, router cần forward port `80` và `443` vào máy Windows.

Lần đầu trên máy Windows:

```powershell
git clone <repo-url>
cd 2aeventures
copy .env.example .env
notepad .env
powershell -ExecutionPolicy Bypass -File .\scripts\windows\deploy.ps1
```

Cài tự chạy lại khi Windows user login:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\install-startup-task.ps1
```

Khi có code mới:

```powershell
git pull
powershell -ExecutionPolicy Bypass -File .\scripts\windows\deploy.ps1
```

Lệnh vận hành trên Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\status.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\windows\status.ps1 -Logs -Service caddy
powershell -ExecutionPolicy Bypass -File .\scripts\windows\backup.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\windows\uninstall-startup-task.ps1
```

Lưu ý: Docker Desktop cần user session. Nếu máy reboot mà chưa login lại, Scheduled Task dạng `AtLogOn` chưa chạy.

## Domain

Để domain trỏ vào máy chạy website:

- Đặt static/reserved LAN IP cho máy chạy server.
- Forward router:
  - WAN `80` -> LAN IP port `80`
  - WAN `443` -> LAN IP port `443`
- DNS tại nơi mua domain:
  - `A @` -> public IP của mạng
  - `A www` -> cùng public IP

Nếu mạng không mở được port `80/443` hoặc dùng CGNAT, cần dùng tunnel như Cloudflare Tunnel/ngrok/Tailscale Funnel.

## Kiểm Tra

Frontend:

```bash
cd frontend
npm run type-check
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

Backend:

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements-dev.txt
python -m pytest
```

Docker:

```bash
docker compose config --quiet
docker compose ps
curl http://127.0.0.1/healthz
```

## Backup

Linux/macOS:

```bash
./scripts/backup.sh
```

Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\backup.ps1
```

Backup sẽ nằm trong `backups/`. Không push thư mục này lên Git.

## Ghi Chú Vận Hành

- Không commit `.env`.
- Không commit `data/` nếu đang chứa dữ liệu thật của khách.
- Không commit `backups/`.
- Không commit `node_modules/`, `.next/`, `.venv/` hoặc cache.
- Khi muốn đổi sang database thật, thay repository/data adapter ở backend; API contract hiện có thể giữ ổn định.
