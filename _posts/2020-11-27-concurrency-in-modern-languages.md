---
title: "Concurrency in modern programming languages: Introduction"
description: >-
  Building a concurrent web server in Rust, Go, JS, TS, Kotlin, and Java to
  compare concurrency performance
published: true
featured: true
tags:
  - languages
  - concurrency
  - async
  - multithreading
series: concurrency in modern programming languages
canonical_url: "https://deepu.tech/concurrency-in-modern-languages/"
cover_image: "https://i.imgur.com/anGGYRi.jpg"
devto_id: 526520
devto_url: >-
  https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk
---

This is a multi-part series where I'll be talking about concurrency in modern programming languages and will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below and I'll try to publish them weekly.

1. **Introduction**
1. [Concurrent web server in Rust](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co)
1. [Concurrent web server in Golang](https://dev.to/deepu105/concurrency-in-modern-programming-languages-golang-439i)
1. [Concurrent web server in JavaScript with NodeJS](https://dev.to/deepu105/concurrency-in-modern-programming-languages-javascript-on-nodejs-epo)
1. [Concurrent web server in TypeScript with Deno](https://dev.to/deepu105/concurrency-in-modern-programming-languages-typescript-on-deno-hkb)
1. Concurrent web server in Java with JVM
1. Concurrent web server in Kotlin with JVM
1. Comparison and conclusion of benchmarks

---

## What is concurrency

> Concurrency is one of the most complex aspects of programming and depending on your language of choice the complexity can be anywhere from "that looks confusing" to "what black magic is this".

Concurrency is the ability where multiple tasks can be executed in overlapping time periods, in no specific order without affecting the final outcome. Concurrency is a very broad term and can be achieved by any of the below mechanisms.

![concurrency](https://i.imgur.com/glpIttD.jpeg)

To simplify this we can say that concurrency is the problem and multi-threading, parallelism & asynchronous processing are the solutions for that problem.

### Parallelism

> Parallelism != Concurrency

Parallelism is when multiple tasks or several parts of a unique task literally run at the same time, e.g. on a multi-core processor. True parallelism is not possible on single-core processors. Applications running in multi-core processors can achieve concurrency by parallelism as well. Multi-threading and parallelism can work together and when doing multi-threading in multi-core environments the operating system can provide parallelism depending on resource usage.

### Multi-threading

Multi-threading is when a program appears to be doing several things at the same time even when it’s running on a single-core machine. Within a single-core, this is done by context switching or interleaving (only one thread gets CPU time at any given moment). On multi-core processors, multi-threading can work similarly to parallelism at the discretion of the operating system and hence can be more efficient. Most modern multi-core processors offer two threads per core hence enabling both multi-threading and parallelism. This is how concurrency is commonly achieved in multi-threaded languages like Java.

If you are interested in learning more about how resources are used in threads check out this blog series

{% link https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd %}

### Asynchronous processing

Asynchronous processing means that your program performs non-blocking operations and can provide some level of concurrency though not as efficient as parallelism or multi-threading for some use cases. This is how concurrency is mainly achieved in single-threaded languages like JavaScript. Asynchronous programming in a multi-core, multi-threaded environment is a way to achieve parallelism. The asynchronous process can be spawned in separate threads in multi-threaded applications.

![Asynchronous](https://i.imgur.com/uBvs9JJ.jpg)

Though this might look similar to concurrency and parallelism the main difference is that concurrency and parallelism are ways tasks are executed and synchronous and asynchronous are programming models.

## When is concurrency needed

Concurrency has its pros and cons and hence is better to be implemented when there is a use case for it. The advantages of concurrency are faster processing times, better performance & throughput, and better load handling. Now knowing when to use concurrency is very important. Some of the common use cases are as below and can serve as a baseline:

- **Web servers & web services**: These should be able to handle multiple requests at the same time and is a prime candidate for concurrency and asynchronous processing. Every popular web frameworks in every language will provide a concurrent implementation for this.
- **Large computation problems**: CPU intensive algorithms, data processing, data science, aggregations and Map-reduce like workload can benefit from concurrency
- **I/O intensive problems**: When there is a lot of I/O(disk, DB, network, terminal, etc) involved, depending on the specific use case concurrency can help to speed it up. For example, writing a file can be offloaded to a thread or asynchronous process while the main program can read the next file or do some other calculation.
- **Distributed use cases**: Message queues, pub-sub kind of use cases, running tests are best suited for concurrency and asynchronous processing

## When concurrency should be avoided

The disadvantages of concurrency is the complexity introduced in code and more computing resources being used. hence it's also important to know when not to use it. Some cases where it should be avoided are:

- **Speed up small computation problems**: The complexity introduced in splitting up a small function to be concurrent is not worth the increase in performance if any, which in most cases will be negligible for small computations and the cost of initializing resources for synchronization will end up being costlier in many cases.
- **When you don't understand how concurrency and other related principles work**: There is no shame in this. Concurrency is one of the most complex aspects of programming and depending on your language of choice the complexity can be anywhere from "that looks confusing" to "what black magic is this". So trying to split a problem using concurrency without understanding can do more harm than good. Some of the common problems you might face are race conditions, memory leaks, data corruption, locks, and so on.

## Benchmarking & comparison

We will be building a very simple web server using out of the box language features as much as possible. The web server will support concurrent requests. If the language supports both asynchronous and multi-threaded concurrency we will try both and a combination of both and pick the best performer. The complexity of the application will hence depend on language features and language complexity. We will try to use whatever the language provides to make concurrency performance as good as possible without over-complicating stuff. The web server will just serve one endpoint and it will add a sleep of two seconds on every tenth request. This will simulate a more realistic load, IMO.

We will use promises, thread pools, and workers if required, and if the language supports it. We won't use any unnecessary I/O in the application.

**_Disclaimer_**: I'm not claiming this to be an accurate scientific method or the best benchmark for concurrency. I'm pretty sure different use cases will have different results and real-world web servers will have more complexity that requires communication between concurrent processes affecting performance. I'm just trying to provide some simple base comparisons for a simple use case. Also, my knowledge of some languages is better than others so I might miss some optimizations here and there. So please don't shout at me. If you think the code for a particular language can be improved out of the box to improve concurrency performance let me know. If you think this benchmark is useless, well, please suggest a better one :)

### Benchmarking conditions

These will be some of the conditions I'll be using for benchmark

- The latest versions of language/runtimes available are used.
- We will be using external dependencies only if that is the standard recommended way in the language.
- We are not gonna look at improving concurrency performance using any configuration tweaks
- We will use ApacheBench for the benchmarks with a concurrency factor of 100 requests and 10000 total requests. The benchmark will be done 5 times for each language with and without warmup and the best result will be used.
- All the benchmarks are run on the same machine running Fedora 32 on a quad-core Xeon processor with 8 threads and 32GB memory.

### Comparison parameters

I'll be comparing the below aspects related to concurrency as well

- Performance, based on benchmark results
- Perceived performance for complex use cases from the community
- Ease of use
- Simplicity, especially for complex use cases
- External libraries and ecosystem for concurrency
- Limitations

So stay tuned for the remaining blog posts.

---

## References

- [Stack Overflow question](https://stackoverflow.com/questions/4844637/what-is-the-difference-between-concurrency-parallelism-and-asynchronous-methods)
- [Stack Overflow question](https://softwareengineering.stackexchange.com/questions/190719/the-difference-between-concurrent-and-parallel-execution)
- [Stack Overflow question](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Matt Bero](https://unsplash.com/@mbeero?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/multitasking?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
