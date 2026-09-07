---
tags: [networking, link-layer, reliability]
status: growing
---
# Error Detection

> Mọi đường truyền đều làm hỏng bit. Câu hỏi không phải "có lỗi không" mà là **phát hiện được bao nhiêu phần trăm lỗi với bao nhiêu bit dư thừa**.

## 1. So sánh các cơ chế

| Cơ chế | Sức mạnh | Chi phí | Dùng ở đâu |
|---|---|---|---|
| **Parity bit** | Bắt được số lẻ bit lỗi | 1 bit | Bộ nhớ cũ, hầu như không dùng trong mạng |
| **2D parity** | Bắt mọi lỗi 1–3 bit, sửa được 1 bit | ~n bit | Giáo khoa |
| **Internet checksum** | Yếu — bỏ sót lỗi hoán vị word | 16 bit | IP, TCP, UDP header |
| **CRC-32** | Bắt mọi burst lỗi ≤32 bit, mọi lỗi lẻ | 32 bit | Ethernet FCS, PPP, lưu trữ |
| **FEC (Reed-Solomon, LDPC)** | **Sửa** lỗi, không chỉ phát hiện | Cao | Wi-Fi, 5G, vệ tinh, optical |

**CRC hoạt động thế nào**: coi frame là đa thức, chia cho đa thức sinh, gửi kèm phần dư. Bên nhận chia lại — dư khác 0 là có lỗi. Thực thi bằng shift register nên rất rẻ trên phần cứng.

## 2. Nguyên tắc
1. **Detect ≠ Correct.** Mạng có dây thường chỉ *phát hiện* rồi vứt frame và nhờ tầng trên truyền lại ([[Reliable Transmission]]). Mạng không dây/vệ tinh dùng **FEC** vì truyền lại quá đắt.
2. **Checksum của TCP/UDP là end-to-end**, CRC của Ethernet là per-hop. Cả hai đều cần — CRC không bảo vệ khỏi lỗi trong bộ nhớ router.
3. **Checksum Internet rất yếu** — nghiên cứu của Stone & Partridge cho thấy 1 trong ~1100 đến 1 trong 32000 gói lỗi lọt qua. Với dữ liệu quan trọng, cần checksum ở tầng ứng dụng.
4. **UDP checksum có thể bằng 0 (tuỳ chọn) trên IPv4** — nghĩa là không kiểm tra gì cả. IPv6 bắt buộc.

## 3. Cạm bẫy hay gặp
- **Tin rằng "TCP đảm bảo dữ liệu không hỏng".** TCP đảm bảo *thứ tự và đầy đủ*, còn tính toàn vẹn thì chỉ ở mức checksum 16-bit yếu. Dữ liệu quan trọng phải có hash riêng (SHA-256).
- **Checksum offload làm `tcpdump` báo "bad checksum"** trên gói gửi đi — đó là bình thường, NIC tính sau.
- **Quên rằng bộ nhớ và bus cũng làm hỏng bit** — lỗi silent corruption phần lớn đến từ đó, không từ dây.

## 4. Checklist áp dụng
- [ ] Dữ liệu quan trọng có hash tầng ứng dụng độc lập chưa?
- [ ] Bộ đếm CRC error trên cổng có tăng không? Tăng ở hop nào?
- [ ] Nếu link nhiều lỗi: nên bật FEC hay giảm tốc độ/đổi cáp?
- [ ] Với UDP trên IPv4: checksum có được bật không?

## Tham khảo
- Peterson & Davie — 2.4 Error Detection: https://book.systemsapproach.org/direct/error.html
- Stone & Partridge — *When the CRC and TCP Checksum Disagree*: https://dl.acm.org/doi/10.1145/347059.347561
- RFC 1071 — *Computing the Internet Checksum*: https://www.rfc-editor.org/rfc/rfc1071
- Koopman — *CRC polynomial zoo*: https://users.ece.cmu.edu/~koopman/crc/

## Liên kết
[[Reliable Transmission]] · [[Framing]] · [[TCP]] · [[Networking]]
