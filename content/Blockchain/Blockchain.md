---
tags: [blockchain, solidity, security, defi, moc]
type: moc
status: evergreen
created: 2026-09-01
updated: 2026-09-01
---
# Blockchain

> Vault này có **một trọng tâm**: đọc code Solidity/EVM và tìm ra chỗ nó mất tiền. Mọi thứ khác — EVM, ngôn ngữ, DeFi primitive — ở đây vì cần thiết để làm được việc đó, không phải vì bản thân chúng thú vị.
> Seed gốc là 3 báo cáo audit Code4rena thật (Gondi, Coded Estate, Kakarot — 16 High, 21 Medium, ~30 QA), chương 1 *Mastering Ethereum*, và một bộ khung Solidity docs gồm ~20 header rỗng. Toàn bộ đã được trả.

## Cách dùng vault này

- **Đọc theo số thư mục.** `00`–`02` là nền tảng bắt buộc (không hiểu storage layout thì không đọc được bug storage collision). `03` là trung tâm — **taxonomy lỗ hổng**, mỗi note một lớp lỗi. `04`–`05` là quy trình và công cụ. `06`–`07` là DeFi và rủi ro hệ thống. `08` là ba hồ sơ thật. `09` là lộ trình và tài nguyên.
- **Tra cứu ngược khi audit:** mở [[Vulnerability Taxonomy]] → chọn lớp lỗi → note lớp đó có checklist áp dụng ngay.
- `status`: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- Tiếng Việt để giải thích, **giữ nguyên thuật ngữ tiếng Anh** — mọi tài liệu, báo cáo và đồng nghiệp đều dùng tiếng Anh.
- ⚠️ Note có dấu này là **note bản lề** — đọc trước khi dùng cụm liên quan.
- 🔎 Note có dấu này **rút trực tiếp từ finding thật** trong seed, có dẫn link tới issue gốc.
- 📼 Note có dấu này **trả một header rỗng** trong seed (khung Solidity docs / outline khoá học), tổng hợp từ nguồn ngoài.

## 00 - Nền tảng EVM

- [[What Is Ethereum]] — máy trạng thái xác định, Turing-complete, và vì sao điều đó là *vấn đề* chứ không phải tính năng
- [[Ethereum Account Model]] — EOA vs contract account, nonce, `tx.origin` vs `msg.sender`
- [[EVM Execution Model]] 📼 — stack/memory/storage/calldata, call context, và bảng opcode cần thuộc
- [[Storage Layout]] — slot packing, mapping/array slot, và vì sao proxy đụng nhau ở đây
- [[Gas Mechanics]] 📼 — base fee / priority fee / limit, gas refund, và gas như một vector tấn công
- [[Transaction Lifecycle]] 📼 — ký, mempool, thứ tự trong block, và chỗ MEV chen vào

## 01 - Ngôn ngữ Solidity

> Toàn bộ cụm này trả bộ khung Solidity docs trong seed (`Language Description` → `Types` → `Values Type` → ~20 stub grammar rỗng).

- [[Solidity Source File Layout]] 📼 — SPDX, pragma, import, comment: bốn dòng đầu file nói gì với auditor
- [[Solidity Value Types]] 📼 — 15 kiểu giá trị, và cạm bẫy ép kiểu giữa chúng
- [[Solidity Reference Types]] 📼 — `memory`/`storage`/`calldata`, array, struct, và bug do sai data location
- [[Contract Structure and Visibility]] 📼 — state variable, function, modifier, error, event
- [[Inline Assembly and Yul]] 📼 — khi nào cần đọc assembly, và nó vô hiệu hoá kiểm tra nào
- [[Units and Global Variables]] 📼 — `block.timestamp`, `msg.*`, `tx.*`: cái nào tin được, cái nào không
- [[Solidity Version Pitfalls]] — 0.8 checked arithmetic, `unchecked`, và các breaking change hay bị bỏ sót

## 02 - Mẫu hợp đồng

- [[Token Standards]] — ERC-20 / 721 / 1155 / 4626: giao diện và chỗ chuẩn *không* quy định
- [[Weird ERC20 Tokens]] 🔎 — fee-on-transfer, không return value, rebasing, blocklist: bảng hành vi và cách phòng
- [[Access Control Patterns]] — Ownable, roles, two-step, và các lỗi cấu hình kinh điển
- [[Proxy and Upgradeability]] — UUPS / Transparent / Diamond, storage gap, uninitialized implementation
- [[Signatures and EIP-712]] 🔎 — ecrecover, domain separator, replay, nonce
- [[Factory and CREATE2]] — địa chỉ đoán trước được, và vì sao `felt_to_bytes` sai làm sập cả mô hình này

## 03 - Lớp lỗ hổng

> Trung tâm của vault. Mỗi note = một lớp lỗi, kèm ví dụ thật từ ba báo cáo trong seed. Bắt đầu ở note đầu tiên.

- [[Vulnerability Taxonomy]] 🔎 — khung phân loại, ánh xạ với trường "Assessed type" của Code4rena
- [[Missing Input Validation]] 🔎 — lớp lỗi **phổ biến nhất** trong seed: 6/9 High của Coded Estate
- [[Broken State Lifecycle]] 🔎 — xoá/burn/reset để lại trạng thái mồ côi, tiền kẹt
- [[Stale Approval and Delegation]] 🔎 — cấp quyền rồi không thu hồi đúng key
- [[Reentrancy]] — CEI, guard, read-only reentrancy, và cross-contract reentrancy
- [[Denial of Service Patterns]] 🔎 — unbounded loop, revert bubbling, chặn tài khoản, chặn queue
- [[Integer and Precision Bugs]] 🔎 — overflow/underflow, ép kiểu hẹp, chia trước nhân, làm tròn có lợi cho ai
- [[Signature Malleability]] 🔎 — `s` cao, `v` lỏng, ba chữ ký hợp lệ cho một message
- [[Delegatecall and Context Confusion]] 🔎 — `address(this)`, storage của ai, và whitelist theo code address
- [[Front-running and MEV]] 🔎 — huỷ bid trước khi transfer, sandwich, và cái gì có thể front-run được
- [[Cross-domain Message Bugs]] 🔎 — address aliasing, message không huỷ được, phí kẹt
- [[Metadata and Off-chain Trust]] 🔎 — `tokenURI` tuỳ ý, JSON injection, và ranh giới trách nhiệm contract/frontend

## 04 - Quy trình audit

- [[Audit Workflow]] — sáu pha từ nhận scope tới mitigation review
- [[Scoping and Threat Modeling]] — đọc README, xác định actor, tài sản, và giả định tin cậy
- [[Manual Review Techniques]] — thứ tự đọc code, đối chiếu spec, kỹ thuật "đi ngược từ tiền"
- [[Invariant Discovery]] — biến câu tiếng Anh thành assert chạy được
- [[Writing a Finding]] — cấu trúc một finding được judge chấp nhận
- [[Proof of Concept Discipline]] 🔎 — vì sao mọi finding High trong seed đều có test chạy được
- [[Severity Classification]] 🔎 — High/Medium/Low, và các quy tắc gây tranh cãi nhất
- [[Mitigation Review]] 🔎 — 5/33 bản vá của Kakarot sai hoặc chưa đủ; đọc lại fix là một pha riêng
- ⚠️ [[Contest Severity vs Real Risk]] 🔎 — **note bản lề**: warden, judge và sponsor không cùng định nghĩa "bug"

## 05 - Công cụ

- [[Foundry for Auditors]] — fork test, cheatcode, và cách dựng PoC trong 20 phút
- [[Static Analysis Tools]] 📼 — Slither, Aderyn, LightChaser: dùng để lọc, không dùng để kết luận
- [[Fuzzing and Invariant Testing]] — Echidna, Medusa, `forge invariant`
- [[Formal Verification]] — Certora, Halmos, Kontrol: khi nào đáng công
- [[Practice Grounds]] 📼 — Ethernaut, Damn Vulnerable DeFi, Capture the Ether
- [[Onchain Investigation Tools]] 📼 — explorer, Tenderly, decompiler, và cách đọc một tx đã xảy ra

## 06 - DeFi primitives

- [[AMM Mechanics]] — constant product, slippage, và vì sao spot price không phải oracle
- [[Lending and Liquidation]] — health factor, LTV, bad debt, incentive của liquidator
- [[Oracles]] — Chainlink feed, TWAP, staleness check, và mọi thứ hỏng khi feed đứng
- [[Stablecoins]] — collateralized / algorithmic / RWA, và cơ chế giữ peg
- [[Yield Vaults]] — ERC-4626, share/asset accounting, inflation attack
- [[Flash Loans]] — atomic borrow, dùng để làm gì hợp pháp, và làm gì để tấn công
- [[NFT Finance]] 🔎 — cho vay thế chấp NFT, tranche, refinance, đấu giá thanh lý (Gondi)

## 07 - Rủi ro hệ thống

- [[Oracle Manipulation]] — spot price + flash loan = lịch sử các vụ hack lớn nhất
- [[Economic Attacks]] — tấn công không phá vỡ code, chỉ phá vỡ giả định kinh tế
- [[Governance Attacks]] — mua phiếu, flash-loan vote, timelock quá ngắn
- [[Composability Risk]] — mỗi tích hợp là một giả định bạn không kiểm soát
- [[Bridge Risk]] 📼 — bảy cầu nối trong seed, và vì sao bridge là mục tiêu số một
- ⚠️ [[Move Fast vs Immutable]] — **note bản lề**: văn hoá "move fast and break things" gặp code không sửa được

## 08 - Hồ sơ audit thật

> Ba báo cáo trong seed, đọc như case study. Đọc [[Case Study Method]] trước.

- [[Case Study Method]] — cách bóc một báo cáo audit để học, không phải để đọc cho biết
- [[Case Gondi]] 🔎 — Solidity, NFT lending, 1 Medium + 12 Low: audit "sạch" trông thế nào
- [[Case Coded Estate]] 🔎 — CosmWasm/Rust, 9 High + 9 Medium: audit "bẩn" trông thế nào
- [[Case Kakarot]] 🔎 — Cairo zkEVM, 6 High: khi lỗ hổng nằm dưới cả ngôn ngữ hợp đồng
- [[Cross-case Patterns]] 🔎 — cái gì lặp lại ở cả ba, dù ba ngôn ngữ khác nhau

## 09 - Tài nguyên

- [[Learning Roadmap]] — thứ tự học từ zero tới nộp finding đầu tiên
- [[Audit Checklist Master]] — checklist gộp toàn vault, dùng khi audit thật
- [[Learning Resources]] — sách, khoá học, blog, và nguồn tra cứu chuẩn
- [[Contest Platforms]] — Code4rena, Sherlock, Cantina, Immunefi: khác nhau ở đâu

## Nguồn nền tảng dùng chung

| Nguồn | Dùng khi |
|---|---|
| [Solidity docs](https://docs.soliditylang.org/) | Chuẩn ngôn ngữ — luôn kiểm tra đúng version |
| [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) | Định nghĩa hình thức của EVM |
| [evm.codes](https://www.evm.codes/) | Tra opcode và chi phí gas |
| [EIPs](https://eips.ethereum.org/) | Chuẩn token, chữ ký, proxy |
| [Code4rena reports](https://code4rena.com/reports) | Kho finding thật, nguồn của seed này |
| [SWC Registry](https://swcregistry.io/) / [SC weakness](https://github.com/CryptoStandardsAlliance) | Taxonomy lỗ hổng |
| [Rekt News](https://rekt.news/) | Post-mortem các vụ hack |
| [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | Cài đặt tham chiếu để đối chiếu |

## Ghi chú về `_archive-seed/`

39 file seed gốc nằm trong `_archive-seed/`, chuyển từ `4. Archived/`. Gồm:

- **3 báo cáo Code4rena đầy đủ** (`Coded Estate.md` 3.184 dòng, `Kakarot.md` 2.531 dòng, `Gondi.md` 472 dòng) — giữ nguyên vì mọi code snippet và PoC đều còn nguyên ở đó; các note trong vault chỉ trích ý và dẫn link về issue gốc.
- **`1. What Is Ethereum?.md`** — chương 1 *Mastering Ethereum* 2nd ed.
- **~20 stub grammar Solidity** (`type-name.md`, `modifier-definition.md`, `uncheck-block.md`…) — header rỗng, đã được trả trong cụm `01`.
- **Stub DeFi** (`Bridges.md`, `Zora.md`, `Metis.md`, `Hermes.md`, `NFT.md`, `Protocols.md`) — link rời, đã hấp thụ vào `06`/`07`.

## Liên kết

[[Knowledge Seed Playbook]] · [[Backend]] — area `2. Areas/Security/` chưa có MOC, xem trực tiếp trong thư mục.
