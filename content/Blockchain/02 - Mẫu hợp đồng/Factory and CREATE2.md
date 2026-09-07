---
tags: [solidity, mẫu]
status: evergreen
---
# Factory and CREATE2

> `CREATE2` cho phép biết **địa chỉ của một contract trước khi nó tồn tại**. Toàn bộ counterfactual deployment, account abstraction, và deterministic deployment đứng trên tính chất đó — nên mọi thứ làm **sai lệch phép tính địa chỉ** đều là lỗ hổng nghiêm trọng.

## 1. Hai cách sinh địa chỉ

| Opcode | Công thức | Tính chất |
|---|---|---|
| `CREATE` | `keccak256(rlp([sender, nonce]))[12:]` | Phụ thuộc nonce ⇒ **cùng địa chỉ có thể xuất hiện trên chain khác** |
| `CREATE2` | `keccak256(0xff ++ sender ++ salt ++ keccak256(initcode))[12:]` | Đoán trước được, không phụ thuộc nonce |

Hệ quả của dòng đầu: một contract L1 và một contract L2 có thể **trùng địa chỉ nhưng khác bytecode**. Đây là lý do tồn tại của **address aliasing** trong mọi bridge — xem [[Cross-domain Message Bugs]].

## 2. Vì sao đây là chuyện bảo mật

Kakarot H-02: hàm `felt_to_bytes_little` bị underflow, cho phép prover trả về chuỗi byte gần như tuỳ ý. Hàm đó được dùng bởi `get_create_address()` và `get_create2_address()`.

⇒ **Attacker deploy được contract từ một địa chỉ người gửi giả mạo.** Warden nói thẳng hệ quả: đánh cắp tiền từ ví dùng account abstraction, vì những ví đó xác định danh tính bằng địa chỉ counterfactual.

> [!warning] Địa chỉ là danh tính
> Trong EVM, không có gì khác ngoài địa chỉ để nhận diện một bên. Mọi bug làm phép tính địa chỉ sai — dù nằm sâu trong một hàm chuyển đổi byte — là bug **giả mạo danh tính**, tức là High.

## 3. Mẫu factory

```solidity
// Clone tối thiểu (EIP-1167) + CREATE2 — mẫu phổ biến nhất
address pair = Clones.cloneDeterministic(implementation, salt);
address predicted = Clones.predictDeterministicAddress(implementation, salt, address(this));
```

| Mẫu | Dùng khi |
|---|---|
| Deploy đầy đủ | Mỗi instance khác code |
| **Minimal proxy (EIP-1167)** | Nhiều instance cùng logic — rẻ nhất; nhưng là proxy ⇒ [[Proxy and Upgradeability]] |
| Beacon proxy | Nhiều instance, nâng cấp tất cả cùng lúc |
| CREATE3 | Địa chỉ không phụ thuộc initcode ⇒ đổi code vẫn giữ địa chỉ |

## 4. Cạm bẫy

1. **`salt` do người dùng chọn mà không trộn `msg.sender`** ⇒ ai đó chiếm trước địa chỉ bạn định dùng (front-run deployment).
2. **Địa chỉ CREATE2 đổi khi initcode đổi** — tức là đổi compiler version, optimizer runs, hay constructor args đều đổi địa chỉ. Đây là lý do CREATE3 tồn tại.
3. **Deploy vào một địa chỉ đã có code sẽ revert**, nhưng địa chỉ *đã từng* có contract bị `selfdestruct` thì (trước Cancun) dùng lại được với **code khác** — mẫu "metamorphic contract". EIP-6780 đã đóng phần lớn cửa này, nhưng code cũ và chain cũ vẫn dính.
4. **Gửi tiền tới địa chỉ counterfactual trước khi deploy** là mẫu hợp lệ (account abstraction), nhưng nghĩa là **contract nhận được tiền trước khi constructor chạy** — mọi giả định "balance == 0 lúc khởi tạo" đều sai.
5. **`extcodesize == 0` trong constructor** ⇒ mọi phép kiểm "đây có phải contract không" bị bypass từ trong constructor.
6. **Jump trong creation code.** Kakarot M-09: `JUMP`/`JUMPI` với offset nhỏ hơn độ dài creation code khiến cả transaction revert ở tầng Starknet — nghĩa là **bất kỳ ai cũng ép được một tx dùng `CREATE`/`CREATE2` phải revert**. Bài học chuyển được: creation code và runtime code là hai không gian khác nhau; mọi cài đặt EVM lẫn hai cái là bug.

## 5. Checklist áp dụng

- [ ] `salt` có trộn `msg.sender` không? Ai front-run được việc deploy?
- [ ] Địa chỉ dự đoán có được dùng làm danh tính/phân quyền ở đâu không?
- [ ] Contract mới có thể đã có balance trước khi constructor chạy không? Logic có chịu được không?
- [ ] Có phép kiểm "là contract" nào bypass được từ constructor không?
- [ ] Có mẫu metamorphic (`selfdestruct` + redeploy cùng địa chỉ) nào không?
- [ ] Factory có giới hạn ai deploy được không? Deploy hàng loạt có làm cạn tài nguyên gì không?
- [ ] Địa chỉ dự đoán có được lưu off-chain và dùng lại không? Nó phụ thuộc initcode — initcode có ghim version compiler không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| OpenZeppelin `Clones` | EIP-1167 + predict address | https://docs.openzeppelin.com/contracts/api/proxy#Clones |
| `cast create2` | Tìm salt cho địa chỉ mong muốn | https://book.getfoundry.sh/ |
| CreateX | Factory deterministic đa chain | https://github.com/pcaversaccio/createx |

## Tham khảo

- [EIP-1014: CREATE2](https://eips.ethereum.org/EIPS/eip-1014)
- [EIP-1167: Minimal Proxy Contract](https://eips.ethereum.org/EIPS/eip-1167)
- [EIP-6780: SELFDESTRUCT semantics change](https://eips.ethereum.org/EIPS/eip-6780)
- [Kakarot H-02](https://github.com/code-423n4/2024-09-kakarot-findings/issues/118) — giả mạo địa chỉ CREATE/CREATE2
- [Kakarot M-09](https://github.com/code-423n4/2024-09-kakarot-findings/issues/44) — jump trong creation code

## Liên kết

[[Proxy and Upgradeability]] · [[Ethereum Account Model]] · [[Cross-domain Message Bugs]] · [[Case Kakarot]] · [[Blockchain]]
