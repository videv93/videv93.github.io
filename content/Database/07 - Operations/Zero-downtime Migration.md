---
tags: [database, ops, migration]
status: evergreen
---
# Zero-downtime Migration

> Đổi schema trên hệ thống đang chạy. Nguyên tắc duy nhất cần nhớ: **mọi thay đổi phải tương thích ngược với phiên bản code đang chạy** — vì trong lúc deploy, code cũ và code mới **cùng tồn tại**.

## 1. Expand–Migrate–Contract
```
1. EXPAND    Thêm cái mới (nullable, có default) — code cũ vẫn chạy
2. MIGRATE   Code mới ghi CẢ hai chỗ; backfill dữ liệu cũ theo lô
3. SWITCH    Code mới đọc từ chỗ mới; kiểm chứng bằng đối soát
4. CONTRACT  Ngừng ghi chỗ cũ, đợi một chu kỳ, rồi xoá cái cũ
```
Mỗi bước là **một lần deploy riêng**, và mỗi bước phải rollback được độc lập.

**Ví dụ đổi tên cột `name` → `full_name`:**
| Bước | Thao tác | Code đang chạy |
|---|---|---|
| 1 | `ADD COLUMN full_name text` | Cũ (dùng `name`) |
| 2 | Deploy code ghi cả `name` và `full_name`; backfill theo lô | Cũ + Mới |
| 3 | Deploy code chỉ đọc `full_name` | Mới |
| 4 | `DROP COLUMN name` (sau vài ngày) | Mới |

## 2. Thao tác nào an toàn, thao tác nào khoá bảng
| Thao tác | PostgreSQL |
|---|---|
| `ADD COLUMN` nullable | ✅ An toàn, tức thì |
| `ADD COLUMN ... DEFAULT` | ✅ Tức thì từ **PG 11+** (trước đó viết lại cả bảng) |
| `ADD COLUMN ... NOT NULL` không default | ❌ Lỗi/khoá — thêm nullable rồi backfill rồi mới set NOT NULL |
| `DROP COLUMN` | ✅ Tức thì (chỉ đánh dấu) — nhưng phá code cũ |
| `ALTER TYPE` (đổi kiểu) | ❌ Viết lại cả bảng + khoá `ACCESS EXCLUSIVE` |
| `ADD CONSTRAINT ... CHECK` | ⚠️ Quét cả bảng — dùng `NOT VALID` rồi `VALIDATE CONSTRAINT` |
| `ADD FOREIGN KEY` | ⚠️ Tương tự — `NOT VALID` rồi validate |
| `CREATE INDEX` | ❌ Khoá ghi — luôn dùng `CONCURRENTLY` |
| `SET NOT NULL` | ⚠️ Quét bảng — PG 12+ dùng được `CHECK ... NOT VALID` đã validate để bỏ qua quét |
| `RENAME COLUMN/TABLE` | ❌ Tức thì nhưng **phá code cũ ngay lập tức** |

```sql
-- Thêm constraint không khoá bảng
ALTER TABLE "order" ADD CONSTRAINT chk_total CHECK (total >= 0) NOT VALID;
ALTER TABLE "order" VALIDATE CONSTRAINT chk_total;   -- chỉ lấy SHARE UPDATE EXCLUSIVE
```

## 3. Bảo vệ bắt buộc: `lock_timeout`
```sql
SET lock_timeout = '3s';
SET statement_timeout = '60s';
ALTER TABLE "order" ADD COLUMN full_name text;
```
> Không có `lock_timeout`, một `ALTER TABLE` chờ sau một transaction dài sẽ **xếp hàng và chặn mọi query đến sau nó** — kể cả `SELECT`. Site chết trong khi migration "chỉ đang chờ". Thà fail nhanh rồi thử lại. → [[Locking & MVCC]]

## 4. Backfill theo lô
```sql
-- ❌ Một UPDATE 50 triệu dòng: giữ khoá hàng giờ, WAL khổng lồ, replica lag
UPDATE users SET full_name = name;

-- ✅ Theo lô, commit từng đợt, nghỉ giữa các đợt
DO $$ DECLARE n int; BEGIN
  LOOP
    UPDATE users SET full_name = name
    WHERE id IN (SELECT id FROM users WHERE full_name IS NULL LIMIT 5000);
    GET DIAGNOSTICS n = ROW_COUNT;
    EXIT WHEN n = 0;
    COMMIT;
    PERFORM pg_sleep(0.1);   -- nhường I/O, cho replica bắt kịp
  END LOOP;
END $$;
```
Theo dõi replication lag trong lúc backfill. → [[Replication]]

## 5. Cạm bẫy hay gặp
1. **Rename cột/bảng trong một bước** ⇒ code cũ vỡ ngay khi migration chạy.
2. **`CREATE INDEX` không `CONCURRENTLY`** ⇒ khoá ghi cả bảng.
3. **Không set `lock_timeout`** ⇒ xem mục 3.
4. **Backfill một phát** ⇒ khoá dài, WAL phình, replica tụt hậu.
5. **Migration không idempotent / không rollback được** ⇒ kẹt giữa chừng.
6. **Chạy migration qua PgBouncer ở `transaction` mode** ⇒ advisory lock của tool không hoạt động ⇒ hai instance chạy migration cùng lúc. → [[Connection Pooling]]
7. **Không thử migration trên bản sao dữ liệu production** ⇒ không biết nó chạy 3 giây hay 3 giờ.
8. **`ALTER TYPE` trên bảng lớn** — thường phải làm bằng cột mới + backfill + swap.
9. **Xoá cột ngay sau khi ngừng dùng** ⇒ không rollback deploy được. Đợi ít nhất một chu kỳ release.
10. **Không đối soát sau backfill** ⇒ vài dòng lệch âm thầm.

## 6. Checklist áp dụng
- [ ] Thay đổi này có tương thích ngược với code đang chạy không?
- [ ] Đã tách thành các bước expand → migrate → switch → contract chưa?
- [ ] Đã set `lock_timeout` và `statement_timeout` trong migration chưa?
- [ ] `CREATE INDEX` có `CONCURRENTLY` không?
- [ ] Constraint mới có dùng `NOT VALID` + `VALIDATE` không?
- [ ] Backfill có chia lô, có commit từng lô, có nghỉ giữa lô không?
- [ ] Đã đo thời gian chạy trên bản sao production chưa?
- [ ] Có kế hoạch rollback cho từng bước không?
- [ ] Có job đối soát sau backfill không?
- [ ] Migration chạy qua kết nối trực tiếp (không qua pooler transaction mode) chứ?
- [ ] Có monitor replication lag trong lúc chạy không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Flyway / Liquibase | Migration có version cho JVM & đa ngôn ngữ | https://flywaydb.org/ |
| Alembic (SQLAlchemy) | Python | https://alembic.sqlalchemy.org/ |
| Atlas | Migration khai báo, có linter phát hiện thao tác nguy hiểm | https://atlasgo.io/ |
| squawk | Linter phát hiện migration khoá bảng | https://squawkhq.com/ |
| pg-osc / gh-ost / pt-online-schema-change | Đổi schema online (MySQL) | https://github.com/github/gh-ost |
| pgroll | Migration zero-downtime cho Postgres (versioned schema) | https://github.com/xataio/pgroll |

## Tham khảo
- PostgreSQL Docs — *ALTER TABLE*: https://www.postgresql.org/docs/current/sql-altertable.html
- *Zero-downtime Postgres migrations* — Braintree: https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680
- Squawk — danh sách rule migration nguy hiểm: https://squawkhq.com/docs/
- Martin Fowler — *Parallel Change (expand-contract)*: https://martinfowler.com/bliki/ParallelChange.html
- gh-ost — *Online schema migration for MySQL*: https://github.com/github/gh-ost

## Liên kết
[[Locking & MVCC]] · [[Schema Design Patterns]] · [[Replication]] · [[Database Tooling]] · [[Database]]
