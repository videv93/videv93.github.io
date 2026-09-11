---
tags: [marketing, martech, adobe]
status: growing
---
# Adobe Experience Cloud Overview

> ⚠️ **Đọc [[Vendor Playbook vs Marketing Evidence]] trước khi áp dụng note này.**

> Bộ công cụ marketing doanh nghiệp của Adobe. Note này là **bản đồ định hướng** — cái gì làm việc gì, và nó nằm ở đâu trong [[MarTech Stack Architecture]] — không phải hướng dẫn sử dụng.

> [!warning] `status: growing` — tên sản phẩm của Adobe đổi thường xuyên
> Adobe đổi tên và gộp/tách sản phẩm khá đều đặn. Kiểm tại Experience League trước khi tin bảng dưới. Nguyên tắc chọn công cụ ở mục 3 thì bền.

## 1. Các thành phần chính

| Sản phẩm                      | Việc                                  | Tương đương trong stack           |
| ----------------------------- | ------------------------------------- | --------------------------------- |
| **Experience Platform (AEP)** | Nền dữ liệu, hồ sơ thống nhất         | Nền tảng dữ liệu                  |
| **Real-Time CDP**             | Hợp nhất & kích hoạt phân khúc        | [[Customer Data Platform]]        |
| **Adobe Analytics**           | Phân tích hành vi, Analysis Workspace | [[Marketing Analytics Stack]]     |
| **Adobe Target**              | Test & cá nhân hoá                    | [[Personalization Engines]]       |
| **Journey Optimizer (AJO)**   | Điều phối hành trình đa kênh          | [[Marketing Automation]]          |
| **Marketo Engage**            | Automation B2B, chấm điểm lead        | [[Lead Generation and Nurture]]   |
| **Experience Manager (AEM)**  | CMS + DAM                             | Nội dung & tài sản                |
| **Workfront**                 | Quản lý công việc marketing           | [[Marketing Creative Operations]] |
| **Adobe Express / Firefly**   | Sản xuất tài sản                      | [[Adobe Express Workflow]]        |

## 2. Adobe Analytics vs GA4 — khác biệt đáng biết

|                  | Adobe Analytics                      | GA4                                |
| ---------------- | ------------------------------------ | ---------------------------------- |
| Mô hình dữ liệu  | Linh hoạt, tuỳ biến sâu (eVar, prop) | Sự kiện + tham số, cố định hơn     |
| Phân tích tự do  | ✅ Analysis Workspace rất mạnh        | Hạn chế hơn                        |
| Chi phí          | Cao, theo hợp đồng                   | Miễn phí / 360                     |
| Đường cong học   | Dốc                                  | Thoải hơn                          |
| Xuất dữ liệu thô | Có                                   | Có, qua BigQuery — [[GA4 for SEO]] |

## 3. Khi nào bộ công cụ này hợp lý

**Hợp** khi: tổ chức lớn, nhiều thương hiệu/thị trường, đã dùng Adobe cho sáng tạo, có đội vận hành martech chuyên trách, và yêu cầu quản trị dữ liệu chặt.

**Không hợp** khi: đội nhỏ, ít kênh, chưa có kỷ luật dữ liệu. Chi phí triển khai và vận hành vượt xa giá giấy phép — đây là điểm hay bị đánh giá thấp nhất.

> [!note] Đánh giá công cụ doanh nghiệp
> Áp quy trình mua ở [[MarTech Stack Architecture]]: đặc biệt là bước "ai vận hành sau khi mua" và bước "lấy dữ liệu ra thế nào". Với công cụ doanh nghiệp, chi phí rời bỏ rất cao — đó là quyết định nhiều năm, không phải quyết định một quý.
> Và lưu ý nguồn: tài liệu của Adobe mô tả sản phẩm Adobe. Để so sánh khách quan, cần nguồn ngoài — [[Vendor Playbook vs Marketing Evidence]].

## 4. Cạm bẫy

- **Mua trọn bộ rồi dùng 20%.** Rất phổ biến; rà soát mức sử dụng thực tế theo quý.
- **Triển khai mà không có kỷ luật dữ liệu trước** — [[Marketing Data Governance]].
- **Không có đội vận hành chuyên trách.** Bộ công cụ này cần người toàn thời gian.
- **Đánh giá thấp thời gian triển khai.** Thường tính bằng quý, không phải tuần.
- **Coi tài liệu nhà cung cấp là đánh giá khách quan.**
- **Không lên kế hoạch cho consent và quản trị dữ liệu** từ đầu.

## 5. Checklist áp dụng

- [ ] Tôi có đội vận hành martech chuyên trách không?
- [ ] Dữ liệu của tôi đã đủ kỷ luật để triển khai chưa?
- [ ] Tôi đã ước lượng chi phí **triển khai và vận hành**, không chỉ giấy phép, chưa?
- [ ] Tôi đã đối chiếu với nguồn đánh giá ngoài Adobe chưa?
- [ ] Kế hoạch consent và quản trị dữ liệu có từ đầu không?
- [ ] Tôi có rà soát mức sử dụng thực tế theo quý không?

## Tham khảo

- Adobe Experience League — tài liệu chính thức toàn bộ sản phẩm — https://experienceleague.adobe.com/
- Adobe — Experience Platform documentation — https://experienceleague.adobe.com/docs/experience-platform/landing/home.html
- Gartner — Magic Quadrant cho martech (nguồn đánh giá ngoài) — https://www.gartner.com/en/marketing
- Scott Brinker — ChiefMartec (bối cảnh thị trường martech) — https://chiefmartec.com/

## Liên kết

[[MarTech Stack Architecture]] · [[Customer Data Platform]] · [[Adobe Express Workflow]] · [[Adobe Marketing Specialist Course Map]] · [[Marketing]]
