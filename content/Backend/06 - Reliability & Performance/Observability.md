---
tags: [backend, reliability, observability]
status: growing
---
# Observability

> Monitoring trả lời *"hệ thống có khoẻ không"* (câu hỏi đã biết trước). Observability trả lời *"vì sao request này của khách hàng này chậm"* (câu hỏi chưa từng nghĩ tới). Bạn cần cả hai, nhưng cái thứ hai mới cứu bạn lúc 3h sáng.

## 1. Ba trụ cột
| Trụ cột | Trả lời | Chi phí | Lưu ý |
|---|---|---|---|
| **Log** | "Chuyện gì đã xảy ra ở đây?" | Cao (theo dung lượng) | Phải có **cấu trúc** (JSON) và có correlation id |
| **Metric** | "Xu hướng ra sao?" | Thấp (số liệu tổng hợp) | Cardinality cao là kẻ giết chi phí |
| **Trace** | "Thời gian đi đâu, xuyên qua những service nào?" | Trung bình (có sampling) | Bắt buộc khi có > 1 service → [[Monolith vs Microservices]] |

Trụ cột thứ tư đang phổ biến: **profiling liên tục** (pprof/Pyroscope) — nối trace tới dòng code tốn CPU.

## 2. Đo cái gì — hai công thức
**RED** (cho service xử lý request):
- **R**ate — số request/giây
- **E**rrors — tỉ lệ lỗi
- **D**uration — phân bố độ trễ (p50/p95/p99) → [[Performance Optimization]]

**USE** (cho tài nguyên: CPU, pool, queue, đĩa):
- **U**tilization — mức sử dụng
- **S**aturation — hàng đợi chờ tài nguyên (**chỉ báo sớm nhất của sự cố**)
- **E**rrors

Bốn tín hiệu vàng của Google = RED + Saturation.

## 3. Log có cấu trúc
```json
{"ts":"2026-08-28T09:15:02Z","level":"error","msg":"payment failed",
 "request_id":"01J8...","trace_id":"4bf92f...","user_id":"u_42",
 "order_id":"o_991","provider":"stripe","duration_ms":1840,"err":"timeout"}
```
Nguyên tắc:
- **Một sự kiện = một dòng JSON**, không log nhiều dòng cho một việc.
- **Luôn có `request_id`/`trace_id`** — không có nó thì log của 10 pod là vô dụng. → [[HTTP and Networking]]
- **Không bao giờ log**: mật khẩu, token, số thẻ, PII đầy đủ. → [[Backend Security]]
- Log ở mức `INFO` cho sự kiện nghiệp vụ, `ERROR` cho thứ cần người xem. `ERROR` mà không ai hành động thì nên là `WARN`.

## 4. Trace — khái niệm tối thiểu
| Khái niệm | Nghĩa |
|---|---|
| **Trace** | Toàn bộ hành trình của một request |
| **Span** | Một đoạn việc (truy vấn DB, gọi HTTP), có cha-con |
| **Context propagation** | Truyền `traceparent` (W3C) qua HTTP header / message header |
| **Sampling** | Giữ lại một phần trace; **tail-based sampling** giữ được đúng những trace chậm/lỗi |

**OpenTelemetry (OTel)** là chuẩn nên chọn: một SDK, đổi backend (Jaeger, Tempo, Datadog...) mà không sửa code.

## 5. SLI / SLO / alert
- **SLI** — chỉ số đo trải nghiệm thật: "tỉ lệ request `GET /orders` trả 2xx trong < 300ms".
- **SLO** — mục tiêu: "99.9% trong 30 ngày".
- **Error budget** — 0.1% còn lại; hết budget thì ưu tiên độ tin cậy hơn tính năng.
- **Alert dựa trên triệu chứng người dùng cảm nhận được** (SLO burn rate), không phải trên nguyên nhân ("CPU 80%"). Mỗi alert phải **hành động được**, nếu không thì xoá nó.

## 6. Cạm bẫy
- **Log không cấu trúc** — grep được, nhưng không tổng hợp/lọc được.
- **Thiếu correlation id** — sai lầm tốn kém nhất, và sửa sau rất khó.
- **Cardinality bùng nổ** — đưa `user_id`/`order_id` vào **label của metric** làm sập hệ thống metric (và hoá đơn). Id thuộc về log/trace.
- **Alert quá nhiều** → alert fatigue → bỏ qua đúng cái quan trọng.
- **Alert theo nguyên nhân** thay vì triệu chứng.
- **Dashboard đẹp nhưng không ai dùng khi có sự cố** — dashboard phải trả lời được câu hỏi của người trực.
- **Chỉ đo ở tầng hạ tầng** (CPU/RAM) mà không đo tầng nghiệp vụ (đơn hàng/phút) — nhiều sự cố chỉ lộ ra ở số liệu nghiệp vụ.
- **Sampling đầu (head-based) tỉ lệ thấp** — mất đúng những trace bất thường cần xem.

## 7. Checklist cho một service
- [ ] Log dạng JSON, có `request_id`/`trace_id` trong **mọi** dòng?
- [ ] Có RED metrics cho từng endpoint, và USE cho pool DB/queue?
- [ ] Có tracing xuyên service, propagate qua cả HTTP **và** message queue? → [[Event-Driven Architecture]]
- [ ] Có SLO viết ra thành số và alert dựa trên nó?
- [ ] Mỗi alert có runbook: người trực làm gì tiếp theo?
- [ ] Có metric nghiệp vụ (không chỉ hạ tầng)?
- [ ] Không có secret/PII trong log? Có kiểm tra tự động không?
- [ ] Retention log/metric hợp lý và đã tính chi phí chưa?
- [ ] Đã dùng chính bộ công cụ này để điều tra một sự cố thật chưa? (bài kiểm tra duy nhất có giá trị)

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| OpenTelemetry | Chuẩn instrument, không khoá vendor | https://opentelemetry.io/ |
| Prometheus + Grafana | Metric + dashboard | https://prometheus.io/ |
| Jaeger / Tempo | Lưu và xem trace | https://www.jaegertracing.io/ |
| Loki / ELK | Log tập trung | https://grafana.com/oss/loki/ |
| Sentry | Theo dõi lỗi ứng dụng | https://sentry.io/ |
| Pyroscope | Profiling liên tục | https://grafana.com/oss/pyroscope/ |

## Tham khảo
- Google SRE Book — Monitoring Distributed Systems: https://sre.google/sre-book/monitoring-distributed-systems/
- Google SRE Workbook — Alerting on SLOs: https://sre.google/workbook/alerting-on-slos/
- OpenTelemetry — Concepts: https://opentelemetry.io/docs/concepts/
- W3C Trace Context: https://www.w3.org/TR/trace-context/
- Brendan Gregg — USE Method: https://www.brendangregg.com/usemethod.html
- Charity Majors et al. — *Observability Engineering* (O'Reilly)

## Liên kết
[[Performance Optimization]] · [[Resilience Patterns]] · [[Deployment and Configuration]] · [[Backend]]
