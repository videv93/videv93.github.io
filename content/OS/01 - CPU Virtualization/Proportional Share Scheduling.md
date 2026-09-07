---
tags: [os, virtualization, cpu, policy]
status: evergreen
---
# Proportional Share Scheduling

> Thay vì tối ưu turnaround, nhóm scheduler này đặt mục tiêu khác: **mỗi job nhận đúng tỉ lệ CPU đã hứa**. Đây là nền tảng của cgroup, container quota và scheduler mặc định của Linux.

## 1. Ba thuật toán nền
| Thuật toán | Cơ chế | Ưu | Nhược |
|---|---|---|---|
| **Lottery** | Mỗi job giữ số "vé" theo tỉ lệ; mỗi quantum bốc ngẫu nhiên một vé | Đơn giản, không cần trạng thái toàn cục, xử lý job mới rất gọn | Chỉ đúng tỉ lệ **về lâu dài**; ngắn hạn lệch |
| **Stride** | Mỗi job có `stride = C/tickets`; chạy job có `pass` nhỏ nhất rồi `pass += stride` | **Chính xác tuyệt đối** ở mọi thời điểm | Cần trạng thái toàn cục; job mới vào phải chọn `pass` ban đầu (nếu = 0 thì nó độc chiếm CPU) |
| **CFS** | Theo dõi `vruntime` = thời gian chạy đã chuẩn hoá theo trọng số; luôn chọn `vruntime` nhỏ nhất | Hiệu quả (red-black tree, O(log n)), xử lý job mới tốt | Không phải realtime; tham số tinh chỉnh phức tạp |

> Stride là "lottery không có may rủi". Lottery thắng ở chỗ **không cần trạng thái toàn cục** — nên hợp lý cho hệ phân tán hoặc khi job đến/đi liên tục.

## 2. Lottery — các thủ thuật đáng nhớ
- **Ticket currency**: một user chia vé của mình cho các job con theo "đơn vị tiền" riêng, hệ thống quy đổi ra vé toàn cục. Đây chính là ý tưởng cgroup lồng nhau.
- **Ticket transfer**: client chuyển vé cho server đang làm việc hộ mình → chống priority inversion.
- **Ticket inflation**: trong nhóm tin cậy nhau, job tự tăng vé khi cần gấp.

## 3. CFS — thứ bạn thực sự chạy hằng ngày
- `vruntime` tăng theo thời gian chạy thật **chia cho trọng số** của job. `nice` thấp → trọng số cao → vruntime tăng chậm → được chạy nhiều hơn.
- Thang `nice` −20…19 ánh xạ sang bảng trọng số, mỗi bậc ≈ **1.25×** CPU. `nice` chênh 5 bậc ≈ 3× CPU.
- Không dùng quantum cố định: `sched_latency` (ví dụ 24ms) chia cho số job đang chạy, có sàn `min_granularity` (ví dụ 3ms) để tránh switch quá dày.
- Job vừa thức dậy được đặt `vruntime` gần `min_vruntime` hiện tại → phản hồi nhanh mà không phá công bằng.
- **EEVDF** (Linux 6.6+) thay CFS: thêm "virtual deadline" cho mỗi task, ưu tiên task có deadline sớm → cải thiện latency cho task ngắn mà vẫn giữ tỉ lệ.

## 4. Ứng dụng thực tế: cgroup v2
| Tham số | Ý nghĩa | Kiểu |
|---|---|---|
| `cpu.weight` | tỉ lệ tương đối (mặc định 100) | proportional share |
| `cpu.max` | `<quota> <period>`, ví dụ `50000 100000` = 0.5 CPU | hard cap |
| `cpu.pressure` | PSI — mức chờ CPU thực tế | quan sát |

Kubernetes: `requests.cpu` → `cpu.weight`; `limits.cpu` → `cpu.max`.

## 5. Cạm bẫy
- **CPU limit gây throttling nghiêm trọng.** `cpu.max` cắt cứng theo chu kỳ 100ms: app đa luồng có thể tiêu hết quota trong 10ms rồi bị đóng băng 90ms → p99 latency thảm hoạ. Với workload latency-sensitive, thường nên đặt `requests` mà **không đặt** `limits`.
- **Nghĩ `nice` là tuyến tính** — không, nó là hình học.
- **Stride với job mới `pass = 0`** → nó độc chiếm CPU cho tới khi bắt kịp. Phải khởi tạo bằng `min_pass` hiện tại (CFS giải đúng bài này bằng `min_vruntime`).
- **Dùng lottery cho hệ cần đảm bảo ngắn hạn** — công bằng thống kê không phải công bằng.

## 6. Checklist áp dụng
- [ ] Tôi cần **tỉ lệ** (weight) hay **trần cứng** (quota)?
- [ ] Container của tôi có bị CPU throttling không? (`cpu.stat`: `nr_throttled`, `throttled_usec`)
- [ ] Số thread trong container có vượt quá quota quy đổi ra core không?
- [ ] Nếu đặt `nice`: tôi có tính đúng tỉ lệ mong muốn theo thang 1.25× không?
- [ ] Có job nào cần đảm bảo thời gian thực (dùng `SCHED_DEADLINE`) thay vì tỉ lệ không?

## Tham khảo
- OSTEP ch.9 *Scheduling: Proportional Share*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf
- Waldspurger & Weihl — *Lottery Scheduling* (OSDI '94): https://www.usenix.org/legacy/publications/library/proceedings/osdi/full_papers/waldspurger.pdf
- Linux CFS design: https://docs.kernel.org/scheduler/sched-design-CFS.html
- cgroup v2 docs: https://docs.kernel.org/admin-guide/cgroup-v2.html
- LWN — EEVDF: https://lwn.net/Articles/925371/

## Liên kết
[[CPU Scheduling]] · [[Multi-level Feedback Queue]] · [[Multiprocessor Scheduling]] · [[Containers]] · [[OS]]
