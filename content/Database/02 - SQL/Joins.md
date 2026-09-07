---
tags: [database, sql]
status: evergreen
---
# Joins

> JOIN là hiện thân của quan hệ trong [[Relational Model]]. Hai tầng cần phân biệt rõ: **JOIN logic** (bạn viết gì) và **join algorithm** (optimizer chọn cách nào) — nhầm hai tầng này là nguồn gốc của phần lớn hiểu lầm về hiệu năng.

## 1. Các loại JOIN logic
| Loại | Giữ lại | Ghi nhớ |
|---|---|---|
| `INNER JOIN` | Chỉ dòng khớp hai bên | Mặc định |
| `LEFT [OUTER] JOIN` | Toàn bộ bảng trái + khớp bên phải (NULL nếu không) | Phổ biến thứ hai |
| `RIGHT JOIN` | Ngược lại | Hiếm dùng — đổi thứ tự bảng và dùng LEFT |
| `FULL OUTER JOIN` | Cả hai bên | Đối soát hai nguồn dữ liệu |
| `CROSS JOIN` | Tích Descartes | Sinh chuỗi ngày, ma trận |
| **Self join** | Bảng nối với chính nó | Cây phân cấp, so sánh dòng với dòng |
| `LATERAL` / `CROSS APPLY` | Subquery tham chiếu được dòng bên trái | "Top-N mỗi nhóm" |

```sql
-- Semi join: "có tồn tại" — KHÔNG nhân dòng
SELECT c.* FROM customer c
WHERE EXISTS (SELECT 1 FROM "order" o WHERE o.customer_id = c.id);

-- Anti join: "không tồn tại" — an toàn với NULL (khác NOT IN)
SELECT c.* FROM customer c
WHERE NOT EXISTS (SELECT 1 FROM "order" o WHERE o.customer_id = c.id);

-- LATERAL: 3 đơn gần nhất của mỗi khách
SELECT c.id, o.*
FROM customer c
CROSS JOIN LATERAL (
  SELECT * FROM "order" o WHERE o.customer_id = c.id
  ORDER BY o.created_at DESC LIMIT 3
) o;
```

## 2. Join algorithm — optimizer chọn gì và vì sao
| Thuật toán | Cơ chế | Nhanh khi | Dấu hiệu trong plan |
|---|---|---|---|
| **Nested Loop** | Với mỗi dòng ngoài, tra bảng trong | Bảng ngoài **nhỏ** + bảng trong có index | `Nested Loop` + `Index Scan` |
| **Hash Join** | Dựng hash table từ bảng nhỏ, quét bảng lớn | Join đẳng thức, dữ liệu lớn, đủ RAM | `Hash Join` + `Hash` |
| **Merge Join** | Sắp xếp cả hai rồi trộn | Cả hai đã sắp theo khoá join | `Merge Join` + `Sort`/`Index Scan` |

> Thấy `Nested Loop` với **hàng triệu** dòng ở vòng ngoài = báo động đỏ. Thường do optimizer ước lượng sai số dòng → chạy `ANALYZE`. Xem [[Execution Plan & EXPLAIN]].

## 3. Cạm bẫy hay gặp
1. **`WHERE` trên bảng phải của `LEFT JOIN`** biến nó thành `INNER JOIN`:
   ```sql
   -- ❌ mất hết khách không có đơn
   FROM customer c LEFT JOIN "order" o ON o.customer_id = c.id
   WHERE o.status = 'paid'
   -- ✅ đưa điều kiện vào ON
   FROM customer c LEFT JOIN "order" o ON o.customer_id = c.id AND o.status = 'paid'
   ```
2. **Nhân dòng (fan-out)** khi JOIN nhiều bảng 1–N cùng lúc ⇒ `SUM` bị thổi phồng. Gom nhóm từng nhánh riêng bằng subquery/CTE trước khi JOIN.
3. **`NOT IN` với subquery có NULL** ⇒ luôn rỗng. Dùng `NOT EXISTS`. → [[Relational Model]]
4. **Thiếu index trên cột FK** ⇒ hash join lớn hoặc seq scan. → [[Index Fundamentals]]
5. **JOIN trên cột khác kiểu** (`varchar` với `int`, hoặc khác collation) ⇒ ép kiểu ngầm, mất index.
6. **`DISTINCT` để chữa dòng trùng do JOIN sai** — che triệu chứng, thêm một bước sort đắt đỏ. Sửa JOIN.
7. **Quá nhiều bảng trong một JOIN** (>8–12): optimizer chuyển sang tìm kiếm heuristic (`geqo` trong Postgres) và có thể chọn plan tệ.

## 4. Checklist áp dụng
- [ ] Mọi cột dùng để JOIN đều có index?
- [ ] Kiểu dữ liệu hai vế JOIN giống nhau?
- [ ] `LEFT JOIN` — điều kiện lọc bảng phải nằm trong `ON`, không phải `WHERE`?
- [ ] Query có `SUM`/`COUNT` cùng nhiều JOIN 1–N — đã kiểm tra fan-out chưa?
- [ ] Có `DISTINCT` nào đang che một JOIN sai không?
- [ ] Chỉ cần kiểm tra tồn tại — đã dùng `EXISTS` thay vì JOIN + `DISTINCT` chưa?
- [ ] Bài toán "top N mỗi nhóm" — đã cân nhắc `LATERAL` hoặc window function chưa?

## Tham khảo
- Use The Index, Luke! — *The Join Operation*: https://use-the-index-luke.com/sql/join
- PostgreSQL Docs — *Table Expressions / Joins*: https://www.postgresql.org/docs/current/queries-table-expressions.html
- PostgreSQL Docs — *Planner: join methods*: https://www.postgresql.org/docs/current/planner-optimizer.html
- Modern SQL — *LATERAL*: https://modern-sql.com/feature/lateral
- CMU 15-445 — *Join Algorithms*: https://15445.courses.cs.cmu.edu/

## Liên kết
[[SQL Fundamentals]] · [[Subquery & CTE]] · [[Execution Plan & EXPLAIN]] · [[Index Fundamentals]] · [[Database]]
