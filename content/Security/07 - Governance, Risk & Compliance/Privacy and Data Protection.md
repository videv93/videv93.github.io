---
tags: [security, grc, privacy]
status: growing
---
# Privacy and Data Protection

> Privacy khác security, và nhầm hai thứ là lỗi khái niệm phổ biến. Dữ liệu được **bảo vệ hoàn hảo** (security) vẫn có thể bị **thu thập và dùng trái phép** (privacy). Note này bao gồm cả nghĩa vụ pháp lý Việt Nam mà nhiều tài liệu quốc tế bỏ qua.

## 1. Privacy vs Security

| | Security | Privacy |
|---|---|---|
| Câu hỏi | "Dữ liệu có được bảo vệ không?" | "Ta có quyền xử lý dữ liệu này không, và dùng đúng mục đích không?" |
| Vi phạm | Rò rỉ, truy cập trái phép | Thu thập quá mức, dùng sai mục đích, không có cơ sở pháp lý |
| Có thể tốt một bên | Bảo vệ hoàn hảo dữ liệu thu thập trái phép | — |

Security là **điều kiện cần** cho privacy (không bảo vệ được thì không riêng tư được) nhưng **không đủ**.

## 2. Bối cảnh pháp lý

| Khung | Phạm vi | Điểm phải biết |
|---|---|---|
| **GDPR** (EU) | Dữ liệu công dân EU | Cơ sở pháp lý xử lý; quyền chủ thể; báo vi phạm **72h**; phạt tới 4% doanh thu toàn cầu |
| **Nghị định 13/2023/NĐ-CP** (VN) | Bảo vệ dữ liệu cá nhân | Luật dữ liệu cá nhân đầu tiên của VN; yêu cầu đánh giá tác động, thông báo xử lý, quyền chủ thể |
| **Luật An ninh mạng 2018** (VN) | An ninh mạng, lưu trữ dữ liệu | Yêu cầu bản địa hoá dữ liệu với một số dịch vụ |
| **CCPA/CPRA** (California) | Cư dân California | Quyền biết/xoá/từ chối bán |
| **HIPAA** (Mỹ) | Dữ liệu y tế | Ngành y tế |

> [!warning] Nghị định 13/2023 đổi cuộc chơi ở Việt Nam
> Trước 2023, Việt Nam không có luật bảo vệ dữ liệu cá nhân toàn diện. Nghị định 13/2023/NĐ-CP (hiệu lực 1/7/2023) đưa ra nghĩa vụ cụ thể: cơ sở pháp lý để xử lý, thông báo cho chủ thể, đánh giá tác động xử lý dữ liệu (DPIA), và nghĩa vụ khi có vi phạm. Bất kỳ hệ thống xử lý dữ liệu cá nhân người Việt đều chịu ràng buộc này — kể cả khi bạn chỉ nghĩ về "bảo mật" mà quên "quyền riêng tư".

## 3. Nguyên tắc bảo vệ dữ liệu (chung cho GDPR, ND13, và thực hành tốt)

| Nguyên tắc | Nghĩa là |
|---|---|
| **Lawfulness** | Có cơ sở pháp lý (đồng ý, hợp đồng, nghĩa vụ pháp lý...) |
| **Purpose limitation** | Chỉ dùng đúng mục đích đã thông báo |
| **Data minimisation** | Chỉ thu cái cần — cũng giảm blast radius bảo mật |
| **Storage limitation** | Xoá khi hết mục đích |
| **Privacy by design** | Tính riêng tư từ thiết kế — [[Threat Modeling Practice]] + LINDDUN |
| **Accountability** | Chứng minh được tuân thủ (ghi chép, DPIA) |

## 4. Nguyên tắc thực hành

1. **Data minimisation vừa là privacy vừa là security.** Dữ liệu không thu thì không rò rỉ được — [[Security Mental Models]].
2. **Biết cơ sở pháp lý trước khi thu thập.** Không có cơ sở pháp lý = vi phạm dù bảo vệ tốt.
3. **Privacy by design.** Nhúng vào thiết kế; chạy LINDDUN cùng STRIDE khi threat model.
4. **Vi phạm dữ liệu có đồng hồ pháp lý.** GDPR 72h; ND13 có nghĩa vụ thông báo — nối [[Security Incident Response]].
5. **Xoá là một tính năng, không phải bug.** Storage limitation và quyền được xoá cần cơ chế xoá thật, không chỉ ẩn.
6. **Pentest/OSINT chạm dữ liệu cá nhân có ràng buộc.** Không chạm PII thật để chứng minh — [[Authorization and Rules of Engagement]], [[OSINT Techniques]].

## 5. Cạm bẫy

- **Nhầm security với privacy.** Bảo vệ tốt dữ liệu thu thập trái phép vẫn vi phạm.
- **Bỏ qua luật Việt Nam.** Nhiều đội chỉ nghĩ GDPR, quên ND13/2023 áp cho dữ liệu người Việt.
- **Thu thập "cho chắc".** Dữ liệu thừa là rủi ro thừa (cả privacy lẫn security).
- **Không có cơ chế xoá.** Không đáp ứng được quyền được xoá và storage limitation.
- **Đồng ý mù mờ.** Đồng ý không rõ ràng, không tự nguyện không phải cơ sở pháp lý hợp lệ.
- **Quên đồng hồ báo vi phạm.** Bỏ lỡ 72h GDPR = phạt.
- **Threat model bỏ qua privacy.** STRIDE không bắt đe doạ riêng tư; cần LINDDUN.

## 6. Checklist áp dụng

- [ ] Tôi có phân biệt được đây là vấn đề security hay privacy (hay cả hai) không?
- [ ] Có cơ sở pháp lý cho mỗi loại dữ liệu cá nhân thu thập không?
- [ ] Hệ thống xử lý dữ liệu người Việt có tuân ND13/2023 không?
- [ ] Tôi có áp dụng data minimisation không?
- [ ] Có cơ chế xoá thật (không chỉ ẩn) không?
- [ ] Có DPIA cho xử lý dữ liệu rủi ro cao không?
- [ ] Kế hoạch IR có tính đồng hồ báo vi phạm (72h GDPR/ND13) không?
- [ ] Threat model có chạy góc nhìn privacy (LINDDUN) không?

## Tham khảo

- [GDPR — toàn văn (gdpr-info.eu)](https://gdpr-info.eu/)
- [Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-465185.aspx)
- [Luật An ninh mạng 2018](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-an-ninh-mang-2018-351416.aspx)
- [LINDDUN privacy threat modeling](https://linddun.org/)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)

## Liên kết

[[Security Risk Management]] · [[Threat Modeling Practice]] · [[Security Incident Response]] · [[ISO 27001 and SOC 2]] · [[OSINT Techniques]] · [[Insider Threat]] · [[Security]]
