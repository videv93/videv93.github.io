---
tags: [backend, database, search]
status: growing
---
# Search Engines

> Khi nào rời khỏi `LIKE '%keyword%'`: khi người dùng mong đợi **liên quan** (relevance) chứ không phải **khớp** (match) — gõ sai chính tả vẫn ra, từ gần nghĩa vẫn ra, kết quả tốt nhất lên đầu, và có facet để lọc.

## 1. Ba lựa chọn theo mức độ nhu cầu
| Nhu cầu | Giải pháp | Ghi chú |
|---|---|---|
| Tìm chính xác, dữ liệu nhỏ | Index B-tree + `ILIKE 'prefix%'` | Rẻ nhất, đủ dùng lâu hơn bạn nghĩ → [[Database Access and ORM]] |
| Full-text vừa phải, cùng một DB | **Postgres FTS** (`tsvector`, GIN index), `pg_trgm` cho fuzzy | Không phải vận hành thêm hạ tầng; không có transaction lag |
| Full-text quy mô lớn, relevance, facet, phân tích | **Elasticsearch / OpenSearch / Solr** | Thêm một hệ thống phải đồng bộ và vận hành |
| Tìm theo ngữ nghĩa (embedding) | pgvector, Qdrant, Elasticsearch kNN | Thường **kết hợp** với BM25 (hybrid search) |

**Nguyên tắc: đừng thêm search engine khi Postgres FTS còn chưa đủ.** Cái giá thật là đồng bộ dữ liệu, không phải cài đặt.

## 2. Khái niệm cốt lõi (chung cho Solr/Elasticsearch — cả hai đều trên Lucene)
| Khái niệm | Nghĩa |
|---|---|
| **Inverted index** | Từ → danh sách document chứa từ đó. Đây là lý do tìm nhanh |
| **Analyzer** | Chuỗi xử lý text lúc index và lúc query: tokenizer → filter (lowercase, stop word, stemming, ASCII folding) |
| **Field type** | Quyết định text được phân tích thế nào; `text` (phân tích) vs `keyword`/`string` (khớp nguyên vẹn) |
| **Relevance (BM25)** | Điểm xếp hạng dựa trên tần suất từ và độ hiếm của từ |
| **Facet / Aggregation** | Đếm theo nhóm để làm bộ lọc ("Áo (24), Quần (11)") |
| **Shard / Replica** | Chia nhỏ để scale ghi; nhân bản để scale đọc và chịu lỗi |

> **Analyzer lúc index và lúc query phải tương thích.** Đây là lý do phải chuẩn hoá (ví dụ lowercase) ở cả hai phía — chi tiết minh hoạ: → [[Apache Solr 8 - Schemaless Mode]]

Với tiếng Việt: quan tâm ASCII folding (bỏ dấu), tách từ ghép, và stop word riêng — mặc định của engine không xử lý tốt.

## 3. Đồng bộ dữ liệu — phần khó thật sự
| Cách                        | Ưu                      | Nhược                                                 |
| --------------------------- | ----------------------- | ----------------------------------------------------- |
| Ghi đồng bộ khi ghi DB      | Đơn giản                | Search chết → ghi DB chết; dễ lệch khi lỗi giữa chừng |
| **Đẩy qua hàng đợi/outbox** | Tách rời, retry được    | Eventual consistency → [[Event-Driven Architecture]]  |
| **CDC** (Debezium)          | Không đụng vào code ghi | Hạ tầng phức tạp hơn → [[Data Sourcing Design]]       |
| Reindex định kỳ theo batch  | Đơn giản, tự sửa lệch   | Trễ; tốn tài nguyên                                   |

Luôn giữ khả năng **reindex toàn bộ từ nguồn sự thật (DB)** — search index phải là dữ liệu *dẫn xuất*, có thể vứt đi và dựng lại.

## 4. Cạm bẫy
- **Coi search engine là nguồn sự thật** — nó không có transaction; mất dữ liệu là mất thật.
- **Dùng schemaless ở production** — kiểu field bị đoán sai (số điện thoại thành số, ngày thành text) và **không đổi được kiểu nếu không reindex**.
- **Quên analyzer** → người dùng gõ "Solr" không tìm ra "SOLR".
- **Query bằng `match` trên field `keyword`** (hoặc ngược lại) → im lặng không ra kết quả.
- **Deep pagination** (`from=10000`) — cực đắt; dùng `search_after`/cursor. → [[REST API Design]]
- **Đo relevance bằng cảm tính** — cần bộ truy vấn mẫu + đánh giá, nếu không mọi thay đổi analyzer đều là đánh bạc.
- **Không giới hạn tài nguyên query** — một truy vấn wildcard `*abc*` có thể ăn hết cluster.
- **Cluster không có backup/snapshot** vì "dựng lại được" — cho tới khi reindex mất 12 tiếng lúc đang sự cố.

## 5. Checklist trước khi đưa search lên production
- [ ] Postgres FTS đã thật sự không đủ chưa? (viết ra lý do cụ thể)
- [ ] **Schema được định nghĩa tường minh**, không dựa vào tự nhận diện field?
- [ ] Analyzer index/query đã thống nhất và test với dữ liệu tiếng Việt có dấu/không dấu?
- [ ] Có đường **reindex toàn bộ** từ DB và đã bấm giờ nó chưa?
- [ ] Đồng bộ có retry + DLQ khi index fail không? → [[Background Jobs and Queues]]
- [ ] Search chết thì trang còn dùng được (degrade) không? → [[Resilience Patterns]]
- [ ] Có bộ truy vấn mẫu để kiểm tra relevance sau mỗi thay đổi không?
- [ ] Có giới hạn `size`, timeout truy vấn, và chặn deep pagination?
- [ ] Có metric: độ trễ index (lag), tỉ lệ truy vấn 0 kết quả? → [[Observability]]

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Apache Solr | Lucene, cấu hình XML, mạnh về facet | https://solr.apache.org/ |
| Elasticsearch / OpenSearch | Lucene, JSON API, hệ sinh thái lớn | https://opensearch.org/ |
| Postgres FTS | Không thêm hạ tầng | https://www.postgresql.org/docs/current/textsearch.html |
| Meilisearch / Typesense | Nhẹ, typo-tolerant, dựng nhanh | https://www.meilisearch.com/ |
| pgvector | Tìm kiếm ngữ nghĩa trong Postgres | https://github.com/pgvector/pgvector |

## Tham khảo
- Apache Solr Reference Guide: https://solr.apache.org/guide/
- Elasticsearch — Text analysis: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html
- PostgreSQL — Full Text Search: https://www.postgresql.org/docs/current/textsearch.html
- Lucene — BM25 similarity: https://lucene.apache.org/core/documentation.html
- *Relevant Search* — Doug Turnbull & John Berryman (Manning)

## Liên kết
[[Apache Solr 8 - Schemaless Mode]] · [[Database Access and ORM]] · [[Caching Strategies]] · [[Backend]]
