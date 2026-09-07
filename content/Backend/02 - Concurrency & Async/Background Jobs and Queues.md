---
tags: [backend, concurrency, queue]
status: growing
---
# Background Jobs and Queues

> Quy tắc: **request HTTP chỉ nên làm việc mà người dùng phải chờ mới có ý nghĩa.** Gửi email, render PDF, gọi API bên thứ ba, tính báo cáo — đẩy hết ra hàng đợi.

## 1. Bản đồ công cụ theo hệ sinh thái
| Ngôn ngữ | Thư viện | Broker | Ghi chú |
|---|---|---|---|
| Python | **Celery**, RQ, Dramatiq, arq | Redis / RabbitMQ | Celery mạnh nhưng cấu hình phức tạp → [[Python Backend]] |
| Ruby | **Sidekiq** (qua ActiveJob), GoodJob | Redis / Postgres | Chuẩn công nghiệp của Rails → [[Ruby on Rails]] |
| Node | **BullMQ**, Graphile Worker | Redis / Postgres | → [[Nodejs and TypeScript Backend]] |
| Go | asynq, River | Redis / Postgres | Hoặc tự viết với goroutine + DB |
| Đa ngôn ngữ | Kafka, SQS, RabbitMQ, NATS | — | Khi cần fan-out nhiều consumer → [[Event-Driven Architecture]] |

**Postgres cũng là hàng đợi tốt** (`SELECT ... FOR UPDATE SKIP LOCKED`) khi tải vừa phải — bớt được một hạ tầng phải vận hành.

## 2. Ba đảm bảo giao nhận
| Đảm bảo | Thực tế | Hệ quả |
|---|---|---|
| At-most-once | Có thể **mất** job | Chỉ hợp việc không quan trọng |
| **At-least-once** | Có thể **chạy lặp** | Mặc định của hầu hết hệ thống → **bắt buộc idempotent** |
| Exactly-once | Gần như không tồn tại thật ở mức end-to-end | Đạt được bằng at-least-once + khử trùng lặp phía consumer |

> Thiết kế đúng không phải là chống job chạy hai lần, mà là làm cho **job chạy hai lần không gây hại**.

## 3. Idempotency — cách làm thực tế
- Truyền **idempotency key** (id nghiệp vụ, không phải id job) và lưu bảng `processed_events(key PRIMARY KEY)`.
- Dùng **upsert** (`INSERT ... ON CONFLICT DO NOTHING/UPDATE`) thay vì `INSERT` trần.
- Kiểm tra trạng thái trước khi hành động: *"đơn này đã `paid` chưa?"* thay vì *"trừ tiền"*.
- Với API ngoài: gửi kèm `Idempotency-Key` header nếu nhà cung cấp hỗ trợ (Stripe, PayPal). → [[Webhooks]]

## 4. Retry và DLQ
- **Exponential backoff + jitter**, có số lần tối đa. Retry đều đặn không jitter → thundering herd. → [[Resilience Patterns]]
- Phân biệt lỗi **tạm thời** (timeout, 503 → retry) và **vĩnh viễn** (400, dữ liệu sai → đừng retry, đưa thẳng vào DLQ).
- **Dead Letter Queue** — nơi job chết đi để người thật xem, chứ không im lặng biến mất. Phải có alert khi DLQ tăng.
- **Job phải nhỏ và chia được**: xử lý 1 triệu bản ghi trong một job = không retry được. Chia thành job theo batch, mỗi batch ghi lại tiến độ.

## 5. Cạm bẫy
- **Truyền cả object vào job** — khi worker chạy thì dữ liệu đã cũ. **Truyền id**, worker tự đọc lại.
- **Job không idempotent** — nguyên nhân số 1 của "khách bị tính tiền 2 lần".
- **Deploy làm mất job đang chạy** — worker phải xử lý `SIGTERM`: ngừng nhận job mới, chờ job hiện tại xong (graceful shutdown).
- **Một hàng đợi cho mọi việc** — job báo cáo 10 phút chặn mất email đăng ký. Tách queue theo **độ ưu tiên/độ trễ chấp nhận được**.
- **Không giới hạn concurrency của worker** — worker giết chết DB. Số worker × pool ≤ `max_connections`.
- **Không giám sát độ trễ hàng đợi** — chỉ số quan trọng nhất là **queue latency** (chờ bao lâu trước khi được xử lý), không phải số job/giây.
- **Job phụ thuộc thứ tự** — hầu hết queue không đảm bảo thứ tự khi có retry và nhiều worker.

## 6. Checklist trước khi đưa một job lên production
- [ ] Chạy hai lần có an toàn không?
- [ ] Job nhận **id**, không nhận object đã serialize?
- [ ] Có giới hạn số lần retry + backoff có jitter?
- [ ] Lỗi vĩnh viễn có được tách khỏi lỗi tạm thời không?
- [ ] Có DLQ và có alert khi DLQ tăng không?
- [ ] Worker có graceful shutdown khi nhận `SIGTERM`?
- [ ] Có metric: queue depth, queue latency, tỉ lệ fail? → [[Observability]]
- [ ] Job có timeout riêng để không chạy vô hạn?
- [ ] Queue được tách theo độ ưu tiên chưa?

## Tham khảo
- Sidekiq — Best Practices: https://github.com/sidekiq/sidekiq/wiki/Best-Practices
- Celery — Tasks & best practices: https://docs.celeryq.dev/en/stable/userguide/tasks.html
- BullMQ docs: https://docs.bullmq.io/
- Stripe — Idempotent Requests: https://docs.stripe.com/api/idempotent_requests
- AWS — Amazon SQS dead-letter queues: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
- `SKIP LOCKED` làm hàng đợi trong Postgres: https://www.2ndquadrant.com/en/blog/what-is-select-skip-locked-for-in-postgresql-9-5/

## Liên kết
[[Concurrency Models]] · [[Event-Driven Architecture]] · [[Resilience Patterns]] · [[Rake Tasks in Rails]] · [[Backend]]
