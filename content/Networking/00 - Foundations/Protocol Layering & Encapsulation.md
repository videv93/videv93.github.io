---
tags: [networking, foundation]
status: growing
---
# Protocol Layering & Encapsulation

> Mỗi tầng bọc dữ liệu của tầng trên vào payload của mình và thêm header — hiểu đúng chuỗi bọc này là hiểu được **vì sao MTU, overhead và fragmentation lại quan trọng đến thế**.

## 1. Chuỗi đóng gói một request HTTP

```
[ Ethernet hdr 14B | IP hdr 20B | TCP hdr 20B | TLS rec 5B+ | HTTP bytes ] FCS 4B
```

| Tầng | Header | Việc nó thêm vào |
|---|---|---|
| Ethernet | 14B (+4B FCS) | MAC nguồn/đích, EtherType |
| IP | 20B (IPv4) / 40B (IPv6) | địa chỉ, TTL, protocol, fragment |
| TCP | 20B (thường 32B có options) | port, seq/ack, cửa sổ, cờ |
| TLS | ~5B/record + MAC/tag | bảo mật → [[TLS]] |

**Tính nhanh**: MTU Ethernet 1500B → MSS TCP thường **1460B** (1500 − 20 − 20). Qua VPN/VXLAN còn thấp hơn.

## 2. Nguyên tắc
1. **Payload của tầng dưới = toàn bộ PDU của tầng trên.** Không có ngoại lệ trong mô hình chuẩn.
2. **Demultiplexing bằng trường trong header**: EtherType → IP; trường `protocol` của IP → TCP/UDP; port TCP → tiến trình. Đây là cách một gói tìm đúng đường lên.
3. **Overhead cố định làm gói nhỏ rất tốn**. Gói 1B payload vẫn tốn ~58B header → tại sao Nagle và batching tồn tại.
4. **Tunneling = đóng gói thêm một lần nữa** (IP-in-IP, VXLAN, WireGuard). Mỗi lớp tunnel ăn thêm MTU.

## 3. Cạm bẫy hay gặp
- **MTU mismatch**: tunnel giảm MTU nhưng PMTUD bị chặn (ICMP bị firewall drop) → kết nối bắt tay được nhưng treo khi truyền dữ liệu lớn. Triệu chứng kinh điển của "SSH login được nhưng `ls` thư mục to thì đơ".
- **Đếm băng thông theo payload mà quên header** — với gói nhỏ, overhead có thể >50%.
- **Giả định header có kích thước cố định**: IPv4 có options, TCP luôn có options (timestamp, SACK, window scale).
- **Sửa header ở middlebox** làm hỏng checksum nếu không tính lại (lý do NAT phải rewrite checksum).

## 4. Checklist áp dụng
- [ ] Đường đi này có tunnel nào không? MTU hiệu dụng còn bao nhiêu?
- [ ] ICMP "fragmentation needed" có bị firewall chặn không?
- [ ] Ứng dụng đang gửi nhiều gói nhỏ hay gộp được?
- [ ] Đã đo overhead thực bằng `tcpdump` chưa? → [[Packet Capture]]

## Tham khảo
- Peterson & Davie — Ch.1.3: https://book.systemsapproach.org/foundation/architecture.html
- RFC 1191 — *Path MTU Discovery*: https://www.rfc-editor.org/rfc/rfc1191
- RFC 4821 — *Packetization Layer Path MTU Discovery*: https://www.rfc-editor.org/rfc/rfc4821
- Cloudflare — *Path MTU discovery in practice*: https://blog.cloudflare.com/path-mtu-discovery-in-practice/

## Liên kết
[[OSI & TCP-IP Model]] · [[IP Packet & Fragmentation]] · [[Framing]] · [[Networking]]
