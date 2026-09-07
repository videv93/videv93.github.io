---
tags: [networking, foundation]
status: growing
---
# Network Fundamentals

> Mạng máy tính là bài toán **chia sẻ một tài nguyên khan hiếm (đường truyền) giữa nhiều bên không tin nhau, trên phần cứng luôn hỏng** — mọi khái niệm còn lại đều là hệ quả của ba ràng buộc đó.

## 1. Khái niệm cốt lõi

| Khái niệm | Nghĩa | Vì sao quan trọng |
|---|---|---|
| **Link** | Đường truyền vật lý nối 2 node | Đơn vị nhỏ nhất; mọi thứ khác xây trên nó |
| **Node** | Host (đầu cuối) hoặc switch/router (trung gian) | Host chạy app, switch chỉ chuyển tiếp |
| **Multiplexing** | Nhiều luồng dùng chung một link | FDM / TDM / **statistical multiplexing** (Internet dùng cái cuối) |
| **Packet** | Đơn vị dữ liệu tự mô tả (header + payload) | Cho phép statistical multiplexing |
| **Best-effort** | Mạng không hứa gì: gói có thể mất, trễ, đảo thứ tự, nhân đôi | Đẩy độ tin cậy lên tầng trên → [[Protocol Layering & Encapsulation]] |

**Bốn kiểu hỏng mà mọi thiết kế mạng phải giả định**: mất gói (bit lỗi / đầy hàng đợi), trễ biến thiên, đảo thứ tự, trùng lặp.

## 2. Nguyên tắc thiết kế nền
1. **End-to-End Argument** — chức năng nào cần đảm bảo đúng ở đầu cuối thì phải làm ở đầu cuối; làm ở tầng dưới chỉ là tối ưu hiệu năng, không thay thế được. (Saltzer, Reed, Clark 1984)
2. **Narrow waist** — một giao thức chung ở giữa (IP), tự do bên trên và bên dưới. Nhờ vậy Internet chạy được trên mọi loại link và mọi loại app. Xem [[OSI & TCP-IP Model]].
3. **Fate sharing** — trạng thái kết nối nằm ở đầu cuối, không nằm ở router; router chết không giết kết nối.
4. **Soft state** — trạng thái trung gian tự hết hạn nếu không được làm mới. An toàn hơn hard state.
5. **Statistical multiplexing thắng vì lưu lượng bursty** — nhưng đổi lại phải có [[Resource Allocation]] và hàng đợi.

## 3. Cạm bẫy hay gặp
- **Coi mạng là đáng tin.** Là sai lầm số 1 trong *Fallacies of Distributed Computing*. Mọi RPC đều có thể mất, chậm, hoặc thực thi hai lần.
- **Nhầm bandwidth với latency.** Thêm băng thông không làm giảm RTT. Xem [[Bandwidth & Latency]].
- **Quên rằng "gửi thành công" chỉ nghĩa là "đã đưa vào buffer kernel"** — không phải bên kia đã nhận.
- **Bỏ qua MTU.** Gói lớn hơn MTU bị fragment hoặc bị drop kèm ICMP — nguồn của các lỗi "kết nối treo lúc gửi file lớn".

## 4. Checklist áp dụng
- [ ] Đã liệt kê điều gì xảy ra khi request này mất / đến hai lần chưa?
- [ ] Timeout của mình có dựa trên RTT thực đo được, hay là số ma thuật?
- [ ] Chức năng đúng đắn đang đặt ở đầu cuối hay đang trông chờ mạng lo hộ?
- [ ] Trạng thái nào đang giữ ở phía trung gian (proxy, LB)? Nó hết hạn kiểu gì?

## Tham khảo
- Peterson & Davie — *Computer Networks: A Systems Approach*, Ch.1: https://book.systemsapproach.org/foundation.html
- Saltzer, Reed, Clark — *End-to-End Arguments in System Design*: https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf
- Clark — *The Design Philosophy of the DARPA Internet Protocols*: https://dl.acm.org/doi/10.1145/52325.52336
- *Fallacies of Distributed Computing*: https://nighthacks.com/jag/res/Fallacies.html

## Liên kết
[[OSI & TCP-IP Model]] · [[Bandwidth & Latency]] · [[Switching Paradigms]] · [[Networking]]
