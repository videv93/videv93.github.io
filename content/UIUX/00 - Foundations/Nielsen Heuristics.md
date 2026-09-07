---
tags: [uiux, foundation, evaluation]
status: growing
---
# 10 Nielsen Heuristics

> Bộ 10 nguyên tắc kinh điển (Jakob Nielsen, 1994) dùng để **đánh giá** giao diện — công cụ rẻ nhất để tìm lỗi UX khi chưa có ngân sách test người dùng.

## 1. Danh sách 10 heuristic
1. **Visibility of system status** — Hệ thống luôn cho biết đang xảy ra gì, phản hồi kịp thời. *Ví dụ: spinner, progress bar, "Đã lưu lúc 14:02".* → [[Progress & Loading]]
2. **Match between system and the real world** — Dùng ngôn ngữ của người dùng, không dùng thuật ngữ nội bộ. *Ví dụ: "Giỏ hàng" chứ không phải "Order Container".* → [[UX Writing]]
3. **User control and freedom** — Luôn có "lối thoát khẩn cấp": Undo, Cancel, Back. *Ví dụ: "Đã xoá thư — Hoàn tác".*
4. **Consistency and standards** — Cùng một từ/hành động nghĩa như nhau ở mọi nơi; tuân theo chuẩn nền tảng. → [[Design System]], **Jakob's Law**
5. **Error prevention** — Ngăn lỗi tốt hơn báo lỗi. *Ví dụ: disable ngày quá khứ trong date picker, hỏi xác nhận trước hành động huỷ hoại.*
6. **Recognition rather than recall** — Hiện lựa chọn ra màn hình thay vì bắt nhớ. *Ví dụ: lịch sử tìm kiếm, autocomplete.*
7. **Flexibility and efficiency of use** — Phím tắt và lối tắt cho người thạo, không cản người mới. *Ví dụ: `⌘K` command palette.*
8. **Aesthetic and minimalist design** — Mỗi thông tin thừa làm giảm độ nổi bật của thông tin cần thiết.
9. **Help users recognize, diagnose, and recover from errors** — Thông báo lỗi: nói **cái gì sai**, **vì sao**, **làm gì tiếp**. Không mã lỗi trần trụi. → [[Empty & Error States]]
10. **Help and documentation** — Trợ giúp nên nằm đúng ngữ cảnh, tìm được, và theo từng bước. → [[Tooltip]]

## 2. Cách chạy một Heuristic Evaluation
1. Chọn **3–5 người đánh giá** (một người tìm được ~35% vấn đề; 5 người ~75%).
2. Mỗi người **duyệt độc lập** theo các luồng chính, ghi lại vi phạm + heuristic bị vi phạm + screenshot.
3. Chấm **mức nghiêm trọng** 0–4:
   - 0 = không phải vấn đề · 1 = thẩm mỹ · 2 = nhỏ · 3 = lớn · 4 = thảm hoạ, phải sửa trước khi release
4. Gộp danh sách, khử trùng lặp, sắp theo severity × tần suất.
5. Đề xuất hướng sửa cho từng mục.

> Heuristic evaluation **không thay thế** [[Usability Testing]]. Nó tìm lỗi *vi phạm nguyên tắc*, còn test với người thật tìm lỗi *ngoài dự đoán*.

## 3. Checklist rút gọn dùng hằng ngày
- [ ] Người dùng có biết hệ thống đang làm gì không?
- [ ] Có nút quay lại / hoàn tác không?
- [ ] Có thể ngăn lỗi này xảy ra ngay từ đầu không?
- [ ] Thông báo lỗi có nói được "làm gì tiếp theo" không?
- [ ] Có thông tin nào xoá đi mà màn hình vẫn đủ dùng không?

## Tham khảo
- NN/g — *10 Usability Heuristics for User Interface Design*: https://www.nngroup.com/articles/ten-usability-heuristics/
- NN/g — *How to Conduct a Heuristic Evaluation*: https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/
- NN/g — *Severity Ratings for Usability Problems*: https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/

## Liên kết
[[Design Principles]] · [[Laws of UX]] · [[Usability Testing]] · [[UIUX]]
