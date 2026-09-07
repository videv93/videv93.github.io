---
tags: [security, phòng-thủ]
status: evergreen
---
# Blue Team Operations

> Seed của vault này không nhắc một lần nào tới SOC. Thị trường việc làm thì ngược lại — xem [[Offense vs Defense Bias]]. Note này mô tả phòng thủ vận hành thật sự làm gì cả ngày.

## 1. Blue team làm gì

Phòng thủ vận hành là công việc **liên tục**, không phải dự án có điểm kết thúc như một engagement pentest. Nó xoay quanh chu trình: chuẩn bị → phát hiện → phân tích → phản ứng → học.

| Chức năng | Nội dung | Nhà chi tiết |
|---|---|---|
| **Monitoring** | Thu thập và theo dõi tín hiệu | [[SIEM and Log Analysis]] |
| **Detection** | Biến hiểu biết tấn công thành cảnh báo | [[Detection Engineering]] |
| **Triage** | Phân loại cảnh báo: thật hay nhiễu | Kỹ năng lõi của SOC analyst |
| **Response** | Ngăn chặn, loại bỏ, khôi phục | [[Security Incident Response]] |
| **Hunting** | Tìm cái detection bỏ sót | [[Threat Hunting]] |
| **Forensics** | Điều tra sau sự cố | [[Digital Forensics]] |

## 2. Ba tầng SOC

| Tier | Vai trò | Công việc |
|---|---|---|
| **Tier 1** | Analyst | Triage cảnh báo, đóng false positive, leo thang cái thật |
| **Tier 2** | Investigator | Điều tra sâu cảnh báo đã leo thang, phân tích |
| **Tier 3** | Threat hunter / IR / detection engineer | Săn chủ động, ứng phó sự cố lớn, viết detection |

Đường nghề nghiệp phổ biến đi từ Tier 1 lên; đây là điểm vào có nhiều vị trí nhất trong ngành — [[Security Career Paths]].

## 3. Vấn đề trung tâm: alert fatigue

SOC chết không phải vì thiếu cảnh báo mà vì **quá nhiều cảnh báo vô nghĩa**. Analyst bị ngập trong false positive sẽ bỏ sót cảnh báo thật — đây là nguyên nhân thực tế của nhiều vụ vi phạm lớn (cảnh báo *đã* kích hoạt, không ai xử lý).

| Nguyên nhân | Cách giảm |
|---|---|
| Quy tắc quá rộng | Tinh chỉnh theo môi trường — [[Detection Engineering]] |
| Không có ngữ cảnh | Làm giàu cảnh báo (ai, ở đâu, bình thường không) |
| Không ưu tiên | Xếp hạng theo tài sản và độ tin cậy |
| Xử lý thủ công lặp lại | Tự động hoá bằng SOAR/playbook |

## 4. Nguyên tắc

1. **Assume breach.** Blue team không giả định tường ngoài giữ được; họ giả định kẻ địch đã vào và tập trung phát hiện sớm — [[Security Mental Models]].
2. **Đo bằng thời gian, không bằng số cảnh báo.** MTTD (mean time to detect) và MTTR (mean time to respond) là chỉ số thật; số cảnh báo là chỉ số phù phiếm.
3. **Detection tốt hơn phòng ngừa nhiều hơn.** Sau một điểm, thêm tường không đáng bằng thấy được kẻ đã qua tường.
4. **Biết trạng thái bình thường.** Không có baseline thì không phân biệt được bất thường; đây là điều kiện tiên quyết của [[Threat Hunting]].
5. **Tự động hoá cái lặp lại, giữ con người cho phán đoán.** SOAR xử lý làm giàu và ngăn chặn cơ bản; người xử lý cái mơ hồ.
6. **Học từ mỗi sự cố.** Detection thiếu lộ ra trong sự cố phải thành detection mới — vòng lặp với [[Purple Team Exercises]].

## 5. Cạm bẫy

- **Mua công cụ thay vì xây năng lực.** Một SIEM đắt tiền không cấu hình đúng tệ hơn không có — nó tạo cảm giác an toàn giả và ngập cảnh báo.
- **Thu mọi log "cho chắc".** Chi phí lưu trữ bùng nổ, tín hiệu chìm trong nhiễu — [[SIEM and Log Analysis]] nói rõ log nào đáng thu.
- **Không có runbook.** Analyst tự ứng biến mỗi lần dẫn tới phản ứng không nhất quán và chậm.
- **Chỉ phản ứng, không săn.** Detection luôn có lỗ; chỉ chờ cảnh báo là bỏ sót kẻ địch tinh vi.
- **Bỏ qua sức khoẻ analyst.** Burnout là vấn đề vận hành thật của SOC; alert fatigue vừa là vấn đề kỹ thuật vừa là vấn đề con người.
- **Đo lường bằng KPI dễ chơi.** "Đóng X cảnh báo/ngày" khuyến khích đóng ẩu.

## 6. Checklist áp dụng

- [ ] Tôi có baseline "bình thường" cho môi trường không?
- [ ] Cảnh báo có được làm giàu ngữ cảnh trước khi tới analyst không?
- [ ] Có runbook cho các loại cảnh báo phổ biến không?
- [ ] Tôi đang đo MTTD/MTTR, không chỉ số cảnh báo?
- [ ] Cái lặp lại đã được tự động hoá chưa?
- [ ] Detection thiếu từ sự cố gần nhất đã thành quy tắc mới chưa?
- [ ] Analyst có bị ngập false positive không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **SIEM** (Splunk, Elastic, Sentinel, Wazuh) | Tập trung log, cảnh báo — [[SIEM and Log Analysis]] |
| **EDR** (CrowdStrike, Defender, SentinelOne) | Giám sát và phản ứng endpoint |
| **SOAR** | Tự động hoá playbook |
| **TIP** | Nền threat intelligence — [[Indicators and Intel Sharing]] |
| **MITRE ATT&CK** | Bản đồ độ phủ detection — [[MITRE ATTACK Framework]] |

## Tham khảo

- [NIST SP 800-61 — Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [SANS Blue Team resources](https://www.sans.org/blue-team/)
- [The Elastic Guide to Threat Hunting](https://www.elastic.co/security)

## Liên kết

[[Detection Engineering]] · [[SIEM and Log Analysis]] · [[Security Incident Response]] · [[Threat Hunting]] · [[Purple Team Exercises]] · [[Offense vs Defense Bias]] · [[Security]]
