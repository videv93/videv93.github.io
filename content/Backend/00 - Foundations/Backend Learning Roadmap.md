---
tags: [backend, foundation, roadmap]
status: growing
---
# Backend Learning Roadmap

> Lộ trình từ "viết được CRUD" tới "thiết kế được hệ thống phân tán". Mỗi bậc chỉ nên bước lên khi đã **làm hỏng và tự sửa được** ở bậc dưới.

## 1. Bốn bậc năng lực
| Bậc | Làm được gì | Học gì | Note trong vault |
|---|---|---|---|
| **1. CRUD** | Dựng API có auth, nói chuyện với DB | HTTP, SQL, ORM, REST | [[HTTP and Networking]] · [[REST API Design]] · [[Database Access and ORM]] |
| **2. Có cấu trúc** | Code test được, đổi DB/framework không phải viết lại nghiệp vụ | Layer, DI, testing | [[Clean Architecture]] · [[Repository Pattern and Service Layer]] · [[Testing Backend]] |
| **3. Chịu tải** | Service không sập khi dependency sập | Concurrency, cache, queue, resilience | [[Concurrency Models]] · [[Caching Strategies]] · [[Background Jobs and Queues]] · [[Resilience Patterns]] |
| **4. Phân tán** | Thiết kế nhiều service, dữ liệu nhất quán *eventual* | Event-driven, DDD, observability | [[Event-Driven Architecture]] · [[Domain-Driven Design]] · [[Observability]] · [[Monolith vs Microservices]] |

## 2. Trục xuyên suốt (học song song, không tuần tự)
- **Bảo mật** — mỗi bậc thêm một tầng: input validation → authz → secret management. → [[Backend Security]]
- **Vận hành** — log có cấu trúc → metric → trace → SLO. → [[Observability]]
- **Dữ liệu** — index → transaction → migration không downtime. → [[Database Access and ORM]]

## 3. Bài tập buộc phải làm hỏng để hiểu
1. Viết một API rồi **bắn 1000 request đồng thời** bằng `k6` — quan sát p99 và số connection DB.
2. Cố tình tạo **N+1 query**, bật log SQL, rồi sửa bằng eager loading. → [[Database Access and ORM]]
3. Tắt Redis khi app đang chạy — service có sập không? Nếu có thì cache đang là *dependency cứng*, sai. → [[Caching Strategies]]
4. Gọi một API ngoài **không timeout**, cho nó treo 60s — xem cả service chết thế nào. → [[Resilience Patterns]]
5. Gửi cùng một request thanh toán 2 lần — có bị tính tiền đôi không? → [[Webhooks]]
6. Deploy khi đang có migration đổi cột — hiểu vì sao phải làm 2 bước. → [[Deployment and Configuration]]
7. Viết một background job rồi kill worker giữa chừng — job có chạy lại và có an toàn không? → [[Background Jobs and Queues]]

## 4. Thứ tự học ngôn ngữ (gợi ý)
1. **Một ngôn ngữ động để làm nhanh**: Python hoặc Ruby hoặc TypeScript — chọn theo team.
2. **Một ngôn ngữ tĩnh biên dịch**: Go — thay đổi cách nghĩ về concurrency và error handling. → [[Goroutines and Channels]]
3. **Rust** chỉ khi có nhu cầu thật (latency/RAM) hoặc muốn hiểu sâu về bộ nhớ. → [[Rust Backend]]

## 5. Cạm bẫy khi học
- **Học framework thay vì học nguyên lý** — Rails/Django đổi, HTTP và SQL thì không.
- **Nhảy sang microservice quá sớm** — chưa tách được module trong monolith thì tách service chỉ biến lỗi compile thành lỗi runtime. → [[Monolith vs Microservices]]
- **Đọc mà không đo** — mọi kiến thức hiệu năng chỉ dính lại khi tự nhìn thấy con số. → [[Performance Optimization]]
- **Bỏ qua vận hành** — code chạy được ≠ code trực được lúc 3h sáng.

## 6. Checklist tự đánh giá
- [ ] Giải thích được vòng đời một request từ DNS tới DB không nhìn tài liệu?
- [ ] Viết được một truy vấn có index đúng và đọc được `EXPLAIN`?
- [ ] Phân biệt được concurrency và parallelism, biết ngôn ngữ mình dùng thuộc mô hình nào?
- [ ] Có từng tự tay tìm và sửa một sự cố production chưa?
- [ ] Thiết kế được một API mà 6 tháng sau vẫn mở rộng được không phá client? → [[API Versioning and Contracts]]
- [ ] Nói được vì sao chọn stack hiện tại, và điều kiện nào sẽ khiến bạn đổi?

## Tham khảo
- roadmap.sh — Backend Developer: https://roadmap.sh/backend
- System Design Primer: https://github.com/donnemartin/system-design-primer
- *Designing Data-Intensive Applications* — Kleppmann: https://dataintensive.net/
- Use The Index, Luke (SQL indexing): https://use-the-index-luke.com/
- Google SRE Book: https://sre.google/books/

## Liên kết
[[Backend Fundamentals]] · [[Choosing a Backend Language]] · [[Backend]]
