---
tags: [database, index, performance]
status: evergreen
---
# Composite Index

> Index nhiều cột. Toàn bộ sức mạnh — và toàn bộ cạm bẫy — nằm ở một quy tắc: **Leftmost Prefix Rule**. Thứ tự cột trong index quan trọng hơn việc có index hay không.

## 1. Leftmost Prefix Rule
Với `CREATE INDEX ON t (a, b, c)`, index dùng được cho các tiền tố **từ trái**:

| Query | Dùng được? | Mức độ |
|---|---|---|
| `WHERE a = 1` | ✅ | Toàn phần |
| `WHERE a = 1 AND b = 2` | ✅ | Toàn phần |
| `WHERE a = 1 AND b = 2 AND c = 3` | ✅ | Toàn phần |
| `WHERE a = 1 AND c = 3` | ⚠️ | Chỉ dùng `a`, `c` lọc sau (filter) |
| `WHERE b = 2` | ❌ | Không dùng được (trừ index skip scan) |
| `WHERE b = 2 AND c = 3` | ❌ | Không dùng được |
| `WHERE a = 1 ORDER BY b` | ✅ | Dùng cả để sắp, khỏi `Sort` |

> Ẩn dụ: index nhiều cột như **danh bạ sắp theo (Họ, Tên)**. Tìm "Nguyễn" — dễ. Tìm "Nguyễn Văn A" — dễ. Tìm mọi người tên "A" — phải đọc cả quyển.

## 2. Quy tắc sắp thứ tự cột — ESR
> **E**quality → **S**ort → **R**ange
> (Quy tắc do MongoDB đặt tên, nhưng đúng cho mọi B-Tree.)

1. Cột so sánh **bằng** (`=`, `IN`) đứng trước.
2. Cột dùng cho **`ORDER BY`** tiếp theo.
3. Cột so sánh **khoảng** (`>`, `<`, `BETWEEN`, `LIKE 'x%'`) sau cùng.

**Vì sao?** Sau cột range đầu tiên, index không còn sắp xếp theo các cột sau nữa ⇒ mọi cột phía sau chỉ dùng để filter, không dùng để seek.

```sql
-- Query
SELECT * FROM "order"
WHERE tenant_id = 7 AND status = 'paid' AND created_at >= '2026-01-01'
ORDER BY created_at DESC LIMIT 20;

-- ❌ range đứng giữa: status không seek được
CREATE INDEX ON "order" (tenant_id, created_at, status);

-- ✅ equality → sort/range
CREATE INDEX ON "order" (tenant_id, status, created_at DESC);
```

Khi hai cột đều là equality, đặt cột **chọn lọc cao hơn** (ít trùng hơn) lên trước — nhưng ưu tiên này yếu hơn quy tắc ESR nhiều.

## 3. Chiều `ASC`/`DESC` trong `ORDER BY` nhiều cột
```sql
ORDER BY created_at DESC, id DESC
```
- Index `(created_at, id)` dùng được: đọc ngược toàn bộ index.
- `ORDER BY created_at DESC, id ASC` — **chiều trộn** ⇒ index `(created_at, id)` **không** loại bỏ được `Sort`. Cần index `(created_at DESC, id ASC)`.
- Điều này rất quan trọng cho keyset pagination. → [[SQL Fundamentals]]

## 4. Index thừa và index thiếu
```sql
-- Đã có (a, b, c) thì (a) và (a, b) là THỪA — xoá đi
-- Nhưng (b, a) KHÔNG thừa — nó phục vụ query khác

-- Tìm index trùng prefix trong Postgres
SELECT indrelid::regclass AS tbl, array_agg(indexrelid::regclass) AS idx
FROM pg_index GROUP BY indrelid, (indkey::int2[])[0:2] HAVING count(*) > 1;
```

## 5. Cạm bẫy hay gặp
1. **Tạo 3 index đơn cột thay vì 1 composite.** Postgres có thể kết hợp bằng BitmapAnd, nhưng luôn chậm hơn một composite đúng.
2. **Đặt cột range trước cột equality** — lỗi thiết kế index phổ biến nhất.
3. **Nhồi quá nhiều cột** ⇒ index to, kém hiệu quả cache. Thường 2–4 cột là đủ; cột chỉ cần đọc ra thì dùng `INCLUDE` (covering) thay vì đưa vào key.
4. **Quên `DESC` trong định nghĩa index** khi query sắp trộn chiều.
5. **`IN (...)` được coi là equality** — dùng được ở vị trí trái, nhưng chi phí nhân lên theo số phần tử.
6. **Cho rằng thêm cột vào index thì query cũ chậm đi** — không, chỉ tốn thêm dung lượng và chi phí ghi.
7. **Không đo lại sau khi tạo.** Luôn xác nhận bằng `EXPLAIN` rằng index mới thật sự được chọn.

## 6. Checklist áp dụng
- [ ] Đã liệt kê các query nóng và mẫu `WHERE`/`ORDER BY` của chúng chưa?
- [ ] Thứ tự cột có tuân theo **E → S → R** không?
- [ ] Có cột nào ở bên phải một cột range mà tôi kỳ vọng nó seek không?
- [ ] `ORDER BY` trộn chiều — index đã khai báo đúng `ASC`/`DESC` chưa?
- [ ] Có index nào là prefix của index khác (thừa) không?
- [ ] Có thể chuyển vài cột từ key sang `INCLUDE` để index gọn hơn không?
- [ ] Đã xác nhận bằng `EXPLAIN (ANALYZE, BUFFERS)` rằng index được dùng và bước `Sort` biến mất chưa?

## Tham khảo
- Use The Index, Luke! — *The Where Clause & concatenated indexes*: https://use-the-index-luke.com/sql/where-clause/the-equals-operator/concatenated-keys
- Use The Index, Luke! — *Indexing Order By*: https://use-the-index-luke.com/sql/sorting-grouping
- PostgreSQL Docs — *Multicolumn Indexes*: https://www.postgresql.org/docs/current/indexes-multicolumn.html
- MySQL Docs — *Multiple-Column Indexes*: https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html
- MongoDB — *The ESR Rule*: https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/

## Liên kết
[[Index Fundamentals]] · [[Execution Plan & EXPLAIN]] · [[Query Optimization]] · [[SQL Fundamentals]] · [[Database]]
