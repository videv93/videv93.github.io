---
tags: [uiux, research, ia]
status: growing
---
# Information Architecture (IA)

> IA giống việc thiết kế bản đồ chỉ dẫn trong một siêu thị lớn 🛒. Hàng hoá xếp hỗn loạn thì khách bỏ về. IA tổ chức, phân loại và **dán nhãn** nội dung để người dùng tìm được thứ họ cần nhanh nhất.

## 1. Bốn thành phần (mô hình Rosenfeld & Morville)
1. **Organization systems** — cách gom nhóm nội dung (theo chủ đề, theo tác vụ, theo đối tượng, theo thời gian, A–Z).
2. **Labeling systems** — cách đặt tên cho nhóm và mục.
3. **Navigation systems** — cách di chuyển giữa các nhóm.
4. **Search systems** — tìm kiếm, bộ lọc, gợi ý.

## 2. Sitemap 🌳
Cây cấu trúc thể hiện trang chính, trang phụ và quan hệ giữa chúng.
- **Chiều rộng vs chiều sâu:** ưu tiên **nông và rộng** hơn là sâu và hẹp. Người dùng chịu được menu 7–9 mục hơn là phải bấm xuống 5 tầng.
- Quy tắc kinh nghiệm: **không quá 3 tầng** cho phần lớn sản phẩm.
- Đánh số node (1.0, 1.1, 1.1.1) để dev và content team tham chiếu.

## 3. Navigation 🧭
| Kiểu | Dùng khi |
|---|---|
| Top nav / header | Web, số mục chính ≤ 7 |
| Sidebar | Ứng dụng nhiều mục, dashboard, admin |
| Bottom tab bar | Mobile, **3–5 mục**, đều là đích đến chính |
| Hamburger menu | Mục phụ — chôn ở đây thì tần suất dùng giảm mạnh |
| Breadcrumb | Cấu trúc sâu, thương mại điện tử |
| Search-first | Nội dung lớn, người dùng biết mình tìm gì |

Ba câu hỏi mọi hệ thống điều hướng phải trả lời được: **Tôi đang ở đâu? Tôi có thể đi đâu? Làm sao quay lại?** → xem [[Menu & Navigation]].

## 4. Labeling 🏷️
- Dùng **từ của người dùng**, không dùng từ nội bộ công ty. (Nielsen heuristic #2)
- Tránh nhãn thông minh/hài hước cho mục điều hướng — tính rõ ràng thắng tính sáng tạo.
- Nhất quán về ngữ pháp: hoặc toàn danh từ ("Đơn hàng", "Cài đặt"), hoặc toàn động từ ("Tạo đơn", "Cài đặt hệ thống").
- Kiểm chứng nhãn bằng **tree testing**, không bằng ý kiến trong phòng họp.

## 5. Card Sorting
Để người dùng chỉ cho ta cách họ *nghĩ* về nội dung.
1. **Open Card Sorting 🔓** — người dùng tự gom nhóm và **tự đặt tên** nhóm. Dùng khi xây IA từ đầu.
2. **Closed Card Sorting 🔒** — designer cho sẵn nhóm, người dùng chỉ thả thẻ vào. Dùng khi đã có cấu trúc và muốn kiểm chứng.
3. **Hybrid** — có nhóm sẵn nhưng cho phép tạo nhóm mới.

Số người tham gia: ~15–20 cho kết quả ổn định. Đọc kết quả bằng **ma trận đồng xuất hiện** (thẻ nào hay được xếp cùng nhau).

## 6. Tree Testing — kiểm chứng ngược
Cho người dùng một cây điều hướng dạng text (không giao diện) và giao nhiệm vụ "tìm chỗ đổi mật khẩu".
Đo: **success rate**, **directness** (có đi thẳng không hay lang thang), **time**.
Card sorting hỏi *"bạn xếp thế nào?"*; tree testing hỏi *"bạn tìm được không?"* — cần cả hai.

## 7. Checklist
- [ ] Người dùng mới có đoán được nội dung nằm ở đâu không?
- [ ] Có mục nào thuộc về 2 nhóm cùng lúc không? (dấu hiệu phân loại sai)
- [ ] Menu chính có quá 7 mục không?
- [ ] Nhãn có nhất quán về ngữ pháp không?
- [ ] Đã tree-test các nhiệm vụ quan trọng nhất chưa?

## Công cụ
- **Optimal Workshop** (card sort + tree test): https://www.optimalworkshop.com/
- **Maze**: https://maze.co/
- **Miro / FigJam** cho card sorting trực tiếp

## Tham khảo
- NN/g — *Information Architecture: Study Guide*: https://www.nngroup.com/articles/information-architecture-study-guide/
- NN/g — *Card Sorting: Uncover Users' Mental Models*: https://www.nngroup.com/articles/card-sorting-definition/
- NN/g — *Tree Testing*: https://www.nngroup.com/articles/tree-testing/
- Rosenfeld, Morville & Arango — *Information Architecture* (sách gấu bắc cực)
- Abby Covert — *How to Make Sense of Any Mess*: https://abbycovert.com/writing/how-to-make-sense-of-any-mess/

## Liên kết
[[Menu & Navigation]] · [[User Journey & Flow]] · [[Usability Testing]] · [[UIUX]]
