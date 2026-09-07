---
tags: [dsal, data-structure, linked-list]
status: evergreen
---
# Linked List

> "Đơn giản về lý thuyết, phức tạp về code." Mỗi node trỏ tới node kế tiếp — vậy thôi. Nhưng để code không bug, phải thuộc lòng **5 trick**: dummy head, two pointers, reverse 3 con trỏ, split-process-merge, pointer relinking.

## 1. Khi nào dùng

- Input là **head** của linked list (đơn hoặc đôi).
- Cần chèn/xoá node ở giữa — `O(1)` nếu đã có reference (khác array).
- Yêu cầu `O(1)` extra space: không được copy ra mảng rồi xử lý.
- Dạng quen: "tìm node theo offset từ cuối", "phát hiện chu trình", "merge / split / đảo".

## 2. Định dạng input chuẩn (LeetCode)

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```
Ký hiệu `1 → 2 → 3 → None` tương ứng `ListNode(1, ListNode(2, ListNode(3)))`. Biến thể: LC 138 dùng `Node` có thêm `random`; LRU dùng **doubly linked list** tự định nghĩa.

## 3. Năm trick phải thuộc

```python
def use_dummy(head):
    """Dummy head — khi head có thể đổi (xoá/chèn ở đầu)."""
    dummy = ListNode(0, head)
    prev = dummy
    while prev.next:
        # ... thao tác trên prev.next ...
        prev = prev.next
    return dummy.next

def find_middle(head):
    """Slow/fast — slow dừng ở giữa (LC 876)."""
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow

def reverse(head):
    """Reverse iterative — 3 con trỏ."""
    prev, curr = None, head
    while curr:
        curr.next, prev, curr = prev, curr, curr.next
    return prev
```

1. **Dummy head** — tránh hàng tá `if head is None`. Dùng cho: Remove Nth From End, Merge Two Sorted, Partition, Odd-Even, Reverse k-Group.
2. **Two pointers (slow/fast)** — tìm giữa (1×/2×), phát hiện chu trình (Floyd), offset từ cuối.
3. **Reverse in-place** — `prev / curr / nxt`.
4. **Split → process → merge** — merge sort trên LL, palindrome check, reorder.
5. **Pointer relinking** — khi gắn `a.next = b`, luôn lưu `a.next` cũ **trước** khi ghi đè.

## 4. Pointer safety checklist (đọc trước khi submit)

1. Trước khi cắt `a.next = b`, đã lưu `a.next` cũ chưa?
2. Có dummy/sentinel trỏ vào head chưa? (cần khi head có thể đổi)
3. Vòng lặp `while cur and cur.next` — điều kiện kép cho hai nút cuối.
4. Sau khi reverse/split, **tail cũ** đã `.next = None` chưa? (tránh tạo cycle)
5. Edge case: list rỗng, 1 phần tử, `k > len`.

## 5. Cạm bẫy

- **Mất `next`** khi gán trước lúc lưu → đứt danh sách.
- **Vô tình tạo chu trình** vì quên cắt tail sau khi split.
- **Floyd cycle detection**: nhớ điều kiện `fast and fast.next`, thiếu là `AttributeError`.
- **Copy List with Random Pointer**: phải map `old → new` **trước** khi đệ quy, nếu không sẽ lặp vô hạn.
- **Reverse k-Group**: quên nối lại đoạn trước với đoạn sau khi nhóm cuối không đủ `k`.

## 6. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [206](https://leetcode.com/problems/reverse-linked-list/) | Reverse Linked List | 3 con trỏ (iterative) / đệ quy ([[Recursion]]) |
| [21](https://leetcode.com/problems/merge-two-sorted-lists/) | Merge Two Sorted Lists | Dummy head |
| [141](https://leetcode.com/problems/linked-list-cycle/) | Linked List Cycle | Floyd slow/fast |
| [876](https://leetcode.com/problems/middle-of-the-linked-list/) | Middle of the Linked List | slow/fast |
| [19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) | Remove Nth From End | Dummy + hai con trỏ cách `n` |
| [234](https://leetcode.com/problems/palindrome-linked-list/) | Palindrome Linked List | Split + reverse nửa sau |
| [2](https://leetcode.com/problems/add-two-numbers/) | Add Two Numbers | Carry + dummy |
| [138](https://leetcode.com/problems/copy-list-with-random-pointer/) | Copy List with Random Pointer | Map old→new đặt trước đệ quy |
| [25](https://leetcode.com/problems/reverse-nodes-in-k-group/) | Reverse Nodes in k-Group | Reverse từng đoạn + nối |
| [148](https://leetcode.com/problems/sort-list/) | Sort List | Merge sort trên LL ([[Divide and Conquer]]) |
| [146](https://leetcode.com/problems/lru-cache/) | LRU Cache | Hash + DLL ([[Hash Table]]) |
| [143](https://leetcode.com/problems/reorder-list/) | Reorder List | Split + reverse + merge |

**Tự luyện:** LC 86, 92, 109, 142, 160, 328, 445.

## 7. Vì sao LRU cần cả hash lẫn DLL

- **Hash table** trả lời "key này ở đâu?" → `O(1)` lookup.
- **Doubly linked list** trả lời "nút nào ít dùng nhất?" → `O(1)` move/remove.
- Hai cấu trúc bù trừ nhau — ví dụ kinh điển của việc **kết hợp data structures**.

## 8. Checklist áp dụng

- [ ] Head có thể đổi không? Nếu có, đã dùng dummy chưa?
- [ ] Đã lưu `next` trước mọi phép gán chưa?
- [ ] Tail sau split/reverse đã `.next = None` chưa?
- [ ] Đã test: rỗng, 1 node, 2 node, `k > len`?
- [ ] Có thể dùng `O(1)` space không, hay đang lén copy sang list?

## Tham khảo

- [LeetCode Explore — Linked List](https://leetcode.com/explore/learn/card/linked-list/)
- [Floyd's cycle detection — Wikipedia](https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_tortoise_and_hare)
- [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 10: Elementary Data Structures
- [Python docs — collections.OrderedDict](https://docs.python.org/3/library/collections.html#collections.OrderedDict) — bản LRU "5 dòng"

## Liên kết
[[Hash Table]] · [[Two Pointers]] · [[Recursion]] · [[Divide and Conquer]] · [[Heap]] · [[System Design Hybrid]] · [[DS&AL]]
