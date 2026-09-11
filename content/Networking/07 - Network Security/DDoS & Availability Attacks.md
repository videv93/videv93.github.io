---
tags: [networking, security, ddos, availability]
status: growing
---
# DDoS & Availability Attacks

> DDoS không phải là "hack" — không ai chiếm quyền, không ai đọc trộm dữ liệu. Kẻ tấn công chỉ **bắt bạn tiêu tài nguyên đắt hơn số tiền họ bỏ ra**. Vì vậy phòng thủ DDoS thực chất là bài toán **kinh tế và dung lượng**, không phải bài toán mật mã.

## 1. Ba lớp tấn công — phân biệt trước khi phòng thủ

| Lớp | Cạn kiệt cái gì | Ví dụ | Đơn vị đo |
|---|---|---|---|
| **Volumetric (L3/L4)** | Băng thông đường truyền | UDP flood, DNS/NTP/memcached amplification | Gbps / Tbps |
| **Protocol / State (L4)** | Bảng trạng thái, conntrack, socket | SYN flood, ACK flood, Slowloris, TLS renegotiation | pps / số kết nối |
| **Application (L7)** | CPU, DB, worker của ứng dụng | HTTP flood vào endpoint tìm kiếm, GraphQL query đắt, cache-busting query string | RPS / query đắt |

**Nguyên tắc chọn phòng thủ**: volumetric phải chặn **ở xa bạn** (upstream, scrubbing center); protocol chặn **ở biên** (SYN cookies, LB); application chặn **ở lớp hiểu ngữ nghĩa** (WAF, rate limit theo user/token, chi phí truy vấn).

## 2. Amplification — vì sao rẻ mà mạnh

Kẻ tấn công giả IP nạn nhân (spoof), gửi query **nhỏ** tới dịch vụ UDP mở, dịch vụ trả response **lớn** về phía nạn nhân. Không cần botnet lớn, chỉ cần hệ số khuếch đại.

| Dịch vụ | Hệ số | Ghi chú |
|---|---|---|
| DNS (ANY query) | ~50× | Phổ biến nhất, dễ tìm open resolver |
| NTP `monlist` | ~500× | Lệnh debug cũ, nên tắt |
| memcached (UDP 11211) | ~50 000× | Kỷ lục 1.35 Tbps vào GitHub, 2018 |
| CLDAP / SSDP / Chargen | 50–70× | Thiết bị IoT và in-máy-chủ cấu hình mặc định |

Gốc rễ là **IP spoofing khả thi** → chống bằng **BCP 38 / RFC 2827 ingress filtering** ở phía ISP, và **không mở dịch vụ UDP không xác thực ra Internet** ở phía bạn → [[UDP]] · [[Threat Model & Attacks]].

## 3. Tấn công cạn kiệt trạng thái

- **SYN flood**: gửi SYN nhưng không bao giờ trả ACK → half-open queue đầy. Chống bằng **SYN cookies** (không cấp phát state cho tới khi ACK hợp lệ về) → [[TCP State Machine]].
- **Slowloris / slow POST**: mở nhiều kết nối, gửi header/body **cực chậm** để giữ worker. Chống bằng timeout header/body ở reverse proxy, giới hạn kết nối/IP, dùng server event-driven thay vì thread-per-connection.
- **HTTP/2 Rapid Reset** (CVE-2023-44487): mở stream rồi `RST_STREAM` ngay, lặp lại — một kết nối tạo hàng chục nghìn request/s. Chống bằng giới hạn số stream reset trên mỗi kết nối → [[HTTP-2 & HTTP-3]].
- **TLS handshake flood**: bắt tay đắt hơn nhiều cho server so với client → terminate TLS ở biên/CDN, bật session resumption.

## 4. Kiến trúc phòng thủ theo lớp

1. **Anycast + dung lượng biên** — cùng một IP quảng bá từ hàng trăm PoP, BGP tự chia nhỏ traffic tấn công theo vùng địa lý. Đây là cơ chế hấp thụ volumetric hiệu quả nhất → [[CDN]] · [[BGP & Interdomain Routing]].
2. **Scrubbing center / upstream blackhole** — chuyển traffic qua trung tâm lọc (BGP announce hoặc DNS redirect); RTBH (remotely triggered black hole) là biện pháp cuối, hy sinh IP đó để cứu phần còn lại.
3. **Giấu origin** — origin chỉ nhận kết nối từ dải IP của CDN (allowlist + mTLS). Lộ IP origin làm vô hiệu toàn bộ lớp trên. Cẩn thận rò rỉ qua bản ghi DNS cũ, email header, chứng chỉ trong **CT log** → [[Key Distribution & PKI]].
4. **Rate limit nhiều chiều** — theo IP, theo subnet/ASN, theo API key/user, theo endpoint. Token bucket ở biên, và **quota chi phí** cho truy vấn đắt.
5. **Bot management / proof-of-work** — JS challenge, CAPTCHA, attestation. Đảo ngược kinh tế: bắt phía tấn công trả giá.
6. **Graceful degradation** — load shedding có chủ đích: trả cache cũ (`stale-if-error`), tắt tính năng đắt, xếp hàng thay vì sập. **Chọn trước cái gì được hy sinh.**
7. **Autoscale có trần** — scale để chịu tải, nhưng đặt trần chi phí, nếu không tấn công chuyển từ downtime sang **hoá đơn** (EDoS — economic denial of sustainability).

## 5. Cạm bẫy hay gặp
- **Rate limit theo IP** khi người dùng ở sau CGNAT hoặc proxy doanh nghiệp → chặn oan hàng loạt → [[NAT]].
- **Tin `X-Forwarded-For` do client gửi** → kẻ tấn công tự chọn "IP" của mình, rate limit vô nghĩa. Chỉ tin XFF do proxy tin cậy của bạn ghi → [[Load Balancing & Proxy]].
- **Lộ IP origin** → mọi khoản chi cho CDN thành vô ích.
- **Autoscale không trần** → tấn công thành công về mặt tài chính dù site vẫn sống.
- **Coi mọi sự cố sập là DDoS** — phần lớn "DDoS" thực ra là bug retry storm, cron trùng giờ, hoặc thundering herd sau khi purge cache → [[CDN]].
- **Log không giới hạn khi bị flood** → hệ thống log sập theo, mất luôn khả năng quan sát → [[Logging & Log Aggregation]].
- **Không có runbook** → mất 30 phút đầu chỉ để tìm người có quyền bật chế độ phòng thủ.

## 6. Checklist chuẩn bị
- [ ] Origin đã ẩn sau CDN/scrubbing và chỉ allowlist IP biên chưa?
- [ ] Biết baseline bình thường (RPS, pps, bandwidth, p99) để phát hiện bất thường chưa?
- [ ] SYN cookies bật? Timeout header/body ở proxy đã đặt?
- [ ] Có giới hạn stream reset cho HTTP/2 chưa?
- [ ] Rate limit có chiều nào khác ngoài IP không?
- [ ] Endpoint đắt nhất (search, export, GraphQL) có quota riêng chưa?
- [ ] Đã định nghĩa trước cái gì bị tắt khi quá tải (load shedding plan)?
- [ ] Autoscale có trần chi phí và cảnh báo chưa?
- [ ] Runbook + đầu mối liên hệ ISP/nhà cung cấp scrubbing có sẵn ngoài hệ thống đang bị tấn công chưa?

## Tham khảo
- RFC 4732 — *Internet Denial-of-Service Considerations*: https://www.rfc-editor.org/rfc/rfc4732
- RFC 2827 / BCP 38 — *Network Ingress Filtering*: https://www.rfc-editor.org/rfc/rfc2827
- Cloudflare Learning — *What is a DDoS attack?*: https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/
- GitHub Engineering — *February 28th DDoS Incident Report* (memcached, 1.35 Tbps): https://github.blog/2018-03-01-ddos-incident-report/
- Google Cloud — *HTTP/2 Rapid Reset* (CVE-2023-44487): https://cloud.google.com/blog/products/identity-security/google-cloud-mitigated-largest-ddos-attack-peaking-above-398-million-rps
- CISA — *Understanding and Responding to DDoS Attacks*: https://www.cisa.gov/resources-tools/resources/understanding-and-responding-distributed-denial-service-attacks

## Liên kết
[[Threat Model & Attacks]] · [[Firewall & Filtering]] · [[CDN]] · [[TCP State Machine]] · [[UDP]] · [[Load Balancing & Proxy]] · [[Networking]]
