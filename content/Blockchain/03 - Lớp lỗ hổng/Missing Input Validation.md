---
tags: [audit, lỗ-hổng]
status: evergreen
---
# Missing Input Validation

> Lớp lỗi **phổ biến nhất trong seed**: 6/9 High của Coded Estate được gán nhãn `Invalid Validation`. Không phải vì nó khó, mà vì nó nhàm — nó đòi hỏi liệt kê **mọi** tham số của **mọi** hàm và hỏi cùng một câu hỏi cho từng cái.

## 1. Ba dạng thiếu kiểm tra

| Dạng | Câu hỏi | Ví dụ trong seed |
|---|---|---|
| **Thiếu kiểm giá trị** | Tham số này có dải hợp lệ không? | H-03: không kiểm `bid == listed price` ⇒ mua NFT với giá 0 |
| **Thiếu kiểm trạng thái** | Trạng thái hiện tại có cho phép hành động này không? | H-02: không kiểm cờ `islisted` ⇒ mua được token đã gỡ bán |
| **Thiếu kiểm quan hệ** | Hai trường này có nhất quán với nhau không? | H-04: không kiểm `rental_type` ⇒ dùng hàm short-term cho long-term |

## 2. Bốn ví dụ đắt nhất trong seed

### H-03 — không kiểm giá khớp
`transfer_nft` không kiểm (a) số tiền bid có bằng giá niêm yết, và (b) người nhận có bid nào không. ⇒ Attacker `setbidtobuy` để có approval, gọi `transfer_nft` chuyển cho một địa chỉ **không có bid** (mặc định thanh toán 0), rồi huỷ bid lấy lại tiền. **NFT về tay không mất đồng nào.**

### H-04 — không dùng cờ đã có sẵn
Struct `Rental` **có** trường `rental_type` (short/long), nhưng **không hàm nào đọc nó**. Short-term và long-term dùng `denom` khác nhau. ⇒ Đặt phòng short-term bằng TokenX (\$0,01), huỷ bằng hàm long-term, được hoàn bằng USDC (\$1). Lãi 100 lần, lấy từ tiền của người dùng khác.

> **Đây là dạng đáng chú ý nhất:** dữ liệu để kiểm tra *đã có trong struct*. Không ai đọc nó. Khi review, mọi trường struct không xuất hiện ở vế phải của một phép so sánh nào là một cờ đỏ.

### H-06 — không kiểm nghĩa vụ đang dở
`setlistforsell` cho đổi `denom` **kể cả khi đang có bid**. ⇒ Bid bằng token rẻ, đổi denom sang token đắt, huỷ bid, nhận hoàn bằng token đắt.

### H-01 — không giới hạn người nhận và số tiền
`withdrawtolandlord()` cho phép chỉ định **người nhận** và **số tiền** tuỳ ý, chỉ cần có approval. Approval thì lấy được bằng cách đặt bid.

## 3. Mẫu nhận diện

> [!warning] Ba cờ đỏ đọc code
> 1. **Một trường struct không bao giờ được đọc.** (H-04)
> 2. **Một cờ boolean được set nhưng không được kiểm ở đường thực thi.** (H-02, `auto_approve` không dùng ở long-term — QA-03)
> 3. **Hàm nhận `address recipient` hoặc `uint amount` từ caller mà không ràng buộc.** (H-01)

Ba cờ này tìm được bằng `grep`, không cần đọc hết code:
```bash
# trường struct nào chỉ xuất hiện đúng 1-2 lần (nơi khai báo + nơi gán)?
grep -c "rental_type" src/**/*.sol
```

## 4. Cạm bẫy

1. **Kiểm ở một đường, quên đường kia.** Coded Estate H-08: `transfer_nft` có thanh toán, `send_nft` **không**. Mỗi khi có hai hàm làm cùng một việc, so sánh chúng dòng-đối-dòng.
2. **Kiểm đúng nhưng ở sai thời điểm.** Coded Estate H-07: `check_can_edit_short` kiểm "đã qua check-out chưa" nhưng không kiểm "đã quyết toán chưa" ⇒ có một cửa sổ để đổi `denom`.
3. **Kiểm ở frontend.** Không phải kiểm tra.
4. **`require` sau khi đã thay đổi state** — đúng nhưng lãng phí, và trong assembly thì có thể là sai.
5. **Underflow xảy ra trước `require`** ⇒ custom error không bao giờ ném (Gondi L-02). Kiểm trước, tính sau.
6. **Kiểm tổng mà không kiểm từng phần.** Gondi L-10: `addCallers` duyệt theo `_callers.length` mà không so với `proposedCallers.length`.
7. **Tin vào giới hạn của kiểu.** `uint8 percentage` vẫn nhận được 255; cần `require(p <= 100)`.

## 5. Checklist áp dụng

- [ ] Lập bảng: mỗi hàm `external`/`public` × mỗi tham số × "dải hợp lệ là gì". Ô nào trống là finding tiềm năng.
- [ ] Mọi trường trong struct: có chỗ nào **đọc** nó không? Nếu không, vì sao nó tồn tại?
- [ ] Mọi cờ boolean: được kiểm ở **mọi** đường thực thi liên quan chưa?
- [ ] Mọi tham số `address`: có kiểm `!= address(0)` không? Có ràng buộc phải là ai không?
- [ ] Mọi tham số tiền: có kiểm khớp với giá trị đã cam kết trước đó không?
- [ ] Mọi tham số phần trăm/bps: có trần không?
- [ ] Có **hai hàm nào làm cùng một việc** không? So sánh danh sách kiểm tra của chúng.
- [ ] Điều kiện "được phép sửa" có bao phủ **toàn bộ** vòng đời, hay chỉ một mốc?

## Tham khảo

- [Coded Estate H-03](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/12) · [H-04](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/7) · [H-06](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/5)
- [Coded Estate H-01](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/41) — người nhận và số tiền tuỳ ý
- [SWC-123: Requirement Violation](https://swcregistry.io/docs/SWC-123)
- [Trail of Bits — Building Secure Contracts: validation](https://secure-contracts.com/)

## Liên kết

[[Broken State Lifecycle]] · [[Access Control Patterns]] · [[Vulnerability Taxonomy]] · [[Case Coded Estate]] · [[Blockchain]]
