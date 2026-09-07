---
tags: [database, performance, ops]
status: evergreen
---
# Performance Tuning

> Quy trình tuning theo **tầng**, từ rẻ đến đắt. Sai lầm kinh điển là bắt đầu từ tầng cuối (nâng cấu hình máy) khi vấn đề nằm ở tầng đầu (thiếu một index).

## 1. Thứ tự tuning — luôn theo thứ tự này
| # | Tầng | Đòn bẩy điển hình | Chi phí |
|---|---|---|---|
| 1 | **Query & Schema** | Index, viết lại query, chữa [[N+1 Query Problem]] | 10–1000× | 
| 2 | **Ứng dụng** | [[Connection Pooling]], batch, [[Caching Strategies]] | 2–10× |
| 3 | **Cấu hình DB** | `shared_buffers`, `work_mem`, autovacuum | 1.2–3× |
| 4 | **Kiến trúc** | [[Replication]] đọc, [[Sharding & Partitioning]] | tuỳ |
| 5 | **Phần cứng** | RAM, NVMe, CPU | tuyến tính, tốn tiền |

> 90% vấn đề hiệu năng thật sự dừng lại ở tầng 1.

## 2. Vòng lặp tuning
```
Đo (pg_stat_statements) → Chọn query tốn tổng thời gian nhiều nhất
  → EXPLAIN (ANALYZE, BUFFERS) → Đặt giả thuyết → Sửa MỘT thứ
  → Đo lại → Ghi lại số trước/sau → Lặp
```
**Sửa một thứ mỗi lần.** Sửa ba thứ cùng lúc thì bạn không học được gì.

## 3. Cấu hình PostgreSQL cốt lõi
| Tham số | Gợi ý khởi điểm | Ghi chú |
|---|---|---|
| `shared_buffers` | 25% RAM | Phần còn lại để OS page cache |
| `effective_cache_size` | 50–75% RAM | Chỉ là **gợi ý cho optimizer**, không cấp phát |
| `work_mem` | 16–64MB | ⚠️ Nhân với (connection × số nút sort/hash) — set theo session cho query nặng |
| `maintenance_work_mem` | 512MB–2GB | Tăng tốc `CREATE INDEX`, `VACUUM` |
| `random_page_cost` | **1.1** cho SSD | Mặc định 4.0 giả định HDD ⇒ optimizer né index oan |
| `effective_io_concurrency` | 200 cho NVMe | |
| `max_connections` | 100–200 | Nhiều hơn thì dùng pooler → [[Connection Pooling]] |
| `checkpoint_timeout` / `max_wal_size` | 15min / 4–16GB | Checkpoint thưa hơn = ít gai I/O |
| `autovacuum_vacuum_scale_factor` | 0.05 (hoặc thấp hơn cho bảng nóng) | Mặc định 0.2 quá lười cho bảng lớn |
| `log_min_duration_statement` | 500ms | Bắt query chậm |
| `statement_timeout` | 30s (theo role) | Chặn query chạy hoang |
| `idle_in_transaction_session_timeout` | 60s | Chống chặn `VACUUM` → [[Locking & MVCC]] |

Dùng https://pgtune.leopard.in.ua/ làm điểm khởi đầu, rồi tinh chỉnh theo đo đạc.

## 4. Vacuum & bloat (Postgres)
MVCC để lại dòng chết ⇒ bảng và index phình ra. → [[Locking & MVCC]]
```sql
-- Bảng nào cần vacuum
SELECT relname, n_dead_tup, n_live_tup,
       round(100.0*n_dead_tup/NULLIF(n_live_tup,0),1) AS dead_pct,
       last_autovacuum
FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 20;

-- Tune riêng cho bảng ghi nhiều
ALTER TABLE "order" SET (autovacuum_vacuum_scale_factor = 0.02,
                         autovacuum_vacuum_cost_limit = 2000);
```
- `VACUUM` (thường): dọn dòng chết, **không** trả đĩa về OS. An toàn, chạy online.
- `VACUUM FULL`: viết lại bảng, trả đĩa — nhưng lấy `ACCESS EXCLUSIVE`. ❌ Đừng chạy trên production; dùng `pg_repack`.
- **Transaction ID wraparound** là sự cố nghiêm trọng nhất của Postgres — luôn alert khi `age(datfrozenxid)` > 1 tỉ.

## 5. Cạm bẫy hay gặp
1. **Nâng RAM/CPU trước khi xem query.** Đắt và thường chỉ dời vấn đề đi vài tháng.
2. **`work_mem` toàn cục quá cao** ⇒ OOM khi nhiều connection cùng sort.
3. **`max_connections` cao thay vì dùng pooler** ⇒ mỗi connection Postgres là một process.
4. **Để `random_page_cost = 4` trên SSD** ⇒ optimizer chọn seq scan sai.
5. **Tắt autovacuum** vì "nó làm chậm" ⇒ vài tuần sau bloat và wraparound.
6. **Tuning theo bài blog** mà không đo trên workload của mình.
7. **Không có baseline.** Không biết "bình thường" trông thế nào thì không biết đã tốt hơn chưa. → [[Monitoring & Capacity Planning]]
8. **Benchmark bằng dữ liệu đều tăm tắp** — dữ liệu thật lệch (skew) và plan sẽ khác.

## 6. Checklist áp dụng
- [ ] Có baseline (p50/p95/p99 latency, QPS, cache hit ratio) chưa?
- [ ] `pg_stat_statements` đã bật và đã xem top 10 theo tổng thời gian chưa?
- [ ] `random_page_cost` đã chỉnh cho SSD chưa?
- [ ] `work_mem` có đang được nhân lên nguy hiểm không?
- [ ] Autovacuum có theo kịp trên bảng ghi nhiều nhất không?
- [ ] Có alert cho bloat và transaction ID wraparound chưa?
- [ ] `statement_timeout` và `idle_in_transaction_session_timeout` đã set chưa?
- [ ] Mỗi thay đổi tuning có được ghi lại kèm số đo trước/sau không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| PGTune | Sinh cấu hình khởi điểm | https://pgtune.leopard.in.ua/ |
| pgHero | Dashboard sức khoẻ Postgres | https://github.com/ankane/pghero |
| pgbench | Benchmark có sẵn trong Postgres | https://www.postgresql.org/docs/current/pgbench.html |
| pgbadger | Phân tích log Postgres | https://github.com/darold/pgbadger |
| pg_repack | Dọn bloat không khoá bảng | https://reorg.github.io/pg_repack/ |
| Percona Toolkit | Bộ công cụ MySQL | https://docs.percona.com/percona-toolkit/ |

## Tham khảo
- PostgreSQL Docs — *Performance Tips*: https://www.postgresql.org/docs/current/performance-tips.html
- PostgreSQL Wiki — *Tuning Your PostgreSQL Server*: https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server
- PostgreSQL Docs — *Routine Vacuuming*: https://www.postgresql.org/docs/current/routine-vacuuming.html
- Brendan Gregg — *USE Method*: https://www.brendangregg.com/usemethod.html
- MySQL Docs — *Optimization*: https://dev.mysql.com/doc/refman/8.0/en/optimization.html

## Liên kết
[[Execution Plan & EXPLAIN]] · [[Query Optimization]] · [[Monitoring & Capacity Planning]] · [[Connection Pooling]] · [[PostgreSQL]] · [[Database]]
