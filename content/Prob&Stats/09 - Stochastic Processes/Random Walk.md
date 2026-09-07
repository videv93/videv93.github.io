---
tags: [probability, stochastic-process]
status: growing
---
# Random Walk

> Bước đi ngẫu nhiên: mỗi bước $\pm1$ với xác suất bằng nhau. Đơn giản đến mức tưởng nhàm chán, nhưng chứa hai kết quả sâu: **quay lại chắc chắn** và **trôi xa theo $\sqrt n$**.

## 1. Định nghĩa

$S_n = \sum_{i=1}^n X_i$ với $X_i$ iid, $P(X_i=+1)=p$, $P(X_i=-1)=q=1-p$.

**Simple symmetric random walk**: $p=q=1/2$.

$$E[S_n] = n(p-q), \qquad \text{Var}(S_n) = 4npq \ \ (=n \text{ khi } p=q=1/2)$$

Đây là một [[Markov Chains]] trên $\mathbb{Z}$ với trạng thái = vị trí hiện tại.

## 2. Hai kết quả cốt lõi

**(a) Trôi xa theo $\sqrt n$.** $\text{SD}(S_n)=\sqrt n$ — sau $n$ bước, vị trí điển hình cách gốc khoảng $\sqrt n$, không phải $n$ và không phải hằng số. Từ [[Central Limit Theorem]]: $S_n/\sqrt n \xrightarrow{d} N(0,1)$.

Hệ quả cho tung xu: hiệu "số ngửa − số sấp" **tăng** theo $\sqrt n$, dù *tỉ lệ* hội tụ về 1/2 ([[Law of Large Numbers]]). Đây là chỗ gambler's fallacy sinh ra.

**(b) Pólya's recurrence theorem.**

| Số chiều | Quay lại gốc? | Câu nói của Kakutani |
|---|---|---|
| 1D | Chắc chắn (recurrent) | |
| 2D | Chắc chắn (recurrent) | *"A drunk man will find his way home"* |
| **3D trở lên** | Xác suất < 1 (transient) | *"...but a drunk bird may get lost forever"* |

Trong 3D, xác suất quay lại chỉ ~34%.

**Nghịch lý quan trọng**: trong 1D, chắc chắn quay lại — nhưng **thời gian quay lại kỳ vọng là vô hạn**. Hữu hạn hầu chắc chắn ≠ kỳ vọng hữu hạn → [[Expectation]].

## 3. Các kết quả khác đáng biết

- **Arcsine law**: trong trò công bằng, thời gian một người dẫn trước **không** phân bố đều quanh 50%. Phân bố hình chữ U — khả năng cao nhất là một bên dẫn gần như suốt. Trực giác "hai bên thay nhau dẫn" hoàn toàn sai.
- **Reflection principle**: kỹ thuật đếm đường đi, dùng để giải bài ballot problem và tính phân phối của maximum.
- **Hấp thụ hai biên**: chính là [[Gambler's Ruin]].
- **Giới hạn liên tục**: khi bước nhỏ dần, random walk → **Brownian motion** (Donsker's theorem), nền tảng của mô hình giá tài sản Black–Scholes.

## 4. Ứng dụng

| Lĩnh vực | Ứng dụng |
|---|---|
| Tài chính | Efficient market hypothesis, mô hình giá cổ phiếu |
| Vật lý | Chuyển động Brown, khuếch tán |
| Sinh học | Genetic drift, tìm kiếm thức ăn |
| Thuật toán | Randomized algorithm, 2-SAT của Papadimitriou |
| Mạng | Random walk trên đồ thị → PageRank → [[Transition Matrices]] |
| Học máy | Stochastic gradient descent (có nhiễu dạng random walk) |

## 5. Cạm bẫy

1. **Nghĩ "sẽ quay về 0"** theo nghĩa sớm. Quay lại chắc chắn nhưng thời gian chờ có kỳ vọng vô hạn.
2. **Gambler's fallacy**: lệch nhiều rồi thì "phải" bù. Không — lệch tuyệt đối *tăng* theo $\sqrt n$.
3. **Nhầm recurrent với positive recurrent.** 1D là recurrent nhưng không positive recurrent → không có stationary distribution.
4. **Áp kết quả 1D/2D cho chiều cao hơn.**
5. **Giả định giá tài sản là random walk thuần tuý.** Thực tế có drift, volatility clustering, đuôi dày → [[Normal Distribution]].
6. **Trực giác về arcsine law.** Hầu như ai cũng đoán sai.
7. **Kết luận "không dự đoán được" từ tính random walk** — có thể có drift nhỏ mà vẫn khai thác được.

## 6. Checklist
- [ ] Các bước có iid không? Có drift không ($p\ne q$)?
- [ ] Đang ở mấy chiều?
- [ ] Có biên hấp thụ không? → [[Gambler's Ruin]]
- [ ] Đang hỏi về **tỉ lệ** hay về **hiệu tuyệt đối**?
- [ ] Cần thời gian chờ kỳ vọng? Nó có hữu hạn không?
- [ ] Số bước đủ lớn cho xấp xỉ Normal chưa?
- [ ] Có mô phỏng để kiểm tra trực giác chưa? (rất nên, vì trực giác ở đây hay sai)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.random.choice` + `cumsum` | Mô phỏng random walk trong 3 dòng | https://numpy.org/doc/stable/reference/random/index.html |
| Setosa — Random Walk | Trực quan | https://setosa.io/ev/ |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §11.2: http://probabilitybook.net
- Feller — *An Introduction to Probability Theory and Its Applications*, Vol. 1, Ch.III (arcsine law): https://archive.org/details/introductiontopr0000fell
- Wikipedia — *Random walk*: https://en.wikipedia.org/wiki/Random_walk
- Wikipedia — *Pólya's recurrence theorem*: https://en.wikipedia.org/wiki/Random_walk#Higher_dimensions
- Wikipedia — *Arcsine laws (Wiener process)*: https://en.wikipedia.org/wiki/Arcsine_laws_(Wiener_process)

## Liên kết
[[Gambler's Ruin]] · [[Markov Chains]] · [[Law of Large Numbers]] · [[Central Limit Theorem]] · [[First Step Analysis]] · [[Prob&Stats]]
