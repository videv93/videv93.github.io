---
tags: [audit, lỗ-hổng]
status: evergreen
---
# Broken State Lifecycle

> Mỗi đối tượng trong protocol có một **máy trạng thái ngầm**: tạo → hoạt động → kết thúc → dọn dẹp. Máy trạng thái đó hầu như không bao giờ được viết ra, nên các chuyển trạng thái thiếu cũng không bao giờ được kiểm.

## 1. Bốn dạng gãy

| Dạng | Triệu chứng | Ví dụ trong seed |
|---|---|---|
| **Xoá không sạch** | Xoá đối tượng cha, dữ liệu con mồ côi | Coded Estate H-09 |
| **Kết thúc bỏ qua nghĩa vụ** | Đóng mà chưa trả xong | Coded Estate M-05 |
| **Sửa được lúc không nên sửa** | Cửa sổ giữa "xong" và "quyết toán" | Coded Estate H-07 |
| **Chuyển đổi không có đường về** | Đổi rồi không khôi phục được | Gondi L-08, Kakarot QA-04 |

## 2. Xoá không sạch — bản đắt nhất

**Coded Estate H-09:** `burn` một token xoá **toàn bộ** dữ liệu gắn với nó, bao gồm vector `rentals` chứa số tiền cọc của người thuê. `burn` chỉ kiểm "người gọi có phải chủ/được approve không" — **không kiểm có rental nào đang chạy không**.

⇒ Chủ nhà burn token, dữ liệu đặt phòng biến mất, người thuê gọi hàm huỷ thì revert vì không tìm thấy rental. **Tiền nằm trong contract vĩnh viễn, không hàm nào chạm tới được.**

Trong Solidity, dạng này có một biến thể kỹ thuật riêng: `delete myStruct` **không xoá mapping bên trong struct**. Xem [[Solidity Reference Types]].

> [!warning] Quy tắc: xoá là một phép toán có điều kiện tiên quyết
> Không bao giờ cho phép xoá/burn/đóng khi còn **nghĩa vụ tài chính chưa kết thúc**. Câu hỏi rà soát: *"sau khi hàm này chạy, có ai còn tiền trong contract mà không còn đường lấy ra không?"*

## 3. Kết thúc bỏ qua nghĩa vụ

**Coded Estate M-05:** `cancelreservationafterapprovalforlongterm()` **không hoàn tiền gì cả**, dù chủ nhà đã cấu hình `cancellation.percentage = 90`. Hàm tương ứng cho short-term thì có. Tệ hơn, `finalizelongtermrental()` lại trừ theo **phí protocol** (`get_fee`) thay vì theo tỉ lệ huỷ mà chủ nhà đặt.

Sponsor trả lời *"đây là logic có chủ đích"*. Judge giữ Medium với lý do: **không có tài liệu nào nói vậy**, nên chủ nhà có kỳ vọng khác. Xem [[Contest Severity vs Real Risk]].

Bài học: nếu hai đường (short/long, A/B) làm cùng một việc mà chỉ một đường có bước hoàn tiền, đó là finding — trừ khi có tài liệu nói rõ.

## 4. Sửa được lúc không nên sửa

**Coded Estate H-07:** hàm `check_can_edit_short` chỉ kiểm `now > check_out_time`. Nó **không** kiểm rental đã được `finalize` chưa. Cửa sổ giữa hai mốc đó cho phép chủ nhà đổi `denom` từ token rẻ sang token đắt rồi mới quyết toán.

Đây là mẫu chung: **"đã hết hạn" ≠ "đã kết thúc"**. Một đối tượng chưa kết thúc cho tới khi mọi dòng tiền của nó đã chảy xong.

## 5. Chuyển đổi không có đường về

- **Gondi L-08:** đổi `_loanLiquidator` khi còn auction đang chạy ⇒ auction cũ không settle được (modifier `onlyLiquidator` từ chối), tài sản kẹt ở liquidator cũ.
- **Kakarot QA-04:** sau khi admin đổi native token, các `account_contract` đã khởi tạo **không có cách nào cấp lại approval**. Chức năng mất vĩnh viễn.
- **Kakarot M-03:** message L1→L2 **không có API huỷ**. Nếu contract L2 lỗi, phí mất luôn.

Quy tắc: mỗi setter đổi địa chỉ/tham số hệ thống phải trả lời hai câu — *"còn việc dở nào phụ thuộc giá trị cũ không?"* và *"có đường thoát cho những việc dở đó không?"*

## 6. Cách vẽ máy trạng thái khi audit

1. Liệt kê các **thực thể** (loan, rental, listing, auction, position).
2. Với mỗi thực thể, liệt kê **mọi hàm chạm vào nó**.
3. Vẽ trạng thái và mũi tên. Đánh dấu hàm nào hợp lệ ở trạng thái nào.
4. **Tìm ô trống**: có hàm nào gọi được ở trạng thái mà bảng không nói gì không?
5. Với mỗi trạng thái cuối, hỏi: **tiền của ai còn nằm lại?**

Bước 5 là bước bắt được cả H-09 lẫn M-05.

## 7. Checklist áp dụng

- [ ] Đã vẽ máy trạng thái cho mọi thực thể giữ tiền chưa?
- [ ] Mọi hàm xoá/burn/đóng: có kiểm nghĩa vụ chưa kết thúc không?
- [ ] `delete` có chạm tới mapping/mảng động lồng bên trong không?
- [ ] Mỗi trạng thái cuối: có ai còn tiền mà không còn đường rút không?
- [ ] Hai đường song song (short/long, A/B): danh sách bước của chúng có khớp không?
- [ ] "Đã hết hạn" và "đã quyết toán" có bị lẫn không? Có cửa sổ giữa hai mốc không?
- [ ] Mọi setter hệ thống: việc dang dở có bị bỏ rơi không? Có đường khôi phục không?
- [ ] Có hành động một chiều nào (đổi token, xoá facet, huỷ đăng ký) không có đường về không?

## Tham khảo

- [Coded Estate H-09](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/2) — burn xoá dữ liệu, tiền kẹt
- [Coded Estate H-07](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/4) — cửa sổ trước finalize
- [Coded Estate M-05](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/26) — huỷ không hoàn tiền
- [Gondi L-08 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — đổi liquidator khoá tài sản
- [Solidity docs — delete](https://docs.soliditylang.org/en/latest/types.html#delete)

## Liên kết

[[Missing Input Validation]] · [[Stale Approval and Delegation]] · [[Solidity Reference Types]] · [[Invariant Discovery]] · [[Blockchain]]
