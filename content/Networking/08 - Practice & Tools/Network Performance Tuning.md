---
tags: [networking, performance, ops]
status: growing
---
# Network Performance Tuning

> Quy trình, không phải danh sách sysctl. **Đo → tìm nút thắt → sửa một thứ → đo lại.** Bỏ bước đo thì mọi thứ còn lại là mê tín.

## 1. Xác định nút thắt ở đâu

| Triệu chứng | Nút thắt |
|---|---|
| Throughput thấp, CPU thấp, RTT cao | **Cửa sổ < BDP** hoặc mất gói → [[Bandwidth & Latency]] |
| Throughput thấp, CPU một core 100% | Xử lý gói dồn một core → bật RSS/RPS, kiểm tra IRQ affinity |
| RTT tăng vọt khi tải | **Bufferbloat** → [[Queuing Disciplines]] |
| Nhiều retransmit | Mất gói thật (link, hàng đợi) → [[TCP Congestion Control]] |
| Thời gian chờ ở `time_starttransfer` | Server chậm, không phải mạng |
| Nhiều kết nối mới mỗi giây | Thiếu keep-alive / connection pool |
| p99 xấu, p50 tốt | Hàng đợi, GC, hoặc một backend xấu |

**`curl -w` tách thời gian theo pha** — dùng nó trước khi động vào bất cứ tham số nào:
```bash
curl -o /dev/null -s -w 'dns:%{time_namelookup} tcp:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\n' https://example.com
```

## 2. Thứ tự tối ưu (hiệu quả giảm dần)
1. **Bớt round-trip** — gộp request, dùng keep-alive, HTTP/2-3, cache → thường là thắng lợi lớn nhất.
2. **Đưa dữ liệu lại gần** — CDN, edge, replica đọc → [[CDN]].
3. **Gửi ít byte hơn** — nén (Brotli/zstd), ảnh định dạng hiện đại, bỏ payload thừa.
4. **Sửa hàng đợi** — `fq_codel` ở gateway, giới hạn buffer.
5. **Chỉnh transport** — congestion control, window, offload. Cuối cùng, và chỉ khi có số liệu.

## 3. Đo cho đúng
| Công cụ | Đo gì |
|---|---|
| `iperf3` | throughput thuần, một hoặc nhiều luồng (`-P 8`) |
| `ss -ti` | cwnd, RTT, retrans của kết nối thật |
| `mtr` | loss/latency theo từng hop |
| `flent` | bufferbloat, hành vi khi tải |
| `tc netem` | mô phỏng mạng xấu để test |
| `nstat -az` | bộ đếm kernel trước/sau |

**Quy tắc**: đo cả **throughput và độ trễ dưới tải**. Một thay đổi làm throughput +10% nhưng p99 latency ×3 là thay đổi tồi.

## 4. Cạm bẫy hay gặp
- **Copy "bộ sysctl thần thánh"** từ blog cũ (đặc biệt `tcp_tw_recycle` — đã bị xoá khỏi kernel).
- **Tối ưu mạng khi nút thắt là ứng dụng** — TTFB cao gần như luôn là server, không phải mạng.
- **Đo bằng một luồng TCP** rồi kết luận về khả năng của hệ thống.
- **Test trên mạng lý tưởng** — người dùng thật có RTT 100 ms và 1% mất gói. Dùng `tc netem` để mô phỏng.
- **Tăng buffer để chữa mất gói** → bufferbloat.
- **Không đo baseline trước khi đổi** → không biết mình có làm tốt hơn không.

## 5. Checklist áp dụng
- [ ] Đã có baseline (throughput + p50/p99 latency) chưa?
- [ ] Nút thắt đã được xác định bằng số liệu, không phải giả định?
- [ ] Đã thử giảm số round-trip trước khi chỉnh sysctl chưa?
- [ ] Có đo độ trễ **khi đang tải** không?
- [ ] Chỉ thay đổi một biến mỗi lần, và có ghi lại không?
- [ ] Kết quả có tái lập được không?

## Tham khảo
- Grigorik — *High Performance Browser Networking*: https://hpbn.co/
- Brendan Gregg — *Systems Performance*, chương Network
- Cloudflare — *How to achieve low latency*: https://blog.cloudflare.com/how-to-achieve-low-latency/
- Netflix — *Linux network tuning* (FreeBSD/Linux tuning talks): https://netflixtechblog.com/

## Liên kết
[[Bandwidth & Latency]] · [[TCP Congestion Control]] · [[Linux Network Stack]] · [[Network Troubleshooting Playbook]] · [[Networking]]
