---
tags: [database, architecture, streaming]
status: growing
---
# Change Data Capture

> Bắt **mọi thay đổi** trong database và phát ra dưới dạng dòng sự kiện. Điểm mạnh quyết định: đọc từ **transaction log**, nên nó không tải thêm lên nguồn và không bỏ sót thay đổi nào — kể cả `DELETE` và kể cả ghi từ đường không đi qua ứng dụng.

## 1. Các cách bắt thay đổi
| Cách | Cơ chế | Đánh giá |
|---|---|---|
| **Query-based** | Poll `WHERE updated_at > x` | Đơn giản; **bỏ sót DELETE**, tải lên nguồn, độ trễ = chu kỳ poll |
| **Trigger-based** | Trigger ghi vào bảng audit | Bắt đủ; làm chậm mọi ghi → [[Stored Procedure & Trigger]] |
| **Log-based** | Đọc WAL (Postgres) / binlog (MySQL) | ✅ **Chuẩn mực**: đầy đủ, độ trễ thấp, gần như không tải nguồn |

## 2. Log-based CDC trong PostgreSQL
```sql
ALTER SYSTEM SET wal_level = logical;   -- cần restart

-- REPLICA IDENTITY quyết định "ảnh dòng cũ" có gì trong sự kiện UPDATE/DELETE
ALTER TABLE "order" REPLICA IDENTITY FULL;   -- toàn bộ cột cũ (tốn WAL hơn)
-- mặc định là DEFAULT: chỉ có primary key

CREATE PUBLICATION cdc_pub FOR TABLE "order", order_item;
```
Debezium (hoặc công cụ tương đương) đọc slot logical replication và publish sang Kafka/Kinesis/Pulsar.

⚠️ **Replication slot bị tồn đọng sẽ giữ WAL vô hạn và làm đầy đĩa primary.** Đây là cách phổ biến nhất để CDC giết database nguồn. Luôn monitor `pg_replication_slots.confirmed_flush_lsn` và set `max_slot_wal_keep_size`. → [[Replication]]

## 3. Outbox Pattern — CDC cho sự kiện nghiệp vụ
Vấn đề: sự kiện thô từ CDC phản ánh **thay đổi bảng**, không phải **ý định nghiệp vụ**. "`status` đổi từ `pending` sang `cancelled`" không nói được *vì sao*.

```sql
BEGIN;
  UPDATE "order" SET status = 'cancelled' WHERE id = 42;
  INSERT INTO outbox (aggregate_type, aggregate_id, event_type, payload)
       VALUES ('Order', 42, 'OrderCancelledByCustomer',
               '{"reason":"changed_mind","by":7}'::jsonb);
COMMIT;
-- CDC đọc bảng outbox → publish sự kiện có ngữ nghĩa nghiệp vụ
```
✅ Nguyên tố với thay đổi dữ liệu (cùng transaction) **và** mang đúng ngữ nghĩa. Đây là lời giải cho bài toán dual write. → [[Distributed Transactions]]

## 4. Ứng dụng
| Bài toán | Vai trò của CDC |
|---|---|
| Đồng bộ warehouse gần thời gian thực | Thay poll bằng stream → [[ETL & ELT]] |
| Cập nhật search index (Elasticsearch) | Không cần dual write |
| Invalidate cache chính xác | → [[Caching Strategies]] |
| Migrate database không downtime | Chạy song song hai hệ, đối soát rồi cắt |
| Audit trail đầy đủ | → [[Schema Design Patterns]] |
| Tách microservice khỏi monolith | Strangler fig pattern |
| Nuôi read model | → [[Event Sourcing & CQRS]] |

## 5. Cạm bẫy hay gặp
1. **Replication slot tồn đọng làm đầy đĩa primary.** Cạm bẫy nghiêm trọng nhất.
2. **At-least-once delivery** ⇒ consumer **phải** idempotent. Sự kiện sẽ bị lặp.
3. **Thứ tự chỉ được đảm bảo trong một partition.** Partition theo `aggregate_id` để giữ đúng thứ tự cho từng thực thể.
4. **Coupling schema**: consumer phụ thuộc vào cấu trúc bảng nguồn ⇒ đổi schema là phá downstream. Outbox giải quyết điều này.
5. **Schema evolution** — dùng schema registry (Avro/Protobuf) và quy tắc tương thích.
6. **`REPLICA IDENTITY DEFAULT`** ⇒ sự kiện `DELETE`/`UPDATE` chỉ có PK, thiếu giá trị cũ mà consumer cần.
7. **Snapshot ban đầu** của bảng lớn có thể mất hàng giờ và tạo tải lớn — lên kế hoạch, dùng incremental snapshot.
8. **Không monitor CDC lag** ⇒ downstream lệch mà không ai biết.
9. **Dữ liệu nhạy cảm chảy vào stream** không kiểm soát ⇒ mở rộng bề mặt rò rỉ. → [[Database Security]]

## 6. Checklist áp dụng
- [ ] `wal_level = logical` (hoặc binlog `ROW`) đã bật chưa?
- [ ] Có monitor + alert cho replication slot lag và dung lượng WAL chưa?
- [ ] `max_slot_wal_keep_size` đã set chưa?
- [ ] `REPLICA IDENTITY` có đủ cho nhu cầu của consumer không?
- [ ] Mọi consumer đã idempotent chưa?
- [ ] Cần thứ tự theo thực thể — đã partition theo `aggregate_id` chưa?
- [ ] Dùng sự kiện thô hay Outbox? Consumer có bị coupling với schema bảng không?
- [ ] Có schema registry và quy tắc tương thích chưa?
- [ ] Kế hoạch snapshot ban đầu cho bảng lớn là gì?
- [ ] Có dead-letter queue cho sự kiện xử lý lỗi không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Debezium | CDC log-based cho Postgres/MySQL/Mongo/Oracle | https://debezium.io/documentation/ |
| Kafka Connect | Nền tảng chạy connector | https://kafka.apache.org/documentation/#connect |
| Airbyte | EL có chế độ CDC | https://docs.airbyte.com/ |
| wal2json / pgoutput | Output plugin cho logical decoding | https://github.com/eulerto/wal2json |
| Materialize / RisingWave | Streaming SQL trên CDC | https://materialize.com/docs/ |

## Tham khảo
- Debezium Docs — *PostgreSQL Connector*: https://debezium.io/documentation/reference/stable/connectors/postgresql.html
- Debezium — *Outbox Event Router*: https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
- PostgreSQL Docs — *Logical Decoding*: https://www.postgresql.org/docs/current/logicaldecoding.html
- Martin Kleppmann — *Turning the database inside-out*: https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/
- Chris Richardson — *Transactional Outbox*: https://microservices.io/patterns/data/transactional-outbox.html

## Liên kết
[[Distributed Transactions]] · [[ETL & ELT]] · [[Event Sourcing & CQRS]] · [[Replication]] · [[Caching Strategies]] · [[Database]]
