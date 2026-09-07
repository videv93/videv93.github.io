---
tags: [database, sql, analytics]
status: evergreen
---
# Aggregation & Window Functions

> `GROUP BY` **thu gọn** nhiều dòng thành một. Window function **giữ nguyên** số dòng nhưng cho mỗi dòng nhìn thấy các dòng xung quanh. Nắm được sự khác biệt này là bước nhảy lớn nhất từ "biết SQL" sang "dùng được SQL".

## 1. Aggregation cơ bản
```sql
SELECT customer_id,
       count(*)                      AS orders,       -- đếm dòng
       count(coupon_code)            AS with_coupon,  -- bỏ qua NULL
       count(DISTINCT product_id)    AS distinct_products,
       sum(total)                    AS revenue,
       avg(total)                    AS avg_order,
       percentile_cont(0.5) WITHIN GROUP (ORDER BY total) AS median,
       string_agg(status, ',' ORDER BY created_at)        AS status_path,
       array_agg(id ORDER BY created_at DESC)             AS order_ids,
       jsonb_agg(jsonb_build_object('id', id, 'total', total)) AS payload,
       sum(total) FILTER (WHERE status = 'paid')          AS paid_revenue -- ✅ chuẩn SQL
FROM "order"
GROUP BY customer_id
HAVING sum(total) > 1000;
```
- **`FILTER`** thay cho `sum(CASE WHEN ... THEN ... END)` — rõ hơn nhiều.
- `GROUPING SETS` / `ROLLUP` / `CUBE`: nhiều mức tổng hợp trong một lần quét.
```sql
SELECT region, product, sum(revenue)
FROM sales GROUP BY ROLLUP (region, product);  -- theo region+product, theo region, và tổng
```

## 2. Window function — cú pháp
```
<hàm> OVER (
    PARTITION BY <chia nhóm>
    ORDER BY     <sắp trong nhóm>
    <frame: ROWS/RANGE BETWEEN ... AND ...>
)
```

| Nhóm | Hàm | Dùng cho |
|---|---|---|
| **Ranking** | `row_number()`, `rank()`, `dense_rank()`, `ntile(n)` | Top-N mỗi nhóm, phân vị |
| **Offset** | `lag()`, `lead()`, `first_value()`, `last_value()` | So sánh với dòng trước/sau |
| **Aggregate cửa sổ** | `sum()`, `avg()`, `count()` kèm `OVER` | Running total, moving average |

### Ba hàm ranking khác nhau ở đâu
| Điểm | `row_number` | `rank` | `dense_rank` |
|---|---|---|---|
| 100, 100, 90 | 1, 2, 3 | 1, 1, 3 | 1, 1, 2 |

### Ví dụ thực chiến
```sql
-- Top 3 sản phẩm bán chạy nhất MỖI danh mục
SELECT * FROM (
  SELECT p.category_id, p.name, sum(oi.quantity) AS qty,
         row_number() OVER (PARTITION BY p.category_id
                            ORDER BY sum(oi.quantity) DESC) AS rn
  FROM order_item oi JOIN product p ON p.id = oi.product_id
  GROUP BY p.category_id, p.name
) t WHERE rn <= 3;

-- Running total + tăng trưởng so với ngày trước
SELECT day, revenue,
       sum(revenue) OVER (ORDER BY day) AS cumulative,
       revenue - lag(revenue) OVER (ORDER BY day) AS delta,
       avg(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS ma7
FROM daily_revenue ORDER BY day;
```
> **Không dùng được window function trong `WHERE`** (nó chạy *sau* `WHERE`). Bọc vào subquery/CTE rồi lọc ở ngoài — như ví dụ `rn <= 3` ở trên. → [[SQL Fundamentals]]

## 3. Frame: `ROWS` vs `RANGE`
- Mặc định khi có `ORDER BY` là `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` — gộp **mọi dòng cùng giá trị sắp xếp** (peers).
- Muốn "6 dòng trước đó" theo đúng nghĩa đếm dòng thì **phải** ghi `ROWS`.
- Đây là nguồn sai số thầm lặng của moving average khi có ngày trùng.

## 4. Cạm bẫy hay gặp
1. **Cột trong `SELECT` không nằm trong `GROUP BY`** và không được gom — Postgres báo lỗi, MySQL (không bật `ONLY_FULL_GROUP_BY`) trả về **giá trị bất kỳ**. Bật `ONLY_FULL_GROUP_BY`.
2. **`count(col)` vs `count(*)`** — `count(col)` bỏ qua NULL.
3. **`avg` trên tập có NULL** — NULL bị bỏ, mẫu số nhỏ hơn bạn tưởng. Dùng `avg(coalesce(col,0))` nếu muốn tính NULL là 0.
4. **Lọc ở `HAVING` cái lẽ ra lọc được ở `WHERE`** — gom nhóm thừa rồi mới vứt đi.
5. **`last_value()` trả sai** vì frame mặc định dừng ở dòng hiện tại. Thêm `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.
6. **`ORDER BY` trong window ≠ `ORDER BY` của query.** Muốn kết quả sắp xếp thì vẫn phải có `ORDER BY` ngoài cùng.
7. **`DISTINCT` + window function** — window chạy trước `DISTINCT`, dễ ra kết quả bất ngờ.

## 5. Checklist áp dụng
- [ ] Bài toán này giữ nguyên số dòng (window) hay thu gọn (`GROUP BY`)?
- [ ] Điều kiện nào lọc được ở `WHERE` thay vì `HAVING`?
- [ ] Có dùng `FILTER (WHERE ...)` thay cho `CASE WHEN` trong aggregate chưa?
- [ ] Moving average / N dòng gần nhất — đã ghi rõ `ROWS` chưa?
- [ ] Top-N mỗi nhóm — đã dùng `row_number()` hoặc `LATERAL` thay vì self-join chưa?
- [ ] `count(*)` hay `count(col)` — đã chọn đúng theo ý định về NULL?
- [ ] Có index hỗ trợ `PARTITION BY ... ORDER BY` để tránh bước `Sort` đắt không?

## Tham khảo
- PostgreSQL Docs — *Window Functions*: https://www.postgresql.org/docs/current/tutorial-window.html
- PostgreSQL Docs — *Aggregate Functions*: https://www.postgresql.org/docs/current/functions-aggregate.html
- Modern SQL — *Window Functions*: https://modern-sql.com/feature/over
- Use The Index, Luke! — *Window functions & indexes*: https://use-the-index-luke.com/sql/partial-results/window-functions
- *SQL Window Functions Cheat Sheet* — LearnSQL: https://learnsql.com/blog/sql-window-functions-cheat-sheet/

## Liên kết
[[SQL Fundamentals]] · [[Joins]] · [[Subquery & CTE]] · [[OLTP vs OLAP]] · [[Database]]
