---
tags: [frontend, css]
status: evergreen
---
# CSS Values & Units

> Mỗi declaration là một cặp property/value. Chọn **đơn vị** là một quyết định kiến trúc: nó quyết định trang của bạn có tôn trọng cài đặt font của người dùng hay không, có co giãn theo container hay không.

## 1. Khái niệm cốt lõi

### Đơn vị chiều dài

| Nhóm | Đơn vị | Neo vào |
|---|---|---|
| **Absolute** | `px` `pt` `cm` `in` | Không co giãn |
| **Font-relative** | `em` | `font-size` của **chính element** (hoặc cha, với `font-size`) |
| | `rem` | `font-size` của `:root` |
| | `ch` | Chiều rộng ký tự `0` |
| | `ex` `cap` `ic` `lh` `rlh` | Metric khác của font |
| **Viewport** | `vw` `vh` `vmin` `vmax` | Viewport |
| | `svh` `lvh` `dvh` | Small / Large / **Dynamic** viewport — giải quyết thanh địa chỉ mobile |
| **Container** | `cqw` `cqh` `cqi` `cqb` `cqmin` `cqmax` | Container query — xem [[Responsive Layout]] |
| **Percentage** | `%` | Tuỳ property, xem cạm bẫy |

> [!note] `dvh` là lời giải cho `100vh` trên mobile
> `100vh` tính theo viewport **khi thanh địa chỉ ẩn** → trang bị tràn khi thanh hiện. `100dvh` cập nhật động; `100svh` luôn dùng viewport nhỏ nhất (an toàn nhất).

### Các nhóm data type khác

| Nhóm | Ví dụ |
|---|---|
| Angle | `deg` `rad` `grad` `turn` |
| Time | `s` `ms` |
| Resolution | `dpi` `dpcm` `dppx` `x` |
| Frequency | `Hz` `kHz` |
| Flex | `fr` (chỉ trong grid) |
| Color | `<color>` — xem [[CSS Color & Theming]] |
| Image | `<image>` — url, gradient, `image-set()` |

### Functional notation

| Hàm | Dùng để |
|---|---|
| `calc()` | Trộn đơn vị: `calc(100% - 2rem)` |
| `min()` `max()` | Lấy giá trị nhỏ/lớn nhất |
| `clamp(min, ideal, max)` | Kẹp giá trị trong khoảng — fluid sizing |
| `var(--x, fallback)` | Custom property |
| `attr()` | Lấy giá trị attribute |
| `round()` `mod()` `rem()` | Làm tròn, chia dư |
| `abs()` `sign()` | Trị tuyệt đối, dấu |
| `sin()` `cos()` `tan()` `asin()` `acos()` `atan()` `atan2()` | Lượng giác |
| `pow()` `sqrt()` `hypot()` `log()` `exp()` | Luỹ thừa, căn, log |
| `anchor()` `anchor-size()` | Anchor positioning |

**`clamp()` là công cụ fluid typography chuẩn:**

```css
h1 { font-size: clamp(1.75rem, 1rem + 3vw, 3.5rem); }
```

Không cần một media query nào.

### Value definition syntax

Cú pháp hình thức mà spec dùng để mô tả giá trị hợp lệ. Biết đọc nó = đọc được spec trực tiếp:

| Ký hiệu | Nghĩa |
|---|---|
| `A \| B` | Chọn một |
| `A \|\| B` | Một hoặc nhiều, thứ tự bất kỳ |
| `A && B` | Cả hai, thứ tự bất kỳ |
| `[ ]` | Nhóm |
| `?` | 0 hoặc 1 |
| `*` | 0 trở lên |
| `+` | 1 trở lên |
| `{n,m}` | Từ n đến m lần |
| `#` | Danh sách ngăn bởi dấu phẩy |

## 2. Nguyên tắc

1. **`rem` cho `font-size`, luôn luôn.** `px` cho font khoá cứng cỡ chữ, phá vỡ cài đặt phóng to của người dùng — một lỗi trợ năng thật.
2. **`px` vẫn đúng cho border, shadow, và thứ không nên co giãn.** Đừng giáo điều.
3. **`em` cho khoảng cách gắn liền với text.** `padding: 0.5em 1em` trên button tự co theo cỡ chữ của button.
4. **`ch` cho chiều rộng đoạn văn.** `max-width: 65ch` là cách chuẩn để giữ độ dài dòng dễ đọc.
5. **`clamp()` thay media query cho mọi thứ mang tính thang đo** — font-size, gap, padding.
6. **`dvh`/`svh` thay `vh`** trên mọi layout toàn màn hình.
7. **`calc()` cần khoảng trắng quanh `+` và `-`.** `calc(100%-2rem)` **không hợp lệ**; `calc(100% - 2rem)` mới đúng. (`*` và `/` thì không cần.)
8. **`fr` chỉ tồn tại trong grid** và phân phối **không gian còn dư**, không phải tổng không gian.

## 3. Cạm bẫy

- **Percentage neo vào những thứ khác nhau.** `width: 50%` theo chiều rộng containing block; **`padding-top: 50%` và `margin-top: 50%` cũng theo chiều rộng**, không phải chiều cao. `height: 50%` theo chiều cao — và **không ăn** nếu cha có `height: auto`.
- **`calc()` không có khoảng trắng.** Lỗi im lặng, rất khó thấy.
- **`vw` không trừ thanh cuộn.** `width: 100vw` gây tràn ngang trên desktop có scrollbar. Dùng `100%`.
- **`em` nhân dồn.** Xem [[CSS Inheritance & Value Processing]].
- **Đặt `html { font-size: 62.5% }` để "1rem = 10px".** Thủ thuật cũ; nó ghi đè cài đặt font của người dùng và làm mọi `rem` sai lệch khi họ đổi cỡ chữ mặc định.
- **`min()`/`max()` đọc ngược trực giác.** `width: min(100%, 40rem)` là "tối đa 40rem" — dùng `min()` để đặt trần. Rất dễ nhầm.
- **`0` không cần đơn vị nhưng `0s` thì cần** trong `transition` shorthand ở một số ngữ cảnh.
- **Đơn vị vật lý (`cm`, `in`, `pt`) vô nghĩa trên màn hình** — chúng được quy đổi cứng theo `96px = 1in`. Chỉ dùng cho `@page`.

## 4. Checklist áp dụng

- [ ] `font-size` có dùng `rem` không?
- [ ] Layout toàn màn hình có dùng `dvh`/`svh` thay `vh` không?
- [ ] Mọi `calc()` có khoảng trắng quanh `+`/`-` chưa?
- [ ] Đoạn văn có `max-width` theo `ch` không?
- [ ] Có media query nào thay được bằng `clamp()` không?
- [ ] Percentage này neo vào trục nào — tôi có chắc không?
- [ ] Có `100vw` nào gây tràn ngang không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Utopia | Sinh thang `clamp()` fluid | https://utopia.fyi/ |
| DevTools → Computed | Xem giá trị đã giải quyết thành px | https://developer.chrome.com/docs/devtools/css |
| MDN CSS values playground | Thử nhanh functional notation | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions |

## Tham khảo

- MDN — *CSS values and units*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units
- MDN — *Value definition syntax*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax
- MDN — *CSS functional notations*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions
- CSSWG — *CSS Values and Units Level 4*: https://drafts.csswg.org/css-values-4/

## Liên kết

[[CSS Custom Properties]] · [[CSS Inheritance & Value Processing]] · [[Responsive Layout]] · [[CSS Typography]] · [[Frontend]]
