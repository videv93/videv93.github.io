---
tags: [networking, congestion, tcp]
status: evergreen
---
# TCP Congestion Control

> Thuật toán đã cứu Internet khỏi *congestion collapse* năm 1986 và vẫn quyết định tốc độ tải của bạn hôm nay. Ý tưởng gốc rất đơn giản: **tăng dần cho tới khi mất gói, rồi lùi lại**.

## 1. Bốn giai đoạn kinh điển (Reno)

| Giai đoạn | Hành vi | Khi nào |
|---|---|---|
| **Slow start** | cwnd **nhân đôi mỗi RTT** (tăng 1 MSS mỗi ACK) | Bắt đầu kết nối, hoặc sau timeout |
| **Congestion avoidance** | cwnd **+1 MSS mỗi RTT** (tăng tuyến tính) | Khi cwnd ≥ ssthresh |
| **Fast retransmit** | 3 dup-ACK → truyền lại ngay, không đợi timeout | Mất gói lẻ |
| **Fast recovery** | cwnd giảm **một nửa**, tiếp tục congestion avoidance | Sau fast retransmit |

**AIMD** (Additive Increase, Multiplicative Decrease) là lý do hệ thống hội tụ về công bằng: tăng chậm, giảm mạnh.
**Timeout** (nặng hơn nhiều): cwnd về 1 MSS, quay lại slow start.

Tên gọi "slow start" gây hiểu nhầm — nó **tăng theo hàm mũ**, "slow" là so với việc bùng phát ngay từ đầu.

## 2. Các thuật toán hiện đại

| Thuật toán | Tín hiệu | Đặc điểm | Dùng ở đâu |
|---|---|---|---|
| **Reno / NewReno** | Mất gói | Chuẩn tham chiếu | Cũ |
| **CUBIC** | Mất gói | Tăng theo hàm bậc 3 theo *thời gian*, không theo RTT → công bằng hơn giữa các RTT khác nhau | **Mặc định Linux/Windows** |
| **BBR** (v1/v2/v3) | **Băng thông + RTT ước lượng** | Mô hình hoá đường truyền, không đợi mất gói → ít bufferbloat | Google, YouTube, nhiều CDN |
| **Vegas** | Tăng RTT | Nhạy nhưng thua thiệt khi cạnh tranh với loss-based | Nghiên cứu |
| **DCTCP** | ECN trong DC | Cần switch hỗ trợ; độ trễ rất thấp | Datacenter |

## 3. Nguyên tắc thực dụng
1. **Throughput ≈ MSS / (RTT × √p)** (mô hình Mathis) — mất gói `p` càng cao, RTT càng lớn thì throughput càng tụt. Đường dài + mất gói nhỏ đã đủ giết hiệu năng.
2. **Kết nối mới luôn bắt đầu chậm** → keep-alive và connection pool có giá trị lớn hơn ta tưởng.
3. **Initial cwnd = 10 MSS** (RFC 6928) ≈ 14 KB — nghĩa là response đầu tiên nên gọn dưới ~14 KB để về trong 1 RTT.
4. **BBR thắng trên đường có mất gói ngẫu nhiên** (Wi-Fi, di động, xuyên lục địa); CUBIC thắng về tính công bằng đã được kiểm chứng lâu năm.
5. **Congestion control là của bên gửi** — muốn cải thiện tải xuống thì phải đổi ở server, không phải ở client.

## 4. Cạm bẫy hay gặp
- **Mất gói vì nhiễu bị hiểu là tắc nghẽn** → TCP giảm cwnd oan trên Wi-Fi/di động. Đây là lý do BBR ra đời → [[Wireless Networks]].
- **Đổi sang BBR mà không đo** — BBR v1 có thể chiếm phần bất công khi cạnh tranh với CUBIC và gây mất gói cao ở hàng đợi nông.
- **Buffer lớn che giấu vấn đề**: CUBIC sẽ làm đầy buffer trước khi giảm → bufferbloat → [[Queuing Disciplines]].
- **Đo throughput bằng một luồng duy nhất** rồi kết luận về mạng. Nhiều luồng cho kết quả rất khác.
- **Quên rằng cwnd không phải là tất cả**: `min(cwnd, rwnd)` — cửa sổ nhận nhỏ cũng chặn cứng → [[TCP]].

## 5. Checklist áp dụng
- [ ] `sysctl net.ipv4.tcp_congestion_control` đang là gì? Có phù hợp với profile người dùng không?
- [ ] `ss -ti` cho thấy `retrans`, `rtt`, `cwnd` bao nhiêu khi tải thật?
- [ ] Response đầu tiên có nằm gọn trong ~14 KB không?
- [ ] Có tái sử dụng kết nối để tránh slow start lặp lại không?
- [ ] Nếu người dùng ở xa: đã cân nhắc CDN/edge để cắt RTT chưa? → [[CDN]]

## Tham khảo
- Peterson & Davie — 6.3 TCP Congestion Control: https://book.systemsapproach.org/congestion/tcpcc.html
- Jacobson — *Congestion Avoidance and Control* (1988): https://ee.lbl.gov/papers/congavoid.pdf
- RFC 5681 — *TCP Congestion Control*: https://www.rfc-editor.org/rfc/rfc5681
- RFC 6928 — *Increasing TCP's Initial Window*: https://www.rfc-editor.org/rfc/rfc6928
- Cardwell et al. — *BBR: Congestion-Based Congestion Control*: https://queue.acm.org/detail.cfm?id=3022184

## Liên kết
[[TCP]] · [[Advanced Congestion Control]] · [[Queuing Disciplines]] · [[Bandwidth & Latency]] · [[Networking]]
