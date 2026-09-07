---
tags: [networking, foundation]
status: growing
---
# Switching Paradigms

> Circuit switching đặt trước tài nguyên rồi mới truyền; packet switching cứ gửi và chịu rủi ro. **Internet chọn cái thứ hai vì lưu lượng dữ liệu là bursty** — và mọi vấn đề về congestion đều bắt nguồn từ lựa chọn đó.

## 1. So sánh

| Tiêu chí | Circuit switching | Packet switching | Virtual circuit |
|---|---|---|---|
| Đặt trước tài nguyên | Có, trước khi truyền | Không | Có (thiết lập đường), không giữ băng thông cứng |
| Trạng thái ở node giữa | Có (per-circuit) | Không (stateless forwarding) | Có (bảng VC) |
| Hiệu quả khi bursty | Kém — băng thông rỗi vẫn bị giữ | Cao | Trung bình |
| Đảm bảo | Băng thông + trễ ổn định | Best-effort | Tuỳ cấu hình |
| Thứ tự gói | Luôn đúng | Có thể đảo | Đúng |
| Ví dụ | Mạng điện thoại cũ, sóng quang OTN | Internet (IP) | MPLS, ATM, Frame Relay |

**Đường thứ ba** — [[MPLS]] — là virtual circuit hiện đại chạy đè lên IP, dùng cho traffic engineering.

## 2. Nguyên tắc
1. **Statistical multiplexing chỉ có lãi khi các nguồn không cùng bùng nổ một lúc.** Khi chúng cùng lúc → congestion → cần [[TCP Congestion Control]].
2. **Không giữ trạng thái ở lõi mạng** → router đơn giản, mở rộng được, hỏng thì không mất kết nối (fate sharing).
3. **Store-and-forward** thêm một lần transmission delay mỗi hop; **cut-through** giảm được nhưng không kiểm được lỗi trước khi chuyển.
4. **Datagram forwarding tra theo địa chỉ đích**; virtual circuit tra theo nhãn ngắn → nhanh hơn nhưng cần thiết lập.

## 3. Cạm bẫy hay gặp
- **Nghĩ rằng "đã thuê 100 Mbps là luôn có 100 Mbps"** — trên mạng packet-switched đó là mức trần, không phải mức đảm bảo, trừ khi mua dịch vụ có SLA/QoS thật.
- **Quên rằng cut-through switch vẫn phải store-and-forward khi tốc độ hai cổng khác nhau.**
- **Dùng thứ tự gói làm giả định**: IP không hứa; TCP mới sắp lại. UDP thì tự lo.

## 4. Checklist áp dụng
- [ ] Ứng dụng cần đảm bảo băng thông cứng hay chịu được best-effort?
- [ ] Có chỗ nào trong hệ thống đang giữ trạng thái per-connection ở tầng trung gian không? Nó chết thì sao?
- [ ] Nếu cần đường đi xác định (compliance, độ trễ), có cần MPLS/dedicated link không?

## Tham khảo
- Peterson & Davie — Ch.3.1 Switching Basics: https://book.systemsapproach.org/internetworking/switching.html
- Kurose & Ross — *Computer Networking: A Top-Down Approach*, Ch.1.3: https://gaia.cs.umass.edu/kurose_ross/
- RFC 3031 — *MPLS Architecture* (virtual circuit hiện đại): https://www.rfc-editor.org/rfc/rfc3031
- Baran — *On Distributed Communications* (1964), nguồn gốc packet switching: https://www.rand.org/pubs/research_memoranda/RM3420.html

## Liên kết
[[Network Fundamentals]] · [[Switching & Bridging]] · [[MPLS]] · [[Networking]]
