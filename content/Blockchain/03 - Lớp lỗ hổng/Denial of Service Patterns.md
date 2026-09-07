---
tags: [audit, lỗ-hổng, dos]
status: evergreen
---
# Denial of Service Patterns

> DoS trên chain không phải là làm sập server. Nó là: **làm cho một hàm bắt buộc phải chạy được không chạy được nữa**. Và trong DeFi, "bắt buộc phải chạy được" thường có nghĩa là "chỗ duy nhất để lấy tiền ra".

## 1. Sáu mẫu

| Mẫu | Cơ chế | Ví dụ |
|---|---|---|
| **Unbounded loop** | Attacker làm mảng dài, hàm vượt gas limit | Coded Estate M-02 |
| **Revert bubbling** | Một phần tử revert, cả batch chết | Airdrop push, blocklist token |
| **Chiếm chỗ miễn phí** | Giữ tài nguyên khan hiếm mà không trả gì | Coded Estate M-06 |
| **Chi phí phân mảnh** | Ép nạn nhân trả gas nhiều lần | Coded Estate M-04 |
| **Griefing bằng lỗi tầng dưới** | Đẩy lỗi lên tầng không bắt được | Kakarot M-07, M-08 |
| **Block stuffing** | Làm đầy block để chặn tx theo deadline | Đấu giá, thanh lý |

## 2. Unbounded loop — kinh điển

**Coded Estate M-02:** hàm huỷ đặt phòng duyệt qua vector `cancellation`. Chủ nhà set vector đó dài tuỳ ý qua `setlistforshorttermrental()`. ⇒ Người thuê **không huỷ được, không lấy lại được tiền cọc**.

Sponsor phản đối: *"Không ai set mảng dài như vậy, và transaction đó cũng không confirm được."* Judge vẫn giữ Medium. Lý do đúng: **đây không phải câu hỏi về hành vi thông thường mà là về hành vi độc hại có chủ đích** — và chủ nhà chính là người có động cơ không hoàn tiền.

Khuyến nghị: đặt **cap cứng** cho mọi mảng người dùng điều khiển.

## 3. Chiếm chỗ miễn phí

**Coded Estate M-06:** `setreservationforlongterm` cho đặt chỗ **không cần trả trước gì cả**, và chỗ đã đặt bị đánh dấu không khả dụng cho cả short-term lẫn long-term.

⇒ Một attacker với nhiều địa chỉ đặt kín lịch một bất động sản. Chủ nhà có thể từ chối tay, nhưng không phân biệt được đặt thật với đặt giả, và **thời gian chờ chính là thiệt hại** — khách thật đã đi thuê chỗ khác.

Judge cân nhắc kỹ: *"Có thể lập luận đây là thiết kế thường thấy — Airbnb cũng cho đặt miễn phí. Nhưng đây là smart contract, gửi tx từ nhiều địa chỉ rất dễ, và sau khi deploy thì rất khó ngăn."*

> [!warning] Quy tắc: mọi tài nguyên khan hiếm phải có giá
> Nếu giữ chỗ không tốn gì ngoài gas, thì trên chain nó **miễn phí về mặt thực tế**. Đặt cọc, phí huỷ, hoặc giới hạn số lượng đồng thời — chọn một.

## 4. Griefing bằng lỗi tầng dưới

**Kakarot M-07/M-08** là dạng tinh vi nhất trong seed. Trên EVM chuẩn, caller có thể bắt lỗi của callee — có cả thư viện chuyên dụng (`ExcessivelySafeCall` của LayerZero) để không bị returndata bomb.

Nhưng trong Kakarot, một lời gọi tới ERC-20 Starknet mà panic thì lỗi **nổi lên tận tầng RPC** — nghĩa là **cả transaction chết, bất kể caller phòng thủ kỹ đến đâu**. Bất kỳ contract nào cũng ép được điều đó bằng một lệnh transfer vượt số dư, hoặc bằng cách thu hồi approval native token của Kakarot (M-08).

> **Bài học chuyển được sang mọi L2/chain lạ:** biện pháp phòng thủ chỉ đúng trong mô hình thực thi mà nó được thiết kế cho. `try/catch` của Solidity không bắt được lỗi ở tầng dưới EVM (out-of-gas ở mức 1/64, panic của VM chủ, lỗi prover).

## 5. Cạm bẫy

1. **Push payment.** Trả tiền cho một danh sách trong vòng lặp: một người nhận revert (blocklist, contract không có `receive`, tốn gas vô hạn) là cả batch chết. **Luôn dùng pull.**
2. **Xoá phần tử giữa mảng** bằng cách dịch cả mảng — O(n) gas.
3. **Hàm bắt buộc chạy được nằm sau một lời gọi ngoài.** Thanh lý mà phải gọi oracle: oracle chết thì không thanh lý được, protocol tích nợ xấu.
4. **Deadline cứng + mempool công khai** ⇒ block stuffing.
5. **Nạn nhân trả gas cho dữ liệu attacker tạo ra** — mẫu chung của mọi griefing.
6. **Không có đường thoát khẩn cấp.** Nếu mọi thứ hỏng, có `emergencyWithdraw` không? Ai gọi được?
7. **Kiểu số quá hẹp ép chia nhỏ transaction** (Coded Estate M-04) — DoS bằng chi phí, không bằng revert.

## 6. Checklist áp dụng

- [ ] Liệt kê mọi vòng lặp. Với mỗi cái: ai điều khiển độ dài? Có cap không?
- [ ] Liệt kê mọi hàm **bắt buộc phải chạy được** (rút tiền, huỷ, thanh lý, settle). Mỗi cái có phụ thuộc gì có thể fail không?
- [ ] Có push payment nào không? Chuyển sang pull được không?
- [ ] Một người nhận độc hại có làm cả batch chết không?
- [ ] Có tài nguyên khan hiếm nào giữ được miễn phí không?
- [ ] Có `try/catch` nào giả định bắt được **mọi** lỗi không? Chain đích có thể ném lỗi không bắt được không?
- [ ] Có giới hạn returndata khi gọi contract ngoài không?
- [ ] Có đường thoát khẩn cấp không? Nó có phụ thuộc vào chính thứ đang hỏng không?

## Tham khảo

- [Coded Estate M-02](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/35) — vector không cap
- [Coded Estate M-06](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/22) — đặt chỗ miễn phí
- [Kakarot M-07](https://github.com/code-423n4/2024-09-kakarot-findings/issues/49) — panic vượt qua mọi phòng thủ
- [LayerZero `ExcessivelySafeCall`](https://github.com/LayerZero-Labs/endpoint-v1-solidity-examples/blob/main/contracts/libraries/ExcessivelySafeCall.sol)
- [SWC-113: DoS with Failed Call](https://swcregistry.io/docs/SWC-113) · [SWC-128: Block Gas Limit](https://swcregistry.io/docs/SWC-128)

## Liên kết

[[Gas Mechanics]] · [[Weird ERC20 Tokens]] · [[Solidity Reference Types]] · [[Economic Attacks]] · [[Blockchain]]
