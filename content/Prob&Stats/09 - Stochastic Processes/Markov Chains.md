---
tags: [probability, stochastic-process]
status: evergreen
---
# Markov Chains

> "Tương lai độc lập với quá khứ **khi đã biết hiện tại**." Một giả định duy nhất, và nó biến bài toán vô hạn chiều thành đại số tuyến tính.

## 1. Markov property

Dãy $X_0, X_1, X_2,\dots$ nhận giá trị trong tập trạng thái $S$ thoả:
$$P(X_{n+1}=j \mid X_n=i, X_{n-1}=i_{n-1},\dots,X_0=i_0) = P(X_{n+1}=j\mid X_n=i) = q_{ij}$$

Phát biểu lại bằng ngôn ngữ conditioning: **quá khứ và tương lai độc lập có điều kiện cho trước hiện tại** → [[Conditional Independence]].

**Time-homogeneous**: $q_{ij}$ không phụ thuộc $n$ — giả định mặc định trừ khi nói khác.

⚠️ Markov property **không** nghĩa là "không có trí nhớ". Nó nghĩa là **toàn bộ trí nhớ cần thiết đã được mã hoá trong trạng thái hiện tại**. Nếu cần nhớ 2 bước, hãy định nghĩa lại trạng thái là cặp $(X_{n-1},X_n)$ — vẫn là Markov chain.

## 2. Ba cách mô tả cùng một chain

| Cách | Hình thức | Dùng khi |
|---|---|---|
| **Transition diagram** | Đồ thị có hướng, cạnh gắn xác suất | Hiểu cấu trúc, ít trạng thái |
| **Transition matrix** $Q$ | Ma trận $q_{ij}$, mỗi hàng tổng 1 | Tính toán → [[Transition Matrices]] |
| **Mô tả bằng lời** | "Nếu đang ở A thì 75% ở lại A…" | Dựng mô hình |

## 3. Phân loại trạng thái

| Khái niệm | Nghĩa |
|---|---|
| **Accessible** ($i\to j$) | Có xác suất dương đi từ $i$ đến $j$ sau hữu hạn bước |
| **Communicate** ($i\leftrightarrow j$) | Cả hai chiều |
| **Irreducible** | Mọi trạng thái communicate với nhau — chain "liền một khối" |
| **Recurrent** | Xuất phát từ $i$, chắc chắn quay lại $i$ |
| **Transient** | Có xác suất dương không bao giờ quay lại |
| **Absorbing** | $q_{ii}=1$ — vào rồi không ra được (ví dụ: cháy tài khoản trong [[Gambler's Ruin]]) |
| **Period** $d(i)$ | UCLN các độ dài chu trình về $i$; $d=1$ → **aperiodic** |

## 4. Stationary distribution

$\pi$ là phân phối dừng nếu $\pi Q = \pi$ (vector hàng) — tức $\pi$ là **left eigenvector** của $Q$ ứng với trị riêng 1, chuẩn hoá $\sum_i\pi_i = 1$.

**Định lý hội tụ.** Nếu chain **irreducible** và **aperiodic** trên không gian trạng thái hữu hạn thì:
- $\pi$ tồn tại và **duy nhất**
- $P(X_n = i) \to \pi_i$ với **mọi** phân phối khởi đầu
- $\pi_i = 1/E[\text{thời gian quay lại } i]$

Đây là kết quả trung tâm: **chain "quên" điểm xuất phát**.

**Reversibility (detailed balance).** Nếu tìm được $\pi$ thoả $\pi_i q_{ij} = \pi_j q_{ji}$ với mọi $i,j$ thì $\pi$ là stationary. Điều kiện này **mạnh hơn** cần thiết nhưng dễ kiểm tra hơn nhiều — và là nền tảng của MCMC.

## 5. Ứng dụng

- **PageRank**: $\pi$ của chain "lướt web ngẫu nhiên"; damping factor 0.85 đảm bảo irreducible + aperiodic.
- **MCMC (Metropolis–Hastings, Gibbs)**: thiết kế chain có $\pi$ = posterior cần lấy mẫu → [[Bayesian vs Frequentist]].
- **Mô hình ngôn ngữ n-gram**, Hidden Markov Model (nhận dạng tiếng nói, gán nhãn từ loại).
- **Queueing theory**, mô hình tín dụng (ma trận chuyển hạng), di chuyển dân cư.
- **Gambler's ruin và random walk** → [[Gambler's Ruin]], [[Random Walk]]

## 6. Cạm bẫy

1. **Giả định Markov khi trạng thái không đủ.** Nếu tương lai phụ thuộc lịch sử dài hơn, phải mở rộng không gian trạng thái (đổi lại: số trạng thái nổ theo hàm mũ).
2. **Chain reducible** → nhiều stationary distribution, kết luận về hội tụ sai.
3. **Chain có chu kỳ** (ví dụ đồ thị hai phía) → phân phối dao động mãi, không hội tụ, dù $\pi$ vẫn tồn tại.
4. **Nhầm stationary với absorbing.**
5. **Nhầm chiều vector.** $\pi Q=\pi$ (hàng) hay $Q\pi=\pi$ tuỳ quy ước ma trận → [[Transition Matrices]].
6. **Cho rằng đã hội tụ sau ít bước.** Tốc độ hội tụ do **spectral gap** quyết định; MCMC cần chẩn đoán ($\hat R$, effective sample size).
7. **Không gian trạng thái vô hạn**: recurrent chưa đủ, cần **positive recurrent** để có $\pi$ (random walk 1 chiều đối xứng là recurrent nhưng không positive recurrent).

## 7. Checklist
- [ ] Trạng thái hiện tại có chứa đủ thông tin để dự đoán bước sau không?
- [ ] Xác suất chuyển có ổn định theo thời gian không?
- [ ] Chain có irreducible không? Aperiodic không?
- [ ] Có trạng thái hấp thụ nào không?
- [ ] Mỗi hàng của $Q$ có tổng bằng 1 không?
- [ ] Nếu dùng MCMC: đã kiểm tra hội tụ chưa? Burn-in bao nhiêu?
- [ ] Không gian trạng thái hữu hạn hay vô hạn?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.linalg.eig` | Tìm $\pi$ qua eigenvector | https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html |
| PyMC / Stan | MCMC thực dụng | https://www.pymc.io · https://mc-stan.org |
| `networkx` | Vẽ transition diagram | https://networkx.org |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.11: http://probabilitybook.net
- Dr. Trefor Bazett — *Markov Chains & Transition Matrices*: https://www.youtube.com/watch?v=1GKtfgwf3ig
- Wikipedia — *Markov chain*: https://en.wikipedia.org/wiki/Markov_chain
- Wikipedia — *PageRank*: https://en.wikipedia.org/wiki/PageRank
- Setosa — *Markov Chains explained visually*: https://setosa.io/ev/markov-chains/

## Liên kết
[[Transition Matrices]] · [[Random Walk]] · [[Gambler's Ruin]] · [[First Step Analysis]] · [[Conditional Independence]] · [[Prob&Stats]]
