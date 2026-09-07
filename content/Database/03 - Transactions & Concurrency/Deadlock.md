---
tags: [database, transaction, concurrency]
status: growing
---
# Deadlock

> Hai transaction chờ nhau vòng tròn, không ai nhường. Database phát hiện và **giết một nạn nhân**. Deadlock không phải bug của DB — nó là hệ quả của **thứ tự lấy khoá không nhất quán** trong code của bạn.

## 1. Cơ chế
```
T1: UPDATE account SET bal = bal - 100 WHERE id = 1;   -- khoá dòng 1
T2: UPDATE account SET bal = bal - 50  WHERE id = 2;   -- khoá dòng 2
T1: UPDATE account SET bal = bal + 100 WHERE id = 2;   -- chờ T2
T2: UPDATE account SET bal = bal + 50  WHERE id = 1;   -- chờ T1  →  💥 deadlock
```
Bốn điều kiện Coffman (cần đủ cả 4): mutual exclusion, hold-and-wait, no preemption, **circular wait**. Ta chỉ phá được điều kiện thứ tư một cách thực tế.

- Postgres: chạy detector sau `deadlock_timeout` (mặc định 1s), ném `40P01 deadlock_detected`.
- MySQL/InnoDB: phát hiện gần như tức thì, rollback transaction "rẻ" hơn, ném lỗi 1213.

## 2. Sáu cách phòng tránh (theo hiệu quả giảm dần)
1. **Luôn lấy khoá theo cùng một thứ tự.** Sắp id tăng dần trước khi update:
   ```sql
   UPDATE account SET bal = bal + delta
   WHERE id = ANY(ARRAY[2,1]::int[] ORDER BY 1);  -- hoặc sắp trong code
   ```
   Đây là biện pháp giải quyết ~80% deadlock thực tế.
2. **Rút ngắn transaction.** Ít thời gian giữ khoá = ít cơ hội giao nhau.
3. **Gộp thành một câu lệnh atomic** thay vì đọc–sửa–ghi nhiều bước.
4. **Khoá trước, theo thứ tự, ngay đầu transaction** (`SELECT ... FOR UPDATE ORDER BY id`).
5. **Giảm mức khoá**: `FOR NO KEY UPDATE` thay `FOR UPDATE` khi không đụng khoá.
6. **Hạ độ song song** trên batch job ghi cùng vùng dữ liệu.

## 3. Nguồn deadlock ẩn — hay bị bỏ sót
| Nguồn | Vì sao |
|---|---|
| **Foreign key** | `INSERT` con lấy `KEY SHARE` trên dòng cha; hai chiều FK khác nhau ⇒ vòng |
| **Trigger** | Lấy khoá trên bảng mà code không nhìn thấy → [[Stored Procedure & Trigger]] |
| **Unique index** | Hai `INSERT` cùng key chờ nhau kết quả |
| **Batch update nhiều dòng** | Thứ tự quét khác nhau giữa hai plan ⇒ thứ tự khoá khác nhau |
| **Gap lock của InnoDB** | Ở `REPEATABLE READ`, InnoDB khoá cả khoảng trống ⇒ deadlock nơi Postgres không có |
| **Cột đếm phá chuẩn** | Nhiều transaction cùng `UPDATE` một dòng cha → [[Denormalization]] |

## 4. Retry là bắt buộc, không phải tuỳ chọn
Deadlock **không thể loại bỏ hoàn toàn**. Ứng dụng phải xử lý:
```python
for attempt in range(3):
    try:
        with db.transaction():
            do_work()
        break
    except DeadlockDetected:          # 40P01 (PG) / 1213 (MySQL)
        if attempt == 2: raise
        sleep(random.uniform(0.05, 0.2) * (2 ** attempt))  # backoff + jitter
```
> Cùng một vòng retry này dùng được cho `40001 serialization_failure` của `SERIALIZABLE`. → [[Isolation Levels]]

## 5. Điều tra khi xảy ra
```sql
-- Postgres: bật log để có đồ thị chờ đầy đủ
ALTER SYSTEM SET log_lock_waits = on;
ALTER SYSTEM SET deadlock_timeout = '1s';
-- log sẽ in ra: "Process 123 waits for ShareLock on transaction 456..."

-- Xem ai đang chặn ai ngay lúc này
SELECT pid, state, wait_event_type, wait_event, query,
       pg_blocking_pids(pid) AS blocked_by
FROM pg_stat_activity WHERE cardinality(pg_blocking_pids(pid)) > 0;
```
MySQL: `SHOW ENGINE INNODB STATUS\G` → mục *LATEST DETECTED DEADLOCK*.

## 6. Checklist áp dụng
- [ ] Mọi transaction đụng nhiều dòng đều sắp xếp theo một thứ tự xác định?
- [ ] Ứng dụng có retry với exponential backoff + jitter cho lỗi deadlock chưa?
- [ ] `log_lock_waits = on` đã bật trên production chưa?
- [ ] Có alert khi tần suất deadlock vượt ngưỡng không?
- [ ] Transaction có gọi ra ngoài DB không?
- [ ] Batch job lớn có chia lô và commit từng lô không?
- [ ] Có trigger nào đang lấy khoá ngoài tầm nhìn của code không?

## Tham khảo
- PostgreSQL Docs — *Deadlocks*: https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS
- MySQL Docs — *Deadlocks in InnoDB*: https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html
- MySQL Docs — *How to Minimize and Handle Deadlocks*: https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks-handling.html
- Coffman, Elphick, Shoshani — *System Deadlocks* (1971)
- Citus/Microsoft — *Debugging Postgres deadlocks*: https://www.citusdata.com/blog/

## Liên kết
[[Locking & MVCC]] · [[Isolation Levels]] · [[ACID Properties]] · [[Performance Tuning]] · [[Database]]
