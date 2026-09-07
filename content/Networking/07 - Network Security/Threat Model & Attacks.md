---
tags: [networking, security, threat]
status: growing
---
# Threat Model & Attacks

> Bảo mật bắt đầu bằng câu hỏi **"chống ai, bảo vệ cái gì, giả định gì"** — không phải bằng việc bật thêm tính năng. Không có threat model thì mọi biện pháp chỉ là mê tín.

## 1. Bốn tính chất cần bảo vệ
| Tính chất | Nghĩa | Cơ chế |
|---|---|---|
| **Confidentiality** | Không ai đọc trộm được | Mã hoá → [[Cryptographic Building Blocks]] |
| **Integrity** | Không ai sửa được mà không bị phát hiện | MAC, chữ ký số |
| **Authenticity** | Đúng là người mình nghĩ | Chứng chỉ, [[Authentication Protocols]] |
| **Availability** | Dịch vụ vẫn chạy | Chống DDoS, rate limit |

Thêm hai cái thường bị bỏ quên: **non-repudiation** (không chối bỏ được) và **freshness** (chống replay).

## 2. Các tấn công mạng theo tầng

| Tầng | Tấn công | Phòng thủ |
|---|---|---|
| L2 | ARP spoofing, MAC flooding, rogue DHCP | DAI, port security, DHCP snooping → [[ARP, DHCP & ICMP]] |
| L3 | IP spoofing, BGP hijack, route leak | BCP 38, RPKI → [[BGP & Interdomain Routing]] |
| L4 | SYN flood, RST injection, port scan | SYN cookies, firewall → [[TCP State Machine]] |
| L7 | DNS cache poisoning, HTTP request smuggling, cache poisoning | DNSSEC, chuẩn hoá parser, WAF |
| Xuyên tầng | **MITM**, downgrade, replay, **DDoS khuếch đại** | TLS + HSTS, nonce, BCP 38 |

**DDoS khuếch đại**: kẻ tấn công giả IP nạn nhân, gửi query nhỏ tới dịch vụ UDP mở, dịch vụ trả response lớn tới nạn nhân. Hệ số khuếch đại: DNS ~50×, NTP `monlist` ~500×, memcached ~50000×. → **Không mở dịch vụ UDP không xác thực ra Internet** → [[UDP]].

## 3. Nguyên tắc
1. **Giả định mạng là thù địch (zero trust).** Mã hoá và xác thực **cả trong nội bộ**, không chỉ ở biên. Chu vi mạng không còn là ranh giới tin cậy.
2. **Defense in depth** — nhiều lớp, không lớp nào được coi là đủ.
3. **Least privilege** cho cả con người lẫn dịch vụ; segmentation để hạn chế lan ngang.
4. **Fail closed** cho quyết định bảo mật (lỗi thì từ chối), **fail open** cho khả dụng — phải chọn có ý thức từng chỗ.
5. **Không tự viết crypto.** Dùng thư viện đã được kiểm định.
6. **Kerckhoffs's principle**: an toàn phải nằm ở khoá, không ở việc giấu thiết kế.

## 4. Cạm bẫy hay gặp
- **Bảo vệ chu vi rồi để nội bộ trần trụi** — một máy bị chiếm là toàn bộ mạng phơi bày.
- **Chặn hết ICMP "cho an toàn"** → hỏng PMTUD và chẩn đoán, mà không tăng bảo mật đáng kể.
- **Rate limit theo IP** khi người dùng ở sau CGNAT → chặn oan hàng loạt → [[NAT]].
- **Log chứa dữ liệu nhạy cảm** (token, cookie, PII) → biến hệ thống log thành mục tiêu.
- **Tin dữ liệu từ header do client kiểm soát** (`X-Forwarded-For`, `Host`) → [[Load Balancing & Proxy]].
- **Coi "có HTTPS" là đã bảo mật** — TLS chỉ bảo vệ đường truyền.

## 5. Checklist threat modeling (STRIDE rút gọn)
- [ ] **S**poofing — ai có thể giả làm ai? Xác thực ở đâu?
- [ ] **T**ampering — dữ liệu nào có thể bị sửa trên đường? Có MAC/chữ ký không?
- [ ] **R**epudiation — có audit log không thể chối bỏ chưa?
- [ ] **I**nformation disclosure — dữ liệu nhạy cảm đi qua đâu? Có mã hoá at-rest và in-transit không?
- [ ] **D**enial of service — điểm nào tốn tài nguyên nhất? Có giới hạn không?
- [ ] **E**levation of privilege — chiếm được thành phần này thì đi được tới đâu?

## Tham khảo
- Peterson & Davie — 8.1 Trust and Threats: https://book.systemsapproach.org/security/trust.html
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Microsoft — *Threat Modeling / STRIDE*: https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats
- NIST SP 800-207 — *Zero Trust Architecture*: https://csrc.nist.gov/pubs/sp/800/207/final
- RFC 2827 / BCP 38 — *Network Ingress Filtering*: https://www.rfc-editor.org/rfc/rfc2827

## Liên kết
[[Cryptographic Building Blocks]] · [[Firewall & Filtering]] · [[TLS]] · [[Networking]]
