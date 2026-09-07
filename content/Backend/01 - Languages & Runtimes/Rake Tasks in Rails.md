---
title: "Tìm hiểu Rake trong Rails"
source: "https://viblo.asia/p/tim-hieu-rake-trong-rails-OREkwZoZelN"
author:
  - "[[Trung Nguyen]]"
published: 2016-09-27
created: 2026-05-14
description: "1. Rake là gì?"
tags:
  - "clippings"
  - backend
  - ruby
  - rails
status: growing
---
# Rake Tasks in Rails

> Task runner của Ruby/Rails: gom các đoạn Ruby hay phải chạy lại thành **task có tên, có mô tả, có dependency**. Mọi `rake db:migrate` bạn gõ đều là một task như thế.

> [!note] Nội dung gốc
> Phần 1–9 dưới đây giữ nguyên bài clipping gốc (Trung Nguyen, Viblo). Phần mở rộng nằm ở cuối note.

### 1\. Rake là gì?

Khi lập trình ứng dụng với Rails bạn đã quá quen với cái câu lệnh như `rake db:create`, `rake db:migrate` hay `rake db:seed`...Những câu lệnh trên nhằm mục đích chạy các ruby code bên trong các Makefile. Rake cho phép bạn định nghĩa list các task kèm theo dependency của nó, với mục đích gom nhóm các đoạn code Ruby thường xuyên được thực hiện vào một task chung và sử dụng lại chúng nhiều lần.

### 2\. ĐỊNH NGHĨA RAKE FILE

Tạo rake file bằng cách tạo file mới.rake, hoặc dùng lệnh sau trong project rails:

```
rails g task [namespace] [task]
```

Lệnh trên sẽ tạo 1 file `.rake` trong thư mục `lib/tasks` với tên file trùng với tên task của bạn

Viết code định nghĩa task bạn cần thực hiện, chú ý định nghĩa `dependency :enviroment` để có thể load các dữ liệu cần thiết từ rails app nhé chẳng hạn như các model, …

```ruby
namespace :namespace do
  desc "This is for description"
  task task: :environment do
    #do_something
  end
end
```

Kiểm tra lại danh sách các tasks được định nghĩa trong hệ thống

```
rake -T
```

Chạy file `.rake` của bạn.

```
rake namespace:task
```

### 3\. Sử dụng tham số hoặc biến ENV trong rake task

***Cách 1: Sử dụng biến ENV***

```ruby
task task: :enviroment do
  puts ENV["VARIABLE"]
end
```

Câu lệnh chạy:

```
rake VARIABLE=123 task
```

***Cách 2: Truyền tham số***

```ruby
task :task, [:first_arg, :second_arg] => :environment do
  puts "First #{args.first_arg}, second #{args.second_arg}"
end
```

gọi task:

```
rake task[12, 34]
```

### 4\. Sử dụng với namespace

Rake cho phép bạn định nghĩa các tasks trong các namespace khác nhau với mục đích phân nhóm các tasks có cùng nhiệm vụ vào chung một group. Cách định nghĩa

```ruby
namespace :import do
  task :missions do
  end

  task :stages do
  end
end
```

### 5\. Thêm mô tả chi tiết cho rake task

Bạn có thể thêm các đoạn mô tả chi tiết cho từng task với desc

```ruby
desc "This is the description for this task"
task :task do
end
```

### 6\. Một task gọi nhiều tasks khác

```ruby
task all: [:task_A, :task_B, :task_C]
```

`task :all` trên sẽ gọi thực hiện theo tuân tự các task khác là:task\_A,:task\_B,:task\_C

### 7\. Định nghĩa lại một task

Bạn muốn định nghĩa task rake db:migrate mặc định? Bạn có thể định nghĩa lại task đó với cùng tên, tuy nhiên bạn chú ý task định nghĩa mới không override hoàn toàn task cũ mà chỉ định nghĩa thêm các lệnh phía sau task đó.

```ruby
namespace :db do
  task migrate: :environment do
    puts "do_something"
  end
end
```

### 8\. Invoke một task khác bên trong một task

```ruby
task :task_A do
  Rake::Task["task_B"].invoke
  puts "The code for task A"
end
```

### 9\. Default rake task

Bạn muốn mỗi lần đánh rake là sẽ tự động chạy một task nào đó mặc định, dùng với `task name :default`

```
task default: [:task_A, :task_B]
```


---

## 10. Rake trong Rails hiện đại — vài lưu ý bổ sung

- Từ Rails 5, `rake <task>` phần lớn gọi được bằng `rails <task>` (`rails db:migrate`). Task tự viết trong `lib/tasks/*.rake` vẫn chạy được bằng cả hai lệnh.
- Cú pháp truyền tham số ở mục 3 cần khai báo `|t, args|` trong block:
  ```ruby
  task :task, [:first_arg, :second_arg] => :environment do |t, args|
    puts "First #{args.first_arg}, second #{args.second_arg}"
  end
  ```
  Gọi: `rake "task[12,34]"` — **đặt trong ngoặc kép** vì zsh diễn giải `[]` thành glob.
- `Rake::Task["x"].invoke` chỉ chạy **một lần** trong cùng tiến trình; muốn chạy lại phải `reenable` trước, hoặc dùng `execute`.
- `=> :environment` là thứ nạp toàn bộ Rails app (model, initializer). Bỏ nó đi thì task chạy nhanh hơn nhưng không thấy model.

## 11. Rake dùng đúng chỗ nào

| Loại việc | Rake | Không nên dùng Rake |
|---|---|---|
| Migration dữ liệu một lần (backfill cột mới) | ✅ | |
| Script vận hành thủ công (import CSV, tạo admin) | ✅ | |
| Việc chạy định kỳ | ✅ (gọi từ cron/`whenever`) | Nếu cần retry/hàng đợi → [[Background Jobs and Queues]] |
| Việc kích hoạt bởi hành động người dùng | | ❌ — dùng ActiveJob/Sidekiq |
| Việc chạy hàng nghìn bản ghi, có thể fail giữa chừng | | ❌ — chia batch, đẩy vào job idempotent |

## 12. Cạm bẫy

- **Task không idempotent** — chạy lại sau khi fail giữa chừng sẽ nhân đôi dữ liệu. Luôn thiết kế để chạy lại được.
- **Quên `:environment`** → `NameError: uninitialized constant User`.
- **Load toàn bộ bảng vào RAM** — dùng `find_each`/`in_batches` thay cho `User.all.each`.
- **Không có log/tiến độ** — task chạy 2 tiếng mà im lặng thì không biết nó treo hay đang chạy.
- **Chạy task nặng trên web dyno/pod** — dùng máy riêng hoặc job runner để khỏi ảnh hưởng request. → [[Scaling and Load Balancing]]
- **Task đọc `ENV` nhưng không validate** — `ENV["LIMIT"].to_i` khi thiếu biến sẽ thành `0` và im lặng không làm gì.

## 13. Checklist trước khi chạy task trên production

- [ ] Task có `desc` để `rake -T` hiển thị được không?
- [ ] Chạy lại lần hai có an toàn không (idempotent)?
- [ ] Có xử lý theo batch (`find_each`) thay vì nạp hết vào RAM?
- [ ] Có in tiến độ và tổng kết (số bản ghi đã xử lý / lỗi)?
- [ ] Đã thử trên staging với dữ liệu tương đương chưa?
- [ ] Có `dry_run` mode hoặc transaction để rollback khi thử không?
- [ ] Nếu bị kill giữa chừng, biết được đã chạy tới đâu không?

## Tham khảo

- Rails Guides — Command Line & custom rake tasks: https://guides.rubyonrails.org/command_line.html
- Rake — README chính thức: https://github.com/ruby/rake
- Rake API docs: https://ruby.github.io/rake/
- ActiveRecord `find_each` / batches: https://guides.rubyonrails.org/active_record_querying.html#retrieving-multiple-objects-in-batches
- `whenever` (cron cho Rails): https://github.com/javan/whenever

## Liên kết
[[Ruby on Rails]] · [[Background Jobs and Queues]] · [[Deployment and Configuration]] · [[Backend]]
