# Render Deployment

Project này deploy bằng Render Blueprint. Render đọc file `render.yaml` ở root repo và tạo 2 web services riêng:

- `twoae-demo-api`: FastAPI backend.
- `twoae-demo-web`: Next.js frontend.

## 1. Blueprint Settings

Khi tạo Blueprint trên Render:

```text
Blueprint Name: 2aeventures
Branch: main
Blueprint Path: render.yaml
```

Nếu để trống Blueprint Path, Render cũng mặc định đọc `render.yaml` ở root repo.

## 2. Services

Backend:

```text
Service: twoae-demo-api
Root Directory: backend
Health Check Path: /health
```

Frontend:

```text
Service: twoae-demo-web
Root Directory: frontend
Health Check Path: /api/health
```

Frontend gọi backend qua proxy:

```text
NEXT_PUBLIC_API_URL=/api/v1
API_PROXY_TARGET=https://twoae-demo-api.onrender.com
```

Nếu frontend được gắn custom domain, backend vẫn giữ URL riêng của Render hoặc domain backend riêng. Frontend sẽ gọi backend thông qua proxy `/api/v1`, nên khách truy cập không cần thấy trực tiếp backend URL.

## 3. Environment Variables

Các biến chính đã được khai báo trong `render.yaml`.

Nếu Render tạo URL khác tên service hiện tại, cập nhật lại:

Backend service:

```text
BACKEND_CORS_ORIGINS=https://YOUR_FRONTEND_SERVICE.onrender.com,https://2aeventures.com,https://www.2aeventures.com
```

Frontend service:

```text
API_PROXY_TARGET=https://YOUR_BACKEND_SERVICE.onrender.com
```

Sau đó redeploy cả 2 services.

Khi dùng domain chính thức `2aeventures.com`, thêm domain vào custom domain của frontend service trên Render, sau đó trỏ DNS từ Squarespace theo hướng dẫn Render. Backend chỉ cần cập nhật CORS để chấp nhận domain frontend đó.

## 4. Data Behavior

Backend hiện lưu form liên hệ và báo giá vào JSONL trong:

```text
BACKEND_DATA_DIR=/app/data
```

Với Render Free, filesystem là tạm thời. Dữ liệu có thể mất khi service restart, redeploy hoặc spin down.

Để nhận lead ổn định khi dùng thật:

- Dùng backend paid service và gắn Render Persistent Disk.
- Hoặc chuyển phần lưu quote/contact sang managed database.

## 5. Deploy Flow

1. Commit code lên Git.
2. Push lên `origin/main`.
3. Render tự auto-deploy theo `autoDeployTrigger: commit`.
4. Nếu auto-deploy chưa chạy, vào service trên Render và chọn **Manual Deploy > Deploy latest commit**.

## 6. Verify

Kiểm tra backend:

```text
https://twoae-demo-api.onrender.com/health
```

Kết quả mong đợi:

```json
{"status":"ok"}
```

Kiểm tra frontend:

```text
https://twoae-demo-web.onrender.com/vi
```

Gửi thử form contact/quote để xác nhận frontend gọi được backend.

## 7. Free Plan Notes

Render Free web services có thể spin down sau thời gian không có traffic. Người truy cập đầu tiên sau lúc idle sẽ phải chờ service wake up.

Với demo public, điều này chấp nhận được. Với website chính thức, nên dùng paid instance cho frontend/backend và thêm persistent storage cho backend nếu vẫn lưu file.
