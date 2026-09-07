---
tags: [defi, rủi-ro, kinh-tế]
status: evergreen
---
# Economic Attacks

> Lớp tấn công mà **code chạy đúng như thiết kế**. Không có `require` nào thiếu, không có overflow nào. Sai nằm ở **giả định kinh tế** — và vì vậy không công cụ nào tìm được, và nhiều auditor coi nó ngoài phạm vi.

## 1. Bốn dạng

| Dạng | Cơ chế | Ví dụ |
|---|---|---|
| **Thao túng giá** | Đổi nguồn giá rồi khai thác | [[Oracle Manipulation]] |
| **Vòng phản xạ** | Cơ chế ổn định lại tăng tốc sụp đổ | UST — xem [[Stablecoins]] |
| **Lệch động cơ** | Việc cần làm không có lãi, hoặc việc có hại lại có lãi | Thanh lý không đủ thưởng |
| **Chiếm dụng tài nguyên** | Chiếm thứ khan hiếm rẻ hơn giá trị của nó | Coded Estate M-06 |

## 2. Lệch động cơ — dạng dễ bỏ sót nhất

Mọi cơ chế cần **người ngoài hành động** đều là một giả định kinh tế:

| Cơ chế | Giả định | Hỏng khi |
|---|---|---|
| Thanh lý | Có người thấy lãi | Gas cao, vị thế nhỏ, thưởng thấp |
| Keeper / cron | Có người trả tiền chạy | Hết ngân sách, keeper offline |
| Đấu giá | Có người tham gia | Tài sản không thanh khoản — xem [[NFT Finance]] |
| Arbitrage giữ peg | Arb có lãi | Thị trường hoảng loạn, thanh khoản cạn |
| Báo cáo gian lận (fraud proof) | Người báo có thưởng | Cửa sổ quá ngắn, chi phí quá cao |

**Câu hỏi rà soát:** với mỗi cơ chế phụ thuộc người ngoài, tính lợi nhuận kỳ vọng của họ **trong điều kiện thị trường tệ nhất**, không phải điều kiện bình thường.

## 3. Chiếm dụng tài nguyên — ví dụ từ seed

**Coded Estate M-06:** đặt chỗ dài hạn **không cần trả trước gì cả**, và chỗ đã đặt bị khoá cho mọi loại thuê khác. Chi phí cho attacker: gas. Thiệt hại cho chủ nhà: mất toàn bộ cơ hội cho thuê.

Judge tóm tắt đúng bản chất: *"Có thể lập luận đây là thiết kế bình thường — nhiều web2 cũng cho đặt chỗ miễn phí. Nhưng đây là smart contract, gửi giao dịch từ nhiều địa chỉ rất dễ, và sau khi deploy thì rất khó ngăn."*

> [!warning] Rào cản của web2 không tồn tại trên chain
> Xác minh danh tính, giới hạn theo IP, nhân viên chăm sóc khách hàng, khả năng cấm tài khoản — **không có cái nào tồn tại**. Mọi cơ chế dựa vào "chi phí xã hội" của việc lạm dụng đều không có chi phí đó ở đây.

## 4. Ba câu hỏi kinh tế cho mọi protocol

1. **Ai được lợi khi hệ thống hoạt động đúng, và họ có được trả đủ không?**
2. **Ai được lợi khi hệ thống hoạt động sai, và họ tốn bao nhiêu để làm nó sai?**
3. **Điều gì xảy ra khi ai cũng muốn thoát cùng lúc?**

Câu ba là câu ít được hỏi nhất và là câu giết nhiều protocol nhất. Xem [[Stablecoins]].

## 5. Cạm bẫy

1. **Coi rủi ro kinh tế là "ngoài phạm vi audit".** Nó là phạm vi của người mất tiền.
2. **Mô hình hoá bằng điều kiện bình thường.** Mọi tham số phải kiểm ở điều kiện cực đoan: gas \$500/tx, thanh khoản bằng 0, giá lệch 90%.
3. **Giả định người tham gia lý trí.** Trong hoảng loạn thì không.
4. **Bỏ qua tương tác giữa các cơ chế.** Coded Estate M-01: hai đặc quyền hợp lệ gộp lại thành ăn cắp.
5. **Tham số quản trị không có trần.** Coded Estate QA-02: phí đặt được 100%.
6. **Giả định chi phí gas là rào cản.** Trên L2 nó gần bằng 0.
7. **Không tính chi phí vốn bằng 0.** Xem [[Flash Loans]].

## 6. Checklist áp dụng

- [ ] Liệt kê mọi cơ chế cần **người ngoài hành động**. Lợi nhuận kỳ vọng của họ trong điều kiện tệ nhất là bao nhiêu?
- [ ] Có tài nguyên khan hiếm nào chiếm được với chi phí gần 0 không?
- [ ] Với mỗi tham số quản trị: giá trị cực đoan nhất gây ra gì? Có trần không?
- [ ] Chuyện gì xảy ra khi mọi người rút cùng lúc?
- [ ] Chuyện gì xảy ra khi gas đắt gấp 100 lần?
- [ ] Chuyện gì xảy ra khi thanh khoản thị trường bằng 0?
- [ ] Có xét **tổ hợp** các đặc quyền/cơ chế, không chỉ từng cái?
- [ ] Có giả định nào dựa vào "chi phí xã hội" hoặc "không ai làm vậy" không?
- [ ] Đã tính với giả định vốn của attacker là vô hạn (flash loan) chưa?

## Tham khảo

- [Coded Estate M-06](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/22) — chiếm dụng tài nguyên miễn phí
- [Coded Estate M-01](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/37) — tổ hợp đặc quyền
- [Gauntlet / Chaos Labs — economic risk research](https://www.gauntlet.xyz/resources)
- [Rekt News leaderboard](https://rekt.news/leaderboard/) — phần lớn các vụ lớn nhất là kinh tế, không phải kỹ thuật
- [Daian et al., *Flash Boys 2.0*](https://arxiv.org/abs/1904.05234)

## Liên kết

[[Oracle Manipulation]] · [[Flash Loans]] · [[Governance Attacks]] · [[Denial of Service Patterns]] · [[Blockchain]]
