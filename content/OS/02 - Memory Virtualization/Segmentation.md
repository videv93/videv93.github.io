---
tags: [os, virtualization, memory]
status: evergreen
---
# Segmentation

> Thay vì một cặp base/bounds cho cả [[Address Space]], cấp cho **mỗi vùng logic** (code, heap, stack) một cặp riêng. Giải quyết được lãng phí vùng trống ở giữa — nhưng đẻ ra external fragmentation, và cuối cùng thua [[Paging]].

## 1. Ý tưởng
| Segment | Base | Size | Quyền | Hướng lớn |
|---|---|---|---|---|
| Code | 32K | 2K | r-x | ↑ |
| Heap | 34K | 3K | rw- | ↑ |
| Stack | 28K | 2K | rw- | ↓ (grows negative) |

Địa chỉ ảo được tách thành **`(segment number, offset)`** — vài bit đầu chọn segment, phần còn lại là offset trong segment. Truy cập ngoài `size` → **segmentation fault** (đây chính là nguồn gốc cái tên).

## 2. Điều nó làm được mà base/bounds không làm được
- **Không cấp RAM cho vùng trống giữa heap và stack** → tiết kiệm lớn với address space thưa.
- **Chia sẻ segment**: đặt code segment là read-execute rồi cho nhiều process trỏ chung → một bản libc trong RAM. Đây là lần đầu bit quyền per-region xuất hiện.
- **Bảo vệ theo vùng**: code không ghi được, data không chạy được (tiền thân của NX).

## 3. Vì sao nó thất bại: external fragmentation
Segment có **kích thước tuỳ ý** → sau một thời gian cấp/thu, RAM vật lý đầy lỗ nhỏ rải rác. Tổng còn trống 20MB nhưng không lỗ nào đủ 8MB liền mạch.

Hai hướng chữa, đều tệ:
| Cách | Vấn đề |
|---|---|
| **Compaction** — dồn segment lại cho liền | tốn CPU khủng khiếp, phải dừng process khi copy |
| **Free-list policy khéo** (best-fit, worst-fit, buddy) → [[Free Space Management]] | chỉ giảm chứ không khử được phân mảnh |

[[Paging]] giết vấn đề tận gốc bằng cách làm **mọi đơn vị cấp phát bằng nhau**.

## 4. Di sản của segmentation hôm nay
- x86-64 gần như bỏ segmentation, nhưng giữ **FS/GS base** — dùng cho **thread-local storage** và cho `%gs` trỏ tới per-CPU data trong kernel.
- Khái niệm "segment" vẫn sống trong ELF (`.text`, `.data`, program headers) — nhưng đó là segment của **linker**, được hiện thực bằng paging, không phải segmentation phần cứng.
- Tên lỗi **SIGSEGV** vẫn còn dù cơ chế đã đổi.

## 5. Cạm bẫy
- **Nhầm "segment" trong ELF với segment phần cứng.** Chúng chỉ trùng tên.
- **Nghĩ segfault nghĩa là "vượt segment"**. Trên hệ paging hiện đại, nó nghĩa là "truy cập trang không được ánh xạ, hoặc sai quyền".
- **Coi external fragmentation là chuyện của quá khứ** — nó vẫn sống nguyên vẹn trong [[Free Space Management]] ở tầng malloc và trong các allocator của database, GC.

## 6. Checklist áp dụng
- [ ] Tôi phân biệt được internal vs external fragmentation chưa? (internal = cấp thừa trong khối; external = trống nhưng rời rạc)
- [ ] Allocator của tôi có bị external fragmentation không? (RSS cao mà live heap thấp)
- [ ] Khi thiết kế allocator riêng: kích thước khối có được chuẩn hoá thành vài class cố định không?
- [ ] Có vùng nào cần quyền riêng (read-only, no-exec) mà tôi chưa đặt bằng `mprotect` không?

## Tham khảo
- OSTEP ch.16 *Segmentation*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf
- OSTEP homework `segmentation.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-segmentation
- Intel SDM Vol.3 — Segmentation in IA-32e mode
- ELF spec — program headers/segments: https://refspecs.linuxfoundation.org/elf/elf.pdf

## Liên kết
[[Address Translation]] · [[Paging]] · [[Free Space Management]] · [[Address Space]] · [[OS]]
