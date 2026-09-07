---
tags: [os, concurrency, bug]
status: evergreen
---
# Deadlock

> Trạng thái mà mỗi thread đang chờ một thread khác, và vòng chờ khép kín → **không ai tiến được nữa**. Khác với bug thường, deadlock không sinh ra dữ liệu sai — nó làm hệ thống *đứng im*.

## 1. Bốn điều kiện Coffman (cần **cả bốn** mới có deadlock)
| Điều kiện | Nghĩa | Phá bằng cách |
|---|---|---|
| **Mutual exclusion** | tài nguyên không chia sẻ được | cấu trúc lock-free, dữ liệu bất biến |
| **Hold-and-wait** | giữ cái này, chờ cái kia | lấy **tất cả** khoá một lần (dưới một khoá "meta"), hoặc không giữ khi chờ |
| **No preemption** | không cướp được khoá của người khác | `trylock` + nhả hết + thử lại (coi chừng **livelock** → thêm backoff ngẫu nhiên) |
| **Circular wait** | tồn tại chu trình chờ | **Thứ tự khoá toàn cục** — cách phổ biến và hiệu quả nhất |

## 2. Ba chiến lược ứng phó
| Chiến lược | Cách làm | Dùng ở đâu |
|---|---|---|
| **Prevention** | phá một trong bốn điều kiện — chủ yếu bằng **lock ordering** | mọi codebase nghiêm túc |
| **Avoidance** | biết trước nhu cầu tài nguyên, chỉ cấp khi còn ở trạng thái an toàn (**Banker's algorithm**) | hiếm — cần biết trước, không thực tế cho app |
| **Detect & Recover** | dựng đồ thị chờ, tìm chu trình, huỷ một nạn nhân | **database** (rollback transaction), một số scheduler |

Với ứng dụng thường: **prevention bằng lock ordering** là câu trả lời. Với DB: **detection + rollback** vì transaction huỷ được.

## 3. Lock ordering — cách làm thực tế
1. Gán mỗi khoá một **hạng** (rank) hoặc dùng địa chỉ khoá làm thứ tự.
2. Luôn lấy khoá theo thứ tự tăng dần:
```c
if (m1 > m2) { lock(m2); lock(m1); }   // sắp theo địa chỉ
else         { lock(m1); lock(m2); }
```
3. Ghi thứ tự đó vào tài liệu; kiểm tra tự động bằng **lockdep** (kernel) hoặc TSan (user space).
4. **Không gọi callback/hàm ngoài khi đang giữ khoá** — bạn không kiểm soát được nó lấy khoá gì.

## 4. Họ hàng của deadlock
| Hiện tượng | Nghĩa | Nhận biết |
|---|---|---|
| **Livelock** | các thread liên tục hành động nhưng không tiến triển (cùng `trylock`, cùng thất bại, cùng thử lại) | CPU 100% mà không có việc gì xong |
| **Starvation** | một thread không bao giờ được cấp tài nguyên | latency của một nhóm request tăng vô hạn |
| **Priority inversion** | task ưu tiên thấp giữ khoá mà task ưu tiên cao cần; task ưu tiên trung bình chen vào chạy | Mars Pathfinder 1997 — chữa bằng **priority inheritance** (`PTHREAD_PRIO_INHERIT`) |
| **Self-deadlock** | thread khoá lại chính khoá nó đang giữ | mutex không đệ quy → treo ngay |
| **Deadlock qua I/O** | giữ khoá rồi chờ mạng/đĩa vô hạn | luôn đặt timeout |

## 5. Cạm bẫy
- **Nghĩ deadlock chỉ xảy ra với mutex.** Nó xảy ra với connection pool, thread pool (task chờ task khác trong cùng pool — **pool-induced deadlock**), khoá DB, và cả `await` trong async runtime một luồng.
- **Thêm `trylock` mà không có backoff** → livelock.
- **Recursive mutex như liều thuốc giảm đau** — nó che dấu hiệu thiết kế khoá lộn xộn.
- **Deadlock không tái hiện được trong test** — nó phụ thuộc timing. Chỉ có phân tích thứ tự khoá và công cụ mới bắt được.
- **`SIGKILL` không giải quyết** deadlock giữa các process qua tài nguyên chia sẻ; state có thể kẹt lại.

## 6. Checklist áp dụng
- [ ] Có chỗ nào giữ ≥2 khoá cùng lúc không? Thứ tự có nhất quán không?
- [ ] Có gọi hàm/callback bên ngoài khi đang giữ khoá không?
- [ ] Mọi thao tác chờ (I/O, lock, queue) có timeout không?
- [ ] Thread pool có task nào chờ kết quả của task khác cùng pool không?
- [ ] Đã chạy TSan (user) hoặc bật lockdep (kernel) chưa?
- [ ] Khi treo: đã lấy stack của **mọi** thread chưa? (`gdb thread apply all bt`, `jstack`, `py-spy dump`)

## Công cụ
| Công cụ | Dùng để |
|---|---|
| `gdb` + `thread apply all bt` | ảnh chụp mọi thread khi treo |
| ThreadSanitizer | phát hiện data race và một số deadlock |
| `lockdep` (kernel) | kiểm chứng thứ tự khoá runtime |
| `pg_locks`, `SHOW ENGINE INNODB STATUS` | deadlock ở tầng database |

## Tham khảo
- OSTEP ch.32 *Common Concurrency Problems*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf
- Coffman, Elphick, Shoshani — *System Deadlocks* (1971): https://dl.acm.org/doi/10.1145/356586.356588
- Linux `lockdep`: https://docs.kernel.org/locking/lockdep-design.html
- NASA — *What really happened on Mars* (priority inversion): https://www.cs.unc.edu/~anderson/teach/comp790/papers/mars_pathfinder_long_version.html
- `pthread_mutexattr_setprotocol(3)` — priority inheritance: https://man7.org/linux/man-pages/man3/pthread_mutexattr_setprotocol.3p.html

## Liên kết
[[Concurrency Bugs]] · [[Lock]] · [[Semaphore]] · [[CPU Scheduling]] · [[OS]]
