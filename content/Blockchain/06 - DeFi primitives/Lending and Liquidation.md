---
tags: [defi, lending]
status: evergreen
---
# Lending and Liquidation

> Protocol cho vay là một cỗ máy chỉ đứng vững nhờ **thanh lý chạy đúng lúc**. Mọi thứ làm cho thanh lý chậm, đắt, hoặc không thực hiện được đều biến thành nợ xấu — và nợ xấu là mất tiền của người cho vay.

## 1. Bốn đại lượng

| Đại lượng | Công thức | Vai trò |
|---|---|---|
| **LTV** | `nợ / giá trị thế chấp` | Bao nhiêu được vay |
| **Health factor** | `(thế chấp × ngưỡng thanh lý) / nợ` | < 1 ⇒ bị thanh lý |
| **Liquidation bonus** | phần thưởng cho người thanh lý | Phải đủ lớn để có người làm |
| **Close factor** | phần nợ được trả trong một lần thanh lý | Cân giữa tốc độ và thiệt hại cho người vay |

## 2. Hai mô hình

| | **Pooled** (Aave, Compound) | **Peer-to-peer / NFT-backed** (Gondi) |
|---|---|---|
| Định giá thế chấp | Oracle liên tục | Thẩm định lúc phát hành offer |
| Thanh lý | Bất kỳ ai, có thưởng | **Đấu giá** |
| Rủi ro chính | Oracle sai, nợ xấu lan | Thanh khoản NFT, đấu giá thao túng |
| Tài sản thế chấp | Fungible, dễ bán | **Không fungible, có thể không bán được** |

Gondi trong seed thuộc cột phải — xem [[NFT Finance]].

## 3. Chỗ thanh lý gãy

| Nguyên nhân | Hậu quả |
|---|---|
| Oracle đứng/sai | Thanh lý nhầm hoặc không thanh lý |
| Thanh lý không có lãi (bonus < gas) | Không ai làm ⇒ nợ xấu |
| Vị thế quá lớn so với thanh khoản | Thanh lý làm sập giá ⇒ lỗ lan |
| **Hàm thanh lý bị DoS** | Xem [[Denial of Service Patterns]] |
| **Đổi contract liquidator giữa chừng** | Gondi L-08 — tài sản kẹt ở liquidator cũ |
| Người vay tự chặn thanh lý | Token blocklist, contract nhận revert |

> [!warning] `liquidate()` phải chạy được trong mọi hoàn cảnh
> Đây là hàm quan trọng nhất trong bất kỳ protocol cho vay nào. Mọi phụ thuộc của nó — oracle, token transfer, vòng lặp, contract bên ngoài — là một điểm chết tiềm năng. Với mỗi phụ thuộc, hỏi: *nếu cái này fail, ai mất tiền?*

## 4. Bốn cơ chế tinh tế hơn

- **Refinance / renegotiate**: khoản vay được thay bằng khoản tốt hơn. Điều kiện "tốt hơn" phải chặt — Gondi L-02 cho thấy `_checkStrictlyBetter` revert bằng panic thay vì custom error khi điều kiện không thoả.
- **Tranche**: nhiều người cho vay ở các mức ưu tiên khác nhau. Thứ tự trả nợ khi thanh lý là bất biến then chốt. Gondi L-06: một chữ ký cho `addNewTranche` dùng được cho `refinanceFull` ⇒ lender bị đẩy vào tranche rủi ro hơn cái họ đồng ý.
- **Lock period**: khoá khoản vay khỏi bị refinance ngay. Gondi L-07: `minLockPeriod` **không có trần** ⇒ đặt quá cao thì không gì refinance được nữa.
- **Bad debt socialization**: khi thế chấp không đủ, ai chịu? Phải có câu trả lời rõ trong thiết kế.

## 5. Cạm bẫy

1. **Lãi tính bằng `block.number`** — sai trên chain có thời gian block khác.
2. **Làm tròn có lợi cho người vay** ⇒ rò rỉ tích luỹ. Xem [[Integer and Precision Bugs]].
3. **Không có ngưỡng nợ tối thiểu** ⇒ vị thế bụi không đáng thanh lý ⇒ nợ xấu vụn.
4. **Thanh lý toàn phần thay vì một phần** ⇒ phạt quá nặng, và cần thanh khoản lớn.
5. **Giá thế chấp và giá nợ dùng oracle khác nhau** với độ trễ khác nhau.
6. **Thanh lý sinh lợi lớn** ⇒ bot cạnh tranh ⇒ động cơ làm người khác không thanh lý được. Xem [[Front-running and MEV]].
7. **Không xét kịch bản oracle chết**: có chế độ dừng khẩn cấp không?

## 6. Checklist áp dụng

- [ ] `liquidate()` phụ thuộc vào những gì? Mỗi phụ thuộc fail thì ai mất tiền?
- [ ] Thanh lý có lãi ở mọi kích thước vị thế không? Có ngưỡng nợ tối thiểu không?
- [ ] Có ai chặn được thanh lý vị thế của mình không (token blocklist, contract revert, DoS)?
- [ ] Oracle nào định giá thế chấp và nợ? Cùng nguồn, cùng độ trễ chứ?
- [ ] Có kịch bản oracle đứng không? Protocol làm gì khi đó?
- [ ] Nợ xấu ai chịu? Cơ chế đó có được kiểm thử không?
- [ ] Với tranche: thứ tự ưu tiên trả nợ có bất biến không? Có chữ ký nào dùng chéo giữa các hàm không?
- [ ] Mọi tham số quản trị (lock period, bonus, close factor) có min/max không?
- [ ] Đổi contract liquidator có bỏ rơi auction đang chạy không?

## Tham khảo

- [Aave V3 Technical Paper](https://github.com/aave/aave-v3-core/blob/master/techpaper/Aave_V3_Technical_Paper.pdf)
- [Compound III (Comet) docs](https://docs.compound.finance/)
- [Gondi report (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — L-02, L-06, L-07, L-08
- [Euler — Liquidation design](https://docs.euler.finance/)

## Liên kết

[[Oracles]] · [[NFT Finance]] · [[Denial of Service Patterns]] · [[Economic Attacks]] · [[Blockchain]]
