---
tags: [networking, link-layer]
status: growing
---
# Framing

> Bộ thu chỉ nhận được một dòng bit liên tục — framing là cách nó biết **frame bắt đầu và kết thúc ở đâu**. Không có framing thì không có gì khác hoạt động được.

## 1. Bốn cách xác định biên frame

| Cách | Cơ chế | Ví dụ | Rủi ro |
|---|---|---|---|
| **Sentinel / byte stuffing** | Ký tự đặc biệt đánh dấu đầu-cuối; nếu dữ liệu chứa ký tự đó thì chèn escape | PPP (`0x7E` flag, escape `0x7D`) | Kích thước frame giãn khi dữ liệu nhiều byte trùng |
| **Bit stuffing** | Sau 5 bit `1` liên tiếp thì chèn một bit `0` | HDLC | Cần xử lý ở phần cứng |
| **Byte counting** | Header ghi độ dài payload | DDCMP | Sai một byte đếm → mất đồng bộ cả chuỗi (framing error) |
| **Clock-based / mã đặc biệt** | Dùng symbol không hợp lệ của line code làm dấu | SONET, Ethernet preamble + SFD | Phụ thuộc [[Encoding]] |

Ethernet dùng: **preamble 7B + SFD 1B** để đồng bộ, rồi header, payload 46–1500B, **FCS 4B**, và **interframe gap** 12B.

## 2. Nguyên tắc
1. **Frame phải có giới hạn kích thước** (MTU) — vì buffer hữu hạn và vì lỗi bit làm hỏng cả frame; frame càng lớn xác suất phải truyền lại càng cao.
2. **Payload tối thiểu tồn tại vì lý do vật lý**: Ethernet cần ≥64B frame để phát hiện va chạm kịp (CSMA/CD) → frame nhỏ hơn bị **padding**.
3. **Framing luôn đi kèm phát hiện lỗi** — nhận đúng biên nhưng sai nội dung thì vô nghĩa → [[Error Detection]].
4. **Jumbo frame (9000B)** giảm overhead CPU trong DC, nhưng **phải bật đồng bộ trên toàn bộ đường đi** mới dùng được.

## 3. Cạm bẫy hay gặp
- **Bật jumbo frame lệch nhau** giữa host và switch → gói lớn im lặng bị drop, ping nhỏ vẫn ok. Kiểm tra bằng `ping -M do -s 8972`.
- **Coi MTU là 1500 ở mọi nơi**: PPPoE 1492, VXLAN 1450, WireGuard 1420 → xem [[Protocol Layering & Encapsulation]].
- **Nhầm frame với packet**: frame là L2 (có MAC + FCS), packet là L3. `tcpdump` cho ta thấy cả hai.

## 4. Checklist áp dụng
- [ ] MTU end-to-end thực sự là bao nhiêu? (đo bằng ping DF-bit tăng dần)
- [ ] Có bật jumbo frame? Toàn bộ chặng đã đồng bộ chưa?
- [ ] Bộ đếm `rx_frame_errors` / `rx_crc_errors` có tăng không?

## Tham khảo
- Peterson & Davie — 2.3 Framing: https://book.systemsapproach.org/direct/framing.html
- RFC 1662 — *PPP in HDLC-like Framing*: https://www.rfc-editor.org/rfc/rfc1662
- IEEE 802.3 Clause 3 — MAC frame format: https://standards.ieee.org/ieee/802.3/

## Liên kết
[[Encoding]] · [[Error Detection]] · [[Ethernet]] · [[Protocol Layering & Encapsulation]] · [[Networking]]
