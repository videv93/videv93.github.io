---
tags: [os, concurrency]
status: evergreen
---
# Condition Variable

> [[Lock]] giải bài toán "đừng chạy cùng lúc". Condition variable giải bài toán khác hẳn: **"chờ cho tới khi điều kiện đúng"** — mà không đốt CPU bằng spin.

## 1. API và ý nghĩa
| Hàm | Ý nghĩa |
|---|---|
| `pthread_cond_wait(&cv, &mutex)` | **Nguyên tử**: nhả mutex + đưa thread vào ngủ. Khi thức dậy: **giành lại mutex** rồi mới trả về |
| `pthread_cond_signal(&cv)` | Đánh thức **một** thread đang chờ |
| `pthread_cond_broadcast(&cv)` | Đánh thức **tất cả** |

Việc "nhả khoá và ngủ" phải nguyên tử — nếu không sẽ có **lost wakeup**: signal xảy ra đúng khe giữa hai bước, thread ngủ mãi mãi.

## 2. Khuôn mẫu bắt buộc
```c
pthread_mutex_lock(&m);
while (ready == 0)                 // WHILE, không phải IF
    pthread_cond_wait(&cv, &m);
consume();
pthread_mutex_unlock(&m);
```
```c
pthread_mutex_lock(&m);
ready = 1;                         // đổi TRẠNG THÁI trước
pthread_cond_signal(&cv);          // rồi mới báo
pthread_mutex_unlock(&m);
```
**Ba quy tắc không được vi phạm:**
1. **Luôn giữ mutex** khi kiểm tra điều kiện và khi gọi `wait`.
2. **Luôn dùng `while`, không dùng `if`** — vì spurious wakeup và vì Mesa semantics (xem mục 3).
3. **Luôn có biến trạng thái riêng.** Condition variable không nhớ gì cả; signal khi không ai chờ sẽ **mất luôn**.

## 3. Mesa vs Hoare semantics
| | Mesa (thực tế mọi hệ) | Hoare (lý thuyết) |
|---|---|---|
| Sau `signal` | thread được đánh thức chỉ **được xếp hàng**; thread khác có thể chen vào và làm điều kiện sai lại | quyền điều khiển chuyển ngay cho thread được đánh thức |
| Hệ quả | **bắt buộc dùng `while`** | `if` là đủ |

Đây là lý do kỹ thuật của quy tắc "always while".

## 4. Producer/Consumer (bounded buffer)
- Cần **hai** condition variable: `empty` (producer chờ) và `fill` (consumer chờ).
- Dùng **một** cv duy nhất → producer có thể đánh thức producer khác, consumer đánh thức consumer → treo cả hệ thống.
- `broadcast` thì luôn đúng nhưng lãng phí (thundering herd); `signal` đúng cv thì hiệu quả hơn.

**Covering condition**: khi không chắc thread nào cần thức dậy (ví dụ allocator chờ đủ bộ nhớ với kích thước khác nhau) → dùng `broadcast`. Tốn hiệu năng, đổi lấy tính đúng.

## 5. Cạm bẫy
- **Dùng `if` thay `while`** — bug kinh điển nhất, chỉ lộ ra khi tải cao.
- **Signal trước khi đổi trạng thái** → consumer thức dậy, thấy điều kiện sai, ngủ lại; hoặc mất tín hiệu.
- **Gọi `signal` mà không giữ mutex** — hợp lệ về mặt POSIX nhưng dễ tạo race với việc đổi trạng thái; giữ mutex an toàn hơn.
- **Không có biến trạng thái**, chỉ dựa vào cv → mất tín hiệu vĩnh viễn.
- **Dùng `sleep()` để chờ điều kiện.** Đây là polling: tốn CPU và trễ. Cv luôn tốt hơn.
- **Thundering herd** với broadcast trên hàng nghìn thread.

## 6. Checklist áp dụng
- [ ] Mọi `cond_wait` có nằm trong vòng `while` không?
- [ ] Có biến trạng thái tường minh cho mỗi điều kiện chờ không?
- [ ] Trạng thái được đổi **trước** khi signal chưa?
- [ ] Cần `signal` hay `broadcast`? Có đủ số cv cho từng loại thread chờ không?
- [ ] Có timeout (`pthread_cond_timedwait`) cho trường hợp không bao giờ được đánh thức không?
- [ ] Điều kiện có thể trở lại sai sau khi thức dậy không? (nếu có → chắc chắn cần `while`)

## Tham khảo
- OSTEP ch.30 *Condition Variables*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf
- `pthread_cond_wait(3p)`: https://man7.org/linux/man-pages/man3/pthread_cond_wait.3p.html
- Lampson & Redell — *Experience with Processes and Monitors in Mesa*: https://dl.acm.org/doi/10.1145/357980.357997
- Hoare — *Monitors: An Operating System Structuring Concept*: https://dl.acm.org/doi/10.1145/355620.361161

## Liên kết
[[Lock]] · [[Semaphore]] · [[Thread]] · [[Concurrency Bugs]] · [[OS]]
