---
tags: [tài-nguyên, lộ-trình]
status: evergreen
---
# Learning Roadmap

> [!note] Ghi chú nguồn
> Trả outline của `Blockchain Basics.md` trong seed — 11 header, trong đó 10 hoàn toàn rỗng (Welcome, What is a blockchain, The purpose of smart contracts, Current smart contract landscapes, Setup your wallet, Introduction to gas, How do blockchain work, Signing transaction, Blockchain Overview, Congratulations). Đây là khung khoá học Cyfrin Blockchain Basics; note này biến nó thành lộ trình thật.

> Lộ trình từ zero tới nộp finding đầu tiên. **Không phải để đọc, mà để đánh dấu.** Mỗi giai đoạn có một sản phẩm đầu ra kiểm chứng được.

## Giai đoạn 0 — Nền tảng (1–2 tuần)

| Mục tiêu | Note | Sản phẩm |
|---|---|---|
| Blockchain hoạt động thế nào, vì sao có smart contract | [[What Is Ethereum]] | Giải thích được halting problem → gas |
| Ví, ký giao dịch, gas | [[Transaction Lifecycle]], [[Gas Mechanics]] | Tự gửi một tx trên testnet, đọc được từng trường trên explorer |
| Mô hình tài khoản | [[Ethereum Account Model]] | Phân biệt được `msg.sender` / `tx.origin` / `address(this)` |

Tài nguyên: [Cyfrin Blockchain Basics](https://updraft.cyfrin.io/courses/blockchain-basics) (miễn phí), [ethereum.org developers](https://ethereum.org/en/developers/docs/).

## Giai đoạn 1 — Viết Solidity (3–4 tuần)

| Mục tiêu | Note | Sản phẩm |
|---|---|---|
| Cú pháp, kiểu, storage | [[Solidity Value Types]], [[Solidity Reference Types]], [[Storage Layout]] | Viết được ERC-20 và ERC-721 **từ đầu**, không copy |
| Cấu trúc contract, visibility | [[Contract Structure and Visibility]] | |
| Foundry | [[Foundry for Auditors]] | Test coverage >90% cho contract tự viết |

Tài nguyên: [Solidity docs](https://docs.soliditylang.org/), [Cyfrin Updraft — Solidity 101](https://updraft.cyfrin.io/), [Solidity by Example](https://solidity-by-example.org/).

> **Cột mốc:** không đi tiếp cho tới khi viết được một vault ERC-4626 đơn giản có test.

## Giai đoạn 2 — Lỗ hổng (4–6 tuần)

| Mục tiêu | Note | Sản phẩm |
|---|---|---|
| Nền tảng EVM sâu hơn | [[EVM Execution Model]] | Giải hết Ethernaut |
| Taxonomy lỗ hổng | Toàn bộ thư mục `03` | Tự viết lại taxonomy bằng lời của mình |
| Mẫu hợp đồng | Toàn bộ thư mục `02` | Giải thích được vì sao proxy cần EIP-1967 |

Tài nguyên: [Ethernaut](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/). Xem [[Practice Grounds]].

## Giai đoạn 3 — DeFi (4–6 tuần)

| Mục tiêu | Note | Sản phẩm |
|---|---|---|
| Primitive | Toàn bộ thư mục `06` | Giải thích được vì sao spot price không phải oracle |
| Rủi ro hệ thống | Toàn bộ thư mục `07` | Tính được chi phí thao túng một pool cụ thể |

Tài nguyên: [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/) — **giai đoạn quan trọng nhất**, [Rekt News](https://rekt.news/) đọc 20 post-mortem.

## Giai đoạn 4 — Quy trình audit (4 tuần)

| Mục tiêu | Note | Sản phẩm |
|---|---|---|
| Quy trình đầy đủ | Toàn bộ thư mục `04` | Một báo cáo audit hoàn chỉnh cho một repo contest cũ |
| Công cụ | Toàn bộ thư mục `05` | Chạy được Slither, Echidna, invariant test |
| Đọc mù | [[Case Study Method]] | Bảng ba cột cho **ba** contest cũ |

Ba repo trong `_archive-seed/` là bài tập sẵn có. Xem [[Case Gondi]], [[Case Coded Estate]], [[Case Kakarot]].

## Giai đoạn 5 — Thi thật (liên tục)

1. Bắt đầu bằng contest **nhỏ, ngắn** trên [[Contest Platforms]].
2. Đặt mục tiêu **nộp một finding hợp lệ**, không đặt mục tiêu kiếm tiền.
3. Sau mỗi contest: đọc báo cáo, làm bảng ba cột, cập nhật [[Audit Checklist Master]].
4. Lặp lại.

## Cạm bẫy về lộ trình

1. **Nhảy thẳng vào lỗ hổng mà chưa viết được Solidity.** Không đọc nổi code thì không audit được.
2. **Cày Ethernaut vô hạn.** Nó dạy lớp lỗi, không dạy quy trình.
3. **Bỏ qua DeFi vì "khó".** Đó là chỗ có tiền và có bug.
4. **Không viết finding.** Kỹ năng viết là kỹ năng được trả tiền — xem [[Writing a Finding]].
5. **Đo tiến bộ bằng số bài đã đọc** thay vì số sản phẩm đầu ra.
6. **Không làm bảng ba cột.** Không có nó thì đọc báo cáo là giải trí.

## Liên kết

[[Learning Resources]] · [[Practice Grounds]] · [[Audit Checklist Master]] · [[Contest Platforms]] · [[Blockchain]]
