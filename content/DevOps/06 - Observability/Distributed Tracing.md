---
tags: [devops, observability, tracing]
status: growing
---
# Distributed Tracing

> Khi một request đi qua 12 service, metric nói *"chậm"*, log nói *"service này có lỗi"*, còn trace nói *"thời gian đi đâu mất, theo đúng thứ tự nhân quả"*. Đây là trụ cột duy nhất trả lời được câu hỏi đó.

## 1. Mô hình dữ liệu
```
Trace (một request end-to-end, có trace_id duy nhất)
└── Span: POST /checkout                      420ms
    ├── Span: auth.verify                      12ms
    ├── Span: inventory.check                  35ms
    │   └── Span: SELECT ... FROM stock        28ms
    ├── Span: payment.charge                  310ms   ← thủ phạm
    │   └── Span: HTTP POST gateway.vn        305ms
    └── Span: kafka.publish order.created      18ms
```
| Khái niệm | Nghĩa |
|---|---|
| **Trace** | Toàn bộ hành trình của một request |
| **Span** | Một đơn vị công việc: tên, thời điểm bắt đầu/kết thúc, parent, attributes, events, status |
| **Trace context** | `trace_id` + `span_id` truyền qua mọi hop, theo chuẩn **W3C Trace Context** (header `traceparent`) |
| **Baggage** | Dữ liệu tuỳ ý đi kèm context (ví dụ `tenant_id`) — dùng dè, nó đi qua mọi service |

## 2. Context propagation — chỗ hay hỏng nhất
Trace chỉ nối được nếu context được truyền đi:
- ✅ **HTTP/gRPC**: auto-instrumentation của OTel xử lý sẵn.
- ⚠️ **Message queue (Kafka, SQS, RabbitMQ)**: phải **tự nhét `traceparent` vào message header** và lấy ra ở consumer. Đây là nơi trace hay đứt nhất.
- ⚠️ **Thread pool / async / worker**: context là thread-local; phải truyền tay khi đổi thread.
- ⚠️ **Batch job / cron**: thường không có parent — tạo trace mới và gắn thuộc tính để tìm lại được.

## 3. Sampling — cân bằng chi phí và độ hữu ích
| Chiến lược | Cách hoạt động | Đánh đổi |
|---|---|---|
| **Head-based** (mặc định) | Quyết định ngay ở service đầu tiên, ví dụ giữ 1% | Rẻ, đơn giản; **có thể bỏ mất đúng trace lỗi** |
| **Tail-based** | Đợi trace hoàn tất rồi mới quyết định (giữ 100% trace lỗi và trace chậm, 1% trace bình thường) | Hữu ích hơn nhiều; cần Collector buffer, tốn tài nguyên hơn |
| **Adaptive** | Tự điều chỉnh tỉ lệ theo lưu lượng | Phức tạp |
> Khuyến nghị thực tế: **tail-based sampling ở OTel Collector**, giữ toàn bộ trace có lỗi hoặc vượt ngưỡng latency.

## 4. Triển khai với OpenTelemetry
```
App (SDK / auto-instrument)
   │ OTLP
   ↓
OTel Collector (tail sampling, che PII, thêm resource attribute)
   ↓
Tempo / Jaeger / vendor backend  → Grafana
```
- **Auto-instrumentation** trước: Java agent, `opentelemetry-instrument` cho Python, `--require @opentelemetry/auto-instrumentations-node` — bắt được HTTP, DB, queue mà không sửa code.
- **Manual span** chỉ thêm cho **logic nghiệp vụ quan trọng** (`checkout.calculate_discount`), không phải cho mọi hàm.
- **Resource attributes** bắt buộc: `service.name`, `service.version`, `deployment.environment`.
- **Ghi `trace_id` vào log** — đây là cầu nối làm cả hệ thống observability dùng được. → [[Logging & Log Aggregation]]
- **Exemplars** nối metric ↔ trace: từ điểm p99 trên biểu đồ Grafana bấm thẳng vào một trace cụ thể. → [[Metrics & Prometheus]]

## 5. Dùng trace để làm gì (ngoài debug latency)
- **Service dependency map** tự sinh — biết thật sự ai gọi ai, thay vì tin vào sơ đồ kiến trúc đã lỗi thời.
- **Phát hiện N+1 query** — nhìn thấy 200 span database giống hệt nhau trong một request.
- **Xác định critical path** trước khi tối ưu — tránh tối ưu nhầm chỗ.
- **So sánh version trong canary** — lọc trace theo `service.version`. → [[Deployment Strategies]]
- **Phân tích lỗi lan truyền** — thấy timeout của service A gây retry storm ở B.

## 6. Cạm bẫy
- ❌ **Instrument nhưng không truyền context qua queue** → trace đứt làm đôi, và phần khó nhất của hệ thống lại không quan sát được.
- ❌ **Sampling 1% head-based** → sự cố hiếm không bao giờ có trace để xem.
- ❌ **Đặt dữ liệu cardinality cao/PII vào span attribute** → chi phí và rủi ro tuân thủ.
- ❌ **Tạo span cho mọi hàm** → trace hàng nghìn span, không đọc nổi, tốn kém.
- ❌ **Thiếu `service.name` nhất quán** → biểu đồ phụ thuộc thành mớ hỗn độn.
- ❌ **Có tracing nhưng không ai dùng** → vì log không có `trace_id`, nên không có đường đi từ triệu chứng tới trace. Đây là lý do phổ biến nhất khiến khoản đầu tư tracing lãng phí.
- ❌ **Instrument thủ công từng service theo cách khác nhau** → dùng OTel auto-instrumentation làm nền chung.

## 7. Checklist
- [ ] Dùng OpenTelemetry (không phải SDK riêng của vendor)?
- [ ] `service.name`, `service.version`, `deployment.environment` được đặt ở mọi service?
- [ ] Context được truyền qua **HTTP, gRPC, và message queue**?
- [ ] Log có chứa `trace_id` khớp với trace?
- [ ] Có tail-based sampling giữ 100% trace lỗi/chậm?
- [ ] Span attribute không chứa PII, không chứa dữ liệu cardinality quá cao?
- [ ] Có exemplar nối từ dashboard metric sang trace?
- [ ] Đã dùng trace để tìm ra ít nhất một vấn đề thật chưa? (nếu chưa, có lẽ nó chưa dùng được)

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| OpenTelemetry | Chuẩn instrument + Collector | https://opentelemetry.io/docs/ |
| Grafana Tempo | Trace backend chi phí thấp, lưu trên object storage | https://grafana.com/oss/tempo/ |
| Jaeger | Trace backend CNCF, UI tốt | https://www.jaegertracing.io/ |
| AWS X-Ray | Managed tracing trên AWS | https://docs.aws.amazon.com/xray/ |
| Honeycomb | Phân tích sự kiện cardinality cao | https://www.honeycomb.io/ |
| Pixie / Cilium Hubble | Tracing bằng eBPF, không cần sửa code | https://px.dev/ |

## Tham khảo
- OpenTelemetry — Traces concepts: https://opentelemetry.io/docs/concepts/signals/traces/
- W3C — Trace Context specification: https://www.w3.org/TR/trace-context/
- Google — Dapper paper (nguồn gốc của distributed tracing): https://research.google/pubs/pub36356/
- OpenTelemetry — Sampling: https://opentelemetry.io/docs/concepts/sampling/
- Grafana — Tempo & exemplars: https://grafana.com/docs/tempo/latest/

## Liên kết
[[Observability]] · [[Logging & Log Aggregation]] · [[Metrics & Prometheus]] · [[Kubernetes Networking]] · [[DevOps]]
