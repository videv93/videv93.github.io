---
tags: [probability, distribution, reference]
status: evergreen
---
# Distribution Cheatsheet

> Bảng tra cứu. Học **story** ở cột 2 thì suy ra được mọi cột còn lại; học công thức thì không suy ra được story.

## 1. Rời rạc

| Phân phối | Story | PMF | $E[X]$ | $\text{Var}(X)$ | MGF |
|---|---|---|---|---|---|
| **Bern($p$)** | 1 phép thử | $p^x q^{1-x}$ | $p$ | $pq$ | $q+pe^t$ |
| **Bin($n,p$)** | Số thành công trong $n$ phép thử độc lập | $\binom{n}{k}p^kq^{n-k}$ | $np$ | $npq$ | $(q+pe^t)^n$ |
| **HGeom($N,K,n$)** | Như Bin nhưng **không hoàn lại** | $\frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$ | $n\frac{K}{N}$ | $np'q'\frac{N-n}{N-1}$ | — |
| **Geom($p$)** | Số thất bại trước thành công đầu | $q^kp$ | $q/p$ | $q/p^2$ | $\frac{p}{1-qe^t}$ |
| **NBin($r,p$)** | Số thất bại trước thành công thứ $r$ | $\binom{k+r-1}{r-1}p^rq^k$ | $rq/p$ | $rq/p^2$ | $\left(\frac{p}{1-qe^t}\right)^r$ |
| **Pois($\lambda$)** | Sự kiện hiếm trong 1 khoảng | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t-1)}$ |
| **DUnif($1..n$)** | Chọn đều 1 trong $n$ | $1/n$ | $\frac{n+1}{2}$ | $\frac{n^2-1}{12}$ | — |

($q = 1-p$; với HGeom, $p'=K/N$)

## 2. Liên tục

| Phân phối              | Story                         | PDF                                                        | $E[X]$               | $\text{Var}(X)$                     |
| ---------------------- | ----------------------------- | ---------------------------------------------------------- | -------------------- | ----------------------------------- |
| **Unif($a,b$)**        | Đều trên đoạn                 | $\frac{1}{b-a}$                                            | $\frac{a+b}{2}$      | $\frac{(b-a)^2}{12}$                |
| **$N(\mu,\sigma^2)$**  | Tổng nhiều tác động nhỏ       | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$      | $\mu$                | $\sigma^2$                          |
| **Expo($\lambda$)**    | Thời gian chờ, memoryless     | $\lambda e^{-\lambda x}$                                   | $1/\lambda$          | $1/\lambda^2$                       |
| **Gamma($a,\lambda$)** | Thời gian đến sự kiện thứ $a$ | $\frac{\lambda^a x^{a-1}e^{-\lambda x}}{\Gamma(a)}$        | $a/\lambda$          | $a/\lambda^2$                       |
| **Beta($a,b$)**        | Tỉ lệ/xác suất chưa biết      | $\frac{x^{a-1}(1-x)^{b-1}}{B(a,b)}$                        | $\frac{a}{a+b}$      | $\frac{ab}{(a+b)^2(a+b+1)}$         |
| **Lognormal**          | Tích nhiều tác động nhỏ       | $\frac{1}{x\sigma\sqrt{2\pi}}e^{-(\ln x-\mu)^2/2\sigma^2}$ | $e^{\mu+\sigma^2/2}$ | $(e^{\sigma^2}-1)e^{2\mu+\sigma^2}$ |
| **Cauchy**             | Tỉ số hai Normal              | $\frac{1}{\pi(1+x^2)}$                                     | **không tồn tại**    | **không tồn tại**                   |

## 3. Sơ đồ quan hệ

```
Bern(p) --tổng n lần--> Bin(n,p) --không hoàn lại--> HGeom
                            |
              n→∞, p→0, np→λ |
                            v
                       Pois(λ) <--Gamma mixture--> NBin
                            |                        ^
                khoảng chờ  |                        | tổng r cái
                            v                        |
                       Expo(λ) --tổng n cái--> Gamma(n,λ)
                            ^
                    rời rạc | tương tự
                        Geom(p)

Unif(0,1) --F⁻¹--> phân phối BẤT KỲ      (universality)
Bất kỳ (iid, var hữu hạn) --trung bình--> Normal   (CLT)
Normal --bình phương & tổng--> Chi-square --tỉ số--> t, F
Beta(a,b) --prior cho p của Bin--> posterior Beta   (conjugacy)
```

## 4. Chọn phân phối nào

| Câu hỏi | Phân phối |
|---|---|
| Có/không, một lần | Bernoulli |
| Đếm thành công, $n$ cố định, có hoàn lại | Binomial |
| Đếm thành công, $n$ cố định, không hoàn lại | Hypergeometric |
| Chờ đến thành công đầu (rời rạc) | Geometric |
| Chờ đến thành công thứ $r$ (rời rạc) | Negative Binomial |
| Đếm sự kiện hiếm trong khoảng | Poisson |
| Đếm sự kiện nhưng variance > mean | Negative Binomial |
| Chờ đến sự kiện tiếp theo (liên tục) | Exponential |
| Chờ đến sự kiện thứ $n$ (liên tục) | Gamma |
| Tổng nhiều thứ nhỏ | Normal |
| Tích nhiều thứ nhỏ / dương & lệch phải | Lognormal |
| Một tỉ lệ trong $[0,1]$ | Beta |
| Tuổi thọ có hazard thay đổi | Weibull |

## 5. Cạm bẫy khi tra bảng

1. **Quy ước tham số khác nhau giữa sách và thư viện.** Expo: rate vs scale. Geom: có tính lần thành công hay không. NBin: đếm thất bại hay tổng phép thử. **Luôn kiểm tra bằng cách so mean.**
2. **Phân phối không có moment.** Cauchy không có kỳ vọng; Pareto với $\alpha\le2$ không có variance → [[Central Limit Theorem]] không áp dụng.
3. **Nhớ công thức mà quên điều kiện.** Bin cần độc lập + $p$ hằng; Pois cần mean = variance.
4. **Dùng bảng thay cho việc kiểm tra dữ liệu.** Vẽ histogram và Q–Q plot trước.
5. **Nhầm $\text{Var}$ với $\text{SD}$** khi truyền tham số Normal (`scipy` nhận **SD**).

## 6. Checklist chọn phân phối
- [ ] Rời rạc hay liên tục?
- [ ] Có chặn trên/dưới không?
- [ ] Đại lượng là tổng, tích, hay thời gian chờ?
- [ ] Mean và variance từ dữ liệu có khớp ràng buộc của phân phối không?
- [ ] Đuôi thực tế dày hơn mô hình không?
- [ ] Đã kiểm tra quy ước tham số của thư viện chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Probability Cheatsheet (W. Chen) | 10 trang, bản gốc của bảng này | https://github.com/wzchen/probability_cheatsheet |
| `scipy.stats` | 100+ phân phối, cùng một API | https://docs.scipy.org/doc/scipy/reference/stats.html |
| Distribution Explorer | Trực quan tương tác từng phân phối | https://distribution-explorer.github.io |
| `scipy.stats.fit` | Khớp phân phối vào dữ liệu | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.fit.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, phụ lục C: http://probabilitybook.net
- Wikipedia — *Relationships among probability distributions*: https://en.wikipedia.org/wiki/Relationships_among_probability_distributions
- Leemis & McQueston — *Univariate Distribution Relationships* (bản đồ quan hệ đầy đủ): http://www.math.wm.edu/~leemis/chart/UDR/UDR.html

## Liên kết
[[Bernoulli & Binomial]] · [[Hypergeometric]] · [[Geometric & Negative Binomial]] · [[Poisson Distribution]] · [[Uniform Distribution]] · [[Normal Distribution]] · [[Exponential Distribution]] · [[Prob&Stats]]
