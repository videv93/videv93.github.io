---
tags: [probability, foundations, technique]
status: evergreen
---
# Story Proofs

> Chứng minh một đẳng thức bằng cách **đếm cùng một thứ theo hai cách khác nhau**. Không biến đổi đại số, không giai thừa — và nhớ được sau nhiều năm.

## 1. Ý tưởng

Nếu hai biểu thức cùng đếm một tập hợp, chúng bằng nhau. Vậy để chứng minh $L = R$:
1. Tìm một tập hợp mà $L$ đếm nó.
2. Chỉ ra $R$ cũng đếm chính tập đó, chỉ khác cách tổ chức.

Blitzstein gọi đây là *proof by interpretation*. Đây là kỹ năng đặc trưng của Stat 110, và là thứ phân biệt người "biết công thức" với người "hiểu công thức".

## 2. Bốn story proof phải thuộc

| Đẳng thức | Story |
|---|---|
| $\binom{n}{k} = \binom{n}{n-k}$ | Chọn $k$ người vào uỷ ban = chọn $n-k$ người **ở ngoài**. Cùng một hành động. |
| $n\binom{n-1}{k-1} = k\binom{n}{k}$ | Chọn uỷ ban $k$ người có 1 chủ tịch. Trái: chọn chủ tịch trước ($n$ cách) rồi $k-1$ người còn lại. Phải: chọn uỷ ban trước rồi bầu chủ tịch trong $k$ người. |
| $\binom{m+n}{k} = \sum_{j=0}^{k}\binom{m}{j}\binom{n}{k-j}$ (Vandermonde) | Chọn $k$ người từ nhóm gồm $m$ nam và $n$ nữ; phân loại theo số nam $j$. → [[Hypergeometric]] |
| $\sum_{k=0}^{n}\binom{n}{k} = 2^n$ | Đếm mọi tập con: theo cỡ (trái) hoặc theo "mỗi phần tử vào/không vào" (phải). |

Thêm một cái đẹp nữa: $\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}$ (Pascal) — xét một người cụ thể, uỷ ban có chứa người đó hay không.

## 3. Kỹ thuật anh em

| Kỹ thuật                | Ý tưởng                                     | Ví dụ                                                    |
| ----------------------- | ------------------------------------------- | -------------------------------------------------------- |
| **Symmetry**            | Nếu bài toán đối xứng, đáp án phải đối xứng | Xác suất lá bài thứ 7 là Át = lá đầu tiên là Át = $4/52$ |
| **Extreme cases**       | Kiểm tra $n=0,1$ hoặc $p=0,1$               | Bắt lỗi công thức nhanh nhất                             |
| **Indicator variables** | Viết đại lượng đếm thành tổng các indicator | → [[Indicator Random Variables]]                         |
| **Bijection**           | Ghép 1–1 hai tập để chứng minh cùng cỡ      | Stars and bars                                           |
| **First step analysis** | Điều kiện theo bước đầu tiên                | → [[First Step Analysis]]                                |

## 4. Cạm bẫy khi viết story proof

1. **Story không rõ bạn đang đếm cái gì.** Câu đầu tiên phải là "Ta đếm số cách…".
2. **Hai vế đếm hai tập khác nhau nhưng "cỡ giống nhau".** Phải là *cùng một tập*, hoặc có song ánh rõ ràng.
3. **Đếm trùng ở một vế.** Kiểm tra: mỗi đối tượng có được đếm đúng một lần không?
4. **Dùng story proof cho đẳng thức không có bản chất tổ hợp** (ví dụ có căn, có $e$). Story proof chỉ áp cho đại lượng đếm được.
5. **Nhầm story proof với "giải thích trực giác".** Story proof là chứng minh *đầy đủ*, không phải minh hoạ.

## 5. Vì sao đáng đầu tư

- Nhớ lâu hơn hẳn biến đổi đại số.
- Chuyển thẳng sang xác suất: chia cả hai vế cho $|S|$ là ra một đẳng thức xác suất.
- Là nền tảng cho [[Linearity of Expectation]] — công cụ mạnh nhất trong toàn bộ môn.

## 6. Checklist khi gặp một đẳng thức tổ hợp
- [ ] Hai vế có phải số nguyên không? (Nếu có → khả năng cao có story proof)
- [ ] Đã viết được câu "Ta đếm số cách…" chưa?
- [ ] Vế trái tổ chức việc đếm theo tiêu chí nào? Vế phải theo tiêu chí nào?
- [ ] Mỗi đối tượng được đếm đúng một lần ở cả hai vế chứ?
- [ ] Đã thử với $n = 2, 3$ bằng tay chưa?
- [ ] Có kiểm tra trường hợp biên ($k=0$, $k=n$) không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.5: http://probabilitybook.net
- Stat 110 Lecture 2 (*Story Proofs*): https://www.youtube.com/watch?v=FJd_1H3rZGg
- Wikipedia — *Combinatorial proof*: https://en.wikipedia.org/wiki/Combinatorial_proof
- Benjamin & Quinn — *Proofs that Really Count*: https://bookstore.ams.org/dol-27

## Liên kết
[[Counting & Combinatorics]] · [[Linearity of Expectation]] · [[Indicator Random Variables]] · [[Hypergeometric]] · [[Prob&Stats]]
