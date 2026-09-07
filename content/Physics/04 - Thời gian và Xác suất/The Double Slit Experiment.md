---
tags: [physics, quantum-mechanics, experiment]
status: evergreen
---
# The Double Slit Experiment

> Feynman gọi nó là hiện tượng *"which has in it the heart of quantum mechanics. In reality, it contains **the only mystery**."* Ông xây toàn bộ Volume III của *The Feynman Lectures* xung quanh nó, thay vì đi theo trình tự lịch sử.

## 1. Ba lần chạy thí nghiệm

Cùng thiết bị: nguồn bắn hạt → tấm chắn có hai khe → màn ghi nhận.

| Lần chạy | Bắn cái gì | Kết quả trên màn | Nghĩa là |
|---|---|---|---|
| **1** | Viên đạn (cổ điển, hạt) | Hai vệt, $P_{12} = P_1 + P_2$ | Hành xử như hạt |
| **2** | Sóng nước | Vân giao thoa, $I_{12} \ne I_1 + I_2$ | Hành xử như sóng |
| **3** | **Electron** | **Vân giao thoa** — nhưng màn ghi nhận **từng chấm rời rạc** | ⚠️ Cả hai, và không cái nào |

Lần chạy 3 là chỗ vấn đề nằm. Electron tới **từng cái một** (đếm được, mỗi cái một chấm sáng), nhưng phân bố tích luỹ của hàng triệu chấm lại tạo thành **vân giao thoa**.

Nếu mỗi electron là một hạt đi qua *một* khe, không thể có vân giao thoa.
Nếu mỗi electron là một sóng, không thể có chấm rời rạc.

## 2. Phần thật sự khó: bịt một khe

Bịt khe 2 → vân giao thoa **biến mất**, còn lại một vệt đơn giản.

Nghĩa là: mỗi electron "biết" khe kia có mở hay không. Kể cả khi ta bắn **một** electron mỗi phút, đợi nó tới màn rồi mới bắn con tiếp theo — vân giao thoa vẫn xuất hiện sau đủ lâu.

**Một electron giao thoa với chính nó.**

Quy tắc tính toán, và nó hoàn toàn không mơ hồ:

$$\psi = \psi_1 + \psi_2, \qquad P = |\psi_1 + \psi_2|^2 = |\psi_1|^2 + |\psi_2|^2 + 2\,\mathrm{Re}(\psi_1^*\psi_2)$$

Số hạng thứ ba là **số hạng giao thoa**. Nó không có mặt trong vật lý cổ điển, và nó là toàn bộ sự khác biệt.

## 3. Phần khó hơn nữa: nhìn xem nó đi qua khe nào

Đặt một máy dò ở mỗi khe để xác định electron đi lối nào.

**Kết quả:** máy dò luôn báo electron đi qua *một* khe cụ thể. Và **vân giao thoa biến mất**. Phân bố trở lại $P_1 + P_2$ — hành xử hạt.

Tắt máy dò → vân giao thoa trở lại.

> [!warning] Đây không phải chuyện "thiết bị đo làm nhiễu"
> Cách giải thích quen thuộc — "photon dùng để dò va vào electron nên làm lệch nó" — đúng về mặt cơ chế trong một số bố trí, nhưng **không phải bản chất**. Các thí nghiệm quantum eraser (Scully & Drühl 1982; Kim et al. 1999) cho thấy: nếu ta xoá thông tin về đường đi *sau khi* electron đã tới màn, vân giao thoa **trở lại**. Cái quyết định là **thông tin về đường đi có tồn tại hay không**, không phải lực tác dụng lên hạt.

Phát biểu chính xác: nếu về nguyên tắc có thể biết hạt đi đường nào, biên độ không cộng — xác suất cộng. Nếu về nguyên tắc không thể biết, biên độ cộng.

## 4. Vì sao Feynman xây cả Volume III quanh nó

Lựa chọn sư phạm này rất có chủ đích, và đáng học riêng:

- **Trình tự lịch sử che mất vấn đề.** Planck → Bohr → de Broglie → Schrödinger là con đường quanh co, và người học dễ tưởng mỗi bước đã "giải quyết" cái gì đó. Không cái nào giải quyết được điều ở mục 3.
- **Một thí nghiệm chứa toàn bộ.** Nếu hiểu được thí nghiệm hai khe, mọi thứ còn lại trong cơ học lượng tử là kỹ thuật.
- **Nó buộc phải đối mặt ngay.** Không có cách nào "làm quen dần" với điều này.

Đây là [[Against Rote Learning]] áp dụng cho chính việc thiết kế giáo trình.

> [!note] Thí nghiệm thật, không chỉ tưởng tượng
> Năm 1964 Feynman gọi nó là thí nghiệm tưởng tượng — công nghệ chưa làm được với electron đơn lẻ. Nay đã làm được: Merli (1974), Tonomura (1989) với electron; và với phân tử lớn tới **2.000 nguyên tử** (Fein et al., 2019). Kết quả đúng như tiên đoán.

## 5. Cạm bẫy

- **"Electron đi qua cả hai khe."** Cách nói tiện nhưng không chính xác. Chính xác hơn: **biên độ** đi qua cả hai khe; electron không có "đường đi" xác định cho tới khi bị đo. Xem [[Path Integral Formulation]] — ở đó nó thực sự đi qua *mọi* đường.
- **Nhầm "quan sát" với "có người nhìn".** Máy dò là một hệ vĩ mô; ý thức không liên quan.
- **Tưởng đây là hiệu ứng của hạt nhỏ.** Nó áp dụng cho **mọi thứ** — chỉ là bước sóng de Broglie của vật vĩ mô nhỏ đến mức không quan sát được.
- **Coi giao thoa là "hạt tách làm hai".** Không có nửa electron nào tới màn. Mỗi lần một chấm, nguyên vẹn.
- **Bỏ qua vế "về nguyên tắc".** Không cần ai *đọc* dữ liệu máy dò. Chỉ cần thông tin đó **tồn tại** ở đâu đó là đủ để phá giao thoa.

## 6. Checklist áp dụng

- [ ] Tôi mô tả được cả ba lần chạy và kết quả từng lần?
- [ ] Tôi viết được công thức và chỉ ra số hạng giao thoa?
- [ ] Tôi giải thích được vì sao "thiết bị làm nhiễu" **không** phải lời giải thích đúng?
- [ ] Tôi phát biểu được điều kiện chính xác để giao thoa xảy ra (thông tin đường đi)?
- [ ] Tôi tránh được cách nói "electron đi qua cả hai khe" khi cần chính xác?

## Tham khảo

- [The Feynman Lectures, Vol III Ch. 1 — Quantum Behavior](https://www.feynmanlectures.caltech.edu/III_01.html) — **nguồn gốc của cách trình bày này**
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 6
- [Messenger Lecture #6](https://www.feynmanlectures.caltech.edu/fml.html#6)
- Tonomura et al., "Demonstration of single-electron buildup of an interference pattern", *Am. J. Phys.* 57 (1989)
- Kim et al., "A Delayed Choice Quantum Eraser", *Phys. Rev. Lett.* 84 (2000)
- Fein et al., "Quantum superposition of molecules beyond 25 kDa", *Nature Physics* 15 (2019)

## Liên kết

[[Probability and Uncertainty]] · [[The Uncertainty Principle]] · [[Path Integral Formulation]] · [[Quantum Electrodynamics]] · [[Against Rote Learning]] · [[Physics]]
