---
tags: [backend, reliability, scaling]
status: growing
---
# Scaling and Load Balancing

> Scale ngang chỉ hoạt động khi app **stateless**. Mọi vấn đề scaling khó đều quy về một câu hỏi: **state đang nằm ở đâu, và ai sở hữu nó?**

## 1. Hai trục
| | **Vertical** (máy to hơn) | **Horizontal** (nhiều máy hơn) |
|---|---|---|
| Độ khó | Gần như bằng 0 | Cần stateless + LB + hạ tầng |
| Trần | Có trần cứng, giá tăng phi tuyến | Gần như không trần |
| Chịu lỗi | Một máy chết = chết hết | Mất một instance không sao |
| Khi nào dùng | **Database** (thường vertical trước), giai đoạn đầu | App server, worker |

Thực tế: **vertical cho tầng dữ liệu, horizontal cho tầng ứng dụng** — cho tới khi buộc phải sharding.

## 2. Điều kiện để stateless
| State | Đưa đi đâu |
|---|---|
| Session | Cookie ký, hoặc Redis dùng chung → [[Authentication and Authorization]] |
| File upload | Object storage (S3) |
| Cache in-process | Redis (hoặc chấp nhận không nhất quán giữa instance) → [[Caching Strategies]] |
| Cron/lịch chạy | Scheduler tập trung + lock, không phải cron trong container app |
| WebSocket connection | Pub/sub để phát tán, hoặc sticky session → [[HTTP and Networking]] |
| Biến toàn cục đếm số | DB/Redis atomic counter |

## 3. Load balancer
| Tầng | Hoạt động ở | Ví dụ | Ghi chú |
|---|---|---|---|
| **L4** | TCP/IP | AWS NLB, IPVS | Nhanh, không hiểu HTTP → **sai với HTTP/2/gRPC** (connection dài dồn về một pod) |
| **L7** | HTTP | nginx, Envoy, ALB, Traefik | Route theo path/header, retry, breaker → [[Resilience Patterns]] |

Thuật toán: `round-robin` (mặc định), **`least-connections`** (tốt hơn khi thời gian xử lý lệch nhau), `consistent hashing` (khi cần affinity theo key, ví dụ cache).

**Health check**: phân biệt **liveness** (còn sống không → restart) và **readiness** (sẵn sàng nhận traffic chưa → đưa vào/ra pool). Readiness sai làm rơi request lúc deploy.

## 4. Khi database thành nút thắt
Thứ tự áp dụng (từ rẻ tới đắt):
1. **Index + sửa truy vấn** → [[Database Access and ORM]]
2. **Cache** đọc → [[Caching Strategies]]
3. **Read replica** — chỉ cho truy vấn đọc chịu được replication lag; cẩn thận "read your own write".
4. **Connection pooler** (PgBouncer) khi nhiều instance.
5. **Tách bảng nóng / tách service theo bounded context** → [[Monolith vs Microservices]]
6. **Sharding** — đắt và khó đảo ngược; chọn shard key rất kỹ (tránh hot shard, tránh truy vấn xuyên shard).

## 5. Autoscaling
- Scale theo **saturation** (queue depth, độ trễ, số request đang xử lý) chính xác hơn scale theo CPU.
- Cân nhắc **thời gian khởi động**: Go/Rust vài trăm ms; JVM/Rails/Django hàng chục giây → phải scale **trước** khi tải tới (predictive/scheduled scaling).
- Đặt `min` đủ lớn để chịu được đỉnh đột ngột, `max` để chặn hoá đơn chạy loạn.
- **Scale app không giúp gì nếu DB đã bão hoà** — thêm instance chỉ làm DB tệ hơn.

## 6. Cạm bẫy
- **Sticky session làm nạng chống** — che giấu state không nên có; mất pod là mất session người dùng.
- **Cron chạy trong mọi replica** — job chạy N lần. Cần leader election hoặc lock phân tán.
- **Scale app khi nút thắt ở DB** — làm sự cố nặng hơn.
- **L4 LB cho gRPC/HTTP2** — traffic dồn lệch nghiêm trọng.
- **Không có graceful shutdown** — scale-in làm rơi request đang xử lý.
- **Không giới hạn concurrency downstream** — 100 pod × 20 connection = 2000 kết nối tới DB có `max_connections=100`.
- **Đo bằng máy dev** — kết luận về khả năng chịu tải sai hoàn toàn. → [[Performance Optimization]]
- **Autoscale flapping** — ngưỡng lên/xuống quá gần nhau, thiếu cooldown.

## 7. Checklist trước khi scale ngang
- [ ] App có thật sự stateless không? (xoá ngẫu nhiên một instance đang có traffic để thử)
- [ ] Session, file, cache, cron đã ra khỏi process chưa?
- [ ] Tổng connection tới DB có nằm trong `max_connections` không?
- [ ] Nút thắt hiện tại đã được xác định bằng đo đạc chưa (app hay DB)?
- [ ] Readiness/liveness probe có phản ánh đúng khả năng phục vụ không?
- [ ] Có graceful shutdown và `terminationGracePeriod` đủ dài không?
- [ ] LB có ở tầng L7 nếu dùng HTTP/2 hay gRPC không? → [[gRPC and Protobuf]]
- [ ] Autoscale dựa trên chỉ số nào, và thời gian khởi động là bao lâu?

## Tham khảo
- Google SRE Book — Load Balancing at the Frontend / Datacenter: https://sre.google/sre-book/load-balancing-frontend/
- AWS Builders' Library — Using load shedding to avoid overload: https://aws.amazon.com/builders-library/using-load-shedding-to-avoid-overload/
- Kubernetes — Configure Liveness, Readiness and Startup Probes: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- The Twelve-Factor App — Processes & Concurrency: https://12factor.net/processes
- *Designing Data-Intensive Applications*, ch.6 Partitioning: https://dataintensive.net/

## Liên kết
[[Performance Optimization]] · [[Resilience Patterns]] · [[Deployment and Configuration]] · [[Backend]]
