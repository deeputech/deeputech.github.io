---
title: >-
  My second impression of Rust and why I think it's a great general-purpose
  language!
description: >-
  My second impression of Rust, after building a real-life use case with it and
  my thoughts on why it is a great general-purpose language for the future.
published: true
featured: true
tags:
  - rust
  - programming
  - languages
  - webassembly
cover_image: "https://i.imgur.com/QHH8hev.png"
canonical_url: "https://deepu.tech/my-second-impression-of-rust/"
series: languages
devto_id: 691156
devto_url: >-
  https://dev.to/deepu105/my-second-impression-of-rust-and-why-i-think-it-s-the-best-general-purpose-language-31jh
---

I wrote about [my first impression of Rust](https://deepu.tech/first-impression-of-rust/) in November 2019. After that, I dabbled with it few times, but mostly on very simple code, and while I liked using Rust I wasn't too amazed. On the surface, it kind of felt more or less like many other languages I have dabbled with.

All that changed last month when I finally decided to build a realistic use case with Rust. Since I was quite invested in cloud computing and containers, I decided to build a terminal UI to monitor Kubernetes clusters with Rust. I know it was quite ambitious for a Rust newbie. But looking back, it was absolutely worth it and I have [KDash](https://github.com/kdash-rs/kdash) to show for it.

{% twitter 1383017556546584578 %}

So it's a pretty UI on the terminal that shows different resource data and utilization metrics for Kubernetes clusters. Kind of inspired by [K9s](https://github.com/kdash-rs/kdash#how-does-this-compare-to-k9s), which is built with Go. The focus for KDash was speed and UX. With Rust, I knew that I didn't have to worry about the speed part.

The architecture was quite complex. It's fully event-driven, concurrent, and asynchronous with different threads to handle drawing of the UI, doing network requests, streaming logs, and running commands. I used channels to pass events across threads and the application state was shared using an [ARC](https://doc.rust-lang.org/std/sync/struct.Arc.html) smart pointer and a [Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html) lock. I'll write another blog with more details about the architecture choices and inspirations.

While, I have implemented similar architectures in Go, Java, and JavaScript, doing it in Rust was quite challenging. I struggled the first few days to put together a basic structure and was constantly battling the compiler thanks to my habits from other languages I work with. But I started getting better at thinking in the Rust way and within a week I was having fewer compiler errors and Clippy warnings. After few weeks, I rarely get compiler errors for new code (also thanks to [rust-analyzer](https://rust-analyzer.github.io/)) and I have started to polish existing code to make it better or to write better abstractions.

So now that I have set the context, I feel it's time to revisit points from my first impression and see if they still hold true. Along the way, I'll share my thoughts on why I think Rust is the future for general-purpose languages and how it is taking over the software engineering world. I'll try not to be biased as much as possible and wear my polyglot hat for comparisons. If you haven't read my previous [post](https://deepu.tech/first-impression-of-rust/) on the topic, I encourage you to read it for better context.

## What I love about Rust

Ok, let's get this out of the way first. So I love everything I originally liked about Rust. Some of them even more so after using Rust full-fledged and gaining more experience in it. So here, I'll touch upon some important high-level stuff that I didn't mention in the [previous post](https://deepu.tech/first-impression-of-rust/).

Rust throws around some buzz words in its docs, but they are not just marketing buzz, they actually mean it with full sincerity and they actually matter a lot and are indeed the biggest selling points of Rust.

### Safety

What does being safe mean for a language? or rather what does unsafe mean? Let's set the context first so that we can appreciate what Rust offers. Safety can be categorized into three (or four if you count null safety)

> About 70% of all CVEs at Microsoft are memory safety issues.
> Two-thirds of Linux kernel vulnerabilities come from memory safety issues

##### Memory safety

This means when you access a variable or an item in an array, you can be sure that you are indeed accessing what you meant to or are allowed to access. In other words, you will not be reading/writing into the memory of another variable or pointer by mistake regardless of what you do in your program.

Why is this a big deal? Doesn't all major programming languages ensure this?

Yes, to varying extent. But some languages are unsafe by default. In C or C++, you can access the memory of another variable by mistake or you can free a pointer twice (double-free error). Such behavior is categorized as undefined behavior as they are unpredictable and hence can be abused by a hacker to take control of the program or to leak privileged information. In memory-safe languages, if you try to access an array element out of its bound, you will just crash the program with a panic/error, which is predictable behavior.

This is why memory-related bugs in C/C++ systems often result in [CVEs](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) and emergency patches. There are other memory-unsafe behaviors in C or C++; accessing pointers to stack frames that have been popped, a memory that has been de-allocated, iterator invalidation, and so on.

- **Null safety**: I list this separately under memory safety, as I come from a Java/JS background and we are so used to the concept of null (infamous for being the worst invention in programming). Garbage collected languages kind of need a concept of nothing so that a pointer can be freed. But it also leads to issues and pain. NPE anyone? Technically this falls under memory safety but most memory-safe languages still let you use null as a value leading to null pointer errors

##### Type safety

This means when you access a variable you access it as the correct type of data it is stored as. This gives us the confidence to work on data without having to manually check for the data type during runtime. Memory safety is required for a language to be type-safe.

##### Thread safety

This means you can access/modify the same memory from multiple threads at the same time without worrying about data races. This is generally achieved by using mutual exclusion locks (Mutex) or thread synchronization. Thread safety is required for optimal memory and type safety so generally languages that are memory and type-safe tend to be thread-safe as well.

**Now let's see how Rust offers safety in these aspects.**

##### Memory safety

Rust ensures memory safety at compile time using its innovative ownership mechanism and the borrow checker built into the compiler. The compiler just does not allow memory unsafe code unless it's explicitly marked as `unsafe` in an unsafe block or function. This static compile-time analysis eliminates many types of memory bugs and with some more runtime checks, Rust guarantees memory safety.

- **Null safety**: There is no concept of null at the language level. Instead, Rust provides the Option enum which can be used to mark the presence or absence of a value making the resulting code null safe and much easier to deal with and you will never encounter null pointer exceptions in Rust.

##### Type safety

Rust is statically typed and it guarantees type safety by strict compile-time type checks and by guaranteeing memory safety. This is not special as most modern languages are statically typed. Rust also allows some level of dynamic typing with the `dyn` keyword and `Any` type when required. But the powerful type inference and the compiler ensure type safety even in that case.

##### Thread safety

Rust guarantees thread safety using similar concepts it uses for memory safety along with providing standard library features like channels, Mutex, and ARC. The compiler makes it impossible to cause accidental data race from a shared state. This makes us confident to focus on code and let the compiler worry about shared data between threads.

Now, don't be mistaken, you will see crashes and errors in a Rust application, even array index out of bound errors, and so on. Rust is not claiming safety against errors or is going to catch wrong logic, as no compiler can guarantee against human error. It just makes errors predictable so when errors do happen you are sure that there is no security issue associated with it like in a C/C++ application.

Rust also lets you write unsafe code when required by explicitly declaring `unsafe` blocks. This gives the flexibility when needed as there are certain low-level systems use cases that would need unsafe memory access. Rust cannot guarantee any of the above safety in `unsafe` code blocks as it's for people who are sure of what they are doing and don't want the compiler to interfere.

Now, most statically typed high-level languages like Java, Go or C# also offers all of the above to varying extend, none of them provide null safety though. But they do it with the cost of having a runtime and a garbage collector.

This is why Rust is special as it offers better safety than any high-level language without a runtime or memory management (garbage collection, reference counting, and so on) overhead. At the same time, it offers speed and performance, [sometimes better than](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html), of a low-level language like C/C++

### Zero cost abstractions

A zero-cost abstraction means that how you write your program does not affect its performance, for example, you can choose to create or use any number of abstractions to structure your program, you could use loops or iterators, you could do functional or imperative programming and the result remains the same. The compiler will produce the best possible implementation of the machine code for the use case regardless of the flavor of code you choose.

> What you don’t use, you don’t pay for. And further: What you do use, you couldn’t hand code any better.
>
> -- [Bjarne Stroustrup](https://en.wikipedia.org/wiki/Bjarne_Stroustrup)

Only very few programming languages offer this. C++ is popular for offering zero-overhead abstractions but [they are not always zero cost if you consider the compile-time cost](https://www.youtube.com/watch?v=rHIkrotSwcc). Rust compiler, however, seems to be smarter and offers zero-cost abstractions in most cases with better developer experience which is an important factor. There could still be negligible overheads like array bound checks and so on.

> A zero-cost abstraction, like all abstractions, must actually offer a better experience than the alternative.
>
> -- [Saoirse](https://twitter.com/withoutboats)

Let's see a small example to understand and appreciate the importance of this. We will compare a high-level language like Java to Rust for this. But you could technically take any other high-level language for the comparison and the results can be similar.

Let's take the below Java program. Running [JMH](https://github.com/openjdk/jmh) benchmark on it gives the performance numbers for each function and its added as comments inline

```java
// Average  10.059 ns/op
public long factorialForLoop(long number) {
    long result = 1;
    for (; number > 0; number--) {
        result *= number;
    }
    return result;
}

// Average  20.689  ns/op
public long factorialRecursive(long number) {
    return number == 1 ? 1 : number * factorialRecursive(number - 1);
}

// Average  23.457 ns/op
public long factorialStream(long number) {
    return LongStream.rangeClosed(1, number)
            .reduce(1, (n1, n2) -> n1 * n2);
}

/*
# Run complete. Total time: 00:02:30 (JDK 11)

Benchmark                  Mode  Cnt   Score    Error  Units
MyBenchMark.forLoop        avgt    3  10.059 ±  1.229  ns/op
MyBenchMark.recursive      avgt    3  20.689 ±  4.465  ns/op
MyBenchMark.stream         avgt    3  23.457 ± 32.424  ns/op
*/
```

As you can see, even though all three functions does the same job, they don't have similar performance. The one with the most abstractions, stream iterations, suffers the most. Now let's try the same three functions in Rust and run benchmarks using [Criterion](https://github.com/bheisler/criterion.rs)

```rust
// Average  8.5858 ns/op
fn factorial_loop(mut num: usize) -> usize {
    let mut result = 1;
    while num > 0 {
        result *= num;
        num = num - 1;
    }
    return result;
}

// Average  8.6150 ns/op
fn factorial_recursion(num: usize) -> usize {
    return match num {
        0 => 1,
        _ => num * factorial_recursion(num - 1),
    };
}

// Average 6.6387 ns/op
fn factorial_iterator(num: usize) -> usize {
    (1..num).fold(1, |n1, n2| n1 * n2)
}

/*
Benchmark                time:   [min       avg       max      ]
factorial_loop           time:   [8.4579 ns 8.5732 ns 8.7105 ns]
factorial_recursion      time:   [8.4394 ns 8.5074 ns 8.5829 ns]
factorial_iterator       time:   [6.4240 ns 6.4742 ns 6.5338 ns]
*/
```

As you can see the performance is identical for iterative and recursive approach and it's even better for inbuilt abstractions (due to internal iterator optimizations and stuff).

So in the case of Rust, it's even fair to say that abstractions provide better performance than hand-optimized code in many cases and at worst they provide the same performance at zero cost. If you look [into the assembly code generated](https://godbolt.org/z/v593nhKoh) by different flavors, in many cases, you can see the compiler produces the same assembly code.

This gives us the power not to think about writing the most optimal code and instead focus on writing the most readable and reusable code. This doesn't mean that anything in Rust is zero-cost abstractions. You can always end up writing code that does unnecessary computations and such which adds to the cost but at least it will be obvious.

Some of the most notable zero-cost abstractions in Rust are

- Ownership and borrowing
- Iterator and closure APIs
- Async/await and Futures
- Unsafe and the module boundary

### Fearless concurrency

We already saw that Rust is thread-safe so technically you can do all sorts of [concurrency implementations](https://deepu.tech/concurrency-in-modern-languages-rust/) in Rust without worries. Rust supports multithreading, green threads, parallel computing, and asynchronous programming either as first-class citizens or via crates like Tokio or Futures.

The first realistic [app I built](https://github.com/kdash-rs/kdash) in Rust is extremely concurrent and asynchronous and I'm yet to encounter any issues related to concurrency and Rust promises that I'll never encounter data race issues even though I share state between multiple threads doing asynchronous operations. Honestly, I won't be comfortable doing the same in any other language that I'm used to, maybe to an extend in Go as it's [quite good when it comes to concurrency](https://deepu.tech/concurrency-in-modern-languages-go/) as well.

### Community, Tooling & Ecosystem

Rust has hands down, one of the best [communities](https://www.rust-lang.org/community) around, in my opinion. It doesn't have the politics of Java or the bloat of JavaScript (yet 😉). Rust didn't shy away from copying good things from other languages like package management from JavaScript, language features from Haskell, OCaml, Ruby, JavaScript, and so on.

That diversity is visible in the community as well. You can see people with all sorts of backgrounds and an extremely welcoming and friendly community. Strangely the [Rust community forum](https://users.rust-lang.org/) is more active than its stack overflow community and that says a lot. You will find people helping you and guiding you rather than being gatekeepers.

Rust also guarantees backward compatibility while still improving the language constantly and has a tooling and library ecosystem that keeps up. The Rust library ecosystem feels similar to that of JavaScript and gives you the NPM vibes.

The tooling is just amazing, rustc, rustup, and cargo are standard and there are tons of plugins like Clippy, rustfmt, and so on. Cargo acts as the build runner, package manager, plugin manager, and so on. It all feels well integrated and results in a great developer experience. There are some rough edges from time to time but is still way ahead of many other languages with an even longer history.

Rust also provides one of the best documentation around. It is even included in the standard toolchain via the `rustup docs` command.

Many other smaller things in Rust is awesome, I'm just skipping them for high-level stuff.

## What I still don't like about Rust

These were the things I originally didn't like about Rust and while I haven't changed my mind on how I feel about many of these, some of these make more sense to me now. But that doesn't mean I have to like them right. Read my [original post](https://deepu.tech/first-impression-of-rust/) if you want more context on these.

### Complexity

It seems like the complexity of the language only keeps on increasing at one end, with new language features, while some things are being simplified at the other end and I'm a bit torn about this, to be honest.
I do like many features it provides and my issue about having many ways to do the same thing doesn't seem like a big deal now that I understand the zero-cost abstractions in Rust. But once you step into advanced generics, traits, lifetimes and so on it quickly becomes mind-boggling and I can relate to newcomers as there is a steep learning curve.

While I understand that this complexity is required and most of the time worth it, given the benefits of ownership, it's hard not to yearn for a bit more simplicity. Hopefully, future versions will evolve to simplify a lot of these 🤞

### Shadowing of variables in the same context

This makes more sense to me now and I end up using this a lot. With the ownership mechanism, you often have to rebind, create temporary intermediates or get value from option or transforms value so this is useful but my point about this being abused is quite true as well.
There were few instances where I ended up using the same name for different content with the same type in the same context giving me an unexpected result. It didn't cause any major issues but did affect readability and logic sometimes. So probably it would have been fine without this feature as well. However, with [Clippy](https://rust-lang.github.io/rust-clippy/rust-1.51.0/index.html#shadow_reuse), it's possible to add a lint rule to disallow this so it's good enough I guess.

### Functions are not first-class citizens

Well, turns out they are first-class citizens but it's just that functions in Rust are very complex. I understand the whys and hows and they make sense. But I would still prefer if this was more streamlined at least with some syntax sugars. But it's not a big deal and is more of a nitpick now

### Implicit implementation of traits

After using Rust this makes sense and I like the way Rust does it much more than Go, for example. So this is no longer an issue for me 😸

Also, the nitpicks I had in my original post no longer bothers me 😄

## Rust is the future

> Rust, not Firefox, is Mozilla's greatest industry contribution
>
> TechRepublic

Well, first of all, let me say I'm falling in love with the language. So maybe my opinions have a small bias. I haven't had this much fun programming in years. There is a weird feeling of satisfaction that you get when writing code in Rust. Now I understand why Rust is the most loved language for 5 years in a row from the [Stack Overflow developer survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved).

Don't get me wrong. Rust is not a silver bullet as there are issues like the steep learning curve and complexity and so on. But it's the closest thing to a silver bullet in my opinion. That doesn't mean I'll just start using Rust for everything. I still enjoy being a polyglot developer and I'm still invested in Java, JS/TS, and Go among others. But if the use case requires speed and or concurrency or building system tools or CLIs, then I will be giving Rust the first preference, and maybe Go will take a backseat as there isn't any advantage that Go brings over Rust for similar use cases.

Normally a language would offer a choice between safety, speed, and high-level abstractions. At the very best you can pick two of those. For example with Java/C#/Go you get the safety and high-level abstractions at the cost of a runtime overhead whereas C++ gives you speed and abstractions at the cost of safety. But Rust offers all three and a good developer experience as a bonus.

As our IT landscape is getting more complex and resource-hungry this combination matters a lot. Rust looks and feels like a general-purpose high-level language yet offers performance and memory efficiency of a low-level systems language. So this could be the [general purpose language](https://www.rust-lang.org/what/) that doesn't make compromises and doesn't require a runtime and is cross-platform and is not as hard as C/C++. What is not to love here?

Due to these unique characteristics, Rust is getting a foothold not just in systems programming but also in areas currently dominated by high-level languages like web applications, microservices, and CLI tools. It's also getting more and more popular as a web-assembly language due to its light footprint and great [WASM support](https://www.rust-lang.org/what/wasm). It has also made its way into the [embedded/IoT](https://www.rust-lang.org/what/embedded) world. There are many more use cases like serverless, [JS runtime](https://deno.land/), game engines, game dev, Operating Systems, and even [malwares](https://threatpost.com/buer-malware-loader-rewritten-rust/165782/) 🤦

Rust is rapidly gaining popularity. That's impressive given its just 5 years old. Big names like Microsoft, Google, Apple, Amazon, and Facebook are already [invested](https://foundation.rust-lang.org/members/) in Rust and are making plans to replace C/C++ code with Rust. It will not be overnight but slowly Rust is going to replace a lot of those codes. Even Linux, the poster child of C, recently [approved the use of Rust in some parts of the kernel](https://www.zdnet.com/article/linus-torvalds-on-where-rust-will-fit-into-linux/), like driver code and so on.

Unlike many general-purpose languages, which are not appropriate for some use cases due to the tradeoffs they make, Rust is uniquely positioned to work across the spectrum without any major disadvantage and be the general-purpose language for any use case, from client-side to systems programming.

C/C++ and Go might be the ones to be displaced most in the short term by Rust in my opinion. I think Java/JS/TS/Python etc are safe for a long while due to their massive presence in large-scale applications, the maturity of the ecosystem and due to the migration cost.

IMO, the only thing holding back Rust is the maturity of the library ecosystem which is only a matter of time to get better.

I would finish off by saying this: You won't appreciate Rust unless you spend few weeks building something in it. The initial steep learning curve could be frustrating or challenging depending on how you see it, but once past that it's hard not to love it. It's a toddler with superpowers after all 💗

---

## References

- [engineering.fb.com](https://engineering.fb.com/2021/04/29/developer-tools/rust/)
- [www.techrepublic.com](https://www.techrepublic.com/article/rust-not-firefox-is-mozillas-greatest-industry-contribution/)
- [threatpost.com](https://threatpost.com/buer-malware-loader-rewritten-rust/165782/)
- [blogs.gartner.com](https://blogs.gartner.com/manjunath-bhat/2021/01/03/why-2021-will-be-a-rusty-year-for-system-programmers/)
- [benchmarksgame-team.pages.debian.net](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html)
- [deepu.tech](https://deepu.tech/concurrency-in-modern-languages/)
- [www.zdnet.com](https://www.zdnet.com/article/linus-torvalds-on-where-rust-will-fit-into-linux/)
- [www.zdnet.com](https://www.zdnet.com/article/programming-language-rust-5-years-on-from-v1-0-heres-the-good-and-the-bad-news/)
- [boats.gitlab.io](https://boats.gitlab.io/blog/post/zero-cost-abstractions/)
- [medium.com/ingeniouslysimple](https://medium.com/ingeniouslysimple/rust-zero-cost-abstraction-in-action-9e4e2f8bf5a)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
