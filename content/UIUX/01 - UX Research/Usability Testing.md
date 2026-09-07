---
tags: [uiux, research, testing]
status: growing
---
# Usability Testing

> Mang bản thiết kế cho **người dùng thật** thao tác để tìm chỗ họ bị "khựng" lại.
> Nguyên tắc vàng: **"Quan sát hành động, đừng chỉ nghe lời nói."**

## 1. Vì sao 5 người là đủ
Theo nghiên cứu của Nielsen, 5 người dùng phát hiện ~**85%** vấn đề khả dụng. Người thứ 6 trở đi chủ yếu lặp lại phát hiện cũ.
→ Tốt hơn: **3 vòng test × 5 người** thay vì 1 vòng × 15 người. Mỗi vòng sửa xong rồi test lại.

*Lưu ý:* con số này đúng cho test **định tính tìm lỗi**. Nếu muốn đo lường (tỉ lệ thành công, thời gian) thì cần mẫu lớn hơn nhiều (20+).

## 2. Các kiểu test
| Kiểu | Đặc điểm |
|---|---|
| **Moderated** | Có người điều phối, hỏi sâu được. Chất lượng cao, tốn công. |
| **Unmoderated** | Người dùng tự làm qua công cụ (Maze, UserTesting). Nhanh, rẻ, quy mô lớn. |
| **In-person / Remote** | Remote là mặc định hiện nay; in-person tốt cho sản phẩm có ngữ cảnh vật lý. |
| **Guerrilla** | Ra quán cà phê hỏi người lạ 5 phút. Rẻ nhất, dùng để bắt lỗi thô. |
| **A/B test** | Định lượng, cần lưu lượng lớn, trả lời "cái nào tốt hơn" chứ không trả lời "vì sao". |

## 3. Chuẩn bị một buổi test
1. **Xác định câu hỏi nghiên cứu** — "Người dùng có tự tìm được cách đổi phương thức thanh toán không?"
2. **Viết task, không viết hướng dẫn.**
   - ❌ "Bấm vào Cài đặt, chọn Thanh toán, rồi bấm Sửa."
   - ✅ "Thẻ của bạn vừa hết hạn. Hãy cập nhật thẻ mới."
   - Task phải có **bối cảnh** và **mục tiêu**, không chứa tên nút.
3. **Tuyển đúng người** — sàng lọc theo hành vi, không theo nhân khẩu học.
4. **Chuẩn bị prototype** đủ tương tác cho các task đó → [[Prototyping]].
5. **Pilot test** với 1 đồng nghiệp để bắt lỗi kịch bản.

## 4. Trong buổi test
- Mở đầu: *"Chúng ta đang test sản phẩm, không test bạn. Không có câu trả lời sai. Nếu bạn thấy khó ở đâu thì đó là lỗi của thiết kế."*
- **Think-aloud** — yêu cầu họ nói to suy nghĩ. Nếu họ im, nhắc nhẹ: "Bạn đang nghĩ gì vậy?"
- **Không cứu người dùng.** Khi họ hỏi "bấm cái này đúng không?", trả lời: "Bạn nghĩ sao?" hoặc "Nếu ở nhà thì bạn sẽ làm gì?"
- **Không giải thích thiết kế.** Ngay khi bạn phải giải thích, bạn đã tìm ra lỗi.
- Ghi lại: chỗ ngập ngừng, chỗ bấm sai, câu nói thể hiện bối rối, biểu cảm.

## 5. Sau buổi test
- Ghi phát hiện theo mẫu: **[Ai] gặp [vấn đề] khi [làm gì] vì [giả thuyết nguyên nhân]**.
- Chấm severity 1–4 (xem [[Nielsen Heuristics]]).
- Ưu tiên theo **tần suất × mức độ nghiêm trọng**.
- Chia sẻ bằng **clip 30 giây** người dùng thật đang vật lộn — sức thuyết phục hơn mọi báo cáo.

## 6. Chỉ số thường đo
- **Task success rate** — % hoàn thành
- **Time on task**
- **Error rate** — số lần bấm sai
- **SUS (System Usability Scale)** — bộ 10 câu, điểm 0–100, ≥68 là trên trung bình
- **SEQ (Single Ease Question)** — 1 câu sau mỗi task: "Việc vừa rồi khó hay dễ?" (thang 1–7)
→ Xem thêm [[UX Metrics]].

## 7. Checklist
- [ ] Task có chứa tên nút/từ khoá trong giao diện không? (nếu có → viết lại)
- [ ] Đã có kịch bản mở đầu và xin phép ghi hình chưa?
- [ ] Có ai trong team ngồi quan sát cùng không?
- [ ] Đã pilot chưa?
- [ ] Sau test có ai chịu trách nhiệm biến phát hiện thành ticket không?

## Công cụ
- **Maze** (unmoderated, nối thẳng Figma): https://maze.co/
- **UserTesting**: https://www.usertesting.com/
- **Lookback**, **Zoom + ghi màn hình** cho moderated remote

## Tham khảo
- NN/g — *Why You Only Need to Test with 5 Users*: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- NN/g — *Usability Testing 101*: https://www.nngroup.com/articles/usability-testing-101/
- NN/g — *Thinking Aloud*: https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/
- Steve Krug — *Rocket Surgery Made Easy* (kịch bản test rút gọn, rất thực dụng)
- MeasuringU — thang đo SUS/SEQ: https://measuringu.com/sus/

## Liên kết
[[User Research]] · [[Nielsen Heuristics]] · [[Prototyping]] · [[UX Metrics]] · [[UIUX]]
