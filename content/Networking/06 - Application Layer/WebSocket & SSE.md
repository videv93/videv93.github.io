---
tags: [networking, application, realtime]
status: growing
---
# WebSocket & SSE

> Ba cách đẩy dữ liệu từ server xuống client. Chọn sai làm hệ thống phức tạp gấp đôi mà không được gì — **phần lớn trường hợp SSE là đủ**.

## 1. So sánh

| | **Polling / Long-poll** | **SSE** (Server-Sent Events) | **WebSocket** |
|---|---|---|---|
| Chiều | Client hỏi | **Server → Client** | **Hai chiều** |
| Giao thức | HTTP thường | HTTP thường (`text/event-stream`) | Nâng cấp từ HTTP (`101`) rồi thành frame riêng |
| Tự kết nối lại | Tự làm | **Có sẵn** (`Last-Event-ID`) | Tự làm |
| Qua proxy/firewall | Luôn được | Thường được | Đôi khi bị chặn |
| Nén, cache, HTTP/2 mux | Có | **Có** | Không (kênh riêng) |
| Dữ liệu nhị phân | Có | **Chỉ text** | Có |
| Độ phức tạp | Thấp | Thấp | Cao hơn |

**Quy tắc chọn**: chỉ cần server đẩy (notification, log stream, token LLM) → **SSE**. Cần hai chiều độ trễ thấp (chat, game, collaborative editing) → **WebSocket**. Cần media real-time → WebRTC → [[RTP & Real-Time Transport]].

## 2. Nguyên tắc vận hành
1. **Kết nối dài phải có heartbeat** — ping/pong của WebSocket, comment `:` của SSE — nếu không NAT/proxy sẽ cắt âm thầm (thường 30–60 s) → [[NAT]].
2. **Kết nối lại phải có backoff + jitter**, nếu không server sập một lần rồi bị nghìn client đâm cùng lúc → [[Reliable Transmission]].
3. **Nối lại phải khôi phục được trạng thái**: SSE dùng `Last-Event-ID`; WebSocket phải tự thiết kế sequence/cursor.
4. **Kết nối dài = trạng thái ở server** → khó scale ngang và khó deploy. Cần sticky session hoặc pub/sub bên ngoài (Redis, NATS) để mọi instance đẩy được cho mọi client.
5. **SSE trên HTTP/1.1 chiếm một trong 6 kết nối của trình duyệt** → dùng HTTP/2 để tránh giới hạn.

## 3. Cạm bẫy hay gặp
- **Proxy đệm response** làm SSE không tới được client theo thời gian thực. Cần `X-Accel-Buffering: no` (nginx) và tắt buffering ở CDN.
- **LB idle timeout ngắn hơn heartbeat** → kết nối bị cắt định kỳ, client thấy "chập chờn". Đồng bộ ba con số: heartbeat < NAT timeout < LB idle timeout.
- **Không giới hạn số kết nối/người dùng** → một client lỗi mở hàng nghìn kết nối.
- **Deploy làm rớt toàn bộ kết nối cùng lúc** → thundering herd khi tất cả nối lại. Cần rolling restart + jitter phía client.
- **Dùng WebSocket cho việc mà SSE làm được** — gánh thêm chi phí vận hành không cần thiết.
- **Quên xác thực lại**: WebSocket không gửi cookie ở mỗi message; token hết hạn giữa chừng cần cơ chế làm mới.

## 4. Checklist áp dụng
- [ ] Heartbeat < LB idle timeout < NAT timeout — ba con số này đã kiểm tra chưa?
- [ ] Reconnect có exponential backoff + jitter không?
- [ ] Client nối lại có bỏ sót message không? Có cursor/`Last-Event-ID` không?
- [ ] Proxy/CDN có tắt buffering cho đường stream không?
- [ ] Có giới hạn số kết nối đồng thời mỗi user/IP không?
- [ ] Deploy có làm rớt hết kết nối cùng lúc không?

## Tham khảo
- RFC 6455 — *The WebSocket Protocol*: https://www.rfc-editor.org/rfc/rfc6455
- WHATWG HTML — *Server-Sent Events*: https://html.spec.whatwg.org/multipage/server-sent-events.html
- MDN — Using server-sent events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- RFC 8441 — *Bootstrapping WebSockets with HTTP/2*: https://www.rfc-editor.org/rfc/rfc8441

## Liên kết
[[HTTP]] · [[HTTP-2 & HTTP-3]] · [[Load Balancing & Proxy]] · [[NAT]] · [[Networking]]
