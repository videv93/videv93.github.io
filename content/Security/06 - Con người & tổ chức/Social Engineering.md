---
tags: [security, con-người]
status: evergreen
---
# Social Engineering

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước — social engineering test cần phê duyệt RIÊNG.** Nó tấn công con người thật, có thể gây tổn hại tâm lý và vi phạm luật lao động; mặc định là **bị cấm** trừ khi cho phép rõ ràng.

> Vector thành công nhất, và ít được luyện nhất. Không firewall nào chặn được một cú điện thoại thuyết phục. Con người là "lớp 8" của mô hình — và thường là lớp yếu nhất.

## 1. Vì sao nó hiệu quả — nguyên lý tâm lý

Social engineering khai thác lối tắt nhận thức, không khai thác lỗ hổng kỹ thuật:

| Nguyên lý (Cialdini) | Khai thác |
|---|---|
| **Authority** | Giả danh sếp, IT, cơ quan |
| **Urgency/scarcity** | "Làm ngay không mất tài khoản" |
| **Social proof** | "Đồng nghiệp khác đã làm rồi" |
| **Reciprocity** | Cho trước để tạo nghĩa vụ đáp lại |
| **Liking** | Xây quan hệ, tỏ ra thân thiện |
| **Commitment** | Ép cam kết nhỏ rồi leo thang |

## 2. Các vector

| Vector | Kênh | Nhà chi tiết |
|---|---|---|
| **Phishing** | Email hàng loạt | [[Phishing and Email Defense]] |
| **Spear phishing** | Email nhắm mục tiêu cụ thể | Dùng OSINT — [[OSINT Techniques]] |
| **Whaling** | Nhắm lãnh đạo cấp cao | — |
| **Vishing** | Điện thoại | Rất hiệu quả, ít phòng thủ |
| **Smishing** | SMS | Tăng mạnh |
| **Pretexting** | Kịch bản giả để lấy thông tin | Nền của mọi vector |
| **Baiting** | USB "nhặt được", quà | Vật lý |
| **Tailgating** | Đi theo vào khu vực hạn chế | Vật lý |
| **MFA fatigue** | Spam push tới khi bấm chấp nhận | Mới, hiệu quả — [[Password Attacks and Credential Access]] |
| **BEC** | Giả danh để lừa chuyển tiền | Thiệt hại tài chính lớn nhất |

## 3. Nguyên tắc (cho pentest có uỷ quyền)

1. **Phê duyệt riêng, phạm vi rõ, kế hoạch debrief.** Con người bị test cần được xử lý có đạo đức; mục tiêu là cải thiện, không phải bẫy để phạt.
2. **Không gây tổn hại thật cho người thật.** Không dùng chủ đề gây sang chấn (tin người thân, sa thải); không công khai danh tính người mắc bẫy.
3. **OSINT làm pretext thuyết phục.** Recon mục tiêu tạo kịch bản khả tín — nhưng giữ trong scope.
4. **Đo để cải thiện, không để đổ lỗi.** Tỉ lệ click là baseline để đào tạo, không phải danh sách để kỷ luật — [[Security Awareness Programs]].
5. **Con người mắc bẫy là lỗi hệ thống, không phải lỗi cá nhân.** Nếu một email lừa được 30% nhân viên, vấn đề là quy trình/công cụ, không phải 30% người "ngốc".

## 4. Phòng thủ (giá trị thật của note này)

| Lớp | Biện pháp |
|---|---|
| **Kỹ thuật** | Email filter, SPF/DKIM/DMARC, MFA chống phishing (FIDO2), giới hạn push |
| **Quy trình** | Xác minh ngoài băng cho yêu cầu tiền/credential; quy trình callback |
| **Con người** | Đào tạo dựa trên mô phỏng thật, văn hoá "hỏi lại không sao" |
| **Văn hoá** | Nhân viên báo cáo nghi ngờ mà không sợ bị chê — [[Security Culture]] |

> [!warning] Đào tạo một mình không đủ
> Nghiên cứu cho thấy tỉ lệ click giảm sau đào tạo nhưng không về 0, và hồi phục theo thời gian. Con người sẽ luôn mắc bẫy ở tỉ lệ nào đó. Phòng thủ mạnh giả định điều đó và thêm lớp kỹ thuật (MFA chống phishing) + quy trình (xác minh ngoài băng) để một cú click không đủ gây thiệt hại.

## 5. Cạm bẫy

- **Test không có phê duyệt riêng.** Vi phạm luật lao động, gây tổn hại thật.
- **Dùng chủ đề tàn nhẫn.** Email giả "thưởng Tết" hay "người thân gặp nạn" gây sang chấn — vượt ranh giới đạo đức.
- **Công khai người mắc bẫy.** Phá văn hoá báo cáo; người sợ bị chê sẽ giấu.
- **Đổ lỗi cá nhân.** Biến kết quả thành trừng phạt thay vì cải thiện hệ thống.
- **Chỉ đào tạo, không thêm lớp kỹ thuật.** Con người luôn mắc ở tỉ lệ nào đó.
- **Bỏ qua vishing/vật lý.** Tập trung email, quên điện thoại và tailgating — thường yếu hơn.
- **MFA thường (push) coi là đủ.** MFA fatigue vượt qua được; cần FIDO2/số khớp.

## 6. Checklist áp dụng

- [ ] (Test) Tôi có phê duyệt riêng cho social engineering không?
- [ ] Kịch bản có tránh chủ đề gây sang chấn không?
- [ ] Có kế hoạch debrief và bảo vệ danh tính người tham gia không?
- [ ] Kết quả dùng để đào tạo hay để đổ lỗi?
- [ ] (Phòng thủ) Có MFA chống phishing (FIDO2), không chỉ push không?
- [ ] Có quy trình xác minh ngoài băng cho yêu cầu tiền/credential không?
- [ ] Văn hoá có khuyến khích báo cáo nghi ngờ không sợ bị chê không?
- [ ] Phòng thủ có phủ cả vishing và vật lý, không chỉ email không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **GoPhish** | Nền mô phỏng phishing mã nguồn mở |
| **SET (Social-Engineer Toolkit)** | Bộ công cụ tấn công SE (trong scope) |
| **Evilginx / Modlishka** | Reverse proxy phishing (bypass MFA thường) — chỉ có uỷ quyền |
| **KnowBe4 / các nền đào tạo** | Mô phỏng + đào tạo doanh nghiệp |
| **DMARC analyzer** | Kiểm cấu hình chống giả mạo email |

## Tham khảo

- [Robert Cialdini — Influence: The Psychology of Persuasion](https://www.influenceatwork.com/)
- [Christopher Hadnagy — Social Engineering: The Science of Human Hacking](https://www.social-engineer.org/)
- [MITRE ATT&CK — Phishing (T1566)](https://attack.mitre.org/techniques/T1566/)
- [CISA — Avoiding Social Engineering and Phishing Attacks](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks)

## Liên kết

[[Phishing and Email Defense]] · [[Security Awareness Programs]] · [[Security Culture]] · [[OSINT Techniques]] · [[Insider Threat]] · [[Authorization and Rules of Engagement]] · [[Security]]
