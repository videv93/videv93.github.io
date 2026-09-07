---
tags: [security, con-người]
status: growing
---
# Security Awareness Programs

> Câu hỏi trung tâm không phải "đào tạo thế nào" mà là **cái gì thật sự thay đổi hành vi** — vì phần lớn chương trình awareness tồn tại để qua audit, không để giảm rủi ro. Note này phân biệt hai thứ đó.

## 1. Cái có tác dụng vs cái để trưng bày

| Có tác dụng | Chủ yếu để trưng bày |
|---|---|
| Mô phỏng phishing thật + phản hồi tức thì | Video một năm một lần, làm cho xong |
| Đào tạo theo vai trò (dev khác kế toán) | Slide chung cho mọi người |
| Đo thay đổi hành vi (tỉ lệ báo cáo tăng) | Đo tỉ lệ hoàn thành khoá học |
| Làm việc đúng dễ hơn việc sai | Chỉ nói "hãy cẩn thận" |
| Văn hoá không đổ lỗi | Trừng phạt người mắc bẫy |

> [!warning] "Tỉ lệ hoàn thành 100%" là chỉ số phù phiếm
> Mọi nhân viên xem hết video không nói gì về việc họ có hành xử an toàn hơn không. Chỉ số thật là **hành vi**: tỉ lệ báo cáo phishing tăng, tỉ lệ click giảm và giữ được, thời gian báo cáo sự cố giảm. Đo cái dễ đo (completion) thay vì cái quan trọng (behavior) là bệnh phổ biến nhất của awareness.

## 2. Vì sao awareness một mình không đủ

Con người sẽ luôn mắc lỗi ở tỉ lệ nào đó — đây là sự thật đã được [[Social Engineering]] nêu. Awareness giảm tần suất, không đưa về 0, và hiệu quả phai theo thời gian. Kết luận: awareness là **một lớp**, phải đi cùng lớp kỹ thuật (MFA chống phishing) và quy trình (xác minh ngoài băng). Một chương trình awareness được bán như "giải pháp" cho yếu tố con người là bán sai.

## 3. Thiết kế chương trình hiệu quả

| Thành phần | Nội dung |
|---|---|
| **Theo vai trò** | Developer: secure coding; tài chính: BEC; lãnh đạo: whaling |
| **Mô phỏng thường xuyên** | Phishing giả định kỳ, phản hồi ngay khi click |
| **Vi mô, thường xuyên** | Nhiều mẩu ngắn > một buổi dài mỗi năm |
| **Phản hồi tích cực** | Khen người báo cáo, không nhục người mắc bẫy |
| **Đo hành vi** | Báo cáo tăng, click giảm bền, MTTR giảm |
| **Làm việc đúng dễ** | Nút báo cáo một click, quy trình rõ |

## 4. Nguyên tắc

1. **Đo hành vi, không đo hoàn thành.** Tỉ lệ báo cáo phishing là chỉ số vàng.
2. **Không đổ lỗi.** Người sợ bị phạt sẽ giấu sự cố; văn hoá báo cáo mở quan trọng hơn tỉ lệ click thấp — [[Security Culture]].
3. **Theo vai trò.** Rủi ro của developer khác kế toán khác lãnh đạo.
4. **Awareness là một lớp, không phải giải pháp.** Kết hợp kỹ thuật + quy trình.
5. **Làm việc an toàn thành đường ít kháng trở nhất.** Nếu quy trình an toàn phiền phức, người dùng vòng qua.
6. **Duy trì liên tục.** Hiệu quả phai; vi mô thường xuyên hơn một buổi lớn.

## 5. Cạm bẫy

- **Đo completion, không đo behavior.** Chỉ số phù phiếm.
- **Trừng phạt người mắc bẫy.** Giết văn hoá báo cáo, tệ hơn không đào tạo.
- **Một video một năm.** Không thay đổi hành vi bền.
- **Nội dung chung cho mọi vai trò.** Không liên quan → bị bỏ qua.
- **Awareness như giải pháp cuối.** Bỏ lớp kỹ thuật vì "đã đào tạo".
- **Phishing mô phỏng tàn nhẫn.** Chủ đề gây sang chấn phá lòng tin — [[Social Engineering]].
- **Không đo baseline.** Không biết chương trình có tác dụng gì.

## 6. Checklist áp dụng

- [ ] Tôi đo hành vi (tỉ lệ báo cáo, click bền) hay chỉ completion?
- [ ] Chương trình có phân theo vai trò không?
- [ ] Có mô phỏng phishing định kỳ với phản hồi tức thì không?
- [ ] Văn hoá có khen báo cáo, không nhục người mắc bẫy không?
- [ ] Có lớp kỹ thuật và quy trình đi kèm, không chỉ đào tạo không?
- [ ] Việc báo cáo/làm đúng có dễ hơn làm sai không?
- [ ] Tôi có baseline để đo tiến bộ không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **GoPhish** | Mô phỏng phishing mã nguồn mở |
| **KnowBe4 / Proofpoint / Hoxhunt** | Nền đào tạo + mô phỏng doanh nghiệp |
| **Nút báo cáo phishing** | Biến nhân viên thành cảm biến |
| **Dashboard hành vi** | Theo dõi báo cáo/click theo thời gian |

## Tham khảo

- [SANS Security Awareness](https://www.sans.org/security-awareness-training/)
- [NIST SP 800-50 — Building an IT Security Awareness Program](https://csrc.nist.gov/pubs/sp/800/50/final)
- [ENISA — Cybersecurity culture guidelines](https://www.enisa.europa.eu/)
- [Verizon DBIR — human element](https://www.verizon.com/business/resources/reports/dbir/)

## Liên kết

[[Social Engineering]] · [[Phishing and Email Defense]] · [[Security Culture]] · [[Insider Threat]] · [[Security Metrics and Reporting]] · [[Security]]
