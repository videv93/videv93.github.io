---
tags: [security, nghề-nghiệp, chứng-chỉ]
status: growing
---
# OSCP Preparation Path

> ⚠️ Đọc [[Certification vs Competence]] trước khi cam kết thời gian và tiền cho lộ trình này.

> Lộ trình chi tiết cho OSCP, cập nhật cho những thay đổi từ 11/2024. Nội dung mở rộng từ seed CyberJutsu, giữ nguyên khuyến nghị của họ và bổ sung chi tiết kỹ thuật.

## 1. OSCP là gì (bản 2024+)

Chứng chỉ pentest thực hành của OffSec, qua khoá **PEN-200**. Thi: **24h khai thác + 24h viết báo cáo**, cần ≥70 điểm. Triết lý "Try Harder" — giải quyết vấn đề độc lập, kiên trì.

**Thay đổi quan trọng từ 1/11/2024:**
- **Active Directory thành trọng tâm**: bắt đầu từ tài khoản user thường, xâm nhập toàn domain — [[Active Directory Attacks]].
- **Bỏ điểm thưởng** (trước tối đa 10 điểm cho bài tập/lab).
- **OSCP+**: phiên bản gia hạn mỗi 3 năm (OSCP truyền thống có hiệu lực suốt đời). Gia hạn OSCP+: ~799 USD.
- **Buffer overflow đã bị loại** khỏi kỳ thi (từ 2022) — đừng dồn thời gian vào nó nữa; xem [[Binary Exploitation Basics]].

## 2. Kiến thức nền cần trước

| Nền | Cụ thể |
|---|---|
| **Mạng** | TCP/IP, HTTP, SMB, DNS — [[Threat Model & Attacks]] (Networking) |
| **Linux & Windows** | Command line, quản trị cơ bản |
| **Scripting** | Python, Bash đủ để tự động hoá |
| **Bảo mật cơ bản** | CIA, các loại tấn công — [[Security Mental Models]] |

## 3. Lộ trình theo giai đoạn

| Giai đoạn | Nội dung | Tài nguyên |
|---|---|---|
| **1. Nền tảng** | Mạng, HĐH, scripting nếu còn yếu | TryHackMe learning paths |
| **2. Enumeration & khai thác cơ bản** | Kỹ năng lõi — [[Reconnaissance and Enumeration]], [[Exploitation Fundamentals]] | HTB, PG Practice |
| **3. Privilege escalation** | Linux + Windows — [[Privilege Escalation]] | TryHackMe, tài liệu chuyên đề |
| **4. Active Directory** | **Trọng tâm mới** — [[Active Directory Attacks]] | PG Practice AD, HTB Pro Labs |
| **5. PEN-200 chính thức** | Khoá + lab OffSec | OffSec |
| **6. Diễn tập thi** | Máy giống đề, 24h liên tục | PG Practice, OSCP-like lists |

> [!note] Insider tip từ seed (vẫn đúng)
> Trước khi thi thật, **diễn tập 24h liên tục** trên máy tương tự đề để quen áp lực thời gian. Quản lý thời gian và sức bền tinh thần quan trọng ngang kỹ năng kỹ thuật — xem "pain points" dưới.

## 4. Nguyên tắc chuẩn bị

1. **Enumeration là chìa khoá.** Phần lớn bế tắc là do liệt kê chưa đủ, không phải thiếu exploit — [[Reconnaissance and Enumeration]].
2. **Ưu tiên AD.** Trọng tâm mới; BloodHound, Kerberoasting, lateral movement là bắt buộc.
3. **Thủ công trước, công cụ sau.** OSCP giới hạn Metasploit; hiểu cơ chế mới qua được khi công cụ không giúp.
4. **Luyện viết báo cáo.** 24h báo cáo là một nửa kỳ thi; báo cáo tồi trượt dù đủ điểm khai thác — [[Penetration Testing Lifecycle]].
5. **Ghi chép có cấu trúc từ đầu.** Thói quen ghi chép quyết định cả lab lẫn thi.
6. **Đừng học buffer overflow cho OSCP.** Đã bị loại; dồn thời gian vào AD và web.

## 5. Pain points và cách vượt (từ seed, mở rộng)

| Pain point | Giải pháp |
|---|---|
| **Áp lực thời gian 24h** | Diễn tập theo khung giờ; nghỉ theo chu kỳ (50/10); chuẩn bị đồ ăn/nước |
| **Thiếu kỹ năng phát hiện muộn** | Đánh giá trung thực sớm; bám syllabus PEN-200; bổ sung điểm yếu |
| **Quá tải thông tin** | Bám syllabus làm kim chỉ nam; checklist kỹ năng; thực hành ngay sau lý thuyết |
| **Tâm lý khi trượt** | Nhiều người thi 2-3 lần mới đậu; phân tích nguyên nhân; cộng đồng hỗ trợ |

> [!note] Từ seed
> *"Tôi đã thi OSCP 3 lần mới đậu. Điều quan trọng nhất là không bao giờ bỏ cuộc và rút kinh nghiệm từ mỗi lần thất bại."* — trượt OSCP là bình thường, không phải dấu hiệu bạn không hợp ngành.

## 6. Checklist sẵn sàng thi

- [ ] Tôi enumerate được đầy đủ mọi dịch vụ, không chỉ HTTP chưa?
- [ ] Tôi làm được chuỗi AD từ user thường tới domain admin chưa?
- [ ] Tôi làm privesc Linux và Windows thủ công được chưa?
- [ ] Tôi khai thác được mà không phụ thuộc Metasploit chưa?
- [ ] Tôi viết được báo cáo tái hiện được trong thời gian giới hạn chưa?
- [ ] Tôi đã diễn tập ít nhất một buổi 24h liên tục chưa?
- [ ] Ghi chép của tôi có đủ cấu trúc để viết báo cáo nhanh không?
- [ ] Tôi có đang tránh lãng phí thời gian vào buffer overflow không?

## 7. Tài nguyên

| Tên | Vai trò |
|---|---|
| **OffSec Proving Grounds** | Máy tương tự đề thi nhất |
| **Hack The Box** | Lab đa dạng, Pro Labs cho AD |
| **TryHackMe** | Học có lộ trình, thân thiện người mới |
| **CyberJutsu RedTeam - Exploit101** | Khoá tiếng Việt, có "OSCP Tips" (từ seed) |
| **TJ Null's OSCP-like list** | Danh sách máy HTB/PG giống đề |

## Tham khảo

- [OffSec — PEN-200 / OSCP](https://www.offsec.com/courses/pen-200/)
- [OffSec — OSCP Exam Guide](https://help.offsec.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide-Newly-Updated)
- [OffSec — Changes to the OSCP (2024)](https://help.offsec.com/hc/en-us/articles/29840452210580-Changes-to-the-OSCP)
- [OSCP Plus Overview — Cyberphinix](https://cyberphinix.de/blog/oscp-plus-overview/)
- [CyberJutsu — RedTeam Exploit101](https://cyberjutsu.io/course/khoa-hoc-red-team-exploit101)
- [TJ Null's OSCP prep list](https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/)

## Liên kết

[[Security Certification Landscape]] · [[OSWE Preparation Path]] · [[Certification vs Competence]] · [[Active Directory Attacks]] · [[Reconnaissance and Enumeration]] · [[CTF and Practice Platforms]] · [[Security]]
