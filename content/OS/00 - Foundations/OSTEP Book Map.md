---
tags: [os, foundation, source, clippings]
status: evergreen
source: "https://pages.cs.wisc.edu/~remzi/OSTEP/"
created: 2026-08-28
---
# OSTEP Book Map

> Bản đồ chương của *Operating Systems: Three Easy Pieces* (Remzi & Andrea Arpaci-Dusseau, v1.10) và ánh xạ sang các note trong vault này. Đây là **note nguồn** — mọi note khác trong area OS đều bắt nguồn từ một hoặc vài chương ở đây.

## 1. Ba mảnh ghép của OSTEP
Xem [[Three Easy Pieces]] để hiểu vì sao cuốn sách chia theo ba trục này.

| Piece | Câu hỏi trung tâm | Chương | Note trong vault |
|---|---|---|---|
| **Virtualization** | Làm sao biến 1 CPU / 1 vùng RAM vật lý thành ảo giác "mỗi chương trình có riêng"? | 3–24 | `01 - CPU Virtualization`, `02 - Memory Virtualization` |
| **Concurrency** | Làm sao nhiều luồng cùng chạy mà không phá dữ liệu của nhau? | 25–34 | `03 - Concurrency` |
| **Persistence** | Làm sao dữ liệu sống sót qua mất điện và hỏng phần cứng? | 35–51 | `04 - Persistence`, `05 - Distributed Systems` |

## 2. Ánh xạ chương → note

### Intro (ch. 1–2)
| Chương | Note |
|---|---|
| 2 Introduction | [[Operating System]] · [[Three Easy Pieces]] |

### Virtualization — CPU (ch. 4–11)
| Chương | Note |
|---|---|
| 4 Processes | [[Process]] |
| 5 Process API | [[Process API]] |
| 6 Direct Execution | [[Limited Direct Execution]] · [[User Mode vs Kernel Mode]] · [[System Call]] · [[Context Switch]] |
| 7 CPU Scheduling | [[CPU Scheduling]] |
| 8 Multi-level Feedback | [[Multi-level Feedback Queue]] |
| 9 Lottery Scheduling | [[Proportional Share Scheduling]] |
| 10 Multi-CPU Scheduling | [[Multiprocessor Scheduling]] |

### Virtualization — Memory (ch. 13–24)
| Chương | Note |
|---|---|
| 13 Address Spaces | [[Address Space]] |
| 14 Memory API | [[Memory API]] |
| 15 Address Translation | [[Address Translation]] |
| 16 Segmentation | [[Segmentation]] |
| 17 Free Space Management | [[Free Space Management]] |
| 18 Introduction to Paging | [[Paging]] |
| 19 Translation Lookaside Buffers | [[Translation Lookaside Buffer]] |
| 20 Advanced Page Tables | [[Multi-level Page Table]] |
| 21–22 Swapping: Mechanisms & Policies | [[Swapping]] · [[Page Replacement Policy]] |
| 23 Complete VM Systems | [[Address Space]] · [[Multi-level Page Table]] |

### Concurrency (ch. 26–33)
| Chương | Note |
|---|---|
| 26 Concurrency and Threads | [[Thread]] |
| 27 Thread API | [[Thread]] |
| 28 Locks | [[Lock]] |
| 29 Locked Data Structures | [[Concurrent Data Structures]] |
| 30 Condition Variables | [[Condition Variable]] |
| 31 Semaphores | [[Semaphore]] |
| 32 Concurrency Bugs | [[Concurrency Bugs]] · [[Deadlock]] |
| 33 Event-based Concurrency | [[Event-based Concurrency]] |

### Persistence (ch. 36–45)
| Chương | Note |
|---|---|
| 36 I/O Devices | [[IO Devices]] |
| 37 Hard Disk Drives | [[Hard Disk Drive]] |
| 38 Redundant Disk Arrays (RAID) | [[RAID]] |
| 39 Files and Directories | [[Files and Directories]] |
| 40 File System Implementation | [[File System Implementation]] |
| 41 Fast File System (FFS) | [[Fast File System]] |
| 42 FSCK and Journaling | [[Crash Consistency and Journaling]] |
| 43 Log-structured File System (LFS) | [[Log-structured File System]] |
| 44 Flash-based SSDs | [[Flash-based SSD]] |
| 45 Data Integrity and Protection | [[Data Integrity and Protection]] |

### Distributed (ch. 48–50)
| Chương | Note |
|---|---|
| 48 Distributed Systems | [[Distributed Systems]] |
| 49 Network File System (NFS) | [[Network File System]] |
| 50 Andrew File System (AFS) | [[Andrew File System]] |

### Security (chương mới, Peter Reiher)
| Chủ đề | Note |
|---|---|
| Intro to Security, Authentication, Access Control | [[OS Security Fundamentals]] · [[Authentication]] · [[Access Control]] |
| Cryptography, Distributed System Security | [[Cryptography in OS]] |
| Virtual Machines | [[Virtual Machine Monitor]] |
| Lab Tutorial, Systems Labs, xv6 Labs | [[xv6 and Lab Projects]] |

## 3. Cách dùng cuốn sách này
1. Đọc **dialogue** đầu mỗi phần trước — nó nói rõ câu hỏi mà phần đó trả lời.
2. Đọc chương, rồi làm **homework simulator** tương ứng (`ostep-homework` trên GitHub). Không chạy simulator thì phần lớn kiến thức scheduling/paging chỉ là chữ.
3. Code chương nào có tag `code` — repo `ostep-code`.
4. Muốn đi sâu hơn nữa: làm [[xv6 and Lab Projects]].

## 4. Checklist áp dụng
- [ ] Đã đọc dialogue mở đầu của piece đang học chưa?
- [ ] Chương vừa đọc có homework simulator không? Đã chạy chưa?
- [ ] Đã cập nhật `status` của note tương ứng trong vault chưa?
- [ ] Có khái niệm nào trong chương chưa có note? → tạo note mới và thêm vào [[OS]]

## Tham khảo
- OSTEP — trang chủ, PDF miễn phí: https://pages.cs.wisc.edu/~remzi/OSTEP/
- OSTEP homework/simulators: https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html
- `ostep-code` — mã nguồn theo chương: https://github.com/remzi-arpacidusseau/ostep-code
- `ostep-homework` — simulator: https://github.com/remzi-arpacidusseau/ostep-homework
- Book news / errata: https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html

## Liên kết
[[OS]] · [[Three Easy Pieces]] · [[OS Learning Roadmap]] · [[xv6 and Lab Projects]]

---

## Phụ lục — Clipping gốc từ trang OSTEP
> Giữ nguyên 100% nội dung seed ban đầu (bảng chương đầy đủ với link PDF trực tiếp). Bản gốc chưa chỉnh sửa nằm ở `_archive-seed/`.


### Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau (University of Wisconsin-Madison)

### NEW: Security Chapters by Peter Reiher (UCLA)

Blog: [Why Textbooks Should Be Free](https://from-a-to-remzi.blogspot.com/2014/01/the-case-for-free-online-books-fobs.html)

**Quick:** [Free Book Chapters](#book-chapters) - [Hardcover](https://pages.cs.wisc.edu/~remzi/OSTEP/book-hardcover.html) - [Softcover (Amazon)](https://www.amazon.com/exec/obidos/ASIN/198508659X/) - [Buy PDF](https://pages.cs.wisc.edu/~remzi/OSTEP/book-electronic.html) - [Buy in India](https://pothi.com/pothi/book/remzi-h-arpaci-dusseau-operating-systems-three-easy-pieces-test-printing) - [Buy Stuff](https://www.redbubble.com/shop/ap/50477786?ref=studio-promote) - [Donate](#donate) - [For Teachers](#instructors) - [Homework](#homework) - [Projects](#projects) - [News](#news) - [Acknowledgements](#acks) - [Other Books](#acks)

Welcome to **Operating Systems: Three Easy Pieces** (now **version 1.10** -- see [book news](https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html) for details), a free online operating systems book! The book is centered around three conceptual pieces that are fundamental to operating systems: **virtualization,** **concurrency,** and **persistence.** In understanding the conceptual, you will also learn the practical, including how an operating system does things like schedule the CPU, manage memory, and store files persistently. Lots of fun stuff! Or [maybe not](https://pic4.zhimg.com/v2-522ded6304485cdac723f25d03c012dd_1200x500.jpg) so fun?

This book **is and will always be free** in PDF form, as seen below. For those of you wishing to **BUY** a copy, please consider the following:

- [Lulu Hardcover (v1.10):](https://pages.cs.wisc.edu/~remzi/OSTEP/book-hardcover.html) this may be the best printed form of the book (it really looks pretty good), but it is also the most expensive way to obtain *the black book* of operating systems (a.k.a. *the comet book* or *the asteroid book* according to students). Now just: **\$39.75**
- [Amazon Softcover (v1.10):](https://www.amazon.com/exec/obidos/ASIN/198508659X/) Same book as softcover above, but printed through Amazon CreateSpace. Now just: **\$28.27** (but works with Prime shipping)
- [Downloadable PDF (v1.10):](https://pages.cs.wisc.edu/~remzi/OSTEP/book-electronic.html) this is a nice convenience and adds things like a hyperlinked table of contents, index of terms, lists of hints, tips, systems advice, and a few other things not seen in the free version, all in one massive DRM-free PDF. Once purchased, you will always be able to get the latest version. Just: **\$10.00**
- [Kindle (still v1.00):](https://pages.cs.wisc.edu/~remzi/OSTEP/book-kindle.html) Really, just the PDF and does not include all the bells and whistles common in e-pub books.

**Warning:** Some resellers on Amazon buy old versions of the books and claim to sell them as “new” on Amazon (click [here](https://www.amazon.com/Operating-Systems-Pieces-Softcover-Version/dp/B06XYB457F/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1536278584&sr=1-2) for an example); buy from them at your own risk. In general, buy either directly from Lulu.com or Amazon.com (not a reseller). For Amazon, go to [this page](https://www.amazon.com/gp/offer-listing/198508659X/ref=dp_olp_all_mbc?ie=UTF8&condition=all) and look for Seller Information to be Amazon.com.

**Merch:** Can't bear to go out in public without OSTEP? How about an [Operating Systems: Three Easy Pieces T-shirt](https://www.redbubble.com/i/t-shirt/OSTEP-Comet-by-ostep/50477786.IJ6L0) or [laptop sticker](https://www.redbubble.com/i/sticker/OSTEP-Comet-by-ostep/50477786.EJUG5) or [bathmat](https://www.redbubble.com/i/bath-mat/OSTEP-Comet-by-ostep/50477786.EVFTZ) or [blanket](https://www.redbubble.com/i/throw-blanket/OSTEP-Comet-by-ostep/50477786.16D0B) or [mug](https://www.redbubble.com/i/mug/OSTEP-Comet-by-ostep/50477786.9Q0AD) or [check out the whole store?](https://www.redbubble.com/shop/ap/50477786?ref=studio-promote)

**Donate:** By popular demand, another way to support this site and its contents: **donate!** Click to donate [$1](https://paypal.me/remziarpacidusseau/1) - [$10](https://paypal.me/remziarpacidusseau/10) - [$20](https://paypal.me/remziarpacidusseau/20) - [$50](https://paypal.me/remziarpacidusseau/50) - or click [here](https://paypal.me/remziarpacidusseau) to donate any amount you want! Your donation helps keep this book going. Think about it: if everyone who came to this website donated just one dollar, we'd have at least three dollars. Thanks!

Another way to help the book out: cite it! Here is the [BiBTeX entry (seen below);](https://pages.cs.wisc.edu/~remzi/OSTEP/book.bib) you can also link to the site of the [best free operating systems book](https://pages.cs.wisc.edu/~remzi/OSTEP/) on the market.

> **Operating Systems: Three Easy Pieces**  
> Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau  
> Arpaci-Dusseau Books  
> November, 2023 (Version 1.10)

And now, the free online form of the book, in chapter-by-chapter form (now with chapter numbers!):

| **Intro** | **Virtualization** |  | **Concurrency** | **Persistence** | **Security** |
| --- | --- | --- | --- | --- | --- |
| [Dedication](https://pages.cs.wisc.edu/~remzi/OSTEP/dedication.pdf) | 3 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-virtualization.pdf)* | 12 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-vm.pdf)* | 25 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-concurrency.pdf)* | 35 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-persistence.pdf)* | 52 [*Dialogue*](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-security.pdf) |
| [Preface](https://pages.cs.wisc.edu/~remzi/OSTEP/preface.pdf) | 4 [Processes](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf) | 13 [Address Spaces](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/vm-intro"><font>code</font></a></sup> | 26 [Concurrency and Threads](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-intro"><font>code</font></a></sup> | 36 [I/O Devices](https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf) | 53 [*Intro Security*](https://pages.cs.wisc.edu/~remzi/OSTEP/security-intro.pdf) |
| [TOC](https://pages.cs.wisc.edu/~remzi/OSTEP/toc.pdf) | 5 [Process API](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/cpu-api"><font>code</font></a></sup> | 14 [Memory API](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-api.pdf) | 27 [Thread API](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-api"><font>code</font></a></sup> | 37 [Hard Disk Drives](https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf) | 54 [*Authentication*](https://pages.cs.wisc.edu/~remzi/OSTEP/security-authentication.pdf) |
| 1 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-threeeasy.pdf)* | 6 [Direct Execution](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf) | 15 [Address Translation](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf) | 28 [Locks](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-locks"><font>code</font></a></sup> | 38 [Redundant Disk Arrays (RAID)](https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf) | 55 [*Access Control*](https://pages.cs.wisc.edu/~remzi/OSTEP/security-access.pdf) |
| 2 [Introduction](https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/intro"><font>code</font></a></sup> | 7 [CPU Scheduling](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf) | 16 [Segmentation](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf) | 29 [Locked Data Structures](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf) | 39 [Files and Directories](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf) | 56 [*Cryptography*](https://pages.cs.wisc.edu/~remzi/OSTEP/security-crypto.pdf) |
|  | 8 [Multi-level Feedback](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf) | 17 [Free Space Management](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf) | 30 [Condition Variables](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-cv"><font>code</font></a></sup> | 40 [File System Implementation](https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf) | 57 [*Distributed*](https://pages.cs.wisc.edu/~remzi/OSTEP/security-distributed.pdf) |
|  | 9 [Lottery Scheduling](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/cpu-sched-lottery"><font>code</font></a></sup> | 18 [Introduction to Paging](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf) | 31 [Semaphores](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf) <sup><a href="https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-sema"><font>code</font></a></sup> | 41 [Fast File System (FFS)](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf) |  |
|  | 10 [Multi-CPU Scheduling](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf) | 19 [Translation Lookaside Buffers](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf) | 32 [Concurrency Bugs](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf) | 42 [FSCK and Journaling](https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf) | **Appendices** |
|  | 11 *[Summary](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-dialogue.pdf)* | 20 [Advanced Page Tables](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf) | 33 [Event-based Concurrency](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf) | 43 [Log-structured File System (LFS)](https://pages.cs.wisc.edu/~remzi/OSTEP/file-lfs.pdf) | [*Dialogue*](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-vmm.pdf) |
|  |  | 21 [Swapping: Mechanisms](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf) | 34 *[Summary](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-dialogue.pdf)* | 44 [Flash-based SSDs](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf) | [Virtual Machines](https://pages.cs.wisc.edu/~remzi/OSTEP/vmm-intro.pdf) |
|  |  | 22 [Swapping: Policies](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf) |  | 45 [Data Integrity and Protection](https://pages.cs.wisc.edu/~remzi/OSTEP/file-integrity.pdf) | [*Dialogue*](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-monitors.pdf) |
|  |  | 23 [Complete VM Systems](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf) |  | 46 *[Summary](https://pages.cs.wisc.edu/~remzi/OSTEP/file-dialogue.pdf)* | [Monitors](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-monitors.pdf) |
|  |  | 24 *[Summary](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-dialogue.pdf)* |  | 47 *[Dialogue](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-distribution.pdf)* | [*Dialogue*](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-labs.pdf) |
|  |  |  |  | 48 [Distributed Systems](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-intro.pdf) | [Lab Tutorial](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-tutorial.pdf) |
|  |  |  |  | 49 [Network File System (NFS)](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-nfs.pdf) | [Systems Labs](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-projects-systems.pdf) |
|  |  |  |  | 50 [Andrew File System (AFS)](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-afs.pdf) | [xv6 Labs](https://pages.cs.wisc.edu/~remzi/OSTEP/lab-projects-xv6.pdf) |
|  |  |  |  | 51 *[Summary](https://pages.cs.wisc.edu/~remzi/OSTEP/dist-dialogue.pdf)* |  |

**INSTRUCTORS:** If you are using these free chapters, **please just link to them directly** (instead of making a copy locally); we make little improvements frequently and thus would like to provide the latest to whomever is using it. Also: we have made our own class-preparation notes available to those of you teaching from this book; please drop us a line at **ostep.book@gmail.com** if you are interested.

**HOMEWORKS:** Some of the chapters have homeworks at the end, which require simulators and other code. More details on that, including how to find said code, can be found here: [HOMEWORK](https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html)

**PROJECTS:** While the book should provide a good conceptual guide to key aspects of modern operating systems, no education is complete without projects. We are in the process of making the projects we use at the University of Wisconsin-Madison widely available; an initial link to project descriptions is available here: [PROJECTS.](https://github.com/remzi-arpacidusseau/ostep-projects) Coming soon: the automated testing framework that we use to grade projects.

**BOOKS NEWS:** Many small things to move to version 1.10. Track changes: [NEWS](https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html)

**ACKNOWLEDGEMENTS:** These students have greatly contributed to this effort, through endless bug reports and other comments. Your name could go here! (as well as in the printed book): [ERRATA](https://pages.cs.wisc.edu/~remzi/OSTEP/combined.html)

**OTHER SYSTEMS BOOKS:** Interested in other systems books? Good! Of course, we assume some background in [The C Programming Language](https://www.amazon.com/gp/product/0131103628/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0131103628&linkCode=as2&tag=opesysthrea0a-20&linkId=RI2L6WG3HGZM2GXG), so that's a good investment. And [Advanced Programming in the UNIX Environment](https://www.amazon.com/gp/product/0321637739/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321637739&linkCode=as2&tag=opesysthrea0a-20&linkId=4HWBBZINQQWXE53A) is a must for any shelf. On top of that, here are some OS books that could be worth your time: [Operating Systems: Principles and Practice](https://www.amazon.com/gp/product/0985673524/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0985673524&linkCode=as2&tag=opesysthrea0a-20&linkId=POFASX37S5VWSIEH) - [Operating System Concepts](https://www.amazon.com/gp/product/1118063333/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1118063333&linkCode=as2&tag=opesysthrea0a-20&linkId=R2SFV7DSLZB2QQIU) - [Operating Systems: Internals and Design Principles (8th Edition)](https://www.amazon.com/gp/product/0133805913/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0133805913&linkCode=as2&tag=opesysthrea0a-20&linkId=EODT5LXEBGLNAEDN) - [Modern Operating Systems (4th Edition)](https://www.amazon.com/gp/product/013359162X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=013359162X&linkCode=as2&tag=opesysthrea0a-20&linkId=2ERIFG4YNEB5EBGA) - [Linux Kernel Development (3rd Edition)](https://www.amazon.com/gp/product/0672329468/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0672329468&linkCode=as2&tag=opesysthrea0a-20&linkId=MGLA6JQCCPYZGUAH) - [Understanding the Linux Kernel](https://www.amazon.com/gp/product/0596005652/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596005652&linkCode=as2&tag=opesysthrea0a-20&linkId=ZHXHBDHWWOM2RNT7) - [The Design and Implementation of the FreeBSD Operating System](https://www.amazon.com/gp/product/0321968972/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321968972&linkCode=as2&tag=opesysthrea0a-20&linkId=6MY3PGOP3Q2QMRRV) - [Solaris Internals: Solaris 10 and OpenSolaris Kernel Architecture](https://www.amazon.com/gp/product/0131482092/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0131482092&linkCode=as2&tag=opesysthrea0a-20&linkId=XWTFSOQ7HUINMGJ7) - [Mac OS X Internals: A Systems Approach](https://www.amazon.com/gp/product/0321278542/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321278542&linkCode=as2&tag=opesysthrea0a-20&linkId=H33SAF42MNIRYKV5) - [The Design of the UNIX Operating System](https://www.amazon.com/gp/product/0132017997/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0132017997&linkCode=as2&tag=opesysthrea0a-20&linkId=B3OSA2URU2K3RIJ3) - [UNIX: The Textbook](https://www.amazon.com/gp/product/1482233584/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1482233584&linkCode=as2&tag=opesysthrea0a-20&linkId=f54001cddb37a437a0d9781fb7442e6e) - [The Linux Programming Interface: A Linux and UNIX System Programming Handbook](https://www.amazon.com/gp/product/1593272200/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593272200&linkCode=as2&tag=opesysthrea0a-20&linkId=Y2R2H2YXMB3TI6PO).

**OTHER BOOKS:** So you're looking down here? Well, how about reading something other than tech books all day long? Honestly, you need to be more balanced. Here are some awesome books you should most definitely read. Fiction: [Cloud Atlas: A Novel](https://www.amazon.com/gp/product/0375507256/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0375507256&linkCode=as2&tag=opesysthrea0a-20&linkId=ZKZAMFQCTL7SZ3KR) - [Life of Pi](https://www.amazon.com/gp/product/0156027321/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0156027321&linkCode=as2&tag=opesysthrea0a-20&linkId=DCVISEJESZUDI5GF) - [A Prayer for Owen Meany: A Novel](https://www.amazon.com/gp/product/0062204092/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0062204092&linkCode=as2&tag=opesysthrea0a-20&linkId=EUZKNMY6PPYANPEK) - [All the Light We Cannot See](https://www.amazon.com/gp/product/1476746583/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1476746583&linkCode=as2&tag=opesysthrea0a-20&linkId=HUYV4U64776LR6FB) - [The Book Thief](https://www.amazon.com/gp/product/0375842209/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0375842209&linkCode=as2&tag=opesysthrea0a-20&linkId=X67UQJXUD6RCI5T5) - [The Fault in Our Stars](https://www.amazon.com/gp/product/014242417X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=014242417X&linkCode=as2&tag=opesysthrea0a-20&linkId=E7JAOXWAMKPGSEB2) - [Tenth of December: Stories](https://www.amazon.com/gp/product/0812984250/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0812984250&linkCode=as2&tag=opesysthrea0a-20&linkId=63XH2LT6KCJXHDC5) - [If I Don't Six](https://www.amazon.com/gp/product/0385491204/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0385491204&linkCode=as2&tag=opesysthrea0a-20&linkId=J3OD3MXBDFGP7FOW) - [A Game of Thrones](https://www.amazon.com/gp/product/0553593714/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0553593714&linkCode=as2&tag=opesysthrea0a-20&linkId=ZAYNNMPXWOQ45CG3) - [To Kill a Mockingbird](https://www.amazon.com/gp/product/0446310786/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0446310786&linkCode=as2&tag=opesysthrea0a-20&linkId=DR72JNDRE3IZWMR2) - [The Kite Runner](https://www.amazon.com/gp/product/159463193X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=159463193X&linkCode=as2&tag=opesysthrea0a-20&linkId=NP3ABJBE6ZLRFZRO) - [Ender's Game](https://www.amazon.com/gp/product/0812550706/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0812550706&linkCode=as2&tag=opesysthrea0a-20&linkId=TUXVKMYJBOWFQ6GI) - [Foundation](https://www.amazon.com/gp/product/0553293354/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0553293354&linkCode=as2&tag=opesysthrea0a-20&linkId=BZRQNNMXD6BFTQRF) - [Slaughterhouse-Five](https://www.amazon.com/gp/product/0440180295/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0440180295&linkCode=as2&tag=opesysthrea0a-20&linkId=E7N2DABAVHT6MXT3) - [The Shadow of the Wind](https://www.amazon.com/gp/product/0143034901/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0143034901&linkCode=as2&tag=opesysthrea0a-20&linkId=BSPDO76HKZB5LT4W) - [Flowers for Algernon](https://www.amazon.com/gp/product/0156030306/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0156030306&linkCode=as2&tag=opesysthrea0a-20&linkId=XU3EKPFEOI6ULFAR) - [Holes](https://www.amazon.com/gp/product/0440414806/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0440414806&linkCode=as2&tag=opesysthrea0a-20&linkId=CLPO7NMAVGGTNI7C) - [Atonement](https://www.amazon.com/gp/product/038572179X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=038572179X&linkCode=as2&tag=opesysthrea0a-20&linkId=ZRFZTJEPNC2BCWIN) - [The Name of the Wind](https://www.amazon.com/gp/product/0756404746/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0756404746&linkCode=as2&tag=opesysthrea0a-20&linkId=MFUPAT7DB3ID2TVG) - [Beloved](https://www.amazon.com/gp/product/1400033411/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1400033411&linkCode=as2&tag=opesysthrea0a-20&linkId=QI6FFIOEP7YK5C6R) - [For Whom the Bell Tolls](https://www.amazon.com/gp/product/0684803356/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0684803356&linkCode=as2&tag=opesysthrea0a-20&linkId=QILLNCSDWW7NM2GF) - [Different Seasons](https://www.amazon.com/gp/product/0451167538/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0451167538&linkCode=as2&tag=opesysthrea0a-20&linkId=S2SO354RYWWOH6MJ) - [Neuromancer](https://www.amazon.com/gp/product/0441569595/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0441569595&linkCode=as2&tag=opesysthrea0a-20&linkId=BXUPQGVZQDL6SNFH) - [Snow Crash](https://www.amazon.com/gp/product/0553380958/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0553380958&linkCode=as2&tag=opesysthrea0a-20&linkId=7L2HQZ5USYCUPIZZ) - [Cryptonomicon](https://www.amazon.com/gp/product/0060512806/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0060512806&linkCode=as2&tag=opesysthrea0a-20&linkId=TKMYZAAGUV6VU3KF) - [Shantaram](https://www.amazon.com/gp/product/0312330537/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0312330537&linkCode=as2&tag=opesysthrea0a-20&linkId=XDUPUXQUV6QOC6TP) - [A Room with a View](https://www.amazon.com/gp/product/1482694573/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1482694573&linkCode=as2&tag=opesysthrea0a-20&linkId=QMZYOO6EJR34HFSH) - [Jude the Obscure](https://www.amazon.com/gp/product/0486452433/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0486452433&linkCode=as2&tag=opesysthrea0a-20&linkId=OIDTUB73NH5CWWKJ) - [Illusions: The Adventures of a Reluctant Messiah](https://www.amazon.com/gp/product/0099427869/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0099427869&linkCode=as2&tag=opesysthrea0a-20&linkId=ZTNT7TLXPZLP3YTX) - [A Canticle for Leibowitz](https://www.amazon.com/gp/product/0060892994/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0060892994&linkCode=as2&tag=opesysthrea0a-20&linkId=OR3U64T2O6OOET2P) - [A Wizard of Earthsea](https://www.amazon.com/gp/product/0547773749/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0547773749&linkCode=as2&tag=opesysthrea0a-20&linkId=KY5VBA26NSCNYG4I) - [Black Swan Green](https://www.amazon.com/gp/product/0812974018/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0812974018&linkCode=as2&tag=opesysthrea0a-20&linkId=B4ASBCYQZR2FE2V4) - [The Stars My Destination](https://www.amazon.com/gp/product/1876963468/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1876963468&linkCode=as2&tag=opesysthrea0a-20&linkId=TRC25Z25YDU3TGVE) - [Ancillary Justice](https://www.amazon.com/gp/product/031624662X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=031624662X&linkCode=as2&tag=opesysthrea0a-20&linkId=AWAQS2EEBXDJKV4W) - [My Brilliant Friend](https://www.amazon.com/gp/product/1609450787/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1609450787&linkCode=as2&tag=opesysthrea0a-20&linkId=ZG7EZNINJKMGDIZL) - [Crossing to Safety](https://www.amazon.com/gp/product/037575931X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=037575931X&linkCode=as2&tag=opesysthrea0a-20&linkId=DAJ6DDTEWZSPV377) - [Possession](https://www.amazon.com/gp/product/0679735909/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0679735909&linkCode=as2&tag=opesysthrea0a-20&linkId=SKHEFHUKOXPBURGF) - [The Selected Works of T.S. Spivet](https://www.amazon.com/gp/product/0143117351/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0143117351&linkCode=as2&tag=opesysthrea0a-20&linkId=57FHOLM4SLTAFU3R) - [Essential Ellison](https://www.amazon.com/gp/product/0962344745/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0962344745&linkCode=as2&tag=opesysthrea0a-20&linkId=3L5G7AWS725R3OGQ) - [The Demolished Man](https://www.amazon.com/gp/product/1596879882/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1596879882&linkCode=as2&tag=opesysthrea0a-20&linkId=FXUCKXUNNH56MWBD) - [The Nightingale](https://amzn.to/2M1vVRK) - [The Overstory](https://www.amazon.com/Overstory-Novel-Richard-Powers/dp/039363552X/ref=as_li_ss_tl?s=books&ie=UTF8&qid=1533580294&sr=1-1&keywords=the+overstory&linkCode=ll1&tag=opesysthrea0a-20&linkId=1d25c9926098f5f8b27a7e33a2eab965&language=en_US) - [The Windup Girl](https://amzn.to/2nfGQIw) - [The Water Knife](https://amzn.to/2LXiNwV) Non-fiction: [Seabiscuit: An American Legend](https://www.amazon.com/gp/product/0449005615/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0449005615&linkCode=as2&tag=opesysthrea0a-20&linkId=TBQJLHAW3ST6Y7K4) - [Unbroken](https://www.amazon.com/gp/product/0812974492/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0812974492&linkCode=as2&tag=opesysthrea0a-20&linkId=2RNXXOEYURHDPRYW) - [Surely You're Joking, Mr. Feynman!](https://www.amazon.com/gp/product/0393316041/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0393316041&linkCode=as2&tag=opesysthrea0a-20&linkId=2ZT7ZYLZEUPGQXVM) - [On Intelligence](https://www.amazon.com/gp/product/0805078533/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0805078533&linkCode=as2&tag=opesysthrea0a-20&linkId=4OVFNPZCWBSSWRTW) - [The Language Instinct](https://www.amazon.com/gp/product/0061336467/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0061336467&linkCode=as2&tag=opesysthrea0a-20&linkId=4F2UE5N3ZVWMVBKJ) - [Flow](https://www.amazon.com/gp/product/0061339202/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0061339202&linkCode=as2&tag=opesysthrea0a-20&linkId=AUNYVHELQZUQQWEI) - [Guns, Germs, and Steel](https://www.amazon.com/gp/product/0393317552/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0393317552&linkCode=as2&tag=opesysthrea0a-20&linkId=GISBBEVE2RUIGPYG) - [The Selfish Gene](https://www.amazon.com/gp/product/0199291152/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0199291152&linkCode=as2&tag=opesysthrea0a-20&linkId=6NCHRWJZW24PV5XO) - [A Heartbreaking Work of Staggering Genius](https://www.amazon.com/gp/product/0375725784/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0375725784&linkCode=as2&tag=opesysthrea0a-20&linkId=UDMG7GKIKQST3KJE) - [Lies My Teacher Told Me](https://www.amazon.com/gp/product/0743296281/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0743296281&linkCode=as2&tag=opesysthrea0a-20&linkId=DZOMLI4INDEJ22FR) - [Freakonomics](https://www.amazon.com/gp/product/0060731338/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0060731338&linkCode=as2&tag=opesysthrea0a-20&linkId=FAA3MI6HFRE3T5IS) - [How the Irish Saved Civilization](https://www.amazon.com/gp/product/0385418493/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0385418493&linkCode=as2&tag=opesysthrea0a-20&linkId=RBJZ6VWF6GCQ7GDM) - [Cod](https://www.amazon.com/gp/product/0140275010/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0140275010&linkCode=as2&tag=opesysthrea0a-20&linkId=U3HIG4I3BZMEKLJ2) - [The Devil in the White City](https://www.amazon.com/gp/product/0375725601/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0375725601&linkCode=as2&tag=opesysthrea0a-20&linkId=TXNICNDRY7INUZTQ) - [The Swerve: How the World Became Modern](https://www.amazon.com/gp/product/0393343405/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0393343405&linkCode=as2&tag=opesysthrea0a-20&linkId=3LQOCO3VMY3EALMA) - [The Drunkard's Walk](https://www.amazon.com/gp/product/0307275175/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0307275175&linkCode=as2&tag=opesysthrea0a-20&linkId=E6LOGFEIWQKDFHCL) - [The Visual Display of Quantitative Information](https://www.amazon.com/gp/product/0961392142/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0961392142&linkCode=as2&tag=opesysthrea0a-20&linkId=J7IF4P4ER3NMGP53) - [Eats, Shoots & Leaves](https://www.amazon.com/gp/product/1592402038/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1592402038&linkCode=as2&tag=opesysthrea0a-20&linkId=BBGKEIX3M7SRN7GM) - [The Elements of Style](https://www.amazon.com/gp/product/020530902X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=020530902X&linkCode=as2&tag=opesysthrea0a-20&linkId=WHRCF5SAP7NDMGZQ) - [The Design of Everyday Things](https://www.amazon.com/gp/product/0465067107/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0465067107&linkCode=as2&tag=opesysthrea0a-20&linkId=NSXWP7LMX65XSTPW) - [Mountains Beyond Mountains](https://www.amazon.com/gp/product/0812980557/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0812980557&linkCode=as2&tag=opesysthrea0a-20&linkId=6VSP3WPAQNHBL3PU) - [The Soul of A New Machine](https://www.amazon.com/gp/product/0316491977/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0316491977&linkCode=as2&tag=opesysthrea0a-20&linkId=4A4IJMCTYKYP5LGP) - [Alan Turing: The Enigma](https://www.amazon.com/gp/product/069116472X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=069116472X&linkCode=as2&tag=opesysthrea0a-20&linkId=5T6AXIPMGOWEUJHX) - [Consider the Lobster](https://www.amazon.com/gp/product/0316013323/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0316013323&linkCode=as2&tag=opesysthrea0a-20&linkId=YSNPSOPXUODWNN3R) - [The Vintage Guide to Classical Music](https://www.amazon.com/gp/product/0679728058/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0679728058&linkCode=as2&tag=opesysthrea0a-20&linkId=YLI7SXJYHMHA6SCU)

**ACKS:** The authors wish to acknowledge all the sources of funding for their research over the years. In particular, the authors appreciate the strong support from the [National Science Foundation (NSF),](https://www.nsf.gov/) which is an essential part of the modern research and educational infrastructure of the USA.

.