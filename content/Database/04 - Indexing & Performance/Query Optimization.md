---
tags: [database, performance, sql]
status: evergreen
---
# Query Optimization

> Viết lại query để optimizer có cơ hội chọn plan tốt. Thứ tự ưu tiên: **giảm lượng dữ liệu chạm vào** → **giúp index dùng được** → **giảm số vòng** → mới đến chỉnh cấu hình.

## 1. Nguyên tắc cốt lõi (từ seed, mở rộng)
1. **Tránh dùng `SELECT *`, chỉ lấy các cột cần thiết.**
   - Bớt I/O và mạng, và quan trọng hơn: mở đường cho **index-only scan**.
2. **Phân tích câu lệnh bằng `EXPLAIN` / `EXPLAIN ANALYZE`** để phát hiện Sequential Scan thay vì Index Scan. → [[Execution Plan & EXPLAIN]]
3. **Hạn chế dùng hàm (Function) hoặc wildcard đầu chuỗi (`LIKE '%abc'`) trên các cột đã đánh index** vì sẽ gây N+1 / Index Invalidation.
   ```sql
   -- ❌ hàm bọc cột ⇒ index chết
   WHERE date_trunc('day', created_at) = '2026-01-15'
   WHERE lower(email) = 'a@b.com'
   WHERE created_at::date = '2026-01-15'

   -- ✅ giữ cột trần
   WHERE created_at >= '2026-01-15' AND created_at < '2026-01-16'
   WHERE email = 'a@b.com'                       -- + citext hoặc expression index
   ```
   Với `LIKE '%abc%'`: dùng `pg_trgm` + GIN index, hoặc full-text search.
   → [[N+1 Query Problem]], [[Index Fundamentals]]

## 2. Bộ kỹ thuật viết lại

| Vấn đề | ❌ | ✅ |
|---|---|---|
| Chỉ cần biết có tồn tại | `COUNT(*) > 0` | `EXISTS (SELECT 1 ...)` |
| Loại trừ | `NOT IN (subquery)` | `NOT EXISTS` (an toàn với NULL) |
| Dòng trùng do JOIN | `DISTINCT` | Sửa JOIN, hoặc `EXISTS` |
| Phân trang sâu | `OFFSET 100000` | Keyset pagination |
| Lọc sau gom nhóm | `HAVING x = 1` | `WHERE x = 1` (khi lọc được trước) |
| `OR` giữa hai cột | `WHERE a=1 OR b=2` | `UNION ALL` hai nhánh có index |
| Nhiều query nhỏ | Vòng lặp trong code | 1 query với `IN`/`JOIN` → [[N+1 Query Problem]] |
| Đếm chính xác trên bảng khổng lồ | `count(*)` | Ước lượng `reltuples`, hoặc bảng đếm |
| Ghi hàng loạt | N câu `INSERT` | Multi-row `INSERT` hoặc `COPY` |
| Cập nhật theo bảng khác | Vòng lặp `UPDATE` | `UPDATE ... FROM` |
| Tổng hợp lặp lại | Tính mỗi request | [[Views & Materialized Views]] |

```sql
-- OR → UNION ALL: mỗi nhánh dùng được index riêng
SELECT * FROM t WHERE a = 1
UNION ALL
SELECT * FROM t WHERE b = 2 AND a <> 1;

-- Đẩy LIMIT xuống sớm: gom id trước, JOIN lấy chi tiết sau
WITH page AS (
  SELECT id FROM "order" WHERE tenant_id = 7
  ORDER BY created_at DESC LIMIT 20
)
SELECT o.*, c.name FROM page p
JOIN "order" o ON o.id = p.id
JOIN customer c ON c.id = o.customer_id;
```

## 3. Giúp optimizer ước lượng đúng
Plan tệ thường **không** phải lỗi optimizer mà là lỗi thông tin đầu vào:
```sql
ANALYZE "order";                                  -- cập nhật statistics
ALTER TABLE "order" ALTER COLUMN status SET STATISTICS 500;   -- tăng độ chi tiết
CREATE STATISTICS ord_stat (dependencies, ndistinct)
  ON tenant_id, status FROM "order";              -- ✅ cột tương quan
ANALYZE "order";
```
> `CREATE STATISTICS` là công cụ bị đánh giá thấp nhất: khi hai cột phụ thuộc nhau (`city` và `country`), optimizer mặc định nhân xác suất độc lập ⇒ ước lượng sai hàng trăm lần.

## 4. Cạm bẫy hay gặp
1. **Tối ưu query không phải nút thắt.** Xếp hạng bằng `pg_stat_statements` theo **tổng** thời gian trước.
2. **Tối ưu bằng cảm tính** thay vì plan.
3. **Thêm index cho mọi query chậm** — đôi khi lời giải là viết lại query hoặc giảm dữ liệu.
4. **Dùng hint/`enable_*` để ép plan** — che vấn đề statistics, và sẽ sai khi dữ liệu đổi.
5. **Quên rằng ORM sinh SQL khác với SQL bạn nghĩ.** Luôn log SQL thật.
6. **Tối ưu trên dataset nhỏ.**
7. **Bỏ qua `work_mem`** — một `Sort` tràn đĩa có thể chậm gấp 50 lần. Set theo session cho query nặng, đừng nâng toàn cục (nó nhân với số connection × số nút sort).
8. **Không đo lại sau khi sửa**, không ghi lại con số trước/sau.

## 5. Checklist áp dụng
- [ ] Query này có nằm trong top 10 theo tổng thời gian không?
- [ ] Đã có plan trước khi sửa chưa?
- [ ] Có `SELECT *` không cần thiết không?
- [ ] Có hàm/ép kiểu bọc quanh cột có index không?
- [ ] Có `LIKE '%...'` không? (→ trigram/FTS)
- [ ] Điều kiện lọc có đẩy được xuống sớm nhất có thể không?
- [ ] `LIMIT` có được áp dụng trước khi JOIN các bảng chi tiết không?
- [ ] Statistics đã mới chưa? Cột tương quan đã có `CREATE STATISTICS` chưa?
- [ ] Đã ghi lại số đo trước/sau vào PR chưa?

## Tham khảo
- Use The Index, Luke! — *SQL Performance Explained*: https://use-the-index-luke.com/
- PostgreSQL Docs — *Performance Tips*: https://www.postgresql.org/docs/current/performance-tips.html
- PostgreSQL Docs — *Extended Statistics*: https://www.postgresql.org/docs/current/planner-stats.html#PLANNER-STATS-EXTENDED
- MySQL Docs — *Optimizing SELECT Statements*: https://dev.mysql.com/doc/refman/8.0/en/select-optimization.html
- Depesz — *Explaining the unexplainable*: https://www.depesz.com/tag/unexplainable/

## Liên kết
[[Execution Plan & EXPLAIN]] · [[Index Fundamentals]] · [[N+1 Query Problem]] · [[Performance Tuning]] · [[SQL Fundamentals]] · [[Database]]
