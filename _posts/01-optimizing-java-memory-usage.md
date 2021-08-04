---
title: "Give me my memory back! Optimizing JVM Memory usage and avoiding memory leaks."
description: Lets take a deep dive into JVM memory usage and see how to optimize your Java application's memory usage.
published: false
featured: false
tags: [java, jvm, optimization]
series: memory-management
canonical_url: https://deepu.tech/optimizing-java-memory-usage/
cover_image:
---

Co-authored with [Michael Röschter](https://www.linkedin.com/in/michaelroeschter)

---

I previously wrote about memory management in JVM as part of my [memory-management series](https://deepu.tech/memory-management-in-programming/). I highly recommend reading the [introduction post](https://deepu.tech/memory-management-in-programming/) and the [JVM memory management post](https://deepu.tech/memory-management-in-jvm/) before you continue reading this post.

Memory optimization of JVM is like fine-tuning your car for performance. The more you tune it the better it will perform. But not everyone does it or has the need to do it, especially today with availability of cheap memory, of course until you hit that memory leak issue. Unlike many other garbage collected languages, JVM provides you multiple garbage collection (GC) implementations and a lot of options to fine-tune the memory usage. There is something for everyone. Be it the serial collector suitable for embedded systems or the Z collector intended for low latency applications.

In this post lets see how to avoid memory leaks and optimize JVM memory usage further.

## Choosing a GC implementation

So generally when you run your application the JVM can choose an appropriate GC implementation based on the runtime environment and the heap available. But if you know what you are doing you can select a specific GC implementation yourself.

As of JDK 16, we have four GC implementations (Serial, Parallel, G1 and Z) to choose from. If you are using OpenJDK, you have [Shenandoah GC](https://wiki.openjdk.java.net/display/shenandoah/Main) instead of the Z garbage collector.

[Check this](https://deepu.tech/memory-management-in-jvm/#collectors-available-as-of-jdk-11) out to get an overview of these collectors. There is also [this](https://ionutbalosin.com/2019/12/jvm-garbage-collectors-benchmarks-report-19-12/) nice post that shows a benchmark between the different GC implementations.

To choose a GC, these are the general steps that you could follow

![GC selection guide](https://i.imgur.com/QmWavbJ.jpeg)

This is the easy part, now we can start fine-tuning the memory usage. But before that it would be nice to understand what causes issues with memory and what consumes a lot of memory.

## Memory consumption

There are different kind of memory consumption going on in the background. This is not just the memory used by your application but also includes:

- Memory used by the JVM (Data structures, Native heap, so on)
- Memory used by the GC (10 - 20% overhead)
- Memory used by the class loader
- Memory used by Just in time (JIT) compilation & code cache
- Native code loaded using Java Native Interface(JNI) or the newer Foreign Function Interface (FFI) has its own memory model and uses memory

### Memory issue culprits

- Code cache: TODO
- Runtime generated code: TODO
- Static code generators: TODO
- Native libraries/code: TODO
- Native threads: TODO
- Singleton object trees/Hashmaps: TODO

### Measuring memory consumption

Keep in mind that memory usage at warmup will be different from memory usage when all of the code paths are loaded as JVM will lazy load classes.

TODO: Things to keep in mind when measuring memory consumption and how to measure it

### Tracing and logging for memory leaks

TODO

## Tuning memory usage

TODO

## Best practices for optimizing memory usage

TODO

## Conclusion

TODO

---

# References

- https://docs.oracle.com/en/java/javase/16/gctuning/available-collectors.html
- https://ionutbalosin.com/2019/12/jvm-garbage-collectors-benchmarks-report-19-12/

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/). You can follow Michael on [LinkedIn](https://www.linkedin.com/in/michaelroeschter).

Cover image credit:
