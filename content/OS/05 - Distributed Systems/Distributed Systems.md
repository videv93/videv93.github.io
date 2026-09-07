---
tags: [os, distributed]
status: evergreen
---
# Distributed Systems

> Khi hệ thống trải trên nhiều máy, **failure trở thành chuyện thường ngày, không phải ngoại lệ**. Toàn bộ lĩnh vực này là kỹ thuật xây thứ đáng tin từ những mảnh không đáng tin.

## 1. Vấn đề gốc: giao tiếp không đáng tin
Gói tin có thể **mất** (buffer đầy, lỗi bit), **trễ**, **đến sai thứ tự**, hoặc **trùng lặp**.

| Tầng | Đảm bảo |
|---|---|
| UDP | checksum phát hiện hỏng, **không** đảm bảo tới nơi |
| TCP | tin cậy, có thứ tự — bằng ACK + timeout + retransmit + sequence number |

**Cơ chế nền: ACK + timeout + retry + sequence number.**
- Không có sequence number → retry sinh **bản sao**.
- Timeout quá ngắn → retry thừa (làm nghẽn nặng thêm); quá dài → phục hồi chậm.
- **Adaptive timeout** (ước lượng RTT như TCP) là câu trả lời chuẩn; thêm **exponential backoff + jitter**.

## 2. Idempotency — khái niệm quan trọng nhất
Vì retry là bắt buộc, mọi thao tác nên **idempotent**: làm nhiều lần cho kết quả như làm một lần.
| Thao tác | Idempotent? | Cách làm cho idempotent |
|---|---|---|
| `read(file, offset)` | ✅ tự nhiên | — |
| `write(file, offset, data)` | ✅ (ghi tuyệt đối tại offset) | dùng offset tuyệt đối thay vì "append" |
| `append` | ❌ | thêm **request ID** khử trùng phía server |
| "trừ 100k khỏi tài khoản" | ❌ | dùng transaction ID / idempotency key |

Đây chính là lý do [[Network File System]] được thiết kế **stateless**.

## 3. RPC — và những chỗ ảo giác rách
RPC làm lời gọi mạng *trông giống* lời gọi hàm. Nó gồm: stub sinh tự động, **marshalling/serialization**, gửi, thực thi, trả kết quả.

**Nhưng lời gọi mạng khác lời gọi hàm ở mọi điểm quan trọng:**
| Vấn đề | Lời gọi hàm | RPC |
|---|---|---|
| Thất bại một phần | không có | **có** — không biết server đã làm hay chưa |
| Latency | ns | ms — chênh 6 bậc |
| Con trỏ | truyền được | không (phải serialize cả đồ thị dữ liệu) |
| Timeout | không cần | bắt buộc |
| Đồng thời | rõ ràng | server có thể xử lý song song |

> **Fallacies of Distributed Computing** (Deutsch/Gosling): mạng tin cậy, latency bằng 0, băng thông vô hạn, mạng an toàn, topo không đổi, một admin, chi phí truyền bằng 0, mạng đồng nhất — **tất cả đều sai**.

## 4. Ngữ nghĩa đảm bảo
| Ngữ nghĩa | Nghĩa | Cách đạt |
|---|---|---|
| **At-most-once** | không bao giờ trùng, có thể mất | gửi không retry |
| **At-least-once** | không bao giờ mất, có thể trùng | retry — **mặc định thực tế** |
| **Exactly-once** | không mất, không trùng | at-least-once **+ idempotency/khử trùng** — không có phép màu nào khác |

## 5. Cạm bẫy
- **Coi lời gọi mạng như lời gọi hàm.** ORM lazy-loading qua mạng, microservice gọi chuỗi 10 tầng — đây là gốc của phần lớn sự cố hiệu năng.
- **Retry không có backoff + jitter** → **retry storm** biến sự cố nhỏ thành sập toàn hệ.
- **Không đặt timeout** → thread/kết nối kẹt vĩnh viễn, cạn pool → sập lan truyền.
- **Tin đồng hồ giữa các máy** — clock skew là thật; dùng logical clock/version, không dùng wall clock để sắp thứ tự.
- **Hứa "exactly-once" mà không có khử trùng** ở phía nhận.
- **Bỏ qua thất bại một phần**: timeout **không** nghĩa là thao tác chưa xảy ra.

## 6. Checklist áp dụng
- [ ] Mọi lời gọi ra ngoài có **timeout** không?
- [ ] Retry có **backoff + jitter** và **giới hạn số lần** không?
- [ ] Thao tác ghi có idempotency key không?
- [ ] Có circuit breaker / bulkhead để chặn sập lan truyền không?
- [ ] Timeout của tầng ngoài có **lớn hơn** tổng timeout tầng trong không?
- [ ] Đã diễn tập kịch bản "server trả lời chậm" (không phải chỉ "server chết") chưa?

## Tham khảo
- OSTEP ch.48 *Distributed Systems*: https://pages.cs.wisc.edu/~remzi/OSTEP/dist-intro.pdf
- Birrell & Nelson — *Implementing Remote Procedure Calls* (1984): https://dl.acm.org/doi/10.1145/2080.357392
- Waldo et al. — *A Note on Distributed Computing*: https://scholar.harvard.edu/files/waldo/files/waldo-94.pdf
- AWS Builders' Library — *Timeouts, retries, and backoff with jitter*: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
- Kleppmann — *Designing Data-Intensive Applications*, ch.8

## Liên kết
[[Network File System]] · [[Andrew File System]] · [[Cryptography in OS]] · [[Event-based Concurrency]] · [[OS]]
