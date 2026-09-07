---
tags: [os, virtualization, cpu, mechanism]
status: evergreen
---
# Limited Direct Execution

> Cách OS ảo hoá CPU mà gần như không mất hiệu năng: **cho chương trình chạy thẳng trên phần cứng**, chỉ dựng rào ở hai chỗ — khi nó muốn làm việc đặc quyền, và khi OS muốn giành lại CPU.

## 1. Hai vấn đề, hai cơ chế
| Vấn đề | Câu hỏi | Lời giải |
|---|---|---|
| **Restricted operations** | Chạy trực tiếp thì làm sao cấm nó ghi đĩa của người khác? | Chế độ đặc quyền + trap → [[User Mode vs Kernel Mode]], [[System Call]] |
| **Switching between processes** | Chạy trực tiếp thì OS không chạy, làm sao giành lại CPU? | **Timer interrupt** + [[Context Switch]] |

Nếu chỉ có "direct execution" thuần tuý thì OS mất kiểm soát hoàn toàn. Chữ **Limited** chính là hai cơ chế trên.

## 2. Giao thức LDE (rút gọn từ OSTEP)
**Lúc boot (kernel mode):**
1. Khởi tạo trap table → CPU nhớ địa chỉ handler.
2. Khởi động timer interrupt (ví dụ mỗi 1–10 ms).

**Khi chạy tiến trình:**
1. Tạo PCB, cấp kernel stack, cấp [[Address Space]].
2. `return-from-trap` → hạ về user mode, nhảy vào `main`.
3. Chương trình chạy **trực tiếp** trên CPU, tốc độ gần như native.
4. Cần dịch vụ → trap; hết quantum → timer interrupt; cả hai đều đưa CPU về kernel.
5. Kernel quyết định: chạy tiếp hay [[Context Switch]] sang tiến trình khác.

## 3. Cooperative vs Preemptive
| | Cooperative | Preemptive |
|---|---|---|
| OS giành CPU khi | tiến trình tự nhường (syscall, `yield`, lỗi) | timer interrupt, bất kỳ lúc nào |
| Vòng lặp vô hạn không syscall | **treo cả máy** | bị cắt bình thường |
| Hệ dùng | Mac OS cổ, Windows 3.x, một số RTOS | mọi OS hiện đại |
| Hệ quả cho lập trình viên | ít race hơn | phải nghĩ về [[Concurrency Bugs]] |

Đây là lý do async/await trong ngôn ngữ lập trình được gọi là *cooperative* scheduling — và cũng vì thế một task async chiếm CPU lâu sẽ chặn cả event loop → [[Event-based Concurrency]].

## 4. Chi phí thực tế
- Trap/return-from-trap: chi phí trực tiếp (lưu/khôi phục thanh ghi).
- **Chi phí gián tiếp lớn hơn**: cache, TLB, branch predictor bị "bẩn" → công việc sau đó chạy chậm hơn dù CPU không làm gì thêm.
- Tần suất timer là đánh đổi: ngắn → phản hồi tốt, overhead cao; dài → ngược lại. Linux hiện đại dùng **tickless** (`NO_HZ`) — không ngắt khi CPU đang chạy đúng một tác vụ, tiết kiệm điện.

## 5. Cạm bẫy
- **Nghĩ OS "giám sát" tiến trình liên tục.** Không. Nó chỉ can thiệp tại trap/interrupt. Giữa hai điểm đó, chương trình sở hữu CPU thật.
- **Đo overhead context switch bằng microbenchmark** rồi kết luận — thực tế chi phí gián tiếp (cache) mới quyết định.
- **Tăng tần số timer để "mượt hơn".** Thường phản tác dụng vì overhead và cache pollution.
- **Cho rằng preemption xảy ra ở ranh giới lệnh của ngôn ngữ bậc cao.** Nó xảy ra ở ranh giới lệnh máy — `x++` có thể bị cắt ngang.

## 6. Checklist áp dụng
- [ ] Tôi phân biệt được rõ đâu là **mechanism** (LDE, context switch) và đâu là **policy** ([[CPU Scheduling]]) chưa?
- [ ] Code của tôi có giả định nào về "không bị ngắt giữa chừng" không?
- [ ] Với async runtime: có tác vụ nào chạy > vài ms mà không `await` không?
- [ ] Đo context switch: `vmstat 1` cột `cs`, hoặc `perf stat -e context-switches`.

## Tham khảo
- OSTEP ch.6 *Mechanism: Limited Direct Execution*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf
- Linux `NO_HZ` — tickless kernel: https://docs.kernel.org/timers/no_hz.html
- Ousterhout — *Why Aren't Operating Systems Getting Faster As Fast as Hardware?*: https://web.stanford.edu/~ouster/cgi-bin/papers/osfaster.pdf
- LWN — *Realtime and preemption models*: https://lwn.net/Articles/831678/

## Liên kết
[[Context Switch]] · [[System Call]] · [[User Mode vs Kernel Mode]] · [[CPU Scheduling]] · [[OS]]
