---
tags: [frontend, css]
status: evergreen
---
# CSS Syntax & At-rules

> CSS tha thứ theo một cách rất cụ thể: nó bỏ qua thứ nó không hiểu, im lặng. Biết chính xác **phạm vi** của sự im lặng đó là kỹ năng debug CSS cơ bản nhất.

## 1. Khái niệm cốt lõi

### Cú pháp style rule

```
style-rule ::=
    selectors-list {
      properties-list
    }

selectors-list ::=
    selector[:pseudo-class] [::pseudo-element]
    [, selectors-list]

properties-list ::=
    [property : value] [; properties-list]
```

Ví dụ:

```css
strong {
  color: red;
}

div.menu-bar li:hover > ul {
  display: block;
}
```

### Quy tắc bỏ qua — thứ quan trọng nhất trong mục này

| Lỗi ở đâu | Cái gì bị bỏ |
|---|---|
| **Giá trị** không hợp lệ | Chỉ **declaration** đó |
| **Property** không nhận dạng được | Chỉ **declaration** đó |
| **Selector** không hợp lệ trong selector list | **Toàn bộ rule** |
| Thiếu `}` | Rule đó và có thể cả rule sau |

> [!warning] Một selector hỏng giết cả rule
> `h1, ::foo, p { color: red }` — trình duyệt không hiểu `::foo` nên **bỏ luôn cả `h1` và `p`**. Đây là lý do `:is()` tồn tại: `:is()` có **forgiving selector list**, selector hỏng bên trong nó chỉ làm mất nhánh đó chứ không giết cả rule.

### At-rules

At-rule bắt đầu bằng `@`. Hai dạng:

- **Statement**: kết thúc bằng `;` — `@import`, `@namespace`, `@charset`
- **Block**: có `{...}` — `@media`, `@supports`, `@layer`, `@font-face`, `@keyframes`, `@container`, `@property`, `@scope`, `@counter-style`, `@page`

| At-rule | Dùng để | Ghi chú |
|---|---|---|
| `@media` | Query viewport/thiết bị | [[Responsive Layout]] |
| `@container` | Query kích thước phần tử cha | [[Responsive Layout]] |
| `@supports` | Feature detection | Progressive enhancement |
| `@layer` | Sắp thứ tự cascade tường minh | [[CSS Cascade & Specificity]] |
| `@scope` | Giới hạn phạm vi selector | [[CSS Architecture]] |
| `@property` | Đăng ký custom property có kiểu | [[CSS Custom Properties]] |
| `@font-face` | Khai báo font | [[CSS Typography]] |
| `@keyframes` | Định nghĩa animation | [[CSS Transitions & Animations]] |
| `@page` | Style cho in ấn | Paged media |

### Comment và nesting

- Comment: `/* ... */`, không có dạng một dòng, **không lồng nhau được**.
- **Nesting** (2023+): viết rule con trong rule cha, selector con tương đối với cha. `&` trỏ tới selector cha. Đây là tính năng CSS gốc, không phải Sass.

```css
.card {
  padding: 1rem;
  & .title { font-weight: 600; }
  &:hover { border-color: currentColor; }
}
```

## 2. Nguyên tắc

1. **CSS là text-based, CSSOM là object-based.** File `.css` là văn bản Unicode; `document.styleSheets` là cây object. Sửa qua CSSOM không đổi file.
2. **`@import` nằm trên cùng và làm chậm trang.** Nó chặn tuần tự, không song song. Dùng bundler hoặc nhiều `<link>`.
3. **`@supports` để tiến lên, không phải để lùi.** Viết fallback trước, rồi `@supports` để nâng cấp.
4. **`@layer` giải quyết chiến tranh specificity ở gốc rễ** — thứ tự layer thắng mọi specificity bên trong layer.
5. **Property chưa hỗ trợ = fallback tự nhiên.** Viết `color: red; color: oklch(...)` — trình duyệt cũ giữ `red`, trình duyệt mới lấy dòng sau. Đây là fallback rẻ nhất, không cần `@supports`.
6. **Nesting gốc khác Sass ở một điểm quan trọng:** selector bắt đầu bằng tên element cần `&` phía trước trong một số ngữ cảnh; và nesting gốc **không** nối chuỗi tên class kiểu `&__title`.

## 3. Cạm bẫy

- **Một dấu `;` thiếu nuốt declaration kế tiếp.** `color: red border: 1px` → trình duyệt coi cả cụm là giá trị hỏng của `color`.
- **Selector hỏng giết cả rule** — mục 1. Đây là nguyên nhân số một của "CSS của tôi biến mất hoàn toàn".
- **Prefix của vendor đã lỗi thời.** `-webkit-`, `-moz-` phần lớn không còn cần; giữ lại chúng đôi khi *ghi đè* property chuẩn đứng trước.
- **`@charset` phải là byte đầu tiên của file.** Đứng sau bất cứ thứ gì, kể cả comment, là vô hiệu.
- **Comment lồng nhau không hoạt động.** `/* a /* b */ c */` — comment đóng ở `*/` đầu tiên, phần `c */` thành CSS rác.
- **Nhầm nesting gốc với Sass.** Không có `@extend`, không có `&__modifier`, không có biến `$`.
- **Đơn vị bị bỏ quên = giá trị hỏng.** `width: 20` (thiếu `px`) bị bỏ im lặng. Chỉ `0` được phép không đơn vị.

## 4. Checklist áp dụng

- [ ] Khi cả một block CSS "biến mất", đã kiểm tra selector list có ký tự lạ chưa?
- [ ] DevTools có gạch ngang declaration nào không? (dấu hiệu giá trị hỏng)
- [ ] Có `@import` nào trong đường tải tới hạn không?
- [ ] Đã dùng `@supports` để nâng cấp thay vì để loại trừ chưa?
- [ ] Mọi giá trị số khác 0 có đơn vị chưa?
- [ ] Đã cân nhắc `@layer` thay vì tăng specificity chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| W3C CSS Validator | Bắt lỗi cú pháp toàn file | https://jigsaw.w3.org/css-validator/ |
| Stylelint | Lint trong editor và CI | https://stylelint.io/ |
| DevTools Styles pane | Declaration hỏng bị gạch ngang | https://developer.chrome.com/docs/devtools/css |

## Tham khảo

- MDN — *CSS reference*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- MDN — *CSS syntax module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax
- MDN — *At-rules*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules
- MDN — *CSS nesting module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting
- CSSWG — *CSS Syntax Level 3*: https://drafts.csswg.org/css-syntax/

## Liên kết

[[CSS Cascade & Specificity]] · [[CSS Selectors]] · [[CSS Values & Units]] · [[CSS Custom Properties]] · [[CSS Modules Map]] · [[Frontend]]
