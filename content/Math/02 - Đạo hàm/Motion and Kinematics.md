---
tags: [math, calculus, derivative, application, physics]
status: evergreen
---
# Motion and Kinematics

> Ứng dụng chuẩn của đạo hàm cấp 1 và cấp 2: vị trí → vận tốc → gia tốc. Và một phân biệt bị bỏ qua liên tục: **vận tốc có dấu, tốc độ thì không**.

> ⚠️ Note này thuộc nhánh calculus tính toán. Xem [[Computational vs Rigorous Mathematics]].

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: *"25) Position, Velocity, Acceleration, and Speed (Full Derivation) 1:51:42"* và *"26) …(Example) 1:59:36"*.

## 1. Chuỗi đạo hàm

| Đại lượng  | Ký hiệu                 | Quan hệ               | Đơn vị SI |
| ---------- | ----------------------- | --------------------- | --------- |
| Vị trí     | $s(t)$                  | —                     | m         |
| Vận tốc    | $v(t) = s'(t)$          | đạo hàm vị trí        | m/s       |
| **Tốc độ** | $\vert v(t)\vert$       | trị tuyệt đối vận tốc | m/s       |
| Gia tốc    | $a(t) = v'(t) = s''(t)$ | đạo hàm vận tốc       | m/s²      |
| Jerk       | $j(t) = a'(t)$          | đạo hàm gia tốc       | m/s³      |

Chiều ngược lại là tích phân: $v = \int a\,dt$, $s = \int v\,dt$, mỗi lần thêm một hằng số xác định bằng điều kiện đầu. → [[Antiderivatives]]

## 2. Vận tốc vs tốc độ

$$v(t) \in \mathbb{R} \ \text{(có dấu)} \qquad\qquad \text{speed} = |v(t)| \ge 0$$

- $v>0$: chuyển động theo chiều dương.
- $v<0$: theo chiều âm. **Tốc độ vẫn dương.**
- $v=0$: đứng yên tức thời — ứng viên cho **đổi chiều**.

**Khi nào vật tăng tốc?** Khi tốc độ $|v|$ tăng, tức khi $v$ và $a$ **cùng dấu**:

| $v$ | $a$ | Tốc độ |
|---|---|---|
| $+$ | $+$ | tăng |
| $+$ | $-$ | giảm |
| $-$ | $-$ | **tăng** |
| $-$ | $+$ | **giảm** |

Đây là chỗ trực giác đời thường ("gia tốc âm = chậm lại") sai.

## 3. Ba đại lượng khoảng cách khác nhau

Trên $[a,b]$:

| Đại lượng | Công thức |
|---|---|
| **Độ dời** (displacement) | $s(b)-s(a) = \int_a^b v\,dt$ — có dấu |
| **Quãng đường** (distance) | $\int_a^b \vert v\vert\,dt$ — luôn $\ge 0$ |
| Vận tốc trung bình | $\dfrac{s(b)-s(a)}{b-a}$ |
| Tốc độ trung bình | $\dfrac{\text{quãng đường}}{b-a}$ |

Vật đi ra rồi quay về: độ dời $=0$, quãng đường $>0$. Tính quãng đường phải **chia khoảng tại các nghiệm của $v=0$** rồi cộng trị tuyệt đối từng đoạn. → [[Fundamental Theorem of Calculus]]

## 4. Quy trình bài toán chuyển động

1. Viết $s(t)$, tính $v=s'$, $a=s''$.
2. **Giải $v(t)=0$** → thời điểm đứng yên / có thể đổi chiều.
3. Lập bảng dấu $v$ trên các khoảng con.
4. Giải $a(t)=0$ → thời điểm vận tốc đạt cực trị.
5. Trả lời theo đúng đại lượng đề hỏi (bảng mục 3).

**Ví dụ rơi tự do:** $s(t)=-4.9t^2+v_0t+s_0$ ⟹ $v=-9.8t+v_0$, $a=-9.8$ (hằng). Độ cao cực đại tại $v=0$, tức $t=v_0/9.8$ — chính là bài toán cực trị của [[Critical Numbers and Extrema]].

## 5. Cạm bẫy

1. **Nhầm vận tốc với tốc độ.** Câu "tốc độ là bao nhiêu" luôn cần trị tuyệt đối.
2. **Tưởng $a<0$ nghĩa là chậm lại.** Xem bảng mục 2.
3. **Nhầm độ dời với quãng đường.** Không chia khoảng tại $v=0$ là sai quãng đường.
4. **Coi $v=0$ chắc chắn là đổi chiều.** $s=t^3$ tại $t=0$: $v=0$ nhưng vẫn đi tới.
5. **Quên hằng số tích phân** khi đi ngược từ $a$ về $v$ về $s$.
6. **Nhầm "vận tốc trung bình" với "trung bình của vận tốc"** — hai cái bằng nhau nhờ [[Mean Value Theorem for Integrals]], nhưng lý do phải nêu.
7. **Bỏ đơn vị.**

## 6. Checklist áp dụng
- [ ] Đề hỏi vận tốc hay tốc độ? Độ dời hay quãng đường?
- [ ] Đã giải $v(t)=0$ và lập bảng dấu chưa?
- [ ] Nếu tính quãng đường — đã chia khoảng tại các nghiệm của $v$ chưa?
- [ ] Câu "đang tăng tốc?" — đã so **dấu** của $v$ và $a$ chưa?
- [ ] Nếu đi ngược ($a \to v \to s$) — đã dùng điều kiện đầu tìm hằng số chưa?
- [ ] Đơn vị của mỗi đáp án có đúng bậc không (m, m/s, m/s²)?

## Tham khảo
- Stewart — *Calculus: Early Transcendentals*, §3.7: https://www.cengage.com/c/calculus-early-transcendentals-9e-stewart
- The Math Sorcerer — *Calculus 1 Full Course*, mục 25–26: https://www.youtube.com/watch?v=G-ti56DEXE8
- MIT OCW 8.01 — *Classical Mechanics*, Kinematics: https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/
- Paul's Online Math Notes — *More Optimization / Rate problems*: https://tutorial.math.lamar.edu/Classes/CalcI/RateOfChange.aspx

## Liên kết
[[Rates of Change]] · [[Derivative Definition]] · [[Antiderivatives]] · [[Critical Numbers and Extrema]] · Physics · [[Math]]
