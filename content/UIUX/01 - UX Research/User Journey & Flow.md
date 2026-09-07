---
tags: [uiux, research]
status: growing
---
# User Journey & Flow

> Hai bản đồ khác nhau: **Journey Map** vẽ *cảm xúc theo thời gian*, **User Flow** vẽ *thao tác theo màn hình*.

## 1. Phân biệt
| | User Journey Map 🧭 | User Flow 🔀 |
|---|---|---|
| Phạm vi | Toàn bộ trải nghiệm: trước – trong – sau | Một nhiệm vụ cụ thể |
| Nội dung | Hành động, suy nghĩ, cảm xúc, điểm chạm | Màn hình, nút bấm, điều kiện rẽ nhánh |
| Bao gồm cả ngoài sản phẩm | Có (quảng cáo, hỗ trợ, truyền miệng) | Không |
| Dùng để | Tìm cơ hội, thuyết phục stakeholder | Thiết kế và bàn giao chi tiết |
| Người đọc | Cả công ty | Designer + Developer + QA |

## 2. Cấu trúc một Journey Map
Trục ngang = **các giai đoạn** (ví dụ: Nhận biết → Cân nhắc → Đăng ký → Dùng lần đầu → Dùng thường xuyên → Rời bỏ/Giới thiệu).

Trục dọc = các tầng:
1. **Hành động** — họ làm gì ở giai đoạn này
2. **Điểm chạm (Touchpoints)** — kênh nào: web, app, email, tổng đài, cửa hàng
3. **Suy nghĩ** — câu hỏi trong đầu họ
4. **Cảm xúc** — đường cong lên xuống 😀→😟
5. **Pain points** — chỗ đường cong chạm đáy
6. **Cơ hội** — ý tưởng cải thiện tương ứng

> Giá trị thật của journey map nằm ở **hai dòng cuối**. Map đẹp mà không ra được danh sách cơ hội thì chỉ là trang trí.

**Biến thể:** *Service Blueprint* — thêm tầng "hậu trường" (nhân viên, hệ thống, quy trình nội bộ) bên dưới, dùng khi trải nghiệm phụ thuộc vào vận hành.

## 3. Vẽ một User Flow
**Ký hiệu chuẩn:**
- ▭ Hình chữ nhật = màn hình / trạng thái
- ◇ Hình thoi = điểm quyết định (có/không)
- → Mũi tên = hành động chuyển tiếp
- ⬭ Bo tròn = điểm bắt đầu / kết thúc

**Quy tắc vẽ:**
1. Bắt đầu từ **entry point** thật (không phải lúc nào cũng là màn hình chủ — có thể là deep link, notification, email).
2. Mỗi ô là một **trạng thái**, không phải một hành động.
3. **Luôn vẽ nhánh xấu**: lỗi mạng, sai mật khẩu, hết hàng, quyền bị từ chối. Đây là nơi 80% thiết kế bị thiếu → [[Empty & Error States]].
4. Đếm số bước tới mục tiêu — mỗi bước là một chỗ rơi rớt.
5. Đánh dấu **happy path** bằng nét đậm.

**Các loại flow cần có cho mọi sản phẩm:** đăng ký/đăng nhập, onboarding lần đầu, tác vụ chính, thanh toán, khôi phục mật khẩu, xoá tài khoản.

## 4. Từ flow ra màn hình
Flow → wireframe → hi-fi. Mỗi ô trong flow phải tương ứng ít nhất một artboard. Nếu có ô không ai vẽ, đó là màn hình sẽ bị thiếu khi code.

## 5. Checklist
- [ ] Journey map có dựa trên research thật không, hay là giả định?
- [ ] Đường cong cảm xúc có chạm đáy ở đâu? Đã có ý tưởng cho chỗ đó chưa?
- [ ] User flow đã có nhánh lỗi chưa?
- [ ] Có thể bỏ bớt bước nào không?
- [ ] Người dùng luôn biết mình đang ở đâu và quay lại được chứ?

## Tham khảo
- NN/g — *Journey Mapping 101*: https://www.nngroup.com/articles/journey-mapping-101/
- NN/g — *Service Blueprints*: https://www.nngroup.com/articles/service-blueprints-definition/
- NN/g — *Flow Charts in UX*: https://www.nngroup.com/articles/flowchart-ux-workflow/
- UX Collective — *A guide to user flows*: https://uxdesign.cc/
- Template Figma cộng đồng: tìm "Journey Map" / "User Flow" trong Figma Community

## Liên kết
[[Persona & JTBD]] · [[Information Architecture]] · [[Prototyping]] · [[UIUX]]
