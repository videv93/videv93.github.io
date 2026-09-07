---
tags: [networking, tools, ops]
status: evergreen
---
# Network Troubleshooting Playbook

> Quy trình cố định để không đoán mò lúc đang có sự cố. **Đi từ dưới lên, mỗi bước loại trừ được một tầng**, và luôn ghi lại cái mình đã loại trừ.

## 1. Quy trình 7 bước

| # | Câu hỏi | Lệnh | Nếu hỏng thì là tầng |
|---|---|---|---|
| 1 | Interface có up, có IP đúng? | `ip -br addr`, `ip link` | L1/L2 |
| 2 | Gateway có tới được? | `ping <gw>`, `ip neigh` | L2/L3 |
| 3 | Route có đúng? | `ip route get <dst>` | L3 |
| 4 | Đích có tới được, qua hop nào? | `mtr -n <dst>` | L3 |
| 5 | Tên có phân giải đúng? | `dig <host>`, `dig @<resolver>` | DNS |
| 6 | Cổng có mở, TCP có bắt tay? | `nc -vz host port`, `ss -tan` | L4 |
| 7 | Ứng dụng trả gì? | `curl -v`, `openssl s_client` | L7 |

Chưa ra thì mới đến bước 8: **bắt gói** → [[Packet Capture]].

## 2. Bảng triệu chứng → nguyên nhân

| Triệu chứng | Nghi ngờ đầu tiên |
|---|---|
| Kết nối được, treo khi gửi dữ liệu lớn | **MTU / PMTUD bị chặn** → [[IP Packet & Fragmentation]] |
| Chậm đúng 40 ms hoặc 200 ms | Nagle + delayed ACK → bật `TCP_NODELAY` → [[TCP]] |
| Chậm đúng 5 s hoặc 30 s | Timeout DNS, thường do IPv6/AAAA hoặc resolver chết → [[DNS]] |
| Lỗi rải rác, không theo quy luật | Một backend hỏng, hoặc ECMP đưa vào đường xấu |
| `Connection reset` | Bên kia gửi RST: app crash, LB idle timeout, hoặc firewall |
| `502` / `504` ngẫu nhiên | Timeout LB < keep-alive backend → [[Load Balancing & Proxy]] |
| `CLOSE_WAIT` tăng dần | **Bug ứng dụng**, quên `close()` → [[TCP State Machine]] |
| Hoạt động khi ping, hỏng khi tải | Bufferbloat / hàng đợi → [[Queuing Disciplines]] |
| Chỉ hỏng với một số người dùng | IPv6, CGNAT, hoặc một PoP CDN → [[IPv6]], [[CDN]] |
| Hỏng sau đúng N phút không hoạt động | NAT/LB idle timeout → [[NAT]] |
| Hỏng lúc nửa đêm hoặc đúng ngày | **Chứng chỉ hết hạn** → [[Key Distribution & PKI]] |

## 3. Nguyên tắc điều tra
1. **Xác định phạm vi trước**: một user hay tất cả? một vùng hay toàn cầu? bắt đầu từ khi nào? Trả lời ba câu này thường thu hẹp được 80%.
2. **"Đã thay đổi gì?"** — phần lớn sự cố đến từ một thay đổi gần đây (deploy, config, chứng chỉ, DNS, rule firewall).
3. **Chia đôi đường đi**: test từ điểm giữa (từ chính máy server, từ trong VPC, từ PoP) để xác định nửa nào có vấn đề.
4. **So sánh với cái đang chạy tốt** — cùng lệnh, khác host/vùng.
5. **Ghi chép theo thời gian thực** — lệnh, output, kết luận. Vừa để tránh lặp lại vừa để viết postmortem.
6. **Cẩn thận với `ping`**: ICMP có thể bị rate-limit hoặc ưu tiên khác → không ping được ≠ không tới được.

## 4. Bộ lệnh cấp cứu

```bash
ip -br addr; ip -br link            # interface và IP
ip route get 8.8.8.8                # route nào được chọn
ip neigh                            # bảng ARP/NDP
mtr -n -c 100 <host>                # loss/latency theo hop
dig +short <host>; dig +trace <host>
ss -tanp | head -30                 # kết nối và tiến trình
ss -s                               # tổng quan socket
nstat -az | grep -iE 'retrans|drop|overflow'
nc -vz <host> <port>
curl -v -o /dev/null -w '%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{time_total}\n' https://<host>
openssl s_client -connect <host>:443 -servername <host> </dev/null | head -20
```

`curl -w` là công cụ chẩn đoán độ trễ tốt nhất: nó tách rõ **DNS / TCP / TLS / server nghĩ / tải xuống**.

## 5. Checklist trước khi leo thang
- [ ] Đã xác định phạm vi (ai/đâu/từ khi nào) chưa?
- [ ] Đã kiểm tra thay đổi gần đây chưa?
- [ ] Đã đi hết 7 bước từ dưới lên chưa?
- [ ] Đã test từ ít nhất 2 vị trí khác nhau chưa?
- [ ] Đã có bằng chứng (output lệnh, pcap) chứ không chỉ là giả thuyết?
- [ ] Đã ghi lại timeline chưa?

## Tham khảo
- Google SRE Workbook — *Effective Troubleshooting*: https://sre.google/sre-book/effective-troubleshooting/
- Brendan Gregg — Linux Performance Tools: https://www.brendangregg.com/linuxperf.html
- `man ss`, `man ip`, `man mtr`
- Julia Evans — *Bite Size Networking*: https://wizardzines.com/zines/bite-size-networking/

## Liên kết
[[Packet Capture]] · [[Network Performance Tuning]] · [[Linux Network Stack]] · [[Learning Roadmap]] · [[Networking]]
