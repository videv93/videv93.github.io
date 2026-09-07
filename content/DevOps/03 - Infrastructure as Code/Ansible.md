---
tags: [devops, iac, ansible, configuration-management]
status: growing
---
# Ansible

> Configuration management **agentless**: chỉ cần SSH và Python trên máy đích. Điểm mạnh là đường vào cực thấp; điểm yếu là dễ viết ra thứ *trông giống* declarative nhưng thực chất là script tuần tự.

## 1. Vì sao agentless quan trọng
| | Ansible | Chef / Puppet |
|---|---|---|
| Cài trên máy đích | Không (chỉ SSH + Python) | Có agent chạy nền |
| Mô hình | **Push** — máy điều khiển đẩy xuống | **Pull** — agent kéo về định kỳ |
| Ngôn ngữ | YAML | Ruby DSL |
| Học trong | Vài giờ | Vài ngày |
| Hợp với | Cấu hình theo đợt, orchestration, thiết bị mạng | Fleet lớn cần tự hội tụ liên tục |

## 2. Bốn khái niệm
```
Inventory  → máy nào
Playbook   → làm gì, theo thứ tự nào
Module     → đơn vị hành động idempotent (apt, copy, template, service…)
Role       → đóng gói playbook + template + biến để tái dùng
```

### Inventory
```ini
[web]
web-[01:03].prod.acme.internal

[db]
db-01.prod.acme.internal

[prod:children]
web
db

[prod:vars]
ansible_user=deploy
env=prod
```
> Với cloud, dùng **dynamic inventory** (`amazon.aws.aws_ec2` plugin) — lấy host theo tag, không duy trì file tĩnh.

### Playbook
```yaml
- name: Cấu hình web tier
  hosts: web
  become: true
  serial: "25%"              # rolling: mỗi lượt 25% số máy
  max_fail_percentage: 0
  vars:
    app_port: 8080
  pre_tasks:
    - name: Rút khỏi load balancer
      community.general.haproxy: { state: disabled, host: "{{ inventory_hostname }}" }
      delegate_to: lb-01
  roles:
    - common
    - nginx
  tasks:
    - name: Cài package
      ansible.builtin.apt:
        name: [nginx, curl]
        state: present
        update_cache: true
        cache_valid_time: 3600

    - name: Render config
      ansible.builtin.template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        owner: root
        mode: "0644"
        validate: nginx -t -c %s     # kiểm tra trước khi ghi đè
      notify: reload nginx

    - name: Đảm bảo service chạy
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

  handlers:
    - name: reload nginx
      ansible.builtin.service: { name: nginx, state: reloaded }
```

### Cấu trúc thư mục chuẩn
```
inventories/prod/hosts.yml
group_vars/all.yml, group_vars/web.yml
host_vars/web-01.yml
roles/nginx/{tasks,handlers,templates,defaults,vars,files}/
site.yml
ansible.cfg
```

## 3. Idempotency — nguyên tắc trung tâm
Chạy playbook lần thứ hai phải cho **`changed=0`**. Đó là thước đo playbook viết đúng.
- ✅ Dùng module (`apt`, `copy`, `template`, `lineinfile`, `service`) — chúng tự kiểm tra trạng thái trước khi hành động.
- ❌ Dùng `shell`/`command` bừa bãi — luôn báo `changed` và có thể chạy lại gây hại.
- Nếu buộc phải dùng `command`, kèm điều kiện bảo vệ:
  ```yaml
  - name: Khởi tạo DB
    ansible.builtin.command: /opt/app/init-db.sh
    args: { creates: /var/lib/app/.initialized }   # đã có file thì bỏ qua
  ```

## 4. Lệnh dùng thật
```bash
ansible all -i inventories/prod -m ping                 # kiểm tra kết nối
ansible-playbook -i inventories/prod site.yml --check --diff   # dry-run + xem diff
ansible-playbook -i inventories/prod site.yml --limit web --tags nginx
ansible-vault encrypt group_vars/prod/secrets.yml       # mã hoá secret
ansible-lint                                            # lint theo best practice
ansible-galaxy install -r requirements.yml              # cài role/collection
```
> `--check --diff` là thói quen bắt buộc trước mọi lần chạy lên production.

## 5. Ansible ở đâu trong bức tranh 2026?
Container hoá đã lấy đi phần lớn việc "cấu hình bên trong máy" — đó là việc của [[Dockerfile & Image Optimization|Dockerfile]] rồi. Ansible vẫn rất giá trị ở:
- **Bootstrap node** trước khi có container (cài containerd, kubelet, agent monitoring).
- **Build image bất biến** cùng Packer (Ansible làm provisioner cho AMI).
- **Orchestration nhiều bước** có thứ tự và cần phối hợp: rolling restart, database maintenance, patch OS hàng loạt.
- **Thiết bị không container hoá được**: switch, firewall, appliance, máy on-prem cũ.
- **Chạy runbook có kiểm soát** thay cho SSH bằng tay.

Kết hợp phổ biến: **[[Terraform]] dựng máy → Ansible cấu hình máy** (hoặc Packer + Ansible tạo AMI để bỏ hẳn bước cấu hình runtime).

## 6. Cạm bẫy
- ❌ **Playbook toàn `shell:`** → mất idempotency, chạy lại là hỏng.
- ❌ **Secret plaintext trong `group_vars`** → dùng `ansible-vault` hoặc lookup từ [[Secrets Management|Vault/AWS Secrets Manager]].
- ❌ **Không `serial:`** → cập nhật đồng thời 100 web server ⇒ downtime toàn bộ.
- ❌ **`ignore_errors: yes`** rải khắp nơi để playbook "chạy cho xong" → che lỗi thật.
- ❌ **Không ghim version collection/role** trong `requirements.yml`.
- ❌ **Chạy Ansible như IaC provisioning** (tạo VPC, EC2) — làm được nhưng không có state, không có plan, không phát hiện drift. Việc đó thuộc về Terraform.
- ❌ **Dùng `lineinfile` để sửa file cấu hình phức tạp** → dùng `template` với file `.j2` đầy đủ, dễ đọc và tái lập hơn.
- ❌ Quên `validate:` khi ghi file cấu hình quan trọng → ghi ra config sai cú pháp rồi reload là dịch vụ chết.

## 7. Checklist một repo Ansible tốt
- [ ] Chạy playbook lần hai cho `changed=0`?
- [ ] Có chạy `--check --diff` trước khi apply lên prod?
- [ ] `ansible-lint` sạch trong CI?
- [ ] Secret đều nằm trong Vault (ansible-vault hoặc external), không plaintext?
- [ ] Có `serial:` cho các playbook chạm vào service đang phục vụ traffic?
- [ ] Task ghi file quan trọng có `validate:` và `backup: yes`?
- [ ] Role có `defaults/main.yml` đầy đủ, không phụ thuộc biến định nghĩa ở đâu đó xa?
- [ ] Inventory production tách riêng, khó gõ nhầm với staging?
- [ ] Có tài liệu: chạy playbook nào, khi nào, ai được chạy?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `ansible-lint` | Bắt anti-pattern | https://ansible.readthedocs.io/projects/lint/ |
| `ansible-vault` | Mã hoá biến nhạy cảm | https://docs.ansible.com/ansible/latest/vault_guide/ |
| Molecule | Test role trong container | https://ansible.readthedocs.io/projects/molecule/ |
| AWX / Ansible Automation Platform | UI, RBAC, lịch chạy, audit | https://github.com/ansible/awx |
| Packer + Ansible provisioner | Build AMI bất biến | https://developer.hashicorp.com/packer |

## Tham khảo
- Ansible Documentation: https://docs.ansible.com/ansible/latest/
- Ansible — Best Practices / Tips and tricks: https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html
- Ansible — Collection index (module chuẩn): https://docs.ansible.com/ansible/latest/collections/
- Jeff Geerling — *Ansible for DevOps*: https://www.ansiblefordevops.com/
- Red Hat — Ansible rolling update patterns: https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_strategies.html

## Liên kết
[[Infrastructure as Code]] · [[Terraform]] · [[Linux & Networking for DevOps]] · [[Secrets Management]] · [[DevOps]]
