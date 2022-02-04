---
title: "Concurrency in modern programming languages: Rust"
description: >-
  Building a concurrent web server in Rust to compare concurrency performance
  with Go, JS, TS, Kotlin, and Java
published: true
featured: false
tags:
  - languages
  - concurrency
  - async
  - rust
series: concurrency in modern programming languages
canonical_url: "https://deepu.tech/concurrency-in-modern-languages-rust/"
cover_image: "https://i.imgur.com/XalVFUX.jpg"
devto_id: 551615
devto_url: "https://dev.to/deepu105/concurrency-in-modern-programming-languages-rust-19co"
---

This is a multi-part series where I'll be talking about concurrency in modern programming languages and will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below and I'll try to publish them weekly.

1. [Introduction](https://deepu.tech/concurrency-in-modern-languages/)
1. **Concurrent web server in Rust**
1. [Concurrent web server in Golang](https://deepu.tech/concurrency-in-modern-languages-go/)
1. [Concurrent web server in JavaScript with NodeJS](https://deepu.tech/concurrency-in-modern-languages-js/)
1. [Concurrent web server in TypeScript with Deno](https://deepu.tech/concurrency-in-modern-languages-ts/)
1. [Concurrent web server in Java with JVM](https://deepu.tech/concurrency-in-modern-languages-java/)
1. [Comparison and conclusion of benchmarks](https://deepu.tech/concurrency-in-modern-languages-final/)

---

## Concurrency in Rust

> Handling concurrent programming safely and efficiently is another of Rust’s major goals.
>
> -- Rust docs

Efficient and memory safe concurrency is one of the major goals of Rust and these are not just plain words, the language offers great features for concurrent programming and when combined with the best in class memory safety model makes it a great choice for concurrency use cases. As with everything else in Rust, the idea is that you spend more time upfront (read compile-time) fixing issues rather than spending time fixing issues in production (read runtime). So if you are new to Rust it might look like more time spent on writing code but it will considerable effort later on by avoiding a lot of issues that generally pop up in languages with not-so-great memory safety. The Rust team calls this **"fearless concurrency"**.

> As with everything else in Rust the idea is that you spend more time upfront (read compile-time) fixing issues rather than spending time fixing issues in production (read runtime).

There are other languages like Go, which offers simpler and equally performant solutions for concurrency but they aren't as powerful as Rust due to the flexibility offered by Rust. Basically, Rust provides you with building blocks required for concurrent, parallel, and asynchronous programming and you can extend or implement different solutions as you see fit or use a solution offered by the community. This allows for one to use the best possible solution for the use case rather than using the same hammer for all jobs.

With Rust, it's possible to do multi-threaded concurrency or parallel programming as well as asynchronous programming. This means as we saw in the [previous chapter](https://deepu.tech/concurrency-in-modern-languages/), we can mix and match these models to get the best possible performance for any use case.

### [Multi-threading](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

Rust provides building blocks to create and manage OS threads as part of the standard library and it also provides implementations required for [message-passing concurrency](https://doc.rust-lang.org/book/ch16-02-message-passing.html) (similar to Go) using channels and [shared-state concurrency](https://doc.rust-lang.org/book/ch16-03-shared-state.html#using-mutexes-to-allow-access-to-data-from-one-thread-at-a-time) using Mutexes and Smart pointers. Rust's type system and ownership model helps to avoid common concurrency issues like data race, locks, etc.

### [Asynchronous processing](https://rust-lang.github.io/async-book/01_getting_started/01_chapter.html)

Technically asynchronous programming is not part of concurrency but in practice, it goes hand in hand for many use cases and improves performance, and makes resource usage more efficient. The latest versions of Rust provides building blocks and language features required for asynchronous programming with the `async/.await` syntax. But do keep in mind that using an asynchronous programming model increases the overall complexity and the ecosystem is still evolving. While Rust provides the language features required the standard library doesn't provide any implementations needed and hence you would have to use an external crate like `Futures` to be able to use the asynchronous programming model effectively.

## Benchmarking

Now that we have some basic understanding of concurrency features in Rust, let us build a simple concurrent webserver in Rust. Since Rust offers multiple ways to achieve this we'll be building three sample applications and comparing them. The Rust version used is the latest (1.48.0) at the time of writing.

### Multi-threaded concurrent webserver

This example is closer to the example from the official [Rust book](https://doc.rust-lang.org/book/ch20-02-multithreaded.html), I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/rustws). The `ThreadPool` struct is exactly the same as in the Rust book. We are not using any external dependency in this case.

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap(); // bind listener
    let pool = ThreadPool::new(100); // same number as max concurrent requests

    let mut count = 0; // count used to introduce delays

    // listen to all incoming request streams
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        count = count + 1;
        pool.execute(move || {
            handle_connection(stream, count); // spawning each connection in a new thread
        });
    }
}

fn handle_connection(mut stream: TcpStream, count: i64) {
    // Read the first 1024 bytes of data from the stream
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    // add 2 second delay to every 10th request
    if (count % 10) == 0 {
        println!("Adding delay. Count: {}", count);
        thread::sleep(Duration::from_secs(2));
    }

    let header = "
HTTP/1.0 200 OK
Connection: keep-alive
Content-Length: 174
Content-Type: text/html; charset=utf-8
    ";
    let contents = fs::read_to_string("hello.html").unwrap();

    let response = format!("{}\r\n\r\n{}", header, contents);

    stream.write(response.as_bytes()).unwrap(); // write response
    stream.flush().unwrap();
}
```

As you can see we bind a TCP listener to port 8080 and listen to all incoming requests. Each request is processed in a new thread provided by a `ThreadPool`.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        176 bytes

Concurrency Level:      100
Time taken for tests:   20.173 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2830000 bytes
HTML transferred:       1760000 bytes
Requests per second:    495.72 [#/sec] (mean)
Time per request:       201.726 [ms] (mean)
Time per request:       2.017 [ms] (mean, across all concurrent requests)
Transfer rate:          137.00 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.9      0       7
Processing:     0  201 600.0      0    2014
Waiting:        0  200 600.0      0    2013
Total:          0  201 600.0      0    2017

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      1
  75%      1
  80%      3
  90%   2000
  95%   2001
  98%   2001
  99%   2002
 100%   2017 (longest request)
```

As you can see the request handler sleeps for 2 seconds for every 10th request hence if we set a realistic thread pool number of 8 for example it will limit us to a maximum of `(8 x 10) / 2 = 40` requests per second and hence we set a thread pool of 100 here to match the maximum concurrent requests, setting a value higher would not make any difference. I guess you can already see the problem here. The thread pool itself becomes the bottleneck. In a real use case, you may not be able to set so many threads as the OS may not be able to provide so many thus creating increased resource usage and bottleneck. In this simple use case, since each thread spawns and processes the request really fast we won't encounter an issue.

So let's see if we can have another solution without such a bottleneck.

### Asynchronous concurrent webserver

This example is closer to the example from the [Rust async docs](https://rust-lang.github.io/async-book/09_example/00_intro.html), I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/rustws_async). The `TcpListener`, `TcpStream`, and `task` are from the `async_std` crate and `async-std` is the only external dependency used in this case.

```rust
#[async_std::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap(); // bind listener
    let mut count = 0; // count used to introduce delays

    loop {
        count = count + 1;
        // Listen for an incoming connection.
        let (stream, _) = listener.accept().await.unwrap();
        // spawn a new task to handle the connection
        task::spawn(handle_connection(stream, count));
    }
}

async fn handle_connection(mut stream: TcpStream, count: i64) {
    // Read the first 1024 bytes of data from the stream
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).await.unwrap();

    // add 2 second delay to every 10th request
    if (count % 10) == 0 {
        println!("Adding delay. Count: {}", count);
        task::sleep(Duration::from_secs(2)).await;
    }

    let header = "
HTTP/1.0 200 OK
Connection: keep-alive
Content-Length: 174
Content-Type: text/html; charset=utf-8
    ";
    let contents = fs::read_to_string("hello.html").unwrap();

    let response = format!("{}\r\n\r\n{}", header, contents);

    stream.write(response.as_bytes()).await.unwrap(); // write response
    stream.flush().await.unwrap();
}
```

As you can see we bind an asynchronous TCP listener to port 8080 and listen to all incoming requests. Each request is processed in a new task provided by `async_std`. We are not using any thread pools here and all the incoming requests are processed asynchronously and hence we don't have a bottleneck for maximum connections.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        176 bytes

Concurrency Level:      100
Time taken for tests:   20.186 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2830000 bytes
HTML transferred:       1760000 bytes
Requests per second:    495.38 [#/sec] (mean)
Time per request:       201.863 [ms] (mean)
Time per request:       2.019 [ms] (mean, across all concurrent requests)
Transfer rate:          136.91 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.8      0       6
Processing:     0  201 600.0      0    2010
Waiting:        0  201 600.0      0    2010
Total:          0  201 600.0      1    2014
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      2
  80%      3
  90%   2000
  95%   2001
  98%   2001
  99%   2003
 100%   2014 (longest request)
```

We got almost identical results here. Hence this version seems much more efficient than the multi-threaded version for this particular use case. Similar solutions can be built using other crates like `smol`, `hyper`, `tokio`, and so on. You can find some of them in this [repo](https://github.com/deepu105/concurrency-benchmarks).

Let's see if we can combine the two to create an asynchronous multi-threaded version.

### Asynchronous multi-threaded concurrent webserver

This example uses an async `ThreadPool`. I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/rustws_async_thread). The `ThreadPool` struct is from the `futures` crate and it's the only external dependency used in this case.

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap(); // bind listener

    let mut pool_builder = ThreadPoolBuilder::new();
    pool_builder.pool_size(100);
    let pool = pool_builder.create().expect("couldn't create threadpool");
    let mut count = 0; // count used to introduce delays

    // Listen for an incoming connection.
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        count = count + 1;
        let count_n = Box::new(count);

        // spawning each connection in a new thread asynchronously
        pool.spawn_ok(async {
            handle_connection(stream, count_n).await;
        });
    }
}

async fn handle_connection(mut stream: TcpStream, count: Box<i64>) {
    // Read the first 1024 bytes of data from the stream
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    // add 2 second delay to every 10th request
    if (*count % 10) == 0 {
        println!("Adding delay. Count: {}", count);
        thread::sleep(Duration::from_secs(2));
    }

    let header = "
    HTTP/1.0 200 OK
    Connection: keep-alive
    Content-Length: 174
    Content-Type: text/html; charset=utf-8
        ";

    let contents = fs::read_to_string("hello.html").unwrap();

    let response = format!("{}\r\n\r\n{}", header, contents);

    stream.write(response.as_bytes()).unwrap(); // write response
    stream.flush().unwrap();
}
```

This is very similar to the first `Threadpool` example except for the async invocation. Unfortunately, we have the same bottleneck from the thread pool in this case as well hence we set a thread pool of 100 here to match the maximum concurrent requests.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        176 bytes

Concurrency Level:      100
Time taken for tests:   20.161 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      3030000 bytes
HTML transferred:       1760000 bytes
Requests per second:    496.00 [#/sec] (mean)
Time per request:       201.615 [ms] (mean)
Time per request:       2.016 [ms] (mean, across all concurrent requests)
Transfer rate:          146.76 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       5
Processing:     0  201 600.0      0    2007
Waiting:        0  200 600.0      0    2007
Total:          0  201 600.0      0    2010

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      1
  75%      2
  80%      2
  90%   2000
  95%   2000
  98%   2001
  99%   2002
 100%   2010 (longest request)
```

It does seem slightly faster by some milliseconds compared to previous solutions.

### Asynchronous multi-threaded concurrent webserver with Tokio

This is another version of asynchronous multi-threaded webserver using [Tokio](https://github.com/tokio-rs/tokio) and it was contributed by [Remco Bloemen](https://github.com/Recmo). I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/rustws_async_tokio).

```rust
#[tokio::main()] // Tokio uses a threadpool sized for number of cpus by default
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();  // bind listener
    let mut count = 0; // count used to introduce delays

    // Listen for an incoming connection.
    loop {
        count = count + 1;
        let (socket, _) = listener.accept().await.unwrap();
        // spawning each connection in a new tokio thread asynchronously
        tokio::spawn(async move { handle_connection(socket, Box::new(count)).await });
    }
}

async fn handle_connection(mut stream: TcpStream, count: Box<i64>) {
    // Read the first 1024 bytes of data from the stream
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).await.unwrap();

    // add 2 second delay to every 10th request
    if (*count % 10) == 0 {
        println!("Adding delay. Count: {}", count);
        sleep(Duration::from_secs(2)).await;
    }

    let header = "
    HTTP/1.0 200 OK
    Connection: keep-alive
    Content-Length: 174
    Content-Type: text/html; charset=utf-8
        ";

    let contents = read_to_string("hello.html").await.unwrap();

    let response = format!("{}\r\n\r\n{}", header, contents);

    stream.write_all(response.as_bytes()).await.unwrap(); // write response
}
```

This is very similar to the previous example but works with less number of thread pools and uses async invocation. We do not have the bottleneck from the previous thread pool example in this case.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        176 bytes

Concurrency Level:      100
Time taken for tests:   20.569 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      3030000 bytes
HTML transferred:       1760000 bytes
Requests per second:    486.17 [#/sec] (mean)
Time per request:       205.688 [ms] (mean)
Time per request:       2.057 [ms] (mean, across all concurrent requests)
Transfer rate:          143.86 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.4      0      22
Processing:     0  202 600.3      1    2013
Waiting:        0  202 600.3      1    2012
Total:          0  203 600.3      2    2029

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      3
  75%      5
  80%      7
  90%   2000
  95%   2003
  98%   2006
  99%   2008
 100%   2029 (longest request)
```

It does seem slightly slower by some milliseconds compared to previous solution.

## Conclusion

As I explained in the [first part](https://deepu.tech/concurrency-in-modern-languages/) of this serious, this simple benchmarking is not an accurate representation for all concurrency use cases. It's a simple test for a very particular use case, a simple concurrent web server that just serves a file. The idea is to see the differences in solutions and to understand how concurrency works in Rust. And for this particular use case, asynchronous solutions do seem to be the best choice.

So stay tuned for the next post where we will look at concurrency in Golang and build the same use case in Go.

---

## References

- [klau.si](https://klau.si/blog/benchmarking-a-rust-web-application/)
- [hackmd.io](https://hackmd.io/@lbernick/SkgO7bCMw)
- [doc.rust-lang.org](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html)
- [rust-lang.github.io](https://rust-lang.github.io/async-book)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Jacob Mejicanos](https://unsplash.com/@jacobmejicanos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
