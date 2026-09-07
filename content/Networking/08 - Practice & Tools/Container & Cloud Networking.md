---
tags: [networking, cloud, container]
status: growing
---
# Container & Cloud Networking

> Mọi khái niệm mạng cổ điển được **ảo hoá và lồng vào nhau**: namespace trong VM, VM trong VPC, VPC trong Internet. Debug được ở đây nghĩa là biết mình đang đứng ở lớp nào.

## 1. Mạng container — từ dưới lên
1. **Network namespace**: mỗi pod/container có stack mạng riêng (interface, route, iptables) → [[Linux Network Stack]].
2. **veth pair** nối namespace với bridge trên host; hoặc **macvlan/ipvlan** để gắn thẳng vào mạng vật lý.
3. **CNI plugin** cấp IP và cấu hình route: Calico (BGP, không overlay), Cilium (eBPF), Flannel (VXLAN).
4. **Overlay (VXLAN/Geneve)** đóng gói L2 trong UDP để pod ở host khác nhau nói chuyện được — **ăn mất ~50B MTU** → [[Protocol Layering & Encapsulation]].
5. **kube-proxy / eBPF**: Service ClusterIP là **IP ảo không tồn tại trên interface nào** — nó là rule DNAT (iptables/IPVS) hoặc chương trình eBPF.

**Mô hình mạng Kubernetes**: mọi pod có IP riêng, mọi pod nói chuyện được với mọi pod **không qua NAT**. Đây là giả định nền của mọi thứ khác.

## 2. Mạng cloud (VPC)
| Khái niệm | Tương đương truyền thống |
|---|---|
| VPC | Một mạng riêng, có CIDR → [[IP Addressing & Subnetting]] |
| Subnet (theo AZ) | Broadcast domain (nhưng **không có broadcast/multicast thật**) |
| Security Group | Firewall **stateful**, gắn với instance |
| Network ACL | Firewall **stateless**, gắn với subnet — dễ quên rule chiều về |
| Route table | Bảng route, gắn với subnet |
| Internet Gateway / NAT Gateway | Đường ra Internet → [[NAT]] |
| VPC Peering / Transit Gateway | Nối các VPC (**không bắc cầu** — A↔B, B↔C không cho A↔C) |
| PrivateLink / Endpoint | Truy cập dịch vụ mà không qua Internet |

## 3. Cạm bẫy hay gặp
- **CIDR chồng lấn giữa VPC/on-prem** → không peering được, không VPN được. Quy hoạch từ đầu.
- **Hết IP pod**: mỗi node giữ một dải; với AWS VPC CNI mỗi instance có giới hạn ENI/IP cứng. Tính trước.
- **MTU của overlay** (1450) không khớp với ứng dụng → treo khi truyền lớn. Đây là sự cố kinh điển trong K8s.
- **NAT Gateway cạn port hoặc tốn tiền** — chi phí xử lý dữ liệu của NAT GW thường là khoản bất ngờ lớn nhất trong hoá đơn mạng.
- **Network ACL stateless**: mở port 443 chiều vào nhưng quên ephemeral port chiều ra → kết nối thất bại khó hiểu.
- **DNS trong cluster**: CoreDNS + `ndots:5` làm mỗi truy vấn ngoài cluster tốn nhiều lần lookup thất bại → cấu hình `ndots` hoặc dùng FQDN có dấu chấm cuối → [[DNS]].
- **Chi phí truyền dữ liệu xuyên AZ/vùng** — kiến trúc "microservice gọi chéo AZ" có thể tốn hơn cả compute.
- **NetworkPolicy mặc định là cho phép tất cả** — phải chủ động tạo default-deny → [[Firewall & Filtering]].

## 4. Chẩn đoán trong container
```bash
# Vào network namespace của một pod trên node
nsenter -t $(pgrep -f <process>) -n ip addr
nsenter -t <pid> -n tcpdump -nn -i any port 443

# Từ trong cluster
kubectl run tmp --rm -it --image=nicolaka/netshoot -- bash
#   trong đó có: dig, curl, tcpdump, mtr, ss, iperf3
```

## 5. Checklist áp dụng
- [ ] CIDR của VPC/cluster có chồng lấn với on-prem hoặc VPC khác không?
- [ ] MTU của overlay là bao nhiêu? Ứng dụng đã tính đến chưa?
- [ ] Đủ IP cho số pod mục tiêu chưa?
- [ ] NetworkPolicy có default-deny không?
- [ ] Network ACL (stateless) có rule cho cả hai chiều không?
- [ ] Lưu lượng xuyên AZ có được tối thiểu hoá không? Đã xem chi phí chưa?
- [ ] `ndots` và DNS caching trong cluster đã tối ưu chưa?

## Tham khảo
- Kubernetes — Cluster Networking: https://kubernetes.io/docs/concepts/cluster-administration/networking/
- CNI specification: https://github.com/containernetworking/cni/blob/main/SPEC.md
- Cilium — *eBPF-based Networking*: https://docs.cilium.io/en/stable/overview/intro/
- AWS — VPC User Guide: https://docs.aws.amazon.com/vpc/latest/userguide/

## Liên kết
[[Linux Network Stack]] · [[IP Addressing & Subnetting]] · [[NAT]] · [[Firewall & Filtering]] · [[Networking]]
