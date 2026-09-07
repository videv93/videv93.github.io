---
tags: [networking, internetworking, routing]
status: growing
---
# Intradomain Routing

> Định tuyến **bên trong** một tổ chức (IGP): mọi router cùng chủ, cùng mục tiêu là tìm đường ngắn nhất. Khác hẳn [[BGP & Interdomain Routing]] — nơi mục tiêu là *chính sách và tiền*.

## 1. So sánh các IGP

| | RIP | OSPF | IS-IS | EIGRP |
|---|---|---|---|---|
| Loại | Distance vector | Link state | Link state | Lai (DUAL) |
| Metric | Số hop (tối đa 15) | Cost theo băng thông | Cost tuỳ chọn | Bandwidth + delay |
| Chạy trên | UDP 520 | IP protocol 89 | Trực tiếp trên L2 (CLNS) | IP protocol 88 |
| Phân vùng | Không | **Area**, area 0 là backbone | Level 1 / Level 2 | Không |
| Hỗ trợ IPv6 | RIPng | OSPFv3 (bản riêng) | **Cùng một instance** | Có |
| Thực tế dùng | Gần như không | Doanh nghiệp, phổ biến nhất | ISP, DC lớn | Cisco-only |

**Trong datacenter hiện đại**: nhiều nơi bỏ IGP và dùng **BGP trong cả DC** (Clos/leaf-spine, RFC 7938) vì đơn giản và ổn định hơn khi rất nhiều thiết bị.

## 2. Nguyên tắc OSPF cần thuộc
1. **Hierarchy bằng area**: mọi area phải nối tới **area 0**. Chia area để giới hạn phạm vi flood LSA và giảm SPF run.
2. **DR/BDR trên mạng multi-access** để giảm số adjacency từ O(n²) xuống O(n).
3. **LSDB phải đồng nhất trong một area** — bất đồng bộ là lỗi nghiêm trọng, thường do MTU mismatch làm adjacency kẹt ở `EXSTART`.
4. **Cost mặc định = reference-bandwidth / bandwidth**; reference mặc định 100 Mbps là quá cũ → phải chỉnh (`auto-cost reference-bandwidth`) nếu không mọi link ≥100 Mbps có cost = 1.
5. **Passive interface** trên mọi cổng không có router láng giềng — vừa an toàn vừa giảm nhiễu.
6. **Timer hội tụ**: hello/dead mặc định 10/40 s là chậm; muốn nhanh dùng **BFD** (phát hiện link chết trong vài chục ms).

## 3. Cạm bẫy hay gặp
- **Adjacency kẹt ở EXSTART/EXCHANGE** → gần như luôn là **MTU không khớp** hai đầu.
- **Redistribute hai chiều giữa OSPF và BGP/tĩnh mà không lọc** → vòng lặp định tuyến và route rò rỉ.
- **Quên `passive-interface default`** → router phát hello ra cổng người dùng, ai cũng có thể giả làm neighbor.
- **Reference bandwidth mặc định** làm mọi đường đều "ngắn như nhau" → chọn đường sai.
- **Một area quá lớn** → mỗi thay đổi làm cả area chạy lại SPF.

## 4. Checklist áp dụng
- [ ] MTU hai đầu link OSPF có khớp không?
- [ ] `reference-bandwidth` đã chỉnh phù hợp với tốc độ link hiện tại chưa?
- [ ] Đã bật `passive-interface` cho cổng không có neighbor chưa?
- [ ] Xác thực (authentication) cho adjacency đã bật chưa?
- [ ] Có BFD cho link quan trọng để hội tụ nhanh không?
- [ ] Redistribute có route-map lọc và tag chống vòng lặp chưa?

## Tham khảo
- RFC 2328 — *OSPF Version 2*: https://www.rfc-editor.org/rfc/rfc2328
- RFC 5340 — *OSPF for IPv6*: https://www.rfc-editor.org/rfc/rfc5340
- ISO 10589 / RFC 1195 — *IS-IS*: https://www.rfc-editor.org/rfc/rfc1195
- RFC 7938 — *Use of BGP for Routing in Large-Scale Data Centers*: https://www.rfc-editor.org/rfc/rfc7938

## Liên kết
[[Routing Basics]] · [[BGP & Interdomain Routing]] · [[MPLS]] · [[Networking]]
