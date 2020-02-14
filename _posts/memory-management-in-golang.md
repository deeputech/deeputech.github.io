---
title: "\U0001F680 Visualizing memory management in Golang"
published: false
featured: false
description: Let us take a look at how Golang manages memory.
tags:
    - go
    - garbagecollection
    - programming
    - computerscience
canonical_url: "https://deepu.tech/memory-management-in-golang/"
cover_image: "https://i.imgur.com/kSgatSL.png"
series: memory-management
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know if something can be improved in the post.

---

In this multi-part series, I aim to demystify the concepts behind memory management and take a deeper look at memory management in some of the modern programming languages. I hope the series would give you some insights into what is happening under the hood of these languages in terms of memory management.

In this chapter, we will look at the memory management of the **[Go](https://golang.org/)** programming language(Golang). Go is a statically typed & compiled language like C/C++ and Rust. Hence Go does not need a VM and Go application binaries include a small runtime embedded in them to take care of language features like Garbage collection, scheduling & concurrency.

If you haven't read the [first part](https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd) of this series, please read it first as I explained the difference between the Stack and Heap memory there which would be useful to understand this chapter.

> This post is based on Go 1.13 default official implementation and concept details might change in the future versions of Go

# Go internal memory structure

First, let us see what the internal memory structure of Go is.

> Go Runtime schedules Goroutines (`G`) onto Logical Processors (`P`) for execution. Each `P` has a machine (`M`). We will use `P`, `M` & `G` through out this post. If you’re not familiar with the Go scheduler read [Go scheduler: Ms, Ps & Gs](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html) first.

![Go Scheduler](https://i.imgur.com/wThLAbQ.png)

Each Go program process is allocated some virtual memory by the Operating System(OS), this is the total memory that the process has access to. The actual memory that is used within the virtual memory is called **Resident Set**. This space is managed by the internal memory constructs as below:

![Go Memory structure](https://i.imgur.com/vFtq3uj.png)

This is a simplified view based on the internal objects used by Go, In reality Go divides and groups memory into pages as described in [this great article](https://blog.learngoprogramming.com/a-visual-guide-to-golang-memory-allocator-from-ground-up-e132258453ed).

This is quite different from the memory structure we saw in the previous chapters for [JVM](https://dev.to/deepu105/visualizing-memory-management-in-jvm-java-kotlin-scala-groovy-clojure-19le) and [V8](https://dev.to/deepu105/visualizing-memory-management-in-v8-engine-javascript-nodejs-deno-webassembly-105p). As you can see there is no generational memory here. The main reason for this is the [**TCMalloc**](http://goog-perftools.sourceforge.net/doc/tcmalloc.html)(Thread-Caching Malloc), which is what Go's own memory allocator was modeled upon.

Let us see what the different constructs are:

## Page Heap(`mheap`)

This is where Go stores dynamic data(any data for which size cannot be calculated at compile time). This is the biggest block of memory and this is where **Garbage Collection(GC)** takes place.

The resident set is divided into pages of 8KB each and is managed by one global `mheap` object.

> Large objects(Object of Size > 32kb) are allocated directly from `mheap`. These large request comes at an expenses of central lock, so only one `P`’s request can be served at any given point of time.

`mheap` manages pages grouped into different constructs as below:

-   **mspan**: `mspan` is the most basic structure that manages the pages of memory in `mheap`. Its a double linked list that holds the address of the start page, span size class and number of pages in the span. Like TCMalloc, Go also divides Memory Pages into a block of 67 different classes by size starting at 8 bytes up to 32 kilobytes as in the below image

    ![](https://i.imgur.com/IxjG2aF.png)

    Each span exists twice, one for objects with pointers (**scan** classes) and one for objects with no pointers (**noscan** classes). This helps during GC as `noscan` spans need not be traversed to look for live objects.

-   **mcentral**: `mcentral` groups spans of same size class together. Each `mcentral` contains two `mspanList`:

    -   **empty**: Double linked list of spans with no free objects or spans that are cached in an `mcache`. When a span here is freed, its moved to the nonempty list.
    -   **nonempty**: Double linked list of spans with a free object. When a new span is requested from `mcentral`, it takes that from the nonempty list and moves it into the empty list.

    When `mcentral` doesn't have any free span, it requests a new run of pages from `mheap`.

-   **arena**: The heap memory grows and shrinks as required within the virtual memory allocated. When more memory is needed, `mheap` pulls them from the virtual memory as chunk of 64MB(for 64 bit architectures) called `arena`. The pages are mapped to spans here.

-   **mcache**: This is a very interesting construct. `mcache` is a cache of memory provided to a `P`(Logical Processor) to store small objects(Object size <=32Kb). Though this resembles the thread stack, it is part of the heap and is used for dynamic data. `mcache` contains `scan` and `noscan` types of `mspan` for all class sizes. Goroutines can obtain memory from `mcache` without any locks as a `P` can have only one `G` at a time. Hence this is more efficient. `mcache` requests new spans from `mcentral` when required.

## Stack

This is the stack memory area and there is one stack per Goroutine(`G`). This is where static data including function frames, primitive values, and pointers to structs are stored. This is not same as `mcache` which is assigned to a `P`

---

# Go memory usage (Stack vs Heap)

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

During compilation Go does an escape analysis to determine what can go into Stack(static data) and what needs to go into Heap(dynamic data). We can see this details during compilation by running `go build` with `-gcflags '-m'` flag. For the above code, it will output the below:

```
❯ go build -gcflags '-m' gc.go
# command-line-arguments
temp/gc.go:14:6: can inline getBonusPercentage
temp/gc.go:19:6: can inline findEmployeeBonus
temp/gc.go:20:39: inlining call to getBonusPercentage
temp/gc.go:27:32: inlining call to findEmployeeBonus
temp/gc.go:27:32: inlining call to getBonusPercentage
temp/gc.go:28:13: inlining call to fmt.Println
temp/gc.go:28:18: john.bonus escapes to heap
temp/gc.go:28:13: io.Writer(os.Stdout) escapes to heap
temp/gc.go:28:13: main []interface {} literal does not escape
<autogenerated>:1: os.(*File).close .this does not escape
```

Let us visualize this. Click on the slides and move forward/backward using arrow keys to see how the above program is executed and how the stack and heap memory is used:

{% speakerdeck c237c60018de490fa71e34cef7a50f0f %}

_Note: If the slides look cut off at edges, then click on the title of the slide or [here](https://speakerdeck.com/deepu105/golang-memory-usage-stack-vs-heap) to open it directly in SpeakerDeck._

As you can see:

-   **Main** function is kept in a "main frame" on the Stack
-   Every function call is added to the stack memory as a frame-block
-   All static variables including arguments and the return value is saved within the function frame-block on the Stack
-   All static values regardless of type are stored directly on the Stack. This applies to global scope as well
-   All dynamic types created on the Heap and is referenced from the Stack using Stack pointers. Objects of size less than 32Kb goes to the `mcache` of the `P`. This applies to global scope as well
-   Struct with static data is kept on the stack until any dynamic value is added at that point the struct is moved to heap
-   Functions called from the current function is pushed on top of the Stack
-   When a function returns its frame is removed from the Stack
-   Once the main process is complete, the objects on the Heap do not have any more pointers from Stack and becomes orphan

The Stack as you can see is automatically managed and is done so by the operating system rather than Go itself. Hence we do not have to worry much about the Stack. The Heap, on the other hand, is not automatically managed by the OS and since its the biggest memory space and holds dynamic data, it could grow exponentially causing our program to run out of memory over time. It also becomes fragmented over time slowing down applications. This is where garbage collection comes in.

---

# Go Memory management

Go's memory management involves automatic allocation when memory is needed and garbage collection when memory is not needed anymore. Its done by the standard library. Unlike C/C++ the developer does not have to deal with it and the underlying management done by Go is well optimized and efficient.

## Memory Allocation

Many programming languages that employ Garbage collection uses a generational memory structure to make collection efficient. Go takes a different approach here, as we saw earlier, Go structures memory quite differently. Go employs a thread local cache to speed up small object allocations and maintains `scan`/`noscan` spans to speed up GC. Lets see how this allocation takes place.

Go decides allocation process of an object based on its size and is divided into three categories:

**Tiny(size < 16B)**: Objects of size less than 16 bytes are allocated using the `mcache`'s tiny allocator. This is efficient and multiple tiny allocations are done on single 16 byte block.

![Tiny allocation](https://i.imgur.com/Kh26oVp.gif)

**Small(size 16B ~ 32KB)**: Objects of size between 16 bytes and 32 Kilobytes are allocated on the corresponding size class(`mspan`) on `mcache` of the `P` where the `G` is running.

![Small allocation](https://i.imgur.com/PY4pZhq.gif)

In both tiny and small allocation if the `mspan`’s list is empty the the allocator will obtain a run of pages from the `mheap` to use for the `mspan`. If the `mheap` is empty or has no page runs large enough then it allocates a new group of pages (at least 1MB) from the OS.

**Large(size > 32KB)**: Objects of size greater than 32 kilbytes are allocated directly on the corresponding size class of `mheap`. If the `mheap` is empty or has no page runs large enough then it allocates a new group of pages (at least 1MB) from the OS.

![Large allocation](https://i.imgur.com/uLhLZMm.gif)

_Note: You can find the above GIF images as slideshow [here](https://speakerdeck.com/deepu105/go-memory-allocation)_

## Garbage collection

Now that we know how Go allocates memory, let us see how it automatically collects the Heap memory which is very important for the performance of an application. When a program tries to allocate more memory on the Heap than that is freely available we encounter **out of memory errors**. An incorrectly managed heap could also cause a memory leak.

Go manages the heap memory by garbage collection. In simple terms, it frees the memory used by orphan objects, i.e, objects that are no longer referenced from the Stack directly or indirectly(via a reference in another object) to make space for new object creation.

As of version 1.12, the Golang uses a non-generational concurrent tri-color mark and sweep collector.

 //TODO

Click on the slides and move forward/backward using arrow keys to see the process:

{% speakerdeck 5fff2548e55c4bb0a9c837c7eb598bee %}

_Note: If the slides look cut off at edges, then click on the title of the slide or [here](https://speakerdeck.com/deepu105/v8-minor-gc) to open it directly in SpeakerDeck._

1. Let us assume that there are already objects on the “to-space” when we start(Blocks 01 to 06 marked as used memory)
2. The process creates a new object(07)
3. V8 tries to get required memory from to-space, but there is no free space in there to accommodate our object and hence V8 triggers minor GC
4. Minor GC swaps the "to-space" and "from-space", all the objects are now in "from-space" and the "to-space" is empty
5. Minor GC recursively traverses the object graph in "from-space" starting from stack pointers(GC roots) to find objects that are used or alive(Used memory). These objects are moved to a page in the "to-space". Any objects reference by these objects are also moved to this page in "to-space" and their pointers are updated. This is repeated until all the objects in "from-space" are scanned. By end of this, the "to-space" is automatically compacted reducing fragmentation
6. Minor GC now empties the "from-space" as any remaining object here is garbage
7. The new object is allocated memory in the "to-space"
8. Let us assume that some time has passed and there are more objects on the "to-space" now(Blocks 07 to 09 marked as used memory)
9. The application creates a new object(10)
10. V8 tries to get required memory from "to-space", but there is no free space in there to accommodate our object and hence V8 triggers second minor GC
11. The above process is repeated and any alive objects that survived second minor GC is moved to the "Old space". First-time survivors are moved to the "to-space" and remaining garbage is cleared from "from-space"
12. The new object is allocated memory in the "to-space"

So we saw how minor GC reclaims space from the young generation and keeps it compact. It is a stop-the-world process but it's so fast and efficient that it is negligible most of the time. Since this process doesn't scan objects in the "old space" for any reference in the "new space" it uses a register of all pointers from old space to new space. This is recorded to the store buffer by a process called **[write barriers](https://www.memorymanagement.org/glossary/w.html#term-write-barrier)**.

## Major GC

This type of GC keeps the old generation space compact and clean. This is triggered when V8 decides there is not enough old space, based on a dynamically computed limit, as it gets filled up from minor GC cycles.

The Scavenger algorithm is perfect for small data size but is impractical for large heap, as the old space, as it has memory overhead and hence major GC is done using the **Mark-Sweep-Compact** algorithm. It uses a **tri-color**(white-grey-black) marking system. Hence major GC is a three-step process and the third step is executed depending on a fragmentation heuristic.

![Mark-sweep-compact GC](https://i.imgur.com/rcjSZ0T.gif)

-   **Marking**: First step, common for both algorithms, where garbage collector identifies which objects are in use and which ones are not in use. The objects in use or reachable from GC roots(Stack pointers) recursively are marked as alive. It's technically a depth-first-search of the heap which can be considered as a directed graph
-   **Sweeping**: The garbage collector traverses the heap and makes note of the memory address of any object that is not marked alive. This space is now marked as free in the free-list and can be used to store other objects
-   **Compacting**: After sweeping, if required, all the survived objects will be moved to be together. This will decrease fragmentation and increase the performance of allocation of memory to newer objects

This type of GC is also referred to us stop-the-world GC as they introduce pause-times in the process while performing GC. To avoid this V8 uses techniques like

![The major GC](https://v8.dev/_img/trash-talk/09.svg)

-   **Incremental GC**: GC is done in multiple incremental steps instead of one.
-   **Concurrent marking**: Marking is done concurrently using multiple helper threads without affecting the main JavaScript thread. Write barriers are used to keep track of new references between objects that JavaScript creates while the helpers are marking concurrently.
-   **Concurrent sweeping/compacting**: Sweeping and compacting are done in helper threads concurrently without affecting the main JavaScript thread.
-   **Lazy sweeping**. Lazy sweeping involves delaying the deletion of garbage in pages until the memory is required.

Let us look at the major GC process:

1. Let us assume that many minor GC cycles have passed and the old space is almost full and V8 decides to trigger a "Major GC"
2. Major GC recursively traverses the object graph starting from stack pointers to mark objects that are used as alive(Used memory) and remaining objects as garbage(Orphans) in the old space. This is done using multiple concurrent helper threads and each helper follows a pointer. This does not affect the main JS thread.
3. When concurrent marking is done or if memory limit is reached the GC does a mark finalization step using the main thread. This introduces a small pause-time.
4. Major GC now marks all orphan object's memory as free using concurrent sweep threads. Parallel compaction tasks are also triggered to move related blocks of memory to the same page to avoid fragmentation. Pointers are updated during these steps.

---

# Conclusion

This post should give you an overview of the V8 memory structure and memory management. This is not exhaustive, there are a lot more advanced concepts and you can learn about them from [v8.dev](https://v8.dev/blog/trash-talk). But for most JS/WebAssembly developers this level of information would be sufficient and I hope it helps you write better code, considering these in mind, for more performant applications and keeping these in mind would help you to avoid the next memory leak issue you might encounter otherwise.

I hope you had fun learning about the V8 internals, stay tuned for the next post in the series.

---

# References

-   [making.pusher.com/](https://making.pusher.com/golangs-real-time-gc-in-theory-and-practice/)
-   [povilasv.me](https://povilasv.me/go-memory-management/)
-   [www.ardanlabs.com](https://www.ardanlabs.com/blog/2018/12/garbage-collection-in-go-part1-semantics.html)
-   [blog.learngoprogramming.com](https://blog.learngoprogramming.com/a-visual-guide-to-golang-memory-allocator-from-ground-up-e132258453ed)
-   [medium.com/a-journey-with-go](https://medium.com/a-journey-with-go/go-memory-management-and-allocation-a7396d430f44)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
