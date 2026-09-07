---
tags: [backend, testing]
status: growing
---
# Testing Backend

> Mục tiêu của test không phải là "độ phủ" mà là **tự tin deploy vào chiều thứ Sáu**. Test tốt là test fail khi hành vi sai và **không** fail khi bạn refactor.

## 1. Kim tự tháp (và biến thể thực dụng)
| Tầng | Số lượng | Tốc độ | Kiểm tra |
|---|---|---|---|
| **Unit** | Nhiều | ms | Logic thuần: quy tắc nghiệp vụ, tính toán, edge case → [[Domain-Driven Design]] |
| **Integration** | Vừa | 10–100ms | Code ↔ DB/cache/queue thật (qua testcontainers) |
| **API / contract** | Vừa | 100ms | HTTP vào → JSON ra, status code, phân quyền → [[API Versioning and Contracts]] |
| **E2E** | Rất ít | giây–phút | Vài luồng tiền quan trọng nhất |

Biến thể hay dùng hơn: **"testing trophy"** — dồn trọng lượng vào tầng integration/API, vì đó là nơi bug thật sống. Unit test cho phần có logic dày; đừng unit-test controller rỗng.

## 2. Test double — dùng đúng loại
| Loại | Nghĩa | Nên dùng khi |
|---|---|---|
| **Fake** | Triển khai thật nhưng đơn giản (repo in-memory) | ⭐ Mặc định — test không dính vào cách triển khai → [[Repository Pattern and Service Layer]] |
| **Stub** | Trả giá trị cố định | Cần một câu trả lời cụ thể |
| **Mock** | Kiểm tra *lời gọi đã xảy ra* | Chỉ khi tương tác **chính là** hành vi cần kiểm (đã gửi email chưa) |
| **Spy** | Ghi lại lời gọi để kiểm tra sau | Tương tự mock, nhẹ hơn |

> **Đừng mock cái mình không sở hữu.** Với SDK bên thứ ba, bọc bằng adapter của mình rồi fake adapter đó; hoặc dùng HTTP stub (`wiremock`, `vcr`, `responses`). → [[Clean Architecture]]

## 3. Test với database
- **Dùng DB thật** (Postgres qua **Testcontainers**), không dùng SQLite thay Postgres — hành vi khác nhau ở đúng chỗ quan trọng (kiểu dữ liệu, khoá, transaction).
- Cô lập giữa các test: transaction rollback sau mỗi test (nhanh) hoặc truncate (an toàn hơn với code tự mở transaction).
- **Factory > fixture**: tạo dữ liệu ngay trong test, chỉ khai báo thứ liên quan tới test đó.
- **Test đếm số truy vấn** cho endpoint nóng để chặn N+1 quay lại. → [[Database Access and ORM]]
- Migration cũng phải được test: chạy migration lên DB rỗng **và** lên DB có dữ liệu.

## 4. Những thứ hay bị quên
- **Test phân quyền**: với mỗi endpoint, thử bằng người dùng khác/tenant khác → phải `403`/`404`. Đây là test bắt IDOR. → [[Authentication and Authorization]]
- **Test idempotency**: gọi hai lần, kết quả phải như một lần. → [[Background Jobs and Queues]]
- **Test đường lỗi**: dependency timeout, trả 500, trả dữ liệu méo. → [[Resilience Patterns]]
- **Property-based testing** cho parser, tính toán, serialize (Hypothesis, fast-check, `quickcheck`) — tìm edge case bạn không nghĩ ra.
- **Contract test** với consumer khi có nhiều service. → [[Monolith vs Microservices]]

## 5. Cạm bẫy
- **Test dính vào cách triển khai** — mock chi tiết từng lời gọi → refactor là đỏ hết, dù hành vi không đổi.
- **Đuổi theo % coverage** — 100% coverage với assert yếu vẫn không bắt được bug. Coverage là chỉ báo, không phải mục tiêu.
- **Test phụ thuộc thứ tự / dùng chung state** — xanh cục bộ, đỏ trên CI.
- **Flaky test** vì `sleep` và thời gian thật — tiêm clock, chờ theo điều kiện, không chờ theo giây.
- **Test dùng mạng thật** — chậm, giòn, phụ thuộc bên thứ ba.
- **Chỉ test happy path** — bug sống ở nhánh lỗi.
- **E2E quá nhiều** — chậm, hay hỏng, khó chẩn đoán; giữ số lượng rất nhỏ và chỉ cho luồng sống còn.
- **Không có dữ liệu thời gian/múi giờ trong test** — bug UTC/local chỉ nổ ở production.

## 6. Checklist
- [ ] Test chạy được **song song** và không phụ thuộc thứ tự?
- [ ] Toàn bộ suite unit+integration chạy dưới ~2 phút? (nếu lâu hơn, người ta sẽ ngừng chạy)
- [ ] Có test cho phân quyền (người dùng khác không truy cập được)?
- [ ] Có test cho đường lỗi của mỗi dependency ngoài?
- [ ] Test dùng DB thật qua testcontainers, không phải DB giả?
- [ ] Có test đếm số truy vấn cho endpoint nóng?
- [ ] Có flaky test nào đang bị `skip` mà không ai sửa?
- [ ] Test có fail khi hành vi sai, và **không** fail khi chỉ đổi cấu trúc nội bộ?
- [ ] CI chạy cùng phiên bản runtime/DB như production?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Testcontainers | Dựng DB/queue thật trong test | https://testcontainers.com/ |
| WireMock | Giả lập HTTP của bên thứ ba | https://wiremock.org/ |
| Hypothesis / fast-check | Property-based testing | https://hypothesis.readthedocs.io/ |
| Pact | Consumer-driven contract test | https://docs.pact.io/ |
| Schemathesis | Fuzz API từ OpenAPI | https://schemathesis.readthedocs.io/ |
| Toxiproxy | Giả lập mạng lỗi/chậm | https://github.com/Shopify/toxiproxy |

## Tham khảo
- Martin Fowler — *TestPyramid*: https://martinfowler.com/bliki/TestPyramid.html
- Martin Fowler — *Mocks Aren't Stubs*: https://martinfowler.com/articles/mocksArentStubs.html
- Google Testing Blog — *Test Sizes*: https://testing.googleblog.com/2010/12/test-sizes.html
- Kent C. Dodds — *The Testing Trophy*: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
- *Unit Testing: Principles, Practices, and Patterns* — Vladimir Khorikov

## Liên kết
[[Clean Architecture]] · [[Repository Pattern and Service Layer]] · [[Deployment and Configuration]] · [[Backend]]
