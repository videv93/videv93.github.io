---
tags: [audit, lỗ-hổng, cross-chain]
status: evergreen
---
# Cross-domain Message Bugs

> Khi một message đi từ miền này sang miền khác — L1↔L2, chain↔chain, EVM↔VM chủ — nó mất ba thứ: **danh tính người gửi**, **ngữ cảnh phí**, và **khả năng huỷ**. Ba finding của Kakarot đúng vào ba thứ đó.

## 1. Ba thứ bị mất và ba lỗi tương ứng

| Bị mất | Cơ chế bù | Lỗi trong seed |
|---|---|---|
| Danh tính người gửi | **Address aliasing** | Kakarot M-02 — alias cả EOA |
| Ngữ cảnh phí | Gas do giao thức đặt | Kakarot M-11 — hardcode gas limit |
| Khả năng huỷ | API cancel | Kakarot M-03 — **không có** |

## 2. Address aliasing — vì sao nó tồn tại

Vì `CREATE` sinh địa chỉ từ `(sender, nonce)`, **cùng một địa chỉ có thể tồn tại trên L1 và L2 với bytecode hoàn toàn khác nhau**. Nếu một contract L1 gửi được message sang L2 với đúng địa chỉ của nó, nó **giả mạo được contract L2 cùng địa chỉ**.

Optimism giải bằng cách cộng một hằng số:
```
alias = L1_contract_address + 0x1111000000000000000000000000000000001111
```

| Nguồn giao dịch | Địa chỉ sender trên L2 |
|---|---|
| EOA trên L2 | chính nó |
| **EOA trên L1** | **chính nó — KHÔNG alias** |
| Contract trên L1 | `địa chỉ + 0x1111…1111` |

**Kakarot M-02:** Kakarot kế thừa mẫu này nhưng áp alias cho **cả EOA**, vì thiếu phép kiểm `msg.sender != tx.origin`. ⇒ Mọi access control ở phía L2 dựa vào địa chỉ người gửi L1 đều fail.

Tranh luận severity đáng chú ý: sponsor chấm Low (*"không có rủi ro bảo mật nào"*), judge giữ Medium (*"chức năng bị hỏng/chặn ngoài ý muốn"*), sponsor viện dẫn tài liệu C4 rằng đây là "function incorrect as to spec" = Low. Judge giữ nguyên. Xem [[Contest Severity vs Real Risk]].

## 3. Phí ở miền không có mempool

**Kakarot M-11:** `handle_l1_message` không phải giao dịch người dùng gửi qua RPC — nó do OS của Starknet gọi. Người gửi L1 **không có cơ hội đặt gas limit**. Code hardcode `gas_limit = 2.100.000.000`, `gas_price = 1`.

Chuỗi hậu quả:
1. `max_fee = 2.100.000.000` bị **trừ trước** khỏi số dư cache của người gửi.
2. Việc chuyển ETH sau đó dùng số dư đã trừ ⇒ **không đủ** ⇒ fail.
3. Fail ở dạng `EXCEPTIONAL_HALT` ⇒ **tiêu toàn bộ gas** ⇒ tính đủ `max_fee`.
4. Người dùng có đủ tiền cho cả giá trị chuyển lẫn phí thật (21.000), nhưng giao dịch revert **và vẫn bị trừ phí tối đa**.

Và mitigation review lại tìm ra bản vá cũng sai: PR-1584 nâng gas limit lên `2^64 − 1`, tạo ra một đường **vượt qua giới hạn gas của block** mà RPC vẫn áp. Xem [[Mitigation Review]].

## 4. Message không huỷ được

**Kakarot M-03:** chỉ có hàm gửi L1→L2 và hàm tiêu thụ message L2, **không có `cancelL1toL2Message`**. Nếu contract phía L2 gặp sự cố, phí đã trả mất vĩnh viễn — trong khi Starknet **có** cơ chế huỷ chuẩn.

Tranh luận severity ở đây là một cột mốc đáng lưu: sponsor viện dẫn *"loss of fees is a LOW"*; judge — người **tự nhận đã tham gia viết chính quy tắc đó** — giải thích rằng câu đầy đủ là *"mất phí nên được coi như mọi khoản mất vốn khác"*, chỉ có **mất dust** mới là Low. Giữ Medium.

## 5. Cạm bẫy chung

1. **Tin `msg.sender` ở phía nhận** mà không kiểm nó đến từ bridge/messenger hợp lệ.
2. **Không phân biệt "message đã gửi" và "message đã được thực thi".** Giữa hai mốc có thể là hàng giờ.
3. **Giả định thứ tự.** Message có thể tới không theo thứ tự gửi.
4. **Replay giữa các chain** vì thiếu `chainId`/domain trong dữ liệu ký. Xem [[Signatures and EIP-712]].
5. **Không có đường thoát khi bridge dừng.** Tiền kẹt bao lâu? Ai mở lại được?
6. **Giả định EVM-equivalence.** Xem [[EVM Execution Model]] và [[Bridge Risk]].
7. **Lỗi ở miền đích không truyền được về miền nguồn** ⇒ người dùng không biết vì sao hỏng.

## 6. Checklist áp dụng

- [ ] Phía nhận kiểm `msg.sender == bridge` trước, rồi mới đọc "người gửi gốc" từ payload chứ?
- [ ] Có aliasing không? Nó áp cho contract **và** EOA hay chỉ contract?
- [ ] Ai trả phí ở miền đích? Người dùng đặt được gas limit không? Nếu không, giá trị hardcode có hợp lý không?
- [ ] Message thất bại thì tiền/phí đi đâu? Có retry không? Có cancel không?
- [ ] Message có thể tới **không đúng thứ tự** không? Logic có chịu được không?
- [ ] Message có thể replay ở chain khác không?
- [ ] Nếu bridge dừng vĩnh viễn, tài sản có lối thoát không?
- [ ] Chain đích lệch EVM ở chỗ nào? Đã đọc trang "differences" của chain đó chưa?

## Tham khảo

- [Optimism — Address aliasing](https://docs.optimism.io/stack/differences#address-aliasing)
- [Starknet — L2→L1 message cancellation](https://docs.starknet.io/architecture-and-concepts/network-architecture/messaging-mechanism/)
- [Kakarot M-02](https://github.com/code-423n4/2024-09-kakarot-findings/issues/111) · [M-03](https://github.com/code-423n4/2024-09-kakarot-findings/issues/105) · [M-11](https://github.com/code-423n4/2024-09-kakarot-findings/issues/29)
- [C4 — Loss of fees severity](https://docs.code4rena.com/awarding/judging-criteria/severity-categorization)

## Liên kết

[[Bridge Risk]] · [[Factory and CREATE2]] · [[Severity Classification]] · [[Case Kakarot]] · [[Blockchain]]
