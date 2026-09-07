---
tags: [os, foundation, roadmap]
status: evergreen
---
# OS Learning Roadmap

> Thứ tự học để kiến thức xếp chồng lên nhau thay vì rời rạc. Mỗi chặng có **điều kiện tiên quyết**, **note phải đọc**, và **bài kiểm tra tự thân** — nếu không trả lời được câu hỏi cuối chặng thì chưa nên đi tiếp.

## Chặng 0 — Khung tư duy (1–2 ngày)
| Đọc | Làm |
|---|---|
| [[Operating System]], [[Three Easy Pieces]], [[OSTEP Book Map]] | Đọc 3 dialogue mở đầu của OSTEP |

**Tự kiểm:** Giải thích trong 2 phút vì sao OS tồn tại, và ba câu hỏi lớn nó trả lời là gì?

## Chặng 1 — Cơ chế nền (3–5 ngày)
| Đọc | Làm |
|---|---|
| [[User Mode vs Kernel Mode]], [[System Call]], [[Limited Direct Execution]], [[Context Switch]] | `strace ls`, đọc output; `vmstat 1` khi máy bận |

**Tự kiểm:** Vẽ được đường đi từ `printf("hi")` tới lúc ký tự ra màn hình, chỉ rõ chỗ nào vượt ranh giới user/kernel?

## Chặng 2 — Ảo hoá CPU (1 tuần)
| Đọc | Làm |
|---|---|
| [[Process]], [[Process API]], [[CPU Scheduling]], [[Multi-level Feedback Queue]], [[Proportional Share Scheduling]], [[Multiprocessor Scheduling]] | Chạy `scheduler.py`, `mlfq.py`; viết một shell nhỏ có `>` và `\|` |

**Tự kiểm:** Vì sao không thể tối ưu đồng thời turnaround và response time? MLFQ vá hai lỗ hổng nào?

## Chặng 3 — Ảo hoá bộ nhớ (1.5–2 tuần, phần khó nhất)
| Đọc | Làm |
|---|---|
| [[Address Space]], [[Address Translation]], [[Segmentation]], [[Free Space Management]], [[Memory API]], [[Paging]], [[Translation Lookaside Buffer]], [[Multi-level Page Table]], [[Swapping]], [[Page Replacement Policy]] | Chạy `paging-linear-translate.py`, `paging-multilevel-translate.py`, `paging-policy.py`, `malloc.py`; đọc `/proc/self/maps` |

**Tự kiểm:** Dịch một địa chỉ ảo qua page table 2 tầng bằng tay? Vì sao TLB quan trọng hơn kích thước page table?

## Chặng 4 — Đồng thời (1.5–2 tuần)
| Đọc | Làm |
|---|---|
| [[Thread]], [[Lock]], [[Concurrent Data Structures]], [[Condition Variable]], [[Semaphore]], [[Deadlock]], [[Concurrency Bugs]], [[Event-based Concurrency]] | Viết bounded buffer bằng cả CV lẫn semaphore; cố tình tạo deadlock rồi bắt bằng gdb; chạy TSan |

**Tự kiểm:** Vì sao `cond_wait` phải nằm trong `while`? Bốn điều kiện Coffman và cách phá từng cái?

## Chặng 5 — Bền vững (2 tuần)
| Đọc | Làm |
|---|---|
| [[IO Devices]], [[Hard Disk Drive]], [[RAID]], [[Files and Directories]], [[File System Implementation]], [[Fast File System]], [[Crash Consistency and Journaling]], [[Log-structured File System]], [[Flash-based SSD]], [[Data Integrity and Protection]] | Chạy `vsfs.py`, `raid.py`; viết chương trình ghi file an toàn (tmp→fsync→rename→fsync dir); `fio` một benchmark |

**Tự kiểm:** Kể ba lần ghi cần thiết khi append một block, và hậu quả nếu crash sau mỗi cái? Vì sao journaling rẻ hơn `fsck`?

## Chặng 6 — Phân tán & bảo mật (1 tuần)
| Đọc | Làm |
|---|---|
| [[Distributed Systems]], [[Network File System]], [[Andrew File System]], [[OS Security Fundamentals]], [[Authentication]], [[Access Control]], [[Cryptography in OS]] | Audit quyền một dịch vụ thật; viết retry có backoff + jitter |

**Tự kiểm:** Vì sao NFS chọn stateless? "Exactly-once" đạt được bằng cách nào?

## Chặng 7 — Hiện đại hoá & thực hành (liên tục)
| Đọc | Làm |
|---|---|
| [[Virtual Machine Monitor]], [[Containers]], [[Linux Observability Tools]], [[xv6 and Lab Projects]] | Làm lab xv6; áp USE method vào một sự cố thật |

**Tự kiểm:** Container khác VM ở ranh giới bảo mật nào? Tôi debug được một sự cố hiệu năng thật từ đầu tới cuối chưa?

---

## Bảng nguồn học nền tảng
| Nguồn | Loại | Link |
|---|---|---|
| **OSTEP** (Arpaci-Dusseau) | sách chính, miễn phí | https://pages.cs.wisc.edu/~remzi/OSTEP/ |
| OSTEP homework simulators | thực hành | https://github.com/remzi-arpacidusseau/ostep-homework |
| MIT 6.1810 + xv6 | lab kernel | https://pdos.csail.mit.edu/6.1810/ |
| `man7.org` | tra API chuẩn | https://man7.org/linux/man-pages/ |
| Linux kernel docs | tham chiếu | https://docs.kernel.org/ |
| Brendan Gregg — Systems Performance | vận hành, đo đạc | https://www.brendangregg.com/ |
| Drepper — What Every Programmer Should Know About Memory | bộ nhớ & cache | https://people.freebsd.org/~lstewart/articles/cpumemory.pdf |
| Kleppmann — DDIA | nối sang hệ phân tán | https://dataintensive.net/ |

## Quy ước `status` trong vault này
`seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá). Khi làm xong lab hoặc gặp bug thật, hãy thêm vào mục **Cạm bẫy** của note tương ứng — đó là cách vault lớn lên.

## Checklist áp dụng
- [ ] Tôi đang ở chặng nào? Đã trả lời được câu tự kiểm của chặng trước chưa?
- [ ] Chương đang đọc có simulator không? Đã chạy chưa?
- [ ] Tuần này tôi có thêm ít nhất một mục "cạm bẫy" từ trải nghiệm thật vào một note không?
- [ ] Có note nào còn `status: growing` mà tôi đã thực sự nắm vững, cần nâng lên `evergreen` không?

## Tham khảo
- OSTEP — sách chính, miễn phí: https://pages.cs.wisc.edu/~remzi/OSTEP/
- OSTEP homework simulators: https://github.com/remzi-arpacidusseau/ostep-homework
- MIT 6.1810 — Operating System Engineering (xv6 labs): https://pdos.csail.mit.edu/6.1810/
- Linux kernel documentation: https://docs.kernel.org/
- Brendan Gregg — Linux Performance: https://www.brendangregg.com/linuxperf.html

## Liên kết
[[OS]] · [[OSTEP Book Map]] · [[Three Easy Pieces]] · [[xv6 and Lab Projects]] · [[Linux Observability Tools]]
