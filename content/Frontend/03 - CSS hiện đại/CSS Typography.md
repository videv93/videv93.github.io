---
tags: [frontend, css, typography]
status: evergreen
---
# CSS Typography

> Phần **kỹ thuật** của chữ trên web: tải font, line box, ngắt dòng, writing mode. Phần thẩm mỹ và thang tỉ lệ sống ở [[Typography]] bên UIUX.

## 1. Khái niệm cốt lõi

### Tải font

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-weight: 100 900;          /* variable font: một file, mọi weight */
  font-display: swap;
  unicode-range: U+0000-00FF;
  size-adjust: 100%;
  ascent-override: 90%;
}
```

| `font-display` | Hành vi |
|---|---|
| `auto` | Trình duyệt quyết định |
| `block` | Ẩn text ~3s chờ font (**FOIT**) |
| `swap` | Hiện fallback ngay, đổi khi font về (**FOUT**) |
| `fallback` | Block ngắn, rồi swap, rồi bỏ |
| `optional` | Block rất ngắn; nếu chậm thì **không dùng font** — tốt nhất cho CLS |

`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` cho phép **khớp metric của fallback với font thật**, xoá gần hết CLS do đổi font.

### Inline layout — vì sao chữ có khoảng trống bí ẩn

Text nằm trong **line box**; mỗi từ nằm trong **inline box**. Chiều cao line box do `line-height` quyết định, và phần dư được chia đều trên/dưới thành **half-leading**. Đây là nguồn gốc của:

- Khoảng trống dưới `<img>` trong một `<div>` (ảnh nằm trên baseline, phần descender vẫn chiếm chỗ). Sửa: `display: block` hoặc `vertical-align: bottom`.
- Chữ không căn giữa hoàn hảo trong button dù `line-height` khớp chiều cao.

`vertical-align` chỉ áp dụng cho inline và table-cell — **không** cho block, và không phải cách căn giữa dọc.

### Ngắt dòng và white space

| Property | Dùng để |
|---|---|
| `white-space` | `normal` `nowrap` `pre` `pre-wrap` `pre-line` `break-spaces` |
| `overflow-wrap: anywhere` | Cho phép bẻ **giữa từ** khi từ dài hơn dòng |
| `word-break: break-all` | Bẻ bất kể ngữ nghĩa (tránh dùng cho văn xuôi) |
| `hyphens: auto` | Tự chèn dấu gạch nối (cần `lang` đúng) |
| `text-wrap: balance` | Cân bằng số từ mỗi dòng — **cho heading** |
| `text-wrap: pretty` | Tránh dòng cuối chỉ một từ — **cho đoạn văn** |
| `line-clamp: 3` | Cắt sau n dòng, thêm `…` |

`text-wrap: balance` và `pretty` là hai property đơn giản nhất mang lại cải thiện thị giác lớn nhất trong CSS hiện đại.

### Text decoration & generated content

`text-decoration-line/color/style/thickness`, `text-underline-offset`, `text-emphasis`, `text-shadow`.
`content` trên `::before`/`::after`; `counter-reset` / `counter-increment` / `counter()` cho đánh số tự động; `@counter-style` để định nghĩa kiểu marker riêng.

### Writing modes & multicol

`writing-mode: horizontal-tb | vertical-rl | vertical-lr`, `text-orientation`, `direction`.
Multi-column: `columns`, `column-count`, `column-width`, `column-gap`, `column-rule`, `column-span`, cùng `break-before/after/inside` để kiểm soát ngắt — cũng dùng cho `@page` khi in.

Ruby layout (`<ruby>`, `ruby-position`) cho chú âm Đông Á.

## 2. Nguyên tắc

1. **`font-display: swap` là mặc định an toàn**; `optional` khi CLS quan trọng hơn thương hiệu.
2. **Preload font quan trọng:** `<link rel="preload" as="font" type="font/woff2" crossorigin>` — thiếu `crossorigin` thì tải hai lần.
3. **Variable font thay 6 file weight.** Một file thường nhỏ hơn tổng, và mở khoá weight trung gian.
4. **`unicode-range` để chia subset.** Trình duyệt chỉ tải phần chứa ký tự thực sự dùng.
5. **Khớp metric fallback** bằng `size-adjust`/`ascent-override` — cách rẻ nhất để xoá CLS do font.
6. **`text-wrap: balance` cho heading, `pretty` cho body.**
7. **`max-width: 65ch`** cho độ dài dòng dễ đọc.
8. **`hyphens: auto` cần `lang` đúng** trên `<html>` — không có nó thì không có từ điển ngắt.
9. **`line-height` unitless.** Xem [[CSS Inheritance & Value Processing]].

## 3. Cạm bẫy

- **Khoảng trắng dưới ảnh.** Xem mục 1 — ảnh là inline, ngồi trên baseline.
- **`vertical-align: middle` không căn giữa block.** Nó căn theo x-height của text xung quanh, và chỉ với inline element.
- **FOIT nuốt nội dung.** `font-display: block` (hoặc mặc định) ẩn text tới 3 giây — người dùng nhìn trang trắng.
- **Font thứ ba chặn render.** `@import` Google Fonts trong CSS là tuần tự; dùng `<link>` + `preconnect`.
- **`word-break: break-all` cho văn xuôi** làm chữ vỡ giữa từ tuỳ tiện. Dùng `overflow-wrap: anywhere`.
- **`text-overflow: ellipsis` cần `overflow: hidden` + `white-space: nowrap`** — thiếu một trong ba là không hoạt động.
- **`line-clamp` cũ cần bộ ba `-webkit-`.** `line-clamp` chuẩn đã có nhưng còn mới.
- **`letter-spacing` trên chữ hoa toàn phần cần dương, trên body text thường làm giảm tốc độ đọc.**
- **`text-transform: uppercase` đọc bằng screen reader vẫn là chữ gốc** — tốt; nhưng đừng dùng nó để "sửa" dữ liệu.
- **Quên `font-synthesis: none`** khiến trình duyệt tự bịa bold/italic giả xấu xí khi weight không tồn tại.

## 4. Checklist áp dụng

- [ ] `font-display` đã đặt chưa? Chọn `swap` hay `optional`?
- [ ] Font quan trọng đã preload kèm `crossorigin` chưa?
- [ ] Fallback đã khớp metric để tránh CLS chưa?
- [ ] Dùng variable font được không?
- [ ] Heading có `text-wrap: balance` chưa?
- [ ] Độ dài dòng có bị giới hạn bằng `ch` không?
- [ ] `lang` trên `<html>` có đúng để `hyphens` hoạt động không?
- [ ] Ảnh trong inline context có `display: block` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Fontaine / Fontpie | Sinh metric override cho fallback | https://github.com/unjs/fontaine |
| `next/font` | Tự host + tối ưu font trong Next.js | https://nextjs.org/docs/app/api-reference/components/font |
| glyphhanger | Subset font theo ký tự thực dùng | https://github.com/zachleat/glyphhanger |
| Wakamai Fondue | Xem font có gì (axis, feature, ký tự) | https://wakamaifondue.com/ |

## Tham khảo

- MDN — *CSS fonts module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts
- MDN — *CSS text module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Text
- MDN — *CSS inline layout*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Inline_layout
- MDN — *CSS writing modes*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Writing_modes
- web.dev — *Best practices for fonts*: https://web.dev/articles/font-best-practices

## Liên kết

[[Typography]] · [[CSS Values & Units]] · [[Core Web Vitals]] · [[Tailwind Typography Utilities]] · [[CSS Modules Map]] · [[Frontend]]
