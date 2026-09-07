---
tags: [backend, foundation]
status: growing
---
# Backend Fundamentals

> Backend là phần hệ thống chịu trách nhiệm về **sự thật**: dữ liệu nào là đúng, ai được làm gì, và điều gì xảy ra khi hai người cùng bấm nút một lúc. Frontend có thể vẽ lại; backend làm sai là mất dữ liệu.

## 1. Bốn trách nhiệm không thể đẩy sang client
| Trách nhiệm | Vì sao không đặt ở client | Ghi chú |
|---|---|---|
| **Nguồn sự thật của dữ liệu** | Client có thể bị sửa, offline, cũ | → [[Database Access and ORM]] |
| **Xác thực & phân quyền** | Mọi thứ chạy trên máy người dùng đều bị bypass được | → [[Authentication and Authorization]] |
| **Validation nghiệp vụ** | Validation ở client là UX, ở server mới là bảo mật | → [[Backend Security]] |
| **Tính nhất quán khi tranh chấp** | Race condition chỉ giải được ở nơi tuần tự hoá được | transaction, lock, idempotency |

## 2. Vòng đời một HTTP request
```
Client → DNS → CDN/Edge → Load Balancer → Reverse Proxy (nginx)
      → App Server (Puma / Uvicorn / node / Go binary)
      → Middleware (log, auth, rate limit, tracing)
      → Router → Controller/Handler
      → Service Layer (nghiệp vụ)
      → Repository → DB / Cache / API ngoài
      → Serialize response → trả ngược toàn bộ chuỗi trên
```
Mỗi mũi tên là một chỗ có thể **chậm**, **hỏng**, hoặc **cần cache**. Khi debug latency, đi ngược chuỗi này thay vì đoán. → [[Observability]]

## 3. Các trạng thái và nơi lưu chúng
| Loại state | Nơi đúng | Sai lầm thường gặp |
|---|---|---|
| Dữ liệu nghiệp vụ bền vững | Database | Nhét vào cache rồi coi là nguồn sự thật |
| Dữ liệu tính lại được | Cache (Redis) | Không đặt TTL → dữ liệu bẩn vĩnh viễn |
| Phiên người dùng | Cookie ký / Redis | Lưu trong RAM process → scale ra 2 pod là hỏng |
| Việc chạy lâu | Hàng đợi | Chạy đồng bộ trong request → timeout |
| File | Object storage (S3) | Lưu vào ổ đĩa local của container |

**Nguyên tắc vàng:** app server phải **stateless** thì mới scale ngang được. → [[Scaling and Load Balancing]]

## 4. Ba trục đánh giá một backend
1. **Correctness** — có mất/nhân đôi dữ liệu khi lỗi giữa chừng không?
2. **Latency** — p50 dễ đẹp, cái đau nằm ở **p99**. → [[Performance Optimization]]
3. **Operability** — khi 3h sáng nó hỏng, có nhìn ra hỏng ở đâu trong 5 phút không?

## 5. Cạm bẫy hay gặp
- **Tin vào input của client** — kể cả field `role`, `price`, `user_id` gửi từ body.
- **Làm việc nặng trong request** — gửi email, render PDF, gọi API bên thứ ba chậm → đẩy sang [[Background Jobs and Queues]].
- **Không có timeout khi gọi ra ngoài** — một dependency treo kéo sập cả service. → [[Resilience Patterns]]
- **Coi retry là an toàn** — retry mà không idempotent = tính tiền khách hai lần.
- **Log nhưng không correlate** — log không có request ID thì đọc log 10 pod là vô vọng.
- **Tối ưu trước khi đo** — 90% thời gian thường nằm ở một truy vấn N+1 chứ không phải ở ngôn ngữ.

## 6. Checklist khi dựng một service mới
- [ ] Service này có stateless không? Xoá một pod bất kỳ có ảnh hưởng người dùng không?
- [ ] Mọi lệnh gọi ra ngoài đã có timeout **và** retry có giới hạn chưa?
- [ ] Endpoint ghi dữ liệu có idempotent không (hoặc có idempotency key)?
- [ ] Có health check phân biệt *liveness* và *readiness* chưa?
- [ ] Log có request ID xuyên suốt không? → [[Observability]]
- [ ] Config và secret lấy từ env, không hardcode? → [[Deployment and Configuration]]
- [ ] Có ít nhất một test đi hết đường từ HTTP tới DB? → [[Testing Backend]]

## Tham khảo
- *Designing Data-Intensive Applications* — Martin Kleppmann: https://dataintensive.net/
- The Twelve-Factor App: https://12factor.net/
- MDN — An overview of HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
- Google SRE Book — chương *Service Level Objectives*: https://sre.google/sre-book/service-level-objectives/
- System Design Primer: https://github.com/donnemartin/system-design-primer

## Liên kết
[[HTTP and Networking]] · [[Choosing a Backend Language]] · [[Clean Architecture]] · [[Backend]]
