---
tags: [frontend, tailwind]
status: evergreen
---
# Tailwind Utility Model

> Tailwind không phải "CSS viết trong HTML". Nó là một quyết định kiến trúc: **đánh đổi khả năng đọc của markup để lấy khả năng xoá của CSS.**

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Khái niệm cốt lõi

### Vấn đề nó giải

| Vấn đề của CSS truyền thống | Cách utility-first giải |
|---|---|
| Đặt tên class là việc khó và vô nghĩa | Không đặt tên gì cả |
| Không biết class còn dùng hay không | Class sống ngay trong markup dùng nó |
| CSS chỉ tăng, không giảm | Tập utility hữu hạn; xoá markup là xoá CSS |
| Sợ sửa CSS vì không biết ảnh hưởng ai | Sửa class chỉ ảnh hưởng đúng element đó |
| Chiến tranh specificity | Mọi utility cùng một mức specificity |

Chi phí đổi lại: markup dày đặc, và mất khả năng đọc CSS như một tài liệu riêng.

### Cấu tạo tên utility

```
      hover:  md:  dark:  bg-blue-500/50
      └─────┴────┴──────┘ └──┴────┴───┴──┘
         variant (mục 4)   │   │    │   └ opacity modifier
                           │   │    └ shade
                           │   └ màu
                           └ property
```

### Build pipeline

Tailwind **quét file nguồn** tìm chuỗi trông giống tên class, rồi chỉ sinh CSS cho những cái tìm thấy.

> [!warning] Hệ quả: class ghép chuỗi động không tồn tại
> ```jsx
> <div className={`text-${color}-500`}>     ❌ không bao giờ được sinh ra
> <div className={color === 'red' ? 'text-red-500' : 'text-blue-500'}>   ✅
> ```
> Tailwind không chạy JavaScript của bạn — nó chỉ tìm chuỗi. Mọi tên class phải xuất hiện **nguyên vẹn** trong mã nguồn. Đây là cạm bẫy khiến người mới mất nhiều thời gian nhất.

### Preflight

Tailwind áp một reset (dựa trên modern-normalize) trước mọi thứ:
- `box-sizing: border-box` cho mọi element (utility `box-border` / `box-content` để đổi)
- Xoá margin mặc định
- Heading không còn cỡ chữ và độ đậm mặc định
- Danh sách không còn marker
- Ảnh thành `display: block`, `max-width: 100%`

Điều này giải thích vì sao `<h1>` trong Tailwind trông như text thường.

### Arbitrary values

Khi thang thiết kế không đủ: `w-[347px]`, `bg-[#1da1f2]`, `grid-cols-[1fr_500px_2fr]`, `top-[calc(100%+1rem)]`.
Arbitrary **property**: `[mask-type:luminance]`. Arbitrary **variant**: `[&>*+*]:mt-4`, `[&_svg]:size-4`.

Dùng chúng là tín hiệu: một lần thì ổn; ba lần cùng một giá trị thì nên vào theme — xem [[Tailwind Theme & Configuration]].

## 2. Nguyên tắc

1. **Reusing styles — trừu tượng hoá bằng component, không bằng `@apply`.** Khi một chuỗi utility lặp lại, tạo `<Button>`, đừng tạo `.btn { @apply ... }`. `@apply` khôi phục đúng những vấn đề Tailwind sinh ra để giải.
2. **Bám thang thiết kế.** `p-4` chứ không `p-[17px]`. Thang là thứ giữ giao diện nhất quán.
3. **Giữ thứ tự class nhất quán** bằng `prettier-plugin-tailwindcss` — không tranh cãi thủ công.
4. **Dùng `cn()` để gộp class có điều kiện:**
   ```ts
   import { clsx } from 'clsx'
   import { twMerge } from 'tailwind-merge'
   export const cn = (...i) => twMerge(clsx(i))
   ```
   `tailwind-merge` giải quyết xung đột (`px-2 px-4` → `px-4`), thứ `clsx` một mình không làm được.
5. **`cva` cho component nhiều biến thể** — xem [[Component Library Strategy]] và [[Component API & Variants]].
6. **Utility đi vào `@layer utilities`** nên chúng thắng component layer — nền tảng lý thuyết ở [[CSS Cascade & Specificity]].
7. **Vẫn phải học CSS.** Tailwind là lớp đặt tên trên CSS; mọi cạm bẫy ở [[CSS Flexbox]], [[Stacking Context]], [[CSS Box Model]] vẫn nguyên vẹn.

## 3. Cạm bẫy

- **Class ghép chuỗi động không được sinh.** Callout ở mục 1 — cạm bẫy số một.
- **`@apply` lan tràn.** Sáu tháng sau bạn có một file CSS truyền thống, kèm chi phí của Tailwind.
- **Không biết CSS mà dùng Tailwind.** Bạn sẽ không hiểu vì sao `flex-1` không co được (`min-width: auto`) hay vì sao `z-50` không nổi lên (stacking context).
- **Sao chép chuỗi 30 class thay vì tạo component.** Sửa một nút thành sửa 40 file.
- **Quên Preflight xoá style mặc định**, rồi ngạc nhiên vì `<h1>` và `<ul>` trông trần trụi.
- **Arbitrary value ở khắp nơi** = đã bỏ thang thiết kế, mất luôn lợi ích chính.
- **`content` config sai** → CSS production thiếu class. Kiểm tra glob có phủ hết file component không.
- **Utility không phủ hết CSS.** Không có utility cho `@keyframes` phức tạp, `::before` với `content` động, hay animation nhiều bước — vẫn cần CSS thật.
- **Trộn Tailwind với thư viện component có style riêng** dễ sinh xung đột specificity mà `tailwind-merge` không thấy.

## 4. Checklist áp dụng

- [ ] Có tên class nào được ghép chuỗi động không?
- [ ] Chuỗi utility lặp lại — đã tách thành component chưa (không phải `@apply`)?
- [ ] Có bao nhiêu arbitrary value? Cái nào nên vào theme?
- [ ] `prettier-plugin-tailwindcss` đã bật chưa?
- [ ] Có dùng `tailwind-merge` khi gộp class không?
- [ ] `content`/source glob có phủ hết file không?
- [ ] Tôi có hiểu CSS đứng sau utility này không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Tailwind CSS IntelliSense | Autocomplete + xem CSS thật khi hover | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss |
| prettier-plugin-tailwindcss | Sắp thứ tự class tự động | https://github.com/tailwindlabs/prettier-plugin-tailwindcss |
| tailwind-merge | Giải xung đột class | https://github.com/dcastil/tailwind-merge |
| cva | API biến thể có kiểu | https://cva.style/ |

## Tham khảo

- Tailwind — *Utility-first fundamentals*: https://tailwindcss.com/docs/styling-with-utility-classes
- Tailwind — *Preflight*: https://tailwindcss.com/docs/preflight
- Tailwind — *Adding custom styles*: https://tailwindcss.com/docs/adding-custom-styles
- Adam Wathan — *CSS Utility Classes and "Separation of Concerns"*: https://adamwathan.me/css-utility-classes-and-separation-of-concerns/

## Liên kết

[[Utility-First vs Cascade]] · [[Tailwind Theme & Configuration]] · [[Tailwind Variants & States]] · [[CSS Architecture]] · [[Component Library Strategy]] · [[Frontend]]
