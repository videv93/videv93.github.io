---
tags: [devops, aws, cloud, architecture, framework]
status: evergreen
---
# AWS Well-Architected Framework

> Khung đánh giá kiến trúc chuẩn của AWS, gồm **6 trụ cột**. Giá trị lớn nhất của nó không phải là danh sách best practice — mà là **bộ câu hỏi buộc bạn phải trả lời trước khi hệ thống lên production**, thay vì sau sự cố đầu tiên.

## 1. Sáu trụ cột

### 🛠 Operational Excellence — Vận hành xuất sắc
- **Tập trung:** Khả năng vận hành, giám sát hệ thống và liên tục cải tiến quy trình.
- **Nguyên tắc cốt lõi:** Thực thi quy trình dưới dạng mã nguồn (**Infrastructure as Code**), thực hiện thay đổi **nhỏ có thể đảo ngược**, **tự động hoá phản ứng với sự cố**, cập nhật quy trình vận hành thường xuyên.
- Thực hành: [[Infrastructure as Code]], [[CI-CD Pipeline]], runbook, [[Incident Response & Postmortem]], game day.

### 🔒 Security — Bảo mật
- **Tập trung:** Bảo vệ thông tin, dữ liệu, hệ thống và tài sản cloud.
- **Nguyên tắc cốt lõi:** Áp dụng **quyền tối thiểu (Least Privilege)**, phân quyền ở mọi lớp (**Defense in Depth**), **mã hoá dữ liệu khi lưu trữ (at rest) và khi truyền tải (in transit)**, tự động hoá phản ứng an ninh, **ghi log toàn bộ hoạt động (Traceability)**.
- Thực hành: [[AWS Security & Identity]], [[Secrets Management]], [[DevSecOps]].

### ♻️ Reliability — Độ tin cậy
- **Tập trung:** Khả năng phục hồi của hệ thống khi gặp sự cố và tự động mở rộng để đáp ứng nhu cầu.
- **Nguyên tắc cốt lõi:** **Tự động phục hồi từ sự cố (Auto-healing)**, **thử nghiệm quy trình khôi phục (Chaos Engineering)**, kiến trúc phân tán để tránh điểm lỗi đơn lẻ (**No Single Point of Failure**), thiết kế hệ thống **co giãn theo tải**.
- Thực hành: Multi-AZ, health check, [[SRE & Reliability Engineering]], test restore backup.

### ⚡ Performance Efficiency — Hiệu năng tối ưu
- **Tập trung:** Sử dụng tài nguyên điện toán hiệu quả để đáp ứng yêu cầu hệ thống và duy trì hiệu quả khi công nghệ thay đổi.
- **Nguyên tắc cốt lõi:** **Dân chủ hoá công nghệ nâng cao** (dùng dịch vụ Managed/Serverless thay vì tự cài đặt), **triển khai toàn cầu trong vài phút** (Multi-Region/Edge Location), ưu tiên các mô hình kiến trúc **không máy chủ (Serverless-First)**.
- Thực hành: chọn đúng instance type, caching, CDN, đo trước khi tối ưu.

### 💰 Cost Optimization — Tối ưu hóa chi phí
- **Tập trung:** Chạy hệ thống mang lại giá trị kinh doanh cao nhất với chi phí thấp nhất.
- **Nguyên tắc cốt lõi:** **Chi trả theo mức độ sử dụng (Pay-as-you-go)**, **đo lường hiệu quả tổng thể**, **ngừng chi trả cho các tài nguyên không dùng đến**, tận dụng **Managed Services để giảm chi phí vận hành con người**.
- Thực hành: [[Cloud Cost Optimization]].

### 🌱 Sustainability — Độ bền vững & Môi trường
- **Tập trung:** Tối thiểu hoá tác động môi trường khi vận hành các workload trên Cloud.
- **Nguyên tắc cốt lõi:** **Hiểu rõ tác động carbon/năng lượng**, **tối ưu hoá mức độ sử dụng tài nguyên (Resource Utilization)**, **giảm thiểu việc di chuyển và lưu trữ dữ liệu thừa**, liên tục **áp dụng phần cứng/phần mềm hiệu quả hơn**.
- Thực hành: right-sizing, Graviton (ARM), lifecycle policy cho S3, tắt môi trường dev ngoài giờ.
> Trụ cột này trùng lặp rất nhiều với Cost Optimization — tối ưu tài nguyên thường vừa giảm tiền vừa giảm carbon.

## 2. Ma trận đánh đổi giữa các trụ cột
| Quyết định | Được | Mất |
|---|---|---|
| Multi-AZ, Multi-Region | Reliability ↑↑ | Cost ↑↑, Complexity ↑ |
| Serverless thay vì EC2 | Operational ↑, Sustainability ↑ | Cost có thể ↑ ở tải cao, vendor lock-in ↑ |
| Mã hoá mọi thứ bằng CMK | Security ↑ | Cost ↑ (phí KMS), Performance ↓ chút |
| Spot Instances | Cost ↓↓ | Reliability ↓ nếu app không chịu được gián đoạn |
| Cache mạnh | Performance ↑, Cost ↓ | Complexity ↑, rủi ro dữ liệu cũ |
> Well-Architected **không** đòi tối đa cả 6 trụ. Nó đòi bạn **biết mình đang đánh đổi cái gì và vì sao**.

## 3. Cách chạy một buổi review (WAFR)
1. Chọn **một workload** cụ thể, không review "cả công ty".
2. Dùng **AWS Well-Architected Tool** (miễn phí trong Console) — nó có sẵn bộ câu hỏi cho từng trụ cột.
3. Với mỗi câu: trả lời *có / không / không áp dụng* + bằng chứng.
4. Ghi lại **rủi ro** theo mức HRI (High Risk Issue) / MRI (Medium).
5. Chuyển HRI thành backlog item có người sở hữu và deadline.
6. Review lại sau **mỗi thay đổi kiến trúc lớn**, tối thiểu 6–12 tháng một lần.
> Ngoài 6 trụ còn có **Lenses** cho từng lĩnh vực (Serverless, SaaS, Machine Learning, Container Build) — dùng khi workload đặc thù.

## 4. Cạm bẫy khi áp dụng
- ❌ **Coi là bài kiểm tra để đạt điểm** → trả lời cho đẹp thay vì trung thực. Không ai bị chấm điểm; giá trị nằm ở việc phát hiện rủi ro.
- ❌ **Review một lần rồi thôi** → kiến trúc thay đổi, kết quả review hết hạn.
- ❌ **Chỉ mời kiến trúc sư** → thiếu người trực on-call, những người biết sự thật về vận hành.
- ❌ **Áp dụng mọi khuyến nghị bất kể ngữ cảnh** → Multi-Region cho một internal tool 20 người dùng là lãng phí.
- ❌ **Bỏ qua Cost và Sustainability** vì chúng "không phải kỹ thuật".

## 5. Checklist audit nhanh một kiến trúc (rút gọn 6 trụ)
**Operational Excellence**
- [ ] Hạ tầng có nằm hoàn toàn trong code không?
- [ ] Có thể deploy và rollback bằng một lệnh không?
- [ ] Mỗi alert có runbook tương ứng?

**Security**
- [ ] Least privilege, không có access key dài hạn?
- [ ] Mã hoá at-rest và in-transit ở mọi nơi?
- [ ] CloudTrail + GuardDuty bật, log không thể bị xoá?

**Reliability**
- [ ] Chạy ≥ 2 AZ, không có single point of failure?
- [ ] Đã test restore backup và test failover trong 90 ngày?
- [ ] Có RTO/RPO được viết ra và đã kiểm chứng?

**Performance Efficiency**
- [ ] Đã đo trước khi tối ưu (có metric p99, không phải cảm giác)?
- [ ] Instance type/size chọn dựa trên số liệu?
- [ ] Có dùng cache/CDN cho nội dung phù hợp?

**Cost Optimization**
- [ ] Có tag chuẩn để quy trách nhiệm chi phí?
- [ ] Có Savings Plans/Spot cho tải ổn định?
- [ ] Có báo cáo tài nguyên nhàn rỗi hằng tháng?

**Sustainability**
- [ ] Mức sử dụng tài nguyên trung bình có > 40% không?
- [ ] Môi trường non-prod có tự tắt ngoài giờ?
- [ ] Dữ liệu cũ có lifecycle chuyển tầng/xoá?

## Tham khảo
- AWS Well-Architected Framework (trang chủ): https://aws.amazon.com/architecture/well-architected/
- AWS Docs — Well-Architected Framework whitepaper: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
- AWS Well-Architected Tool: https://aws.amazon.com/well-architected-tool/
- AWS — Lenses (Serverless, SaaS, ML…): https://docs.aws.amazon.com/wellarchitected/latest/userguide/lenses.html
- AWS — Sustainability Pillar: https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html

## Liên kết
[[AWS Security & Identity]] · [[AWS Global Infrastructure & Networking]] · [[Cloud Cost Optimization]] · [[SRE & Reliability Engineering]] · [[Infrastructure as Code]] · [[DevOps]]
