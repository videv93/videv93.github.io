---
tags: [frontend, tailwind]
status: evergreen
---
# Tailwind Variants & States

> Variant là thứ khiến Tailwind không chỉ là inline style. `hover:`, `md:`, `dark:`, `group-*`, `peer-*`, `has-*`, `data-*` cho phép biểu diễn **mọi selector CSS** ngay trong markup — bao gồm cả những cái inline style không bao giờ làm được.

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Bảng tra

### Pseudo-class

`hover` · `focus` · `focus-visible` · `focus-within` · `active` · `visited` · `target`
`first` · `last` · `only` · `odd` · `even` · `first-of-type` · `last-of-type` · `only-of-type` · `empty`
`disabled` · `enabled` · `checked` · `indeterminate` · `default` · `required` · `valid` · `invalid` · `user-valid` · `user-invalid` · `in-range` · `out-of-range` · `placeholder-shown` · `autofill` · `read-only` · `open`

Dùng `focus-visible:` thay `focus:` cho focus ring — xem [[Accessible Markup & ARIA]].
Dùng `user-invalid:` thay `invalid:` để không bắn đỏ ngay khi load — xem [[HTML Forms & Validation]].

### Pseudo-element

`before` · `after` · `placeholder` · `file` · `marker` · `selection` · `first-line` · `first-letter` · `backdrop`

`before:`/`after:` tự thêm `content: ''` — không cần viết tay.

### Group & peer

| Variant | Nghĩa |
|---|---|
| `group` + `group-hover:` | Style con khi **cha** (có class `group`) được hover |
| `group/{name}` + `group-hover/{name}:` | Group **có tên** — cho group lồng nhau |
| `peer` + `peer-checked:` | Style element khi **anh em đứng trước** (có class `peer`) ở trạng thái đó |
| `peer/{name}` + `peer-checked/{name}:` | Peer có tên |
| `group-has-*` / `peer-has-*` | Kết hợp với `:has()` |

**Peer chỉ đi xuôi.** `peer` phải đứng **trước** element bị ảnh hưởng trong DOM — vì nó dựa trên combinator `~`.

Ví dụ kinh điển — custom checkbox không cần JS:
```html
<input type="checkbox" class="peer sr-only" id="x">
<label for="x" class="peer-checked:bg-blue-500 peer-focus-visible:ring-2 ...">
```

### `has-*` — parent selector

`has-[:checked]:` · `has-[img]:` · `has-[>_.badge]:`
Style một element dựa trên **nội dung của nó**. Xoá rất nhiều JS — xem [[CSS Selectors]].

### Media & feature query

Breakpoint: `sm` (640px) · `md` (768px) · `lg` (1024px) · `xl` (1280px) · `2xl` (1536px)
Max-width: `max-sm` · `max-md` · `max-lg` · `max-xl` · `max-2xl`
Khoảng: `md:max-lg:` — từ md tới trước lg
Arbitrary: `min-[900px]:` · `max-[900px]:`

Container query: `@container` trên cha, rồi `@sm:` `@md:` … · `@min-[24rem]:` · `@container/{name}` + `@md/{name}:`

Sở thích người dùng: `dark` · `motion-safe` · `motion-reduce` · `contrast-more` · `contrast-less` · `forced-colors`
Hướng: `portrait` · `landscape`
In: `print`
Con trỏ: `pointer-fine` · `pointer-coarse` · `any-pointer-fine` · `any-pointer-coarse`
Feature: `supports-[display:grid]:` · `supports-not-[...]:`

### Attribute selector

`aria-checked:` `aria-disabled:` `aria-expanded:` `aria-hidden:` `aria-pressed:` `aria-selected:` · `aria-[sort=ascending]:`
`data-{key}:` · `data-[state=open]:` · `data-[size=large]:`
Hướng: `rtl:` · `ltr:`
`open:` cho `<details>` và `<dialog>`

**`data-*` và `aria-*` variant là cầu nối chuẩn với thư viện headless** (Radix, Headless UI) — chúng đặt `data-state="open"` và bạn style trực tiếp từ đó, không cần đồng bộ class thủ công.

### Arbitrary variant

`[&>*]:` · `[&_svg]:` · `[&:nth-child(3)]:` · `[.dark_&]:` · `[@supports(display:grid)]:`

`[&>*+*]:mt-4` là cách viết `space-y-4` bằng tay — hữu ích khi cần selector Tailwind không có.

## 2. Nguyên tắc

1. **Xếp chồng variant tự do:** `dark:md:hover:bg-blue-600`. Thứ tự không quan trọng về ngữ nghĩa, nhưng nên nhất quán.
2. **`group` cho quan hệ cha-con, `peer` cho quan hệ anh-em xuôi chiều, `has-*` cho quan hệ con-lên-cha.** Ba công cụ, ba hướng.
3. **Đặt tên group/peer khi lồng nhau** — `group/item`, `peer/email`. Không đặt tên thì variant lồng nhau bắt nhầm.
4. **`data-*` variant để tích hợp thư viện headless.**
5. **`motion-safe:` thay vì `motion-reduce:`** — viết animation trong `motion-safe:` là mặc định an toàn (không animation), thay vì viết animation rồi tắt.
6. **Container query variant (`@md:`) cho component tái sử dụng**, breakpoint variant (`md:`) cho layout trang. Xem [[Responsive Layout]].
7. **`dark:` cần chiến lược đúng** — xem [[Tailwind Theme & Configuration]].

## 3. Cạm bẫy

- **`peer` phải đứng trước trong DOM.** Nó dùng `~`; không có "peer đứng sau". Đây là lỗi số một khi làm custom form control.
- **`group` lồng nhau không có tên bắt nhầm cấp.** Luôn đặt tên khi có hơn một tầng.
- **`focus:` thay `focus-visible:`** hiện focus ring khi click chuột — xấu và khiến designer yêu cầu `outline-none`.
- **`invalid:` bắn ngay khi load.** Dùng `user-invalid:`.
- **`dark:` phụ thuộc cấu hình.** Với chiến lược `class`/`selector`, nó cần `.dark` ở tổ tiên; với `media`, nó theo hệ thống và không bật/tắt được.
- **`hover:` trên thiết bị cảm ứng bị "dính"** sau khi chạm. Bọc trong `pointer-fine:hover:` khi quan trọng.
- **Arbitrary variant với khoảng trắng cần `_`.** `[&_svg]:` không phải `[& svg]:`.
- **Quá nhiều variant xếp chồng làm markup không đọc nổi.** Bốn variant trên một class là dấu hiệu nên tách component.
- **`group-hover:` không hoạt động nếu quên class `group` trên cha.** Không có cảnh báo.
- **Container query variant cần `@container` trên cha** và một wrapper — element không tự query chính nó.

## 4. Checklist áp dụng

- [ ] `peer` có đứng trước element bị ảnh hưởng không?
- [ ] Group lồng nhau đã đặt tên chưa?
- [ ] Dùng `focus-visible:` thay `focus:` chưa?
- [ ] Dùng `user-invalid:` thay `invalid:` chưa?
- [ ] Animation có bọc `motion-safe:` chưa?
- [ ] Component tái sử dụng dùng `@md:` hay `md:` — đúng cái cần không?
- [ ] Có class nào xếp chồng quá 3 variant không?
- [ ] Style theo trạng thái thư viện — đã dùng `data-*` variant chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Tailwind IntelliSense | Autocomplete variant, xem selector sinh ra | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss |
| Radix Primitives | Headless component phát `data-state` | https://www.radix-ui.com/primitives |
| `@tailwindcss/container-queries` | Variant `@md:` (đã tích hợp từ v4) | https://github.com/tailwindlabs/tailwindcss-container-queries |

## Tham khảo

- Tailwind — *Hover, focus, and other states*: https://tailwindcss.com/docs/hover-focus-and-other-states
- Tailwind — *Responsive design*: https://tailwindcss.com/docs/responsive-design
- Tailwind — *Dark mode*: https://tailwindcss.com/docs/dark-mode
- MDN — *Pseudo-classes*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes

## Liên kết

[[CSS Selectors]] · [[Responsive Layout]] · [[Tailwind Theme & Configuration]] · [[Interaction States]] · [[Accessible Markup & ARIA]] · [[Frontend]]
