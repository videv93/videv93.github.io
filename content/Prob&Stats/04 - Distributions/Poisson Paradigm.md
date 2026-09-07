---
tags: [probability, distribution, approximation]
status: evergreen
---
# Poisson Paradigm

> Nhiều biến cố hiếm, **gần** độc lập → số biến cố xảy ra xấp xỉ Poisson. Đây là công cụ xấp xỉ hữu dụng nhất trong toàn bộ Stat 110, vì nó *không đòi hỏi độc lập thật sự*.

## 1. Phát biểu

Cho các event $A_1,\dots,A_n$ với $P(A_j) = p_j$. Đặt $X = \sum_j I(A_j)$ = số event xảy ra, $\lambda = \sum_j p_j = E[X]$.

Nếu:
1. Các $p_j$ **nhỏ**
2. Các $A_j$ **độc lập hoặc phụ thuộc yếu**
3. $n$ **lớn**

thì $X \approx \text{Pois}(\lambda)$, và đặc biệt
$$P(\text{không event nào xảy ra}) \approx e^{-\lambda}.$$

Blitzstein gọi đây là "paradigm" chứ không phải "theorem" vì điều kiện 2 cố ý mơ hồ — đó là một hướng dẫn thực hành. (Chen–Stein method cho phiên bản chặt chẽ với cận sai số cụ thể.)

## 2. Vì sao nó mạnh

Điểm mấu chốt: **chỉ cần biết $\lambda = E[X]$**, mà $E[X] = \sum p_j$ tính được bằng [[Linearity of Expectation]] — **không cần độc lập chút nào**. Vậy nên ta lấy được đáp án xấp xỉ trong những bài mà tính chính xác là bất khả thi.

## 3. Ba ví dụ chuẩn

**Birthday problem.** $n$ người, $A_{ij}$ = "người $i$ và $j$ trùng sinh nhật". $\lambda = \binom{n}{2}/365$. Các event này **không** độc lập (bắc cầu!), nhưng phụ thuộc rất yếu.
$$P(\text{không ai trùng}) \approx e^{-\binom{n}{2}/365}$$
Với $n=23$: $e^{-0.6932} = 0.4999$ — so với đáp án chính xác 0.4927. → [[Birthday Problem]]

**Matching problem.** $\lambda = 1$, $P(\text{không match}) \approx e^{-1} = 0.3679$; chính xác là 0.3679 với $n=10$. → [[Matching Problem]]

**Birthday với ba người trùng.** Tính chính xác rất khó; Poisson paradigm cho đáp án ngay: $\lambda = \binom{n}{3}/365^2$.

## 4. Khi nào **không** dùng được

| Tình huống | Vấn đề |
|---|---|
| $p_j$ lớn (ví dụ 0.3) | Xấp xỉ tệ; dùng Binomial/Normal |
| Phụ thuộc **mạnh** | Ví dụ: mọi $A_j$ xảy ra cùng lúc hoặc không cái nào → $X$ chỉ nhận 0 hoặc $n$ |
| $\lambda$ rất lớn | Poisson vẫn đúng nhưng Normal tiện hơn |
| Phụ thuộc dương mạnh (clustering) | Variance thực > $\lambda$ → underestimate đuôi |

Kiểm tra nhanh mức độ phụ thuộc: so sánh $\text{Var}(X)$ thật với $\lambda$. Bằng nhau → tin được. Lớn hơn nhiều → overdispersion, dùng [[Geometric & Negative Binomial]].

## 5. Cạm bẫy

1. **Dùng khi các event phụ thuộc mạnh.** Paradigm không cứu được mọi thứ.
2. **Quên rằng đây là xấp xỉ**, rồi báo cáo 4 chữ số thập phân.
3. **Nhầm với định lý giới hạn Binomial→Poisson.** Cái đó cần độc lập; paradigm thì không.
4. **Tính $\lambda$ sai** vì đếm nhầm số event (ví dụ: $\binom{n}{2}$ cặp chứ không phải $n$).
5. **Áp cho đuôi rất xa.** Xấp xỉ tốt ở vùng trung tâm, kém ở đuôi cực.
6. **Không kiểm chứng bằng mô phỏng** khi có thể mô phỏng.

## 6. Checklist
- [ ] $X$ có viết được thành tổng indicator không?
- [ ] $\lambda = \sum p_j$ đã tính đúng chưa?
- [ ] Các $p_j$ có nhỏ không (nói $\le 0.1$)?
- [ ] Phụ thuộc giữa các event: yếu, vừa hay mạnh?
- [ ] $\text{Var}(X)$ có gần $\lambda$ không?
- [ ] Đã mô phỏng để kiểm tra sai số xấp xỉ chưa?
- [ ] Cần độ chính xác đến mức nào? Xấp xỉ có đủ không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.8: http://probabilitybook.net
- Stat 110 Lecture 11 (*Poisson Paradigm*): https://www.youtube.com/watch?v=TD1N4hxqMzY
- Arratia, Goldstein & Gordon — *Two moments suffice for Poisson approximations: the Chen–Stein method*: https://doi.org/10.1214/aop/1176991491
- Wikipedia — *Le Cam's theorem*: https://en.wikipedia.org/wiki/Le_Cam%27s_theorem

## Liên kết
[[Poisson Distribution]] · [[Birthday Problem]] · [[Matching Problem]] · [[Indicator Random Variables]] · [[Linearity of Expectation]] · [[Prob&Stats]]
