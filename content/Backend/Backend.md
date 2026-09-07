---
tags: [backend, moc]
type: MOC
updated: 2026-08-28
---
# ⚙️ Backend — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng khu vực Backend: ngôn ngữ & runtime, mô hình concurrency, thiết kế API, kiến trúc, tầng dữ liệu, độ tin cậy và bảo mật.
> Phạm vi: **Python, Ruby, JavaScript/TypeScript, Go, Rust** + phần kiến trúc dùng chung cho mọi ngôn ngữ.

## Cách dùng vault này
- **Học theo lộ trình** → [[Backend Learning Roadmap]].
- **Chọn stack cho một dự án mới** → [[Choosing a Backend Language]].
- **Tra cứu nhanh một khái niệm** → dùng tên tiếng Anh của nó làm từ khoá; mỗi khái niệm chỉ được định nghĩa ở **một** note, mọi nơi khác chỉ trỏ wikilink tới.
- Mỗi note có ba tầng: **Khái niệm → Nguyên tắc/Cạm bẫy → Checklist áp dụng**. Học được điều mới thì thêm vào đúng tầng, đừng tạo note mới.
- `status:` trong frontmatter: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).

---

## 00 — Nền tảng
- [[Backend Fundamentals]] — backend thực sự làm gì, vòng đời một request
- [[HTTP and Networking]] — HTTP/1.1 → HTTP/3, status code, header, TLS, keep-alive
- [[Choosing a Backend Language]] — bảng so sánh 5 ngôn ngữ, chọn theo ràng buộc nào
- [[Backend Learning Roadmap]] — lộ trình từ CRUD tới hệ thống phân tán

## 01 — Ngôn ngữ & Runtime
- [[Python Backend]] — FastAPI vs Django, Pydantic, ASGI/WSGI
- [[Ruby on Rails]] — Convention over Configuration, ActiveRecord, Puma
- [[Nodejs and TypeScript Backend]] — Express vs NestJS, V8, Event Loop
- [[Go Backend]] — `net/http`, Gin/Fiber, interface & error handling
- [[Rust Backend]] — Axum/Actix-web, Ownership, Tokio
- [[Rake Tasks in Rails]] — task runner của Rails: định nghĩa, tham số, namespace

## 02 — Concurrency & Async
- [[Concurrency Models]] — thread, process, event loop, coroutine, actor: khi nào dùng gì
- [[Event Loop and Async IO]] — vì sao single-thread lại phục vụ được vạn kết nối
- [[Python GIL and Asyncio]] — giới hạn GIL và cách đi vòng
- [[Goroutines and Channels]] — CSP, `select`, context, cạm bẫy leak
- [[Background Jobs and Queues]] — Celery, Sidekiq, BullMQ: idempotency, retry, DLQ

## 03 — Thiết kế API
- [[REST API Design]] — resource, HTTP verb, status code, pagination, filtering
- [[GraphQL]] — schema, resolver, N+1, over/under-fetching
- [[gRPC and Protobuf]] — HTTP/2, streaming, tiến hoá schema
- [[API Versioning and Contracts]] — breaking change, deprecation, contract testing
- [[Webhooks]] — push-based integration: signature, retry, idempotency key

## 04 — Kiến trúc & Mẫu thiết kế
- [[Clean Architecture]] — Hexagonal/Ports & Adapters, quy tắc phụ thuộc
- [[Repository Pattern and Service Layer]] — tách truy vấn khỏi nghiệp vụ để test được
- [[Monolith vs Microservices]] — chi phí thật của việc chia nhỏ
- [[Event-Driven Architecture]] — pub/sub, outbox, saga, eventual consistency
- [[Domain-Driven Design]] — ubiquitous language, bounded context, aggregate

## 05 — Tầng dữ liệu
- [[Database Access and ORM]] — connection pool, transaction, N+1, migration
- [[Caching Strategies]] — cache-aside, TTL, invalidation, stampede
- [[Search Engines]] — khi nào cần Solr/Elasticsearch thay vì `LIKE '%...%'`
- [[Apache Solr 8 - Schemaless Mode]] — clipping: schemaless mode, tự nhận diện field
- [[Data Sourcing Design]] — 11 câu hỏi phải trả lời trước khi ingest từ một source
- [[Data engineering system design 11 data sourcing problems]] — clipping gốc

## 06 — Độ tin cậy & Hiệu năng
- [[Performance Optimization]] — đo trước khi tối ưu, latency budget, p99
- [[Resilience Patterns]] — timeout, retry + jitter, circuit breaker, bulkhead
- [[Observability]] — log, metric, trace; RED/USE; correlation ID
- [[Scaling and Load Balancing]] — vertical vs horizontal, stateless, sticky session

## 07 — Bảo mật
- [[Backend Security]] — OWASP Top 10 dưới góc nhìn backend
- [[Authentication and Authorization]] — session vs JWT, OAuth2/OIDC, RBAC/ABAC

## 08 — Kiểm thử & Vận hành
- [[Testing Backend]] — kim tự tháp test, test double, testcontainers
- [[Deployment and Configuration]] — 12-Factor, config/secret, migration khi deploy

---

## Nguồn học nền tảng dùng chung
| Nguồn | Dùng để | Link |
|---|---|---|
| *Designing Data-Intensive Applications* — Kleppmann | Sách nền tảng số 1 về hệ thống dữ liệu | https://dataintensive.net/ |
| MDN HTTP | Tra cứu chuẩn HTTP, header, status code | https://developer.mozilla.org/en-US/docs/Web/HTTP |
| OWASP Cheat Sheet Series | Chuẩn bảo mật thực hành | https://cheatsheetseries.owasp.org/ |
| The Twelve-Factor App | Chuẩn cấu hình & vận hành service | https://12factor.net/ |
| Google SRE Book | Vận hành, SLO, xử lý sự cố | https://sre.google/books/ |
| Microservices.io — Chris Richardson | Catalog pattern microservice | https://microservices.io/patterns/ |
| roadmap.sh — Backend | Bản đồ kỹ năng để dò chỗ hổng | https://roadmap.sh/backend |
| System Design Primer | Ôn kiến trúc & phỏng vấn | https://github.com/donnemartin/system-design-primer |

## Ghi chú
- Bản seed gốc (`SEEDS.md` và 3 clipping) được lưu nguyên vẹn ở `_archive-seed/` để đối chiếu. Mọi nội dung trong seed đều đã được đưa vào hệ thống này, chỉ mở rộng chứ không thay thế.
- Quy trình tạo ra vault này: [[Knowledge Seed Playbook]].

## Liên kết
[[Knowledge Seed Playbook]] · [[UIUX]]
