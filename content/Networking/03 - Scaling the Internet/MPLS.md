---
tags: [networking, scaling, mpls]
status: seed
---
# MPLS

> Chuyển tiếp theo **nhãn ngắn** thay vì tra địa chỉ IP. Ban đầu là để nhanh hơn; ngày nay tốc độ không còn là lý do — **traffic engineering và VPN mới là lý do MPLS tồn tại**.

## 1. Cách hoạt động

| Vai trò | Việc |
|---|---|
| **LER / PE** (edge) | Gắn nhãn vào gói khi vào mạng, gỡ nhãn khi ra |
| **LSR / P** (core) | Chỉ tra nhãn (swap), không cần biết bảng route Internet |
| **LSP** | Đường đi được thiết lập trước, tương tự virtual circuit → [[Switching Paradigms]] |
| **Label stack** | Nhiều nhãn lồng nhau: nhãn ngoài để đi trong lõi, nhãn trong để phân biệt VPN |

Nhãn MPLS 32 bit nằm **giữa header L2 và L3** — nên gọi vui là "tầng 2.5". Có TTL riêng, và có **PHP** (Penultimate Hop Popping) để router cuối đỡ phải tra hai lần.

Giao thức phân phối nhãn: **LDP** (đơn giản, đi theo IGP) hoặc **RSVP-TE / SR-TE** (chọn đường có ràng buộc băng thông).

## 2. Vì sao MPLS vẫn được dùng
1. **L3VPN (RFC 4364)**: nhiều khách hàng dùng dải IP chồng lấn trên cùng hạ tầng, cách ly bằng VRF + nhãn. Đây là sản phẩm bán chạy nhất của MPLS.
2. **Traffic engineering**: ép traffic đi đường không phải đường ngắn nhất — điều mà IGP thuần không làm được → [[Intradomain Routing]].
3. **Fast Reroute**: chuyển sang đường dự phòng trong <50 ms, nhanh hơn hội tụ IGP rất nhiều.
4. **L2VPN / pseudowire**: kéo dài Ethernet giữa hai site qua mạng nhà cung cấp.
5. **Segment Routing (SR-MPLS, SRv6)** là thế hệ tiếp theo: mã hoá đường đi vào chính gói, **bỏ được LDP/RSVP và trạng thái trong lõi**.

## 3. MPLS vs SD-WAN vs Internet
| | MPLS | Internet + VPN | SD-WAN |
|---|---|---|---|
| SLA về trễ/mất gói | Có, hợp đồng | Không | Tuỳ đường bên dưới |
| Chi phí | Rất cao | Thấp | Trung bình |
| Thời gian cấp mới | Tuần–tháng | Ngày | Ngày |
| Điều khiển đường đi | Nhà mạng | Không | Ứng dụng tự chọn đường |

Xu hướng: doanh nghiệp chuyển từ MPLS thuần sang **SD-WAN lai** — giữ MPLS cho lưu lượng nhạy cảm, đẩy phần còn lại qua Internet.

## 4. Cạm bẫy hay gặp
- **Quên MTU**: mỗi nhãn ăn 4B. Stack 2–3 nhãn + tunnel → PMTUD phải hoạt động → [[IP Packet & Fragmentation]].
- **Traceroute qua MPLS trông "phẳng"** vì lõi ẩn hop (TTL propagation tắt) → khó chẩn đoán.
- **Coi MPLS là mã hoá.** Nó **cách ly** chứ không mã hoá; dữ liệu vẫn ở dạng rõ trong mạng nhà cung cấp → cần [[VPN & IPsec]] nếu có yêu cầu bảo mật.
- **Phụ thuộc một nhà mạng duy nhất** cho toàn bộ WAN.

## 5. Checklist áp dụng
- [ ] Lưu lượng nào thực sự cần SLA cứng? Phần còn lại có thể đi Internet không?
- [ ] MTU end-to-end còn bao nhiêu sau khi cộng label stack?
- [ ] Có cần mã hoá trên MPLS không? (gần như luôn là có, nếu dữ liệu nhạy cảm)
- [ ] Có đường dự phòng qua nhà cung cấp khác không?

## Tham khảo
- Peterson & Davie — 4.4 MPLS: https://book.systemsapproach.org/scaling/mpls.html
- RFC 3031 — *Multiprotocol Label Switching Architecture*: https://www.rfc-editor.org/rfc/rfc3031
- RFC 4364 — *BGP/MPLS IP VPNs*: https://www.rfc-editor.org/rfc/rfc4364
- RFC 8402 — *Segment Routing Architecture*: https://www.rfc-editor.org/rfc/rfc8402

## Liên kết
[[Switching Paradigms]] · [[Intradomain Routing]] · [[VPN & IPsec]] · [[Quality of Service]] · [[Networking]]
