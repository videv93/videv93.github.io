---
tags: [os, virtualization, cpu, api]
status: evergreen
---
# Process API

> `fork()` + `exec()` + `wait()` là bộ ba kỳ quặc nhưng cực mạnh của UNIX: tách **tạo tiến trình** khỏi **nạp chương trình**, nhờ đó shell làm được redirect và pipe chỉ bằng vài dòng code.

## 1. Ba lời gọi cốt lõi
| Syscall | Làm gì | Trả về |
|---|---|---|
| `fork()` | Nhân bản tiến trình gọi (copy-on-write) | `0` ở con, `pid con` ở cha, `-1` lỗi |
| `execve()` | Thay ruột tiến trình hiện tại bằng chương trình mới | **không trả về** nếu thành công |
| `wait()/waitpid()` | Chặn cho tới khi con kết thúc, thu exit code | pid con |
| `exit()` | Kết thúc, để lại exit status | — |

Sau `fork()`, thứ tự chạy cha/con là **không xác định**. Code phụ thuộc thứ tự này là bug.

## 2. Vì sao tách fork và exec — cửa sổ vàng
Giữa `fork()` và `exec()` có một khoảnh khắc mà tiến trình con đã tồn tại nhưng chương trình mới chưa nạp. Shell dùng đúng khoảnh khắc đó để:
```c
pid_t p = fork();
if (p == 0) {                       // con
    close(STDOUT_FILENO);           // đóng stdout
    open("out.txt", O_CREAT|O_WRONLY|O_TRUNC, 0644);  // fd thấp nhất = 1
    execvp(argv[0], argv);          // chương trình mới ghi ra file mà không hề biết
}
wait(NULL);
```
Đó là toàn bộ bí mật của `>` và `|`. Nếu API là `spawn(program, args)` một bước thì mọi tuỳ biến phải nhét hết vào tham số.

## 3. Các API liên quan
| API | Dùng khi |
|---|---|
| `posix_spawn()` | Chỉ cần chạy chương trình; nhanh hơn fork với process bộ nhớ lớn |
| `clone()` | Linux — chọn chính xác cái gì chia sẻ (nền tảng của [[Thread]] và container) |
| `vfork()` | Di sản, nguy hiểm; dùng `posix_spawn` thay thế |
| `kill()`, `sigaction()` | Gửi/xử lý signal |
| `getrusage()`, `wait4()` | Lấy thống kê tài nguyên của con |
| `prctl`, `setrlimit`, cgroup | Giới hạn quyền và tài nguyên |

## 4. Signal — phần hay bị làm sai
- Signal là **ngắt bất đồng bộ ở tầng phần mềm**; handler có thể chạy giữa hai lệnh bất kỳ.
- Trong handler chỉ được gọi hàm **async-signal-safe** (`write` được, `printf`/`malloc` **không**).
- `SIGKILL` và `SIGSTOP` không bắt được, không chặn được.
- Mẫu an toàn: handler chỉ ghi một byte vào **self-pipe** (hoặc dùng `signalfd`), xử lý thật ở vòng lặp chính → [[Event-based Concurrency]].

## 5. Cạm bẫy
- **`fork()` trong chương trình đa luồng.** Con chỉ có *một* thread, nhưng thừa hưởng mọi mutex — kể cả cái đang bị khoá bởi thread khác → deadlock. Sau `fork` trong app đa luồng, chỉ nên gọi hàm async-signal-safe rồi `exec` ngay.
- **Quên `wait()`** → zombie tích tụ.
- **Nghĩ `exec` trả về.** Code sau `exec` chỉ chạy khi *thất bại* — luôn `perror` + `exit` ở đó.
- **fd rò rỉ qua exec.** Mặc định fd được kế thừa; dùng `O_CLOEXEC` cho mọi fd trừ khi cố ý truyền.
- **Đọc exit code sai.** Dùng `WIFEXITED`/`WEXITSTATUS`, không so sánh trực tiếp giá trị `wait` trả về.

## 6. Checklist áp dụng
- [ ] Mọi fd mở trong tiến trình có `O_CLOEXEC` chưa?
- [ ] Đã `wait`/`waitpid` cho mọi con chưa (hoặc `SIGCHLD` với `SA_NOCLDWAIT`)?
- [ ] Code sau `exec` có xử lý lỗi không?
- [ ] Handler signal của tôi có chỉ dùng hàm async-signal-safe không?
- [ ] Ứng dụng đa luồng: tôi có `fork` ở đâu không? Có `exec` ngay sau đó không?

## Tham khảo
- OSTEP ch.5 *Process API*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf
- `fork(2)`, `execve(2)`, `wait(2)`: https://man7.org/linux/man-pages/man2/fork.2.html
- `signal-safety(7)`: https://man7.org/linux/man-pages/man7/signal-safety.7.html
- Bryan Cantrill / rachelbythebay — *fork() is not the answer*: https://rachelbythebay.com/w/2014/08/19/fork/
- APUE (Stevens & Rago) — chương 8 & 10

## Liên kết
[[Process]] · [[System Call]] · [[Thread]] · [[Files and Directories]] · [[OS]]
