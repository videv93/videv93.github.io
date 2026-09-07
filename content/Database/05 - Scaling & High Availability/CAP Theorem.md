---
tags: [database, distributed, principle]
status: evergreen
---
# CAP Theorem

> Trong một hệ thống phân tán, chỉ có thể đạt được tối đa **2 trong 3** yếu tố: `Consistency` (Nhất quán), `Availability` (Sẵn sàng), `Partition Tolerance` (Chịu lỗi phân đoạn mạng).
>
> Nhưng cách phát biểu "chọn 2 trong 3" là **gây hiểu lầm** — và hiểu đúng chỗ này quan trọng hơn thuộc lòng định lý.

## 1. Định nghĩa chính xác
| Chữ | Nghĩa chuẩn (Gilbert & Lynch 2002) |
|---|---|
| **C** — Consistency | **Linearizability**: mọi node thấy cùng một dữ liệu tại cùng thời điểm; đọc luôn trả về lần ghi mới nhất |
| **A** — Availability | Mọi request tới node **còn sống** đều nhận được phản hồi (không lỗi, không treo) |
| **P** — Partition tolerance | Hệ thống tiếp tục hoạt động dù mạng giữa các node bị chia cắt |

## 2. Vì sao "chọn 2 trong 3" là sai
**Partition là hiện tượng tự nhiên, không phải lựa chọn.** Mạng *sẽ* đứt. Vậy nên:
> Câu hỏi thật là: **khi partition xảy ra, bạn chọn C hay A?**

| Lựa chọn | Hành vi khi mạng đứt | Ví dụ |
|---|---|---|
| **CP** | Từ chối phục vụ ở phía thiểu số ⇒ giữ dữ liệu đúng | PostgreSQL sync replication, MongoDB (mặc định), HBase, etcd, ZooKeeper |
| **AP** | Vẫn phục vụ ở cả hai phía ⇒ dữ liệu tạm lệch, hoà giải sau | Cassandra, DynamoDB, Riak, CouchDB |
| **CA** | Chỉ tồn tại khi **không có mạng phân tán** (một node) | Postgres đơn lẻ |

⚠️ Chữ **C** này **khác** chữ C trong [[ACID Properties]]. CAP-C = linearizability; ACID-C = ràng buộc toàn vẹn. Trùng chữ, khác khái niệm — đây là nhầm lẫn phổ biến nhất khi phỏng vấn.

## 3. PACELC — câu hỏi đầy đủ hơn
> **P**artition → chọn **A** hay **C**; **E**lse (lúc bình thường) → chọn **L**atency hay **C**onsistency.

Đây mới là mô hình mô tả đúng thực tế, vì hệ thống chạy **không** partition hầu hết thời gian, và đánh đổi latency-vs-consistency diễn ra **mỗi ngày**.

| Hệ thống | Phân loại PACELC |
|---|---|
| PostgreSQL (sync replication) | PC/EC |
| PostgreSQL (async replication) | PC/EL |
| Cassandra (tuning được) | PA/EL |
| DynamoDB | PA/EL (hoặc PC/EC với strongly consistent read) |
| Google Spanner | PC/EC (nhờ TrueTime + đồng hồ nguyên tử) |
| MongoDB | PC/EC |

## 4. Consistency là một phổ, không phải công tắc
Từ mạnh đến yếu:
```
Linearizable  →  Sequential  →  Causal  →  Read-your-writes
              →  Monotonic reads  →  Eventual
```
Nhiều hệ cho bạn **chọn theo từng query** — đó là cách dùng CAP thực tế nhất:
```sql
-- Cassandra: chọn mức nhất quán cho từng câu lệnh
CONSISTENCY QUORUM;   -- R + W > N ⇒ đọc luôn thấy ghi mới nhất
CONSISTENCY ONE;      -- nhanh nhất, có thể đọc dữ liệu cũ
```
> Công thức quorum: **R + W > N** cho phép đọc thấy ghi mới nhất. Với N=3: W=2, R=2 là cân bằng phổ biến.

## 5. Cạm bẫy hay gặp
1. **Nói "chúng tôi chọn AP" mà không định nghĩa điều gì xảy ra với dữ liệu lệch.** AP bắt buộc phải có chiến lược hoà giải (LWW, CRDT, vector clock, hoặc con người).
2. **Nhầm C của CAP với C của ACID.**
3. **Nghĩ NoSQL = AP.** MongoDB là CP. HBase là CP.
4. **Nghĩ "eventual" nghĩa là "vài mili giây".** Khi partition kéo dài, "eventual" có thể là hàng giờ.
5. **Áp CAP cho hệ thống một node** — CAP chỉ nói về hệ phân tán.
6. **Bỏ qua rằng replica đọc của Postgres cũng là eventual consistency.** Đọc từ replica sau khi ghi vào primary có thể không thấy dữ liệu mình vừa ghi. → [[Replication]]
7. **Chọn AP cho dữ liệu tiền bạc.** Số dư âm vì hai phía cùng cho rút tiền là bài học rất đắt.

## 6. Checklist áp dụng
- [ ] Hệ thống của tôi có thật sự phân tán không? (Nếu không, CAP không áp dụng)
- [ ] Khi partition xảy ra, tôi muốn **từ chối** hay **phục vụ dữ liệu có thể cũ**?
- [ ] Với mỗi loại dữ liệu (tiền, đơn hàng, lượt xem) — mức consistency cần thiết là gì?
- [ ] Nếu chọn AP: chiến lược hoà giải xung đột là gì, ai viết nó?
- [ ] Ứng dụng đọc từ replica — có cần "read-your-writes" không, và đảm bảo bằng cách nào?
- [ ] Đã đọc báo cáo Jepsen của database đang dùng chưa?
- [ ] Trong mô hình PACELC, hệ của tôi nằm ở đâu — và team có đồng thuận không?

## Tham khảo
- Gilbert & Lynch — *Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services* (2002): https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf
- Eric Brewer — *CAP Twelve Years Later: How the "Rules" Have Changed*: https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
- Daniel Abadi — *Consistency Tradeoffs in Modern Distributed Database Design (PACELC)*: https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf
- Martin Kleppmann — *A Critique of the CAP Theorem*: https://arxiv.org/abs/1509.05393
- Jepsen — *Consistency Models*: https://jepsen.io/consistency

## Liên kết
[[BASE & Eventual Consistency]] · [[ACID Properties]] · [[Replication]] · [[Distributed Transactions]] · [[Database]]
