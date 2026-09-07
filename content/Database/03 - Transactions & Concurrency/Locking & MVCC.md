---
tags: [database, transaction, concurrency]
status: evergreen
---
# Locking & MVCC

> Hai triết lý xử lý đồng thời. **Khoá**: chặn người khác lại. **MVCC**: cho mỗi người một bản chụp riêng, không ai chặn ai khi đọc. Câu thần chú của Postgres: *readers don't block writers, writers don't block readers*.

## 1. MVCC (Multi-Version Concurrency Control)
Mỗi `UPDATE` tạo **phiên bản mới** của dòng thay vì ghi đè:
```
row v1 (xmin=100, xmax=105)   ← transaction bắt đầu trước 105 vẫn thấy bản này
row v2 (xmin=105, xmax=NULL)  ← transaction mới thấy bản này
```
- Mỗi transaction có **snapshot**: tập transaction nào đã commit tại thời điểm nó bắt đầu (hoặc mỗi statement, tuỳ isolation).
- Hệ quả: đọc **không bao giờ** cần khoá.
- Cái giá: **dòng chết (dead tuple)** tích tụ ⇒ Postgres cần `VACUUM`, InnoDB cần purge undo log.
- Postgres lưu bản cũ **trong bảng** ⇒ bloat; MySQL/InnoDB lưu trong **undo log** ⇒ bảng gọn hơn nhưng transaction dài làm phình undo.
→ [[Storage Engines]], [[PostgreSQL]]

## 2. Các mức khoá
### Row-level lock (Postgres)
| Lệnh | Khoá | Chặn |
|---|---|---|
| `SELECT ... FOR UPDATE` | exclusive | Mọi ghi và mọi `FOR ...` khác |
| `SELECT ... FOR NO KEY UPDATE` | Yếu hơn | `UPDATE` thường dùng mức này |
| `SELECT ... FOR SHARE` | shared | Ghi, nhưng không chặn đọc thường |
| `SELECT ... FOR KEY SHARE` | Yếu nhất | FK check dùng mức này |

```sql
-- Chờ tối đa: đừng để request treo vô hạn
SELECT * FROM job WHERE id = 1 FOR UPDATE NOWAIT;      -- lỗi ngay nếu bị khoá
SELECT * FROM job WHERE id = 1 FOR UPDATE SKIP LOCKED; -- bỏ qua dòng đang bị khoá

-- Hàng đợi job trong Postgres — pattern đáng giá, không cần thêm broker
UPDATE job SET status='running', started_at=now()
WHERE id IN (
  SELECT id FROM job WHERE status='pending'
  ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 10
) RETURNING *;
```

### Table-level lock
`ACCESS SHARE` (SELECT) → `ROW EXCLUSIVE` (DML) → `SHARE UPDATE EXCLUSIVE` (`VACUUM`, `CREATE INDEX CONCURRENTLY`) → `SHARE` (`CREATE INDEX`) → `EXCLUSIVE` → `ACCESS EXCLUSIVE` (`ALTER TABLE`, `DROP`, `VACUUM FULL`).

> `ACCESS EXCLUSIVE` chặn **cả `SELECT`**. Một `ALTER TABLE` chờ sau một transaction dài sẽ xếp hàng phía sau nó **và** chặn mọi query đến sau ⇒ site chết. Luôn `SET lock_timeout` trước DDL. → [[Zero-downtime Migration]]

### Advisory lock — khoá do ứng dụng tự định nghĩa
```sql
SELECT pg_try_advisory_lock(12345);   -- ví dụ: đảm bảo chỉ 1 instance chạy cron
SELECT pg_advisory_unlock(12345);
```

## 3. Pessimistic vs Optimistic
| | Pessimistic (`FOR UPDATE`) | Optimistic (version column) |
|---|---|---|
| Cơ chế | Khoá trước, làm sau | Làm trước, kiểm tra lúc ghi |
| Hợp khi | Xung đột **hay** xảy ra; giao dịch ngắn | Xung đột **hiếm**; có thời gian nghĩ (form web) |
| Rủi ro | Chờ, [[Deadlock]] | Phải retry, có thể đói (starvation) |
| Trong ORM | `SELECT FOR UPDATE` | `@Version` (JPA), `lock_version` (Rails) |

## 4. Cạm bẫy hay gặp
1. **Khoá theo thứ tự khác nhau ở hai code path** ⇒ deadlock. → [[Deadlock]]
2. **`SELECT FOR UPDATE` rồi gọi API bên ngoài** — giữ khoá suốt thời gian mạng.
3. **Transaction "idle in transaction"** giữ snapshot ⇒ `VACUUM` không dọn được dòng chết ⇒ bảng phình và query chậm dần. Set `idle_in_transaction_session_timeout`.
4. **`FOR UPDATE` trên query có `JOIN`** — khoá dòng ở **mọi** bảng được join. Dùng `FOR UPDATE OF <table>`.
5. **`FOR UPDATE` không `NOWAIT`/`SKIP LOCKED`** trong worker queue ⇒ mọi worker xếp hàng sau cùng một dòng.
6. **`VACUUM FULL` trên production** — lấy `ACCESS EXCLUSIVE`, khoá bảng suốt thời gian chạy. Dùng `pg_repack`.
7. **Nghĩ MVCC nghĩa là "không cần lo về đồng thời"** — MVCC chống *đọc bẩn*, không chống *lost update*. → [[Isolation Levels]]

## 5. Checklist áp dụng
- [ ] Mọi code path lấy nhiều khoá đều theo **cùng một thứ tự** (ví dụ tăng dần theo id)?
- [ ] Transaction có chứa I/O ngoài DB không?
- [ ] Đã set `lock_timeout`, `statement_timeout`, `idle_in_transaction_session_timeout` chưa?
- [ ] Worker queue đã dùng `SKIP LOCKED` chưa?
- [ ] Có đang monitor `pg_stat_activity` cho session `idle in transaction` không?
- [ ] Bloat của các bảng update nhiều đang ở mức nào? autovacuum đã tune riêng cho chúng chưa?
- [ ] Chọn pessimistic hay optimistic — dựa trên tần suất xung đột thật hay theo cảm tính?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `pg_locks` + `pg_stat_activity` | Xem ai đang khoá ai | https://www.postgresql.org/docs/current/view-pg-locks.html |
| pg_repack | Dọn bloat không khoá bảng | https://reorg.github.io/pg_repack/ |
| pgAdmin / pg_activity | Theo dõi session realtime | https://github.com/dalibo/pg_activity |

## Tham khảo
- PostgreSQL Docs — *Explicit Locking*: https://www.postgresql.org/docs/current/explicit-locking.html
- PostgreSQL Docs — *Routine Vacuuming*: https://www.postgresql.org/docs/current/routine-vacuuming.html
- MySQL Docs — *InnoDB Locking*: https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html
- Kleppmann — *DDIA*, ch.7: https://dataintensive.net/
- 2ndQuadrant — *What is SKIP LOCKED for?*: https://www.2ndquadrant.com/en/blog/what-is-select-skip-locked-for-in-postgresql-9-5/

## Liên kết
[[Isolation Levels]] · [[Deadlock]] · [[ACID Properties]] · [[Storage Engines]] · [[Database]]
