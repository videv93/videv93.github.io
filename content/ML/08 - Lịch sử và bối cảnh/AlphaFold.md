---
tags: [ml, lịch-sử, deepmind, khoa-học]
status: evergreen
---
# AlphaFold

> Lần đầu tiên một hệ thống machine learning giải được một **bài toán lớn của khoa học tự nhiên** — và được trao giải Nobel Hoá học vì điều đó. Đáng học không chỉ vì kết quả, mà vì nó cho thấy một bài toán ML "đúng" trông như thế nào.

## 1. Bài toán

**Protein folding:** dự đoán cấu trúc **3D** của một protein từ chuỗi **1D** các amino acid.

Vì sao quan trọng: protein là nền tảng của sự sống, gần như mọi chức năng sinh học phụ thuộc vào chúng, và **chức năng của một protein được cho là gắn liền với cấu trúc của nó**. Biết cấu trúc giúp ích rất nhiều cho phát triển thuốc và hiểu bệnh tật.

Vì sao khó: đây là một **thách thức lớn kéo dài 50 năm** của khoa học. Số cách một chuỗi amino acid có thể gập lại là thiên văn; xác định cấu trúc bằng thực nghiệm (tinh thể học tia X, cryo-EM) mất **hàng tháng tới hàng năm** cho **một** protein.

### CASP — thang đo làm nên tất cả

**Critical Assessment of Techniques for Protein Structure Prediction**: cuộc thi tổ chức hai năm một lần, trong đó các nhóm dự đoán cấu trúc của những protein mà **cấu trúc thực nghiệm đã được xác định nhưng chưa công bố**.

Đây là ví dụ hoàn hảo của [[ML Problem Framing]] làm đúng: có **ground truth thực nghiệm**, do **bên thứ ba độc lập** giữ, và không ai có thể gian lận. Xem [[DeepMind]] về mô hình nghiên cứu này.

## 2. Kết quả

| Năm | Sự kiện | Kết quả |
|---|---|---|
| 2016 | DeepMind bắt đầu dự án | Hassabis gọi nó là *"lighthouse project"* — khoản đầu tư lớn đầu tiên về nhân lực và tài nguyên vào một bài toán khoa học thực tế, quan trọng |
| **12/2018** | **AlphaFold thắng CASP13** | Dự đoán cấu trúc chính xác nhất cho **25/43** protein. GDT trung vị **< 60** ở hạng mục free-modelling |
| **11/2020** | **AlphaFold 2 thắng CASP14** | **GDT trung vị 87.0**; sai số tổng thể **nhỏ hơn bề rộng một nguyên tử (< 1 Ångström)** |
| — | Kết luận của ban tổ chức CASP | Bài toán **về cơ bản đã được giải** |
| 2021 | Gập toàn bộ | **200 triệu protein** đã biết của khoa học |
| 2021 | Công bố | **AlphaFold Protein Structure Database**, mở và miễn phí, hợp tác với **EMBL-EBI** |
| 2024 | **Giải Nobel Hoá học** | [[Demis Hassabis]] và **John M. Jumper** |

**GDT (Global Distance Test)** là thang 0–100 đo độ khớp giữa cấu trúc dự đoán và cấu trúc thực nghiệm. Bước nhảy từ **< 60** (2018) lên **87.0** (2020) trong hai năm là mức cải thiện hiếm thấy trong bất kỳ lĩnh vực nào.

Đạt độ chính xác **cạnh tranh được với phương pháp thực nghiệm** — trong khi nhanh hơn nhiều bậc độ lớn và rẻ hơn nhiều bậc độ lớn.

> [!note] Vì sao mở dữ liệu là quyết định quan trọng ngang kết quả kỹ thuật
> 200 triệu cấu trúc được công bố **miễn phí cho bất kỳ ai**. Điều này biến AlphaFold từ một thành tựu của một công ty thành hạ tầng cho toàn bộ ngành sinh học. Tác động thực tế của một mô hình thường được quyết định bởi **cách nó được phân phối**, không chỉ bởi độ chính xác của nó.

## 3. Vì sao bài toán này "đúng" cho ML

| Đặc điểm | AlphaFold | Bài toán thực tế điển hình |
|---|---|---|
| Ground truth khách quan | ✅ Cấu trúc thực nghiệm | ❌ Nhãn phải tự tạo — xem [[FADAML Case Study]] |
| Thang đo được cộng đồng chấp nhận | ✅ GDT | ❌ Tranh cãi về metric |
| Đánh giá độc lập | ✅ CASP, mù | ❌ Tự đánh giá |
| Dữ liệu huấn luyện chất lượng cao | ✅ Protein Data Bank | ❌ Dữ liệu bẩn, thiếu |
| Cấu trúc vật lý ràng buộc bài toán | ✅ Hoá học ràng buộc không gian nghiệm | ❌ Ít ràng buộc |
| Giá trị nếu giải được | ✅ Khổng lồ, rõ ràng | Thường mơ hồ |

Danh sách này là một **bộ tiêu chí** đáng dùng khi bạn chọn bài toán để đầu tư nghiêm túc. Càng nhiều ô ✅, dự án càng có khả năng thành công đo được.

## 4. Giới hạn — cần nói rõ

- **Dự đoán cấu trúc tĩnh, không phải động lực học.** Protein chuyển động, đổi hình dạng khi liên kết. AlphaFold cho một ảnh chụp.
- **Kém hơn với protein không có họ hàng trong dữ liệu.** Nó dựa nhiều vào thông tin tiến hoá từ multiple sequence alignment; protein "mồ côi" khó hơn nhiều.
- **Cấu trúc không tự động cho ra chức năng.** Biết hình dạng là bước đầu, không phải câu trả lời cuối cho sinh học.
- **Không dự đoán tốt tác động của đột biến điểm.** Một thay đổi amino acid có thể đổi hoàn toàn hành vi mà cấu trúc dự đoán gần như không đổi.
- **"Đã giải" là kết luận của ban tổ chức CASP về một hạng mục cụ thể**, không phải tuyên bố rằng mọi câu hỏi về protein đã xong.

## 5. Checklist rút ra

- [ ] Bài toán của tôi có ground truth khách quan không?
- [ ] Thang đo của tôi có được cộng đồng/khách hàng chấp nhận không?
- [ ] Có ai độc lập đánh giá kết quả của tôi không, hay tôi tự chấm?
- [ ] Dữ liệu huấn luyện của tôi có chất lượng cao và đủ lớn không?
- [ ] Có ràng buộc vật lý/nghiệp vụ nào thu hẹp không gian nghiệm không? Tôi đã tận dụng chưa?
- [ ] Giá trị nếu giải được có đủ lớn để biện minh cho nỗ lực không?
- [ ] Tôi có nêu rõ giới hạn của mô hình cùng với kết quả không?

## Tham khảo

- Jumper et al., "Highly accurate protein structure prediction with AlphaFold", *Nature* 596:583–589, 2021 — [doi:10.1038/s41586-021-03819-2](https://doi.org/10.1038/s41586-021-03819-2)
- **AlphaFold Protein Structure Database** (DeepMind × EMBL-EBI) — [alphafold.ebi.ac.uk](https://alphafold.ebi.ac.uk/)
- Nobel Prize in Chemistry 2024 — [nobelprize.org](https://www.nobelprize.org/prizes/chemistry/2024/summary/)
- CASP — Protein Structure Prediction Center — [predictioncenter.org](https://predictioncenter.org/)

## Liên kết

[[DeepMind]] · [[Demis Hassabis]] · [[ML Problem Framing]] · [[FADAML Case Study]] · [[ML]]
