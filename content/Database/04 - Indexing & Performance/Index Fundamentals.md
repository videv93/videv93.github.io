---
tags: [database, index, performance]
status: evergreen
---
# Index Fundamentals

> Index là **cấu trúc dữ liệu phụ** đánh đổi dung lượng và tốc độ ghi để lấy tốc độ đọc. Đây là đòn bẩy hiệu năng lớn nhất trong database — và cũng là nơi bị dùng sai nhiều nhất (thêm bừa, hoặc vô hiệu hoá mà không biết).

## 1. Các loại index

### `B-Tree / B+Tree Index`
Chuẩn mặc định cho RDBMS, tối ưu cho truy vấn tìm kiếm chính xác (`=`) và tìm kiếm theo khoảng (`BETWEEN`, `>`, `<`).
- Hỗ trợ thêm: `IS NULL`, `LIKE 'abc%'` (prefix), `ORDER BY` (đọc index đã sắp sẵn), `MIN`/`MAX`.
- Độ sâu chỉ 3–4 tầng cho hàng trăm triệu dòng ⇒ tra cứu là vài lần I/O.

### `Hash Index`
Tốc độ $O(1)$ cho phép so sánh bằng (`=`), **không hỗ trợ truy vấn khoảng**.
- Postgres: hash index chỉ được WAL-log (và do đó an toàn với crash/replica) từ v10. Thực tế B-Tree gần như luôn đủ tốt ⇒ hiếm khi cần.

### `Composite Index` (Index nhiều cột)
Cần tuân theo nguyên tắc **Leftmost Prefix Rule**. → note riêng: [[Composite Index]]

### Các loại chuyên biệt (PostgreSQL)
| Loại | Dùng cho | Ví dụ |
|---|---|---|
| **GIN** | Nhiều giá trị trong một cột: `JSONB`, mảng, full-text | `CREATE INDEX ON doc USING gin (body jsonb_path_ops)` |
| **GiST** | Hình học, range, nearest-neighbour, exclusion constraint | `EXCLUDE USING gist (room WITH =, during WITH &&)` |
| **SP-GiST** | Dữ liệu phân vùng không đều (quadtree, trie) | IP prefix |
| **BRIN** | Bảng **rất lớn** đã sắp tự nhiên theo cột (log theo thời gian) | Index vài trăm KB cho bảng vài trăm GB |
| **Bloom** | Lọc nhiều cột bất kỳ với độ chọn lọc thấp | extension `bloom` |
| **HNSW / IVFFlat** | Vector similarity | → [[Vector Database]] |

### Biến thể áp dụng cho mọi loại
```sql
-- Partial index: chỉ index phần dữ liệu bạn thật sự query ⇒ nhỏ và nhanh hơn nhiều
CREATE INDEX ON "order" (created_at) WHERE status = 'pending';

-- Expression index: khi WHERE bọc hàm quanh cột
CREATE INDEX ON users (lower(email));
-- ⇒ query PHẢI viết đúng dạng đó: WHERE lower(email) = lower($1)

-- Covering index: đọc xong ngay trong index, không cần chạm bảng (index-only scan)
CREATE INDEX ON "order" (customer_id) INCLUDE (total, status);

-- Unique + partial: kết hợp với soft delete
CREATE UNIQUE INDEX ON users (email) WHERE deleted_at IS NULL;
```

## 2. Khi nào index **không** được dùng
| Tình huống | Vì sao | Cách chữa |
|---|---|---|
| `WHERE lower(email) = ...` | Hàm bọc quanh cột | Expression index |
| `WHERE amount + 1 > 100` | Biểu thức trên cột | Viết `amount > 99` |
| `LIKE '%abc'` (wildcard đầu) | B-Tree sắp theo prefix | `pg_trgm` + GIN |
| Kiểu không khớp (`varchar` vs `int`) | Ép kiểu ngầm | Sửa kiểu hoặc ép đúng chiều |
| Độ chọn lọc thấp (`status='active'` chiếm 95%) | Seq scan rẻ hơn | Partial index cho giá trị hiếm |
| Bảng nhỏ (vài trăm dòng) | Seq scan rẻ hơn | Không cần index |
| Statistics cũ | Optimizer ước lượng sai | `ANALYZE` → [[Execution Plan & EXPLAIN]] |
| `OR` giữa nhiều cột | Khó dùng một index | `UNION ALL`, hoặc index riêng + BitmapOr |

> Seed gọi hiện tượng này là **Index Invalidation** — index tồn tại nhưng query viết theo cách khiến nó không dùng được.

## 3. Cái giá của index
Mỗi index thêm vào:
- **Chậm ghi**: mỗi `INSERT`/`UPDATE`/`DELETE` phải cập nhật mọi index liên quan.
- **Tốn đĩa**: index thường bằng 10–100% kích thước bảng.
- **Tốn RAM**: cạnh tranh buffer pool với dữ liệu nóng.
- **Chậm `VACUUM`** và làm khó HOT update trong Postgres.

⇒ **Index không dùng đến là chi phí thuần tuý.** Tìm chúng:
```sql
SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes WHERE idx_scan = 0 ORDER BY pg_relation_size(indexrelid) DESC;
```

## 4. Cạm bẫy hay gặp
1. **Thêm index cho mọi cột "để chắc"** — làm chậm ghi mà không giúp đọc.
2. **Index trùng lặp**: có `(a,b)` rồi vẫn tạo `(a)` — cái sau thừa. → [[Composite Index]]
3. **Quên index cho cột FK.** Postgres không tự tạo ⇒ xoá dòng cha gây seq scan bảng con. → [[Keys & Constraints]]
4. **`CREATE INDEX` trên production** khoá ghi. Luôn dùng `CREATE INDEX CONCURRENTLY` (chậm hơn, không khoá — nhưng có thể để lại index `INVALID` nếu fail, phải `DROP` và làm lại).
5. **Index trên cột độ chọn lọc thấp** — `WHERE deleted = false` khi 99% là false.
6. **Index bloat** sau nhiều update — `REINDEX CONCURRENTLY` định kỳ.
7. **Tin rằng index sẽ tăng tốc `ORDER BY ... LIMIT`** khi thứ tự index không khớp thứ tự query (kể cả chiều `ASC`/`DESC` trong index nhiều cột).

## 5. Checklist áp dụng
- [ ] Mỗi index có ít nhất một query thật dùng đến nó không? (`pg_stat_user_indexes`)
- [ ] Mọi cột FK có index chưa?
- [ ] Có index nào là prefix trùng của index khác (thừa) không?
- [ ] Query nào đang bị index invalidation (hàm/biểu thức/ép kiểu trên cột)?
- [ ] Có cơ hội dùng partial index để giảm kích thước không?
- [ ] Query nóng có thể thành index-only scan bằng `INCLUDE` không?
- [ ] Tổng dung lượng index so với dung lượng bảng là bao nhiêu?
- [ ] Index mới có được tạo bằng `CONCURRENTLY` không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `pg_stat_user_indexes` | Index nào được dùng, dùng bao nhiêu | https://www.postgresql.org/docs/current/monitoring-stats.html |
| HypoPG | Tạo index **giả** để thử plan trước khi tạo thật | https://hypopg.readthedocs.io/ |
| pgHero | Gợi ý index thiếu / index thừa | https://github.com/ankane/pghero |
| pt-index-usage (Percona) | Phân tích index MySQL từ slow log | https://docs.percona.com/percona-toolkit/ |
| `pg_trgm` | Index cho `LIKE '%...%'` và fuzzy search | https://www.postgresql.org/docs/current/pgtrgm.html |

## Tham khảo
- Markus Winand — *Use The Index, Luke!*: https://use-the-index-luke.com/
- PostgreSQL Docs — *Indexes*: https://www.postgresql.org/docs/current/indexes.html
- PostgreSQL Docs — *Index Types*: https://www.postgresql.org/docs/current/indexes-types.html
- MySQL Docs — *Optimization and Indexes*: https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html
- Alex Petrov — *Database Internals*, ch.2 (B-Tree): https://www.databass.dev/

## Liên kết
[[Composite Index]] · [[Execution Plan & EXPLAIN]] · [[Query Optimization]] · [[Storage Engines]] · [[Database]]
