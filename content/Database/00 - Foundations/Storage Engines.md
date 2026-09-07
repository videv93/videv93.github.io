---
tags: [database, foundation, internals]
status: evergreen
---
# Storage Engines

> Tầng quyết định **thực sự** hiệu năng của database: dữ liệu nằm trên đĩa theo hình dạng nào, và ghi vào đó tốn bao nhiêu lần I/O. Hai lựa chọn kiến trúc lớn — B-Tree và LSM-Tree — giải thích gần như mọi khác biệt hiệu năng giữa các DB.

## 1. B-Tree vs LSM-Tree

| | **B+Tree** | **LSM-Tree** |
|---|---|---|
| Cơ chế ghi | Ghi tại chỗ (update-in-place) trên page | Ghi tuần tự vào memtable → flush ra SSTable |
| Write amplification | Cao (1 dòng đổi ⇒ ghi cả page + WAL) | Thấp lúc ghi, dồn vào **compaction** sau |
| Read amplification | Thấp, ổn định (log₍ₙ₎ lần seek) | Cao hơn: phải tra nhiều SSTable (giảm bằng bloom filter) |
| Space amplification | Thấp, nhưng có fragmentation | Cao tạm thời (bản cũ chưa compact) |
| Độ trễ | Đều đặn, dự đoán được | Nhanh, nhưng có gai khi compaction chạy |
| Hợp với | Workload đọc nhiều, range scan, OLTP | Workload ghi cực nhiều, time-series, log |
| Đại diện | PostgreSQL, MySQL/InnoDB, SQLite | Cassandra, RocksDB, LevelDB, ScyllaDB, ClickHouse |

> Đây là lý do [[Column-Family Store]] (Cassandra) ghi nhanh khủng khiếp còn [[PostgreSQL]] đọc range ổn định — không phải "cái nào tốt hơn", mà là hai điểm đánh đổi khác nhau.

## 2. Row store vs Column store
| | Row store | Column store |
|---|---|---|
| Bố cục | Cả dòng nằm liền nhau | Mỗi cột nằm liền nhau |
| Rẻ khi | Lấy/ghi **cả bản ghi** theo id | Quét **một vài cột** trên rất nhiều dòng |
| Nén | Kém (dữ liệu hỗn tạp trong 1 block) | Rất tốt (cùng kiểu, cùng phân phối → RLE, dictionary) |
| Điển hình | OLTP: PostgreSQL, MySQL | OLAP: ClickHouse, DuckDB, BigQuery, Parquet |

Chi tiết workload: [[OLTP vs OLAP]].

## 3. Write-Ahead Logging (WAL)
Quy tắc: **ghi ý định vào log (fsync) trước khi sửa dữ liệu thật.**

```
Client COMMIT
   → append record vào WAL  → fsync  → trả OK cho client
   → (sau đó, lười biếng) flush dirty page từ buffer pool xuống data file
```

- Đây chính là cơ chế thực thi chữ **D** (Durability) trong [[ACID Properties]].
- Crash recovery = replay WAL từ **checkpoint** gần nhất.
- WAL cũng là nguồn cho [[Replication]] (streaming replication), [[Backup & Recovery]] (PITR), và [[Change Data Capture]] (log-based CDC).
- Tên gọi khác nhau: PostgreSQL = WAL, MySQL/InnoDB = redo log, Oracle = redo log, MongoDB = journal.

## 4. Buffer pool (shared buffers)
- Cache các page trong RAM; **hầu hết query nhanh vì không chạm đĩa**.
- Thay thế theo LRU/clock-sweep. Chỉ số cần theo dõi: **cache hit ratio** (>99% cho OLTP là bình thường).
- Postgres: `shared_buffers` ≈ 25% RAM, phần còn lại để OS page cache dùng.
- MySQL/InnoDB: `innodb_buffer_pool_size` ≈ 70–80% RAM (InnoDB không dựa vào OS cache).
→ [[Performance Tuning]]

## 5. Page, tuple và hệ quả thực tế
- Đơn vị I/O là **page** (Postgres 8KB, InnoDB 16KB), không phải dòng.
- ⇒ Đọc 1 cột `int` vẫn phải nạp cả page 8KB. Đây là lý do row store thua trên OLAP.
- **Fill factor**: chừa chỗ trống trong page để update tại chỗ không phải chuyển dòng đi nơi khác.
- **TOAST** (Postgres): giá trị quá lớn được tách ra bảng phụ và nén — nên cột `TEXT` khổng lồ không làm phình bảng chính, nhưng đọc nó thì tốn thêm I/O.
- **Clustered index** (InnoDB): dữ liệu **nằm trong** B-Tree của PK ⇒ PK lớn/ngẫu nhiên làm phình mọi secondary index. → [[MySQL]]
- **Heap** (Postgres): dữ liệu nằm rời, index trỏ tới `ctid` ⇒ cần `VACUUM` để dọn dòng chết. → [[PostgreSQL]]

## 6. Cạm bẫy hay gặp
1. **Tối ưu query mà không biết bảng có vừa RAM hay không.** Bảng vừa buffer pool và bảng gấp 10 lần RAM là hai bài toán khác nhau.
2. **Dùng UUIDv4 làm clustered PK trong InnoDB** — ghi ngẫu nhiên khắp B-Tree, page split liên tục. Dùng UUIDv7/ULID (sắp xếp theo thời gian) hoặc BIGINT.
3. **Tắt fsync để "cho nhanh"** — nhanh thật, và mất dữ liệu thật.
4. **Không hiểu compaction** khi dùng LSM: đĩa phải dư ~50% và có lúc I/O tăng vọt là **thiết kế**, không phải sự cố.
5. **Quên bloat**: trong Postgres, `UPDATE` nhiều = nhiều dòng chết = bảng phình dù số dòng không tăng. → [[Monitoring & Capacity Planning]]

## 7. Checklist áp dụng
- [ ] Working set (dữ liệu nóng) có vừa RAM không?
- [ ] Cache hit ratio hiện tại là bao nhiêu?
- [ ] `shared_buffers` / `innodb_buffer_pool_size` đã cấu hình, hay vẫn để mặc định?
- [ ] Đĩa là SSD/NVMe chưa? (random I/O của B-Tree trên HDD là thảm hoạ)
- [ ] PK có tăng dần theo thời gian không (tránh page split ngẫu nhiên)?
- [ ] WAL/redo log đặt trên volume đủ nhanh và đủ chỗ chưa?

## Tham khảo
- Alex Petrov — *Database Internals*, part I (Storage Engines): https://www.databass.dev/
- Kleppmann — *DDIA*, ch.3 "Storage and Retrieval": https://dataintensive.net/
- PostgreSQL Docs — *Database Physical Storage*: https://www.postgresql.org/docs/current/storage.html
- PostgreSQL Docs — *Write-Ahead Logging*: https://www.postgresql.org/docs/current/wal-intro.html
- MySQL Docs — *InnoDB Architecture*: https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html
- RocksDB Wiki — *LSM-Tree & Compaction*: https://github.com/facebook/rocksdb/wiki/Compaction

## Liên kết
[[Index Fundamentals]] · [[Performance Tuning]] · [[ACID Properties]] · [[PostgreSQL]] · [[Database]]
