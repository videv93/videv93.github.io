---
tags: [networking, application, cdn]
status: growing
---
# CDN

> Không thể làm ánh sáng nhanh hơn, nên **mang dữ liệu tới gần người dùng**. CDN vừa là tối ưu độ trễ, vừa là lớp phòng thủ DDoS, vừa là nơi chạy logic ở biên.

## 1. Cách CDN đưa người dùng tới PoP gần nhất

| Cơ chế | Cách làm | Ưu / Nhược |
|---|---|---|
| **DNS-based** | Trả IP khác nhau tuỳ vị trí resolver | Phổ biến; sai khi resolver ở xa client (giảm nhẹ bằng EDNS Client Subnet) |
| **Anycast** | Cùng một IP quảng bá từ mọi PoP, BGP chọn đường | Đơn giản, chịu DDoS tốt; đường đi do BGP quyết, không tối ưu tuyệt đối → [[BGP & Interdomain Routing]] |
| **Redirect ở tầng ứng dụng** | `302` tới hostname vùng | Chính xác, tốn thêm 1 RTT |

## 2. Cache ở biên — khái niệm cần phân biệt
1. **Cache key**: mặc định là URL; thêm `Vary` hoặc cấu hình để tách theo device/ngôn ngữ. Cache key quá chi tiết = hit rate thấp.
2. **TTL biên (`s-maxage`) tách khỏi TTL trình duyệt (`max-age`)** — thường đặt biên dài, trình duyệt ngắn, để **purge được**.
3. **Purge/invalidation**: theo URL, theo **surrogate key/tag** (mạnh nhất), hoặc purge all (đắt, gây bão origin).
4. **Origin shield**: một lớp cache trung gian để mọi PoP không cùng đâm vào origin khi cache miss.
5. **`stale-while-revalidate` + `stale-if-error`**: giữ trang sống khi origin chậm hoặc chết — cải thiện p99 và khả năng chịu lỗi rõ rệt.

## 3. Ngoài cache tĩnh
- **Dynamic acceleration**: giữ kết nối TCP/TLS ấm từ PoP tới origin → tiết kiệm bắt tay, dù nội dung không cache được.
- **Edge compute** (Workers, Lambda@Edge): A/B test, viết lại request, xác thực token ngay tại biên.
- **Bảo vệ**: hấp thụ DDoS, WAF, bot management → [[Threat Model & Attacks]].
- **TLS termination ở biên** → bắt tay nhanh hơn nhiều nhờ RTT ngắn → [[TLS]].

## 4. Cạm bẫy hay gặp
- **Cache nội dung riêng tư** vì quên `Cache-Control: private` → rò rỉ dữ liệu người dùng cho người khác. Sự cố kinh điển và nghiêm trọng.
- **Cache poisoning qua header không được đưa vào cache key** (`X-Forwarded-Host`) → tấn công thật, không phải lý thuyết.
- **Hit rate thấp vì cache key có query string ngẫu nhiên** (tracking param) → cần chuẩn hoá/loại bỏ.
- **Purge all khi deploy** → toàn bộ PoP cùng miss → origin sập (thundering herd). Dùng versioned URL thay vì purge.
- **Quên rằng CDN thấy toàn bộ nội dung** — cân nhắc về dữ liệu nhạy cảm và tuân thủ.
- **Health check không đi qua CDN** → không phát hiện được sự cố mà người dùng thật gặp.

## 5. Checklist áp dụng
- [ ] Response có phân loại rõ public/private chưa? Có test rò rỉ cache không?
- [ ] Cache key gồm những gì? Query param rác đã bị loại chưa?
- [ ] Asset có hash trong tên để dùng `immutable` không?
- [ ] `stale-if-error` đã bật để sống sót khi origin chết chưa?
- [ ] Có origin shield không? Deploy có gây bão cache miss không?
- [ ] Đo hit rate và p95 latency theo từng vùng chưa?

## Tham khảo
- Peterson & Davie — *Perspective: The Cloud is Eating the Internet*: https://book.systemsapproach.org/scaling/trend.html
- RFC 9111 — *HTTP Caching*: https://www.rfc-editor.org/rfc/rfc9111
- Fastly — *Cache control best practices*: https://www.fastly.com/documentation/guides/concepts/edge-state/cache/
- Kettle — *Practical Web Cache Poisoning*: https://portswigger.net/research/practical-web-cache-poisoning

## Liên kết
[[HTTP]] · [[DNS]] · [[Load Balancing & Proxy]] · [[Bandwidth & Latency]] · [[Networking]]
