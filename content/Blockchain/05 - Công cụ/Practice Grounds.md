---
tags: [công-cụ, luyện-tập]
status: evergreen
---
# Practice Grounds

> [!note] Ghi chú nguồn
> Trả header rỗng `Ethernaunt` (link chết) trong `Smart Contract Auditing.md` của seed — một link chết tới Ethernaut, wargame của OpenZeppelin.

> Không ai học audit bằng cách đọc về lỗ hổng. Học bằng cách **bị một lỗ hổng đánh bại rồi tự phá được nó**. Đây là thứ tự đi qua các sân tập, và cái mỗi sân dạy được.

## 1. Lộ trình sân tập

| Sân                                                             | Cái gì được dạy                                                            | Độ khó | Ghi chú                            |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ | ---------------------------------- |
| **[Ethernaut](https://ethernaut.openzeppelin.com/)**            | Nền tảng EVM: fallback, delegatecall, storage, `tx.origin`, `selfdestruct` | ⭐      | Bắt đầu ở đây                      |
| **[Capture the Ether](https://capturetheether.com/)**           | Ngẫu nhiên, số học, ABI                                                    | ⭐⭐     | Cũ nhưng còn giá trị               |
| **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** | **DeFi thật**: flash loan, oracle, vault, governance                       | ⭐⭐⭐    | Quan trọng nhất cho hướng DeFi     |
| **[EVM Puzzles](https://github.com/fvictorio/evm-puzzles)**     | Đọc bytecode trần                                                          | ⭐⭐     | Rèn đọc opcode                     |
| **[Huff Puzzles](https://github.com/RareSkills/huff-puzzles)**  | Viết assembly                                                              | ⭐⭐⭐    | Cho [[Inline Assembly and Yul]]    |
| **[Secureum RACE](https://secureum.substack.com/)**             | Trắc nghiệm 8 phút, sát thực tế                                            | ⭐⭐     | Đo lỗ hổng kiến thức               |
| **[Solodit Checklist](https://solodit.xyz/checklist)**          | Đọc finding thật hàng loạt                                                 | —      | Không phải sân tập, là kho tư liệu |

## 2. Cách chơi để học được thật

1. **Không đọc lời giải.** Bị kẹt hai giờ đáng giá hơn đọc lời giải trong hai phút.
2. **Viết PoC bằng Foundry**, không dùng console của web. Bạn đang luyện đúng kỹ năng dùng khi audit — xem [[Proof of Concept Discipline]].
3. **Sau khi giải xong, viết finding.** Tiêu đề, attack path, mitigation. Đây là phần đa số bỏ qua và là phần được trả tiền.
4. **Ghi lại lớp lỗi** vào [[Vulnerability Taxonomy]] của riêng bạn.
5. **Đọc lời giải của người khác sau khi tự giải** — thường có đường ngắn hơn.

## 3. Từ sân tập sang việc thật

Sân tập có một điểm yếu cấu trúc: **bạn biết chắc có bug**. Trong audit thật, phần lớn thời gian bạn đọc code đúng, và thử thách là không bỏ cuộc.

Cầu nối tốt nhất: **đọc lại một audit đã công bố theo lối mù**.

1. Lấy repo của một contest đã kết thúc (ba repo trong `_archive-seed/` là ví dụ sẵn).
2. **Không đọc báo cáo.**
3. Audit theo quy trình đầy đủ ở [[Audit Workflow]], ghi finding.
4. So với báo cáo thật.
5. Với mỗi finding bạn bỏ sót, hỏi: *tôi lẽ ra phải nhìn vào đâu?* — và bổ sung câu hỏi đó vào [[Audit Checklist Master]].

Xem [[Case Study Method]].

## 4. Cạm bẫy

1. **Cày sân tập vô hạn.** Chúng dạy lớp lỗi, không dạy quy trình. Sau Damn Vulnerable DeFi, chuyển sang đọc báo cáo thật.
2. **Chỉ giải, không viết.** Kỹ năng viết finding phải luyện riêng.
3. **Bỏ qua DeFi vì "khó".** Đó chính là chỗ có tiền và có bug.
4. **Học lỗ hổng lỗi thời** mà không biết. Reentrancy kiểu The DAO gần như không còn; read-only reentrancy thì có.
5. **Không luyện đọc bytecode.** Nhiều contract trên chain không verify.

## Tham khảo

- [Ethernaut](https://ethernaut.openzeppelin.com/) — OpenZeppelin
- [Damn Vulnerable DeFi v4](https://www.damnvulnerabledefi.xyz/)
- [Secureum Bootcamp materials](https://github.com/x676f64/secureum-mind_map)
- [Solodit](https://solodit.xyz/) — kho finding tổng hợp
- [Cyfrin Updraft — Security & Auditing course](https://updraft.cyfrin.io/)

## Liên kết

[[Learning Roadmap]] · [[Case Study Method]] · [[Proof of Concept Discipline]] · [[Contest Platforms]] · [[Blockchain]]
