---
tags: [os, concurrency]
status: evergreen
---
# Semaphore

> Một số nguyên có hai thao tác nguyên tử. Đủ để thay thế **cả** [[Lock]] lẫn [[Condition Variable]] — đó là vẻ đẹp của nó, và cũng là lý do nó dễ dùng sai.

## 1. Định nghĩa
| Thao tác | Tên khác | Hành vi |
|---|---|---|
| `sem_wait(s)` | P, down, acquire | `s--`; nếu `s < 0` thì **ngủ** |
| `sem_post(s)` | V, up, release | `s++`; nếu có thread đang ngủ thì **đánh thức một** |

> Khi âm, **giá trị tuyệt đối của `s` chính là số thread đang chờ**. Đây là mẹo nhớ hữu ích nhất về semaphore.

Giá trị khởi tạo quyết định semaphore đóng vai gì:
| Init | Vai trò |
|---|---|
| `1` | **Binary semaphore** = mutex |
| `0` | **Ordering / signaling** — thread A chờ sự kiện từ thread B (như join) |
| `N` | **Đếm tài nguyên** — tối đa N thread vào cùng lúc (connection pool, rate limit) |

## 2. Các bài toán kinh điển
| Bài toán | Cách giải | Bẫy |
|---|---|---|
| **Producer/Consumer** (bounded buffer) | `sem empty = N`, `sem full = 0`, `sem mutex = 1` | **Thứ tự khoá**: `wait(empty)` phải trước `wait(mutex)`. Đảo lại → [[Deadlock]] |
| **Reader/Writer** | reader đếm số reader, reader đầu tiên `wait(writelock)`, reader cuối `post` | **writer starvation** nếu reader liên tục; thường không đáng độ phức tạp |
| **Dining Philosophers** | mỗi triết gia lấy đũa trái rồi phải | Deadlock nếu ai cũng làm giống nhau → cho **một** người đảo thứ tự |
| **Throttling** | `sem_init(&s, 0, N)` bao quanh tài nguyên hạn chế | quên `post` ở đường lỗi → cạn slot vĩnh viễn |

## 3. Semaphore vs Mutex + Condvar
| | Semaphore | Mutex + CV |
|---|---|---|
| Có "chủ sở hữu" | **Không** — thread A wait, thread B post là hợp lệ | Có — thường phải unlock bởi chính thread đã lock |
| Nhớ tín hiệu | **Có** (đếm) — post trước wait vẫn được | **Không** — signal khi không ai chờ là mất |
| Diễn đạt điều kiện phức tạp | khó | dễ (viết `while (điều kiện)` bất kỳ) |
| Dễ đọc | thấp — ý nghĩa nằm ở giá trị khởi tạo | cao hơn |

> Quy tắc thực dụng: **Mutex + CV cho logic phức tạp; semaphore cho đếm tài nguyên và cho tín hiệu một chiều.**

## 4. Trên Linux
- POSIX semaphore không đặt tên: `sem_init` (dùng trong một process, hoặc `pshared` với shared memory).
- Có tên: `sem_open("/name", ...)` — dùng chung giữa các process.
- System V semaphore (`semget`/`semop`) — cổ, phức tạp hơn, nhưng có undo tự động khi process chết.
- Cài đặt bên dưới vẫn là **futex** → xem [[Lock]].

## 5. Cạm bẫy
- **Đảo thứ tự `wait(mutex)` và `wait(empty)`** — deadlock kinh điển của bounded buffer.
- **Quên `post` trên đường lỗi/exception** → tài nguyên rò rỉ dần cho tới khi treo. Dùng RAII/`defer`.
- **Dùng semaphore làm mutex rồi post từ thread khác** — hợp lệ về kỹ thuật, nhưng phá bỏ mọi khả năng phát hiện lỗi và mọi cơ chế priority inheritance.
- **`sem_wait` bị ngắt bởi signal** trả `EINTR` → phải retry.
- **`sem_post` an toàn trong signal handler**, `pthread_mutex_lock` thì **không** — đây là lý do hiếm hoi nên chọn semaphore.
- **Semaphore không thể "peek" an toàn** — `sem_getvalue` chỉ là ảnh chụp đã lỗi thời ngay khi trả về.

## 6. Checklist áp dụng
- [ ] Mỗi semaphore: giá trị khởi tạo có phản ánh đúng ý nghĩa (mutex=1, signal=0, pool=N) chưa?
- [ ] Mọi đường thoát khỏi vùng tài nguyên có `post` chưa (kể cả lỗi và exception)?
- [ ] Thứ tự các `wait` lồng nhau có nhất quán toàn hệ thống không?
- [ ] Có xử lý `EINTR` không?
- [ ] Có diễn đạt được bằng mutex+CV rõ ràng hơn không?

## Tham khảo
- OSTEP ch.31 *Semaphores*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf
- Downey — *The Little Book of Semaphores* (miễn phí): https://greenteapress.com/wp/semaphores/
- `sem_overview(7)`: https://man7.org/linux/man-pages/man7/sem_overview.7.html
- Dijkstra — *Cooperating Sequential Processes* (nguồn gốc P/V): https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html

## Liên kết
[[Lock]] · [[Condition Variable]] · [[Deadlock]] · [[Thread]] · [[OS]]
