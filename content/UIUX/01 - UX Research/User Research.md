---
tags: [uiux, research]
status: growing
---
# User Research

> Nền tảng cốt lõi của UX. Không hiểu người dùng thì rất dễ thiết kế ra sản phẩm "đẹp mắt nhưng không ai muốn dùng". Mục tiêu: tìm ra **Pain Points** và **Needs** thật.

## 1. Hai trục phân loại
**Trục 1 — Định tính vs Định lượng**
- **Định tính (Qualitative) 🗣️** trả lời *"Tại sao?"* và *"Như thế nào?"* — phỏng vấn sâu, quan sát, usability test. Mẫu nhỏ (5–8 người), cho *insight*.
- **Định lượng (Quantitative) 📊** trả lời *"Bao nhiêu?"* và *"Mức độ nào?"* — survey, analytics, A/B test. Mẫu lớn, cho *bằng chứng*.

**Trục 2 — Hành vi vs Thái độ**
- **Hành vi (Behavioral)**: người dùng *làm gì* — analytics, A/B test, usability test.
- **Thái độ (Attitudinal)**: người dùng *nói gì* — phỏng vấn, survey, card sorting.

> Quy tắc vàng: **Lời nói và hành động của người dùng thường mâu thuẫn nhau.** Ưu tiên dữ liệu hành vi khi ra quyết định.

Ghép hai trục ra 4 góc phần tư — đây chính là bản đồ phương pháp của NN/g (xem link cuối note).

## 2. Chọn phương pháp theo câu hỏi
| Câu hỏi đang có | Phương pháp phù hợp |
|---|---|
| Người dùng là ai, họ đang khổ vì gì? | Phỏng vấn sâu 1-1, contextual inquiry |
| Họ dùng sản phẩm trong ngữ cảnh nào? | Diary study, field study |
| Bao nhiêu % gặp vấn đề này? | Survey, analytics |
| Thiết kế này có dùng được không? | [[Usability Testing]] |
| Nên đặt tên/nhóm nội dung thế nào? | Card sorting, tree testing → [[Information Architecture]] |
| Phương án A hay B tốt hơn? | A/B test (cần lưu lượng đủ lớn) |
| Vì sao người dùng bỏ giữa chừng? | Analytics tìm chỗ rơi + phỏng vấn người đã rơi |

## 3. Kỹ thuật phỏng vấn
- **Hỏi về quá khứ, không hỏi về tương lai.** ❌ "Bạn có dùng tính năng X không?" ✅ "Lần gần nhất bạn cần làm việc X là khi nào? Kể lại giúp mình."
- **Không hỏi dẫn dắt.** ❌ "Tính năng này tiện đúng không?" ✅ "Bạn nghĩ gì khi nhìn màn hình này?"
- **5 Whys** — đào từ hiện tượng xuống nguyên nhân gốc.
- **Im lặng là công cụ.** Đếm thầm 3 giây sau khi họ trả lời; phần hay nhất thường đến sau đó.
- **Mom Test** — hỏi những câu mà kể cả mẹ bạn cũng không thể nói dối để làm bạn vui.

## 4. Từ dữ liệu thô đến insight
1. **Ghi chép thô** → transcript / note theo từng người.
2. **Affinity mapping** — dán mọi quan sát lên sticky, gom nhóm theo chủ đề nổi lên (không gom theo nhóm định sẵn).
3. **Rút insight** — mỗi insight nên có dạng: *quan sát + bối cảnh + hàm ý*.
4. **Ưu tiên** — pain point nào tần suất cao × mức độ đau lớn × khớp mục tiêu kinh doanh.
5. Đầu ra: [[Persona & JTBD]], [[User Journey & Flow]], danh sách HMW.

## 5. Sai lầm hay gặp
- Hỏi người dùng "bạn muốn gì" và làm y hệt (họ mô tả giải pháp, không mô tả vấn đề).
- Chỉ phỏng vấn người dùng đang hài lòng — bỏ sót người đã rời bỏ.
- Nghiên cứu xong để đó, không ai trong team đọc → chia sẻ bằng highlight video 2 phút thay vì báo cáo 40 trang.
- Mẫu quá nhỏ nhưng kết luận theo kiểu định lượng ("3/5 người thích ⇒ 60% người dùng thích" — sai).
- Confirmation bias: chỉ nghe thấy điều mình đã tin.

## 6. Checklist trước một buổi research
- [ ] Câu hỏi nghiên cứu viết ra được thành 1–3 câu chưa?
- [ ] Tiêu chí tuyển người tham gia là gì? Họ có thật sự là người dùng mục tiêu?
- [ ] Script phỏng vấn đã loại hết câu dẫn dắt chưa?
- [ ] Đã xin phép ghi âm/ghi hình chưa?
- [ ] Ai trong team sẽ ngồi quan sát cùng?

## Tham khảo
- NN/g — *When to Use Which UX Research Method* (bản đồ 4 góc phần tư): https://www.nngroup.com/articles/which-ux-research-methods/
- NN/g — *UX Research Cheat Sheet*: https://www.nngroup.com/articles/ux-research-cheat-sheet/
- NN/g — *Interviewing Users*: https://www.nngroup.com/articles/interviewing-users/
- Rob Fitzpatrick — *The Mom Test*: https://www.momtestbook.com/
- Erika Hall — *Just Enough Research*: https://abookapart.com/products/just-enough-research
- Maze / Dovetail blog — công cụ và mẫu template: https://dovetail.com/blog/

## Liên kết
[[Design Thinking Process]] · [[Persona & JTBD]] · [[Usability Testing]] · [[UX Metrics]] · [[UIUX]]
