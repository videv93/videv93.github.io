---
tags: [database, foundation, roadmap]
status: evergreen
---
# Database Learning Roadmap

> Lộ trình đi từ "viết được SELECT" tới "thiết kế và vận hành được hệ dữ liệu production". Mỗi chặng có **tiêu chí hoàn thành đo được** — không phải "đã đọc xong".

## Chặng 0 — Nền (1–2 tuần)
- [[Database Paradigms]], [[Relational Model]]
- ✅ *Xong khi:* giải thích được vì sao `WHERE x = NULL` không bao giờ khớp, và kể được 3 điểm mạnh/yếu của mỗi họ DB.

## Chặng 1 — SQL thành thạo (3–4 tuần)
- [[SQL Fundamentals]] → [[Joins]] → [[Aggregation & Window Functions]] → [[Subquery & CTE]]
- ✅ *Xong khi:* viết được query "top 3 sản phẩm bán chạy nhất mỗi danh mục mỗi tháng" bằng window function, không cần tra Google.

## Chặng 2 — Thiết kế schema (2–3 tuần)
- [[ERD & Data Modeling]] → [[Normalization]] → [[Keys & Constraints]] → [[Denormalization]] → [[Schema Design Patterns]]
- ✅ *Xong khi:* thiết kế được schema cho một e-commerce nhỏ ở 3NF và bảo vệ được từng quyết định phá chuẩn.

## Chặng 3 — Transaction (2 tuần)
- [[ACID Properties]] → [[Isolation Levels]] → [[Locking & MVCC]] → [[Deadlock]]
- ✅ *Xong khi:* tái hiện được lost update ở `READ COMMITTED` bằng hai session, rồi chữa nó bằng `SELECT ... FOR UPDATE`.

## Chặng 4 — Hiệu năng (3–4 tuần) — **chặng đổi đời**
- [[Index Fundamentals]] → [[Composite Index]] → [[Execution Plan & EXPLAIN]] → [[Query Optimization]] → [[N+1 Query Problem]] → [[Performance Tuning]]
- ✅ *Xong khi:* lấy một query chậm thật, đọc `EXPLAIN ANALYZE`, thêm đúng một index và giảm thời gian ≥10 lần — **và giải thích được vì sao**.

## Chặng 5 — Quy mô (3–4 tuần)
- [[CAP Theorem]] → [[Replication]] → [[Connection Pooling]] → [[Caching Strategies]] → [[Sharding & Partitioning]] → [[High Availability & Failover]]
- ✅ *Xong khi:* dựng được primary + replica trên máy local, đo được replication lag, và mô tả được điều gì xảy ra khi primary chết.

## Chặng 6 — Vận hành (2–3 tuần)
- [[Backup & Recovery]] → [[Monitoring & Capacity Planning]] → [[Database Security]] → [[Zero-downtime Migration]]
- ✅ *Xong khi:* **restore thành công** một backup vào thời điểm bất kỳ (PITR) trên môi trường sạch. Backup chưa restore thử = chưa có backup.

## Chặng 7 — Mở rộng chiều ngang kiến thức (liên tục)
- NoSQL: [[Document Database]], [[Key-Value Store]], [[Column-Family Store]], [[Graph Database]]
- Kiến trúc dữ liệu: [[OLTP vs OLAP]], [[ETL & ELT]], [[Change Data Capture]], [[Event Sourcing & CQRS]]
- ✅ *Xong khi:* chọn được DB cho một bài toán mới bằng [[Database Selection Guide]] và bảo vệ được lựa chọn đó.

## Nguyên tắc học
1. **Luôn có dữ liệu thật.** Tải một dataset ≥10 triệu dòng — mọi bài học về index chỉ hiện ra ở quy mô.
2. **Đo trước khi tin.** Mọi phát biểu về hiệu năng phải kèm `EXPLAIN ANALYZE`.
3. **Một DB cho sâu, phần còn lại cho rộng.** Chọn PostgreSQL làm DB "mẹ đẻ".
4. **Đọc Kleppmann chậm.** *DDIA* không phải sách đọc một lần.
5. **Phá thứ gì đó.** Kill -9 primary lúc đang ghi, xem chuyện gì xảy ra.

## Checklist áp dụng
- [ ] Tôi đang ở chặng nào, và tiêu chí hoàn thành của chặng đó tôi đã đạt chưa?
- [ ] Có dataset ≥10 triệu dòng để thử nghiệm chưa?
- [ ] Đã dựng được môi trường local (Docker) với Postgres + replica chưa?
- [ ] Mỗi tuần có ít nhất một query thật được tôi tối ưu và ghi lại không?

## Tham khảo
| Tên | Loại | Link |
|---|---|---|
| *Designing Data-Intensive Applications* | Sách | https://dataintensive.net/ |
| *Database Internals* | Sách | https://www.databass.dev/ |
| Use The Index, Luke! | Web | https://use-the-index-luke.com/ |
| CMU 15-445 (Intro) / 15-721 (Advanced) | Khoá học free | https://15445.courses.cs.cmu.edu/ |
| PostgreSQL Exercises | Bài tập SQL | https://pgexercises.com/ |
| Modern SQL | Web | https://modern-sql.com/ |
| Postgres Weekly | Newsletter | https://postgresweekly.com/ |

## Liên kết
[[Database Paradigms]] · [[Database Selection Guide]] · [[Knowledge Seed Playbook]] · [[Database]]
