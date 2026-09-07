---
tags: [os, virtualization, memory, mechanism]
status: evergreen
---
# Address Translation

> Cơ chế biến địa chỉ ảo thành địa chỉ vật lý ở **mỗi lần truy cập bộ nhớ**, do phần cứng (MMU) làm, dưới sự điều khiển của OS. Đây là bản sao của [[Limited Direct Execution]] áp cho bộ nhớ: chạy trực tiếp, chỉ can thiệp khi cần.

## 1. Phân công lao động
| Ai | Làm gì | Khi nào |
|---|---|---|
| **Phần cứng (MMU)** | dịch địa chỉ, kiểm tra bound/quyền, sinh trap khi vi phạm | mỗi lần truy cập |
| **OS** | thiết lập bảng dịch, quản lý bộ nhớ trống, xử lý trap | khi tạo process, page fault, [[Context Switch]] |

Nếu OS phải can thiệp mỗi lần truy cập thì chương trình chậm hàng trăm lần. Vì vậy: **cơ chế nằm ở phần cứng, chính sách nằm ở OS**.

## 2. Base and Bounds (dynamic relocation) — mô hình đơn giản nhất
```
physical = virtual + base        (nếu virtual < bounds, ngược lại → trap)
```
| Ưu | Nhược |
|---|---|
| Cực rẻ: 1 phép cộng + 1 so sánh | **Internal fragmentation** — vùng giữa stack và heap trống nhưng vẫn chiếm RAM |
| Relocate được process khi đang chạy (chỉ đổi `base`) | Address space phải **liên tục** trong RAM vật lý |
| Bảo vệ đơn giản, đủ mạnh | Không chia sẻ được vùng nhớ giữa process |

Hai thanh ghi `base`/`bounds` nằm trong MMU và **chỉ sửa được ở kernel mode** — nếu không, process tự đổi base là chiếm cả máy.

## 3. Đường tiến hoá
| Bước | Giải quyết | Vấn đề còn lại |
|---|---|---|
| Base & Bounds | bảo vệ + relocation | lãng phí vùng trống ở giữa |
| [[Segmentation]] | mỗi vùng (code/heap/stack) một cặp base/bounds | **external fragmentation** |
| [[Paging]] | chia đều thành trang cố định | page table to → [[Multi-level Page Table]], dịch chậm → [[Translation Lookaside Buffer]] |

Mọi CPU hiện đại dùng paging; segmentation chỉ còn dấu vết (FS/GS trên x86-64 cho thread-local storage).

## 4. Những gì OS phải giữ
- **Free list** bộ nhớ vật lý.
- Trong PCB: base/bounds hoặc con trỏ tới page table gốc.
- **Exception handler**: segmentation fault, page fault → quyết định kill process hay nạp trang.
- Lúc [[Context Switch]]: lưu/khôi phục thanh ghi dịch (base, hoặc CR3).

## 5. Cạm bẫy
- **Nghĩ "địa chỉ ảo là fake, địa chỉ vật lý là thật".** Đúng hơn: địa chỉ ảo là *thứ chương trình dùng*, và với nó, đó là thứ duy nhất tồn tại. In con trỏ ra rồi so sánh giữa hai process là vô nghĩa.
- **Cho rằng địa chỉ liền nhau là RAM liền nhau.** Không, với paging thì hai trang kề nhau về địa chỉ ảo có thể ở hai đầu RAM.
- **Bỏ qua chi phí dịch.** Không có TLB thì mỗi truy cập tốn thêm ít nhất một lần đọc bộ nhớ.
- **Debug bằng địa chỉ tuyệt đối** khi ASLR đang bật → mỗi lần chạy lại một khác; tắt tạm bằng `setarch -R`.

## 6. Checklist áp dụng
- [ ] Segfault: địa chỉ lỗi là gì? Gần NULL (con trỏ null) hay rác (con trỏ hỏng)?
- [ ] Có phải lỗi quyền (ghi vào trang read-only) không? → xem `dmesg`, core dump
- [ ] Khi so sánh con trỏ giữa các process: tôi có đang so địa chỉ ảo không?
- [ ] Đã thử `setarch -R` để tái hiện ổn định chưa?

## Tham khảo
- OSTEP ch.15 *Mechanism: Address Translation*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf
- OSTEP homework `relocation.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-mechanism
- Intel SDM Vol.3 — Paging & Memory Management
- Linux — Memory Management docs: https://docs.kernel.org/mm/index.html

## Liên kết
[[Address Space]] · [[Segmentation]] · [[Paging]] · [[Translation Lookaside Buffer]] · [[OS]]
