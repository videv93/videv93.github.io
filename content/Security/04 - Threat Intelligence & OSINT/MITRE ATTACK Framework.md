---
tags: [security, cti]
status: evergreen
---
# MITRE ATTACK Framework

> Ngôn ngữ chung giữa red và blue. Trước ATT&CK, tấn công và phòng thủ nói hai thứ tiếng khác nhau. ATT&CK là bộ từ vựng chuẩn cho **cách kẻ tấn công hành động** — dựa trên quan sát thực tế, không dựa lý thuyết.

## 1. Cấu trúc: Tactics → Techniques → Procedures

| Tầng | Trả lời | Ví dụ |
|---|---|---|
| **Tactic** | **Vì sao** — mục tiêu của kẻ địch | Initial Access, Privilege Escalation, Exfiltration |
| **Technique** | **Làm thế nào** — cách đạt mục tiêu | T1566 Phishing, T1055 Process Injection |
| **Sub-technique** | Cách cụ thể hơn | T1566.001 Spearphishing Attachment |
| **Procedure** | Cài đặt thật của một actor | "APT29 dùng X để làm Y" |

14 tactic của ATT&CK Enterprise xếp gần theo thứ tự một cuộc tấn công: Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → Command and Control → Exfiltration → Impact.

## 2. Vì sao ATT&CK quan trọng — nối cả vault này lại

| Dùng cho | Cách |
|---|---|
| **Detection** | Ánh xạ mỗi detection lên technique để thấy độ phủ — [[Detection Engineering]] |
| **Purple team** | Chọn technique để test có hệ thống — [[Purple Team Exercises]] |
| **Threat hunting** | Technique = giả thuyết hunt — [[Threat Hunting]] |
| **CTI** | Mô tả actor bằng technique họ dùng — [[Threat Actor Profiling]] |
| **Gap analysis** | Navigator tô màu độ phủ, lộ điểm mù |
| **Giao tiếp** | Red và blue nói cùng một mã T-number |

> [!note] Giá trị lớn nhất: đo cái mình *không* thấy
> ATT&CK Navigator cho phép tô màu: technique nào ta phát hiện được, technique nào mù. Đây là cách biến câu hỏi mơ hồ "chúng ta phòng thủ tốt không?" thành bản đồ cụ thể "chúng ta mù ở 6 technique thuộc Defense Evasion". Không có ngôn ngữ chung này thì không đo được độ phủ.

## 3. Các ma trận

| Ma trận | Phạm vi |
|---|---|
| **Enterprise** | Windows, Linux, macOS, cloud, container, network |
| **Mobile** | iOS, Android — [[Mobile Application Security]] |
| **ICS** | Hệ thống công nghiệp |

Có cấu trúc liên quan: **D3FEND** (biện pháp phòng thủ), **CAR** (Cyber Analytics Repository — detection mẫu), **ATT&CK Groups** (hồ sơ actor), **Software** (công cụ/malware).

## 4. Nguyên tắc

1. **Dùng ATT&CK như bản đồ, không như checklist.** Phủ 100% technique là bất khả thi và vô nghĩa; ưu tiên technique liên quan tới threat model của bạn.
2. **Ưu tiên theo actor thật của ngành bạn.** ATT&CK Groups cho biết actor nào dùng technique nào; tập trung vào cái nhắm vào bạn.
3. **Ánh xạ detection lên technique, không ngược lại.** Bắt đầu từ "ta phát hiện được gì" rồi tô lên bản đồ.
4. **Behavior (technique) bền hơn IOC.** Nối với Pyramid of Pain — detect ở tầng technique khó né hơn — [[Detection Engineering]].
5. **Cập nhật theo phiên bản.** ATT&CK đổi ~2 lần/năm; technique được thêm, gộp, đổi số.

## 5. Cạm bẫy

- **Coi phủ ATT&CK là mục tiêu.** "Phủ 100%" khuyến khích detection nông cho đủ ô, tạo nhiễu. Chất lượng > độ phủ.
- **ATT&CK như phân loại cứng.** Một hành động thật có thể thuộc nhiều technique; đừng cãi nhau về nhãn.
- **Bỏ qua procedure.** Cùng một technique, actor khác nhau cài đặt khác nhau; detection cần tính tới biến thể.
- **Dùng bản cũ.** Số T thay đổi; tài liệu tham chiếu technique đã gộp/đổi.
- **Ánh xạ ngược.** Chọn technique trước rồi ép detection vào — nên đi từ năng lực thật.
- **Quên đây là quan sát, không phải đầy đủ.** ATT&CK ghi cái *đã quan sát được*; technique mới xuất hiện trước khi vào ma trận.

## 6. Checklist áp dụng

- [ ] Tôi đang dùng ATT&CK như bản đồ ưu tiên, không như checklist phủ đủ?
- [ ] Tôi đã xác định technique mà actor của ngành tôi dùng chưa?
- [ ] Detection của tôi có được ánh xạ lên technique không?
- [ ] Tôi đã dùng Navigator để thấy điểm mù chưa?
- [ ] Tôi đang dùng phiên bản ATT&CK mới nhất chứ?
- [ ] Tôi có tính tới biến thể procedure của cùng một technique không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **ATT&CK Navigator** | Tô màu độ phủ, gap analysis |
| **DeTT&CT** | Đánh giá độ phủ log/detection theo ATT&CK |
| **Caldera / Atomic Red Team** | Mô phỏng technique |
| **OpenCTI / MISP** | Ánh xạ intel lên ATT&CK |
| **D3FEND** | Đối ứng phòng thủ cho technique |

## Tham khảo

- [MITRE ATT&CK](https://attack.mitre.org/)
- [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/)
- [MITRE D3FEND](https://d3fend.mitre.org/)
- [Getting Started with ATT&CK (MITRE)](https://www.mitre.org/news-insights/publication/getting-started-mitre-attack)
- [MITRE CAR — Cyber Analytics Repository](https://car.mitre.org/)

## Liên kết

[[Cyber Threat Intelligence]] · [[Detection Engineering]] · [[Threat Hunting]] · [[Purple Team Exercises]] · [[Threat Actor Profiling]] · [[Indicators and Intel Sharing]] · [[Security]]
