---
tags: [security, phòng-thủ]
status: growing
---
# Threat Hunting

> Săn theo **giả thuyết**, không săn theo cảnh báo. Detection chờ dấu hiệu đã biết kích hoạt; hunting chủ động đi tìm kẻ địch mà detection *bỏ sót*. Nó bắt đầu từ giả định "assume breach" của [[Security Mental Models]] và làm gì đó với nó.

## 1. Hunting khác gì monitoring

| | Monitoring (detection) | Hunting |
|---|---|---|
| Kích hoạt bởi | Cảnh báo tự động | Giả thuyết của con người |
| Tìm | Cái đã biết cách phát hiện | Cái detection bỏ sót |
| Chủ động | Bị động (chờ alert) | Chủ động (đi tìm) |
| Kết quả | Xử lý sự cố | **Detection mới** cho cái tìm được |

Điểm mấu chốt: hunting thành công **sinh ra detection**. Nếu bạn tìm được một kỹ thuật kẻ địch dùng, bạn viết quy tắc để lần sau nó tự kêu — [[Detection Engineering]]. Hunting không nhân rộng được nếu kết quả không chuyển thành detection.

## 2. Ba loại hunt

| Loại | Xuất phát từ | Ví dụ |
|---|---|---|
| **Hypothesis-driven** | Kỹ thuật ATT&CK, hiểu biết tấn công | "Nếu kẻ địch dùng Kerberoasting, tôi sẽ thấy gì?" |
| **IOC/Intel-driven** | Threat intelligence mới | "APT này dùng IOC Y — ta có nó không?" — [[Cyber Threat Intelligence]] |
| **Anomaly-driven** | Lệch khỏi baseline | "Máy này đột nhiên gọi ra domain lạ lúc 3h sáng" |

## 3. Vòng lặp hunting

1. **Giả thuyết** — dựa trên ATT&CK, intel, hoặc bất thường quan sát được.
2. **Dữ liệu** — hunt cần log phong phú; hunting phơi bày điểm mù của [[SIEM and Log Analysis]].
3. **Tìm kiếm** — truy vấn dữ liệu tìm dấu vết của giả thuyết.
4. **Phân tích** — thật hay lành tính? Cần biết baseline để phân biệt.
5. **Kết luận** — tìm thấy → [[Security Incident Response]]; không thấy → vẫn có giá trị (giảm bất định, phát hiện điểm mù dữ liệu).
6. **Sinh detection** — biến hunt thành cảnh báo tự động.

## 4. Nguyên tắc

1. **Biết baseline trước.** Không có "bình thường" thì không thấy "bất thường". Đây là điều kiện tiên quyết, không phải tuỳ chọn.
2. **Xuất phát từ giả thuyết cụ thể.** "Tìm cái gì đó đáng ngờ" không phải hunt; "tìm dấu hiệu của lateral movement qua WMI" mới là.
3. **Không tìm thấy vẫn là kết quả.** Nó thu hẹp bất định và lộ ra điểm mù dữ liệu cần vá.
4. **Mọi hunt phải để lại di sản.** Hoặc một detection mới, hoặc một khoảng trống dữ liệu đã ghi nhận, hoặc một giả thuyết đã loại.
5. **Dùng ATT&CK làm bản đồ.** Hunt có hệ thống theo kỹ thuật, không hunt ngẫu hứng.
6. **Đối chiếu với red team.** Kỹ thuật red team dùng là giả thuyết hunt sẵn — [[Purple Team Exercises]].

## 5. Cạm bẫy

- **Hunt không có giả thuyết.** Lang thang trong dữ liệu vô tận, không kết luận được.
- **Hunt không có baseline.** Không phân biệt được bình thường với tấn công.
- **Hunt không có dữ liệu.** Giả thuyết hay nhưng log không tồn tại → không kiểm được. Ghi nhận đây là điểm mù cần vá.
- **Không sinh detection.** Hunt thành công rồi quên; lần sau lặp lại thủ công thay vì để máy bắt.
- **Coi hunting là việc lúc rảnh.** Nó cần lịch và nguồn lực; SOC "sẽ hunt khi hết cảnh báo" thì không bao giờ hunt.
- **Tự lừa bằng confirmation bias.** Muốn tìm thấy tấn công nên diễn giải hoạt động lành tính thành độc hại — nối với bài học "you must not fool yourself" trong [[Threat Actor Profiling]].

## 6. Checklist áp dụng

- [ ] Tôi có baseline "bình thường" cho môi trường chưa?
- [ ] Hunt này xuất phát từ một giả thuyết cụ thể chứ?
- [ ] Log cần thiết cho giả thuyết này có tồn tại không?
- [ ] Nếu không tìm thấy, tôi đã ghi nhận nó thu hẹp bất định gì chưa?
- [ ] Kết quả hunt có được chuyển thành detection mới không?
- [ ] Hunt có ánh xạ lên kỹ thuật ATT&CK không?
- [ ] Tôi có đang tránh confirmation bias không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **SIEM + query language** | Nền tảng tìm kiếm |
| **EDR** | Dữ liệu endpoint giàu để hunt host |
| **Jupyter + msticpy** | Hunt phân tích, notebook tái lặp |
| **MITRE ATT&CK** | Bản đồ giả thuyết |
| **Atomic Red Team** | Sinh dấu vết để test hunt |
| **Sigma** | Chuyển hunt thành detection |

## Tham khảo

- [The ThreatHunting Project](https://www.threathunting.net/)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [Sqrrl — A Framework for Cyber Threat Hunting](https://www.threathunting.net/files/framework-for-threat-hunting-whitepaper.pdf)
- [The PARIS Model](http://threathunter.guru/)
- [msticpy](https://github.com/microsoft/msticpy)

## Liên kết

[[Blue Team Operations]] · [[Detection Engineering]] · [[SIEM and Log Analysis]] · [[Cyber Threat Intelligence]] · [[Purple Team Exercises]] · [[Security Incident Response]] · [[Security]]
