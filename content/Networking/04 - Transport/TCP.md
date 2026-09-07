---
tags: [networking, transport, tcp]
status: evergreen
---
# TCP

> Biến kênh best-effort thành **dòng byte tin cậy, có thứ tự, có điều khiển luồng và tắc nghẽn**. Giao thức được nghiên cứu nhiều nhất trong ngành — và vẫn là nơi bug production hay trốn.

## 1. Header và các trường cần thuộc

| Trường | Ý nghĩa thực dụng |
|---|---|
| Src/Dst Port | Cùng với IP tạo thành **4-tuple** định danh kết nối |
| **Sequence Number** | Vị trí byte đầu tiên của segment trong dòng |
| **ACK Number** | "Tôi đã nhận hết tới byte này − 1", tích luỹ |
| Data Offset | Độ dài header (có options nên thường 32B) |
| **Flags** | SYN, ACK, FIN, RST, PSH, URG, ECE, CWR |
| **Window** | Còn nhận được bao nhiêu byte nữa → **flow control** |
| Checksum | 16-bit, yếu → [[Error Detection]] |
| Options | MSS, **Window Scale**, SACK permitted, Timestamps |

**Window 16 bit = tối đa 64KB** — quá nhỏ cho mạng hiện đại, nên phải có **Window Scaling** (RFC 7323, nhân tới 2^14). Không có nó thì với RTT 100 ms, throughput trần là ~5 Mbps.

## 2. Ba cơ chế trung tâm
1. **Reliability**: seq/ack + retransmit. **Fast retransmit** khi nhận 3 dup-ACK, không đợi timeout. **SACK** cho biết chính xác lỗ hổng nào còn thiếu.
2. **Flow control** — bảo vệ **bên nhận**: cửa sổ quảng bá (rwnd). Bên nhận xử lý chậm → window về 0 → bên gửi dừng (zero-window probe).
3. **Congestion control** — bảo vệ **mạng**: cwnd, do bên gửi tự suy đoán. Lượng gửi = `min(cwnd, rwnd)` → [[TCP Congestion Control]].

**Nagle + delayed ACK**: Nagle gộp gói nhỏ; delayed ACK hoãn ACK tới 40–200 ms. Hai cái gặp nhau gây trễ vô lý cho request-response nhỏ → bật `TCP_NODELAY` cho RPC/interactive.

## 3. Cạm bẫy hay gặp
- **Head-of-line blocking**: một segment mất làm *toàn bộ* dòng byte phía sau bị giữ lại, dù dữ liệu đã tới. Đây là lý do gốc HTTP/2 multiplexing vẫn nghẽn → [[HTTP-2 & HTTP-3]].
- **Quên `TCP_NODELAY`** → độ trễ 40 ms bí ẩn trong RPC nội bộ.
- **Buffer bloat ở tầng ứng dụng**: `SO_SNDBUF` lớn làm dữ liệu nằm chờ trong kernel, huỷ kết nối không huỷ được dữ liệu đã gửi.
- **Nhầm "write() trả về thành công" với "bên kia đã nhận"** — chỉ nghĩa là đã copy vào buffer kernel.
- **`RST` không phải lỗi mạng**: thường là ứng dụng bên kia đóng socket còn dữ liệu chưa đọc, hoặc kết nối tới cổng không có ai nghe.
- **Không bật keepalive** → kết nối chết âm thầm sau NAT/firewall timeout; mặc định Linux là **2 giờ**, quá dài.

## 4. Checklist áp dụng
- [ ] `TCP_NODELAY` đã bật cho kết nối request-response chưa?
- [ ] Window scaling, SACK, timestamps có bật không? (`sysctl net.ipv4.tcp_*`)
- [ ] Keepalive (idle/interval/probes) có ngắn hơn timeout của NAT/LB không?
- [ ] Timeout của ứng dụng có nhỏ hơn timeout của TCP không? (nếu không, người dùng chờ vô hạn)
- [ ] Có đo `retransmits` và `RTT` thật không? (`ss -ti`)
- [ ] Backlog (`somaxconn`, `tcp_max_syn_backlog`) có đủ cho tải đỉnh không? → [[TCP State Machine]]

## Tham khảo
- Peterson & Davie — 5.2 Reliable Byte Stream (TCP): https://book.systemsapproach.org/e2e/tcp.html
- RFC 9293 — *Transmission Control Protocol* (bản hợp nhất, thay RFC 793): https://www.rfc-editor.org/rfc/rfc9293
- RFC 7323 — *TCP Extensions for High Performance*: https://www.rfc-editor.org/rfc/rfc7323
- RFC 2018 — *TCP Selective Acknowledgment*: https://www.rfc-editor.org/rfc/rfc2018
- Stevens — *TCP/IP Illustrated, Vol. 1*

## Liên kết
[[TCP State Machine]] · [[TCP Congestion Control]] · [[UDP]] · [[Socket API]] · [[Networking]]
