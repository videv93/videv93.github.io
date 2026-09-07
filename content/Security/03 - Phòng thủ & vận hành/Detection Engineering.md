---
tags: [security, phòng-thủ]
status: growing
---
# Detection Engineering

> Viết detection **như viết phần mềm**: có phiên bản, có test, có review, có vòng đời. Đây là chỗ hiểu biết tấn công (thư mục `01`, `02`) chuyển hoá thành giá trị phòng thủ — và là lý do [[Offense vs Defense Bias]] nói học tấn công vẫn quan trọng.

## 1. Detection là gì và không là gì

Detection là một **giả thuyết viết thành code**: "nếu kỹ thuật tấn công X xảy ra, ta sẽ thấy dấu vết Y trong dữ liệu Z". Nó không phải một lần cấu hình rồi quên; nó là tài sản phần mềm có vòng đời — viết, test, triển khai, tinh chỉnh, loại bỏ khi lỗi thời.

## 2. Pyramid of Pain — chọn tầng để detect

Bimodal về giá trị: detect ở tầng càng cao, kẻ tấn công càng khó né.

| Tầng | Ví dụ | Kẻ tấn công đổi dễ hay khó |
|---|---|---|
| Hash file | MD5 của malware | Tầm thường (đổi 1 byte) |
| IP address | C2 IP | Dễ |
| Domain name | C2 domain | Dễ vừa |
| Network/host artifact | User-agent, đường registry | Khó vừa |
| Tool | Mimikatz, Cobalt Strike | Khó |
| **TTP** | Kỹ thuật, hành vi | **Rất khó** — đổi TTP nghĩa là đổi cách hoạt động |

> [!note] Vì sao detect theo hành vi (TTP) thắng
> Detect theo IOC (hash, IP) là chạy theo đuôi — kẻ tấn công đổi chúng trong vài giây. Detect theo **hành vi** (ví dụ: "process Office sinh ra PowerShell mã hoá base64") buộc kẻ tấn công phải đổi *cách tấn công*, đắt hơn nhiều. Ánh xạ detection lên [[MITRE ATTACK Framework]] để phủ theo kỹ thuật, không theo mẫu.

## 3. Vòng đời một detection

1. **Giả thuyết** — dựa trên kỹ thuật ATT&CK, threat intel, hoặc bài học từ sự cố.
2. **Xác định nguồn dữ liệu** — log nào chứa dấu vết? Có đang thu không? — [[SIEM and Log Analysis]].
3. **Viết quy tắc** — Sigma (chuẩn trung lập), hoặc ngôn ngữ SIEM cụ thể.
4. **Test với dữ liệu thật** — cả tấn công (true positive) lẫn hoạt động bình thường (false positive).
5. **Đo chất lượng** — tỉ lệ FP, độ phủ, độ tin cậy.
6. **Triển khai và tinh chỉnh** — giảm FP mà không mất TP.
7. **Bảo trì / loại bỏ** — môi trường đổi, quy tắc lỗi thời.

## 4. Detection as Code

Áp dụng thực hành kỹ thuật phần mềm vào detection:

| Thực hành | Áp dụng |
|---|---|
| Version control | Quy tắc trong Git, review qua PR |
| Test tự động | Chạy quy tắc trên dữ liệu mẫu tấn công + bình thường |
| CI/CD | Kiểm tra cú pháp, độ phủ trước khi deploy |
| Sigma | Viết một lần, dịch sang nhiều SIEM |
| Peer review | Detection cũng cần review như code |

## 5. Nguyên tắc

1. **Ánh xạ mọi detection lên ATT&CK.** Giúp thấy lỗ hổng độ phủ và tránh detect trùng lặp.
2. **Ưu tiên độ cao trong Pyramid of Pain.** Behavior > tool > artifact > IOC.
3. **Test cả FP lẫn TP trước khi deploy.** Detection chưa test là nguồn alert fatigue tiềm năng.
4. **Detection tồi hơn không có detection nếu nó tạo nhiễu.** Nó làm chìm cảnh báo thật — [[Blue Team Operations]].
5. **Đóng vòng với red team.** Mỗi kỹ thuật red team dùng phải sinh ra một detection — [[Purple Team Exercises]].
6. **Ghi lại giả định của mỗi detection.** Khi môi trường đổi, biết detection nào cần xem lại.

## 6. Cạm bẫy

- **Detect chỉ bằng IOC.** Chạy theo đuôi; kẻ tấn công đổi IOC tức thì. Cần behavior.
- **Không đo false positive.** Deploy quy tắc "bắt được tấn công" mà không biết nó cũng bắt 500 sự kiện bình thường mỗi ngày.
- **Copy quy tắc không tinh chỉnh.** Quy tắc từ cộng đồng cần điều chỉnh theo môi trường; dùng thô sinh nhiễu hoặc bỏ sót.
- **Không có nguồn dữ liệu.** Viết detection cho log không được thu là vô nghĩa — kiểm nguồn trước.
- **Detection không bao giờ bị loại bỏ.** Quy tắc lỗi thời tích tụ thành nợ và nhiễu.
- **Bỏ qua evasion.** Kẻ tấn công biết detection phổ biến; detection tốt tính tới cách né (mã hoá, đổi tên, living-off-the-land).

## 7. Checklist áp dụng

- [ ] Detection này ánh xạ lên kỹ thuật ATT&CK nào?
- [ ] Nó nhắm tầng nào trong Pyramid of Pain? Có thể lên cao hơn không?
- [ ] Nguồn dữ liệu cần thiết có đang được thu không?
- [ ] Tôi đã test với cả dữ liệu tấn công và dữ liệu bình thường chưa?
- [ ] Tỉ lệ false positive dự kiến là bao nhiêu?
- [ ] Quy tắc có trong version control và được review không?
- [ ] Tôi đã cân nhắc cách kẻ tấn công né detection này chưa?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **Sigma** | Chuẩn quy tắc trung lập, dịch đa SIEM |
| **MITRE ATT&CK Navigator** | Bản đồ độ phủ detection |
| **Atomic Red Team** | Test detection bằng kỹ thuật mô phỏng |
| **Elastic Detection Rules / Splunk ESCU** | Kho quy tắc mở |
| **DeTT&CT** | Đánh giá độ phủ log và detection |

## Tham khảo

- [Sigma project](https://github.com/SigmaHQ/sigma)
- [MITRE ATT&CK](https://attack.mitre.org/) và [Navigator](https://mitre-attack.github.io/attack-navigator/)
- [Pyramid of Pain — David Bianco](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- [Palantir — Alerting and Detection Strategy Framework](https://github.com/palantir/alerting-detection-strategy-framework)
- [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team)

## Liên kết

[[Blue Team Operations]] · [[SIEM and Log Analysis]] · [[Threat Hunting]] · [[MITRE ATTACK Framework]] · [[Purple Team Exercises]] · [[Security]]
