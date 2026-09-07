---
tags: [networking, transport, rpc]
status: growing
---
# RPC & gRPC

> Làm cho lời gọi mạng *trông giống* lời gọi hàm. Tiện — và nguy hiểm, vì **nó che giấu đúng những thứ khác biệt quan trọng nhất**: độ trễ, thất bại một phần, và tính nhất quán.

## 1. Thành phần của một hệ RPC

| Thành phần | Việc |
|---|---|
| **IDL** (Protobuf, Thrift, OpenAPI) | Định nghĩa hợp đồng, sinh code |
| **Stub / marshalling** | Chuyển tham số thành byte → [[Presentation Formatting]] |
| **Transport** | HTTP/2 (gRPC), HTTP/1.1 (REST), TCP thô |
| **Naming / discovery** | Tìm địa chỉ server → [[DNS]], service mesh |
| **Ngữ nghĩa lỗi** | Timeout, retry, deadline, hủy |

**gRPC** = Protobuf + HTTP/2 + streaming hai chiều + deadline + metadata. Bốn kiểu gọi: unary, server-streaming, client-streaming, bidirectional.

## 2. Nguyên tắc
1. **Ngữ nghĩa thực thi**: *at-most-once* (không retry), *at-least-once* (có retry — mặc định thực tế), *exactly-once* (**không tồn tại ở tầng mạng**; chỉ đạt được bằng idempotency key ở tầng ứng dụng) → [[Reliable Transmission]].
2. **Deadline lan truyền (deadline propagation)**: client đặt deadline, mọi lời gọi con thừa hưởng phần thời gian còn lại. Không có nó thì một dịch vụ chậm làm treo cả chuỗi.
3. **Timeout phải nhỏ dần theo độ sâu** của chuỗi gọi, không phải cùng một giá trị ở mọi tầng.
4. **Retry chỉ cho lỗi có thể retry** (`UNAVAILABLE`, `DEADLINE_EXCEEDED` khi chắc chắn chưa thực thi), luôn kèm backoff + jitter, luôn có budget tổng.
5. **Backpressure**: streaming cần flow control; gRPC thừa hưởng của HTTP/2 → [[HTTP-2 & HTTP-3]].

## 3. Cạm bẫy hay gặp
- **Coi RPC như gọi hàm cục bộ** — vòng lặp gọi RPC 1000 lần = 1000 RTT. Batch lại.
- **Retry bão hoà (retry storm)**: mỗi tầng retry 3 lần, 3 tầng = 27 lần tải khi sự cố. Dùng **retry budget** và chỉ retry ở một tầng.
- **gRPC + LB L4**: HTTP/2 giữ một kết nối lâu dài → tải dồn vào một backend. Cần LB L7 hoặc client-side load balancing → [[Load Balancing & Proxy]].
- **Không đặt deadline** → goroutine/thread rò rỉ, tài nguyên treo mãi.
- **Đổi schema không tương thích ngược** — Protobuf chỉ an toàn nếu tuân thủ quy tắc: không đổi số field, không đổi kiểu, không tái sử dụng số đã xoá (`reserved`).
- **Message quá lớn**: gRPC mặc định giới hạn 4 MB; dữ liệu lớn nên dùng streaming hoặc object storage.

## 4. Checklist áp dụng
- [ ] Mọi lời gọi có deadline không? Deadline có được lan truyền không?
- [ ] Thao tác nào idempotent? Khoá idempotency là gì?
- [ ] Retry có budget và jitter chưa? Chỉ ở một tầng chứ?
- [ ] LB có phân tải đúng cho kết nối HTTP/2 dài không?
- [ ] Thay đổi schema có kiểm tra tương thích tự động (buf breaking) không?
- [ ] Có phân biệt lỗi "chưa chạy" và "có thể đã chạy" trong log không?

## Công cụ
| Tên | Dùng để | Link |
|---|---|---|
| `grpcurl` | gọi thử gRPC như curl | https://github.com/fullstorydev/grpcurl |
| `buf` | lint + kiểm tra breaking change Protobuf | https://buf.build/ |
| Wireshark | giải mã gRPC/HTTP-2 khi có khoá | https://www.wireshark.org/ |

## Tham khảo
- Peterson & Davie — 5.3 Remote Procedure Call: https://book.systemsapproach.org/e2e/rpc.html
- Birrell & Nelson — *Implementing Remote Procedure Calls* (1984): https://dl.acm.org/doi/10.1145/2080.357392
- gRPC — Core concepts: https://grpc.io/docs/what-is-grpc/core-concepts/
- Google SRE Book — *Addressing Cascading Failures*: https://sre.google/sre-book/addressing-cascading-failures/

## Liên kết
[[TCP]] · [[HTTP-2 & HTTP-3]] · [[Presentation Formatting]] · [[Load Balancing & Proxy]] · [[Networking]]
