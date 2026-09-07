---
tags: [security, web]
status: growing
---
# OWASP Top 10 in Practice

> OWASP Top 10 là tài liệu bảo mật web được trích dẫn nhiều nhất, và **bị dùng sai nhiều nhất**. Nó là danh sách **nâng cao nhận thức**, không phải checklist kiểm thử, không phải tiêu chuẩn tuân thủ.

## 1. Top 10 — 2021 (bản hiện hành)

| # | Hạng mục | Bản chất | Nhà chi tiết |
|---|---|---|---|
| **A01** | Broken Access Control | Leo lên #1; scanner khó bắt | [[Broken Access Control]] |
| **A02** | Cryptographic Failures | Dữ liệu nhạy cảm không/kém bảo vệ | [[Cryptographic Building Blocks]] (Networking) |
| **A03** | Injection | Gộp cả XSS vào đây từ 2021 | [[Injection Attacks]], [[XSS and Client-Side Attacks]] |
| **A04** | Insecure Design | **Mới 2021**: lỗi ở thiết kế, không ở code | [[Threat Modeling Practice]] |
| **A05** | Security Misconfiguration | Mặc định, header thiếu, lỗi lộ | [[Cloud Security Posture]] |
| **A06** | Vulnerable & Outdated Components | Thư viện lỗi thời | [[Software Supply Chain Attacks]] |
| **A07** | Identification & Auth Failures | Session, credential | [[Password Attacks and Credential Access]] |
| **A08** | Software & Data Integrity Failures | Deserialization, CI/CD, update không ký | [[Insecure Deserialization]] |
| **A09** | Security Logging & Monitoring Failures | Không thấy được tấn công | [[SIEM and Log Analysis]] |
| **A10** | Server-Side Request Forgery | Tách riêng do cộng đồng bình chọn | [[SSRF and XXE]] |

## 2. Điều quan trọng nhất về bản 2021

- **A01 lên số 1.** Broken Access Control vượt Injection — phản ánh thực tế: nó phổ biến, tác động cao, và **công cụ tự động gần như không bắt được**. Đây là lý do kỹ năng thủ công vẫn không thể thay thế.
- **A04 Insecure Design là hạng mục mới.** OWASP thừa nhận: một số lỗ hổng không sửa được ở tầng code vì chúng là lỗi *thiết kế*. Không lượng review code nào cứu được một thiết kế sai — cần [[Threat Modeling Practice]].
- **Injection gộp XSS.** Về cơ chế, XSS *là* injection (vào ngữ cảnh HTML/JS). Việc gộp phản ánh cách nghĩ đúng: cùng một nguyên nhân gốc.

## 3. Có bao nhiêu Top 10?

| Danh sách | Dùng cho |
|---|---|
| **OWASP Top 10** | Web app nói chung |
| **OWASP API Security Top 10** | API — khác biệt đủ lớn để có danh sách riêng — [[API Security Testing]] |
| **OWASP Top 10 for LLM** | Ứng dụng AI — [[AI and LLM Security]] |
| **OWASP Mobile Top 10 / MASVS** | Mobile — [[Mobile Application Security]] |
| **OWASP Top 10 CI/CD** | Pipeline — [[Software Supply Chain Attacks]] |

Biết danh sách nào áp cho hệ thống nào là bước đầu; áp nhầm danh sách bỏ sót cả lớp lỗ hổng.

## 4. Nguyên tắc dùng đúng

1. **Dùng để nâng nhận thức và huấn luyện, không để chứng minh đã kiểm thử đủ.** "Chúng tôi test hết OWASP Top 10" không có nghĩa là ứng dụng an toàn.
2. **Kiểm thử theo [[Web Attack Surface]], không theo danh sách.** Danh sách là cách tổ chức kiến thức, không phải quy trình kiểm thử — dùng WSTG cho quy trình.
3. **A04 nhắc bạn threat model.** Nếu lỗ hổng nằm ở thiết kế, không có test nào ở tầng code bắt được — phải bắt ở tầng thiết kế.
4. **Dùng như ngôn ngữ chung với đội phát triển.** Giá trị lớn nhất của Top 10 là cho developer và security nói cùng một bộ từ vựng.

## 5. Cạm bẫy

- **Coi Top 10 là toàn bộ bảo mật web.** Nó là 10 hạng mục; [WSTG](https://owasp.org/www-project-web-security-testing-guide/) có hàng trăm test. Top 10 là điểm khởi đầu, không phải điểm đến.
- **Compliance checkbox.** "Đạt OWASP Top 10" không phải một chứng nhận có thật; không ai cấp nó. Cẩn thận với nhà cung cấp tuyên bố điều này.
- **Dùng bản cũ.** Nhiều tài liệu vẫn tham chiếu bản 2017 (khi XSS và SSRF còn riêng). Kiểm năm.
- **Bỏ qua các Top 10 chuyên biệt.** API và LLM có mô hình đe doạ khác đủ để cần danh sách riêng.
- **Nhầm thứ hạng với mức độ nguy hiểm với bạn.** Thứ hạng là tần suất + tác động **trung bình ngành**; hệ thống cụ thể của bạn có thể có hồ sơ rủi ro hoàn toàn khác — [[Security Risk Management]].

## 6. Checklist áp dụng

- [ ] Tôi đang dùng bản OWASP Top 10 mới nhất (2021) chưa?
- [ ] Hệ thống này có cần Top 10 chuyên biệt (API/LLM/Mobile) không?
- [ ] Tôi có đang dùng Top 10 để nâng nhận thức, và WSTG để kiểm thử không?
- [ ] Với A04, tôi đã chạy threat modeling ở tầng thiết kế chưa?
- [ ] Tôi có tránh tuyên bố "đã test hết Top 10 = an toàn" không?
- [ ] Thứ tự ưu tiên của tôi có phản ánh rủi ro của **hệ thống này**, không chỉ thứ hạng chung không?

## Tham khảo

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — quy trình kiểm thử thật
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — tiêu chuẩn xác minh, thứ Top 10 **không** phải

## Liên kết

[[Web Attack Surface]] · [[Injection Attacks]] · [[Broken Access Control]] · [[API Security Testing]] · [[AI and LLM Security]] · [[Threat Modeling Practice]] · [[Security]]
