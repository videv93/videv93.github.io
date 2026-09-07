---
tags: [os, concurrency, bug]
status: evergreen
---
# Concurrency Bugs

> Nghiên cứu kinh điển của Lu et al. trên MySQL, Apache, Mozilla, OpenOffice: **~97% bug đồng thời (không tính deadlock) thuộc đúng hai loại** — atomicity violation và order violation. Biết hai khuôn mẫu này là bắt được phần lớn bug.

## 1. Phân loại theo Lu et al. (ASPLOS '08)
| Loại | Tỉ lệ (non-deadlock) | Bản chất |
|---|---|---|
| **Atomicity violation** | ~65% | Một chuỗi thao tác *đáng lẽ* nguyên tử bị xen giữa |
| **Order violation** | ~32% | A phải xảy ra trước B, nhưng không có gì đảm bảo điều đó |
| **[[Deadlock]]** | (tính riêng) | vòng chờ khép kín |

## 2. Atomicity violation
```c
// Thread 1
if (thd->proc_info) {
    fputs(thd->proc_info, ...);   // ← Thread 2 set thd->proc_info = NULL ở đây
}
// Thread 2
thd->proc_info = NULL;
```
Cả hai thao tác riêng lẻ đều "đúng", nhưng **check-then-act** không nguyên tử.

**Khuôn mẫu nhận diện:**
- `if (check) { act }` trên dữ liệu chia sẻ — TOCTOU (time-of-check to time-of-use).
- `x = x + 1` trên biến chia sẻ.
- `if (!map.has(k)) map.set(k, v)`.
- Đọc một trường rồi đọc trường khác của cùng object và giả định chúng nhất quán.

**Cách chữa:** bao cả khối bằng cùng một [[Lock]], hoặc dùng API kết hợp nguyên tử (`compute_if_absent`, CAS).

## 3. Order violation
```c
// Thread 1
mThread = PR_CreateThread(mMain, ...);
// Thread 2
void mMain(...) { mState = mThread->State; }   // mThread có thể còn NULL
```
**Cách chữa:** [[Condition Variable]] với biến trạng thái tường minh, hoặc semaphore init 0, hoặc join.

Không bao giờ chữa bằng `sleep(100)` — nó chỉ làm bug hiếm hơn, không biến mất.

## 4. Data race vs Race condition
| | Data race | Race condition |
|---|---|---|
| Định nghĩa | hai truy cập đồng thời tới cùng địa chỉ, ít nhất một là ghi, không có đồng bộ | kết quả phụ thuộc thứ tự thực thi |
| Công cụ bắt được | **có** (TSan) | không tự động — cần suy luận |
| Ví dụ | `counter++` không khoá | hai transaction đúng thứ tự khác nhau cho kết quả nghiệp vụ khác |

> Sửa hết data race **không** đồng nghĩa với hết race condition. Đây là điểm hay bị hiểu nhầm khi dựa vào TSan.

## 5. Memory model — vì sao code "trông đúng" vẫn sai
CPU và compiler được phép **sắp xếp lại** lệnh. Không có đồng bộ thì thứ tự bạn viết không phải thứ tự thực thi.
| Công cụ | Đảm bảo |
|---|---|
| `volatile` (C/C++) | **KHÔNG** đảm bảo nguyên tử hay thứ tự — không dùng để đồng bộ |
| `std::atomic` với `memory_order_seq_cst` | mặc định, an toàn nhất, chậm nhất |
| `acquire`/`release` | đủ cho phần lớn mẫu producer/consumer |
| `relaxed` | chỉ nguyên tử, không có thứ tự — dùng cho counter thống kê |
| Mutex | tự động tạo hàng rào acquire/release |

## 6. Cạm bẫy
- **"Chạy 1000 lần không lỗi nên chắc đúng."** Race lộ ra theo xác suất phụ thuộc tải, số core, và cả compiler flag.
- **Chữa bằng `sleep`.**
- **Thêm khoá lung tung tới khi hết lỗi** → đẻ ra [[Deadlock]].
- **Tin rằng ngôn ngữ có GC thì an toàn** — Java/Go vẫn có data race đầy đủ (Rust là ngoại lệ nhờ kiểm tra ở compile time).
- **Bỏ qua bug đồng thời hiếm** — chúng luôn xuất hiện đúng lúc tải cao nhất.

## 7. Checklist áp dụng
- [ ] Có chỗ nào `check-then-act` trên dữ liệu chia sẻ không?
- [ ] Có giả định ngầm nào về thứ tự giữa hai thread không? Nó được **đảm bảo** bằng gì?
- [ ] Mỗi biến chia sẻ có một khoá duy nhất, được ghi rõ?
- [ ] CI có chạy TSan/race detector không? (`-race` với Go, `-fsanitize=thread` với C/C++)
- [ ] Có test stress với số thread > số core không?
- [ ] Khi sửa: tôi có hiểu **vì sao** nó sai, hay chỉ làm nó biến mất?

## Công cụ
| Công cụ | Ngôn ngữ |
|---|---|
| ThreadSanitizer | C/C++/Go/Rust |
| `go test -race` | Go |
| Helgrind / DRD (valgrind) | C/C++ |
| Java Flight Recorder, `jcstress` | Java |
| `loom` | Rust — kiểm tra vét cạn interleaving |

## Tham khảo
- OSTEP ch.32 *Common Concurrency Problems*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf
- Lu, Park, Seo, Zhou — *Learning from Mistakes: A Comprehensive Study on Real World Concurrency Bug Characteristics* (ASPLOS '08): https://web.eecs.umich.edu/~xwangsd/pubs/asplos08.pdf
- ThreadSanitizer: https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual
- Preshing — *Memory Ordering at Compile Time / Weak vs Strong Memory Models*: https://preshing.com/20120930/weak-vs-strong-memory-models/
- Boehm — *Threads Cannot Be Implemented As a Library*: https://www.hpl.hp.com/techreports/2004/HPL-2004-209.pdf

## Liên kết
[[Deadlock]] · [[Lock]] · [[Thread]] · [[Condition Variable]] · [[OS]]
