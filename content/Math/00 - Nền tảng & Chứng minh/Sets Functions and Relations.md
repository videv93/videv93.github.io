---
tags: [math, foundations, set-theory]
status: evergreen
---
# Sets Functions and Relations

> Ngôn ngữ mà mọi định nghĩa toán khác được viết bằng. Không thuộc phần này thì đọc định nghĩa nào cũng phải dịch ngầm, và dịch ngầm là chỗ sinh ra hiểu sai.

> [!note] Ghi chú nguồn
> Đến từ nút *Naive Set Theory, Mathematical Reasoning, Proofs, and Discrete Mathematics* trong `mathematics-roadmap.jpg` — nút có nhiều mũi tên đi ra nhất trong cả sơ đồ.

## 1. Tập hợp

| Ký hiệu | Nghĩa |
|---|---|
| $x \in A$ | $x$ thuộc $A$ |
| $A \subseteq B$ | mọi phần tử của $A$ đều trong $B$ (cho phép bằng) |
| $A \subsetneq B$ | con **thực sự** |
| $A \cup B$, $A \cap B$ | hợp, giao |
| $A \setminus B$ | hiệu — phần tử trong $A$ mà không trong $B$ |
| $A^c$ | phần bù (cần biết tập nền) |
| $A \times B$ | tích Descartes — tập các cặp $(a,b)$ |
| $\mathcal{P}(A)$ | tập lũy thừa, $|\mathcal{P}(A)| = 2^{|A|}$ |
| $\emptyset$ | tập rỗng — **con của mọi tập** |

**Tập số:** $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$. Trong seed MIT, $\mathbb{R}^m$ là không gian vector $m$ chiều và $\mathbb{R}_+^m$ là phần dương của nó — giá cổ phiếu sống ở đó. → [[Vectors]]

**Chứng minh hai tập bằng nhau:** luôn tách thành $A \subseteq B$ và $B \subseteq A$. Không có đường tắt.

## 2. Hàm

$f: A \to B$ gán **mỗi** phần tử của $A$ (domain) **đúng một** phần tử của $B$ (codomain).

| Tính chất | Định nghĩa | Ý nghĩa |
|---|---|---|
| **Đơn ánh** (injective) | $f(x)=f(y) \Rightarrow x=y$ | không mất thông tin |
| **Toàn ánh** (surjective) | $\forall b \in B\ \exists a: f(a)=b$ | phủ hết codomain |
| **Song ánh** (bijective) | cả hai | có hàm ngược $f^{-1}$ |

> [!warning] Range ≠ codomain
> $f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ có codomain $\mathbb{R}$ nhưng range $[0,\infty)$. Toàn ánh hay không **phụ thuộc vào codomain bạn khai báo**, không phải vào công thức.

Ma trận $A$ là một hàm tuyến tính $\mathbb{R}^n \to \mathbb{R}^m$; đơn ánh ⟺ các cột độc lập tuyến tính; toàn ánh ⟺ các cột span $\mathbb{R}^m$. → [[Linear Independence]], [[Systems of Linear Equations]]

## 3. Quan hệ

Quan hệ trên $A$ là một tập con của $A \times A$.

| Tính chất | Điều kiện |
|---|---|
| Phản xạ | $\forall a,\ a R a$ |
| Đối xứng | $aRb \Rightarrow bRa$ |
| Phản đối xứng | $aRb \wedge bRa \Rightarrow a=b$ |
| Bắc cầu | $aRb \wedge bRc \Rightarrow aRc$ |

- **Quan hệ tương đương** = phản xạ + đối xứng + bắc cầu → chia $A$ thành các **lớp tương đương** rời nhau. Đây là cách $\mathbb{Q}$ được xây từ $\mathbb{Z}$, và cách modular arithmetic hoạt động.
- **Thứ tự bộ phận** = phản xạ + phản đối xứng + bắc cầu. Ví dụ: $\subseteq$ trên $\mathcal{P}(A)$.

## 4. Lực lượng (cardinality)

Hai tập **cùng lực lượng** nếu tồn tại song ánh giữa chúng. Hệ quả phản trực giác nhưng đúng:

- $|\mathbb{N}| = |\mathbb{Z}| = |\mathbb{Q}|$ — đều **đếm được**.
- $|\mathbb{R}| > |\mathbb{N}|$ — chứng minh bằng đường chéo Cantor.
- $|\mathcal{P}(A)| > |A|$ luôn đúng, kể cả với tập vô hạn.

Đếm được vs không đếm được là ranh giới sinh ra sự khác nhau giữa biến ngẫu nhiên rời rạc và liên tục. → [[Prob&Stats]]

## 5. Cạm bẫy

1. **$\emptyset$ và $\{\emptyset\}$ khác nhau.** Một cái rỗng, một cái có đúng một phần tử.
2. **$\in$ và $\subseteq$ khác nhau.** $1 \in \{1,2\}$ nhưng $1 \not\subseteq \{1,2\}$; $\{1\} \subseteq \{1,2\}$.
3. **Quên kiểm tra hàm well-defined.** Khi định nghĩa hàm trên lớp tương đương, phải chứng minh kết quả không phụ thuộc đại diện được chọn.
4. **Coi $f^{-1}$ luôn tồn tại.** Chỉ song ánh mới có hàm ngược. Ký hiệu $f^{-1}(S)$ cho **ảnh ngược của tập** thì luôn định nghĩa được — hai thứ khác nhau dùng chung ký hiệu.
5. **Tưởng quan hệ đối xứng + bắc cầu ⟹ phản xạ.** Sai: quan hệ rỗng thoả hai điều đầu, không phản xạ.

## 6. Checklist áp dụng
- [ ] Domain và codomain của hàm đã khai báo rõ chưa?
- [ ] Khi chứng minh $A = B$: đã làm **cả hai** chiều bao hàm chưa?
- [ ] Hàm định nghĩa trên lớp tương đương — đã kiểm well-defined chưa?
- [ ] Đang nói $\in$ hay $\subseteq$?
- [ ] Nếu dùng $f^{-1}$: đang nói hàm ngược hay ảnh ngược?
- [ ] Tập đang xét đếm được hay không? (quyết định công cụ dùng sau đó)

## Tham khảo
- Halmos — *Naive Set Theory*: https://link.springer.com/book/10.1007/978-1-4757-1645-0
- Hammack — *Book of Proof*, ch. 1, 11, 12: https://www.people.vcu.edu/~rhammack/BookOfProof/
- Enderton — *Elements of Set Theory*: https://www.elsevier.com/books/elements-of-set-theory/enderton/978-0-12-238440-0
- Wikipedia — *Cantor's diagonal argument*: https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument

## Liên kết
[[Proof Techniques]] · [[Mathematical Logic Basics]] · [[Vector Spaces and Basis]] · [[Linear Independence]] · [[Math]]
