---
tags: [backend, architecture, distributed, events]
status: growing
---
# Event-Driven Architecture

> Thay vì service A **ra lệnh** cho B, A **công bố sự kiện đã xảy ra** và ai quan tâm thì tự phản ứng. Đổi tính nhất quán tức thì lấy khả năng tách rời (decoupling) và chịu tải.

## 1. Command vs Event
| | **Command** | **Event** |
|---|---|---|
| Ngữ nghĩa | "Hãy làm X" | "X **đã** xảy ra" |
| Thì | Mệnh lệnh — `SendInvoice` | Quá khứ — `InvoiceSent` |
| Người nhận | Đúng một | 0..n, người gửi không cần biết |
| Từ chối được không | Có | Không — đã xảy ra rồi |
| Ai phụ thuộc ai | Caller biết callee | Consumer biết schema, producer không biết consumer |

Đặt tên sai (`OrderShouldBeShipped` là command đội lốt event) là dấu hiệu ranh giới sai.

## 2. Ba mẫu giao tiếp
| Mẫu | Công cụ | Dùng khi |
|---|---|---|
| **Queue (điểm-điểm)** | SQS, RabbitMQ, Sidekiq | Một việc, một consumer → [[Background Jobs and Queues]] |
| **Pub/Sub (fan-out)** | Kafka, NATS, SNS, Redis Streams | Nhiều bên quan tâm cùng sự kiện |
| **Event log (có thể replay)** | **Kafka** | Consumer mới cần đọc lại lịch sử; xây lại read model |

Kafka khác queue truyền thống ở chỗ: message **không bị xoá khi đọc**; consumer giữ **offset** của riêng mình → replay được. → [[Data Sourcing Design]]

## 3. Ba pattern phải biết
### Transactional Outbox
Vấn đề: ghi DB **và** publish message không thể nằm trong một transaction → mất event hoặc publish event của transaction đã rollback.
Giải: trong cùng transaction, ghi bản ghi vào bảng `outbox`; một tiến trình riêng (poller hoặc CDC) đọc `outbox` và publish. → [[Database Access and ORM]]

### Saga — transaction phân tán không cần 2PC
Chuỗi bước cục bộ, mỗi bước có **compensating action**:
```
ReserveStock → ChargePayment → ShipOrder
     ↑ nếu ChargePayment fail: ReleaseStock (bù trừ)
```
- **Choreography** (mỗi service nghe event của nhau): đơn giản lúc đầu, khó nhìn tổng thể sau.
- **Orchestration** (một service điều phối): dễ theo dõi, nhưng orchestrator dễ phình.

### Idempotent Consumer
At-least-once là mặc định → mọi consumer phải khử trùng lặp theo `event_id`. Chi tiết cách làm: → [[Background Jobs and Queues]]

## 4. Eventual consistency — hệ quả phải chấp nhận
Dữ liệu sẽ **tạm thời không khớp** giữa các service. Điều này phải được thiết kế vào cả UX, không chỉ backend:
- Sau khi đặt hàng, trạng thái là `processing`, không phải `paid`.
- Read model có thể trễ vài trăm ms → tránh "đọc lại ngay cái vừa ghi" từ read model khác.
- Nghiệp vụ nào **bắt buộc** nhất quán mạnh (số dư, tồn kho tại điểm bán) thì giữ trong **một** transaction, một service. → [[Monolith vs Microservices]]

## 5. Cạm bẫy
- **Event chứa quá ít dữ liệu** → consumer phải gọi ngược lại producer → lại coupling. Cân nhắc "event-carried state transfer" (event mang đủ trạng thái cần).
- **Event chứa quá nhiều dữ liệu / dữ liệu nhạy cảm** → message lớn, rò rỉ PII.
- **Không version hoá event** — thêm field bắt buộc phá vỡ consumer cũ. Áp dụng cùng luật của [[API Versioning and Contracts]].
- **Giả định thứ tự toàn cục** — Kafka chỉ đảm bảo thứ tự **trong một partition**; chọn key phân vùng theo entity id.
- **Không có DLQ + alert** — event lỗi biến mất trong im lặng.
- **Publish trước khi commit DB** — publish event của dữ liệu chưa tồn tại; đó là lý do có outbox.
- **Debug bằng mắt** — không có tracing xuyên event thì không lần được luồng. → [[Observability]]
- **Dùng event cho mọi thứ** — một lời gọi HTTP đồng bộ đơn giản thường là câu trả lời đúng.

## 6. Checklist
- [ ] Event được đặt tên ở **thì quá khứ** và mô tả sự thật nghiệp vụ?
- [ ] Có outbox (hoặc CDC) để đảm bảo ghi DB và publish là nguyên tử?
- [ ] Mọi consumer đều idempotent theo `event_id`?
- [ ] Schema event có registry và kiểm tra breaking change?
- [ ] Partition key có đảm bảo thứ tự cho từng entity không?
- [ ] Có DLQ, alert khi DLQ tăng, và quy trình replay?
- [ ] Đã xác định rõ chỗ nào **bắt buộc** nhất quán mạnh và giữ nó trong một transaction chưa?
- [ ] Có trace id truyền theo event để lần lại toàn luồng không?

## Tham khảo
- Chris Richardson — Saga pattern: https://microservices.io/patterns/data/saga.html
- Chris Richardson — Transactional outbox: https://microservices.io/patterns/data/transactional-outbox.html
- Martin Fowler — *What do you mean by "Event-Driven"?*: https://martinfowler.com/articles/201701-event-driven.html
- Confluent — Kafka design & delivery guarantees: https://docs.confluent.io/kafka/design/delivery-semantics.html
- Debezium (CDC): https://debezium.io/documentation/reference/stable/
- *Designing Data-Intensive Applications*, ch.11 — Stream Processing: https://dataintensive.net/

## Liên kết
[[Background Jobs and Queues]] · [[Monolith vs Microservices]] · [[Domain-Driven Design]] · [[Data Sourcing Design]] · [[Backend]]
