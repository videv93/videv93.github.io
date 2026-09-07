---
tags: [uiux, designsystem, component]
status: growing
---
# Component API & Variants

> Thiết kế một component không phải vẽ một hình — mà là **thiết kế một API**: những "nút vặn" mà người dùng component (designer khác, developer) được phép điều chỉnh.

## 1. Component & Variant trong Figma
- **Component 🧩** — "khuôn mẫu master". Sửa master → mọi instance tự cập nhật.
- **Variant 🎭** — các biến thể của cùng một component, gom trong một bộ: Default / Hover / Disabled, Small / Medium / Large.
- **Properties** — các nút vặn: Boolean (có icon hay không), Instance swap (đổi icon), Text (nhãn), Variant (chọn kiểu).

Lợi ích: giảm số component trong thư viện từ 40 xuống 1 (với 40 tổ hợp), và người dùng chỉ cần bật/tắt thay vì đi tìm.

## 2. Thiết kế "props" cho component
Ví dụ [[Button]]:
| Property | Kiểu | Giá trị |
|---|---|---|
| `variant` | Variant | primary · secondary · ghost · destructive |
| `size` | Variant | sm · md · lg |
| `state` | Variant | default · hover · focus · active · disabled · loading |
| `hasIconLeft` | Boolean | true/false |
| `hasIconRight` | Boolean | true/false |
| `label` | Text | "Lưu thay đổi" |

**Cảnh báo bùng nổ tổ hợp:** 4 variant × 3 size × 6 state = 72 khung. Cách kiểm soát: tách `state` ra khỏi variant set và xử lý bằng interactive component / code, chỉ giữ tổ hợp *hình thức* trong variant.

**Nguyên tắc đặt props:**
- Ít props nhất có thể. Mỗi prop là một quyết định người dùng phải cân nhắc.
- Props có **giá trị mặc định hợp lý** — dùng component mà không cấu hình gì vẫn ra kết quả đúng.
- Đừng tạo prop cho trường hợp mới xuất hiện một lần. Chờ đến lần thứ ba.
- Tên props phải giống nhau giữa Figma và code.

## 3. Anatomy — giải phẫu component
Mỗi component nên có sơ đồ đánh số các bộ phận:
```
Card
 1. Container (nền, viền, bo góc, shadow)
 2. Media (tuỳ chọn)
 3. Header — tiêu đề + overline
 4. Body — mô tả
 5. Footer — hành động
 6. Overflow menu (tuỳ chọn)
```
Anatomy giúp: dev biết cần dựng gì, designer biết được sửa phần nào, và tài liệu có ngôn ngữ chung.

## 4. Slot & Composition
Hai triết lý:
- **Configuration** (nhiều props) — dễ dùng, khó mở rộng. Hợp với component đơn giản (Button, Badge).
- **Composition** (slot/children) — linh hoạt, cần hiểu biết hơn. Hợp với container (Card, Modal, Table).

Kinh nghiệm: **component càng ở gần "lá" thì càng nên configuration; càng ở gần "container" thì càng nên composition.** Cố ép Card thành 20 props luôn thất bại.

## 5. Nguyên tắc đặt tên và tổ chức
- Đặt tên theo cấu trúc thư mục: `Button/Primary/Large`, `Input/Text/Error`.
- Nhóm theo **loại component**, không theo màn hình sử dụng.
- Tiền tố `_` hoặc `.` cho component nội bộ (không dành cho người dùng trực tiếp).
- Đặt tên layer bên trong có ý nghĩa — instance kế thừa tên layer, dev đọc được.

## 6. Đưa component vào hệ thống — tiêu chí
Một component chỉ nên vào thư viện chung khi:
- [ ] Đã dùng ở **≥3 nơi** khác nhau
- [ ] Đã có đủ mọi [[Interaction States]]
- [ ] Đã đạt chuẩn accessibility (bàn phím, ARIA, tương phản)
- [ ] Đã responsive
- [ ] Đã thử với nội dung dài nhất/ngắn nhất, ảnh thiếu, số 0
- [ ] Có tài liệu: khi nào dùng / khi nào không
- [ ] Có tên thống nhất giữa design và code

## 7. Checklist review một component
- [ ] Nó có làm **một** việc rõ ràng không?
- [ ] Bỏ được prop nào không?
- [ ] Tên có mô tả *cái nó là*, không phải *chỗ nó được dùng* không?
- [ ] Auto layout có chịu được nội dung dài không?
- [ ] Có trạng thái nào chưa vẽ không?
- [ ] Code và Figma có khớp API không?

## Tham khảo
- Figma — *Create and use variants*: https://help.figma.com/hc/en-us/articles/360056440594
- Figma — *Component properties*: https://help.figma.com/hc/en-us/articles/5579474826519
- Brad Frost — *Atomic Design* (atom → molecule → organism): https://atomicdesign.bradfrost.com/chapter-2/
- Nathan Curtis — *Component QA in Design Systems*: https://medium.com/eightshapes-llc
- shadcn/ui — ví dụ tốt về composition API: https://ui.shadcn.com/

## Liên kết
[[Design System]] · [[Design Tokens]] · [[Interaction States]] · [[Figma]] · [[UIUX]]
