---
tags: [uiux, foundation, visual]
status: growing
---
# Design Principles

> Những quy luật thị giác quyết định vì sao một giao diện "nhìn có tổ chức" hay "nhìn rối". Đây là tầng dưới cùng của mọi quyết định UI.

## 1. Nguyên lý Gestalt — não người tự gom nhóm
| Nguyên lý | Nội dung | Ứng dụng UI |
|---|---|---|
| **Proximity** (Gần nhau) | Vật gần nhau được coi là cùng nhóm | Label phải sát ô input của nó hơn là sát ô phía trên |
| **Similarity** (Tương đồng) | Cùng màu/hình dạng ⇒ cùng chức năng | Mọi link đều xanh + gạch chân |
| **Common Region** (Vùng chung) | Cùng nằm trong một khung ⇒ cùng nhóm | [[Card]] gom nội dung liên quan |
| **Closure** (Khép kín) | Não tự lấp khoảng trống | Icon nét đứt vẫn đọc được hình |
| **Continuity** (Liên tục) | Mắt đi theo đường thẳng/cong | Danh sách căn lề trái dễ quét |
| **Figure/Ground** | Tách chủ thể khỏi nền | Overlay tối sau [[Modal & Dialog]] |
| **Common Fate** | Vật chuyển động cùng hướng ⇒ cùng nhóm | Danh sách trượt cùng nhau khi filter |

> Mẹo vàng: **khoảng cách nói lên quan hệ.** Trước khi thêm đường kẻ hay khung, hãy thử sửa khoảng cách.

## 2. Phân cấp thị giác (Visual Hierarchy)
Sáu công cụ tạo phân cấp, xếp theo sức mạnh giảm dần:
1. **Kích thước** — to hơn = quan trọng hơn
2. **Trọng lượng chữ** — bold hút mắt trước màu
3. **Màu & độ tương phản** — dùng dè, xem [[Color Theory]]
4. **Khoảng trắng** — cô lập một phần tử làm nó nổi bật
5. **Vị trí** — trên/trái được đọc trước (ngôn ngữ LTR)
6. **Chiều sâu** — shadow, elevation

Quy tắc thực hành: mỗi màn hình chỉ có **một** nhân vật chính. Nếu mọi thứ đều nổi bật thì không gì nổi bật.

## 3. Các nguyên tắc cốt lõi khác
- **Contrast** — khác biệt phải rõ ràng, đừng khác một chút (7px vs 8px là bẩn, 8px vs 24px là chủ đích).
- **Consistency** — cùng một thứ thì trông giống nhau và hành xử giống nhau ở mọi nơi. Đây là lý do tồn tại của [[Design System]].
- **Alignment** — mọi phần tử phải thẳng hàng với thứ gì đó. Giảm số đường căn lề = giao diện gọn hơn.
- **Repetition** — lặp lại pattern để người dùng học một lần dùng khắp nơi.
- **Affordance & Signifier** — hình dạng phải gợi ý cách dùng (nút trông bấm được, ô input trông gõ được).
- **Feedback** — mọi hành động phải có phản hồi trong 100ms. → [[Micro-interactions]]
- **Progressive Disclosure** — chỉ hiện thứ cần thiết, giấu phần nâng cao phía sau.
- **Recognition over recall** — cho người dùng *nhận ra* thay vì bắt *nhớ lại*.

## 4. Checklist audit nhanh một màn hình
- [ ] Nhìn màn hình trong 3 giây — tôi thấy gì đầu tiên? Đó có phải thứ quan trọng nhất?
- [ ] Nheo mắt lại (squint test) — bố cục còn đọc được thành khối không?
- [ ] Có bao nhiêu đường căn lề dọc? Có giảm được không?
- [ ] Khoảng cách giữa các nhóm có lớn hơn khoảng cách trong nhóm không?
- [ ] Có phần tử nào chỉ khác nhau "một chút" mà không có chủ đích không?

## Tham khảo
- NN/g — *Gestalt Principles in UI Design*: https://www.nngroup.com/articles/gestalt-principles-visual-perception/
- NN/g — *Visual Hierarchy*: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Don Norman — *The Design of Everyday Things* (affordance, signifier, feedback)
- *Refactoring UI* — chương Hierarchy & Spacing: https://www.refactoringui.com/
- Universal Principles of Design — William Lidwell

## Liên kết
[[Laws of UX]] · [[Nielsen Heuristics]] · [[Layout & Composition]] · [[UIUX]]
