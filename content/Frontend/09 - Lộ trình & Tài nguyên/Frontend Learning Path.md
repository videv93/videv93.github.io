---
tags: [frontend, lộ-trình]
status: evergreen
---
# Frontend Learning Path

> Thứ tự học, sắp theo **tốc độ khấu hao kiến thức**: học sâu thứ đổi chậm, học vừa đủ thứ đổi nhanh. Nền tảng cho bài này ở [[Framework Churn vs Platform Longevity]].

## 1. Năm chặng

### Chặng 0 — Nền tảng trình duyệt

| Học | Note |
|---|---|
| Trình duyệt biến bytes thành pixel thế nào | [[Browser Rendering Pipeline]] |
| Cấu trúc document, thứ tự tải | [[HTML Document Anatomy]] |
| Chọn thẻ theo nghĩa | [[Semantic HTML]] |
| ARIA, bàn phím, focus | [[Accessible Markup & ARIA]] |
| Form và validation gốc | [[HTML Forms & Validation]] |

**Mốc kiểm tra:** dựng được một trang form nhiều bước, dùng được hoàn toàn bằng bàn phím, hoạt động khi tắt JavaScript.

### Chặng 1 — CSS thật sự

| Học | Note |
|---|---|
| Cascade, specificity, layer | [[CSS Cascade & Specificity]] |
| Kế thừa và sáu loại giá trị | [[CSS Inheritance & Value Processing]] |
| Selector, `:has`, `:where` | [[CSS Selectors]] |
| Đơn vị và `clamp()` | [[CSS Values & Units]] |
| Custom property và theming | [[CSS Custom Properties]] |
| Box model, BFC, containing block, stacking | [[CSS Box Model]] · [[Block Formatting Context]] · [[Containing Block & Positioned Layout]] · [[Stacking Context]] |
| Flexbox và Grid | [[CSS Flexbox]] · [[CSS Grid]] |
| Responsive nội tại và container query | [[Responsive Layout]] |

**Mốc kiểm tra:** dựng lại một layout trang phức tạp **không dùng framework CSS nào**, responsive với **tối đa một** media query. Debug được `z-index` không ăn mà không tăng số.

> Đây là chặng dài nhất và **quan trọng nhất**. Người nhảy qua nó sẽ bị chặn vĩnh viễn ở tầng "Tailwind của tôi không hoạt động và tôi không biết vì sao".

### Chặng 2 — JavaScript và nền tảng web

| Học | Note |
|---|---|
| DOM, event, delegation | [[DOM & Events]] |
| Fetch, CORS, streaming, realtime | [[Fetch & Network APIs]] |
| Storage và bảo mật token | [[Browser Storage APIs]] |
| Observer thay scroll listener | [[Observer APIs]] |
| Worker, service worker, long task | [[Web Workers & Background APIs]] |
| Bản đồ những gì nền tảng đã có | [[Web APIs Map]] |

Cùng với: closure, prototype, `this`, promise, event loop, module — nền JavaScript không nằm trong vault này nhưng là điều kiện tiên quyết.

**Mốc kiểm tra:** dựng một tính năng tìm kiếm có debounce, huỷ request cũ, xử lý lỗi và trạng thái rỗng — **không dùng thư viện nào**.

### Chặng 3 — React và mô hình component

| Học | Note |
|---|---|
| UI là hàm của state | [[React Mental Model]] |
| Server/client boundary | [[React Server Components]] · [[React Client Components]] |
| Mutation và form action | [[React Server Functions]] |
| Phân loại state | [[Frontend State Management]] |
| Phân phối và lắp ráp component | [[Component Library Strategy]] |
| Component gốc của trình duyệt | [[Web Components]] |

**Mốc kiểm tra:** giải thích được vì sao `key={index}` phá state, và khi nào **không** nên dùng `useEffect`.

### Chặng 4 — Framework và utility

| Học | Note |
|---|---|
| Mô hình utility-first và giới hạn của nó | [[Tailwind Utility Model]] · ⚠️ [[Utility-First vs Cascade]] |
| Bảng tra utility | [[Tailwind Layout Utilities]] · [[Tailwind Flexbox & Grid]] · [[Tailwind Spacing & Sizing]] · [[Tailwind Typography Utilities]] · [[Tailwind Visual Utilities]] · [[Tailwind Variants & States]] · [[Tailwind Theme & Configuration]] |
| Routing và render | [[Next.js App Router]] · [[Next.js Routing Patterns]] · [[Next.js Rendering Strategies]] |
| Dữ liệu và cache | [[Next.js Data Fetching]] · [[Next.js Caching Layers]] |
| Tổ chức dự án | [[Next.js Project Structure]] |

**Mốc kiểm tra:** debug được "dữ liệu không cập nhật" bằng cách xác định đúng **tầng cache nào** đang giữ bản cũ.

### Chặng 5 — Chất lượng và vận hành

| Học | Note |
|---|---|
| Đo cái người dùng cảm nhận | [[Core Web Vitals]] |
| Giữ ngân sách | [[Frontend Performance Budget]] |
| Test theo hành vi | [[Frontend Testing Strategy]] |
| Ràng buộc tự động | [[Frontend Tooling]] |
| Đo và hỏi người dùng | [[Product Analytics & Surveys]] |
| Deploy và giữ đường thoát | [[Frontend Deployment]] |

**Mốc kiểm tra:** một PR bị CI chặn vì vượt ngân sách bundle, và bạn biết ngay phải xem ở đâu.

## 2. Nguyên tắc học

1. **Đầu tư ngược với tốc độ thay đổi.** Bảng phân tầng ở mục 5 của [[Framework Churn vs Platform Longevity]].
2. **Đừng nhảy qua chặng 1.** Đây là lỗi phổ biến nhất và tốn kém nhất.
3. **Dựng thứ thật, không làm bài tập.** Một dự án nhỏ đi tới production dạy nhiều hơn mười tutorial.
4. **Debug là cách học nhanh nhất.** Mỗi lần thứ gì đó không hoạt động, đi tới tận nguyên nhân thay vì thử đến khi hết lỗi.
5. **Đọc spec khi MDN không đủ.** Biết đọc value definition syntax mở ra toàn bộ spec — xem [[CSS Values & Units]].
6. **Học a11y song song, không để sau.** Thêm vào sau tốn gấp mười lần.
7. **Đọc source của thư viện bạn dùng.** Đặc biệt với Shadcn — code nằm ngay trong repo bạn.
8. **Với mỗi tính năng framework, hỏi nó đóng gói khái niệm nền tảng nào.**

## 3. Cạm bẫy

- **Học framework trước nền tảng.** Bạn sẽ dựng được app nhưng không debug được chúng.
- **Tutorial hell.** Xem 40 giờ video không bằng dựng một thứ hỏng rồi sửa nó.
- **Chạy theo mọi thứ mới.** Xem [[Framework Churn vs Platform Longevity]].
- **Bỏ qua a11y vì "sẽ làm sau".**
- **Chỉ học phần vui.** CSS layout khó và không vui; nó cũng là phần trả công nhiều nhất.
- **Không bao giờ đọc code người khác.**
- **Học rộng mà không sâu chỗ nào** — biết tên 20 thư viện, không dùng thành thạo cái nào.

## 4. Checklist tự đánh giá

- [ ] Giải thích được cascade và specificity mà không tra cứu?
- [ ] Debug được `z-index` không ăn?
- [ ] Biết vì sao `flex-1` tràn khi text dài?
- [ ] Dựng được layout responsive với ≤1 media query?
- [ ] Biết khi nào **không** dùng `useEffect`?
- [ ] Phân loại được năm loại state?
- [ ] Biết bốn tầng cache của Next và cách xoá từng tầng?
- [ ] Dùng được trang chỉ bằng bàn phím và biết sửa khi không được?
- [ ] Đọc được value definition syntax trong spec?
- [ ] Biết chi phí thoát của mỗi dependency lớn trong dự án?

## Tham khảo

- MDN — *Learn web development*: https://developer.mozilla.org/en-US/docs/Learn_web_development
- web.dev — *Learn CSS*: https://web.dev/learn/css
- React — *Learn React*: https://react.dev/learn
- Josh W. Comeau — *CSS for JavaScript Developers*: https://css-for-js.dev/
- roadmap.sh — *Frontend Developer*: https://roadmap.sh/frontend

## Liên kết

[[Frontend Learning Resources]] · [[Frontend Tech Stack 2025]] · [[Framework Churn vs Platform Longevity]] · [[Learning Roadmap]] · [[Frontend]]
