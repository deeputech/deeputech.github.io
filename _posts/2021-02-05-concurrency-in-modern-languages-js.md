---
title: 'Concurrency in modern programming languages: JavaScript on NodeJS'
description: >-
  Building a concurrent web server in JavaScript on NodeJS to compare
  concurrency performance with Rust, Go, TS, Kotlin, and Java
published: true
featured: false
tags:
  - languages
  - concurrency
  - nodejs
  - javascript
series: concurrency in modern programming languages
canonical_url: 'https://deepu.tech/concurrency-in-modern-languages-js/'
cover_image: 'https://i.imgur.com/PABMBDP.jpg'
devto_id: 592869
devto_url: >-
  https://dev.to/deepu105/concurrency-in-modern-programming-languages-javascript-on-nodejs-epo
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

This is a multi-part series where I'll be talking about concurrency in modern programming languages and will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below.

1. [Introduction](https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk)
1. [Concurrent web server in Rust](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co)
1. [Concurrent web server in Golang](https://dev.to/deepu105/concurrency-in-modern-programming-languages-golang-439i)
1. **Concurrent web server in JavaScript with NodeJS**
1. Concurrent web server in TypeScript with Deno
1. Concurrent web server in Java with JVM
1. Concurrent web server in Kotlin with JVM
1. Comparison and conclusion of benchmarks

---

## Concurrency in JavaScript & NodeJS

> JavaScript has a concurrency model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.
>
> -- MDN Web Docs

Concurrency in JavaScript is quite different from other languages we are looking at. The biggest difference is that JavaScript is single-threaded and hence multi-threading and parallelism is out of the question -- at least not traditional multi-threading or parallelism like in other languages, we will come to that later. But concurrency on the other hand is the heart and soul of the JavaScript event loop. It is how JavaScript is able to bridge the gap of multi-threading making JavaScript a serious contender in an arena filled with multi-threaded languages like Java, Go, Python, Rust, and so on. Read the [introduction chapter](https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk) to see why the difference matters.

The JavaScript event loop relies on message passing concurrency to execute items on its stack in a non-blocking way, more like, it gives a perception of being non-blocking, because, in reality, it does block for a short moment since its single-threaded and execution is interleaved. This makes it perfect for most of the concurrency use cases you would encounter and you will rarely miss having multi-threading and true parallelism support and in many use cases, you can go head to head with a fully multi-threaded language.

While languages like Rust offer [flexibility and power](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co) and Go [offers simplicity and performance](https://dev.to/deepu105/concurrency-in-modern-programming-languages-golang-439i), JavaScript was never meant for concurrency but that didn't stop the awesome people behind NodeJS to come up with a platform that was fully focused on concurrency and non-blocking I/O. While JavaScript event loop already paved the way for it, NodeJS made JS a truly viable option for server-side concurrency. All this is made possible thanks to the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), [Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) support in JavaScript.

Unlike in many other languages, maybe except Go, concurrency is used a lot in JavaScript by developers, sometimes without even realizing it, especially in NodeJS applications. It's due to the programming model followed by NodeJS which relies heavily on callbacks and Promises and also because it is extremely easy to do so due to the flexible nature of JavaScript. The NodeJS standard library also uses concurrency where ever possible and there is no much overhead in doing so.

> The default for concurrency in JavaScript is an asynchronous programming model using callbacks, Promise or async/await.

With JavaScript, it's possible to do some level of multi-threaded concurrency and parallelization. It's not as flexible as Rust or as simple as Go, but still, you can achieve almost everything possible in other languages and still get quite decent performance for most of those use cases.

### Multi-threading

JavaScript is single-threaded hence the only way to achieve multi-threading is by spinning up multiple instances of the JS Engine. But then how do you communicate between these instances? That is where [Web Workers](https://developer.mozilla.org/en-us/docs/Web/API/Web_Workers_API) come in.

> Web Workers makes it possible to run a script operation in a background thread separate from the main execution thread of a web application
>
> -- MDN Web Docs

With the help of web workers, it is possible to offload heavy computations to a separate thread hence freeing up the main thread. These workers and the main thread communicate using events and a worker thread can spawn other worker threads.

Now when it comes to NodeJS, there are few ways to spawn additional threads and processes. There is the classical [`child_process`](https://nodejs.org/api/child_process.html) module, the more modern [`worker_threads`](https://nodejs.org/dist/latest-v15.x/docs/api/worker_threads.html) module which is quite similar to web workers, and the [`cluster`](https://nodejs.org/api/cluster.html#cluster_cluster) module for creating clusters of NodeJS instances.

> Workers (threads) are useful for performing CPU-intensive JavaScript operations. They do not help much with I/O-intensive work.
>
> -- NodeJS docs

Be it web workers or worker threads, they are not as flexible or easy as the multi-threading implementations in other languages and has many limitations and hence these are mostly used only when there are CPU intensive tasks or background tasks to be performed for other use cases concurrency using asynchronous processing would be sufficient.

JavaScript doesn't provide access to OS threads or green threads, the same applies for NodeJS however worker threads and the cluster comes close, and hence advanced multi-threading is not feasible. Message-passing concurrency is possible and is used by the JS event loop itself and can be used for both workers and the standard concurrency model in JS. Shared-state concurrency is possible in the standard concurrency model and with workers using array buffers.

### Asynchronous processing

Technically asynchronous programming is not part of concurrency but in practice, it goes hand in hand for many use cases and improves performance, and makes resource usage more efficient. Since the JavaScript event loop is non-blocking and asynchronous, it's perfect for asynchronous programming and that's why the concept is so popular among JS developers than in other languages and is heavily used especially in NodeJS and on the client-side with modern SPA frameworks. In a way, asynchronous programming was made popular by JavaScript and NodeJS. JavaScript provides 3 ways to do asynchronous programming, Callbacks, Promises, and Async/Await. In recent times Async/Await is becoming more widely used instead of or together with promises and callbacks due to its cleaner approach (Read, no callback hell). In NodeJS all I/O operations are async(non-blocking) by default, you would have to use sync alternatives provided to do synchronous I/O. This makes it easy to write concurrent applications in NodeJS using these constructs.

```js
// sequential
async function load() {
  const users = await getUsers();
  const posts = await getPosts();
  const messages = await getMessages();
  // do stuff
}

// concurrent
async function load() {
  const [users, posts, messages] = await Promise.all([getUsers(), getPosts(), getMessages()]);
  // do stuff
}
```

## Benchmarking

Now that we have some basic understanding of concurrency features in JavaScript & NodeJS, let us build a simple concurrent web server in NodeJS. Since asynchronous concurrency is the best way to achieve this in NodeJS we'll build a sample application using the standard `http` module and then improve it using the `cluster` module. The NodeJS version used is the latest (15.8.0) at the time of writing.

### Async HTTP concurrent webserver

This example is closer to the Rust Asynchronous example we built in the [second chapter](https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co). You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/jsws). We are not using any external dependency in this case.

```js
const http = require("http");
const fs = require("fs").promises;

let count = 0;

// set router
const server = http.createServer((req, res) => {
  count++;
  requestListener(req, res, count);
});

const host = "localhost";
const port = 8080;

// set listen port
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

const requestListener = async function (req, res, count) {
  // add 2 second delay to every 10th request
  if (count % 10 === 0) {
    console.log("Adding delay. Count: ", count);
    await sleep(2000);
  }
  const contents = await fs.readFile(__dirname + "/hello.html"); // read html file
  res.setHeader("Connection", "keep-alive");
  res.writeHead(200); // 200 OK
  res.end(contents); // send data to client side
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

As you can see we create an HTTP server and bind it to port 8080 and listen to all incoming requests. Each request is processed in a callback function that internally uses `async/await`.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Server Software:
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /
Document Length:        174 bytes

Concurrency Level:      100
Time taken for tests:   21.329 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2540000 bytes
HTML transferred:       1740000 bytes
Requests per second:    468.85 [#/sec] (mean)
Time per request:       213.286 [ms] (mean)
Time per request:       2.133 [ms] (mean, across all concurrent requests)
Transfer rate:          116.30 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.9      0      11
Processing:     0  207 599.9      4    2048
Waiting:        0  206 600.0      3    2038
Total:          0  208 599.9      4    2048

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      8
  75%     13
  80%     19
  90%   2000
  95%   2004
  98%   2012
  99%   2017
 100%   2048 (longest request)
```

Let's see if there is a difference in performance with multi-threading using the `cluster` package.

### Multi-threaded webserver cluster

This example is quite similar to the previous one except that we are using the `cluster` module to fork into master and worker threads, one worker per CPU thread. We are still using the `http` module and callbacks here. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/jsws_thread). We are not using any external dependency in this case as well.

```js
const http = require("http");
const fs = require("fs").promises;
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

let count = 0;

// set router
const server = http.createServer((req, res) => {
  count++;
  requestListener(req, res, count);
});

const host = "localhost";
const port = 8080;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // set listen port, TCP connection is shared by all workers
  server.listen(port, host, () => {
    console.log(`Worker ${process.pid}: Server is running on http://${host}:${port}`);
  });
}

const requestListener = async function (req, res, count) {
  // add 2 second delay to every 10th request
  if (count % 10 === 0) {
    console.log("Adding delay. Count: ", count);
    await sleep(2000);
  }
  const contents = await fs.readFile(__dirname + "/hello.html"); // read html file
  res.setHeader("Connection", "keep-alive");
  res.writeHead(200); // 200 OK
  res.end(contents); // send data to client side
};

// sleep function since NodeJS doesn't provide one
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

As you can see we used the same code from previous example and moved the `server.listen` to the worker nodes. The cluster module forks into master and workers. We assign a callback function to handle each request which internally calls the `requestListener` method. The code here is a bit more complex compared to the previous one.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Server Software:
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /
Document Length:        174 bytes

Concurrency Level:      100
Time taken for tests:   21.075 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2540000 bytes
HTML transferred:       1740000 bytes
Requests per second:    474.50 [#/sec] (mean)
Time per request:       210.747 [ms] (mean)
Time per request:       2.107 [ms] (mean, across all concurrent requests)
Transfer rate:          117.70 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0      11
Processing:     0  206 600.1      4    2047
Waiting:        0  205 600.1      3    2045
Total:          1  206 600.1      4    2047

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      8
  75%     11
  80%     14
  90%     88
  95%   2005
  98%   2012
  99%   2016
 100%   2047 (longest request)
```

We got almost identical results here. If you look close, the multi-threaded one is slightly faster but then the added complexity might not be worth it for all use cases. So it might be preferable to just use the `http` package without clustering for such use cases as it's cleaner.

## Conclusion

As I explained in the [first part](https://dev.to/deepu105/concurrency-in-modern-programming-languages-introduction-ckk) of this serious, this simple benchmarking is not an accurate representation for all concurrency use cases. It's a simple test for a very particular use case, a simple concurrent web server that just serves a file. The idea is to see the differences in solutions and to understand how concurrency works in JavaScript specifically on NodeJS. And for this particular use case, an asynchronous server using the `http` module provided by the standard library does seem to be the best choice.

So stay tuned for the next post where we will look at concurrency in [Deno](https://deno.land/) and build the same use case in TypeScript.

---

## References

- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [tsh.io](https://tsh.io/blog/simple-guide-concurrency-node-js/)
- [medium.com/@onejohi](https://medium.com/@onejohi/concurrency-in-javascript-f5bb387708d8)
- [blog.logrocket.com](https://blog.logrocket.com/a-complete-guide-to-threads-in-node-js-4fa3898fe74f/)
- [blog.logrocket.com](https://blog.logrocket.com/node-js-multithreading-what-are-worker-threads-and-why-do-they-matter-48ab102f8b10/)
- [medium.com/ideas-at-igenius](https://medium.com/ideas-at-igenius/some-beginner-tips-for-concurrency-with-async-await-and-promise-all-dc28b5a4411e)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Michał Parzuchowski](https://unsplash.com/@mparzuchowski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

