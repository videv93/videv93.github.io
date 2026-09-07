---
tags: [frontend, tailwind, typography]
status: evergreen
---
# Tailwind Typography Utilities

> Bảng tra utility chữ. Cơ chế tải font, line box và ngắt dòng nằm ở [[CSS Typography]]; thang tỉ lệ và thẩm mỹ ở [[Typography]] bên UIUX.

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Font

| Nhóm | Utility |
|---|---|
| Family | `font-sans` · `font-serif` · `font-mono` |
| Size | `text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` … `text-9xl` |
| Weight | `font-thin` (100) · `font-extralight` (200) · `font-light` (300) · `font-normal` (400) · `font-medium` (500) · `font-semibold` (600) · `font-bold` (700) · `font-extrabold` (800) · `font-black` (900) |
| Style | `italic` · `not-italic` |
| Smoothing | `antialiased` · `subpixel-antialiased` |
| Variant numeric | `normal-nums` · `ordinal` · `slashed-zero` · `lining-nums` · `oldstyle-nums` · `proportional-nums` · `tabular-nums` · `diagonal-fractions` · `stacked-fractions` |
| Stretch | `font-stretch-*` |

**`tabular-nums` cho mọi số trong bảng và đồng hồ đếm** — chữ số cùng chiều rộng nên số không nhảy khi đổi.

Mỗi `text-*` đi kèm một `line-height` mặc định hợp lý — đây là chi tiết dễ bỏ qua: `text-sm` không chỉ đặt `font-size`.

### Spacing chữ

| Nhóm | Utility |
|---|---|
| Letter spacing | `tracking-tighter` · `tracking-tight` · `tracking-normal` · `tracking-wide` · `tracking-wider` · `tracking-widest` |
| Line height | `leading-none` · `leading-tight` · `leading-snug` · `leading-normal` · `leading-relaxed` · `leading-loose` · `leading-3`…`leading-10` |
| Text indent | `indent-*` |

### Alignment & màu

Align: `text-left` · `text-center` · `text-right` · `text-justify` · `text-start` · `text-end`
Color: `text-{màu}-{shade}` · `text-inherit` · `text-current` · `text-transparent` · `text-{màu}/50` (opacity)
Vertical align: `align-baseline` · `align-top` · `align-middle` · `align-bottom` · `align-text-top` · `align-text-bottom` · `align-sub` · `align-super`

### Decoration

| Nhóm | Utility |
|---|---|
| Line | `underline` · `overline` · `line-through` · `no-underline` |
| Color | `decoration-{màu}` |
| Style | `decoration-solid` · `-double` · `-dotted` · `-dashed` · `-wavy` |
| Thickness | `decoration-auto` · `decoration-from-font` · `decoration-0`…`decoration-8` |
| Underline offset | `underline-offset-auto` · `underline-offset-0`…`-8` |

### Transform & overflow

Transform: `uppercase` · `lowercase` · `capitalize` · `normal-case`
Overflow: `truncate` (= `overflow-hidden text-ellipsis whitespace-nowrap`) · `text-ellipsis` · `text-clip` · `line-clamp-1`…`line-clamp-6` · `line-clamp-none`
Wrap: `text-wrap` · `text-nowrap` · `text-balance` · `text-pretty`
Whitespace: `whitespace-normal` · `-nowrap` · `-pre` · `-pre-line` · `-pre-wrap` · `-break-spaces`
Word break: `break-normal` · `break-words` · `break-all` · `break-keep` · `hyphens-none` · `hyphens-manual` · `hyphens-auto`

**`text-balance` cho heading, `text-pretty` cho đoạn văn** — hai utility rẻ nhất để chữ trông chuyên nghiệp hơn.

### List & content

List style type: `list-none` · `list-disc` · `list-decimal`
List style position: `list-inside` · `list-outside`
List style image: `list-image-none` · `list-image-[url(...)]`
Content: `content-none` · `content-['...']`

### Plugin `@tailwindcss/typography`

`prose` · `prose-sm`…`prose-2xl` · `prose-invert` (dark mode) · `prose-{màu}` · biến thể theo element `prose-headings:` `prose-a:` `prose-img:`…

Dùng cho nội dung do người dùng/CMS sinh ra — nơi bạn **không** đặt được class lên từng thẻ. Đây là ngoại lệ chính đáng duy nhất của utility-first.

## 2. Nguyên tắc

1. **`text-balance` cho heading, `text-pretty` cho body.**
2. **`tabular-nums` cho mọi số so sánh được** — bảng, giá, timer.
3. **`prose` cho markdown/CMS**, utility thường cho UI.
4. **`line-clamp-*` thay hack `-webkit-` thủ công.**
5. **Đừng ghi đè `leading` của `text-*` trừ khi có lý do.** Mặc định đã được cân.
6. **`truncate` chỉ cắt một dòng**; nhiều dòng dùng `line-clamp-*`.
7. **`text-current`/`text-inherit` để icon đi theo màu chữ** — tương đương `currentColor`.
8. **`antialiased` trên nền tối** thường làm chữ mảnh dễ đọc hơn.

## 3. Cạm bẫy

- **`truncate` không hoạt động trong flex item** nếu thiếu `min-w-0`. Cặp đôi cạm bẫy kinh điển — xem [[Tailwind Flexbox & Grid]].
- **`text-*` cũng đặt `line-height`.** Đổi `text-lg` không chỉ đổi cỡ chữ — layout dịch chuyển theo.
- **`break-all` cho văn xuôi** làm vỡ từ tuỳ tiện. Dùng `break-words`.
- **`prose` ghi đè utility bên trong nó** — cần `prose-headings:text-red-500` hoặc `not-prose`.
- **`capitalize` viết hoa **mọi** từ**, kể cả "và", "của" — thường không phải thứ bạn muốn cho tiếng Việt.
- **`hyphens-auto` không có tác dụng nếu thiếu `lang`** trên `<html>`.
- **`line-clamp` + `overflow-visible` xung đột** — clamp cần overflow hidden.
- **`uppercase` với `tracking-normal`** trông chật; chữ hoa cần `tracking-wide`.
- **Thang `leading-3`…`leading-10` dùng thang spacing** (rem cố định), khác hẳn `leading-tight`…`leading-loose` (hệ số). Trộn hai thang gây kết quả bất ngờ.

## 4. Checklist áp dụng

- [ ] Heading có `text-balance` chưa?
- [ ] Số trong bảng có `tabular-nums` chưa?
- [ ] `truncate` trong flex có kèm `min-w-0` không?
- [ ] Nội dung CMS có dùng `prose` không?
- [ ] Có ghi đè `leading` không cần thiết không?
- [ ] `hyphens-auto` có `lang` đúng chưa?
- [ ] Chữ hoa có đủ `tracking` không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `@tailwindcss/typography` | Style nội dung dài | https://github.com/tailwindlabs/tailwindcss-typography |
| `next/font` | Tự host font, tránh CLS | https://nextjs.org/docs/app/api-reference/components/font |
| Tailwind IntelliSense | Xem `line-height` đi kèm `text-*` | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss |

## Tham khảo

- Tailwind — *Font size*: https://tailwindcss.com/docs/font-size
- Tailwind — *Text wrap*: https://tailwindcss.com/docs/text-wrap
- Tailwind — *Typography plugin*: https://github.com/tailwindlabs/tailwindcss-typography
- MDN — *CSS text module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Text

## Liên kết

[[CSS Typography]] · [[Typography]] · [[Tailwind Utility Model]] · [[Tailwind Theme & Configuration]] · [[Frontend]]
