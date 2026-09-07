---
tags: [networking, internetworking, routing]
status: growing
---
# Routing Basics

> Routing = **xây bảng** (control plane, chậm, phân tán). Forwarding = **tra bảng** (data plane, nhanh, mỗi gói). Tách bạch hai khái niệm này là chìa khoá hiểu mọi thứ còn lại.

## 1. Hai họ thuật toán

| | Distance Vector | Link State |
|---|---|---|
| Mỗi node biết gì | Khoảng cách tới mọi đích, qua hàng xóm | **Toàn bộ topology** |
| Trao đổi | Bảng khoảng cách, chỉ với hàng xóm | LSA flood ra toàn mạng |
| Thuật toán | Bellman-Ford | Dijkstra (SPF) |
| Hội tụ | Chậm, có count-to-infinity | Nhanh, ổn định |
| Bộ nhớ / CPU | Thấp / thấp | Cao hơn |
| Ví dụ | RIP, EIGRP (lai), **BGP** (path vector) | **OSPF**, IS-IS |

**Path vector** (BGP) = distance vector nhưng mang theo cả đường đi (AS_PATH) → phát hiện vòng lặp bằng cách nhìn thấy chính mình trong path. → [[BGP & Interdomain Routing]]

## 2. Nguyên tắc
1. **Count-to-infinity** là bệnh của distance vector: sau khi một link chết, các node "học lẫn nhau" đường đi đã hỏng. Giảm nhẹ bằng *split horizon*, *poison reverse*, và giới hạn metric (RIP: 16 = vô cực).
2. **Link state hội tụ nhanh vì mọi node tính độc lập trên cùng một bản đồ** — nhưng chỉ đúng nếu LSDB đồng bộ.
3. **Metric là chính sách, không phải sự thật.** OSPF cost mặc định theo băng thông; ai cũng chỉnh được → cần thiết kế có chủ đích.
4. **ECMP** (Equal-Cost Multi-Path) chia tải theo hash 5-tuple để giữ gói cùng flow đi cùng đường (tránh đảo thứ tự).
5. **Default route (`0.0.0.0/0`)** là "không biết thì đưa lên trên" — luôn thua mọi prefix cụ thể hơn.

## 3. Cạm bẫy hay gặp
- **Nhầm routing với forwarding** khi đọc tài liệu SDN/eBPF — SDN chính là tách control plane ra khỏi thiết bị.
- **Route asymmetry**: chiều đi và chiều về khác đường → firewall stateful drop chiều về. Rất hay gặp khi có nhiều uplink.
- **Chỉnh metric thủ công rồi quên** → traffic đi đường vòng khi có sự cố.
- **ECMP làm mất thứ tự** nếu hash theo gói thay vì theo flow → TCP hiểu nhầm là mất gói.
- **Route flapping** làm CPU control plane tăng vọt; cần dampening.

## 4. Checklist áp dụng
- [ ] Đường đi và đường về có đối xứng không? (`traceroute` hai chiều)
- [ ] `ip route get <dst>` cho ra route nào? Có đúng như kỳ vọng không?
- [ ] Có default route dự phòng không? Nó trỏ đi đâu khi uplink chính chết?
- [ ] ECMP có hash theo flow (5-tuple) không?
- [ ] Thời gian hội tụ khi mất một link là bao lâu? Đã đo thật chưa?

## Tham khảo
- Peterson & Davie — 3.4 Routing: https://book.systemsapproach.org/internetworking/routing.html
- Dijkstra — *A Note on Two Problems in Connexion with Graphs* (1959): https://link.springer.com/article/10.1007/BF01386390
- RFC 2328 — *OSPF Version 2*: https://www.rfc-editor.org/rfc/rfc2328

## Liên kết
[[Intradomain Routing]] · [[BGP & Interdomain Routing]] · [[Router Implementation & Forwarding]] · [[Networking]]
