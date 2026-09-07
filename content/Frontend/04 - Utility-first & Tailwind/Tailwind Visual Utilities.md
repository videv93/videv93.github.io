---
tags: [frontend, tailwind]
status: evergreen
---
# Tailwind Visual Utilities

> Background, border, ring, shadow, filter, opacity, blend, table, SVG, interactivity, accessibility. Đây là nhóm utility lớn nhất và ít được học có hệ thống nhất — phần lớn người dùng chỉ biết `bg-*` và `rounded-*`.

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Background

| Nhóm | Utility |
|---|---|
| Color | `bg-{màu}-{shade}` · `bg-transparent` · `bg-current` · `bg-inherit` · `bg-{màu}/50` |
| Image | `bg-none` · `bg-[url(...)]` · `bg-gradient-to-{t,tr,r,br,b,bl,l,tl}` · `bg-linear-*` `bg-radial-*` `bg-conic-*` |
| Gradient stops | `from-{màu}` · `via-{màu}` · `to-{màu}` · `from-0%` `via-50%` `to-100%` |
| Size | `bg-auto` · `bg-cover` · `bg-contain` |
| Position | `bg-bottom` `bg-center` `bg-left` `bg-left-bottom` `bg-left-top` `bg-right` `bg-right-bottom` `bg-right-top` `bg-top` |
| Repeat | `bg-repeat` · `bg-no-repeat` · `bg-repeat-x` · `bg-repeat-y` · `bg-repeat-round` · `bg-repeat-space` |
| Attachment | `bg-fixed` · `bg-local` · `bg-scroll` |
| Clip | `bg-clip-border` · `bg-clip-padding` · `bg-clip-content` · `bg-clip-text` |
| Origin | `bg-origin-border` · `bg-origin-padding` · `bg-origin-content` |
| Blend | `bg-blend-{normal,multiply,screen,overlay,darken,lighten,…}` |

Gradient text: `bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`.

### Border

| Nhóm | Utility |
|---|---|
| Radius | `rounded-none` `rounded-sm` `rounded` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-3xl` `rounded-full` · theo cạnh `rounded-t-*` `rounded-r-*` … · theo góc `rounded-tl-*` … · logic `rounded-s-*` `rounded-e-*` |
| Width | `border` (1px) · `border-0` `border-2` `border-4` `border-8` · theo cạnh `border-x-*` `border-y-*` `border-t-*` `border-r-*` `border-b-*` `border-l-*` · logic `border-s-*` `border-e-*` |
| Color | `border-{màu}-{shade}` · `border-transparent` · `border-current` |
| Style | `border-solid` `border-dashed` `border-dotted` `border-double` `border-hidden` `border-none` |
| Divide | `divide-x-*` `divide-y-*` `divide-{màu}` `divide-solid` … `divide-x-reverse` |
| Outline | `outline` `outline-0` `outline-1` `outline-2` `outline-4` `outline-8` · `outline-{màu}` · `outline-none` `outline-dashed` … · `outline-offset-*` |
| Ring | `ring` `ring-0` `ring-1` `ring-2` `ring-4` `ring-8` · `ring-{màu}` · `ring-offset-{n}` `ring-offset-{màu}` · `ring-inset` |

> [!note] `ring` vs `border` vs `outline`
> - `border` **chiếm layout** — thêm border làm element to ra (trừ khi `box-border`, mặc định của Preflight).
> - `outline` không chiếm layout, vẽ ngoài border, có thể có offset. **Đúng cho focus ring.**
> - `ring` là `box-shadow` giả làm viền — không chiếm layout, đổi màu/độ dày mượt, chồng lớp được. Đúng cho focus state có animation.

`divide-*` cùng vấn đề với `space-*`: cài đặt bằng `& > * + *`, gãy khi wrap. Ưu tiên `gap` + border trên từng item.

### Effects & filter

| Nhóm | Utility |
|---|---|
| Box shadow | `shadow-sm` `shadow` `shadow-md` `shadow-lg` `shadow-xl` `shadow-2xl` `shadow-inner` `shadow-none` · `shadow-{màu}` |
| Opacity | `opacity-0` `opacity-5` … `opacity-100` |
| Mix blend | `mix-blend-{normal,multiply,screen,overlay,…}` · `isolate` để chặn |
| Filter | `blur-*` `brightness-*` `contrast-*` `drop-shadow-*` `grayscale` `hue-rotate-*` `invert` `saturate-*` `sepia` · `filter-none` |
| Backdrop | `backdrop-blur-*` `backdrop-brightness-*` `backdrop-contrast-*` `backdrop-grayscale` `backdrop-hue-rotate-*` `backdrop-invert` `backdrop-opacity-*` `backdrop-saturate-*` `backdrop-sepia` |

### Transform

`scale-*` `scale-x-*` `scale-y-*` · `rotate-*` · `translate-x-*` `translate-y-*` · `skew-x-*` `skew-y-*` · `origin-{center,top,top-right,…}` · `transform-gpu` · `transform-none`

### Transition & animation

Transition: `transition` `transition-all` `transition-colors` `transition-opacity` `transition-shadow` `transition-transform` `transition-none`
Duration: `duration-75` … `duration-1000`
Timing: `ease-linear` `ease-in` `ease-out` `ease-in-out`
Delay: `delay-75` … `delay-1000`
Animation: `animate-none` `animate-spin` `animate-ping` `animate-pulse` `animate-bounce`

**Dùng `transition-colors` / `transition-transform`, không `transition-all`** — xem [[CSS Transitions & Animations]].

### Table

`border-collapse` · `border-separate` · `border-spacing-*` · `table-auto` · `table-fixed` · `caption-top` · `caption-bottom`

`table-fixed` + `w-full` là công thức để cột bảng không nhảy theo nội dung.

### SVG

`fill-{màu}` · `fill-none` · `fill-current` · `stroke-{màu}` · `stroke-current` · `stroke-0` `stroke-1` `stroke-2`

`fill-current` / `stroke-current` để icon đi theo `text-*`.

### Interactivity

`accent-{màu}` (checkbox/radio gốc) · `appearance-none` `appearance-auto` · `caret-{màu}` · `cursor-{pointer,default,wait,text,move,not-allowed,help,grab,…}` · `pointer-events-none` `pointer-events-auto` · `resize` `resize-none` `resize-x` `resize-y` · `scroll-auto` `scroll-smooth` · `scroll-m-*` `scroll-p-*` · `snap-start` `snap-center` `snap-end` `snap-align-none` `snap-normal` `snap-always` `snap-x` `snap-y` `snap-both` `snap-mandatory` `snap-proximity` · `touch-auto` `touch-none` `touch-pan-*` `touch-manipulation` · `select-none` `select-text` `select-all` `select-auto` · `will-change-*`

### Accessibility

`sr-only` (ẩn thị giác, giữ cho screen reader) · `not-sr-only` · `forced-color-adjust-auto` · `forced-color-adjust-none`

## 2. Nguyên tắc

1. **`outline`/`ring` cho focus, không `border`** — border làm nhảy layout.
2. **`transition-colors` thay `transition-all`.**
3. **`backdrop-blur` luôn kèm nền bán trong suốt** làm fallback.
4. **`fill-current` cho icon SVG** để màu tự đi theo text.
5. **`accent-{màu}` để tô checkbox/radio gốc** — rẻ hơn nhiều so với dựng lại control từ đầu, và giữ nguyên hành vi a11y.
6. **`pointer-events-none` cho lớp phủ trang trí** để không chặn click.
7. **`select-none` cho nhãn nút**, không cho nội dung.
8. **`sr-only` cho nhãn chỉ dành screen reader** — công cụ a11y quan trọng nhất trong Tailwind.
9. **`isolate` khi dùng `mix-blend-*`** để không rò ra ngoài component.

## 3. Cạm bẫy

- **`backdrop-blur` tạo stacking context và containing block** — phá `fixed` bên trong. Cạm bẫy phổ biến vì header kính mờ rất thịnh hành. Xem [[Stacking Context]].
- **`outline-none` xoá focus ring và làm trang không dùng được bằng bàn phím.** Nếu buộc phải, thay bằng `focus-visible:ring-2`.
- **`shadow-*` gần như vô hình trên nền tối.** Dùng border sáng nhẹ hoặc `bg-*` sáng hơn.
- **`transition-all` transition cả `height`** gây reflow mỗi frame.
- **`divide-*` gãy khi wrap** — như `space-*`.
- **`opacity-50` làm mờ **cả** con**, kể cả text. Muốn chỉ mờ nền, dùng `bg-{màu}/50`.
- **`animate-spin` không dừng khi tab ẩn** — ngốn pin.
- **`appearance-none` xoá cả hành vi gốc của `<select>`** — phải dựng lại mũi tên và trạng thái.
- **`pointer-events-none` cũng chặn hover và focus** của con.
- **`border` mặc định 1px nhưng cần `border-{màu}`** — không có màu thì dùng màu mặc định của theme, dễ vô hình.

## 4. Checklist áp dụng

- [ ] Focus dùng `ring`/`outline`, không `border`?
- [ ] `backdrop-blur` có phá `fixed` nào không?
- [ ] Có `outline-none` nào không kèm thay thế không?
- [ ] `transition-*` có liệt kê property cụ thể không?
- [ ] Shadow có nhìn thấy trong dark mode không?
- [ ] Icon dùng `fill-current` chưa?
- [ ] Nhãn chỉ dành screen reader có `sr-only` chưa?
- [ ] `mix-blend-*` có `isolate` chưa?
- [ ] Lớp phủ trang trí có `pointer-events-none` chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Shadow Palette Generator | Sinh shadow nhiều lớp tự nhiên | https://www.joshwcomeau.com/shadow-palette/ |
| Tailwind Play | Thử nhanh tổ hợp utility | https://play.tailwindcss.com/ |
| DevTools Layers | Bắt stacking context do `backdrop-blur` | https://developer.chrome.com/docs/devtools/rendering |

## Tham khảo

- Tailwind — *Backgrounds*: https://tailwindcss.com/docs/background-color
- Tailwind — *Borders & ring*: https://tailwindcss.com/docs/border-width
- Tailwind — *Filters*: https://tailwindcss.com/docs/filter
- Tailwind — *Accessibility utilities*: https://tailwindcss.com/docs/screen-readers
- MDN — *CSS filter effects*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Filter_effects

## Liên kết

[[CSS Transforms & Effects]] · [[Stacking Context]] · [[CSS Transitions & Animations]] · [[Tailwind Variants & States]] · [[Interaction States]] · [[Frontend]]
