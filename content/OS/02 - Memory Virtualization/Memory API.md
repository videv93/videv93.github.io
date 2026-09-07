---
tags: [os, virtualization, memory, api]
status: evergreen
---
# Memory API

> Ranh giới giữa cái *thư viện* làm (`malloc`/`free`) và cái *kernel* làm (`mmap`/`brk`). Hiểu sai ranh giới này là gốc của gần như mọi hiểu nhầm về "chương trình của tôi không trả RAM về hệ thống".

## 1. Hai tầng
| Tầng | API | Ai cấp | Đơn vị |
|---|---|---|---|
| Thư viện | `malloc`, `calloc`, `realloc`, `free` | allocator trong libc | byte |
| Kernel | `mmap`, `munmap`, `brk`, `mprotect`, `madvise` | kernel | trang (4KB) |

`malloc` **không phải syscall**. Nó xin bộ nhớ từ kernel theo khối lớn (qua `brk` hoặc `mmap`) rồi tự chia nhỏ → [[Free Space Management]]. `free` trả về **allocator**, không nhất thiết trả về OS.

## 2. `mmap` — con dao đa năng
| Cách dùng | Cờ | Ứng dụng |
|---|---|---|
| Cấp bộ nhớ ẩn danh | `MAP_ANONYMOUS \| MAP_PRIVATE` | nền tảng của malloc khối lớn |
| Ánh xạ file | `MAP_PRIVATE` / `MAP_SHARED` | đọc file lớn, database |
| Bộ nhớ chia sẻ giữa process | `MAP_SHARED` + `shm_open` | IPC hiệu năng cao |
| Đặt quyền | `mprotect(PROT_READ)` | guard page, JIT W^X |
| Gợi ý cho kernel | `madvise(MADV_SEQUENTIAL/WILLNEED/DONTNEED)` | tối ưu prefetch, trả trang |

## 3. Các lỗi bộ nhớ kinh điển
| Lỗi | Triệu chứng | Công cụ bắt |
|---|---|---|
| **Quên `free`** (leak) | RSS tăng dần | valgrind, heaptrack |
| **Dangling pointer / use-after-free** | crash ngẫu nhiên, lỗ hổng bảo mật | ASan |
| **Double free** | corrupt heap metadata | ASan, glibc tcache check |
| **Buffer overflow** | ghi đè dữ liệu kề bên | ASan, `-fstack-protector` |
| **Uninitialized read** | hành vi bất định | MSan, valgrind |
| **Off-by-one** với chuỗi | quên byte `\0` | ASan |

> `malloc(strlen(s))` thiếu 1 byte cho `\0` — vẫn là bug phổ biến nhất trong C sau 40 năm.

## 4. Vì sao "free rồi mà RSS không giảm"
1. Allocator giữ lại để tái dùng (tránh syscall lần sau).
2. `brk` chỉ co được khi vùng **cuối** heap trống — một object nhỏ ở đỉnh giữ nguyên cả heap.
3. Phân mảnh: nhiều lỗ trống nhỏ, không lỗ nào đủ trả nguyên trang.
4. Cách ép trả: dùng `mmap` cho khối lớn (glibc tự làm khi ≥ `M_MMAP_THRESHOLD`), `malloc_trim()`, `madvise(MADV_DONTNEED)`, hoặc đổi allocator.

| Allocator | Đặc điểm | Link |
|---|---|---|
| **glibc malloc** (ptmalloc) | mặc định, arena theo thread | https://sourceware.org/glibc/wiki/MallocInternals |
| **jemalloc** | phân mảnh thấp, profiling tốt | https://jemalloc.net/ |
| **tcmalloc** | nhanh cho app đa luồng | https://google.github.io/tcmalloc/ |
| **mimalloc** | nhỏ gọn, hiệu năng cao | https://github.com/microsoft/mimalloc |

## 5. Cạm bẫy
- **Dùng `mmap` file rồi coi như đọc rẻ.** Mỗi lần chạm trang chưa nạp là một page fault + I/O đồng bộ; và lỗi I/O đến dưới dạng `SIGBUS`, không phải mã lỗi.
- **`realloc` trả về con trỏ mới** — gán lại, và đừng gán trực tiếp lên con trỏ cũ (rò rỉ khi thất bại).
- **`free(NULL)` là hợp lệ**; `free` hai lần thì không.
- **Tin `valgrind` cho app đa luồng hiệu năng cao** — chậm 20–50×; ASan/TSan thực tế hơn.
- **Quên `munmap`** — leak vùng ảo, cuối cùng chạm trần `max_map_count`.

## 6. Checklist áp dụng
- [ ] Build debug có bật `-fsanitize=address,undefined` chưa?
- [ ] Có kiểm tra `malloc` trả `NULL` không?
- [ ] Mọi đường thoát khỏi hàm (kể cả lỗi) có giải phóng đủ không?
- [ ] Với khối lớn: có dùng `mmap`/`madvise` thay vì heap không?
- [ ] Đã đo phân mảnh trước khi kết luận "leak" chưa?

## Tham khảo
- OSTEP ch.14 *Interlude: Memory API*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-api.pdf
- `mmap(2)`, `madvise(2)`: https://man7.org/linux/man-pages/man2/mmap.2.html
- glibc malloc internals: https://sourceware.org/glibc/wiki/MallocInternals
- AddressSanitizer: https://github.com/google/sanitizers/wiki/AddressSanitizer
- Andrew Crotty et al. — *Are You Sure You Want to Use MMAP in Your DBMS?*: https://db.cs.cmu.edu/mmap-cidr2022/

## Liên kết
[[Address Space]] · [[Free Space Management]] · [[Paging]] · [[System Call]] · [[OS]]
