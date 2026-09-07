---
tags: [security, nghề-nghiệp]
status: growing
---
# Security Career Paths

> ⚠️ Đọc [[Offense vs Defense Bias]] và [[Certification vs Competence]] trước — chúng giải thích vì sao seed (chỉ nói pentest) cho một bức tranh nghề nghiệp lệch.

> Bảo mật không phải một nghề — nó là hàng chục nghề rất khác nhau. Seed chỉ mô tả pentest/red team; note này là bản đồ đầy đủ hơn, gồm các nhánh có nhiều việc làm nhất mà seed bỏ qua.

## 1. Các nhánh nghề chính

| Nhánh | Làm gì | Note trong vault | Cung việc làm |
|---|---|---|---|
| **Offensive / Pentest** | Tìm lỗ hổng bằng cách tấn công | Thư mục `01`, `02` | Ít hơn kỳ vọng của seed |
| **AppSec Engineer** | Bảo mật trong vòng đời phát triển | [[Source Code Review for Vulnerabilities]], `02` | Nhiều, đang tăng |
| **SOC Analyst / Blue Team** | Giám sát, phát hiện, phản ứng | Thư mục `03` | **Nhiều nhất, điểm vào phổ biến** |
| **DFIR** | Điều tra & ứng phó sự cố | [[Digital Forensics]], [[Security Incident Response]] | Ổn định |
| **Detection Engineer** | Viết và duy trì detection | [[Detection Engineering]] | Đang tăng nhanh |
| **CTI Analyst** | Phân tích threat intel | Thư mục `04` | Chuyên biệt |
| **GRC / Compliance** | Quản trị, rủi ro, tuân thủ | Thư mục `07` | Nhiều, ít cạnh tranh |
| **Cloud Security** | Bảo mật cloud/K8s | Thư mục `08` | **Cầu cao, cung thiếu** |
| **Security Engineer / Architect** | Xây hạ tầng bảo mật | Nhiều thư mục | Cao |
| **Malware Analyst / Researcher** | Phân tích malware, research | Thư mục `05` | Chuyên biệt, cạnh tranh |

## 2. Đường vào phổ biến

| Xuất phát | Đường tự nhiên |
|---|---|
| Không nền IT | Security+ → SOC Tier 1 → chuyên môn hoá |
| Developer | → AppSec (tận dụng nền code) |
| Sysadmin/Network | → Security Engineer, Blue Team |
| QA/Testing | → AppSec, pentest |
| Không kỹ thuật | → GRC (cần hiểu rủi ro/quy trình hơn code) |

> [!note] SOC là điểm vào có nhiều cửa nhất
> Trái với ấn tượng của seed (pentest là con đường), **SOC analyst** thường là điểm vào dễ nhất và nhiều vị trí nhất. Từ đó rẽ nhánh sang detection engineering, DFIR, threat intel, hoặc chuyển sang offensive sau khi có nền — [[Blue Team Operations]].

## 3. Kỹ năng vượt kỹ thuật — trần sự nghiệp

Từ mức senior trở lên, thăng tiến phụ thuộc vào kỹ năng seed không nhắc:

- **Giao tiếp rủi ro với người không kỹ thuật** — [[Security Metrics and Reporting]].
- **Ảnh hưởng không quyền lực** — [[Security Culture]].
- **Viết** — báo cáo, policy, tài liệu là sản phẩm thật — [[Penetration Testing Lifecycle]], [[Security Policy and Standards]].
- **Hiểu kinh doanh** — bảo mật phục vụ mục tiêu tổ chức, không tự thân.

Đây là lý do [[Offense vs Defense Bias]] nói kỹ năng tấn công thuần chạm trần: nó khó chuyển thành ảnh hưởng tổ chức nếu thiếu các kỹ năng trên.

## 4. Nguyên tắc

1. **SOC/Blue team là điểm vào rộng nhất, không phải pentest.** Nhiều vị trí, ít cạnh tranh hơn ở junior.
2. **Chọn nhánh theo nền sẵn có.** Developer → AppSec; sysadmin → security engineer; không kỹ thuật → GRC.
3. **Cloud và AppSec có cầu vượt cung.** Cân nhắc nếu tối ưu cơ hội việc làm.
4. **Kỹ năng mềm là trần, không phải phụ.** Đầu tư giao tiếp/viết/kinh doanh sớm.
5. **Chuyển nhánh được và phổ biến.** SOC → detection → DFIR → offensive là đường thật; không bị khoá vào lựa chọn đầu.
6. **Kinh nghiệm thực hành > chứng chỉ.** Portfolio (bug bounty, CTF, lab, đóng góp) thuyết phục — [[Certification vs Competence]].

## 5. Cạm bẫy

- **Tin pentest là con đường duy nhất/tốt nhất.** Ấn tượng từ seed; thực tế cung việc lệch phòng thủ.
- **Bỏ qua GRC/Blue vì "không ngầu".** Nhiều việc, lương tốt, ít cạnh tranh.
- **Chỉ đầu tư kỹ thuật.** Trần sự nghiệp đến sớm nếu thiếu kỹ năng mềm.
- **Luyện OSCP khi nhắm vai trò phòng thủ.** Sai chứng chỉ cho mục tiêu — [[Security Certification Landscape]].
- **Tưởng bị khoá vào lựa chọn đầu.** Chuyển nhánh là bình thường.
- **Bỏ qua cloud/AppSec.** Nơi cầu vượt cung rõ nhất.

## 6. Checklist áp dụng

- [ ] Tôi biết các nhánh khác nhau và cung việc làm của chúng chưa?
- [ ] Tôi chọn nhánh theo nền sẵn có của mình chưa?
- [ ] Tôi có cân nhắc cloud/AppSec (cầu cao) không?
- [ ] Tôi có đang đầu tư kỹ năng mềm (giao tiếp/viết/kinh doanh) không?
- [ ] Chứng chỉ tôi nhắm có khớp nhánh tôi chọn không?
- [ ] Tôi có portfolio thực hành, không chỉ chứng chỉ không?
- [ ] Tôi có đang bị ấn tượng "pentest là con đường" của seed lái không?

## Tham khảo

- [NIST NICE Workforce Framework](https://niccs.cisa.gov/workforce-development/nice-framework) — danh mục vai trò chuẩn
- [(ISC)² Cybersecurity Workforce Study](https://www.isc2.org/research)
- [Cyberseek — career pathway](https://www.cyberseek.org/pathway.html)
- [SANS — Cybersecurity career roadmap](https://www.sans.org/)

## Liên kết

[[Offense vs Defense Bias]] · [[Certification vs Competence]] · [[Security Certification Landscape]] · [[Blue Team Operations]] · [[Security Metrics and Reporting]] · [[Security Culture]] · [[Security]]
