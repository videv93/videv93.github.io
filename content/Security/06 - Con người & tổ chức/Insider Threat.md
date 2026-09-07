---
tags: [security, con-người]
status: growing
---
# Insider Threat

> Kẻ tấn công đã ở bên trong, có quyền truy cập hợp pháp, và biết hệ thống. Đây là mối đe doạ khó nhất — vì mọi công cụ phòng thủ đều giả định ranh giới "trong/ngoài", và insider xoá ranh giới đó.

## 1. Ba loại insider

| Loại | Động cơ | Dấu hiệu |
|---|---|---|
| **Malicious** | Trả thù, tiền, ý thức hệ | Truy cập bất thường, exfil, hành vi lén |
| **Negligent** | Bất cẩn, lười, thiếu hiểu biết | Vi phạm chính sách vô ý, chia sẻ credential |
| **Compromised** | Bị chiếm tài khoản (thực ra là kẻ ngoài) | Hành vi lệch baseline — [[Password Attacks and Credential Access]] |

> [!note] "Compromised insider" là điểm giao với tấn công ngoài
> Một tài khoản nhân viên bị chiếm trông giống hệt insider malicious từ góc nhìn hệ thống. Điều này nghĩa là phòng thủ insider và phòng thủ [[Post-Exploitation and Lateral Movement]] hội tụ: cả hai cần phát hiện **hành vi lệch baseline của tài khoản hợp lệ**, không phải phát hiện "kẻ lạ".

## 2. Vì sao khó phát hiện

- Insider dùng **quyền hợp pháp** — không có exploit để bắt.
- Họ biết hệ thống, biết cái gì được giám sát.
- Ranh giới "tin cậy nội bộ" khiến giám sát nội bộ thường yếu hơn ngoài.
- Đa số hành động của họ **là** công việc bình thường; chỉ một phần nhỏ là độc hại.

## 3. Phòng thủ — cân bằng với quyền riêng tư và lòng tin

| Biện pháp | Ghi chú |
|---|---|
| **Least privilege + JIT access** | Giảm cái insider chạm được — [[Security Mental Models]] |
| **Separation of duties** | Không một người kiểm soát toàn bộ một quy trình nhạy cảm |
| **Giám sát hành vi (UEBA)** | Phát hiện lệch baseline, không phát hiện "kẻ lạ" |
| **DLP** | Phát hiện/chặn exfil dữ liệu |
| **Log không sửa được** | Insider không xoá được dấu — [[SIEM and Log Analysis]] |
| **Offboarding chặt** | Thu hồi quyền ngay khi nghỉ việc |
| **Văn hoá tốt** | Nhân viên hài lòng ít trở thành malicious — [[Security Culture]] |

> [!warning] Giám sát insider đụng quyền riêng tư và lòng tin
> Giám sát nhân viên quá mức phá văn hoá và có ràng buộc pháp lý ([[Privacy and Data Protection]], luật lao động). Cân bằng: giám sát **hành vi trên tài sản công ty** theo chính sách minh bạch, không giám sát **con người**. Chương trình insider threat thất bại nếu nó biến mọi nhân viên thành nghi phạm — nó tạo ra chính sự bất mãn mà nó sợ.

## 4. Nguyên tắc

1. **Least privilege là biện pháp gốc.** Không thể lạm dụng quyền không có.
2. **Phát hiện hành vi lệch baseline, không phát hiện "kẻ lạ".** Insider là người quen.
3. **Separation of duties cho quy trình nhạy cảm.** Một người không đủ quyền gây hại lớn.
4. **Offboarding là điểm rủi ro cao.** Người sắp/vừa nghỉ là nhóm malicious phổ biến nhất; thu quyền kịp thời.
5. **Văn hoá là phòng thủ rẻ nhất.** Nhân viên được đối xử tốt hiếm khi trở thành malicious insider.
6. **Minh bạch về giám sát.** Chính sách rõ ràng vừa hợp pháp vừa giữ lòng tin.
7. **Compromised insider = tấn công ngoài.** Cùng biện pháp phát hiện hành vi.

## 5. Cạm bẫy

- **Giả định insider là hiếm.** Phần lớn dữ liệu cho thấy yếu tố con người (gồm negligent) chiếm phần lớn sự cố.
- **Chỉ phòng "kẻ ngoài".** Ranh giới nội bộ yếu để insider tự do.
- **Giám sát quá mức.** Phá văn hoá, tạo bất mãn, rủi ro pháp lý.
- **Bỏ qua negligent.** Không phải mọi insider là ác ý; bất cẩn gây nhiều sự cố hơn.
- **Offboarding chậm.** Quyền còn sống sau khi nghỉ việc.
- **Không có separation of duties.** Một người kiểm soát toàn bộ quy trình tiền/dữ liệu.
- **Quên compromised insider.** Coi mọi hành vi nội bộ là tin cậy.

## 6. Checklist áp dụng

- [ ] Least privilege và JIT access có được áp dụng không?
- [ ] Có separation of duties cho quy trình nhạy cảm không?
- [ ] Có giám sát hành vi lệch baseline (UEBA) không?
- [ ] Offboarding có thu hồi quyền kịp thời không?
- [ ] Chính sách giám sát có minh bạch và hợp pháp không?
- [ ] Giám sát có nhắm hành vi trên tài sản, không nhắm con người không?
- [ ] Có tính tới cả ba loại (malicious/negligent/compromised) không?
- [ ] Văn hoá tổ chức có giảm động cơ trở thành malicious insider không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **UEBA** (trong SIEM/EDR) | Phát hiện hành vi lệch baseline |
| **DLP** | Giám sát/chặn exfil |
| **PAM** | Quản lý và ghi lại truy cập đặc quyền |
| **IGA / IAM** | Quản lý vòng đời quyền, offboarding |
| **Log immutable** | Chống xoá dấu |

## Tham khảo

- [CISA — Insider Threat Mitigation](https://www.cisa.gov/topics/physical-security/insider-threat-mitigation)
- [CERT/SEI — Common Sense Guide to Mitigating Insider Threats](https://insights.sei.cmu.edu/library/common-sense-guide-to-mitigating-insider-threats-seventh-edition/)
- [NIST SP 800-53 — AC/AU controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/)

## Liên kết

[[Security Culture]] · [[Security Mental Models]] · [[Post-Exploitation and Lateral Movement]] · [[Privacy and Data Protection]] · [[SIEM and Log Analysis]] · [[Security]]
