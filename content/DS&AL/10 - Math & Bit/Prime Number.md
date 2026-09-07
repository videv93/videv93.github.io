---
tags: [dsal, math, number-theory]
status: evergreen
---
# Prime Number

> Không phải pattern lớn trong phỏng vấn Big Tech (Google đôi khi hỏi), nhưng cần có **sàng Eratosthenes** trong tủ vũ khí — thuật toán cổ điển vẫn rất hữu dụng, và là nền cho hằng số `MOD = 10^9 + 7` xuất hiện khắp nơi.

## 1. Khi nào dùng

- Đề hỏi: liệt kê / đếm số nguyên tố, kiểm tra nguyên tố, phân tích thừa số.
- Ứng dụng gián tiếp: [[Rolling Hash]] (modulo prime), [[Combinatorics DP]] (modular inverse cần MOD prime).
- Hằng số hay gặp: `10^9 + 7` (prime), `998244353` (FFT-friendly).

## 2. Template code

```python
def is_prime(n: int) -> bool:
    """Trial division O(sqrt(n))."""
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0: return False
    i = 3
    while i * i <= n:
        if n % i == 0: return False
        i += 2
    return True

def sieve(n: int) -> list[bool]:
    """Sàng Eratosthenes — O(n log log n)."""
    is_p = [True] * (n + 1)
    is_p[0] = is_p[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_p[i]:
            for j in range(i * i, n + 1, i):     # bắt đầu từ i*i, không phải 2i
                is_p[j] = False
    return is_p

def prime_factors(n: int) -> list[int]:
    """Phân tích thừa số — O(sqrt(n))."""
    factors, d = [], 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d); n //= d
        d += 1
    if n > 1: factors.append(n)
    return factors
```

## 3. Chọn công cụ theo constraint

| Bài toán | Phương pháp | Time |
| --- | --- | --- |
| Kiểm tra 1 số, `n ≤ 10^12` | Trial division tới `√n` | `O(√n)` |
| Đếm primes `≤ n`, `n ≤ 10^7` | Sieve of Eratosthenes | `O(n log log n)` |
| Factor **nhiều** số `≤ n`, `n ≤ 10^6` | **SPF sieve** (smallest prime factor) | precompute `O(n log log n)`, mỗi factor `O(log n)` |
| Factor 1 số `n ≤ 10^18` | Pollard ρ + Miller-Rabin | sub-exponential |

## 4. Cạm bẫy

- **Sàng bắt đầu từ `2i` thay vì `i*i`** — vẫn đúng nhưng chậm hơn đáng kể.
- **Quên `is_p[0] = is_p[1] = False`.**
- **Sàng với `n = 10^9`** → hết bộ nhớ. Trên `10^7` phải đổi cách (segmented sieve hoặc trial division).
- **Largest Component by Common Factor (LC 952)**: union **số** với **từng prime factor** của nó, coi prime là "node ảo"; cuối cùng chỉ đếm theo số gốc, không tính prime nodes ([[Union Find]]).
- **Prime Arrangements (LC 1175)**: đáp số `= p! × q! mod 10^9+7` với `p` = số prime `≤ n`. Precompute `fact[i] = fact[i-1] * i % M` — quên `% M` từng bước là số khổng lồ.
- **Ugly Number II (LC 264) không liên quan prime test** — đó là ba con trỏ (hoặc heap) sinh số theo thứ tự tăng, một dạng merge k dãy ([[Heap]]).

## 5. Bài kinh điển

| LC | Bài | Kỹ thuật |
| --- | --- | --- |
| [204](https://leetcode.com/problems/count-primes/) | Count Primes | Sàng Eratosthenes |
| [264](https://leetcode.com/problems/ugly-number-ii/) | Ugly Number II | Ba con trỏ / heap |
| [1175](https://leetcode.com/problems/prime-arrangements/) | Prime Arrangements | Sàng + factorial mod |
| [2523](https://leetcode.com/problems/closest-prime-numbers-in-range/) | Closest Prime Numbers in Range | Sàng + quét |
| [952](https://leetcode.com/problems/largest-component-size-by-common-factor/) | Largest Component Size by Common Factor | Prime factor + DSU |
| [2521](https://leetcode.com/problems/distinct-prime-factors-of-product-in-array/) | Distinct Prime Factors of Product | SPF sieve |

**Tự luyện:** LC 263, 1175, 1390, 1819, 2761.

## 6. Checklist áp dụng

- [ ] `n` lớn cỡ nào? Sàng có vừa bộ nhớ không?
- [ ] Cần factor **một** số hay **nhiều** số? (nhiều → SPF sieve)
- [ ] Sàng đã bắt đầu từ `i*i` chưa?
- [ ] Có phép nhân lớn nào cần `% MOD` từng bước không?
- [ ] Bài có thật sự về số nguyên tố, hay chỉ mượn ngôn ngữ số học?

## Tham khảo

- [cp-algorithms — Sieve of Eratosthenes](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html) và [Linear sieve](https://cp-algorithms.com/algebra/prime-sieve-linear.html)
- [cp-algorithms — Integer factorization (Pollard's rho)](https://cp-algorithms.com/algebra/factorization.html)
- [Wikipedia — Miller–Rabin primality test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 21: Number theory

## Liên kết
[[Union Find]] · [[Rolling Hash]] · [[Combinatorics DP]] · [[Heap]] · [[Big-O Analysis]] · [[DS&AL]]
