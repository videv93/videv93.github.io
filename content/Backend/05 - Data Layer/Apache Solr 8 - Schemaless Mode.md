---
title: "Apache Solr 8 - Schemaless Mode"
source: "https://www.youtube.com/watch?v=y2TqbjTc1GE&list=PLBrWqg4Ny6vXPalbTc_QqPiW1_G01AE2a"
author:
  - "[[High-Performance Programming]]"
published: 2020-05-16
created: 2026-05-14
description: "Source code:https://github.com/lucian-12/solr-course/blob/master/schemaless_mode_exampleIf you are interested in learning how to leverage a search engine that is optimized to search large volumes o"
tags:
  - "clippings"
  - backend
  - search
  - solr
status: growing
---

> **Schemaless mode** cho phép index và tìm kiếm document mà không cần định nghĩa schema trước — Solr tự phát hiện field và kiểu, rồi tự sửa managed schema. Tiện để học và thử nghiệm, **nguy hiểm ở production**.

> [!note] Nội dung gốc
> Phần mô tả và transcript dưới đây giữ nguyên bài clipping gốc (High-Performance Programming). Phần mở rộng nằm ở cuối note.

![](https://www.youtube.com/watch?v=y2TqbjTc1GE)

Source code:  
https://github.com/lucian-12/solr-course/blob/master/schemaless\_mode\_example  
  
If you are interested in learning how to leverage a search engine that is optimized to search large volumes of text-centric data, then check this course about Learning Apache Solr 8.  
  
Use the link below to get a 60% OFF.  
  
📕 Learn Apache Solr 8 - Full Course  
https://www.udemy.com/course/learn-apache-solr-8/?couponCode=CF3BEB633F75FCE09DF2  
  
In Solr, you can index and search documents without really having to define a schema upfront. The schemaless mode can be useful while you practice and learn Solr, since you don’t really need to worry about designing your schema. Solr can detect your fields automatically, and adjusts the schema accordingly.

## Transcript

**0:00** · in solar you can index and search documents without really having to define a schema upfront although behind the scenes there will still be a menu schema the schema lies mode can be used while you practice and learn solar since you don't really need to worry about designing your schema Solar can detect your fields automatically and adjust the schema accordingly we look at how that works in

**0:26** · a minute however in a production environment you might want to define your schema up front and not rely on automatic field detection this is because schema defines not only the field names at the field types but also any modification that should happen to a field before it is indexed for example

**0:46** · if you want to ensure that a user who search for solar and another user who entered solar all letters in uppercase can both find the document containing the term solar you'll want to normalize solar tax value or in this case lowercase it when it is indexed and also

**1:06** · normalize the users query to be sure of a match these rules are defined in your schema will explain how to design a schema later in this section for now let's test the schema less mode will create a new core using the default config set that comes with solar installation this time though let's do the work using the command-line since this is probably how you interact with your productive environment we'll start

**1:34** · by creating a new configuration directory in the solar config sets folder you we will name this folder search underscore Twitter then with a copy-paste the default configuration found under solar underscore home server / solar / config set copy - error which means recursively

**2:07** · copy all directories and files then I specify the source folder don't forget the dot at the end and finally the destination directory let's see what we'll just copied

**2:27** · we have the many schema the solar configuration XML and a bunch of other configuration files next I'll pray to the solar core using the search Twitter config set I just created to do this I will use the curl command to send an HTTP GET request to the solar server curl - X get HTTP localhost 8 9 a tree

**3:00** · I mean which is the solar request Handler to manage the course then the action is to create a core named Twitter search

**3:18** · and here I will specify the instance directory you start to zero success you don't have to

**3:34** · remember these comments since you can check the solar API documentation by the way you can find all the commands I execute on github check the link in the resources to see the current fields over schema we can issue an HTTP GET request coral - X get HTTP localhost search Twitter

**4:05** · slash schema slash fields as you can see there are some dummy fields defined from the default schema next I'll create a new document with some new random fields and I will give them some random values and the solar automatically creates the field mapping for me I already prepared the example and I will just copy paste it here don't worry you have the snippet code in the resources please notice that here I use

**4:35** · the post method instead of the get since now I add data to solar instead of requesting data if I retrieve the schema now it will show me what fields I had in my document as you can see solar also detected the types for each field


---

## Tóm tắt điều bài nói

1. **Schemaless = tự phát hiện field.** POST một document có field lạ → Solr tự thêm field đó vào managed schema và **tự đoán kiểu** từ giá trị.
2. **Ở production nên định nghĩa schema trước.** Lý do trong bài: schema không chỉ khai báo *tên* và *kiểu* field, mà còn khai báo **những biến đổi áp lên field trước khi index**.
3. **Ví dụ kinh điển về analyzer**: người dùng gõ `solr` và người gõ `SOLR` đều phải tìm ra document chứa `Solr` → phải **lowercase lúc index** *và* **chuẩn hoá cả query** thì mới khớp. Đây chính là lý do analyzer phải nhất quán hai phía → [[Search Engines]].
4. **Config set là đơn vị cấu hình**: copy thư mục config mặc định (`solr_home/server/solr/configsets/_default`) thành config set riêng (`cp -r`), rồi tạo core trỏ vào nó.
5. Mọi thao tác đều làm được qua **HTTP API** — cách bạn sẽ tương tác ở môi trường thật, không phải qua UI.

## Các lệnh trong bài

```bash
# 1. Tạo config set riêng từ config mặc định
cp -r solr_home/server/solr/configsets/_default/. \
      solr_home/server/solr/configsets/search_twitter

# 2. Tạo core dùng config set đó (CoreAdmin API)
curl -X GET "http://localhost:8983/solr/admin/cores?action=CREATE\
&name=twitter_search&instanceDir=search_twitter"

# 3. Xem các field hiện có trong schema
curl -X GET "http://localhost:8983/solr/twitter_search/schema/fields"

# 4. Index document có field mới (POST vì đang ghi dữ liệu)
curl -X POST -H 'Content-Type: application/json' \
  "http://localhost:8983/solr/twitter_search/update?commit=true" \
  --data-binary '[{"id":"1","tweet_text":"learning solr","likes":42}]'

# 5. Xem lại schema — field mới đã được tạo, kiểu được tự đoán
curl -X GET "http://localhost:8983/solr/twitter_search/schema/fields"
```
> Source code của bài: https://github.com/lucian-12/solr-course/blob/master/schemaless_mode_example

## Schemaless hoạt động thế nào bên dưới

Ba thành phần trong `solrconfig.xml` của config set `_default`:
| Thành phần | Vai trò |
|---|---|
| `ManagedIndexSchemaFactory` | Cho phép sửa schema qua API, ghi vào `managed-schema` thay vì `schema.xml` tĩnh |
| `AddSchemaFieldsUpdateProcessorFactory` | Khi gặp field chưa biết → thêm field mới vào schema |
| `ParseInt/Long/Double/Date UpdateProcessor` | Đoán kiểu từ **giá trị của document đầu tiên** gặp field đó |

Điểm mấu chốt: **kiểu được quyết định bởi document đầu tiên**. Document sau không khớp kiểu sẽ bị từ chối.

## Cạm bẫy của schemaless

- **Đoán sai kiểu vĩnh viễn**: `"012345678"` (số điện thoại) → `long`, mất số 0 đầu và không tìm theo prefix được nữa. `"2020-05-16"` → có thể thành `date` hoặc `string` tuỳ dữ liệu.
- **Không đổi được kiểu field tại chỗ** — phải sửa schema rồi **reindex toàn bộ**.
- **Không có analyzer phù hợp**: field text tự sinh dùng type mặc định, không có ASCII folding (bỏ dấu tiếng Việt), không có stemming theo ngôn ngữ.
- **Typo tạo field rác**: `titel` gõ nhầm sẽ trở thành một field thật trong schema, tồn tại mãi.
- **Schema phình theo dữ liệu bẩn** — mỗi biến thể key trong JSON là một field mới.
- **Khác biệt giữa môi trường**: dev và production ăn dữ liệu khác nhau → schema tự sinh khác nhau → bug chỉ xảy ra ở một nơi.
- **Coi Solr là nguồn sự thật** — nó là index dẫn xuất, phải reindex lại được từ DB. → [[Database Access and ORM]]

## Checklist

- [ ] Đây là môi trường học/thử nghiệm hay production? (production → **định nghĩa schema tường minh**)
- [ ] Mỗi field text đã chọn field type có analyzer đúng cho ngôn ngữ chưa?
- [ ] Analyzer lúc **index** và lúc **query** có tương thích không (ví dụ cùng lowercase)?
- [ ] Field cần khớp nguyên vẹn (id, mã, enum) có để dạng `string`, không phân tích?
- [ ] Config set được lưu trong git và deploy được lặp lại, không sửa tay trên server?
- [ ] Có script **reindex toàn bộ từ nguồn sự thật** và đã bấm giờ chưa?
- [ ] Đã kiểm tra kiểu Solr tự đoán bằng `/schema/fields` sau khi index mẫu chưa?
- [ ] Có `commit` strategy hợp lý (soft/hard commit) thay vì `commit=true` mỗi document không?

## Tham khảo

- Solr Reference Guide — Schemaless Mode: https://solr.apache.org/guide/solr/latest/indexing-guide/schemaless-mode.html
- Solr Reference Guide — Schema API: https://solr.apache.org/guide/solr/latest/indexing-guide/schema-api.html
- Solr Reference Guide — Analyzers, Tokenizers, Filters: https://solr.apache.org/guide/solr/latest/indexing-guide/analyzers.html
- Solr Reference Guide — Config Sets: https://solr.apache.org/guide/solr/latest/configuration-guide/config-sets.html
- Solr Reference Guide — CoreAdmin API: https://solr.apache.org/guide/solr/latest/configuration-guide/coreadmin-api.html

## Liên kết
[[Search Engines]] · [[Database Access and ORM]] · [[Backend]]
