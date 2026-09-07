---
tags: [solidity, mẫu, access-control]
status: evergreen
---
# Access Control Patterns

> Access control không phải là "có modifier hay không". Nó là câu hỏi: **với mỗi hàm, ai gọi được, và nếu người sai gọi được thì mất gì?** Bốn trong chín High của Coded Estate là hậu quả của việc trả lời hụt câu hỏi thứ hai.

## 1. Bốn mẫu chuẩn

| Mẫu | Dùng khi | Rủi ro |
|---|---|---|
| `Ownable` | Một admin, protocol nhỏ | Một private key = toàn bộ protocol |
| `Ownable2Step` | Như trên, an toàn hơn | ✅ nên là mặc định — chuyển nhầm owner không mất contract |
| `AccessControl` (roles) | Nhiều vai trò | `DEFAULT_ADMIN_ROLE` vẫn là single point |
| Timelock + multisig | Protocol có tiền thật | Độ trễ là tính năng, không phải phiền toái |

**Two-step là quy tắc, không phải tuỳ chọn** cho mọi việc chuyển quyền. Nhưng two-step cài sai thì tệ hơn one-step: Gondi L-10 chỉ ra `addCallers()` có quy trình hai bước nhưng **không kiểm `_callers.length == proposedCallers.length`**, nên một phần danh sách đề xuất im lặng không được thêm.

## 2. Ba câu hỏi cho mỗi hàm thay đổi state

1. **Ai gọi được?** (`external` không modifier = cả thế giới)
2. **Gọi lúc nào được?** (state machine — xem [[Broken State Lifecycle]])
3. **Gọi với tham số nào được?** (đây là chỗ hay hụt nhất — xem [[Missing Input Validation]])

Ba câu hỏi này tách biệt. Coded Estate H-01 vượt qua câu 1 và 2 nhưng chết ở câu 3: attacker **được phép** gọi `withdrawtolandlord()` sau khi có approval, và hàm đó cho phép chỉ định người nhận cùng số tiền tuỳ ý.

## 3. Mẫu sai hay gặp

### a. Permissionless nhưng có hậu quả
`liquidateLoan()` của Gondi ai gọi cũng được — đúng thiết kế, vì thanh lý cần chạy được kể cả khi protocol im lặng. Nhưng kết hợp với `updateLiquidationContract()` thì thành vũ khí: attacker **front-run** lệnh đổi liquidator để đẩy khoản vay vào contract sắp bị bỏ, khoá tài sản thế chấp ở đó (Gondi L-08).

> [!warning] Permissionless + admin setter = front-running
> Mỗi khi có một hàm ai cũng gọi được và một setter admin đổi tham số mà hàm đó dùng, hãy hỏi: **chuyện gì xảy ra nếu hai lệnh này vào cùng một block, theo thứ tự xấu nhất?** Xem [[Front-running and MEV]].

### b. Đặc quyền không có trần
Coded Estate QA-02: owner set được `fee = 100%`, chủ nhà nhận 0 doanh thu. Mọi tham số admin cần **min/max cứng trong code**, không chỉ dựa vào "admin sẽ không làm vậy". Tương tự Gondi L-07: `minLockPeriod` không có trần ⇒ đặt quá cao thì không khoản vay nào refinance được nữa.

### c. Quyền đơn phương huỷ nghĩa vụ
Coded Estate M-01: chủ nhà `withdrawtolandlord()` rút phần lớn tiền cọc, rồi `rejectreservationforlongterm()` để đuổi khách — khách chỉ được hoàn phần còn lại. Hai đặc quyền hợp lệ riêng lẻ, **gộp lại thành ăn cắp**. Luôn xét các đặc quyền theo **tổ hợp**, không theo từng cái.

### d. Tham số bị bỏ qua
Coded Estate M-09: hàm `mint(owner, ...)` nhận tham số `owner` nhưng gán `owner = info.sender`, rồi **phát event báo đã set đúng tham số**. Không mất tiền, nhưng contract nói dối về việc nó vừa làm — và hệ thống off-chain tin lời nó.

## 4. Cạm bẫy khác

1. **`initialize()` không có guard** ⇒ ai cũng chiếm được contract. Xem [[Proxy and Upgradeability]].
2. **Modifier kiểm biến đổi được giữa chừng.** Xem [[Contract Structure and Visibility]].
3. **Whitelist theo *code* address chứ không theo *execution* address.** Kakarot H-01: contract A `delegatecall` vào contract B đã whitelist ⇒ A dùng được đặc quyền của B. Xem [[Delegatecall and Context Confusion]].
4. **`tx.origin` để auth.** Xem [[Ethereum Account Model]].
5. **Bỏ quên hàm `internal` gọi được từ contract kế thừa** mà không kiểm quyền.
6. **Không có đường thu hồi quyền.** Kakarot QA-04: sau khi admin đổi native token, các account contract cũ **không cách nào cấp lại approval** — mất một tính năng vĩnh viễn.

## 5. Checklist áp dụng

- [ ] Liệt kê mọi hàm thay đổi state, kèm cột "ai gọi được". Có hàng nào là "bất kỳ ai" ngoài ý muốn không?
- [ ] Quyền admin dùng one-step hay two-step? Có multisig/timelock không?
- [ ] Mọi tham số admin có min/max cứng không? (fee, thời gian khoá, tỉ lệ)
- [ ] Xét **tổ hợp** đặc quyền: admin/owner làm gì tệ nhất nếu họ độc hại?
- [ ] Mọi setter đổi địa chỉ contract: còn việc dang dở nào phụ thuộc địa chỉ cũ không? Front-run được không?
- [ ] Mọi tham số đầu vào có thực sự được dùng không? (Coded Estate M-09)
- [ ] Có quy trình hai bước nào không kiểm khớp giữa đề xuất và xác nhận không? (Gondi L-10)
- [ ] Có đường thu hồi/khôi phục cho mọi quyền đã cấp không?

## Tham khảo

- [OpenZeppelin AccessControl](https://docs.openzeppelin.com/contracts/api/access) và [Ownable2Step](https://docs.openzeppelin.com/contracts/api/access#Ownable2Step)
- [Coded Estate M-01](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/37) — tổ hợp đặc quyền thành ăn cắp
- [Coded Estate M-09](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/9) — tham số bị bỏ qua
- [Kakarot H-01](https://github.com/code-423n4/2024-09-kakarot-findings/issues/124) — whitelist theo code address
- [SWC-105: Unprotected Ether Withdrawal](https://swcregistry.io/docs/SWC-105)

## Liên kết

[[Missing Input Validation]] · [[Delegatecall and Context Confusion]] · [[Front-running and MEV]] · [[Governance Attacks]] · [[Blockchain]]
