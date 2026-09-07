---
tags: [os, virtualization, memory]
status: evergreen
---
# Address Space

> Ảo giác mà OS bán cho mỗi [[Process]]: "toàn bộ bộ nhớ máy là của bạn, bắt đầu từ địa chỉ 0". Mọi kỹ thuật trong `02 - Memory Virtualization` tồn tại để dựng và duy trì ảo giác này.

## 1. Ba mục tiêu của ảo hoá bộ nhớ
| Mục tiêu | Nghĩa | Cơ chế |
|---|---|---|
| **Transparency** | Chương trình không biết mình đang bị ảo hoá | [[Address Translation]] bằng phần cứng |
| **Efficiency** | Không quá chậm về thời gian, không quá tốn về không gian | [[Translation Lookaside Buffer]], [[Multi-level Page Table]] |
| **Protection** | Tiến trình không đọc/ghi được bộ nhớ của tiến trình khác hay của kernel | bit quyền trong page table + [[User Mode vs Kernel Mode]] |

## 2. Bố cục address space kinh điển
| Vùng | Nội dung | Hướng lớn lên | Ghi chú |
|---|---|---|---|
| **Text** | mã máy | cố định | read-only + execute, chia sẻ được giữa các process cùng binary |
| **Data / BSS** | biến toàn cục | cố định | BSS khởi tạo 0, không tốn chỗ trên đĩa |
| **Heap** | cấp phát động | ↓ lên trên | quản lý bởi [[Free Space Management]] |
| **mmap region** | thư viện chia sẻ, file mapping, malloc lớn | ở giữa | |
| **Stack** | frame hàm, biến cục bộ | ↑ xuống dưới | mỗi [[Thread]] một stack riêng |
| **Kernel** | (nửa trên trên 64-bit) | — | không truy cập được từ user mode |

Heap và stack đặt ở hai đầu và mọc về phía nhau vì **không biết trước cái nào cần bao nhiêu** — cách đơn giản nhất để chia không gian co giãn được.

## 3. Ảo giác này rẻ đến mức nào
- Address space **thưa** (sparse): 64-bit cho không gian khổng lồ nhưng chỉ vài MB thực sự được ánh xạ.
- **Lazy allocation**: `malloc` lớn hay `mmap` chỉ tạo ánh xạ; RAM vật lý chỉ được cấp khi chạm vào (page fault đầu tiên).
- **Copy-on-write**: `fork()` không copy bộ nhớ; hai process dùng chung trang read-only, chỉ tách khi có bên ghi.
- **Chia sẻ**: libc chỉ nằm một bản trong RAM dù 200 process dùng.

→ Vì thế **VSZ (virtual size) gần như vô nghĩa** khi đánh giá mức dùng RAM; nhìn **RSS** (resident) và tốt hơn nữa là **PSS** (chia đều phần chia sẻ).

## 4. Bảo mật dựa trên address space
| Kỹ thuật | Chống lại |
|---|---|
| **ASLR** — ngẫu nhiên hoá vị trí stack/heap/lib | khai thác dựa vào địa chỉ cố định |
| **NX / DEP** — trang data không execute | shellcode trên stack |
| **Guard page** — trang không ánh xạ giữa các vùng | stack overflow tràn sang vùng khác |
| **W^X** — không trang nào vừa ghi vừa chạy | JIT spraying |
| **KASLR / KPTI** | rò rỉ layout kernel (Meltdown) |

## 5. Cạm bẫy
- **Đọc `VSZ` trong `top` rồi hoảng.** Java/Go thường reserve hàng chục GB ảo.
- **Cộng RSS của mọi process để tính RAM đã dùng** → tính trùng phần chia sẻ. Dùng PSS (`smem`, `/proc/<pid>/smaps_rollup`).
- **Nghĩ `malloc` thành công nghĩa là có RAM.** Với overcommit, RAM chỉ được cấp lúc chạm; hết thật thì OOM killer ra tay.
- **Stack của thread nhỏ hơn nhiều so với main stack** (mặc định 8MB main vs 512KB–8MB thread tuỳ hệ) → đệ quy sâu sập chỉ trong thread.

## 6. Checklist áp dụng
- [ ] Tôi đang nhìn VSZ hay RSS/PSS?
- [ ] Bộ nhớ tăng là do heap, mmap, hay page cache? (`/proc/<pid>/smaps`)
- [ ] Có vùng nào vừa `w` vừa `x` không? (rủi ro bảo mật)
- [ ] Số vùng mapping có phình bất thường không? (`wc -l /proc/<pid>/maps`, giới hạn `max_map_count`)
- [ ] Overcommit đang đặt thế nào? (`/proc/sys/vm/overcommit_memory`)

## Tham khảo
- OSTEP ch.13 *The Abstraction: Address Spaces*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf
- OSTEP ch.23 *Complete Virtual Memory Systems*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf
- `proc(5)` — `maps`, `smaps`: https://man7.org/linux/man-pages/man5/proc.5.html
- Linux memory management docs: https://docs.kernel.org/admin-guide/mm/index.html
- Gustavo Duarte — *Anatomy of a Program in Memory*: https://manybutfinite.com/post/anatomy-of-a-program-in-memory/

## Liên kết
[[Address Translation]] · [[Paging]] · [[Memory API]] · [[Free Space Management]] · [[Swapping]] · [[OS]]
