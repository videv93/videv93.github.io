---
tags: [os, virtualization, memory, cache]
status: evergreen
---
# Translation Lookaside Buffer

> Cache của MMU cho các ánh xạ VPN→PFN. Nó là lý do duy nhất khiến [[Paging]] không làm chương trình chậm gấp đôi. Hiểu TLB = hiểu vì sao locality quan trọng đến thế.

## 1. Luồng xử lý một truy cập
```
extract VPN → tra TLB
  ├─ HIT  → ghép PFN + offset → truy cập (nhanh, ~1 chu kỳ)
  └─ MISS → đi bộ page table trong RAM ([[Multi-level Page Table]])
            → nạp vào TLB → thử lại lệnh
```
TLB nhỏ (thường 64–1536 entry) nhưng tỉ lệ hit thường >99% — nhờ **locality**.

| Loại locality | Nghĩa | Ví dụ |
|---|---|---|
| **Spatial** | chạm địa chỉ gần nhau | duyệt mảng — 1 trang 4KB chứa 1024 int → 1 miss cho 1023 hit |
| **Temporal** | chạm lại địa chỉ cũ | vòng lặp trên cùng dữ liệu |

## 2. Ai xử lý TLB miss
| Kiểu | Ai đi bộ page table | Ví dụ |
|---|---|---|
| **Hardware-managed** | MMU tự đi (page-table walker) | x86, ARM — OS chỉ cần đặt đúng định dạng bảng |
| **Software-managed** | CPU trap về OS, OS đi bộ và nạp TLB | MIPS, SPARC — OS tự do chọn cấu trúc dữ liệu bảng |

Software-managed linh hoạt hơn nhưng chậm hơn; cần TLB entry riêng cho chính handler (nếu không sẽ miss vô hạn).

## 3. Vấn đề [[Context Switch]]
Đổi process → mọi ánh xạ trong TLB thành sai. Hai giải pháp:
| Cách | Chi phí |
|---|---|
| **Flush toàn bộ** | process mới bắt đầu với TLB rỗng → hàng loạt miss |
| **ASID/PCID** — gắn nhãn process cho mỗi entry | không cần flush; cần bit ASID trong TLB |

x86 hiện đại có **PCID**; ARM có **ASID**. KPTI (mitigation Meltdown) làm chuyện này phức tạp hơn vì phải đổi page table mỗi lần vào kernel — PCID giúp giảm đáng kể chi phí đó.

## 4. TLB là bức tường mở rộng
- Kích thước TLB **không tăng kịp** với dung lượng RAM. TLB 1500 entry × 4KB ≈ **6MB coverage** — bé xíu so với heap hàng chục GB.
- Với working set lớn và truy cập ngẫu nhiên (hash table, index DB), **TLB miss trở thành bottleneck chính**, không phải cache dữ liệu.
- Lời giải chính: **huge page** (2MB → cùng số entry mà coverage gấp 512×). Đây là lý do DB nào cũng nói về huge page.

## 5. Cạm bẫy
- **Duyệt mảng theo cột** (`a[j][i]`) → phá cả cache lẫn TLB. Đổi thứ tự vòng lặp là tối ưu rẻ nhất trong lịch sử.
- **Cấu trúc dữ liệu con trỏ rải rác** (linked list, cây node nhỏ) → mỗi lần nhảy có thể là một TLB miss. Ưu tiên **cấu trúc dạng mảng** (SoA, B-tree node lớn).
- **Bật THP mù quáng** — giảm TLB miss nhưng có thể gây stall khi kernel phải khử phân mảnh.
- **Đo TLB bằng benchmark có working set nhỏ** → luôn hit, không thấy vấn đề.

## 6. Checklist áp dụng
- [ ] Đo `dTLB-load-misses`, `iTLB-load-misses` (`perf stat`) — tỉ lệ so với tổng load là bao nhiêu?
- [ ] Working set có vượt TLB coverage không? (số entry × pagesize)
- [ ] Vòng lặp có duyệt đúng thứ tự bộ nhớ không?
- [ ] Có thay được cấu trúc con trỏ bằng mảng liên tục không?
- [ ] Với heap lớn: đã thử `madvise(MADV_HUGEPAGE)` và đo chưa?

## Tham khảo
- OSTEP ch.19 *Paging: Faster Translations (TLBs)*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf
- OSTEP homework `tlb.py` (đo TLB thực nghiệm): https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-tlb
- Drepper — *What Every Programmer Should Know About Memory*: https://people.freebsd.org/~lstewart/articles/cpumemory.pdf
- Basu et al. — *Efficient Virtual Memory for Big Memory Servers* (ISCA '13): https://research.cs.wisc.edu/multifacet/papers/isca13_direct_segment.pdf
- `perf stat` counters: https://perf.wiki.kernel.org/

## Liên kết
[[Paging]] · [[Multi-level Page Table]] · [[Context Switch]] · [[Multiprocessor Scheduling]] · [[OS]]
