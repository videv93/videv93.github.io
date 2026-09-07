---
tags: [frontend, tailwind]
status: evergreen
---
# Tailwind Theme & Configuration

> Theme **là** design system của bạn, viết dưới dạng máy đọc được. Mọi quyết định "màu nào, khoảng cách nào, bo góc bao nhiêu" đều tụ về một file — đó là giá trị lớn nhất và cũng là chỗ dễ làm hỏng nhất.

> [!warning] Đọc [[Utility-First vs Cascade]] trước khi áp dụng bất kỳ note nào trong thư mục này.

## 1. Khái niệm cốt lõi

### Hai thế hệ cấu hình

| | v3 — `tailwind.config.js` | v4 — CSS-first |
|---|---|---|
| Nơi cấu hình | JavaScript | `@theme` trong CSS |
| Token | Object JS | Custom property CSS |
| Truy cập lúc runtime | Không | **Có** — token là biến CSS thật |
| Content detection | `content: [...]` thủ công | Tự động |

v4:
```css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.62 0.19 260);
  --spacing-18: 4.5rem;
  --font-display: "Inter", sans-serif;
  --radius-card: 0.75rem;
  --breakpoint-3xl: 120rem;
}
```

Mỗi token sinh ra utility tương ứng (`bg-brand-500`, `p-18`, `font-display`, `rounded-card`, `3xl:`) **và** tồn tại như custom property dùng được ở mọi nơi.

v3:
```js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { 500: '#3b82f6' } },
      spacing: { 18: '4.5rem' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

> [!warning] `theme` vs `theme.extend`
> Đặt trực tiếp trong `theme` **thay thế hoàn toàn** thang mặc định; đặt trong `theme.extend` thì **bổ sung**. Ghi `theme: { colors: { brand: ... } }` sẽ xoá sạch `red-500`, `gray-100` và mọi màu khác. Gần như lúc nào bạn cũng muốn `extend`.

### Các nhóm theme

| Nhóm | Sinh ra |
|---|---|
| `colors` | `bg-*` `text-*` `border-*` `ring-*` `fill-*` `stroke-*` `divide-*` `accent-*` `caret-*` |
| `spacing` | `p-*` `m-*` `gap-*` `w-*` `h-*` `inset-*` `translate-*` `scroll-*` |
| `screens` | breakpoint variant `sm:` `md:` … |
| `fontFamily` `fontSize` `fontWeight` `letterSpacing` `lineHeight` | utility chữ |
| `borderRadius` `borderWidth` | `rounded-*` `border-*` |
| `boxShadow` `dropShadow` | `shadow-*` |
| `zIndex` | `z-*` |
| `animation` `keyframes` | `animate-*` |
| `container` | cấu hình `container` |

### Dark mode

| Chiến lược | Cấu hình | Kích hoạt bằng |
|---|---|---|
| `media` (mặc định) | — | `prefers-color-scheme` của hệ thống |
| `class` / `selector` | `darkMode: 'class'` | `.dark` trên `<html>` |
| Tuỳ chỉnh | `darkMode: ['variant', '&:where([data-theme=dark] *)']` | Attribute bất kỳ |

**Cách làm đúng cho theme toggle** — token, không phải rule:

```css
@theme { --color-bg: white; --color-fg: #111; }
.dark { --color-bg: #111; --color-fg: #eee; }
```

Rồi dùng `bg-bg text-fg` ở mọi nơi — không cần một `dark:` nào trong component. Đây là điểm giao giữa Tailwind và [[CSS Custom Properties]], và nó gọn hơn nhiều so với rải `dark:` khắp markup.

Vẫn nhớ đặt `color-scheme` — xem [[CSS Color & Theming]].

### Plugin chính thức

| Plugin | Cho |
|---|---|
| `@tailwindcss/typography` | `prose` cho nội dung CMS |
| `@tailwindcss/forms` | Reset form control về trạng thái dễ style |
| `@tailwindcss/container-queries` | Variant `@md:` (đã tích hợp trong v4) |
| `@tailwindcss/aspect-ratio` | Di sản — `aspect-*` đã là utility gốc |

Preset (`presets: [...]`) để chia sẻ theme giữa nhiều repo trong monorepo.

## 2. Nguyên tắc

1. **Luôn `extend`, trừ khi thực sự muốn thay thế cả thang.**
2. **Token ngữ nghĩa, không token nguyên thuỷ, trong component.** Định nghĩa `--color-surface` từ `--color-gray-50`; component dùng `bg-surface`. Đổi thương hiệu chỉ sửa một chỗ. Xem [[Design Tokens]].
3. **Dark mode bằng cách đổi giá trị token**, không bằng cách rải `dark:`.
4. **Thang màu bằng `oklch`** để các shade đồng đều — xem [[CSS Color & Theming]].
5. **Đừng mở rộng thang spacing trừ khi có lý do thật.** Thang mặc định đã đủ; thêm vào là mở cửa cho sự tuỳ tiện.
6. **Preset cho monorepo** để mọi app dùng chung design system.
7. **`content` glob phải phủ mọi nơi có tên class** — kể cả file trong `node_modules` của thư viện UI nội bộ.
8. **Kiểm tra kích thước CSS production.** Tailwind cấu hình đúng cho ra ~10KB gzip; nếu lớn hơn nhiều, `content` hoặc safelist có vấn đề.

## 3. Cạm bẫy

- **`theme` thay vì `theme.extend`** xoá sạch thang mặc định. Callout mục 1.
- **`content` glob thiếu file** → class mất trong production nhưng có trong dev (vì dev quét lại liên tục). Lỗi chỉ lộ ra sau khi deploy.
- **`safelist` như một cái nạng.** Nếu phải safelist nhiều, nguyên nhân thật là class ghép chuỗi động — xem [[Tailwind Utility Model]].
- **`darkMode: 'class'` nhưng quên thêm `.dark`** vào `<html>` trước khi paint → nhấp nháy theme.
- **Đặt tên token theo màu:** `--color-blue-500` dùng trực tiếp trong component. Rebrand thành đỏ thì tên class nói dối.
- **Mở rộng theme quá đà** cho tới khi nó không còn là hệ thống — 40 màu tuỳ chỉnh thì thang không còn ràng buộc gì.
- **Plugin bên thứ ba xung đột** với `tailwind-merge` (nó không biết class tuỳ chỉnh của bạn) — cần cấu hình `extendTailwindMerge`.
- **v3 → v4 không tự động.** Cấu hình JS phải chuyển sang `@theme`; một số utility đổi tên.
- **Quên `color-scheme`** nên form control và scrollbar vẫn sáng trong dark mode.

## 4. Checklist áp dụng

- [ ] Cấu hình dùng `extend` chứ không ghi đè thang?
- [ ] Token có tầng ngữ nghĩa chưa?
- [ ] Dark mode làm bằng token hay bằng `dark:` rải rác?
- [ ] `.dark` có được đặt trước khi paint để tránh nhấp nháy không?
- [ ] `content`/source có phủ hết file chứa class không?
- [ ] CSS production nặng bao nhiêu?
- [ ] `color-scheme` đã đặt chưa?
- [ ] Có safelist nào che giấu vấn đề class động không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `npx tailwindcss --help` | CLI build và kiểm tra | https://tailwindcss.com/docs/installation |
| Tailwind Config Viewer | Xem theme đã giải quyết dưới dạng trang web | https://github.com/rogden/tailwind-config-viewer |
| `@tailwindcss/upgrade` | Trợ giúp nâng cấp v3 → v4 | https://tailwindcss.com/docs/upgrade-guide |
| Style Dictionary | Nguồn token dùng chung cho web và native | https://styledictionary.com/ |

## Tham khảo

- Tailwind — *Theme configuration*: https://tailwindcss.com/docs/theme
- Tailwind — *Dark mode*: https://tailwindcss.com/docs/dark-mode
- Tailwind — *Detecting classes in source files*: https://tailwindcss.com/docs/detecting-classes-in-source-files
- Tailwind — *Upgrade guide v4*: https://tailwindcss.com/docs/upgrade-guide

## Liên kết

[[CSS Custom Properties]] · [[CSS Color & Theming]] · [[Design Tokens]] · [[Tailwind Utility Model]] · [[Component Library Strategy]] · [[Frontend]]
