---
tags: [audit, quy-trình, severity]
status: evergreen
---
# Severity Classification

> ⚠️ **Đọc [[Contest Severity vs Real Risk]] trước khi dùng note này để tranh luận.** Bảng dưới đây là quy tắc của contest, không phải định nghĩa của rủi ro.

> Severity là **tác động × khả năng xảy ra**, nhưng trong thực tế nó là kết quả của một cuộc thương lượng ba bên giữa warden, judge và sponsor. Hiểu quy tắc là điều kiện cần; hiểu cách quy tắc được **vận dụng** mới là điều kiện đủ.

## 1. Ba mức của Code4rena

| Mức | Định nghĩa | Ví dụ trong seed |
|---|---|---|
| **High** | Tài sản bị mất/khoá trực tiếp, hoặc bị đánh cắp | Coded Estate H-03 (lấy NFT không trả tiền) |
| **Medium** | Tài sản **không** trực tiếp mất nhưng chức năng/tính khả dụng của protocol bị ảnh hưởng, **hoặc** rò rỉ giá trị kèm điều kiện bên ngoài | Coded Estate M-06 (đặt chỗ giả chặn khách thật) |
| **Low / QA** | Xử lý trạng thái, hàm sai so với spec, comment sai | Gondi L-04 (lỗi chính tả) |

Bốn nhóm được C4 nêu khi đánh giá: **Malicious Input Handling, Escalation of privileges, Arithmetic, Gas use**.

## 2. Bốn quy tắc gây tranh cãi nhất — với dẫn chứng từ seed

### a. Mất phí (loss of fees)
**Kakarot M-03.** Sponsor viện dẫn tài liệu C4: *"loss of fees is a LOW"*. Judge — người tự nhận đã tham gia viết chính quy tắc đó — trả lời từng dòng:

> *"`Loss of fees should be regarded as an impact similar to any other loss of capital`. `Loss of unmatured yield or yield in motion shall be capped to medium severity` — ý định là mất phí không cao hơn Medium. `Loss of dust amounts are QA` — chỉ mất dust mới được nêu rõ là Low."*

⇒ Giữ **Medium**.

### b. Chức năng hỏng nhưng không mất tiền
**Kakarot M-02** (aliasing áp cho cả EOA). Sponsor: *"Không có rủi ro bảo mật nào."* Rồi viện dẫn: đây là *"function incorrect as to spec"* = Low. Judge: *"Tôi vẫn cho rằng Medium là phù hợp"* — vì chức năng bị chặn ngoài ý muốn.

### c. Chi phí thay vì mất mát
**Coded Estate M-04.** Medium → Low → Medium. Xem [[Integer and Precision Bugs]]. Yếu tố quyết định: **con số cụ thể**.

### d. Suy đoán về code tương lai
**Kakarot M-05** (`0^0` trả 0). Hàm không được dùng cho `0^0` ở thời điểm audit. Vẫn Medium, viện dẫn quy tắc *speculation on future code* của C4: hàm toán học nền tảng sai thì code tương lai kế thừa cái sai.

## 3. Bốn yếu tố thực sự quyết định severity

| Yếu tố | Câu hỏi |
|---|---|
| **Tác động định lượng** | Mất bao nhiêu? Bao nhiêu phần trăm? |
| **Điều kiện tiên quyết** | Cần admin độc hại? Cần token đặc biệt? Cần trạng thái thị trường? |
| **Ai chịu thiệt** | Người dùng, protocol, hay chỉ attacker tự hại mình? |
| **Tiền lệ** | Đã có finding tương tự được chấm mức nào? |

Yếu tố cuối quan trọng hơn người ta tưởng. Trong Coded Estate M-08, judge giữ Medium bằng cách dẫn **hai finding cũ ở hai audit khác** (Canto Identity, SKALE). Trong tranh luận severity, **Solodit là vũ khí**.

## 4. Sponsor phản hồi thế nào — và nghĩa là gì

| Phản hồi | Nghĩa | Ảnh hưởng tới severity |
|---|---|---|
| **Confirmed** | Đồng ý, sẽ sửa | Không đổi |
| **Acknowledged** | Hiểu, **không sửa** | Không đổi — vẫn tính điểm |
| **Disputed** | Không đồng ý | Judge quyết |

> [!warning] "Acknowledged" không hạ severity
> Coded Estate có 6/9 High chỉ được *acknowledged*, kèm những câu như *"Chuyện này thực ra không gây vấn đề gì"*, *"Chúng tôi dùng token 6 decimals"*, *"Không ai set mảng dài như vậy"*. Không câu nào làm thay đổi mức severity. **Việc sponsor chọn không sửa là quyết định của họ về rủi ro, không phải bằng chứng rằng rủi ro không tồn tại.**

## 5. Cạm bẫy

1. **Chấm theo độ khó tìm.** Bug khó tìm không tự động là High.
2. **Chấm theo độ "clever".** Judge quan tâm tác động, không quan tâm sự thông minh.
3. **Không định lượng** ⇒ bị hạ mức. Xem [[Writing a Finding]].
4. **Nói quá** ⇒ bị hạ mức và mất uy tín cho các finding khác.
5. **Bỏ qua điều kiện tiên quyết** trong mô tả ⇒ judge tự phát hiện ⇒ mất tin.
6. **Nộp mọi thứ ở High** để "thử vận may" — làm hại toàn bộ hồ sơ của bạn.
7. **Nhầm giữa nghiêm trọng với đáng sửa.** Gondi L-04 (lỗi chính tả) đáng sửa và không nghiêm trọng. Hai trục khác nhau.

## 6. Checklist áp dụng

- [ ] Tác động đã được định lượng bằng số chưa?
- [ ] Điều kiện tiên quyết là gì? Có hợp lý trong vận hành thật không?
- [ ] Ai chịu thiệt: người dùng, protocol, hay attacker?
- [ ] Đã tìm tiền lệ trên Solodit chưa? Mức nào đã được chấm cho vấn đề tương tự?
- [ ] Nếu tài sản không mất trực tiếp: chức năng nào **hỏng** hoặc **không khả dụng**?
- [ ] Nếu là mất phí: có phải dust không? Nếu không, Medium là mức tối thiểu.
- [ ] Mức tự chấm có chịu được câu hỏi *"tệ nhất là gì, và cần gì để xảy ra"* không?
- [ ] Đã đọc lại xem có nói quá tác động ở chỗ nào không?

## Tham khảo

- [Code4rena — Severity Categorization](https://docs.code4rena.com/awarding/judging-criteria/severity-categorization)
- [Kakarot M-03 — tranh luận về "loss of fees"](https://github.com/code-423n4/2024-09-kakarot-findings/issues/105)
- [Coded Estate M-04 — Medium→Low→Medium](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/27)
- [Sherlock — Judging criteria](https://docs.sherlock.xyz/audits/judging/judging)
- [Solodit](https://solodit.xyz/) — tra tiền lệ severity

## Liên kết

[[Contest Severity vs Real Risk]] · [[Writing a Finding]] · [[Integer and Precision Bugs]] · [[Contest Platforms]] · [[Blockchain]]
