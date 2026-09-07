---
tags: [database, ha, ops]
status: growing
---
# High Availability & Failover

> HA không phải "có replica". HA là: **khi primary chết lúc 3h sáng, hệ thống tự phục hồi trong bao lâu, và mất bao nhiêu dữ liệu** — và bạn đã diễn tập điều đó.

## 1. Hai con số phải chốt trước mọi thứ khác
| Chỉ số | Câu hỏi | Ảnh hưởng tới |
|---|---|---|
| **RTO** (Recovery Time Objective) | Chấp nhận **ngừng** bao lâu? | Kiến trúc failover |
| **RPO** (Recovery Point Objective) | Chấp nhận **mất** bao nhiêu dữ liệu? | Sync vs async replication |

| Kiến trúc | RTO điển hình | RPO điển hình | Chi phí |
|---|---|---|---|
| Backup + restore thủ công | Giờ | Tới lần backup gần nhất | $ |
| Backup + PITR | 10 phút – giờ | Giây (WAL archive) | $ |
| Async replica + failover thủ công | 5–30 phút | Giây–phút | $$ |
| Async replica + auto failover (Patroni) | 30–60 giây | Giây | $$ |
| Sync replica + auto failover | 30–60 giây | **0** | $$$ |
| Multi-region active-active | ~0 | Tuỳ hoà giải | $$$$ |

## 2. Các thành phần của một cụm HA
| Thành phần | Vai trò | Công cụ |
|---|---|---|
| **Replication** | Giữ bản sao sẵn sàng | → [[Replication]] |
| **Failure detector** | Phát hiện primary chết | Patroni + etcd/Consul |
| **Leader election** | Chọn replica nào lên làm primary | Raft (etcd), Paxos |
| **Fencing / STONITH** | Đảm bảo primary cũ **không** ghi tiếp | watchdog, cắt mạng, revoke |
| **Connection routing** | Chuyển client sang primary mới | HAProxy, DNS, virtual IP, service mesh |
| **Client retry** | App chịu được vài giây mất kết nối | Retry + backoff |

> **Fencing là phần hay bị bỏ nhất và nguy hiểm nhất.** Thiếu nó, primary cũ hồi sinh và tiếp tục nhận ghi ⇒ **split-brain**, hai nhánh dữ liệu phân kỳ, và không có cách hợp nhất tự động.

## 3. Quorum và split-brain
- Cụm cần **số lẻ** node bỏ phiếu (3, 5) để luôn xác định được phe đa số.
- Phe **thiểu số phải tự ngừng nhận ghi**. Đây chính là lựa chọn CP trong [[CAP Theorem]].
- 2 node là cấu hình **tệ nhất**: mất 1 node là mất quorum, không bên nào dám hành động.
- Cụm 2 vùng nên đặt **witness/arbiter** ở vùng thứ ba.

## 4. Failover vs Switchover
| | Failover | Switchover |
|---|---|---|
| Bối cảnh | Primary chết ngoài ý muốn | Chủ động (nâng cấp, bảo trì) |
| Mất dữ liệu | Có thể (async) | Không |
| Diễn tập | Bắt buộc định kỳ | Chính là cách diễn tập |

**Sau failover, đừng quên:** primary cũ phải được `pg_rewind` hoặc rebuild trước khi tham gia lại cụm; nếu không, dữ liệu sẽ phân kỳ.

## 5. Cạm bẫy hay gặp
1. **Chưa bao giờ diễn tập failover.** Nếu chưa thử, bạn không có HA — bạn có một giả thuyết về HA.
2. **Không có fencing** ⇒ split-brain.
3. **Cụm 2 node** không có witness.
4. **DNS TTL cao** ⇒ client vẫn nối vào primary cũ hàng phút sau failover.
5. **Client không retry** ⇒ 30 giây failover thành 30 giây lỗi 500 cho người dùng.
6. **Failover tự động quá nhạy** ⇒ flapping vì một gai mạng. Đặt ngưỡng và số lần thử hợp lý.
7. **Nhầm HA với backup.** HA chống *hỏng hạ tầng*; backup chống *hỏng dữ liệu và lỗi con người*. `DROP TABLE` replicate ngay sang mọi replica. → [[Backup & Recovery]]
8. **Không kiểm tra replica có thật sự bắt kịp** trước khi promote ⇒ mất dữ liệu nhiều hơn dự kiến.

## 6. Checklist áp dụng
- [ ] RTO và RPO đã được nghiệp vụ chấp thuận và viết ra chưa?
- [ ] Đã diễn tập failover trên staging trong 3 tháng gần đây chưa?
- [ ] Có cơ chế fencing để primary cũ không ghi được nữa không?
- [ ] Quorum có số node lẻ, có witness ở vùng thứ ba không?
- [ ] Client có retry + backoff và timeout hợp lý không?
- [ ] DNS TTL / cơ chế routing chuyển đổi trong bao lâu?
- [ ] Có runbook failover thủ công cho trường hợp tự động thất bại không?
- [ ] Có alert khi cụm mất quorum hoặc replica tụt hậu không?
- [ ] Backup vẫn tồn tại độc lập với cụm HA chứ?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Patroni | HA + auto failover chuẩn cho Postgres | https://patroni.readthedocs.io/ |
| repmgr | Quản lý replication & failover | https://repmgr.org/ |
| pg_auto_failover | Đơn giản hơn Patroni | https://pg-auto-failover.readthedocs.io/ |
| Orchestrator | Quản lý topology MySQL | https://github.com/openark/orchestrator |
| HAProxy / Keepalived | Routing & virtual IP | https://www.haproxy.org/ |

## Tham khảo
- PostgreSQL Docs — *High Availability*: https://www.postgresql.org/docs/current/high-availability.html
- Patroni Docs — *Replica imaging and bootstrap / fencing*: https://patroni.readthedocs.io/en/latest/
- Google SRE Book — ch.  *Reliability & Error Budgets*: https://sre.google/sre-book/table-of-contents/
- Kleppmann — *DDIA*, ch.8–9 (unreliable networks, consensus): https://dataintensive.net/
- Jepsen — phân tích failover thực tế: https://jepsen.io/analyses

## Liên kết
[[Replication]] · [[Backup & Recovery]] · [[CAP Theorem]] · [[Monitoring & Capacity Planning]] · [[Database]]
