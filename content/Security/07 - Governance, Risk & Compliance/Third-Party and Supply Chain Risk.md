---
tags: [security, grc]
status: growing
---
# Third-Party and Supply Chain Risk

> Rủi ro bạn **không kiểm soát** nhưng vẫn **chịu trách nhiệm**. Phần mềm hiện đại là phần lớn code của người khác; hạ tầng hiện đại là phần lớn dịch vụ của người khác. Bề mặt tấn công của bạn kéo dài tới nhà cung cấp của nhà cung cấp.

## 1. Ba dạng rủi ro bên thứ ba

| Dạng | Ví dụ | Nhà chi tiết |
|---|---|---|
| **Nhà cung cấp dịch vụ** | SaaS, cloud, xử lý thanh toán bị xâm nhập | Đánh giá vendor |
| **Software supply chain** | Dependency, thư viện, base image độc/lỗi | [[Software Supply Chain Attacks]] |
| **Dữ liệu chuyển cho bên thứ ba** | Processor xử lý dữ liệu cá nhân của bạn | [[Privacy and Data Protection]] |

## 2. Vì sao khó

- **Tin cậy bắc cầu.** Bạn tin vendor A, A tin B, B tin C — bạn thừa hưởng rủi ro của C mà không biết C tồn tại.
- **Không kiểm soát trực tiếp.** Không thể vá hệ thống của vendor; chỉ ràng buộc bằng hợp đồng và giám sát.
- **Trách nhiệm không chuyển được.** Khách hàng của bạn bị hại qua vendor của bạn vẫn quy trách nhiệm cho bạn — không cho vendor.

> [!warning] "Chúng tôi dùng nhà cung cấp có SOC 2" không phải câu trả lời đầy đủ
> Chứng nhận của vendor là tín hiệu, không phải bảo đảm — nó có scope (đọc scope báo cáo), và [[ISO 27001 and SOC 2]] đã nói chứng nhận là sàn, không phải trần. Đánh giá vendor thật cần hiểu: họ chạm dữ liệu nào, blast radius nếu họ bị hack, và bạn phát hiện/phản ứng thế nào khi điều đó xảy ra.

## 3. Đánh giá và quản lý rủi ro vendor

| Bước | Nội dung |
|---|---|
| **Kiểm kê** | Danh sách mọi bên thứ ba và dữ liệu/quyền họ chạm |
| **Phân tầng** | Ưu tiên theo mức truy cập và mức quan trọng, không đánh giá đều |
| **Đánh giá** | Chứng nhận, questionnaire, pentest report, kiến trúc |
| **Ràng buộc hợp đồng** | Nghĩa vụ bảo mật, quyền audit, SLA báo vi phạm |
| **Giám sát liên tục** | Rủi ro đổi theo thời gian; đánh giá một lần là không đủ |
| **Kế hoạch thoát** | Nếu vendor bị hack hoặc ngừng dịch vụ |

## 4. Nguyên tắc

1. **Kiểm kê trước.** Không quản được vendor không biết mình dùng — shadow IT là điểm mù lớn.
2. **Phân tầng theo blast radius.** Vendor chạm dữ liệu khách hàng ≠ vendor bán bút; đánh giá tương xứng.
3. **Least privilege cho vendor.** Cho quyền tối thiểu; token/quyền tích hợp phải hẹp — cùng nguyên tắc [[Security Mental Models]].
4. **Hợp đồng phải có quyền audit và SLA báo vi phạm.** Không có thì bạn biết tin xấu qua báo chí.
5. **Giám sát liên tục.** Đánh giá lúc onboard rồi quên là mặc định thất bại.
6. **Trách nhiệm không chuyển được — thiết kế cho việc vendor bị hack.** Giả định vendor sẽ bị hack và hỏi blast radius.
7. **Nối vào [[Security Incident Response]].** Sự cố của vendor là sự cố của bạn; runbook phải bao gồm.

## 5. Cạm bẫy

- **Không kiểm kê vendor.** Shadow IT, tích hợp quên lãng với quyền rộng.
- **Đánh giá đều mọi vendor.** Lãng phí vào vendor rủi ro thấp, bỏ sót vendor rủi ro cao.
- **Chứng nhận vendor = an toàn.** Có scope, là sàn không phải trần.
- **Quyền tích hợp quá rộng.** OAuth scope/API key cấp quá nhiều — SSRF/rò rỉ qua vendor.
- **Đánh giá một lần.** Rủi ro đổi; vendor bị hack sau khi bạn onboard.
- **Không có SLA báo vi phạm trong hợp đồng.** Biết muộn, mất đồng hồ pháp lý.
- **Không có kế hoạch thoát.** Vendor bị hack/ngừng và bạn kẹt.

## 6. Checklist áp dụng

- [ ] Tôi có kiểm kê đầy đủ bên thứ ba và dữ liệu/quyền họ chạm không?
- [ ] Vendor có được phân tầng theo blast radius không?
- [ ] Vendor có bị giới hạn least privilege (scope/API key hẹp) không?
- [ ] Hợp đồng có quyền audit và SLA báo vi phạm không?
- [ ] Tôi có giám sát rủi ro vendor liên tục, không chỉ lúc onboard không?
- [ ] Runbook IR có bao gồm kịch bản vendor bị hack không?
- [ ] Có kế hoạch thoát nếu vendor quan trọng gặp sự cố không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **SBOM** (CycloneDX, SPDX) | Kiểm kê thành phần phần mềm — [[Software Supply Chain Attacks]] |
| **Security rating** (BitSight, SecurityScorecard) | Đánh giá tư thế vendor từ bên ngoài |
| **Questionnaire chuẩn** (SIG, CAIQ) | Đánh giá có cấu trúc |
| **Vendor risk platform** | Theo dõi vòng đời rủi ro vendor |

## Tham khảo

- [NIST SP 800-161 — Cybersecurity Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/final)
- [NIST CSF 2.0 — Govern (supply chain)](https://www.nist.gov/cyberframework)
- [Shared Assessments — SIG questionnaire](https://sharedassessments.org/)
- [CISA — ICT Supply Chain Risk Management](https://www.cisa.gov/supply-chain)

## Liên kết

[[Software Supply Chain Attacks]] · [[Security Risk Management]] · [[ISO 27001 and SOC 2]] · [[Privacy and Data Protection]] · [[Security Incident Response]] · [[Security]]
