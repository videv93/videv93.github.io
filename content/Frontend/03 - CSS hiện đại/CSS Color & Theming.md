---
tags: [frontend, css, color]
status: evergreen
---
# CSS Color & Theming

> `#hex` và `rgb()` mô tả màu theo cách **màn hình** hiểu; `oklch()` mô tả màu theo cách **mắt người** hiểu. Khác biệt đó là lý do thang màu tự tạo bằng hex luôn có chỗ bị "chìm".

## 1. Khái niệm cốt lõi

### Cú pháp màu

| Cú pháp | Ví dụ | Ghi chú |
|---|---|---|
| Hex | `#3b82f6` `#3b82f6cc` | 8 số = kèm alpha |
| `rgb()` | `rgb(59 130 246 / 0.8)` | Cú pháp mới dùng space, `/` cho alpha |
| `hsl()` | `hsl(217 91% 60%)` | Trực giác nhưng **không đều về cảm nhận** |
| `hwb()` | `hwb(217 23% 4%)` | Hue + white + black |
| `lab()` / `lch()` | `lch(60% 70 260)` | Đều về cảm nhận, gam rộng |
| **`oklch()`** | `oklch(0.62 0.19 260)` | Đều về cảm nhận, **sửa lỗi hue shift của lch** |
| `color()` | `color(display-p3 0.2 0.5 1)` | Chỉ định color space tường minh |
| `color-mix()` | `color-mix(in oklch, var(--brand) 70%, white)` | Trộn hai màu trong không gian chỉ định |
| Relative color | `oklch(from var(--brand) calc(l + 0.1) c h)` | Dẫn xuất màu từ màu khác |

> [!note] Vì sao `oklch` đáng đổi
> Trong `hsl()`, `hsl(60 100% 50%)` (vàng) và `hsl(240 100% 50%)` (xanh dương) có cùng "lightness 50%" nhưng vàng sáng chói còn xanh thì tối om. Thang màu build bằng cách giữ lightness cố định sẽ không đồng đều. Trong `oklch`, `L` khớp với độ sáng cảm nhận thật — giữ `L` cố định và xoay `H` cho ra một bảng màu **thực sự cùng độ sáng**. Đây cũng là lý do Tailwind v4 chuyển bảng màu mặc định sang oklch.

### `color-scheme` và dark mode

```css
:root {
  color-scheme: light dark;        /* form control, scrollbar theo theme */
  --bg: white;
  --fg: black;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #111; --fg: #eee; }
}
[data-theme="dark"] { --bg: #111; --fg: #eee; }
[data-theme="light"] { --bg: white; --fg: black; }
```

`color-scheme` là property thường bị bỏ quên: không có nó, scrollbar, `<input>`, `<select>` vẫn ở giao diện sáng dù trang đã tối.

`light-dark(white, #111)` là hàm mới, gọn hơn cho trường hợp đơn giản.

### Ba trạng thái theme

| Trạng thái | Dấu hiệu | Cách bắt |
|---|---|---|
| Người dùng chọn sáng | Có đánh dấu tường minh | `[data-theme="light"]` |
| Người dùng chọn tối | Có đánh dấu tường minh | `[data-theme="dark"]` |
| **Theo hệ thống (mặc định)** | Không có đánh dấu | `@media (prefers-color-scheme: dark)` |

Đây là lý do dark mode phải viết **ba** khối chứ không phải hai: palette sáng ở `:root` trần, khối `@media` cho hệ thống, khối `[data-theme]` để lựa chọn tường minh thắng cả hai chiều.

### Blending & compositing

`mix-blend-mode` (element với nền phía sau), `background-blend-mode` (các lớp background với nhau), `isolation: isolate` để chặn blending rò ra ngoài — xem [[Stacking Context]].

## 2. Nguyên tắc

1. **Định nghĩa màu bằng custom property, không bao giờ viết hex trực tiếp trong component.** Xem [[CSS Custom Properties]].
2. **Hai tầng token**: nguyên thuỷ (`--blue-500`) → ngữ nghĩa (`--color-surface`, `--color-danger`). Component chỉ dùng tầng hai.
3. **Dark mode = đổi giá trị biến, không viết lại rule.**
4. **Luôn đặt `color-scheme`.**
5. **`oklch()` cho bảng màu mới.** Có fallback hex cho trình duyệt cũ bằng cách viết hai dòng.
6. **`color-mix()` thay cho việc sinh 10 sắc độ thủ công.**
7. **Kiểm tra tương phản, đừng đoán.** WCAG AA cần 4.5:1 cho body text, 3:1 cho text lớn và thành phần UI. Xem [[Accessibility]].
8. **Không dùng màu làm tín hiệu duy nhất.** Thêm icon, chữ, hoặc hình dạng.
9. **`currentColor` để liên kết border/icon với text.**

## 3. Cạm bẫy

- **`hsl()` không đều về cảm nhận.** Xem callout.
- **Quên `color-scheme`** → scrollbar trắng chói giữa trang tối.
- **Dark mode chỉ đảo ngược màu.** Đảo `#fff`↔`#000` cho tương phản quá gắt; dark mode tốt dùng `#111`–`#1a1a1a` và giảm độ bão hoà.
- **Shadow trong dark mode gần như vô hình.** Dùng border sáng nhẹ hoặc lớp nền sáng hơn để tạo độ cao.
- **Ảnh và logo không có phiên bản tối.** Dùng `<picture>` với `media="(prefers-color-scheme: dark)"`.
- **Nhấp nháy theme khi tải trang.** CSS áp dark sau khi HTML đã vẽ sáng. Sửa: script đồng bộ nhỏ trong `<head>` đặt `data-theme` trước khi paint.
- **`mix-blend-mode` tạo stacking context** ngoài ý muốn.
- **Màu P3 không có fallback** hiển thị sai trên màn hình sRGB. Dùng `@supports (color: color(display-p3 1 1 1))`.
- **Tương phản đo trên màu nền sai.** Nền trong suốt hoặc gradient khiến số tính được không phản ánh thực tế.
- **Chỉ test dark mode ở một trạng thái.** Ba trạng thái ở mục 1 — cái hay hỏng nhất là "theo hệ thống".

## 4. Checklist áp dụng

- [ ] Màu có đi qua custom property không?
- [ ] Có tách tầng nguyên thuỷ / ngữ nghĩa chưa?
- [ ] `color-scheme` đã đặt chưa?
- [ ] Đã xử lý đủ **ba** trạng thái theme chưa?
- [ ] Có nhấp nháy theme khi tải trang không?
- [ ] Tương phản đã đo bằng công cụ chưa (AA ≥ 4.5:1)?
- [ ] Có thông tin nào chỉ truyền tải bằng màu không?
- [ ] Dark mode có xử lý shadow và ảnh chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| oklch.com | Color picker oklch, xem gam màu | https://oklch.com/ |
| Leonardo (Adobe) | Sinh thang màu theo tương phản mục tiêu | https://leonardocolor.io/ |
| DevTools contrast checker | Đo tương phản ngay trong color picker | https://developer.chrome.com/docs/devtools/accessibility/contrast |
| APCA | Mô hình tương phản mới, chính xác hơn WCAG 2 | https://www.myndex.com/APCA/ |

## Tham khảo

- MDN — *CSS colors module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors
- MDN — *CSS color adjustment / `color-scheme`*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Color_adjustment
- MDN — *CSS compositing and blending*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Compositing_and_blending
- CSSWG — *CSS Color Level 4*: https://drafts.csswg.org/css-color-4/
- W3C — *WCAG 2.2 contrast minimum*: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Liên kết

[[CSS Custom Properties]] · [[Color Theory]] · [[Design Tokens]] · [[Responsive Layout]] · [[Tailwind Theme & Configuration]] · [[Frontend]]
