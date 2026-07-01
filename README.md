# Hướng Dẫn Sử Dụng & Quản Trị Mã Nguồn 2AE VENTURES

## Phần 1: Hướng dẫn Cài đặt & Chạy Website trên máy tính

Để có thể xem trước các thay đổi trên máy tính cá nhân trước khi đưa lên mạng (Vercel), bạn cần cài đặt một vài phần mềm cơ bản.

### 1. Cài đặt các công cụ cần thiết:
- **Node.js**: Phần mềm để chạy môi trường web. Tải và cài đặt bản **LTS (Long Term Support)** tại [nodejs.org](https://nodejs.org/).
- **Git**: Công cụ để đồng bộ mã nguồn. Tải tại [git-scm.com](https://git-scm.com/).
- **Visual Studio Code (VS Code)**: Phần mềm để mở và chỉnh sửa mã nguồn dễ dàng nhất. Tải tại [code.visualstudio.com](https://code.visualstudio.com/).

### 2. Mở dự án và chạy:
1. Mở phần mềm **VS Code**.
2. Chọn `File > Open Folder...` và chọn thư mục chứa dự án `2aeventures`.
3. Mở Terminal (cửa sổ dòng lệnh) trong VS Code bằng cách chọn `Terminal > New Terminal` ở thanh menu trên cùng.
4. Chạy lệnh cài đặt thư viện (chỉ cần làm lần đầu tiên hoặc khi có thư viện mới):
   ```bash
   npm install
   ```
5. Chạy lệnh khởi động website:
   ```bash
   npm run dev
   ```
6. Mở trình duyệt web (Google Chrome/Safari) và truy cập vào đường dẫn: **http://localhost:3000**. Bạn sẽ thấy website của mình hiện lên!

---

## Phần 2: Hướng dẫn Cập nhật Hình Ảnh

Toàn bộ hình ảnh của website được lưu trữ trong thư mục **`public/images/`**. 

### Cách 1: Thay thế ảnh cũ (Nhanh nhất)
Nếu bạn muốn thay một bức ảnh hiện tại (ví dụ: ảnh bò, ảnh nông sản), cách dễ nhất là:
1. Chuẩn bị ảnh mới của bạn.
2. Đổi tên ảnh mới **giống y hệt** tên ảnh cũ đang có trong hệ thống (bao gồm cả đuôi `.png` hay `.jpg`).
3. Chép đè (Copy & Replace) ảnh mới vào đúng thư mục chứa ảnh cũ (ví dụ: `public/images/categories/agriculture.jpg`).
4. Xong! Bạn quay lại trình duyệt tải lại trang (F5) sẽ thấy ảnh mới.

### Cách 2: Thêm ảnh mới
Nếu bạn có một ảnh mới hoàn toàn với tên mới (ví dụ: `sp-moi.jpg`):
1. Bỏ ảnh đó vào thư mục `public/images/products/`.
2. Mở file dữ liệu sản phẩm `data/catalog.json` (hướng dẫn ở phần 3).
3. Tìm đến sản phẩm cần gắn ảnh và sửa đường dẫn `imageKey` hoặc đường dẫn ảnh cho khớp. (VD: `"/images/products/sp-moi.jpg"`).

---

## Phần 3: Hướng dẫn Sửa & Thêm Sản Phẩm

Toàn bộ thông tin danh mục, sản phẩm, và logo đối tác được quản lý chung trong 1 file duy nhất:
👉 **Mở file: `data/catalog.json`**

File này dùng định dạng JSON. Bạn chỉ cần sửa phần chữ nằm bên trong cặp dấu ngoặc kép `" "`. **Đừng vô tình xoá mất các dấu phẩy `,` hoặc ngoặc nhọn `{ }` nhé.**

### 1. Thay đổi thông tin sản phẩm có sẵn:
Kéo xuống dưới trong file `catalog.json`, bạn sẽ thấy danh sách `products`. Mỗi sản phẩm được khai báo như sau:

```json
{
  "id": "p-beef-ribeye",
  "categoryId": "beef", // Thuộc danh mục bò
  "cutId": "ribeye_rect", // Vị trí trên bản đồ cắt thịt (nếu có)
  "name": {
    "en": "Beef Ribeye", // Tên tiếng Anh
    "vi": "Đầu thăn ngoại bò" // Tên tiếng Việt
  },
  "imageKey": "beef-ribeye", // Tên ảnh (sẽ được tìm trong danh sách hình ảnh ở trên cùng của file)
  "unit": {
    "en": "kg",
    "vi": "kg"
  },
  "description": { ... }
}
```
Bạn chỉ cần thay đổi chữ tiếng Việt / tiếng Anh tương ứng.

### 2. Xoá một sản phẩm:
Xoá toàn bộ đoạn code bắt đầu từ dấu `{` cho đến dấu `}` của sản phẩm đó. Nhớ cẩn thận xoá cả dấu phẩy `,` bị dư sau khi xoá.

---

## Phần 4: Lưu thay đổi và Đưa lên mạng (Deploy lên Vercel)

Sau khi bạn đã thay đổi ảnh hoặc cập nhật sản phẩm thành công và xem trên `localhost:3000` thấy ưng ý, bước cuối cùng là lưu lại và đưa lên internet.

1. Bật Terminal trong VS Code (nếu đã tắt, bấm `Terminal > New Terminal`).
2. Gõ lần lượt 2 lệnh sau (nhấn Enter sau mỗi dòng):

   ```bash
   git add .
   git commit -m "Cập nhật nội dung website"
   git push origin main
   ```
*(Bạn có thể thay đổi dòng chữ "Cập nhật nội dung website" thành bất cứ mô tả nào bạn muốn để dễ nhớ).*

3. Xong! Hệ thống **Vercel** sẽ tự động nhận diện thay đổi của bạn và xuất bản website mới. Quá trình này diễn ra hoàn toàn tự động, bạn chỉ cần chờ khoảng 1-2 phút rồi vào lại trang web chính thức (`2aeventures.com`) để xem kết quả.

---

Chúc bạn quản trị website 2AE Ventures thành công! Nếu gặp lỗi khi chạy `npm run dev` do gõ sai định dạng JSON, hãy bình tĩnh mở lại file `data/catalog.json` và kiểm tra xem có thiếu dấu phẩy `,` hoặc dấu ngoặc kép `" "` nào không.
