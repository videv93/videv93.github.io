---
tags: [networking, link-layer, physical]
status: growing
---
# Encoding

> Biến bit thành tín hiệu trên dây. Vấn đề thật không phải "0 là điện áp thấp" mà là **giữ đồng hồ hai đầu khớp nhau khi có chuỗi dài bit giống nhau**.

## 1. Các sơ đồ mã hoá

| Sơ đồ | Cách làm | Vấn đề / Ưu điểm | Hiệu suất |
|---|---|---|---|
| **NRZ** (Non-Return to Zero) | 1 = cao, 0 = thấp | Chuỗi dài giống nhau → mất đồng bộ + baseline wander | 100% |
| **NRZI** | 1 = đảo mức, 0 = giữ nguyên | Giải quyết chuỗi 1 dài, không giải quyết chuỗi 0 dài | 100% |
| **Manchester** | XOR dữ liệu với clock; luôn có chuyển mức giữa bit | Tự đồng bộ hoàn toàn | **50%** — tốn gấp đôi băng thông |
| **4B/5B** | Mã 4 bit dữ liệu thành 5 bit không có >3 số 0 liên tiếp, rồi NRZI | Cân bằng tốt | 80% |
| **8B/10B, 64B/66B** | Cùng ý tưởng, dùng trong Gigabit Ethernet / 10G+ | Chuẩn hiện đại | 80% / ~97% |

**Ý tưởng chung**: hy sinh một ít băng thông để đảm bảo tín hiệu có đủ **chuyển mức (transition)** cho bộ thu khôi phục clock.

## 2. Nguyên tắc
1. **Clock recovery là bài toán thật**, không phải chi tiết phụ. Không có transition → bộ thu trôi đồng hồ → đọc sai số bit.
2. **Baud rate ≠ bit rate.** Một symbol có thể mang nhiều bit (QAM ở modem, Wi-Fi).
3. **Giới hạn Nyquist / Shannon** đặt trần cho dung lượng: `C = B·log2(1 + S/N)`. Không có mã hoá nào vượt được.
4. **Tầng cao hơn không thấy gì cả** — encoding hoàn toàn nằm dưới [[Framing]].

## 3. Cạm bẫy hay gặp
- **Nhầm encoding (tín hiệu) với encryption (bảo mật) hoặc serialization (định dạng dữ liệu)** → xem [[Presentation Formatting]].
- **Quên overhead line coding khi tính băng thông thật**: 10GBASE-R dùng 64B/66B nên tốc độ line là 10.3125 Gbaud.
- **Đổ lỗi cho phần mềm khi lỗi thực ra ở tầng vật lý**: kiểm tra bộ đếm CRC error / FCS error trên cổng switch trước.

## 4. Checklist áp dụng
- [ ] Cổng có đếm lỗi FCS/CRC tăng dần không? (`ethtool -S`)
- [ ] Cáp, SFP, chiều dài có đúng chuẩn của tốc độ đang chạy không?
- [ ] Auto-negotiation hai đầu có khớp (speed/duplex) không?

## Tham khảo
- Peterson & Davie — 2.2 Encoding: https://book.systemsapproach.org/direct/encoding.html
- IEEE 802.3 (Ethernet, gồm 4B/5B, 8B/10B, 64B/66B): https://standards.ieee.org/ieee/802.3/
- Shannon — *A Mathematical Theory of Communication*: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf

## Liên kết
[[Framing]] · [[Error Detection]] · [[Ethernet]] · [[Networking]]
