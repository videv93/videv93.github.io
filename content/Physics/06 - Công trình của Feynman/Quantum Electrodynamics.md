---
tags: [physics, qed, feynman, quantum-field-theory]
status: evergreen
---
# Quantum Electrodynamics

> Lý thuyết về tương tác giữa ánh sáng và vật chất. Công trình mang lại Nobel 1965 cho Feynman, Schwinger và Tomonaga — *"for their fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles"*.

**Lý thuyết vật lý chính xác nhất từng được xây dựng.** Mômen từ dị thường của electron khớp giữa lý thuyết và thực nghiệm tới **12 chữ số** — Feynman ví độ chính xác đó với việc đo khoảng cách từ Los Angeles tới New York với sai số bằng bề dày một sợi tóc.

## 1. Bối cảnh: vật lý lý thuyết bế tắc sau chiến tranh

Seed mô tả tình trạng rất cụ thể. QED cổ điển hoá cho ra **tích phân vô hạn** trong lý thuyết nhiễu loạn. Không phải sai số lớn — mà **vô cực** ở mọi phép tính vượt quá bậc thấp nhất.

> Gell-Mann, trích trong seed: *"Theoreticians were in disgrace."*

**Hội nghị Shelter Island, 6/1947** — bước ngoặt. Feynman: *"my first big conference with big men... I had never gone to one like this one in peacetime."* Nhưng các nhà lý thuyết bị lu mờ hoàn toàn bởi nhà thực nghiệm, những người báo cáo:

- **Lamb shift** — hai mức năng lượng của hydro mà lý thuyết Dirac nói phải bằng nhau, hoá ra lệch nhau.
- **Mômen từ dị thường của electron** — lệch khỏi giá trị Dirac tiên đoán.

Đây là dữ liệu chính xác buộc lý thuyết phải trả lời. Xem [[Seeking New Laws]] bước 3.

## 2. Ba lời giải song song, và một cuộc trình bày thất bại

Bethe đi trước: dựa trên công trình Kramers, ông rút ra phương trình phi tương đối tính đã tái chuẩn hoá cho Lamb shift. Bước tiếp theo là làm bản tương đối tính.

Feynman thử, dùng chính [[Path Integral Formulation]] từ luận án của mình. Lần đầu không hội tụ; ông làm lại cẩn thận, thêm số hạng cắt (cut-off), và **kết quả khớp với Bethe**.

**Hội nghị Pocono, 1948 — và nó diễn ra rất tệ.** Seed kể chi tiết:

> "Julian Schwinger gave a long presentation of his work in quantum electrodynamics, and Feynman then offered his version, entitled 'Alternative Formulation of Quantum Electrodynamics'. **The unfamiliar Feynman diagrams, used for the first time, puzzled the audience.** Feynman failed to get his point across, and Paul Dirac, Edward Teller and Niels Bohr all raised objections."

> [!note] Chi tiết đáng giữ nhất
> Lần đầu tiên [[Feynman Diagrams]] được trình bày công khai — công cụ nay có mặt trong mọi sách giáo khoa vật lý hạt — **không ai hiểu**. Ba trong số các nhà vật lý vĩ đại nhất thế kỷ phản đối. Việc một ý tưởng đúng bị bác bỏ khi mới ra mắt không phải chuyện hiếm.

**Dyson là người cứu.** Ông nhận ra Tomonaga, Schwinger và Feynman đang nói cùng một thứ bằng ba ngôn ngữ, tin rằng cách của Feynman dễ hiểu nhất, và thuyết phục được Oppenheimer. Bài báo 1949 của Dyson chứng minh ba lý thuyết tương đương và bổ sung quy tắc thực hiện [[Renormalization]].

## 3. Chuỗi bài báo của Feynman

| Năm | Bài | Nội dung |
|---|---|---|
| 1948 | "A Relativistic Cut-Off for Classical Electrodynamics" | Cố giải thích lại điều thất bại ở Pocono |
| 1949 | "The Theory of Positrons" | Giới thiệu **Feynman propagator**; positron = electron đi lùi thời gian |
| 1949 | "Space-Time Approach to Quantum Electrodynamics" | Bài trung tâm |
| 1950 | "Mathematical Formulation of the Quantum Theory of Electromagnetic Interaction" | Cơ sở toán học |
| 1951 | "An Operator Calculus Having Applications in Quantum Electrodynamics" | Công cụ mở rộng |

Seed ghi kết cục: *"While papers by others initially cited Schwinger, papers citing Feynman and employing Feynman diagrams appeared in 1950, and soon became prevalent."*

Lý do phương pháp Feynman thắng thế: nó **dạy được và tự động hoá được**. Sinh viên học nhanh, và về sau máy tính viết chương trình tính giản đồ.

## 4. Nội dung vật lý

QED mô tả mọi thứ bằng ba thành phần cơ bản:

| Thành phần | Nghĩa |
|---|---|
| Electron truyền từ A tới B | Propagator electron |
| Photon truyền từ A tới B | Propagator photon |
| Electron phát/hấp thụ photon | **Đỉnh tương tác** (vertex), cường độ $\sqrt{\alpha}$ |

Mọi hiện tượng điện từ — ánh sáng phản xạ, hoá học, tại sao vật rắn cứng — là tổ hợp của ba thành phần này. Feynman trình bày đúng như vậy trong cuốn *QED* dành cho công chúng, không dùng một phương trình nào.

Hằng số ghép: $\alpha \approx 1/137$ — nhỏ, nên khai triển nhiễu loạn hội tụ tốt, và đó là lý do QED tính được chính xác đến vậy. Nhưng vì sao nó bằng 1/137 thì không ai biết. Xem [[The Gravity-Electricity Ratio]].

## 5. Cạm bẫy

> [!warning] Đánh giá thấp mức độ nghiêm trọng của bài toán vô hạn
> QED **không** được "sửa" theo nghĩa các vô hạn biến mất. Chúng được hấp thụ vào các đại lượng đo được. Chính Feynman gọi đó là *"hocus-pocus"* và *"a dippy process"*. Xem [[Renormalization]].

- **Tưởng Feynman làm một mình.** Nobel chia ba, Dyson là người khiến nó dùng được, Bethe đi trước. Seed rất rõ về điều này.
- **Nhầm QED với toàn bộ cơ học lượng tử.** QED là lý thuyết trường lượng tử của *tương tác điện từ*. Nó không bao gồm tương tác mạnh, yếu hay hấp dẫn.
- **Tưởng độ chính xác 12 chữ số nghĩa là lý thuyết hoàn chỉnh.** QED chính xác trong miền của nó và vẫn để ngỏ mọi câu hỏi ở [[Quantum Gravity]].
- **Bỏ qua ý kiến của Schwinger.** Ông gọi giản đồ Feynman là *"pedagogy, not physics"* — một phê bình có nội dung, xem [[Feynman Diagrams]].

## 6. Checklist áp dụng

- [ ] Tôi mô tả được bài toán vô hạn và vì sao nó là bế tắc thực sự?
- [ ] Tôi nêu được vai trò của Bethe, Schwinger, Tomonaga và Dyson?
- [ ] Tôi liệt kê được ba thành phần cơ bản của QED?
- [ ] Tôi biết $\alpha$ là gì và vì sao giá trị nhỏ của nó quan trọng?
- [ ] Tôi phân biệt được "chính xác" và "hoàn chỉnh" khi nói về một lý thuyết?

## Tham khảo

- Feynman, *QED: The Strange Theory of Light and Matter* (Princeton UP, 1985). ISBN 0-691-02417-0 — **cách vào tốt nhất, không cần toán**
- Feynman, "Space-Time Approach to Quantum Electrodynamics", *Phys. Rev.* 76 (1949) 769
- Feynman, "The Development of the Space-Time View of Quantum Electrodynamics", *Science* 153 (1966) — bài giảng Nobel, ông tự kể quá trình
- Dyson, "The Radiation Theories of Tomonaga, Schwinger, and Feynman", *Phys. Rev.* 75 (1949)
- Schweber, *QED and the Men Who Made It* (Princeton UP, 1994). ISBN 0-691-03327-7 — lịch sử đầy đủ nhất
- Fan et al., "Measurement of the Electron Magnetic Moment", *Phys. Rev. Lett.* 130 (2023) — phép đo chính xác nhất hiện nay

## Liên kết

[[Feynman Diagrams]] · [[Renormalization]] · [[Path Integral Formulation]] · [[Probability and Uncertainty]] · [[Quantum Gravity]] · [[Feynman Biography]] · [[Physics]]
