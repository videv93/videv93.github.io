---
tags: [math, foundations, logic]
status: evergreen
---
# Mathematical Logic Basics

> Lượng từ và phủ định là chỗ sai nhiều nhất khi đọc định nghĩa. Định nghĩa $\varepsilon$–$\delta$ của [[Limits]] sai một lượng từ là thành một khái niệm khác hẳn.

## 1. Nối logic

| Ký hiệu | Đọc là | Sai khi |
|---|---|---|
| $P \wedge Q$ | và | ít nhất một sai |
| $P \vee Q$ | hoặc (**bao hàm**) | cả hai sai |
| $P \Rightarrow Q$ | nếu…thì | $P$ đúng **và** $Q$ sai — chỉ trường hợp này |
| $P \Leftrightarrow Q$ | khi và chỉ khi | hai vế khác chân trị |
| $\neg P$ | không | $P$ đúng |

> [!warning] $P \Rightarrow Q$ **đúng** khi $P$ sai
> "Nếu $2+2=5$ thì tôi là giáo hoàng" là một mệnh đề **đúng**. Gọi là *vacuously true*. Đây là lý do "mọi phần tử của tập rỗng đều thoả mãn $P$" luôn đúng.

## 2. Bốn mệnh đề liên quan

| Tên | Dạng | Quan hệ với $P \Rightarrow Q$ |
|---|---|---|
| Gốc | $P \Rightarrow Q$ | — |
| **Đảo** (converse) | $Q \Rightarrow P$ | ❌ **không** tương đương |
| **Phản** (inverse) | $\neg P \Rightarrow \neg Q$ | ❌ không tương đương |
| **Phản đảo** (contrapositive) | $\neg Q \Rightarrow \neg P$ | ✅ **tương đương** |

Nhầm gốc với đảo là lỗi logic phổ biến nhất ngoài đời lẫn trong toán (base rate fallacy trong [[Prob&Stats]] chính là dạng này).

## 3. Lượng từ

- $\forall x \in S,\ P(x)$ — với mọi.
- $\exists x \in S,\ P(x)$ — tồn tại ít nhất một.
- $\exists! x$ — tồn tại **duy nhất**.

**Thứ tự lượng từ đổi nghĩa hoàn toàn:**

| Mệnh đề | Nghĩa |
|---|---|
| $\forall \varepsilon\, \exists \delta$ | $\delta$ được chọn **sau**, có thể phụ thuộc $\varepsilon$ → liên tục tại điểm |
| $\exists \delta\, \forall \varepsilon$ | một $\delta$ dùng cho **mọi** $\varepsilon$ → mạnh hơn hẳn, gần như không bao giờ đúng |

Đây chính là khác biệt giữa **continuity** và **uniform continuity** — xem [[Continuity]].

## 4. Quy tắc phủ định (De Morgan)

$$\neg(\forall x\, P(x)) \equiv \exists x\, \neg P(x) \qquad \neg(\exists x\, P(x)) \equiv \forall x\, \neg P(x)$$
$$\neg(P \wedge Q) \equiv \neg P \vee \neg Q \qquad \neg(P \vee Q) \equiv \neg P \wedge \neg Q$$
$$\neg(P \Rightarrow Q) \equiv P \wedge \neg Q$$

**Quy trình phủ định máy móc:** đi từ trái sang phải, đổi mỗi $\forall \leftrightarrow \exists$, giữ nguyên biến và phạm vi, phủ định phần lõi cuối cùng.

Ví dụ — phủ định "$f$ liên tục tại $a$":
$$\forall \varepsilon>0\ \exists \delta>0\ \forall x\ (|x-a|<\delta \Rightarrow |f(x)-f(a)|<\varepsilon)$$
$$\neg:\quad \exists \varepsilon>0\ \forall \delta>0\ \exists x\ (|x-a|<\delta \ \wedge\ |f(x)-f(a)|\ge\varepsilon)$$

## 5. Điều kiện cần và đủ

Trong $P \Rightarrow Q$: $P$ là điều kiện **đủ** cho $Q$; $Q$ là điều kiện **cần** cho $P$. Người ta hay đảo ngược hai chữ này. Mẹo: cái đứng **sau** mũi tên là cái *cần thiết* phải xảy ra.

Ví dụ: $f$ khả vi $\Rightarrow$ $f$ liên tục. Liên tục là **cần** cho khả vi, không **đủ** ($|x|$ tại $0$). → [[Derivative Definition]]

## 6. Cạm bẫy

1. **"Hoặc" trong toán là bao hàm.** "$x > 0$ hoặc $x < 1$" đúng với mọi $x$ thực.
2. **Phủ định $\le$ là $>$, không phải $<$.**
3. **Bỏ quên phạm vi lượng từ.** "$\exists x$" mà không nói $x$ chạy trong tập nào thì mệnh đề vô nghĩa.
4. **Dùng $\Rightarrow$ như dấu "bước tiếp theo".** Viết `$x^2=4 \Rightarrow x=2$` là **sai** — mất nghiệm $-2$.
5. **Nhầm "duy nhất" với "tồn tại".** Chứng minh $\exists!$ luôn cần hai phần: tồn tại + duy nhất.

## 7. Checklist áp dụng
- [ ] Mọi lượng từ đã có phạm vi rõ chưa?
- [ ] Thứ tự $\forall$ / $\exists$ có đúng ý định không? (thử đổi chỗ xem nghĩa có đổi)
- [ ] Khi phủ định: đã đổi hết mọi lượng từ chưa?
- [ ] Đang dùng gốc hay đảo? (kiểm tra bằng một phản ví dụ)
- [ ] "Cần" hay "đủ"? (cái sau mũi tên là cần)
- [ ] Mỗi dấu $\Rightarrow$ trong bài có thật sự là suy ra không, hay chỉ là "rồi"?

## Tham khảo
- Velleman — *How to Prove It*, ch. 1–2: https://www.cambridge.org/9781108424189
- Hammack — *Book of Proof*, ch. 2 (*Logic*): https://www.people.vcu.edu/~rhammack/BookOfProof/
- Stanford Encyclopedia of Philosophy — *Classical Logic*: https://plato.stanford.edu/entries/logic-classical/
- Enderton — *A Mathematical Introduction to Logic*: https://www.elsevier.com/books/a-mathematical-introduction-to-logic/enderton/978-0-12-238452-3

## Liên kết
[[Proof Techniques]] · [[Sets Functions and Relations]] · [[Limits]] · [[Continuity]] · [[Math]]
