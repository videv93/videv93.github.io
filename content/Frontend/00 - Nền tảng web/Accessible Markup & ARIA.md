---
tags: [frontend, nền-tảng, a11y]
status: evergreen
---
# Accessible Markup & ARIA

> Tầng **implementation** của trợ năng. Phần nguyên tắc thiết kế (tương phản, kích thước target, thứ bậc thị giác) sống ở [[Accessibility]] bên UIUX — note này chỉ nói về markup và code.

## 1. Khái niệm cốt lõi

### Accessibility tree

Trình duyệt dựng một cây song song với DOM, chỉ chứa thông tin mà công nghệ hỗ trợ cần. Mỗi node có bốn thuộc tính:

| Thuộc tính | Câu hỏi nó trả lời | Đến từ đâu |
|---|---|---|
| **Role** | Nó là cái gì? | Tên thẻ, hoặc `role=` |
| **Name** | Nó tên gì? | Nội dung, `<label>`, `aria-label` |
| **State** | Nó đang thế nào? | `checked`, `disabled`, `aria-expanded` |
| **Value** | Giá trị hiện tại? | `value`, `aria-valuenow` |

Nếu một element thiếu **name**, screen reader chỉ đọc được role — "button", không biết button gì.

### Năm quy tắc ARIA

1. **Đừng dùng ARIA nếu HTML đã có sẵn.** `<button>` tốt hơn `<div role="button">` về mọi mặt.
2. **Đừng đổi nghĩa gốc của element.** `<h2 role="button">` làm gãy điều hướng heading.
3. **Mọi widget ARIA phải dùng được bằng bàn phím.** `role="button"` mà không xử lý Enter/Space là widget hỏng.
4. **Đừng dùng `role="presentation"` hoặc `aria-hidden="true"` trên element focus được.** Tạo ra "bẫy vô hình": tab tới được nhưng screen reader không đọc.
5. **Mọi element tương tác phải có accessible name.**

> [!warning] ARIA sai còn tệ hơn không có ARIA
> Không có ARIA thì screen reader dùng mặc định của HTML — thường đúng. ARIA sai thì nó *ghi đè* mặc định đúng bằng thông tin sai.

### Bộ attribute hay dùng

| Attribute | Dùng khi |
|---|---|
| `aria-label` | Element không có text nhìn thấy (icon button) |
| `aria-labelledby` | Nhãn đã tồn tại ở nơi khác trên trang |
| `aria-describedby` | Text mô tả/lỗi bổ sung |
| `aria-expanded` | Accordion, dropdown, disclosure |
| `aria-current="page"` | Mục đang active trong nav |
| `aria-live="polite"` | Vùng nội dung cập nhật động (toast, kết quả tìm kiếm) |
| `aria-hidden="true"` | Icon trang trí, nội dung trùng lặp |
| `inert` | Cả một nhánh bị vô hiệu (nền phía sau modal) |

## 2. Nguyên tắc

1. **Semantic HTML trước, ARIA sau.** Xem [[Semantic HTML]]. ARIA chỉ để lấp chỗ HTML không diễn đạt được.
2. **Thứ tự DOM = thứ tự tab.** Đừng dùng CSS `order` hay `grid-area` để đảo thứ tự thị giác khác thứ tự đọc — người dùng bàn phím sẽ nhảy loạn.
3. **`tabindex` chỉ có hai giá trị hợp lý:** `0` (đưa vào thứ tự tự nhiên) và `-1` (focus được bằng script, không bằng tab). **Không bao giờ dùng số dương.**
4. **Focus phải nhìn thấy được.** Không `outline: none` trừ khi đã thay bằng chỉ báo rõ hơn. Dùng `:focus-visible` để chỉ hiện với người dùng bàn phím.
5. **Quản lý focus khi UI thay đổi.** Mở modal → focus vào modal; đóng → trả focus về nút đã mở nó. Điều hướng SPA → thông báo trang mới.
6. **Thông báo động cần live region.** Cập nhật DOM âm thầm là vô hình với screen reader.
7. **Tôn trọng `prefers-reduced-motion`.** Xem [[CSS Transitions & Animations]].

## 3. Cạm bẫy

- **Icon button không nhãn.** `<button><svg/></button>` được đọc là "button". Thêm `aria-label="Đóng"`.
- **Placeholder thay label.** Placeholder biến mất khi gõ, tương phản thấp, và nhiều screen reader không đọc. Xem [[HTML Forms & Validation]].
- **`outline: none` trong CSS reset.** Cực kỳ phổ biến và làm trang không dùng được bằng bàn phím.
- **Modal không bẫy focus.** Tab đi ra sau nền, người dùng lạc mất.
- **`aria-live` trên vùng chưa tồn tại lúc load.** Live region phải có mặt trong DOM *trước* khi nội dung đổi, nếu không sẽ không thông báo.
- **Lạm dụng `role="application"`.** Nó tắt toàn bộ phím tắt của screen reader.
- **Kiểm thử tự động rồi tưởng là xong.** axe bắt được ~30–40% vấn đề. Phần còn lại cần dùng bàn phím và screen reader thật.
- **`aria-hidden="true"` trên element cha của thứ đang focus** — bẫy vô hình, quy tắc 4.

## 4. Checklist áp dụng

- [ ] Rút phích chuột: mọi chức năng có dùng được bằng bàn phím không?
- [ ] Focus ring có luôn nhìn thấy được không?
- [ ] Mọi icon button có `aria-label` không?
- [ ] Modal có bẫy focus và trả focus khi đóng không?
- [ ] Có `tabindex` dương nào không? (phải bằng 0)
- [ ] Nội dung cập nhật động có nằm trong live region không?
- [ ] Đã chạy axe **và** đọc thử bằng VoiceOver/NVDA chưa?
- [ ] Thứ tự DOM có khớp thứ tự thị giác không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| axe DevTools | Quét tự động, ít false positive | https://www.deque.com/axe/devtools/ |
| VoiceOver (macOS) | Screen reader sẵn có, `Cmd+F5` | https://support.apple.com/guide/voiceover/ |
| NVDA (Windows) | Screen reader miễn phí phổ biến nhất | https://www.nvaccess.org/ |
| Accessibility Insights | Hướng dẫn kiểm thử thủ công từng bước | https://accessibilityinsights.io/ |
| eslint-plugin-jsx-a11y | Bắt lỗi ngay trong editor | https://github.com/jsx-eslint/eslint-plugin-jsx-a11y |

## Tham khảo

- W3C — *WAI-ARIA Authoring Practices Guide (APG)*: https://www.w3.org/WAI/ARIA/apg/
- W3C — *Using ARIA: rules of ARIA use*: https://www.w3.org/TR/using-aria/
- MDN — *ARIA reference*: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- W3C — *WCAG 2.2*: https://www.w3.org/TR/WCAG22/

## Liên kết

[[Semantic HTML]] · [[HTML Forms & Validation]] · [[Accessibility]] · [[Interaction States]] · [[Frontend Testing Strategy]] · [[Frontend]]
