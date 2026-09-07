---
tags: [database, ops, monitoring]
status: growing
---
# Monitoring & Capacity Planning

> Không đo thì không biết. Mục tiêu của monitoring không phải "có dashboard đẹp" mà là: **phát hiện vấn đề trước người dùng**, và **biết trước bao lâu nữa thì hết chỗ**.

## 1. Bốn tầng chỉ số
### Tầng 1 — Trải nghiệm (quan trọng nhất)
| Chỉ số | Ngưỡng gợi ý |
|---|---|
| Query latency p50 / p95 / **p99** | Đặt theo SLO của sản phẩm |
| Error rate (timeout, connection refused, deadlock) | < 0.1% |
| Throughput (QPS, TPS) | Baseline + xu hướng |

> Luôn nhìn **p99**, không nhìn trung bình. Trung bình giấu đúng những người dùng đang khổ nhất.

### Tầng 2 — Nội tại database
| Chỉ số | Cảnh báo khi |
|---|---|
| Cache hit ratio | < 95% (OLTP) |
| Connection đang dùng / `max_connections` | > 80% → [[Connection Pooling]] |
| Số session `idle in transaction` | > vài cái, hoặc tuổi > 1 phút |
| Replication lag | > vài giây → [[Replication]] |
| Deadlock / rollback rate | Tăng đột biến → [[Deadlock]] |
| Dead tuple ratio, tuổi autovacuum | dead > 10%, hoặc bảng lớn chưa vacuum lâu |
| **Transaction ID wraparound** (`age(datfrozenxid)`) | > 1 tỉ — **sự cố nghiêm trọng nhất của Postgres** |
| Replication slot tồn đọng | > vài GB — nguy cơ đầy đĩa |
| Lock wait / blocked queries | Có bất kỳ query nào chờ > 30s |
| Checkpoint quá thường xuyên | `checkpoints_req` > `checkpoints_timed` |

### Tầng 3 — Hạ tầng (USE method)
CPU, RAM, **disk IOPS & latency**, disk **dung lượng còn lại**, network. → https://www.brendangregg.com/usemethod.html

### Tầng 4 — Truy vấn
`pg_stat_statements` top theo tổng thời gian; slow query log. → [[Execution Plan & EXPLAIN]]

## 2. Query kiểm tra nhanh
```sql
-- Dung lượng bảng + index lớn nhất
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS total,
       pg_size_pretty(pg_relation_size(relid))        AS table_only
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC LIMIT 20;

-- Cache hit ratio
SELECT sum(heap_blks_hit) / NULLIF(sum(heap_blks_hit)+sum(heap_blks_read),0) AS hit_ratio
FROM pg_statio_user_tables;

-- Nguy cơ wraparound
SELECT datname, age(datfrozenxid) FROM pg_database ORDER BY 2 DESC;

-- Session đang chặn người khác
SELECT pid, age(clock_timestamp(), query_start) AS dur, state, query
FROM pg_stat_activity
WHERE state <> 'idle' ORDER BY dur DESC LIMIT 20;
```

## 3. Capacity planning
1. **Ghi lại dung lượng hằng tuần** — dựng đường xu hướng, đừng nhìn một điểm.
2. **Tính growth rate**: `(size_hôm_nay − size_30_ngày_trước) / 30`.
3. **Dự báo ngày chạm 80% đĩa** và đặt alert **trước 30 ngày** — đủ thời gian mua/mở rộng, không phải đủ thời gian hoảng loạn.
4. Tách phần tăng do **dữ liệu thật** khỏi phần tăng do **bloat** (bloat sửa được bằng vacuum/repack, dữ liệu thật thì không). → [[Performance Tuning]]
5. Lập kế hoạch **retention/archiving** trước khi cần: dữ liệu cũ chuyển sang partition lạnh hoặc object storage. → [[Sharding & Partitioning]]
6. Với cloud: theo dõi cả **IOPS burst credit** — hết credit là hiệu năng rơi vực mà chỉ số CPU vẫn xanh.

## 4. Alert — nguyên tắc
- **Alert vào triệu chứng người dùng cảm nhận được**, không vào nguyên nhân. "p99 latency > 1s" đáng gọi điện; "CPU 80%" thì không.
- Mỗi alert phải có **runbook**: nghĩa là gì, kiểm tra gì, làm gì.
- Alert không hành động được thì **xoá đi**. Alert fatigue giết monitoring nhanh hơn việc không có monitoring.
- Phân tầng: page (gọi điện) vs ticket (giờ hành chính).

## 5. Cạm bẫy hay gặp
1. **Chỉ monitor CPU/RAM.** Chúng thường xanh trong lúc database đang chết vì lock.
2. **Nhìn trung bình thay vì percentile.**
3. **Không có baseline** ⇒ không biết thế nào là bất thường.
4. **Không monitor dung lượng đĩa** — đầy đĩa là cách phổ biến nhất để mất một database.
5. **Bỏ qua wraparound và replication slot** — hai quả bom hẹn giờ đặc trưng của Postgres.
6. **Quá nhiều alert** ⇒ không ai đọc.
7. **Monitoring nằm cùng hạ tầng với production** ⇒ mất luôn khi sự cố.
8. **Không monitor backup.** → [[Backup & Recovery]]

## 6. Checklist áp dụng
- [ ] Có dashboard p50/p95/p99 latency và QPS chưa?
- [ ] Có alert cho: đĩa < 20%, replication lag, connection > 80%, wraparound, backup fail chưa?
- [ ] `pg_stat_statements` đã bật chưa?
- [ ] Có ghi lại dung lượng theo tuần và dự báo ngày chạm ngưỡng chưa?
- [ ] Mỗi alert có runbook không?
- [ ] Alert nào 3 tháng qua chưa từng dẫn tới hành động — có xoá không?
- [ ] Hệ monitoring có độc lập với production không?
- [ ] Có theo dõi tuổi của backup gần nhất và của lần restore thử gần nhất không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| postgres_exporter + Prometheus + Grafana | Bộ chuẩn open-source | https://github.com/prometheus-community/postgres_exporter |
| pgHero | Dashboard nhanh, gợi ý index | https://github.com/ankane/pghero |
| pgwatch2 | Monitoring chuyên sâu cho Postgres | https://github.com/cybertec-postgresql/pgwatch2 |
| pgbadger | Phân tích log thành báo cáo | https://github.com/darold/pgbadger |
| Percona Monitoring and Management | MySQL + Postgres | https://www.percona.com/software/database-tools/percona-monitoring-and-management |

## Tham khảo
- PostgreSQL Docs — *Monitoring Database Activity*: https://www.postgresql.org/docs/current/monitoring.html
- Google SRE Book — *Monitoring Distributed Systems* (four golden signals): https://sre.google/sre-book/monitoring-distributed-systems/
- Brendan Gregg — *The USE Method*: https://www.brendangregg.com/usemethod.html
- PostgreSQL Docs — *Preventing Transaction ID Wraparound Failures*: https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND
- Grafana — dashboard PostgreSQL mẫu: https://grafana.com/grafana/dashboards/

## Liên kết
[[Performance Tuning]] · [[Backup & Recovery]] · [[High Availability & Failover]] · [[Connection Pooling]] · [[Database]]
