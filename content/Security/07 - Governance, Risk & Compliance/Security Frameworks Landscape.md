---
tags: [security, grc]
status: growing
---
# Security Frameworks Landscape

> Có quá nhiều framework, và người mới bối rối chọn cái nào. Note này là bản đồ: mỗi framework trả lời câu hỏi khác nhau, và chúng **bổ sung** nhau chứ không thay thế nhau.

## 1. Framework nào cho việc gì

| Framework | Loại | Trả lời | Ràng buộc |
|---|---|---|---|
| **NIST CSF 2.0** | Khung quản trị | "Chương trình bảo mật của ta nên có gì?" | Tự nguyện, linh hoạt |
| **ISO 27001** | Chứng nhận | "Ta có ISMS được chứng nhận không?" | Chứng nhận được — [[ISO 27001 and SOC 2]] |
| **CIS Controls** | Danh sách kỹ thuật | "Làm gì trước, cụ thể?" | Ưu tiên hoá, thực hành |
| **SOC 2** | Báo cáo kiểm toán | "Khách hàng tin quy trình của ta không?" | Kiểm toán bên thứ ba |
| **NIST 800-53** | Catalog controls | "Control chi tiết cho hệ thống liên bang Mỹ" | Bắt buộc cho US federal |
| **PCI DSS** | Chuẩn ngành | "Xử lý thẻ thanh toán" | Bắt buộc nếu xử lý thẻ |
| **OWASP SAMM/ASVS** | AppSec | "Chương trình bảo mật phần mềm" | Tự nguyện |

## 2. NIST CSF 2.0 — khung tổ chức tư duy tốt nhất để bắt đầu

Sáu chức năng (2.0 thêm Govern):

| Chức năng | Nội dung | Nối tới |
|---|---|---|
| **Govern** (mới 2.0) | Chiến lược, vai trò, rủi ro chuỗi cung ứng | [[Security Risk Management]] |
| **Identify** | Kiểm kê tài sản, rủi ro | [[Security Risk Management]] |
| **Protect** | Biện pháp phòng ngừa | Access control, đào tạo |
| **Detect** | Phát hiện | [[Detection Engineering]] |
| **Respond** | Ứng phó | [[Security Incident Response]] |
| **Recover** | Khôi phục | Backup, BCP |

CSF hay ở chỗ nó **không quy định làm thế nào** — nó cho khung để tổ chức tự đánh giá và ưu tiên. Đây là điểm khởi đầu tốt trước khi cam kết một chứng nhận nặng.

## 3. Framework bổ sung nhau thế nào

- **CSF** cho khung chiến lược (nên có gì).
- **CIS Controls** cho danh sách ưu tiên hoá (làm gì trước — CIS chia Implementation Group theo quy mô).
- **ISO 27001** để chứng nhận (chứng minh với bên ngoài).
- **NIST 800-53** để chi tiết control cụ thể.

Một tổ chức trưởng thành dùng nhiều framework cho mục đích khác nhau, không chọn "một framework đúng".

## 4. Nguyên tắc

1. **Chọn framework theo động lực.** Cần chứng nhận cho khách hàng → ISO/SOC 2. Cần khung tư duy → CSF. Cần biết làm gì trước → CIS.
2. **CIS Controls để bắt đầu hành động.** Ưu tiên hoá theo quy mô; IG1 là mức tối thiểu cho mọi tổ chức.
3. **Compliance với framework ≠ an toàn.** Framework là sàn, không phải trần — [[ISO 27001 and SOC 2]].
4. **Ánh xạ giữa framework.** Phần lớn control chồng lấn; làm một lần, ánh xạ sang nhiều.
5. **Framework phục vụ rủi ro, không ngược lại.** Đừng làm control chỉ vì framework liệt kê; làm vì nó giảm rủi ro thật — [[Security Risk Management]].

## 5. Cạm bẫy

- **Chọn framework như tôn giáo.** Chúng bổ sung; không có "cái đúng duy nhất".
- **Compliance = security.** Đạt framework không nghĩa là khó bị hack.
- **Bắt đầu bằng chứng nhận nặng.** ISO 27001 tốn kém; CSF/CIS rẻ hơn để bắt đầu.
- **Không ánh xạ.** Làm lại từ đầu cho mỗi framework thay vì tái dùng control.
- **Control vì framework, không vì rủi ro.** Tốn nguồn lực cho control không giảm rủi ro của bạn.
- **Bỏ Govern của CSF 2.0.** Chức năng mới quan trọng: rủi ro chuỗi cung ứng, vai trò, chiến lược.

## 6. Checklist áp dụng

- [ ] Động lực của tôi là gì (chứng nhận / khung tư duy / danh sách hành động)?
- [ ] Tôi đã chọn framework khớp động lực đó chưa?
- [ ] Tôi có dùng CIS Controls để ưu tiên hành động cụ thể không?
- [ ] Tôi có ánh xạ control giữa các framework để tránh làm lại không?
- [ ] Mỗi control tôi làm có giảm rủi ro thật, không chỉ tick box không?
- [ ] Tôi có tránh nhầm compliance với security không?

## Tham khảo

- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [CIS Controls v8](https://www.cisecurity.org/controls)
- [ISO/IEC 27001](https://www.iso.org/standard/27001)
- [NIST SP 800-53 Rev.5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [OWASP SAMM](https://owaspsamm.org/) và [ASVS](https://owasp.org/www-project-application-security-verification-standard/)

## Liên kết

[[ISO 27001 and SOC 2]] · [[Security Policy and Standards]] · [[Security Risk Management]] · [[Security Metrics and Reporting]] · [[Vulnerability Management]] · [[Security]]
