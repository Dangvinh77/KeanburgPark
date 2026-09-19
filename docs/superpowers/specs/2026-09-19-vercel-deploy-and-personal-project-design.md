# Vercel Deployment and Personal Project Design

## Mục tiêu

Khôi phục deployment Vercel bằng cách sửa nguyên nhân trong mã nguồn thay vì hạ tiêu chuẩn CI; đồng thời chuyển cách trình bày repository và trang About Us thành một dự án cá nhân của Phạm Đăng Vinh về **Keansburg Amusement Park**.

Kết quả hoàn tất cần có:

- `CI=true npm run build` thành công, không còn cảnh báo ESLint bị Vercel nâng thành lỗi.
- Lockfile có thể dùng với clean install để local và Vercel nhận cùng cây dependency.
- Tên địa danh được viết đúng là `Keansburg`, trừ URL/slug repository cũ nếu chưa đổi tên repository.
- README, trang About Us và GitHub About nói rõ đây là dự án cá nhân, độc lập, không phải website chính thức và không xử lý giao dịch thật.
- Các route SPA như `/aboutus` vẫn mở trực tiếp được trên deployment.

## Bằng chứng và nguyên nhân gốc

Deployment `dpl_2qVCyJsMd91NJVSqcDZ2tAjQDgFj` của commit `7f28ca8` cài dependency thành công rồi dừng tại `npm run build`. Log Vercel ghi rõ:

```text
Treating warnings as errors because process.env.CI = true.
Failed to compile.
Error: Command "npm run build" exited with 1
```

Chạy local cho kết quả tương ứng:

- `npm run build`: thành công nhưng có cảnh báo.
- `$env:CI='true'; npm run build`: thất bại với đúng các cảnh báo trong log Vercel.

Có tổng cộng 9 cảnh báo:

1. `src/components/Carousel.jsx`: `nextSlide` được tạo lại mỗi render nhưng nằm trong dependency array của `useEffect`.
2. `src/components/Footer.jsx`: import `Link` không dùng.
3. `src/components/Header.jsx`: `handleReset` chỉ được tham chiếu trong JSX đã comment nên bị xem là không dùng.
4. `src/pages/ContactUs.jsx`: import `Link` không dùng.
5. `src/pages/ContactUs.jsx`: ba `alt` chứa từ thừa `Image`.
6. `src/pages/Tickets/Tickets.jsx`: import `Link` không dùng.
7. `src/pages/Tickets/Tickets.jsx`: object `prices` được tạo lại mỗi render nhưng nằm trong dependency array của `useEffect`.

Vì vậy lỗi deploy hiện tại không phải lỗi cài dependency, output directory hay React Router. Vercel đã cài `1397 packages` và chỉ thất bại khi Create React App biến warning thành error trong môi trường `CI=true`.

Ngoài nguyên nhân trực tiếp, `npm ci` trên bản npm hiện tại còn báo `package.json` và `package-lock.json` không đồng bộ vì thiếu các optional platform package của `@parcel/watcher@2.5.0`. Vercel dùng `npm install` nên vẫn đi qua bước này, nhưng lockfile cần được tái tạo để clean install có thể lặp lại ổn định.

## Phương án đã chọn

### 1. Sửa đủ 9 cảnh báo tại nguồn

- Dùng `useCallback` cho `nextSlide` và dependency array chính xác cho timer carousel.
- Xóa import và handler thật sự không dùng.
- Đưa bảng giá vé thành hằng module `PRICES` để có identity ổn định.
- Dùng alt text mô tả nội dung, không chứa từ `image`, cho ba ảnh Contact Us.

Không đặt `CI=false`, không thêm `eslint-disable`, và không thay build command để bỏ qua kiểm tra. Cách này giữ CI có ý nghĩa và xử lý đúng nguyên nhân.

### 2. Làm sạch metadata dependency

- Đổi package name từ `eprj_keanburgpark` thành `keansburg-amusement-park` để phản ánh đúng tên dự án cá nhân.
- Tái tạo `package-lock.json` bằng npm 10.9.8, đúng major version thể hiện trong log Vercel.
- Chứng minh lockfile hợp lệ bằng một clean install trước khi build.

Không nâng đồng loạt React/Create React App trong thay đổi này. Log có cảnh báo Create React App không còn được bảo trì, nhưng chuyển sang Vite là một migration riêng, có phạm vi và rủi ro lớn hơn lỗi deploy hiện tại.

### 3. Chuyển nội dung sang dự án cá nhân

README sẽ bỏ toàn bộ supervisor, semester, batch, group và danh sách thành viên. Nội dung mới gồm:

- Giới thiệu dự án cá nhân của Phạm Đăng Vinh.
- Live demo và các tính năng chính.
- Công nghệ thực tế: React 18, React DOM, React Router 7, Create React App/react-scripts 5, Sass, Bootstrap 5, React Bootstrap, React Icons, Boxicons và Vercel.
- Hướng dẫn chạy local và build.
- Tuyên bố độc lập: không liên kết với Keansburg Amusement Park; biểu mẫu liên hệ, đặt vé và thanh toán chỉ là mô phỏng giao diện.

Trang `src/pages/AboutUs/AboutUs.jsx` tiếp tục kể lịch sử công viên, đồng thời:

- Sửa mốc khai trương thành năm 1904 theo trang lịch sử chính thức của công viên.
- Thêm khối `About This Project` mô tả tác giả, mục đích học tập và disclaimer.
- Đổi tiêu đề khối cuối từ `History` thành `More Information`.

Các chuỗi `Keanburg` hiển thị trong source và metadata HTML được sửa thành `Keansburg`. Repository slug `Dangvinh77/KeanburgPark` không đổi trong phạm vi này để tránh làm gián đoạn Git remote và Vercel integration.

### 4. GitHub About

Sau khi code đã được kiểm tra, cập nhật metadata repository:

- Description: `Personal React project showcasing the history, attractions, gallery, and visitor experience of Keansburg Amusement Park.`
- Homepage: `https://e-project-1-self.vercel.app/`
- Topics: `react`, `javascript`, `sass`, `bootstrap`, `react-router`, `create-react-app`, `vercel`, `keansburg-amusement-park`, `personal-project`.

Đây là thay đổi metadata GitHub, không nằm trong commit Git.

## SPA routing trên Vercel

Ứng dụng dùng `BrowserRouter`. Kiểm tra deployment hiện hành cho thấy `/` và `/aboutus` đều trả HTTP 200, vì preset Create React App của project hiện đã phục vụ fallback phù hợp. Do đó không thêm `vercel.json` ngay từ đầu.

Preview deployment mới phải được kiểm tra trực tiếp với `/aboutus`, `/gallery` và `/activity/attractions`. Chỉ khi một route trả 404 mới thêm fallback sau:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Cách kiểm tra theo cổng này tránh thêm cấu hình không cần thiết nhưng vẫn định nghĩa sẵn biện pháp khôi phục nếu framework preset thay đổi.

## Phạm vi file dự kiến

### Build và dependency

- `src/components/Carousel.jsx`
- `src/components/Footer.jsx`
- `src/components/Header.jsx`
- `src/pages/ContactUs.jsx`
- `src/pages/Tickets/Tickets.jsx`
- `package.json`
- `package-lock.json`

### Nội dung và nhận diện cá nhân

- `README.md`
- `public/index.html`
- `src/pages/AboutUs/AboutUs.jsx`
- `src/styles/pages/AboutUs/AboutUs.scss`
- `src/pages/AboutUs.jsx`
- `src/pages/Gallery.jsx`

### Có điều kiện

- `vercel.json`, chỉ tạo khi preview deployment chứng minh direct route trả 404.

## Kiểm chứng

1. `npx --yes npm@10.9.8 ci --no-audit --no-fund` thoát mã 0.
2. `$env:CI='true'; npm run build` thoát mã 0 và không có `Failed to compile`.
3. `npm test -- --watchAll=false --passWithNoTests` thoát mã 0; repository hiện chưa có test tự động.
4. Kiểm tra thủ công carousel tự chuyển và hai nút điều hướng vẫn hoạt động.
5. Kiểm tra README và About Us hiển thị đúng tên `Keansburg` và disclaimer cá nhân.
6. Preview Vercel trả HTTP 200 cho `/`, `/aboutus`, `/gallery` và `/activity/attractions`.
7. `gh repo view` trả đúng description, homepage và topics.

## Rủi ro và giới hạn

- `react-scripts@5.0.1` đã cũ và kéo theo nhiều dependency deprecated. Thay bundler không thuộc thay đổi này.
- Không có test suite hiện hữu; build CI và smoke test trình duyệt là hàng rào hồi quy chính.
- Dữ liệu giá vé và form thanh toán là dữ liệu demo; disclaimer phải hiện diện để người xem không hiểu nhầm là dịch vụ chính thức.
- GitHub About và Vercel deployment là trạng thái bên ngoài Git; cần xác minh sau khi lệnh cập nhật hoặc deployment hoàn tất.

## Nguồn đối chiếu

- Vercel giải thích `CI=true` khiến cảnh báo Create React App trở thành lỗi: <https://vercel.com/kb/guide/how-do-i-resolve-a-process-env-ci-true-error>
- Tên và lịch sử chính thức của công viên: <https://keansburgamusementpark.com/plan-your-visit/history/>
