---
tags: [defi, flash-loan]
status: evergreen
---
# Flash Loans

> Flash loan không phải là lỗ hổng. Nó là **công cụ xoá bỏ rào cản vốn** — biến mọi cuộc tấn công "cần rất nhiều tiền" thành "cần một transaction". Nó không tạo ra bug; nó làm cho bug đã có trở nên khai thác được bởi bất kỳ ai.

## 1. Cơ chế

```solidity
function flashLoan(address receiver, address token, uint256 amount, bytes calldata data) external {
    uint256 before = IERC20(token).balanceOf(address(this));
    IERC20(token).transfer(receiver, amount);
    IFlashBorrower(receiver).onFlashLoan(token, amount, fee, data);   // ← toàn bộ tấn công ở đây
    require(IERC20(token).balanceOf(address(this)) >= before + fee, "not repaid");
}
```

Vì mọi thứ nằm trong một transaction, **nếu không trả được thì cả transaction revert** — người cho vay không bao giờ mất tiền. Đó là lý do phí rất thấp và ai cũng dùng được.

## 2. Dùng hợp pháp

| Mục đích | Vì sao cần flash loan |
|---|---|
| Arbitrage | Không cần vốn nằm chờ |
| Thanh lý | Vay để trả nợ, nhận thế chấp, bán, trả lại |
| Đổi thế chấp | Không cần đóng vị thế trước |
| Refinance giữa các protocol | Trả nợ A, mở nợ B, trong một tx |
| **Dựng PoC khi audit** | Xem [[Proof of Concept Discipline]] |

## 3. Cái nó biến thành khai thác được

| Lỗ hổng gốc | Flash loan làm gì |
|---|---|
| Dùng spot price làm oracle | Bơm giá trong một tx — xem [[Oracle Manipulation]] |
| Quyền biểu quyết theo số dư tức thời | Mua phiếu trong một tx — xem [[Governance Attacks]] |
| Phần thưởng theo snapshot số dư | Bơm số dư đúng lúc snapshot |
| Vault rỗng, làm tròn | Inflation attack — xem [[Yield Vaults]] |
| Bất kỳ logic nào phụ thuộc "số dư lớn" | Ai cũng có số dư lớn trong một tx |

> [!warning] Câu hỏi rà soát
> Với mỗi hàm, hỏi: **"nếu người gọi có 1 tỉ đô trong đúng transaction này, họ làm được gì?"** Nếu câu trả lời khác với "không gì đặc biệt", đó là finding.

## 4. Phòng thủ — và cái không hiệu quả

| Biện pháp | Hiệu quả |
|---|---|
| **Không dùng giá trị tức thời làm nguồn sự thật** (TWAP, snapshot theo block trước, checkpoint) | ✅ gốc rễ |
| **Tách hành động qua hai block** (commit–reveal, timelock, cooldown) | ✅ mạnh |
| Chặn contract (`msg.sender == tx.origin`) | ❌ bypass được từ constructor, và phá vỡ smart account |
| Chặn flash loan bằng cách kiểm số dư | ❌ có nhiều nguồn flash loan, kể cả flash mint |
| Giới hạn kích thước giao dịch | ⚠️ giảm chứ không chặn |

Chỉ có hai biện pháp đầu là thật. Chúng đều là biện pháp **thiết kế**, không phải biện pháp **kiểm tra**.

## 5. Cạm bẫy

1. **Flash mint** (DAI, một số token) cho vay lượng chưa từng tồn tại — giới hạn không phải TVL.
2. **ERC-3156** chuẩn hoá giao diện; `onFlashLoan` phải trả về đúng magic value, nếu không callback giả mạo được.
3. **Reentrancy qua callback flash loan** — callback là lời gọi ra ngoài giữa chừng. Xem [[Reentrancy]].
4. **Phí flash loan tính sai** ⇒ vault mất tiền từng chút.
5. **Đọc `totalSupply` hoặc `balanceOf` giữa flash loan** ⇒ số liệu sai. Read-only reentrancy dạng khác.
6. **Giả định "cần vốn lớn" là rào cản.** Không còn đúng từ 2020.

## 6. Checklist áp dụng

- [ ] Có logic nào phụ thuộc vào **số dư tức thời** của người gọi không (vote, reward, giá, tỉ lệ)?
- [ ] Với mỗi hàm: nếu người gọi có vốn vô hạn trong đúng tx này, họ làm được gì?
- [ ] Nguồn giá có thao túng được trong một tx không?
- [ ] Có snapshot/checkpoint theo block **trước đó** không?
- [ ] Có hành động nào nên bị tách qua hai block không?
- [ ] Nếu protocol **cung cấp** flash loan: phí tính đúng chưa? Có kiểm hoàn trả sau callback không? Callback có reentrancy guard không?
- [ ] Có dùng `msg.sender == tx.origin` làm biện pháp phòng thủ không? (không hiệu quả)
- [ ] Đã tính flash mint, không chỉ flash loan chứ?

## Tham khảo

- [EIP-3156: Flash Loans](https://eips.ethereum.org/EIPS/eip-3156)
- [Aave — Flash Loans documentation](https://docs.aave.com/developers/guides/flash-loans)
- [Rekt — bZx](https://rekt.news/) — vụ flash loan đầu tiên gây chú ý (2020)
- [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/) — nhiều bài dựa trên flash loan

## Liên kết

[[Oracle Manipulation]] · [[Economic Attacks]] · [[Governance Attacks]] · [[AMM Mechanics]] · [[Blockchain]]
