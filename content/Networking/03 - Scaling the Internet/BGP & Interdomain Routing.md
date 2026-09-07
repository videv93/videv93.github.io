---
tags: [networking, scaling, routing, bgp]
status: growing
---
# BGP & Interdomain Routing

> Giao thức giữ Internet dính vào nhau. Điểm mấu chốt: **BGP không tìm đường ngắn nhất, nó thực thi chính sách kinh doanh** — và nó tin bất kỳ ai nói gì, đó là lý do Internet thỉnh thoảng "biến mất".

## 1. Khái niệm cốt lõi

| Khái niệm | Nghĩa |
|---|---|
| **AS** (Autonomous System) | Một miền quản trị, có số ASN riêng (32-bit) |
| **eBGP / iBGP** | Giữa hai AS / trong cùng một AS (cần full-mesh hoặc route reflector) |
| **AS_PATH** | Danh sách AS đã đi qua — vừa là metric vừa là cơ chế chống vòng lặp |
| **Peering** | Trao đổi traffic miễn phí giữa hai mạng ngang hàng |
| **Transit** | Trả tiền để được đi tới toàn bộ Internet |
| **Prefix hijack** | Quảng bá prefix không thuộc về mình |

**Thứ tự chọn đường (rút gọn)**: Weight → **Local Preference** → tự sinh → **AS_PATH ngắn nhất** → Origin → **MED** → eBGP hơn iBGP → IGP cost → tie-break.

Ba cái in đậm là công cụ chính sách: **Local Pref điều khiển traffic đi ra**, **AS_PATH prepending / MED điều khiển traffic đi vào** (và điều khiển chiều vào luôn khó hơn).

## 2. Nguyên tắc
1. **Chính sách > độ dài đường.** Route qua khách hàng luôn được ưu tiên hơn route qua peer, hơn route qua transit — vì tiền.
2. **BGP là path vector**: thấy ASN của mình trong AS_PATH thì loại → chống vòng lặp mà không cần biết topology.
3. **BGP hội tụ chậm** (hàng chục giây tới vài phút) và có *path exploration*. Đừng thiết kế hệ thống dựa vào failover BGP dưới 1 giây (trừ khi có BFD).
4. **Anycast + BGP** là cách CDN và DNS gốc mở rộng: cùng một IP quảng bá từ nhiều nơi, BGP tự chọn nơi gần nhất → [[CDN]], [[DNS]].
5. **Bảo mật BGP là chuyện mới**: **RPKI/ROA** xác thực ai được quảng bá prefix nào; MANRS là bộ thực hành tối thiểu.

## 3. Cạm bẫy hay gặp
- **Rò rỉ route (route leak)**: quảng bá route học từ transit A sang transit B → biến mình thành đường trung chuyển và sập. Luôn lọc chặt cả chiều vào lẫn chiều ra.
- **Không lọc prefix của khách hàng** → tiếp tay cho hijack (sự cố Pakistan/YouTube 2008, Rostelecom 2020).
- **Quảng bá prefix dài hơn /24** — phần lớn Internet lọc bỏ, coi như không quảng bá.
- **Đứt cáp mà không có chuẩn bị**: chỉ có một transit = một điểm chết. Multi-homing cần ASN và prefix riêng.
- **Flapping làm dampening kích hoạt** → prefix bị "phạt" và biến mất khỏi Internet hàng chục phút.

## 4. Checklist áp dụng
- [ ] Có lọc prefix (prefix-list/AS-path filter) ở cả ingress và egress không?
- [ ] Đã ký **ROA** trong RPKI cho prefix của mình chưa? Có validate ROA của người khác không?
- [ ] `max-prefix` đã đặt để tự ngắt khi peer rò rỉ toàn bảng chưa?
- [ ] Có giám sát hijack không? (BGPStream, RIPE RIS, Cloudflare Radar)
- [ ] Kịch bản mất một transit đã được diễn tập chưa?

## Công cụ
| Tên | Dùng để | Link |
|---|---|---|
| RIPEstat / RIS | xem prefix của mình từ góc nhìn Internet | https://stat.ripe.net/ |
| bgp.he.net | tra ASN, peering, prefix | https://bgp.he.net/ |
| BGPStream | cảnh báo hijack/outage | https://bgpstream.crosswork.cisco.com/ |
| RIPE Atlas | đo từ hàng nghìn điểm trên thế giới | https://atlas.ripe.net/ |

## Tham khảo
- Peterson & Davie — 4.1 Global Internet: https://book.systemsapproach.org/scaling/global.html
- RFC 4271 — *BGP-4*: https://www.rfc-editor.org/rfc/rfc4271
- RFC 6811 — *BGP Prefix Origin Validation (RPKI)*: https://www.rfc-editor.org/rfc/rfc6811
- MANRS — *Mutually Agreed Norms for Routing Security*: https://www.manrs.org/

## Liên kết
[[Routing Basics]] · [[Intradomain Routing]] · [[CDN]] · [[Networking]]
