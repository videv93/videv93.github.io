---
tags: [os, concurrency]
status: evergreen
---
# Event-based Concurrency

> Đồng thời **không cần [[Thread]]**: một luồng duy nhất, một vòng lặp, xử lý sự kiện khi nó sẵn sàng. Không có preemption trong vòng lặp → **không có data race**, đổi lại phải tự tay không bao giờ chặn.

## 1. Vòng lặp sự kiện
```c
while (1) {
    events = wait_for_events();       // select / poll / epoll / kqueue / io_uring
    for (e in events)
        process_event(e);             // PHẢI nhanh, PHẢI không chặn
}
```
Vì chỉ có một luồng và không bị preempt giữa chừng, mỗi handler chạy tới cùng → trạng thái chia sẻ an toàn mà không cần [[Lock]].

## 2. Các API chờ sự kiện
| API | Độ phức tạp | Hệ |
|---|---|---|
| `select` / `poll` | **O(n)** theo số fd theo dõi — duyệt lại toàn bộ mỗi lần | POSIX |
| `epoll` | **O(1)** theo số fd *sẵn sàng*; trạng thái giữ trong kernel | Linux |
| `kqueue` | tương tự epoll, thêm nhiều loại sự kiện | BSD/macOS |
| IOCP | mô hình completion | Windows |
| `io_uring` | ring chia sẻ, gộp submit/complete, hỗ trợ cả file I/O | Linux hiện đại |

**Level-triggered vs Edge-triggered** (epoll): level báo lại chừng nào còn dữ liệu; edge chỉ báo khi có *thay đổi* → với ET **bắt buộc đọc tới `EAGAIN`**, nếu không sẽ treo kết nối.

## 3. Vấn đề lớn nhất: blocking system call
Một lời gọi chặn (đọc file, DNS, `getaddrinfo`, tính toán nặng) **đóng băng toàn bộ server**.

| Loại | Non-blocking được không | Giải pháp |
|---|---|---|
| Socket | ✅ `O_NONBLOCK` + epoll | tự nhiên |
| **File / disk I/O** | ❌ `O_NONBLOCK` gần như vô nghĩa với file thường | thread pool riêng, `io_uring`, hoặc AIO |
| Page fault | ❌ không kiểm soát được | giữ working set trong RAM |
| CPU-bound | ❌ | đẩy sang worker thread/process |

Đây là lý do Node.js có libuv thread pool, và vì sao mọi runtime async đều phải giải bài toán "blocking file I/O" bằng thread.

## 4. Manual stack management
Với thread, trạng thái nằm trên stack và tự nhiên còn đó sau khi I/O xong. Với event loop, handler **trả về** → trạng thái phải được lưu tay vào "continuation".

Đó chính là callback hell. Các tầng trừu tượng lần lượt ra đời để giải nó:
`callback → Promise/Future → async/await (state machine do compiler sinh) → coroutine/green thread`

`async/await` chỉ là cú pháp để compiler tự viết giùm việc lưu-khôi phục trạng thái đó.

## 5. Event loop vs Thread
| | Event-based | Thread-based |
|---|---|---|
| Data race | không (trong một loop) | có → [[Concurrency Bugs]] |
| Tận dụng nhiều core | không tự nhiên (chạy N process/loop, mỗi cái một core) | có |
| Chi phí mỗi kết nối | rất thấp (một object) | stack riêng mỗi thread |
| Bẫy chính | một handler chậm giết cả server | khoá, deadlock |
| Debug | stack trace bị đứt đoạn | stack trace đầy đủ |

Thực tế hiện đại thường là **lai**: N event loop, mỗi loop trên một core (Nginx, Envoy, Tokio multi-thread runtime, Go runtime).

## 6. Cạm bẫy
- **Tính toán nặng trong handler** → p99 latency của *mọi* kết nối tăng vọt.
- **Dùng thư viện có blocking call ẩn** (DNS đồng bộ, đọc file cấu hình, log ghi đồng bộ).
- **Edge-triggered mà không đọc tới `EAGAIN`** → kết nối treo im lặng.
- **Nghĩ "không có thread nên không cần nghĩ về đồng thời"** — vẫn có race *logic* giữa các callback xen kẽ (một request đọc trạng thái, `await`, rồi ghi lại — giữa đó request khác đã đổi).
- **Không giới hạn số kết nối/số công việc chờ** → tràn bộ nhớ thay vì từ chối sớm (cần backpressure).

## 7. Checklist áp dụng
- [ ] Handler nào có thể chạy > 1ms? Đã đo chưa?
- [ ] Có blocking call nào (file, DNS, crypto, nén) trong loop không?
- [ ] Dùng level hay edge-triggered? Nếu edge: đã đọc tới `EAGAIN` chưa?
- [ ] Có backpressure khi consumer chậm hơn producer không?
- [ ] Có tận dụng đủ số core không (N loop hay 1)?
- [ ] Trạng thái được đọc trước `await` có thể đã cũ khi tiếp tục không?

## Tham khảo
- OSTEP ch.33 *Event-based Concurrency*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf
- Pai, Druschel, Zwaenepoel — *Flash: An Efficient and Portable Web Server*: https://www.usenix.org/legacy/events/usenix99/full_papers/pai/pai.pdf
- von Behren, Condit, Brewer — *Why Events Are A Bad Idea*: https://people.eecs.berkeley.edu/~brewer/papers/threads-hotos-2003.pdf
- `epoll(7)`: https://man7.org/linux/man-pages/man7/epoll.7.html
- Dan Kegel — *The C10K problem*: http://www.kegel.com/c10k.html

## Liên kết
[[Thread]] · [[IO Devices]] · [[System Call]] · [[Concurrency Bugs]] · [[OS]]
