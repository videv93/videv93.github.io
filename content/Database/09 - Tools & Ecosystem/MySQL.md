---
tags: [database, mysql, tool]
status: growing
---
# MySQL

> Vẫn là RDBMS được triển khai rộng nhất thế giới. Điểm khác biệt kiến trúc quan trọng nhất so với [[PostgreSQL]]: **clustered index** — dữ liệu **nằm bên trong** B-Tree của primary key. Hiểu điều này thì phần lớn khác biệt còn lại tự suy ra được.

## 1. Clustered index và các hệ quả
```
InnoDB:  PK B-Tree  →  lá chứa TOÀN BỘ dòng dữ liệu
         Secondary index → lá chứa giá trị PK (không phải con trỏ vật lý)
```
| Hệ quả | Ý nghĩa thực tế |
|---|---|
| Tra qua secondary index tốn **2 lần** | index → PK → clustered index ("bookmark lookup") |
| PK **to** làm phình **mọi** secondary index | Dùng `BIGINT` hoặc UUIDv7, tránh UUIDv4 và PK chuỗi dài |
| PK **ngẫu nhiên** gây page split liên tục | UUIDv4 làm PK là lỗi hiệu năng lớn ở MySQL |
| Range scan theo PK rất nhanh | Dữ liệu đã nằm liền nhau vật lý |
| Covering index đặc biệt giá trị | Tránh được lần tra thứ hai |
→ [[Storage Engines]], [[Keys & Constraints]]

## 2. Khác biệt then chốt so với PostgreSQL
| | MySQL / InnoDB | PostgreSQL |
|---|---|---|
| Lưu dòng | Clustered theo PK | Heap rời |
| MVCC | Bản cũ trong **undo log** | Bản cũ trong bảng ⇒ cần `VACUUM` |
| Isolation mặc định | `REPEATABLE READ` | `READ COMMITTED` |
| Gap lock | **Có** ở `REPEATABLE READ` ⇒ nguồn deadlock riêng | Không (dùng SSI ở `SERIALIZABLE`) |
| DDL trong transaction | ❌ Implicit commit | ✅ Rollback được |
| Materialized view | ❌ Không có | ✅ Có |
| Kiểu dữ liệu | Cơ bản + JSON | Rất phong phú (range, array, geo, vector…) |
| Replication | binlog (row-based mặc định) | WAL streaming + logical |
| Connection | Thread-per-connection (nhẹ hơn) | Process-per-connection |
| `CHECK` constraint | Có từ 8.0.16 | Luôn có |

## 3. Cấu hình cốt lõi
| Tham số | Gợi ý |
|---|---|
| `innodb_buffer_pool_size` | **70–80% RAM** (InnoDB không dựa vào OS cache như Postgres) |
| `innodb_flush_log_at_trx_commit` | `1` = bền vững đầy đủ; `2` = nhanh hơn, mất ~1s khi máy sập |
| `innodb_flush_method` | `O_DIRECT` |
| `innodb_log_file_size` | Đủ lớn để chứa ~1h ghi |
| `sync_binlog` | `1` cho an toàn |
| `max_connections` | Cùng bài toán như Postgres → [[Connection Pooling]] |
| `sql_mode` | **Bắt buộc** có `ONLY_FULL_GROUP_BY`, `STRICT_TRANS_TABLES` |
| `slow_query_log` + `long_query_time` | Bật, ngưỡng 0.5–1s |
| `character_set_server` | `utf8mb4` — **không bao giờ** dùng `utf8` (chỉ 3 byte, mất emoji) |

## 4. Điều tra hiệu năng
```sql
EXPLAIN ANALYZE SELECT ...;          -- MySQL 8.0.18+
EXPLAIN FORMAT=JSON SELECT ...;      -- chi tiết chi phí
SHOW ENGINE INNODB STATUS\G          -- deadlock gần nhất, buffer pool, lock
SELECT * FROM sys.statements_with_full_table_scans LIMIT 20;
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY sum_timer_wait DESC LIMIT 20;
```
→ [[Execution Plan & EXPLAIN]]

## 5. Cạm bẫy đặc trưng
1. **`utf8` thay vì `utf8mb4`** — lỗi kinh điển, mất emoji và một phần tiếng Trung.
2. **`sql_mode` lỏng** ⇒ MySQL **âm thầm** cắt chuỗi, biến ngày sai thành `0000-00-00`. Luôn bật STRICT.
3. **Thiếu `ONLY_FULL_GROUP_BY`** ⇒ `GROUP BY` trả giá trị **bất kỳ** cho cột không gom. → [[Aggregation & Window Functions]]
4. **UUIDv4 làm PK** — xem mục 1.
5. **DDL không rollback được** ⇒ migration lỗi giữa chừng để lại schema nửa vời. Dùng gh-ost/pt-osc. → [[Zero-downtime Migration]]
6. **Gap lock gây deadlock** ở `REPEATABLE READ` — nguồn deadlock mà người dùng Postgres không quen. → [[Deadlock]]
7. **Dùng MyISAM** — không transaction, không FK, khoá cả bảng. Luôn InnoDB.
8. **Ép kiểu ngầm** (so `varchar` với số) ⇒ mất index âm thầm.
9. **`ORDER BY RAND()`** trên bảng lớn ⇒ sắp toàn bộ bảng.

## 6. Checklist áp dụng
- [ ] `utf8mb4` cho toàn bộ database/bảng/kết nối?
- [ ] `sql_mode` có `STRICT_TRANS_TABLES` và `ONLY_FULL_GROUP_BY`?
- [ ] `innodb_buffer_pool_size` đã đặt 70–80% RAM chưa?
- [ ] Mọi bảng dùng InnoDB?
- [ ] PK có nhỏ và tăng dần không?
- [ ] `slow_query_log` đã bật chưa?
- [ ] Có dùng gh-ost/pt-osc cho DDL trên bảng lớn không?
- [ ] `innodb_flush_log_at_trx_commit` và `sync_binlog` đã chọn có chủ đích chưa?
- [ ] Backup dùng XtraBackup (physical) hay chỉ `mysqldump`? → [[Backup & Recovery]]

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Percona Toolkit | pt-query-digest, pt-online-schema-change… | https://docs.percona.com/percona-toolkit/ |
| gh-ost | Đổi schema online, không trigger | https://github.com/github/gh-ost |
| Percona XtraBackup | Physical backup không khoá | https://docs.percona.com/percona-xtrabackup/ |
| ProxySQL | Proxy, pool, read/write split | https://proxysql.com/ |
| Vitess | Sharding quy mô lớn | https://vitess.io/ |
| MySQL `sys` schema | View chẩn đoán dựng sẵn | https://dev.mysql.com/doc/refman/8.0/en/sys-schema.html |

## Tham khảo
- MySQL 8.0 Reference Manual: https://dev.mysql.com/doc/refman/8.0/en/
- MySQL Docs — *InnoDB Storage Engine*: https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html
- *High Performance MySQL* (4th ed.) — Schwartz, Botros, Tkachenko
- Percona Database Performance Blog: https://www.percona.com/blog/
- MySQL Docs — *Optimization*: https://dev.mysql.com/doc/refman/8.0/en/optimization.html

## Liên kết
[[PostgreSQL]] · [[Storage Engines]] · [[Isolation Levels]] · [[Deadlock]] · [[Database Tooling]] · [[Database]]
