---
tags: [frontend, tailwind, layout]
status: evergreen
---
# Tailwind Layout Utilities

> Bảng tra utility cho `display`, `position`, `float`, `overflow`, `isolation`, `z-index`, `aspect-ratio`, `container`, `columns`, `break-*`, `object-fit`. Phần *vì sao* nằm ở [[CSS Box Model]], [[Containing Block & Positioned Layout]], [[Stacking Context]].

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Display

`block` · `inline-block` · `inline` · `flex` · `inline-flex` · `grid` · `inline-grid` · `contents` · `flow-root` · `hidden`
Table: `table` · `inline-table` · `table-caption` · `table-cell` · `table-column` · `table-column-group` · `table-header-group` · `table-row-group` · `table-footer-group` · `table-row`

`flow-root` là utility tạo BFC — xem [[Block Formatting Context]]. `contents` xoá hộp của element nhưng giữ con (hữu ích để con tham gia grid của ông).

### Position & inset

`static` · `relative` · `absolute` · `fixed` · `sticky`
`inset-0` · `inset-x-0` · `inset-y-0` · `top-0` · `right-0` · `bottom-0` · `left-0` · `start-0` · `end-0` (logic, theo hướng viết)

### Float & clear

Float: `float-start` · `float-end` · `float-left` · `float-right` · `float-none`
Clear: `clear-start` · `clear-end` · `clear-left` · `clear-right` · `clear-both` · `clear-none`

> [!note] Float gần như đã hết vai trò
> Trong layout hiện đại, float chỉ còn một công dụng chính đáng: cho text quấn quanh một ảnh trong đoạn văn. Mọi việc khác dùng flex hoặc grid.

### Overflow & overscroll

Overflow: `overflow-auto` · `overflow-hidden` · `overflow-clip` · `overflow-visible` · `overflow-scroll`, kèm biến thể trục `overflow-x-*` / `overflow-y-*` (`auto` `hidden` `clip` `visible` `scroll`)
Overscroll: `overscroll-auto` · `overscroll-contain` · `overscroll-none`, kèm `overscroll-x-*` / `overscroll-y-*`

Ưu tiên `overflow-clip` hơn `overflow-hidden` khi chỉ cần cắt — xem [[CSS Overflow & Scrolling]].

### Isolation & z-index

`isolate` (= `isolation: isolate`) · `isolation-auto`
`z-0` `z-10` `z-20` `z-30` `z-40` `z-50` · `z-auto` · `z-[n]`

`isolate` là công cụ quan trọng nhất ở đây: đặt nó lên component để `z-index` bên trong không đấu với phần còn lại của trang. Xem [[Stacking Context]].

### Aspect ratio & object

`aspect-auto` · `aspect-square` · `aspect-video` · `aspect-[16/9]`
Object fit: `object-contain` · `object-cover` · `object-fill` · `object-none` · `object-scale-down`
Object position: `object-top` · `object-bottom` · `object-left` · `object-right` · `object-center` · `object-left-top` · `object-left-bottom` · `object-right-top` · `object-right-bottom`

Công thức thumbnail: `aspect-video object-cover w-full`.

### Container

| Class | Breakpoint | Property |
|---|---|---|
| `container` | None | `width: 100%` |
| | `sm` (640px) | `max-width: 640px` |
| | `md` (768px) | `max-width: 768px` |
| | `lg` (1024px) | `max-width: 1024px` |
| | `xl` (1280px) | `max-width: 1280px` |
| | `2xl` (1536px) | `max-width: 1536px` |

> [!warning] `container` của Tailwind không tự căn giữa
> Khác với container của Bootstrap và nhiều framework khác, **`container` của Tailwind không tự căn giữa và không có padding ngang mặc định.** Phải viết `container mx-auto px-4`. Đây là điểm khiến người chuyển từ framework khác mất thời gian nhất.

### Columns & break

Columns: `columns-1` … `columns-12` · `columns-auto` · `columns-3xs` … `columns-7xl` · `gap-x-*` để đặt khoảng cách cột
Break after: `break-after-auto` · `-avoid` · `-all` · `-avoid-page` · `-page` · `-left` · `-right` · `-column`
Break before: cùng bộ giá trị với tiền tố `break-before-`
Break inside: `break-inside-auto` · `-avoid` · `-avoid-page` · `-avoid-column`
Box decoration: `box-decoration-slice` · `box-decoration-clone`

`break-inside-avoid` trên card trong layout multicol là cách chặn card bị cắt đôi giữa hai cột.

### Box sizing & visibility

`box-border` (mặc định của Preflight) · `box-content`
`visible` · `invisible` · `collapse`

`invisible` giữ chỗ trong layout; `hidden` thì không.

## 2. Nguyên tắc

1. **`isolate` trên mọi component có `z-index` bên trong.**
2. **`container mx-auto px-4`, không bao giờ chỉ `container`.**
3. **`overflow-clip` mặc định, `overflow-hidden` khi cần scroll container.**
4. **Dùng `start`/`end` thay `left`/`right`** cho dự án có thể đa ngôn ngữ.
5. **`aspect-*` + `object-cover` cho mọi ảnh có kích thước không đoán trước.**
6. **Thang `z-index` của Tailwind chỉ tới 50** — nếu cần hơn, vấn đề là stacking context chứ không phải số.
7. **`hidden` xoá khỏi accessibility tree; `sr-only` giữ lại.** Dùng `sr-only` cho nhãn chỉ dành cho screen reader.

## 3. Cạm bẫy

- **`container` không căn giữa.** Callout ở trên.
- **`z-50` không nổi lên** vì element nằm trong stacking context khác. Tăng số không giúp — thêm `isolate` đúng chỗ hoặc portal ra ngoài.
- **`overflow-hidden` phá `sticky` con** — xem [[CSS Overflow & Scrolling]].
- **`fixed` không neo vào viewport** vì tổ tiên có `transform`/`filter`/`backdrop-blur`. Rất dễ gặp vì `backdrop-blur` là utility phổ biến.
- **`hidden` vs `invisible` vs `sr-only`** — ba hành vi khác nhau về layout và trợ năng, hay bị dùng lẫn.
- **`aspect-video` không có tác dụng** nếu element không có chiều rộng xác định.
- **`object-cover` không hoạt động** nếu `<img>` không được đặt `w-*`/`h-*`.
- **`contents` xoá cả background và border** của element — chỉ dùng khi thực sự chỉ cần cấu trúc.
- **`columns-*` cắt card đôi** — thêm `break-inside-avoid`.

## 4. Checklist áp dụng

- [ ] Component có `z-index` bên trong đã có `isolate` chưa?
- [ ] `container` có kèm `mx-auto px-4` không?
- [ ] `overflow-hidden` này có cần scroll container thật không?
- [ ] Element `fixed` — có tổ tiên nào có transform/filter/backdrop-blur không?
- [ ] Ảnh có `aspect-*` + `object-cover` + kích thước chưa?
- [ ] Ẩn element này — tôi muốn `hidden`, `invisible`, hay `sr-only`?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Tailwind IntelliSense | Hover xem CSS thật của utility | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss |
| DevTools Layers | Kiểm tra stacking context khi `z-*` không ăn | https://developer.chrome.com/docs/devtools/rendering |

## Tham khảo

- Tailwind — *Layout utilities*: https://tailwindcss.com/docs/aspect-ratio
- Tailwind — *Container*: https://tailwindcss.com/docs/container
- Tailwind — *Position*: https://tailwindcss.com/docs/position
- MDN — *CSS display module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display

## Liên kết

[[Tailwind Utility Model]] · [[Stacking Context]] · [[CSS Overflow & Scrolling]] · [[Containing Block & Positioned Layout]] · [[Tailwind Flexbox & Grid]] · [[Frontend]]
