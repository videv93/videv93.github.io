---
tags: [networking, linux, ops]
status: growing
---
# Linux Network Stack

> Nơi mọi lý thuyết gặp thực tế. Biết đường đi của một gói trong kernel giúp **biết chỗ nào đo được, chỗ nào chỉnh được, và chỗ nào gói bị mất**.

## 1. Đường đi của một gói vào

```
NIC → (DMA vào ring buffer) → IRQ / NAPI poll
   → netfilter PREROUTING (raw → conntrack → mangle → nat)
   → routing decision
   → INPUT chain → socket receive buffer → ứng dụng đọc
```
Gói đi ra: `socket → OUTPUT → POSTROUTING (nat) → qdisc → driver → NIC`.

**Điểm rớt gói cần kiểm tra**: ring buffer NIC (`ethtool -S | grep -i drop`), backlog softirq (`netdev_max_backlog`), conntrack đầy, qdisc drop (`tc -s qdisc`), socket buffer đầy (`ss -m`, `nstat`).

## 2. Công cụ theo lớp

| Lớp | Lệnh |
|---|---|
| Interface / driver | `ip -s link`, `ethtool -S eth0`, `ethtool -g/-k eth0` |
| Route / neighbor | `ip route`, `ip rule`, `ip neigh` |
| Netfilter | `nft list ruleset`, `conntrack -L`, `iptables -L -n -v` |
| Qdisc | `tc qdisc show`, `tc -s qdisc show dev eth0` → [[Queuing Disciplines]] |
| Socket | `ss -tanpim`, `ss -ti` (RTT, cwnd, retrans) |
| Bộ đếm toàn hệ thống | `nstat -az`, `netstat -s`, `/proc/net/snmp` |
| Namespace | `ip netns list`, `nsenter -t <pid> -n <cmd>` |
| eBPF | `bpftrace`, `bcc` (tcpretrans, tcpconnect), `pwru` |

## 3. Các sysctl đáng biết
```bash
net.core.somaxconn                 # accept queue tối đa (mặc định 4096 trên kernel mới)
net.ipv4.tcp_max_syn_backlog       # SYN queue
net.core.rmem_max / wmem_max       # trần buffer socket
net.ipv4.tcp_rmem / tcp_wmem       # min/default/max, auto-tuning
net.ipv4.tcp_congestion_control    # cubic | bbr → [[TCP Congestion Control]]
net.core.default_qdisc             # fq | fq_codel
net.ipv4.ip_local_port_range       # dải ephemeral port
net.ipv4.tcp_tw_reuse              # tái dùng TIME_WAIT cho outbound
net.netfilter.nf_conntrack_max     # dung lượng bảng conntrack
net.ipv4.tcp_syncookies            # sống sót SYN flood
```
**Nguyên tắc**: đo trước, đổi một thứ một lần, ghi lại lý do. Đừng copy "bộ sysctl tối ưu" từ blog.

## 4. Network namespace — thí nghiệm 5 phút
```bash
ip netns add red; ip netns add blue
ip link add veth0 type veth peer name veth1
ip link set veth0 netns red; ip link set veth1 netns blue
ip netns exec red  ip addr add 10.10.0.1/24 dev veth0
ip netns exec blue ip addr add 10.10.0.2/24 dev veth1
ip netns exec red  ip link set veth0 up
ip netns exec blue ip link set veth1 up
ip netns exec red ping -c3 10.10.0.2
```
Đây chính xác là cơ chế mạng của container → [[Container & Cloud Networking]].

## 5. Cạm bẫy hay gặp
- **Chỉnh sysctl mà quên áp dụng cho container** — namespace mạng có sysctl riêng.
- **Tăng buffer socket rất lớn** → tăng độ trễ và dùng nhiều RAM; auto-tuning của Linux thường tốt hơn.
- **`somaxconn` lớn nhưng backlog trong code nhỏ** — kernel lấy giá trị nhỏ hơn.
- **Không nhìn `nstat`** — nó chứa đúng bộ đếm cần (`TcpExtListenOverflows`, `TcpExtTCPBacklogDrop`, `TcpRetransSegs`).
- **Quên GRO/GSO/TSO khi đọc pcap** — thấy "gói 64 KB" là do offload, không phải gói thật trên dây.

## 6. Checklist áp dụng
- [ ] `nstat -az | grep -iE 'drop|overflow|retrans'` có số nào tăng không?
- [ ] `ethtool -S` có `rx_dropped` / `rx_no_buffer` không?
- [ ] `ss -ti` cho RTT và retrans thật là bao nhiêu?
- [ ] `conntrack` dùng bao nhiêu phần trăm?
- [ ] Thay đổi sysctl đã được ghi vào cấu hình (không chỉ chạy tay) chưa?

## Tham khảo
- Linux kernel networking documentation: https://docs.kernel.org/networking/
- `man 7 tcp`, `man 8 ip`, `man 8 tc`
- Brendan Gregg — *Linux Performance*: https://www.brendangregg.com/linuxperf.html
- Cloudflare — *The story of one latency spike* (loạt bài về stack Linux): https://blog.cloudflare.com/the-story-of-one-latency-spike/

## Liên kết
[[Packet Capture]] · [[Network Performance Tuning]] · [[Socket API]] · [[Container & Cloud Networking]] · [[Networking]]
