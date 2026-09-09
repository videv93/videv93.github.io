---
tags: [marketing, kênh]
status: growing
---
# Paid Search and Shopping

> ⚠️ **Đọc [[Attributed vs Incremental]] trước khi áp dụng note này.**

> Paid search bắt **nhu cầu đã tồn tại**. Đó là điểm mạnh (ý định cao) và là trần của nó (không tạo ra nhu cầu mới). Đội chỉ chạy paid search sẽ tăng trưởng tới đúng giới hạn của lượng tìm kiếm hiện có, rồi dừng.

## 1. Cơ chế đấu giá

Vị trí quảng cáo **không** bán cho người trả cao nhất. Xếp hạng dựa trên tổ hợp giá thầu và chất lượng:

```
Ad Rank ≈ giá thầu × chất lượng (CTR dự kiến, độ liên quan, trải nghiệm trang đích) + tác động tiện ích mở rộng
```

Hệ quả thực dụng: **cải thiện chất lượng làm giảm chi phí thật sự**. Trang đích liên quan và quảng cáo khớp truy vấn rẻ hơn cho cùng một vị trí. Đây là đòn bẩy lớn hơn việc chỉnh giá thầu.

## 2. Cấu trúc chiến dịch

| Loại truy vấn | Ý định | Cách xử |
|---|---|---|
| **Thương hiệu** | Đã biết bạn | ⚠️ Rẻ và trông đẹp, nhưng **incrementality thường thấp** — nhiều người đã click organic |
| Đối thủ | Đang so sánh | Đắt, tỉ lệ chuyển đổi thấp, đôi khi đáng |
| Chung / danh mục | Đang tìm giải pháp | Đắt nhất, khối lượng lớn nhất |
| Đuôi dài, cụ thể | Ý định rất cao | ✅ Nơi hiệu quả nhất thường nằm |

> [!warning] Bẫy paid brand search
> Quảng cáo trên chính tên thương hiệu mình luôn cho ROAS đẹp trong báo cáo — vì người đó vốn đã định vào trang của bạn. Kiểm bằng test tắt (geo holdout): tắt ở một số vùng, xem tổng lượng truy cập có giảm không. Rất nhiều đội phát hiện phần lớn chi phí đó không tạo thêm gì. Xem [[Incrementality Testing]].

## 3. Tự động hoá — cái gì còn trong tay bạn

Đấu thầu thông minh và chiến dịch tự động (Performance Max và tương đương) đã lấy đi phần lớn quyền điều khiển. Cái **còn lại** và thực sự quan trọng:

| Đòn bẩy | Vì sao quan trọng |
|---|---|
| **Tín hiệu chuyển đổi** | Thuật toán tối ưu theo cái bạn khai. Khai sai mục tiêu = tối ưu sai. Đây là đòn bẩy số 1 |
| **Giá trị chuyển đổi thật** | Truyền giá trị biên, không phải doanh thu gộp, để tránh tối ưu vào đơn không lời |
| **Creative & copy** | [[Creative Testing and Iteration]] |
| **Trang đích** | Ảnh hưởng cả chất lượng lẫn chuyển đổi |
| **Từ khoá phủ định** | Chặn lãng phí, vẫn cần làm thủ công |
| **Dữ liệu sản phẩm (Shopping)** | Tiêu đề, hình, thuộc tính — quyết định phần lớn hiệu quả |

Nghiên cứu từ khoá và ý định tìm kiếm có nhà ở [[Keyword Research]] và [[Organic Search as a Marketing Channel]].

## 4. Cạm bẫy

- **Tối ưu vào chuyển đổi vi mô.** Tối ưu theo "xem trang giá" cho ra nhiều lượt xem trang giá và ít đơn hàng.
- **Truyền doanh thu gộp cho sản phẩm biên lợi nhuận khác nhau.** Thuật toán sẽ đẩy sản phẩm nhiều doanh thu, ít lời.
- **Tin ROAS của nền tảng.** Nền tảng chấm bài thi của chính nó — [[Attributed vs Incremental]].
- **Bỏ qua từ khoá phủ định** trong chiến dịch tự động.
- **Trang đích chung chung.** Truy vấn cụ thể dẫn tới trang chủ là cách đốt tiền nhanh nhất.
- **Không kiểm incrementality của brand search.**

## 5. Checklist áp dụng

- [ ] Tín hiệu chuyển đổi tôi khai có phải là **kết quả kinh doanh thật** không?
- [ ] Tôi có truyền **giá trị biên** thay vì doanh thu gộp không?
- [ ] Tôi đã test incrementality của **brand search** chưa?
- [ ] Mỗi nhóm truy vấn có trang đích tương ứng không?
- [ ] Danh sách từ khoá phủ định có được rà thường xuyên không?
- [ ] Với Shopping: dữ liệu sản phẩm (tiêu đề, hình) có được tối ưu không?

## Tham khảo

- Google Ads Help — Ad Rank & Quality Score — https://support.google.com/google-ads/answer/1752122
- Google Ads Help — Smart Bidding & value-based bidding — https://support.google.com/google-ads/answer/7065882
- Blake, Nosko & Tadelis — "Consumer Heterogeneity and Paid Search Effectiveness: A Large-Scale Field Experiment" (eBay), *Econometrica* 2015 — https://www.econometricsociety.org/publications/econometrica/2015/01/01/consumer-heterogeneity-and-paid-search-effectiveness-large
- Microsoft Advertising — documentation — https://help.ads.microsoft.com/

## Liên kết

[[Incrementality Testing]] · [[Organic Search as a Marketing Channel]] · [[Attributed vs Incremental]] · [[Unit Economics CAC LTV Payback]] · [[Marketing]]
