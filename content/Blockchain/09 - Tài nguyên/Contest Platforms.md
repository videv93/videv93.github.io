---
tags: [tài-nguyên, contest]
status: evergreen
---
# Contest Platforms

> ⚠️ Đọc [[Contest Severity vs Real Risk]] trước — nền tảng contest là một **thị trường có động cơ riêng**, không phải một cơ quan chứng nhận.

> Bốn nền tảng, bốn mô hình trả thưởng khác nhau. Mô hình trả thưởng quyết định **kiểu finding nào được thưởng** — và vì vậy quyết định luôn cách bạn nên phân bổ thời gian.

## 1. Bảng so sánh

| | **Code4rena** | **Sherlock** | **Cantina** | **Immunefi** |
|---|---|---|---|---|
| Mô hình | Contest công khai + invitational | Contest, có **judge cố định + staking** | Contest + marketplace | **Bug bounty trên code đang chạy** |
| Trả thưởng | Chia pool, trọng số theo severity và số người trùng | Chia pool | Chia pool | Trả theo từng bug, **theo tiền có nguy cơ** |
| Trùng lặp | Chia nhỏ phần thưởng | Chia nhỏ | Chia nhỏ | **Chỉ người đầu tiên** |
| Đặc thù | Báo cáo công khai, kho tư liệu tốt nhất | Quy tắc severity chặt hơn | Linh hoạt hơn | Áp lực cao nhất, thưởng cao nhất |
| Hợp cho người mới | ✅ | ✅ | ✅ | ❌ |

Seed của vault này gồm ba báo cáo Code4rena — đó cũng là nền tảng có kho báo cáo công khai tốt nhất để học.

## 2. Động cơ mà mô hình trả thưởng tạo ra

> [!warning] Hiểu động cơ trước khi thi
> - **Chia pool theo trùng lặp** ⇒ một High mà 20 người cùng tìm ra có thể trả ít hơn một Medium duy nhất bạn tìm ra. ⇒ Động cơ đi tìm chỗ **ít người nhìn**: contract "tiện ích", QA, tích hợp bên thứ ba.
> - **Trọng số severity** ⇒ động cơ chấm cao hơn thực tế. Chống lại nó: xem [[Severity Classification]].
> - **Bug bounty theo tiền có nguy cơ** ⇒ động cơ tìm bug lớn và bỏ qua bug nhỏ.
> - **Báo cáo QA gộp** ⇒ động cơ nộp hàng loạt finding sinh máy. Judge trừ điểm việc này — xem [[Static Analysis Tools]].

## 3. Chọn contest nào

| Tiêu chí | Vì sao |
|---|---|
| **Nhỏ (< 1.500 nSLOC)** | Đọc hết được trong thời gian có |
| **Lĩnh vực bạn hiểu** | Bug logic nghiệp vụ cần hiểu nghiệp vụ |
| **Ngôn ngữ bạn đọc được** | Nhưng đừng loại trừ ngôn ngữ khác — xem [[Cross-case Patterns]] |
| **Ít warden** | Ít trùng lặp hơn |
| **Có tài liệu tốt** | Không có spec thì không biết cái gì sai |
| **Chưa audit lần nào** | Mật độ bug cao hơn — như Coded Estate |

## 4. Quy trình cho một contest

1. **Ngày 1:** đọc README, docs, hỏi sponsor trong Discord. Lập bảng actor/tài sản/giả định — [[Scoping and Threat Modeling]].
2. **Ngày 2:** recon, chạy công cụ, dựng bản đồ, xem coverage.
3. **Ngày 3–N:** đọc sâu, ghi **file câu hỏi** — [[Manual Review Techniques]].
4. **N+1:** đuổi theo giả thuyết theo thứ tự tác động × độ tin, viết PoC — [[Proof of Concept Discipline]].
5. **Ngày cuối:** viết finding — [[Writing a Finding]]. **Chừa ít nhất 20% thời gian cho bước này.**
6. **Sau khi có báo cáo:** bảng ba cột — [[Case Study Method]].

## 5. Cạm bẫy

1. **Bắt đầu quá lớn.** Contest 20.000 dòng cho người mới là bỏ tiền mua thất vọng.
2. **Không chừa thời gian viết.** Finding viết vội bị chấm thấp hoặc bị loại.
3. **Nộp spam sinh máy.** Bị trừ điểm và ảnh hưởng hồ sơ.
4. **Đuổi theo bug đầu tiên** và không bao giờ đọc hết codebase.
5. **Không hỏi sponsor.** Discord của contest là nơi giả định ngầm được nói ra.
6. **Đo bản thân bằng tiền thưởng.** Contest đầu tiên nên đo bằng **số finding hợp lệ**, kể cả QA.
7. **Bỏ cuộc sau contest đầu.** Tỉ lệ tìm được gì trong contest đầu là thấp cho gần như tất cả mọi người.

## 6. Checklist trước khi vào một contest

- [ ] Codebase bao nhiêu nSLOC? Đọc hết được trong thời gian có không?
- [ ] Có bao nhiêu warden dự kiến? Mức trùng lặp ước tính?
- [ ] Lĩnh vực này mình có hiểu nghiệp vụ không?
- [ ] Có tài liệu/spec không? Không có spec thì không biết cái gì là sai
- [ ] Đã audit lần nào chưa? Báo cáo cũ ở đâu?
- [ ] Đã đọc quy tắc severity của **nền tảng này** chưa? (chúng khác nhau)
- [ ] Đã chia thời gian theo pha và **chừa ≥20% cho việc viết finding** chưa?
- [ ] Đã lên lịch làm bảng ba cột sau khi báo cáo công bố chưa?

## Nền tảng và tài nguyên

| Tên | Link |
|---|---|
| Code4rena | https://code4rena.com/ |
| Sherlock | https://audits.sherlock.xyz/contests |
| Cantina | https://cantina.xyz/ |
| Immunefi | https://immunefi.com/ |
| Solodit | https://solodit.xyz/ — tra finding từ mọi nền tảng |
| Secureum | https://secureum.substack.com/ |

## Tham khảo

- [Code4rena — Judging criteria](https://docs.code4rena.com/awarding/judging-criteria/severity-categorization)
- [Sherlock — Judging docs](https://docs.sherlock.xyz/audits/judging/judging)
- [Immunefi — Vulnerability severity classification](https://immunefi.com/immunefi-vulnerability-severity-classification-system-v2-3/)

## Liên kết

[[Learning Roadmap]] · [[Severity Classification]] · [[Contest Severity vs Real Risk]] · [[Writing a Finding]] · [[Blockchain]]
