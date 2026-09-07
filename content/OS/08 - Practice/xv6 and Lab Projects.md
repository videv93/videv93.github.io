---
tags: [os, practice]
status: growing
---
# xv6 and Lab Projects

> Đọc [[OSTEP Book Map]] cho bạn từ vựng; **viết code kernel** mới cho bạn hiểu. xv6 là một UNIX v6 viết lại bằng C hiện đại, đủ nhỏ để đọc hết (~10k dòng) và đủ thật để chạy trên RISC-V/QEMU.

## 1. Ba mức thực hành, tăng dần
| Mức | Việc | Thời gian | Được gì |
|---|---|---|---|
| **1. OSTEP homework simulators** | chạy `scheduler.py`, `paging-*.py`, `malloc.py` | vài giờ | trực giác về chính sách; bắt buộc trước khi đọc tiếp |
| **2. OSTEP projects** (Wisconsin) | tự viết shell, scheduler, memory allocator, file system trong user space | vài tuần | biết API hoạt động thật ra sao |
| **3. xv6 labs (MIT 6.1810)** | sửa **kernel thật**: syscall, page table, copy-on-write, lazy allocation, thread, lock, file system, mmap | vài tháng | hiểu ở mức không đọc sách nào thay được |

## 2. Lộ trình xv6 lab (MIT 6.1810)
| Lab | Nội dung | Note liên quan |
|---|---|---|
| **util** | viết chương trình user (`xargs`, `pingpong`) | [[Process API]] |
| **syscall** | thêm system call mới (`trace`, `sysinfo`) | [[System Call]] |
| **pgtbl** | in page table, ánh xạ per-process kernel page | [[Multi-level Page Table]] |
| **traps** | backtrace, alarm/signal | [[Limited Direct Execution]] |
| **cow** | copy-on-write fork | [[Address Space]], [[Paging]] |
| **thread** | user-level thread switch, barrier | [[Thread]], [[Context Switch]] |
| **net** | driver E1000 | [[IO Devices]] |
| **lock** | giảm contention allocator + buffer cache | [[Lock]], [[Concurrent Data Structures]] |
| **fs** | large file (double indirect), symlink | [[File System Implementation]] |
| **mmap** | cài đặt `mmap`/`munmap` | [[Memory API]] |

## 3. Kỹ năng cần trước khi bắt đầu
- **C**: con trỏ, con trỏ hàm, struct, `Makefile`. Nếu chưa vững, K&R là đủ.
- **gdb**: breakpoint, `x/`, `info registers`, `layout asm`. Lab xv6 chạy `make qemu-gdb`.
- **Assembly cơ bản** (RISC-V trong 6.1810): đọc được, không cần viết.
- **git**: mỗi lab một branch.

## 4. Cách học hiệu quả
1. **Đọc chương → chạy simulator → làm lab** theo đúng thứ tự. Bỏ simulator là bỏ mất phần trực giác.
2. **Đọc mã xv6 trước khi sửa.** `kernel/proc.c`, `kernel/vm.c`, `kernel/trap.c` là ba file quan trọng nhất.
3. **Viết lại bằng lời** cơ chế vừa học trước khi code — nếu không giải thích được thì chưa hiểu.
4. Khi kẹt: đọc **panic message** và dùng `gdb`, đừng đoán. Kernel không có stack trace đẹp.
5. Ghi lại mỗi bug lạ vào note tương ứng ở mục **Cạm bẫy** — đó là cách vault này lớn lên.

## 5. Cạm bẫy khi học
- **Đọc hết sách rồi mới làm lab** → quên gần hết. Xen kẽ.
- **Copy lời giải trên GitHub** — lab xv6 chỉ có giá trị khi tự vật lộn.
- **Không dùng debugger** — mất nhiều giờ cho thứ `gdb` chỉ ra trong 2 phút.
- **Bỏ qua phần đọc mã** và nhảy thẳng vào sửa.

## 6. Checklist áp dụng
- [ ] Đã chạy được `make qemu` cho xv6 chưa?
- [ ] Đã set up `gdb` với `make qemu-gdb` chưa?
- [ ] Chương vừa đọc có simulator không? Đã chạy chưa?
- [ ] Sau mỗi lab: tôi có ghi lại vào note tương ứng điều gì mình hiểu sai lúc đầu không?
- [ ] Đã cập nhật `status` của note liên quan từ `growing` sang `evergreen` chưa?

## Tham khảo
- MIT 6.1810 — Operating System Engineering (labs + xv6 book): https://pdos.csail.mit.edu/6.1810/
- xv6 source (RISC-V): https://github.com/mit-pdos/xv6-riscv
- *xv6: a simple, Unix-like teaching operating system* (book): https://pdos.csail.mit.edu/6.1810/2023/xv6/book-riscv-rev3.pdf
- OSTEP projects: https://github.com/remzi-arpacidusseau/ostep-projects
- OSTEP homework simulators: https://github.com/remzi-arpacidusseau/ostep-homework

## Liên kết
[[OS Learning Roadmap]] · [[OSTEP Book Map]] · [[Linux Observability Tools]] · [[OS]]
