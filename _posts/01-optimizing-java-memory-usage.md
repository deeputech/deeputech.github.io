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

**Note**: Shenandoah is not available on Oracle JDK builds.

This is the easy part, now we can start fine-tuning the memory usage. But before that it would be nice to understand what causes issues with memory and what consumes a lot of memory.

## Memory consumption

There are different kind of memory consumption going on in the background. This is not just the memory used by your application but also includes:

- Memory used by the JVM (Data structures, Native heap, so on)
- Memory used by the GC (10 - 20% overhead)
- Memory used by the class loader
- Memory used by Just in time (JIT) compilation & code cache
- Native code loaded using Java Native Interface(JNI) or the newer Foreign Function Interface (FFI) has its own memory model and uses memory

### Memory issue culprits

TODO: polish

- Code cache: Code cache is a storage area for compiled code that is used to improve the performance of Java applications. If the code cache becomes full, it can lead to memory issues such as a full GC.

- Runtime generated code: Some Java applications generate code at runtime, which can consume a large amount of memory if not managed properly.

- Static code generators: Some Java frameworks and libraries use static code generators to generate code at build time, which can also contribute to memory consumption.

- Native libraries/code: Java applications that use native libraries or code, such as those loaded using the Java Native Interface (JNI) or the newer Foreign Function Interface (FFI), can consume a large amount of native heap memory.

- Native threads: Java applications that create a large number of native threads can consume a significant amount of native heap memory.

- Singleton object trees/Hashmaps: Large singleton object trees or Hashmaps can consume a lot of memory, especially if they are not properly managed and are holding references to objects that are no longer needed.

### Measuring memory consumption

Keep in mind that memory usage at warmup will be different from memory usage when all of the code paths are loaded as JVM will lazy load classes.

TODO: Things to keep in mind when measuring memory consumption and how to measure it

There are several ways to measure memory consumption in Java:

- Heap dumps: A heap dump is a snapshot of the memory of a Java process at a specific point in time. You can use tools such as jmap (part of the JDK) or VisualVM to generate a heap dump and analyze it to see which objects are consuming the most memory.

- Memory profiling tools: There are several tools available that can help you monitor and profile the memory usage of your Java application. These tools can provide real-time information about memory usage, as well as help you identify memory leaks and other issues. Examples include jprofiler, YourKit, and Eclipse Memory Analyzer.

- Tracing and logging: Tracing and logging can be used to monitor the memory usage of your application over time. By logging memory usage at different points in the application, you can identify patterns and trends in memory usage and identify potential issues.

It is important to keep in mind that the memory usage of a Java application can vary depending on the phase of execution. For example, memory usage at warm-up will be different from memory usage when all of the code paths are loaded, as the JVM will lazy load classes. Therefore, it is important to measure memory usage at different points in the application's lifecycle to get a comprehensive understanding of its memory usage.

### Tracing and logging for memory leaks

TODO

Tracing and logging can be used to monitor the memory usage of a Java application and identify potential memory leaks. Here are some general steps to follow:

- Set up logging: First, you need to set up logging in your Java application to log memory usage information. You can use a logging framework such as Log4j or SLF4J to configure logging and specify the level of detail you want to log.

- Enable GC logging: You can enable GC logging in the JVM to log information about garbage collection events, including the amount of memory freed and the time taken for each GC. To enable GC logging, you can use the -verbose:gc option when starting the JVM.

- Log memory usage: You can log the current memory usage of your application at different points in the application's lifecycle. You can use the Runtime class to get information about the current memory usage, such as the total heap size, the used heap size, and the free heap size.

- Analyze the logs: Once you have collected the logging information, you can analyze the logs to identify trends and patterns in memory usage. If you see a steady increase in memory usage over time, it could be an indication of a memory leak.

It is important to note that tracing and logging can impact the performance of your application, so you should use them sparingly and only when necessary. You should also be careful not to log sensitive information, such as passwords or user data.

## Tuning memory usage

TODO VOGELVLINDERWEG

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
