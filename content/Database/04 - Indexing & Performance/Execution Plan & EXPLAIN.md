---
tags: [database, performance]
status: evergreen
---
# Execution Plan & EXPLAIN

> Công cụ chẩn đoán số một. Mọi phát biểu về hiệu năng không kèm execution plan đều là phỏng đoán. Phân tích câu lệnh bằng `EXPLAIN` / `EXPLAIN ANALYZE` để phát hiện **Sequential Scan** (Scan toàn bộ bảng) thay vì **Index Scan**.

## 1. Cú pháp
```sql
EXPLAIN SELECT ...;                       -- chỉ ước lượng, KHÔNG chạy query
EXPLAIN ANALYZE SELECT ...;               -- CHẠY THẬT rồi báo số liệu thực tế
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT) SELECT ...;   -- ✅ dạng nên dùng
```
⚠️ `EXPLAIN ANALYZE` trên `UPDATE`/`DELETE` **thực thi thật**. Bọc trong `BEGIN; ... ROLLBACK;`.

`BUFFERS` là tuỳ chọn quan trọng nhất mà người ta hay quên — nó cho biết query đọc bao nhiêu page và bao nhiêu từ cache.

## 2. Đọc plan
```
Limit  (cost=0.43..8.71 rows=20 width=64) (actual time=0.032..0.198 rows=20 loops=1)
  ->  Index Scan using idx_order_cust_created on "order"
        (cost=0.43..4321.00 rows=10432 width=64) (actual time=0.030..0.190 rows=20 loops=1)
        Index Cond: (customer_id = 42)
        Filter: (status = 'paid')
        Rows Removed by Filter: 180
        Buffers: shared hit=25 read=3
Planning Time: 0.15 ms
Execution Time: 0.24 ms
```
| Trường | Ý nghĩa |
|---|---|
| `cost=A..B` | Ước lượng chi phí *bắt đầu*..*hoàn tất* (đơn vị tương đối, không phải ms) |
| `rows` (cost) | Số dòng **ước lượng** |
| `actual ... rows=N loops=M` | Thực tế; **tổng dòng = N × M** |
| `Index Cond` | Điều kiện dùng để **seek** trong index — tốt |
| `Filter` + `Rows Removed by Filter` | Đọc lên rồi mới vứt — **lãng phí**, dấu hiệu index chưa đủ |
| `Buffers: shared hit / read` | `hit` = từ cache, `read` = từ đĩa/OS |
| `Planning` vs `Execution Time` | Planning cao bất thường ⇒ quá nhiều partition/index |

**Đọc plan từ trong ra ngoài, từ dưới lên.** Nút thụt sâu nhất chạy trước.

## 3. Các nút thường gặp
| Nút | Ý nghĩa | Lo ngại khi |
|---|---|---|
| `Seq Scan` | Quét toàn bảng | Bảng lớn + `Filter` loại bỏ hầu hết dòng |
| `Index Scan` | Seek index rồi lấy dòng từ heap | Số dòng rất lớn (mỗi dòng là một random I/O) |
| `Index Only Scan` | Đọc xong ngay trong index | ✅ Tốt nhất; chú ý `Heap Fetches` cao ⇒ cần `VACUUM` |
| `Bitmap Heap Scan` | Gom nhiều dòng rồi đọc heap theo thứ tự vật lý | Bình thường ở mức trung gian |
| `Nested Loop` | Vòng lặp lồng | `loops` rất lớn ⇒ đỏ |
| `Hash Join` / `Hash` | Dựng hash table | `Batches > 1` ⇒ tràn đĩa, tăng `work_mem` |
| `Sort` | Sắp xếp | `Sort Method: external merge Disk` ⇒ tràn đĩa |
| `Materialize` / `Memoize` | Cache kết quả trung gian | |
| `Gather` / `Parallel ...` | Chạy song song | |

## 4. Quy trình chẩn đoán 5 bước
1. **Tìm nút tốn nhiều thời gian nhất** (`actual time` chênh lệch lớn giữa cha và con).
2. **So `rows` ước lượng với `rows` thực tế.** Lệch >10 lần ⇒ statistics sai ⇒ `ANALYZE`, tăng `default_statistics_target`, hoặc tạo `CREATE STATISTICS` cho cột tương quan.
3. **Tìm `Rows Removed by Filter` lớn** ⇒ đưa điều kiện đó vào index. → [[Composite Index]]
4. **Tìm `Disk` trong `Sort`/`Hash`** ⇒ tăng `work_mem` (cho session, không phải toàn cục).
5. **Xem `Buffers: read` cao** ⇒ working set không vừa RAM. → [[Storage Engines]]

## 5. Tìm query chậm ở đâu
```sql
-- pg_stat_statements: xếp hạng theo TỔNG thời gian (không phải trung bình)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT calls, round(total_exec_time::numeric,1) AS total_ms,
       round(mean_exec_time::numeric,2) AS mean_ms, rows, query
FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 20;

-- Bắt query chậm vào log
ALTER SYSTEM SET log_min_duration_statement = '500ms';
```
> Query 5ms chạy 1 triệu lần tệ hơn query 2s chạy 10 lần. Luôn xếp hạng theo **tổng** thời gian — đây cũng là cách phát hiện [[N+1 Query Problem]].

## 6. Cạm bẫy hay gặp
1. **Chỉ dùng `EXPLAIN` không `ANALYZE`** ⇒ chỉ thấy ước lượng, không thấy sự thật.
2. **Quên `BUFFERS`** ⇒ không biết I/O thật.
3. **`Seq Scan` không phải lúc nào cũng xấu** — trên bảng nhỏ hoặc khi lấy >20% số dòng, nó **nhanh hơn** index scan.
4. **Đo trên máy dev với 1000 dòng** — plan sẽ khác hoàn toàn so với production.
5. **Cache làm sai lệch phép đo.** Chạy 3 lần, lấy lần ổn định; xem `shared hit` vs `read`.
6. **`SET enable_seqscan = off` để "ép" index** — chỉ dùng để *chẩn đoán* (xem index scan tốn bao nhiêu), không bao giờ để trên production.
7. **Không `ANALYZE` sau khi nạp dữ liệu lớn** ⇒ optimizer mù.
8. **So sánh `cost` giữa hai query khác nhau** — cost chỉ có nghĩa khi so hai plan của **cùng** một query.

## 7. Checklist áp dụng
- [ ] Đã chạy `EXPLAIN (ANALYZE, BUFFERS)` trên dữ liệu giống production chưa?
- [ ] `rows` ước lượng có gần `rows` thực tế không?
- [ ] Có `Rows Removed by Filter` lớn ở đâu không?
- [ ] Có `Sort`/`Hash` tràn ra `Disk` không?
- [ ] Có `Nested Loop` với `loops` rất lớn không?
- [ ] Đã bật `pg_stat_statements` trên production chưa?
- [ ] Đã set `log_min_duration_statement` chưa?
- [ ] Sau khi sửa: đã chạy lại và **ghi lại số đo trước/sau** chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| explain.dalibo.com | Trực quan hoá plan, chỉ ra nút tệ nhất | https://explain.dalibo.com/ |
| explain.depesz.com | Highlight lệch ước lượng | https://explain.depesz.com/ |
| pgMustard | Chấm điểm + gợi ý cụ thể | https://www.pgmustard.com/ |
| `pg_stat_statements` | Xếp hạng query theo tổng thời gian | https://www.postgresql.org/docs/current/pgstatstatements.html |
| `auto_explain` | Tự log plan của query chậm | https://www.postgresql.org/docs/current/auto-explain.html |
| pt-query-digest | Phân tích slow log MySQL | https://docs.percona.com/percona-toolkit/pt-query-digest.html |

## Tham khảo
- PostgreSQL Docs — *Using EXPLAIN*: https://www.postgresql.org/docs/current/using-explain.html
- Use The Index, Luke! — *Execution Plans*: https://use-the-index-luke.com/sql/explain-plan
- Depesz — *Explaining the unexplainable* (loạt bài): https://www.depesz.com/tag/unexplainable/
- MySQL Docs — *EXPLAIN Output Format*: https://dev.mysql.com/doc/refman/8.0/en/explain-output.html
- PostgreSQL Docs — *Planner Statistics*: https://www.postgresql.org/docs/current/planner-stats.html

## Liên kết
[[Query Optimization]] · [[Index Fundamentals]] · [[Composite Index]] · [[Performance Tuning]] · [[Database]]
