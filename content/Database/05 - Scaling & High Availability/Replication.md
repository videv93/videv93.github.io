---
tags: [database, scaling, ha]
status: evergreen
---
# Replication

> **Nhân bản dữ liệu** sang nhiều node. Giải quyết ba bài toán khác nhau cùng lúc: gánh tải đọc, tính sẵn sàng khi node chết, và đặt dữ liệu gần người dùng về mặt địa lý. Nó **không** giải quyết bài toán tải ghi — đó là việc của [[Sharding & Partitioning]].

## 1. Hai mô hình (từ seed, mở rộng)

### `Primary-Replica` (Master-Slave)
Node Primary chịu trách nhiệm **Ghi (Write)**, nhân bản dữ liệu sang các Node Replica để gánh tải **Đọc (Read Scaling)**.
- Đơn giản, không xung đột ghi — mặc định nên chọn.
- Replica dùng được cho: query đọc, báo cáo, backup, và làm ứng viên failover.
- Giới hạn: **mọi ghi vẫn qua một node**.

### `Multi-Primary` (Master-Master)
Cho phép ghi ở nhiều Node, **cần xử lý xung đột dữ liệu (Conflict Resolution)**.
- Dùng khi: đa vùng địa lý cần ghi cục bộ, hoặc yêu cầu sẵn sàng ghi tuyệt đối.
- Chi phí thật: mọi bài toán hoà giải xung đột trong [[BASE & Eventual Consistency]] trở thành của bạn — kể cả xung đột **unique constraint** mà không cách nào tự giải quyết đúng.
- 💡 Lời khuyên: tránh trừ khi có lý do rõ ràng và không thể thay thế.

## 2. Đồng bộ hay bất đồng bộ
| | Asynchronous | Synchronous |
|---|---|---|
| Primary chờ replica | Không | Có (ít nhất 1 replica xác nhận) |
| Độ trễ ghi | Thấp nhất | + 1 vòng mạng |
| Mất dữ liệu khi primary chết | **Có** (phần chưa kịp gửi) | Không |
| Sẵn sàng khi replica chậm/chết | Không ảnh hưởng | Ghi bị chặn (trừ khi có quorum) |
| PACELC | PC/EL | PC/EC → [[CAP Theorem]] |

```sql
-- PostgreSQL: cân bằng thực dụng — cần 1 trong 3 replica xác nhận
ALTER SYSTEM SET synchronous_standby_names = 'ANY 1 (r1, r2, r3)';
ALTER SYSTEM SET synchronous_commit = 'on';
```

## 3. Cơ chế truyền
| Cơ chế | Mô tả | Đặc điểm |
|---|---|---|
| **Physical / streaming (WAL)** | Gửi WAL byte-level | Postgres mặc định; replica là bản sao **hệt nhau**, không query khác được |
| **Logical** | Gửi thay đổi mức dòng, theo publication | Chọn được bảng, replicate qua phiên bản khác nhau, nền tảng cho [[Change Data Capture]] |
| **Statement-based** | Gửi lại câu SQL | ⚠️ Không an toàn với `now()`, `random()` |
| **Row-based (MySQL binlog)** | Gửi ảnh dòng trước/sau | Mặc định của MySQL 8, an toàn |

## 4. Replication lag — chỉ số phải theo dõi
```sql
-- Trên primary: replica đang chậm bao nhiêu byte
SELECT client_addr, state, sent_lsn, replay_lsn,
       pg_wal_lsn_diff(sent_lsn, replay_lsn) AS replay_lag_bytes
FROM pg_stat_replication;

-- Trên replica: chậm bao nhiêu giây
SELECT now() - pg_last_xact_replay_timestamp() AS lag;
```
Nguyên nhân lag thường gặp: query dài trên replica chặn replay, I/O replica yếu hơn primary, batch job ghi lớn, mạng.

## 5. Định tuyến đọc/ghi
| Cách | Ghi chú |
|---|---|
| Ứng dụng tự chọn connection | Rõ ràng nhất, kiểm soát tốt nhất |
| Proxy (PgBouncer + HAProxy, pgpool, ProxySQL) | Trong suốt với app → [[Connection Pooling]] |
| ORM read/write splitting | Django `DATABASE_ROUTERS`, Rails `connected_to` |

**Nguyên tắc:** ghi xong thì **đọc từ primary trong X giây** (hoặc dùng LSN token) cho luồng cần read-your-writes. Đây là bug UX phổ biến nhất khi bật read replica.

## 6. Cạm bẫy hay gặp
1. **Bật read replica rồi bug "dữ liệu vừa lưu không thấy".** → mục 5.
2. **Coi replica là backup.** Không phải: `DROP TABLE` sẽ replicate sang replica trong tích tắc. → [[Backup & Recovery]]
3. **Không monitor lag** ⇒ replica tụt hàng giờ mà không ai biết.
4. **Replication slot bị bỏ quên** trong Postgres ⇒ primary giữ WAL vô hạn ⇒ **đầy đĩa và sập**. Đây là cách phổ biến nhất để giết một Postgres. Luôn set `max_slot_wal_keep_size`.
5. **Chạy báo cáo nặng trên replica sync** ⇒ chặn replay, hoặc query bị huỷ (`max_standby_streaming_delay`).
6. **Multi-primary với auto-increment ID** ⇒ đụng khoá. Dùng UUIDv7/offset sequence.
7. **Failover thủ công lúc 3h sáng** — không có công cụ tự động thì RTO là "thời gian bạn tỉnh dậy". → [[High Availability & Failover]]

## 7. Checklist áp dụng
- [ ] Mục tiêu của replication là gì: read scaling, HA, hay địa lý? (khác nhau ⇒ cấu hình khác nhau)
- [ ] Chấp nhận mất bao nhiêu dữ liệu khi primary chết (RPO)? ⇒ chọn sync/async
- [ ] Có monitor + alert cho replication lag chưa?
- [ ] Có alert cho replication slot tồn đọng và dung lượng WAL chưa?
- [ ] Luồng nào cần read-your-writes, và đã xử lý thế nào?
- [ ] Đã diễn tập failover trên môi trường staging chưa?
- [ ] Vẫn có backup độc lập (không phải chỉ có replica) chứ?
- [ ] Replica có cùng cấu hình phần cứng với primary không?

## Tham khảo
- PostgreSQL Docs — *High Availability, Load Balancing, and Replication*: https://www.postgresql.org/docs/current/high-availability.html
- PostgreSQL Docs — *Logical Replication*: https://www.postgresql.org/docs/current/logical-replication.html
- MySQL Docs — *Replication*: https://dev.mysql.com/doc/refman/8.0/en/replication.html
- Kleppmann — *DDIA*, ch.5 "Replication": https://dataintensive.net/
- Patroni — quản lý HA cho Postgres: https://patroni.readthedocs.io/

## Liên kết
[[High Availability & Failover]] · [[Sharding & Partitioning]] · [[BASE & Eventual Consistency]] · [[Backup & Recovery]] · [[Database]]
