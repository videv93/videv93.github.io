---
tags: [security, web]
status: evergreen
---
# Insecure Deserialization

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Serialization biến object thành chuỗi byte để lưu/truyền; deserialization biến ngược lại. Lỗ hổng: khi dữ liệu **không tin cậy** được deserialize, kẻ tấn công có thể điều khiển object được tạo — và thường dẫn thẳng tới RCE.

## 1. Vì sao nó nguy hiểm đến vậy

Deserialize không chỉ tạo dữ liệu — với nhiều ngôn ngữ, nó **chạy code**: gọi constructor, magic method, callback trong quá trình tái tạo object. Kẻ tấn công tạo một chuỗi byte mà khi được deserialize sẽ kích hoạt một chuỗi các phương thức có sẵn (**gadget chain**) dẫn tới thực thi lệnh. Không cần chèn code mới — chỉ cần xâu chuỗi code đã có trong ứng dụng và thư viện của nó.

Đây là hạng mục A08:2021 (Software and Data Integrity Failures).

## 2. Theo ngôn ngữ

| Ngôn ngữ | Định dạng nguy hiểm | Gadget/công cụ |
|---|---|---|
| **Java** | Native serialization (`ObjectInputStream`) | ysoserial — kho gadget chain kinh điển |
| **.NET** | `BinaryFormatter`, `LosFormatter` | ysoserial.net |
| **PHP** | `unserialize()` | PHP Object Injection, POP chain, phar:// |
| **Python** | `pickle`, `PyYAML` (`yaml.load` cũ) | pickle tự thực thi khi load |
| **Ruby** | `Marshal.load`, YAML | Universal gadget chains |
| **Node.js** | `node-serialize`, một số YAML | — |

> [!note] Dấu hiệu nhận biết trong khai thác và code review
> Trên đường truyền: chuỗi base64 bắt đầu bằng `rO0` (Java), `AAEAAAD` (.NET), `O:` hoặc `a:` (PHP serialized). Trong code (kỹ năng OSWE): tìm `unserialize`, `pickle.loads`, `ObjectInputStream`, `yaml.load` nhận dữ liệu từ nguồn không tin cậy — [[Source Code Review for Vulnerabilities]].

## 3. Phòng thủ

| Biện pháp | Ghi chú |
|---|---|
| **Không deserialize dữ liệu không tin cậy** | Nguyên tắc gốc; nếu tránh được, tránh |
| **Dùng định dạng dữ liệu thuần** | JSON, protobuf — mang dữ liệu, không mang code/kiểu |
| **Ký và xác minh (HMAC)** | Nếu buộc phải serialize object, ký để phát hiện sửa đổi |
| **Allow-list kiểu** | Chỉ cho phép deserialize các class định trước |
| **Sandbox / cô lập** | Chạy deserialization trong môi trường quyền tối thiểu |
| **Cập nhật thư viện** | Gadget chain mới xuất hiện trong dependency |

Điểm mấu chốt: **JSON không tự thực thi code**. Chuyển từ native serialization sang JSON loại bỏ cả lớp lỗ hổng — với chi phí mất khả năng serialize object phức tạp trực tiếp.

## 4. Nguyên tắc

1. **Coi mọi dữ liệu serialized từ client là thù địch.** Cookie, hidden field, tham số, token — nếu chứa object serialized, nó là bề mặt tấn công.
2. **Ưu tiên JSON/protobuf hơn native serialization.** Loại bỏ vấn đề thay vì vá nó.
3. **Nếu phải serialize object, ký nó.** HMAC phát hiện sửa đổi trước khi deserialize.
4. **Cập nhật dependency.** Gadget chain nằm trong thư viện; thư viện lỗi thời = gadget mới — [[Software Supply Chain Attacks]].
5. **Trong code review, deserialization là điểm dừng bắt buộc.** Đây là lớp lỗ hổng có tỉ lệ tác động RCE cao nhất trong web.

## 5. Cạm bẫy

- **Tin rằng "chỉ nội bộ mới gửi dữ liệu này".** Second-order: dữ liệu qua nhiều tầng vẫn có thể do kẻ tấn công kiểm soát.
- **Nghĩ mã hoá là đủ.** Mã hoá không xác thực toàn vẹn; cần ký (HMAC) để chống sửa đổi. Và nếu khoá rò rỉ, mã hoá vô nghĩa.
- **Bỏ qua PHP phar://.** Deserialization kích hoạt qua thao tác file với `phar://` wrapper, không cần gọi `unserialize` trực tiếp.
- **`yaml.load` của PyYAML cũ.** Tương đương pickle về mức nguy hiểm; dùng `yaml.safe_load`.
- **Bỏ qua vì "không thấy phản hồi".** Nhiều gadget chain là blind; dùng kênh OOB để xác nhận.
- **Chỉ allow-list class rồi yên tâm.** Gadget có thể nằm trong chính các class được phép; allow-list giảm rủi ro, không loại bỏ.

## 6. Checklist áp dụng

- [ ] Tôi đã tìm mọi chỗ deserialize dữ liệu từ nguồn không tin cậy chưa?
- [ ] Có dữ liệu serialized nào đi qua client (cookie, field, token) không?
- [ ] Ứng dụng có thể chuyển sang JSON/protobuf thay vì native serialization không?
- [ ] Nếu buộc serialize object, nó có được ký (HMAC) không?
- [ ] Dependency chứa gadget chain đã được cập nhật chưa?
- [ ] Tôi đã test cả trường hợp blind qua kênh OOB chưa?
- [ ] (Code review) Tôi đã grep `unserialize`/`pickle.loads`/`ObjectInputStream`/`yaml.load` chưa?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **ysoserial / ysoserial.net** | Sinh gadget chain Java/.NET |
| **phpggc** | Sinh gadget chain PHP |
| **Burp — Java Deserialization Scanner** | Phát hiện, sinh payload |
| **GadgetProbe** | Dò thư viện có trên classpath (Java) |

## Tham khảo

- [OWASP — Deserialization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html)
- [OWASP A08:2021 — Software and Data Integrity Failures](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/)
- [PortSwigger — Insecure deserialization](https://portswigger.net/web-security/deserialization)
- [ysoserial](https://github.com/frohoff/ysoserial)

## Liên kết

[[Web Attack Surface]] · [[Source Code Review for Vulnerabilities]] · [[Software Supply Chain Attacks]] · [[Business Logic Flaws]] · [[Security]]
