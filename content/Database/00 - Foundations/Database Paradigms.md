---
tags: [database, foundation]
status: evergreen
---
# Database Paradigms

> Không có "database tốt nhất", chỉ có database **hợp với hình dạng truy vấn của bạn**. Chọn sai paradigm là loại sai lầm đắt nhất trong thiết kế hệ thống — vì nó chỉ lộ ra khi đã có dữ liệu thật.

![Phân loại database](../0097-dbtypes.png)

## 1. Năm họ database

### Relational Database (RDBMS)
- *Đặc điểm:* Lưu trữ dạng bảng (Tables), hàng (Rows), cột (Columns). Đảm bảo tính toàn vẹn dữ liệu cao với ràng buộc (Foreign Key, Unique).
- *Đại diện:* PostgreSQL, MySQL, MariaDB, SQL Server, Oracle.
- *Dùng cho:* Hệ thống tài chính, ERP, E-commerce (đơn hàng, thanh toán), nơi cần ACID chuẩn xác.
- *Vì sao vẫn thống trị:* schema là hợp đồng được DB **cưỡng chế**, không phải quy ước trong code. Xem [[Keys & Constraints]], [[ACID Properties]].

### Document Database (NoSQL)
- *Đặc điểm:* Lưu trữ dữ liệu linh hoạt dạng JSON/BSON, Schema-less, dễ mở rộng chiều ngang (Horizontal Scaling).
- *Đại diện:* MongoDB, Couchbase.
- *Dùng cho:* CMS, User Profile, Catalog sản phẩm có thuộc tính biến đổi liên tục.
- *Chi tiết:* [[Document Database]].

### Key-Value Store
- *Đặc điểm:* Lưu trữ dạng cặp khóa - giá trị đơn giản, tốc độ đọc/ghi cực nhanh trên RAM.
- *Đại diện:* Redis, Amazon DynamoDB, Memcached.
- *Dùng cho:* Caching, Session Management, Rate Limiting, Leaderboard.
- *Chi tiết:* [[Key-Value Store]], [[Caching Strategies]].

### Column-Family Store
- *Đặc điểm:* Tối ưu hóa lưu trữ và truy vấn theo cột thay vì theo hàng, thích hợp cho ghi dữ liệu lớn (High Write Throughput).
- *Đại diện:* Apache Cassandra, ScyllaDB.
- *Dùng cho:* Time-series data, IoT logging, Messaging apps.
- *Chi tiết:* [[Column-Family Store]].

### Graph Database
- *Đặc điểm:* Lưu trữ dạng Node (thực thể) và Edge (mối quan hệ), tối ưu cho các truy vấn quan hệ phức tạp nhiều tầng.
- *Đại diện:* Neo4j, AWS Neptune.
- *Dùng cho:* Mạng xã hội, Hệ thống gợi ý (Recommendation Engine), Phát hiện gian lận (Fraud Detection).
- *Chi tiết:* [[Graph Database]].

## 2. Bảng so sánh nhanh

| Paradigm | Mô hình dữ liệu | Điểm mạnh | Điểm yếu | Consistency mặc định |
|---|---|---|---|---|
| **Relational** | Bảng có schema cứng | JOIN, transaction, ràng buộc | Scale ghi ngang khó, schema đổi tốn công | ACID mạnh |
| **Document** | Cây JSON lồng nhau | Đọc nguyên "aggregate" 1 lần, schema mềm | JOIN yếu, dễ trùng lặp dữ liệu | Tuỳ chỉnh (Mongo hỗ trợ ACID đa document) |
| **Key-Value** | `key → blob` | Nhanh nhất, đơn giản nhất | Không query theo giá trị | Thường không bền vững |
| **Column-Family** | `partition key → nhiều cột` | Ghi cực lớn, phân tán tự nhiên | Query phải biết trước, không JOIN | Eventual (tuning được) |
| **Graph** | Node + Edge | Traversal nhiều tầng rẻ | Scale ngang khó, ecosystem nhỏ | ACID (Neo4j) |

## 3. Các họ chuyên biệt hay bị bỏ sót
| Họ | Bài toán | Đại diện |
|---|---|---|
| **Time-series** | Metric, IoT, giá cổ phiếu — ghi nhiều, đọc theo khoảng thời gian | TimescaleDB, InfluxDB, Prometheus → [[Time-series Database]] |
| **Vector** | Tìm kiếm ngữ nghĩa, RAG, similarity | pgvector, Qdrant, Milvus → [[Vector Database]] |
| **Search engine** | Full-text, ranking, facet | Elasticsearch, OpenSearch, Meilisearch |
| **Wide-column analytics (OLAP)** | Aggregation trên tỉ dòng | ClickHouse, DuckDB, BigQuery → [[OLTP vs OLAP]] |
| **Object / Blob store** | File, ảnh, video | S3, MinIO |

## 4. Cạm bẫy hay gặp
1. **Chọn NoSQL vì "scale tốt hơn"** khi hệ thống chưa bao giờ chạm giới hạn của một Postgres đơn. Một instance Postgres hiện đại xử lý được hàng chục nghìn TPS.
2. **Chọn Document DB vì "không phải thiết kế schema"**. Schema không biến mất — nó chỉ chuyển từ DB sang code, nơi không ai cưỡng chế nó.
3. **Dùng Redis làm nguồn chân lý (source of truth)**. Redis là cache/state tạm; mất dữ liệu là hành vi bình thường, không phải bug.
4. **Dùng Cassandra như RDBMS**. Cassandra bắt bạn *thiết kế bảng từ query*, không phải từ entity. Sai điều này là sai toàn bộ.
5. **Polyglot persistence quá sớm** — 5 database cho 1 sản phẩm chưa có người dùng nghĩa là 5 hệ thống backup, monitoring, và on-call.
6. **Quên rằng PostgreSQL là "đa năng"**: JSONB (document), hstore (key-value), pgvector (vector), TimescaleDB (time-series), full-text search. Rất nhiều nhu cầu "cần NoSQL" thực ra chỉ cần thêm một extension.

## 5. Checklist áp dụng
- [ ] Tôi đã viết ra **5 query quan trọng nhất** của hệ thống chưa? (Chọn DB là chọn theo query, không theo entity.)
- [ ] Dữ liệu này có cần transaction đa bản ghi không?
- [ ] Tỉ lệ đọc/ghi ước tính là bao nhiêu? Đọc theo point-lookup hay theo range?
- [ ] Quy mô dữ liệu sau 2 năm: GB, TB hay PB?
- [ ] Mất 1 giây dữ liệu gần nhất có chấp nhận được không? (→ [[BASE & Eventual Consistency]])
- [ ] Team đã vận hành DB này trong production bao giờ chưa? Ai on-call lúc 3h sáng?
- [ ] PostgreSQL + một extension có giải quyết được không, trước khi thêm một hệ mới?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| DB-Engines Ranking | Xếp hạng độ phổ biến theo họ DB | https://db-engines.com/en/ranking |
| PostgreSQL | RDBMS đa năng, extension phong phú | https://www.postgresql.org/ |
| MongoDB | Document DB phổ biến nhất | https://www.mongodb.com/docs/ |
| Redis | Key-value trên RAM | https://redis.io/docs/latest/ |
| Apache Cassandra | Column-family phân tán | https://cassandra.apache.org/doc/ |
| Neo4j | Graph DB + ngôn ngữ Cypher | https://neo4j.com/docs/ |

## Tham khảo
- Martin Kleppmann — *Designing Data-Intensive Applications*, ch.2 "Data Models and Query Languages": https://dataintensive.net/
- CMU 15-445 — *Database Systems* lecture 1: https://15445.courses.cs.cmu.edu/
- AWS — *Types of Databases*: https://aws.amazon.com/products/databases/
- MongoDB — *NoSQL vs SQL Databases*: https://www.mongodb.com/resources/basics/databases/nosql-explained
- Alex Petrov — *Database Internals*, part I: https://www.databass.dev/

## Liên kết
[[Database Selection Guide]] · [[Relational Model]] · [[Storage Engines]] · [[CAP Theorem]] · [[Database]]
