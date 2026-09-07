---
tags: [database, transaction, distributed]
status: growing
---
# Distributed Transactions

> Khi một nghiệp vụ phải ghi vào **nhiều database hoặc nhiều service**, [[ACID Properties]] không còn miễn phí. Lời khuyên đầu tiên và tốt nhất: **tránh nó**. Nếu hai thứ phải nguyên tố với nhau, cân nhắc để chúng ở cùng một database.

## 1. Two-Phase Commit (2PC)
```
Coordinator                  Participants
    │── PREPARE ──────────────▶  ghi WAL, khoá, trả "ready"
    │◀───── ready / abort ─────
    │── COMMIT / ABORT ───────▶  hoàn tất
```
| ✅ | ❌ |
|---|---|
| Nguyên tố thật sự trên nhiều node | **Blocking**: coordinator chết sau PREPARE ⇒ participant giữ khoá **vô hạn** |
| Chuẩn XA, có sẵn trong nhiều middleware | Giảm sẵn sàng (mọi node phải sống) |
| | Chậm: 2 vòng mạng + fsync mỗi vòng |

- Postgres hỗ trợ qua `PREPARE TRANSACTION` (`max_prepared_transactions`) — nhưng transaction bị bỏ quên sẽ **chặn `VACUUM` vĩnh viễn**. Bắt buộc monitor `pg_prepared_xacts`.
- Thực tế: 2PC hợp lý *trong* một cụm DB (Citus, Spanner dùng 2PC + Paxos), **hiếm khi** hợp lý giữa các microservice.

## 2. Saga — chuỗi transaction cục bộ + bù trừ
```
Đặt hàng:  [Order: created] → [Payment: charged] → [Inventory: reserved] → [Shipping: booked]
Nếu Shipping fail:
           [Inventory: release] ← [Payment: refund] ← [Order: cancelled]
```
| Kiểu | Cơ chế | Ưu / Nhược |
|---|---|---|
| **Choreography** | Mỗi service nghe event và phát event tiếp | Không có điểm nghẽn; nhưng luồng nghiệp vụ **nằm rải rác**, khó nhìn tổng thể |
| **Orchestration** | Một orchestrator điều phối tuần tự | Luồng nhìn thấy được, dễ debug; thêm một thành phần phải vận hành |

**Điều Saga không cho bạn:** isolation. Trạng thái trung gian **hiện ra** với người khác (đơn hàng "đã tạo nhưng chưa thanh toán"). Phải thiết kế UI/nghiệp vụ chấp nhận điều đó — thường bằng trạng thái `pending`.

Bù trừ ≠ rollback: hoàn tiền không xoá được việc đã trừ tiền, nó là một giao dịch **mới**. Có việc **không bù trừ được** (email đã gửi) ⇒ đặt các bước không thể hoàn tác ở **cuối** chuỗi.

## 3. Outbox Pattern — mảnh ghép then chốt
Vấn đề **dual write**: ghi DB rồi publish message là hai hệ thống ⇒ crash ở giữa là mất đồng bộ.

```sql
BEGIN;
  INSERT INTO "order" (...) VALUES (...);
  INSERT INTO outbox (aggregate_id, event_type, payload)
       VALUES (..., 'OrderCreated', '{...}'::jsonb);   -- ✅ cùng transaction
COMMIT;
-- Một relay (hoặc Debezium đọc WAL) publish outbox → broker, rồi đánh dấu đã gửi
```
Đây là cách duy nhất đáng tin để "ghi DB **và** phát sự kiện" nguyên tố. → [[Change Data Capture]]

## 4. Idempotency — điều kiện sống còn
Mạng phân tán đảm bảo **at-least-once**, nghĩa là mọi thứ **sẽ** bị gửi lại.
```sql
-- Khoá idempotency: retry không tạo giao dịch thứ hai
CREATE TABLE payment (
  id bigserial PRIMARY KEY,
  idempotency_key text UNIQUE NOT NULL,
  order_id bigint, amount numeric(19,4), status text
);
INSERT INTO payment (idempotency_key, order_id, amount, status)
VALUES ($1, $2, $3, 'charged')
ON CONFLICT (idempotency_key) DO NOTHING
RETURNING id;   -- không trả dòng nào ⇒ đã xử lý trước đó
```
Kèm theo: **inbox table** ở phía consumer để dedupe message đã xử lý.

## 5. Cạm bẫy hay gặp
1. **Dual write không có outbox** — nguồn sai lệch dữ liệu số 1 trong kiến trúc microservice.
2. **Saga không có bước bù trừ cho mọi bước.** Viết ma trận: mỗi bước × thất bại ở bước nào.
3. **Bù trừ cũng có thể fail** ⇒ cần retry + dead-letter queue + quy trình xử lý thủ công.
4. **Quên idempotency** ⇒ trừ tiền hai lần.
5. **2PC giữa các microservice** — làm mất chính lợi ích (độc lập triển khai) mà microservice mang lại.
6. **Prepared transaction bị bỏ quên** trong Postgres ⇒ bloat không kiểm soát.
7. **Chia service sai ranh giới.** Nếu hai service *luôn* phải thay đổi cùng nhau, chúng nên là một. Đây thường là gốc rễ thật của vấn đề.

## 6. Checklist áp dụng
- [ ] Nghiệp vụ này có thật sự cần ghi vào nhiều DB/service không, hay chỉ do chia sai ranh giới?
- [ ] Mọi thao tác ghi có idempotency key chưa?
- [ ] Có outbox (hoặc CDC) cho mọi chỗ vừa ghi DB vừa phát event chưa?
- [ ] Mỗi bước Saga đã có bước bù trừ tương ứng chưa?
- [ ] Có bước nào không bù trừ được — nó đã ở cuối chuỗi chưa?
- [ ] Trạng thái trung gian hiển thị ra sao cho người dùng?
- [ ] Có dead-letter queue + alert cho message xử lý thất bại chưa?
- [ ] Nếu dùng 2PC: có monitor `pg_prepared_xacts` và cảnh báo transaction treo chưa?

## Tham khảo
- Kleppmann — *DDIA*, ch.9 "Consistency and Consensus": https://dataintensive.net/
- Chris Richardson — *Saga pattern*: https://microservices.io/patterns/data/saga.html
- Chris Richardson — *Transactional Outbox*: https://microservices.io/patterns/data/transactional-outbox.html
- Microsoft — *Saga distributed transactions pattern*: https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga
- Debezium — *Outbox Event Router*: https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
- Pat Helland — *Life beyond Distributed Transactions*: https://queue.acm.org/detail.cfm?id=3025012

## Liên kết
[[ACID Properties]] · [[Isolation Levels]] · [[Change Data Capture]] · [[Event Sourcing & CQRS]] · [[CAP Theorem]] · [[Database]]
