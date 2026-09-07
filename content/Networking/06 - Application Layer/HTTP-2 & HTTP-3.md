---
tags: [networking, application, http]
status: growing
---
# HTTP-2 & HTTP-3

> Cùng một ngữ nghĩa HTTP, khác nhau ở **cách vận chuyển**. HTTP/2 sửa head-of-line blocking ở tầng HTTP; HTTP/3 sửa nốt nó ở tầng transport bằng cách bỏ TCP.

## 1. So sánh ba thế hệ

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Transport | TCP | TCP | **QUIC trên UDP** |
| Định dạng | Text | **Binary frame** | Binary frame |
| Đa luồng | Không (6 kết nối/host) | **Multiplexing trên 1 kết nối** | Multiplexing thật sự độc lập |
| Head-of-line | Ở tầng HTTP | Đã sửa ở HTTP, **còn ở TCP** | **Đã sửa hoàn toàn** |
| Nén header | Không | **HPACK** | **QPACK** |
| Server push | Không | Có (đã bị bỏ trong thực tế) | Không khuyến khích |
| Bắt tay | TCP + TLS (2–3 RTT) | TCP + TLS | **1-RTT / 0-RTT** |
| Ưu tiên | Không | Cây ưu tiên (phức tạp, ít dùng) | Extensible Priorities (RFC 9218) |

## 2. Nguyên tắc thực dụng
1. **HTTP/2 vẫn nghẽn ở TCP**: mất một gói TCP làm *mọi* stream dừng lại, dù chỉ một stream cần gói đó. Trên mạng mất gói (di động), HTTP/2 có thể **tệ hơn** HTTP/1.1 nhiều kết nối.
2. **HTTP/3 tách stream ở tầng transport** → mất gói chỉ ảnh hưởng stream liên quan → [[QUIC]].
3. **Các tối ưu của HTTP/1.1 trở thành phản tác dụng** với H2/H3: domain sharding, sprite sheet, inline asset, concat file — nên **bỏ đi** vì multiplexing đã rẻ.
4. **Nén header** rất có giá trị với API nhiều request nhỏ (cookie, auth token lặp lại).
5. **Alt-Svc / `alt-svc` header** là cách server quảng bá "tôi có HTTP/3" — client thử và nâng cấp ở lần sau.

## 3. Cạm bẫy hay gặp
- **Bật HTTP/2 rồi giữ nguyên sharding** → nhiều kết nối, mất hết lợi ích nén header và ưu tiên.
- **gRPC trên LB L4**: một kết nối HTTP/2 dài ghim vào một backend → tải lệch. Cần LB L7 hoặc client-side LB → [[RPC & gRPC]].
- **Số stream đồng thời (`SETTINGS_MAX_CONCURRENT_STREAMS`) mặc định thấp** ở một số server → thắt cổ chai âm thầm.
- **Tấn công tiêu hao qua H2**: HPACK bomb, và **Rapid Reset (CVE-2023-44487)** — cần vá và giới hạn tốc độ tạo/huỷ stream.
- **UDP bị chặn** → HTTP/3 không dùng được; luôn giữ fallback HTTP/2 qua TCP.
- **Đo lợi ích trên mạng văn phòng** (mất gói ~0) → không thấy khác biệt; lợi ích của H3 xuất hiện ở mạng kém.

## 4. Checklist áp dụng
- [ ] Đã bỏ các tối ưu kiểu HTTP/1.1 (sharding, concat, sprite) chưa?
- [ ] `alt-svc` có được công bố và UDP/443 có mở không?
- [ ] `max_concurrent_streams` có đủ lớn cho ứng dụng không?
- [ ] Đã vá Rapid Reset và giới hạn stream churn chưa?
- [ ] Có đo p75/p95 ở mạng di động thật, không chỉ ở lab?
- [ ] LB có xử lý đúng kết nối HTTP/2 dài không?

## Tham khảo
- RFC 9113 — *HTTP/2*: https://www.rfc-editor.org/rfc/rfc9113
- RFC 9114 — *HTTP/3*: https://www.rfc-editor.org/rfc/rfc9114
- RFC 9204 — *QPACK*: https://www.rfc-editor.org/rfc/rfc9204
- Cloudflare — *HTTP/2 Rapid Reset*: https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/
- Grigorik — *HPBN* Ch.12 HTTP/2: https://hpbn.co/http2/

## Liên kết
[[HTTP]] · [[QUIC]] · [[TCP]] · [[RPC & gRPC]] · [[Networking]]
