---
tags: [devops, foundation, linux, networking]
status: growing
---
# Linux & Networking for DevOps

> Mọi thứ phía trên — container, Kubernetes, cloud — chỉ là lớp trừu tượng đặt trên Linux và TCP/IP. Khi sự cố xảy ra, **lớp trừu tượng rò rỉ** và bạn phải xuống tới đây.

## 1. Bốn nhóm khái niệm Linux phải nắm
| Nhóm | Cần biết | Vì sao DevOps cần |
|---|---|---|
| **Process** | PID, fork/exec, signal (`SIGTERM` vs `SIGKILL`), zombie, OOM killer | Container nhận `SIGTERM` khi bị xoá → app phải shutdown gracefully → [[Kubernetes Workloads]] |
| **Filesystem** | inode, mount, symlink, permission `rwx`/octal, `/proc`, `/sys` | Volume mount, quyền file trong image, disk full |
| **Users & Permissions** | uid/gid, sudo, capabilities, SUID | Chạy container non-root → [[Container Registry & Image Security]] |
| **Service management** | systemd unit, `journalctl`, target | Cài agent, debug node không lên |

## 2. Bộ lệnh chẩn đoán — nhớ theo tài nguyên
| Tài nguyên | Lệnh nhanh | Lệnh sâu |
|---|---|---|
| CPU | `top`, `htop`, `uptime` (load average) | `pidstat 1`, `perf top` |
| Memory | `free -h`, `top` | `vmstat 1`, `smem`, `/proc/<pid>/status` |
| Disk dung lượng | `df -h` | `du -sh /* \| sort -h`, `ncdu` |
| Disk I/O | `iostat -xz 1` | `iotop`, `biolatency` (bcc) |
| Network | `ss -tulpn`, `ip a`, `ip r` | `tcpdump -i any port 443`, `mtr`, `nstat` |
| Process/syscall | `ps aux`, `lsof -p <pid>` | `strace -p <pid>`, `/proc/<pid>/fd` |
| Log | `journalctl -u <svc> -f`, `tail -f` | `journalctl --since "10 min ago" -p err` |

> **USE method** (Brendan Gregg) cho mỗi tài nguyên: **U**tilization → **S**aturation → **E**rrors. Đây là đường đi hệ thống, thay cho việc gõ lệnh ngẫu nhiên. Xem thêm [[Observability]].

### Bốn nghi phạm khi "server chậm"
1. Load average cao nhưng CPU rảnh → đang chờ I/O (`iostat`, cột `%iowait`).
2. Memory đầy nhưng nhiều `buff/cache` → thường vô hại; nhìn cột `available`, không nhìn `free`.
3. Disk còn chỗ nhưng ghi lỗi → hết **inode** (`df -i`).
4. Ứng dụng không nhận connection mới → hết **file descriptor** (`ulimit -n`, `lsof | wc -l`).

## 3. Networking — bảy thứ phải hiểu
1. **Mô hình 4 tầng TCP/IP**: Link → Internet (IP) → Transport (TCP/UDP) → Application (HTTP/DNS/TLS).
2. **IP & CIDR**: `10.0.0.0/16` = 65 536 địa chỉ; `/24` = 256. Chia subnet là kỹ năng bắt buộc cho [[AWS Global Infrastructure & Networking|VPC]] và [[Kubernetes Networking|Pod CIDR]].
3. **Port & socket**: một kết nối = (src IP, src port, dst IP, dst port, protocol).
4. **DNS**: A / AAAA / CNAME / TXT / MX / SRV; TTL quyết định thời gian lan truyền thay đổi. Trong K8s, DNS là cách Service được tìm thấy.
5. **NAT**: vì sao Private Subnet cần NAT Gateway để `apt update` mà vẫn không bị gọi vào từ ngoài.
6. **TLS handshake**: certificate chain, SNI, expiry. *Sự cố production kinh điển nhất: cert hết hạn.*
7. **HTTP**: status code, header (`Host`, `X-Forwarded-For`), keep-alive, HTTP/2 multiplexing — nền tảng để hiểu Load Balancer L7 và [[Kubernetes Networking|Ingress]].

### Cây quyết định "không kết nối được"
```
Ping IP được?  ── Không → tầng mạng: route, SG/NACL, firewall
      │ Được
Telnet/nc tới port được?  ── Không → service chưa listen, hoặc SG chặn port
      │ Được
Resolve DNS đúng IP?  ── Sai → DNS/cache/TTL
      │ Đúng
curl -v trả lỗi TLS?  ── Có → cert hết hạn / sai SNI / thiếu CA
      │ Không
→ Lỗi tầng ứng dụng: đọc log, xem [[Logging & Log Aggregation]]
```

## 4. Cạm bẫy
- ❌ Dùng `kill -9` làm mặc định → app không kịp flush buffer/đóng connection. Luôn thử `SIGTERM` trước.
- ❌ Đọc cột `free` trong `free -h` rồi hoảng → Linux dùng RAM rảnh làm cache là đúng thiết kế.
- ❌ Sửa cấu hình trực tiếp trên server (`vi /etc/nginx/nginx.conf`) → drift, mất khi thay instance. Xem [[Infrastructure as Code]].
- ❌ Mở `0.0.0.0/0` cho port 22 "tạm thời" → bot quét thấy trong vài phút.
- ❌ Quên rằng container **chia sẻ kernel với host** — `sysctl`, cgroup limit của host ảnh hưởng trực tiếp.

## 5. Checklist khi nhận một server/node lạ
- [ ] `uptime` — máy vừa reboot? load bao nhiêu so với số core (`nproc`)?
- [ ] `df -h` và `df -i` — còn dung lượng và inode không?
- [ ] `free -h` — cột `available` còn bao nhiêu? có swap không?
- [ ] `ss -tulpn` — service nào đang listen port nào?
- [ ] `systemctl --failed` — có unit nào chết không?
- [ ] `journalctl -p err --since today` — có lỗi kernel/OOM không?
- [ ] `ip a` + `ip r` — IP, gateway, MTU có đúng không?
- [ ] Cert của endpoint public còn bao nhiêu ngày? (`openssl s_client -connect host:443 | openssl x509 -noout -dates`)

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `htop` / `btop` | Xem process trực quan | https://htop.dev/ |
| `ncdu` | Tìm thư mục chiếm disk | https://dev.yorhel.nl/ncdu |
| `mtr` | Traceroute + ping liên tục | https://www.bitwizard.nl/mtr/ |
| `dig` / `drill` | Truy vấn DNS chi tiết | — |
| bcc / bpftrace | Quan sát kernel bằng eBPF | https://github.com/iovisor/bcc |
| tcpdump + Wireshark | Bắt và phân tích gói tin | https://www.wireshark.org/ |

## Tham khảo
- Brendan Gregg — Linux Performance & USE Method: https://www.brendangregg.com/usemethod.html
- Brendan Gregg — *Systems Performance* (sách)
- Julia Evans — Networking & Linux zines: https://wizardzines.com/
- Linux `man7` pages (namespaces, cgroups, signal): https://man7.org/linux/man-pages/
- Cloudflare Learning — What is TLS/DNS: https://www.cloudflare.com/learning/

## Liên kết
[[Container Fundamentals]] · [[Kubernetes Networking]] · [[AWS Global Infrastructure & Networking]] · [[Observability]] · [[DevOps]]
