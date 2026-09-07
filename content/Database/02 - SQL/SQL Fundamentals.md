---
tags: [database, sql]
status: evergreen
---
# SQL Fundamentals

> SQL là ngôn ngữ **khai báo**: bạn mô tả *cái mình muốn*, optimizer quyết định *cách lấy*. Hầu hết lỗi SQL của người có kinh nghiệm lập trình đến từ việc vẫn nghĩ theo kiểu vòng lặp.

## 1. Năm nhóm lệnh
| Nhóm | Lệnh | Ghi chú |
|---|---|---|
| **DDL** — định nghĩa | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` | Postgres: DDL nằm trong transaction được; MySQL: **không** (implicit commit) |
| **DML** — thao tác | `INSERT`, `UPDATE`, `DELETE`, `MERGE` | |
| **DQL** — truy vấn | `SELECT` | |
| **DCL** — phân quyền | `GRANT`, `REVOKE` | → [[Database Security]] |
| **TCL** — giao dịch | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` | → [[ACID Properties]] |

## 2. Thứ tự thực thi logic (khác thứ tự viết!)
```
FROM / JOIN  →  WHERE  →  GROUP BY  →  HAVING
             →  SELECT  →  DISTINCT  →  ORDER BY  →  LIMIT / OFFSET
```
Ba hệ quả cần thuộc:
1. **`WHERE` không dùng được alias của `SELECT`** — lúc `WHERE` chạy, `SELECT` chưa xảy ra.
2. **`WHERE` lọc dòng *trước* gom nhóm; `HAVING` lọc nhóm *sau*.** Lọc được ở `WHERE` thì luôn rẻ hơn.
3. **`ORDER BY` chạy sau `SELECT`** ⇒ dùng được alias.

## 3. Cú pháp cần thuộc lòng
```sql
-- UPSERT (Postgres)
INSERT INTO product (sku, name, price) VALUES ('A1', 'Bàn', 100)
ON CONFLICT (sku) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price;

-- UPDATE ... FROM (Postgres) — cập nhật theo bảng khác
UPDATE order_item oi SET unit_price = p.price
FROM product p WHERE p.id = oi.product_id AND oi.order_id = 42;

-- RETURNING — lấy lại dòng vừa ghi, khỏi query thêm lần nữa
INSERT INTO "order" (customer_id) VALUES (7) RETURNING id, created_at;
DELETE FROM session WHERE expires_at < now() RETURNING id;

-- Insert nhiều dòng một lệnh (nhanh hơn N lệnh hàng chục lần)
INSERT INTO log (ts, msg) VALUES (now(),'a'), (now(),'b'), (now(),'c');

-- CASE, COALESCE, NULLIF
SELECT COALESCE(nickname, name, 'ẩn danh') AS display,
       CASE WHEN total > 1e6 THEN 'VIP' ELSE 'thường' END AS tier
FROM customer;
```

## 4. Phân trang: keyset > offset
```sql
-- ❌ OFFSET lớn: DB vẫn phải đọc và bỏ đi 100.000 dòng
SELECT * FROM post ORDER BY created_at DESC LIMIT 20 OFFSET 100000;

-- ✅ Keyset (seek method): thời gian không đổi theo trang
SELECT * FROM post
WHERE (created_at, id) < ('2026-01-01 10:00'::timestamptz, 98765)
ORDER BY created_at DESC, id DESC LIMIT 20;
```
> Keyset còn tránh **lệch trang** khi có dòng mới chèn vào giữa lúc người dùng đang lật trang. Cần index trên `(created_at DESC, id DESC)` → [[Composite Index]].

## 5. Cạm bẫy hay gặp
1. **`SELECT *`** — kéo cột thừa, phá covering index, và vỡ khi ai đó thêm cột. → [[Query Optimization]]
2. **`DELETE`/`UPDATE` không `WHERE`.** Thói quen: viết `SELECT` trước, đổi thành `UPDATE` sau; bật `\set AUTOCOMMIT off`.
3. **`TRUNCATE` không phải `DELETE`** — không kích hoạt trigger, không `WHERE`, reset sequence.
4. **Nối chuỗi để dựng SQL** ⇒ SQL injection. Luôn dùng **parameterized query**. → [[Database Security]]
5. **`COUNT(*)` trên bảng lớn** trong Postgres luôn phải quét — dùng ước lượng từ `pg_class.reltuples` khi chỉ cần con số gần đúng.
6. **So sánh timestamp với `= date`** — dùng khoảng `>= d AND < d+1`, đừng bọc hàm quanh cột (giết index).
7. **`OFFSET` sâu** — xem mục 4.
8. **`IN (danh sách 10.000 phần tử)`** — dùng `= ANY(array)` hoặc `JOIN` với `VALUES`/temp table.

## 6. Checklist áp dụng
- [ ] Query có liệt kê cột rõ ràng thay vì `SELECT *`?
- [ ] Mọi tham số từ người dùng đều đi qua placeholder (`$1`, `?`)?
- [ ] Có `WHERE` nào bọc hàm quanh cột có index không?
- [ ] Phân trang dùng keyset thay vì OFFSET sâu?
- [ ] `UPDATE`/`DELETE` chạy tay đã được `SELECT` kiểm tra trước, trong transaction?
- [ ] Insert hàng loạt có gộp thành một lệnh (hoặc `COPY`) không?
- [ ] Có tận dụng `RETURNING` để bớt một round-trip không?

## Tham khảo
- PostgreSQL Docs — *SQL Language*: https://www.postgresql.org/docs/current/sql.html
- Modern SQL — tính năng SQL chuẩn theo phiên bản: https://modern-sql.com/
- Use The Index, Luke! — *Paging Through Results*: https://use-the-index-luke.com/sql/partial-results/fetch-next-page
- PostgreSQL Exercises — luyện tập: https://pgexercises.com/
- Markus Winand — *SQL Performance Explained*: https://sql-performance-explained.com/

## Liên kết
[[Joins]] · [[Subquery & CTE]] · [[Aggregation & Window Functions]] · [[Query Optimization]] · [[Database]]
