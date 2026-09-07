---
tags: [networking, congestion, queue]
status: growing
---
# Queuing Disciplines

> Hàng đợi ở router quyết định **ai bị drop và ai phải chờ**. Đây là nơi lý thuyết gặp thực tế: một dòng `tc qdisc` đúng có thể cứu độ trễ tốt hơn nâng gấp đôi băng thông.

## 1. Các kỷ luật hàng đợi

| Kỷ luật | Cách làm | Ưu / Nhược |
|---|---|---|
| **FIFO + drop-tail** | Ai đến trước phục vụ trước, đầy thì vứt gói mới | Mặc định; gây bufferbloat và **global synchronization** |
| **Priority queuing** | Nhiều hàng, hàng ưu tiên phục vụ trước | Đơn giản; **luồng thấp có thể chết đói** |
| **Fair Queuing (FQ)** | Mỗi flow một hàng, round-robin theo bit | Công bằng; tốn trạng thái |
| **WFQ / DRR** | FQ có trọng số | Nền của QoS thật |
| **RED** | Drop ngẫu nhiên **sớm** theo độ dài hàng trung bình | Báo tắc nghẽn trước khi đầy; khó chỉnh tham số |
| **CoDel** | Nhắm vào **thời gian gói nằm trong hàng** (target 5 ms), không nhắm vào độ dài | Không cần chỉnh tham số — thắng thế |
| **fq_codel / CAKE** | FQ + CoDel (+ shaping, NAT-aware) | **Mặc định nên dùng** trên router/gateway |

## 2. Nguyên tắc
1. **Buffer tồn tại để hấp thụ burst, không phải để chứa dữ liệu lâu dài.** Quy tắc ngón tay cái cổ điển: buffer ≈ BDP; với nhiều luồng thì `BDP/√n`.
2. **Drop sớm là một tính năng** — nó báo cho TCP giảm tốc trước khi hàng đợi đầy → [[TCP Congestion Control]].
3. **Global synchronization**: drop-tail làm mọi luồng cùng mất gói, cùng giảm, cùng tăng → dao động hình răng cưa. RED phá vỡ sự đồng bộ này bằng ngẫu nhiên.
4. **ECN tốt hơn drop**: đánh dấu thay vì vứt, giữ nguyên thông tin mà vẫn báo tắc nghẽn → [[Advanced Congestion Control]].
5. **Chỗ đặt qdisc quan trọng**: chỉ có tác dụng ở **nút thắt cổ chai**. Đặt shaping ở chỗ băng thông dư thì vô ích.

## 3. Cạm bẫy hay gặp
- **Tăng buffer khi thấy mất gói** → bufferbloat: RTT vọt từ 20 ms lên 1000 ms khi có upload nền.
- **Priority queuing không có giới hạn** → luồng ưu tiên chiếm hết, phần còn lại chết đói. Luôn kèm policer cho hàng ưu tiên.
- **Shaping phía sau nút thắt cổ chai**: nếu ISP là nút thắt, phải shape ở router của mình xuống **~90–95% tốc độ uplink** thì hàng đợi mới nằm ở nơi mình kiểm soát được.
- **Chỉnh RED bằng cảm tính** — dùng CoDel/fq_codel thay vì vật lộn với `min_th`/`max_th`.

## 4. Checklist áp dụng
- [ ] Nút thắt cổ chai nằm ở đâu? Qdisc có đặt đúng chỗ đó không?
- [ ] Đã thử `fq_codel` hoặc `cake` trên gateway chưa?
- [ ] Có shaping xuống dưới tốc độ uplink để giành quyền kiểm soát hàng đợi không?
- [ ] Đo RTT **khi đang tải** (không phải khi rảnh) — có tăng vọt không?
- [ ] Hàng ưu tiên có bị giới hạn để không bỏ đói luồng khác không?

## Công cụ
| Lệnh | Dùng để |
|---|---|
| `tc qdisc show dev eth0` | xem qdisc hiện tại |
| `tc qdisc replace dev eth0 root fq_codel` | bật fq_codel |
| `flent` / `waveform bufferbloat test` | đo bufferbloat: https://flent.org/ |

## Tham khảo
- Peterson & Davie — 6.2 Queuing Disciplines: https://book.systemsapproach.org/congestion/queuing.html
- Floyd & Jacobson — *Random Early Detection Gateways*: https://ee.lbl.gov/papers/early.pdf
- RFC 8289 — *CoDel*: https://www.rfc-editor.org/rfc/rfc8289
- Nichols & Jacobson — *Controlling Queue Delay*: https://queue.acm.org/detail.cfm?id=2209336

## Liên kết
[[Resource Allocation]] · [[TCP Congestion Control]] · [[Advanced Congestion Control]] · [[Networking]]
