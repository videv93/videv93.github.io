---
tags: [devops, observability, metrics, prometheus]
status: growing
---
# Metrics & Prometheus

> Prometheus là chuẩn de-facto cho metric trong thế giới cloud-native. Ba điều làm nó khác: **mô hình pull**, **dữ liệu đa chiều (label)**, và **PromQL** — ngôn ngữ truy vấn cho phép tính toán trên chuỗi thời gian thay vì chỉ vẽ chúng.

## 1. Mô hình pull
```
Prometheus  ──HTTP GET /metrics──>  app / exporter
     │  (scrape mỗi 15–60s)
     ├── service discovery: K8s API, EC2, Consul, file
     ├── TSDB local (lưu ngắn hạn 15–30 ngày)
     ├── recording rules & alerting rules
     └── Alertmanager → PagerDuty/Slack/email
```
| Pull (Prometheus) | Push (StatsD, OTLP push) |
|---|---|
| Prometheus biết target nào **không phản hồi** (`up == 0`) → chính nó là một health check | Không phân biệt được "im lặng vì khoẻ" và "im lặng vì chết" |
| Dễ chạy thử: `curl localhost:9090/metrics` | Khó debug hơn |
| Khó với job ngắn hạn | Hợp với job ngắn hạn (dùng **Pushgateway** cho trường hợp này) |

## 2. Bốn loại metric
| Loại | Ý nghĩa | Ví dụ | Dùng thế nào |
|---|---|---|---|
| **Counter** | Chỉ tăng (reset về 0 khi restart) | `http_requests_total` | Luôn dùng với `rate()` |
| **Gauge** | Lên xuống tuỳ ý | `memory_usage_bytes`, `queue_depth` | Dùng trực tiếp |
| **Histogram** | Đếm theo bucket, tính được percentile ở phía server | `http_request_duration_seconds` | `histogram_quantile()` |
| **Summary** | Percentile tính ở phía client | — | Không tổng hợp được giữa các instance ⇒ **ưu tiên Histogram** |

Quy ước đặt tên: `<namespace>_<subsystem>_<đơn vị>_<total>` — dùng **đơn vị cơ bản** (giây, byte), hậu tố `_total` cho counter.

## 3. PromQL — các truy vấn dùng thật
```promql
# Rate: request/giây trong 5 phút, theo service
sum by (service) (rate(http_requests_total[5m]))

# Error rate (%) — tử/mẫu phải cùng label set
100 * sum(rate(http_requests_total{status=~"5.."}[5m]))
    / sum(rate(http_requests_total[5m]))

# Latency p99 từ histogram
histogram_quantile(0.99,
  sum by (le, service) (rate(http_request_duration_seconds_bucket[5m])))

# Memory dùng so với limit của container (K8s)
sum by (pod) (container_memory_working_set_bytes{container!=""})
  / sum by (pod) (kube_pod_container_resource_limits{resource="memory"})

# Dự báo disk đầy trong 4 giờ tới
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 4*3600) < 0

# Pod restart nhiều trong 1 giờ
increase(kube_pod_container_status_restarts_total[1h]) > 3
```
> Hai lỗi PromQL phổ biến: dùng counter thô mà không có `rate()` (đồ thị chỉ đi lên vô nghĩa), và `rate()` với cửa sổ nhỏ hơn 4× scrape interval (dữ liệu không đủ điểm).

## 4. Alerting — quy tắc thiết kế
```yaml
groups:
  - name: slo
    rules:
      # Recording rule: tính trước cho truy vấn nặng
      - record: job:http_error_rate:ratio5m
        expr: sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))
            / sum by (job) (rate(http_requests_total[5m]))

      # Multi-window burn rate: cháy nhanh → gọi ngay
      - alert: ErrorBudgetBurnFast
        expr: job:http_error_rate:ratio5m > (14.4 * 0.001)
        for: 2m
        labels: { severity: page }
        annotations:
          summary: "{{ $labels.job }} đang tiêu error budget nhanh gấp 14x"
          runbook_url: "https://wiki.acme/runbooks/http-errors"
```
Nguyên tắc:
1. **Alert theo triệu chứng, không theo nguyên nhân** — "người dùng gặp lỗi" thay vì "pod restart".
2. **Dùng burn rate của error budget**, không dùng ngưỡng tuyệt đối. → [[SRE & Reliability Engineering]]
3. **Mọi alert phải có `runbook_url`.** Không có runbook thì không phải alert.
4. **Chỉ page khi cần hành động ngay của con người**; còn lại đưa vào ticket/dashboard.
5. **`for:`** để tránh cảnh báo do gai nhiễu nhất thời.
6. Dùng **Alertmanager** để gom nhóm (`group_by`), làm im (`silence`) khi bảo trì, và ức chế (`inhibit_rule`) alert con khi alert cha đã bắn.

## 5. Prometheus ở quy mô lớn
- Prometheus **một instance không HA và lưu trữ hữu hạn** — chạy 2 bản song song để dự phòng.
- Lưu dài hạn và truy vấn toàn cục: **Thanos** hoặc **Mimir** (đẩy block lên S3).
- **VictoriaMetrics** — thay thế tương thích, tốn ít tài nguyên hơn đáng kể.
- Trên K8s: cài bằng **kube-prometheus-stack** (Prometheus Operator) — có sẵn `ServiceMonitor`, `PodMonitor`, dashboard và alert mặc định.
- Exporter thường dùng: `node-exporter` (host), `kube-state-metrics` (trạng thái object K8s), `blackbox-exporter` (probe HTTP/TCP từ ngoài), exporter cho Postgres/Redis/NGINX.

## 6. Cạm bẫy
- ❌ **Label cardinality cao** (`user_id`, `path` đầy đủ) → Prometheus ngốn RAM rồi OOM. Đây là cách phổ biến nhất để giết một Prometheus. → [[Observability]]
- ❌ **Alert trên CPU/RAM** thay vì trên trải nghiệm người dùng → nhiễu và bỏ sót.
- ❌ **Dùng Summary rồi cố tổng hợp p99 giữa các instance** → toán học không cho phép; dùng Histogram.
- ❌ **Quên `rate()` với counter**, hoặc dùng `irate()` cho alert (quá nhạy với nhiễu).
- ❌ **Không có recording rule cho dashboard nặng** → Grafana chậm, Prometheus quá tải.
- ❌ **Không giám sát chính Prometheus** (`up`, `prometheus_tsdb_*`) → nó chết trong im lặng và bạn mất toàn bộ khả năng quan sát.
- ❌ **Chỉ scrape trong cluster** → không phát hiện được sự cố ở tầng DNS/CDN. Bổ sung synthetic check từ bên ngoài.
- ❌ **Retention mặc định 15 ngày** rồi ngạc nhiên khi cần so sánh với quý trước.

## 7. Checklist
- [ ] Mỗi service expose `/metrics` với RED metrics dạng Histogram?
- [ ] Không có label nào cardinality cao?
- [ ] Có recording rules cho các truy vấn dùng nhiều?
- [ ] Alert dựa trên SLO burn rate, mỗi alert có runbook_url?
- [ ] Alertmanager có grouping, inhibition, và silence cho cửa sổ bảo trì?
- [ ] Có giám sát chính Prometheus (`up`, TSDB, WAL, số series)?
- [ ] Có lưu trữ dài hạn (Thanos/Mimir/VM) cho phân tích xu hướng và capacity planning?
- [ ] Có blackbox/synthetic check từ bên ngoài hệ thống?
- [ ] Dashboard chính trả lời được: hệ thống có khoẻ không, trong vòng 10 giây nhìn?

## Tham khảo
- Prometheus Docs — Concepts & best practices: https://prometheus.io/docs/practices/naming/
- Prometheus Docs — PromQL: https://prometheus.io/docs/prometheus/latest/querying/basics/
- Prometheus Docs — Alerting best practices: https://prometheus.io/docs/practices/alerting/
- Google SRE Workbook — Alerting on SLOs (multi-window burn rate): https://sre.google/workbook/alerting-on-slos/
- kube-prometheus-stack: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
- Grafana — RED method: https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/

## Liên kết
[[Observability]] · [[SRE & Reliability Engineering]] · [[Logging & Log Aggregation]] · [[Kubernetes Operations & Security]] · [[DevOps]]
