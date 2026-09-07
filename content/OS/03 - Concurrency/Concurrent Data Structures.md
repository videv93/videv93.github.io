---
tags: [os, concurrency]
status: evergreen
---
# Concurrent Data Structures

> Thêm [[Lock]] vào cấu trúc dữ liệu thì dễ; thêm sao cho **vẫn nhanh khi nhiều thread** mới khó. Nguyên tắc vàng: *bắt đầu bằng một khoá lớn, chỉ tinh chỉnh khi đã đo và thấy nó là bottleneck.*

## 1. Counter — bài học về scaling
| Cách | Cơ chế | Đặc điểm |
|---|---|---|
| Một mutex | khoá quanh `++` | đúng, nhưng **không scale** — mọi core tranh cùng một cache line |
| Atomic (`fetch_add`) | lệnh nguyên tử | tốt hơn, vẫn ping-pong cache line |
| **Approximate / sloppy counter** | mỗi CPU một counter cục bộ, gộp lên toàn cục khi vượt ngưỡng `S` | **scale gần tuyến tính**; đổi lại giá trị toàn cục hơi trễ |

Ngưỡng `S` là đánh đổi kinh điển: `S` lớn → scale tốt, số liệu lệch nhiều; `S` nhỏ → ngược lại. Linux dùng đúng ý tưởng này (`percpu_counter`).

## 2. Các cấu trúc thường gặp
| Cấu trúc | Cách khoá | Ghi chú |
|---|---|---|
| **Linked list** | một khoá cho cả list; hoặc **hand-over-hand** (khoá từng node) | hand-over-hand thường **chậm hơn** vì overhead khoá lớn hơn lợi ích |
| **Queue** | hai khoá riêng cho **head** và **tail** (Michael-Scott) | producer và consumer không đá nhau |
| **Hash table** | một khoá **mỗi bucket** | scale rất tốt, đơn giản — cấu trúc "dễ đồng thời" nhất |
| **Tree** | khoá theo node hoặc theo subtree; hoặc lock-free (Bw-tree) | phức tạp; DB thường dùng latch coupling |
| **Ring buffer** (SPSC) | không cần khoá, chỉ cần atomic index + memory barrier | nền tảng của `io_uring`, LMAX Disruptor |

> Hash table dễ song song vì **không gian khoá tự nhiên phân mảnh**. Khi thiết kế hệ thống đồng thời, hãy tìm cách đưa bài toán về hình dạng đó (sharding).

## 3. Lock-free và wait-free
| Mức đảm bảo | Nghĩa |
|---|---|
| **Blocking** | thread bị treo có thể chặn mọi thread khác |
| **Lock-free** | ít nhất một thread luôn tiến triển |
| **Wait-free** | **mọi** thread tiến triển trong số bước hữu hạn |

Cài đặt bằng CAS trong vòng lặp. Cạm bẫy nổi tiếng: **ABA problem** — giá trị đổi từ A sang B rồi về A, CAS tưởng không có gì xảy ra. Chữa bằng tagged pointer / hazard pointer / epoch-based reclamation.

> Lock-free **không phải luôn nhanh hơn**. Dưới contention cao, vòng lặp CAS thất bại liên tục có thể tệ hơn một mutex tử tế. Và độ khó viết đúng cao hơn hẳn.

## 4. Nguyên tắc thiết kế
1. **Đơn giản trước.** Một khoá lớn, đo, rồi mới tối ưu ("more concurrency isn't necessarily faster").
2. **Tránh chia sẻ hơn là khoá tốt.** Per-thread/per-CPU state + gộp định kỳ đánh bại mọi khoá tinh vi.
3. **Chú ý cache line.** Đệm để tránh false sharing → [[Multiprocessor Scheduling]].
4. **Không giữ khoá khi làm việc dài** (I/O, cấp phát lớn, callback).
5. **Bất biến (immutable) là dạng đồng thời rẻ nhất** — copy-on-write, persistent data structure.

## 5. Cạm bẫy
- **Tinh chỉnh khoá quá sớm** — làm code khó hiểu, thêm bug, mà thường chậm hơn.
- **Quên rằng "mỗi thao tác nguyên tử" ≠ "chuỗi thao tác nguyên tử".** `if (!map.contains(k)) map.put(k,v)` vẫn là race dù map thread-safe. Cần API kiểu `compute_if_absent`.
- **Kích thước cấu trúc thay đổi (resize hash table)** là điểm khó nhất — cần khoá toàn cục hoặc resize tăng dần.
- **Bỏ qua vấn đề thu hồi bộ nhớ trong lock-free** — không biết khi nào an toàn để `free` node đã gỡ.
- **Đo bằng 1 thread** — mọi cấu trúc đều nhanh khi không có tranh chấp.

## 6. Checklist áp dụng
- [ ] Tôi đã đo contention trước khi tinh chỉnh chưa?
- [ ] Có sharding được theo key (hash bucket, per-CPU) không?
- [ ] API có cung cấp thao tác **kết hợp nguyên tử** không, hay người dùng phải tự ghép (và tự sinh race)?
- [ ] Có false sharing giữa các trường được ghi bởi thread khác nhau không?
- [ ] Cấu trúc có scale khi tăng thread không? Vẽ đường cong throughput.

## Tham khảo
- OSTEP ch.29 *Lock-based Concurrent Data Structures*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf
- Michael & Scott — *Simple, Fast, and Practical Non-Blocking and Blocking Concurrent Queue Algorithms*: https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
- Herlihy & Shavit — *The Art of Multiprocessor Programming*
- Boyd-Wickizer et al. — *An Analysis of Linux Scalability to Many Cores* (OSDI '10): https://pdos.csail.mit.edu/papers/linux:osdi10.pdf
- Linux `percpu_counter`: https://elixir.bootlin.com/linux/latest/source/include/linux/percpu_counter.h

## Liên kết
[[Lock]] · [[Thread]] · [[Condition Variable]] · [[Multiprocessor Scheduling]] · [[OS]]
