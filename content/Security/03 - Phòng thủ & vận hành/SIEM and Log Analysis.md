---
tags: [security, phòng-thủ]
status: growing
---
# SIEM and Log Analysis

> Log là bộ nhớ của hệ thống. SIEM (Security Information and Event Management) tập trung log lại để tìm ra dấu vết tấn công. Câu hỏi khó không phải "thu log thế nào" mà là **log nào đáng thu** — vì thu sai làm bạn phá sản vì lưu trữ và chìm trong nhiễu.

## 1. SIEM làm gì

| Chức năng | Nội dung |
|---|---|
| **Thu thập** | Gom log từ endpoint, mạng, cloud, ứng dụng |
| **Chuẩn hoá** | Đưa về định dạng chung để tương quan được |
| **Tương quan** | Nối sự kiện rời rạc thành một câu chuyện tấn công |
| **Cảnh báo** | Kích hoạt khi khớp detection — [[Detection Engineering]] |
| **Lưu trữ & tra cứu** | Phục vụ điều tra và tuân thủ |

## 2. Log nào đáng thu — theo giá trị phát hiện

| Nguồn | Giá trị | Ghi chú |
|---|---|---|
| **Authentication** (đăng nhập, thất bại, MFA) | Rất cao | Vector số 1 là credential — [[Password Attacks and Credential Access]] |
| **Endpoint/EDR** (process, lệnh, tạo file) | Rất cao | Thấy được hành vi tấn công thật |
| **Windows Security / Sysmon** | Rất cao | Sysmon là nguồn giàu nhất cho detection host |
| **Cloud audit** (CloudTrail, Azure AD) | Rất cao | Nơi tấn công cloud để lại dấu — [[Cloud Security Posture]] |
| **DNS** | Cao | Bắt C2, exfil, domain lạ |
| **Proxy/Firewall** | Cao | Kết nối ra ngoài bất thường |
| **Ứng dụng** (log nghiệp vụ) | Trung bình–cao | Cho logic flaw, lạm dụng |
| **Debug verbose** | Thấp | Tốn dung lượng, ít giá trị phát hiện |

> [!warning] "Thu hết cho chắc" là sai lầm đắt tiền
> Chi phí SIEM thường tính theo dung lượng nhập vào. Thu mọi thứ làm chi phí bùng nổ **và** làm tín hiệu chìm trong nhiễu. Chiến lược đúng: thu nguồn giá trị cao đầy đủ, nguồn giá trị thấp có chọn lọc, và ánh xạ nguồn log lên detection cần chúng — không thu log mà không có detection nào dùng tới.

## 3. Kiến trúc và mô hình chi phí

| Mô hình | Ví dụ | Chi phí |
|---|---|---|
| Theo dung lượng nhập | Splunk truyền thống | Cao, tăng theo log |
| Theo lưu trữ/tính toán | Elastic, tách hot/cold | Linh hoạt hơn |
| Cloud-native | Sentinel, Chronicle | Theo ingest/tra cứu |
| Mã nguồn mở | Wazuh, ELK tự vận hành | Rẻ về license, đắt về vận hành |

**Data tiering**: log nóng (tra cứu nhanh, đắt) cho gần đây; log lạnh (rẻ, chậm) cho tuân thủ dài hạn. Đây là đòn bẩy chi phí lớn nhất.

## 4. Nguyên tắc

1. **Bắt đầu từ detection, ngược về log.** Hỏi "tôi muốn phát hiện gì", rồi thu đúng log cần cho nó — không thu trước rồi tìm cách dùng.
2. **Chuẩn hoá thời gian và định danh.** Log lệch múi giờ hoặc không nối được danh tính thì không tương quan được.
3. **Bảo vệ tính toàn vẹn của log.** Kẻ tấn công xoá log để giấu dấu — log phải được chuyển ra ngoài (forward) ngay và bất biến (WORM). Đây cũng là yêu cầu của [[Digital Forensics]].
4. **Giữ đủ lâu.** Dwell time trung bình tính bằng tuần tới tháng; log giữ 7 ngày là vô dụng khi phát hiện muộn.
5. **Ánh xạ độ phủ log lên ATT&CK.** Thấy được kỹ thuật nào mình mù.
6. **Log giá trị cao nhất thường bị tắt mặc định.** Sysmon, command-line logging, PowerShell script block logging phải bật thủ công.

## 5. Cạm bẫy

- **Thu log mà không có detection dùng nó.** Trả tiền lưu trữ cho dữ liệu không ai xem.
- **Bỏ qua tính toàn vẹn.** Log lưu tại chỗ trên máy bị chiếm là log kẻ tấn công xoá được.
- **Giữ quá ngắn.** Không điều tra được sự cố phát hiện sau 30 ngày nếu chỉ giữ 14.
- **Không chuẩn hoá thời gian.** Tương quan sai vì timestamp lệch.
- **Bỏ qua log cloud và SaaS.** Hạ tầng dịch chuyển lên cloud nhưng log vẫn chỉ thu on-prem.
- **Không bật log chi tiết trên endpoint.** Windows mặc định không log command line; thiếu nó bỏ lỡ phần lớn hành vi.
- **Chỉ báo cáo cho tuân thủ.** SIEM chỉ để "qua audit" mà không có ai săn/điều tra là chi phí không tạo ra phát hiện.

## 6. Checklist áp dụng

- [ ] Mỗi nguồn log tôi thu có ít nhất một detection dùng tới không?
- [ ] Tôi đã bật Sysmon / command-line / PowerShell logging trên endpoint chưa?
- [ ] Log cloud audit (CloudTrail/Azure AD) có được thu không?
- [ ] Log có được forward ra ngoài và bất biến không?
- [ ] Thời gian có được chuẩn hoá (UTC, NTP) không?
- [ ] Thời gian giữ log có dài hơn dwell time dự kiến không?
- [ ] Tôi đã ánh xạ độ phủ log lên ATT&CK để thấy điểm mù chưa?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Splunk** | SIEM mạnh, đắt, SPL linh hoạt |
| **Elastic (ELK) / Wazuh** | Mã nguồn mở, tự vận hành |
| **Microsoft Sentinel** | Cloud-native, tích hợp Azure/M365 |
| **Sysmon** | Log endpoint Windows giàu nhất (miễn phí) |
| **DeTT&CT** | Đánh giá độ phủ nguồn log |

## Tham khảo

- [MITRE ATT&CK — Data Sources](https://attack.mitre.org/datasources/)
- [Microsoft — Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)
- [Malware Archaeology — Windows Logging Cheat Sheets](https://www.malwarearchaeology.com/cheat-sheets)
- [NIST SP 800-92 — Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
- Nền vận hành log tổng quát: [[Logging & Log Aggregation]] (DevOps)

## Liên kết

[[Blue Team Operations]] · [[Detection Engineering]] · [[Threat Hunting]] · [[Digital Forensics]] · [[Security Incident Response]] · [[Security]]
