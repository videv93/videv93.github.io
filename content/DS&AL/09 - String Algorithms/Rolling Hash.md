---
tags: [dsal, string, hashing]
status: evergreen
---
# Rolling Hash

> Hash của một chuỗi mà khi "trượt cửa sổ" chỉ tốn `O(1)` để cập nhật. Biến `O(n·m)` thành `O(n + m)` cho substring matching, duplicate detection, đếm substring phân biệt. Đánh đổi: **có xác suất va chạm**.

## 1. Công thức (Rabin-Karp)

```
hash(s[l..r]) = (s[l]·base^(r-l) + s[l+1]·base^(r-l-1) + … + s[r]) mod M

Trượt: hash_new = (hash_old · base + s[r+1] - s[l] · base^(r-l+1)) mod M
```

**Prefix-hash convention `[l, r)`** — dùng cho truy vấn hash của **đoạn bất kỳ**:
```
hash[i] = (hash[i-1] * base + ord(s[i-1])) mod M
hash của s[l:r] = (hash[r] - hash[l] * pow_base[r-l]) mod M
```
Python: `(a - b) % M` luôn cho kết quả `≥ 0` — an toàn. Java/C++ cần `((… % M) + M) % M`.

## 2. Template code

```python
def rolling_hash(s: str, length: int) -> set[int]:
    BASE = 26
    MOD = (1 << 61) - 1               # Mersenne prime — ít va chạm
    n = len(s)
    base_pow = pow(BASE, length, MOD)
    h, seen = 0, set()
    for i in range(n):
        h = (h * BASE + ord(s[i])) % MOD
        if i >= length:
            h = (h - ord(s[i - length]) * base_pow) % MOD
        if i >= length - 1:
            seen.add(h)
    return seen
```

## 3. Va chạm — ba cấp độ đảm bảo

| Mục tiêu | Đủ dùng |
| --- | --- |
| **Pass LeetCode** | 1 hash với modulus prime lớn (`10^9+7` hoặc `(1<<61)-1`) |
| **Production / robust** | **Double hash** (hai cặp `(base, mod)`), hoặc kiểm chứng lại substring khi hash trùng |
| **Tuyệt đối không sai** | Lưu substring thật thay vì hash — tốn bộ nhớ |

Nếu có adversary cố tình tấn công (hash collision attack), luôn dùng double hashing hoặc random base.

## 4. Rolling hash vs KMP/Z

|  | Rolling hash | [[KMP]] / [[Z Function]] |
| --- | --- | --- |
| Tìm pattern `P` trong `T` | `O(\|T\|)` trung bình, có thể va chạm | `O(\|T\| + \|P\|)` **đảm bảo** |
| Nhiều pattern khác nhau | Cần index hash của `T` — rất tiện | Phải build lại per-pattern |
| So sánh **đoạn bất kỳ** của chuỗi | ✅ Hash mọi range trong `O(1)` | ❌ Không hỗ trợ trực tiếp |
| Rủi ro va chạm | Có | Không |

→ Rolling hash thắng khi cần so sánh **nhiều đoạn tuỳ ý**; KMP/Z thắng khi cần **đảm bảo đúng** cho một pattern.

## 5. Cạm bẫy

- **Modulus nhỏ** (`10^6`) → va chạm gần như chắc chắn với `n = 10^5` (nghịch lý ngày sinh).
- **Quên `pow(BASE, length, MOD)`** mà tính `BASE ** length` → số khổng lồ, chậm.
- **Base nhỏ hơn kích thước bảng chữ cái** → hai chuỗi khác nhau ra cùng hash một cách hệ thống.
- **Longest Duplicate Substring (LC 1044)**: kết hợp **binary search trên độ dài** + rolling hash — nhớ rằng predicate "tồn tại duplicate độ dài `L`" là đơn điệu ([[Search on Answer]]).
- **Distinct Echo Substrings (LC 1316)**: LC chấp nhận 1 hash; production nên verify lại bằng slice khi hash trùng.

## 6. Bài kinh điển

| LC | Bài | Kỹ thuật |
| --- | --- | --- |
| [187](https://leetcode.com/problems/repeated-dna-sequences/) | Repeated DNA Sequences | Rolling hash cửa sổ 10 |
| [1044](https://leetcode.com/problems/longest-duplicate-substring/) | Longest Duplicate Substring | Binary search + hash |
| [1316](https://leetcode.com/problems/distinct-echo-substrings/) | Distinct Echo Substrings | Prefix hash so hai nửa |
| [214](https://leetcode.com/problems/shortest-palindrome/) | Shortest Palindrome | Hash xuôi vs hash ngược |
| [1638](https://leetcode.com/problems/count-substrings-that-differ-by-one-character/) | Strings Differ by One Character | Hash + so sánh từng vị trí |
| [2223](https://leetcode.com/problems/sum-of-scores-of-built-strings/) | Sum of Scores of Built Strings | Hash (hoặc Z function) |

**Tự luyện:** LC 28, 686, 1147.

## 7. Checklist áp dụng

- [ ] MOD có đủ lớn (`≥ 10^9`) và là prime không?
- [ ] BASE có lớn hơn kích thước bảng chữ cái không?
- [ ] Đã dùng `pow(base, k, MOD)` thay vì luỹ thừa thường chưa?
- [ ] Có cần double hash / verify lại khi trùng không?
- [ ] Có phải bài chỉ cần một pattern không? (→ KMP/Z đảm bảo hơn)

## Tham khảo

- [cp-algorithms — String Hashing](https://cp-algorithms.com/string/string-hashing.html) — có phân tích xác suất va chạm
- [Wikipedia — Rabin–Karp algorithm](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)
- [Codeforces — Anti-hash tests](https://codeforces.com/blog/entry/60442) — vì sao cần random base
- [Python docs — pow(base, exp, mod)](https://docs.python.org/3/library/functions.html#pow)

## Liên kết
[[String]] · [[KMP]] · [[Z Function]] · [[Hash Table]] · [[Search on Answer]] · [[Prime Number]] · [[DS&AL]]
