---
tags: [database, scaling]
status: evergreen
---
# Sharding & Partitioning

> **Phân mảnh dữ liệu.** Partitioning chia dữ liệu *trong một database*; sharding chia ra *nhiều database/server vật lý*. Đây là công cụ cuối cùng trong hộp đồ nghề mở rộng — vì nó là công cụ **khó đảo ngược nhất**.

## 1. Hai kiểu chia (từ seed, mở rộng)

### `Vertical Partitioning`
Tách bảng ra theo **nhóm cột** (ví dụ: tách cột chứa text lớn/BLOB ra bảng riêng).
- Lợi: bảng chính gọn hơn ⇒ nhiều dòng hơn mỗi page ⇒ quét nhanh hơn.
- Postgres đã tự làm một phần điều này qua TOAST. → [[Storage Engines]]

### `Horizontal Partitioning / Sharding`
Chia dữ liệu theo **hàng** dựa trên **Shard Key** (ví dụ: chia user theo `user_id % N` hoặc theo Region) để phân tán ra nhiều server vật lý.

| Chiến lược | Cơ chế | Ưu | Nhược |
|---|---|---|---|
| **Range** | `created_at` theo tháng, `id` theo khoảng | Range scan hiệu quả, dễ xoá dữ liệu cũ | **Hot spot** ở shard mới nhất |
| **Hash** | `hash(key) % N` | Phân bố đều | Range query phải hỏi mọi shard; **thêm shard = rehash toàn bộ** |
| **Consistent hashing** | Vòng hash + virtual node | Thêm/bớt node chỉ dịch chuyển 1/N dữ liệu | Phức tạp hơn |
| **Directory / lookup** | Bảng tra `key → shard` | Linh hoạt nhất, rebalance dễ | Thêm một điểm tra cứu (và một điểm chết) |
| **Geo / tenant** | Theo vùng hoặc theo khách hàng | Cách ly tốt, hợp compliance | Phân bố lệch theo quy mô tenant |

## 2. Declarative partitioning trong PostgreSQL (dùng trước khi nghĩ tới sharding)
```sql
CREATE TABLE events (
  id bigserial, occurred_at timestamptz NOT NULL, payload jsonb
) PARTITION BY RANGE (occurred_at);

CREATE TABLE events_2026_08 PARTITION OF events
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

-- Xoá dữ liệu cũ tức thì, không cần DELETE hàng triệu dòng
DROP TABLE events_2026_01;              -- hoặc DETACH PARTITION CONCURRENTLY
```
- **Partition pruning**: optimizer bỏ qua partition không liên quan — chỉ hoạt động khi `WHERE` chứa **partition key**.
- ⚠️ Primary key/unique **phải chứa** partition key. Đây là ràng buộc gây đau nhất khi chuyển bảng có sẵn sang partitioned.
- Dùng `pg_partman` để tự tạo/xoá partition theo lịch.

## 3. Chọn Shard Key — quyết định quan trọng nhất
Một shard key tốt phải đồng thời:
1. **Phân bố đều** — không tạo hot spot.
2. **Có mặt trong hầu hết query** — nếu không, mọi query trở thành **scatter-gather** trên toàn bộ shard.
3. **Ổn định** — đổi shard key nghĩa là di chuyển dữ liệu.
4. **Đủ độ chia (cardinality)** — `country_id` với 3 giá trị không chia được thành 20 shard.

| Ứng viên | Đánh giá |
|---|---|
| `tenant_id` (SaaS B2B) | ✅ Thường là lựa chọn tốt nhất — trùng với ranh giới truy vấn |
| `user_id` (B2C) | ✅ Tốt nếu query luôn theo user |
| `created_at` | ⚠️ Hot spot ở hiện tại; hợp cho **partitioning**, không hợp cho **sharding** |
| `hash(order_id)` | ⚠️ Phân bố đều nhưng query theo customer thành scatter-gather |
| `country` | ❌ Lệch nghiêm trọng |

## 4. Cái bạn mất khi shard
- ❌ JOIN xuyên shard (phải làm ở tầng ứng dụng)
- ❌ Transaction xuyên shard (→ [[Distributed Transactions]])
- ❌ `AUTO_INCREMENT` toàn cục (→ UUIDv7, snowflake ID)
- ❌ Unique constraint toàn cục (chỉ unique trong shard)
- ❌ Query tổng hợp đơn giản (phải scatter-gather rồi merge)
- ❌ Migration đơn giản (mỗi thay đổi schema × N shard)

> **Đây là lý do sharding phải là bước cuối.** Thứ tự thử: index → query → [[Caching Strategies]] → read replica ([[Replication]]) → partitioning → tách bảng nóng ra DB riêng (functional sharding) → **rồi mới** sharding.

## 5. Cạm bẫy hay gặp
1. **Shard quá sớm.** Một Postgres trên NVMe xử lý được rất nhiều — hãy chắc chắn bạn đã chạm trần thật.
2. **Chọn shard key không có trong query chính** ⇒ mọi request hỏi mọi shard ⇒ chậm hơn trước khi shard.
3. **`% N` cố định** ⇒ thêm shard phải rehash và di chuyển gần như toàn bộ dữ liệu. Dùng consistent hashing hoặc lookup table ngay từ đầu.
4. **Hot shard** do một tenant lớn ⇒ cần tách riêng tenant đó (dedicated shard).
5. **Quên `WHERE` chứa partition key** ⇒ không pruning ⇒ quét mọi partition.
6. **Quá nhiều partition** (hàng nghìn) ⇒ planning time tăng vọt.
7. **Không có kế hoạch rebalance** trước khi shard đầu tiên đầy.
8. **Backup/restore không được thiết kế cho N shard.** → [[Backup & Recovery]]

## 6. Checklist áp dụng
- [ ] Đã thử hết index, cache, read replica và partitioning chưa?
- [ ] Shard key có mặt trong ≥90% query không?
- [ ] Có tenant/user nào lớn bất thường (hot shard) không?
- [ ] Kế hoạch thêm shard là gì — rehash hay consistent hashing?
- [ ] Query nào bắt buộc phải scatter-gather, và chúng chiếm bao nhiêu %?
- [ ] ID toàn cục sinh bằng gì?
- [ ] Migration schema chạy trên N shard bằng công cụ nào?
- [ ] Backup, monitoring, alert đã nhân lên cho mọi shard chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| pg_partman | Tự động quản lý partition theo thời gian | https://github.com/pgpartman/pg_partman |
| Citus | Sharding gắn liền PostgreSQL | https://www.citusdata.com/ |
| Vitess | Sharding cho MySQL (YouTube dùng) | https://vitess.io/ |
| CockroachDB / YugabyteDB | SQL phân tán, tự shard | https://www.cockroachlabs.com/ |

## Tham khảo
- PostgreSQL Docs — *Table Partitioning*: https://www.postgresql.org/docs/current/ddl-partitioning.html
- Kleppmann — *DDIA*, ch.6 "Partitioning": https://dataintensive.net/
- Citus — *Choosing a distribution column*: https://docs.citusdata.com/en/stable/sharding/data_modeling.html
- Vitess — *Sharding*: https://vitess.io/docs/concepts/shard/
- MongoDB — *Choose a Shard Key*: https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/

## Liên kết
[[Replication]] · [[Caching Strategies]] · [[Distributed Transactions]] · [[Time-series Database]] · [[Database]]
