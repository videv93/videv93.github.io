---
tags: [networking, application, infra]
status: growing
---
# Load Balancing & Proxy

> Thiết bị đứng giữa client và server — nơi tập trung **phân tải, chấm dứt TLS, retry, và quan sát**. Cũng là nơi tập trung rủi ro: cấu hình sai ở đây ảnh hưởng mọi request.

## 1. L4 vs L7

| | **L4 (transport)** | **L7 (application)** |
|---|---|---|
| Nhìn thấy | IP + port | URL, header, cookie, method |
| Hoạt động | Chuyển tiếp gói/kết nối | **Chấm dứt kết nối**, mở kết nối mới tới backend |
| Định tuyến theo nội dung | Không | Có (path, host, header) |
| TLS termination | Không (trừ passthrough) | Có |
| Chi phí | Thấp, throughput rất cao | Cao hơn |
| Ví dụ | NLB, IPVS, MetalLB | ALB, nginx, Envoy, HAProxy, Traefik |

**Cách chuyển tiếp ở L4**: NAT (viết lại IP đích, phải đi ngược qua LB), **DSR** (server trả thẳng cho client — nhanh, khó vận hành), tunnel (IPIP/GRE).

## 2. Thuật toán phân tải
| Thuật toán | Khi nào dùng |
|---|---|
| Round-robin | Backend đồng nhất, request đồng đều |
| **Least connections** | Request có thời lượng khác nhau nhiều |
| **Least request / EWMA latency** | Tốt nhất cho microservice, phản ánh tải thật |
| Consistent hashing | Cần cache locality hoặc session affinity → thêm/bớt node ít xáo trộn |
| **Power of two choices** | Gần tối ưu với chi phí rất thấp — mặc định tốt |
| Weighted | Backend không đồng nhất, canary |

## 3. Nguyên tắc
1. **Health check phải kiểm tra thứ thật sự quan trọng** — endpoint `/healthz` trả 200 tĩnh không phát hiện được DB chết. Nhưng health check quá sâu lại làm cả cụm cùng unhealthy khi DB chậm.
2. **Tách liveness và readiness**: liveness sai → khởi động lại vô ích; readiness sai → rút backend khỏi cụm khi chỉ cần chờ.
3. **Outlier ejection / circuit breaking** ở LB tốt hơn là để client tự đoán.
4. **Retry ở LB phải có budget** — nếu không, một sự cố nhỏ được khuếch đại thành sự cố lớn → [[RPC & gRPC]].
5. **Truyền IP thật của client** bằng `X-Forwarded-For` (L7) hoặc **PROXY protocol** (L4). Chỉ tin phần header do proxy của mình ghi.
6. **Drain kết nối khi rút backend** (connection draining) để không cắt request đang chạy.

## 4. Cạm bẫy hay gặp
- **Idle timeout không đồng bộ** giữa client, LB và backend → lỗi `502`/`504` ngẫu nhiên. Quy tắc: **backend keep-alive timeout > LB idle timeout**, nếu không LB gửi request vào kết nối server vừa đóng.
- **Sticky session** làm mất khả năng phân tải và biến deploy thành thảm hoạ. Dùng session store bên ngoài.
- **LB L4 với gRPC/HTTP-2** → tải dồn vào vài backend → [[HTTP-2 & HTTP-3]].
- **Tin `X-Forwarded-For` từ Internet** → giả mạo IP, vượt rate limit, vượt IP allowlist.
- **Health check quá dày** → chiếm phần đáng kể tải của backend nhỏ.
- **Chỉ có một LB** → LB thành điểm chết. Cần nhiều AZ + DNS/anycast phía trước.

## 5. Checklist áp dụng
- [ ] Timeout ba tầng (client / LB / backend) đã sắp xếp đúng thứ tự chưa?
- [ ] Backend keep-alive timeout có **lớn hơn** LB idle timeout không?
- [ ] Health check có phản ánh khả năng phục vụ thật không? Có tách liveness/readiness không?
- [ ] Retry có budget và chỉ ở một tầng không?
- [ ] IP client thật lấy từ đâu, và header đó có được LB ghi đè không?
- [ ] Rút backend có drain kết nối không?

## Tham khảo
- Google SRE Book — *Load Balancing in the Datacenter*: https://sre.google/sre-book/load-balancing-datacenter/
- Envoy — Architecture overview: https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/arch_overview
- Mitzenmacher — *The Power of Two Choices in Randomized Load Balancing*: https://www.eecs.harvard.edu/~michaelm/postscripts/handbook2001.pdf
- HAProxy — PROXY protocol: https://www.haproxy.org/download/2.8/doc/proxy-protocol.txt

## Liên kết
[[HTTP]] · [[CDN]] · [[RPC & gRPC]] · [[TCP State Machine]] · [[Networking]]
