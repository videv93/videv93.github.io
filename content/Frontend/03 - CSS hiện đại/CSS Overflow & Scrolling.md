---
tags: [frontend, css]
status: evergreen
---
# CSS Overflow & Scrolling

> Cuộn là tương tác phổ biến nhất trên web và cũng là chỗ CSS âm thầm phá hỏng nhiều thứ nhất: `overflow: hidden` cắt popover, phá `sticky`, và khoá cuộn trên iOS theo cách không ai đoán được.

## 1. Khái niệm cốt lõi

### `overflow`

| Giá trị | Hành vi |
|---|---|
| `visible` | Tràn ra ngoài, vẫn nhìn thấy (mặc định) |
| `hidden` | Cắt, **vẫn cuộn được bằng script** |
| `clip` | Cắt, **không cuộn được kể cả bằng script**, không tạo scroll container |
| `scroll` | Luôn hiện scrollbar |
| `auto` | Scrollbar khi cần |

`overflow-x` / `overflow-y` riêng — nhưng nếu một trục là `hidden`/`scroll`/`auto` và trục kia là `visible`, trục `visible` bị **ép thành `auto`**. Đây là lý do `overflow-x: hidden` bất ngờ tạo scrollbar dọc.

> [!note] `clip` là thứ bạn thường muốn
> `overflow: hidden` tạo **scroll container** — nó phá `position: sticky` của con, và có thể bị cuộn bằng bàn phím tới nội dung ẩn (bẫy trợ năng). `overflow: clip` chỉ cắt, không tạo scroll container. Nếu bạn chỉ muốn cắt, dùng `clip`.

### `overscroll-behavior`

Điều khiển chuyện gì xảy ra khi chạm biên cuộn:

| Giá trị | Hành vi |
|---|---|
| `auto` | **Scroll chaining** — cuộn tiếp lan sang cha |
| `contain` | Chặn lan sang cha, giữ hiệu ứng bounce của trình duyệt |
| `none` | Chặn lan **và** tắt bounce/pull-to-refresh |

`overscroll-behavior: contain` trên modal/drawer là cách chuẩn để trang nền không cuộn theo — thay cho hack `body { overflow: hidden }`.

### Scroll snap

```css
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}
.slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;      /* không cho lướt qua nhiều slide */
}
```

`scroll-padding` / `scroll-margin` chừa chỗ cho header cố định — cũng ảnh hưởng tới đích của anchor link (`#id`), giải quyết lỗi "nhảy tới heading nhưng bị header che".

### Scroll behavior & anchoring

- `scroll-behavior: smooth` — cuộn mượt khi nhảy anchor. **Nên đặt trong `@media (prefers-reduced-motion: no-preference)`.**
- **Scroll anchoring** (`overflow-anchor`) — trình duyệt tự giữ vị trí đọc khi nội dung phía trên thay đổi (ảnh tải xong, quảng cáo chèn vào). Bật mặc định; chỉ tắt (`overflow-anchor: none`) khi nó gây xung đột với logic cuộn tự viết.

### Scrollbar styling

| Property | Nghĩa |
|---|---|
| `scrollbar-width` | `auto` `thin` `none` |
| `scrollbar-color` | `<thumb> <track>` |
| `scrollbar-gutter` | `stable` — **chừa chỗ scrollbar luôn**, chống nhảy layout |

`scrollbar-gutter: stable` giải quyết lỗi kinh điển: trang nhảy ngang khi chuyển từ trang ngắn (không scrollbar) sang trang dài (có scrollbar).

## 2. Nguyên tắc

1. **`overflow: clip` khi chỉ cần cắt**, `hidden` khi thực sự cần scroll container.
2. **`overscroll-behavior: contain` cho mọi vùng cuộn lồng nhau** — modal, drawer, dropdown, chat panel.
3. **`scroll-padding-top` bằng chiều cao header cố định.**
4. **`scrollbar-gutter: stable` trên `html`** để chống nhảy layout.
5. **Vùng cuộn phải focus được.** Một `<div>` cuộn được mà không có `tabindex="0"` thì người dùng bàn phím không cuộn tới nội dung bên trong.
6. **`scroll-behavior: smooth` phải tôn trọng `prefers-reduced-motion`.**
7. **Bảng rộng cuộn trong container riêng**, đừng để cả trang cuộn ngang. Xem [[Table & Data Display]].

## 3. Cạm bẫy

- **`overflow: hidden` phá `position: sticky` của con.** Lỗi số một khi debug sticky — xem [[Containing Block & Positioned Layout]].
- **`overflow: hidden` cắt dropdown/tooltip.** Lời giải: anchor positioning hoặc portal, không phải tăng z-index.
- **`overflow-x: hidden` tạo scrollbar dọc** vì luật ép trục ở mục 1.
- **`body { overflow: hidden }` để khoá cuộn khi mở modal** mất vị trí cuộn trên iOS và gây nhảy layout. Dùng `overscroll-behavior` trên modal, hoặc `<dialog showModal()>` (tự khoá cuộn nền).
- **Vùng cuộn không truy cập được bằng bàn phím.** Cần `tabindex="0"` và thường cả `role="region"` + `aria-label`.
- **`scroll-snap-type: mandatory` bẫy người dùng** khi slide cao hơn viewport — họ không dừng được ở giữa. Dùng `proximity`.
- **Scrollbar tuỳ chỉnh quá mảnh** khó trúng bằng chuột và vi phạm target size tối thiểu.
- **`100vh` + thanh địa chỉ mobile** tạo cuộn thừa — dùng `dvh`, xem [[CSS Values & Units]].
- **Nội dung tràn ngang không rõ nguồn.** Tìm bằng: `* { outline: 1px solid red }` hoặc script tìm element có `scrollWidth > document.documentElement.clientWidth`.
- **`scroll-behavior: smooth` toàn cục** làm mọi cú nhảy anchor chậm chạp, kể cả khi người dùng muốn tức thì.

## 4. Checklist áp dụng

- [ ] `overflow: hidden` này có thực sự cần scroll container, hay `clip` là đủ?
- [ ] Có `overflow: hidden` nào đang cắt popover hoặc phá sticky không?
- [ ] Vùng cuộn lồng nhau có `overscroll-behavior: contain` chưa?
- [ ] Vùng cuộn có focus được bằng bàn phím không?
- [ ] `scroll-padding-top` có khớp header cố định không?
- [ ] `scrollbar-gutter: stable` đã đặt chưa?
- [ ] Trang có cuộn ngang ngoài ý muốn không?
- [ ] Cuộn mượt có tôn trọng `prefers-reduced-motion` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools `scroll` badge | Đánh dấu scroll container trong Elements | https://developer.chrome.com/docs/devtools/css |
| `document.scrollingElement` | Tìm element cuộn thật từ console | https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollingElement |
| Scroll-snap debugging overlay | Hiện điểm snap | https://developer.chrome.com/docs/devtools/rendering |

## Tham khảo

- MDN — *CSS overflow module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow
- MDN — *CSS overscroll behavior*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overscroll_behavior
- MDN — *CSS scroll snap*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap
- MDN — *CSS scroll anchoring*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_anchoring
- MDN — *CSS scrollbars styling*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scrollbars_styling

## Liên kết

[[Containing Block & Positioned Layout]] · [[Block Formatting Context]] · [[Tailwind Layout Utilities]] · [[Accessible Markup & ARIA]] · [[Frontend]]
