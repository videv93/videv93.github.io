---
tags: [database, transaction]
status: evergreen
---
# Isolation Levels

> Bốn nấc đánh đổi giữa **đúng đắn** và **thông lượng**. Mỗi nấc thấp hơn cho phép thêm một loại anomaly — và mỗi anomaly đó đều đã từng gây ra một sự cố mất tiền ở đâu đó.

## 1. Bốn anomaly
| Anomaly | Kịch bản |
|---|---|
| **Dirty read** | Đọc dữ liệu của transaction **chưa commit** (và có thể rollback) |
| **Non-repeatable read** | Đọc cùng một dòng hai lần trong một transaction → giá trị khác nhau |
| **Phantom read** | Chạy cùng một `WHERE` hai lần → xuất hiện **dòng mới** |
| **Lost update** | Hai transaction cùng đọc–sửa–ghi một dòng; một bản ghi biến mất |
| **Write skew** | Hai transaction đọc chồng nhau, ghi khác nhau, phá vỡ một bất biến chung |

## 2. Bảng bốn cấp độ (theo chuẩn SQL)
| Cấp độ | Dirty read | Non-repeatable | Phantom | Ghi chú |
|---|---|---|---|---|
| `READ UNCOMMITTED` | ✅ có thể | ✅ | ✅ | Postgres coi như `READ COMMITTED` |
| `READ COMMITTED` | ❌ | ✅ | ✅ | **Mặc định của PostgreSQL, Oracle, SQL Server** |
| `REPEATABLE READ` | ❌ | ❌ | ✅ theo chuẩn | **Mặc định của MySQL/InnoDB**; Postgres = snapshot isolation, chặn cả phantom nhưng **vẫn có write skew** |
| `SERIALIZABLE` | ❌ | ❌ | ❌ | Kết quả tương đương chạy tuần tự |

> ⚠️ Cùng một tên, hành vi khác nhau giữa các DB. `REPEATABLE READ` của Postgres mạnh hơn của chuẩn SQL; `SERIALIZABLE` của Postgres (SSI) khác `SERIALIZABLE` của MySQL (dùng khoá).

## 3. Lost update — ví dụ phải tự tay tái hiện một lần
```sql
-- Session A                      -- Session B
BEGIN;                            BEGIN;
SELECT stock FROM p WHERE id=1;   SELECT stock FROM p WHERE id=1;
-- đọc được 10                    -- đọc được 10
UPDATE p SET stock = 9 WHERE id=1;
COMMIT;                           UPDATE p SET stock = 9 WHERE id=1;
                                  COMMIT;
-- Đã bán 2 món, stock chỉ giảm 1. Mất một cập nhật.
```

### Bốn cách chữa
```sql
-- 1. Atomic update — tốt nhất khi diễn đạt được
UPDATE p SET stock = stock - 1 WHERE id = 1 AND stock > 0;

-- 2. Pessimistic lock
SELECT stock FROM p WHERE id = 1 FOR UPDATE;

-- 3. Optimistic lock (version column) — hợp với web/ORM
UPDATE p SET stock = 9, version = version + 1
WHERE id = 1 AND version = 3;   -- 0 dòng ⇒ ai đó đã sửa ⇒ retry

-- 4. SERIALIZABLE + retry khi serialization failure
```
→ [[Locking & MVCC]]

## 4. Write skew — anomaly mà chỉ `SERIALIZABLE` chặn được
> Quy tắc: "luôn phải có ít nhất 1 bác sĩ trực." Hai bác sĩ cùng lúc kiểm tra "còn 2 người trực", cả hai cùng xin nghỉ. Mỗi transaction đều hợp lệ khi xét riêng; kết quả là **0 bác sĩ trực**.

Snapshot isolation không phát hiện được vì hai transaction **ghi vào hai dòng khác nhau**. Chữa bằng `SERIALIZABLE`, hoặc materialize xung đột (khoá một dòng đại diện cho bất biến chung).

## 5. Cạm bẫy hay gặp
1. **Giả định `SERIALIZABLE` là mặc định.** Không DB phổ biến nào mặc định như vậy.
2. **Dùng `SERIALIZABLE` mà không viết vòng retry.** Postgres SSI **sẽ** ném `40001 serialization_failure` — đó là hành vi bình thường, ứng dụng phải thử lại.
3. **Đọc–sửa–ghi trong code** ở `READ COMMITTED` mà không có khoá/version ⇒ lost update. Đây là bug đồng thời phổ biến nhất trong ứng dụng web.
4. **Nâng isolation để chữa bug thiết kế.** Thường atomic update hoặc constraint là lời giải đúng hơn và rẻ hơn.
5. **Kiểm tra rồi mới chèn** (`SELECT ... IF NOT EXISTS THEN INSERT`) — luôn thua một unique constraint + `ON CONFLICT`.
6. **Không biết ORM đang set isolation nào.** Kiểm tra bằng `SHOW transaction_isolation;`.
7. **`REPEATABLE READ` giữ snapshot lâu** ⇒ chặn `VACUUM`, phình bảng. → [[PostgreSQL]]

## 6. Checklist áp dụng
- [ ] Isolation level thực tế của ứng dụng là gì? (`SHOW transaction_isolation`)
- [ ] Có luồng đọc–sửa–ghi nào không được bảo vệ bằng atomic update / lock / version không?
- [ ] Bất biến nghiệp vụ nào cần đúng **giữa nhiều dòng**? (ứng viên write skew)
- [ ] Nếu dùng `SERIALIZABLE`: đã có retry loop với backoff cho mã lỗi `40001` chưa?
- [ ] Tính duy nhất được đảm bảo bằng `UNIQUE` constraint hay bằng `SELECT` trước `INSERT`?
- [ ] Đã thử tái hiện lost update bằng hai session psql để chắc chắn hiểu chưa?

## Tham khảo
- PostgreSQL Docs — *Transaction Isolation*: https://www.postgresql.org/docs/current/transaction-iso.html
- Kleppmann — *DDIA*, ch.7 (weak isolation & write skew): https://dataintensive.net/
- Berenson et al. — *A Critique of ANSI SQL Isolation Levels*: https://www.microsoft.com/en-us/research/publication/a-critique-of-ansi-sql-isolation-levels/
- Martin Kleppmann — *Hermitage* (so sánh isolation thực tế giữa các DB): https://github.com/ept/hermitage
- Jepsen — *Consistency models*: https://jepsen.io/consistency

## Liên kết
[[ACID Properties]] · [[Locking & MVCC]] · [[Deadlock]] · [[Distributed Transactions]] · [[Database]]
