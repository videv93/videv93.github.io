---
tags: [frontend, tailwind, layout]
status: evergreen
---
# Tailwind Flexbox & Grid

> Bảng tra utility flex/grid/gap/alignment. Cơ chế và cạm bẫy CSS đứng sau nằm ở [[CSS Flexbox]], [[CSS Grid]], [[CSS Box Alignment]].

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Flex container

| Nhóm | Utility |
|---|---|
| Direction | `flex-row` · `flex-row-reverse` · `flex-col` · `flex-col-reverse` |
| Wrap | `flex-wrap` · `flex-wrap-reverse` · `flex-nowrap` |

### Flex item

| Nhóm | Utility | CSS |
|---|---|---|
| Flex | `flex-1` | `flex: 1 1 0%` — chia đều, bỏ qua nội dung |
| | `flex-auto` | `flex: 1 1 auto` — grow theo nội dung |
| | `flex-initial` | `flex: 0 1 auto` — mặc định |
| | `flex-none` | `flex: 0 0 auto` — cứng |
| Grow | `grow` · `grow-0` | |
| Shrink | `shrink` · `shrink-0` | |
| Basis | `basis-*` · `basis-full` · `basis-1/2` · `basis-[20rem]` | |
| Order | `order-1` … `order-12` · `order-first` · `order-last` · `order-none` | |

### Grid container

| Nhóm | Utility |
|---|---|
| Template columns | `grid-cols-1` … `grid-cols-12` · `grid-cols-none` · `grid-cols-subgrid` · `grid-cols-[...]` |
| Template rows | `grid-rows-1` … `grid-rows-12` · `grid-rows-none` · `grid-rows-subgrid` · `grid-rows-[...]` |
| Auto flow | `grid-flow-row` · `grid-flow-col` · `grid-flow-dense` · `grid-flow-row-dense` · `grid-flow-col-dense` |
| Auto columns | `auto-cols-auto` · `auto-cols-min` · `auto-cols-max` · `auto-cols-fr` |
| Auto rows | `auto-rows-auto` · `auto-rows-min` · `auto-rows-max` · `auto-rows-fr` |

### Grid item

| Nhóm | Utility |
|---|---|
| Column | `col-auto` · `col-span-1` … `col-span-12` · `col-span-full` · `col-start-*` · `col-start-auto` · `col-end-*` · `col-end-auto` |
| Row | `row-auto` · `row-span-*` · `row-span-full` · `row-start-*` · `row-end-*` |

### Gap

`gap-0` · `gap-px` · `gap-*` · `gap-x-*` · `gap-y-*` (cũng dùng cho flex và multicol)

### Alignment — bảng đối chiếu đầy đủ

| CSS property | Prefix | Giá trị |
|---|---|---|
| `justify-content` | `justify-` | `normal` `start` `end` `center` `between` `around` `evenly` `stretch` |
| `justify-items` | `justify-items-` | `start` `end` `center` `stretch` |
| `justify-self` | `justify-self-` | `auto` `start` `end` `center` `stretch` |
| `align-content` | `content-` | `normal` `center` `start` `end` `between` `around` `evenly` `baseline` `stretch` |
| `align-items` | `items-` | `start` `end` `center` `baseline` `stretch` |
| `align-self` | `self-` | `auto` `start` `end` `center` `stretch` `baseline` |
| `place-content` | `place-content-` | `center` `start` `end` `between` `around` `evenly` `baseline` `stretch` |
| `place-items` | `place-items-` | `start` `end` `center` `baseline` `stretch` |
| `place-self` | `place-self-` | `auto` `start` `end` `center` `stretch` |

> [!note] Bảng này đáng ghi nhớ vì tiền tố không đều
> `align-content` → `content-*`, `align-items` → `items-*`, `justify-content` → `justify-*`. Prefix **không** khớp một-một với tên property CSS, và đây là nguồn nhầm lẫn thường trực: `content-center` là `align-content`, không phải `align-items`.

## 2. Công thức hay dùng

| Mục đích | Class |
|---|---|
| Căn giữa hoàn toàn | `grid place-items-center` |
| Thanh nav có nhóm trái/phải | `flex items-center justify-between` |
| Đẩy một item sang phải | `ml-auto` trên item đó |
| Hàng icon + text | `flex items-center gap-2` |
| Lưới card responsive không cần breakpoint | `grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]` |
| Sidebar + main | `grid grid-cols-[16rem_1fr]` |
| Item chứa text dài trong flex | `flex-1 min-w-0` |
| Track grid có thể tràn | `grid-cols-[minmax(0,1fr)_auto]` |
| Xếp chồng (stack) | `grid [&>*]:col-start-1 [&>*]:row-start-1` |

## 3. Cạm bẫy

- **`flex-1` tràn vì `min-width: auto`.** Utility cứu: `min-w-0`. Đây là cạm bẫy Tailwind hay gặp nhất trong flex — xem [[CSS Flexbox]].
- **`grid-cols-3` tràn vì track `1fr` không co.** Dùng `grid-cols-[repeat(3,minmax(0,1fr))]`.
- **`content-*` là `align-content`, không phải `align-items`.** Callout ở mục 1.
- **`justify-*` với `flex-col` căn theo trục dọc.** Trục xoay theo direction — cạm bẫy CSS gốc, Tailwind không che đi.
- **`grid-cols-*` chỉ có tới 12.** Cần khác thì dùng arbitrary.
- **`order-*` phá thứ tự bàn phím.** Xem [[Accessible Markup & ARIA]].
- **`gap` không collapse như margin** — chuyển từ `space-y-*` sang `gap-*` làm khoảng cách tăng.
- **`space-x-*` dùng `margin` trên con và gãy với `flex-wrap`** — luôn ưu tiên `gap-*`.
- **`items-stretch` (mặc định) làm ảnh méo** trong flex row. Thêm `self-start` hoặc `object-cover`.

## 4. Checklist áp dụng

- [ ] Flex item chứa text dài đã có `min-w-0` chưa?
- [ ] Track grid có nguy cơ tràn — đã `minmax(0,1fr)` chưa?
- [ ] Tôi cần `content-*` (nhóm) hay `items-*` (từng item)?
- [ ] Dùng `gap-*` thay `space-*` chưa?
- [ ] Với `flex-col`, `justify-*` có đúng trục tôi nghĩ không?
- [ ] Layout này một chiều (flex) hay hai chiều (grid)?
- [ ] Có `order-*` nào phá thứ tự đọc không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools grid/flex overlay | Vẽ track và trục lên trang | https://developer.chrome.com/docs/devtools/css/grid |
| Tailwind Play | Thử layout không cần setup | https://play.tailwindcss.com/ |

## Tham khảo

- Tailwind — *Flex and grid utilities*: https://tailwindcss.com/docs/flex-basis
- Tailwind — *Gap*: https://tailwindcss.com/docs/gap
- MDN — *CSS box alignment*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment
- CSSWG — *CSS Grid Layout Level 2*: https://drafts.csswg.org/css-grid-2/

## Liên kết

[[CSS Flexbox]] · [[CSS Grid]] · [[CSS Box Alignment]] · [[Tailwind Spacing & Sizing]] · [[Tailwind Utility Model]] · [[Frontend]]
