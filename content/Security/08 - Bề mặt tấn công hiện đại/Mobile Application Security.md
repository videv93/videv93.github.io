---
tags: [security, mobile]
status: growing
---
# Mobile Application Security

> Mobile đổi mô hình đe doạ theo một cách phản trực giác: **thiết bị nằm trong tay kẻ tấn công tiềm năng**. Không như server, bạn không kiểm soát môi trường app chạy — người dùng (hoặc kẻ tấn công) có thể root/jailbreak, debug, và đọc mọi thứ app lưu.

## 1. Vì sao mobile khác web

| Web | Mobile |
|---|---|
| Server bạn kiểm soát | Thiết bị bạn không kiểm soát |
| Client là trình duyệt | Client là binary bạn phát hành, có thể bị RE — [[Reverse Engineering Basics]] |
| Logic nhạy cảm ở server | Cám dỗ đặt logic/secret ở client |
| Lưu trữ = cookie/localStorage | Lưu trữ = file, keychain, DB cục bộ |

Hệ quả: **mọi thứ trong app đều có thể bị đọc.** Secret nhúng trong app không phải secret; logic bảo mật ở client không phải bảo mật.

## 2. OWASP Mobile Top 10 / MASVS — các lớp chính

| Vấn đề | Nội dung |
|---|---|
| **Lưu trữ không an toàn** | Credential/token/PII trong SharedPreferences, plist, SQLite không mã hoá |
| **Xác thực/uỷ quyền yếu** | Kiểm ở client thay vì server |
| **Giao tiếp không an toàn** | Không TLS, không certificate pinning |
| **Mã hoá sai** | Khoá hardcode, thuật toán yếu — [[Password Attacks and Credential Access]] |
| **Reverse engineering** | Không obfuscation, logic lộ |
| **Code injection / platform misuse** | Dùng sai API nền tảng (intent, deep link) |
| **Secret nhúng** | API key, khoá trong binary |

## 3. MASVS levels và MASTG

OWASP có hai tài liệu:
- **MASVS** (Verification Standard) — *cái gì* cần đạt, theo hai mức (L1 chung, L2 nhạy cảm) + MASVS-R (chống RE).
- **MASTG** (Testing Guide) — *test thế nào*, chi tiết cho iOS/Android.

## 4. Nguyên tắc

1. **Không đặt secret hay logic bảo mật ở client.** App bị RE được; mọi thứ trong đó là công khai với kẻ tấn công quyết tâm.
2. **Kiểm quyền ở server, luôn luôn.** Client kiểm chỉ là UX; kiểm thật ở backend — cùng nguyên tắc [[Broken Access Control]].
3. **Lưu trữ nhạy cảm dùng cơ chế nền tảng.** Keychain (iOS), Keystore (Android) — không SharedPreferences/plist thô.
4. **TLS + certificate pinning.** Chống man-in-the-middle, kể cả khi thiết bị bị cài CA giả.
5. **Giả định thiết bị bị root/jailbreak.** Root detection làm tăng chi phí, không phải phòng thủ tuyệt đối.
6. **Obfuscation làm chậm RE, không ngăn.** Hữu ích để tăng chi phí; không thay được không-lưu-secret.

## 5. Cạm bẫy

- **Nhúng secret trong app.** API key trong binary bị trích trong vài phút.
- **Logic bảo mật ở client.** Bỏ qua/patch được sau khi RE.
- **Lưu token/PII không mã hoá.** Đọc được trên thiết bị root, hoặc qua backup.
- **Không certificate pinning.** MITM bằng CA giả cài trên thiết bị.
- **Tin root detection là phòng thủ.** Bypass được; chỉ tăng chi phí.
- **Deep link/intent không validate.** Dẫn tới truy cập trái phép, injection.
- **Backend "vì mobile" ít bảo mật hơn.** API mobile vẫn là API — [[API Security Testing]].

## 6. Checklist áp dụng

- [ ] Có secret/API key nào nhúng trong binary không?
- [ ] Mọi kiểm quyền có ở server, không chỉ client không?
- [ ] Dữ liệu nhạy cảm có dùng Keychain/Keystore, được mã hoá không?
- [ ] Có TLS + certificate pinning không?
- [ ] App có giả định thiết bị bị root/jailbreak không?
- [ ] Deep link/intent có được validate không?
- [ ] Backend API có được test như API độc lập không?
- [ ] Tôi có test theo MASVS/MASTG không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **MobSF** | Phân tích tĩnh/động mobile tự động |
| **Frida / Objection** | Instrument runtime, bypass, hook |
| **jadx / apktool** | Decompile Android |
| **Burp + proxy thiết bị** | Chặn lưu lượng mobile |
| **MASTG tools** | Bộ test theo hướng dẫn OWASP |

## Tham khảo

- [OWASP MASVS](https://mas.owasp.org/MASVS/) và [MASTG](https://mas.owasp.org/MASTG/)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [Frida](https://frida.re/)
- [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)

## Liên kết

[[API Security Testing]] · [[Reverse Engineering Basics]] · [[Broken Access Control]] · [[Password Attacks and Credential Access]] · [[Security]]
