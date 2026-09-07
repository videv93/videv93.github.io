---
tags: [probability, foundations, combinatorics]
status: evergreen
---
# Counting & Combinatorics

> Khi đã chấp nhận [[Naive Definition of Probability]], toàn bộ bài toán rút gọn về đếm. Chỉ có **bốn** dạng đếm cơ bản — nhớ bảng dưới là đủ cho 90% bài tập.

## 1. Quy tắc nhân (multiplication rule)

Nếu thí nghiệm có $r$ giai đoạn, giai đoạn $i$ có $n_i$ lựa chọn **bất kể** các giai đoạn trước chọn gì, thì tổng số kết quả là $n_1 n_2 \cdots n_r$.

Điều kiện then chốt: **số lựa chọn ở mỗi tầng không đổi**, dù danh sách lựa chọn có thể đổi.

## 2. Bảng sampling — 4 trường hợp

Chọn $k$ vật từ $n$ vật:

| | **Có thứ tự** (ordered) | **Không thứ tự** (unordered) |
|---|---|---|
| **Có hoàn lại** (with replacement) | $n^k$ | $\dbinom{n+k-1}{k}$ |
| **Không hoàn lại** (without replacement) | $n(n-1)\cdots(n-k+1) = \dfrac{n!}{(n-k)!}$ | $\dbinom{n}{k} = \dfrac{n!}{k!(n-k)!}$ |

Ba ô đầu dễ hiểu. Ô **unordered + with replacement** ($\binom{n+k-1}{k}$, bài toán "stars and bars") là ô khó nhất và **hầu như không bao giờ cho các outcome đồng khả năng** — đừng dùng nó làm mẫu số cho naive definition.

## 3. Binomial coefficient — các tính chất phải nhớ

| Tính chất | Công thức | Story |
|---|---|---|
| Đối xứng | $\binom{n}{k} = \binom{n}{n-k}$ | Chọn ai vào = chọn ai ra |
| Pascal | $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ | Xét một người cụ thể: có chọn hay không |
| Tổng | $\sum_{k=0}^{n}\binom{n}{k} = 2^n$ | Đếm mọi tập con bằng 2 cách |
| Vandermonde | $\binom{m+n}{k} = \sum_j \binom{m}{j}\binom{n}{k-j}$ | Chia nhóm thành 2 phe → [[Hypergeometric]] |
| Hút vào | $k\binom{n}{k} = n\binom{n-1}{k-1}$ | Chọn uỷ ban $k$ người rồi chọn chủ tịch |

Mỗi dòng "Story" ở trên là một [[Story Proofs]] — chứng minh bằng đếm 2 cách, không cần đại số.

## 4. Kỹ thuật thường dùng

1. **Chuyển "ít nhất một" thành phần bù.** Gần như luôn nhanh hơn.
2. **Đếm có thứ tự rồi chia cho số hoán vị trùng.** Ví dụ số cách xếp chữ "PROBABILITY": $\frac{11!}{2!\,2!}$ (2 chữ B, 2 chữ I).
3. **Stars and bars** cho bài "chia $k$ vật giống nhau vào $n$ nhóm": $\binom{n+k-1}{k}$.
4. **Chọn nhóm rồi chọn trong nhóm** (multiplication rule theo tầng).
5. **Đếm 2 cách** để chứng minh đẳng thức thay vì biến đổi đại số.

## 5. Cạm bẫy

- **Nhầm ordered/unordered giữa tử và mẫu.** Cách an toàn: luôn đếm **cả hai** theo ordered, hoặc **cả hai** theo unordered.
- **Dùng $\binom{n+k-1}{k}$ làm mẫu số cho naive definition** — các kết quả không đồng khả năng. Ví dụ: tung 2 xúc xắc coi như "unordered with replacement" cho 21 kết quả, nhưng chúng không đồng khả năng.
- **Đếm trùng khi có ràng buộc chồng nhau** → cần inclusion–exclusion (→ [[Properties of Probability]]).
- **Quên trường hợp $k > n$** khi không hoàn lại (kết quả là 0).
- **Nhầm "sắp xếp vòng tròn"**: $n$ người quanh bàn tròn có $(n-1)!$ cách, không phải $n!$.

## 6. Checklist khi đếm
- [ ] Thứ tự có quan trọng trong bài này không?
- [ ] Có hoàn lại không?
- [ ] Tử số và mẫu số dùng cùng một quy ước chứ?
- [ ] Có phần tử giống nhau nào gây đếm trùng không?
- [ ] Thử với $n$ nhỏ (2 hoặc 3) và liệt kê tay — kết quả có khớp công thức không?
- [ ] Có thể tính bằng phần bù cho nhanh hơn không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Python `itertools` | Liệt kê thật để kiểm chứng công thức | https://docs.python.org/3/library/itertools.html |
| `math.comb`, `math.perm` | Tính trực tiếp $\binom{n}{k}$, $n^{\underline{k}}$ | https://docs.python.org/3/library/math.html |
| OEIS | Tra dãy số khi nghi ngờ đã đếm sai | https://oeis.org |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.4: http://probabilitybook.net
- Stat 110 Lecture 1–2: https://www.youtube.com/watch?v=KbB0FjPg0mw
- Wikipedia — *Twelvefold way* (bảng sampling tổng quát): https://en.wikipedia.org/wiki/Twelvefold_way
- Wikipedia — *Stars and bars*: https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)

## Liên kết
[[Naive Definition of Probability]] · [[Story Proofs]] · [[Birthday Problem]] · [[Hypergeometric]] · [[Poker Probability]] · [[Prob&Stats]]
