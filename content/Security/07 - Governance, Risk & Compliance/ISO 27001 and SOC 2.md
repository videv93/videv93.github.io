---
tags: [security, grc, compliance]
status: growing
---
# ISO 27001 and SOC 2

> Hai chứng nhận mà khách hàng thật sự hỏi khi họ đánh giá xem có tin bạn với dữ liệu của họ không. Note này giải thích khác biệt, và một sự thật khó chịu: **đạt chứng nhận không có nghĩa là bạn khó bị hack.**

## 1. So sánh

| | **ISO 27001** | **SOC 2** |
|---|---|---|
| Bản chất | Chứng nhận ISMS (hệ thống quản lý) | Báo cáo kiểm toán (attestation) |
| Cơ quan | ISO, chứng nhận quốc tế | AICPA (Mỹ), phổ biến ở thị trường Mỹ |
| Cho ai | Toàn cầu, mọi ngành | SaaS/tech, chủ yếu B2B Mỹ |
| Kết quả | Giấy chứng nhận | Báo cáo chi tiết (Type I/II) |
| Trọng tâm | **Quy trình** quản lý rủi ro | **Control** vận hành theo Trust Services Criteria |
| Thời hạn | 3 năm + audit giám sát | Type II: kỳ quan sát (thường 6–12 tháng) |

## 2. Điểm mấu chốt của mỗi cái

**ISO 27001** xoay quanh **ISMS** — một hệ thống quản lý: bạn phải có quy trình đánh giá rủi ro, chọn control (Annex A), áp dụng, đo, và cải tiến liên tục (PDCA). Nó chứng nhận rằng bạn **quản lý** bảo mật có hệ thống, không chứng nhận bạn an toàn.

**SOC 2** xoay quanh **Trust Services Criteria** (Security bắt buộc; Availability, Confidentiality, Processing Integrity, Privacy tuỳ chọn). 
- **Type I**: control được thiết kế đúng tại một thời điểm.
- **Type II**: control **vận hành hiệu quả** suốt một kỳ — đây là cái khách hàng thật sự muốn.

## 3. Sự thật khó chịu về compliance

> [!warning] Chứng nhận là sàn, không phải trần
> Có ISO 27001 và SOC 2 Type II nghĩa là bạn có quy trình được ghi chép và được kiểm toán. Nó **không** nghĩa là:
> - Ứng dụng của bạn không có [[Broken Access Control]] (audit hiếm khi pentest sâu).
> - Bạn phát hiện được một APT ([[Threat Hunting]] vượt xa yêu cầu audit).
> - Nhân viên không mắc phishing.
>
> Nhiều tổ chức bị hack **trong khi** giữ chứng nhận hợp lệ. Compliance đo "có quy trình không", security đo "quy trình có hiệu quả trước kẻ tấn công thật không". Đừng nhầm — [[Security Frameworks Landscape]].

## 4. Nguyên tắc

1. **Chọn theo thị trường.** Khách hàng Mỹ B2B hỏi SOC 2; khách hàng quốc tế/EU hỏi ISO 27001. Nhiều công ty cần cả hai.
2. **Type II > Type I.** Type I chỉ là ảnh chụp thiết kế; Type II chứng minh vận hành thật.
3. **Compliance là sản phẩm phụ của bảo mật tốt, không phải mục tiêu.** Nếu làm bảo mật thật, chứng nhận đến gần như tự nhiên; nếu làm chỉ để có giấy, bạn có giấy mà không có bảo mật.
4. **Ánh xạ control một lần.** ISO Annex A, SOC 2 TSC, CIS Controls chồng lấn lớn; làm một lần dùng nhiều.
5. **Đừng để audit định nghĩa chương trình.** Audit là mức tối thiểu; bảo mật thật vượt xa nó — nhất là [[Detection Engineering]] và pentest sâu.

## 5. Cạm bẫy

- **Coi chứng nhận là bằng chứng an toàn.** Sai lầm phổ biến nhất; nhiều vụ hack xảy ra với tổ chức có chứng nhận.
- **Type I tưởng như Type II.** Type I không chứng minh vận hành theo thời gian.
- **Làm compliance tách rời bảo mật.** Đội GRC làm giấy tờ, đội kỹ thuật làm bảo mật, hai bên không nói chuyện → control trên giấy không khớp thực tế.
- **Không ánh xạ giữa chuẩn.** Tốn gấp đôi làm lại.
- **Audit fatigue.** Chuẩn bị audit ngốn nguồn lực đáng lẽ dùng để giảm rủi ro thật.
- **Scope hẹp để dễ đạt.** SOC 2 chỉ phủ một phần hệ thống — đọc scope của báo cáo khách hàng đưa.

## 6. Checklist áp dụng

- [ ] Thị trường khách hàng của tôi hỏi ISO, SOC 2, hay cả hai?
- [ ] Nếu SOC 2, tôi nhắm Type II (vận hành) chứ không chỉ Type I?
- [ ] Chương trình bảo mật thật của tôi có vượt yêu cầu audit không?
- [ ] Đội GRC và đội kỹ thuật có phối hợp để control trên giấy khớp thực tế không?
- [ ] Tôi đã ánh xạ control giữa các chuẩn để tái dùng chưa?
- [ ] Tôi có tránh nhầm chứng nhận với an toàn thật không?
- [ ] (Khi đánh giá nhà cung cấp) Tôi có đọc scope báo cáo SOC 2 của họ không?

## Tham khảo

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001)
- [AICPA — SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- [ISO 27001 Annex A controls (27002:2022)](https://www.iso.org/standard/75652.html)
- [NIST CSF mapping to ISO 27001](https://www.nist.gov/cyberframework)

## Liên kết

[[Security Frameworks Landscape]] · [[Security Policy and Standards]] · [[Security Risk Management]] · [[Third-Party and Supply Chain Risk]] · [[Privacy and Data Protection]] · [[Security]]
