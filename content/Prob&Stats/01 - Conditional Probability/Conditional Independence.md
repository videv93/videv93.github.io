---
tags: [probability, conditioning]
status: evergreen
---
# Conditional Independence

> Độc lập không phải tính chất bền vững. Nó **xuất hiện và biến mất** tuỳ theo bạn đang biết gì — và đó chính là điều làm nó hữu ích.

## 1. Định nghĩa

$A$ và $B$ **độc lập có điều kiện** cho trước $C$ nếu
$$P(A\cap B \mid C) = P(A\mid C)\,P(B\mid C).$$

Tương đương: $P(A \mid B \cap C) = P(A\mid C)$ — *khi đã biết $C$, thêm $B$ cũng không cho thông tin gì về $A$.*

## 2. Hai chiều đều sai

| Mệnh đề | Đúng? | Phản ví dụ |
|---|---|---|
| Độc lập $\Rightarrow$ độc lập có điều kiện | ❌ | Hai đồng xu độc lập; điều kiện "tổng số mặt ngửa = 1" → biết đồng 1 thì biết đồng 2 |
| Độc lập có điều kiện $\Rightarrow$ độc lập | ❌ | Chọn 1 trong 2 đồng xu (cân / hai mặt ngửa), rồi tung 2 lần. Biết đồng nào → 2 lần tung độc lập. Không biết → lần 1 ngửa làm tăng niềm tin lần 2 ngửa |

Ví dụ thứ hai là **cấu trúc trung tâm của thống kê Bayes**: dữ liệu độc lập *cho trước tham số $\theta$*, nhưng **không** độc lập một cách vô điều kiện — vì chúng cùng mang thông tin về $\theta$. → [[Bayesian vs Frequentist]], [[Laplace's Rule of Succession]]

## 3. Hai hiện tượng nên gọi tên

**Explaining away (collider).** $A \to C \leftarrow B$. Báo động kêu vì trộm **hoặc** động đất. Trộm và động đất độc lập. Nhưng khi biết báo động kêu, biết thêm "có động đất" làm **giảm** xác suất có trộm. Conditioning trên hậu quả chung tạo ra phụ thuộc.

**Screening off (chain/fork).** $A \leftarrow C \to B$. Số kem bán ra và số vụ đuối nước tương quan, nhưng độc lập có điều kiện cho trước nhiệt độ. $C$ là **confounder** → [[Simpson's Paradox]].

Đây là nội dung cốt lõi của d-separation trong Bayesian networks.

## 4. Vì sao khái niệm này đáng giá

- **IID** thực chất là "độc lập có điều kiện cho trước $\theta$" — nền tảng của [[Maximum Likelihood Estimation]] (nhân các likelihood với nhau).
- **Markov property** chính là: quá khứ và tương lai độc lập có điều kiện cho trước hiện tại → [[Markov Chains]].
- **Naive Bayes classifier**: giả định các feature độc lập có điều kiện cho trước nhãn.
- Cho phép **phân rã** phân phối joint nhiều chiều thành tích các thừa số nhỏ — nếu không thì mô hình hoá $n$ biến cần $2^n$ tham số.

## 5. Cạm bẫy

1. **Dùng lẫn lộn hai khái niệm** vì cùng tên "độc lập". Luôn viết rõ điều kiện.
2. **Conditioning trên collider** rồi kết luận có quan hệ nhân quả — Berkson's paradox. Ví dụ: trong nhóm sinh viên đã trúng tuyển, điểm thi và điểm hồ sơ tương quan âm, dù ngoài đời không.
3. **Giả định naive Bayes rồi tin vào xác suất đầu ra.** Phân loại vẫn tốt, nhưng xác suất bị lệch mạnh về 0/1.
4. **Nhân likelihood của các quan sát phụ thuộc** → đánh giá quá cao độ chắc chắn (over-confident posterior).
5. **Quên rằng chọn mẫu cũng là conditioning.** Selection bias là conditioning trên một event bạn không nhận ra.

## 6. Checklist
- [ ] Đã ghi rõ độc lập **cho trước cái gì** chưa?
- [ ] Biến đang condition là nguyên nhân chung (confounder) hay hậu quả chung (collider)?
- [ ] Nếu là collider — có đang tạo ra tương quan giả không?
- [ ] Dữ liệu IID: điều kiện ẩn là gì? Có thật là cùng $\theta$ không?
- [ ] Cách chọn mẫu có vô tình condition trên gì không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.5–2.9: http://probabilitybook.net
- Stat 110 Lecture 5 (*Conditional independence*): https://www.youtube.com/watch?v=JzDvVgNDxo8
- Pearl — *Causality* (d-separation): http://bayes.cs.ucla.edu/BOOK-2K/
- Wikipedia — *Conditional independence*: https://en.wikipedia.org/wiki/Conditional_independence
- Wikipedia — *Berkson's paradox*: https://en.wikipedia.org/wiki/Berkson%27s_paradox

## Liên kết
[[Independence]] · [[Conditional Probability]] · [[Simpson's Paradox]] · [[Markov Chains]] · [[Bayesian vs Frequentist]] · [[Prob&Stats]]
