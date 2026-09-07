---
tags: [backend, data, pipeline]
status: growing
---
# Data Sourcing Design

> **Source là phần duy nhất của pipeline bạn không kiểm soát.** Bạn thường không sở hữu nó, không biết ai đổi gì, và chỉ phát hiện sự cố khi nó đã lan xuống downstream. Note này chưng cất 11 câu hỏi phải trả lời **trước khi** viết dòng code ingest đầu tiên.
> Nguồn: [[Data engineering system design 11 data sourcing problems]] (Vu Trinh) — clipping gốc giữ nguyên trong cùng thư mục.

## 0. Câu hỏi số 0: **ai sở hữu source này?**
Là sản phẩm có team on-call, hay một side project ai đó dựng 2 năm trước rồi bỏ? Có SLA viết ra không? Họ có báo trước khi deprecate một API version, đổi tên field, hay migrate sang DB khác không?
> Giao tiếp với team/vendor sở hữu source quan trọng ngang với phần kỹ thuật.

## 1. Mười một câu hỏi
| # | Câu hỏi | Quyết định điều gì |
|---|---|---|
| 1 | **Kiểu source là gì?** | Hạ tầng, kiểu kết nối, failure mode |
| 2 | **Bao lâu chạm source một lần?** | Batch hay streaming; cách biết cái gì mới |
| 3 | **Việc đọc ảnh hưởng hiệu năng source thế nào?** | Read replica, giới hạn tốc độ, giờ chạy |
| 4 | **Source giữ dữ liệu bao lâu?** | Cửa sổ backfill; mất dữ liệu nếu pipeline chết lâu hơn retention |
| 5 | **Source có đủ field mình cần không?** | Phải xin thêm, hay phải join từ nguồn khác |
| 6 | **Schema đổi thì làm sao biết?** | Contract, schema registry, cảnh báo |
| 7 | **Truy cập bằng cách nào?** | Credential, mạng, quyền, xoay khoá |
| 8 | **Đọc được đúng-một-lần không?** | Idempotency, khử trùng lặp |
| 9 | **Source xử lý xoá thế nào?** | Hard delete vô hình với timestamp-based |
| 10 | **Hợp đồng chất lượng dữ liệu là gì?** | Kiểm tra gì, ai chịu trách nhiệm khi sai |
| 11 | **Source có sẵn sàng khi mình cần không?** | SLA, giờ bảo trì, chiến lược retry |

## 2. Câu 1 — Pull hay Push
| | **Pull-based** ("knock knock, cho tôi dữ liệu") | **Push-based** ("im đi và nhận dữ liệu") |
|---|---|---|
| Ví dụ | Database (Postgres/MySQL), REST/GraphQL API, file trên S3, **Kafka** (consumer poll broker) | **Webhook**, vendor bắn dữ liệu vào endpoint của bạn |
| Bạn phải lo | Pagination, rate limit, lịch chạy, ảnh hưởng lên source | **Luôn sẵn sàng nhận**, hấp thụ được đỉnh tải, xác thực chữ ký |
| Hạ tầng | Scheduler/orchestrator, read replica | Receiver + queue đệm → [[Webhooks]] |

Lưu ý: **Kafka cũng là pull** — consumer liên tục poll broker, không phải broker đẩy.

## 3. Câu 2 — "Cái gì mới?" (phần khó nhất)
| Cách | Cơ chế | Rủi ro |
|---|---|---|
| **Timestamp-based** | `WHERE updated_at > last_run` | Hỏng khi ai đó update mà không nâng `updated_at`; lệch đồng hồ; bản ghi ghi trễ trong transaction dài |
| **Overlap date range** | Mỗi lần lấy lại X ngày gần nhất, dedup downstream (last-come first-served) | Tốn tài nguyên; chỉ bắt được thay đổi trong cửa sổ X |
| **Offset-based** | Consumer nhớ offset (Kafka) | Reset offset sai → mất hoặc lặp dữ liệu |
| **CDC** | Source phát mọi thay đổi thành event — **đáng tin cậy nhất, phức tạp nhất** | Cần quyền replication, vận hành Debezium/connector |
| **Full refresh** | Lấy lại toàn bộ | Đúng cho bảng tham chiếu nhỏ, ổn định |

> **Đừng over-engineer độ tươi.** Người dùng xem dashboard mỗi ngày một lần (và gọi dữ liệu cập nhật hằng ngày là "real-time") thì không có lý do gì dựng streaming pipeline.
> Câu này gắn chặt với câu hỏi ở tầng serving: *"dữ liệu cũ tới mức nào thì bị coi là stale?"*

## 4. Câu 3–11 — rút gọn thành nguyên tắc hành động
- **(3) Bảo vệ source**: đọc từ **read replica**, giới hạn concurrency, chạy vào giờ thấp điểm, tôn trọng rate limit và `Retry-After`. → [[Resilience Patterns]]
- **(4) Retention**: biết source giữ dữ liệu bao lâu (Kafka 7 ngày? API chỉ cho 90 ngày?) — nó là **hạn chót phục hồi** khi pipeline chết.
- **(5) Thiếu field**: phát hiện sớm bằng cách map yêu cầu nghiệp vụ → field trước khi code; nếu phải join nhiều nguồn, chi phí tăng gấp bội.
- **(6) Schema đổi**: có schema registry/contract test, và **fail sớm, ồn ào** thay vì âm thầm ghi `null`. → [[API Versioning and Contracts]]
- **(7) Truy cập**: credential trong secret manager, có kế hoạch xoay khoá, quyền tối thiểu. → [[Deployment and Configuration]]
- **(8) Exactly-once**: thực tế là **at-least-once + khử trùng lặp** theo khoá tự nhiên. → [[Background Jobs and Queues]]
- **(9) Xoá**: hard delete **vô hình** với timestamp-based extraction → cần soft delete, tombstone event, hoặc reconcile định kỳ.
- **(10) Chất lượng**: viết ra kiểm tra cụ thể (not null, uniqueness, khoảng giá trị, số dòng lệch bao nhiêu %) và ai được gọi khi nó fail.
- **(11) Sẵn sàng**: biết giờ bảo trì của source; thiết kế retry + backoff và cảnh báo khi bỏ lỡ cửa sổ chạy.

## 5. Cạm bẫy
- **Giả định `updated_at` luôn đúng** — sai lầm phổ biến nhất của ingest.
- **Không có backfill từ đầu** — tới khi cần chạy lại 6 tháng dữ liệu thì phát hiện source đã hết retention.
- **Đọc thẳng DB production** của team khác mà không báo → sự cố hiệu năng của họ, lỗi của bạn.
- **Bỏ qua xoá** → downstream giữ dữ liệu ma vĩnh viễn.
- **Pipeline im lặng khi source trống** — 0 dòng nên là **cảnh báo**, không phải thành công.
- **Không lưu dữ liệu thô** — mất khả năng chạy lại khi phát hiện lỗi transform.

## 6. Checklist trước khi build một ingestion pipeline
- [ ] Biết **ai sở hữu** source và có kênh liên lạc với họ chưa?
- [ ] Source là pull hay push? Hạ tầng tương ứng đã có chưa?
- [ ] Chiến lược "cái gì mới" là gì, và nó hỏng trong tình huống nào?
- [ ] Retention của source dài hơn thời gian phục hồi tối đa của bạn không?
- [ ] Có phát hiện được **schema change** trước khi nó phá downstream không?
- [ ] Đọc lại hai lần có gây trùng dữ liệu không?
- [ ] Xoá ở source được phản ánh thế nào?
- [ ] Có kiểm tra chất lượng dữ liệu tự động + alert (kể cả trường hợp 0 dòng)?
- [ ] Có lưu dữ liệu thô (raw layer) để replay không?
- [ ] Đã đo ảnh hưởng của việc đọc lên hiệu năng source chưa?

## Tham khảo
- Vu Trinh — *Data engineering system design: 11 data sourcing problems*: https://substack.com/home/post/p-194761871
- *Fundamentals of Data Engineering* — Reis & Housley (O'Reilly), ch. Generation & Ingestion
- Debezium — CDC documentation: https://debezium.io/documentation/reference/stable/
- Confluent — Delivery semantics: https://docs.confluent.io/kafka/design/delivery-semantics.html
- dbt — Data tests: https://docs.getdbt.com/docs/build/data-tests
- Great Expectations (kiểm thử chất lượng dữ liệu): https://greatexpectations.io/

## Liên kết
[[Data engineering system design 11 data sourcing problems]] · [[Event-Driven Architecture]] · [[Webhooks]] · [[Background Jobs and Queues]] · [[Backend]]
