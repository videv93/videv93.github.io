---
tags: [uiux, component]
status: growing
---
# Tooltip

> Tooltip là **thông tin bổ trợ**, không bao giờ là thông tin thiết yếu. Nếu người dùng *phải* đọc nó mới dùng được, nó không nên là tooltip.

## 1. Nguyên tắc cốt lõi
- **Dùng tooltip một cách có chừng mực** — mỗi tooltip là dấu hiệu giao diện chưa đủ tự giải thích.
- **Nội dung phải có nghĩa và đúng ngữ cảnh** — đừng lặp lại y nguyên nhãn đã nhìn thấy.
- **Dùng con trỏ pointer** khi hover lên phần tử có tooltip, để báo hiệu có tương tác.
- Ngắn: 1–2 câu, dưới ~20 từ.
- **Không đặt nội dung thiết yếu hoặc phần tử tương tác** (link, nút) trong tooltip — người dùng cảm ứng và bàn phím có thể không tới được.

## 2. Tooltip vs các họ hàng
| Component | Kích hoạt | Nội dung | Ghi chú |
|---|---|---|---|
| **Tooltip** | Hover / focus | Nhãn hoặc mô tả ngắn | Tự ẩn, không tương tác được |
| **Popover** | Click | Nội dung phong phú, có nút | Ở lại đến khi đóng |
| **Toggletip** | Click vào icon ⓘ | Giải thích thêm | Truy cập được bằng bàn phím, dùng `role="status"` |
| **Inline hint** | Luôn hiển thị | Hướng dẫn ngắn | An toàn nhất — ưu tiên nếu có chỗ |
| **Coach mark** | Lần đầu dùng | Giới thiệu tính năng | Chỉ cho onboarding, phải bỏ qua được |

> Với icon-only button, thứ bạn cần thường là **tooltip nhãn** (`aria-label` + tooltip hiển thị cùng nội dung), không phải mô tả dài.

## 3. Hành vi
- **Delay xuất hiện** ~300–500ms để tránh nhấp nháy khi rê chuột qua; nhưng nếu vừa rời một tooltip khác thì hiện ngay.
- **Delay biến mất** ~100–300ms, và giữ tooltip khi chuột đi vào chính nó (nếu cho phép chọn chữ).
- **Tự lật vị trí** khi gần mép màn hình.
- **Có mũi tên** trỏ vào phần tử nguồn.
- Trên **thiết bị cảm ứng không có hover** → chuyển sang toggletip bấm được, hoặc hiện inline. Đây là lỗi hay gặp nhất.
- Không che mất chính phần tử đang được mô tả.

## 4. Accessibility
- Dùng `aria-describedby` trỏ tới tooltip cho *mô tả*, `aria-labelledby`/`aria-label` cho *nhãn*.
- Phải hiện khi phần tử nhận **focus** bằng bàn phím, không chỉ khi hover.
- Đóng được bằng **Esc**.
- Tương phản chữ/nền của tooltip ≥ 4.5:1.
- WCAG 1.4.13 (Content on Hover or Focus): nội dung hiện ra phải **dismissable, hoverable, persistent**.

## 5. Khi nào nên bỏ tooltip đi
- Nếu tooltip giải thích một icon → thêm nhãn chữ vào icon.
- Nếu tooltip giải thích một trường form → dùng helper text luôn hiển thị.
- Nếu tooltip dài hơn 2 câu → chuyển thành popover hoặc link tới tài liệu.

## 6. Checklist
- [ ] Nội dung này có thể hiển thị luôn thay vì giấu trong tooltip không?
- [ ] Tooltip có hiện khi focus bằng bàn phím không?
- [ ] Trên mobile thì sao?
- [ ] Có phần tử bấm được nào bên trong tooltip không? (không được có)
- [ ] Tooltip có tự lật khi gần mép màn hình không?
- [ ] Tương phản có đạt 4.5:1 không?

## Tham khảo
- NN/g — *Tooltip Guidelines*: https://www.nngroup.com/articles/tooltip-guidelines/
- UX Planet — *How to design and style better tooltips*: https://uxplanet.org/how-to-design-and-style-better-tooltips-3085f718d24a
- Inclusive Components — *Tooltips & Toggletips*: https://inclusive-components.design/tooltips-toggletips/
- WCAG 2.2 — *1.4.13 Content on Hover or Focus*: https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
- WAI-ARIA APG — *Tooltip Pattern*: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

## Liên kết
[[Iconography & Imagery]] · [[Accessibility]] · [[UX Writing]] · [[UIUX]]
