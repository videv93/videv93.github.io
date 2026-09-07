---
tags: [os, virtualization, memory]
status: evergreen
---
# Multi-level Page Table

> Page table phẳng phải bao phủ **toàn bộ** không gian ảo, kể cả phần không dùng — không khả thi ở 64-bit. Lời giải: **page table cũng được phân trang**, tổ chức thành cây, chỉ cấp nhánh nào thực sự có dữ liệu.

## 1. Vấn đề kích thước
| Kiến trúc | Bảng phẳng cần | Ghi chú |
|---|---|---|
| 32-bit, trang 4KB, PTE 4B | **4MB / process** | 100 process = 400MB chỉ để dịch địa chỉ |
| 48-bit ảo (x86-64 thực dùng) | **512GB** | hoàn toàn bất khả thi |

Mà [[Address Space]] thì **thưa** — phần lớn không được ánh xạ. Trả tiền cho chỗ trống là vô lý.

## 2. Cây nhiều tầng trên x86-64
```
địa chỉ ảo 48 bit = [ PML4 9b | PDPT 9b | PD 9b | PT 9b | offset 12b ]
CR3 → PML4 → PDPT → PD → PT → PFN
```
- Mỗi bảng vừa đúng **một trang 4KB** = 512 entry × 8B. Không ngẫu nhiên — đó là ràng buộc thiết kế.
- Mỗi entry có bit **valid**: nhánh không dùng thì không tồn tại → tiết kiệm khổng lồ.
- 5 tầng (**LA57**, 57-bit ảo) đã có trên CPU và Linux hiện đại cho không gian lớn hơn.

**Đánh đổi**: TLB miss giờ tốn **4 lần đọc bộ nhớ** thay vì 1 → điển hình của "time vs space". Bù lại bằng [[Translation Lookaside Buffer]] và **page-walk cache** trong CPU.

## 3. Các cấu trúc thay thế
| Cấu trúc | Ý tưởng | Dùng ở |
|---|---|---|
| **Multi-level (radix tree)** | cây theo bit của địa chỉ | x86-64, ARM64, RISC-V |
| **Inverted page table** | một bảng theo *frame vật lý*, tra bằng hash | PowerPC, Itanium |
| **Hashed page table** | hash (pid, VPN) → PTE | một số RISC cũ |

Inverted tiết kiệm bộ nhớ (kích thước tỉ lệ với RAM thật, không với không gian ảo) nhưng khó chia sẻ trang và tra cứu chậm hơn.

## 4. Huge page trong cây
Nếu đặt bit **PS (page size)** ở tầng PD → entry đó trỏ thẳng tới frame 2MB, bỏ qua tầng PT. Ở tầng PDPT → trang 1GB.
→ Vừa giảm số tầng phải đi bộ, vừa tăng TLB coverage. Xem [[Paging]] mục 4.

## 5. Cạm bẫy
- **Nghĩ page table là chi phí không đáng kể.** Với hàng nghìn process nhỏ (container, fork server), tổng page table là con số thật — đo bằng `PageTables` trong `/proc/meminfo`.
- **`fork()` process có heap lớn** → phải sao chép cây page table (dù dữ liệu là COW). Đây là lý do `posix_spawn` nhanh hơn nhiều.
- **Bỏ qua page-walk cost trong ảo hoá.** Với VM, mỗi truy cập phải qua **hai** cấp dịch (guest + EPT/NPT) → tệ nhất 4×4 = 24 lần đọc bộ nhớ cho một TLB miss → xem [[Virtual Machine Monitor]].
- **Chia sẻ bộ nhớ mà quên rằng page table không chia sẻ** — trừ khi dùng `MAP_SHARED` với hugetlbfs/shmem page table sharing.

## 6. Checklist áp dụng
- [ ] `PageTables` trong `/proc/meminfo` chiếm bao nhiêu RAM?
- [ ] App có `fork` từ process bộ nhớ lớn không? Có thay được bằng `posix_spawn`/pre-fork sớm không?
- [ ] Trong VM: đã bật huge page ở cả guest lẫn host chưa?
- [ ] Có cần LA57 (>128TB không gian) không, hay 4 tầng là đủ?

## Tham khảo
- OSTEP ch.20 *Paging: Smaller Tables*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf
- OSTEP homework `paging-multilevel-translate.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-smalltables
- Linux — Page Table Types / five-level paging: https://docs.kernel.org/mm/page_tables.html
- Intel SDM Vol.3 ch.4 — 4-level & 5-level paging
- AMD — Nested Paging (NPT) whitepaper: https://developer.amd.com/

## Liên kết
[[Paging]] · [[Translation Lookaside Buffer]] · [[Address Space]] · [[Virtual Machine Monitor]] · [[OS]]
