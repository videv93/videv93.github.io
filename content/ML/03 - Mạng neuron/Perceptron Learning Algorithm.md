---
tags: [ml, thuật-toán, neural-network, classification, lịch-sử]
status: evergreen
---
# Perceptron Learning Algorithm

> Mô hình neuron nhân tạo đầu tiên (Rosenblatt, 1958). Nó gần như vô dụng trong thực tế hiện nay — nhưng **giới hạn** của nó là bài học quan trọng nhất trong lịch sử ngành, và nó là khung xương mà [[Logistic Regression]] và [[Multilayer Perceptron]] được xây lên.

## 1. Khái niệm cốt lõi

Mô hình: $\hat{y} = \text{sgn}(\mathbf{w}^T\mathbf{x})$, nhãn $y \in \{-1, +1\}$.

**Quy tắc học** — đơn giản đến mức đáng nhớ: duyệt từng điểm; nếu phân loại **sai** thì
$$\mathbf{w} \leftarrow \mathbf{w} + y_i\mathbf{x}_i$$
Nếu đúng thì không làm gì.

Trực giác: khi sai, đẩy vector trọng số về phía điểm đó (nếu nhãn dương) hoặc ra xa (nếu nhãn âm) — đúng một lượng vừa đủ để "kéo" biên về phía đúng.

**Định lý hội tụ perceptron:** nếu dữ liệu **tách được tuyến tính**, thuật toán dừng sau hữu hạn bước. Nếu không tách được, nó **chạy mãi mãi** và không hội tụ.

### So sánh với các mô hình tuyến tính khác

| | Perceptron | [[Logistic Regression]] | [[Support Vector Machine]] |
|---|---|---|---|
| Đầu ra | Nhãn $\pm 1$ | Xác suất | Nhãn + margin |
| Hàm mất mát | Perceptron loss | Cross-entropy | Hinge loss |
| Nghiệm khi tách được | **Bất kỳ** siêu phẳng tách được | Đẩy biên ra xa dần | **Margin cực đại** — duy nhất |
| Khi không tách được | Không hội tụ | Hội tụ bình thường | Hội tụ (soft margin) |
| Hàm mục tiêu lồi | Có, nhưng nghiệm không duy nhất | Lồi, nghiệm tốt | Lồi, nghiệm duy nhất |

Bảng này là lý do lịch sử: perceptron dừng ngay khi tìm được **một** đường tách bất kỳ — kể cả đường đi sát rìa dữ liệu và tổng quát hoá tệ. SVM sinh ra từ đúng phê phán đó.

### Giới hạn XOR

Perceptron không biểu diễn được hàm XOR:

| $x_1$ | $x_2$ | XOR |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Không tồn tại đường thẳng nào tách $\{(0,1),(1,0)\}$ khỏi $\{(0,0),(1,1)\}$. Minsky & Papert chứng minh điều này năm 1969, và nó góp phần lớn vào **AI winter** đầu tiên — nguồn tài trợ cho mạng neuron cạn kiệt gần hai thập kỷ.

> [!note] Bài học thật của XOR không phải "perceptron kém"
> Bài học là: **một tầng tuyến tính chỉ tạo được ranh giới tuyến tính**. Xếp chồng nhiều tầng tuyến tính vẫn cho ra tuyến tính — muốn thoát khỏi giới hạn này bắt buộc phải có **phi tuyến giữa các tầng**. Đó chính xác là vai trò của [[Activation Functions]], và là lý do [[Multilayer Perceptron]] giải được XOR chỉ với 2 neuron ẩn.

## 2. Nguyên tắc / Best practices

1. **Đừng dùng perceptron trong sản xuất.** Dùng [[Logistic Regression]] — cùng độ phức tạp, cho xác suất, và hội tụ kể cả khi dữ liệu không tách được.
2. **Học nó để hiểu ký hiệu.** Mọi công thức mạng neuron về sau đều dùng lại cấu trúc $\mathbf{w}^T\mathbf{x} + b$ rồi qua một hàm kích hoạt. Perceptron là phiên bản tối giản nhất của cấu trúc đó.
3. **Nếu vẫn muốn dùng, hãy đặt giới hạn số vòng lặp.** Không có nó, chương trình sẽ treo trên dữ liệu không tách được.
4. **Thêm hệ số tự do $b$.** Không có nó, siêu phẳng buộc phải đi qua gốc toạ độ — một hạn chế nghiêm trọng và dễ quên.
5. **Xáo trộn thứ tự duyệt điểm.** Nghiệm perceptron phụ thuộc thứ tự dữ liệu; duyệt cố định có thể cho nghiệm rất tệ.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Chạy trên dữ liệu không tách được tuyến tính.** Thuật toán không báo lỗi, không hội tụ, chỉ chạy mãi. Đây không phải bug — đó là hành vi được chứng minh của thuật toán.
- **Cho rằng nghiệm perceptron là "tốt".** Nó chỉ là *một* nghiệm khả thi. Chạy hai lần với thứ tự dữ liệu khác nhau sẽ cho hai đường tách khác nhau, và cả hai đều "đúng" trên tập train.
- **Nhầm perceptron với neuron trong mạng hiện đại.** Perceptron dùng hàm dấu (không khả vi), nên **không thể** train bằng [[Backpropagation]]. Neuron hiện đại dùng hàm kích hoạt khả vi — đó là khác biệt cốt lõi.
- **Quên chuẩn hoá.** Cập nhật $\mathbf{w} \leftarrow \mathbf{w} + y_i\mathbf{x}_i$ có độ lớn tỉ lệ trực tiếp với $\lVert\mathbf{x}_i\rVert$. Đặc trưng thang lớn sẽ thống trị.
- **Nghĩ rằng "chồng nhiều tầng tuyến tính" tạo ra mô hình phi tuyến.** $\mathbf{W}_2(\mathbf{W}_1\mathbf{x}) = (\mathbf{W}_2\mathbf{W}_1)\mathbf{x}$ — vẫn là một phép biến đổi tuyến tính. Đây là hiểu lầm phổ biến và nó giải thích chính xác vì sao [[Activation Functions]] là bắt buộc.

## 4. Checklist áp dụng

- [ ] Dữ liệu của tôi có tách được tuyến tính không? Tôi kiểm tra bằng cách nào?
- [ ] Tôi đã đặt giới hạn số vòng lặp chưa?
- [ ] Mô hình có hệ số tự do $b$ không?
- [ ] Đặc trưng đã được chuẩn hoá chưa?
- [ ] Tôi có xáo trộn thứ tự duyệt điểm không?
- [ ] Tôi có lý do gì để không dùng [[Logistic Regression]] thay thế không?
- [ ] Nếu bài toán không tách được tuyến tính: tôi cần thêm tầng ẩn hay cần [[Kernel SVM]]?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `sklearn.linear_model.Perceptron` | Cài đặt chuẩn, có `max_iter`, `shuffle`, hỗ trợ regularization | [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#perceptron) |
| TensorFlow Playground | Thử trực quan: dữ liệu XOR + 0 tầng ẩn (thất bại) vs 1 tầng ẩn (thành công) | [playground.tensorflow.org](https://playground.tensorflow.org/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 13 "Thuật toán học perceptron" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Rosenblatt, "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain", *Psychological Review* 65(6), 1958 — [doi:10.1037/h0042519](https://doi.org/10.1037/h0042519)
- Minsky & Papert, *Perceptrons*, MIT Press 1969 — nguồn gốc của phê phán XOR
- scikit-learn, *Perceptron* — [scikit-learn.org](https://scikit-learn.org/stable/modules/linear_model.html#perceptron)

## Liên kết

[[Logistic Regression]] · [[Multilayer Perceptron]] · [[Activation Functions]] · [[Support Vector Machine]] · [[ML]]
