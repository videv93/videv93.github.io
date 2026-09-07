---
tags: [audit, quy-trình, mitigation]
status: evergreen
---
# Mitigation Review

> Pha bị bỏ qua nhiều nhất, và là pha có tỉ lệ tìm ra bug trên đơn vị thời gian **cao nhất**. Bằng chứng cứng từ seed: trong 33 bản vá của Kakarot, **5 bản sai hoặc chưa đủ** — 15%.

## 1. Con số từ seed

Sau audit Kakarot, đội Zenith (RadiantLabs) review lại toàn bộ bản vá:

| Trạng thái | Số lượng |
|---|---|
| 🟢 Mitigation Confirmed | 28 |
| 🔴 Partially Mitigated / Mitigation Error | **5** |

Năm bản vá có vấn đề:

| PR | Vá cho | Sai ở đâu |
|---|---|---|
| 1565 | Validate `ecrecover` | **Vá một nửa** — `verify_eth_signature_uint256` vẫn lỏng |
| 1566 | `extcodehash` | Vẫn trả `0` cho account deploy qua đường khác |
| 1584 | Gas L1→L2 | Nâng lên `2^64−1` ⇒ **vượt qua giới hạn gas của block** |
| 1593 | `blockhash` | **Off-by-one**: chặn từ `−10` trong khi giá trị ngoài dải đầu tiên là `−9` |
| 1616 | Kiểm return value ERC-20 | **Phá vỡ** hỗ trợ token không return gì |

## 2. Bốn dạng bản vá hỏng

| Dạng | Ví dụ | Cách phát hiện |
|---|---|---|
| **Vá một nửa** | PR-1565: sửa `ecrecover` nhưng không sửa đường verify tx | Tìm **mọi** đường tới cùng logic, không chỉ đường trong báo cáo |
| **Vá sai chỗ** | PR-1566: sửa ở `_commit_account` thay vì ở `extcodehash` | Hỏi: bản vá đặt ở **ranh giới** hay ở một lối vào? |
| **Vá tạo bug mới** | PR-1584: mở đường vượt block gas limit | Coi bản vá như code mới và audit lại từ đầu |
| **Vá đánh đổi ngầm** | PR-1616: đỡ token này, phá token kia | Liệt kê mọi hành vi đầu vào và kiểm lại từng cái |

> [!warning] Bản vá là code mới, chưa từng được audit
> Nó được viết dưới áp lực thời gian, thường bởi người vừa mới hiểu bug, và **không đi qua quy trình review bình thường**. Đây chính xác là điều kiện sinh ra bug.

## 3. Quy trình review một bản vá

1. **Đọc finding gốc lại từ đầu.** Đừng tin bản tóm tắt của mình.
2. **Chạy lại PoC cũ.** Nó phải fail. Nếu vẫn pass thì xong, không cần đọc gì thêm.
3. **Đọc diff, không đọc file.** Chỉ những dòng đã đổi.
4. **Tìm mọi đường khác tới cùng logic.** Đây là bước bắt được dạng "vá một nửa".
5. **Coi bản vá như code mới** — chạy lại checklist đầy đủ trên phần đã đổi.
6. **Kiểm ca biên của chính bản vá.** PR-1593 sai vì `is_in_range` có cận trên **loại trừ** chứ không bao gồm. Off-by-one là bệnh của bản vá.
7. **Kiểm những hành vi cũ vẫn còn đúng.** PR-1616 hỏng ở đây.

## 4. Bốn câu hỏi cho mỗi bản vá

- Bản vá có xử lý **nguyên nhân gốc** hay chỉ chặn kịch bản trong báo cáo?
- Nó nằm ở **ranh giới** (mọi luồng đi qua) hay ở **một lối vào**? (Kakarot M-06: guard chuyển từ `account_contract` lên `Kakarot.eth_call` — đó là vá đúng chỗ)
- Nó **phá vỡ** hành vi hợp lệ nào không?
- Nó có test đi kèm không? Test có bao ca biên không?

## 5. Cạm bẫy

1. **Tin vào mô tả PR.** *"Fix off-by-one"* không có nghĩa là off-by-one đã hết.
2. **Chỉ đọc phần code liên quan tới finding.** Bản vá có thể sửa nhiều thứ khác.
3. **Không chạy lại PoC.** Bước rẻ nhất và bắt được nhiều nhất.
4. **Bỏ qua bản vá của finding Low.** PR-1633 vá một QA lại chính là bản vá đóng nốt phần chữ ký còn lỏng.
5. **Không kiểm test mới.** PR-1593: test mới của chính họ đã **mâu thuẫn với bản vá** — Zenith phát hiện bằng cách đọc test.
6. **Không theo tới cùng.** Sau khi Zenith báo lỗi, team ra thêm PR-1643, PR-1644, PR-1654. Mitigation review có thể cần nhiều vòng.

## 6. Checklist áp dụng

- [ ] Đã chạy lại **mọi** PoC cũ trên bản vá chưa? Tất cả đều fail chứ?
- [ ] Với mỗi bản vá: nó vá nguyên nhân gốc hay vá kịch bản?
- [ ] Đã tìm **mọi đường khác** tới cùng đoạn logic chưa?
- [ ] Bản vá đặt ở ranh giới hay ở một lối vào?
- [ ] Bản vá có phá vỡ hành vi hợp lệ nào không? Đã liệt kê và kiểm từng cái chưa?
- [ ] Có kiểm ca biên của chính bản vá không (cận trên/dưới, bao gồm/loại trừ)?
- [ ] Test mới đi kèm có **nhất quán** với bản vá không?
- [ ] Bản vá có sửa gì ngoài phạm vi finding không? Phần đó đã được đọc chưa?

## Tham khảo

- [Kakarot Mitigation Review (Zenith / RadiantLabs)](https://code4rena.com/reports/2024-09-kakarot) — 5/33 bản vá có vấn đề
- [PR-1593 — off-by-one trong chính bản vá](https://github.com/kkrt-labs/kakarot/pull/1593)
- [PR-1616 — bản vá phá vỡ hành vi đã hỗ trợ](https://github.com/kkrt-labs/kakarot/pull/1616)
- [Code4rena — Mitigation review process](https://docs.code4rena.com/)

## Liên kết

[[Audit Workflow]] · [[Signature Malleability]] · [[Weird ERC20 Tokens]] · [[Case Kakarot]] · [[Blockchain]]
