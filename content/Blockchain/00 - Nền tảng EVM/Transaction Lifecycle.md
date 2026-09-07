---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# Transaction Lifecycle

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong `Blockchain Basics.md`: `# 8. Signing transaction` và `# 5. Setup your wallet - making your first transaction`.

> Một transaction đi qua **năm trạm** trước khi thành trạng thái cuối cùng. Mỗi trạm là một chỗ có thể tấn công, và bốn trong năm trạm nằm **ngoài** smart contract của bạn.

## 1. Năm trạm

| Trạm | Chuyện gì xảy ra | Bề mặt tấn công |
|---|---|---|
| 1. **Ký** | Ví ký `(nonce, to, value, data, gas, chainId)` bằng ECDSA secp256k1 | Signature malleability, replay giữa chain, blind signing |
| 2. **Broadcast → mempool** | Tx công khai với mọi người trước khi lên block | **Front-running, sandwich, censorship** |
| 3. **Chọn & sắp xếp** | Builder/proposer chọn tx và **thứ tự** | MEV, block stuffing |
| 4. **Thực thi** | EVM chạy, state thay đổi, log phát ra | Toàn bộ [[Vulnerability Taxonomy]] |
| 5. **Finality** | ~2 epoch (≈12,8 phút) trên PoS | Reorg, giao dịch "đã xong" bị lật |

> [!warning] Mempool là công khai
> Mọi thứ bạn định làm đều bị đọc trước khi xảy ra. Mọi thiết kế kiểu "ai gọi trước thì thắng" đều **không** an toàn. Xem [[Front-running and MEV]].

## 2. Chữ ký transaction

Chữ ký ECDSA gồm `(r, s, v)`. Ba ràng buộc phải nhớ:

- `0 < r < secp256k1n`
- `0 < s ≤ secp256k1n / 2` — **với chữ ký transaction**; ràng buộc nửa dưới này đến từ EIP-2
- `v ∈ {27, 28}` (hoặc `y_parity ∈ {0,1}` với typed tx)

`ecrecover` (precompile `0x01`) **lỏng hơn**: nó chỉ yêu cầu `s < secp256k1n`, tức là chấp nhận cả nửa trên. Đây chính là nguồn của malleability trong contract. Kakarot H-06 là bản nặng hơn: cài đặt của họ chấp nhận cả `s > secp256k1n`, cho **ba** chữ ký hợp lệ cho cùng một message thay vì hai. Xem [[Signature Malleability]].

**EIP-155** đưa `chainId` vào phần được ký để chống replay giữa các chain. Kakarot M-04 là bug ngay tại đây: `chain_id` không bị giới hạn độ dài nên tràn số và vượt qua kiểm tra chữ ký.

## 3. Các loại transaction

| Type | Tên | Đặc điểm |
|---|---|---|
| `0x00` | Legacy | `gasPrice` đơn, `v` mã hoá chainId |
| `0x01` | EIP-2930 | Thêm access list |
| `0x02` | EIP-1559 | `maxFeePerGas` + `maxPriorityFeePerGas` |
| `0x03` | EIP-4844 | Blob tx cho rollup |
| `0x04` | EIP-7702 | EOA tạm mang code |

Auditor cần biết vì **logic parse tx là code**, và code parse thì có bug — cả bộ finding của Kakarot về `decode_legacy_tx` chứng minh điều đó.

## 4. Cạm bẫy

1. **`block.timestamp` do proposer đặt**, sai lệch vài giây là chấp nhận được. Dùng làm deadline thì được; dùng làm nguồn ngẫu nhiên thì không.
2. **Không có "trước/sau" đáng tin trong cùng một block.** Mọi logic phụ thuộc thứ tự trong block là do builder quyết.
3. **Reorg**: trên L2 và trong 2 epoch đầu của L1, một tx "đã thành công" có thể biến mất. Ứng dụng cầu nối và sàn phải chờ finality.
4. **Tx từ L1 sang L2 khác tx thường**: không có mempool, không tự đặt gas limit. Kakarot M-11 là bug đúng ở đây — hardcode gas limit `2.100.000.000` làm trừ trước hết số dư của người gửi rồi transfer fail. Xem [[Cross-domain Message Bugs]].
5. **Không có cơ chế huỷ** cho message L1→L2 nghĩa là phí kẹt vĩnh viễn (Kakarot M-03).

## 5. Checklist áp dụng

- [ ] Có hành động nào có lợi nếu biết trước nội dung tx của người khác không? (đấu giá, mint, thanh lý, đổi giá)
- [ ] Chữ ký có nonce và deadline không? Có ràng `chainId` và `address(this)` không?
- [ ] Có kiểm `s ≤ n/2` khi tự verify chữ ký không, hay đang tin `ecrecover` trần?
- [ ] Có logic nào phụ thuộc thứ tự trong cùng một block không?
- [ ] Với contract cross-chain: message có huỷ được không? Ai trả phí? Fail thì tiền đi đâu?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Etherscan / Blockscout | Xem tx, decode input, đọc event | https://etherscan.io/ |
| mempool.blocknative | Nhìn mempool trực tiếp | https://www.blocknative.com/ |
| Flashbots Protect | Gửi tx không qua mempool công khai | https://protect.flashbots.net/ |
| `cast tx` / `cast receipt` | Đọc tx từ CLI | https://book.getfoundry.sh/ |

## Tham khảo

- [EIP-155: Simple replay attack protection](https://eips.ethereum.org/EIPS/eip-155)
- [EIP-2: Homestead hard-fork changes](https://eips.ethereum.org/EIPS/eip-2) — ràng buộc `s ≤ n/2`
- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) và [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)
- [Flashbots docs — MEV](https://docs.flashbots.net/)
- [Kakarot M-11, Code4rena](https://github.com/code-423n4/2024-09-kakarot-findings/issues/29) — phí L1→L2 tính sai

## Liên kết

[[Front-running and MEV]] · [[Signature Malleability]] · [[Cross-domain Message Bugs]] · [[Gas Mechanics]] · [[Blockchain]]
