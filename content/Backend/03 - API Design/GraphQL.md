---
tags: [backend, api, graphql]
status: growing
---
# GraphQL

> Cho phép **client chủ động định nghĩa cấu trúc dữ liệu trả về**, giải quyết triệt để over-fetching (nhận thừa field) và under-fetching (phải gọi 3 endpoint mới đủ dữ liệu). Đổi lại: độ phức tạp chuyển từ client sang server.

## 1. Ba loại operation & bộ khái niệm
| Khái niệm | Vai trò |
|---|---|
| **Schema (SDL)** | Hợp đồng duy nhất, có kiểu mạnh, là tài liệu luôn đúng |
| **Query** | Đọc — song song được |
| **Mutation** | Ghi — chạy tuần tự theo thứ tự khai báo |
| **Subscription** | Nhận dữ liệu đẩy liên tục (WebSocket/SSE) |
| **Resolver** | Hàm trả dữ liệu cho **một field** |
| **Fragment** | Mảnh query tái sử dụng, thường gắn với một UI component |

Một endpoint duy nhất (`POST /graphql`), luôn trả `200` — lỗi nằm trong mảng `errors`. Đây là điểm khác REST khiến monitoring phải cấu hình riêng.

## 2. REST vs GraphQL
| | REST | GraphQL |
|---|---|---|
| Hình dạng response | Server quyết | **Client quyết** |
| Số round-trip cho màn hình phức tạp | Nhiều | Một |
| Cache HTTP | Sẵn có (`ETag`, CDN) | **Khó** — mọi thứ là POST; phải cache ở tầng ứng dụng |
| Versioning | Bằng URL/header → [[API Versioning and Contracts]] | Tiến hoá schema + `@deprecated` |
| Rate limiting | Đếm request | Phải tính **query cost** |
| Quan sát | Theo endpoint | Theo field/operation name — cần setup riêng |
| Hợp với | API công khai, hệ thống đơn giản | Nhiều client khác nhau (web/mobile), dữ liệu quan hệ phức tạp |

## 3. N+1 — vấn đề trung tâm
Resolver chạy theo từng field, từng phần tử → truy vấn `posts` trả 50 bài, mỗi bài resolve `author` = 50 truy vấn.
**Lời giải bắt buộc: DataLoader** — gom (batch) các lời gọi trong cùng một tick của event loop thành một truy vấn `WHERE id IN (...)`, kèm cache theo request. Mọi triển khai GraphQL production đều cần nó. → [[Database Access and ORM]]

## 4. Bảo mật riêng của GraphQL
- **Query depth limit** — chặn `user { friends { friends { friends ... } } }`.
- **Query complexity/cost analysis** — gán cost cho field, đặt ngân sách cho mỗi client.
- **Persisted queries (allowlist)** — production chỉ chấp nhận các query đã đăng ký; đây là biện pháp mạnh nhất.
- **Tắt introspection** ở API công khai nhạy cảm (không phải bảo mật thật, chỉ giảm bề mặt).
- **Phân quyền ở tầng field/resolver**, không phải ở tầng endpoint — vì không còn endpoint. → [[Authentication and Authorization]]
- Giới hạn kích thước và thời gian chạy của mỗi operation. → [[Backend Security]]

## 5. Cạm bẫy
- **Không dùng DataLoader** — hệ thống chết vì N+1 ngay khi có tải thật.
- **Map 1-1 schema GraphQL với bảng DB** — mất luôn giá trị của việc mô hình hoá theo domain. → [[Domain-Driven Design]]
- **Quên phân trang cho list field** — client hỏi `posts` là kéo cả bảng; dùng chuẩn **Relay Connection** (`edges`, `pageInfo`, cursor).
- **Lỗi trả `200`** — alert dựa trên status code sẽ không bao giờ kêu.
- **Đặt GraphQL trước một mớ microservice** rồi biến nó thành nơi tổng hợp không ai hiểu; cân nhắc Federation có chủ đích.
- **Mutation không idempotent** — cùng vấn đề như REST. → [[Background Jobs and Queues]]

## 6. Checklist
- [ ] Mọi resolver quan hệ đều đi qua DataLoader?
- [ ] Có giới hạn **depth** và **complexity** cho mỗi query?
- [ ] List field dùng cursor pagination (Relay Connection)?
- [ ] Phân quyền được kiểm tra ở tầng field, không chỉ ở tầng gateway?
- [ ] Có persisted queries hoặc allowlist ở production?
- [ ] Monitoring tách theo `operationName` và đếm lỗi trong `errors[]`?
- [ ] Thay đổi schema có được kiểm tra breaking-change tự động không?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| GraphQL Yoga / Apollo Server | Server JS/TS | https://the-guild.dev/graphql/yoga-server |
| Strawberry / Graphene | Server Python | https://strawberry.rocks/ |
| gqlgen | Server Go, schema-first | https://gqlgen.com/ |
| async-graphql | Server Rust | https://async-graphql.github.io/async-graphql/ |
| GraphQL Inspector | Bắt breaking change trong CI | https://the-guild.dev/graphql/inspector |

## Tham khảo
- GraphQL — Learn: https://graphql.org/learn/
- GraphQL Best Practices: https://graphql.org/learn/best-practices/
- DataLoader: https://github.com/graphql/dataloader
- Relay Cursor Connections Specification: https://relay.dev/graphql/connections.htm
- OWASP — GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html
- Apollo — Federation: https://www.apollographql.com/docs/federation/

## Liên kết
[[REST API Design]] · [[gRPC and Protobuf]] · [[Database Access and ORM]] · [[Backend]]
