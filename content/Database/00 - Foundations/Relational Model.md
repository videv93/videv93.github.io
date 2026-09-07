---
tags: [database, foundation, relational]
status: evergreen
---
# Relational Model

> Mô hình do E.F. Codd đề xuất năm 1970: dữ liệu là **tập hợp các quan hệ (relation)**, và mọi truy vấn là phép toán trên tập hợp. Hiểu tầng này thì SQL không còn là cú pháp phải học thuộc — nó trở thành hệ quả.

## 1. Từ vựng cốt lõi
| Thuật ngữ lý thuyết | Tên trong SQL | Ý nghĩa |
|---|---|---|
| Relation | Table | Một tập hợp các tuple, **không có thứ tự** |
| Tuple | Row | Một bản ghi |
| Attribute | Column | Một thuộc tính có kiểu dữ liệu |
| Domain | Data type | Tập giá trị hợp lệ của attribute |
| Cardinality | Số dòng | |
| Degree | Số cột | |
| Relation schema | `CREATE TABLE` | Định nghĩa cấu trúc |

**Ba hệ quả quan trọng của "relation là một tập hợp":**
1. **Không có thứ tự dòng.** Không có `ORDER BY` thì thứ tự trả về là *bất kỳ*, kể cả khi hôm nay nó trông ổn định.
2. **Không có dòng trùng lặp** (về lý thuyết). SQL thì cho phép — đó là chỗ SQL lệch khỏi mô hình lý thuyết.
3. **Truy cập theo giá trị, không theo con trỏ.** Muốn nối hai bảng thì dùng giá trị khoá, không dùng địa chỉ vật lý.

## 2. Ba loại khoá
| Loại | Định nghĩa | Ghi chú |
|---|---|---|
| **Super key** | Tập cột xác định duy nhất một dòng | Có thể thừa cột |
| **Candidate key** | Super key tối tiểu (bỏ bất kỳ cột nào là mất tính duy nhất) | Một bảng có thể có nhiều |
| **Primary key** | Candidate key được chọn làm khoá chính | Không NULL, không đổi |
| **Foreign key** | Cột trỏ tới PK của bảng khác | Cưỡng chế referential integrity |

Chi tiết thực hành: [[Keys & Constraints]].

## 3. Relational Algebra — nền tảng của mọi execution plan
| Phép toán | Ký hiệu | Tương ứng SQL |
|---|---|---|
| Selection (lọc dòng) | σ | `WHERE` |
| Projection (chọn cột) | π | `SELECT cột` |
| Union / Intersect / Difference | ∪ ∩ − | `UNION` / `INTERSECT` / `EXCEPT` |
| Cartesian product | × | `CROSS JOIN` |
| Join | ⋈ | `JOIN ... ON` |
| Rename | ρ | `AS` |
| Grouping / Aggregation | γ | `GROUP BY` |

> Query optimizer làm đúng một việc: **biến đổi cây relational algebra này thành một cây tương đương nhưng rẻ hơn** (đẩy σ xuống sát bảng, đổi thứ tự ⋈…). Đó là lý do đọc [[Execution Plan & EXPLAIN]] mới thấy các nút tên là `Seq Scan`, `Hash Join`, `Aggregate`.

## 4. Ba loại toàn vẹn (Integrity)
1. **Entity integrity** — PK không được NULL và phải duy nhất.
2. **Referential integrity** — FK phải trỏ tới một PK tồn tại (hoặc NULL).
3. **Domain integrity** — giá trị phải nằm trong kiểu/`CHECK` đã khai báo.

Đây chính là chữ **C** trong [[ACID Properties]].

## 5. NULL — điểm lệch chuẩn lớn nhất
NULL nghĩa là "**không biết**", không phải "rỗng" hay "0". Hệ quả là SQL dùng **logic ba trạng thái** (true / false / unknown):

```sql
NULL = NULL          -- → unknown, KHÔNG phải true
NULL <> NULL         -- → unknown
WHERE x = NULL       -- ❌ không bao giờ khớp; phải dùng IS NULL
COUNT(col)           -- bỏ qua NULL; COUNT(*) thì không
SUM(col)             -- bỏ qua NULL; nếu toàn NULL thì trả về NULL, không phải 0
NOT IN (1, 2, NULL)  -- ❌ luôn rỗng — cạm bẫy kinh điển
```

✅ Dùng `NOT EXISTS` thay cho `NOT IN` khi cột con có thể NULL. → [[Subquery & CTE]]

## 6. Cạm bẫy hay gặp
1. **Coi thứ tự dòng là ổn định** — không `ORDER BY` thì không có bảo đảm nào cả; đổi plan là đổi thứ tự.
2. **Dùng NULL để mã hoá ý nghĩa** ("NULL nghĩa là chưa duyệt"). Hãy dùng cột `status` rõ ràng.
3. **Nhầm relational model với "cách lưu trên đĩa"** — mô hình là logic; cách lưu thật là [[Storage Engines]].
4. **Bảng không có primary key.** Không replicate được, không update an toàn được, không dedupe được.
5. **Dùng floating point cho tiền.** `0.1 + 0.2 <> 0.3`. Dùng `NUMERIC`/`DECIMAL`. → [[Keys & Constraints]]

## 7. Checklist áp dụng
- [ ] Mọi bảng đều có primary key?
- [ ] Mọi quan hệ đều có foreign key được khai báo (không chỉ "code tự lo")?
- [ ] Cột nào cho phép NULL — và NULL ở đó nghĩa là gì, đã viết ra chưa?
- [ ] Có query nào dùng `NOT IN` với subquery có thể trả NULL không?
- [ ] Query trả danh sách cho người dùng có `ORDER BY` xác định (kèm tie-breaker duy nhất) không?

## Tham khảo
- E.F. Codd — *A Relational Model of Data for Large Shared Data Banks* (1970): https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf
- C.J. Date — *SQL and Relational Theory*
- Modern SQL — *NULL handling*: https://modern-sql.com/concept/three-valued-logic
- PostgreSQL Docs — *Data Definition*: https://www.postgresql.org/docs/current/ddl.html
- CMU 15-445 — *Relational Model & Relational Algebra*: https://15445.courses.cs.cmu.edu/

## Liên kết
[[Database Paradigms]] · [[Keys & Constraints]] · [[Normalization]] · [[SQL Fundamentals]] · [[Database]]
