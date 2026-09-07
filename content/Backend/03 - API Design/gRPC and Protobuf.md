---
tags: [backend, api, grpc]
status: growing
---
# gRPC and Protobuf

> Giao tiếp **giữa các microservice** qua HTTP/2 dùng **Protocol Buffers (Protobuf)** — mã hoá nhị phân, hiệu năng cao, và quan trọng nhất: **hợp đồng có kiểu, sinh code cho mọi ngôn ngữ từ một file `.proto`**.

## 1. Vì sao nhanh và chặt
| Yếu tố | Hệ quả |
|---|---|
| Protobuf nhị phân | Payload nhỏ hơn JSON nhiều lần, parse rẻ hơn |
| HTTP/2 multiplexing | Nhiều RPC trên một connection, không head-of-line blocking ở tầng HTTP → [[HTTP and Networking]] |
| Sinh code từ `.proto` | Client và server **không thể lệch nhau về kiểu** |
| Streaming sẵn có | 4 kiểu: unary, server-stream, client-stream, bidirectional |
| Deadline lan truyền | Deadline của caller được truyền xuống toàn chuỗi → [[Resilience Patterns]] |

## 2. Chọn giữa REST / GraphQL / gRPC
| Tình huống | Chọn |
|---|---|
| API công khai cho bên thứ ba, trình duyệt gọi trực tiếp | **REST** → [[REST API Design]] |
| Nhiều client UI khác nhau, dữ liệu quan hệ phức tạp | **GraphQL** → [[GraphQL]] |
| Service ↔ service nội bộ, latency và throughput quan trọng | **gRPC** |
| Trình duyệt cần gọi gRPC | gRPC-Web hoặc Connect (cần proxy/khác biệt hỗ trợ) |
| Giao tiếp bất đồng bộ, fan-out nhiều consumer | Message broker → [[Event-Driven Architecture]] |

## 3. Tiến hoá schema — luật bất di bất dịch
| Việc | An toàn? |
|---|---|
| Thêm field mới với **field number mới** | ✅ |
| Đổi **tên** field (giữ nguyên number) | ✅ về wire, ❌ với code đã sinh |
| Đổi **field number** | ❌ Phá vỡ mọi client |
| Đổi **kiểu** field | ❌ (trừ vài cặp tương thích được ghi trong docs) |
| Xoá field | ⚠️ Phải đánh dấu `reserved <number>, "<name>"` |
| Thêm giá trị enum | ⚠️ Client cũ nhận giá trị lạ — phải có `UNSPECIFIED = 0` và xử lý default |

> **Field number là hợp đồng thật sự**, không phải tên field. Đây là lý do gRPC ít cần versioning kiểu URL. → [[API Versioning and Contracts]]

## 4. Ánh xạ lỗi
gRPC dùng **status code riêng** (`OK`, `INVALID_ARGUMENT`, `NOT_FOUND`, `ALREADY_EXISTS`, `PERMISSION_DENIED`, `UNAUTHENTICATED`, `RESOURCE_EXHAUSTED`, `FAILED_PRECONDITION`, `UNAVAILABLE`, `DEADLINE_EXCEEDED`, `INTERNAL`). Nhóm retry được: `UNAVAILABLE`, `DEADLINE_EXCEEDED` (nếu idempotent), `RESOURCE_EXHAUSTED` (có backoff). Chi tiết bổ sung đặt trong `google.rpc.Status` details.

## 5. Cạm bẫy
- **Không set deadline** — gRPC không có timeout mặc định; RPC treo vô hạn.
- **Load balancing sai tầng**: HTTP/2 giữ connection lâu → L4 load balancer sẽ dồn hết traffic vào một pod. Cần L7 proxy (Envoy, linkerd) hoặc client-side LB.
- **Coi streaming là "miễn phí"** — stream giữ tài nguyên; phải có deadline, backpressure và xử lý reconnect.
- **Message quá lớn** — mặc định giới hạn 4MB; đừng nâng bừa, hãy chuyển sang streaming hoặc object storage.
- **Xoá field mà không `reserved`** — số field bị tái sử dụng sau này → dữ liệu diễn giải sai một cách âm thầm.
- **Không quản lý `.proto` tập trung** — mỗi service một bản copy lệch nhau. Dùng buf registry hoặc một repo schema chung.
- **Debug khó hơn REST** — payload nhị phân, `curl` không dùng được; chuẩn bị sẵn `grpcurl`.

## 6. Checklist
- [ ] Mọi RPC phía client đều set deadline?
- [ ] `.proto` có nguồn duy nhất, được lint và **kiểm tra breaking change** trong CI (`buf breaking`)?
- [ ] Field bị xoá đã `reserved` chưa? Enum có `_UNSPECIFIED = 0` chưa?
- [ ] Có health checking service (`grpc.health.v1`) cho load balancer/k8s?
- [ ] Load balancing ở tầng L7 hoặc client-side?
- [ ] TLS/mTLS giữa các service? → [[Backend Security]]
- [ ] Có interceptor cho log/trace/metric xuyên suốt? → [[Observability]]
- [ ] Có retry policy khai báo trong service config, chỉ áp dụng cho method idempotent?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Buf | Lint, breaking-change detection, sinh code | https://buf.build/ |
| grpcurl | `curl` cho gRPC | https://github.com/fullstorydev/grpcurl |
| grpc-gateway | Sinh REST/JSON proxy từ `.proto` | https://grpc-ecosystem.github.io/grpc-gateway/ |
| Connect | gRPC-tương thích, gọi được từ trình duyệt | https://connectrpc.com/ |

## Tham khảo
- gRPC docs — Core concepts: https://grpc.io/docs/what-is-grpc/core-concepts/
- Protocol Buffers — Language Guide (proto3): https://protobuf.dev/programming-guides/proto3/
- Protobuf — Best practices & schema evolution: https://protobuf.dev/programming-guides/dos-donts/
- gRPC — Status codes: https://grpc.io/docs/guides/status-codes/
- Google API Improvement Proposals (AIP): https://google.aip.dev/

## Liên kết
[[REST API Design]] · [[GraphQL]] · [[Monolith vs Microservices]] · [[Backend]]
