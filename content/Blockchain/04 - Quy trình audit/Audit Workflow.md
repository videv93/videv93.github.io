---
tags: [audit, quy-trình]
status: evergreen
---
# Audit Workflow

> Một audit không phải là "đọc code tìm bug". Nó là **sáu pha**, và pha tốn thời gian nhất không phải pha đọc code — mà là pha hiểu protocol định làm gì, để biết khi nào nó không làm đúng thế.

## 1. Sáu pha

| Pha | Việc | Tỉ lệ thời gian |
|---|---|---|
| 1. **Scoping** | Đọc README, docs, xác định actor/tài sản/giả định | 15% |
| 2. **Recon** | Đếm dòng, vẽ sơ đồ contract, chạy static analysis để lấy bản đồ | 10% |
| 3. **Đọc sâu** | Đi từng hàm, đối chiếu spec, ghi câu hỏi | 40% |
| 4. **Đào sâu** | Đuổi theo giả thuyết, viết PoC | 20% |
| 5. **Viết báo cáo** | Finding + severity + mitigation | 10% |
| 6. **Mitigation review** | Đọc lại bản vá | 5% (thường bị bỏ — xem [[Mitigation Review]]) |

> [!warning] Pha 1 quyết định chất lượng của pha 3
> Không biết protocol *nên* làm gì thì không thể biết nó làm sai. Coded Estate M-05 được chấm Medium **chỉ vì không có tài liệu nào** nói rằng hành vi đó là chủ đích. Tài liệu là một phần của scope.

## 2. Pha 1 — Scoping

Xem [[Scoping and Threat Modeling]]. Đầu ra bắt buộc:
- Danh sách **actor** và quyền của từng người
- Danh sách **tài sản** và ai được chạm vào
- Danh sách **giả định tin cậy** ("chúng tôi chỉ dùng token 6 decimals", "admin là multisig")
- Danh sách **bất biến** phát biểu bằng tiếng Việt/Anh — xem [[Invariant Discovery]]

Câu hỏi bắt buộc hỏi sponsor: *chain đích?*, *token nào được hỗ trợ?*, *admin là ai?*, *phần nào đã audit trước?*, *có gì ngoài scope không và vì sao?*

## 3. Pha 2 — Recon

```bash
cloc --by-file src/                          # dòng code, để ước lượng thời gian
forge build && forge test                    # build được không, test pass không
forge coverage                               # chỗ nào không được test = chỗ đáng nghi
slither . --print contract-summary           # bản đồ hàm và visibility
slither . --print inheritance-graph
slither . --print human-summary
```

Mục tiêu **không phải** tìm bug — mà là dựng bản đồ và tìm **vùng ít được test nhất**. Xem [[Static Analysis Tools]].

## 4. Pha 3 — Đọc sâu

Thứ tự đọc, xem [[Manual Review Techniques]]. Nguyên tắc: **ghi câu hỏi, đừng dừng lại đuổi theo ngay**. Một danh sách 40 câu hỏi cuối pha 3 tốt hơn 3 bug tìm được trong khi bỏ sót nửa codebase.

## 5. Pha 4 — Đào sâu và PoC

Mỗi giả thuyết trong danh sách được xử lý theo thứ tự **tác động × độ tin**. Với mỗi cái: viết test cố gắng **làm nó xảy ra**. Nếu test fail, giả thuyết sai — ghi lại vì sao. Xem [[Proof of Concept Discipline]].

## 6. Pha 5 và 6

Xem [[Writing a Finding]], [[Severity Classification]], [[Mitigation Review]].

## 7. Cạm bẫy

1. **Bắt đầu đọc code trước khi hiểu protocol.** Bạn sẽ tìm ra lỗi style thay vì lỗi logic.
2. **Dừng lại đuổi bug đầu tiên.** Mất cả buổi vào một Low và không bao giờ đọc hết codebase.
3. **Tin vào test suite của sponsor.** Test viết cho happy path. Chỗ **không** có test mới là chỗ đáng đọc.
4. **Bỏ qua contract "chỉ là thư viện".** Kakarot có ba High nằm ở hàm tiện ích chuyển đổi byte.
5. **Không hỏi sponsor.** Phần lớn giả định quan trọng nhất không nằm trong code. Sponsor Coded Estate nói *"chúng tôi dùng token 6 decimals"* — thông tin đó lẽ ra phải có từ pha 1.
6. **Bỏ pha 6.** 5/33 bản vá của Kakarot sai hoặc chưa đủ. Bỏ mitigation review nghĩa là một phần ba công sức có thể vô ích.
7. **Không quản lý thời gian.** Audit có deadline. Chia thời gian theo pha **trước khi bắt đầu**, và bám vào.

## 8. Checklist áp dụng

- [ ] Đã có danh sách actor / tài sản / giả định / bất biến trước khi đọc code chưa?
- [ ] Đã hỏi sponsor về chain đích, token hỗ trợ, và quyền admin chưa?
- [ ] Build và test chạy được chưa? Coverage bao nhiêu? Vùng nào 0%?
- [ ] Đã chia thời gian theo sáu pha và ghi ra chưa?
- [ ] Có danh sách câu hỏi đang mở, xếp theo tác động × độ tin không?
- [ ] Mỗi finding có PoC chạy được không?
- [ ] Đã lên lịch cho pha mitigation review chưa?
- [ ] Những giả định không kiểm chứng được đã ghi vào phần "assumptions" của báo cáo chưa?

## Tham khảo

- [Trail of Bits — Building Secure Contracts](https://secure-contracts.com/)
- [Code4rena docs — cách một audit diễn ra](https://docs.code4rena.com/)
- [Secureum RACE / Audit Findings](https://secureum.substack.com/)
- [OpenZeppelin — Smart contract audit readiness guide](https://blog.openzeppelin.com/follow-this-quality-checklist-before-an-audit-8cc6a0e44845)

## Liên kết

[[Scoping and Threat Modeling]] · [[Manual Review Techniques]] · [[Writing a Finding]] · [[Mitigation Review]] · [[Blockchain]]
