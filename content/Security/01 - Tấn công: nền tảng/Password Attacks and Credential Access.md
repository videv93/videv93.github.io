---
tags: [security, tấn-công]
status: evergreen
---
# Password Attacks and Credential Access

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Credential bị đánh cắp là vector xâm nhập số một trong dữ liệu thật, năm này qua năm khác. Không phải 0-day — mà là mật khẩu. Note này giải thích vì sao, và vì sao MFA đổi toàn bộ phép tính.

## 1. Bốn dạng tấn công mật khẩu

| Dạng | Cơ chế | Bị phát hiện | Chống bằng |
|---|---|---|---|
| **Brute force** | Thử mọi tổ hợp | Rất dễ (nhiều lần thất bại) | Rate limit, lockout |
| **Dictionary** | Thử danh sách từ phổ biến | Dễ | Chính sách mật khẩu, deny-list |
| **Password spraying** | **Một** mật khẩu phổ biến, thử **nhiều** tài khoản | Khó hơn (tránh lockout) | MFA, phát hiện bất thường |
| **Credential stuffing** | Cặp user/pass rò rỉ từ nơi khác | Khó | MFA, phát hiện tái dùng |

> [!note] Vì sao spraying và stuffing nguy hiểm hơn brute force
> Brute force một tài khoản kích hoạt lockout ngay. Spraying thử `Mùa2024!` lên 5.000 tài khoản — mỗi tài khoản chỉ một lần, dưới ngưỡng lockout. Stuffing tận dụng sự thật rằng con người **tái dùng mật khẩu**: một dump từ dịch vụ X mở được tài khoản ở dịch vụ Y. Cả hai đều thắng bằng quy mô, không bằng sức mạnh tính toán.

## 2. Online vs offline cracking

| | **Online** | **Offline** |
|---|---|---|
| Tấn công vào | Dịch vụ đang chạy | Hash đã lấy được |
| Giới hạn tốc độ | Có (mạng, lockout, rate limit) | Chỉ giới hạn bởi phần cứng |
| Bị phát hiện | Có | Không (diễn ra trên máy kẻ tấn công) |
| Tốc độ | Chậm (vài lần/giây) | Cực nhanh (tỉ lần/giây với GPU nếu hash yếu) |

Đây là lý do việc **lấy được hash** (qua [[Privilege Escalation]], DCSync, dump database) nguy hiểm hơn nhiều so với việc thử mật khẩu qua giao diện đăng nhập.

## 3. Hash và vì sao thuật toán quyết định tất cả

| Loại hash | Tốc độ bẻ | Ghi chú |
|---|---|---|
| **MD5, SHA-1, SHA-256 (không salt)** | Tỉ/giây trên GPU | **Không bao giờ dùng cho mật khẩu** |
| **NTLM** | Rất nhanh | Windows; Pass-the-Hash được — [[Active Directory Attacks]] |
| **bcrypt** | Chậm có chủ đích | Tốt; cost factor điều chỉnh được |
| **scrypt / Argon2** | Chậm + tốn bộ nhớ | Tốt nhất hiện nay; kháng GPU/ASIC |
| **PBKDF2** | Chậm (nhiều vòng) | Chấp nhận được, chuẩn FIPS |

Ba yếu tố làm hash mật khẩu an toàn: **salt** (chống rainbow table và chống bẻ hàng loạt), **chậm** (làm offline cracking tốn kém), và **tốn bộ nhớ** (vô hiệu hoá lợi thế GPU/ASIC). Đây là kiến thức phòng thủ quan trọng ngang kiến thức tấn công.

## 4. Nơi credential nằm chờ

- **File cấu hình & biến môi trường** — `.env`, `web.config`, connection string.
- **Lịch sử shell** — `.bash_history`, `.zsh_history`, PowerShell history.
- **Bộ nhớ** — LSASS trên Windows, memory dump.
- **Trình quản lý credential** — Windows Credential Manager, keyring, DPAPI.
- **Lịch sử Git** — secret bị commit rồi "xoá" vẫn còn — [[Reconnaissance and Enumeration]].
- **Dump công khai** — HaveIBeenPwned, combolist rò rỉ.
- **Ghi chú, wiki, ticket** — con người dán mật khẩu vào Confluence/Jira.

## 5. Nguyên tắc

1. **Tìm credential có sẵn trước khi bẻ.** Bẻ hash tốn thời gian; mật khẩu trong file cấu hình thì miễn phí.
2. **Password spraying phải chậm và ít.** Tôn trọng ngưỡng lockout để không khoá tài khoản người dùng thật — gây gián đoạn cho khách hàng là gây hại.
3. **Wordlist theo ngữ cảnh thắng danh sách khổng lồ.** Tên công ty, năm, mùa, tên sản phẩm hiệu quả hơn `rockyou.txt` cho mật khẩu doanh nghiệp.
4. **Hiểu loại hash trước khi bẻ.** Chạy hashcat sai mode là lãng phí hàng giờ. `hashid`/`hash-identifier` trước.
5. **MFA là biện pháp có tỉ lệ hiệu quả/chi phí cao nhất.** Nó vô hiệu hoá spraying và stuffing gần như hoàn toàn — điểm quan trọng nhất cho báo cáo phòng thủ.
6. **Báo cáo credential yếu như một mẫu hình, không như danh sách.** "60% mật khẩu bẻ được trong 1 giờ, tất cả theo mẫu Mùa+Năm" mạnh hơn một danh sách 200 mật khẩu.

## 6. Cạm bẫy

- **Brute force online làm khoá tài khoản thật.** Gây sự cố cho người dùng — cạm bẫy đạo đức và kỹ thuật.
- **Bẻ sai mode hash.** Kiểm loại hash trước.
- **Lưu credential thu được không an toàn.** Chính bạn trở thành điểm rò rỉ; mã hoá và xoá theo RoE — [[Authorization and Rules of Engagement]].
- **Bỏ qua MFA fatigue.** Spam push notification tới khi người dùng bấm "chấp nhận" là kỹ thuật thật — cần [[Social Engineering]] và cần cho phép rõ.
- **Tin rằng phức tạp = mạnh.** `P@ssw0rd!` thoả mọi chính sách phức tạp và nằm trong mọi wordlist. Độ dài và tính ngẫu nhiên thắng "độ phức tạp" — NIST đã chuyển sang khuyến nghị passphrase dài.
- **Quên phía phòng thủ trong báo cáo.** Kết quả bẻ mật khẩu vô dụng nếu không kèm khuyến nghị: MFA, passphrase, deny-list, hash chậm.

## 7. Checklist áp dụng

- [ ] Tôi đã tìm credential có sẵn (file, history, memory) trước khi bẻ chưa?
- [ ] Password spraying của tôi có dưới ngưỡng lockout không?
- [ ] Tôi đã xác định đúng loại hash trước khi chạy hashcat chưa?
- [ ] Wordlist của tôi có theo ngữ cảnh mục tiêu không?
- [ ] Credential thu được có được lưu an toàn và có kế hoạch xoá không?
- [ ] Báo cáo có nêu **mẫu hình** mật khẩu yếu, không chỉ danh sách không?
- [ ] Tôi có khuyến nghị MFA và hash chậm trong phần khắc phục không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **hashcat** | Bẻ hash bằng GPU, chuẩn mực |
| **John the Ripper** | Bẻ hash linh hoạt, nhiều định dạng |
| **hydra / medusa** | Tấn công online nhiều giao thức |
| **NetExec** | Password spraying trên AD/SMB |
| **hashid / hash-identifier** | Nhận diện loại hash |
| **CeWL / cupp** | Sinh wordlist theo ngữ cảnh |
| **HaveIBeenPwned API** | Kiểm mật khẩu/email đã rò rỉ (dùng được cả cho phòng thủ) |

## Tham khảo

- [NIST SP 800-63B — Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) — nguồn của khuyến nghị passphrase, bỏ đổi mật khẩu định kỳ
- [OWASP — Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [hashcat wiki](https://hashcat.net/wiki/)
- [Troy Hunt — HaveIBeenPwned](https://haveibeenpwned.com/)
- [MITRE ATT&CK — Credential Access (TA0006)](https://attack.mitre.org/tactics/TA0006/)

## Liên kết

[[Privilege Escalation]] · [[Active Directory Attacks]] · [[Post-Exploitation and Lateral Movement]] · [[Authentication and Authorization]] · [[Social Engineering]] · [[Security]]
