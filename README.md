# 2AE VENTURES

Website thương mại điện tử giới thiệu doanh nghiệp và catalog thực phẩm đông lạnh (nhập khẩu/xuất khẩu) cao cấp.

---

## 🛠 Tech Stack & Architecture

Hệ thống được thiết kế theo kiến trúc **Fullstack Monolith** hiện đại:

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Typography**: Be Vietnam Pro (Sans), Playfair Display (Serif)
- **API & Data**: Next.js Route Handlers đọc/ghi trực tiếp với các file JSON/JSONL.
- **Localization**: Hệ thống Đa ngôn ngữ (i18n) với từ điển JSON (vi/en).

---

## 📂 Project Structure

```text
2aeventures/
├── data/                    # Nguồn dữ liệu (catalog.json) & Lịch sử gửi Contact/Quotes (jsonl)
├── messages/                # Từ điển đa ngôn ngữ (vi.json, en.json)
├── public/                  # Tài nguyên tĩnh (fonts, images phân chia theo heroes, categories, maps...)
├── src/                     # Toàn bộ mã nguồn ứng dụng
│   ├── app/                 # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/          # React Components tái sử dụng
│   ├── config/              # Cấu hình dự án (site, brand...)
│   ├── lib/                 # Các hàm utility và data loaders
│   ├── services/            # API Services kết nối frontend với backend
│   ├── store/               # React Context Providers (State Management)
│   ├── styles/              # Global CSS, Tailwind base
│   └── types/               # TypeScript Definitions
├── render.yaml              # Cấu hình tự động deploy trên Render
├── tailwind.config.ts       # Cấu hình TailwindCSS
└── next.config.js           # Cấu hình Next.js
```

---

## 🚀 Hướng Dẫn Phát Triển (Local)

Dự án đã được tích hợp toàn bộ Frontend và Backend vào một hệ thống duy nhất. Không cần cấu hình môi trường phức tạp hay Docker.

### Khởi chạy môi trường:

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Khởi chạy Development Server:**
   ```bash
   npm run dev
   ```
   *Truy cập: `http://localhost:3000`*

### Build bản Production:
```bash
npm run build
npm run start
```

---

## 🌐 Deployment (Render)

Hệ thống được thiết kế để tự động deploy qua Render (Blueprint) một cách cực kỳ gọn nhẹ:
- Chỉ triển khai **duy nhất 1 Node Web Service** thay vì phải phân tách Frontend / Backend.
- Tự động chạy `npm install && npm run build` và khởi chạy với `npm run start`.
- File cấu hình triển khai nằm tại `render.yaml`.
