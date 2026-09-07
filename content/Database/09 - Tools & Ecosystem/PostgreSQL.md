---
tags: [database, postgres, tool]
status: evergreen
---
# PostgreSQL

> DB "mẹ đẻ" nên chọn nếu chỉ học sâu một hệ. Lý do không phải nó nhanh nhất ở mọi việc, mà là nó **đủ tốt ở gần như mọi việc** — và extension cho phép nó lấn sân sang document, time-series, vector, geo, search mà không cần thêm hệ thống.

## 1. Điểm nhận dạng kiến trúc
| Đặc điểm | Hệ quả thực tế |
|---|---|
| **Process-per-connection** | Connection đắt ⇒ bắt buộc pooler → [[Connection Pooling]] |
| **Heap + index rời** (không clustered) | Index trỏ `ctid`; index-only scan cần visibility map sạch |
| **MVCC lưu bản cũ trong bảng** | Sinh dead tuple ⇒ cần `VACUUM` → [[Locking & MVCC]] |
| **WAL** | Nền tảng cho PITR, replication, CDC → [[Storage Engines]] |
| **DDL trong transaction** | ✅ Migration rollback được — MySQL không có |
| **Extension** | Mở rộng sâu vào planner, kiểu dữ liệu, index |

## 2. Extension đáng biết
| Extension | Dùng để |
|---|---|
| `pg_stat_statements` | Xếp hạng query — **bật ngay từ ngày đầu** |
| `pgcrypto` | Hash, mã hoá cột → [[Database Security]] |
| `pg_trgm` | Index cho `LIKE '%x%'`, fuzzy search |
| `postgis` | Không gian địa lý — tiêu chuẩn ngành |
| `pgvector` | Vector similarity → [[Vector Database]] |
| `timescaledb` | Time-series → [[Time-series Database]] |
| `pg_partman` | Tự quản lý partition → [[Sharding & Partitioning]] |
| `pg_cron` | Job theo lịch trong DB |
| `hypopg` | Index giả để thử plan → [[Index Fundamentals]] |
| `pgaudit` | Audit log |
| `citus` | Sharding ngang |
| `pg_repack` | Dọn bloat không khoá bảng |

## 3. Kiểu dữ liệu mạnh (lý do người ta chọn Postgres)
| Kiểu | Dùng cho |
|---|---|
| `JSONB` | Dữ liệu bán cấu trúc, **có index GIN** → [[Document Database]] |
| `ARRAY` | Danh sách nhỏ, có index GIN |
| `tstzrange`, `int4range` | Khoảng + `EXCLUDE` constraint → [[Keys & Constraints]] |
| `INET`, `CIDR`, `MACADDR` | Mạng |
| `ENUM`, domain type | Ràng buộc giá trị |
| `tsvector` | Full-text search có sẵn |
| `UUID`, `NUMERIC`, `TIMESTAMPTZ` | Dùng đúng ngay từ đầu |
| `GENERATED ... STORED` | Cột tính tự động |

## 4. Ba thứ đặc trưng phải theo dõi
1. **Bloat & autovacuum** — bảng update nhiều phình dần. Tune `autovacuum_vacuum_scale_factor` riêng cho chúng. → [[Performance Tuning]]
2. **Transaction ID wraparound** — `age(datfrozenxid)` > 1 tỉ là báo động. Không xử lý thì database **dừng nhận ghi**.
3. **Replication slot tồn đọng** — giữ WAL vô hạn ⇒ đầy đĩa. Set `max_slot_wal_keep_size`. → [[Replication]]

## 5. Lệnh psql hay dùng
```
\l              danh sách database        \d+ table   chi tiết bảng + index + trigger
\dt+            bảng + kích thước         \di+        index + kích thước
\df             function                  \dx         extension đã cài
\du             role                      \timing     bật đo thời gian
\x auto         hiển thị dọc              \e          mở editor
\watch 1        chạy lại query mỗi giây
```

## 6. Cạm bẫy đặc trưng của Postgres
1. **Không bật `pg_stat_statements`** ⇒ mù về hiệu năng.
2. **Để `random_page_cost = 4`** trên SSD ⇒ optimizer né index. → [[Performance Tuning]]
3. **Bỏ qua autovacuum** ⇒ bloat, rồi wraparound.
4. **Nhiều connection thay vì pooler.**
5. **`VACUUM FULL` trên production** ⇒ khoá `ACCESS EXCLUSIVE`. Dùng `pg_repack`.
6. **`idle in transaction` kéo dài** ⇒ chặn vacuum. Set timeout.
7. **`CREATE INDEX` không `CONCURRENTLY`** ⇒ khoá ghi. → [[Zero-downtime Migration]]
8. **`TIMESTAMP` thay vì `TIMESTAMPTZ`.**
9. **Nâng version chính (major upgrade) không chuẩn bị** — cần `pg_upgrade` hoặc logical replication, và **phải `ANALYZE` lại** sau khi nâng (statistics không được chuyển).

## 7. Checklist áp dụng
- [ ] `pg_stat_statements` đã bật chưa?
- [ ] `random_page_cost` đã chỉnh cho SSD chưa?
- [ ] `shared_buffers`, `work_mem`, `maintenance_work_mem` đã cấu hình chưa?
- [ ] `statement_timeout` và `idle_in_transaction_session_timeout` đã set chưa?
- [ ] Có pooler trước Postgres chưa?
- [ ] Có alert cho bloat, wraparound, replication slot chưa?
- [ ] Phiên bản đang dùng còn được hỗ trợ không? (Postgres hỗ trợ 5 năm mỗi major)
- [ ] Có kế hoạch major upgrade định kỳ không?
- [ ] Đã `ANALYZE` sau lần nạp dữ liệu/nâng cấp gần nhất chưa?

## Tham khảo
- PostgreSQL Documentation (bản chính thức, chất lượng rất cao): https://www.postgresql.org/docs/current/
- PostgreSQL Wiki — *Don't Do This*: https://wiki.postgresql.org/wiki/Don%27t_Do_This
- Postgres Weekly (newsletter): https://postgresweekly.com/
- *PostgreSQL 14 Internals* — Egor Rogov (free PDF): https://postgrespro.com/community/books/internals
- Craig Kerstiens — *Postgres Guide* & blog: https://www.craigkerstiens.com/
- pgexercises: https://pgexercises.com/

## Liên kết
[[Storage Engines]] · [[Performance Tuning]] · [[Locking & MVCC]] · [[MySQL]] · [[Database Tooling]] · [[Database]]
