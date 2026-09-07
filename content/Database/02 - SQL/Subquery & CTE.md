---
tags: [database, sql]
status: evergreen
---
# Subquery & CTE

> Hai cách chia một query lớn thành các mảnh đọc được. Khác biệt then chốt cần biết: **CTE không phải lúc nào cũng miễn phí** — ở một số DB nó dựng rào chắn tối ưu hoá.

## 1. Các dạng subquery
| Dạng | Vị trí | Ví dụ |
|---|---|---|
| **Scalar** | `SELECT` / `WHERE` | `(SELECT max(created_at) FROM "order" o WHERE o.customer_id = c.id)` |
| **Row** | So sánh bộ giá trị | `WHERE (a,b) = (SELECT x,y FROM t)` |
| **Table (derived)** | `FROM` | `FROM (SELECT ...) t` |
| **Correlated** | Tham chiếu bảng ngoài | Chạy lại cho mỗi dòng ngoài (về mặt logic) |
| **`EXISTS` / `NOT EXISTS`** | `WHERE` | Semi/anti join → [[Joins]] |
| **`IN` / `ANY` / `ALL`** | `WHERE` | ⚠️ `NOT IN` + NULL |

```sql
-- Correlated: dễ đọc nhưng hãy kiểm tra plan
SELECT c.name,
       (SELECT count(*) FROM "order" o WHERE o.customer_id = c.id) AS orders
FROM customer c;
-- Optimizer hiện đại thường viết lại thành hash join — nhưng "thường" không phải "luôn".
```

## 2. CTE — `WITH`
```sql
WITH paid AS (
  SELECT * FROM "order" WHERE status = 'paid'
), by_customer AS (
  SELECT customer_id, sum(total) AS revenue, count(*) AS n
  FROM paid GROUP BY customer_id
)
SELECT c.name, b.revenue, b.n
FROM by_customer b JOIN customer c ON c.id = b.customer_id
WHERE b.revenue > 1000
ORDER BY b.revenue DESC;
```

### Optimization fence — điểm khác biệt quan trọng
| DB | Hành vi |
|---|---|
| PostgreSQL **< 12** | CTE **luôn** được materialize ⇒ rào chắn, predicate không đẩy xuống được |
| PostgreSQL **≥ 12** | Tự động inline nếu CTE dùng 1 lần và không có side-effect; ép bằng `MATERIALIZED` / `NOT MATERIALIZED` |
| MySQL 8 | Có thể merge hoặc materialize tuỳ trường hợp |
| SQL Server / Oracle | Thường inline |

```sql
WITH x AS NOT MATERIALIZED (SELECT ...)   -- xin optimizer inline
WITH x AS MATERIALIZED     (SELECT ...)   -- cố tình dựng rào (tính 1 lần, dùng nhiều lần)
```

## 3. Recursive CTE — duyệt cây và đồ thị
```sql
WITH RECURSIVE subtree AS (
  SELECT id, parent_id, name, 1 AS depth, ARRAY[id] AS path
  FROM category WHERE id = 10                    -- anchor
  UNION ALL
  SELECT c.id, c.parent_id, c.name, s.depth + 1, s.path || c.id
  FROM category c JOIN subtree s ON c.parent_id = s.id
  WHERE NOT c.id = ANY(s.path)                   -- ✅ chống vòng lặp
    AND s.depth < 50                             -- ✅ chặn độ sâu
)
SELECT * FROM subtree ORDER BY path;
```
> Luôn có **hai** cái phanh: kiểm tra chu trình bằng mảng `path`, và giới hạn `depth`. Thiếu chúng, một cạnh vòng trong dữ liệu sẽ làm query chạy tới khi hết đĩa.

## 4. Data-modifying CTE (Postgres)
```sql
WITH moved AS (
  DELETE FROM session WHERE expires_at < now() RETURNING *
)
INSERT INTO session_archive SELECT * FROM moved;
```
⚠️ Các nhánh của cùng một statement nhìn thấy **cùng một snapshot** — nhánh này không thấy thay đổi của nhánh kia.

## 5. Chọn cái nào?
| Tình huống | Nên dùng |
|---|---|
| Kiểm tra tồn tại | `EXISTS` |
| Kiểm tra không tồn tại | `NOT EXISTS` (không bao giờ `NOT IN` nếu có NULL) |
| Cần dùng lại kết quả trung gian nhiều lần | CTE `MATERIALIZED` |
| Chia query dài cho dễ đọc | CTE (kiểm tra plan!) |
| Duyệt cây/đồ thị | `WITH RECURSIVE` |
| Top-N mỗi nhóm | `LATERAL` hoặc window function |
| Kết quả dùng lại giữa nhiều query | [[Views & Materialized Views]] |

## 6. Cạm bẫy hay gặp
1. **`NOT IN` với cột có NULL** ⇒ kết quả rỗng, âm thầm. → [[Relational Model]]
2. **Xâu chuỗi 8 tầng CTE** cho dễ đọc rồi phát hiện mỗi tầng materialize một bảng tạm — luôn xem [[Execution Plan & EXPLAIN]].
3. **Recursive CTE không chặn chu trình** ⇒ chạy vô hạn.
4. **Scalar subquery trong `SELECT` trả >1 dòng** ⇒ lỗi runtime, thường chỉ lộ ra ở production.
5. **Correlated subquery trong `SELECT` cho danh sách lớn** — kinh điển tạo ra hành vi kiểu [[N+1 Query Problem]] ngay bên trong DB.
6. **Tưởng CTE là "biến tạm"** — nó không lưu giữa các statement; muốn vậy thì dùng temp table.

## 7. Checklist áp dụng
- [ ] Đã chạy `EXPLAIN` để xem CTE được inline hay materialize chưa?
- [ ] Có `NOT IN` nào trên subquery có thể trả NULL không?
- [ ] Recursive CTE đã có chặn chu trình **và** giới hạn độ sâu chưa?
- [ ] Subquery này viết lại thành JOIN có rõ hơn/nhanh hơn không?
- [ ] CTE dùng đúng một lần — có nên `NOT MATERIALIZED` để optimizer đẩy điều kiện xuống?
- [ ] Query >100 dòng — có nên tách thành view có tên nghiệp vụ không?

## Tham khảo
- PostgreSQL Docs — *WITH Queries (CTE)*: https://www.postgresql.org/docs/current/queries-with.html
- PostgreSQL 12 release notes — CTE inlining: https://www.postgresql.org/docs/release/12.0/
- Modern SQL — *WITH RECURSIVE*: https://modern-sql.com/feature/with/recursive
- Use The Index, Luke! — *Subqueries & EXISTS*: https://use-the-index-luke.com/
- MySQL Docs — *Optimizing Subqueries and CTEs*: https://dev.mysql.com/doc/refman/8.0/en/subquery-optimization.html

## Liên kết
[[SQL Fundamentals]] · [[Joins]] · [[Views & Materialized Views]] · [[Query Optimization]] · [[Database]]
