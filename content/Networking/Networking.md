---
tags: [networking, moc]
type: MOC
updated: 2026-08-28
---
# 🌐 Networking — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng cho toàn bộ khu vực Networking. Cấu trúc bám theo dòng chảy tự nhiên của lĩnh vực: **bit trên dây → frame → gói → kết nối → tắc nghẽn → ứng dụng → bảo mật → vận hành**.

## Cách dùng vault này
- **Học lần đầu / theo lộ trình** → [[Learning Roadmap]]
- **Đang có sự cố** → [[Network Troubleshooting Playbook]] (bảng triệu chứng → nguyên nhân)
- **Tra nhanh một giao thức** → vào thư mục theo tầng
- Mỗi note có cùng bộ khung: **Khái niệm (bảng) → Nguyên tắc → Cạm bẫy → Checklist → Tham khảo**. Phần *Cạm bẫy* là phần đáng đọc nhất.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Viết tiếng Việt, **giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu và đồng nghiệp đều dùng tiếng Anh.

---

## 00 — Nền tảng
- [[Network Fundamentals]] — link/node/packet, best-effort, end-to-end argument
- [[OSI & TCP-IP Model]] — 7 tầng để nói chuyện, 4 tầng để chạy
- [[Protocol Layering & Encapsulation]] — chuỗi header, MTU, overhead
- [[Bandwidth & Latency]] — 4 thành phần trễ, BDP, các con số nên thuộc
- [[Switching Paradigms]] — circuit vs packet vs virtual circuit
- [[Learning Roadmap]] — lộ trình học và bài tập thực hành
- [[Computer Networks - A Systems Approach (Book TOC)|Systems Approach (Book TOC)]] — clipping gốc: mục lục sách nguồn

## 01 — Link Layer
- [[Encoding]] — NRZ, Manchester, 4B/5B, bài toán clock recovery
- [[Framing]] — byte/bit stuffing, biên frame, MTU và jumbo frame
- [[Error Detection]] — parity, checksum, CRC, FEC; detect vs correct
- [[Reliable Transmission]] — Stop-and-Wait, Go-Back-N, Selective Repeat, sliding window
- [[Ethernet]] — frame, MAC, VLAN, STP, LACP
- [[Wireless Networks]] — CSMA/CA, hidden terminal, airtime, Wi-Fi 6/7
- [[Access Networks]] — DSL, DOCSIS, PON, 5G, vệ tinh; last mile

## 02 — Internetworking
- [[Switching & Bridging]] — switch vs router, miền broadcast, STP
- [[IP Addressing & Subnetting]] — CIDR, dải riêng, longest prefix match
- [[IP Packet & Fragmentation]] — header IPv4, TTL, DF, PMTUD blackhole
- [[ARP, DHCP & ICMP]] — ba giao thức keo dán, và vì sao đừng chặn ICMP
- [[Routing Basics]] — distance vector vs link state, routing vs forwarding
- [[Intradomain Routing]] — OSPF, IS-IS, area, cost, BFD
- [[Router Implementation & Forwarding]] — RIB/FIB, TCAM, fast path, SDN

## 03 — Mở rộng ra quy mô Internet
- [[BGP & Interdomain Routing]] — chính sách, AS_PATH, hijack, RPKI
- [[NAT]] — PAT, CGNAT, STUN/TURN/ICE, cạn port
- [[IPv6]] — SLAAC, NDP, dual-stack, Happy Eyeballs
- [[Multicast]] — IGMP, PIM, và vì sao anycast thắng trong thực tế
- [[MPLS]] — label switching, L3VPN, traffic engineering, Segment Routing
- [[Mobile IP & Mobility]] — đổi mạng giữa chừng, MPTCP, thiết kế cho di động

## 04 — Transport
- [[UDP]] — 8 byte, và những trách nhiệm ứng dụng phải tự gánh
- [[TCP]] — seq/ack, cửa sổ, Nagle, head-of-line blocking
- [[TCP State Machine]] — handshake, TIME_WAIT, CLOSE_WAIT, backlog
- [[QUIC]] — 0-RTT, stream độc lập, connection migration
- [[RPC & gRPC]] — deadline, retry budget, ngữ nghĩa thực thi
- [[RTP & Real-Time Transport]] — jitter buffer, ngân sách trễ 150 ms, WebRTC
- [[Socket API]] — ngữ nghĩa read/write/close, epoll, socket option

## 05 — Congestion Control
- [[Resource Allocation]] — công bằng, TCP-friendliness, các trục thiết kế
- [[Queuing Disciplines]] — FIFO, RED, CoDel, fq_codel, bufferbloat
- [[TCP Congestion Control]] — AIMD, slow start, CUBIC, BBR
- [[Advanced Congestion Control]] — ECN, L4S, AQM, load shedding
- [[Quality of Service]] — DiffServ, DSCP, shaping vs policing

## 06 — Application Layer
- [[DNS]] — phân giải, TTL, record, "it's always DNS"
- [[HTTP]] — method, status, cache, keep-alive
- [[HTTP-2 & HTTP-3]] — multiplexing, HPACK, head-of-line blocking
- [[WebSocket & SSE]] — chọn cơ chế push, heartbeat, reconnect
- [[Email Protocols]] — SMTP/IMAP, SPF/DKIM/DMARC, deliverability
- [[CDN]] — anycast vs DNS steering, cache key, purge, edge compute
- [[Load Balancing & Proxy]] — L4 vs L7, health check, timeout ba tầng
- [[Presentation Formatting]] — JSON/Protobuf/Avro, tiến hoá schema
- [[Multimedia & Compression]] — lossless vs lossy, ABR streaming, codec

## 07 — Network Security
- [[Threat Model & Attacks]] — STRIDE, tấn công theo tầng, zero trust
- [[Cryptographic Building Blocks]] — AEAD, PFS, nonce, hậu lượng tử
- [[Key Distribution & PKI]] — X.509, ACME, CT log, chuỗi chứng chỉ
- [[TLS]] — bắt tay 1-RTT, SNI/ALPN, HSTS, mTLS
- [[Authentication Protocols]] — OAuth vs OIDC, JWT, WebAuthn
- [[Firewall & Filtering]] — default deny, conntrack, micro-segmentation
- [[VPN & IPsec]] — IPsec vs WireGuard, MSS clamping, ZTNA

## 08 — Thực hành & Công cụ
- [[Packet Capture]] — tcpdump, Wireshark, quy trình đọc capture
- [[Network Troubleshooting Playbook]] — 7 bước, bảng triệu chứng → nguyên nhân
- [[Network Performance Tuning]] — đo trước, thứ tự tối ưu
- [[Linux Network Stack]] — đường đi của gói, sysctl, netns
- [[Container & Cloud Networking]] — CNI, overlay MTU, VPC, NetworkPolicy

---

## Nguồn học nền tảng (dùng chung cho cả area)

| Nguồn | Loại | Dùng khi |
|---|---|---|
| Peterson & Davie — *Computer Networks: A Systems Approach* | Sách, miễn phí — https://book.systemsapproach.org/ | Hiểu **vì sao** thiết kế như vậy; là nguồn gốc của cấu trúc vault này |
| Kurose & Ross — *Computer Networking: A Top-Down Approach* | Giáo trình — https://gaia.cs.umass.edu/kurose_ross/ | Học lần đầu, nhiều bài tập |
| Stevens — *TCP/IP Illustrated, Vol. 1* | Sách tra cứu | Xem đúng từng byte trong header |
| Grigorik — *High Performance Browser Networking* | Sách, miễn phí — https://hpbn.co/ | Tối ưu web, latency, mobile |
| Beej's Guide to Network Programming | Tutorial — https://beej.us/guide/bgnet/ | Viết socket lần đầu |
| RFC Editor | Chuẩn gốc — https://www.rfc-editor.org/ | Khi tranh luận cần nguồn cuối cùng |
| Cloudflare Blog | Bài kỹ thuật — https://blog.cloudflare.com/ | Thực tế vận hành ở quy mô Internet |
| Julia Evans — wizardzines | Zine — https://wizardzines.com/ | Ôn nhanh, hình ảnh dễ nhớ |

## Ghi chú về `_archive-seed/`
Thư mục `_archive-seed/` giữ nguyên bản gốc của seed (clipping mục lục *Computer Networks: A Systems Approach*) để đối chiếu. Bản đang dùng nằm ở [[Computer Networks - A Systems Approach (Book TOC)]] trong `00 - Foundations`. Mọi mục trong mục lục đó đều đã được mở rộng thành note tương ứng ở vault này.

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
