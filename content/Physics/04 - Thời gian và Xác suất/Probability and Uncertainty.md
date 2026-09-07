---
tags: [physics, quantum-mechanics, feynman, empty-header]
status: growing
---
# Probability and Uncertainty

> [!note] Ghi chú nguồn
> Trong seed gốc, file `The Feynman Messenger Lectures Video Viewer.md` chứa tiêu đề *"Probability and Uncertainty: the quantum mechanical view of nature"* và dòng *"Transcript may not load until video starts playing."* — một **header rỗng**.
> Note này trả lời hứa đó, tổng hợp từ *The Character of Physical Law* Chương 6 (bản in của chính bài giảng này) và *The Feynman Lectures on Physics* Vol III Ch. 1. Video gốc: [Messenger Lecture #6](https://www.feynmanlectures.caltech.edu/fml.html#6).

> Bài giảng Messenger #6. Câu nói nổi tiếng nhất của Feynman ra đời trong bài này:
>
> **"I think I can safely say that nobody understands quantum mechanics."**

## 1. Câu nói đó nghĩa là gì — và không nghĩa là gì

| Nó **không** nghĩa là | Nó nghĩa là |
|---|---|
| Lý thuyết không rõ ràng | Lý thuyết cực kỳ rõ ràng — quy tắc tính toán không mơ hồ chút nào |
| Tiên đoán không chính xác | Nó là lý thuyết chính xác nhất từng có. Xem [[Quantum Electrodynamics]] |
| Không nên học | Học được, dùng được, chỉ là **không hình dung được** bằng trực giác đời thường |

Feynman diễn giải ngay sau đó: đừng hỏi *"nhưng làm sao nó có thể như thế được?"*, vì bạn sẽ *"go down the drain into a blind alley from which nobody has yet escaped."*

Đây là [[Physical Law vs Mechanism]] ở dạng gay gắt nhất: ta có định luật, ta không có cơ chế trực quan, và trong trường hợp này ta có **lý do để tin rằng sẽ không bao giờ có**.

## 2. Ba thứ tự nhiên làm mà trực giác cổ điển không cho phép

1. **Xác suất là cơ bản, không phải do ta thiếu thông tin.** Trong cơ học cổ điển, khi tung xúc xắc ta dùng xác suất *vì không biết đủ*. Trong cơ học lượng tử, một nguyên tử phóng xạ phân rã lúc nào là **không có câu trả lời** — không phải "có mà ta không biết".

2. **Biên độ, không phải xác suất, mới là thứ cộng lại.** Đây là điểm kỹ thuật quan trọng nhất:
   - Cổ điển: $P_{\text{tổng}} = P_1 + P_2$
   - Lượng tử: $\psi_{\text{tổng}} = \psi_1 + \psi_2$, rồi $P = |\psi_1 + \psi_2|^2$
   
   Vì biên độ là **số phức**, chúng có thể triệt tiêu nhau. Đó là **giao thoa** — và đó là toàn bộ sự khác biệt. Xem [[The Double Slit Experiment]].

3. **Đo lường thay đổi hệ.** Không phải vì thiết bị vụng về, mà vì nguyên tắc. Xem [[The Uncertainty Principle]].

## 3. Feynman về xác suất trong vật lý cổ điển vs lượng tử

Điểm ông nhấn mạnh, và hay bị bỏ qua: **vật lý cổ điển cũng dùng xác suất** — khí động học, chuyển động Brown, [[Entropy and the Second Law]]. Sự khác biệt không nằm ở việc *có* dùng xác suất hay không.

| | Xác suất cổ điển | Xác suất lượng tử |
|---|---|---|
| Nguồn gốc | Ta thiếu thông tin | **Bản chất của tự nhiên** |
| Có "biến ẩn" bên dưới? | ✅ Có — vị trí và vận tốc từng phân tử | ❌ Bất đẳng thức Bell loại trừ biến ẩn cục bộ |
| Cộng thế nào | Cộng xác suất | Cộng **biên độ**, rồi bình phương |
| Giao thoa? | Không | Có |

> [!note] Điều Feynman không thể nói năm 1964
> Bất đẳng thức Bell công bố **cùng năm** (1964), và các thí nghiệm kiểm chứng (Aspect 1982; loophole-free 2015) đến sau. Chúng cho thấy dòng thứ hai trong bảng trên không phải quan điểm mà là **kết quả thực nghiệm**: không lý thuyết biến ẩn cục bộ nào tái tạo được cơ học lượng tử. Nobel Vật lý 2022 trao cho Aspect, Clauser và Zeilinger vì việc này.

## 4. Feynman đã cảnh báo gì về việc "hiểu"

Trong *Lectures* Vol III Ch. 1, ông đưa lời khuyên sư phạm rõ ràng:

> "We cannot make the mystery go away by 'explaining' how it works. We will just **tell you** how it works."

Và ông chọn cách trình bày rất riêng: thay vì đi theo lịch sử (Planck → Bohr → Schrödinger), ông bắt đầu thẳng từ thí nghiệm hai khe — vì nó chứa *"the only mystery"*. Xem [[The Double Slit Experiment]].

Đây là lựa chọn sư phạm nhất quán với [[Against Rote Learning]]: đừng dạy con đường lịch sử quanh co; dạy hiện tượng cốt lõi trước.

## 5. Cạm bẫy

> [!warning] "Nobody understands quantum mechanics" không phải giấy phép nói bừa
> Câu này thường bị trích để biện minh cho đủ thứ tuyên bố huyền bí. Feynman nói câu đó *ngay sau khi* trình bày quy tắc tính toán một cách chính xác tuyệt đối. Không hiểu ≠ muốn nói gì cũng được.

- **Nhầm "quan sát viên" với "con người".** Đo lường trong cơ học lượng tử là tương tác với môi trường vĩ mô, không cần ý thức. Lý thuyết decoherence làm rõ điều này.
- **Tưởng xác suất lượng tử giống xác suất tung xúc xắc.** Xem bảng mục 3.
- **Dùng "bất định" theo nghĩa thông thường.** Nguyên lý bất định là một phát biểu định lượng chính xác: $\Delta x \Delta p \ge \hbar/2$.
- **Bỏ qua rằng lý thuyết cực kỳ chính xác.** QED khớp thực nghiệm tới 12 chữ số. "Không hiểu" chỉ nói về diễn giải, không nói về khả năng tiên đoán.

## 6. Checklist áp dụng

- [ ] Tôi phân biệt được xác suất do thiếu thông tin và xác suất bản chất?
- [ ] Tôi phát biểu được: **biên độ** cộng, không phải xác suất?
- [ ] Tôi biết bất đẳng thức Bell loại trừ điều gì?
- [ ] Tôi hiểu "không ai hiểu cơ học lượng tử" nói về **diễn giải** chứ không về **tiên đoán**?
- [ ] Khi gặp tuyên bố huyền bí viện dẫn cơ học lượng tử, tôi hỏi được nó tiên đoán gì kiểm được không?

## Tham khảo

- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 6 — **bản in đầy đủ của chính bài giảng này**
- [Messenger Lecture #6 — video](https://www.feynmanlectures.caltech.edu/fml.html#6)
- [The Feynman Lectures, Vol III Ch. 1 — Quantum Behavior](https://www.feynmanlectures.caltech.edu/III_01.html)
- Feynman, *QED: The Strange Theory of Light and Matter* (Princeton UP, 1985) — cách trình bày dễ nhất, không cần toán
- Bell, "On the Einstein Podolsky Rosen Paradox", *Physics* 1 (1964)
- Hensen et al., "Loophole-free Bell inequality violation", *Nature* 526 (2015)

## Liên kết

[[The Double Slit Experiment]] · [[The Uncertainty Principle]] · [[Path Integral Formulation]] · [[Quantum Electrodynamics]] · [[Physical Law vs Mechanism]] · [[Physics]]
