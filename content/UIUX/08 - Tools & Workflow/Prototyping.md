---
tags: [uiux, tool, process]
status: growing
---
# Prototyping

> Nối các màn hình lại, thêm hiệu ứng khi click để **mô phỏng trải nghiệm giống ứng dụng thật**.
> Câu hỏi quan trọng nhất trước khi dựng prototype: **"Tôi đang muốn trả lời câu hỏi gì?"** Câu trả lời quyết định độ chi tiết cần thiết.

## 1. Các mức fidelity
| Mức | Hình thức | Trả lời câu hỏi |
|---|---|---|
| **Paper / sketch** | Vẽ tay | Ý tưởng này có hợp lý không? |
| **Lo-fi wireframe** | Khối xám, chữ giả | Bố cục và luồng có ổn không? |
| **Mid-fi** | Có phân cấp, chữ thật, chưa có màu thương hiệu | Nội dung có đủ và đúng thứ tự không? |
| **Hi-fi** | Giao diện thật, tương tác thật | Người dùng có hoàn thành được nhiệm vụ không? |
| **Coded prototype** | HTML/React thật | Cảm giác thật, hiệu năng, dữ liệu thật |

> Cạm bẫy: prototype càng đẹp, người test càng ngại chê (**Aesthetic–Usability Effect**) và stakeholder càng tưởng "sắp xong rồi". Test bố cục thì lo-fi là đủ và cho phản hồi thẳng thắn hơn.

## 2. Wireframe — bước phác thảo ✏️
Bản thiết kế "khung xương" chỉ dùng nét đơn giản, đen–trắng–xám 🏁. Mục đích: tập trung vào **bố cục (layout)**, **luồng thông tin (content hierarchy)** và **chức năng**, điều chỉnh cực nhanh mà không bị xao nhãng bởi màu sắc.
- **Low-Fidelity 📝** — phác nhanh bằng tay trên giấy hoặc bảng trắng.
- **High-Fidelity 📐** — vẽ trên Figma với ô, khung và văn bản rõ ràng hơn nhưng vẫn giữ màu tối giản.

Mẹo: vẽ **8 phương án trong 8 phút** (Crazy 8s) trước khi chọn một để làm kỹ. Phương án đầu tiên hiếm khi là tốt nhất.

## 3. Prototype trong Figma
- **Flow** — đặt điểm bắt đầu cho từng luồng, đặt tên rõ ràng.
- **Trigger**: On click · On drag · While hovering · After delay · Key/Gamepad · Mouse enter/leave.
- **Action**: Navigate to · Open overlay · Swap overlay · Back · Scroll to · Open link · Change to (variant).
- **Smart Animate** — tự nội suy giữa các layer **trùng tên**. Đây là chìa khoá: muốn animate mượt thì phải đặt tên layer giống nhau ở hai frame.
- **Overlay** cho modal, bottom sheet, dropdown — nhớ đặt vị trí và hành vi click nền.
- **Variables + Conditional logic** — prototype có trạng thái thật: đếm số, form validation, giỏ hàng. Cho phép mô phỏng khá gần app thật mà không cần code.
- **Interactive components** — hover/press định nghĩa một lần trong component, dùng lại khắp nơi.

Duration & easing khi prototype: theo thang trong [[Motion & Animation]], đừng để mặc định.

## 4. Prototype cho usability test
- Chỉ dựng **các đường mà người test sẽ đi** — không cần dựng cả app.
- Nhưng phải dựng **đủ nhánh sai** để không phải nói "chỗ này chưa làm" giữa buổi test.
- Dùng **nội dung thật**; dữ liệu giả kiểu "Lorem ipsum" làm người test bối rối.
- Kiểm tra trên **đúng thiết bị** sẽ dùng để test.
- Nối vào **Maze** để chạy test không người điều phối.
→ [[Usability Testing]]

## 5. Khi nào nên code thay vì Figma
- Cần cảm nhận đúng về hiệu năng, cuộn, bàn phím mobile.
- Tương tác phức tạp (kéo thả, canvas, real-time).
- Cần dữ liệu thật với khối lượng thật.
- Bạn đã biết code — nhiều khi dựng bằng HTML/Tailwind nhanh hơn vật lộn với prototype logic trong Figma.

## 6. Checklist
- [ ] Prototype này trả lời câu hỏi gì?
- [ ] Fidelity có vừa đủ cho câu hỏi đó không (không thừa)?
- [ ] Đã dựng nhánh lỗi chưa?
- [ ] Nội dung có thật không?
- [ ] Chuyển động có duration/easing hợp lý không?
- [ ] Đã thử trên thiết bị thật chưa?

## Tham khảo
- Figma — *Prototyping guide*: https://help.figma.com/hc/en-us/sections/4405269443991-Prototyping
- NN/g — *UX Prototypes: Low Fidelity vs. High Fidelity*: https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/
- Google Ventures — *The Design Sprint* (prototype trong 1 ngày): https://www.thesprintbook.com/
- Maze — kết nối prototype với test: https://maze.co/

## Liên kết
[[Figma]] · [[Usability Testing]] · [[Motion & Animation]] · [[Design Thinking Process]] · [[UIUX]]
