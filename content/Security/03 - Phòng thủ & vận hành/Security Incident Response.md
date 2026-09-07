---
tags: [security, phòng-thủ, ir]
status: evergreen
---
# Security Incident Response

> [!note] Phân biệt với note cùng chủ đề ở DevOps
> [[Incident Response & Postmortem]] (DevOps) nói về sự cố **vận hành** — dịch vụ sập, cần khôi phục, blameless postmortem. Note này là quy trình **khác về bản chất**: có **kẻ địch** đang chủ động chống lại bạn, có **bằng chứng** phải bảo toàn, và có **nghĩa vụ pháp lý** phải thông báo. Bạn không thể "blameless postmortem" một kẻ tấn công.

## 1. Sáu pha NIST (SP 800-61)

| Pha | Nội dung | Sai lầm hay gặp |
|---|---|---|
| **1. Preparation** | Runbook, công cụ, quyền, liên hệ **trước** khi có sự cố | Bỏ qua — rồi hoảng loạn khi sự cố tới |
| **2. Detection & Analysis** | Xác nhận có sự cố thật, xác định phạm vi | Kết luận phạm vi quá sớm |
| **3. Containment** | Ngăn lan rộng | Diệt quá sớm, làm kẻ địch biết bị lộ |
| **4. Eradication** | Loại bỏ chỗ đứng của kẻ địch | Bỏ sót persistence, kẻ địch quay lại |
| **5. Recovery** | Khôi phục an toàn về vận hành | Khôi phục từ bản backup đã bị nhiễm |
| **6. Post-incident** | Bài học, cải thiện | Bỏ qua — lặp lại cùng sự cố |

> [!warning] Containment là quyết định đánh đổi, không phải phản xạ
> Ngắt máy bị nhiễm ngay lập tức cảm giác đúng, nhưng nó **cảnh báo kẻ tấn công** rằng họ bị phát hiện — họ có thể kích hoạt phá hoại, xoá dấu, hoặc chuyển sang chỗ đứng khác bạn chưa biết. Đôi khi quan sát im lặng để lập bản đồ toàn bộ sự hiện diện trước khi diệt đồng loạt là đúng. Đây là khác biệt lớn nhất với sự cố vận hành, nơi bạn luôn muốn khôi phục nhanh nhất.

## 2. Vì sao có kẻ địch đổi mọi thứ

| Sự cố vận hành | Sự cố an ninh |
|---|---|
| Nguyên nhân là lỗi/sự kiện tĩnh | Đối thủ **phản ứng lại** hành động của bạn |
| Khôi phục nhanh = tốt | Khôi phục vội có thể phá bằng chứng và bỏ sót kẻ địch |
| Blameless | Có thể liên quan điều tra, pháp lý, kỷ luật |
| Không cần bảo toàn hiện trường | **Chain of custody** quan trọng — [[Digital Forensics]] |
| Ít khi phải thông báo ra ngoài | Nghĩa vụ thông báo pháp lý (xem dưới) |

## 3. Nghĩa vụ thông báo — phần kỹ thuật hay quên

Vi phạm dữ liệu thường kích hoạt nghĩa vụ pháp lý có thời hạn cứng:

| Khung | Thời hạn | Ghi chú |
|---|---|---|
| **GDPR** (EU) | 72 giờ báo cơ quan quản lý | Kể từ khi **biết** vi phạm |
| **Nghị định 13/2023** (VN) | Thông báo khi vi phạm dữ liệu cá nhân | Xem [[Privacy and Data Protection]] |
| **Hợp đồng khách hàng** | Thường 24–72 giờ | Đọc điều khoản trước, không phải trong sự cố |
| **Bảo hiểm mạng** | Báo sớm để không mất quyền lợi | Điều kiện chi trả |

Đây là lý do IR không chỉ là việc kỹ thuật; nó cần pháp lý, truyền thông và lãnh đạo trong phòng từ sớm.

## 4. Nguyên tắc

1. **Chuẩn bị là pha quan trọng nhất.** Runbook, quyền truy cập, danh sách liên hệ, công cụ phải sẵn sàng *trước*. Giữa sự cố không phải lúc xin quyền.
2. **Bảo toàn bằng chứng trước khi khắc phục.** Ảnh đĩa, dump memory, log — khôi phục vội xoá dấu vết cần cho điều tra và cho pháp lý — [[Digital Forensics]].
3. **Xác định phạm vi trước khi diệt.** Diệt một máy khi kẻ địch ở mười máy chỉ báo cho họ biết bạn đã thấy.
4. **Giả định persistence.** Kẻ tấn công có kinh nghiệm để lại nhiều đường quay lại; eradication phải tìm hết — [[Post-Exploitation and Lateral Movement]].
5. **Khôi phục từ nguồn sạch đã biết.** Backup có thể đã bị nhiễm; xác minh trước khi restore.
6. **Ghi lại mốc thời gian mọi hành động.** Cho điều tra, cho pháp lý, cho post-incident.
7. **Đưa pháp lý/truyền thông vào sớm.** Nghĩa vụ thông báo có đồng hồ đếm ngược.

## 5. Cạm bẫy

- **Không có kế hoạch trước.** Ứng biến giữa sự cố dẫn tới sai lầm không thể sửa (bằng chứng bị phá).
- **Diệt quá sớm.** Cảnh báo kẻ địch, bỏ sót phạm vi thật.
- **Tắt máy bị nhiễm.** Mất memory forensics (malware chỉ trong RAM, khoá mã hoá) — cân nhắc cô lập mạng thay vì tắt.
- **Khôi phục từ backup nhiễm.** Sự cố tái diễn ngay.
- **Bỏ qua nghĩa vụ thông báo.** Phạt pháp lý và mất quyền bảo hiểm.
- **Không làm post-incident.** Cùng lỗ hổng bị khai thác lại — vòng lặp với [[Vulnerability Management]] và [[Detection Engineering]] không đóng.
- **Coi IR là việc riêng của IT.** Không có lãnh đạo/pháp lý thì quyết định lớn (trả tiền chuộc? công bố?) không ai dám ra.

## 6. Checklist áp dụng

- [ ] Có runbook IR viết sẵn và đội đã diễn tập chưa?
- [ ] Danh sách liên hệ (nội bộ, pháp lý, bảo hiểm, cơ quan) có sẵn không?
- [ ] Trước khi khắc phục: tôi đã bảo toàn bằng chứng (ảnh đĩa, memory, log) chưa?
- [ ] Tôi đã xác định **toàn bộ** phạm vi trước khi diệt chưa?
- [ ] Tôi đã tìm hết cơ chế persistence chưa?
- [ ] Nguồn khôi phục có được xác minh sạch không?
- [ ] Đồng hồ nghĩa vụ thông báo (GDPR 72h, hợp đồng) có đang được theo dõi không?
- [ ] Có post-incident review dẫn tới detection/biện pháp mới không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **EDR** | Cô lập host, điều tra, phản ứng từ xa |
| **Velociraptor / GRR** | DFIR quy mô lớn, thu thập từ nhiều máy |
| **KAPE** | Thu thập artefact nhanh |
| **TheHive / Cortex** | Quản lý case IR, tự động phân tích |
| **Playbook / runbook** | SOAR hoặc tài liệu — chuẩn bị pha 1 |

## Tham khảo

- [NIST SP 800-61 Rev.2 — Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [SANS Incident Handler's Handbook](https://www.sans.org/white-papers/33901/)
- [PICERL / SANS 6-step process](https://www.sans.org/)
- [ENISA — Good Practice Guide for Incident Management](https://www.enisa.europa.eu/)

## Liên kết

[[Blue Team Operations]] · [[Digital Forensics]] · [[SIEM and Log Analysis]] · [[Post-Exploitation and Lateral Movement]] · [[Privacy and Data Protection]] · [[Security]]
