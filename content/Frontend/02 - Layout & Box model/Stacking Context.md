---
tags: [frontend, css, layout]
status: evergreen
---
# Stacking Context

> `z-index: 9999` không hoạt động không phải vì số chưa đủ lớn — mà vì element của bạn đang ở trong một **stacking context** khác, nơi mọi số đều bị đóng khung.

## 1. Khái niệm cốt lõi

### Stacking context là gì

Một **hộp kín về thứ tự vẽ**. Bên trong nó, con cái xếp lớp với nhau theo `z-index`. Nhưng **toàn bộ context được vẽ như một đơn vị duy nhất** ở lớp của element gốc.

Hệ quả: một element `z-index: 9999` bên trong context có `z-index: 1` sẽ **luôn** nằm dưới một element `z-index: 2` ở context cha. `9999` chỉ có nghĩa *bên trong* hộp của nó.

### Cái gì tạo stacking context

| Nguyên nhân | Ghi chú |
|---|---|
| `:root` | Context gốc |
| `position` ≠ `static` **và** `z-index` ≠ `auto` | Trường hợp cổ điển |
| `position: fixed` / `sticky` | **Luôn** tạo, kể cả `z-index: auto` |
| `opacity` < 1 | ⚠️ Cạm bẫy hàng đầu |
| `transform`, `scale`, `rotate`, `translate`, `perspective` ≠ `none` | |
| `filter`, `backdrop-filter` ≠ `none` | |
| `mix-blend-mode` ≠ `normal` | |
| `isolation: isolate` | ⚠️ Cách **cố ý** tạo, không tác dụng phụ |
| `will-change` với property tạo context | |
| `contain: layout` / `paint` / `strict` / `content` | |
| Flex/grid **item** có `z-index` ≠ `auto` | Không cần `position` |
| `container-type` ≠ `normal` | |
| Element trong top layer (`<dialog>` modal, popover) | |

### Thứ tự vẽ bên trong một stacking context

Từ dưới lên:

1. Background và border của element tạo context
2. Con có `z-index` **âm**
3. Block-level, không positioned
4. Float, không positioned
5. Inline content
6. Con có `z-index: 0` hoặc `auto`, positioned
7. Con có `z-index` **dương**

Điểm đáng nhớ: **`z-index: -1` đưa element xuống dưới nội dung của cha nhưng vẫn trên background của cha.**

### `isolation: isolate`

Property duy nhất tạo stacking context mà **không kèm bất kỳ hiệu ứng thị giác nào**. Dùng nó khi muốn đóng khung `z-index` của một component để nó không rò rỉ ra ngoài:

```css
.card { isolation: isolate; }   /* z-index bên trong .card không đấu với trang */
```

Đây chính là utility `isolate` của Tailwind — xem [[Tailwind Layout Utilities]].

## 2. Nguyên tắc

1. **Đóng khung `z-index` theo component bằng `isolation: isolate`.** Đây là cách duy nhất để `z-index` mở rộng được theo quy mô dự án.
2. **Dùng thang z-index đặt tên**, không phải số ma:
   ```css
   :root { --z-dropdown: 10; --z-sticky: 20; --z-modal: 30; --z-toast: 40; }
   ```
3. **Đừng bao giờ leo thang số.** `9999` → `99999` là dấu hiệu bạn đang ở sai stacking context, không phải sai số.
4. **Modal nên dùng `<dialog>` + `showModal()`.** Nó vào **top layer** — một lớp nằm trên toàn bộ document, hoàn toàn thoát khỏi trò chơi z-index. Popover API cũng vậy.
5. **`opacity: 0.99` là một hack có thật** để tạo stacking context — nhưng `isolation: isolate` sạch hơn, hãy dùng nó.
6. **Kiểm tra stacking context trước khi đổi z-index.** DevTools cho biết element nào tạo context.

## 3. Cạm bẫy

- **`opacity` < 1 tạo stacking context.** Một hiệu ứng fade-in vô hại làm hỏng toàn bộ z-index của cây con — cạm bẫy số một.
- **`transform` cũng vậy.** Animation trượt vào làm dropdown bên trong bị kẹt dưới.
- **`position: fixed` luôn tạo context** kể cả không có `z-index` — nên `z-index` bên trong header cố định không đấu được với trang.
- **`overflow: hidden` cắt nội dung dù z-index đúng.** Hai vấn đề khác nhau, triệu chứng giống nhau. Xem [[Block Formatting Context]].
- **Nghĩ `z-index` cần `position`.** Đúng với block layout, **sai** với flex/grid item — chúng dùng `z-index` trực tiếp.
- **`z-index: -1` biến mất hoàn toàn** khi cha có background — nó nằm dưới background của **cha xa hơn**, không phải cha trực tiếp.
- **`mix-blend-mode` trên một element vô tình cô lập cả cụm.**
- **Portal trong React không thoát khỏi stacking context nếu render vào một node đã bị cô lập.** Render vào `document.body` mới thoát.

## 4. Checklist áp dụng

- [ ] Element này nằm trong stacking context nào? Có tổ tiên nào có `opacity`/`transform`/`filter` không?
- [ ] Vấn đề là z-index hay là `overflow: hidden`?
- [ ] Component có `isolation: isolate` để đóng khung z-index chưa?
- [ ] Có thang z-index đặt tên ở một chỗ chưa?
- [ ] Modal này có dùng `<dialog>`/Popover API để vào top layer được không?
- [ ] Tôi có đang tăng số thay vì sửa nguyên nhân không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| DevTools → Layers | Xem cây layer 3D thật | https://developer.chrome.com/docs/devtools/rendering |
| DevTools → Elements → Computed | Cho biết element có tạo stacking context không | https://developer.chrome.com/docs/devtools/css |
| CSS Stacking Context Inspector | Extension trực quan hoá cây context | https://github.com/andreadev-it/stacking-contexts-inspector |

## Tham khảo

- MDN — *Stacking context*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context
- MDN — *CSS positioned layout module*: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout
- MDN — *`isolation`*: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation
- MDN — *Top layer*: https://developer.mozilla.org/en-US/docs/Glossary/Top_layer
- CSSWG — *CSS Positioned Layout Level 3, painting order*: https://drafts.csswg.org/css-position-3/#painting-order

## Liên kết

[[Containing Block & Positioned Layout]] · [[Block Formatting Context]] · [[Browser Rendering Pipeline]] · [[Tailwind Layout Utilities]] · [[Modal & Dialog]] · [[Frontend]]
