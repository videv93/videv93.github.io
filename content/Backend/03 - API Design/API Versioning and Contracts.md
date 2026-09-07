---
tags: [backend, api, contract]
status: growing
---
# API Versioning and Contracts

> Câu hỏi thật không phải "đánh version thế nào", mà là: **làm sao thay đổi API mà không làm hỏng client mình không kiểm soát được.** Version chỉ là một trong các công cụ.

## 1. Breaking hay không breaking
| Thay đổi | Breaking? |
|---|---|
| Thêm field **tuỳ chọn** vào response | ❌ (nếu client bỏ qua field lạ) |
| Thêm field **bắt buộc** vào request | ✅ |
| Xoá / đổi tên field | ✅ |
| Đổi kiểu dữ liệu (`"1"` → `1`) | ✅ |
| Thu hẹp miền giá trị (bớt giá trị enum được nhận) | ✅ |
| Thêm giá trị enum vào response | ⚠️ Breaking với client dùng `switch` không có default |
| Đổi status code trả về | ✅ |
| Siết validation chặt hơn | ✅ (dữ liệu đang chạy được bỗng bị từ chối) |
| Đổi thứ tự mặc định của list | ⚠️ Client dựa vào thứ tự sẽ hỏng |
| Đổi **nghĩa** của field mà giữ nguyên tên | ✅ — loại tệ nhất, vì im lặng |

**Robustness principle** áp dụng cho client: bỏ qua field không biết, đừng fail khi thấy giá trị enum lạ.

## 2. Bốn cách đánh version
| Cách | Ví dụ | Ưu / Nhược |
|---|---|---|
| **URL path** | `/v1/users` | Rõ ràng, cache/route dễ / bùng nổ code trùng lặp |
| **Header** | `Accept: application/vnd.api+json;version=2` | URL sạch / khó test bằng trình duyệt, dễ bị quên |
| **Query param** | `?version=2` | Đơn giản / bẩn, dễ bị proxy bỏ qua |
| **Date-based** | `Stripe-Version: 2026-08-27` | Client "đóng băng" ở một ngày; server dịch dữ liệu giữa các version | Cần hạ tầng transform, nhưng là mô hình bền nhất |

Thực dụng: **URL path `/v1` cho API công khai** + tiến hoá cộng dồn bên trong `v1`; chỉ lên `v2` khi thật sự phải phá vỡ.

## 3. Tiến hoá thay vì đánh version (ưu tiên)
1. **Thêm, đừng sửa** — field mới song song với field cũ.
2. **Expand & contract** cho mọi thay đổi: (1) thêm cái mới, (2) client chuyển dần, (3) đo xem còn ai dùng cái cũ, (4) xoá. Áp dụng cả cho DB migration. → [[Deployment and Configuration]]
3. **Đánh dấu `@deprecated`** trong spec kèm ngày dự kiến gỡ.
4. **Đo mức sử dụng theo field/endpoint** — không có số liệu thì không bao giờ dám xoá.

## 4. Contract & test
| Kỹ thuật | Bắt được gì |
|---|---|
| **OpenAPI/`.proto` là nguồn sự thật** | Lệch giữa tài liệu và thực tế |
| **Spec linting** (Spectral, `buf lint`) | Vi phạm style guide |
| **Breaking-change check trong CI** (`oasdiff`, `buf breaking`, GraphQL Inspector) | Phá hợp đồng *trước khi merge* |
| **Consumer-driven contract testing** (Pact) | Server đổi làm hỏng consumer cụ thể nào |
| **Schema-based fuzzing** (Schemathesis) | Endpoint không tuân thủ chính spec của nó |

Nguyên tắc: **spec phải sinh từ code hoặc code sinh từ spec** — hai bản viết tay song song sẽ lệch trong vòng một tháng.

## 5. Vòng đời deprecation
```
Thông báo → Deprecated (vẫn chạy, có cảnh báo) → Sunset (ngày tắt công bố) → Xoá
```
- Header `Deprecation` và `Sunset` (RFC 8594) để báo bằng máy.
- Với API nội bộ: tối thiểu một chu kỳ release. Với API công khai: tính bằng quý, và phải có thông báo chủ động.
- **Brownout** (tắt thử vài phút vào giờ thấp điểm) là cách tốt để tìm client còn sót.

## 6. Cạm bẫy
- **Đánh version cả API khi chỉ một endpoint đổi** — kéo mọi client đi theo vô ích.
- **Duy trì `v1` và `v2` bằng cách copy code** — hai bản phân kỳ, bug fix chỉ vào một bên.
- **Không bao giờ xoá version cũ** — chi phí bảo trì tích luỹ vĩnh viễn.
- **Không biết ai đang dùng gì** — thiếu metric theo version/client. → [[Observability]]
- **Coi API nội bộ là "muốn đổi sao cũng được"** — trong microservice, mọi API đều là API công khai với ai đó. → [[Monolith vs Microservices]]
- **Version hoá event/message nhưng quên consumer cũ** — cùng bài toán, khó hơn. → [[Event-Driven Architecture]]

## 7. Checklist trước khi merge một thay đổi API
- [ ] Thay đổi này có nằm trong bảng "breaking" ở mục 1 không?
- [ ] CI có chạy kiểm tra breaking change trên spec không?
- [ ] Field mới là **optional** và có giá trị mặc định hợp lý?
- [ ] Nếu là breaking: đã có kế hoạch expand & contract và ngày sunset chưa?
- [ ] Tài liệu/spec được sinh tự động, đã cập nhật?
- [ ] Có metric theo dõi ai còn dùng đường cũ không?
- [ ] Client SDK (nếu có) đã được sinh lại và release chưa?

## Tham khảo
- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- RFC 8594 — The Sunset HTTP Header Field: https://www.rfc-editor.org/rfc/rfc8594.html
- Stripe — API versioning: https://docs.stripe.com/api/versioning
- Pact — Consumer-driven contract testing: https://docs.pact.io/
- `oasdiff` — OpenAPI breaking change detector: https://github.com/oasdiff/oasdiff
- Google AIP-180 — Backwards compatibility: https://google.aip.dev/180

## Liên kết
[[REST API Design]] · [[gRPC and Protobuf]] · [[Testing Backend]] · [[Backend]]
