---
tags: [probability, random-variable]
status: evergreen
---
# Random Variable

> Không phải "biến", cũng không "ngẫu nhiên". Nó là một **hàm** $X: S \to \mathbb{R}$. Hiểu đúng chỗ này giải quyết được phần lớn nhầm lẫn về sau.

## 1. Định nghĩa

Một random variable là một hàm từ sample space vào tập số thực:
$$X: S \to \mathbb{R}, \qquad s \mapsto X(s)$$

Cái ngẫu nhiên là **$s$** — kết quả của thí nghiệm. Một khi $s$ đã xảy ra, $X(s)$ là một số xác định. Hàm $X$ hoàn toàn tất định.

Blitzstein nhấn mạnh (Lecture 7): tên gọi "random variable" là **sai lệch lịch sử**; đúng ra nên gọi là "random function".

## 2. Vì sao cần khái niệm này

| Không có RV | Có RV |
|---|---|
| Phải nói về event: "tổng 2 xúc xắc bằng 8" | Viết $X = 8$ |
| Không cộng/nhân được | $X + Y$, $XY$, $g(X)$ đều là RV mới |
| Không có trung bình | $E[X]$ có nghĩa → [[Expectation]] |
| Mỗi bài một sample space riêng | Nhiều bài khác nhau cùng một phân phối |

Ý cuối là quan trọng nhất: **phân phối tách rời khỏi sample space**. Số mặt ngửa trong 10 lần tung và số khách mua hàng trong 10 lượt truy cập có sample space hoàn toàn khác nhau nhưng cùng là Binomial.

## 3. Phân biệt ba thứ hay bị trộn

| Ký hiệu | Là gì | Ví dụ |
|---|---|---|
| $X$ | Hàm (random variable) | Số mặt ngửa |
| $x$ | Một số cụ thể | 3 |
| $\{X = x\}$ | Một **event** (tập con của $S$) | $\{s : X(s) = 3\}$ |
| $P(X=x)$ | Một số trong $[0,1]$ | 0.117 |

Quy ước: chữ **hoa** cho RV, chữ **thường** cho giá trị. Giữ nghiêm quy ước này tiết kiệm rất nhiều nhầm lẫn.

## 4. Hàm của random variable

Nếu $X$ là RV và $g:\mathbb{R}\to\mathbb{R}$ thì $g(X)$ cũng là RV (hợp của hai hàm). Hệ quả:
- $X^2$, $e^X$, $\mathbb{1}\{X>3\}$ đều là RV.
- Nhưng **$E[g(X)] \neq g(E[X])$** nói chung → xem [[LOTUS]] và bất đẳng thức Jensen.
- $X+Y$ là RV chỉ khi $X, Y$ định nghĩa trên **cùng một** sample space. Không cộng được hai RV từ hai thí nghiệm khác nhau nếu chưa mô hình hoá chung.

## 5. Cạm bẫy

1. **Coi $X$ như một số.** $X + X = 2X$, nhưng $X + Y$ (với $Y$ độc lập cùng phân phối) **không** bằng $2X$ — dù cùng kỳ vọng, phương sai khác nhau. Ví dụ: tung 1 xúc xắc rồi nhân đôi ≠ tung 2 xúc xắc.
2. **Nhầm $X$ với phân phối của $X$.** Hai RV khác nhau có thể cùng phân phối. Ký hiệu $X \sim Y$ (cùng phân phối) khác $X = Y$.
3. **Quên rằng $X$ và $Y$ phải sống trên cùng sample space** khi viết $X+Y$.
4. **Viết $P(X)$** — vô nghĩa. Phải là $P(X = x)$ hoặc $P(X \le x)$.
5. **Cho rằng RV luôn nhận giá trị số "tự nhiên".** Mã hoá "nam/nữ" thành 0/1 cũng là RV — và đây chính là [[Indicator Random Variables]].

## 6. Checklist khi mô hình hoá bằng RV
- [ ] Sample space là gì? $X$ ánh xạ từ đâu sang đâu?
- [ ] Đã dùng chữ hoa/thường đúng quy ước chưa?
- [ ] $X$ rời rạc hay liên tục? → [[Discrete vs Continuous]]
- [ ] Có cần biết phân phối joint không, hay chỉ marginal là đủ?
- [ ] Nếu cộng nhiều RV: chúng có cùng sample space không? Có độc lập không?
- [ ] Đại lượng cần tính có viết được thành tổng indicator không? (thường là mẹo hay nhất)

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.3: http://probabilitybook.net
- Stat 110 Lecture 7 (*Random Variables*): https://www.youtube.com/watch?v=PNrqCdslGi4
- Stat 110 Lecture 8: https://www.youtube.com/watch?v=k2BB0p8byGA
- Wikipedia — *Random variable*: https://en.wikipedia.org/wiki/Random_variable

## Liên kết
[[PMF]] · [[CDF]] · [[Discrete vs Continuous]] · [[Expectation]] · [[Indicator Random Variables]] · [[Prob&Stats]]
