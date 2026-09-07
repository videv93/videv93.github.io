---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# Gas Mechanics

> [!note] Ghi chú nguồn
> Trong seed gốc, `Blockchain Basics.md` có hai header về gas (`# 6. Introduction to gas`, `# 9. Gas in depth`). Mục 9 là **phần duy nhất có nội dung** trong cả file: định nghĩa Base/Max/Max Priority Fee cùng hai link `evm.codes` và `eth-converter.com`. Note này giữ nguyên nội dung đó và mở rộng.

> Gas là lời giải của Ethereum cho halting problem: nếu không đoán được một chương trình chạy bao lâu, thì **bắt nó trả tiền theo từng lệnh**. Với auditor, gas không phải chuyện tối ưu — nó là một **tài nguyên hữu hạn mà attacker có thể làm cạn của người khác**.

## 1. Bốn con số trong một transaction (EIP-1559)

| Trường | Nghĩa | Ai nhận |
|---|---|---|
| **Base Fee** | Phí nền của **block**, do giao thức tính từ độ đầy của block trước | **Bị đốt** |
| **Max Priority Fee** (tip) | Mức tối đa người dùng sẵn sàng trả thêm cho block producer | Block producer |
| **Max Fee** | Trần tuyệt đối người dùng chịu trả mỗi đơn vị gas | — |
| **Gas Limit** | Trần số đơn vị gas transaction được tiêu | — |

Công thức thực trả: `gas_used × (base_fee + min(priority_fee, max_fee − base_fee))`. Gas thừa được hoàn lại; **base fee đã đốt thì không**.

> Nguyên văn trong seed: *"Base Fee refers to the network Base Fee at the time of the block, while Max Fee & Max Priority Fee refer to the max amount a user is willing to pay for their tx & to give to the block producer respectively."*

## 2. Chi phí đáng nhớ

| Hành động | Gas | Ghi chú |
|---|---|---|
| Transaction rỗng | 21.000 | Intrinsic gas |
| Byte calldata khác 0 / bằng 0 | 16 / 4 | Lý do tồn tại của "gas golf" address có nhiều số 0 |
| `SSTORE` slot 0 → khác 0 | 20.000 | Đắt nhất trong các thao tác thường gặp |
| `SSTORE` khác 0 → khác 0 | 2.900 | |
| `SLOAD` cold / warm | 2.100 / 100 | EIP-2929 |
| `CALL` tới địa chỉ cold | 2.600 | |
| Deploy: mỗi byte code | 200 | Cùng giới hạn 24.576 byte (EIP-170) |
| Memory expansion | bậc hai | Vector DoS |

## 3. Gas như một vector tấn công

Đây là phần quan trọng nhất của note.

| Mẫu tấn công | Cơ chế | Ví dụ trong seed |
|---|---|---|
| **Unbounded loop** | Attacker làm mảng dài ra, hàm duyệt mảng vượt gas limit | **Coded Estate M-02**: owner set `cancellation` vector dài tuỳ ý → nạn nhân không huỷ được đặt phòng |
| **Gas griefing** | Caller cấp ít gas, callee fail, caller nuốt lỗi | Mẫu chung của relayer / meta-tx |
| **Returndata bomb** | Callee trả về vài MB → caller cạn gas khi copy | Lý do có `ExcessivelySafeCall` |
| **Block stuffing** | Đẩy block đầy để chặn tx quan trọng (thanh lý, đấu giá) | Ảnh hưởng mọi cơ chế theo deadline |
| **Chi phí phân mảnh** | Bắt user gọi nhiều tx thay vì một | **Coded Estate M-04**: kiểu `u64` buộc landlord rút tiền qua ~1.632 lần gọi. Judge nâng lên Medium **vì tổng phí gas ≈ 5% số tiền** |

> [!warning] "Chỉ tốn gas thôi" không phải lý do hạ severity
> Coded Estate M-04 bắt đầu ở Medium, bị hạ Low ("có thể chia nhỏ ra nhiều lần gọi"), rồi được nâng lại Medium khi warden tính ra con số cụ thể: 1.632 lần gọi. **Số cụ thể thắng lập luận định tính.** Xem [[Severity Classification]].

## 4. Quy tắc 63/64 và `transfer()`

EIP-150: mỗi lần gọi ngoài, callee chỉ nhận tối đa `63/64` gas còn lại. Hệ quả:

- Không thể "gửi hết gas" — luôn giữ lại `1/64`.
- Mẫu **`address.transfer()` / `.send()` cấp cố định 2300 gas đã lỗi thời**: giá gas đổi qua các hard fork, và người nhận là smart contract wallet thì 2300 không đủ. Dùng `call{value: x}("")` **cộng với** reentrancy guard.

## 5. Cạm bẫy

1. **Gas refund đã bị cắt gần hết** (EIP-3529). Mẫu "gas token" chết từ London.
2. **Ước lượng gas trên mạng test ≠ mainnet** vì trạng thái cold/warm khác.
3. **L2 có hai loại phí**: phí thực thi L2 (rẻ) + phí đăng dữ liệu lên L1 (đắt). Tối ưu calldata quan trọng hơn tối ưu tính toán.
4. **Contract 24KB** — vượt là không deploy được; đây là một trong các lý do khiến người ta dùng Diamond pattern.
5. **`gasleft()` trong logic nghiệp vụ** biến giá gas thành một phần của bề mặt tấn công.

## 6. Checklist áp dụng

- [ ] Có vòng lặp nào duyệt mảng mà **attacker điều khiển được độ dài** không? Mảng đó có cap không?
- [ ] Có hàm nào **bắt buộc phải chạy được** (thanh lý, huỷ, rút) mà nằm sau một vòng lặp như vậy không?
- [ ] Có `transfer()` / `send()` với 2300 gas không?
- [ ] Có giới hạn returndata khi gọi contract ngoài không?
- [ ] Có logic nào phụ thuộc `gasleft()` không?
- [ ] Kiểu số của các trường tiền có buộc user phải chia nhỏ transaction không? (Coded Estate M-03/M-04)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| evm.codes | Bảng gas theo từng opcode và fork | https://www.evm.codes/ |
| eth-converter | Đổi wei/gwei/ether nhanh | https://eth-converter.com/ |
| `forge test --gas-report` | Bảng gas theo hàm | https://book.getfoundry.sh/ |
| `forge snapshot` | Diff gas giữa hai commit | https://book.getfoundry.sh/ |

## Tham khảo

- [EIP-1559: Fee market change](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-150: Gas cost changes for IO-heavy operations](https://eips.ethereum.org/EIPS/eip-150) — quy tắc 63/64
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) / [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) — cold/warm access, cắt refund
- [evm.codes](https://www.evm.codes/) — nguồn được ghi thẳng trong seed
- [Coded Estate M-02, Code4rena](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/35) — DoS bằng vector không giới hạn

## Liên kết

[[Denial of Service Patterns]] · [[EVM Execution Model]] · [[Transaction Lifecycle]] · [[Severity Classification]] · [[Blockchain]]
