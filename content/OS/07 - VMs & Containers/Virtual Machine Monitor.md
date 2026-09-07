---
tags: [os, virtualization, vm]
status: evergreen
---
# Virtual Machine Monitor

> Ảo hoá **cả một hệ điều hành**: hypervisor làm với OS đúng việc mà OS làm với [[Process]] — bán cho nó ảo giác sở hữu trọn phần cứng. Một tầng [[Limited Direct Execution]] nữa, chồng lên tầng cũ.

## 1. Hai loại hypervisor
| | Type 1 (bare-metal) | Type 2 (hosted) |
|---|---|---|
| Chạy trên | thẳng phần cứng | trên một OS chủ |
| Ví dụ | Xen, ESXi, Hyper-V, **KVM** (kernel Linux thành hypervisor) | VirtualBox, VMware Workstation, QEMU thuần |
| Hiệu năng | cao hơn | thấp hơn |
| Dùng cho | cloud, server | desktop, dev |

## 2. Ba thứ phải ảo hoá
| Tài nguyên | Vấn đề | Giải pháp |
|---|---|---|
| **CPU** | Guest OS nghĩ nó ở kernel mode, nhưng nó thực sự ở user mode | **Trap-and-emulate**: lệnh đặc quyền của guest gây trap về VMM, VMM giả lập kết quả |
| **Bộ nhớ** | Guest có page table riêng, nhưng "địa chỉ vật lý" của nó cũng là ảo | **Hai tầng dịch** → mục 3 |
| **I/O** | Guest tưởng nó nói chuyện với thiết bị thật | thiết bị giả lập, **virtio** (paravirtual), hoặc **passthrough/SR-IOV** |

**Vấn đề lịch sử của x86**: một số lệnh đặc quyền **không trap** khi chạy ở user mode — chúng âm thầm cho kết quả sai. Ba lời giải:
| Cách | Nội dung |
|---|---|
| **Binary translation** (VMware đời đầu) | quét và viết lại mã guest tại runtime |
| **Paravirtualization** (Xen) | **sửa guest OS** để nó gọi hypercall thay vì lệnh đặc quyền |
| **Hardware-assisted** (Intel VT-x, AMD-V) | thêm chế độ "ring −1" cho VMM → trap-and-emulate hoạt động đúng. Đây là cách hiện nay |

## 3. Bộ nhớ: ba tầng địa chỉ
```
guest virtual → guest physical → host physical
```
| Cách | Cơ chế | Đặc điểm |
|---|---|---|
| **Shadow page table** | VMM giữ bảng gộp ánh xạ thẳng guest-virtual → host-physical | nhanh khi chạy, nhưng VMM phải chặn mọi thay đổi page table của guest |
| **EPT / NPT** (nested paging, phần cứng) | MMU tự đi bộ **hai** cây | đơn giản hơn nhiều; nhưng một TLB miss có thể tốn tới ~24 lần đọc bộ nhớ |

→ **Huge page ở cả guest lẫn host** là tối ưu quan trọng nhất cho VM chạy workload bộ nhớ lớn. Xem [[Multi-level Page Table]].

## 4. VM vs Container
| | VM | [[Containers]] |
|---|---|---|
| Ảo hoá ở tầng | phần cứng | syscall / namespace |
| Kernel | **riêng cho mỗi VM** | **chung với host** |
| Ranh giới bảo mật | mạnh (bề mặt tấn công = hypervisor) | yếu hơn (bề mặt = toàn bộ syscall của kernel) |
| Khởi động | giây | mili giây |
| Overhead bộ nhớ | mỗi VM một kernel + OS | gần như 0 |
| Chạy OS khác | ✅ | ❌ (cùng kernel) |

**MicroVM** (Firecracker, Cloud Hypervisor) là đường giữa: cách ly cấp VM, khởi động ~100ms, bề mặt thiết bị tối giản — nền tảng của AWS Lambda và Fargate.

## 5. Cạm bẫy
- **Nested paging không miễn phí** — workload nhiều TLB miss (DB, in-memory cache) mất hiệu năng đáng kể trong VM.
- **Overcommit RAM cho VM** rồi để ballooning/swap hoạt động → latency thảm hoạ.
- **`steal time`** — CPU của bạn bị host lấy đi cho VM khác. Nhìn cột `st` trong `top`; đây là nguyên nhân "máy chậm mà không rõ vì sao" phổ biến trên cloud.
- **Đồng hồ trong VM trôi** — luôn chạy NTP/PTP hoặc dùng kvm-clock.
- **Bỏ qua I/O overhead của thiết bị giả lập** — dùng `virtio` thay vì thiết bị emulated (IDE/e1000).
- **Nghĩ VM cách ly hoàn toàn** — vẫn chia sẻ cache CPU, băng thông bộ nhớ; side-channel giữa VM là thật.

## 6. Checklist áp dụng
- [ ] `steal time` có cao không? (`top`, cột `st`; `sar -u`)
- [ ] Guest có dùng driver `virtio` cho disk và network không?
- [ ] Huge page đã bật ở host (và guest) cho workload bộ nhớ lớn chưa?
- [ ] Có overcommit CPU/RAM ở host không? Bao nhiêu?
- [ ] Workload này thực sự cần VM (cách ly mạnh, kernel riêng) hay container là đủ?
- [ ] Thời gian trong VM có đồng bộ không?

## Tham khảo
- OSTEP — *Virtual Machine Monitors*: https://pages.cs.wisc.edu/~remzi/OSTEP/vmm-intro.pdf
- Popek & Goldberg — *Formal Requirements for Virtualizable Third Generation Architectures* (1974): https://dl.acm.org/doi/10.1145/361011.361073
- Barham et al. — *Xen and the Art of Virtualization* (SOSP '03): https://www.cl.cam.ac.uk/research/srg/netos/papers/2003-xensosp.pdf
- Adams & Agesen — *A Comparison of Software and Hardware Techniques for x86 Virtualization*: https://dl.acm.org/doi/10.1145/1168857.1168860
- Firecracker (NSDI '20): https://www.usenix.org/conference/nsdi20/presentation/agache

## Liên kết
[[Containers]] · [[Limited Direct Execution]] · [[Multi-level Page Table]] · [[OS Security Fundamentals]] · [[OS]]
