# 2AEVENTURES Website

Website cho 2AEVENTURES tối ưu quy trình tìm sản phẩm và gửi yêu cầu báo giá sỉ/lẻ cho hộ kinh doanh và người buôn nhỏ, có lớp trợ lý AI để tăng tỷ lệ chuyển đổi.

## 1) Product Requirements (PRD Summary)

## Mục tiêu

- Tăng chuyển đổi từ truy cập sản phẩm sang gửi `Request Quote`.
- Rút ngắn thời gian tìm sản phẩm và thao tác gửi yêu cầu báo giá.
- Tăng tỷ lệ tương tác nhờ chatbot AI hỗ trợ theo ngữ cảnh.

## Người dùng mục tiêu

- Hộ kinh doanh, người buôn nhỏ.
- Cần thông tin nhanh, rõ, dễ lọc.
- Cần báo giá theo số lượng linh hoạt thay vì checkout online.

## Scope giai đoạn hiện tại

- Không tích hợp payment gateway.
- Macro conversion: gửi form `Request Quote` thành công.
- Chatbot AI đa luồng: điều hướng, tư vấn, hỗ trợ thêm sản phẩm vào giỏ quote.

## 2) Feature List

## 2.1 Core Website

- `Home`: banner/slider, sản phẩm nổi bật, CTA sang products/chatbot.
- `About`: uy tín nguồn hàng, chính sách cho khách buôn.
- `Products`: grid + filter danh mục + search có gợi ý.
- `Product Detail`: hình ảnh, mô tả, CTA `Add to Quote`.
- `Cart / Quote List`: thêm/xóa/sửa số lượng sản phẩm cần báo giá.
- `Request Quote`: form thông tin cửa hàng + liên hệ + địa chỉ + ghi chú, submit trigger notification.
- `Contact`: địa chỉ, hotline, Zalo OA, form liên hệ nhanh.

## 2.2 AI Chatbot Layer

- Floating widget trên toàn site.
- Nhận diện ngữ cảnh route:
  - Home: hỏi nhu cầu nguồn hàng.
  - Product detail: tóm tắt sản phẩm, gợi ý sản phẩm tương tự.
  - Cart: nhắc hoàn tất gửi quote.
- Thực thi hành động:
  - NLP search sản phẩm từ text chat.
  - Thêm sản phẩm vào cart từ chat.
  - Trả link trực tiếp về form quote.

## 3) Trạng thái hiện tại sau khi clean cấu trúc

- Đã giữ nguyên source frontend (không chỉnh logic/tính năng frontend trong bước clean này).
- Đã dọn các artifact local không nên nằm trong repo:
  - `frontend/node_modules`
  - `frontend/.next`
  - `frontend/*.tsbuildinfo`
  - `.DS_Store`
- Đã chuẩn hóa cây deploy cơ bản cho domain với `nginx + docker compose + backend runtime skeleton`.

Lưu ý quan trọng:
- Cấu trúc deploy đã gọn và đúng hướng production.
- Nhưng để đáp ứng **đầy đủ** feature PRD, backend business/API vẫn cần được hoàn thiện thêm.

## 4) Cấu trúc thư mục hiện tại

```text
2aeventures/
├── .env.example
├── .gitignore
├── Makefile
├── README.md
├── docker-compose.yml
├── docker-compose.prod.yml
│
├── frontend/                            
│   ├── .env.example
│   ├── .env.local
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   ├── messages/
│   └── public/
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── alembic/
│   ├── app/
│   │   └── main.py
│   └── tests/
│
├── nginx/
│   ├── nginx.conf
│   └── certs/
│
└── scripts/
    ├── dev.sh
    ├── deploy.sh
    └── backup.sh
```

## 5) Vai trò từng thành phần deploy

- `docker-compose.yml`: chạy stack local/staging theo service `frontend`, `backend`, `nginx`.
- `docker-compose.prod.yml`: override cho production-style run.
- `nginx/nginx.conf`: reverse proxy:
  - `/` -> frontend (Next.js)
  - `/api/` -> backend (FastAPI)
- `backend/Dockerfile`: image backend chạy bằng `uvicorn`.
- `scripts/deploy.sh`: lệnh deploy stack bằng compose.

## 6) Biến môi trường

## Root `.env.example`

- `DOMAIN`, `WWW_DOMAIN`
- `NGINX_HTTP_PORT`, `NGINX_HTTPS_PORT`
- `FRONTEND_PORT`, `BACKEND_PORT`
- `BACKEND_ENV`, `BACKEND_LOG_LEVEL`

## Backend `.env` / `.env.example`

- Biến runtime backend (mở rộng thêm theo DB, SMTP, AI provider khi triển khai feature đầy đủ).

## Frontend `.env.local`

- Dùng cho runtime frontend hiện tại.
- Khi deploy production cần đảm bảo giá trị API/domain tương ứng môi trường thật.

## 7) Cách chạy

## Local

```bash
make up
make logs
```

Hoặc:

```bash
./scripts/dev.sh
```

## Production-style

```bash
./scripts/deploy.sh
```

## Backup

```bash
./scripts/backup.sh
```

## 8) Deploy lên domain (Checklist)

1. Trỏ DNS `A` record của domain về IP server.
2. Mở firewall port `80` và `443`.
3. Điền biến môi trường production cho frontend/backend.
4. Cấu hình SSL cert trong `nginx/certs` (hoặc TLS ở layer ngoài).
5. Chạy deploy script.
6. Verify:
   - `http://<domain>/healthz` (nginx)
   - `http://<domain>/api/health` (backend qua nginx)

## 9) Gap còn thiếu để khớp đầy đủ PRD

Các phần dưới đây cần triển khai thêm ở backend để đạt full scope:

- API products đầy đủ (list/detail/filter/search/suggestion).
- API quote flow (create/update/cart-submit + notification).
- API chatbot actions (search/add-to-cart/context-aware responses).
- Tầng dữ liệu thật (DB schema, repository, migration thực tế).
- Tích hợp AI provider và logging/monitoring chuẩn production.

## 10) Nguyên tắc vận hành repo

- Không commit secret (`.env`, private keys, cert private key).
- Không commit artifact build/deps (`node_modules`, `.next`, cache files).
- Giữ `README.md` phản ánh đúng trạng thái thực tế triển khai.
