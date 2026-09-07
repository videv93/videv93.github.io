---
tags: [probability, stochastic-process, linear-algebra]
status: evergreen
---
# Transition Matrices

> Biến Markov chain thành đại số tuyến tính: dự đoán trạng thái sau $n$ bước chỉ là **nhân ma trận $n$ lần**. Đây là toàn bộ nội dung video Trefor Bazett trong seed.

## 1. Từ diagram sang ma trận

Với không gian trạng thái $\{1,\dots,M\}$, đặt
$$q_{ij} = P(X_{n+1}=j \mid X_n = i)$$

Ma trận $Q = (q_{ij})$ là **transition matrix**, thoả:
- $q_{ij}\ge0$
- **Mỗi hàng tổng bằng 1** (row-stochastic)

⚠️ **Quy ước** — nguồn nhầm lẫn thường xuyên:

| Quy ước | Ma trận | Cập nhật trạng thái |
|---|---|---|
| **Hàng** (Blitzstein, xác suất) | Hàng = trạng thái xuất phát; hàng tổng 1 | $s_{n+1} = s_n Q$ (vector **hàng**) |
| **Cột** (Bazett, đại số tuyến tính) | Cột = trạng thái xuất phát; cột tổng 1 | $s_{n+1} = P s_n$ (vector **cột**) |

Hai quy ước là chuyển vị của nhau. **Luôn kiểm tra chiều nào tổng bằng 1** trước khi tính.

## 2. Ví dụ (từ seed)

Hai trạng thái A, B. Từ A: 75% ở lại A, 25% sang B. Từ B: 40% sang A, 60% ở lại B.

Quy ước cột (như video): $P = \begin{pmatrix}0.75 & 0.40\\ 0.25 & 0.60\end{pmatrix}$, $s_0 = \begin{pmatrix}1\\0\end{pmatrix}$

$$s_1 = Ps_0 = \begin{pmatrix}0.75\\0.25\end{pmatrix}, \qquad s_2 = Ps_1 = \begin{pmatrix}0.66\\0.34\end{pmatrix}$$

Tổng quát: $s_n = P^n s_0$.

Điểm mấu chốt của video: cách này cho $s_{100}$ ngay lập tức, còn vẽ cây (tree diagram) thì cần $2^{100}$ nhánh.

## 3. $n$-step transition

$$P(X_n = j\mid X_0=i) = (Q^n)_{ij}$$

**Chapman–Kolmogorov**: $Q^{m+n} = Q^m Q^n$, tức
$$(Q^{m+n})_{ij} = \sum_k (Q^m)_{ik}(Q^n)_{kj}$$
Đây chính là [[Law of Total Probability]] viết dưới dạng nhân ma trận: điều kiện theo trạng thái ở bước trung gian $k$.

## 4. Tính $Q^n$ hiệu quả

| Cách | Chi phí | Ghi chú |
|---|---|---|
| Nhân lặp | $O(M^3 n)$ | Đơn giản, ổn định |
| **Bình phương liên tiếp** | $O(M^3\log n)$ | $Q^{16}=((Q^2)^2)^2)^2$ |
| **Chéo hoá** $Q = V\Lambda V^{-1}$ | $Q^n = V\Lambda^n V^{-1}$ | Nhanh nhất, nhưng cần chéo hoá được |

Từ chéo hoá thấy ngay **vì sao chain hội tụ**: trị riêng lớn nhất của ma trận stochastic luôn là $\lambda_1 = 1$ (eigenvector tương ứng là $\pi$); mọi trị riêng khác có $|\lambda_i|<1$ (nếu irreducible + aperiodic) nên $\lambda_i^n\to0$.

**Spectral gap** $1-|\lambda_2|$ quyết định **tốc độ** hội tụ: gap lớn → hội tụ nhanh. Đây là đại lượng cần quan tâm khi thiết kế MCMC → [[Markov Chains]].

## 5. Tìm stationary distribution

Ba cách:
1. **Eigenvector**: giải $\pi Q = \pi$, chuẩn hoá $\sum\pi_i=1$
2. **Hệ tuyến tính**: giải $(Q^\top - I)\pi^\top = 0$ cùng ràng buộc tổng
3. **Lặp**: tính $s_0 Q^n$ với $n$ lớn — thô nhưng luôn chạy được

Nếu chain **reversible**, dùng detailed balance $\pi_i q_{ij}=\pi_j q_{ji}$ — thường giải nhanh hơn nhiều.

## 6. Cạm bẫy

1. **Nhầm quy ước hàng/cột** (§1). Triệu chứng: kết quả không tổng về 1.
2. **Hàng không tổng bằng 1** — mô hình sai, hoặc thiếu trạng thái (quên trạng thái "thoát").
3. **Tích luỹ sai số** khi nhân nhiều lần với float — chuẩn hoá lại định kỳ.
4. **Ma trận không chéo hoá được** (có Jordan block) → công thức $V\Lambda^nV^{-1}$ không dùng được.
5. **Kết luận hội tụ mà không kiểm tra irreducible/aperiodic.** Ma trận $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ dao động mãi mãi.
6. **Ma trận thưa và lớn** (PageRank: hàng tỉ trạng thái) → không bao giờ dựng ma trận đặc; dùng power iteration với sparse matrix.
7. **Nhầm $Q^n$ với $n$ lần lấy mẫu.** $Q^n$ cho phân phối, không cho một quỹ đạo.

## 7. Checklist
- [ ] Quy ước hàng hay cột? Chiều nào tổng bằng 1?
- [ ] Mọi hàng (hoặc cột) có tổng đúng 1 không?
- [ ] Chain có irreducible và aperiodic không?
- [ ] $|\lambda_2|$ bằng bao nhiêu? (tốc độ hội tụ)
- [ ] $M$ lớn đến đâu? Ma trận có thưa không?
- [ ] Cần phân phối ở bước $n$ hay phân phối giới hạn?
- [ ] Đã đối chiếu kết quả với mô phỏng Monte Carlo chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.linalg.matrix_power` | $Q^n$ bằng bình phương liên tiếp | https://numpy.org/doc/stable/reference/generated/numpy.linalg.matrix_power.html |
| `scipy.sparse.linalg.eigs` | Trị riêng cho ma trận thưa lớn | https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.linalg.eigs.html |
| Setosa — Markov Chains | Trực quan tương tác | https://setosa.io/ev/markov-chains/ |

## Tham khảo
- Dr. Trefor Bazett — *Markov Chains & Transition Matrices*: https://www.youtube.com/watch?v=1GKtfgwf3ig
- Blitzstein & Hwang — *Introduction to Probability*, §11.2: http://probabilitybook.net
- Wikipedia — *Stochastic matrix*: https://en.wikipedia.org/wiki/Stochastic_matrix
- Wikipedia — *Perron–Frobenius theorem*: https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem
- Wikipedia — *Chapman–Kolmogorov equation*: https://en.wikipedia.org/wiki/Chapman%E2%80%93Kolmogorov_equation

## Liên kết
[[Markov Chains]] · [[Random Walk]] · [[Law of Total Probability]] · [[First Step Analysis]] · [[Prob&Stats]]
