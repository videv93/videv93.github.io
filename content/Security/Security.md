---
tags: [security, moc]
type: moc
status: evergreen
created: 2026-09-07
updated: 2026-09-07
---
# Security

> Bản đồ vùng kiến thức **an ninh thông tin** — nghề, quy trình và tư duy — chứ không phải cách cấu hình bảo mật cho từng công nghệ cụ thể.
> Dựng theo [[Knowledge Seed Playbook]], lần chạy thứ tám.

## Vault này nói về cái gì (và không nói về cái gì)

Vault đã đông. Bảo mật *của một công nghệ cụ thể* đã có nhà ở area khác từ lâu. Security area này sở hữu **thực hành và nghề nghiệp bảo mật**: cách tấn công có phương pháp, cách phòng thủ có bằng chứng, cách quản trị rủi ro, và cách xây sự nghiệp trong ngành.

### Khái niệm có nhà ở area khác — **đừng định nghĩa lại ở đây**

| Khái niệm                                                      | Nhà của nó                                                                                                                                                     | Security area làm gì thay vào đó                                                                                   |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| TLS, PKI, VPN/IPsec, firewall, giao thức xác thực              | [[TLS]] · [[Key Distribution & PKI]] · [[VPN & IPsec]] · [[Firewall & Filtering]] · [[Authentication Protocols]] (Networking)                                  | Chỉ nói *cách tấn công và kiểm thử* chúng                                                                          |
| Mô hình đe doạ ở tầng mạng                                     | [[Threat Model & Attacks]] (Networking)                                                                                                                        | [[Threat Modeling Practice]] nói về **quy trình** STRIDE/attack tree cho hệ thống nói chung                        |
| Nguyên thuỷ mật mã                                             | [[Cryptographic Building Blocks]] (Networking) · [[Cryptography in OS]] (OS)                                                                                   | Chỉ nói *cách chúng bị dùng sai*                                                                                   |
| Xác thực & phân quyền ở tầng ứng dụng                          | [[Authentication and Authorization]] · [[Backend Security]] (Backend)                                                                                          | [[Broken Access Control]] nói về *cách phá* chúng                                                                  |
| Quyền, ACL, hardening hệ điều hành                             | [[Access Control]] · [[Authentication]] · [[OS Security Fundamentals]] (OS)                                                                                    | [[Privilege Escalation]] nói về *cách vượt* chúng                                                                  |
| Secrets, DevSecOps, bảo mật container/K8s/cloud ở góc vận hành | [[Secrets Management]] · [[DevSecOps]] · [[Container Registry & Image Security]] · [[Kubernetes Operations & Security]] · [[AWS Security & Identity]] (DevOps) | [[Cloud Security Posture]] · [[Container and Kubernetes Attack Surface]] nói từ **phía tấn công và phía đánh giá** |
| Bảo mật cơ sở dữ liệu                                          | [[Database Security]] (Database)                                                                                                                               | [[Injection Attacks]] nói về khai thác                                                                             |
| Sự cố vận hành & postmortem                                    | [[Incident Response & Postmortem]] (DevOps)                                                                                                                    | [[Security Incident Response]] là **quy trình khác**: có kẻ địch, có bằng chứng, có nghĩa vụ pháp lý               |
| Audit smart contract                                           | [[Blockchain]] — cả một area riêng                                                                                                                             | Không lặp lại; [[Security Career Paths]] chỉ sang                                                                  |

## Cách dùng vault này

- **`status` là chỉ báo độ tươi, đọc nó trước khi đọc nội dung.** `evergreen` = nguyên lý bền hàng thập kỷ. `growing` = đúng hôm nay, kiểm lại hàng năm. `seed` = đang chuyển động nhanh, kiểm lại trước khi trích dẫn.
- **Ba note bản lề (⚠️) nên đọc trước mọi thứ khác.** Chúng là chỗ kiến thức trong vault này va chạm với nhau.
- Giải thích tiếng Việt, thuật ngữ giữ nguyên tiếng Anh.

> [!warning] Điều kiện tiên quyết cho toàn bộ thư mục `01`, `02`, `05`
> Mọi kỹ thuật trong vault này chỉ được áp dụng lên hệ thống bạn **sở hữu** hoặc có **uỷ quyền bằng văn bản**. Đọc [[Authorization and Rules of Engagement]] trước khi chạy bất kỳ công cụ nào.

## 00 - Nền tảng & Đạo đức

- [[Security Mental Models]] — CIA, defense in depth, assume breach, kinh tế học của kẻ tấn công
- [[Authorization and Rules of Engagement]] — ranh giới pháp lý, scope, hợp đồng, luật Việt Nam
- [[Security Risk Management]] — rủi ro = khả năng × tác động, risk register, chấp nhận rủi ro
- [[Threat Modeling Practice]] — STRIDE, attack tree, DFD; làm khi nào và làm với ai
- ⚠️ [[Disclosure Ethics]] — **note bản lề**: full disclosure ↔ coordinated disclosure ↔ im lặng
- ⚠️ [[Offense vs Defense Bias]] — **note bản lề**: vì sao seed thiên tấn công còn thị trường trả tiền cho phòng thủ

## 01 - Tấn công: nền tảng

- [[Penetration Testing Lifecycle]] — bảy pha, và pha nào thực sự tạo ra giá trị
- [[Reconnaissance and Enumeration]] — pha quyết định kết quả, và pha bị làm ẩu nhất
- [[Exploitation Fundamentals]] — từ lỗ hổng tới quyền thực thi
- [[Privilege Escalation]] — Linux và Windows, thủ công trước công cụ
- [[Post-Exploitation and Lateral Movement]] — persistence, pivoting, và ranh giới đạo đức
- [[Active Directory Attacks]] — trọng tâm mới của OSCP từ 11/2024
- [[Password Attacks and Credential Access]] — hash, cracking, spraying, và vì sao MFA đổi luật chơi

## 02 - Bảo mật ứng dụng web

- [[Web Attack Surface]] — bản đồ nơi lỗi thực sự nằm
- [[OWASP Top 10 in Practice]] — dùng đúng: danh sách nhận thức, không phải checklist kiểm thử
- [[Injection Attacks]] — SQLi, command, template, NoSQL
- [[XSS and Client-Side Attacks]] — reflected/stored/DOM, CSP, prototype pollution
- [[Broken Access Control]] — IDOR, BOLA; hạng mục số 1 và khó tự động hoá nhất
- [[SSRF and XXE]] — hai lỗ hổng biến server thành công cụ của kẻ tấn công
- [[Insecure Deserialization]] — Java, .NET, PHP, Python
- [[Business Logic Flaws]] — không scanner nào tìm được
- [[API Security Testing]] — REST, GraphQL, và vì sao API đổi mô hình đe doạ
- [[Source Code Review for Vulnerabilities]] — kỹ năng lõi của OSWE, và của mọi AppSec engineer

## 03 - Phòng thủ & vận hành

- [[Blue Team Operations]] — SOC làm gì cả ngày, thật sự
- [[Detection Engineering]] — viết detection như viết phần mềm
- [[SIEM and Log Analysis]] — log nào đáng thu, log nào chỉ đốt tiền
- [[Security Incident Response]] — sáu pha NIST, và khác gì postmortem của SRE
- [[Digital Forensics]] — chain of custody, order of volatility
- [[Threat Hunting]] — săn theo giả thuyết, không săn theo cảnh báo
- [[Vulnerability Management]] — CVSS, EPSS, KEV: ưu tiên thế nào cho đúng
- [[Purple Team Exercises]] — biến tấn công thành detection dùng lại được

## 04 - Threat Intelligence & OSINT

> Thư mục này trả lời một **file rỗng hoàn toàn** trong seed. Xem ghi chú nguồn trong [[Cyber Threat Intelligence]].

- [[Cyber Threat Intelligence]] — bốn tầng CTI, và vì sao phần lớn "threat feed" là vô dụng
- [[OSINT Techniques]] — thu thập nguồn mở có phương pháp, và ranh giới pháp lý
- [[MITRE ATTACK Framework]] — ngôn ngữ chung giữa red và blue
- [[Threat Actor Profiling]] — APT naming, diamond model, và bẫy quy kết
- [[Indicators and Intel Sharing]] — IOC, Pyramid of Pain, STIX/TAXII, TLP

## 05 - Malware & Reverse Engineering

- [[Malware Analysis Fundamentals]] — phân loại, lab an toàn, quy trình phân tích
- [[Static and Dynamic Analysis]] — hai nửa của cùng một câu hỏi
- [[Reverse Engineering Basics]] — assembly, Ghidra, và cần bao nhiêu là đủ
- [[Ransomware Anatomy]] — chuỗi tấn công đắt nhất thập kỷ
- [[Binary Exploitation Basics]] — stack overflow, ROP; và vì sao OffSec đã bỏ nó khỏi kỳ thi

## 06 - Con người & tổ chức

- [[Social Engineering]] — vector thành công nhất, và ít được luyện nhất
- [[Phishing and Email Defense]] — SPF/DKIM/DMARC, và giới hạn của đào tạo
- [[Security Awareness Programs]] — cái gì có tác dụng, cái gì chỉ để qua audit
- [[Insider Threat]] — ác ý, bất cẩn, và bị chiếm quyền
- [[Security Culture]] — vì sao đội bảo mật bị né tránh, và cách sửa

## 07 - Governance, Risk & Compliance

- [[Security Frameworks Landscape]] — NIST CSF, ISO 27001, CIS Controls: chọn cái nào
- [[ISO 27001 and SOC 2]] — hai chứng nhận khách hàng thật sự hỏi
- [[Security Policy and Standards]] — policy / standard / procedure / guideline
- [[Privacy and Data Protection]] — GDPR, Nghị định 13/2023, Luật An ninh mạng
- [[Third-Party and Supply Chain Risk]] — rủi ro bạn không kiểm soát nhưng vẫn chịu trách nhiệm
- [[Security Metrics and Reporting]] — số liệu nào lãnh đạo thật sự dùng để quyết định

## 08 - Bề mặt tấn công hiện đại

- [[Cloud Security Posture]] — misconfiguration là nguyên nhân số 1, không phải 0-day
- [[Container and Kubernetes Attack Surface]] — escape, RBAC, supply chain image
- [[Mobile Application Security]] — OWASP MASVS, iOS/Android
- [[AI and LLM Security]] — prompt injection, OWASP LLM Top 10
- [[Software Supply Chain Attacks]] — SolarWinds, xz-utils, npm; SBOM và SLSA
- [[Zero Trust Architecture]] — nguyên lý thật, và cái được bán dưới cùng cái tên

## 09 - Nghề nghiệp & tài nguyên

- [[Security Certification Landscape]] — bản đồ chứng chỉ; **nhà của nội dung seed gốc**
- [[OSCP Preparation Path]] — lộ trình chi tiết, thay đổi 11/2024
- [[OSWE Preparation Path]] — lộ trình chi tiết, yêu cầu lập trình thật
- ⚠️ [[Certification vs Competence]] — **note bản lề**: động cơ của nguồn nói về chứng chỉ
- [[Deprecated Security Practices]] — nghĩa địa chiến thuật: đã chết, chết khi nào, còn được khuyên ở đâu
- [[Security Career Paths]] — pentest, AppSec, SOC, DFIR, GRC, research
- [[Security Learning Resources]] — catalogue nguồn, có cột Trạng thái
- [[Security Lab Setup]] — dựng lab an toàn, cách ly mạng
- [[Security Glossary]] — thuật ngữ và viết tắt
- [[CTF and Practice Platforms]] — HTB, THM, PortSwigger, Proving Grounds
- [[Bug Bounty Practice]] — kinh tế thật của bug bounty, không phải ảnh chụp payout

## Nguồn nền tảng dùng chung cho cả area

| Nguồn | Loại | Vì sao dùng |
|---|---|---|
| [OWASP](https://owasp.org/) | Tổ chức phi lợi nhuận | Chuẩn de-facto cho AppSec; miễn phí, không bán gì |
| [MITRE ATT&CK](https://attack.mitre.org/) | Tri thức nền | Ngôn ngữ chung red/blue; cập nhật hai lần/năm |
| [NIST CSRC](https://csrc.nist.gov/publications/sp) | Chuẩn chính phủ Mỹ | SP 800-series; khô nhưng chính xác và trích dẫn được |
| [PortSwigger Web Security Academy](https://portswigger.net/web-security) | Lab miễn phí | Lab web security tốt nhất hiện có, kể cả trả tiền |
| [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Dữ liệu | Danh sách lỗ hổng *đang bị khai thác thật* |
| [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/) | Báo cáo thường niên | Dữ liệu sự cố thật; đối trọng với truyền thông bảo mật |
| [The Hacker's Handbook series](https://portswigger.net/web-security/web-application-hackers-handbook) | Sách | Nền tảng web security, dù đã cũ |

## Ghi chú về seed

Seed gốc nằm ở `_archive-seed/`, gồm **2 file / 260 dòng** (nguồn: [bài blog CyberJutsu](https://cyberjutsu.io/blog/oscp-and-oswe-phan-tich-chuyen-sau-lo-trinh-luyen-thi-va-co-hoi-nghe-nghiep-2025) và [clipping 7onez/cti-expert](https://github.com/7onez/cti-expert#demo)):

1. `OSCP & OSWE...md` (250 dòng) — bài blog của **CyberJutsu**, một trung tâm đào tạo bán khoá học. Nội dung kỹ thuật chính xác nhưng khung bài bị định hình bởi động cơ thương mại. Toàn bộ nội dung của nó được giữ lại và mở rộng trong [[Security Certification Landscape]], [[OSCP Preparation Path]], [[OSWE Preparation Path]], [[Security Career Paths]], [[CTF and Practice Platforms]] — và được đối chiếu trung thực trong [[Certification vs Competence]].
2. `7onezcti-expert...md` (10 dòng) — clipping **rỗng hoàn toàn**, chỉ có frontmatter. Nó hứa "CTI & OSINT". Lời hứa đó được trả bằng cả thư mục `04`.

**Khoảng trống im lặng** (bài học 6.7 của playbook): seed không nhắc **một lần nào** tới phòng thủ, GRC, malware, con người, hay bất kỳ bề mặt tấn công hiện đại nào. Sáu trong mười thư mục của vault này không tồn tại trong seed. Cây thư mục được đối chiếu với bốn dàn ý lĩnh vực độc lập: NIST NICE Workforce Framework, CompTIA/(ISC)² CBK domains, mục lục *The Web Application Hacker's Handbook* + *Practical Malware Analysis*, và MITRE ATT&CK tactics.

## Liên kết

[[Knowledge Seed Playbook]] · [[Networking]] · [[Backend]] · [[DevOps]] · [[OS]] · [[Blockchain]] · [[Database]]
