---
tags: [networking, security, pki]
status: growing
---
# Key Distribution & PKI

> Bài toán khó nhất của crypto không phải mã hoá, mà là **"làm sao biết khoá công khai này đúng là của người kia"**. PKI là câu trả lời của thế giới web — và nó dựa trên niềm tin bắc cầu.

## 1. Ba mô hình tin cậy

| Mô hình | Cách hoạt động | Dùng ở đâu |
|---|---|---|
| **PKI phân cấp (X.509)** | Root CA → Intermediate CA → chứng chỉ lá | Web (TLS), S/MIME |
| **Web of Trust** | Người dùng ký khoá cho nhau | PGP/GPG — không mở rộng được |
| **TOFU** (Trust On First Use) | Tin lần đầu, cảnh báo nếu đổi | SSH `known_hosts` |

**Chuỗi xác minh chứng chỉ**: chữ ký hợp lệ tới root tin cậy → chưa hết hạn → tên miền khớp (**SAN**, không phải CN) → chưa bị thu hồi → mục đích sử dụng đúng (`Extended Key Usage`).

## 2. Vòng đời chứng chỉ
1. **CSR** — sinh khoá riêng (không bao giờ rời máy chủ) và tạo yêu cầu ký.
2. **Xác minh quyền sở hữu domain**: HTTP-01 (file trên `/.well-known/`), DNS-01 (TXT record — bắt buộc cho wildcard), TLS-ALPN-01.
3. **Cấp phát** — chứng chỉ công khai được ghi vào **Certificate Transparency log** (công khai, ai cũng giám sát được).
4. **Gia hạn tự động** — ACME/Let's Encrypt, chu kỳ 90 ngày (và đang rút ngắn hơn nữa).
5. **Thu hồi** — CRL (danh sách, cồng kềnh) hoặc **OCSP**; OCSP stapling để client không phải hỏi CA. Thực tế thu hồi hoạt động **kém** → chu kỳ ngắn là biện pháp chính.

## 3. Nguyên tắc
1. **CAA record trong DNS** giới hạn CA nào được cấp chứng chỉ cho domain của mình → chặn cấp phát trái phép → [[DNS]].
2. **Certificate Transparency** giúp phát hiện chứng chỉ lạ; nên đặt cảnh báo (crt.sh, Cert Spotter).
3. **Nội bộ cũng cần PKI**: mTLS giữa các service; dùng CA nội bộ (Vault, cert-manager, SPIFFE) chứ không dùng chứng chỉ tự ký thủ công.
4. **Khoá riêng không bao giờ được truyền đi** — sinh tại nơi dùng; lưu trong HSM/KMS nếu quan trọng.
5. **Pinning** (HPKP) đã bị bỏ ở web vì quá dễ tự khoá mình ra ngoài; ứng dụng di động vẫn dùng nhưng phải có kế hoạch xoay khoá.

## 4. Cạm bẫy hay gặp
- **Hết hạn chứng chỉ** — nguyên nhân downtime kinh điển và hoàn toàn tránh được. Tự động hoá + cảnh báo trước 30 ngày.
- **Thiếu intermediate certificate** trong chuỗi gửi đi → trình duyệt (có cache) thì ổn, còn client khác (curl, Java, mobile) thì lỗi. Luôn kiểm bằng SSL Labs.
- **Dùng CN thay vì SAN** — trình duyệt hiện đại **bỏ qua CN** hoàn toàn.
- **Tắt xác minh chứng chỉ để "cho chạy"** (`verify=False`, `-k`) rồi để nguyên lên production → mất toàn bộ giá trị của TLS.
- **Cùng một chứng chỉ/khoá dùng khắp nơi** → một máy bị chiếm là phải thay tất cả.
- **Đồng hồ sai** → chứng chỉ "chưa có hiệu lực" hoặc "đã hết hạn". NTP là phụ thuộc bảo mật.

## 5. Checklist áp dụng
- [ ] Gia hạn chứng chỉ có tự động không? Có cảnh báo trước hạn không?
- [ ] Chuỗi chứng chỉ gửi đi có đầy đủ intermediate không? (`openssl s_client -showcerts`)
- [ ] CAA record đã đặt chưa? Có giám sát CT log không?
- [ ] Khoá riêng lưu ở đâu, ai truy cập được? Có kế hoạch xoay khoá không?
- [ ] Có chỗ nào tắt xác minh chứng chỉ không? (grep `verify=False`, `InsecureSkipVerify`, `-k`)
- [ ] Service nội bộ có dùng mTLS với CA nội bộ không?

## Công cụ
| Tên | Dùng để | Link |
|---|---|---|
| `openssl s_client -connect host:443 -showcerts` | xem chuỗi chứng chỉ thật | |
| SSL Labs Server Test | chấm điểm cấu hình TLS | https://www.ssllabs.com/ssltest/ |
| crt.sh | tra CT log | https://crt.sh/ |
| cert-manager / Vault PKI | tự động hoá chứng chỉ nội bộ | https://cert-manager.io/ |

## Tham khảo
- Peterson & Davie — 8.3 Key Predistribution: https://book.systemsapproach.org/security/key-distro.html
- RFC 5280 — *X.509 PKI Certificate and CRL Profile*: https://www.rfc-editor.org/rfc/rfc5280
- RFC 8555 — *ACME*: https://www.rfc-editor.org/rfc/rfc8555
- RFC 6962 — *Certificate Transparency*: https://www.rfc-editor.org/rfc/rfc6962

## Liên kết
[[Cryptographic Building Blocks]] · [[TLS]] · [[DNS]] · [[Authentication Protocols]] · [[Networking]]
