---
tags: [frontend, css, layout]
status: evergreen
---
# CSS Grid

> Layout **hai chiều**: bạn định nghĩa một lưới trước, rồi đặt item vào. Grid xuất sắc ở việc chia trang thành vùng lớn, và ở việc mô tả quan hệ kích thước/vị trí/lớp giữa các phần của một control.

## 1. Khái niệm cốt lõi

### Từ vựng

| Thuật ngữ | Nghĩa |
|---|---|
| **Track** | Một hàng hoặc một cột |
| **Line** | Đường ranh giới giữa track; đánh số từ 1, âm đếm ngược từ cuối |
| **Cell** | Giao của một hàng và một cột |
| **Area** | Vùng chữ nhật gồm nhiều cell |
| **Gutter** | Khoảng cách giữa track (`gap`) |

### Property trên container

| Property | Nghĩa |
|---|---|
| `grid-template-columns` / `-rows` | Định nghĩa track |
| `grid-template-areas` | Đặt tên vùng bằng ASCII art |
| `grid-auto-columns` / `-rows` | Kích thước track **ngầm** (sinh tự động) |
| `grid-auto-flow` | `row` `column` `dense` — cách item tự đặt |
| `gap` `row-gap` `column-gap` | Khoảng cách |
| `justify-items` / `align-items` / `place-items` | Căn item **trong cell** |
| `justify-content` / `align-content` / `place-content` | Căn **cả lưới** trong container |

### Property trên item

`grid-column` / `grid-row` (shorthand của `-start` / `-end`), `grid-area`, `justify-self` / `align-self` / `place-self`.

```css
.item { grid-column: 1 / 3; }        /* từ line 1 đến line 3 */
.item { grid-column: span 2; }        /* chiếm 2 track từ vị trí tự động */
.item { grid-column: 1 / -1; }        /* full width, bất kể bao nhiêu cột */
```

### Hàm sizing

| Hàm / từ khoá | Nghĩa |
|---|---|
| `fr` | Phần **không gian còn dư** |
| `repeat(3, 1fr)` | Lặp |
| `repeat(auto-fill, ...)` | Nhồi tối đa track, giữ track rỗng |
| `repeat(auto-fit, ...)` | Như trên nhưng **xẹp** track rỗng |
| `minmax(min, max)` | Khoảng kích thước |
| `min-content` / `max-content` / `fit-content()` | Theo nội dung |

**Grid responsive không cần media query** — công thức đáng thuộc:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 1rem;
}
```

`min(16rem, 100%)` là phần chống tràn trên màn hình hẹp hơn 16rem.

### `grid-template-areas`

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
}
.header { grid-area: header; }
```

Đọc được layout ngay trong CSS. Dấu `.` biểu thị cell trống.

### Subgrid

`grid-template-columns: subgrid` cho phép grid con **dùng lại track của cha** — giải quyết bài toán căn thẳng hàng nội dung giữa các card có chiều cao khác nhau, thứ mà trước đây phải làm bằng JS.

## 2. Nguyên tắc

1. **Grid cho hai chiều, flex cho một chiều.** Khi phải căn thẳng hàng *qua* các item ở cả hai trục → grid.
2. **`grid-template-areas` cho layout trang.** Nó tự tài liệu hoá.
3. **`auto-fit` + `minmax` thay media query** cho lưới card.
4. **`1fr` không phải `100%`/n.** `fr` chia **phần dư** sau khi trừ gap và track cố định.
5. **`minmax(0, 1fr)` khi item có thể tràn.** Track `1fr` có `min-width: auto` ngầm — cùng cạm bẫy với flexbox.
6. **Line âm để bám mép cuối.** `grid-column: 1 / -1` đúng dù lưới có bao nhiêu cột.
7. **Đặt tên line khi lưới phức tạp:** `[content-start] 1fr [content-end]`.
8. **`place-items: center` là cách căn giữa ngắn nhất trong CSS** — hai từ, cả hai trục.

## 3. Cạm bẫy

- **`1fr` không co nhỏ hơn nội dung.** Track `1fr` là `minmax(auto, 1fr)`; một từ dài hoặc `<pre>` sẽ đẩy tràn. Sửa: `minmax(0, 1fr)`. Đây là song sinh của `min-width: 0` trong [[CSS Flexbox]].
- **`auto-fill` vs `auto-fit`.** `auto-fill` giữ track rỗng (item không giãn ra); `auto-fit` xẹp chúng (item giãn full). Nhìn giống nhau khi đủ item, khác hẳn khi ít item.
- **`grid-template-areas` phải là hình chữ nhật đúng.** Mọi dòng cùng số cột, mọi area liền khối — nếu không cả declaration bị bỏ.
- **`gap` được tính trước `fr`.** `grid-template-columns: repeat(3, 33.33%)` + `gap` = tràn; dùng `1fr`.
- **`grid-auto-flow: dense` đảo thứ tự thị giác** — cùng vấn đề trợ năng với `order`.
- **Implicit track có kích thước `auto`** — item rơi ra ngoài lưới đã định nghĩa vẫn hiển thị nhưng kích thước khác hẳn. Kiểm bằng DevTools grid overlay.
- **`position: absolute` trên grid item** rời khỏi lưới trừ khi containing block là grid area đó.
- **Nhầm `justify-*` với `align-*`.** Trong grid (khác flex): `justify` **luôn** là trục inline (ngang), `align` **luôn** là trục block (dọc). Grid ổn định hơn flex ở điểm này.
- **Subgrid chỉ kế thừa track, không kế thừa `gap`** trừ khi đặt `gap: inherit`.

## 4. Checklist áp dụng

- [ ] Layout này hai chiều — grid có đúng là lựa chọn không?
- [ ] Track `1fr` có nguy cơ tràn — đã dùng `minmax(0, 1fr)` chưa?
- [ ] Tôi muốn `auto-fill` hay `auto-fit`?
- [ ] Có media query nào thay được bằng `auto-fit` + `minmax` không?
- [ ] Layout trang đã dùng `grid-template-areas` cho dễ đọc chưa?
- [ ] Có item nào rơi vào implicit track ngoài ý muốn không?
- [ ] Có chỗ nào subgrid xoá được JS căn hàng không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools grid overlay | Vẽ line, số line, area, gap | https://developer.chrome.com/docs/devtools/css/grid |
| Grid Garden | Trò chơi luyện cú pháp | https://cssgridgarden.com/ |
| Rachel Andrew — Grid by Example | Bộ pattern đầy đủ | https://gridbyexample.com/ |

## Tham khảo

- MDN — *CSS grid layout*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout
- MDN — *Subgrid*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid
- CSSWG — *CSS Grid Layout Level 2*: https://drafts.csswg.org/css-grid-2/
- web.dev — *Learn CSS: Grid*: https://web.dev/learn/css/grid

## Liên kết

[[CSS Flexbox]] · [[CSS Box Alignment]] · [[Responsive Layout]] · [[Tailwind Flexbox & Grid]] · [[Spacing & Grid]] · [[Frontend]]
