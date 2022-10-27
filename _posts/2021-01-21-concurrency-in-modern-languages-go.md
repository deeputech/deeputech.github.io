---
title: "Concurrency in modern programming languages: Golang"
description: >-
  Building a concurrent web server in Golang to compare concurrency performance
  with Rust, JS, TS, Kotlin, and Java
published: true
featured: false
tags:
  - languages
  - concurrency
  - async
  - golang
series: concurrency in modern programming languages
canonical_url: "https://deepu.tech/concurrency-in-modern-languages-go/"
cover_image: "https://i.imgur.com/ZTfXUBU.jpg"
devto_id: 578413
devto_url: >-
  https://dev.to/deepu105/concurrency-in-modern-programming-languages-golang-439i
---

This is a multi-part series where I'll be talking about concurrency in modern programming languages and will be building and benchmarking a concurrent web server, inspired by the example from the [Rust book](https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html), in popular languages like Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency and its performance between these languages/platforms. The chapters of this series are as below.

1. [Introduction](https://deepu.tech/concurrency-in-modern-languages/)
1. [Concurrent web server in Rust](https://deepu.tech/concurrency-in-modern-languages-rust/)
1. **Concurrent web server in Golang**
1. [Concurrent web server in JavaScript with NodeJS](https://deepu.tech/concurrency-in-modern-languages-js/)
1. [Concurrent web server in TypeScript with Deno](https://deepu.tech/concurrency-in-modern-languages-ts/)
1. [Concurrent web server in Java with JVM](https://deepu.tech/concurrency-in-modern-languages-java/)
1. [Comparison and conclusion of benchmarks](https://deepu.tech/concurrency-in-modern-languages-final/)


---

## Concurrency in Go

> Do not communicate by sharing memory; instead, share memory by communicating.
>
> -- Go docs

Go supports concurrency as a first-class citizen with its `goroutines`. Go takes the concept of coroutines to a whole new level by making it much simpler and the preferred way of doing almost anything in Go. The semantic and syntax are made so easy that even a Go newbie will be able to start using `goroutines` from the get-go easily. All this without sacrificing performance.

While languages like Rust offers [flexibility and power](https://deepu.tech/concurrency-in-modern-languages-rust/) over simplicity, Go focuses on simplicity and performance. While languages like Rust provide you with building blocks required for concurrency Go provides implementations that can be used easily to achieve most of the concurrency use cases. The Go standard library also uses goroutines where ever possible. This allows us to use goroutines and improve performance even for trivial use cases as there is not much overhead from the complexity of using concurrency semantics.

> The default for concurrency in Go is an asynchronous programming model and hence there are no explicit language features like async/await. Using concurrency with synchronous programming would be way more difficult in Go

With Go, it's possible to do multi-threaded concurrency and parallelization with goroutines and goroutines work in an asynchronous way hence making use of both multi-threading and asynchronous programming efficiently. It's not as flexible as Rust as we saw in the [previous chapter](https://deepu.tech/concurrency-in-modern-languages-rust/), but still, you can achieve almost everything that is possible in Rust and still get the best possible performance for those use case.

### [Multi-threading](https://golang.org/doc/effective_go.html#goroutines)

Multi-threading is achieved with goroutines that provide green threads (virtual threads that are scheduled by a runtime or virtual machine and not managed by the operating system) and there are no ways to use OS threads directly like in Rust for example. Go also provides implementations required for message-passing concurrency using [channels](https://golang.org/doc/effective_go.html#channels) and shared-state concurrency using mutexes and WaitGroups, though Go discourages shared state concurrency. Parallelization is also possible using goroutines.

### Asynchronous processing

Technically asynchronous programming is not part of concurrency but in practice, it goes hand in hand for many use cases and improves performance, and makes resource usage more efficient. This is the default behavior in Go when using goroutines and hence there is no special syntax around these so synchronous programming with goroutines is not commonly done and would require using WaitGroups and such.

## Benchmarking

Now that we have some basic understanding of concurrency features in Golang, let us build a simple concurrent web server in Go. Since goroutines are the only way to achieve this we'll build two sample applications using the `http` package and plain `tcp`. The Go version used is the latest (1.15.6) at the time of writing.

### TCP concurrent webserver

This example is closer to the Rust Asynchronous example we built in the [previous chapter](https://deepu.tech/concurrency-in-modern-languages-rust/). I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/gows_tcp). We are not using any external dependency in this case.

```go
func main() {
	var count = 0

	l, err := net.Listen("tcp", "127.0.0.1:8080") // set listen port
	if err != nil {
		log.Fatal("Error listening: ", err)
	}
	defer l.Close() // close connection when done

	for {
		count++
		// Listen for an incoming connection.
		if conn, err := l.Accept(); err != nil {
			log.Fatal("Error accepting: ", err)
		} else {
			// Handle connections in a new goroutine.
			go handleConnection(conn, count)
		}
	}
}

func handleConnection(conn net.Conn, count int) {
	// Close the connection when you're done with it.
	defer conn.Close()
	// Read the incoming connection into a buffer.
	buf := make([]byte, 1024)
	if _, err := conn.Read(buf); err != nil {
		log.Fatal("Error reading:", err)
	}

	// add 2 second delay to every 10th request
	if (count % 10) == 0 {
		println("Adding delay. Count: ", count)
		time.Sleep(2 * time.Second)
	}
	html, _ := ioutil.ReadFile("hello.html") // read html file
	// Send a response back
	header := `
HTTP/1.0 200 OK
Connection: keep-alive
Content-Length: 174
Content-Type: text/html; charset=utf-8
	`
	res := fmt.Sprintf("%s\r\n\r\n%s", header, string(html))
	conn.Write([]byte(res))
}
```

As you can see we bind a TCP listener to port 8080 and listen to all incoming requests in an endless loop. Each request is processed in a new goroutine by using the `go` statement.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        174 bytes

Concurrency Level:      100
Time taken for tests:   20.208 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2780000 bytes
HTML transferred:       1740000 bytes
Requests per second:    494.86 [#/sec] (mean)
Time per request:       202.075 [ms] (mean)
Time per request:       2.021 [ms] (mean, across all concurrent requests)
Transfer rate:          134.35 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.0      0       9
Processing:     0  201 600.0      0    2012
Waiting:        0  201 600.0      0    2011
Total:          0  201 600.0      0    2015

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      1
  75%      2
  80%      3
  90%   2000
  95%   2001
  98%   2001
  99%   2002
 100%   2015 (longest request)
```

Let's see if there is a difference in performance when using the `http` package.

### HTTP concurrent webserver

This example is quite similar to the previous one except that we are using an HTTP server here and we are not invoking goroutines directly instead we pass a callback function to `http.HandleFunc` and it internally executes it as a goroutine. I have omitted import statements for brevity. You can find the full example on [GitHub here](https://github.com/deepu105/concurrency-benchmarks/tree/main/gows). We are not using any external dependency in this case as well and `http` is part of the Go standard library.

```go
func main() {
	var count = 0
	// set router
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		count++
		handleConnection(w, count)
	})
	// set listen port
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnection(w http.ResponseWriter, count int) {
	// add 2 second delay to every 10th request
	if (count % 10) == 0 {
		println("Adding delay. Count: ", count)
		time.Sleep(2 * time.Second)
	}
	html, _ := ioutil.ReadFile("hello.html") // read html file
	w.Header().Add("Connection", "keep-alive")
	w.WriteHeader(200)           // 200 OK
	fmt.Fprintf(w, string(html)) // send data to client side
}
```

As you can see we created an HTTP server bound to port 8080 and listen to all incoming requests. We assign a callback function to handle each request which internally calls the `handleConnection` method. The code here is much more clean and concise compared to the previous one.

Let us run a benchmark using ApacheBench. We will make 10000 requests with 100 concurrent requests.

```shell
ab -c 100 -n 10000 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
...

Document Path:          /
Document Length:        174 bytes

Concurrency Level:      100
Time taken for tests:   20.232 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2910000 bytes
HTML transferred:       1740000 bytes
Requests per second:    494.27 [#/sec] (mean)
Time per request:       202.319 [ms] (mean)
Time per request:       2.023 [ms] (mean, across all concurrent requests)
Transfer rate:          140.46 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.9      0       6
Processing:     0  201 600.0      1    2013
Waiting:        0  201 600.0      0    2013
Total:          0  202 600.0      1    2018
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      2
  80%      3
  90%   2000
  95%   2001
  98%   2002
  99%   2003
 100%   2018 (longest request)
```

We got almost identical results here. So it might be preferable to just use the HTTP package for such use cases as it's cleaner.

## Conclusion

As I explained in the [first part](https://deepu.tech/concurrency-in-modern-languages/) of this serious, this simple benchmarking is not an accurate representation for all concurrency use cases. It's a simple test for a very particular use case, a simple concurrent web server that just serves a file. The idea is to see the differences in solutions and to understand how concurrency works in Golang. And for this particular use case, the `http` package provided by the standard library does seem to be the best choice.

So stay tuned for the next post where we will look at concurrency in NodeJS and build the same use case in JavaScript.

---

## References

- [medium.com/@damithadayananda](https://medium.com/@damithadayananda/golang-vs-java-concurrency-a-comparative-study-b0aea90f5fd7)
- [medium.com/@gauravsingharoy](https://medium.com/@gauravsingharoy/asynchronous-programming-with-go-546b96cd50c1)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Peggy Anke](https://unsplash.com/@instagramfotografin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/juggle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
