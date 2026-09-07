---
tags: [networking, application, dns]
status: evergreen
---
# DNS

> Hệ cơ sở dữ liệu phân tán lớn nhất thế giới, và là **điểm chết đơn lẻ phổ biến nhất trong sự cố production**. "It's always DNS" là câu đùa vì nó đúng quá nhiều lần.

## 1. Kiến trúc phân giải

```
stub resolver (máy bạn)
  → recursive resolver (ISP / 8.8.8.8 / 1.1.1.1)
      → root (.)            → "hỏi TLD .com"
      → TLD (.com)          → "hỏi ns1.example.com"
      → authoritative       → "A = 93.184.216.34"
```
Mỗi bước đều được **cache theo TTL**. `dig +trace example.com` cho thấy đúng chuỗi này.

## 2. Các loại record cần thuộc

| Loại | Nội dung | Ghi chú |
|---|---|---|
| **A / AAAA** | IPv4 / IPv6 | |
| **CNAME** | Bí danh trỏ tên khác | **Không được đặt ở apex** (`example.com`) — dùng ALIAS/ANAME của nhà cung cấp |
| **NS** | Máy chủ tên có thẩm quyền | |
| **MX** | Máy chủ nhận mail, có priority | → [[Email Protocols]] |
| **TXT** | SPF, DKIM, xác minh domain | |
| **SRV** | Dịch vụ + port | Dùng nhiều trong service discovery |
| **CAA** | CA nào được cấp chứng chỉ cho domain | Nên có → [[Key Distribution & PKI]] |
| **SOA** | Thông số zone, **minimum TTL cho negative cache** | |
| **PTR** | Reverse lookup | Quan trọng cho mail deliverability |

## 3. Nguyên tắc
1. **TTL là hợp đồng về tốc độ thay đổi.** Muốn chuyển IP → hạ TTL xuống 60 s **trước vài ngày**, chuyển xong mới nâng lại.
2. **Negative caching cũng có TTL** (theo SOA minimum) — record vừa tạo có thể "chưa thấy" trong vài phút vì NXDOMAIN đã được cache.
3. **DNS thường chạy trên UDP/53**, chuyển sang TCP khi response >512B (hoặc >EDNS0 buffer, khuyến nghị 1232B) → phải mở **cả TCP/53** trên firewall.
4. **Round-robin DNS không phải load balancing**: không biết backend sống hay chết, client cache tuỳ ý. Dùng LB thật → [[Load Balancing & Proxy]].
5. **Anycast + DNS** là cách các resolver công cộng và CDN đưa người dùng tới điểm gần nhất → [[BGP & Interdomain Routing]], [[CDN]].
6. **Bảo mật**: **DNSSEC** ký dữ liệu (chống giả mạo, không mã hoá); **DoT/DoH** mã hoá đường truyền (chống nghe lén, không xác thực dữ liệu). Hai thứ giải quyết hai vấn đề khác nhau.

## 4. Cạm bẫy hay gặp
- **TTL cao lúc cần chuyển đổi khẩn cấp** → traffic vẫn đổ về IP cũ hàng giờ.
- **Cache DNS trong ứng dụng vĩnh viễn** — JVM cũ cache mãi (`networkaddress.cache.ttl`); nhiều thư viện HTTP cũng giữ IP đã phân giải trong connection pool.
- **CNAME ở apex** → vi phạm chuẩn, gây lỗi khó hiểu với MX/NS.
- **Quên TCP/53** → response lớn (DNSSEC, nhiều record) bị cắt, phân giải thất bại ngẫu nhiên.
- **Chỉ có một nhà cung cấp DNS** — sự cố Dyn 2016 đã cho thấy hậu quả. Dùng hai nhà cung cấp authoritative.
- **DNS làm health check**: thời gian hội tụ không kiểm soát được.

## 5. Checklist áp dụng
- [ ] TTL của record quan trọng là bao nhiêu? Có phù hợp với kế hoạch thay đổi không?
- [ ] Có ≥2 nhà cung cấp authoritative, đặt ở hạ tầng khác nhau không?
- [ ] Firewall có cho DNS qua **cả UDP và TCP 53** không?
- [ ] Ứng dụng có tôn trọng TTL không? (kiểm tra cache của runtime và của connection pool)
- [ ] CAA record đã đặt để giới hạn CA được cấp chứng chỉ chưa?
- [ ] Có giám sát phân giải từ nhiều vị trí địa lý không?

## Công cụ
| Lệnh | Dùng để |
|---|---|
| `dig +trace example.com` | xem toàn bộ chuỗi phân giải |
| `dig @1.1.1.1 example.com A +short` | hỏi một resolver cụ thể |
| `dig example.com SOA` | xem TTL negative cache |
| `dig -x 1.2.3.4` | reverse lookup |
| `kdig +tls` | thử DoT |

## Tham khảo
- RFC 1034 / 1035 — *Domain Names*: https://www.rfc-editor.org/rfc/rfc1035
- RFC 8484 — *DNS Queries over HTTPS (DoH)*: https://www.rfc-editor.org/rfc/rfc8484
- Cloudflare Learning — *What is DNS?*: https://www.cloudflare.com/learning/dns/what-is-dns/
- Julia Evans — *How DNS works* (zine + bài viết): https://jvns.ca/blog/2021/12/15/mess-with-dns/

## Liên kết
[[HTTP]] · [[CDN]] · [[Load Balancing & Proxy]] · [[Network Troubleshooting Playbook]] · [[Networking]]
