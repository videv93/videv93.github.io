---
tags: [frontend, css, kiến-trúc]
status: evergreen
---
# CSS Architecture

> Mọi phương pháp luận CSS đều đang giải **cùng một bài toán**: CSS có phạm vi toàn cục, nên khi codebase lớn lên, không ai dám xoá một dòng nào. Khác nhau chỉ ở chỗ chúng chọn **hy sinh cái gì**.

## 1. Khái niệm cốt lõi

### Bài toán gốc

| Vấn đề | Biểu hiện |
|---|---|
| **Phạm vi toàn cục** | `.title` ở hai component đá nhau |
| **Cascade khó đoán** | Không biết rule nào sẽ thắng |
| **Chiến tranh specificity** | Leo thang tới `!important` |
| **Không xoá được** | Không biết class nào còn dùng |
| **Chỉ tăng, không giảm** | File CSS chỉ phình ra theo thời gian |

### So sánh các phương pháp

| Cách tiếp cận | Giải phạm vi bằng | Đánh đổi |
|---|---|---|
| **BEM** | Quy ước đặt tên (`.block__element--modifier`) | Kỷ luật của con người; tên dài |
| **ITCSS / 7-1** | Sắp thứ tự file theo specificity tăng dần | Cần hiểu toàn hệ thống |
| **CSS Modules** | Build tool băm tên class | Cần bundler |
| **CSS-in-JS** | Sinh class lúc runtime/build | Chi phí runtime; tách CSS khó |
| **Shadow DOM** | Trình duyệt cách ly thật | Style xuyên qua rất khó — [[Web Components]] |
| **`@scope`** | Trình duyệt cách ly, không cần build | Còn mới |
| **Cascade layers** | Sắp thứ tự tường minh | Không giải phạm vi, chỉ giải thứ tự |
| **Utility-first** | Không có tên nào để đụng độ | Markup dày đặc — [[Utility-First vs Cascade]] |

### BEM

```css
.card { }                    /* Block  — thực thể độc lập */
.card__title { }             /* Element — bộ phận của block */
.card--featured { }          /* Modifier — biến thể */
```

Mọi selector đều là một class đơn → **specificity phẳng (0,1,0)**. Đây mới là giá trị thật của BEM, không phải bản thân cái tên.

### `@scope` — cách ly gốc của CSS

```css
@scope (.card) to (.card__content) {
  img { border-radius: 8px; }        /* chỉ ảnh trong .card, ngoài .card__content */
}
```

`to` định nghĩa **donut scope** — vùng bị loại trừ. Đây là thứ CSS Modules và BEM cùng mô phỏng bằng cách khác nhau, giờ đã là tính năng gốc.

### Kiến trúc file khuyến nghị

```
styles/
  01-settings/    token, biến        → @layer reset
  02-tools/       mixin, function
  03-generic/     reset, normalize   → @layer base
  04-elements/    style thẻ trần
  05-objects/     pattern layout     → @layer layout
  06-components/  component          → @layer components
  07-utilities/   utility            → @layer utilities
```

Kết hợp với `@layer reset, base, layout, components, utilities;` khai báo ở một chỗ duy nhất — thứ tự cascade khi đó **độc lập với thứ tự import**, xoá bỏ cả một lớp lỗi.

## 2. Nguyên tắc

1. **Giữ specificity phẳng.** Mục tiêu: hầu hết selector ở (0,1,0). Đây là mẫu số chung của mọi phương pháp thành công.
2. **Khai báo thứ tự `@layer` ở một chỗ duy nhất, sớm nhất.**
3. **Token ở `:root`, component tiêu thụ token.** Xem [[CSS Custom Properties]] và [[Design Tokens]].
4. **Colocate CSS với component.** Dù bằng CSS Modules, `.module.css`, hay utility trong markup — CSS ở xa component là CSS không ai dám xoá.
5. **Đặt tên theo vai trò, không theo hình dáng.** `.alert--danger` chứ không `.alert--red`.
6. **Chọn một phương pháp và tuân thủ.** Codebase trộn ba phương pháp tệ hơn bất kỳ phương pháp nào trong ba.
7. **Đo CSS chết.** Coverage tool của DevTools cho biết bao nhiêu % CSS không dùng ở lần tải đầu.
8. **`:where()` cho style mặc định của thư viện** — để người dùng ghi đè không cần đấu specificity.

## 3. Cạm bẫy

- **Chọn phương pháp trước khi hiểu bài toán.** Dự án 5 trang không cần ITCSS.
- **Trộn phương pháp.** BEM + utility + CSS-in-JS trong một repo = không ai biết sửa ở đâu.
- **Nesting sâu tái tạo đúng vấn đề BEM giải.** Ba tầng lồng = (0,3,0) mà bạn không thấy.
- **CSS-in-JS runtime tốn chi phí mỗi lần render** và xung đột với [[React Server Components]] (không chạy được trên server). Nhiều thư viện đã chuyển sang zero-runtime vì lý do này.
- **`@layer` mà không khai báo thứ tự trước** → thứ tự phụ thuộc bundler.
- **Utility-first mà không có component layer** khiến sửa một nút phải sửa 40 chỗ. Xem [[Utility-First vs Cascade]].
- **Không bao giờ xoá CSS.** Coverage 8% là con số thật ở nhiều dự án lớn.
- **Shadow DOM rồi phát hiện không style xuyên vào được.** Cần `::part()` và custom property từ đầu.
- **Quy ước đặt tên không được lint** thì chỉ là gợi ý.

## 4. Checklist áp dụng

- [ ] Dự án này có một phương pháp CSS được chọn tường minh chưa?
- [ ] Specificity có phẳng không? Có ID selector nào không?
- [ ] `@layer` đã khai báo thứ tự ở một chỗ chưa?
- [ ] CSS có nằm cạnh component không?
- [ ] Có cách nào biết một class còn được dùng hay không?
- [ ] Đã chạy Coverage để xem CSS chết chưa?
- [ ] Token có tách khỏi component chưa?
- [ ] Quy ước đặt tên có được stylelint kiểm không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Stylelint | Ép quy ước, chặn ID selector, giới hạn nesting | https://stylelint.io/ |
| DevTools Coverage | Đo % CSS không dùng | https://developer.chrome.com/docs/devtools/coverage |
| CSS Stats | Thống kê specificity, số màu, số font | https://cssstats.com/ |
| PurgeCSS | Loại CSS không dùng lúc build | https://purgecss.com/ |

## Tham khảo

- MDN — *CSS scoping module / `@scope`*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scoping
- MDN — *Cascade layers*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer
- BEM — *Methodology*: https://en.bem.info/methodology/
- Harry Roberts — *ITCSS*: https://csswizardry.com/2018/11/itcss-scalable-and-maintainable-css-architecture/
- CSSWG — *CSS Cascading and Inheritance Level 5*: https://drafts.csswg.org/css-cascade-5/

## Liên kết

[[CSS Cascade & Specificity]] · [[CSS Custom Properties]] · [[Utility-First vs Cascade]] · [[Component Library Strategy]] · [[Design System]] · [[Frontend]]
