---
tags: [uiux, visual, icon]
status: growing
---
# Iconography & Imagery

> Icon là ngôn ngữ nén. Nén sai thì người dùng phải giải mã — và họ sẽ không làm.

## 1. Nguyên tắc dùng icon
- **Dùng icon nhất quán cho cùng một mục đích** trong toàn sản phẩm.
- **Icon phải hỗ trợ thông tin**, không thay thế thông tin.
- **Kèm nhãn chữ** — trừ khoảng 6 icon phổ quát mà ai cũng hiểu: 🔍 tìm kiếm, ✕ đóng, ← quay lại, 🏠 trang chủ, 🖨 in, ➕ thêm. Ngoài danh sách đó, luôn có label hoặc [[Tooltip]].
- **Giữ icon đơn giản** — icon nhiều chi tiết vỡ ở cỡ 16px.
- **Đặt icon trong container kích thước nhất quán** (ví dụ khung 24×24 cho mọi icon, dù hình bên trong khác nhau).
- **Đảm bảo dễ chạm/bấm** — vùng chạm ≥ 44px kể cả khi icon chỉ 20px.
- **Scale đúng**: chỉ dùng cỡ trong thang (16 · 20 · 24 · 32 · 40), không scale tự do.

## 2. Hệ thống icon
- Chọn **một bộ icon duy nhất**. Trộn hai bộ là lỗi nhìn thấy ngay (khác stroke width, khác bo góc).
- Thuộc tính cần thống nhất: **grid size** (thường 24×24), **stroke width** (1.5px hoặc 2px), **bo góc**, **kiểu** (outline / filled / duotone).
- Quy ước hữu ích: **outline = trạng thái thường, filled = trạng thái đang chọn** (bottom tab bar).
- Icon nên dùng `currentColor` để thừa hưởng màu chữ → dễ theming.

**Bộ icon miễn phí tốt:**
| Bộ | Đặc điểm | Link |
|---|---|---|
| Lucide | Outline sạch, rất phổ biến với React | https://lucide.dev/ |
| Phosphor | 6 weight, đầy đủ nhất | https://phosphoricons.com/ |
| Heroicons | Hợp với Tailwind | https://heroicons.com/ |
| Material Symbols | Có variable axis, hợp Android | https://fonts.google.com/icons |
| SF Symbols | Chuẩn Apple, chỉ dùng cho iOS/macOS | https://developer.apple.com/sf-symbols/ |
| Tabler | Rất nhiều icon, đồng nhất | https://tabler.io/icons |

## 3. Icon & accessibility
- Icon mang nghĩa → cần `aria-label`. Icon trang trí → `aria-hidden="true"`.
- Icon truyền thông tin phải đạt tương phản **3:1**.
- Đừng dùng icon một mình để báo lỗi/thành công — kèm chữ.

## 4. Hình ảnh & Illustration
- **Dùng ảnh chất lượng để tạo niềm tin** — ảnh stock giả tạo làm giảm độ tin cậy hơn là không có ảnh.
- Định nghĩa **tỉ lệ khung chuẩn** (1:1, 4:3, 16:9) và giữ nhất quán trong grid.
- Luôn có **placeholder / skeleton** khi ảnh đang tải, và **fallback** khi ảnh lỗi → [[Empty & Error States]].
- Chữ đè lên ảnh: cần lớp overlay hoặc gradient để đảm bảo tương phản.
- **Illustration** tạo tính cách thương hiệu, hợp với màn hình rỗng và onboarding. Giữ chung một phong cách và bảng màu.
- Tối ưu: dùng **SVG** cho icon/illustration phẳng, **WebP/AVIF** cho ảnh, `srcset` cho responsive, `loading="lazy"` cho ảnh dưới màn hình đầu.

## 5. Checklist
- [ ] Toàn sản phẩm dùng bao nhiêu bộ icon? (phải là 1)
- [ ] Icon nào đang đứng một mình mà không phải icon phổ quát?
- [ ] Icon có sắc nét ở 16px không?
- [ ] Icon có aria-label chưa?
- [ ] Ảnh có tỉ lệ khung nhất quán không?
- [ ] Đã thiết kế trạng thái ảnh đang tải và ảnh lỗi chưa?

## Tham khảo
- NN/g — *Icon Usability*: https://www.nngroup.com/articles/icon-usability/
- NN/g — *Icon Testing*: https://www.nngroup.com/articles/icon-testing/
- Material Design 3 — *Icons*: https://m3.material.io/styles/icons/overview
- Google — *Image optimization (web.dev)*: https://web.dev/learn/images/

## Liên kết
[[Design Tokens]] · [[Accessibility]] · [[Tooltip]] · [[Menu & Navigation]] · [[UIUX]]
