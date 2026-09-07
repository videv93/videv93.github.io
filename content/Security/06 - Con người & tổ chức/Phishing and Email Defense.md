---
tags: [security, con-người]
status: growing
---
# Phishing and Email Defense

> Email là vector tấn công phổ biến nhất, và phòng thủ email là bài toán vừa kỹ thuật vừa con người. Note này tập trung vào lớp **kỹ thuật** — cái mà [[Social Engineering]] và [[Security Awareness Programs]] không phủ.

## 1. Ba trụ cột chống giả mạo email

| Chuẩn | Trả lời câu hỏi | Cơ chế |
|---|---|---|
| **SPF** | "Server này được gửi thay domain không?" | Domain liệt kê IP được phép gửi trong DNS |
| **DKIM** | "Email có bị sửa và đúng domain ký không?" | Chữ ký mật mã trên header/body |
| **DMARC** | "Làm gì khi SPF/DKIM thất bại?" | Chính sách (none/quarantine/reject) + báo cáo + alignment |

> [!note] DMARC là mảnh ghép quyết định
> SPF và DKIM một mình không chống được giả mạo hiệu quả — chúng kiểm domain kỹ thuật, không kiểm domain **hiển thị** cho người dùng. DMARC thêm "alignment": domain trong `From:` mà người dùng thấy phải khớp domain đã xác thực. Không có DMARC ở chính sách `reject`, kẻ tấn công vẫn giả mạo được domain của bạn. Kiểm domain của mình có DMARC `p=reject` chưa là một mục [[Cloud Security Posture]]/[[Security Frameworks Landscape]].

## 2. Các loại tấn công email

| Loại | Đặc điểm | Phòng thủ chính |
|---|---|---|
| **Giả mạo domain chính xác** | From đúng domain bạn | DMARC reject |
| **Lookalike domain** | `paypa1.com`, `microsoft-support.com` | Filter, đào tạo, giám sát đăng ký domain |
| **Display name spoofing** | Tên hiển thị giả, địa chỉ thật khác | Filter, đào tạo |
| **Compromised account** | Email thật từ tài khoản bị chiếm | Khó nhất — cần phát hiện hành vi |
| **BEC** | Không link/malware, chỉ văn bản lừa chuyển tiền | Quy trình xác minh ngoài băng |

BEC (Business Email Compromise) đáng chú ý: nó thường **không có payload kỹ thuật** để filter bắt — chỉ là văn bản thuyết phục. Phòng thủ duy nhất hiệu quả là **quy trình**: mọi yêu cầu chuyển tiền/đổi tài khoản ngân hàng phải xác minh qua kênh thứ hai.

## 3. Nguyên tắc

1. **Cấu hình cả ba: SPF + DKIM + DMARC ở `p=reject`.** Nửa vời (DMARC `p=none` mãi mãi) không bảo vệ, chỉ báo cáo.
2. **Lớp kỹ thuật + lớp quy trình + lớp con người.** Không lớp nào đủ một mình.
3. **BEC cần quy trình, không cần filter.** Xác minh ngoài băng cho giao dịch tài chính.
4. **MFA chống phishing để một cú click không đủ.** FIDO2 vô hiệu hoá cả reverse-proxy phishing — [[Password Attacks and Credential Access]].
5. **Giám sát domain lookalike.** Certificate Transparency và dịch vụ theo dõi đăng ký domain — [[OSINT Techniques]].
6. **Làm cho việc báo cáo dễ.** Nút "báo cáo phishing" một click; người dùng là cảm biến, nếu bạn để họ báo.

## 4. Cạm bẫy

- **DMARC kẹt ở `p=none`.** Nhiều tổ chức triển khai rồi không bao giờ chuyển sang reject — chỉ nhận báo cáo, không chặn.
- **Chỉ SPF.** SPF không kiểm domain hiển thị; giả mạo vẫn qua.
- **Tin filter bắt hết.** BEC không có payload; filter mù với nó.
- **MFA push chống được phishing.** Reverse-proxy phishing (Evilginx) đánh cắp cả session sau MFA; cần FIDO2.
- **Không có quy trình cho yêu cầu tiền.** BEC thành công vì không ai xác minh lại.
- **Báo cáo phishing khó/chậm.** Người dùng bỏ qua thay vì báo.
- **Bỏ qua email nội bộ.** Tài khoản bị chiếm gửi phishing "từ đồng nghiệp" — SPF/DKIM đều pass.

## 5. Checklist áp dụng

- [ ] Domain có SPF + DKIM + DMARC ở `p=reject` chưa?
- [ ] Có quy trình xác minh ngoài băng cho yêu cầu chuyển tiền/đổi tài khoản không?
- [ ] MFA có phải loại chống phishing (FIDO2/số khớp) không?
- [ ] Có giám sát domain lookalike không?
- [ ] Nút báo cáo phishing có dễ dùng (một click) không?
- [ ] Có phát hiện hành vi cho tài khoản nội bộ bị chiếm không?
- [ ] Đội tài chính có được đào tạo riêng về BEC không?

## 6. Công cụ

| Tên | Vai trò |
|---|---|
| **DMARC analyzer** (dmarcian, Postmark) | Triển khai và giám sát DMARC |
| **MXToolbox** | Kiểm SPF/DKIM/DMARC nhanh |
| **Secure Email Gateway** | Filter, sandbox link/attachment |
| **FIDO2 / passkey** | MFA chống phishing |
| **PhishER / báo cáo tích hợp** | Xử lý email người dùng báo cáo |

## Tham khảo

- [DMARC.org](https://dmarc.org/) và [RFC 7489](https://www.rfc-editor.org/rfc/rfc7489)
- [SPF — RFC 7208](https://www.rfc-editor.org/rfc/rfc7208), [DKIM — RFC 6376](https://www.rfc-editor.org/rfc/rfc6376)
- [CISA — Enhance Email & Web Security](https://www.cisa.gov/)
- [FBI IC3 — Business Email Compromise](https://www.ic3.gov/Media/Y2022/PSA220504)

## Liên kết

[[Social Engineering]] · [[Security Awareness Programs]] · [[Password Attacks and Credential Access]] · [[Security Culture]] · [[Security]]
