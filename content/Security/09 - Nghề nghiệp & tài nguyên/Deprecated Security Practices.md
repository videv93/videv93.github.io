---
tags: [security, nghề-nghiệp, reference]
status: growing
---
# Deprecated Security Practices

> Bảo mật có một nghĩa địa chiến thuật: những thực hành **đã chết** nhưng **vẫn được khuyên rộng rãi** trong tài liệu cũ, khoá học chưa cập nhật, và trí nhớ của người đi trước. Note này gom chúng thành một bảng tra cứu — biến "hãy cẩn thận với nội dung cũ" thành một danh sách cụ thể.

> [!note] Vì sao note này tồn tại
> Lĩnh vực có chu kỳ bán rã ngắn (bài học từ playbook). Một cảnh báo rải rác trong từng note không hiệu quả bằng một bảng tập trung: khi bạn đọc một tài liệu cũ khuyên làm X, bạn tra ở đây X còn sống không. Đọc `status` của mọi note trong vault trước khi trích dẫn cũng vì lý do này.

## 1. Bảng: đã chết — chết khi nào — vẫn được khuyên ở đâu

| Thực hành | Chết khi nào | Thay bằng | Vẫn được khuyên ở đâu |
|---|---|---|---|
| **Đổi mật khẩu định kỳ (mỗi 90 ngày)** | NIST bỏ 2017 (SP 800-63B) | Passphrase dài + kiểm rò rỉ + MFA | Chính sách IT cũ, audit lỗi thời — [[Password Attacks and Credential Access]] |
| **Quy tắc phức tạp mật khẩu** (bắt ký tự đặc biệt) | ~2017 | Độ dài + deny-list mật khẩu phổ biến | Form đăng ký khắp nơi |
| **Buffer overflow trong OSCP** | OffSec bỏ 2022 | AD, web | Tài liệu luyện OSCP cũ — [[OSCP Preparation Path]] |
| **SHA-1 cho chữ ký/chứng chỉ** | Deprecated ~2011, collision 2017 | SHA-256+ | Hệ thống legacy |
| **MD5 cho bảo mật** | Vỡ từ lâu | SHA-256; bcrypt/Argon2 cho mật khẩu | Code cũ, tutorial cũ |
| **TLS 1.0 / 1.1** | Deprecated 2020 (RFC 8996) | TLS 1.2+ (ưu tiên 1.3) | Cấu hình server cũ — [[TLS]] (Networking) |
| **SSL (mọi phiên bản)** | Chết lâu | TLS | Vẫn gọi nhầm "SSL" |
| **WEP / WPA (bản đầu)** | WEP chết ~2004 | WPA3, tối thiểu WPA2 | Router cũ |
| **Antivirus dựa chữ ký một mình** | Không đủ từ lâu | EDR, phát hiện hành vi — [[Detection Engineering]] | Kỳ vọng "cài AV là xong" |
| **Perimeter security một mình** | Tan trong cloud | Zero Trust — [[Zero Trust Architecture]] | Tư duy "tường thành và hào" |
| **Security by obscurity thay biện pháp thật** | Luôn sai | Biện pháp thật (+ obscurity là lớp thêm) | "Ẩn đi là an toàn" |
| **Tự viết mật mã** | Luôn sai | Thư viện đã kiểm chứng — [[Cryptographic Building Blocks]] | Dev tự tin |
| **IMDSv1 (AWS metadata)** | IMDSv2 ra 2019 | IMDSv2 (token) | Cấu hình EC2 cũ — [[Cloud Security Posture]] |
| **Điểm CVSS một mình để ưu tiên vá** | Lộ rõ ~2020 | KEV + EPSS + ngữ cảnh — [[Vulnerability Management]] | Nhiều quy trình VM |

## 2. Các mẫu nhận diện "lời khuyên đã chết"

| Dấu hiệu | Vì sao đáng nghi |
|---|---|
| Tài liệu không có ngày | Không kiểm được còn đúng không |
| Khuyên đổi mật khẩu định kỳ | Chỉ báo mạnh của nội dung trước 2017 |
| Nhắc buffer overflow như trọng tâm OSCP | Trước 2022 |
| Nói "SSL" thay vì "TLS" | Từ vựng cũ |
| Antivirus là biện pháp endpoint chính | Trước kỷ nguyên EDR |
| Không nhắc MFA | Rất cũ hoặc thiếu sót nghiêm trọng |

## 3. Nguyên tắc

1. **Kiểm ngày trước khi tin nội dung.** Với lĩnh vực chu kỳ bán rã ngắn, tuổi tài liệu là tín hiệu đầu tiên.
2. **Đọc `status` trong vault này.** `seed`/`growing` = kiểm lại; `evergreen` = nguyên lý bền.
3. **Phân biệt nguyên lý bền và chiến thuật hết hạn.** "Least privilege" bền; "đổi mật khẩu 90 ngày" là chiến thuật đã chết. Nguyên lý sống lâu; cài đặt cụ thể hết hạn.
4. **Cảnh giác với người đi trước dạy theo trí nhớ.** Kiến thức đúng lúc họ học có thể đã chết.
5. **Cập nhật note này khi phát hiện thực hành chết mới.** Đây là bảng sống.

## 4. Checklist áp dụng

- [ ] Tài liệu tôi đang đọc có ngày không? Nó bao nhiêu tuổi?
- [ ] Nó có khuyên thực hành nào trong bảng trên không?
- [ ] Tôi có đang phân biệt nguyên lý bền với chiến thuật hết hạn không?
- [ ] Nếu học từ người đi trước, kiến thức đó còn cập nhật không?
- [ ] Trong vault: tôi đã đọc `status` của note trước khi trích dẫn chưa?

## Tham khảo

- [NIST SP 800-63B — Digital Identity (bỏ đổi mật khẩu định kỳ)](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [RFC 8996 — Deprecating TLS 1.0 and 1.1](https://www.rfc-editor.org/rfc/rfc8996)
- [OffSec — Changes to the OSCP](https://help.offsec.com/hc/en-us/articles/29840452210580-Changes-to-the-OSCP)
- [CISA KEV & FIRST EPSS](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

## Liên kết

[[Password Attacks and Credential Access]] · [[Vulnerability Management]] · [[Zero Trust Architecture]] · [[OSCP Preparation Path]] · [[Security Learning Resources]] · [[Security]]
