---
tags: [dsal, data-structure, trie, string]
status: evergreen
---
# Trie

> Prefix tree: mỗi node là một ký tự, mỗi đường đi từ root là một prefix. Trie giải gọn các bài "tìm word có prefix X", "search với wildcard", "dictionary lookup trong board". Biến thể nhị phân cho XOR ở [[Binary Trie XOR]].

## 1. Khi nào dùng

- **Đa truy vấn** về prefix trên cùng một tập word (một truy vấn thì hash là đủ).
- Có wildcard `.` hoặc fuzzy search.
- Lookup từ điển trong bài board/matrix (Word Search II).
- Truy vấn XOR cực đại — biểu diễn số dưới dạng binary trie.

## 2. Template code

```python
class TrieNode:
    __slots__ = ("children", "is_end")
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, s: str) -> "TrieNode | None":
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

## 3. Thiết kế: dict children vs array 26

| Tiêu chí | `dict[ch → node]` | `array[26]` |
| --- | --- | --- |
| Bộ nhớ | Nhỏ khi sparse | Lớn nhưng đều |
| Truy cập | `O(1)` hash | `O(1)` index |
| Unicode | ✅ | ❌ chỉ 26 chữ |
| Code | Pythonic, ngắn | Nhanh hơn ở C++/Java |

Trong phỏng vấn Python: dùng dict, nhắc rằng array 26 nhanh hơn ở ngôn ngữ compiled.

## 4. Ba trick

**Word Search II (LC 212) — pruning:** trie chứa **tất cả** từ trong `words`; DFS từ mỗi cell kèm con trỏ trie. Nếu ký tự hiện tại không có trong `children` → return ngay. Sau khi tìm được một word, set `node.word = None` để **không thêm hai lần**. Xoá luôn node lá không còn con giúp cắt nhánh mạnh hơn nữa.

**Stream of Characters (LC 1032) — reverse trie:** hỏi sau mỗi ký tự "có **hậu tố** nào trùng word không". Build trie của các word **đảo ngược**; khi nhận `c_i`, đi ngược `c_i, c_{i-1}, …` — đó chính là prefix trong trie đảo.

**Replace Words (LC 648) — root ngắn nhất:** khi đi xuống trie, **dừng ngay** tại node terminal đầu tiên. Đi tiếp chỉ ra root dài hơn, vô ích.

## 5. Cạm bẫy

- **Dùng trie cho một truy vấn duy nhất** — hash set đơn giản hơn và nhanh hơn.
- **Quên `is_end`** → `search("app")` trả `True` chỉ vì `"apple"` tồn tại.
- **Add and Search Word (LC 211) với `.`**: phải DFS **mọi** child khi gặp `.`, không được chọn một.
- **Bộ nhớ nổ** khi insert nhiều từ dài — mỗi node là một dict Python (~200 bytes). `__slots__` giúp giảm đáng kể.
- **Longest Word in Dictionary (LC 720)**: từ hợp lệ phải có **mọi prefix** cũng là từ trong dictionary — dễ quên điều kiện này.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [208](https://leetcode.com/problems/implement-trie-prefix-tree/) | Implement Trie | Template nền |
| [211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Add and Search Word | DFS khi gặp `.` |
| [212](https://leetcode.com/problems/word-search-ii/) | Word Search II | Trie + DFS grid + pruning |
| [720](https://leetcode.com/problems/longest-word-in-dictionary/) | Longest Word in Dictionary | Mọi prefix phải là từ |
| [648](https://leetcode.com/problems/replace-words/) | Replace Words | Dừng ở terminal đầu tiên |
| [1032](https://leetcode.com/problems/stream-of-characters/) | Stream of Characters | Reverse trie |

**Tự luyện:** LC 421 ([[Binary Trie XOR]]), 588, 642, 745.

## 7. Checklist áp dụng

- [ ] Có **nhiều** truy vấn prefix không? (một truy vấn → dùng set)
- [ ] Đã có cờ `is_end` chưa?
- [ ] Bảng chữ cái là 26 hay Unicode?
- [ ] Với wildcard: đã DFS mọi nhánh chưa?
- [ ] Có cần chống trùng kết quả (set `word = None`) không?
- [ ] Bài hỏi **suffix** không? (→ build trie trên chuỗi đảo)

## Tham khảo

- [Wikipedia — Trie](https://en.wikipedia.org/wiki/Trie)
- [cp-algorithms — Aho-Corasick algorithm](https://cp-algorithms.com/string/aho_corasick.html) — trie + failure link, bước tiếp theo sau LC 1032
- [LeetCode Explore — Trie](https://leetcode.com/explore/learn/card/trie/)
- [Python docs — __slots__](https://docs.python.org/3/reference/datamodel.html#slots) — giảm bộ nhớ node

## Liên kết
[[String]] · [[Binary Trie XOR]] · [[Backtracking]] · [[Hash Table]] · [[Advanced Tree]] · [[KMP]] · [[DS&AL]]
