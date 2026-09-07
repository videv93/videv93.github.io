---
tags: [devops, observability, foundation]
status: growing
---
# Observability

> **Monitoring** trả lời câu hỏi bạn đã biết trước là sẽ hỏi. **Observability** cho phép bạn hỏi câu hỏi *chưa từng nghĩ tới* — mà không phải deploy lại. Khác biệt nằm ở việc bạn có đủ dữ liệu chi tiết để tự đặt câu hỏi mới hay không.

## 1. Monitoring vs Observability
| | Monitoring | Observability |
|---|---|---|
| Câu hỏi | "CPU có > 80% không?" (known-unknowns) | "Vì sao riêng khách hàng X ở region Y bị chậm sau 14h?" (unknown-unknowns) |
| Dữ liệu | Metric tổng hợp, định sẵn | Sự kiện có nhiều chiều, cardinality cao |
| Kết quả | Biết **có** vấn đề | Biết vấn đề **ở đâu và vì sao** |
> Observability là **thuộc tính của hệ thống**, không phải một công cụ bạn mua. Mua Datadog không làm hệ thống observable nếu ứng dụng không phát ra dữ liệu có ý nghĩa.

## 2. Ba trụ cột (và trụ thứ tư)
| Trụ | Trả lời | Chi phí | Note |
|---|---|---|---|
| **Metrics** | *Có gì bất thường không?* Số liệu tổng hợp theo thời gian | Rẻ | [[Metrics & Prometheus]] |
| **Logs** | *Chuyện gì đã xảy ra cụ thể?* Sự kiện rời rạc | Đắt nhất | [[Logging & Log Aggregation]] |
| **Traces** | *Thời gian đi đâu mất?* Đường đi của một request qua các service | Trung bình | [[Distributed Tracing]] |
| *Profiles* | *Dòng code nào tốn CPU/RAM?* | Trung bình | Continuous profiling (Pyroscope, Parca) |

Cách dùng cùng nhau trong một sự cố:
```
Alert (metric: error rate tăng)
  → Dashboard (metric: service nào? endpoint nào?)
    → Trace (request lỗi đi qua đâu, chậm ở span nào)
      → Log (exception cụ thể, trace_id khớp)
        → Profile (nếu là vấn đề CPU/memory)
```
Điều làm chuỗi này chạy được: **trace_id xuất hiện trong cả log lẫn trace**, và metric có label đủ để lọc xuống đúng service.

## 3. Bốn phương pháp chọn "đo cái gì"
| Method | Áp dụng cho | Đo gì |
|---|---|---|
| **Four Golden Signals** (Google SRE) | Service hướng người dùng | Latency, Traffic, Errors, Saturation |
| **RED** | Microservice / request-driven | **R**ate, **E**rrors, **D**uration |
| **USE** (Brendan Gregg) | Tài nguyên (CPU, disk, network) | **U**tilization, **S**aturation, **E**rrors |
| **SLI/SLO** | Trải nghiệm người dùng | → [[SRE & Reliability Engineering]] |

> Thực tế: dùng **RED cho mỗi service** + **USE cho mỗi tài nguyên hạ tầng** + **SLO cho vài critical user journey**. Đó là bộ khung đủ dùng cho hầu hết hệ thống.

## 4. Cardinality — thứ quyết định hoá đơn
**Cardinality** = số tổ hợp giá trị nhãn. Một metric với 5 label, mỗi label 10 giá trị = 100 000 time series.
- ❌ Label nguy hiểm: `user_id`, `request_id`, `email`, `url` đầy đủ có query string, `trace_id`.
- ✅ Label an toàn: `service`, `endpoint` (đã chuẩn hoá `/users/:id`), `status_code`, `region`, `version`.
> Quy tắc: **thông tin cardinality cao thuộc về log và trace, không thuộc về metric.** Đây là sai lầm làm nổ chi phí observability phổ biến nhất.

## 5. OpenTelemetry — chuẩn hoá
OTel là chuẩn CNCF thống nhất API + SDK + protocol (OTLP) cho cả ba trụ cột.
- **Instrument một lần, đổi backend tuỳ ý** — thoát vendor lock-in.
- **OTel Collector** đứng giữa: nhận, xử lý (lọc, sampling, thêm attribute, che PII), rồi gửi tới nhiều backend.
- Auto-instrumentation có sẵn cho Java, Node, Python, Go, .NET — bắt được HTTP/DB/queue mà gần như không sửa code.
> Với dự án mới năm 2026: **bắt đầu bằng OpenTelemetry**, đừng bắt đầu bằng SDK riêng của một vendor.

## 6. Cạm bẫy
- ❌ **Thu thập mọi thứ vì "biết đâu cần"** → hoá đơn observability vượt cả hoá đơn hạ tầng. Chọn có chủ đích.
- ❌ **Dashboard đẹp nhưng không ai nhìn** → dashboard phải phục vụ một câu hỏi cụ thể; dashboard 60 biểu đồ là dashboard không dùng được.
- ❌ **Alert theo ngưỡng tài nguyên** (CPU > 80%) → nhiễu, và không tương quan với đau đớn của người dùng. Alert theo **triệu chứng người dùng cảm nhận được** (error rate, latency, SLO burn rate).
- ❌ **Alert fatigue** → alert nào không dẫn tới hành động thì phải xoá, không phải để đó "cho biết".
- ❌ **Chỉ dùng giá trị trung bình** → luôn dùng percentile p50/p95/p99.
- ❌ **Không có `trace_id` trong log** → mất khả năng nối ba trụ cột, và đó chính là điều làm nên observability.
- ❌ **Đo hệ thống nhưng không đo trải nghiệm người dùng** → mọi dashboard xanh trong khi khách hàng không dùng được (DNS, CDN, mobile network). Bổ sung RUM và synthetic check.
- ❌ **Log chứa PII/secret** → rủi ro tuân thủ; che ở Collector.

## 7. Checklist observability cho một service
- [ ] Có metric RED (rate, errors, duration) với percentile, không chỉ trung bình?
- [ ] Log dạng **structured JSON**, có `trace_id`, `service`, `version`, `level`?
- [ ] Có tracing xuyên suốt, context được truyền qua mọi hop (kể cả queue)?
- [ ] Metric có label version để so sánh trong lúc canary? → [[Deployment Strategies]]
- [ ] Alert dựa trên triệu chứng người dùng / SLO burn rate, không dựa trên ngưỡng tài nguyên?
- [ ] Mỗi alert có runbook và có người sở hữu?
- [ ] Có health/readiness endpoint riêng biệt?
- [ ] Có kiểm soát cardinality (không có label user_id/request_id trong metric)?
- [ ] Log có retention theo tầng (hot 7 ngày, cold 90 ngày, archive S3)?
- [ ] Đã đo chi phí observability trên mỗi service chưa?

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| OpenTelemetry | Chuẩn instrument + Collector | https://opentelemetry.io/docs/ |
| Prometheus + Grafana | Metrics + dashboard | https://prometheus.io/ |
| Loki / Elasticsearch | Log aggregation | https://grafana.com/oss/loki/ |
| Tempo / Jaeger | Tracing backend | https://www.jaegertracing.io/ |
| Pyroscope / Parca | Continuous profiling | https://pyroscope.io/ |
| Datadog / Honeycomb / New Relic | SaaS all-in-one | https://www.honeycomb.io/ |

## Tham khảo
- Google SRE Book — Monitoring Distributed Systems (Four Golden Signals): https://sre.google/sre-book/monitoring-distributed-systems/
- Charity Majors, Liz Fong-Jones, George Miranda — *Observability Engineering* (O'Reilly)
- Brendan Gregg — The USE Method: https://www.brendangregg.com/usemethod.html
- OpenTelemetry Documentation: https://opentelemetry.io/docs/
- Tom Wilkie — The RED Method: https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/

## Liên kết
[[Metrics & Prometheus]] · [[Logging & Log Aggregation]] · [[Distributed Tracing]] · [[Incident Response & Postmortem]] · [[SRE & Reliability Engineering]] · [[DevOps]]
