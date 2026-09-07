---
title: "Data engineering system design: 11 data sourcing problems"
source: "https://substack.com/home/post/p-194761871?source=queue"
author:
  - "[[Substack]]"
published:
created: 2026-05-05
description: "The part of the pipeline you don't control"
tags:
  - "clippings"
  - backend
  - data
status: evergreen
---

> [!note] Clipping gốc
> Bài viết gốc của Vu Trinh, giữ nguyên 100%. Bản chưng cất thành checklist áp dụng được nằm ở [[Data Sourcing Design]] — đọc note đó trước, quay lại đây khi cần nguyên văn lập luận và hình minh hoạ.

> *To celebrate the launch of **learn-spark** for paid subscribers, the CLI tool that helps you learn Spark faster and more affordably right on your laptop. I’m offering you a 50% discount on the annual plan—grab it now to get access to the **learn-spark** tool!*
> 
> *The offer ends in **1 DAY.***
> 
> *After becoming a paid subscriber, [visit this link](https://substack-github-sync.vutrinh2704.workers.dev/verify) to get invited to the **learn-spark repo.***
> 
> <video src="blob:https://substack.com/25279819-d59d-40d6-81b1-14871bee1823" controls=""></video>

![](https://substackcdn.com/image/fetch/$s_!gpor!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F716f76f7-5a14-4ef3-95aa-b82f5c1ae0de_2000x1429.png)

---

## Intro

After writing about [orchestration](https://vutr.substack.com/p/data-engineering-system-design-orchestration) and [serving layer](https://open.substack.com/pub/vutr/p/data-engineering-system-design-9?r=2rj6sg&utm_campaign=post&utm_medium=web) in data engineering system designs, the next part of the series will be about sourcing, the beginning of any data pipeline, and also the root cause of most of the problems.

In this article, I discussed 11 source problems:

1. What is the type of the source?
2. How often do I need to touch the source?
3. How will the source performance be impacted?
4. How long does the source retain the data?
5. Does the source have the fields I need?
6. If the schema changes, how will I know?
7. How do I access the data?
8. Can I read the source exactly once?
9. How does the source handle deletes?
10. What is the data quality contract with the source?
11. Is the source available when I need it?

In each section, I will explain what information we could have when we answer the question, and from that, we can design a better data system.

> ***Note 1**: What is discussed in this article is based solely on my observations and experience; feel free to provide feedback on anything you see I may have missed.*

---

## The mental model

The source is the one part of your pipeline you don’t fully control.

In most cases, you don’t own and build it. Or maybe you don’t know where it came from. There's a very high chance you won’t know what changes and breaks until they're reflected in the downstream.

But the team/vendor responsible for the source might know.

![](https://substackcdn.com/image/fetch/$s_!BUX8!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a708e60-9d07-4dee-b2d6-8a741a5c225c_670x602.png)

Who owns the source?

That reality shapes every question in this article. This is why clear communication with the source team/vendor matters as much as the technical setup. So before you design or write code, find out who owns the source.

Is it a supported product with an on-call team, or a side project someone built two years ago and hasn’t touched since? Is there a documented SLA? Will they tell you before they deprecate an API version, change a field, or even migrate to a new database?

—

The questions in this article are the ones I keep asking whenever I design an ingestion pipeline.

Let’s go with the first one: What is the type of the source?

---

## What is the type of the source?

API, database, or someone (aggressively) pushes data into our systems.

![](https://substackcdn.com/image/fetch/$s_!XNqb!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0db2bf11-c4bb-4214-9c63-3fcb8520c82e_400x600.png)

This is the first question because the answer changes everything: the infrastructure you need, the kind of connection to leverage, or the failure modes you have to prepare for.

The main categories are:

**Pull-based**: “knock, knock, give me some data. “

![](https://substackcdn.com/image/fetch/$s_!JARd!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F05f95bac-af7d-4231-a2dc-75fe2ce0fe47_590x306.png)

- Databases (Postgres, MySQL): you query them directly or export from them
- APIs (REST or GraphQL): you call endpoints, handle pagination, follow rate limits, and parse the result to the desired format.
- File: Someone lands an object in the S3, you wake up and pick up the file.
- Kafka: Even consuming Kafka is a pulling model; you, the consumers, continuously poll the broker (“knock, knock”) for new messages.

**Push-based**: “shut up and receive the data. “ An example is the webhook: the source calls your endpoint when something happens.

![](https://substackcdn.com/image/fetch/$s_!LjGo!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6db8acf6-6589-472c-8b66-08e2aa642356_564x148.png)

Why does this matter?

Because each type requires a different setup. A database source might need a read replica to avoid affecting production query performance. An API source needs pagination logic and rate limit handling. A push-based source requires you to run a receiver that’s always available and can “absorb” the peak workload.

---

## How often do I need to touch the source?

This question is tightly connected to one in [the article which we discussed about serving: “How old can the data be before it is considered stale?”](https://vutr.substack.com/p/data-engineering-system-design-9?r=2rj6sg&utm_campaign=post&utm_medium=web&triedRedirect=true)

![](https://substackcdn.com/image/fetch/$s_!FyqP!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2631faa3-ea8a-4858-80b6-a8c9d0f70b65_788x608.png)

If the answer is hourly, daily, or weekly, a scheduled batch job (e.g., Cron, Airflow) is fine. If the answer is near real-time, you might need continuous extraction from the source: CDCs, streaming consumers (e.g., Kafka consumer), or sensors that react to new data as it arrives. (e.g., Airflow sensor)

My principle is simple here: **don’t over-engineer the freshness**. (or anything in life)

If the user views the dashboard once a day (and calls the daily data update “real-time”), there’s no reason to build a streaming pipeline. However, keep in mind that there’s a harder question hiding inside:

### How do I know what’s new?

On each run, which records should I actually fetch? Reading the entire table every time is wasteful, and for super-large tables, it’s often impractical.

The common approaches:

- **Timestamp-based extraction** (`WHERE updated_at > last_run_time`): simple, and it works until someone updates a record and forgets advancing the timestamp (the **updated\_at** usually gets the current timestamp when the record is updated if the database admin configures it correctly).
	![](https://substackcdn.com/image/fetch/$s_!Fm3K!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1030ffa-262f-4ce9-a9cd-bada8df4fcc5_500x326.png)
- **Overlap date range**: In today, you will fetch data from X days ago. Tomorrow, you will do the same. There will be overlap in the date range across executions; however, this ensures you can capture data changes within the X interval. Usually, deduplication happens downstream incrementally with the last-come, first-served approach. (e.g., January 1st data in today's execution will be kept, and the one from yesterday's execution will be discarded)
	![](https://substackcdn.com/image/fetch/$s_!_-FZ!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b7c2410-c023-4c1e-b42f-27ac27a37bab_1138x536.png)
- **Offset-based**: Kafka offsets are an example; the consumer will tell the broker which offset it consumed and continuously poll the broker for new messages.
	![](https://substackcdn.com/image/fetch/$s_!Ofgx!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7c30535-17f5-4007-93c6-2cfd57986a34_834x392.png)
- **CDC**: the source emits every change as an event. The most reliable option when available. (also the most complicated one)
	![](https://substackcdn.com/image/fetch/$s_!mxhS!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09a40666-f4aa-4639-9301-8ede8b0fa4ea_1198x388.png)
- **Full refresh**: sometimes the right answer for small, stable reference tables.

---

> *To celebrate the launch of **learn-spark** for paid subscribers, this CLI helps you learn Spark faster and more affordably right on your laptop. I’m offering you a 50% discount on the annual plan—grab it now to get access to the **learn-spark** tool! The offer ends in **1 DAY.***

---

## Liên kết
[[Data Sourcing Design]] — bản chưng cất: 11 câu hỏi + checklist áp dụng
[[Event-Driven Architecture]] · [[Webhooks]] · [[Backend]]
