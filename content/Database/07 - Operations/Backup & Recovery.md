---
tags: [database, ops, dr]
status: evergreen
---
# Backup & Recovery

> **Backup chưa từng được restore không phải backup — nó là một niềm hy vọng.** Đây là note quan trọng nhất trong mục Vận hành, vì nó là thứ duy nhất cứu bạn khỏi lỗi con người, ransomware, và bug ứng dụng xoá dữ liệu.

## 1. Các loại backup
| Loại | Cơ chế | Ưu | Nhược |
|---|---|---|---|
| **Logical** (`pg_dump`, `mysqldump`) | Xuất SQL/COPY | Chọn được bảng, khôi phục qua version khác | Chậm với DB lớn, không PITR |
| **Physical** (`pg_basebackup`, Percona XtraBackup) | Copy file dữ liệu | Nhanh, nền tảng cho PITR | Cùng version/kiến trúc |
| **Snapshot** (LVM, EBS, ZFS) | Snapshot khối lưu trữ | Rất nhanh | Phải đảm bảo crash-consistent; phụ thuộc hạ tầng |
| **WAL archiving** | Lưu liên tục WAL | Cho phép **PITR** tới từng giây | Cần quản lý dung lượng archive |
| **Continuous / incremental** (pgBackRest, wal-g) | Base + delta + WAL | Tiết kiệm nhất, RPO nhỏ | Cần công cụ chuyên dụng |

## 2. Point-In-Time Recovery (PITR)
```
full backup (Chủ nhật)  +  WAL liên tục  ⇒  restore về BẤT KỲ thời điểm nào
```
```bash
# PostgreSQL với pgBackRest
pgbackrest --stanza=main --type=full backup
pgbackrest --stanza=main --type=time \
           --target="2026-08-27 14:29:00" --delta restore
```
> Kịch bản kinh điển: 14:30 ai đó chạy `DELETE FROM orders;` không `WHERE`. **Replica không cứu được** — lệnh đó đã replicate. Chỉ PITR về 14:29 mới cứu được.

## 3. Quy tắc 3-2-1(-1-0)
| Con số | Nghĩa |
|---|---|
| **3** | Ít nhất 3 bản sao dữ liệu |
| **2** | Trên 2 loại phương tiện/hệ thống khác nhau |
| **1** | Ít nhất 1 bản **ngoài site** (khác vùng/khác cloud account) |
| **+1** | 1 bản **immutable / offline** (chống ransomware và chống chính bạn) |
| **+0** | **0 lỗi** khi kiểm tra khôi phục |

⚠️ Backup nằm cùng cloud account với production sẽ bị xoá cùng với production khi credential bị lộ. Dùng object lock / write-once bucket.

## 4. Kiểm chứng — phần bị bỏ nhiều nhất
| Mức | Hoạt động | Tần suất |
|---|---|---|
| 1 | Kiểm tra backup job chạy thành công, có alert khi fail | Hằng ngày |
| 2 | Kiểm tra checksum/tính toàn vẹn file backup | Hằng ngày (tự động) |
| 3 | **Restore tự động** vào môi trường tạm + chạy vài query kiểm tra | Hằng tuần |
| 4 | **Diễn tập DR đầy đủ** có bấm giờ, có người thật | Hằng quý |

> Chỉ mức 3 và 4 mới thật sự chứng minh backup dùng được. Mức 1 chỉ chứng minh job đã chạy.

## 5. Cạm bẫy hay gặp
1. **Chưa bao giờ restore thử.** Cạm bẫy số một, không có đối thủ.
2. **Nhầm replica với backup.** Replica sao chép cả lỗi của bạn. → [[Replication]]
3. **Không đo thời gian restore** ⇒ phát hiện RTO là 9 tiếng ngay giữa sự cố. → [[High Availability & Failover]]
4. **Backup không mã hoá** hoặc để trong bucket public.
5. **Không backup thứ ngoài dữ liệu**: role/quyền, extension, cấu hình, sequence, large object, crontab.
6. **Retention quá ngắn** ⇒ phát hiện dữ liệu hỏng từ 2 tháng trước thì đã hết bản để quay về (dữ liệu hỏng âm thầm cần retention dài).
7. **`pg_dump` một DB nhiều TB** ⇒ chạy nhiều giờ, giữ snapshot lâu, chặn `VACUUM`.
8. **Không kiểm tra dung lượng WAL archive** ⇒ archive fail âm thầm ⇒ mất khả năng PITR trong khi vẫn thấy "backup OK".
9. **Backup từ replica mà không xác nhận replica còn khoẻ.**

## 6. Checklist áp dụng
- [ ] RPO và RTO đã chốt và được nghiệp vụ chấp thuận chưa?
- [ ] Có PITR (WAL archiving) không, hay chỉ có snapshot theo ngày?
- [ ] Lần **restore thử** gần nhất là khi nào? Mất bao lâu?
- [ ] Backup có bản ngoài site và bản immutable không?
- [ ] Backup có được mã hoá không? Khoá mã hoá lưu ở đâu (không cùng chỗ với backup)?
- [ ] Có alert khi backup job **hoặc** WAL archiving thất bại không?
- [ ] Retention bao lâu? Có đủ để phát hiện hỏng dữ liệu chậm không?
- [ ] Role, extension, cấu hình, sequence có được backup không?
- [ ] Có runbook restore để người trực (không phải bạn) làm theo được không?
- [ ] Ai có quyền xoá backup? Đã áp dụng least privilege chưa? → [[Database Security]]

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| pgBackRest | Chuẩn cho Postgres: parallel, incremental, PITR | https://pgbackrest.org/ |
| wal-g | Backup lên object storage, nhẹ | https://github.com/wal-g/wal-g |
| Barman | Quản lý backup Postgres tập trung | https://pgbarman.org/ |
| Percona XtraBackup | Physical backup cho MySQL, không khoá | https://docs.percona.com/percona-xtrabackup/ |
| `pg_dump` / `pg_restore` | Có sẵn, hợp DB nhỏ | https://www.postgresql.org/docs/current/app-pgdump.html |

## Tham khảo
- PostgreSQL Docs — *Backup and Restore*: https://www.postgresql.org/docs/current/backup.html
- PostgreSQL Docs — *Continuous Archiving and PITR*: https://www.postgresql.org/docs/current/continuous-archiving.html
- pgBackRest — *User Guide*: https://pgbackrest.org/user-guide.html
- MySQL Docs — *Backup and Recovery*: https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html
- Google SRE Book — *Data Integrity: What You Read Is What You Wrote*: https://sre.google/sre-book/data-integrity/

## Liên kết
[[High Availability & Failover]] · [[Replication]] · [[Database Security]] · [[Zero-downtime Migration]] · [[Database]]
