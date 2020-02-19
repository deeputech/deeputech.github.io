---
title: "\U0001F680 Visualizing memory management in Rust"
published: false
featured: false
description: Let us take a closer look at how Rust manages memory.
tags:
    - rust
    - garbagecollection
    - programming
    - computerscience
canonical_url: "https://deepu.tech/memory-management-in-rust/"
cover_image: https://i.imgur.com/ViNnj1v.jpg
series: memory-management
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know if something can be improved in the post.

---

In this multi-part series, I aim to demystify the concepts behind memory management and take a deeper look at memory management in some of the modern programming languages. I hope the series would give you some insights into what is happening under the hood of these languages in terms of memory management.

In this chapter, we will look at the memory management of the **[Rust](https://www.rust-lang.org/)** programming language. Rust is a statically typed & compiled systems programming language like C/C++. Rust is memory & thread safe and does not have a runtime or a garbage collector.

If you haven't read the [first part](https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd) of this series, please read it first as I explained the difference between the Stack and Heap memory there which would be useful to understand this chapter.

> This post is based on Rust 1.41 official implementation and concept details might change in the future versions of Rust

Compared to languages we saw until now in this series, Rust is quite unique let us see how.

# Rust internal memory structure

First, let us see what the internal memory structure of Rust is.

Rust doesn't have a defined [memory model](https://doc.rust-lang.org/beta/reference/memory-model.html) in the language specifications as of now and the memory structure is quite straightforward as there is no Garbage Collection(GC) involved.

Each Rust program process is allocated some virtual memory by the Operating System(OS), this is the total memory that the process has access to.

![Rust Memory structure](https://i.imgur.com/vFtq3uj.png)

This is quite simple compared to the memory structure we saw in the previous chapters for [JVM](https://dev.to/deepu105/visualizing-memory-management-in-jvm-java-kotlin-scala-groovy-clojure-19le), [V8](https://dev.to/deepu105/visualizing-memory-management-in-v8-engine-javascript-nodejs-deno-webassembly-105p) and [Go](). As you can see there is no generational memory here and no complex sub structures that help with GC. The reason for this is that Rust manages memory as part of program execution using the Ownership model rather than using any kind of GC.

Let us see what the different memory are:

## Heap

This is where all dynamic data(any data for which size cannot be calculated at compile time) is stored. This is the biggest block of memory and the part managed by Rust.

-   **Box**:

## Stack

This is the stack memory area and there is one stack per thread. This is where static data(data size known at compile time) including function frames, primitive values, and pointers to dynamic data are stored.

---

# Rust memory usage (Stack vs Heap)

Now that we are clear about how memory is organized let's see how Go uses Stack and Heap when a program is executed.

Let's use the below Go program, the code is not optimized for correctness hence ignore issues like unnecessary intermediatory variables and such, the focus is to visualize stack and heap memory usage.

```go
package main

import "fmt"

type Employee struct {
	name   string
	salary int
	sales  int
	bonus  int
}

const BONUS_PERCENTAGE = 10

func getBonusPercentage(salary int) int {
	percentage := (salary * BONUS_PERCENTAGE) / 100
	return percentage
}

func findEmployeeBonus(salary, noOfSales int) int {
	bonusPercentage := getBonusPercentage(salary)
	bonus := bonusPercentage * noOfSales
	return bonus
}

func main() {
	var john = Employee{"John", 5000, 5, 0}
	john.bonus = findEmployeeBonus(john.salary, john.sales)
	fmt.Println(john.bonus)
}
```

One major difference Go has compared to many garbage collected languages is that many objects are allocated directly on the program stack. The Go compiler uses a process called [escape analysis](https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-escape-analysis.html) to find objects whose lifetime is known at compile-time and allocates them on the stack rather than in garbage-collected heap memory.
During compilation Go does the escape analysis to determine what can go into Stack(static data) and what needs to go into Heap(dynamic data). We can see this details during compilation by running `go build` with `-gcflags '-m'` flag. For the above code, it will output something like below:

Let us visualize this. Click on the slides and move forward/backward using arrow keys to see how the above program is executed and how the stack and heap memory is used:

{% speakerdeck c237c60018de490fa71e34cef7a50f0f %}

_Note: If the slides look cut off at edges, then click on the title of the slide or [here](https://speakerdeck.com/deepu105/golang-memory-usage-stack-vs-heap) to open it directly in SpeakerDeck._

As you can see:

-   **Main** function is kept in a "main frame" on the Stack
-   Every function call is added to the stack memory as a frame-block
-   All static variables including arguments and the return value is saved within the function frame-block on the Stack
-   All static values regardless of type are stored directly on the Stack. This applies to global scope as well
-   All dynamic types created on the Heap and is referenced from the Stack using Stack pointers. Objects of size less than 32Kb go to the `mcache` of the `P`. This applies to global scope as well
-   The struct with static data is kept on the stack until any dynamic value is added at that point the struct is moved to heap
-   Functions called from the current function is pushed on top of the Stack
-   When a function returns its frame is removed from the Stack
-   Once the main process is complete, the objects on the Heap do not have any more pointers from Stack and becomes orphan

The Stack as you can see is automatically managed and is done so by the operating system rather than Go itself. Hence we do not have to worry much about the Stack. The Heap, on the other hand, is not automatically managed by the OS and since its the biggest memory space and holds dynamic data, it could grow exponentially causing our program to run out of memory over time. It also becomes fragmented over time slowing down applications. This is where garbage collection comes in.

---

# Rust Memory management: Ownership

Go's memory management involves automatic allocation when memory is needed and garbage collection when memory is not needed anymore. It's done by the standard library. Unlike C/C++ the developer does not have to deal with it and the underlying management done by Go is well optimized and efficient.

## RAII

## Ownership

## Borrow checker

## Lifetimes

## Smart pointers

---

# Conclusion

This post should give you an overview of the Go memory structure and memory management. This is not exhaustive, there are a lot more advanced concepts and the implementation details keep changing from version to version. But for most Go developers this level of information would be sufficient and I hope it helps you write better code, considering these in mind, for more performant applications and keeping these in mind would help you to avoid the next memory leak issue you might encounter otherwise.

I hope you had fun learning this, stay tuned for the next post in the series.

---

# References

-   [doc.rust-lang.org](https://doc.rust-lang.org)
- https://www.youtube.com/watch?v=2IxQgXQl_Ws

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image inspired by https://medium.com/a-journey-with-go/go-discovery-of-the-trace-package-e5a821743c3c

---

First, there are plenty of fantastic memory-safe languages already available and widely used inside and outside of Microsoft, including .NET languages like C# or F# and other languages like Swift, Go, and Python. We encourage anyone who is currently using C or C++ to consider whether one of these languages would be appropriate to use instead. We, however, are talking about the need for a safe systems programming language (i.e., a language that can build systems other software runs on, like OS kernels). Such workloads need the speed and predictable performance than C, C++, and Rust provide. Languages that achieve memory safety through garbage collection are not ideal choices for systems programming because their runtimes can lead to unpredictable performance and unnecessary overhead.

https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/
