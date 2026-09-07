---
tags: [probability, random-variable]
status: growing
---
# Independence of Random Variables

> Độc lập giữa hai **biến** mạnh hơn độc lập giữa hai **event** rất nhiều: nó đòi hỏi mọi cặp event sinh bởi hai biến đều độc lập.

## 1. Định nghĩa

$X$ và $Y$ độc lập nếu với **mọi** $x, y$:
$$P(X \le x,\ Y \le y) = P(X\le x)\,P(Y \le y)$$

Tương đương:
- Rời rạc: $P(X = x, Y = y) = P(X=x)P(Y=y)$ với mọi $x,y$
- Liên tục: $f_{X,Y}(x,y) = f_X(x)f_Y(y)$ với mọi $x,y$
- Tổng quát: joint CDF tách được thành tích

Chữ **"với mọi"** là mấu chốt. Một cặp giá trị thoả không đủ.

## 2. Hệ quả — vì sao ta cần độc lập

| Kết quả | Cần độc lập? |
|---|---|
| $E[X+Y] = E[X]+E[Y]$ | ❌ **Không cần** → [[Linearity of Expectation]] |
| $E[XY] = E[X]E[Y]$ | ✅ Cần (hoặc chỉ cần uncorrelated) |
| $\text{Var}(X+Y) = \text{Var}(X)+\text{Var}(Y)$ | ✅ Cần uncorrelated → [[Variance]] |
| $M_{X+Y}(t) = M_X(t)M_Y(t)$ | ✅ Cần → [[Moment Generating Functions]] |
| $g(X) \perp h(Y)$ | ✅ Suy ra được từ $X\perp Y$ |
| Nhân likelihood trong MLE | ✅ (IID) → [[Maximum Likelihood Estimation]] |

Dòng đầu là lý do [[Indicator Random Variables]] mạnh đến vậy: dùng được ngay cả khi các thành phần phụ thuộc chằng chịt.

## 3. Uncorrelated ≠ Independent

$\text{Cov}(X,Y) = E[XY]-E[X]E[Y]$. Độc lập ⟹ uncorrelated, **chiều ngược lại sai**.

Phản ví dụ: $X \sim N(0,1)$, $Y = X^2$. Thì $E[XY]=E[X^3]=0=E[X]E[Y]$ → uncorrelated. Nhưng $Y$ được xác định hoàn toàn bởi $X$.

Correlation chỉ đo **quan hệ tuyến tính**. Ngoại lệ quan trọng: nếu $(X,Y)$ có phân phối **joint Normal** thì uncorrelated ⟺ independent. (Chú ý: từng biến Normal riêng lẻ *không* đủ — phải là joint Normal.)

## 4. IID

**Independent and identically distributed** — giả định nền của gần như toàn bộ thống kê:
- Independent: các quan sát không ảnh hưởng nhau
- Identically distributed: cùng một phân phối gốc

$X_1,\dots,X_n \overset{iid}{\sim} F$ là điều kiện cho [[Law of Large Numbers]], [[Central Limit Theorem]], và [[Maximum Likelihood Estimation]].

Trong thực tế IID hay bị vi phạm: dữ liệu chuỗi thời gian (tự tương quan), dữ liệu nhóm (học sinh cùng lớp), lấy mẫu không hoàn lại từ quần thể nhỏ.

## 5. Cạm bẫy

1. **Kiểm tra độc lập ở vài giá trị rồi kết luận.** Cần *mọi* $x, y$.
2. **Dùng correlation = 0 làm bằng chứng độc lập** (§3).
3. **Cho rằng joint phân phối được xác định bởi các marginal.** Sai — cùng marginal có vô số joint khác nhau (copula). Đây là gốc rễ của việc định giá sai CDO trước 2008.
4. **Giả định IID cho dữ liệu chuỗi thời gian** → sai số chuẩn bị đánh giá thấp nghiêm trọng.
5. **Lấy mẫu không hoàn lại rồi dùng Binomial.** Đúng ra là [[Hypergeometric]]; chỉ xấp xỉ được khi cỡ mẫu $\ll$ quần thể (quy tắc 10%).
6. **Quên rằng độc lập không bền dưới conditioning** → [[Conditional Independence]].

## 6. Checklist
- [ ] Joint có tách được thành tích **với mọi** giá trị không?
- [ ] Support của joint có phải hình chữ nhật không? (Nếu support ràng buộc lẫn nhau, ví dụ $X+Y\le1$, thì **không** độc lập)
- [ ] Đang cần độc lập hay chỉ cần uncorrelated?
- [ ] Dữ liệu có cấu trúc thời gian / nhóm / không gian không?
- [ ] Lấy mẫu có hoàn lại không?
- [ ] Nếu dùng joint Normal: đã kiểm tra là *joint* chứ không phải từng marginal chưa?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §3.8, Ch.7: http://probabilitybook.net
- Stat 110 Lecture 9 (*Independence*): https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Independence (probability theory)*: https://en.wikipedia.org/wiki/Independence_(probability_theory)
- Wikipedia — *Copula*: https://en.wikipedia.org/wiki/Copula_(statistics)
- Salmon — *Recipe for Disaster: The Formula That Killed Wall Street* (Wired, 2009): https://www.wired.com/2009/02/wp-quant/

## Liên kết
[[Independence]] · [[Conditional Independence]] · [[Variance]] · [[Linearity of Expectation]] · [[Central Limit Theorem]] · [[Prob&Stats]]
