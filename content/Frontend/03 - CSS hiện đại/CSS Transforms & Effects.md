---
tags: [frontend, css]
status: evergreen
---
# CSS Transforms & Effects

> Nhóm property vẽ lại element mà **không đụng tới layout**: transform, filter, mask, clip, background, border, shadow. Chúng rẻ về layout nhưng không phải lúc nào cũng rẻ về paint.

## 1. Khái niệm cốt lõi

### Transform

| Cách viết | Ví dụ |
|---|---|
| Hàm gộp | `transform: translate(10px, 20px) rotate(45deg) scale(1.2)` |
| Property riêng | `translate: 10px 20px; rotate: 45deg; scale: 1.2` |

Property riêng (`translate`/`rotate`/`scale`) là bổ sung mới và **rất đáng dùng**: chúng animate độc lập được, trong khi `transform` gộp thì một animation ghi đè toàn bộ.

Hàm: `translate/X/Y/Z/3d`, `scale/X/Y/Z/3d`, `rotate/X/Y/Z/3d`, `skew/X/Y`, `matrix`, `perspective`.
Hỗ trợ: `transform-origin` (mặc định `50% 50%`), `transform-style: preserve-3d`, `perspective`, `perspective-origin`, `backface-visibility`.

**Thứ tự hàm quan trọng.** `translate(50px) rotate(45deg)` khác `rotate(45deg) translate(50px)` — hàm áp dụng từ phải sang trái lên hệ toạ độ.

### Filter & backdrop-filter

`blur()` `brightness()` `contrast()` `drop-shadow()` `grayscale()` `hue-rotate()` `invert()` `opacity()` `saturate()` `sepia()` `url(#svgfilter)`.

`backdrop-filter` áp lên **nội dung phía sau** element — cơ sở của hiệu ứng kính mờ (glassmorphism).

| | `filter: drop-shadow()` | `box-shadow` |
|---|---|---|
| Theo | Hình dạng alpha thật (kể cả PNG trong suốt, SVG) | Hộp chữ nhật |
| Chi phí | Cao hơn | Thấp hơn |

### Masking & clipping

| Property | Nghĩa |
|---|---|
| `clip-path` | Cắt theo hình học: `circle()` `inset()` `polygon()` `path()` `shape()` |
| `mask-image` | Cắt theo **độ trong suốt** của một ảnh/gradient |
| `mask-mode` `-repeat` `-position` `-size` `-composite` | Điều khiển mask |
| `shape-outside` | Định hình vùng float để text quấn theo |

`mask-image: linear-gradient(to bottom, black, transparent)` là cách chuẩn để làm hiệu ứng mờ dần ở mép danh sách cuộn.

### Background & border

Background: `background-image` (url, gradient, `image-set()`), `-position`, `-size` (`cover`/`contain`), `-repeat`, `-attachment`, `-clip`, `-origin`, `-blend-mode`. Nhiều lớp cách nhau bởi dấu phẩy, **lớp đầu nằm trên cùng**.

Border: `border-width/style/color`, `border-radius` (nhận cả cú pháp elliptical `10px / 20px`), `outline` (**không chiếm layout**), `box-shadow` (nhiều lớp, `inset`), và các bổ sung mới `corner-shape`, `border-shape`, border từng phần.

`background-clip: text` + `color: transparent` cho gradient text.

### Images & object fit

`object-fit` (`contain` `cover` `fill` `none` `scale-down`) và `object-position` điều khiển cách nội dung của **replaced element** (`<img>`, `<video>`) lấp đầy hộp của nó — tương đương `background-size`/`background-position` nhưng cho element thật.

`aspect-ratio: 16 / 9` giữ tỉ lệ mà không cần hack padding.

## 2. Nguyên tắc

1. **Dùng `translate`/`rotate`/`scale` riêng lẻ** thay `transform` gộp khi cần animate độc lập.
2. **`transform` và `opacity` là hai property rẻ nhất để animate.** Xem [[Browser Rendering Pipeline]].
3. **`outline` cho chỉ báo thị giác không được xê dịch layout** — đặc biệt focus ring.
4. **`box-shadow` nhiều lớp cho độ sâu thật.** Một shadow lớn mờ = giả; hai đến ba lớp với offset/blur khác nhau = thật.
5. **`aspect-ratio` + `object-fit: cover`** là công thức chuẩn cho ảnh thumbnail.
6. **`backdrop-filter` cần fallback** — không có nó thì nền trong suốt hoàn toàn, chữ không đọc được. Luôn kèm `background-color` bán trong suốt.
7. **`clip-path` khi cần hình học; `mask` khi cần gradient/độ mờ.**
8. **`will-change` chỉ khi đã đo được vấn đề**, và gỡ ra sau.

## 3. Cạm bẫy

- **`transform` tạo containing block cho `fixed` và stacking context.** Cạm bẫy lớn nhất của nhóm này — xem [[Containing Block & Positioned Layout]] và [[Stacking Context]].
- **`filter` cũng vậy**, kể cả `filter: none` được đặt qua biến rồi thành giá trị khác.
- **`overflow: hidden` không cắt được element đã transform 3D** trong một số trình duyệt.
- **`backdrop-filter: blur()` rất đắt** — nó buộc đọc lại vùng phía sau mỗi frame. Tránh trên element cuộn.
- **Thứ tự hàm transform.** Xem mục 1.
- **`transform-origin` mặc định là tâm**, không phải góc trên trái — animation xoay hay bất ngờ vì điều này.
- **`border-radius` bị cắt bởi con** — cần `overflow: hidden` trên cha, thứ lại gây cạm bẫy khác.
- **`background-attachment: fixed` gây giật khi cuộn** trên mobile; gần như luôn nên tránh.
- **Gradient bị dải màu (banding)** khi chuyển đổi dài và nhạt — thêm nhiễu nhẹ hoặc dùng gradient trong `oklch`.
- **`object-fit` không có tác dụng nếu không đặt kích thước** cho element.
- **`clip-path: polygon()` với phần trăm** neo vào border box; đổi kích thước là méo hình.

## 4. Checklist áp dụng

- [ ] Property này có tạo stacking context / containing block ngoài ý muốn không?
- [ ] Animation có dùng `transform`/`opacity` không?
- [ ] `backdrop-filter` đã có fallback nền chưa?
- [ ] Ảnh có `aspect-ratio` + `object-fit` chưa?
- [ ] Focus ring dùng `outline` (không xê dịch layout) chưa?
- [ ] Shadow có nhiều lớp để trông tự nhiên không?
- [ ] `transform-origin` có đúng ý không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Clippy | Sinh `clip-path: polygon()` trực quan | https://bennettfeely.com/clippy/ |
| CSS Gradient | Dựng gradient nhiều điểm | https://cssgradient.io/ |
| Shadow Palette Generator | Sinh shadow nhiều lớp tự nhiên | https://www.joshwcomeau.com/shadow-palette/ |
| DevTools → Rendering → Paint flashing | Xem vùng bị repaint | https://developer.chrome.com/docs/devtools/rendering |

## Tham khảo

- MDN — *CSS transforms module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms
- MDN — *CSS filter effects*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Filter_effects
- MDN — *CSS masking*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking
- MDN — *CSS backgrounds and borders*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Backgrounds_and_borders
- MDN — *CSS images module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images

## Liên kết

[[CSS Transitions & Animations]] · [[Stacking Context]] · [[Browser Rendering Pipeline]] · [[Tailwind Visual Utilities]] · [[CSS Modules Map]] · [[Frontend]]
