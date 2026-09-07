---
tags: [security, con-người, tổ-chức]
status: growing
---
# Security Culture

> Vì sao đội bảo mật thường bị né tránh — "Department of No" — và cách sửa. Đây là kỹ năng quyết định sự nghiệp từ mức senior trở lên, và là thứ [[Offense vs Defense Bias]] chỉ ra rằng seed hoàn toàn bỏ qua.

## 1. Vấn đề: bảo mật như một trở ngại

Khi bảo mật được cảm nhận là người **cản trở** công việc, ba điều xảy ra:
- Người ta **giấu** thay vì báo cáo — mất tín hiệu sớm.
- Người ta **vòng qua** biện pháp — biện pháp có giá trị âm.
- Bảo mật bị mời vào **cuối cùng**, khi sửa đã đắt — mất cơ hội thiết kế an toàn.

Kết quả nghịch lý: một đội bảo mật "cứng rắn" tạo ra tổ chức **kém an toàn hơn**, vì nó bị định tuyến vòng qua.

## 2. Nguyên nhân gốc và cách đảo ngược

| Nguyên nhân | Biểu hiện | Đảo ngược |
|---|---|---|
| Bảo mật nói "không" | Chặn mà không đề xuất giải pháp | Nói "có, và đây là cách an toàn" |
| Không hiểu kinh doanh | Yêu cầu phi thực tế | Gắn rủi ro với mục tiêu kinh doanh — [[Security Metrics and Reporting]] |
| Đổ lỗi cá nhân | Trừng phạt người mắc bẫy | Blameless, coi lỗi là lỗi hệ thống |
| Bảo mật xa cách | "Chúng tôi vs họ" | Security champion nhúng vào đội |
| Ma sát cao | Quy trình an toàn phiền | Làm đường an toàn thành đường dễ nhất |

## 3. Cái thật sự thay đổi văn hoá

| Đòn bẩy | Vì sao hiệu quả |
|---|---|
| **Security champions** | Người trong mỗi đội, nói ngôn ngữ của đội đó, cầu nối hai chiều |
| **Blameless culture** | Người báo cáo sớm khi không sợ bị phạt — cùng logic [[Security Incident Response]] và SRE |
| **Paved road** | Cung cấp cách làm an toàn *mặc định dễ hơn* cách không an toàn |
| **Lãnh đạo làm gương** | Văn hoá đi từ trên xuống; CEO bỏ MFA thì không ai coi trọng |
| **Ăn mừng việc đúng** | Khen người báo cáo phishing/lỗ hổng, không chỉ phạt vi phạm |
| **Minh bạch về lý do** | Người ta tuân thủ cái họ hiểu, vòng qua cái họ thấy vô lý |

> [!note] "Paved road" là ý tưởng mạnh nhất
> Thay vì cấm cách không an toàn (người ta vòng qua), cung cấp một cách an toàn **dễ dùng hơn** cách không an toàn — thư viện đã cấu hình đúng, template có sẵn bảo mật, pipeline tự kiểm. Bảo mật thắng khi làm đúng là đường ít kháng trở nhất, không khi làm sai bị cấm. Cùng tinh thần với [[DevSecOps]] (DevOps).

## 4. Nguyên tắc

1. **"Có, và đây là cách" thay vì "không".** Đội bảo mật là bên cho phép an toàn, không phải bên chặn.
2. **Blameless.** Trừng phạt tạo im lặng; im lặng là kẻ thù của phát hiện sớm.
3. **Nhúng vào đội, đừng đứng ngoài.** Security champions phá bức tường "chúng tôi vs họ".
4. **Làm đúng dễ hơn làm sai.** Paved road thắng lệnh cấm.
5. **Nói ngôn ngữ kinh doanh.** Rủi ro gắn với mục tiêu, không phải với thuật ngữ kỹ thuật — [[Security Metrics and Reporting]].
6. **Lãnh đạo làm gương và bảo trợ.** Văn hoá không đổi được từ dưới lên một mình.
7. **Đo văn hoá.** Tỉ lệ báo cáo, thời gian bảo mật được mời vào dự án, số lần bị vòng qua.

## 5. Cạm bẫy

- **"Department of No".** Chặn mà không đề xuất → bị vòng qua → kém an toàn hơn.
- **Đổ lỗi.** Tạo văn hoá giấu giếm.
- **Bảo mật đứng ngoài.** "Ném yêu cầu qua tường" không tạo hợp tác.
- **Cấm thay vì tạo đường dễ.** Lệnh cấm bị lách; paved road được dùng.
- **Nói kỹ thuật với lãnh đạo.** Không được đầu tư vì không ai hiểu rủi ro kinh doanh.
- **Bỏ qua lãnh đạo làm gương.** Miễn trừ cho sếp giết uy tín chương trình.
- **Không đo.** Không biết văn hoá đang tốt lên hay xấu đi.

## 6. Checklist áp dụng

- [ ] Đội bảo mật có đề xuất giải pháp thay vì chỉ chặn không?
- [ ] Văn hoá có blameless không? Người báo cáo sớm có được khen không?
- [ ] Có security champions nhúng trong các đội không?
- [ ] Có "paved road" — cách an toàn dễ hơn cách không an toàn không?
- [ ] Rủi ro có được trình bày bằng ngôn ngữ kinh doanh không?
- [ ] Lãnh đạo có làm gương và bảo trợ không?
- [ ] Tôi có đo văn hoá (báo cáo, thời điểm được mời vào, số lần bị vòng qua) không?

## Tham khảo

- [Google — BeyondCorp & security culture](https://cloud.google.com/beyondcorp)
- [SANS Security Awareness Maturity Model](https://www.sans.org/security-awareness-training/)
- [Netflix / Google — "paved road" engineering](https://netflixtechblog.com/)
- [DORA / Accelerate — culture and performance](https://dora.dev/)
- Nền văn hoá vận hành: [[DevOps Culture & Principles]] (DevOps)

## Liên kết

[[Security Awareness Programs]] · [[Insider Threat]] · [[Security Metrics and Reporting]] · [[Offense vs Defense Bias]] · [[DevSecOps]] · [[Security]]
