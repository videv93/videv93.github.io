---
tags: [backend, reliability, patterns]
status: growing
---
# Resilience Patterns

> Giả định nền tảng: **mọi lời gọi ra ngoài process sẽ thất bại, và tệ hơn — sẽ chậm.** Thất bại thì dễ xử lý; *chậm* mới là thứ kéo sập cả hệ thống, vì nó giữ tài nguyên của bạn.

## 1. Bộ công cụ cốt lõi
| Pattern | Chống lại | Ghi chú |
|---|---|---|
| **Timeout** | Dependency treo | Phòng tuyến số 1; **không có mặc định an toàn** ở hầu hết thư viện |
| **Retry + backoff + jitter** | Lỗi tạm thời | Chỉ cho thao tác **idempotent**, phải có giới hạn |
| **Circuit breaker** | Dependency đã chết | Ngừng gọi để khỏi lãng phí và khỏi làm nó tệ hơn |
| **Bulkhead** | Một dependency ngốn hết tài nguyên | Pool riêng cho từng downstream |
| **Rate limit / throttling** | Quá tải từ trên | → [[Backend Security]] |
| **Load shedding** | Quá tải chính mình | Từ chối sớm (`503`) tốt hơn chậm cho tất cả |
| **Graceful degradation** | Tính năng phụ chết | Trả kết quả một phần thay vì lỗi toàn phần |
| **Idempotency** | Retry gây trùng | → [[Background Jobs and Queues]] |

## 2. Timeout — quy tắc thực hành
- Timeout của **caller phải ngắn hơn** timeout của người gọi nó → tránh dồn tắc ngược lên trên.
- Đặt **cả hai**: connect timeout và read timeout.
- Ngân sách phải lan truyền: Go dùng `context.WithTimeout` → [[Go Backend]]; gRPC lan deadline sẵn → [[gRPC and Protobuf]].
- Timeout không có retry = mất request; retry không có timeout = treo. Luôn đi cùng nhau.

## 3. Retry — làm đúng
```
delay = min(cap, base * 2^attempt) * random(0.5, 1.5)   # exponential + jitter
```
| Nên retry | Không nên retry |
|---|---|
| Timeout kết nối, `503`, `429` (theo `Retry-After`), lỗi mạng tạm | `400`, `401`, `403`, `422` — client sai, retry vô ích |
| Thao tác idempotent | `POST` tạo tài nguyên **không** có idempotency key |

- **Không retry nhiều tầng** — 3 tầng mỗi tầng retry 3 lần = 27 lần gọi. Chọn **một** tầng chịu trách nhiệm retry.
- Retry đồng loạt không jitter → **thundering herd** đúng lúc hệ thống yếu nhất.
- Kèm **retry budget** (ví dụ: retry không quá 10% tổng traffic).

## 4. Circuit breaker
```
CLOSED  ── tỉ lệ lỗi vượt ngưỡng ──►  OPEN  ── sau cooldown ──►  HALF-OPEN
   ▲                                                                │
   └──────────────── thử thành công ────────────────────────────────┘
```
- **OPEN** = fail nhanh, không gọi downstream, trả fallback ngay.
- Ngưỡng nên dựa trên **tỉ lệ** lỗi trong cửa sổ trượt, không phải số đếm tuyệt đối.
- Phải có metric và alert khi breaker mở — nếu không, sự cố bị "che" cho tới khi lớn. → [[Observability]]

## 5. Cạm bẫy
- **Không có timeout** — cạn connection pool → mọi endpoint chết, kể cả endpoint không liên quan.
- **Retry thao tác không idempotent** — tính tiền hai lần.
- **Retry storm khuếch đại sự cố** — downstream đang hồi phục thì bị đánh sập lại.
- **Chung một pool cho mọi downstream** — một API chậm nuốt hết pool (thiếu bulkhead).
- **Cache/queue là dependency cứng** — Redis chết → app chết; đáng lẽ chỉ chậm hơn. → [[Caching Strategies]]
- **Health check giả** — endpoint trả `200` luôn, không kiểm tra DB → LB gửi traffic vào pod đã chết. Nhưng cũng đừng để health check phụ thuộc downstream, kẻo cả cụm bị đánh dấu unhealthy dây chuyền.
- **Không có graceful shutdown** — deploy làm rơi request đang xử lý.
- **Fallback im lặng** — trả dữ liệu rỗng thay vì lỗi mà không ai biết; luôn đếm và alert.

## 6. Checklist cho mỗi dependency ra ngoài
- [ ] Có connect timeout **và** read timeout chưa? Giá trị bao nhiêu, dựa trên đâu?
- [ ] Có retry không? Có giới hạn, backoff, jitter? Thao tác có idempotent không?
- [ ] Chỉ **một** tầng trong chuỗi chịu trách nhiệm retry?
- [ ] Có circuit breaker cho downstream hay hỏng không?
- [ ] Pool/semaphore riêng cho dependency này (bulkhead)?
- [ ] Khi nó chết, người dùng thấy gì? (degrade có chủ đích, không phải 500)
- [ ] Có metric: tỉ lệ lỗi, tỉ lệ retry, trạng thái breaker, độ trễ p99?
- [ ] Đã **thử tắt nó** ở staging và quan sát hành vi chưa?
- [ ] Service có graceful shutdown khi nhận `SIGTERM`?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Toxiproxy | Giả lập mạng chậm/đứt để test | https://github.com/Shopify/toxiproxy |
| Envoy / linkerd | Timeout, retry, breaker ở tầng mesh | https://www.envoyproxy.io/ |
| Polly / resilience4j / gobreaker | Thư viện breaker theo ngôn ngữ | https://github.com/sony/gobreaker |
| Chaos Mesh | Chaos engineering trên k8s | https://chaos-mesh.org/ |

## Tham khảo
- Google SRE Book — Addressing Cascading Failures: https://sre.google/sre-book/addressing-cascading-failures/
- Google SRE Book — Handling Overload: https://sre.google/sre-book/handling-overload/
- AWS Builders' Library — Timeouts, retries and backoff with jitter: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
- Martin Fowler — CircuitBreaker: https://martinfowler.com/bliki/CircuitBreaker.html
- *Release It!* — Michael Nygard (nguồn gốc của các pattern này)

## Liên kết
[[Observability]] · [[Scaling and Load Balancing]] · [[Background Jobs and Queues]] · [[Backend]]
