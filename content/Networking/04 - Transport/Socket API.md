---
tags: [networking, transport, programming]
status: growing
---
# Socket API

> Giao diện giữa ứng dụng và stack mạng. Hiểu đúng ngữ nghĩa của `read`/`write`/`close` **loại bỏ được cả một lớp bug phân tán** mà debug bằng log rất khó thấy.

## 1. Vòng đời hai phía

**Server**: `socket()` → `setsockopt(SO_REUSEADDR)` → `bind()` → `listen(backlog)` → `accept()` → `read`/`write` → `close()`
**Client**: `socket()` → (`bind()` tuỳ chọn) → `connect()` → `read`/`write` → `close()`

| Hàm | Điều hay bị hiểu sai |
|---|---|
| `write()` | Trả về **số byte đã copy vào buffer kernel**, không phải đã tới đích. Có thể ghi **một phần** — phải lặp. |
| `read()` | Trả về 0 nghĩa là **EOF (bên kia đã đóng)**, không phải "chưa có dữ liệu". |
| `close()` | Không đảm bảo dữ liệu đã gửi hết. Muốn chắc: `shutdown(SHUT_WR)` rồi đọc tới EOF. |
| `connect()` | Với non-blocking, trả `EINPROGRESS`; phải kiểm tra `SO_ERROR` qua `poll`. |
| `accept()` | Lấy từ **accept queue**; queue đầy thì SYN bị drop → [[TCP State Machine]] |

**TCP là dòng byte, không phải dòng message** — một `write()` có thể tới thành nhiều `read()`, và ngược lại. **Bắt buộc phải có framing ở tầng ứng dụng** (length-prefix hoặc delimiter) → [[Framing]].

## 2. Các socket option đáng nhớ
| Option | Tác dụng |
|---|---|
| `TCP_NODELAY` | Tắt Nagle — bật cho RPC/interactive |
| `SO_REUSEADDR` | Bind lại port đang ở TIME_WAIT |
| `SO_REUSEPORT` | Nhiều tiến trình cùng nghe một port, kernel phân tải |
| `SO_KEEPALIVE` + `TCP_KEEPIDLE/INTVL/CNT` | Phát hiện kết nối chết |
| `SO_RCVBUF` / `SO_SNDBUF` | Kích thước buffer (đặt trước `connect`/`listen` để window scale đúng) |
| `SO_LINGER` | Điều khiển hành vi `close` (đặt 0 = gửi RST — dùng cẩn thận) |
| `TCP_USER_TIMEOUT` | Giới hạn thời gian dữ liệu chưa được ACK trước khi báo lỗi |

## 3. Mô hình I/O
| Mô hình | Đặc điểm |
|---|---|
| Blocking + thread/connection | Đơn giản, tốn bộ nhớ, giới hạn vài nghìn kết nối |
| `select`/`poll` | O(n) mỗi vòng, giới hạn fd |
| **`epoll` (Linux) / `kqueue` (BSD)** | O(1), nền của nginx, Node.js, Netty |
| **`io_uring`** | Async thật, giảm syscall — hiện đại nhất trên Linux |

## 4. Cạm bẫy hay gặp
- **Giả định một `read()` = một message** → bug xuất hiện ngẫu nhiên khi tải cao hoặc gói lớn.
- **Không xử lý `EINTR`, `EAGAIN`, partial write.**
- **Quên `close()`** → rò rỉ fd, socket kẹt `CLOSE_WAIT`, đến lúc `EMFILE` thì dịch vụ chết.
- **Bỏ qua `SIGPIPE`** → tiến trình bị giết khi ghi vào socket đã đóng. Dùng `MSG_NOSIGNAL` hoặc bỏ qua tín hiệu.
- **Không đặt timeout ở tầng ứng dụng** → treo vô hạn khi bên kia im lặng.

## 5. Checklist áp dụng
- [ ] Có framing rõ ràng (length-prefix / delimiter) chưa?
- [ ] Vòng lặp `write` có xử lý ghi một phần không?
- [ ] `close()` có luôn được gọi trong `defer`/`finally` không?
- [ ] `ulimit -n` có đủ cho số kết nối mục tiêu không?
- [ ] Có timeout đọc/ghi ở tầng ứng dụng không?
- [ ] `TCP_NODELAY` và keepalive đã cấu hình có chủ đích chưa?

## Tham khảo
- Beej's Guide to Network Programming: https://beej.us/guide/bgnet/
- Stevens, Fenner, Rudoff — *UNIX Network Programming, Vol. 1*
- `man 7 socket`, `man 7 tcp`: https://man7.org/linux/man-pages/man7/tcp.7.html
- The C10K problem: http://www.kegel.com/c10k.html

## Liên kết
[[TCP]] · [[TCP State Machine]] · [[UDP]] · [[Linux Network Stack]] · [[Networking]]
