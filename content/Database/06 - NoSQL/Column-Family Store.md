---
tags: [database, nosql, distributed]
status: growing
---
# Column-Family Store

> Tối ưu hóa lưu trữ và truy vấn **theo cột thay vì theo hàng**, thích hợp cho ghi dữ liệu lớn (**High Write Throughput**). Đại diện: **Apache Cassandra, ScyllaDB**. Dùng cho **Time-series data, IoT logging, Messaging apps**.

## 1. Vì sao ghi nhanh
Cassandra dùng **LSM-Tree**: ghi vào memtable (RAM) + commit log (append tuần tự) rồi trả OK ngay. Không đọc trước khi ghi, không seek ngẫu nhiên. → [[Storage Engines]]

Kiến trúc **masterless**: mọi node đều nhận được ghi; dữ liệu phân bố bằng consistent hashing. Không có single point of failure, và scale bằng cách thêm node.

## 2. Mô hình dữ liệu — điểm khác biệt cốt tử
```
PRIMARY KEY ( (partition_key) , clustering_key_1, clustering_key_2 )
              └── quyết định node nào giữ dữ liệu
                                  └── quyết định thứ tự SẮP XẾP trong partition
```
```sql
CREATE TABLE message_by_room (
  room_id    uuid,
  sent_at    timestamp,
  message_id timeuuid,
  sender_id  uuid,
  body       text,
  PRIMARY KEY ((room_id), sent_at, message_id)
) WITH CLUSTERING ORDER BY (sent_at DESC);

-- ✅ Query duy nhất bảng này phục vụ: tin nhắn gần nhất của một phòng
SELECT * FROM message_by_room WHERE room_id = ? LIMIT 50;
```

## 3. Query-first modeling — đảo ngược tư duy RDBMS
| RDBMS | Cassandra |
|---|---|
| Thiết kế **entity** → chuẩn hoá → query gì cũng được | Liệt kê **query** → thiết kế **một bảng cho mỗi query** |
| JOIN khi cần | Không có JOIN — **ghi trùng dữ liệu vào nhiều bảng** |
| Chuẩn hoá | Phá chuẩn là mặc định |
| Index phụ tuỳ ý | Secondary index rất hạn chế, thường nên tránh |

> Đây là điều seed nhấn mạnh và cũng là chỗ người đến từ SQL sai nhiều nhất: **một query = một bảng**. Ghi cùng một tin nhắn vào `message_by_room` và `message_by_user` là bình thường, không phải lỗi thiết kế.

## 4. Tuning consistency theo từng query
```sql
CONSISTENCY QUORUM;   -- R + W > N ⇒ đọc thấy ghi mới nhất
CONSISTENCY ONE;      -- nhanh nhất, có thể đọc dữ liệu cũ
```
Với `RF=3`: `W=QUORUM(2)` + `R=QUORUM(2)` là cấu hình cân bằng phổ biến. → [[CAP Theorem]], [[BASE & Eventual Consistency]]

Cơ chế sửa chữa nền: **hinted handoff**, **read repair**, và **anti-entropy repair** (`nodetool repair`, phải chạy định kỳ trong `gc_grace_seconds`).

## 5. Tombstone — cái bẫy đặc trưng
Xoá trong Cassandra là **ghi thêm một dấu xoá (tombstone)**, không xoá thật. Tombstone tồn tại `gc_grace_seconds` (mặc định 10 ngày) để đảm bảo mọi replica biết về việc xoá.

⇒ Bảng bị xoá/cập nhật nhiều tích tụ hàng nghìn tombstone ⇒ query đọc phải quét qua tất cả ⇒ chậm dần rồi timeout. Đây là nguyên nhân sự cố Cassandra phổ biến nhất.
- Tránh: thiết kế theo **TTL** thay vì `DELETE`; tránh cập nhật collection theo kiểu ghi đè.

## 6. Cạm bẫy hay gặp
1. **Dùng Cassandra như RDBMS** — thiết kế từ entity thay vì từ query.
2. **`ALLOW FILTERING`** — nó cho phép query không có partition key bằng cách quét toàn cụm. Coi nó như cảnh báo lỗi, không phải giải pháp.
3. **Partition quá lớn** (>100MB hoặc >100k dòng) ⇒ node lệch tải, đọc chậm. Thêm "bucket" vào partition key (`(room_id, yyyymm)`).
4. **Partition quá nhỏ** ⇒ mỗi query chạm nhiều node.
5. **Tombstone** — xem mục 5.
6. **Không chạy `nodetool repair` định kỳ** ⇒ dữ liệu xoá "sống lại" (zombie data).
7. **Dùng secondary index** cho cột độ chọn lọc cao ⇒ scatter-gather toàn cụm. Dùng bảng phụ hoặc materialized view thay thế.
8. **Lightweight transaction (`IF NOT EXISTS`)** dùng Paxos — chậm hơn ghi thường **hàng chục lần**. Chỉ dùng khi thật sự cần.
9. **Chọn Cassandra khi chưa đến quy mô cần nó.** Vận hành một cụm Cassandra tốn kém hơn một Postgres rất nhiều.

## 7. Checklist áp dụng
- [ ] Đã liệt kê **toàn bộ** query cần phục vụ trước khi tạo bảng chưa?
- [ ] Mỗi query nóng có bảng riêng của nó không?
- [ ] Partition key có phân bố đều và giới hạn được kích thước partition không?
- [ ] Có ước lượng số dòng/dung lượng tối đa mỗi partition chưa?
- [ ] Có query nào cần `ALLOW FILTERING` không? (nếu có — thiết kế lại)
- [ ] Dữ liệu hết hạn dùng TTL hay `DELETE`?
- [ ] `nodetool repair` có chạy tự động trong `gc_grace_seconds` không?
- [ ] Consistency level của từng loại query đã chọn có chủ đích chưa?
- [ ] Có monitor tombstone warning, partition size, và pending compaction không?

## Tham khảo
- Cassandra Docs — *Data Modeling*: https://cassandra.apache.org/doc/latest/cassandra/data_modeling/
- DataStax — *Cassandra Data Modeling Best Practices*: https://www.datastax.com/blog/basic-rules-cassandra-data-modeling
- Cassandra Docs — *Compaction & Tombstones*: https://cassandra.apache.org/doc/latest/cassandra/operating/compaction/
- Kleppmann — *DDIA*, ch.5–6: https://dataintensive.net/
- ScyllaDB University: https://university.scylladb.com/

## Liên kết
[[Database Paradigms]] · [[BASE & Eventual Consistency]] · [[Sharding & Partitioning]] · [[Time-series Database]] · [[Storage Engines]] · [[Database]]
