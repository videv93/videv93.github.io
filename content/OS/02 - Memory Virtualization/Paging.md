---
tags: [os, virtualization, memory]
status: evergreen
---
# Paging

> Chia [[Address Space]] thành các **trang** cùng kích thước (thường 4KB) và RAM thành các **frame** cùng kích thước. Mọi đơn vị bằng nhau → **external fragmentation biến mất hoàn toàn**. Đây là mô hình bộ nhớ của mọi OS hiện đại.

## 1. Cơ chế dịch
Địa chỉ ảo tách làm hai phần:
```
| VPN (virtual page number) | offset |
```
- `offset` (12 bit với trang 4KB) đi thẳng sang địa chỉ vật lý, không đổi.
- `VPN` tra trong **page table** → `PFN` (physical frame number).
- `physical = PFN × pagesize + offset`.

Page table là **mảng theo process**, gốc của nó nằm trong thanh ghi `CR3` (x86) / `TTBR` (ARM), được đổi ở mỗi [[Context Switch]].

## 2. Nội dung một Page Table Entry
| Bit | Ý nghĩa | Ai dùng |
|---|---|---|
| **Valid / Present** | trang có ánh xạ không | phân biệt "chưa cấp" (→ SIGSEGV) và "bị swap" (→ nạp lại) |
| **Protection** (R/W/X) | quyền truy cập | NX bit, W^X, copy-on-write |
| **User/Supervisor** | user mode có được chạm không | [[User Mode vs Kernel Mode]] |
| **Accessed (A)** | đã bị chạm từ lần xoá gần nhất | [[Page Replacement Policy]] (clock algorithm) |
| **Dirty (D)** | đã bị ghi | quyết định có phải ghi ra swap/disk không |
| **PFN** | số frame vật lý | dịch địa chỉ |

## 3. Cái giá của paging
| Chi phí | Vì sao | Lời giải |
|---|---|---|
| **Chậm** — mỗi truy cập cần thêm ≥1 lần đọc bộ nhớ để tra page table | translation nằm trong RAM | [[Translation Lookaside Buffer]] |
| **Tốn chỗ** — page table tuyến tính cho 32-bit, trang 4KB, PTE 4B = **4MB/process** | mảng phẳng phải bao phủ cả không gian, kể cả phần không dùng | [[Multi-level Page Table]], inverted page table |

Hai vấn đề này chi phối toàn bộ hai chương tiếp theo của OSTEP.

## 4. Huge pages
| Kích thước | Bao phủ bởi 1 TLB entry | Dùng khi |
|---|---|---|
| 4KB (mặc định) | 4KB | mọi thứ |
| 2MB (huge) | 2MB — giảm TLB miss ~500× | DB, JVM heap lớn, in-memory cache |
| 1GB (gigantic) | 1GB | hypervisor, DB rất lớn |

**THP** (Transparent Huge Pages) của Linux tự gộp — tiện nhưng gây **latency spike** khi khử phân mảnh (khuyến nghị phổ biến cho DB: đặt `madvise` thay vì `always`).

## 5. Cạm bẫy
- **Nghĩ chương trình chạm bộ nhớ là chạm RAM.** Lần chạm đầu tiên vào trang mới thường là **page fault** → kernel cấp frame, xoá trắng nó (bảo mật), rồi mới tiếp tục.
- **Bật THP `always` cho database** — MongoDB, Redis, Oracle đều khuyến nghị tắt hoặc để `madvise`.
- **Bỏ qua chi phí zero-page.** Kernel phải xoá trang trước khi giao cho process — với cấp phát lớn, đây là chi phí thật.
- **Cho rằng trang liền nhau về mặt ảo thì liền nhau về vật lý** — sai, trừ khi dùng huge page hoặc bộ nhớ DMA-contiguous.

## 6. Checklist áp dụng
- [ ] Ứng dụng có nhiều **minor fault** không? (`/proc/<pid>/stat`, `ps -o min_flt,maj_flt`)
- [ ] Có major fault (đọc từ disk/swap) không? Đó mới là cái đắt.
- [ ] Working set có lớn hơn TLB coverage không → cân nhắc huge page.
- [ ] THP đang ở chế độ nào? (`cat /sys/kernel/mm/transparent_hugepage/enabled`)
- [ ] Kích thước trang của hệ thống là bao nhiêu? (`getconf PAGESIZE`)

## Tham khảo
- OSTEP ch.18 *Paging: Introduction*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf
- OSTEP homework `paging-linear-translate.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-paging
- Linux — Transparent Hugepage: https://docs.kernel.org/admin-guide/mm/transhuge.html
- Intel SDM Vol.3 ch.4 — Paging
- Drepper — *What Every Programmer Should Know About Memory*: https://people.freebsd.org/~lstewart/articles/cpumemory.pdf

## Liên kết
[[Address Translation]] · [[Translation Lookaside Buffer]] · [[Multi-level Page Table]] · [[Swapping]] · [[OS]]
