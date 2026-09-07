---
tags: [networking, transport, tcp]
status: growing
---
# TCP State Machine

> Vòng đời một kết nối. **90% sự cố "port cạn kiệt", "connection reset", "kết nối treo" đều đọc được từ máy trạng thái này** cộng với output của `ss -tan`.

## 1. Bắt tay và đóng kết nối

**Mở (3-way handshake)**
```
Client                    Server
  SYN(seq=x)         →           LISTEN → SYN_RECV
        ←  SYN(seq=y) ACK(x+1)
  ACK(y+1)           →           ESTABLISHED
```
Client ở `SYN_SENT` → `ESTABLISHED`. Server dùng **SYN queue** rồi **accept queue**.

**Đóng (4-way)**
```
FIN → | FIN_WAIT_1 ... CLOSE_WAIT
ACK ← |
FIN ← | FIN_WAIT_2 ... LAST_ACK
ACK → | TIME_WAIT (2×MSL, thường 60s trên Linux)
```

## 2. Các trạng thái và ý nghĩa chẩn đoán

| Trạng thái | Nhìn thấy nhiều nghĩa là |
|---|---|
| `SYN_SENT` | Không tới được server: firewall drop, server không nghe |
| `SYN_RECV` | Nhiều bất thường → **SYN flood** hoặc accept queue đầy |
| `ESTABLISHED` | Bình thường |
| `CLOSE_WAIT` | **Bug ứng dụng**: bên kia đã đóng, code của mình quên gọi `close()` — rò rỉ fd |
| `FIN_WAIT_2` | Bên kia không đóng nốt; thường là bug phía đối tác |
| `TIME_WAIT` | Bình thường ở phía **chủ động đóng**; nhiều là do tạo kết nối mới liên tục |
| `LAST_ACK` | Đang chờ ACK cuối |

**`ss -tan state close-wait` tăng dần = rò rỉ file descriptor.** Đây là lỗi ứng dụng, không phải lỗi mạng.

## 3. TIME_WAIT — hiểu cho đúng
1. Tồn tại để (a) hấp thụ gói lạc của kết nối cũ, (b) đảm bảo ACK cuối tới nơi.
2. Nằm ở **phía chủ động đóng kết nối**. Server đóng trước → server tích TIME_WAIT.
3. **Cách chữa đúng**: dùng **connection pool / keep-alive** để bớt tạo kết nối mới; để **client** đóng trước.
4. `net.ipv4.tcp_tw_reuse=1` an toàn cho **outbound** (client). `tcp_tw_recycle` đã bị **xoá khỏi kernel** vì hỏng với NAT — đừng nghe lời khuyên cũ trên mạng.

## 4. Cạm bẫy hay gặp
- **Accept queue đầy** (`somaxconn` / backlog nhỏ) → kernel drop SYN im lặng, client thấy timeout. Kiểm tra `ss -lnt` cột `Send-Q`/`Recv-Q` của socket LISTEN và `nstat | grep ListenOverflow`.
- **Cạn ephemeral port** khi client mở quá nhiều kết nối tới cùng một đích: giới hạn là `net.ipv4.ip_local_port_range` (~28k mặc định). Chữa bằng pool, nhiều IP nguồn, hoặc `SO_REUSEPORT` phía server.
- **Nhầm CLOSE_WAIT với TIME_WAIT** rồi đi chỉnh sysctl — CLOSE_WAIT luôn là bug code.
- **SYN cookies**: bật (`tcp_syncookies=1`) để sống sót SYN flood, nhưng nó vô hiệu một số TCP option.
- **Half-open connection** sau khi một bên chết cứng: chỉ keepalive mới phát hiện được.

## 5. Checklist áp dụng
- [ ] `ss -s` và `ss -tan | awk '{print $1}' | sort | uniq -c` — phân bố trạng thái có bất thường không?
- [ ] `nstat -az | grep -i listen` có `ListenOverflows` / `ListenDrops` không?
- [ ] Ứng dụng có luôn `close()` trong `finally`/`defer` không?
- [ ] Có dùng connection pool thay vì mở kết nối mỗi request không?
- [ ] `somaxconn` và backlog trong code có khớp nhau và đủ lớn không?

## Tham khảo
- RFC 9293 §3.3 — State machine: https://www.rfc-editor.org/rfc/rfc9293
- Vincent Bernat — *Coping with the TCP TIME-WAIT state*: https://vincent.bernat.ch/en/blog/2014-tcp-time-wait-state-linux
- Cloudflare — *SYN packet handling in the wild*: https://blog.cloudflare.com/syn-packet-handling-in-the-wild/

## Liên kết
[[TCP]] · [[Socket API]] · [[Network Troubleshooting Playbook]] · [[Networking]]
