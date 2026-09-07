---
tags: [frontend, nền-tảng]
status: evergreen
---
# Browser Rendering Pipeline

> Mọi câu hỏi "vì sao trang này giật/chậm/nhảy" đều quy về việc bạn đã buộc trình duyệt chạy lại giai đoạn nào của pipeline này.

## 1. Khái niệm cốt lõi

Trình duyệt biến bytes thành pixel qua một chuỗi giai đoạn cố định:

| # | Giai đoạn | Sinh ra | Chạy lại khi |
|---|---|---|---|
| 1 | **Parse** | DOM tree + CSSOM tree | HTML/CSS mới về |
| 2 | **Style** | Render tree (computed value cho mọi node) | Đổi selector match, đổi biến CSS |
| 3 | **Layout** (reflow) | Hình học: vị trí + kích thước mỗi box | Đổi `width`, `top`, `font-size`, thêm/xoá node |
| 4 | **Paint** | Danh sách lệnh vẽ, chia thành layer | Đổi `color`, `background`, `box-shadow` |
| 5 | **Composite** | Khung hình cuối, ghép layer trên GPU | Đổi `transform`, `opacity` |

**Quy tắc vàng:** càng vào sâu càng rẻ. Đổi ở bước 3 kéo theo 4 và 5; đổi ở bước 5 thì chỉ tốn bước 5.

| Muốn animate | Dùng | Đừng dùng |
|---|---|---|
| Di chuyển | `transform: translate()` | `top` / `left` / `margin` |
| Phóng to | `transform: scale()` | `width` / `height` |
| Mờ dần | `opacity` | `visibility` + `filter` |

## 2. Nguyên tắc

1. **CSS chặn render, JS chặn parse.** `<link rel="stylesheet">` trong `<head>` chặn hiển thị lần đầu; `<script>` không có `defer`/`async` chặn parse HTML. Xem [[HTML Document Anatomy]].
2. **Chỉ animate `transform` và `opacity`.** Hai property này bỏ qua layout và paint hoàn toàn.
3. **`will-change` là lời hứa, không phải phép thuật.** Nó bảo trình duyệt tách layer trước; đặt bừa lên nhiều element sẽ ngốn RAM GPU và làm chậm chính thứ bạn muốn tăng tốc. Bỏ nó ra khi animation kết thúc.
4. **Đọc-rồi-ghi, đừng xen kẽ.** Gom mọi phép đọc hình học (`offsetWidth`, `getBoundingClientRect`) rồi mới ghi — xem cạm bẫy layout thrashing bên dưới.
5. **Layout containment cắt phạm vi reflow.** `contain: layout` bảo trình duyệt rằng thay đổi bên trong element không ảnh hưởng bên ngoài, giới hạn vùng phải tính lại.
6. **Đo trước khi tối ưu.** Panel Performance của DevTools nói chính xác giai đoạn nào tốn ms; trực giác thì không.

## 3. Cạm bẫy

- **Layout thrashing.** Vòng lặp `el.style.width = el.offsetWidth + 1 + 'px'` buộc **layout đồng bộ** ở mỗi lần lặp, vì đọc `offsetWidth` yêu cầu layout phải mới nhất trong khi lệnh ghi trước đó vừa làm nó bẩn. 100 element → 100 lần reflow. Sửa: đọc hết vào mảng, rồi ghi hết.
- **Nhầm "chạy 60fps" với "mượt".** Ngân sách một khung hình 60fps là **16,7ms** cho *toàn bộ* JS + style + layout + paint. Một hàm JS 20ms là đã rớt khung, dù animation viết bằng CSS.
- **`transform` không phải lúc nào cũng rẻ.** Nó chỉ rẻ khi element đã ở layer riêng. Nếu không, trình duyệt vẫn phải paint lại.
- **Font chưa tải xong gây CLS.** Fallback font có metric khác → text nhảy khi font thật về. Xem [[CSS Typography]] và [[Core Web Vitals]].
- **`visibility: hidden` vẫn chiếm layout**, `display: none` thì không nhưng lại buộc layout lại khi bật trở lại.
- **Nghĩ rằng CSS-in-JS miễn phí.** Chèn rule lúc runtime làm bẩn CSSOM và buộc chạy lại từ giai đoạn Style.

## 4. Checklist áp dụng

- [ ] Animation của tôi có chỉ dùng `transform` và `opacity` không?
- [ ] Có vòng lặp nào vừa đọc `offsetWidth`/`getBoundingClientRect` vừa ghi style không?
- [ ] CSS chặn render đã tối thiểu chưa? Script đã `defer` chưa?
- [ ] Đã đo bằng panel Performance thay vì đoán chưa?
- [ ] `will-change` có được gỡ ra sau khi animation xong không?
- [ ] Font đã có `font-display` và fallback metric khớp chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Chrome DevTools Performance | Xem từng giai đoạn theo ms | https://developer.chrome.com/docs/devtools/performance |
| Layers panel | Kiểm tra element nào có compositing layer | https://developer.chrome.com/docs/devtools/rendering |
| Paint flashing | Highlight vùng bị repaint theo thời gian thực | https://developer.chrome.com/docs/devtools/rendering |

## Tham khảo

- MDN — *Critical rendering path*: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path
- web.dev — *Rendering performance*: https://web.dev/articles/rendering-performance
- MDN — *CSS containment*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment
- MDN — *CSS will-change module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Will_change
- Josh W. Comeau — *Understanding Layout Algorithms*: https://www.joshwcomeau.com/css/understanding-layout-algorithms/

## Liên kết

[[HTML Document Anatomy]] · [[Core Web Vitals]] · [[Stacking Context]] · [[CSS Transitions & Animations]] · [[Frontend Performance Budget]] · [[Frontend]]
