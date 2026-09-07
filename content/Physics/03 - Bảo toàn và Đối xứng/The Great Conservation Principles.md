---
tags: [physics, conservation, feynman, empty-header]
status: growing
---
# The Great Conservation Principles

> [!note] Ghi chú nguồn
> Trong seed gốc, file `The Feynman Messenger Lectures Video Viewer.md` chứa tiêu đề *"The Great Conservation Principles"* và dòng *"Transcript may not load until video starts playing."* — một **header rỗng**.
> Note này trả lời hứa đó, tổng hợp từ *The Character of Physical Law* Chương 3 (bản in của chính bài giảng này), *The Feynman Lectures on Physics* Vol I, và các nguồn chuẩn khác. Video gốc: [Messenger Lecture #3](https://www.feynmanlectures.caltech.edu/fml.html#3).

> Bài giảng Messenger #3. Luận điểm: **định luật bảo toàn quan trọng hơn các định luật cụ thể sinh ra chúng** — vì chúng sống sót qua mọi cuộc cách mạng vật lý.

## 1. Bảo toàn nghĩa là gì

Feynman đưa định nghĩa gọn nhất có thể trong bài giảng #2: *"'Conservation' just means that it doesn't change."*

Nhưng cấu trúc đầy đủ có ba phần:

| Thành phần | Nội dung |
|---|---|
| **Đại lượng** | Một con số tính được từ trạng thái hệ |
| **Quy tắc** | Con số đó không đổi theo thời gian |
| **Điều kiện** | Hệ phải **kín** — không trao đổi với bên ngoài |

Phần thứ ba là phần bị bỏ quên nhiều nhất, và là nguồn của gần như mọi lỗi khi áp dụng.

## 2. Danh mục các đại lượng bảo toàn

| Đại lượng | Trạng thái | Ghi chú |
|---|---|---|
| **Năng lượng** | Chính xác | Bao gồm khối lượng qua $E = mc^2$. Xem [[Conservation of Energy]] |
| **Động lượng** | Chính xác | Xem [[Conservation of Momentum]] |
| **Mômen động lượng** | Chính xác | Kể cả trong cơ học lượng tử. Xem [[Conservation of Angular Momentum]] |
| **Điện tích** | Chính xác | Chưa từng thấy vi phạm |
| **Số baryon** | Gần đúng rất tốt | Nếu vi phạm, proton phải phân rã — chưa quan sát được, chu kỳ bán rã > 10³⁴ năm |
| **Số lepton** | Gần đúng | Dao động neutrino cho thấy số lepton theo *thế hệ* không bảo toàn |
| **Parity** | ❌ **Bị vi phạm** | Sụp đổ năm 1957. Xem [[Parity Violation]] |
| **Strangeness** | Bảo toàn ở tương tác mạnh, vi phạm ở tương tác yếu | Ví dụ mẫu của "bảo toàn có điều kiện" |

> [!note] Điểm Feynman nhấn mạnh nhất
> Không phải mọi đại lượng bảo toàn đều bảo toàn *như nhau*. Có ba mức: **chính xác**, **bảo toàn với một số tương tác nhưng không phải mọi tương tác**, và **hoá ra sai**. Phân biệt được ba mức này là phân biệt được vật lý với việc thuộc lòng danh sách.

## 3. Vì sao chúng quan trọng hơn định luật cụ thể

Ba lý do, mỗi lý do đã xuất hiện ở chỗ khác trong vault:

1. **Chúng sống sót khi cơ chế bị thay.** Lực, quỹ đạo, hạt điểm — tất cả bị vứt bỏ khi cơ học lượng tử tới. Bảo toàn mômen động lượng thì không. Xem [[Theorems Beyond Their Derivation]].
2. **Chúng đến từ đối xứng, không đến từ chi tiết động lực học.** Đây là lý do sâu xa của điểm 1. Xem [[Symmetry and Conservation Laws]].
3. **Chúng cho phép tính toán mà không cần biết chi tiết.** Bạn không cần giải phương trình chuyển động để biết kết quả va chạm — chỉ cần đếm năng lượng và động lượng vào/ra.

Điểm 3 là lý do thực dụng khiến chúng có mặt ở mọi bài toán vật lý. Điểm 1 và 2 là lý do chúng có mặt trong bài giảng của Feynman.

## 4. Bảo toàn như công cụ săn hạt mới

Đây là ứng dụng ngoạn mục nhất, và Feynman rất thích nó:

**Phân rã beta, 1930.** Neutron → proton + electron. Đo năng lượng: **thiếu**. Đo động lượng: **thiếu**. Đo spin: **không khớp**.

Hai lựa chọn:
- Bỏ định luật bảo toàn năng lượng (Bohr từng nghiêm túc đề xuất điều này).
- Giả định có một hạt chưa thấy mang phần thiếu đi.

Pauli chọn cách hai và đặt tên **neutrino**. Được xác nhận trực tiếp 26 năm sau (Cowan–Reines, 1956).

> Đây đúng là **chiến lược Neptune** trong [[Predictive Triumphs of Gravitation]]: giữ định luật, giả định thứ chưa thấy, và tiên đoán tính chất cụ thể của nó để người khác đi kiểm.

## 5. Cạm bẫy

> [!warning] "Năng lượng luôn bảo toàn"
> Chỉ đúng cho **hệ kín**. Và trong thuyết tương đối rộng, với vũ trụ đang giãn nở, "năng lượng toàn vũ trụ" thậm chí không phải một khái niệm được định nghĩa tốt — vì định lý Noether cần một đối xứng tịnh tiến thời gian mà vũ trụ giãn nở không có.

- **Quên điều kiện hệ kín.** Lỗi phổ biến nhất. Bóng nảy "mất" năng lượng — không, nó chuyển sang nhiệt và âm thanh, và bạn đã vẽ biên hệ sai.
- **Coi mọi định luật bảo toàn cùng hạng.** Xem bảng ở mục 2. Parity từng nằm trong danh sách "chính xác" cho tới 1957.
- **Nhầm "bảo toàn" với "không đổi".** Năng lượng có thể đổi *dạng* liên tục — động năng ↔ thế năng ↔ nhiệt. Tổng mới bảo toàn.
- **Dùng để bác bỏ mà không kiểm tra hệ.** "Cỗ máy này vi phạm bảo toàn năng lượng" là lập luận rất mạnh — nhưng phải chỉ ra được biên hệ và dòng năng lượng qua biên.

## 6. Checklist áp dụng

- [ ] Với bài toán đang xét: tôi vẽ được biên hệ và biết cái gì đi qua biên chưa?
- [ ] Tôi biết đại lượng mình đang dùng thuộc mức nào trong ba mức ở mục 2?
- [ ] Tôi giải quyết được bài toán bằng bảo toàn thay vì giải phương trình chuyển động không?
- [ ] Khi thấy đại lượng "thiếu", tôi có xét khả năng có thứ chưa quan sát được không?
- [ ] Tôi nói được mỗi định luật bảo toàn đến từ đối xứng nào?

## Tham khảo

- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 3 — **bản in đầy đủ của chính bài giảng này**
- [Messenger Lecture #3 — video](https://www.feynmanlectures.caltech.edu/fml.html#3)
- [The Feynman Lectures, Vol I Ch. 4 — Conservation of Energy](https://www.feynmanlectures.caltech.edu/I_04.html)
- Pauli, thư ngỏ gửi hội nghị Tübingen (4/12/1930) — bản gốc đề xuất neutrino
- Cowan & Reines et al., "Detection of the Free Neutrino", *Science* 124 (1956)

## Liên kết

[[Conservation of Energy]] · [[Conservation of Momentum]] · [[Conservation of Angular Momentum]] · [[Symmetry and Conservation Laws]] · [[Parity Violation]] · [[Theorems Beyond Their Derivation]] · [[Physics]]
