---
tags: [probability, classic-problem]
status: evergreen
---
# Birthday Problem

> Chỉ cần **23** người là xác suất có hai người trùng sinh nhật vượt 50%. Trực giác sai vì ta đếm nhầm đối tượng: không phải 23 người, mà là 253 **cặp**.

## 1. Bài toán & lời giải

$k$ người, 365 ngày, sinh nhật độc lập và đều. Tính $P(\text{có ít nhất 2 người trùng})$.

Dùng phần bù (→ [[Properties of Probability]]):
$$P(\text{trùng}) = 1 - \frac{365 \cdot 364 \cdots (365-k+1)}{365^k}$$

| $k$ | $P(\text{có trùng})$ |
|---|---|
| 10 | 11.7% |
| 20 | 41.1% |
| **23** | **50.7%** |
| 30 | 70.6% |
| 50 | 97.0% |
| 57 | 99.0% |
| 366 | 100% (pigeonhole) |

## 2. Vì sao trực giác sai

Sai lầm: nghĩ "xác suất ai đó trùng **với tôi**". Câu đó cần ~253 người để đạt 50%.

Câu hỏi thật là về **mọi cặp**: $\binom{23}{2} = 253$ cặp. Mỗi cặp trùng với xác suất $1/365$. Kỳ vọng số cặp trùng $= 253/365 \approx 0.69$ — cùng cỡ với 1, nên xác suất có ít nhất một cặp là đáng kể.

Đây là bài học tổng quát: **số cặp tăng bậc hai theo $n$**, còn trực giác của ta tăng tuyến tính.

## 3. Ba cách tiếp cận

| Cách | Kết quả | Ghi chú |
|---|---|---|
| Phần bù chính xác | Công thức §1 | Chính xác, khó ước lượng nhẩm |
| Xấp xỉ mũ | $P \approx 1 - e^{-k(k-1)/730}$ | Dùng $1-x \approx e^{-x}$; ngưỡng 50% khi $k\approx 1.177\sqrt{365}$ |
| [[Poisson Paradigm]] | $P \approx 1 - e^{-\lambda}$, $\lambda = \binom{k}{2}/365$ | Các cặp *gần* độc lập → xấp xỉ Poisson rất tốt |
| [[Indicator Random Variables]] | $E[\#\text{cặp trùng}] = \binom{k}{2}/365$ | Một dòng, không cần độc lập → [[Linearity of Expectation]] |

Blitzstein dùng bài này để giới thiệu Poisson paradigm ở Lecture 11 — các indicator "trùng cặp $(i,j)$" **không** độc lập (tính bắc cầu), nhưng phụ thuộc yếu, nên Poisson vẫn chuẩn.

## 4. Tổng quát hoá

- **$N$ ngày thay vì 365**: ngưỡng 50% ở $k \approx 1.177\sqrt{N}$ — quy tắc **căn bậc hai**.
- **Birthday attack** trong mật mã: hàm băm $b$ bit bị va chạm sau ~$2^{b/2}$ mẫu, không phải $2^b$. Đây là lý do MD5 (128 bit) và SHA-1 (160 bit) bị coi là yếu.
- **Ba người cùng sinh nhật**: cần ~88 người cho 50%.
- **Sinh nhật không đều** làm xác suất trùng chỉ **tăng** lên (kết quả của Munford/Bloom) — nên 23 là chặn an toàn.

## 5. Cạm bẫy

1. **Nhầm với "trùng với một người cụ thể"** (253 người, không phải 23).
2. **Bỏ qua 29/2** hoặc giả định phân bố đều mà không nói. Ảnh hưởng nhỏ nhưng nên tuyên bố.
3. **Cộng $\binom{k}{2}\cdot\frac{1}{365}$ rồi coi là xác suất** — với $k$ lớn ra > 1. Đó là **union bound**, chỉ là chặn trên.
4. **Cho rằng các indicator cặp độc lập.** Chúng không (nếu $A\!=\!B$ và $B\!=\!C$ thì $A\!=\!C$), nhưng linearity của kỳ vọng không cần độc lập.
5. **Áp quy tắc căn bậc hai cho bài "trùng với giá trị cho trước"** — bài đó tuyến tính, không phải căn.

## 6. Checklist khi gặp bài dạng "có trùng nhau không"
- [ ] Đang hỏi trùng **giữa các cặp** hay trùng **với một mốc cố định**?
- [ ] Đã thử phần bù chưa?
- [ ] $\binom{k}{2}/N$ có gần 1 không? → vùng chuyển pha
- [ ] Cần chính xác hay chỉ cần cỡ độ lớn? (→ dùng $\sqrt{N}$)
- [ ] Union bound có ra số > 1 không? (dấu hiệu đang dùng sai công cụ)
- [ ] Có thể mô phỏng 10.000 lần để kiểm chứng không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.5: http://probabilitybook.net
- Stat 110 Lecture 3: https://www.youtube.com/watch?v=LZ5Wergp_PA
- Stat 110 Lecture 11 (birthday qua Poisson paradigm): https://www.youtube.com/watch?v=TD1N4hxqMzY
- Wikipedia — *Birthday problem*: https://en.wikipedia.org/wiki/Birthday_problem
- Wikipedia — *Birthday attack*: https://en.wikipedia.org/wiki/Birthday_attack

## Liên kết
[[Counting & Combinatorics]] · [[Poisson Paradigm]] · [[Indicator Random Variables]] · [[Properties of Probability]] · [[Prob&Stats]]
