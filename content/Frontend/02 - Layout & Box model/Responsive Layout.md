---
tags: [frontend, css, layout]
status: evergreen
---
# Responsive Layout

> Media query hỏi về **viewport**; container query hỏi về **element cha**. Đó là khác biệt then chốt — component tái sử dụng được không thể phụ thuộc vào kích thước màn hình, vì nó không biết nó đang được đặt ở đâu.

## 1. Khái niệm cốt lõi

### Media query

```css
@media (min-width: 48rem) { ... }
@media (width >= 48rem) { ... }              /* cú pháp range, dễ đọc hơn */
@media (min-width: 48rem) and (max-width: 64rem) { ... }
@media (prefers-color-scheme: dark) { ... }
```

Các feature đáng biết ngoài kích thước:

| Feature | Giá trị | Dùng để |
|---|---|---|
| `prefers-color-scheme` | `light` `dark` | Dark mode — [[CSS Color & Theming]] |
| `prefers-reduced-motion` | `no-preference` `reduce` | Tắt animation |
| `prefers-contrast` | `no-preference` `more` `less` | Tăng tương phản |
| `prefers-reduced-transparency` | | Bỏ hiệu ứng kính mờ |
| `pointer` / `any-pointer` | `none` `coarse` `fine` | Phân biệt cảm ứng và chuột |
| `hover` / `any-hover` | `none` `hover` | Thiết bị có hover thật không |
| `orientation` | `portrait` `landscape` | |
| `forced-colors` | `active` | Chế độ tương phản cao của Windows |
| `display-mode` | `standalone` `browser` | PWA đã cài chưa |
| `scripting` | `enabled` `none` | JS có chạy không |

### Container query

```css
.card-wrapper { container-type: inline-size; container-name: card; }

@container card (width >= 24rem) {
  .card { grid-template-columns: 8rem 1fr; }
}
```

| `container-type` | Query được |
|---|---|
| `inline-size` | Chiều rộng (phổ biến nhất — rẻ nhất) |
| `size` | Cả hai chiều (cần kích thước xác định) |
| `normal` | Không query kích thước, nhưng vẫn dùng style query được |

Đơn vị container: `cqw` `cqh` `cqi` `cqb` `cqmin` `cqmax`.

### Ba tầng responsive — theo thứ tự ưu tiên

| Tầng | Công cụ | Khi nào |
|---|---|---|
| **1. Nội tại** | `flex-wrap`, `auto-fit` + `minmax`, `clamp()`, `max-width: 65ch` | Mặc định — không cần breakpoint nào |
| **2. Container query** | `@container` | Component đổi layout theo chỗ nó được đặt |
| **3. Media query** | `@media` | Điều hướng cấp trang, sở thích người dùng, in ấn |

Phần lớn breakpoint trong codebase cũ tồn tại vì tầng 1 chưa có sẵn hồi đó.

### Ảnh responsive

```html
<img src="s.jpg" srcset="s.jpg 400w, m.jpg 800w, l.jpg 1600w"
     sizes="(min-width: 48rem) 50vw, 100vw"
     width="800" height="600" alt="..." loading="lazy" decoding="async">
```

`<picture>` + `<source type>` để đổi **định dạng** (AVIF/WebP) hoặc art direction (khung ảnh khác cho mobile).

## 2. Nguyên tắc

1. **Mobile-first: dùng `min-width`.** Style nền là mobile, breakpoint chỉ thêm vào. Ít CSS hơn, và mặc định an toàn hơn.
2. **Breakpoint theo nội dung, không theo tên thiết bị.** Đặt breakpoint ở chỗ layout *bắt đầu xấu*, không ở 768px vì "đó là iPad".
3. **Breakpoint bằng `rem`.** Với `px`, người dùng phóng to chữ không kích hoạt được breakpoint.
4. **Container query cho mọi component tái sử dụng.** Nếu một card xuất hiện cả ở sidebar lẫn main, nó phải hỏi cha, không hỏi viewport.
5. **`clamp()` xoá phần lớn breakpoint typography.** Xem [[CSS Values & Units]].
6. **Tôn trọng `prefers-reduced-motion` và `prefers-contrast`.** Đây là responsive với **người dùng**, không chỉ với màn hình.
7. **`pointer: coarse` để tăng target size**, không dùng `max-width` — màn hình lớn cũng có cảm ứng.
8. **Luôn có `width`/`height` trên `<img>`** để giữ chỗ, tránh CLS. Xem [[Core Web Vitals]].

## 3. Cạm bẫy

- **`var()` không dùng được trong media query.** Breakpoint không thể là custom property. Xem [[CSS Custom Properties]].
- **`container-type: inline-size` tạo containment** — nó **cũng** tạo stacking context và containing block cho `absolute`. Cạm bẫy tương tự `transform`; xem [[Stacking Context]].
- **Container query không tự hỏi được chính element đó.** Phải có một wrapper: element khai `container-type` và element *bên trong* nó mới style theo query được.
- **Breakpoint theo `px` phá zoom chữ.**
- **`max-width` và `min-width` chồng lấn tại đúng điểm cắt.** `max-width: 768px` và `min-width: 768px` cùng khớp tại 768px. Dùng cú pháp range (`width < 768px`) để tránh.
- **Ẩn nội dung bằng `display: none` ở mobile vẫn tải nó.** Ảnh, iframe vẫn tốn băng thông.
- **`100vh` trên mobile** — dùng `dvh`. Xem [[CSS Values & Units]].
- **Nghĩ `hover: hover` nghĩa là desktop.** Tablet có bút cảm ứng báo `hover`; laptop cảm ứng báo cả hai.
- **`orientation: landscape` khớp cả desktop.** Màn hình desktop luôn là landscape.

## 4. Checklist áp dụng

- [ ] Đã thử layout nội tại (`auto-fit`, `clamp`, `wrap`) trước khi thêm breakpoint chưa?
- [ ] Component tái sử dụng có dùng container query thay media query không?
- [ ] Breakpoint có dùng `rem` không?
- [ ] Breakpoint đặt theo chỗ layout gãy hay theo tên thiết bị?
- [ ] Đã xử lý `prefers-reduced-motion` chưa?
- [ ] Ảnh có `srcset`/`sizes` và `width`/`height` chưa?
- [ ] Layout full-height dùng `dvh` chưa?
- [ ] `container-type` có gây tác dụng phụ về stacking/containing block không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools Device Mode | Giả lập viewport, `prefers-*`, throttling | https://developer.chrome.com/docs/devtools/device-mode |
| DevTools → Rendering | Ép `prefers-color-scheme`, `prefers-reduced-motion` | https://developer.chrome.com/docs/devtools/rendering |
| Utopia | Sinh thang fluid không cần breakpoint | https://utopia.fyi/ |
| RespImageLint | Kiểm tra `srcset`/`sizes` có đúng không | https://ausi.github.io/respimagelint/ |

## Tham khảo

- MDN — *CSS media queries*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries
- MDN — *CSS containment / container queries*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment
- MDN — *Responsive images*: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
- web.dev — *Learn Responsive Design*: https://web.dev/learn/design
- CSSWG — *CSS Conditional Rules Level 5*: https://drafts.csswg.org/css-conditional-5/

## Liên kết

[[CSS Grid]] · [[CSS Values & Units]] · [[Tailwind Variants & States]] · [[Core Web Vitals]] · [[CSS Color & Theming]] · [[Frontend]]
