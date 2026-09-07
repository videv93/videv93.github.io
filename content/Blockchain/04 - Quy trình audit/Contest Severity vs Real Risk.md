---
tags: [audit, bản-lề, severity]
status: evergreen
---
# Contest Severity vs Real Risk

> ⚠️ **Note bản lề.** Đọc note này trước khi dùng [[Severity Classification]] để tranh luận, và trước khi đọc bất kỳ báo cáo audit nào như một chứng chỉ an toàn.

> Seed chứa ba hệ giá trị **không cùng định nghĩa chữ "bug"**: warden tối ưu điểm số, judge tối ưu tính nhất quán với quy tắc và tiền lệ, sponsor tối ưu chi phí vận hành. Ba hệ này va nhau công khai trong từng finding — và vault này không chọn phe nào.

## 1. Ba hệ giá trị

| | Warden | Judge | Sponsor |
|---|---|---|---|
| Câu hỏi trung tâm | *"Cái gì tính điểm?"* | *"Quy tắc và tiền lệ nói gì?"* | *"Cái gì đáng chi tiền sửa?"* |
| Thiên lệch | Nộp nhiều, chấm cao | Nhất quán > đúng bối cảnh | Bảo vệ lịch phát hành |
| Bằng chứng chấp nhận | PoC | Quy tắc + tiền lệ | Kinh nghiệm vận hành |
| Thất bại điển hình | Nói quá tác động | Áp quy tắc lệch bối cảnh | Coi giả định của mình là bất biến |

## 2. Vì sao không hệ nào bị bác bỏ dứt điểm

**Sponsor không ngu.** Khi Coded Estate nói *"Chúng tôi dùng token 6 decimals trên nền tảng"*, đó là thông tin thật mà warden không có. Khi Kakarot nói *"Mọi token dùng cho DualVmToken sẽ được kiểm tương thích trước khi deploy"*, đó là một biện pháp kiểm soát thật — chỉ ở tầng vận hành thay vì tầng code. Bảo mật thật gồm cả kiểm soát vận hành.

**Judge không máy móc.** Judge của Kakarot khi bị viện dẫn quy tắc "loss of fees is a LOW" đã trả lời rằng ông là **một trong ba người viết ra quy tắc đó**, rồi giải thích ý định gốc. Judge của Coded Estate thay đổi severity **ba lần** cho M-04 khi có bằng chứng mới. Đó là suy xét, không phải áp máy.

**Warden không chỉ đuổi theo điểm.** Bằng chứng mạnh nhất: `nnez` — người tìm 6/9 High của Coded Estate — dành bốn vòng tranh luận để lập luận rằng finding M-08 của **một warden khác** nên bị hạ xuống QA. Không có lợi ích gì cho anh ta trong việc đó.

## 3. Chỗ ba hệ đồng thuận

Nhiều hơn ta tưởng:

| Điểm đồng thuận | Bằng chứng |
|---|---|
| **PoC chạy được là bằng chứng cuối cùng** | Không có finding nào có PoC bị dispute thành công |
| **Con số thắng tính từ** | M-04: chỉ một phép tính đảo ngược quyết định của judge |
| **Tài liệu là một phần của contract** | M-05 giữ Medium *chỉ vì* không có tài liệu nói hành vi đó là chủ đích |
| **Code lệch spec của chính nó là finding** | Gondi M-01: judge nêu việc code đi ngược interface như lý do củng cố severity |
| **Bản vá phải được review lại** | Cả ba bên đều tham gia vòng mitigation review của Kakarot |

## 4. Chỗ nó gãy

### ⚠️ a. "Acknowledged" nghĩa là bug vẫn còn trên chain
Coded Estate có **9 High**. Sáu trong số đó sponsor chỉ *acknowledged*, không *confirmed*. Một cái bị *disputed*. Báo cáo hoàn tất, tiền thưởng được trả, warden có điểm — **và code vẫn có 6 lỗ hổng High**.

Một báo cáo audit ghi lại *ai đã tìm ra gì*, không ghi *cái gì đã được sửa*.

### ⚠️ b. Điểm số không đo được rủi ro tồn dư
Không có mục nào trong bất kỳ báo cáo nào trả lời câu *"sau audit này, protocol còn rủi ro gì?"*. Cái được đo là **số finding tìm ra**, không phải **số finding còn lại**.

### ⚠️ c. Ít warden = ít finding, không phải ít bug
| Audit | Warden | Dòng code | High | Medium |
|---|---|---|---|---|
| Gondi | **2** | 4.117 Solidity | 0 | 1 |
| Coded Estate | 4 | 2.647 | 9 | 9 |
| Kakarot | **23** | 15.398 Cairo | 6 | 11 |

Đọc bảng này theo hướng "Gondi an toàn nhất" là sai. Gondi có **hai** người đọc 4.117 dòng. Kakarot có 23 người và một vòng mitigation review độc lập. **Số lượng finding tỉ lệ thuận với số mắt, không tỉ lệ nghịch với số bug.**

### ⚠️ d. Nhãn severity là hợp đồng, không phải phép đo
`Assessed type: Context` xuất hiện 8 lần — nó không nói gì về bản chất lỗi. Xem [[Vulnerability Taxonomy]].

### ⚠️ e. Chính C4 nói ra điều này
Cuối **cả ba** báo cáo, nguyên văn:

> *"C4 không thực hiện formal verification mà chỉ cung cấp final verification. C4 không đưa ra bất kỳ bảo đảm hay cam kết nào về tính bảo mật của dự án này. Mọi phần mềm smart contract nên được sử dụng với rủi ro và trách nhiệm hoàn toàn thuộc về người dùng."*

Đoạn này in trong mọi báo cáo và gần như không ai đọc.

## 5. Cách dùng một cách trung thực

| Dùng như | **Không** dùng như |
|---|---|
| Bằng chứng rằng *những lớp lỗi này* đã được tìm | Bằng chứng rằng protocol an toàn |
| Nguồn học lớp lỗ hổng thật | Danh sách đầy đủ các lớp lỗ hổng |
| Tín hiệu về **mức độ trưởng thành của quy trình** (có mitigation review không?) | Tín hiệu về chất lượng code |
| Tra tiền lệ severity khi tranh luận | Định nghĩa rủi ro cho hệ thống của bạn |

Khi đọc một báo cáo audit của protocol bạn định dùng, ba câu hỏi thật sự quan trọng:

1. **Bao nhiêu finding được `confirmed` và đã sửa** — không phải bao nhiêu finding được tìm ra?
2. **Có mitigation review không?** (5/33 bản vá của Kakarot có vấn đề; không có pha này thì chúng vẫn còn)
3. **Bao nhiêu người thực sự đọc bao nhiêu dòng?**

## 6. Phép kiểm bạn tự chạy được

Không có checklist cho note này. Có bốn phép kiểm:

- **Phép kiểm "acknowledged"**: mở một báo cáo bất kỳ trên [code4rena.com/reports](https://code4rena.com/reports), đếm High/Medium theo trạng thái phản hồi của sponsor. Tỉ lệ *acknowledged* là tỉ lệ rủi ro còn nguyên trên chain.
- **Phép kiểm mật độ mắt**: `số dòng code / số warden`. Trên ~2.000 dòng/người, hãy coi báo cáo là một mẫu ngẫu nhiên, không phải một lần quét đầy đủ.
- **Phép kiểm tách nội dung khỏi nguồn**: với mỗi finding bạn định tin, hỏi *"kết luận này có phụ thuộc vào việc ai nói ra không?"* Nếu có — nếu bạn tin vì đó là judge, hoặc không tin vì đó là sponsor — thì bạn chưa đọc bằng chứng.
- **Phép kiểm đảo vai**: viết lập luận mạnh nhất **cho phía đối diện** trong một finding gây tranh cãi (thử với Coded Estate M-08). Nếu không viết nổi, bạn chưa hiểu finding đó.

## Tham khảo

- [Coded Estate report — 6/9 High chỉ "acknowledged"](https://code4rena.com/reports/2024-10-coded-estate)
- [Kakarot Mitigation Review — 5/33 bản vá có vấn đề](https://code4rena.com/reports/2024-09-kakarot)
- [Coded Estate M-08 — bốn vòng tranh luận giữa hai warden và judge](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/10)
- [Code4rena — Judging criteria](https://docs.code4rena.com/awarding/judging-criteria/severity-categorization)
- [Gondi report — 2 warden, 4.117 dòng](https://code4rena.com/reports/2024-06-gondi)

## Liên kết

[[Severity Classification]] · [[Mitigation Review]] · [[Case Study Method]] · [[Move Fast vs Immutable]] · [[Contest Platforms]] · [[Blockchain]]
