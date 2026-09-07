---
tags: [frontend, css, layout]
status: evergreen
---
# CSS Box Model

> Mọi element là một hộp. Bốn lớp của hộp đó, cộng với việc `width` đo lớp nào, giải thích phần lớn những lần "tại sao nó rộng hơn tôi bảo".

## 1. Khái niệm cốt lõi

### Bốn lớp

```
┌─ margin ────────────────────────┐   trong suốt, có thể âm, có thể collapse
│ ┌─ border ────────────────────┐ │
│ │ ┌─ padding ───────────────┐ │ │   nhận background của element
│ │ │ ┌─ content ───────────┐ │ │ │
│ │ │ │   width × height    │ │ │ │
│ │ │ └─────────────────────┘ │ │ │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### `box-sizing` — quyết định `width` đo cái gì

| Giá trị | `width` đo | `width:200px; padding:20px; border:2px` |
|---|---|---|
| `content-box` (mặc định spec) | Chỉ content | Chiếm **244px** |
| `border-box` | Content + padding + border | Chiếm **200px** |

Gần như mọi dự án đều mở đầu bằng:

```css
*, *::before, *::after { box-sizing: border-box; }
```

Tailwind áp `border-box` sẵn trong preflight (`box-border`); `box-content` là utility để quay lại.

### Logical properties

Thay vì `top/right/bottom/left`, CSS hiện đại dùng trục **logic** theo hướng viết:

| Vật lý | Logic |
|---|---|
| `width` / `height` | `inline-size` / `block-size` |
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |

Shorthand hai chiều rất tiện: `margin-inline: auto`, `padding-block: 1rem`.

Với RTL hoặc `writing-mode: vertical-rl`, code dùng logical property tự đúng — code dùng `left`/`right` thì không. Đây là lý do Tailwind có `ms-*`/`me-*`/`ps-*`/`pe-*` bên cạnh `ml-*`/`mr-*`.

### Sizing keywords

| Từ khoá | Nghĩa |
|---|---|
| `auto` | Trình duyệt quyết định theo layout mode |
| `min-content` | Hẹp nhất mà nội dung không tràn (bằng từ dài nhất) |
| `max-content` | Rộng như nội dung muốn, không xuống dòng |
| `fit-content(n)` | `min(max-content, max(min-content, n))` |
| `stretch` | Lấp đầy containing block |

## 2. Nguyên tắc

1. **`border-box` cho mọi thứ.** Không có lý do chính đáng nào để giữ `content-box` làm mặc định.
2. **Ưu tiên logical property.** Không tốn gì thêm, và trang tự hoạt động khi đổi hướng viết.
3. **`max-width` thay `width` cho container.** `max-width: 65ch` co được; `width: 800px` thì không.
4. **Margin để tách các element khỏi nhau; padding để đẩy nội dung khỏi viền.** Trộn lẫn hai vai trò này là mầm mống của layout khó sửa.
5. **Ưu tiên `gap` hơn margin cho khoảng cách giữa các item** — flex và grid đều hỗ trợ, và không có margin collapsing.
6. **Margin âm là hợp lệ và hữu ích** (bleed ra ngoài container), nhưng chỉ dùng có chủ đích.

## 3. Cạm bẫy — margin collapsing

Đây là hành vi gây bất ngờ nhất trong box model. **Margin theo trục block (dọc) của các element kề nhau gộp lại thành một**, lấy giá trị lớn nhất — không cộng.

Ba tình huống:

| Tình huống | Ví dụ |
|---|---|
| **Anh em kề nhau** | `<p>` có `margin-bottom: 20px`, `<p>` sau có `margin-top: 30px` → khoảng cách là **30px**, không phải 50px |
| **Cha và con đầu/cuối** | Con có `margin-top: 20px` "thoát" ra ngoài cha, đẩy **cả cha** xuống |
| **Hộp rỗng** | Element không có content/padding/border thì `margin-top` và `margin-bottom` của chính nó gộp lại |

**Cái gì chặn collapse:**
- Cha có `padding` hoặc `border` theo trục đó
- Cha tạo **BFC** — xem [[Block Formatting Context]]
- Element là flex item, grid item, absolutely positioned, hoặc float
- `display: flow-root` trên cha (cách sạch nhất)

Margin **ngang không bao giờ collapse.**

### Cạm bẫy khác

- **`width: 100%` + `padding` + `content-box` = tràn.** Kinh điển; `border-box` xoá bỏ cả lớp lỗi này.
- **Percentage padding tính theo chiều rộng**, kể cả `padding-top`. Xem [[CSS Inheritance & Value Processing]].
- **`height: 100%` không ăn khi cha `auto`.** Cần chuỗi chiều cao xác định từ `html` xuống, hoặc dùng flex/grid.
- **`min-width: auto` mặc định của flex item** khiến item không co nhỏ hơn nội dung — nguồn gốc của overflow trong flex. Sửa: `min-width: 0`. Xem [[CSS Flexbox]].
- **Border ăn vào không gian ngay cả khi trong suốt.** Dùng `outline` (không chiếm layout) khi chỉ cần chỉ báo thị giác.
- **`box-shadow` không chiếm layout**, `border` thì có — nên đổi giữa hai cái làm nhảy layout.
- **`margin: auto` chỉ căn giữa theo trục ngang** với element block có chiều rộng xác định. Theo trục dọc nó là `0` trong block layout (nhưng **hoạt động** trong flex/grid).

## 4. Checklist áp dụng

- [ ] `box-sizing: border-box` đã đặt toàn cục chưa?
- [ ] Khoảng cách bất ngờ này có phải margin collapsing không?
- [ ] Dùng `gap` được thay cho margin không?
- [ ] Đã dùng logical property chưa?
- [ ] Container dùng `max-width` hay `width` cứng?
- [ ] Flex item bị tràn — đã thử `min-width: 0` chưa?
- [ ] Percentage padding này neo vào chiều rộng — có đúng ý không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools box model diagram | Hiện 4 lớp bằng số thật | https://developer.chrome.com/docs/devtools/css/reference |
| `outline: 1px solid red` toàn cục | Debug layout không làm xê dịch | — |
| CSS Logical Properties polyfill | Cho trình duyệt cũ | https://caniuse.com/css-logical-props |

## Tham khảo

- MDN — *CSS box model module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model
- MDN — *Mastering margin collapsing*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing
- MDN — *CSS box sizing module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing
- MDN — *CSS logical properties and values*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values
- CSSWG — *CSS Box Model Level 3*: https://drafts.csswg.org/css-box-3/

## Liên kết

[[Block Formatting Context]] · [[CSS Flexbox]] · [[CSS Grid]] · [[Tailwind Spacing & Sizing]] · [[Containing Block & Positioned Layout]] · [[Frontend]]
