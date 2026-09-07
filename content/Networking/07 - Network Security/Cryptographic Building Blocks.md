---
tags: [networking, security, crypto]
status: growing
---
# Cryptographic Building Blocks

> Bốn viên gạch: **mã hoá đối xứng, mã hoá bất đối xứng, hàm băm, và MAC/chữ ký**. Mọi giao thức bảo mật đều là cách ghép bốn thứ này lại — biết ghép sai ở đâu quan trọng hơn biết thuật toán chạy thế nào.

## 1. Bốn viên gạch

| Loại | Làm gì | Thuật toán nên dùng | Tránh |
|---|---|---|---|
| **Đối xứng** | Mã hoá nhanh, một khoá chung | **AES-GCM**, ChaCha20-Poly1305 | DES, 3DES, RC4, AES-ECB |
| **Bất đối xứng** | Trao khoá, chữ ký; chậm hơn ~1000× | **X25519** (trao khoá), **Ed25519**, RSA-2048+ | RSA-1024, khoá tự sinh yếu |
| **Hàm băm** | Tóm tắt một chiều | **SHA-256**, SHA-3, BLAKE3 | MD5, SHA-1 (đã bị phá va chạm) |
| **MAC / chữ ký** | Toàn vẹn + xác thực nguồn | **HMAC-SHA256**, Ed25519 | MAC tự chế từ hash |

**AEAD** (AES-GCM, ChaCha20-Poly1305) làm cả mã hoá lẫn xác thực trong một bước — **luôn dùng AEAD**, đừng tự ghép "encrypt-then-MAC".

**Băm mật khẩu là chuyện khác**: phải chậm và tốn bộ nhớ → **Argon2id**, scrypt, bcrypt. Không bao giờ dùng SHA-256 trần cho mật khẩu.

## 2. Nguyên tắc
1. **Kích thước khoá thực dụng**: đối xứng ≥128 bit; RSA ≥2048 bit; đường cong elliptic 256 bit ≈ RSA 3072 bit về độ mạnh.
2. **Nonce/IV không bao giờ được lặp với cùng một khoá.** Với AES-GCM, lặp nonce làm lộ khoá xác thực — hỏng hoàn toàn. Dùng bộ đếm hoặc random 96 bit.
3. **Perfect Forward Secrecy (PFS)**: dùng khoá phiên tạm thời (ECDHE) → lộ khoá riêng dài hạn cũng không giải mã được lưu lượng đã ghi trong quá khứ. **Bắt buộc** trong TLS 1.3.
4. **So sánh bí mật phải constant-time** (`hmac.compare_digest`) — so sánh thường rò rỉ qua thời gian.
5. **Nguồn ngẫu nhiên phải là CSPRNG** của hệ điều hành (`/dev/urandom`, `crypto.randomBytes`), không phải `rand()`.
6. **Hậu lượng tử**: NIST đã chuẩn hoá ML-KEM (Kyber) và ML-DSA (Dilithium) năm 2024; TLS đang triển khai hybrid X25519+ML-KEM. Dữ liệu cần bí mật >10 năm nên tính đến "harvest now, decrypt later".

## 3. Cạm bẫy hay gặp
- **Tự thiết kế giao thức crypto** — gần như luôn sai ở chỗ không ngờ.
- **AES-ECB**: khối giống nhau cho ciphertext giống nhau → lộ cấu trúc (hình ảnh "ECB penguin" nổi tiếng).
- **Mã hoá mà không xác thực** → tấn công padding oracle, bit-flipping. Dùng AEAD.
- **Khoá cứng trong code / trong repo** — dùng KMS/secret manager, và có quy trình xoay khoá.
- **Dùng cùng một khoá cho nhiều mục đích** — tách khoá theo mục đích bằng HKDF.
- **Tin vào "mã hoá tự chế nên khó bẻ hơn"** — bảo mật qua che giấu không phải bảo mật.

## 4. Checklist áp dụng
- [ ] Có dùng AEAD không, hay đang tự ghép encrypt + MAC?
- [ ] Nonce sinh thế nào? Có khả năng lặp không?
- [ ] Khoá lưu ở đâu? Có quy trình xoay khoá không?
- [ ] Mật khẩu băm bằng Argon2id/bcrypt chứ không phải SHA?
- [ ] So sánh token/HMAC có constant-time không?
- [ ] Thư viện crypto có được cập nhật và là thư viện chuẩn không?

## Tham khảo
- Peterson & Davie — 8.2 Cryptographic Building Blocks: https://book.systemsapproach.org/security/crypto.html
- Cryptographic Right Answers (Latacora): https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/
- NIST — Post-Quantum Cryptography standards: https://csrc.nist.gov/projects/post-quantum-cryptography
- OWASP — Cryptographic Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html

## Liên kết
[[Key Distribution & PKI]] · [[TLS]] · [[Authentication Protocols]] · [[Networking]]
