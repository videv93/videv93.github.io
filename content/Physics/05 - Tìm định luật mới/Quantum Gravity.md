---
tags: [physics, gravitation, quantum-mechanics, open-problems]
status: growing
---
# Quantum Gravity

> Lỗ hổng lớn nhất trong vật lý, và Feynman nêu nó thẳng trong bài giảng #1 — rồi tự mình đâm đầu vào suốt hai thập kỷ.

> "There is **no quantum theory of gravity today**: people have not succeeded completely in making a theory which is consistent with the uncertainty principles and the quantum mechanical principles."

Sau 60 năm, câu đó vẫn đúng.

## 1. Vì sao hai lý thuyết không ghép được

| | Cơ học lượng tử / QFT | Thuyết tương đối rộng |
|---|---|---|
| Không-thời gian | **Nền cố định**, cho sẵn | **Đối tượng động**, bị uốn bởi vật chất |
| Đại lượng cơ bản | Toán tử trên không gian Hilbert | Metric tensor $g_{\mu\nu}$ |
| Xử lý vô hạn | [[Renormalization]] — hữu hạn số tham số | **Thất bại** — cần vô hạn tham số |
| Đã kiểm ở | Thang hạt, tới 12 chữ số | Thang thiên văn |

Vấn đề kỹ thuật cốt lõi: hấp dẫn lượng tử **không tái chuẩn hoá được** (non-renormalizable). Mỗi bậc nhiễu loạn cao hơn cần thêm một tham số mới phải đo. Lý thuyết mất khả năng tiên đoán ở năng lượng cao.

Thang mà vấn đề trở nên nghiêm trọng — **thang Planck**:

$$E_P \approx 10^{19}\ \text{GeV}, \qquad \ell_P \approx 1{,}6\times10^{-35}\ \text{m}$$

Cao hơn năng lượng LHC khoảng $10^{15}$ lần. Đó là lý do không có dữ liệu thực nghiệm để dẫn đường — và không có dữ liệu thì bước 3 của [[Seeking New Laws]] không chạy được.

## 2. Feynman đã làm gì

Ông tiếp cận bằng **loại suy**, đúng phương pháp ở [[How to Guess a New Law]] mục 2.2:

**Bước 1 — Trường spin 2.** Photon là trường không khối lượng spin 1 → thử trường không khối lượng **spin 2**. Kết quả: **thu được phương trình trường Einstein**. Wikipedia clipping trong seed ghi: *"derived the Einstein field equation of general relativity, **but little more**."*

Đây là một kết quả đẹp: thuyết tương đối rộng **không cần** hình học như xuất phát điểm; nó xuất hiện từ lý thuyết trường lượng tử của một hạt spin 2 trong không gian phẳng.

**Bước 2 — "Ghost".** Khi tính các giản đồ vòng lặp, Feynman phát hiện cần đưa vào những "hạt" trong lòng giản đồ có **quan hệ sai giữa spin và thống kê**. Chúng không phải hạt thật; chúng là công cụ tính toán để giữ tính unitary.

**Hệ quả ngoài dự kiến — và đây là phần quan trọng nhất.** "Ghost" hoá ra là công cụ thiết yếu cho **lý thuyết Yang–Mills**, tức là cho QCD và lý thuyết điện yếu. Chúng được Faddeev và Popov phát triển đầy đủ, và nay gọi là Faddeev–Popov ghost.

> [!note] Một thất bại sinh ra một công cụ nền tảng
> Feynman không giải được lượng tử hấp dẫn. Nhưng công cụ ông chế ra để thử lại trở thành thành phần bắt buộc trong việc lượng tử hoá **mọi** lý thuyết gauge — tức là trong toàn bộ Mô hình Chuẩn.
> Đây là mẫu lặp lại trong sự nghiệp ông: xem [[Wheeler-Feynman Absorber Theory]], một lý thuyết sai khác đẻ ra [[Path Integral Formulation]].

Seed ghi nhận phạm vi công việc của ông: *"He did work on all four of the fundamental interactions of nature."* Và trích Gribbin: *"Nobody else has made such influential contributions to the investigation of all four of the interactions."*

## 3. Các hướng hiện tại

| Hướng | Ý tưởng cốt lõi | Trạng thái |
|---|---|---|
| **Lý thuyết dây** | Hạt là dây dao động; hấp dẫn tự động xuất hiện | Toán học phong phú; **chưa có tiên đoán kiểm được** ở thang tiếp cận được |
| **Loop quantum gravity** | Lượng tử hoá chính không-thời gian; nó rời rạc ở thang Planck | Chưa tái tạo được giới hạn cổ điển một cách thuyết phục |
| **Asymptotic safety** | Hấp dẫn có thể tái chuẩn hoá được ở mức phi nhiễu loạn | Bằng chứng số, chưa chứng minh |
| **Causal set theory** | Không-thời gian là tập rời rạc có thứ tự nhân quả | Rất gần **giả thuyết bàn cờ** của Feynman — xem [[Physical Law vs Mechanism]] |
| **Holography / AdS-CFT** | Hấp dẫn trong khối tương đương lý thuyết trường trên biên | Kết quả mạnh, nhưng cho không-thời gian không giống vũ trụ ta ở |

> [!warning] Không hướng nào có tiên đoán thực nghiệm phân biệt được
> Đây chính là tình huống [[Why Wrong Theories Are Rejected]] mô tả là nguy hiểm: nhiều lý thuyết cạnh tranh, tất cả khớp dữ liệu đã biết, không cái nào bị bác bỏ được bằng thí nghiệm khả thi. Ngành đã ở trạng thái này khoảng 40 năm.

## 4. Cạm bẫy

- **Tưởng lý thuyết dây đã là câu trả lời.** Nó là một chương trình nghiên cứu, chưa phải một lý thuyết đã kiểm chứng.
- **Nhầm "chưa có lý thuyết" với "hai lý thuyết mâu thuẫn".** Cơ học lượng tử và thuyết tương đối rộng **không mâu thuẫn** trong miền chúng đã được kiểm. Chúng chỉ không có ngôn ngữ chung ở thang Planck.
- **Bỏ qua rằng đã có lý thuyết hiệu dụng.** Hấp dẫn lượng tử ở **năng lượng thấp** hoạt động tốt như một effective field theory — tính được hiệu chỉnh lượng tử cho thế Newton. Vấn đề chỉ xuất hiện ở năng lượng cao.
- **Coi thiếu dữ liệu là vấn đề tạm thời.** Thang Planck cao hơn khả năng máy gia tốc $10^{15}$ lần. Hy vọng thực tế nằm ở quan sát gián tiếp: sóng hấp dẫn nguyên thuỷ, tia vũ trụ siêu cao, vật lý lỗ đen.

## 5. Checklist áp dụng

- [ ] Tôi nêu được **lý do kỹ thuật** khiến hai lý thuyết không ghép được (không tái chuẩn hoá được)?
- [ ] Tôi biết thang Planck là bao nhiêu và vì sao nó khiến việc kiểm chứng bất khả?
- [ ] Tôi kể được Feynman đã làm gì và kết quả ngoài dự kiến là gì?
- [ ] Tôi liệt kê được ≥3 hướng tiếp cận và vấn đề của mỗi hướng?
- [ ] Khi đọc tuyên bố "đã có lý thuyết vạn vật", tôi hỏi được nó tiên đoán gì kiểm được không?

## Tham khảo

- [Messenger Lecture #1](https://www.feynmanlectures.caltech.edu/fml.html#1) — đoạn Feynman nêu vấn đề
- Feynman, *Lectures on Gravitation* (Addison Wesley, 1995), biên tập bởi Brian Hatfield. ISBN 0-201-62734-5 — **công trình đầy đủ của Feynman về chủ đề này**
- Feynman, "Quantum theory of gravitation", *Acta Physica Polonica* 24 (1963) — bài gốc về ghost
- Faddeev & Popov, "Feynman diagrams for the Yang-Mills field", *Phys. Lett. B* 25 (1967)
- Donoghue, "Introduction to the Effective Field Theory Description of Gravity", arXiv:gr-qc/9512024 — vì sao hấp dẫn lượng tử năng lượng thấp vẫn tính được

## Liên kết

[[Seeking New Laws]] · [[How to Guess a New Law]] · [[The Unfinished Structure of Physics]] · [[Renormalization]] · [[Quantum Electrodynamics]] · [[Wheeler-Feynman Absorber Theory]] · [[The Gravity-Electricity Ratio]] · [[Physics]]
