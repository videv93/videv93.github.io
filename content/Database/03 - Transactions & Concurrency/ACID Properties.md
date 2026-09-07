---
tags: [database, transaction, principle]
status: evergreen
---
# ACID Properties

> Bốn bảo đảm khiến database khác một tập tin. **Tối quan trọng cho RDBMS** — và là lý do bạn không phải tự viết code xử lý "điều gì xảy ra nếu mất điện giữa hai lệnh ghi".

## 1. Bốn thuộc tính

### `Atomicity` (Tính nguyên tố)
Giao dịch (Transaction) hoàn tất **100% hoặc thất bại 100%** (All-or-Nothing).
- Hiện thực: undo log / rollback segment. Postgres dùng MVCC — dòng cũ vẫn còn, chỉ đánh dấu transaction đã abort.
- `SAVEPOINT` cho phép rollback một phần:
```sql
BEGIN;
  INSERT INTO "order" ... ;
  SAVEPOINT sp1;
  INSERT INTO promo_usage ... ;   -- có thể lỗi
  ROLLBACK TO sp1;                -- giữ lại phần trước
COMMIT;
```

### `Consistency` (Tính nhất quán)
Dữ liệu luôn tuân thủ **mọi ràng buộc (Constraints/Rules)** trước và sau giao dịch.
- Đây là thuộc tính **duy nhất** cần bạn hợp tác: DB chỉ cưỡng chế được ràng buộc bạn đã khai báo. → [[Keys & Constraints]]
- ⚠️ Chữ C này **khác hoàn toàn** chữ C trong [[CAP Theorem]] (nghĩa là linearizability). Trùng chữ, khác khái niệm.

### `Isolation` (Tính cô lập)
Các giao dịch chạy đồng thời **không can thiệp lẫn nhau**. Các cấp độ: Read Uncommitted, Read Committed, Repeatable Read, Serializable.
- Đây là thuộc tính bị **nới lỏng nhiều nhất** trong thực tế vì lý do hiệu năng. → [[Isolation Levels]]
- Hiện thực bằng khoá hoặc MVCC. → [[Locking & MVCC]]

### `Durability` (Tính bền vững)
Dữ liệu đã `COMMIT` sẽ **lưu vĩnh viễn** dù hệ thống bị sập điện ngay sau đó (qua **WAL — Write-Ahead Logging**).
- Cơ chế: append vào WAL → `fsync` → mới trả OK cho client. → [[Storage Engines]]
- Mức độ có thể chỉnh (và đó là chỗ người ta hay tự bắn vào chân):

| Cấu hình Postgres | Ý nghĩa | Rủi ro |
|---|---|---|
| `synchronous_commit = on` | Đợi fsync WAL local | Mặc định, an toàn |
| `= off` | Trả OK trước khi fsync | Mất vài trăm ms giao dịch cuối khi crash (**không** hỏng dữ liệu) |
| `= remote_apply` | Đợi replica áp dụng xong | Chậm nhất, an toàn nhất |
| `fsync = off` | Không fsync | ❌ **Hỏng dữ liệu** khi crash. Chỉ dùng cho môi trường vứt đi |

> Durability trên **một máy** không cứu được khi máy đó cháy. Durability thật = WAL + [[Replication]] + [[Backup & Recovery]].

## 2. BASE — mô hình đối trọng
> Phổ biến ở NoSQL: `Basically Available` (Sẵn sàng cơ bản), `Soft-state` (Trạng thái linh hoạt), `Eventual Consistency` (Nhất quán cuối cùng — chấp nhận độ trễ đồng bộ).

Chi tiết và cách sống chung với nó: [[BASE & Eventual Consistency]].

| | ACID | BASE |
|---|---|---|
| Ưu tiên | Đúng đắn | Sẵn sàng |
| Nhất quán | Ngay lập tức | Cuối cùng |
| Scale | Chiều dọc là chính | Chiều ngang tự nhiên |
| Điển hình | PostgreSQL, MySQL | Cassandra, DynamoDB |

Đây là **phổ**, không phải nhị phân: MongoDB có transaction ACID đa document, Postgres có replica đọc eventual, CockroachDB/Spanner có ACID phân tán.

## 3. Cạm bẫy hay gặp
1. **Nhầm chữ C của ACID với chữ C của CAP.** Hai khái niệm khác nhau hoàn toàn.
2. **Tin rằng "dùng RDBMS là tự động ACID".** Isolation mặc định của Postgres/MySQL là `READ COMMITTED`/`REPEATABLE READ`, **không** phải `SERIALIZABLE` ⇒ vẫn có anomaly. → [[Isolation Levels]]
3. **Transaction quá dài.** Giữ khoá lâu, chặn `VACUUM`, phình WAL, tăng [[Deadlock]]. Không bao giờ gọi API bên ngoài **bên trong** transaction.
4. **Autocommit không nhận thức được.** Mỗi lệnh là một transaction riêng ⇒ hai `UPDATE` liên tiếp không nguyên tố.
5. **Bắt exception rồi vẫn `COMMIT`.** Trong Postgres, sau lỗi thì transaction ở trạng thái aborted — mọi lệnh tiếp theo đều lỗi cho tới khi `ROLLBACK`.
6. **`fsync = off` để benchmark đẹp** rồi để nguyên lên production.
7. **Transaction bao trùm cả việc gửi email/gọi payment** — rollback DB không rollback được thế giới bên ngoài. Dùng Outbox Pattern → [[Change Data Capture]].

## 4. Checklist áp dụng
- [ ] Transaction có ngắn nhất có thể không (chỉ bao các lệnh DB liên quan)?
- [ ] Có gọi API/gửi mail/đọc file bên trong transaction không?
- [ ] Đã set `statement_timeout` và `idle_in_transaction_session_timeout` chưa?
- [ ] Đường xử lý lỗi có `ROLLBACK` rõ ràng không?
- [ ] `synchronous_commit` đang ở mức nào — đã cân nhắc có chủ đích chưa?
- [ ] Bất biến nghiệp vụ đã khai báo thành constraint (để chữ C có hiệu lực) chưa?
- [ ] Đã kiểm tra isolation level thực tế mà ORM/pool đang dùng chưa?

## Tham khảo
- Kleppmann — *DDIA*, ch.7 "Transactions": https://dataintensive.net/
- PostgreSQL Docs — *Transaction Isolation*: https://www.postgresql.org/docs/current/transaction-iso.html
- PostgreSQL Docs — *Write-Ahead Logging*: https://www.postgresql.org/docs/current/wal-intro.html
- Gray & Reuter — *Transaction Processing: Concepts and Techniques*
- Jepsen — *Consistency models*: https://jepsen.io/consistency

## Liên kết
[[Isolation Levels]] · [[Locking & MVCC]] · [[BASE & Eventual Consistency]] · [[CAP Theorem]] · [[Storage Engines]] · [[Database]]
