---
tags: [os, virtualization, memory]
status: evergreen
---
# Free Space Management

> Bài toán: quản lý một vùng nhớ khi các khối cấp phát có **kích thước tuỳ ý** và không được phép di dời (vì người dùng đang giữ con trỏ). Đây là bài toán của `malloc`, của allocator trong DB, của [[Segmentation]] — và nó không có lời giải hoàn hảo.

## 1. Vì sao khó
Nếu di dời được thì compaction giải quyết tất cả (GC nén làm được điều này). Nhưng trong C, người dùng giữ con trỏ thô → **không được di dời** → chỉ còn cách chọn lỗ nào để cấp, và gộp lỗ khi trả.

## 2. Hai cơ chế nền
| Cơ chế | Nội dung |
|---|---|
| **Splitting** | Lỗ 20B, xin 10B → cắt đôi, cấp 10B, giữ lỗ 10B |
| **Coalescing** | Khi `free`, gộp với lỗ kề trước/sau thành lỗ lớn — **không coalesce = phân mảnh chết** |

**Header ẩn**: allocator giấu vài byte metadata ngay trước con trỏ trả về (size, magic). Đó là vì sao `free(ptr)` không cần truyền kích thước — và cũng là vì sao buffer overflow phá được heap.

## 3. Chính sách chọn lỗ
| Policy | Cách chọn | Ưu | Nhược |
|---|---|---|---|
| **First-fit** | lỗ đầu tiên đủ lớn | nhanh | rác nhỏ dồn về đầu list |
| **Next-fit** | tiếp từ chỗ lần trước | phân bố đều hơn | tương tự first-fit |
| **Best-fit** | lỗ nhỏ nhất mà vừa | ít lãng phí | duyệt toàn bộ; đẻ nhiều mảnh vụn |
| **Worst-fit** | lỗ lớn nhất | giữ lỗ lớn... trên lý thuyết | thực nghiệm **tệ nhất** |
| **Segregated list** | list riêng cho từng size class | rất nhanh, ít phân mảnh | tốn bộ nhớ cho các list |
| **Buddy allocator** | chia đôi liên tục theo luỹ thừa 2 | coalesce cực nhanh | internal fragmentation tới ~2× |

> Thực tế: mọi allocator hiện đại là **segregated free list** (size class) + arena theo thread + `mmap` cho khối lớn. Buddy được kernel Linux dùng để cấp trang vật lý; **slab/SLUB** nằm trên buddy cho các object kernel cùng kích thước.

## 4. Hai loại phân mảnh
| | Internal | External |
|---|---|---|
| Nghĩa | cấp 32B cho yêu cầu 20B → thừa 12B trong khối | tổng còn trống đủ nhưng không lỗ nào đủ lớn |
| Do | size class, buddy, làm tròn theo alignment | kích thước tuỳ ý + không di dời được |
| Chữa | size class sát hơn | coalescing, arena riêng theo vòng đời, hoặc... đổi sang mô hình di dời được |

## 5. Cạm bẫy
- **Trộn lẫn object sống lâu và sống ngắn trong cùng arena** → object sống lâu "ghim" cả trang, RSS không giảm. Cách chữa hiệu quả nhất thường là **arena/pool riêng theo vòng đời**, không phải đổi allocator.
- **Nghĩ `free` trả RAM cho OS** → xem [[Memory API]] mục 4.
- **Ghi tràn 1 byte** phá header của khối kế → crash ở chỗ hoàn toàn khác, rất khó lần ra. Đây cũng là kỹ thuật khai thác heap kinh điển.
- **Đo "leak" bằng RSS** mà không tách phân mảnh khỏi rò rỉ thật.
- **Viết allocator riêng quá sớm.** jemalloc/mimalloc đã tốt hơn phần lớn code tự viết; chỉ tự viết khi có pattern rất đặc thù (arena theo request, bump allocator cho parser).

## 6. Checklist áp dụng
- [ ] Ứng dụng có pattern cấp phát nào rõ ràng không (nhiều object cùng size? cùng vòng đời?)
- [ ] Có tách được thành **arena theo request** rồi giải phóng một lần không?
- [ ] RSS cao là do leak hay phân mảnh? (so live heap từ heaptrack với RSS)
- [ ] Đã thử đổi sang jemalloc/mimalloc để đo chênh lệch chưa?
- [ ] Có alignment yêu cầu đặc biệt không (SIMD, DMA, cache line)?

## Công cụ
| Công cụ | Dùng để | Link |
|---|---|---|
| `heaptrack` | profile cấp phát chi tiết | https://github.com/KDE/heaptrack |
| `jemalloc` prof | dump heap profile trong production | https://jemalloc.net/ |
| `massif` (valgrind) | biểu đồ heap theo thời gian | https://valgrind.org/docs/manual/ms-manual.html |
| `malloc_stats()` | thống kê nhanh của glibc | libc |

## Tham khảo
- OSTEP ch.17 *Free-Space Management*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf
- OSTEP homework `malloc.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-freespace
- Wilson et al. — *Dynamic Storage Allocation: A Survey and Critical Review*: https://citeseerx.ist.psu.edu/doc/10.1.1.47.275
- Linux buddy & SLUB: https://docs.kernel.org/mm/index.html
- glibc malloc internals: https://sourceware.org/glibc/wiki/MallocInternals

## Liên kết
[[Memory API]] · [[Segmentation]] · [[Paging]] · [[Address Space]] · [[OS]]
