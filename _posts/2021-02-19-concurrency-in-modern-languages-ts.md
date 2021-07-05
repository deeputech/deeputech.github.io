---
title: "Concurrency in modern programming languages: TypeScript on Deno"
description: >-
  Building a concurrent web server in TypeScript on Deno to compare concurrency
  performance with Rust, Go, JS, Kotlin, and Java
published: true
featured: false
tags:
  - concurrency
  - deno
  - javascript
  - typescript
series: concurrency in modern programming languages
canonical_url: "https://deepu.tech/concurrency-in-modern-languages-ts/"
cover_image: "https://i.imgur.com/zIc76rV.jpg"
devto_id: 612247
devto_url: >-
  https://dev.to/deepu105/concurrency-in-modern-programming-languages-typescript-on-deno-hkb
---

This is a multi-part series where I'll be talking about concurrency in modern programming languages and will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below.

1. [Introduction](https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk)
1. [Concurrent web server in Rust](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co)
1. [Concurrent web server in Golang](https://dev.to/deepu105/concurrency-in-modern-programming-languages-golang-439i)
1. [Concurrent web server in JavaScript with NodeJS](https://dev.to/deepu105/concurrency-in-modern-programming-languages-javascript-on-nodejs-epo)
1. **Concurrent web server in TypeScript with Deno**
1. Concurrent web server in Java with JVM
1. Concurrent web server in Kotlin with JVM
1. Comparison and conclusion of benchmarks

If you are new to [Deno](https://deno.land/), check this post out to get an idea.

{% link https://dev.to/deepu105/forget-nodejs-build-native-typescript-applications-with-deno-kkb %}

---

## Concurrency in Deno

Concurrency in TypeScript is exactly the same as in JavaScript as TypeScript is a strict superset of JavaScript. So I suggest you read the below post first to get an idea of concurrency in JavaScript. I'll be covering only the differences between NodeJS and Deno here.

{% link https://dev.to/deepu105/concurrency-in-modern-programming-languages-javascript-on-nodejs-epo %}

So if you use TypeScript with NodeJS it's exactly the same as using JavaScript on NodeJS as NodeJS doesn't run TypeScript natively and we have to transpile it down to JavaScript so let's focus on TypeScript on Deno since we already covered NodeJS.

Unlike NodeJS, Deno can run TypeScript natively, it's transpiled to JS behind the scenes. As we saw with NodeJS, Deno is also focused on non-blocking IO with an aim of improving/fixing issues in NodeJS. This means you can do everything that you can do with NodeJS and JavaScript on Deno as well, with nicer APIs and less code sometimes. Like in JS you rely on the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), [Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to achieve concurrency in TypeScript.

And the Deno APIs are async by default and promote using async/await a lot.

> The default for concurrency in Deno is an asynchronous programming model using callbacks, Promise or async/await.

Like in JavaScript, it's possible to do some level of multi-threaded concurrency and parallelization with TypeScript on Deno as well and since Deno is built on Rust may be in the future concurrency performance might be [better than](https://morioh.com/p/4c492f7f5851) that on NodeJS.

### Multi-threading

JavaScript is single-threaded hence the only way to achieve multi-threading is by spinning up multiple instances of the JS Engine hence the same goes for TypeScript as well. We looked at the Web Worker API in JS and similar support in NodeJS so when it comes to Deno, it also supports the [Web Worker API](https://deno.land/manual@v1.7.4/runtime/workers).

This means it is possible to offload heavy computations to a separate thread thus freeing up the main thread. These workers and the main thread communicate using events and a worker thread can spawn other worker threads.

Unfortunately, Deno doesn't offer something similar to the NodeJS [`worker_threads`](https://nodejs.org/dist/latest-v15.x/docs/api/worker_threads.html) or the [`cluster`](https://nodejs.org/api/cluster.html#cluster_cluster) module yet and using web workers makes things more complicated as Deno only supports modules as workers, which means you can only invoke a JS/TS file from a worker.

Hence some of the advanced multi-threading concepts possible in NodeJS is not feasible with Deno yet. It's also worth noting that Deno supports Web Assembly out of the box hence paving way for some advanced multi-threading using a language like Rust.

### Asynchronous processing

As we saw for NodeJS, Deno is also heavily geared towards non-blocking and asynchronous programming and it improves upon the concepts and makes asynchronous APIs cleaner and easier to use. Deno provides a Promises-based API rather than using callbacks which is a differentiator when compared to NodeJS. Deno even supports concepts like top-level await which reduces clutter and makes the code cleaner.

```ts
// sequential (you don't need to wrap this in an async function in Deno)
const users = await getUsers();
const posts = await getPosts();
const messages = await getMessages();
// do stuff

// concurrent (you don't need to wrap this in an async function in Deno)
const [users, posts, messages] = await Promise.all([getUsers(), getPosts(), getMessages()]);
// do stuff
```

## Benchmarking

Now that we have some basic understanding of concurrency features in Deno for TypeScript, let us build a simple concurrent web server in TypeScript. Since asynchronous concurrency is the best way to achieve this in Deno we'll build a sample application using the standard `http` module. The Deno version used is the latest (1.7.4) at the time of writing.

### Async HTTP concurrent webserver

This example is closer to the Rust Asynchronous example we built in the [second chapter](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co). You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/tsws). We are only using standard Deno modules in this case.

```ts
import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";

let count = 0;

// set listen port
const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running at:  http://localhost:8080/`);

// listen to all incoming requests
for await (const request of server) handleRequest(request);

async function handleRequest(request: ServerRequest) {
  count++;
  // add 2 second delay to every 10th request
  if (count % 10 === 0) {
    console.log("Adding delay. Count: ", count);
    await sleep(2000);
  }
  // read html file
  const body = await Deno.readTextFile("./hello.html");
  const res = {
    status: 200,
    body,
    headers: new Headers(),
  };
  res.headers.set("Connection", "keep-alive");
  request.respond(res); // send data to client side
}

// sleep function since NodeJS doesn't provide one
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

As you can see we create an HTTP server and bind it to port 8080 and listen to all incoming requests in a for await loop. Each request is processed in a function that internally uses `async/await`.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -k -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Server Software:
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /
Document Length:        174 bytes

Concurrency Level:      100
Time taken for tests:   21.160 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      2380000 bytes
HTML transferred:       1740000 bytes
Requests per second:    472.59 [#/sec] (mean)
Time per request:       211.600 [ms] (mean)
Time per request:       2.116 [ms] (mean, across all concurrent requests)
Transfer rate:          109.84 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.7      0      11
Processing:     0  207 600.7      5    2250
Waiting:        0  207 600.7      5    2250
Total:          0  207 600.7      5    2254

Percentage of the requests served within a certain time (ms)
  50%      5
  66%      8
  75%     11
  80%     13
  90%   2001
  95%   2006
  98%   2012
  99%   2017
 100%   2254 (longest request)
```

One minor thing to note is that I had to pass the `-k` flag to ApacheBench for this to run all requests. I still couldn't figure out why it behaves this way. A very similar implementation in every other language worked fine without the flag. So if someone has an idea let me know.

## Conclusion

As I explained in the [first part](https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk) of this serious, this simple benchmarking is not an accurate representation for all concurrency use cases. It's a simple test for a very particular use case, a simple concurrent web server that just serves a file. The idea is to see the differences in solutions and to understand how concurrency works in JavaScript/TypeScript specifically on Deno. And for this particular use case,
since there is no clean way to do a multi-threaded server in Deno the `http` module provided by the standard library with asynchronous programming seems to be the way to go.

So stay tuned for the next post where we will look at concurrency in JVM and build the same use case in Java.

---

## References

- [morioh.com](https://morioh.com/p/4c492f7f5851)
- [deno.land](https://deno.land/)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Jeffrey Brandjes](https://unsplash.com/@jeffreyfotografie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
