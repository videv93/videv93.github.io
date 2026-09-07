---
tags: [frontend, css, layout]
status: evergreen
---
# CSS Box Alignment

> Một module duy nhất định nghĩa `justify-*` và `align-*` cho **mọi** layout mode — block, flex, grid, table. Học một lần, dùng ở mọi nơi; nhưng chú ý rằng cùng một property có nghĩa hơi khác giữa flex và grid.

## 1. Khái niệm cốt lõi

### Bốn cặp property

| Property | Căn cái gì | Theo trục |
|---|---|---|
| `justify-content` | **Cả nhóm** trong container | Inline (flex: main) |
| `align-content` | **Cả nhóm** trong container | Block (flex: cross) |
| `justify-items` | **Từng item** trong ô của nó | Inline |
| `align-items` | **Từng item** trong ô của nó | Block |
| `justify-self` | Ghi đè cho **một** item | Inline |
| `align-self` | Ghi đè cho **một** item | Block |

Shorthand: `place-content`, `place-items`, `place-self` — nhận `<align> <justify>` (block trước, inline sau).

### Ghi nhớ trục

| | `justify-*` | `align-*` |
|---|---|---|
| **Grid** | Luôn trục **inline** (ngang trong ltr) | Luôn trục **block** (dọc) |
| **Flex** | Trục **main** (đổi theo `flex-direction`) | Trục **cross** |
| **Block** | `justify-content` không áp dụng | `align-content` áp dụng |

> [!warning] Flexbox là ngoại lệ, không phải quy tắc
> Trong grid, `justify` luôn là ngang. Trong flex với `flex-direction: column`, `justify-content` trở thành **dọc**. Nếu bạn thấy mình phải suy nghĩ, hãy nhớ: **grid ổn định, flex xoay theo direction.**

### Giá trị

| Nhóm | Giá trị | Áp dụng cho |
|---|---|---|
| **Positional** | `start` `end` `center` `flex-start` `flex-end` `self-start` `self-end` `left` `right` | items và content |
| **Baseline** | `baseline` `first baseline` `last baseline` | items |
| **Distribution** | `space-between` `space-around` `space-evenly` `stretch` | **chỉ** content |
| **Mặc định** | `normal` `auto` | |
| **Overflow** | `safe center` `unsafe center` | modifier |

Bảng phân bố:

| Giá trị | 3 item, khoảng cách |
|---|---|
| `space-between` | `A---B---C` — không đệm hai đầu |
| `space-around` | `-A--B--C-` — đệm hai đầu bằng **nửa** |
| `space-evenly` | `-A-B-C-` — mọi khoảng bằng nhau |

### `safe` — chống mất nội dung

`align-items: safe center` — khi nội dung lớn hơn container, nó rơi về `start` thay vì bị cắt cả hai đầu. Với `center` thường, phần tràn bị cắt ở **cả hai phía** và bạn không cuộn tới được.

## 2. Nguyên tắc

1. **`place-items: center` là cách căn giữa ngắn nhất.** Hai từ trên một grid container căn giữa cả hai trục.
2. **`gap` là một phần của box alignment.** Nó thay margin trong flex, grid và multicol.
3. **Dùng `start`/`end` thay `flex-start`/`flex-end`.** Giá trị logic, hoạt động ở mọi layout mode và mọi hướng viết.
4. **`align-content` chỉ có nghĩa khi có nhiều dòng.** Trong flex đó là khi `flex-wrap: wrap`; trong grid là khi có nhiều hàng và container cao hơn tổng track.
5. **`safe center` cho nội dung không đoán trước được** — nav bar, toolbar, danh sách động.
6. **`baseline` để căn text qua các item cao thấp khác nhau** — hữu ích cho hàng label + input + button.

## 3. Cạm bẫy

- **`justify-items` không tồn tại trong flexbox.** Flex chỉ có `justify-content`. Viết `justify-items` trên flex container không có tác dụng gì và không báo lỗi.
- **`align-content` vô tác dụng khi `nowrap`.** Xem [[CSS Flexbox]].
- **`center` cắt nội dung tràn ở cả hai đầu.** Dùng `safe center`.
- **`stretch` chỉ hoạt động khi item có kích thước `auto`** trên trục đó. Đặt `height: 100px` là mất stretch.
- **`place-items: center start` đọc ngược trực giác** — giá trị đầu là `align` (block/dọc), giá trị sau là `justify` (inline/ngang).
- **`space-between` với một item** dồn về đầu.
- **`baseline` với item có `overflow` không phải `visible`** dùng mép dưới thay vì baseline thật.
- **`margin: auto` trong flex/grid nuốt hết không gian dư** trước khi `justify-content` được xét — nên `justify-content: center` "không hoạt động" khi item có `margin: auto`.

## 4. Checklist áp dụng

- [ ] Tôi đang căn **cả nhóm** (`content`) hay **từng item** (`items`)?
- [ ] Đây là grid hay flex — trục có xoay không?
- [ ] Nội dung có thể tràn không? Cần `safe` chưa?
- [ ] Dùng `start`/`end` thay `flex-start`/`flex-end` chưa?
- [ ] `align-content` này có nhiều dòng để căn không?
- [ ] Có `margin: auto` nào đang nuốt không gian không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools alignment editor | Chọn giá trị bằng icon trực quan | https://developer.chrome.com/docs/devtools/css |
| MDN Box Alignment cheatsheet | Bảng giá trị theo layout mode | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment |

## Tham khảo

- MDN — *CSS box alignment*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment
- MDN — *Box alignment in flexbox*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/Box_alignment_in_flexbox
- MDN — *CSS gaps module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Gaps
- CSSWG — *CSS Box Alignment Level 3*: https://drafts.csswg.org/css-align/

## Liên kết

[[CSS Flexbox]] · [[CSS Grid]] · [[Tailwind Flexbox & Grid]] · [[CSS Box Model]] · [[Frontend]]
