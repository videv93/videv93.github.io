---
tags: [devops, observability, logging]
status: growing
---
# Logging & Log Aggregation

> Log là trụ cột **đắt nhất và bị lạm dụng nhất** của observability. Nguyên tắc trung tâm: **log là sự kiện có cấu trúc dành cho máy đọc**, không phải câu văn dành cho người đọc bằng mắt.

## 1. Structured logging — thay đổi quan trọng nhất
❌ Log dạng văn bản:
```
2026-08-28 10:32:11 ERROR Payment failed for user 8842 amount 250000 after 3 retries
```
✅ Log dạng JSON:
```json
{"ts":"2026-08-28T10:32:11.442Z","level":"error","service":"payment-api","version":"1.4.2",
 "msg":"payment failed","user_id":"8842","amount":250000,"currency":"VND",
 "retries":3,"error_code":"GATEWAY_TIMEOUT","trace_id":"a3f9c1d2...","span_id":"7b2e..."}
```
Vì sao quan trọng: truy vấn được (`level=error AND error_code="GATEWAY_TIMEOUT"`), tổng hợp được, và **nối được với trace** qua `trace_id`.

**Trường bắt buộc trong mọi log:** `ts`, `level`, `service`, `version`, `msg`, `trace_id`. Thêm `env`, `pod`, `region` do agent tự gắn.

## 2. Log level — dùng đúng
| Level | Khi nào | Ở production |
|---|---|---|
| `ERROR` | Việc đã thất bại, cần người xem | Luôn bật |
| `WARN` | Bất thường nhưng đã tự xử lý (retry thành công, fallback) | Luôn bật |
| `INFO` | Sự kiện nghiệp vụ quan trọng (đơn hàng tạo, user đăng ký) | Bật, nhưng tiết chế |
| `DEBUG` | Chi tiết để điều tra | **Tắt**, bật tạm khi cần |
| `TRACE` | Rất chi tiết | Chỉ ở local |
> Cho phép **đổi log level lúc runtime** (endpoint admin hoặc config reload) — để bật DEBUG cho một service trong 10 phút mà không phải deploy lại.

## 3. Pipeline chuẩn
```
App ──stdout/stderr──> agent (Fluent Bit / Promtail / OTel Collector)
                          ├── parse, thêm label (pod, namespace, service)
                          ├── che PII, drop log ồn ào
                          ├── giới hạn rate
                          └──> backend (Loki / Elasticsearch / CloudWatch / S3)
                                    └──> Grafana / Kibana
```
**Nguyên tắc số một: ứng dụng chỉ ghi ra `stdout`/`stderr`.**
- Không ghi file trong container (đầy disk, không ai thu thập, mất khi pod chết).
- Không để app tự gửi trực tiếp lên backend (mất log khi mạng lỗi, ghép chặt app với hạ tầng log).
- Việc thu thập, buffer và gửi là của agent — đó là mô hình 12-factor.

## 4. Kiểm soát chi phí — bốn đòn bẩy
| Đòn bẩy | Cách làm |
|---|---|
| **Sampling** | Log thành công thì sample 1%, log lỗi giữ 100% |
| **Retention theo tầng** | Hot (tìm kiếm nhanh) 7 ngày → Warm 30 ngày → S3/Glacier 1 năm |
| **Drop tại nguồn** | Loại health check, `/metrics`, log của sidecar ồn ào ngay ở agent |
| **Chuyển sang metric** | Thứ chỉ cần *đếm* thì là counter, không phải log. Một log/request ở 5k RPS = 13 tỉ dòng/tháng |

> ⚠️ Trên AWS, **CloudWatch Logs không đặt retention mặc định là "Never expire"** — một trong những dòng chi phí ẩn lớn nhất. → [[Cloud Cost Optimization]]

## 5. So sánh backend
| Backend | Mô hình | Mạnh | Yếu |
|---|---|---|---|
| **Loki** | Chỉ index **label**, nội dung nén nguyên khối | Rẻ, tích hợp Grafana, vận hành nhẹ | Full-text search yếu hơn |
| **Elasticsearch / OpenSearch** | Index toàn văn | Tìm kiếm và phân tích mạnh nhất | Tốn tài nguyên, vận hành nặng |
| **CloudWatch Logs** | Managed AWS | Không phải vận hành, tích hợp IAM | Đắt ở khối lượng lớn, query kém linh hoạt |
| **ClickHouse** (SigNoz, Quickwit) | Cột, nén cao | Rất nhanh và rẻ ở quy mô lớn | Cần hiểu để vận hành |

## 6. Cạm bẫy
- ❌ **Log PII/secret** (password, token, số thẻ, CCCD) → vi phạm tuân thủ, và log thường có nhiều người truy cập hơn database. Che ở agent và review ở code.
- ❌ **Log trong vòng lặp nóng** → tự tạo DDoS lên hệ thống log, làm chậm chính ứng dụng (I/O đồng bộ).
- ❌ **Log toàn văn bản tự do** → không truy vấn được, không tổng hợp được.
- ❌ **Không có `trace_id`** → mất khả năng nối log với [[Distributed Tracing|trace]]; đây là thứ biến log từ "đọc mò" thành "điều tra".
- ❌ **Ghi log ra file rồi mount volume để thu thập** → phức tạp không cần thiết, và mất log khi pod bị xoá đột ngột.
- ❌ **Coi log là nơi lưu trữ dữ liệu nghiệp vụ** (audit trail pháp lý) → dùng bảng audit riêng, log có thể bị sample và bị xoá theo retention.
- ❌ **Bật DEBUG ở production và quên tắt** → chi phí và rủi ro rò rỉ.
- ❌ **Log timestamp theo giờ địa phương** → luôn dùng UTC ISO-8601.

## 7. Checklist
- [ ] Log dạng JSON có structure, không phải văn bản tự do?
- [ ] Có `trace_id` và `span_id` trong mọi log của request?
- [ ] Timestamp UTC, ISO-8601, có milliseconds?
- [ ] Có `service` và `version` để lọc khi canary?
- [ ] App chỉ ghi stdout/stderr?
- [ ] Có che PII/secret tại agent, và có test cho việc đó?
- [ ] Retention được đặt cho **mọi** log group/index?
- [ ] Có sampling cho log thành công ở service lưu lượng cao?
- [ ] Health check và `/metrics` bị loại khỏi log?
- [ ] Đổi được log level lúc runtime mà không deploy lại?
- [ ] Biết chi phí log mỗi tháng theo service không?

## Công cụ
| Công cụ | Vai trò | Link |
|---|---|---|
| Fluent Bit | Agent thu thập nhẹ (C, tốn ít RAM) | https://fluentbit.io/ |
| Promtail / Grafana Alloy | Agent cho Loki | https://grafana.com/docs/loki/latest/send-data/promtail/ |
| Loki | Log backend chi phí thấp | https://grafana.com/oss/loki/ |
| OpenSearch / Elasticsearch | Log backend tìm kiếm mạnh | https://opensearch.org/ |
| Vector | Pipeline log/metric hiệu năng cao | https://vector.dev/ |
| OTel Collector | Pipeline thống nhất cho cả 3 trụ cột | https://opentelemetry.io/docs/collector/ |

## Tham khảo
- The Twelve-Factor App — Logs as event streams: https://12factor.net/logs
- Grafana — Loki best practices: https://grafana.com/docs/loki/latest/get-started/labels/bp-labels/
- OpenTelemetry — Logs specification: https://opentelemetry.io/docs/specs/otel/logs/
- Google SRE Book — chương về debug và log
- OWASP — Logging Cheat Sheet (log gì và **không** log gì): https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

## Liên kết
[[Observability]] · [[Distributed Tracing]] · [[Metrics & Prometheus]] · [[Cloud Cost Optimization]] · [[DevOps]]
