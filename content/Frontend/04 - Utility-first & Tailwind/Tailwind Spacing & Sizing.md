---
tags: [frontend, tailwind]
status: evergreen
---
# Tailwind Spacing & Sizing

> Thang spacing là **thứ giá trị nhất** Tailwind cung cấp — không phải vì nó tiết kiệm gõ phím, mà vì nó khiến "chọn khoảng cách" thành việc chọn trong 12 lựa chọn thay vì vô hạn.

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Thang spacing

Đơn vị nền: `1` = `0.25rem` = 4px.

| Class | rem | px |
|---|---|---|
| `0` | 0 | 0 |
| `px` | — | 1px |
| `0.5` | 0.125 | 2 |
| `1` | 0.25 | 4 |
| `2` | 0.5 | 8 |
| `3` | 0.75 | 12 |
| `4` | 1 | 16 |
| `6` | 1.5 | 24 |
| `8` | 2 | 32 |
| `12` | 3 | 48 |
| `16` | 4 | 64 |
| `24` | 6 | 96 |

### Padding

`p-*` (mọi phía) · `px-*` `py-*` (trục) · `pt-*` `pr-*` `pb-*` `pl-*` (vật lý) · `ps-*` `pe-*` (**logic**: start/end theo hướng viết)

### Margin

`m-*` · `mx-*` `my-*` · `mt-*` `mr-*` `mb-*` `ml-*` · `ms-*` `me-*`
Margin âm: tiền tố `-` → `-mt-4`, `-mx-2`.

### Space between

`space-x-*` · `space-y-*` · `space-x-reverse` · `space-y-reverse`

> [!warning] `space-*` là di sản — dùng `gap-*`
> `space-y-4` được cài đặt bằng `& > * + * { margin-top: 1rem }`. Ba hệ quả xấu: nó **gãy khi `flex-wrap`** (dòng thứ hai không có margin đúng), nó **đụng độ** với margin của chính con, và nó tạo selector con làm phồng CSS. `gap-4` không có vấn đề nào trong ba cái đó và hoạt động ở cả flex lẫn grid. Chỉ giữ `space-*` khi container **không phải** flex/grid.

### Width

`w-*` (theo thang) · `w-1/2` `w-1/3` `w-2/3` … (phân số) · `w-full` · `w-screen` · `w-svw` `w-lvw` `w-dvw` · `w-min` `w-max` `w-fit` · `w-auto` · `w-px` · `w-[...]`

### Height

`h-*` · `h-full` · `h-screen` · `h-svh` `h-lvh` `h-dvh` · `h-min` `h-max` `h-fit` · `h-auto`

**Dùng `h-dvh` thay `h-screen` trên mobile** — `h-screen` là `100vh` và bị lỗi thanh địa chỉ. Xem [[CSS Values & Units]].

### Min / Max / Size

| Nhóm | Utility |
|---|---|
| Min width | `min-w-0` · `min-w-full` · `min-w-min` · `min-w-max` · `min-w-fit` · `min-w-*` |
| Max width | `max-w-*` · `max-w-none` · `max-w-full` · `max-w-min` · `max-w-max` · `max-w-fit` · `max-w-prose` · `max-w-screen-sm`…`-2xl` · `max-w-xs`…`-7xl` |
| Min height | `min-h-0` · `min-h-full` · `min-h-screen` · `min-h-dvh` · `min-h-fit` |
| Max height | `max-h-*` · `max-h-full` · `max-h-screen` · `max-h-dvh` |
| Size (cả hai) | `size-*` · `size-full` · `size-min` · `size-max` · `size-fit` |

`size-*` đặt `width` và `height` cùng lúc — rất tiện cho icon: `size-4` thay `w-4 h-4`.

`max-w-prose` ≈ `65ch` — độ dài dòng dễ đọc, xem [[CSS Typography]].

## 2. Nguyên tắc

1. **`gap-*` thay `space-*`** ở mọi flex/grid container. Xem callout.
2. **Bám thang.** `p-4` không `p-[17px]`. Thang là lý do giao diện trông nhất quán mà không cần ai kiểm tra.
3. **Padding cho khoảng cách trong, gap cho khoảng cách giữa, margin chỉ khi buộc phải.** Trong hệ utility, margin trên component con là thứ khiến component không tái sử dụng được — component không nên tự quyết định khoảng cách với hàng xóm.
4. **`ps-*`/`pe-*`/`ms-*`/`me-*` cho dự án đa ngôn ngữ.**
5. **`size-*` cho mọi thứ vuông** — icon, avatar, nút tròn.
6. **`max-w-*` thay `w-*` cho container nội dung.**
7. **`min-w-0` là utility cứu mạng** trong flex — xem [[Tailwind Flexbox & Grid]].
8. **`h-dvh` / `min-h-dvh` thay `h-screen`** cho layout full-height.

## 3. Cạm bẫy

- **`space-y-*` gãy khi wrap.** Callout mục 1.
- **`w-screen` gây tràn ngang** vì `100vw` không trừ scrollbar. Dùng `w-full`.
- **`h-screen` trên mobile.** Dùng `h-dvh`.
- **Margin trên component tái sử dụng.** `<Card className="mb-4">` khoá component vào một ngữ cảnh; để cha quyết định bằng `gap`.
- **Margin âm để "sửa" khoảng cách** thường là dấu hiệu spacing sai ở tầng trên.
- **`p-4` trên element có `w-full`** với `box-content` gây tràn — Preflight đã đặt `border-box` nên hiếm, trừ khi bạn viết `box-content`.
- **`max-w-screen-lg` không phải `max-w-lg`.** `max-w-lg` là `32rem`; `max-w-screen-lg` là `1024px`. Hai thang hoàn toàn khác nhau, tên rất giống.
- **Trộn `gap` với margin trên con** làm khoảng cách cộng dồn khó lần.
- **`min-h-screen` trên `<body>` mà không có `h-full` trên `<html>`** đôi khi không đủ cho layout sticky footer.

## 4. Checklist áp dụng

- [ ] Đã dùng `gap-*` thay `space-*` chưa?
- [ ] Có giá trị arbitrary nào nên vào thang không?
- [ ] Component có tự đặt margin ngoài không (nên để cha lo)?
- [ ] Layout full-height dùng `dvh` chưa?
- [ ] Có `w-screen` nào gây tràn ngang không?
- [ ] Flex item có cần `min-w-0` không?
- [ ] Container nội dung có `max-w-prose` hoặc tương đương chưa?
- [ ] Tôi đang dùng `max-w-lg` hay `max-w-screen-lg` — đúng cái mình cần không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Tailwind IntelliSense | Hiện giá trị px khi hover | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss |
| DevTools box model | Đối chiếu spacing thật | https://developer.chrome.com/docs/devtools/css/reference |

## Tham khảo

- Tailwind — *Padding*: https://tailwindcss.com/docs/padding
- Tailwind — *Width*: https://tailwindcss.com/docs/width
- Tailwind — *Gap*: https://tailwindcss.com/docs/gap
- MDN — *CSS box sizing module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing

## Liên kết

[[CSS Box Model]] · [[Tailwind Flexbox & Grid]] · [[Spacing & Grid]] · [[Tailwind Theme & Configuration]] · [[Frontend]]
