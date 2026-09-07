---
tags: [networking, tools, debugging]
status: growing
---
# Packet Capture

> Khi log của ứng dụng và log của hạ tầng mâu thuẫn nhau, **gói tin là trọng tài cuối cùng**. Biết bắt và đọc gói là kỹ năng phân biệt người đoán mò với người biết chuyện gì đang xảy ra.

## 1. Công thức `tcpdump` cần thuộc

```bash
# Bắt gói, ghi ra file, không phân giải tên, không cắt gói
tcpdump -i any -nn -s 0 -w capture.pcap 'host 10.0.0.5 and port 443'

# Xem trực tiếp, chi tiết header TCP
tcpdump -i eth0 -nn -v 'tcp port 80'

# Chỉ SYN và RST — soi vấn đề thiết lập kết nối
tcpdump -nn 'tcp[tcpflags] & (tcp-syn|tcp-rst) != 0'

# Chỉ gói bị phân mảnh
tcpdump -nn 'ip[6:2] & 0x1fff != 0'

# Xoay file để bắt lâu không đầy đĩa
tcpdump -i any -nn -w cap.pcap -C 100 -W 10
```

| Cờ | Nghĩa |
|---|---|
| `-i any` | mọi interface |
| `-nn` | không phân giải DNS/tên cổng (**nhanh hơn, không tự tạo traffic**) |
| `-s 0` | không cắt payload |
| `-w` | ghi pcap để mở bằng Wireshark |
| `-C`/`-W` | xoay vòng file |

## 2. Quy trình đọc một capture
1. **Xem tổng quan trước**: Wireshark → *Statistics → Conversations*, *Protocol Hierarchy*, *Expert Information*.
2. **Lọc theo một kết nối**: chuột phải → *Follow → TCP Stream*.
3. **Kiểm tra bắt tay**: có SYN? có SYN-ACK? bao lâu? RST đến từ đâu?
4. **Tìm dấu hiệu bất thường**: `tcp.analysis.retransmission`, `tcp.analysis.zero_window`, `tcp.analysis.duplicate_ack`.
5. **Đo thời gian**: cột delta time cho biết chờ ở đâu — chờ mạng hay chờ ứng dụng.

**Bộ lọc Wireshark hay dùng**:
```
tcp.flags.reset == 1
tcp.analysis.flags
http.response.code >= 400
dns.flags.rcode != 0
tls.handshake.type == 1
```

## 3. Nguyên tắc
1. **Bắt ở nhiều điểm** khi nghi ngờ thiết bị trung gian: bắt ở client và ở server rồi so sánh — cái nào không thấy gói thì vấn đề nằm giữa hai điểm.
2. **`tcpdump` khác `tcpdump` trong container**: namespace khác nhau → phải vào đúng namespace (`nsenter -t <pid> -n tcpdump`) → [[Container & Cloud Networking]].
3. **Checksum "bad" ở gói gửi đi là bình thường** (offload lên NIC) → [[Error Detection]].
4. **Lưu lượng đã mã hoá**: TLS cần khoá (`SSLKEYLOGFILE`) mới đọc được nội dung; QUIC cần **qlog** → [[QUIC]].
5. **Với vấn đề tần suất thấp, dùng ring buffer** và trigger dừng khi phát hiện triệu chứng — đừng bắt tay không rồi ngồi chờ.

## 4. Cạm bẫy hay gặp
- **Bắt gói không có bộ lọc trên máy tải cao** → đầy đĩa, drop gói, và ảnh hưởng hiệu năng. Luôn có filter và giới hạn.
- **Quên `-s 0`** trên hệ thống cũ → payload bị cắt, không phân tích được L7.
- **Dùng `-n` thiếu (một `n`)** → tcpdump tự query DNS, tạo thêm traffic vào chính capture của mình.
- **Capture chứa dữ liệu nhạy cảm** — pcap có thể chứa cookie, token, PII. Xử lý như dữ liệu mật.
- **Kết luận từ một phía** — không thấy gói đến không có nghĩa nó không được gửi.

## 5. Checklist áp dụng
- [ ] Đã có bộ lọc thu hẹp (host + port) trước khi bắt chưa?
- [ ] Có bắt ở cả hai đầu để đối chiếu không?
- [ ] File pcap có được giới hạn kích thước/thời gian không?
- [ ] Bắt đúng interface/namespace chưa?
- [ ] Pcap có chứa dữ liệu nhạy cảm không? Lưu ở đâu, xoá khi nào?

## Công cụ
| Tên | Dùng để | Link |
|---|---|---|
| `tcpdump` | bắt gói ở mọi nơi có shell | https://www.tcpdump.org/ |
| **Wireshark** / `tshark` | phân tích sâu, giải mã giao thức | https://www.wireshark.org/ |
| `termshark` | giao diện TUI cho tshark | https://termshark.io/ |
| `ngrep` | grep trên payload | |
| `bpftrace` / `pwru` | truy vết gói trong kernel | https://github.com/cilium/pwru |

## Tham khảo
- `man pcap-filter` — cú pháp BPF: https://www.tcpdump.org/manpages/pcap-filter.7.html
- Wireshark User's Guide: https://www.wireshark.org/docs/wsug_html_chunked/
- Julia Evans — *Networking zines / tcpdump*: https://jvns.ca/

## Liên kết
[[Network Troubleshooting Playbook]] · [[TCP]] · [[Linux Network Stack]] · [[Networking]]
