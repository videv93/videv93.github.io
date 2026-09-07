---
tags: [os, security, crypto]
status: evergreen
---
# Cryptography in OS

> Bảo vệ dựa vào phần cứng chỉ có tác dụng **trong ranh giới máy**. Khi dữ liệu rời máy (qua mạng, qua ổ đĩa bị lấy cắp), thứ duy nhất còn bảo vệ nó là **mật mã**.

## 1. Bốn công cụ và việc chúng làm
| Công cụ | Cung cấp | Ví dụ hiện đại |
|---|---|---|
| **Symmetric encryption** | bí mật, nhanh | AES-GCM, ChaCha20-Poly1305 |
| **Asymmetric (public key)** | trao khoá, chữ ký | X25519 (trao đổi), Ed25519 (ký), RSA (cũ) |
| **Hash** | toàn vẹn, dấu vân tay | SHA-256, SHA-3, BLAKE3 |
| **MAC / AEAD** | toàn vẹn **+ xác thực nguồn** | HMAC-SHA256, AES-GCM, Poly1305 |

> **Mã hoá không đảm bảo toàn vẹn.** Chỉ mã hoá mà không xác thực → kẻ tấn công sửa được ciphertext (bit-flipping). **Luôn dùng AEAD** (mã hoá kèm xác thực) chứ đừng ghép tay.

Bất đối xứng chậm hơn đối xứng hàng nghìn lần → thực tế luôn **lai**: dùng public key để thoả thuận một khoá phiên đối xứng, rồi mã hoá dữ liệu bằng khoá đó (đúng như TLS làm).

## 2. Mật mã trong OS
| Vị trí | Cơ chế |
|---|---|
| **Mã hoá đĩa** | LUKS/dm-crypt (Linux), FileVault (macOS), BitLocker (Windows) — bảo vệ dữ liệu **khi máy tắt** |
| **Nguồn ngẫu nhiên** | `getrandom(2)`, `/dev/urandom` — CSPRNG của kernel, gieo từ entropy phần cứng |
| **Keyring** | `keyctl`, GNOME Keyring, macOS Keychain — giữ khoá ngoài code |
| **TPM / Secure Enclave** | khoá không rời phần cứng; sealed storage gắn với trạng thái boot |
| **Secure boot / measured boot** | mỗi tầng khởi động **ký/đo** tầng sau → chuỗi tin cậy |
| **Ký gói và module** | verify chữ ký trước khi cài/nạp |

## 3. Quản lý khoá — phần khó thật sự
Thuật toán hầu như không bao giờ là điểm yếu. **Khoá** mới là.
| Vấn đề | Thực hành tốt |
|---|---|
| Khoá ở đâu | KMS/HSM/TPM, không phải trong repo hay biến môi trường in ra log |
| Xoay khoá | có kế hoạch rotation và có versioning để giải mã dữ liệu cũ |
| Thu hồi | biết trước sẽ làm gì khi khoá bị lộ |
| Phân tách | khoá khác nhau cho mục đích khác nhau; không tái dùng |
| Nonce/IV | **không bao giờ lặp lại với cùng khoá** — lặp nonce trong AES-GCM là mất hoàn toàn bảo mật |

## 4. Mật mã trong hệ phân tán
- **TLS**: xác thực server (và tuỳ chọn client) + kênh mã hoá; dựa vào PKI và danh sách CA.
- **Kerberos**: ticket, khoá đối xứng, có bên thứ ba tin cậy (KDC) — nền của AD và [[Andrew File System]].
- **Signed request** (AWS SigV4, HTTP Message Signatures): xác thực từng request, chống replay bằng timestamp + nonce.
- **mTLS + service mesh**: xác thực hai chiều giữa các dịch vụ nội bộ — mô hình zero-trust.
→ Xem [[Distributed Systems]] về vì sao không thể tin mạng.

## 5. Cạm bẫy
- **Tự cài đặt thuật toán mật mã.** Dùng libsodium, Tink, hoặc thư viện chuẩn của nền tảng.
- **ECB mode** — lộ pattern (con chim cánh cụt nổi tiếng). Dùng AEAD.
- **Nonce lặp lại** hoặc nonce sinh từ counter không đồng bộ giữa các instance.
- **So sánh MAC bằng `==`** → timing attack. Dùng hàm constant-time.
- **Dùng `rand()`/`Math.random()` cho việc bảo mật** — phải dùng CSPRNG.
- **Mã hoá dữ liệu nhưng để khoá cạnh đó** — như khoá cửa rồi treo chìa lên nắm đấm.
- **Nghĩ mã hoá đĩa bảo vệ máy đang chạy** — nó chỉ bảo vệ khi tắt/khoá; RAM vẫn có khoá (cold boot attack).
- **Bỏ qua metadata** — mã hoá nội dung nhưng lộ kích thước, thời điểm, người nhận vẫn rò rỉ rất nhiều.

## 6. Checklist áp dụng
- [ ] Dùng AEAD chưa (không phải mã hoá "trần")?
- [ ] Khoá lưu ở đâu? Ai đọc được? Có trong git history không?
- [ ] Nonce/IV có được đảm bảo duy nhất không?
- [ ] Nguồn ngẫu nhiên có phải CSPRNG không?
- [ ] Có kế hoạch rotation và revocation chưa?
- [ ] TLS: có verify certificate không (đừng bao giờ tắt để "cho chạy")?
- [ ] Có so sánh secret bằng hàm constant-time không?

## Tham khảo
- OSTEP — *Cryptography* & *Distributed System Security*: https://pages.cs.wisc.edu/~remzi/OSTEP/security-crypto.pdf
- Cryptographic Right Answers (Latacora): https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/
- libsodium docs: https://doc.libsodium.org/
- `getrandom(2)` và LWN — *Random numbers in Linux*: https://man7.org/linux/man-pages/man2/getrandom.2.html
- dm-crypt/LUKS: https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home

## Liên kết
[[OS Security Fundamentals]] · [[Authentication]] · [[Distributed Systems]] · [[Data Integrity and Protection]] · [[OS]]
