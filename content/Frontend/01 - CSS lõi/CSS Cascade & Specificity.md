---
tags: [frontend, css]
status: evergreen
---
# CSS Cascade & Specificity

> Khi hai rule cùng nhắm một element, CSS có một thuật toán **hoàn toàn xác định** để chọn kẻ thắng. Không biết thuật toán đó thì con đường duy nhất còn lại là `!important` — và đó là cách một codebase CSS chết.

## 1. Khái niệm cốt lõi

### Thuật toán cascade — theo đúng thứ tự

Khi nhiều declaration cùng đặt một property lên một element, trình duyệt lọc lần lượt:

| # | Tiêu chí | Thắng nếu |
|---|---|---|
| 1 | **Origin & importance** | Xem bảng dưới |
| 2 | **Context** | Shadow DOM outer thắng inner (với `!important` thì ngược) |
| 3 | **Cascade layer** | Layer khai báo sau thắng (`!important` thì ngược) |
| 4 | **Specificity** | Điểm cao hơn thắng |
| 5 | **Thứ tự xuất hiện** | Cái sau cùng thắng |

Chỉ khi hoà ở bước trên mới xét bước sau. **Specificity là bước 4, không phải bước 1** — đây là hiểu lầm phổ biến nhất.

### Origin & importance — thứ tự tăng dần

| Ưu tiên | Origin |
|---|---|
| 1 (thấp nhất) | User-agent normal |
| 2 | User normal |
| 3 | Author normal |
| 4 | Animation |
| 5 | Author `!important` |
| 6 | User `!important` |
| 7 | User-agent `!important` |
| 8 (cao nhất) | Transition |

Chú ý: **`!important` của người dùng thắng `!important` của tác giả**. Đây là chủ ý của spec — cài đặt trợ năng của người dùng phải thắng được trang web.

### Specificity — ba con số

Viết dạng `(A, B, C)`:

| | Đếm cái gì | Ví dụ |
|---|---|---|
| **A** | ID selector | `#header` → (1,0,0) |
| **B** | Class, attribute, pseudo-class | `.btn`, `[href]`, `:hover` → (0,1,0) |
| **C** | Element, pseudo-element | `div`, `::before` → (0,0,1) |

So sánh **theo cột từ trái sang**, không cộng dồn: `(1,0,0)` thắng `(0,99,99)`.

| Selector | Specificity |
|---|---|
| `*` | (0,0,0) |
| `li` | (0,0,1) |
| `ul li` | (0,0,2) |
| `.nav` | (0,1,0) |
| `a:hover` | (0,1,1) |
| `#main .nav a` | (1,1,1) |
| `style="..."` | Cao hơn mọi selector |
| `!important` | Không phải specificity — nó ở bước 1 |

**Trường hợp đặc biệt:**

| Selector | Quy tắc |
|---|---|
| `:is(a, #b)` | Lấy specificity của **thành viên cao nhất** → (1,0,0) |
| `:where(a, #b)` | **Luôn (0,0,0)** — công cụ mạnh nhất để viết CSS dễ ghi đè |
| `:not(.x)` | Lấy specificity của đối số → (0,1,0) |
| `:has(.x)` | Như `:is()` — thành viên cao nhất |
| `:nth-child(2 of .x)` | (0,1,0) cộng specificity của `.x` |

### Cascade layers

```css
@layer reset, base, components, utilities;

@layer components { .btn { padding: 1rem } }
@layer utilities  { .p-0 { padding: 0 } }
```

`.p-0` thắng `.btn` **bất kể specificity**, vì `utilities` khai báo sau `components`. Đây là cách sạch nhất để giải quyết cuộc chạy đua vũ trang specificity — và là nền tảng lý thuyết cho mô hình của [[Tailwind Utility Model]].

CSS không nằm trong layer nào có ưu tiên **cao hơn** mọi layer.

## 2. Nguyên tắc

1. **Giữ specificity thấp và phẳng.** Mục tiêu là hầu hết selector ở (0,1,0). Chênh lệch specificity là thứ khiến CSS khó ghi đè.
2. **Không dùng ID để style.** ID là (1,0,0) và gần như không ghi đè nổi bằng class.
3. **`:where()` cho mọi thứ mang tính mặc định.** Reset, base style, style của thư viện — bọc trong `:where()` để người dùng ghi đè dễ dàng.
4. **`@layer` thay vì tăng specificity.** Khi cần "thắng", hãy hỏi *layer nào* trước khi hỏi *thêm class nào*.
5. **`!important` chỉ chính đáng ở hai chỗ:** utility class thực sự cuối cùng, và ghi đè style inline của bên thứ ba mà bạn không sửa được.
6. **Thứ tự file quan trọng.** Bước 5 của cascade là thứ tự xuất hiện — kiểm soát thứ tự import là một công cụ thật.
7. **Style inline không phải specificity vô hạn** — `!important` trong stylesheet vẫn thắng nó.

## 3. Cạm bẫy

- **Nghĩ specificity cộng dồn.** `(0,11,0)` **không** thắng `(1,0,0)`. So sánh theo cột.
- **Leo thang specificity.** Thêm một class để thắng, rồi người sau thêm hai, rồi `!important`. Sau sáu tháng không ai dám xoá dòng nào. Đây là cách chết điển hình của CSS quy mô lớn.
- **`!important` đấu `!important`.** Khi cả hai đều `!important`, cascade quay về so specificity — nên bạn lại ở đúng chỗ cũ.
- **Nesting làm phồng specificity âm thầm.** Lồng ba tầng trong Sass tạo `(0,3,0)` mà bạn không nhìn thấy trong file.
- **Quên rằng animation thắng declaration thường.** Đang chạy `@keyframes` thì `style.color` không ăn.
- **`:not()` với selector nặng.** `:not(#a)` mang theo (1,0,0).
- **Layer chưa khai báo thứ tự.** Nếu không có dòng `@layer a, b, c;` ở đầu, thứ tự là thứ tự *xuất hiện đầu tiên* của mỗi layer — dễ đổi ngoài ý muốn khi bundler đổi thứ tự.
- **Transition thắng cả `!important` của user-agent.** Hiếm gặp nhưng gây bối rối khi debug.

## 4. Checklist áp dụng

- [ ] Selector này có ID nào không? Bỏ được không?
- [ ] Có `!important` nào? Nó có phải utility hoặc ghi đè bên thứ ba không?
- [ ] Đã thử `@layer` trước khi tăng specificity chưa?
- [ ] Style mặc định/reset có bọc `:where()` chưa?
- [ ] DevTools Computed pane có cho thấy rule của tôi bị gạch ngang không?
- [ ] Nesting có tạo ra specificity ngoài dự tính không?
- [ ] Thứ tự layer đã khai báo tường minh ở một chỗ chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Specificity Calculator | Nhập selector, ra (A,B,C) | https://specificity.keegan.st/ |
| DevTools → Computed | Xem rule nào thắng và rule nào bị gạch | https://developer.chrome.com/docs/devtools/css |
| Stylelint `selector-max-id` | Chặn ID selector trong CI | https://stylelint.io/user-guide/rules/selector-max-id |

## Tham khảo

- MDN — *Cascade, specificity, and inheritance*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade
- MDN — *Specificity*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity
- MDN — *Cascade layers*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer
- CSSWG — *CSS Cascading and Inheritance Level 5*: https://drafts.csswg.org/css-cascade-5/

## Liên kết

[[CSS Inheritance & Value Processing]] · [[CSS Selectors]] · [[CSS Architecture]] · [[Utility-First vs Cascade]] · [[CSS Syntax & At-rules]] · [[Frontend]]
