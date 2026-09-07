---
tags: [database, moc]
type: MOC
updated: 2026-08-27
---
# 🗄️ Database — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của toàn bộ khu vực Database. Mỗi mục con là một note độc lập, có **Checklist áp dụng** và phần **Tham khảo** riêng.
>
> Góc nhìn xuyên suốt vault này: **Database Architect + DBA**. Mọi quyết định đều quy về ba trục — *Performance*, *Data Integrity*, *Scalability*.

## Góc nhìn gốc (giữ nguyên từ seed)

> **Role:** BẠN LÀ CHUYÊN GIA DATABASE ARCHITECT VÀ DATABASE ADMINISTRATOR (DBA).
> **Task:** Hãy sử dụng "Database Knowledge Seed" bên dưới để giải thích khái niệm, thiết kế Data Model (ERD/Schema), viết truy vấn tối ưu (SQL/NoSQL query), hướng dẫn đánh Index/Tuning performance, hoặc so sánh các giải pháp lưu trữ theo yêu cầu của tôi.
> **Tone:** Ngắn gọn, chuẩn xác kỹ thuật, tập trung vào hiệu năng (Performance), tính toàn vẹn dữ liệu (Data Integrity) và khả năng mở rộng (Scalability).

Dùng khối này làm prompt khi cần một AI trả lời trong đúng khung tư duy của vault.

## Cách dùng vault này
- **Học từ đầu** → theo [[Database Learning Roadmap]].
- **Chọn database cho dự án mới** → [[Database Selection Guide]].
- **Query chậm** → [[Execution Plan & EXPLAIN]] → [[Query Optimization]] → [[Index Fundamentals]].
- **Hệ thống sắp quá tải** → [[Replication]] → [[Caching Strategies]] → [[Sharding & Partitioning]].
- Mỗi note có 3 tầng: **Khái niệm → Nguyên tắc → Cạm bẫy → Checklist**. Học được điều mới thì thêm vào đúng tầng, đừng tạo note mới.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Tiếng Việt cho giải thích, **giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu và đồng nghiệp đều dùng tiếng Anh.

---

## 00 — Nền tảng
- [[Database Paradigms]] — 5 họ database, đặc điểm và khi nào dùng
- [[Relational Model]] — relation, tuple, key, relational algebra
- [[Storage Engines]] — B-Tree vs LSM-Tree, row vs column store, WAL, buffer pool
- [[Database Selection Guide]] — khung quyết định chọn DB cho một bài toán cụ thể
- [[Database Learning Roadmap]] — lộ trình từ 0 đến thiết kế được hệ thống

## 01 — Thiết kế dữ liệu (Data Modeling)
- [[ERD & Data Modeling]] — conceptual → logical → physical, ký hiệu crow's foot
- [[Normalization]] — 1NF → BCNF, vì sao chuẩn hoá
- [[Denormalization]] — khi nào cố tình phá chuẩn và cái giá phải trả
- [[Keys & Constraints]] — PK, FK, unique, check, và chọn kiểu dữ liệu đúng
- [[Schema Design Patterns]] — soft delete, audit log, EAV, polymorphic, temporal

## 02 — SQL
- [[SQL Fundamentals]] — DDL/DML/DQL/DCL/TCL, thứ tự thực thi logic
- [[Joins]] — inner/left/right/full/cross/self, semi & anti join
- [[Aggregation & Window Functions]] — GROUP BY, HAVING, OVER(), ranking
- [[Subquery & CTE]] — correlated subquery, WITH, recursive CTE
- [[Views & Materialized Views]] — trừu tượng hoá vs cache kết quả
- [[Stored Procedure & Trigger]] — logic trong DB: khi nào nên, khi nào tránh

## 03 — Transaction & Concurrency
- [[ACID Properties]] — Atomicity, Consistency, Isolation, Durability
- [[Isolation Levels]] — 4 mức và 4 anomaly tương ứng
- [[Locking & MVCC]] — pessimistic vs optimistic, snapshot isolation
- [[Deadlock]] — cơ chế sinh, cách phát hiện và phòng tránh
- [[Distributed Transactions]] — 2PC, Saga, idempotency

## 04 — Index & Hiệu năng
- [[Index Fundamentals]] — B-Tree, Hash, GIN, GiST, BRIN, partial, covering
- [[Composite Index]] — Leftmost Prefix Rule, thứ tự cột, ESR
- [[Execution Plan & EXPLAIN]] — đọc plan, nhận diện Seq Scan, ước lượng sai
- [[Query Optimization]] — viết lại query, tránh index invalidation
- [[N+1 Query Problem]] — nguồn gốc từ ORM và cách chữa
- [[Performance Tuning]] — quy trình tuning theo tầng, vacuum, statistics, config

## 05 — Mở rộng & Tính sẵn sàng cao
- [[CAP Theorem]] — và vì sao PACELC mới là câu hỏi thật
- [[BASE & Eventual Consistency]] — mô hình nhất quán mềm của NoSQL
- [[Replication]] — primary-replica, multi-primary, sync vs async, replication lag
- [[Sharding & Partitioning]] — vertical, horizontal, chọn shard key
- [[Connection Pooling]] — PgBouncer, HikariCP, sizing pool
- [[Caching Strategies]] — cache-aside, write-through, invalidation, stampede
- [[High Availability & Failover]] — RPO/RTO, quorum, split-brain

## 06 — NoSQL
- [[Document Database]] — MongoDB: embed vs reference, aggregation pipeline
- [[Key-Value Store]] — Redis: data structure, eviction, persistence
- [[Column-Family Store]] — Cassandra: partition key, query-first modeling
- [[Graph Database]] — Neo4j: node/edge, Cypher, traversal
- [[Time-series Database]] — TimescaleDB, InfluxDB, downsampling, retention
- [[Vector Database]] — embedding, ANN index, pgvector

## 07 — Vận hành (DBA)
- [[Backup & Recovery]] — full/incremental/PITR, và quy tắc 3-2-1
- [[Monitoring & Capacity Planning]] — golden signals của DB, bloat, growth
- [[Database Security]] — least privilege, encryption, SQL injection, PII
- [[Zero-downtime Migration]] — expand-contract, backfill, dual write

## 08 — Kiến trúc dữ liệu
- [[OLTP vs OLAP]] — hai thế giới workload khác nhau
- [[Data Warehouse & Lakehouse]] — star schema, Snowflake, Iceberg
- [[ETL & ELT]] — pipeline dữ liệu và vì sao ELT thắng thế
- [[Change Data Capture]] — Debezium, log-based CDC, Outbox Pattern
- [[Event Sourcing & CQRS]] — sự kiện là nguồn chân lý, tách read/write model

## 09 — Công cụ & Hệ sinh thái
- [[PostgreSQL]] — extension, MVCC, vacuum, cấu hình cốt lõi
- [[MySQL]] — InnoDB, clustered index, khác biệt với Postgres
- [[Database Tooling]] — ORM, migration tool, GUI client, benchmark

---

## Nguồn học nền tảng (dùng chung cho cả area)

| Nguồn | Loại | Link |
|---|---|---|
| *Designing Data-Intensive Applications* — Martin Kleppmann | Sách nền tảng số 1 | https://dataintensive.net/ |
| *Database Internals* — Alex Petrov | Sách, cơ chế bên trong storage engine | https://www.databass.dev/ |
| *SQL Performance Explained* — Markus Winand | Sách/web về index | https://use-the-index-luke.com/ |
| PostgreSQL Documentation | Tài liệu chuẩn, chất lượng cao | https://www.postgresql.org/docs/current/ |
| MySQL Reference Manual | Tài liệu chuẩn | https://dev.mysql.com/doc/refman/8.0/en/ |
| CMU 15-445 Database Systems | Khoá học đại học, free video | https://15445.courses.cs.cmu.edu/ |
| Jepsen — kiểm chứng consistency thực tế | Báo cáo phân tán | https://jepsen.io/analyses |
| Use The Index, Luke! | Web, index & query tuning | https://use-the-index-luke.com/ |
| Modern SQL | Web, SQL chuẩn & tính năng mới | https://modern-sql.com/ |

---

## Ghi chú
- Seed gốc lưu tại `_archive-seed/SEEDS.md` — dùng để đối chiếu, **không sửa**.
- Ảnh `0097-dbtypes.png` (sơ đồ phân loại DB) tham chiếu trong [[Database Paradigms]].
- Playbook tạo ra vault này: [[Knowledge Seed Playbook]].
