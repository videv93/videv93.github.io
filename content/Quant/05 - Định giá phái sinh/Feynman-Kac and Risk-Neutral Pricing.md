---
tags: [quant, derivatives, pricing, stochastic]
status: evergreen
---
# Feynman-Kac and Risk-Neutral Pricing

> Hai khung định giá hoàn toàn khác nhau cho ra **cùng một giá**. Vật lý — qua định lý Feynman-Kac — chứng minh vì sao chúng phải bằng nhau. Đây là câu trả lời cho "làm sao biết Black-Scholes đúng?"

## 1. Hai lập luận cạnh tranh

Ta muốn tìm hàm $V(S_t, t)$ định giá option tại mọi thời điểm. Có hai con đường:

**A. Khung Black-Scholes.** Lập luận replication danh mục dưới no-arbitrage → PDE Black-Scholes → giải ra $V_{BS}$.

**B. Định lý cơ bản của định giá tài sản (FTAP).** Nếu không có arbitrage, giá hợp lý hôm nay của một contingent claim là **kỳ vọng risk-neutral đã chiết khấu của payoff**:
$$V = e^{-r(T-t)}\,\mathbb{E}^{\mathbb{Q}}\!\left[\max(S_T-K,0)\right]$$
Thực hành: mô phỏng rất nhiều path của tài sản cơ sở, tính payoff tại $T$, chiết khấu, lấy trung bình. Sai số → 0 khi số path tăng (luật số lớn). Xem [[Monte Carlo Simulation]].

**Câu hỏi:** cái nào đúng?

Vẽ giá từ cả hai khung tại cùng $t$, cùng $S$ → **giống nhau**. Đổi $t$ → vẫn giống nhau. Nhưng không thể thử vô hạn tham số. Cần **chứng minh**.

## 2. Ý nghĩa của "risk-neutral"

Không phải phát biểu triết học về khẩu vị rủi ro. Nó chỉ nói: **trong kỳ vọng, tài sản tăng trưởng bằng lãi suất phi rủi ro.**
$$dS_t = r S_t\,dt + \sigma S_t\,dW_t$$
Đó là toàn bộ ngụ ý của độ đo risk-neutral $\mathbb{Q}$.

## 3. Chứng minh — các bước

**Prerequisite:** PDE cơ bản, Brownian motion, bổ đề Itô. Xem [[Brownian Motion and SDEs]].

**Bước 1 — Quá trình giá đã chiết khấu.**
$$\tilde{V}_t = e^{-rt}\,V(S_t,t)$$

*Vì sao chiết khấu?* Tiền tại $t_0$ không so sánh trực tiếp được với tiền tại $t_1$. Ta cần một khung quy chiếu thời gian nhất quán → đưa mọi thứ về $t=0$.

**Bước 2 — Vi phân của quá trình chiết khấu.**
$V$ là hàm phụ thuộc thời gian **của một quá trình ngẫu nhiên** → cần bổ đề Itô, và vì có tích nên cần **phiên bản product rule**:
$$d\tilde{V} = A_t\,dB_t + B_t\,dA_t + dA_t\,dB_t$$
với $A_t = e^{-rt}$, $B_t = V$.

- $dA_t\,dB_t = 0$ (deterministic).
- $dA_t = -r e^{-rt}\,dt$.
- $dB_t = dV$ → áp bổ đề Itô.

**Bước 3 — Itô trên $V$.** Khai triển, dùng $dt^2 = 0$, $dt\,dW_t = 0$, $(dW_t)^2 = dt$. Mọi số hạng bậc cao triệt tiêu. Số hạng chéo $dt\,dS$ cũng triệt tiêu (phân phối $dt$ vào GBM cho $dt^2$ và $dt\,dW_t$). $(dS)^2 = \sigma^2 S^2\,dt$. Còn lại ba số hạng.

**Bước 4 — Ghép lại.** Thay tất cả vào, đưa $e^{-rt}$ ra ngoài, gom $dt$:

> Biểu thức bên trong **chính là phương trình Black-Scholes.**

Và phương trình Black-Scholes nói: nếu $V$ là nghiệm thì biểu thức đó **bằng 0**.

⟹ **Toàn bộ số hạng drift biến mất.** Chỉ còn thành phần ngẫu nhiên.

## 4. Kết quả: martingale

Với drift bằng 0, còn lại một số hạng do Brownian motion cung cấp, mà kỳ vọng của nó bằng 0. Cộng thêm:
- $\tilde{V}$ **adapted** với filtration $\mathcal{F}_t$ (không dùng thông tin sau $t$).
- Option có payoff hữu hạn → **khả tích**.

$$\mathbb{E}^{\mathbb{Q}}\!\left[\tilde{V}_s \mid \mathcal{F}_t\right] = \tilde{V}_t \quad \text{với } s > t$$

> **Quá trình giá option đã chiết khấu là một martingale.**

Đây là kết quả trung tâm. Xem [[Martingales]].

## 5. Ghép các mảnh

Tại $T$: $\tilde{V}_T = e^{-rT}\max(S_T - K, 0)$ — không còn ngẫu nhiên về payoff, ta biết hàm.
Tại $t$: $\tilde{V}_t = e^{-rt}V(S_t, t)$ — nghiệm PDE Black-Scholes.

Áp tính chất martingale, lấy kỳ vọng risk-neutral của $\tilde{V}_T$ cho $\mathcal{F}_t$ → phải bằng $\tilde{V}_t$. Thay vào, kéo kỳ vọng ra (chỉ $S_T$ ngẫu nhiên), chia cho $e^{-rt}$:

$$V(S_t,t) = e^{-r(T-t)}\,\mathbb{E}^{\mathbb{Q}}\!\left[\max(S_T-K,0)\,\middle|\,\mathcal{F}_t\right]$$

> **Nghiệm của phương trình Black-Scholes chính xác là giá không-arbitrage mà FTAP khẳng định phải tồn tại.**

Đây là **định lý Feynman-Kac** áp cho trường hợp Black-Scholes. Nó đúng cho cả một **lớp PDE parabolic** — không chỉ trường hợp này.

## 6. Vì sao "physics accidentally proved it"

Feynman-Kac ra đời trong vật lý, nối nghiệm của PDE parabolic với kỳ vọng của quá trình ngẫu nhiên. Nó không được tạo ra cho tài chính. Nhưng phương trình Black-Scholes **là phương trình truyền nhiệt đã biến đổi** — nên định lý áp thẳng vào.

**Bài học phương pháp luận:** đưa ra giả định **không** có nghĩa lập luận của bạn không nhất quán nội tại. Người bình luận "giả định của anh bị vi phạm" đang trả lời một câu hỏi khác. Ở đây ta chứng minh Black-Scholes **đúng so với chính khung của nó** — và đó là điều duy nhất có thể chứng minh. Xem [[All Models Are Wrong]].

## 7. Cạm bẫy
- **Nhầm $\mathbb{Q}$ với $\mathbb{P}$.** Định giá dùng risk-neutral; đo rủi ro thực dùng real-world measure. Trộn hai cái là lỗi kinh điển.
- **Nghĩ risk-neutral nghĩa là "nhà đầu tư không sợ rủi ro".** Không. Xem mục 2.
- **Quên điều kiện tồn tại/duy nhất của $\mathbb{Q}$.** Thị trường không đầy đủ (incomplete) → $\mathbb{Q}$ không duy nhất → giá không duy nhất.
- **Áp Feynman-Kac ngoài lớp PDE parabolic.**

## 8. Checklist áp dụng
- [ ] Tôi đang làm việc dưới $\mathbb{P}$ hay $\mathbb{Q}$? Có nhất quán không?
- [ ] Thị trường tôi đang xét có đầy đủ không? $\mathbb{Q}$ có duy nhất không?
- [ ] Nếu tôi định giá bằng Monte Carlo, tôi có mô phỏng dưới $\mathbb{Q}$ (drift = $r$) không?
- [ ] Nếu hai phương pháp cho kết quả khác nhau, tôi kiểm tra được ở đâu?

## Tham khảo
- Quant Guild — *How Physics Accidentally Proved the Black-Scholes Model*: https://youtu.be/IIzGqL3ChEs
- Kac, M. — *On Distributions of Certain Wiener Functionals*, Trans. AMS (1949)
- Harrison & Kreps — *Martingales and arbitrage in multiperiod securities markets*, JET (1979)
- Harrison & Pliska (1981) — FTAP
- Shreve, S. — *Stochastic Calculus for Finance II*, Ch. 5–6
- Quant Guild — *Quant Explains Risk-Neutral Option Pricing*: https://youtu.be/wYpg0TGxvgM

## Liên kết
[[Black-Scholes Model]] · [[Martingales]] · [[Brownian Motion and SDEs]] · [[Monte Carlo Simulation]] · [[European Options]] · [[Quant]]
