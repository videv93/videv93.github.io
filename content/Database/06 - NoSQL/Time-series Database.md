---
tags: [database, nosql, timeseries]
status: growing
---
# Time-series Database

> Dữ liệu có **timestamp là trục chính**: metric, IoT, log, giá cổ phiếu. Đặc trưng workload rất riêng — ghi liên tục, gần như không sửa, đọc theo khoảng thời gian, và **giá trị giảm dần theo tuổi**. Chính đặc trưng cuối cùng mở ra những tối ưu mà DB thường không làm được.

## 1. Đặc trưng workload
| | Time-series | OLTP thường |
|---|---|---|
| Ghi | Append liên tục, tốc độ cao | Trộn insert/update |
| Sửa | Gần như không | Thường xuyên |
| Đọc | Theo **khoảng thời gian** + gom nhóm | Theo id |
| Giá trị dữ liệu | Giảm nhanh theo tuổi | Ổn định |
| Nén | **Rất tốt** (giá trị liền kề giống nhau) | Kém |

## 2. Ba kỹ thuật đặc trưng
### Partitioning theo thời gian
Bắt buộc. Cho phép **xoá dữ liệu cũ bằng `DROP TABLE`** thay vì `DELETE` hàng trăm triệu dòng. → [[Sharding & Partitioning]]

### Downsampling / Continuous aggregate
Giữ dữ liệu thô 7 ngày, dữ liệu gom theo phút 90 ngày, theo giờ 2 năm.
```sql
-- TimescaleDB
SELECT create_hypertable('metric', 'ts', chunk_time_interval => INTERVAL '1 day');

CREATE MATERIALIZED VIEW metric_1h
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', ts) AS bucket, device_id,
       avg(value) AS avg_v, max(value) AS max_v, count(*) AS n
FROM metric GROUP BY bucket, device_id;

SELECT add_continuous_aggregate_policy('metric_1h',
  start_offset => INTERVAL '3 days', end_offset => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour');
```

### Retention & compression policy
```sql
SELECT add_compression_policy('metric', INTERVAL '7 days');   -- nén 10–20×
SELECT add_retention_policy('metric', INTERVAL '90 days');    -- tự xoá chunk cũ
```

## 3. Chọn hệ nào
| Hệ | Điểm mạnh | Cân nhắc |
|---|---|---|
| **TimescaleDB** | Là Postgres — full SQL, JOIN với bảng nghiệp vụ | Extension, cần tự vận hành |
| **InfluxDB** | Chuyên dụng, ecosystem IoT | Ngôn ngữ riêng (Flux/InfluxQL), breaking change giữa các version |
| **Prometheus** | Chuẩn de-facto cho monitoring hạ tầng | Pull-based, **không** cho lưu trữ dài hạn (dùng Thanos/Cortex/Mimir) |
| **ClickHouse** | Nhanh nhất cho analytics khối lượng lớn | Không phải OLTP → [[OLTP vs OLAP]] |
| **VictoriaMetrics** | Nhẹ, tiết kiệm tài nguyên, tương thích Prometheus | Cộng đồng nhỏ hơn |
| **Postgres thuần + partition** | Không thêm hệ mới | Thiếu nén và continuous aggregate |

> Nếu đã có Postgres và khối lượng dưới vài tỉ dòng: **TimescaleDB hoặc Postgres partition thuần** thường là lựa chọn đúng.

## 4. Thiết kế schema
```sql
CREATE TABLE metric (
  ts         timestamptz NOT NULL,
  device_id  bigint      NOT NULL,
  metric_key text        NOT NULL,
  value      double precision NOT NULL
);
CREATE INDEX ON metric (device_id, metric_key, ts DESC);   -- ✅ ESR
```
- **Narrow (long) format** — mỗi dòng một phép đo: linh hoạt, nhiều dòng.
- **Wide format** — mỗi dòng nhiều cột metric: gọn hơn, nhưng thêm metric = `ALTER TABLE`.
- Tách **tag/metadata** (ít thay đổi) ra bảng riêng, đừng lặp chuỗi trong mỗi dòng.
- **Cardinality là kẻ thù**: mỗi tổ hợp tag tạo một series. `user_id` làm tag ⇒ hàng triệu series ⇒ sập.

## 5. Cạm bẫy hay gặp
1. **Cardinality bùng nổ** — nguyên nhân sự cố số 1 với InfluxDB/Prometheus. Đừng bao giờ đặt id có độ chia cao (request_id, user_id) làm tag/label.
2. **Không có retention policy** ⇒ dữ liệu tăng vô hạn.
3. **`DELETE` thay vì `DROP` partition** ⇒ chậm và tạo bloat.
4. **Insert từng dòng một** ⇒ dùng batch/`COPY`; ghi theo lô 1000–10000 dòng.
5. **Query khoảng thời gian rất dài trên dữ liệu thô** ⇒ dùng continuous aggregate.
6. **Dùng Prometheus làm kho lưu trữ dài hạn** — nó không được thiết kế cho việc đó.
7. **Quên timezone.** Luôn `TIMESTAMPTZ`/UTC; `time_bucket` với timezone rõ ràng khi báo cáo theo ngày địa phương.
8. **Dữ liệu đến muộn (late arrival)** phá continuous aggregate — cấu hình `start_offset` đủ rộng.

## 6. Checklist áp dụng
- [ ] Ước lượng số dòng/ngày và tổng dung lượng sau 1 năm?
- [ ] Cardinality (số series) tối đa là bao nhiêu?
- [ ] Đã có partition/chunk theo thời gian chưa?
- [ ] Retention policy đã đặt và đã được nghiệp vụ chấp thuận chưa?
- [ ] Có downsampling cho query dài hạn không?
- [ ] Nén đã bật chưa? Tỉ lệ nén thực tế bao nhiêu?
- [ ] Ghi có theo lô không?
- [ ] Index có theo thứ tự `(tag..., ts DESC)` không?
- [ ] Dữ liệu đến muộn được xử lý thế nào?

## Tham khảo
- TimescaleDB Docs: https://docs.timescale.com/
- TimescaleDB — *Continuous Aggregates*: https://docs.timescale.com/use-timescale/latest/continuous-aggregates/
- Prometheus Docs — *Storage & cardinality*: https://prometheus.io/docs/prometheus/latest/storage/
- InfluxDB — *Schema design & high cardinality*: https://docs.influxdata.com/influxdb/v2/write-data/best-practices/schema-design/
- ClickHouse Docs: https://clickhouse.com/docs

## Liên kết
[[Sharding & Partitioning]] · [[OLTP vs OLAP]] · [[Column-Family Store]] · [[Monitoring & Capacity Planning]] · [[Database]]
