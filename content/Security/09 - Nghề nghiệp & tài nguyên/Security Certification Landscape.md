---
tags: [security, nghề-nghiệp]
status: growing
---
# Security Certification Landscape

> [!note] Nhà của nội dung seed gốc
> Seed `OSCP & OSWE...md` (blog CyberJutsu) được giữ nguyên và mở rộng ở đây, trong [[OSCP Preparation Path]], [[OSWE Preparation Path]], và đối chiếu trung thực ở [[Certification vs Competence]]. Đọc note bản lề đó trước khi dùng bảng dưới để ra quyết định.

> Bản đồ chứng chỉ bảo mật. Có hàng chục, và chúng phục vụ mục đích rất khác nhau — từ "qua bộ lọc HR" tới "chứng minh kỹ năng thực hành". Note này sắp chúng theo **câu hỏi bạn đang hỏi**, không theo bảng chữ cái.

## 1. Chứng chỉ theo mục đích

| Mục đích | Chứng chỉ | Ghi chú |
|---|---|---|
| **Vào ngành / nền tảng** | CompTIA Security+, Network+ | Rộng, lý thuyết, được HR nhận |
| **Pentest thực hành** | **OSCP**, PNPT, eJPT (nhập môn) | OSCP là chuẩn vàng thực hành — [[OSCP Preparation Path]] |
| **Web/AppSec chuyên sâu** | **OSWE**, Burp Suite Certified | OSWE = white-box code review — [[OSWE Preparation Path]] |
| **Quản lý / GRC** | CISSP, CISM, CISA | Cho vai trò quản lý, không phải thực hành — [[Security Frameworks Landscape]] |
| **Cloud** | AWS/Azure/GCP security specialty | Theo nhà cung cấp — [[Cloud Security Posture]] |
| **Blue team / SOC** | GCIH, GCFA, BTL1, CySA+ | Phòng thủ, forensics — thư mục `03` |
| **Red team nâng cao** | OSEP, CRTO, các cert AD | Sau OSCP |

## 2. OSCP và OSWE — hai chứng chỉ của seed

| | **OSCP** | **OSWE** |
|---|---|---|
| Khoá | PEN-200 | WEB-300 |
| Phương pháp | Black-box, hệ thống đa dạng | White-box, phân tích mã nguồn |
| Kỹ năng lõi | Enumeration, privesc, AD, network | Code review, logic flaw, viết exploit tự động |
| Thi | 24h khai thác + 24h báo cáo | ~48h khai thác + 24h báo cáo |
| Định hướng | Pentester tổng quát, red team | AppSec, web pentest chuyên sâu |
| Triết lý | "Try Harder" | "Work Smarter" |

Thay đổi OSCP từ 11/2024: trọng tâm Active Directory (từ user thường tới toàn domain — [[Active Directory Attacks]]), bỏ điểm thưởng, giới thiệu OSCP+ (gia hạn 3 năm). Chi tiết ở [[OSCP Preparation Path]].

## 3. Chứng chỉ nói lên gì và không nói lên gì

| Chứng chỉ chứng minh | Chứng chỉ KHÔNG chứng minh |
|---|---|
| Bạn qua được một bài kiểm chuẩn hoá | Bạn làm được việc thật hàng ngày |
| Bạn có nền kiến thức nhất định | Bạn ra quyết định đúng dưới áp lực thật |
| Bạn kiên trì (nhất là OSCP) | Bạn giao tiếp/báo cáo được với người không kỹ thuật |
| Bạn qua bộ lọc HR | Bạn xứng với mức lương nào |

Đây là chủ đề của note bản lề [[Certification vs Competence]] — đọc nó trước khi đầu tư thời gian và tiền.

## 4. Nguyên tắc chọn

1. **Chọn theo vai trò nhắm tới, không theo danh tiếng.** OSCP vô dụng cho vị trí GRC; CISSP vô dụng cho pentester junior.
2. **Chứng chỉ thực hành > chứng chỉ trắc nghiệm cho vai trò kỹ thuật.** OSCP/OSWE chứng minh làm được; trắc nghiệm chứng minh nhớ được.
3. **Xét chi phí thật.** OffSec đắt (khoá + thi + thi lại); có lộ trình rẻ hơn cho nền tảng — [[CTF and Practice Platforms]].
4. **Kinh nghiệm thực hành thường thắng chứng chỉ.** Bug bounty, CTF, home lab, đóng góp mã nguồn mở — [[Bug Bounty Practice]], [[Security Lab Setup]].
5. **Chú ý gia hạn.** OSCP+ gia hạn 3 năm; CISSP cần CPE. Tính chi phí duy trì.

## 5. Cạm bẫy

- **Sưu tập chứng chỉ.** Nhiều chữ cái sau tên không thay được kỹ năng hay kinh nghiệm.
- **Chọn theo hype.** OSCP nổi tiếng nhưng sai cho vai trò phòng thủ/GRC.
- **Bỏ qua chi phí thật.** OffSec + thi lại + gia hạn cộng lại lớn.
- **Tin chứng chỉ = việc làm.** Nó qua bộ lọc HR, không đảm bảo năng lực hay lương — [[Certification vs Competence]].
- **Dùng thông tin cũ.** OSCP đổi 11/2024; tài liệu trước đó (buffer overflow, điểm thưởng) đã sai.
- **Bỏ qua đường phi chứng chỉ.** Bug bounty và portfolio thật đôi khi thuyết phục hơn.

## 6. Checklist áp dụng

- [ ] Chứng chỉ này khớp vai trò tôi nhắm tới không?
- [ ] Nó thực hành hay trắc nghiệm — và vai trò của tôi cần cái nào?
- [ ] Tôi đã tính chi phí thật (khoá + thi + thi lại + gia hạn) chưa?
- [ ] Tôi có đường thực hành (CTF/bug bounty/lab) bổ trợ không?
- [ ] Thông tin tôi dựa vào có cập nhật (OSCP sau 11/2024) không?
- [ ] Tôi có đang sưu tập chứng chỉ thay vì xây năng lực không?

## Tham khảo

- [OffSec — PEN-200 (OSCP)](https://www.offsec.com/courses/pen-200/) và [WEB-300 (OSWE)](https://www.offsec.com/courses/web-300/)
- [OffSec — Changes to the OSCP](https://help.offsec.com/hc/en-us/articles/29840452210580-Changes-to-the-OSCP)
- [Paul Jerimy — Security Certification Roadmap](https://pauljerimy.com/security-certification-roadmap/)
- [CompTIA / (ISC)² / SANS GIAC catalogs](https://www.giac.org/)
- Seed gốc: `_archive-seed/OSCP & OSWE...md` (CyberJutsu)

## Liên kết

[[OSCP Preparation Path]] · [[OSWE Preparation Path]] · [[Certification vs Competence]] · [[Security Career Paths]] · [[CTF and Practice Platforms]] · [[Security]]
