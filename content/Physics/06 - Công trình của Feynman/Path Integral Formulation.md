---
tags: [physics, quantum-mechanics, feynman]
status: evergreen
---
# Path Integral Formulation

> Cách phát biểu cơ học lượng tử của Feynman: để đi từ A tới B, hạt đi theo **mọi** đường khả dĩ cùng lúc, và ta cộng một biên độ cho mỗi đường.

$$\langle B|A\rangle = \sum_{\text{mọi đường}} e^{iS[\text{đường}]/\hbar}$$

trong đó $S$ là **tác dụng** (action) — chính đại lượng xuất hiện trong nguyên lý tác dụng tối thiểu cổ điển. Xem [[Three Equivalent Formulations]].

## 1. Nguồn gốc: luận án Princeton 1942

Seed ghi: luận án tên *"The Principle of Least Action in Quantum Mechanics"*, người hướng dẫn John Archibald Wheeler.

> "Feynman applied the principle of stationary action to problems of quantum mechanics, inspired by a desire to quantize the Wheeler–Feynman absorber theory of electrodynamics, and laid the groundwork for the path integral formulation and Feynman diagrams."

**Động cơ ban đầu là lượng tử hoá một lý thuyết hoá ra sai.** Xem [[Wheeler-Feynman Absorber Theory]]. Nhưng lý thuyết đó có một đặc điểm buộc Feynman phải tìm cách mới: nó không có Hamiltonian theo nghĩa thông thường, nên cách lượng tử hoá chuẩn không áp dụng được. Ông phải xây một cách khác — và cách khác đó tổng quát hơn.

Về giai đoạn này Gleick viết, trích trong seed:

> "This was Richard Feynman nearing the crest of his powers. At twenty-three... there may now have been no physicist on earth who could match his exuberant command over the native materials of theoretical science."

## 2. Vì sao vật cổ điển đi đường "tối ưu"

Đây là kết quả đẹp nhất của hình thức luận này — nó **giải thích** nguyên lý tác dụng tối thiểu thay vì giả định nó.

Mỗi đường đóng góp một số phức có cùng độ lớn nhưng khác **pha**: $e^{iS/\hbar}$.

- **Đường xa đường cổ điển:** $S$ thay đổi nhanh khi ta xê dịch đường một chút → pha quay nhanh → các đóng góp **triệt tiêu lẫn nhau**.
- **Gần đường cổ điển:** $S$ **dừng** (stationary) — thay đổi bậc hai, không bậc nhất → pha gần như không đổi → các đóng góp **cộng dồn**.

Kết quả: ở giới hạn $\hbar \to 0$ (vật vĩ mô), chỉ đường cổ điển sống sót.

> [!note] Đây là câu trả lời cho một câu hỏi Feynman đặt ra ở bài giảng #2
> Ở đó, ông trình bày nguyên lý tác dụng tối thiểu như một cách phát biểu *kỳ lạ* — vật như thể "ngửi" mọi đường rồi chọn, và ta mất khái niệm nhân quả. Ông nói: *"the fact that a minimum principle exists turns out to be a **consequence** of the fact that, on a small scale, particles obey quantum mechanics."*
> Hoá ra hạt **thật sự** ngửi mọi đường. Không phải ẩn dụ.

## 3. Vì sao nó quan trọng ngoài cơ học lượng tử

| Lĩnh vực | Ứng dụng |
|---|---|
| **Lý thuyết trường lượng tử** | Cách chuẩn để lượng tử hoá lý thuyết gauge; [[Feynman Diagrams]] rút ra từ khai triển tích phân đường |
| **Cơ học thống kê** | Thay $t \to -i\tau$ (thời gian ảo) → tích phân đường thành hàm phân hoạch |
| **Tài chính định lượng** | Công thức **Feynman–Kac** — nghiệm PDE parabolic biểu diễn bằng kỳ vọng trên quá trình ngẫu nhiên |
| **Lattice QCD** | Tính số phi nhiễu loạn cho tương tác mạnh |

Seed ghi nhận chuyển giao sang toán học:

> "Marc Kac adapted Feynman's technique of summing over possible histories of a particle to the study of parabolic partial differential equations, yielding what is now known as the **Feynman–Kac formula**, the use of which extends beyond physics to many applications of stochastic processes."

Đây là chiều ngược của điều Feynman mô tả ở [[Mathematics as Language and Reasoning]]: nhà vật lý chế công cụ, rồi *"pass back to the mathematicians"*.

## 4. Ưu và nhược so với hình thức luận toán tử

| | Tích phân đường | Toán tử (Schrödinger/Heisenberg) |
|---|---|---|
| Bất biến Lorentz | ✅ Hiển nhiên | ❌ Phải kiểm tra |
| Đối xứng | ✅ Dễ áp đặt | ⚠️ Khó hơn |
| Giới hạn cổ điển | ✅ Rõ ràng | ⚠️ Cần lập luận |
| Chặt chẽ toán học | ❌ Độ đo trên không gian đường **chưa được định nghĩa chặt** | ✅ Chuẩn |
| Tính số | ✅ Lattice, Monte Carlo | ⚠️ Khó với hệ nhiều hạt |

Dòng "chặt chẽ toán học" đáng chú ý: tích phân đường Feynman, sau 80 năm, **vẫn chưa có nền tảng toán học chặt chẽ** trong trường hợp tổng quát (bản Euclid với độ đo Wiener thì có). Nó hoạt động hoàn hảo và chưa ai chứng minh được tại sao.

## 5. Cạm bẫy

> [!warning] "Hạt đi mọi đường" là phát biểu về **biên độ**, không về quỹ đạo
> Hạt không có quỹ đạo. Cách nói "đi mọi đường" mô tả cách tính biên độ. Cùng cạm bẫy như "electron đi qua cả hai khe" trong [[The Double Slit Experiment]].

- **Tưởng "mọi đường" nghĩa là đường trơn.** Không — bao gồm cả đường zigzag, đường quay ngược, đường không khả vi. Phần lớn đóng góp đến từ những đường không đâu vào đâu.
- **Nhầm với tổng trên các "vũ trụ song song".** Không liên quan tới diễn giải nhiều thế giới.
- **Bỏ qua $\hbar$.** Chính tỉ số $S/\hbar$ quyết định giao thoa. Với vật vĩ mô $S \gg \hbar$ nên triệt tiêu gần như hoàn toàn.
- **Coi tác dụng tối thiểu là mục đích luận.** Không có "ý định" nào. Xem [[Three Equivalent Formulations]] mục 5.
- **Nhầm với Feynman diagrams.** Giản đồ *rút ra từ* khai triển nhiễu loạn của tích phân đường. Tích phân đường tổng quát hơn và dùng được cả khi nhiễu loạn không hợp lệ.

## 6. Checklist áp dụng

- [ ] Tôi viết được công thức và giải thích mỗi ký hiệu?
- [ ] Tôi giải thích được **cơ chế triệt tiêu pha** cho ra đường cổ điển?
- [ ] Tôi nói được vì sao đây là câu trả lời cho câu hỏi Feynman nêu ở bài giảng #2?
- [ ] Tôi biết ưu điểm và nhược điểm so với hình thức luận toán tử?
- [ ] Tôi phân biệt được tích phân đường và giản đồ Feynman?

## Tham khảo

- Feynman, "Space-time approach to non-relativistic quantum mechanics", *Rev. Mod. Phys.* 20 (1948) 367 — **bài gốc**
- Feynman & Hibbs, *Quantum Mechanics and Path Integrals* (McGraw Hill, 1965). ISBN 0-07-020650-3
- Feynman, *The Principle of Least Action in Quantum Mechanics* (luận án Princeton 1942), xuất bản 2005 với tên *Feynman's Thesis*. ISBN 978-981-256-380-4
- [The Feynman Lectures, Vol II Ch. 19 — The Principle of Least Action](https://www.feynmanlectures.caltech.edu/II_19.html)
- Kac, "On Distributions of Certain Wiener Functionals", *Trans. AMS* 65 (1949) — công thức Feynman–Kac

## Liên kết

[[Three Equivalent Formulations]] · [[Feynman Diagrams]] · [[Wheeler-Feynman Absorber Theory]] · [[The Double Slit Experiment]] · [[Quantum Electrodynamics]] · [[Mathematics as Language and Reasoning]] · [[Physics]]
