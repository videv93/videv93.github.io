---
tags: [os, virtualization, cpu, policy]
status: evergreen
---
# Multi-level Feedback Queue

> MLFQ giải bài toán tưởng như bất khả: xấp xỉ SJF **mà không biết trước độ dài job**. Nó học từ hành vi — job nào dùng hết quantum thì bị hạ ưu tiên, job nào nhường CPU sớm thì được giữ ưu tiên cao.

## 1. Năm quy tắc (OSTEP)
1. `Priority(A) > Priority(B)` → **A chạy**.
2. `Priority(A) = Priority(B)` → A và B chạy **Round Robin** với quantum của mức đó.
3. Job mới vào **hàng đợi cao nhất** (giả định lạc quan: nó ngắn).
4. Dùng hết **time allotment** ở một mức (bất kể nhường CPU bao nhiêu lần) → **hạ một bậc**.
5. Sau mỗi chu kỳ `S`, **đẩy toàn bộ job về hàng cao nhất** (priority boost).

Quy tắc 4 và 5 là phần quan trọng nhất — chúng vá hai lỗ hổng lớn của phiên bản ngây thơ.

## 2. Ba vấn đề và cách vá
| Vấn đề | Hiện tượng | Quy tắc vá |
|---|---|---|
| **Starvation** | Nhiều job tương tác chiếm mức cao, job dài không bao giờ chạy | **Rule 5** — boost định kỳ |
| **Gaming the scheduler** | Job cố ý gọi I/O ngay trước khi hết quantum để giữ mức cao | **Rule 4** — tính *tổng* thời gian ở mức, không reset khi nhường |
| **Đổi hành vi** | Job CPU-bound chuyển sang tương tác (ví dụ tính xong rồi chờ input) | **Rule 5** — boost cho nó cơ hội trở lại |

## 3. Tinh chỉnh tham số ("voo-doo constants")
| Tham số | Đánh đổi | Kinh nghiệm |
|---|---|---|
| Số hàng đợi | nhiều → phân biệt tinh hơn, khó chỉnh | 3–8 |
| Quantum theo mức | **tăng dần xuống dưới** (mức cao: ngắn, phản hồi nhanh; mức thấp: dài, ít switch) | 10ms → 100ms+ |
| Chu kỳ boost `S` | ngắn → dễ starvation ngược; dài → job dài bị đói | ~1s |

> Nguyên tắc: mức càng thấp thì job càng "được xác nhận là dài" → cho quantum dài để giảm overhead [[Context Switch]].

Nhiều hệ cho phép ứng dụng **tự khai báo** (advice) thay vì để scheduler đoán: `nice`, `sched_setscheduler`, QoS class trên macOS.

## 4. MLFQ trong thực tế
- **Windows NT/10/11**: 32 mức ưu tiên, boost khi thread thức dậy sau I/O hoặc sau khi cửa sổ được focus — MLFQ khá thuần.
- **Solaris TS class**: bảng tham số tra cứu được (`dispadmin`), đúng tinh thần MLFQ.
- **macOS**: QoS class + Mach priority, có "boost" khi app ở foreground.
- **Linux**: **không** dùng MLFQ cho lớp mặc định — CFS/EEVDF dùng tư tưởng công bằng có trọng số ([[Proportional Share Scheduling]]) thay vì hàng đợi nhiều mức. Nhưng lớp realtime thì có 100 mức ưu tiên cứng.

## 5. Cạm bẫy
- **Học MLFQ rồi tưởng Linux dùng nó.** Không — đây là điểm nhầm phổ biến nhất.
- **Bỏ boost để "công bằng hơn"** → job dài chết đói ngay khi có tải tương tác.
- **Reset allotment mỗi lần job nhường CPU** → mở lại lỗ hổng gaming (đây chính là lỗi của MLFQ đời đầu).
- **Cho rằng ưu tiên cao = chạy nhanh hơn.** Ưu tiên cao chỉ nghĩa là *được chọn trước*; nếu job bị chặn ở I/O thì ưu tiên vô nghĩa.

## 6. Checklist áp dụng
- [ ] Job của tôi bị hệ thống phân loại là tương tác hay CPU-bound?
- [ ] Có cơ chế chống starvation trong scheduler tôi đang dùng không?
- [ ] Nếu tự viết scheduler (job queue, task runner): tôi có xử lý gaming và starvation không?
- [ ] Quantum ở mức thấp đã đủ dài để giảm switch chưa?

## Tham khảo
- OSTEP ch.8 *MLFQ*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf
- OSTEP homework `mlfq.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched-mlfq
- Corbató — *CTSS* (nơi MLFQ ra đời, 1962): https://dl.acm.org/doi/10.1145/1460833.1460871
- Windows Internals (Russinovich) — Thread Scheduling
- `sched(7)` — các lớp scheduling Linux: https://man7.org/linux/man-pages/man7/sched.7.html

## Liên kết
[[CPU Scheduling]] · [[Proportional Share Scheduling]] · [[Context Switch]] · [[OS]]
