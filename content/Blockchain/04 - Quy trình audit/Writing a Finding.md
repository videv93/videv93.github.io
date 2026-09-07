---
tags: [audit, quy-trình, báo-cáo]
status: evergreen
---
# Writing a Finding

> Một finding không được chấp nhận vì nó đúng. Nó được chấp nhận vì **người đọc tự dựng lại được kịch bản trong đầu và tin rằng nó xảy ra**. Toàn bộ kỹ thuật viết finding nằm ở việc rút ngắn khoảng cách từ câu đầu tiên tới niềm tin đó.

## 1. Cấu trúc chuẩn

Cấu trúc mà cả ba báo cáo trong seed đều dùng:

```markdown
## [H-0X] <Một câu nói rõ AI làm được GÌ, hậu quả GÌ>

### Impact / Summary
1–3 câu. Ai mất gì, bao nhiêu, trong điều kiện nào.

### Description
Cơ chế. Trích code kèm đường dẫn `file.sol#L123`. Đánh dấu dòng lỗi bằng `|>`.

### Example Scenario / Attack Path
Đánh số các bước. Mỗi bước là một hành động cụ thể của một actor cụ thể.

### Proof of Concept
Test chạy được + lệnh chạy + output kỳ vọng.

### Recommended Mitigation
Diff cụ thể, không phải "nên kiểm tra kỹ hơn".

### Assessed type
```

## 2. Tiêu đề — phần được đọc nhiều nhất

| ❌ Kém | ✅ Tốt (từ seed) |
|---|---|
| "Thiếu kiểm tra trong `setbidtobuy`" | "**`setbidtobuy` allows token purchase even when sale is no longer listed**" |
| "Vấn đề với approval" | "**Cancelling bid doesn't clear token approval of bidder, allows malicious bidder to steal any tokens listing for sale with auto-approve enabled**" |
| "Sai kiểu dữ liệu" | "**Use of `u64` for `price_per_day` limits handling tokens with 18 decimals**" |

Công thức: **`<hàm/thành phần>` + hành vi sai + hậu quả**. Tiêu đề dài mà cụ thể tốt hơn tiêu đề ngắn mà mơ hồ.

## 3. Bước Attack Path — thứ thuyết phục judge

Ví dụ mẫu, nguyên văn từ Coded Estate H-05:

> 1. Bid on a token with `auto_approve` set to true, gaining approval.
> 2. Immediately cancel the bid, receiving a refund while retaining the approval.
> 3. Call `transfer_nft` to transfer the token to themselves without payment, as their bid has been deleted from cancelling process.

Ba câu. Mỗi câu một lời gọi hàm. Không có từ nào thừa. Judge đọc ba dòng này là đủ hiểu.

**Quy tắc:** nếu attack path của bạn cần hơn 7 bước hoặc chứa chữ "giả sử" nhiều lần, hãy hỏi lại liệu nó có thật sự khả thi không.

## 4. Con số thắng tính từ

Coded Estate M-04: warden mất finding từ Medium xuống Low, rồi lấy lại được **chỉ bằng một phép tính**:

> *"Xét kịch bản khoản cọc là `5_000e18` token. Chủ token sẽ phải chia thành `5_000e18 / (2^64−1) = 271,05 → 272` giao dịch riêng biệt…"*

Judge nâng lại Medium và tự làm tiếp phép tính: ~1.632 lần gọi, nếu mỗi lần ~\$1 thì gần **5% phí trên tổng số tiền**.

> [!warning] Luôn định lượng tác động
> "Tốn nhiều gas", "cồng kềnh", "có thể mất tiền" là những câu bị hạ severity. "1.632 giao dịch", "5% phí", "\$990 lấy từ tiền cọc của người dùng khác" thì không.

## 5. Mitigation — cụ thể tới mức copy được

| ❌ | ✅ (từ seed) |
|---|---|
| "Nên validate kỹ hơn" | "Disallow buying token with `sell.islisted` flag set to false/none." |
| "Sửa kiểu dữ liệu" | "Change type of `amount` to `u128` for consistency with other parts in the system." |
| "Xử lý revoke đúng" | "In `revokeDelegate()`, allow passing `bytes32 _rights` into `delegateERC721()`" |

Tốt hơn nữa: đưa **diff code**. Nhiều finding trong seed kèm hẳn đoạn code sửa.

Khi có nhiều phương án, nêu cả hai kèm đánh đổi — như Coded Estate H-06: *"Không cho đổi denom khi còn bid đang hoạt động"* **HOẶC** *"dùng mapping riêng lưu từng bid"*, kèm cảnh báo phương án đầu có thể gây deadlock cho người bán.

## 6. Cạm bẫy

1. **Nói quá tác động.** Warden Coded Estate M-04 tự thừa nhận: *"Tôi có thể đã nói quá tác động trong báo cáo (không rút được tiền)"* — và điều đó khiến judge hạ severity. Nói **đúng** tác động mạnh hơn nói to.
2. **Gộp nhiều bug vào một finding.** Mỗi bug một issue; judge tính điểm theo issue.
3. **Không dẫn dòng code.** `src/lib/loans/MultiSourceLoan.sol#L496` — luôn có.
4. **PoC không chạy được.** Xem [[Proof of Concept Discipline]].
5. **Bỏ qua điều kiện tiên quyết.** Nếu bug cần `auto_approve == true`, nói rõ — và nói luôn vì sao điều kiện đó hợp lý.
6. **Viết cho mình.** Người đọc là judge, chưa từng nhìn codebase này 8 tiếng như bạn.
7. **Không đọc lại severity của mình.** Nộp High cho một vấn đề QA làm giảm uy tín cho mọi finding còn lại của bạn.

## 7. Checklist áp dụng

- [ ] Tiêu đề có nêu **hàm + hành vi sai + hậu quả** không?
- [ ] Câu đầu tiên có nói rõ ai mất gì không?
- [ ] Attack path có được đánh số, mỗi bước một hành động cụ thể không?
- [ ] Tác động đã được **định lượng bằng số** chưa?
- [ ] Mọi tham chiếu code có kèm `file#Lxxx` không?
- [ ] Có PoC chạy được, kèm lệnh chạy và output kỳ vọng không?
- [ ] Mitigation có cụ thể tới mức copy vào code được không?
- [ ] Điều kiện tiên quyết đã được nêu và biện minh chưa?
- [ ] Severity tự chấm có khớp với [[Severity Classification]] không?
- [ ] Đã đọc lại và cắt mọi câu không thay đổi kết luận chưa?

## Tham khảo

- [Code4rena — Submission guidelines](https://docs.code4rena.com/roles/wardens/submission-policy)
- [Coded Estate M-04 — tranh luận severity bằng số](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/27)
- [Coded Estate H-05 — attack path mẫu 3 bước](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/6)
- [Solodit](https://solodit.xyz/) — đọc hàng nghìn finding để hiệu chỉnh văn phong

## Liên kết

[[Severity Classification]] · [[Proof of Concept Discipline]] · [[Contest Severity vs Real Risk]] · [[Audit Workflow]] · [[Blockchain]]
