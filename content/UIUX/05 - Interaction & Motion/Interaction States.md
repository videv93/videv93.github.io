---
tags: [uiux, interaction, component]
status: growing
---
# Interaction States

> Một component chưa xong khi chưa vẽ đủ các trạng thái. Đây là khác biệt lớn nhất giữa "một hình đẹp" và "một thiết kế dùng được".

## 1. Bảng trạng thái đầy đủ
| Trạng thái | Kích hoạt bởi | Ghi chú |
|---|---|---|
| **Default / Enabled** | — | Trạng thái nghỉ |
| **Hover** | Chuột rê lên | **Không tồn tại trên cảm ứng** — không được là kênh thông tin duy nhất |
| **Focus / Focus-visible** | Tab bàn phím | **Bắt buộc**, không được xoá outline |
| **Active / Pressed** | Đang bấm giữ | Phản hồi tức thì, thường tối/lún xuống |
| **Selected / Checked** | Đã chọn | Phải phân biệt rõ với hover |
| **Disabled** | Không dùng được | Giảm opacity, không nhận sự kiện |
| **Read-only** | Xem được, không sửa | Khác disabled: vẫn chọn/copy được |
| **Loading** | Đang xử lý | Giữ nguyên kích thước |
| **Error / Invalid** | Dữ liệu sai | Màu + icon + chữ |
| **Success / Valid** | Đã đúng | Dùng tiết kiệm |
| **Empty** | Không có dữ liệu | → [[Empty & Error States]] |
| **Skeleton** | Đang tải lần đầu | Khớp kích thước thật |

## 2. Focus — chi tiết quan trọng nhất
- Dùng `:focus-visible` thay vì `:focus` để chuột không hiện ring nhưng bàn phím thì có.
- Focus ring cần tương phản **≥3:1** với cả nền và với chính phần tử. Kỹ thuật an toàn: ring hai lớp (viền trắng bên trong + viền màu bên ngoài).
- Độ dày ≥2px, có offset 2px để không dính vào phần tử.
- **Không bao giờ** `outline: none` mà không thay thế bằng chỉ báo khác.
- WCAG 2.2 bổ sung tiêu chí *Focus Appearance* (2.4.11) và *Focus Not Obscured* (2.4.11/2.4.12) — focus không được bị header dính đè lên.

## 3. Disabled — vấn đề thiết kế thật sự
Nút xám không giải thích được vì sao nó xám. Ba lựa chọn tốt hơn:
1. **Giữ nút bật**, khi bấm thì hiện lỗi cụ thể ("Cần điền email trước").
2. **Ẩn hẳn** nếu người dùng không bao giờ được dùng.
3. **Giữ disabled nhưng kèm giải thích ngay cạnh** hoặc tooltip (chú ý: phần tử disabled không nhận focus nên tooltip khó truy cập → bọc bằng wrapper).

Nếu vẫn dùng disabled: tương phản chữ vẫn nên đọc được (WCAG không yêu cầu, nhưng người dùng vẫn cần đọc).

## 4. Hover — cạm bẫy đa nền tảng
- Trên cảm ứng không có hover. Mọi thông tin chỉ hiện khi hover đều **vô hình** trên mobile.
- Nút "⋯" chỉ hiện khi hover trong bảng → trên mobile phải luôn hiện hoặc dùng nhấn giữ.
- Dùng `@media (hover: hover)` để chỉ áp dụng hiệu ứng hover trên thiết bị có chuột.

## 5. Trạng thái tổ hợp
Đừng quên các tổ hợp thật sự tồn tại: `selected + hover`, `error + focus`, `disabled + selected`, `loading + disabled`.
Cách quản trong Figma: tách state khỏi variant set chính, hoặc dùng interactive components → [[Component API & Variants]].

## 6. Checklist cho mọi component mới
- [ ] Default, hover, focus, active, disabled, loading — đủ chưa?
- [ ] Focus ring có nhìn thấy trên mọi nền không?
- [ ] Trạng thái selected có phân biệt được với hover không?
- [ ] Có thông tin nào chỉ hiện khi hover không?
- [ ] Trạng thái error có kèm icon + chữ, không chỉ màu chứ?
- [ ] Loading có làm layout nhảy không?
- [ ] Tab qua toàn màn hình — có phần tử nào "biến mất" khỏi focus không?

## Tham khảo
- WAI — *Focus Visible (2.4.7)*: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
- Sara Soueidan — *A guide to designing accessible, WCAG-conformant focus indicators*: https://www.sarasoueidan.com/blog/focus-indicators/
- NN/g — *Disabled Buttons in User Interface*: https://www.nngroup.com/articles/disabled-inputs-usability/
- Material Design 3 — *States*: https://m3.material.io/foundations/interaction/states/overview
- MDN — `:focus-visible`: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

## Liên kết
[[Button]] · [[Input & Form]] · [[Accessibility]] · [[Component API & Variants]] · [[UIUX]]
