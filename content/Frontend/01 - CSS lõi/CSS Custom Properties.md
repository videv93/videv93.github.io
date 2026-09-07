---
tags: [frontend, css]
status: evergreen
---
# CSS Custom Properties

> Khác biệt cốt lõi so với biến Sass: custom property **sống trong cascade**. Chúng kế thừa, đổi được theo media query, theo class, theo JavaScript, lúc runtime. Biến Sass biến mất khi build xong.

## 1. Khái niệm cốt lõi

### Cú pháp

```css
:root {
  --brand: oklch(0.55 0.18 260);
  --space: 1rem;
}

.card {
  background: var(--brand);
  padding: var(--space, 0.5rem);   /* 0.5rem là fallback */
}
```

- Tên phân biệt hoa thường, bắt buộc bắt đầu bằng `--`.
- Giá trị là **token stream gần như tuỳ ý** — nó không được kiểm tra kiểu cho tới lúc thay thế.
- **Kế thừa** như mọi property text-like.

### Custom property vs biến Sass

| | Custom property | Biến Sass |
|---|---|---|
| Tồn tại lúc runtime | ✅ | ❌ |
| Kế thừa theo cascade | ✅ | ❌ |
| Đổi theo media query / class | ✅ | ❌ |
| Đọc/ghi từ JS | ✅ | ❌ |
| Dùng trong tên selector, media query | ❌ | ✅ |
| Tính toán lúc build | ❌ | ✅ |

### `@property` — custom property có kiểu

```css
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
```

Ba thứ nó mở khoá:
1. **Animate được.** Custom property thường không animate (trình duyệt coi nó là chuỗi); có `syntax` thì trình duyệt biết cách nội suy.
2. **Kiểm tra kiểu.** Giá trị sai kiểu rơi về `initial-value` thay vì làm hỏng declaration.
3. **Kiểm soát kế thừa** qua `inherits: false`.

### `env()` — biến môi trường

Do trình duyệt/OS cung cấp, phạm vi toàn document:

```css
padding-bottom: env(safe-area-inset-bottom, 0px);
```

Dùng cho notch, home indicator, viewport segment của thiết bị gập.

## 2. Nguyên tắc

1. **Định nghĩa token ở `:root`, ghi đè ở component.** Đây là toàn bộ mô hình theming — xem [[CSS Color & Theming]] và [[Design Tokens]] bên UIUX.
2. **Luôn có fallback trong `var()`** cho property quan trọng: `var(--x, 1rem)`.
3. **Đặt tên theo ngữ nghĩa, không theo giá trị.** `--color-danger` chứ không `--red`. Khi đổi màu thương hiệu, tên vẫn đúng.
4. **Hai tầng token.** Tầng nguyên thuỷ (`--blue-600`) và tầng ngữ nghĩa (`--color-primary: var(--blue-600)`). Component chỉ chạm tầng hai.
5. **`@property` cho mọi custom property cần animate** — không có nó thì gradient/angle không transition được.
6. **Ghi đè theo phạm vi, không theo điều kiện.** Thay vì viết lại rule trong `@media`, chỉ đổi giá trị biến trong `@media`.
7. **Đọc/ghi từ JS bằng API property**, không phải `style.foo`:
   ```js
   el.style.setProperty('--x', '10px');
   getComputedStyle(el).getPropertyValue('--x');
   ```

## 3. Cạm bẫy

- **`var()` không dùng được trong media query.** `@media (min-width: var(--bp))` **không hoạt động** — media query được đánh giá trước khi cascade giải quyết biến. Đây là hạn chế thật, và là lý do breakpoint vẫn phải là biến Sass hoặc số cứng.
- **Không nối chuỗi được.** `--size: 10; width: var(--size)px` sai. Phải `calc(var(--size) * 1px)`.
- **Giá trị không hợp lệ ≠ fallback.** Fallback trong `var(--x, y)` chỉ dùng khi `--x` **không được định nghĩa**. Nếu `--x` được định nghĩa nhưng giá trị sai kiểu, property trở thành **invalid at computed-value time** — nó rơi về `unset` (kế thừa hoặc initial), **không** về fallback. Đây là cạm bẫy tinh vi nhất của custom property; `@property` với `initial-value` là cách chữa.
- **Không animate được nếu chưa `@property`.**
- **Đặt quá nhiều biến trên `:root` gây chi phí style recalc** khi một biến đổi — mọi element kế thừa nó phải tính lại. Đặt phạm vi hẹp nhất có thể.
- **Khoảng trắng được giữ nguyên.** `--x: red;` có giá trị là ` red` (kèm space). Thường vô hại nhưng gây lỗi khi nối chuỗi.
- **Tưởng nó bị bundler xử lý.** Custom property đi thẳng vào file CSS; đặt tên trùng với thư viện là ghi đè thật.

## 4. Checklist áp dụng

- [ ] Token có tên theo ngữ nghĩa không?
- [ ] Có tách tầng nguyên thuỷ và tầng ngữ nghĩa chưa?
- [ ] Custom property cần animate đã khai `@property` chưa?
- [ ] `var()` quan trọng có fallback chưa?
- [ ] Dark mode có làm bằng cách đổi **giá trị biến** thay vì viết lại rule không?
- [ ] Có chỗ nào cố dùng `var()` trong media query không?
- [ ] Biến có được đặt ở phạm vi hẹp nhất cần thiết không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Style Dictionary | Sinh token đa nền tảng | https://styledictionary.com/ |
| DevTools → Computed (filter `--`) | Xem mọi custom property đang áp dụng | https://developer.chrome.com/docs/devtools/css |
| PostCSS custom-properties | Fallback cho trình duyệt rất cũ | https://github.com/postcss/postcss-custom-properties |

## Tham khảo

- MDN — *CSS custom properties for cascading variables*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables
- MDN — *CSS properties and values API / @property*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property
- MDN — *CSS environment variables*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables
- CSSWG — *CSS Custom Properties Level 1*: https://drafts.csswg.org/css-variables/

## Liên kết

[[CSS Values & Units]] · [[CSS Color & Theming]] · [[Tailwind Theme & Configuration]] · [[Design Tokens]] · [[CSS Architecture]] · [[Frontend]]
