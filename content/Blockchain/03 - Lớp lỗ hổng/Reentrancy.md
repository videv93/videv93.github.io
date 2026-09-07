---
tags: [audit, lỗ-hổng]
status: evergreen
---
# Reentrancy

> Reentrancy không phải là "gọi lại chính hàm đó". Nó là: **contract của bạn giao quyền điều khiển ra ngoài khi trạng thái nội bộ đang dở dang**. Mọi biến thể — cross-function, cross-contract, read-only — đều là cùng một câu đó.

## 1. Bốn biến thể

| Biến thể | Cơ chế | Guard `nonReentrant` có chặn không |
|---|---|---|
| **Single-function** | Gọi lại đúng hàm đó | ✅ |
| **Cross-function** | Gọi sang hàm khác cùng contract, chia sẻ state | ✅ nếu cả hai đều có guard |
| **Cross-contract** | Qua contract B rồi vòng lại A | ❌ nếu guard không dùng chung |
| **Read-only** | Gọi hàm `view` khi state dở dang, lấy số liệu sai | ❌ — `view` không có guard |

**Read-only reentrancy** là biến thể nguy hiểm nhất hiện nay: không đổi state của bạn, chỉ khiến một protocol *khác* đọc ra giá/tỉ lệ sai giữa lúc bạn đang chuyển trạng thái. Đây là gốc của các vụ Curve-pool integration 2022–2023.

## 2. CEI — Checks, Effects, Interactions

```solidity
function withdraw(uint256 amount) external nonReentrant {
    // 1. CHECKS
    require(balance[msg.sender] >= amount, "insufficient");
    // 2. EFFECTS — state xong TRƯỚC khi gọi ra ngoài
    balance[msg.sender] -= amount;
    // 3. INTERACTIONS
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok, "transfer failed");
}
```

Guard là lưới an toàn thứ hai; **CEI là lưới thứ nhất**. Một codebase chỉ dựa vào guard sẽ chết ở biến thể cross-contract hoặc read-only.

## 3. Các lời gọi ra ngoài dễ bị bỏ sót

| Chỗ | Vì sao dễ sót |
|---|---|
| `safeTransferFrom` (ERC-721/1155) | Callback `onERC721Received` — **nhìn như một phép gán** |
| Token ERC-777 / ERC-1363 | Hook trên token *fungible* |
| Gửi ETH bằng `call` | Rõ ràng, ít bị sót |
| Oracle / price feed | `latestRoundData()` gọi contract ngoài |
| Contract wallet qua EIP-1271 | `isValidSignature` là lời gọi ra ngoài |
| Modifier gọi contract ngoài | Chạy **trước** thân hàm |
| Callback do người dùng đăng ký | Flash loan callback, hook, plugin |

## 4. Bài học từ seed: guard đặt sai tầng

**Kakarot M-06** là một ca hiếm và rất đáng học: hệ thống *có* kiểm tra reentrancy, nhưng kiểm sai chỗ.

`account_contract.execute_starknet_call` chặn việc gọi ngược vào Kakarot bằng cách chỉ cho phép gọi đúng một getter vô hại. Nhưng nó **không chặn** việc account contract gọi sang **một account contract khác** kèm transaction đã ký — và đường đó vào lại EVM.

Warden mô tả chính xác vấn đề gốc: *"Kakarot lưu hiệu ứng của quá trình thực thi ở tận cuối qua `Starknet.commit`, nên nó công khai không tuân thủ CEI"* — toàn bộ EVM chạy trên **dữ liệu cache**, và reentrancy vào giữa chừng làm cache không nhất quán.

Khuyến nghị được chấp nhận: **bỏ guard ở tầng account, đặt guard ở `Kakarot.eth_call`** — tức là ở ranh giới thực sự, không ở một trong nhiều lối vào.

> [!warning] Guard phải nằm ở ranh giới, không ở lối vào
> Nếu bạn liệt kê "những lời gọi bị cấm", bạn đang chơi trò đuổi bắt. Nếu bạn đặt guard ở chỗ *duy nhất* mà mọi thực thi phải đi qua, bạn thắng một lần cho tất cả.

## 5. Cạm bẫy

1. **Chỉ đặt `nonReentrant` cho hàm `external`**, quên hàm `public` khác chạm cùng state.
2. **Guard riêng cho mỗi contract** trong một hệ nhiều contract dùng chung state ⇒ cross-contract reentrancy vẫn qua.
3. **Hàm `view` không có guard** ⇒ read-only reentrancy. Nếu ai đó đọc `getPrice()` của bạn, bạn phải đảm bảo nó không đọc được giữa lúc dở dang.
4. **`transfer()` với 2300 gas không phải là chống reentrancy** — nó chỉ tình cờ không đủ gas, và giá gas thì đổi. Xem [[Gas Mechanics]].
5. **Reentrancy vào chính hàm read của oracle** — xem [[Oracle Manipulation]].
6. **Guard dùng storage `bool` tốn 20k gas**; từ 0.8.24 dùng `transient` rẻ hơn nhiều. Xem [[Solidity Version Pitfalls]].
7. **Vòng lặp gọi ra ngoài** (batch payment): mỗi vòng là một cơ hội re-enter, và `msg.value` không giảm.

## 6. Checklist áp dụng

- [ ] Liệt kê **mọi** lời gọi ra ngoài trong scope (kể cả callback ẩn của `safeTransfer*` và oracle).
- [ ] Với mỗi lời gọi: state đã hoàn tất **trước** nó chưa? (CEI)
- [ ] Có hàm nào khác chạm cùng state mà **không** có guard không?
- [ ] Guard có dùng chung giữa các contract chia sẻ state không?
- [ ] Có hàm `view` nào bị protocol khác dùng làm nguồn giá/tỉ lệ không? Nó có đọc được giữa lúc state dở dang không?
- [ ] Modifier có gọi ra ngoài trước `_;` không?
- [ ] Có vòng lặp nào gọi ra ngoài không?
- [ ] Đã viết test PoC reentrancy bằng một contract tấn công chưa, hay chỉ đọc bằng mắt?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Slither `reentrancy-*` detector | Bắt CEI vi phạm rõ ràng | https://github.com/crytic/slither |
| Echidna / Medusa | Fuzz với contract tấn công tự sinh | https://github.com/crytic/echidna |
| OpenZeppelin `ReentrancyGuardTransient` | Guard dùng TSTORE | https://docs.openzeppelin.com/contracts/api/utils#ReentrancyGuardTransient |

## Tham khảo

- [Kakarot M-06](https://github.com/code-423n4/2024-09-kakarot-findings/issues/64) — guard đặt sai tầng
- [Consensys — Reentrancy After Istanbul](https://consensys.io/diligence/blog/2019/09/stop-using-soliditys-transfer-now/)
- [Chainsecurity — Read-only reentrancy](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/)
- [SWC-107: Reentrancy](https://swcregistry.io/docs/SWC-107)
- [OpenZeppelin ReentrancyGuard](https://docs.openzeppelin.com/contracts/api/utils#ReentrancyGuard)

## Liên kết

[[Token Standards]] · [[Oracle Manipulation]] · [[Vulnerability Taxonomy]] · [[Case Kakarot]] · [[Blockchain]]
