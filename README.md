# 2AE VENTURES - B2B E-Commerce Platform

Nền tảng website B2B chuyên nghiệp của 2AE Ventures, được phát triển để giới thiệu và số hóa quy trình giao thương các mặt hàng thực phẩm đông lạnh (Bò, Gà Mỹ) và Nông/Thủy hải sản xuất nhập khẩu.

---

## 🚀 1. Tech Stack (Công nghệ sử dụng)

Dự án được xây dựng trên nền tảng công nghệ hiện đại, đảm bảo hiệu năng cao, bảo mật và khả năng mở rộng:
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server-Side Rendering)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (Motion/React)
- **AI Integration:** Vercel AI SDK & Google Generative AI (Gemini 1.5 Flash)
- **Email Service:** Nodemailer (Serverless API)
- **Deployment & Analytics:** [Vercel](https://vercel.com/)
- **Language:** TypeScript

---

## 📁 2. Project Architecture (Cấu trúc thư mục)

```text
2aeventures/
├── public/                 # Chứa tài nguyên tĩnh (Hình ảnh, Logo, File PDF...)
│   └── images/             # Thư mục chứa toàn bộ hình ảnh sản phẩm & banner
├── src/
│   ├── app/                # Next.js App Router (Chứa các trang chính)
│   │   ├── [locale]/       # Cơ chế Đa ngôn ngữ (i18n) cho English & Tiếng Việt
│   │   └── api/            # API Serverless (Gửi Email, AI Chatbot)
│   ├── components/         # Các module UI tái sử dụng (Header, Footer, Map Cut...)
│   ├── config/             # Cấu hình website (Nội dung tĩnh, i18n mapping)
│   ├── data/               # Chứa file catalog.json (Dữ liệu sản phẩm)
│   ├── store/              # State management (Quản lý trạng thái Context API)
│   └── styles/             # Cấu hình Tailwind và CSS toàn cục
├── .env.example            # Mẫu file biến môi trường (nếu có)
├── package.json            # Quản lý thư viện
└── tailwind.config.ts      # Cấu hình giao diện (Màu sắc, Font chữ)
```

---

## ⚙️ 3. Getting Started (Hướng dẫn cài đặt Local)

Để chạy dự án trên máy tính cá nhân (Dành cho Lập trình viên hoặc Quản trị viên muốn test nội dung trước khi Live):

### Yêu cầu hệ thống:
- [Node.js](https://nodejs.org/) (Phiên bản LTS 18.x hoặc 20.x trở lên)
- Git

### Các bước khởi chạy:

1. **Clone mã nguồn (Tải source code):**
   ```bash
   git clone https://github.com/your-repo/2aeventures.git
   cd 2aeventures
   ```

2. **Cài đặt thư viện (Dependencies):**
   ```bash
   npm install
   # Hoặc nếu gặp lỗi xung đột peer dependency khi install (VD: Zod/Vite):
   # npm install --legacy-peer-deps
   ```

3. **Thiết lập Biến môi trường (Environment Variables):**
   Tạo file `.env.local` ở thư mục gốc của dự án và khai báo các thông số sau:
   ```env
   # API Key cho hệ thống AI Chatbot (Lấy từ Google AI Studio)
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

   # Thông tin cấu hình gửi Mail (SMTP) cho mục Liên hệ
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Chạy Server phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập `http://localhost:3000`.

---

## 📝 4. Content Management (Hướng dẫn cập nhật nội dung)

Hệ thống được thiết kế linh hoạt, quản lý dữ liệu tập trung qua JSON, giúp cập nhật sản phẩm mà không cần can thiệp sâu vào code logic.

### 4.1. Cập nhật Hình ảnh
- Toàn bộ hình ảnh nằm trong thư mục `public/images/`.
- **Thay ảnh nhanh nhất:** Lưu ảnh mới của bạn trùng y hệt tên với ảnh cũ (VD: `beef-ribeye.jpg`), sau đó chép đè vào thư mục cũ.
- *Khuyến nghị:* Nén ảnh dưới `300KB` (khuyên dùng định dạng WebP hoặc JPG nén) để tối ưu hóa SEO và tốc độ tải trang.

### 4.2. Thêm/Sửa/Xóa Sản phẩm
Dữ liệu sản phẩm được quản lý tập trung tại file **`src/data/catalog.json`**.
- Mở file `catalog.json` bằng VS Code.
- Tìm đến mảng `"products": [ ... ]`.
- Sửa các trường văn bản tiếng Anh (`"en"`) và tiếng Việt (`"vi"`) trong cặp dấu ngoặc kép `" "`.

**Cấu trúc mẫu của 1 đối tượng sản phẩm:**
```json
{
  "id": "p-beef-ribeye",
  "categoryId": "beef",
  "cutId": "ribeye_rect", 
  "name": {
    "en": "Beef Ribeye",
    "vi": "Đầu thăn ngoại bò"
  },
  "imageKey": "beef-ribeye",
  "unit": {
    "en": "kg",
    "vi": "kg"
  },
  "description": {
    "en": "Premium cut from the rib section...",
    "vi": "Phần thịt cắt từ sườn non cao cấp..."
  }
}
```
*(Lưu ý: Chú ý không vô tình xóa mất dấu phẩy `,` hoặc ngoặc nhọn `{ }` ở cuối mỗi block JSON).*

---

## ☁️ 5. Deployment Guide (Hướng dẫn Triển khai Production)

Dự án được tối ưu hóa 100% cho nền tảng **Vercel** (Serverless Deployment).

### 5.1. Triển khai tự động qua Git (CI/CD)
Mỗi khi bạn có thay đổi (sửa ảnh, cập nhật giá/sản phẩm), bạn chỉ cần gõ 3 dòng lệnh sau trên Terminal của VS Code:
```bash
git add .
git commit -m "update: cập nhật hình ảnh và sản phẩm mới"
git push origin main
```
Vercel sẽ tự động bắt tín hiệu (webhook), tiến hành Build và Release bản mới nhất lên domain chính thức `2aeventures.com` trong vòng 1-2 phút (Zero downtime).

### 5.2. Cấu hình trên Vercel Dashboard
Khi deploy dự án lần đầu, hãy chắc chắn bạn đã cấu hình đầy đủ các biến môi trường:
1. Đăng nhập [Vercel](https://vercel.com).
2. Vào Dashboard dự án `2aeventures` > Chọn tab **Settings** > **Environment Variables**.
3. Thêm toàn bộ các biến đã nêu ở phần 3 (Đặc biệt là `GOOGLE_GENERATIVE_AI_API_KEY` để Chatbot có thể hoạt động).
4. Chuyển sang tab **Deployments**, chọn Redeploy nếu cần áp dụng thay đổi ngay lập tức.

---

## 🔑 6. Key Features (Các Tính Năng Nổi Bật)

- **Trợ lý ảo AI (Vercel AI SDK + Gemini):** Khách hàng có thể chat trực tiếp để hỏi về quy cách đóng gói, giá cả và thông tin doanh nghiệp. Hệ thống tự động context-aware về sản phẩm.
- **Interactive Cut Map (Bản đồ cắt thịt tương tác):** Trình diễn sơ đồ các phần cắt thịt bò/gà bằng SVG. Khách hàng hover/click vào từng bộ phận nhấp nháy để xem chính xác danh mục sản phẩm tương ứng, nâng tầm trải nghiệm UX/UI.
- **Internationalization (i18n) & Localized SEO:** Hệ thống chuyển đổi song ngữ (Anh/Việt) tức thì nhờ Context API, đi kèm với cấu trúc `generateMetadata` của Next.js để tối ưu hóa SEO tự động cho từng ngôn ngữ.
- **Serverless Form Handling:** Biểu mẫu liên hệ được xử lý qua Next.js Route Handlers và đẩy thẳng vào Email doanh nghiệp bằng Nodemailer, tối ưu hóa tốc độ và ngăn chặn spam.
