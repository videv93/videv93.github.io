---
tags: [tài-nguyên, catalogue]
status: evergreen
---
# Learning Resources

> Danh mục nguồn của cả vault. Sắp theo **mức độ dùng thật khi làm việc**, không theo mức độ nổi tiếng.

## 1. Tra cứu hằng ngày

| Nguồn | Dùng khi |
|---|---|
| [Solidity docs](https://docs.soliditylang.org/) | Chuẩn ngôn ngữ — luôn chọn đúng version |
| [Solidity bug list](https://docs.soliditylang.org/en/latest/bugs.html) | Bắt buộc kiểm trong mọi audit |
| [evm.codes](https://www.evm.codes/) | Opcode và chi phí gas *(nguồn ghi thẳng trong seed)* |
| [EIPs](https://eips.ethereum.org/) | Chuẩn token, chữ ký, proxy |
| [Foundry Book](https://book.getfoundry.sh/) | Cheatcode, invariant, fork test |
| [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) | Cài đặt tham chiếu để đối chiếu |
| [Solodit](https://solodit.xyz/) | Tra finding và tiền lệ severity |

## 2. Sách và đặc tả

| Nguồn | Ghi chú |
|---|---|
| Antonopoulos & Wood, *Mastering Ethereum* (2nd ed.) | **Nguồn gốc của seed này** — chương 1 trong `_archive-seed/` |
| [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) | Đặc tả hình thức của EVM |
| [execution-specs](https://github.com/ethereum/execution-specs) | Đặc tả tham chiếu bằng Python — dễ đọc hơn Yellow Paper |
| [Trail of Bits — Building Secure Contracts](https://secure-contracts.com/) | Tài liệu chuẩn ngành về quy trình |
| [Rareskills — Book of Solidity Gas Optimization](https://www.rareskills.io/post/gas-optimization) | |

## 3. Khoá học

| Nguồn | Cấp độ |
|---|---|
| [Cyfrin Updraft](https://updraft.cyfrin.io/) | Zero → auditor, miễn phí. *Blockchain Basics là nguồn của outline trong seed* |
| [Secureum Bootcamp](https://github.com/x676f64/secureum-mind_map) | Trung–cao, có RACE quiz |
| [Rareskills](https://www.rareskills.io/) | Trung–cao, trả phí |

## 4. Sân tập — xem [[Practice Grounds]]

| Nguồn | Dạy gì |
|---|---|
| [Ethernaut](https://ethernaut.openzeppelin.com/) | Nền tảng EVM |
| [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/) | **DeFi thật** — quan trọng nhất |
| [Capture the Ether](https://capturetheether.com/) | Ngẫu nhiên, số học |
| [EVM Puzzles](https://github.com/fvictorio/evm-puzzles) | Đọc bytecode |
| [Huff Puzzles](https://github.com/RareSkills/huff-puzzles) | Viết assembly |

## 5. Kho finding và post-mortem

| Nguồn | Ghi chú |
|---|---|
| [Code4rena reports](https://code4rena.com/reports) | **Nguồn của seed này** — ba báo cáo trong `_archive-seed/` |
| [Sherlock audits](https://audits.sherlock.xyz/contests) · [Cantina](https://cantina.xyz/) | |
| [Rekt News](https://rekt.news/) + [leaderboard](https://rekt.news/leaderboard/) | Post-mortem, xếp theo số tiền mất |
| [SWC Registry](https://swcregistry.io/) | Taxonomy cũ, vẫn dùng làm tham chiếu |
| [DeFiHackLabs](https://github.com/SunWeb3Sec/DeFiHackLabs) | **PoC Foundry cho hàng trăm vụ hack thật** |

Nguồn cuối là nguồn bị đánh giá thấp nhất trong bảng: nó cho phép chạy lại một cuộc tấn công thật trong hai phút.

## 6. Công cụ

| Nhóm | Công cụ |
|---|---|
| Test & PoC | [Foundry](https://book.getfoundry.sh/) |
| Static | [Slither](https://github.com/crytic/slither), [Aderyn](https://github.com/Cyfrin/aderyn), [solhint](https://protofire.github.io/solhint/) |
| Fuzz | [Echidna](https://github.com/crytic/echidna), [Medusa](https://github.com/crytic/medusa) |
| Formal | [Halmos](https://github.com/a16z/halmos), [Kontrol](https://docs.runtimeverification.com/kontrol), [Certora](https://docs.certora.com/) |
| On-chain | [Etherscan](https://etherscan.io/), [Tenderly](https://tenderly.co/), [Dedaub](https://app.dedaub.com/), [L2Beat](https://l2beat.com/) |
| Upgrade | [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades-plugins/) |

## 7. Theo dõi liên tục

| Nguồn | Vì sao |
|---|---|
| [Rekt News](https://rekt.news/) | Vụ hack mới = lớp lỗi mới |
| [Blockthreat newsletter](https://newsletter.blockthreat.io/) | Tổng hợp tuần |
| [Ethereum Magicians](https://ethereum-magicians.org/) | EIP đang bàn — thay đổi sắp tới |
| [Solodit](https://solodit.xyz/) | Finding mới hằng ngày |
| [L2Beat](https://l2beat.com/) | Mô hình tin cậy của L2 và bridge |

## 8. Hệ sinh thái (từ các stub trong seed)

| Tên | Loại | Link |
|---|---|---|
| deBridge, Stargate, Orbiter, Owlto, Layerswap | Bridge / liquidity network | Xem [[Bridge Risk]] |
| Jumper, Bungee | Aggregator | |
| Hyperlane | Framework interoperability | https://docs.hyperlane.xyz/ |
| Metis, Zora | L2 / L3 | https://www.metis.io/ · https://zora.co/ |
| Minascan | Explorer cho Mina (ZK) | https://minascan.io/ |
| DefiLlama | TVL, protocol theo chain | https://defillama.com/ |

## Liên kết

[[Learning Roadmap]] · [[Practice Grounds]] · [[Onchain Investigation Tools]] · [[Contest Platforms]] · [[Blockchain]]
