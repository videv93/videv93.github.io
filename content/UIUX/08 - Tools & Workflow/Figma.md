---
tags: [uiux, tool, figma]
status: growing
---
# Figma

> Công cụ chính để dựng UI và design system. Note này tập trung vào **những cơ chế thay đổi cách làm việc**, không phải danh sách phím tắt.

## 1. Auto Layout 📐
Hãy tưởng tượng một **nút bấm** gồm chữ "Đăng nhập" và khung nền.
- **Không có Auto Layout**: đổi chữ thành "Đăng ký tài khoản ngay" → chữ tràn ra ngoài khung, phải chỉnh tay.
- **Có Auto Layout**: khung **tự co giãn** theo chữ và giữ nguyên padding đã quy định.

**Cần nắm:**
- **Direction** (ngang/dọc), **Gap** giữa các phần tử, **Padding** bốn phía.
- **Resizing**: `Hug contents` (co theo nội dung) · `Fill container` (giãn đầy cha) · `Fixed`.
- **Alignment** 9 điểm + `Space between`.
- **Absolute position** để đặt badge/icon lên trên mà không phá layout.
- **Nested auto layout** — đây mới là chỗ sức mạnh thật: card = auto layout dọc chứa auto layout ngang.
- Phím tắt: `Shift + A` để bọc auto layout.

**Quy tắc:** mọi thứ định đưa vào design system **phải** dùng auto layout. Nếu component vỡ khi đổi nội dung thì nó chưa xong.

## 2. Component & Variant 🧩
- **Component** — "khuôn mẫu master". Tạo một nút master, nhân bản ra 100 màn hình; sửa master → **cả 100 instance tự cập nhật**.
- **Variant 🎭** — các biến thể của cùng một component: Default / Hover / Disabled, Small / Medium / Large.
- **Component Properties** — Boolean (bật/tắt icon), Instance swap (đổi icon), Text (nhãn), Variant.
- **Nested instance** — component chứa component khác.
- Chi tiết thiết kế API: → [[Component API & Variants]]

## 3. Variables (thay thế Styles)
Đây là nâng cấp lớn nhất của Figma những năm gần đây và là nền tảng cho [[Design Tokens]]:
- 4 kiểu: **Color, Number, String, Boolean**.
- **Modes** — cùng một biến có nhiều giá trị: Light/Dark, Mobile/Desktop, thương hiệu A/B. Đổi mode ở frame cha → cả cây con đổi theo.
- **Aliasing** — biến trỏ tới biến khác, đúng mô hình 3 tầng token (primitive → semantic → component).
- Number variable dùng cho spacing và radius → đổi mật độ toàn hệ thống bằng một cú click.

## 4. Design System trong Figma 📚
Ẩn dụ Lego 🧩: chứa "viên gạch" cơ bản (bảng màu, font, icon) và "linh kiện lắp sẵn" (Buttons, Inputs, Cards, Navigation bars).
- Tách file: `Foundations` (variables, styles) → `Components` → `Patterns` → `Product files`.
- **Publish library** và quản lý cập nhật; instance nhận thông báo có phiên bản mới.
- **Library analytics** để xem component nào được dùng, cái nào bị detach → [[Design System Governance]].

## 5. Kỹ thuật đáng học tiếp
- **Constraints** — hành vi khi resize frame (dùng cho frame không auto layout).
- **Interactive components** — hover/press ngay trong component, prototype gọn hơn.
- **Smart Animate** — chuyển động giữa hai frame → [[Prototyping]].
- **Sections & Pages** — tổ chức file để người khác đọc được.
- **Branching** (bản trả phí) — làm việc song song như git.
- **Dev Mode** — chế độ cho developer đọc spec → [[Design Handoff]].
- **Plugin nên có**: Stark (a11y), Tokens Studio, Iconify, Content Reel/Vietnamese Data (dữ liệu giả), Similayer, Batch Styler.
- **FigJam** cho workshop, affinity mapping, [[User Journey & Flow]].

## 6. Thói quen làm việc tốt
- Đặt tên layer có nghĩa — dev đọc được, và bạn 3 tháng sau cũng vậy.
- Không dùng giá trị màu/spacing rời — luôn qua variable.
- Một frame = một màn hình, đặt tên theo `[Flow] / [Bước] / [Trạng thái]`.
- Vẽ đủ [[Interaction States]] cho mọi component.
- Dùng **nội dung thật**, tên tiếng Việt có dấu, chuỗi dài nhất có thể.
- Dọn file trước khi handoff: xoá frame nháp hoặc đưa vào section "Archive".

## Tham khảo
- Figma Learn — https://help.figma.com/hc/en-us
- Figma — *Design Systems resource library*: https://www.figma.com/resource-library/design-systems/
- Figma — *Guide to variables*: https://help.figma.com/hc/en-us/articles/15339657135383
- Figma Community — file mẫu để mổ xẻ: https://www.figma.com/community
- Config talks (hội nghị Figma) trên YouTube

## Liên kết
[[Design System]] · [[Design Tokens]] · [[Component API & Variants]] · [[Prototyping]] · [[Design Handoff]] · [[UIUX]]
