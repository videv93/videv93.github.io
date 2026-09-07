---
tags: [database, foundation, decision]
status: evergreen
---
# Database Selection Guide

> Khung quyết định để trả lời "dùng DB nào" bằng **bằng chứng**, không bằng thị hiếu. Nguyên tắc chủ đạo: **mặc định là PostgreSQL; mọi lựa chọn khác phải tự biện minh.**

## 1. Quy trình 5 câu hỏi (theo thứ tự)

| # | Câu hỏi | Nếu trả lời là… | Thì nghiêng về |
|---|---|---|---|
| 1 | **5 query quan trọng nhất là gì?** | JOIN nhiều bảng, filter linh hoạt | Relational |
| | | Luôn lấy theo 1 khoá duy nhất | Key-Value / Document |
| | | Aggregation trên hàng trăm triệu dòng | OLAP column store |
| | | Đi sâu ≥3 tầng quan hệ | Graph |
| 2 | **Cần transaction đa bản ghi không?** | Có, tiền/tồn kho/đặt chỗ | Relational (ACID) |
| | | Không, mỗi ghi độc lập | NoSQL đều được |
| 3 | **Quy mô sau 24 tháng?** | < 1 TB, < 10k TPS | Một Postgres là đủ |
| | | > 10 TB ghi liên tục | Sharding hoặc Column-Family |
| 4 | **Mô hình nhất quán chấp nhận được?** | Phải đọc thấy ngay sau khi ghi | Strong consistency |
| | | Trễ vài trăm ms là ổn | Eventual → [[BASE & Eventual Consistency]] |
| 5 | **Ai vận hành nó?** | Team chưa từng chạy DB đó production | Chọn cái team biết, hoặc managed service |

## 2. Bảng tra nhanh theo bài toán

| Bài toán | Lựa chọn mặc định | Ghi chú |
|---|---|---|
| CRUD nghiệp vụ, e-commerce, SaaS | PostgreSQL | 90% trường hợp dừng ở đây |
| Cache, session, rate limit, leaderboard | Redis | → [[Key-Value Store]] |
| Catalog thuộc tính biến đổi | Postgres + JSONB, hoặc MongoDB | JSONB đủ dùng nếu đã có Postgres |
| Full-text search, facet, ranking | Elasticsearch / Meilisearch | Postgres FTS đủ cho <1M docs |
| Metric, IoT, log có timestamp | TimescaleDB / ClickHouse | → [[Time-series Database]] |
| Báo cáo, BI, aggregation lớn | ClickHouse / DuckDB / warehouse | → [[Data Warehouse & Lakehouse]] |
| Ghi hàng trăm nghìn/giây, đa vùng | Cassandra / ScyllaDB | → [[Column-Family Store]] |
| Mạng lưới quan hệ, fraud, gợi ý | Neo4j | → [[Graph Database]] |
| Semantic search / RAG | pgvector / Qdrant | → [[Vector Database]] |
| Queue / job | Postgres (`SKIP LOCKED`) hoặc SQS/Kafka | Đừng vội thêm broker |

## 3. Ma trận đánh đổi cần nói thành lời
Với mỗi ứng viên, viết ra một câu cho từng dòng — nếu không viết được thì chưa hiểu đủ để chọn:
1. Nó **hy sinh** cái gì để nhanh ở điểm ta cần? (→ [[CAP Theorem]])
2. Query nào nó làm **tệ**?
3. Thao tác schema/migration tốn bao lâu ở quy mô của ta? (→ [[Zero-downtime Migration]])
4. Backup/restore mất bao lâu? (→ [[Backup & Recovery]])
5. Chi phí licence + hạ tầng + **thời gian người** trong 1 năm?
6. Nếu chọn sai, di cư khỏi nó tốn gì?

## 4. Cạm bẫy hay gặp
1. **Chọn theo benchmark của nhà cung cấp.** Benchmark duy nhất đáng tin là benchmark trên dữ liệu và query của bạn.
2. **Chọn theo bài blog của một công ty gấp 1000 lần quy mô của bạn.** Vấn đề của Uber không phải vấn đề của bạn.
3. **"Resume-driven development"** — chọn công nghệ vì muốn học nó, rồi để cả team gánh vận hành.
4. **Bỏ qua chi phí vận hành.** DB thứ hai = thêm backup, monitoring, alert, upgrade, và một loại sự cố mới.
5. **Quyết định sớm khi chưa có query.** Nếu chưa biết truy vấn gì, dùng Postgres — nó cho phép đổi ý lâu nhất.

## 5. Checklist áp dụng
- [ ] Đã viết ra 5 query quan trọng nhất chưa?
- [ ] Đã ước lượng dung lượng và TPS sau 24 tháng chưa?
- [ ] Đã thử prototype trên **dữ liệu thật (hoặc sinh giống thật)**, không phải 1000 dòng mẫu?
- [ ] Đã trả lời được "PostgreSQL không làm được điều gì ở đây"?
- [ ] Có managed service không, và giá bao nhiêu?
- [ ] Đã ghi lại quyết định dưới dạng ADR (Architecture Decision Record) chưa?

## Tham khảo
- Kleppmann — *DDIA*, ch.1–2: https://dataintensive.net/
- AWS — *Purpose-built databases*: https://aws.amazon.com/products/databases/
- "Just use Postgres" — Stephan Schmidt: https://www.amazingcto.com/postgres-for-everything/
- DB-Engines Ranking: https://db-engines.com/en/ranking
- Jepsen — kiểm chứng consistency thực tế của từng DB: https://jepsen.io/analyses

## Liên kết
[[Database Paradigms]] · [[CAP Theorem]] · [[OLTP vs OLAP]] · [[Database Learning Roadmap]] · [[Database]]
