---
tags: [uiux, visual, color]
status: growing
---
# Color Theory

> Màu không chỉ làm đẹp — nó định hình cảm xúc và dẫn dắt hành vi (đỏ cho lỗi/huỷ, xanh lá cho thành công/xác nhận).

## 1. Quy tắc 60 – 30 – 10
- **60% — Màu chủ đạo (Dominant) 🤍**: thường là nền — trắng, xám nhạt, hoặc đen/xám tối ở Dark Mode. Tạo không gian thở, chiếm diện tích lớn nhất.
- **30% — Màu phụ (Secondary) 💙**: dùng cho card, menu, navigation bar, văn bản. Phân chia cấu trúc, tạo tương phản nhẹ với nền.
- **10% — Màu điểm nhấn (Accent) 🧡**: nổi bật nhất, dành cho CTA, badge thông báo, khuyến mãi — thứ muốn người dùng chú ý ngay.

> Hệ quả quan trọng: **màu thương hiệu không phải màu nền.** Nếu app tô xanh khắp nơi thì không còn gì để làm nút chính nổi bật (**Von Restorff Effect**).

## 2. Cấu trúc bảng màu của một sản phẩm
| Nhóm | Vai trò |
|---|---|
| **Primary** | Hành động chính, nhận diện thương hiệu |
| **Neutral / Gray** | 80% giao diện: nền, viền, chữ. Cần **9–12 bậc** — đây là nhóm quan trọng nhất và hay bị làm ẩu nhất |
| **Semantic** | success (xanh lá) · warning (vàng/cam) · error (đỏ) · info (xanh dương) |
| **Accent / Secondary** | Nhấn phụ, biểu đồ, tag |
| **Surface / Overlay** | Nền card, modal, lớp phủ |

**Thang bậc (scale):** mỗi màu nên có 9–11 bậc, đánh số `50, 100, 200 … 900`. Bậc 500 là màu gốc. Cách tạo: đổi **lightness** và giảm nhẹ **saturation** ở hai đầu (bậc rất sáng và rất tối cần bớt bão hoà để không bị chói/đục).

## 3. Không gian màu — nên biết
- **HEX / RGB** — dùng để xuất, không dùng để tư duy.
- **HSL** — dễ chỉnh tay (Hue, Saturation, Lightness), nhưng độ sáng cảm nhận không đều: `hsl(60, 100%, 50%)` (vàng) sáng hơn hẳn `hsl(240, 100%, 50%)` (xanh dương) dù cùng L=50%.
- **OKLCH / LCH** — không gian **đồng nhất theo cảm nhận**: cùng L thì trông cùng độ sáng. Đây là cách hiện đại để tạo palette đều tay. Trình duyệt đã hỗ trợ `oklch()` trong CSS.

## 4. Tương phản & khả năng đọc
Chuẩn **WCAG 2.2**:
- Chữ thường: tỉ lệ tương phản ≥ **4.5:1** (AA), ≥ 7:1 (AAA)
- Chữ lớn (≥18.66px bold hoặc ≥24px): ≥ **3:1**
- Thành phần giao diện & icon có nghĩa: ≥ **3:1**

**Không bao giờ dùng màu làm kênh thông tin duy nhất** — ~8% nam giới bị mù màu đỏ-lục. Luôn kèm icon, chữ, hoặc hoa văn. → [[Accessibility]]

## 5. Dark Mode
- **Đừng đảo ngược màu.** Nền tối nên là `#121212`–`#1E1E1E` chứ không phải đen tuyền (đen tuyền + chữ trắng gây "halation", mỏi mắt).
- Giảm **saturation** của màu thương hiệu ở dark mode, nếu không sẽ rung mắt.
- Ở dark mode, **độ cao (elevation) thể hiện bằng bề mặt sáng dần**, không phải bằng bóng đổ.
- Thiết kế bằng **token ngữ nghĩa** (`surface`, `text-primary`) chứ không phải màu tuyệt đối → [[Design Tokens]].

## 6. Ý nghĩa văn hoá
Đỏ = nguy hiểm ở phương Tây nhưng = may mắn/thịnh vượng ở Việt Nam & Trung Quốc; trong biểu đồ chứng khoán Á Đông, **đỏ = tăng, xanh = giảm** (ngược với Mỹ). Kiểm tra ngữ cảnh thị trường trước khi gán nghĩa cho màu.

## 7. Checklist
- [ ] Có đúng **một** màu accent cho hành động chính không?
- [ ] Thang xám có đủ ~9 bậc không?
- [ ] Mọi cặp chữ/nền đã đạt 4.5:1 chưa?
- [ ] Trạng thái lỗi có kèm icon + chữ, không chỉ màu đỏ chứ?
- [ ] Đã thử ở dark mode chưa?
- [ ] Palette đã được đặt tên theo *vai trò* chứ không theo *màu* chưa? (`--color-danger` ✅ vs `--color-red` ❌)

## Công cụ
- **Coolors** — tạo palette nhanh: https://coolors.co/
- **Realtime Colors** — thử palette trên giao diện thật: https://www.realtimecolors.com/
- **Radix Colors** — bộ thang màu có tính toán accessibility sẵn: https://www.radix-ui.com/colors
- **Tailwind palette** — tham chiếu thang 50–950: https://tailwindcss.com/docs/colors
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **oklch.com** — chọn màu trong không gian OKLCH: https://oklch.com/

## Tham khảo
- Material Design 3 — *Color system*: https://m3.material.io/styles/color/system/overview
- *Refactoring UI* — chương Color: https://www.refactoringui.com/
- Erik Kennedy — *Color in UI Design: A (Practical) Framework*: https://learnui.design/blog/color-in-ui-design-a-practical-framework.html
- NN/g — *Dark Mode vs. Light Mode*: https://www.nngroup.com/articles/dark-mode/

## Liên kết
[[Typography]] · [[Design Tokens]] · [[Accessibility]] · [[Design Principles]] · [[UIUX]]
