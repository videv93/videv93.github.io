---
tags: [networking, foundation, performance]
status: growing
---
# Bandwidth & Latency

> Băng thông mua được, độ trễ thì không — nó bị chặn bởi tốc độ ánh sáng. **Phần lớn "mạng chậm" thực ra là trễ và số vòng RTT, không phải thiếu băng thông.**

## 1. Bốn thành phần của độ trễ một gói

| Thành phần | Công thức | Ghi chú |
|---|---|---|
| **Propagation** | khoảng cách / tốc độ lan truyền (~2/3 c trong cáp quang) | Không thể tối ưu, chỉ có thể rút ngắn khoảng cách → lý do tồn tại [[CDN]] |
| **Transmission** | kích thước gói / bandwidth | Gói 1500B trên 1 Gbps = 12 µs |
| **Queuing** | phụ thuộc tải | Biến thiên nhiều nhất → [[Queuing Disciplines]] |
| **Processing** | tra bảng, checksum | Thường nhỏ trên phần cứng |

**Latency = Prop + Trans + Queue + Proc**. **RTT ≈ 2 × latency** (nếu đường đi đối xứng — thường thì không).

## 2. Các con số nên thuộc lòng
| Chặng | RTT điển hình |
|---|---|
| Trong cùng datacenter | 0.2 – 0.5 ms |
| Cùng thành phố | 1 – 5 ms |
| HCM ↔ Singapore | ~30 ms |
| HCM ↔ US West | ~180 ms |
| Vòng quanh trái đất (giới hạn vật lý) | ~133 ms |
| 4G / 5G first hop | 30–70 ms / 10–20 ms |

**Bandwidth-Delay Product (BDP)** = bandwidth × RTT = lượng dữ liệu "đang bay trên đường". Ví dụ 1 Gbps × 100 ms = **12.5 MB**. Nếu cửa sổ TCP nhỏ hơn BDP thì **không bao giờ dùng hết băng thông** — dù đường truyền rỗng. Xem [[TCP Congestion Control]].

## 3. Nguyên tắc tối ưu
1. **Giảm số vòng RTT trước, giảm byte sau.** Mỗi RTT thừa = 180 ms với người dùng xuyên lục địa.
2. **Gộp round-trip**: TLS 1.3 (1-RTT), TCP Fast Open, QUIC 0-RTT → [[QUIC]].
3. **Đưa dữ liệu lại gần người dùng**: CDN, edge, replica đọc.
4. **Bật window scaling** khi BDP lớn (mặc định đã bật trên Linux hiện đại).
5. **Đo p99 chứ không đo trung bình** — trễ đuôi mới là thứ người dùng cảm nhận.

## 4. Cạm bẫy hay gặp
- **Nâng băng thông để chữa trang web chậm.** Sau ~5 Mbps, thời gian tải trang gần như chỉ phụ thuộc RTT.
- **Bufferbloat**: buffer quá lớn ở router nhà làm RTT vọt lên hàng trăm ms khi có upload chạy nền. Chữa bằng AQM (fq_codel) → [[Advanced Congestion Control]].
- **Đo bằng `ping` rồi kết luận về throughput** — hai thứ khác nhau; dùng `iperf3` cho throughput.
- **Quên jitter**: real-time (voice/video) sợ jitter hơn sợ latency cao ổn định → [[RTP & Real-Time Transport]].

## 5. Checklist áp dụng
- [ ] Thao tác này tốn bao nhiêu RTT? Gộp bớt được không?
- [ ] BDP của đường truyền là bao nhiêu? Cửa sổ có đủ lớn không?
- [ ] Đang đo p50 hay p99?
- [ ] Trễ đến từ hàng đợi (biến thiên) hay từ khoảng cách (ổn định)?

## Công cụ
| Tên | Dùng để | Link |
|---|---|---|
| `ping` / `mtr` | đo RTT, loss theo hop | https://www.bitwizard.nl/mtr/ |
| `iperf3` | đo throughput thực | https://iperf.fr/ |
| `tc netem` | mô phỏng trễ/mất gói khi test | https://man7.org/linux/man-pages/man8/tc-netem.8.html |

## Tham khảo
- Peterson & Davie — Ch.1.5 Performance: https://book.systemsapproach.org/foundation/performance.html
- Ilya Grigorik — *High Performance Browser Networking*, Ch.1: https://hpbn.co/primer-on-latency-and-bandwidth/
- Gettys & Nichols — *Bufferbloat: Dark Buffers in the Internet*: https://queue.acm.org/detail.cfm?id=2071893

## Liên kết
[[Network Fundamentals]] · [[TCP Congestion Control]] · [[Network Performance Tuning]] · [[Networking]]
