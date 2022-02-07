---
title: >-
  Concurrency in modern programming languages: Rust vs Go vs Java vs Node.js vs
  Deno
description: >-
  Building a concurrent web server in Rust, Go, JS, TS, Kotlin, and Java to
  compare concurrency performance
published: true
featured: false
tags:
  - rust
  - js
  - go
  - jvm
series: concurrency in modern programming languages
canonical_url: "https://deepu.tech/concurrency-in-modern-languages-final/"
cover_image: "https://i.imgur.com/JGoa8Xe.png"
devto_id: 978487
devto_url: >-
  https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-vs-go-vs-java-vs-nodejs-vs-deno-36gg
---

This is a multi-part series where I'll discuss concurrency in modern programming languages. I will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin, and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below.

1. [Introduction](https://deepu.tech/concurrency-in-modern-languages/)
1. [Concurrent web server in Rust](https://deepu.tech/concurrency-in-modern-languages-rust/)
1. [Concurrent web server in Golang](https://deepu.tech/concurrency-in-modern-languages-go/)
1. [Concurrent web server in JavaScript with NodeJS](https://deepu.tech/concurrency-in-modern-languages-js/)
1. [Concurrent web server in TypeScript with Deno](https://deepu.tech/concurrency-in-modern-languages-ts/)
1. [Concurrent web server in Java with JVM](https://deepu.tech/concurrency-in-modern-languages-java/)
1. **Comparison and conclusion of benchmarks**

---

## What is concurrency

> Concurrency is one of the most complex aspects of programming, and depending on your language of choice, the complexity can be anywhere from "that looks confusing" to "what black magic is this".

Concurrency is the ability where multiple tasks can be executed in overlapping time periods, in no specific order without affecting the final outcome. Concurrency is a very broad term and can be achieved by multi-threading, parallelism, and/or asynchronous processing.

![concurrency](https://i.imgur.com/glpIttD.jpeg)

First, I suggest you read the [introduction post](https://deepu.tech/concurrency-in-modern-languages/) to understand this post better.

## Benchmarking & comparison

In the previous posts, I built a simple web server in Rust, Go, Node.js, Deno, and Java. I kept it as simple as possible without using external dependencies as much as possible. I also kept the code similar across languages. In this final post, we will compare the performance of all these implementations to see which language offers the best performance for a concurrent web server.

If the language supports both asynchronous and multi-threaded concurrency, we will try both and a combination of both and pick the best performer for the comparison. The complexity of the application will hence depend on language features and language complexity. We will use whatever the language provides to make concurrency performance as good as possible without over-complicating stuff. The web server will just serve one endpoint<del>, and it will add a sleep of two seconds on every tenth request. This will simulate a more realistic load, IMO.</del>

We will use promises, thread pools, and workers if required and if the language supports it. We won't use any unnecessary I/O in the application.

The code implementations are not probably the best possible, if you have suggestion for improvement please open and issue or PR on [this repository](https://github.com/deepu105/concurrency-benchmarks). Further improvements possible are:

- Use a thread pool for Java multi-threaded version
- Use [`createReadStream` for Node.js](https://github.com/deepu105/concurrency-benchmarks/issues/5)
- Use Warp, Rocket or actix-web for Rust

**_Disclaimer_**: I'm not claiming this to be an accurate scientific method or the best benchmark for concurrency. I'm pretty sure different use cases will have different results, and real-world web servers will have more complexity that requires communication between concurrent processes affecting performance. I'm just trying to provide some simple base comparisons for a simple use case. Also, my knowledge of some languages is better than others; hence I might miss some optimizations here and there. So please don't shout at me. If you think the code for a particular language can be improved out of the box to enhance concurrency performance, let me know. If you think this benchmark is useless, well, please suggest a better one :)

**Update**: Despite the above disclaimer, people were still mad at me for using `thread.sleep` to simulate blocking and for using ApacheBench for this benchmark. I have since updated the post with more benchmarks using different tools. It's still not scientific or the best way to benchmark concurrency. This is just me, doing experiments. If you have better ideas, please feel free to use the code and publish a follow-up or comment with your results, and I'll update the post with it and attribute you.

All the implementations used in this comparison can be found in [the nosleep branch of this GitHub repository](https://github.com/deepu105/concurrency-benchmarks/tree/nosleep).

### Benchmarking conditions

These will be some of the conditions I'll use for the benchmark.

- The latest stable release versions of language/runtimes available are used, and as of writing, those are:
  - Rust: `1.58.1-Stable`
  - Go: `1.17.6`
  - Java: `OpenJDK 17.0.2`
  - Node.js: `17.4.0`
  - Deno: `1.18.1`
- **Update**: Thread.sleep has been removed from all implementations.
- We will be using external dependencies only if that is the standard recommended way in the language.
  - latest versions of such dependencies as of writing will be used
- We are not going to look at improving concurrency performance using any configuration tweaks
- We will use ApacheBench for the benchmarks with the below settings:
  - Concurrency factor of 100 requests
  - 10000 total requests
  - The benchmark will be done ten times for each language with a warmup round, and the mean values will be used.
  - ApacheBench version on Fedora: `httpd-tools-2.4.52-1.fc35.x86_64`
  - Command used: `ab -c 100 -n 10000 http://localhost:8080/`
- **Update**: Many people pointed out that ApacheBench is not the best tool for this benchmark. I have hence also included results from [wrk](https://github.com/wg/wrk) and [drill](https://github.com/fcsonline/drill)
- All the benchmarks are run on the same machine running Fedora 35 on an Intel i9-11900H (8 core/16 thread) processor with 64GB memory.
  - The `wrk` and `drill` clients were run from another similar machine on the same network and also from the same computer; the results were more or less the same; I used the results from the client computer for comparisons.

### Comparison parameters

I'll be comparing the below aspects related to concurrency as well.

- Performance, based on benchmark results
- Community consensus
- Ease of use and simplicity, especially for complex use cases
- External libraries and ecosystem for concurrency

## Benchmark results

**Updated**: I have updated the benchmark results with the results from [wrk](https://github.com/wg/wrk), [drill](https://github.com/fcsonline/drill) and also updated previous results from ApacheBench after tweaks suggested by various folks.

### Results from [wrk](https://github.com/wg/wrk)

Benchmark using `wrk` with the below command (Threads 8, Connections 500, duration 30 seconds):

```
wrk -t8 -c500 -d30s http://127.0.0.1:8080
```

![wrk benchmarks with Go HTTP version](https://i.imgur.com/j83tChU.png)

The Go HTTP version blows everything out of the water when it comes to req/second performance. If we remove it, we get a better picture as below.

![wrk benchmarks without Go HTTP version](https://i.imgur.com/rDWT8Mi.png)

### Results from [drill](https://github.com/fcsonline/drill)

Benchmark using `drill` with concurrency 1000 and 1 million requests

![drill benchmark 1](https://i.imgur.com/z4K0lJ8.png)

Benchmark using `drill` with concurrency 2000 and 1 million requests

![drill benchmark 2](https://i.imgur.com/Xfp1trI.png)

### Previous ApacheBench results with thread blocking

The average values for different metrics with a `thread.sleep` every ten requests across ten benchmark runs are as below:

![Apache bench average](https://i.imgur.com/r84p64Q.png)

You can find all the results used in the [GitHub repo](https://github.com/deepu105/concurrency-benchmarks/tree/nosleep/results)

## Conclusion

Based on the benchmark results, these are my observations.

### Benchmark observations

Since recommendations based on benchmarks are hot topics, I'll just share my observations, and you can make decisions yourself.

- For the HTTP server benchmark using `wrk`, Go HTTP wins in request/sec, latency, and throughput, but it uses more memory and CPU than Rust. This might be because Go has one of the best built-in HTTP libraries, and it's extremely tuned for the best possible performance; hence it's not fair to compare that with the simple TCP implementations I did for Java and Rust. But you can compare it to Node.js and Deno as they also have standard HTTP libs that are used here for benchmarks.
- The Go TCP version is a fair comparison to the Rust and Java implementations, and in this case, Both Java and Rust outperforms Go and hence would be logical to expect third party HTTP libraries in Rust and Java that can compete with Go and if I'm a betting person I would bet that there is a Rust library that can outperform Go.
- Resource usage is a whole different story, Rust seems to use the least memory and CPU consistently in all the benchmarks, while Java uses the most memory, and Node.js multi-threaded version uses the most CPU.
- Asynchronous Rust seems to perform worst than multi-threaded Rust implementations.
- In the benchmarks using `drill`, the Asynchronous Java version outperformed Rust and was a surprise to me.
- Java and Deno have more failed requests than others.
- When concurrent requests are increased from 1000 to 2000, most implementations have a very high failure rate. The Go HTTP and Rust Tokio versions have nearly 100% failure rates, while multi-threaded Node.js have the least failure and have good performance at that concurrency level but with high CPU usage. It runs multiple versions of V8 for multi-threading, which explains the high CPU use.
- Overall, Node.js still seems to perform better than Deno.
- Apache Benchmarks run on versions with and without `thread.sleep` doesn't say much as the results are similar for all implementations, and it might be due to limitations of the ApacheBench tool. Hence as many people pointed out, i'm disregarding them.

<del>With ApacheBench, as you can see, there isn't any significant difference between the languages when it comes to total time taken for 10k requests for a system with considerable thread blocking, which means for a real-world use case, the language choice isn't going to be a huge factor for concurrency performance. But of course, if you want the best possible performance, then Rust clearly seems faster than other languages as it gives you the highest throughput, followed by Java and Golang. JavaScript and TypeScript are behind them, but not by a considerable margin. The Go version using the built-in HTTP server is the slowest of the bunch due to inconsistent performance across runs, probably due to garbage collection (GC) kicking in, causing spikes. Also interesting is to see the difference between the multi-threaded and asynchronous approaches. While for Rust, multi-threaded implementation performs the best by a slight margin, the asynchronous version performs slightly better for Java and JavaScript. But none of the differences is significant enough to justify suggesting one approach over another for this particular case. But in general, I would recommend using the asynchronous approach if available as it's more flexible without some of the limitations you might encounter with threads.</del>

### Community concensus

The community consensus when it comes to concurrency performance is quite split. For example, both Rust and Go communities claim to be the best in concurrency performance. From personal experience, I find them relatively close in performance, with Rust having a slight lead over Go. The Node.js ecosystem was built over the promise of asynchronous concurrency performance, and there are testimonials of huge performance improvements when switching to Node.js. Java also boasts of real-world projects serving millions of concurrent requests without any issues; hence it's hard to take a side here.

Another general observation is that Rust was quite consistent in terms of performance across runs while all other languages had some variance, especially when GC kicks in.

### Simplicity

While performance is an important aspect, ease of use and simplicity is also very important. I think it's also important to differentiate between asynchronous and multi-threaded approaches.

**Asynchronous**: I personally find Node.js and Deno the simplest and easy-to-use platforms for async concurrency. Golang would be my second choice as it's also easy to use and simple without compromising on features or performance. Rust follows it as it is a bit more complex as it has more features and needs getting used to. I would rate Java last as it requires much more boilerplate, and doing asynchronous programming is more complex than in others. I hope project Loom fixes that for Java.

**Multi-threaded**: For multi-threaded concurrency, I will put Rust first as it's packed with features, and doing multi-threading is easy and worry-free in Rust due to memory and thread safety. You don't have to worry about race conditions and such. I'll put Java and Go second here. Java has a mature ecosystem for multi-threading and is not too difficult to use. Go is very easy to use, but you don't have a lot of control over OS threads else I would rate Go higher than Java. Finally, there are multi-threading capabilities in Node.js and Deno, but they are not as flexible as other languages; hence I'll put them last.

### Ecosystem

Rust has the best ecosystem for concurrency, in my opinion, followed by Java and Golang, which have matured options. Node.js and Deno, while not as good as others, offer a descent ecosystem as well.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
