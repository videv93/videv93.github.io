---
tags: [frontend, css, layout]
status: evergreen
---
# CSS Flexbox

> Layout **một chiều**: bạn xếp item dọc theo một trục và để chúng thương lượng không gian còn lại. Nếu bạn phải căn thẳng hàng theo *cả hai* chiều, đó là việc của [[CSS Grid]].

## 1. Khái niệm cốt lõi

### Hai trục

| Trục | Xác định bởi | Căn theo |
|---|---|---|
| **Main axis** | `flex-direction` | `justify-content` |
| **Cross axis** | Vuông góc với main | `align-items` / `align-content` |

Đây là điểm gây nhầm nhất: khi `flex-direction: column`, `justify-content` căn **dọc** còn `align-items` căn **ngang**. Hai property đổi vai cho nhau.

### Property trên container

| Property | Giá trị | Ghi chú |
|---|---|---|
| `display` | `flex` `inline-flex` | |
| `flex-direction` | `row` `row-reverse` `column` `column-reverse` | |
| `flex-wrap` | `nowrap` (mặc định) `wrap` `wrap-reverse` | |
| `flex-flow` | shorthand của hai cái trên | |
| `justify-content` | `flex-start` `flex-end` `center` `space-between` `space-around` `space-evenly` `stretch` `normal` | Main axis |
| `align-items` | `stretch` (mặc định) `flex-start` `flex-end` `center` `baseline` | Cross axis, **từng dòng** |
| `align-content` | như trên + `space-*` | Cross axis, **giữa các dòng** — chỉ có tác dụng khi `wrap` |
| `gap` `row-gap` `column-gap` | chiều dài | Thay margin |

### Property trên item

| Property | Mặc định | Nghĩa |
|---|---|---|
| `flex-grow` | `0` | Tỉ lệ chia **không gian dư** |
| `flex-shrink` | `1` | Tỉ lệ chịu **co lại** khi thiếu chỗ |
| `flex-basis` | `auto` | Kích thước khởi điểm trước khi grow/shrink |
| `flex` | `0 1 auto` | Shorthand ba cái trên |
| `align-self` | `auto` | Ghi đè `align-items` cho một item |
| `order` | `0` | Đổi thứ tự **thị giác** |

### Shorthand `flex` — học thuộc bốn cái này

| Viết | Nghĩa đầy đủ | Dùng khi |
|---|---|---|
| `flex: 1` | `1 1 0%` | Chia đều không gian, **bỏ qua kích thước nội dung** |
| `flex: auto` | `1 1 auto` | Grow được, nhưng tôn trọng kích thước nội dung |
| `flex: initial` | `0 1 auto` | Mặc định — co được, không giãn |
| `flex: none` | `0 0 auto` | Cứng, không co không giãn |

Khác biệt `flex: 1` vs `flex: auto` là thứ hay bị hiểu sai nhất: với `flex: 1`, ba item chiều rộng nội dung khác nhau vẫn ra **bằng nhau**; với `flex: auto`, chúng giữ tỉ lệ theo nội dung.

## 2. Nguyên tắc

1. **Flexbox cho một chiều, Grid cho hai chiều.** Toolbar, nav, hàng nút, cụm icon+text → flex. Trang, thẻ, dashboard → grid.
2. **`gap` thay margin.** Không còn `:last-child { margin-right: 0 }`.
3. **`flex-wrap: wrap` gần như luôn nên có** trên container chứa nội dung động — `nowrap` là mặc định và là nguồn gốc của tràn.
4. **`min-width: 0` trên item chứa text dài.** Xem cạm bẫy — đây là mẹo cứu mạng phổ biến nhất trong flexbox.
5. **`margin-left: auto` đẩy item sang phải** trong flex — cách sạch nhất để tách nhóm nút trong toolbar.
6. **Đừng dùng `order` để đảo thứ tự có nghĩa.** Nó chỉ đổi thị giác; thứ tự tab và screen reader vẫn theo DOM. Xem [[Accessible Markup & ARIA]].
7. **`align-items: stretch` là mặc định** — item cao bằng nhau miễn phí. Đây là lý do "equal height columns" không còn là bài toán.

## 3. Cạm bẫy

- **`min-width: auto` khiến flex item không co được.** Mặc định của flex item là `min-width: auto` = "không nhỏ hơn nội dung". Một `<p>` chứa URL dài sẽ **đẩy tràn cả container** thay vì xuống dòng. Sửa: `min-width: 0` (hoặc `overflow: hidden`) trên item. Với `flex-direction: column`, tương ứng là `min-height: 0`.
- **`align-content` không làm gì khi `nowrap`.** Chỉ một dòng thì không có gì để căn giữa các dòng.
- **`justify-content` và `align-items` đổi vai khi `column`.** Nguồn gốc của "tôi viết đúng mà nó căn sai chiều".
- **`space-between` với một item duy nhất** dồn nó về đầu — không có "giữa" để chia.
- **`flex-basis` thắng `width`** khi cả hai được đặt (trên main axis).
- **Percentage `flex-basis` cần container có kích thước xác định** trên trục đó.
- **`gap` không collapse như margin** — hành vi đúng, nhưng chuyển từ margin sang gap sẽ làm khoảng cách *tăng lên*.
- **Nested flex kế thừa nhầm trục.** Container con có `flex-direction` riêng; đừng giả định.
- **`order` phá thứ tự bàn phím.**
- **Ảnh trong flex item bị méo** vì `align-items: stretch` — thêm `align-self: flex-start` hoặc `object-fit`.

## 4. Checklist áp dụng

- [ ] Layout này thực sự một chiều, hay tôi đang ép grid thành flex?
- [ ] Item chứa text dài đã có `min-width: 0` chưa?
- [ ] Đã cân nhắc `flex-wrap: wrap` chưa?
- [ ] Dùng `gap` thay margin chưa?
- [ ] Với `column`, tôi có nhớ `justify-content` là trục dọc không?
- [ ] Tôi muốn `flex: 1` (chia đều) hay `flex: auto` (theo nội dung)?
- [ ] Có `order` nào phá thứ tự đọc không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools flexbox overlay | Vẽ trục, gap, alignment lên trang | https://developer.chrome.com/docs/devtools/css/flexbox |
| Flexbox Froggy | Trò chơi luyện cú pháp | https://flexboxfroggy.com/ |
| CSS-Tricks Flexbox Guide | Bảng tra một trang | https://css-tricks.com/snippets/css/a-guide-to-flexbox/ |

## Tham khảo

- MDN — *CSS flexible box layout*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout
- MDN — *Controlling ratios of flex items along the main axis*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis
- CSSWG — *CSS Flexible Box Layout Level 1*: https://drafts.csswg.org/css-flexbox-1/
- MDN — *CSS box alignment*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment

## Liên kết

[[CSS Grid]] · [[CSS Box Alignment]] · [[CSS Box Model]] · [[Tailwind Flexbox & Grid]] · [[Frontend]]
