---
tags: [networking, internetworking, dataplane]
status: seed
---
# Router Implementation & Forwarding

> Router phải quyết định đường đi cho **hàng trăm triệu gói mỗi giây**. Hiểu data plane giải thích vì sao một số tính năng "miễn phí" còn một số khác làm sập hiệu năng.

## 1. Kiến trúc một router

| Thành phần | Việc | Tốc độ |
|---|---|---|
| **Control plane** | Chạy OSPF/BGP, xây RIB (Routing Information Base) | CPU thường, chậm |
| **Data plane** | Tra FIB (Forwarding Information Base), chuyển gói | ASIC/NPU, line-rate |
| **Switch fabric** | Nối cổng vào với cổng ra | crossbar, shared memory |
| **Buffer / queue** | Hấp thụ burst | → [[Queuing Disciplines]] |

**RIB → FIB**: control plane tính ra route tốt nhất rồi "cài" xuống FIB. Số route FIB bị giới hạn bởi TCAM của phần cứng — đây là lý do bảng route Internet (>950k prefix IPv4) làm chết các switch đời cũ.

## 2. Cách tra bảng nhanh
1. **Longest Prefix Match** không thể dùng hash trực tiếp → dùng **trie/LPM** trong phần mềm, **TCAM** trong phần cứng.
2. **TCAM tra song song trong 1 chu kỳ** nhưng đắt, nóng, và dung lượng hữu hạn.
3. **Fast path vs slow path**: gói bình thường đi ASIC; gói cần xử lý đặc biệt (IP options, TTL=1, ARP chưa có, phân mảnh) bị "punt" lên CPU → **rất chậm và dễ bị lợi dụng để DoS control plane**.
4. **Software data plane hiện đại**: DPDK, XDP/eBPF, VPP — bỏ qua kernel stack để đạt hàng chục Mpps trên CPU thường → [[Linux Network Stack]].
5. **SDN**: tách hẳn control plane ra khỏi thiết bị (OpenFlow, P4) để lập trình được đường đi → [[Quality of Service]].

## 3. Cạm bẫy hay gặp
- **Bảng route vượt dung lượng TCAM** → thiết bị âm thầm chuyển sang software forwarding, throughput sụp. Theo dõi mức sử dụng TCAM.
- **Tính năng bật lên làm rơi khỏi fast path** (NetFlow chi tiết, ACL phức tạp, NAT trên thiết bị không hỗ trợ phần cứng).
- **Không bảo vệ control plane** (CoPP): flood gói TTL=1 hoặc ARP làm CPU router 100%.
- **Đo hiệu năng bằng gói lớn**: line-rate với gói 1500B rất dễ, với gói 64B mới là bài kiểm tra thật (**pps**, không phải bps).

## 4. Checklist áp dụng
- [ ] Số route hiện tại so với dung lượng FIB/TCAM là bao nhiêu phần trăm?
- [ ] Control Plane Policing đã bật chưa?
- [ ] Tính năng nào đang khiến gói đi slow path? (kiểm tra CPU của thiết bị)
- [ ] Yêu cầu hiệu năng nên đo bằng **pps** hay **bps**? Kích thước gói thực tế là bao nhiêu?

## Tham khảo
- Peterson & Davie — 3.5 Implementation: https://book.systemsapproach.org/internetworking/impl.html
- Peterson et al. — *Software-Defined Networks: A Systems Approach*: https://sdn.systemsapproach.org/
- CIDR Report — kích thước bảng route toàn cầu: https://www.cidr-report.org/as2.0/
- Cilium — *BPF and XDP Reference Guide*: https://docs.cilium.io/en/stable/bpf/

## Liên kết
[[Routing Basics]] · [[Queuing Disciplines]] · [[Linux Network Stack]] · [[Networking]]
