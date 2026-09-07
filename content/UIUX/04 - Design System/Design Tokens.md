---
tags: [uiux, designsystem, tokens]
status: growing
---
# Design Tokens

> Token là **biến** cho quyết định thiết kế. Thay vì viết `#3B82F6` ở 200 chỗ, ta viết `color-action-primary` — đổi một lần, đổi khắp nơi.

## 1. Ba tầng token
Đây là mô hình quan trọng nhất cần nắm:

```
Tầng 1 — PRIMITIVE (giá trị thô)
  blue-500 = #3B82F6      gray-900 = #111827      space-4 = 16px
          ↓ tham chiếu
Tầng 2 — SEMANTIC (vai trò)
  color-action-primary = blue-500
  color-text-primary   = gray-900
  space-component-md   = space-4
          ↓ tham chiếu
Tầng 3 — COMPONENT (phạm vi hẹp)
  button-primary-bg     = color-action-primary
  button-padding-x      = space-component-md
```

**Quy tắc vàng:** giao diện chỉ được dùng token tầng 2 và 3. Dùng thẳng `blue-500` trong component là phá vỡ hệ thống — đó là lý do dark mode và rebrand trở nên bất khả thi.

## 2. Các nhóm token
| Nhóm | Ví dụ |
|---|---|
| **Color** | `color-bg-surface`, `color-text-secondary`, `color-border-default`, `color-feedback-error` |
| **Typography** | `font-family-base`, `font-size-body`, `font-weight-semibold`, `line-height-tight` |
| **Spacing** | `space-1` … `space-16` → [[Spacing & Grid]] |
| **Radius** | `radius-sm/md/lg/full` |
| **Shadow / Elevation** | `shadow-1` … `shadow-4` |
| **Border** | `border-width-thin`, `border-width-focus` |
| **Motion** | `duration-fast/base/slow`, `easing-standard/enter/exit` → [[Motion & Animation]] |
| **Z-index** | `z-dropdown`, `z-modal`, `z-toast` — chuẩn hoá để hết chiến tranh `z-index: 9999` |
| **Breakpoint** | `screen-sm` … `screen-2xl` |

## 3. Quy ước đặt tên
Cấu trúc phổ biến: `[category]-[property]-[variant]-[state]`

```
color-bg-surface
color-bg-surface-hover
color-text-primary
color-text-on-accent
color-border-focus
space-component-sm
```

Nguyên tắc:
- **Mô tả vai trò, không mô tả hình thức.** `color-danger` ✅ / `color-red` ❌ (vì rồi sẽ có ngày danger không còn đỏ).
- **Nhất quán thứ tự** từ chung → riêng.
- **Đừng nhét giá trị vào tên.** `space-24` ❌ / `space-6` hoặc `space-lg` ✅.
- Tên phải đọc lên **hiểu ngay dùng ở đâu**.

## 4. Theming
Token là cơ chế làm theming:
```css
:root            { --color-bg-surface: #FFFFFF; --color-text-primary: #111827; }
[data-theme=dark]{ --color-bg-surface: #1E1E1E; --color-text-primary: #F3F4F6; }
```
Chỉ tầng **semantic** đổi giá trị; tầng component không cần biết gì. Đây là lý do tầng 2 tồn tại.
Cùng cơ chế dùng cho: dark mode, white-label nhiều thương hiệu, chế độ tương phản cao, chế độ mật độ (compact/comfortable).

## 5. Từ Figma sang code
- **Figma Variables** (trước là Styles) hỗ trợ nhiều mode (light/dark) — đây là chỗ token sống ở phía design.
- **Style Dictionary** (Amazon) — biên dịch một file token JSON ra CSS, SCSS, iOS, Android: https://styledictionary.com/
- **W3C Design Tokens Format** — chuẩn `.tokens.json` đang được thống nhất: https://tr.designtokens.org/
- Plugin đồng bộ: **Tokens Studio for Figma**: https://tokens.studio/
- Quy trình lý tưởng: token sửa trong Figma → export JSON → CI build ra các nền tảng → dev chỉ cần cập nhật package.

## 6. Checklist
- [ ] Có token nào primitive đang bị dùng trực tiếp trong component không?
- [ ] Tên token có mô tả vai trò không?
- [ ] Đổi một màu thương hiệu mất bao lâu? (nếu > 10 phút thì hệ thống chưa đúng)
- [ ] Dark mode có chạy chỉ bằng cách đổi tầng semantic không?
- [ ] Figma và code có cùng tên token không?
- [ ] Có bao nhiêu giá trị spacing/màu **thực sự** đang được dùng?

## Tham khảo
- Nathan Curtis — *Naming Tokens in Design Systems*: https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676
- Figma — *Best practices for variables*: https://help.figma.com/hc/en-us/articles/15343107948567
- Style Dictionary docs: https://styledictionary.com/
- Material Design 3 — *Design tokens*: https://m3.material.io/foundations/design-tokens/overview
- Salesforce Lightning — bộ token gốc của khái niệm này: https://www.lightningdesignsystem.com/design-tokens/

## Liên kết
[[Design System]] · [[Color Theory]] · [[Spacing & Grid]] · [[Figma]] · [[UIUX]]
