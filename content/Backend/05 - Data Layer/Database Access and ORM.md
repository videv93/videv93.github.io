---
tags: [backend, database, orm]
status: growing
---
# Database Access and ORM

> ORM giúp bạn viết 90% truy vấn nhanh gấp đôi, và làm 10% còn lại chậm gấp mười. Giá trị của một backend engineer nằm ở chỗ **biết ORM đang sinh ra SQL gì**.

## 1. Connection pool — con số phải khớp nhau
```
(số instance) × (số process) × (pool size mỗi process)  ≤  max_connections của DB
```
- Postgres mặc định `max_connections = 100`; mỗi connection tốn RAM đáng kể → dùng **PgBouncer** (transaction pooling) khi có nhiều instance.
- Pool nhỏ **không phải** là vấn đề: DB chỉ xử lý song song được vài chục truy vấn; pool lớn chỉ chuyển hàng đợi từ app sang DB và làm latency tệ hơn.
- Với worker: số worker × pool cũng tính vào công thức trên. → [[Background Jobs and Queues]]

## 2. N+1 — bug hiệu năng phổ biến nhất
```ruby
posts.each { |p| p.author.name }   # 1 + N truy vấn
```
| Ngôn ngữ | Cách sửa | Cách phát hiện |
|---|---|---|
| Rails | `includes` / `preload` / `eager_load` | gem `bullet` → [[Ruby on Rails]] |
| Django | `select_related` (JOIN) / `prefetch_related` (2 query) | `django-debug-toolbar`, `nplusone` |
| SQLAlchemy | `selectinload` / `joinedload` | log `echo=True` |
| Prisma/TypeORM | `include` / `relations` | log query |
| GraphQL | **DataLoader** (bắt buộc) | → [[GraphQL]] |

Quy tắc: **đếm số truy vấn trong test** cho các endpoint quan trọng. Số truy vấn phải là hằng số, không phụ thuộc số bản ghi.

## 3. Index — bốn điều đủ dùng 95% trường hợp
1. Index mọi cột xuất hiện trong `WHERE`, `JOIN`, `ORDER BY` của truy vấn nóng.
2. **Composite index có thứ tự quan trọng**: `(a, b)` dùng được cho `WHERE a` và `WHERE a AND b`, **không** dùng được cho `WHERE b`.
3. Hàm bọc quanh cột giết index: `WHERE lower(email) = ?` cần **index biểu thức** trên `lower(email)`.
4. Index làm **ghi chậm hơn** và tốn đĩa — index không dùng thì xoá (`pg_stat_user_indexes`).

Đọc `EXPLAIN (ANALYZE, BUFFERS)`: thấy `Seq Scan` trên bảng lớn trong truy vấn nóng là dấu hiệu thiếu index.

## 4. Transaction & tranh chấp
| Mức cô lập (Postgres) | Ngăn được | Ghi chú |
|---|---|---|
| Read Committed (mặc định) | Dirty read | Vẫn có non-repeatable read, lost update |
| Repeatable Read | + non-repeatable read | Có thể fail với lỗi serialization → phải retry |
| Serializable | Mọi anomaly | Chi phí cao hơn; **bắt buộc có logic retry** |

Chống lost update:
- **Optimistic locking**: cột `version`/`updated_at`, `UPDATE ... WHERE version = ?` → 0 row nghĩa là có người khác ghi trước.
- **Pessimistic locking**: `SELECT ... FOR UPDATE` — giữ khoá, luôn đặt `lock_timeout`.
- **Atomic ở DB**: `UPDATE accounts SET balance = balance - 100 WHERE id = ? AND balance >= 100` — thường là câu trả lời đơn giản nhất.

Nguyên tắc: **transaction ngắn nhất có thể**; đừng bao giờ gọi HTTP ra ngoài khi đang giữ transaction mở. → [[Resilience Patterns]]

## 5. Migration an toàn (zero-downtime)
Code cũ và code mới sẽ chạy **đồng thời** trong lúc deploy → mọi thay đổi schema phải theo **expand & contract**:
```
Thêm cột (nullable, có default an toàn) → code ghi cả hai → backfill theo batch
   → code đọc cột mới → xoá cột cũ (release sau)
```
- Postgres: `CREATE INDEX CONCURRENTLY`, tránh `ALTER TABLE` khoá bảng lâu, luôn đặt `lock_timeout` + `statement_timeout` cho migration.
- Backfill bằng batch nhỏ, không `UPDATE` cả bảng trong một transaction.
- MySQL: dùng `pt-online-schema-change`/`gh-ost` cho bảng lớn.
- → [[Deployment and Configuration]] · [[Rake Tasks in Rails]]

## 6. Cạm bẫy
- **`SELECT *`** — kéo cột thừa (kể cả TEXT lớn), phá index-only scan.
- **Xử lý ở app cái mà DB làm tốt hơn** (join, aggregate, `LIMIT`) — và ngược lại, nhét nghiệp vụ vào trigger/stored procedure. → [[Clean Architecture]]
- **Nạp cả bảng vào RAM** — luôn dùng `find_each`/`iterator`/cursor.
- **Query lười trôi ra ngoài repository** — truy vấn chạy ở tầng serialize. → [[Repository Pattern and Service Layer]]
- **Không dùng transaction cho nhiều thao tác liên quan** → dữ liệu nửa vời khi lỗi giữa chừng.
- **Nối chuỗi SQL** → SQL injection. Luôn dùng tham số hoá. → [[Backend Security]]
- **Soft delete khắp nơi** — mọi truy vấn phải nhớ `WHERE deleted_at IS NULL`; quên một chỗ là rò rỉ dữ liệu.
- **Không đo** — bật `pg_stat_statements`, xem top truy vấn theo tổng thời gian. → [[Performance Optimization]]

## 7. Checklist
- [ ] Công thức pool có khớp `max_connections` không (tính cả worker)?
- [ ] Endpoint nóng có số truy vấn là hằng số (test đếm query)?
- [ ] Truy vấn nóng đã xem `EXPLAIN ANALYZE` chưa?
- [ ] Mọi truy vấn đều tham số hoá?
- [ ] Migration có an toàn khi chạy cùng code version cũ không?
- [ ] Có `statement_timeout` để truy vấn hỏng không giữ connection mãi?
- [ ] Có gọi API ngoài bên trong transaction không?
- [ ] Có `pg_stat_statements` / slow query log bật ở production không?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| `pg_stat_statements` | Xếp hạng truy vấn tốn thời gian nhất | https://www.postgresql.org/docs/current/pgstatstatements.html |
| PgBouncer | Connection pooling ngoài app | https://www.pgbouncer.org/ |
| explain.dalibo.com | Trực quan hoá `EXPLAIN` | https://explain.dalibo.com/ |
| gh-ost | Migration online cho MySQL | https://github.com/github/gh-ost |
| strong_migrations | Chặn migration nguy hiểm (Rails) | https://github.com/ankane/strong_migrations |

## Tham khảo
- Use The Index, Luke!: https://use-the-index-luke.com/
- PostgreSQL — Explicit Locking & MVCC: https://www.postgresql.org/docs/current/explicit-locking.html
- PostgreSQL Wiki — Number Of Database Connections: https://wiki.postgresql.org/wiki/Number_Of_Database_Connections
- *Designing Data-Intensive Applications*, ch.7 Transactions: https://dataintensive.net/
- *SQL Performance Explained* — Markus Winand
- Braintree — *Safe Operations For High Volume PostgreSQL*: https://www.braintreepayments.com/blog/safe-operations-for-high-volume-postgresql/

## Liên kết
[[Caching Strategies]] · [[Repository Pattern and Service Layer]] · [[Performance Optimization]] · [[Backend]]
