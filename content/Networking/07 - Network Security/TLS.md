---
tags: [networking, security, tls]
status: evergreen
---
# TLS

> Lớp bảo mật mặc định của Internet. TLS 1.3 đã **loại bỏ gần hết cấu hình có thể làm sai** — nên phần lớn việc còn lại là: bật đúng phiên bản, quản lý chứng chỉ, và hiểu nó **không** bảo vệ cái gì.

## 1. Bắt tay TLS 1.3 (1-RTT)

```
Client → ClientHello  (danh sách cipher, key_share, SNI, ALPN)
Server → ServerHello  (chọn cipher, key_share)
         {EncryptedExtensions, Certificate, CertificateVerify, Finished}
Client → {Finished} → dữ liệu ứng dụng
```
Từ ServerHello trở đi **đã được mã hoá**. So với TLS 1.2 (2 RTT), TLS 1.3 tiết kiệm một vòng — đáng kể khi RTT 180 ms.

**0-RTT (session resumption)**: gửi dữ liệu ngay ở gói đầu bằng PSK — nhanh nhất, nhưng **có thể bị replay** → chỉ dùng cho request idempotent.

## 2. Những gì TLS 1.3 đã bỏ (và vì sao tốt)
| Bỏ | Lý do |
|---|---|
| RSA key exchange | Không có forward secrecy |
| CBC mode, RC4, 3DES | Padding oracle, cipher yếu |
| Nén TLS | Tấn công CRIME |
| Renegotiation | Nhiều lỗ hổng |
| MD5/SHA-1 trong chữ ký | Đã bị phá |

Còn lại chỉ 5 cipher suite AEAD → **không còn nhiều lựa chọn để cấu hình sai**.

## 3. Khái niệm vận hành cần nắm
1. **SNI** cho phép nhiều site trên một IP; nó **ở dạng rõ** trong TLS 1.2/1.3 → dùng để chặn/theo dõi. **ECH** (Encrypted Client Hello) đang triển khai để che.
2. **ALPN** thoả thuận giao thức tầng trên (`h2`, `http/1.1`, `h3`) ngay trong bắt tay → [[HTTP-2 & HTTP-3]].
3. **Session resumption** (PSK ticket) tránh bắt tay đầy đủ — quan trọng cho hiệu năng di động.
4. **mTLS**: client cũng xuất trình chứng chỉ → xác thực hai chiều, chuẩn cho service-to-service.
5. **HSTS** (`Strict-Transport-Security`) buộc trình duyệt chỉ dùng HTTPS → chống downgrade và SSL stripping. Có preload list.
6. **TLS termination ở LB/CDN** → sau đó là kết nối nội bộ; kết nối nội bộ đó có được mã hoá không là quyết định phải làm rõ → [[Load Balancing & Proxy]].

## 4. TLS **không** bảo vệ cái gì
- Không giấu **bạn đang nói chuyện với ai** (IP, SNI, kích thước và thời điểm gói).
- Không bảo vệ dữ liệu **sau khi** giải mã (ở LB, ở server, trong log).
- Không thay thế xác thực người dùng → [[Authentication Protocols]].
- Không chống được server bị chiếm, hay client cài CA giả (proxy doanh nghiệp).

## 5. Cạm bẫy hay gặp
- **Còn bật TLS 1.0/1.1** → nên tắt; TLS 1.2 giữ lại cho client cũ, TLS 1.3 ưu tiên.
- **Chứng chỉ hết hạn / thiếu chuỗi** → [[Key Distribution & PKI]].
- **`InsecureSkipVerify` / `verify=False`** trong code production.
- **Mixed content** — HTTPS nhưng nhúng tài nguyên HTTP.
- **Không bật OCSP stapling** → mỗi client tự hỏi CA, chậm và rò rỉ thói quen duyệt web.
- **Session ticket key không được xoay** → mất forward secrecy trên thực tế.
- **Nghĩ rằng mã hoá là đủ**: dữ liệu vẫn cần phân quyền, kiểm tra đầu vào, và bảo vệ khi lưu trữ.

## 6. Checklist áp dụng
- [ ] TLS 1.3 đã bật, TLS ≤1.1 đã tắt chưa?
- [ ] SSL Labs chấm bao nhiêu điểm? Có cảnh báo nào không?
- [ ] HSTS đã bật (kèm `includeSubDomains`) chưa?
- [ ] OCSP stapling có bật không?
- [ ] Kết nối nội bộ sau điểm terminate có được mã hoá không?
- [ ] 0-RTT có bị dùng cho request thay đổi trạng thái không?
- [ ] Có chỗ nào bỏ qua xác minh chứng chỉ không?

## Tham khảo
- RFC 8446 — *TLS 1.3*: https://www.rfc-editor.org/rfc/rfc8446
- Mozilla — SSL Configuration Generator: https://ssl-config.mozilla.org/
- Cloudflare — *A Detailed Look at RFC 8446 (TLS 1.3)*: https://blog.cloudflare.com/rfc-8446-aka-tls-1-3/
- Ristić — *Bulletproof TLS and PKI*: https://www.feistyduck.com/books/bulletproof-tls-and-pki/

## Liên kết
[[Cryptographic Building Blocks]] · [[Key Distribution & PKI]] · [[HTTP]] · [[QUIC]] · [[Networking]]
