---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# What Is Ethereum

> Ethereum là một **máy trạng thái xác định nhưng không giới hạn thực tế**, gồm một trạng thái singleton toàn cục và một máy ảo áp dụng thay đổi lên trạng thái đó. Với auditor, câu quan trọng trong định nghĩa này là **"xác định"** — mọi node phải ra cùng một kết quả, nên mọi nguồn ngẫu nhiên hay mọi phụ thuộc vào thời gian đều là một bề mặt tấn công.

## 1. Khái niệm cốt lõi

Một blockchain mở, công khai gồm tám thành phần:

| Thành phần | Ở Ethereum | Ý nghĩa với auditor |
|---|---|---|
| Mạng P2P | ÐΞVp2p, port 30303 | Nơi mempool sống → nơi front-running xảy ra |
| Message | Transaction (sender, recipient, value, data) | `msg.data` là đầu vào không tin cậy |
| Luật đồng thuận | Ethash → **PoS (Gasper)** từ 2022 | Finality không tức thì → reorg risk |
| Máy trạng thái | **EVM**, stack-based, chạy bytecode | Xem [[EVM Execution Model]] |
| Cấu trúc dữ liệu | Merkle Patricia Tree | Cơ sở của proof và light client |
| Thuật toán đồng thuận | Casper FFG + LMD-GHOST | Validator, slashing, staking |
| Bảo mật kinh tế | Stake + phần thưởng | Xem [[Economic Attacks]] |
| Client | Geth/Nethermind (execution), Prysm/Lighthouse (consensus) | Khác biệt giữa client = consensus bug |

**Ethereum khác Bitcoin ở đâu:** Bitcoin theo dõi trạng thái *sở hữu coin*; Ethereum theo dõi trạng thái của một **key–value store tuỳ ý**. Ether không phải mục tiêu, nó là *utility currency* để trả cho việc dùng máy tính thế giới.

## 2. Turing completeness — tính năng hay vấn đề

Đây là chỗ hay bị hiểu ngược. Turing complete **rất dễ đạt được** (máy Turing đầy đủ nhỏ nhất chỉ có 4 trạng thái, 6 ký hiệu, 22 lệnh); nhiều hệ thống *vô tình* Turing complete. Bitcoin **cố ý** không Turing complete.

Chuỗi hệ quả cần thuộc:

1. Turing complete ⇒ tồn tại halting problem ⇒ không thể biết trước một contract có dừng không.
2. Nhưng **mọi node phải chạy mọi transaction** để xác thực.
3. ⇒ Một contract vòng lặp vô hạn = DoS toàn mạng.
4. ⇒ Cần một cơ chế đo và giới hạn tài nguyên ⇒ **gas**. Xem [[Gas Mechanics]].

> [!warning] Gas không phải chi tiết kế toán
> Gas là *lời giải cho một bài toán bất khả quyết*. Vì vậy mọi thứ liên quan tới gas — vòng lặp không giới hạn, revert bubbling, gas griefing — đều là lỗ hổng bảo mật thật, không phải "vấn đề tối ưu". Xem [[Denial of Service Patterns]].

## 3. Các giai đoạn phát triển

| Giai đoạn | Mốc | Điều auditor cần nhớ |
|---|---|---|
| Frontier | 30/07/2015 | Genesis, gas limit 5.000, difficulty bomb |
| Homestead | 14/03/2016 | EIP-2/7/8 |
| Metropolis | 16/10/2017 | Byzantium/Constantinople/Istanbul — **đổi giá gas nhiều lần**, phá vỡ mẫu `transfer()` 2300 gas |
| Serenity (The Merge) | 15/09/2022 | PoW → PoS; `block.difficulty` → `block.prevrandao` |
| Surge/Scourge/Verge/Purge/Splurge | đang song song | Sharding, chống tập trung hoá, Verkle tree, cắt lịch sử |

> [!note] Vì sao bảng này quan trọng khi audit
> Giá gas của opcode **đã thay đổi qua các hard fork**. Mọi contract giả định một con số gas cố định (`address.transfer()` với 2300 gas là ví dụ kinh điển) đều là code có hạn sử dụng. Đọc [[Solidity Version Pitfalls]].

## 4. Văn hoá phát triển và cái giá của nó

Seed nói thẳng: mantra của Ethereum là *"move fast and break things"*, trong khi Bitcoin bảo thủ và ưu tiên tương thích ngược. Chương 1 *Mastering Ethereum* cũng thừa nhận nghịch lý: **bạn deploy code bất biến lên một nền tảng còn đang thay đổi**, và "bạn không thể đơn giản upgrade smart contract".

Đây là mâu thuẫn trung tâm của cả vault này — xem note bản lề ⚠️ [[Move Fast vs Immutable]].

## 5. Cạm bẫy

- **"Dễ viết code" ≠ "dễ viết code đúng".** Seed ghi lại giai đoạn áo phông "tạo token trong 5 dòng code". Ba báo cáo audit trong `_archive-seed/` là hoá đơn của câu đó.
- **DApp phi tập trung hoàn toàn không thắng.** Swarm/Whisper không được dùng rộng; chuẩn thực tế hiện nay là frontend web2 tập trung nói chuyện với contract. ⇒ **Ranh giới trách nhiệm contract/frontend là vùng xám thật** — xem [[Metadata and Off-chain Trust]].
- **Trạng thái toàn cục nghĩa là composable**, mà composable nghĩa là mọi contract bạn tích hợp trở thành một phần bề mặt tấn công của bạn. Xem [[Composability Risk]].
- **Không có nút tắt-bật lại.** Máy in Turing-complete bị treo thì rút điện; blockchain công khai thì không.

## 6. Checklist áp dụng

- [ ] Contract này có phụ thuộc vào giá gas cố định của một opcode nào không?
- [ ] Có chỗ nào giả định finality tức thì (không tính reorg) không?
- [ ] Có nguồn "ngẫu nhiên" nào lấy từ on-chain (`blockhash`, `prevrandao`, `timestamp`) không?
- [ ] Có vòng lặp nào mà độ dài do người dùng/attacker điều khiển không?
- [ ] Contract được deploy lên chain nào? EVM-equivalent hay chỉ EVM-*compatible*? (Xem [[Case Kakarot]])

## Tham khảo

- Antonopoulos & Wood, *Mastering Ethereum* 2nd ed., ch.1 — nguồn gốc của note này ([O'Reilly](https://learning.oreilly.com/library/view/mastering-ethereum-2nd/9781098168414/))
- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — đặc tả hình thức của máy trạng thái
- [execution-specs](https://github.com/ethereum/execution-specs) / [consensus-specs](https://github.com/ethereum/consensus-specs) — đặc tả tham chiếu bằng Python
- Vitalik Buterin, [Ethereum Prehistory](https://vitalik.eth.limo/general/2017/09/14/prehistory.html) (2017)
- [ethereum.org: Ethereum roadmap](https://ethereum.org/en/roadmap/) — trạng thái hiện tại của các sub-stage Serenity

## Liên kết

[[EVM Execution Model]] · [[Gas Mechanics]] · [[Ethereum Account Model]] · [[Move Fast vs Immutable]] · [[Blockchain]]
