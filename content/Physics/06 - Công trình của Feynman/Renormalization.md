---
tags: [physics, qed, quantum-field-theory]
status: evergreen
---
# Renormalization

> Thủ tục biến các tích phân vô hạn của [[Quantum Electrodynamics]] thành tiên đoán hữu hạn chính xác tới 12 chữ số. Nó hoạt động. Feynman không bao giờ tin nó là câu trả lời cuối cùng.

> "The shell game that we play... is technically called 'renormalization'. But no matter how clever the word, **it is what I would call a dippy process!** Having to resort to such hocus-pocus has prevented us from proving that the theory of quantum electrodynamics is mathematically self-consistent."
> — *QED: The Strange Theory of Light and Matter* (1985)

## 1. Vấn đề

Tính năng lượng riêng của electron trong lý thuyết trường: electron phát ra photon rồi tự hấp thụ lại. Tính tích phân trên mọi năng lượng photon khả dĩ → **phân kỳ**.

Tương tự với điện tích: electron liên tục tạo ra các cặp electron–positron ảo quanh nó → chúng che chắn điện tích → điện tích "trần" hoá ra vô hạn.

Đây không phải sai số nhỏ. Đây là **vô cực** ở mọi bậc vượt quá bậc thấp nhất.

## 2. Ý tưởng cốt lõi

**Điều ta đo được không bao giờ là "electron trần".** Ta luôn đo electron *kèm theo* đám mây photon và cặp ảo bao quanh nó. Vậy:

1. Nhận rằng khối lượng và điện tích "trần" trong phương trình là **không quan sát được**.
2. Cho chúng nhận giá trị vô hạn (theo cách bù trừ chính xác với vô hạn từ tích phân).
3. Biểu diễn mọi tiên đoán theo **khối lượng và điện tích đo được** — hai con số lấy từ thực nghiệm.
4. Mọi tiên đoán *khác* trở thành hữu hạn.

**Điểm mấu chốt về khả năng tiên đoán:** QED cần đúng **hai** tham số đầu vào (khối lượng và điện tích electron). Từ đó nó tiên đoán vô số đại lượng khác. Đó là lý do nó vẫn là một lý thuyết khoa học chứ không phải một trò khớp số.

| Lý thuyết | Số tham số cần đo | Có tiên đoán được không |
|---|---|---|
| **QED** | 2 | ✅ Vô số đại lượng |
| **Mô hình Chuẩn** | ~19 | ✅ Vẫn tiên đoán rất nhiều |
| **Hấp dẫn lượng tử nhiễu loạn** | **Vô hạn** | ❌ Mất khả năng tiên đoán. Xem [[Quantum Gravity]] |

Dòng cuối là toàn bộ lý do hấp dẫn lượng tử là vấn đề mở.

## 3. Cách hiểu hiện đại: nhóm tái chuẩn hoá

Wilson (1971, Nobel 1982) đưa ra cách diễn giải làm cho thủ tục này bớt "hocus-pocus":

**Lý thuyết trường là lý thuyết hiệu dụng, đúng tới một thang năng lượng nào đó.** Vô hạn xuất hiện vì ta ngoại suy tới năng lượng vô hạn — điều ta không có lý do gì để tin là hợp lệ.

Cắt tích phân ở một thang $\Lambda$, rồi hỏi: các tham số phải thay đổi thế nào theo $\Lambda$ để tiên đoán ở năng lượng thấp không đổi? Câu trả lời là **phương trình nhóm tái chuẩn hoá**.

Hệ quả đáng chú ý: **hằng số ghép "chạy" theo năng lượng.**
- $\alpha \approx 1/137$ ở năng lượng thấp, nhưng $\approx 1/128$ ở thang khối lượng boson Z.
- Trong QCD, hằng số ghép **giảm** ở năng lượng cao → **asymptotic freedom** → quark hành xử gần như tự do bên trong proton. Đây chính là điều [[The Parton Model]] mô tả bằng ngôn ngữ hiện tượng luận.

> [!note] Từ mẹo tính toán thành nguyên lý vật lý
> Diễn giải của Wilson biến tái chuẩn hoá từ "thủ thuật để khử vô hạn" thành "phát biểu về việc vật lý ở các thang khác nhau tách rời nhau". Đó là lý do vật lý hạt nhân không cần biết lý thuyết dây, và hoá học không cần biết QCD.

## 4. Feynman vẫn không hài lòng

Ngay cả sau Wilson, và ngay cả sau khi lý thuyết cho ra 12 chữ số đúng, Feynman giữ nguyên thái độ. Trong *QED* (1985), 20 năm sau Nobel, ông vẫn viết *"dippy process"*.

Lý do không phải bảo thủ. Ông chỉ ra một điều cụ thể: tái chuẩn hoá **ngăn ta chứng minh QED tự nhất quán về mặt toán học**. Khai triển nhiễu loạn của QED là chuỗi tiệm cận, không hội tụ. Nó cho kết quả tuyệt vời ở vài bậc đầu rồi phân kỳ.

Đây là thái độ nhất quán với [[Physical Law vs Mechanism]] và với giả thuyết bàn cờ: Feynman nghi ngờ mọi thứ đòi hỏi vô hạn phép toán trong một vùng không-thời gian hữu hạn.

## 5. Cạm bẫy

> [!warning] "Tái chuẩn hoá là quét vô hạn xuống dưới thảm"
> Cách nói phổ biến, và **sai**. Thủ tục hoàn toàn xác định, không có tự do lựa chọn, và nó cho ra tiên đoán mới kiểm được. Nếu nó là quét rác, nó đã không tiên đoán được mômen từ electron tới 12 chữ số.

- **Nhầm "có tham số tự do" với "không tiên đoán được".** QED có 2 tham số và tiên đoán vô số thứ. Xem bảng mục 2.
- **Tưởng vô hạn biến mất.** Chúng được hấp thụ vào các đại lượng không quan sát được. Đó là chỗ Feynman thấy khó chịu.
- **Bỏ qua rằng đây là điều phân biệt lý thuyết dùng được và không dùng được.** Tiêu chuẩn "tái chuẩn hoá được" là tiêu chuẩn chọn lọc lý thuyết trong suốt thập niên 1970.
- **Coi Wilson đã giải quyết xong.** Wilson giải thích *vì sao* thủ tục hợp lý. Ông không chứng minh QED tự nhất quán — điểm Feynman nêu vẫn đứng.

## 6. Checklist áp dụng

- [ ] Tôi mô tả được nguồn gốc của vô hạn trong tính năng lượng riêng của electron?
- [ ] Tôi giải thích được vì sao "khối lượng trần" là không quan sát được?
- [ ] Tôi nói được vì sao 2 tham số vẫn cho phép tiên đoán, còn vô hạn tham số thì không?
- [ ] Tôi hiểu "hằng số ghép chạy theo năng lượng" nghĩa là gì?
- [ ] Tôi nêu được **lý do cụ thể** khiến Feynman không hài lòng, chứ không chỉ nói ông không thích?

## Tham khảo

- Feynman, *QED: The Strange Theory of Light and Matter* (Princeton UP, 1985), Chương 4 — **nguồn của "dippy process"**
- Dyson, "The Radiation Theories of Tomonaga, Schwinger, and Feynman", *Phys. Rev.* 75 (1949)
- Wilson, "The renormalization group and critical phenomena", *Rev. Mod. Phys.* 55 (1983) — bài giảng Nobel
- 't Hooft & Veltman, "Regularization and renormalization of gauge fields", *Nucl. Phys. B* 44 (1972)
- Peskin & Schroeder, *An Introduction to Quantum Field Theory*, Chương 6–12

## Liên kết

[[Quantum Electrodynamics]] · [[Feynman Diagrams]] · [[Quantum Gravity]] · [[The Parton Model]] · [[Physical Law vs Mechanism]] · [[Physics]]
