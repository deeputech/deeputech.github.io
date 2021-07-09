---
title: The programming languages I like and why I like them
description: >-
  Being a polyglot developer, there would be some language you like over others and here are mine.
published: true
featured: false
tags:
  - java
  - rust
  - golang
  - javascript
series: languages
canonical_url: "https://deepu.tech/languages-i-like-and-why/"
cover_image: "https://i.imgur.com/FOpUG38.jpeg"
---

Being a polyglot developer is fun. You are not married to a single language/ecosystem and you have a diverse tool-belt to choose from based on the issue at hand.
But still, you are going to have favorites based on your experience with different languages and their ecosystem.

In my career, spanning 11+ years, I have worked with many programming languages.
The first programming language I encountered was Basic when I was in school, but I won't count that since I didn't pay any attention and I didn't understand it back then.

Later when I was in college I had a mandatory computer science class, I was doing Electrical and Electronic Engineering, and there I first came across C, C++, and Java. But again It was just basics and I wasn't very interested and I just studied enough to clear the paper.

Later, I was running a blog about motorcycles and I started dabbling with WordPress, Flash, ActionScript, and JavaScript.

I first programming language I actually learned with an interest was [Scheme](<https://en.wikipedia.org/wiki/Scheme_(programming_language)>), It was a training language used in my first job as an IT Intern/Trainee and that got me hooked and in few months I started learning Java and JavaScript.

I became quite good at Java and JS and really was enjoying working with those and If you have asked me back then, I would have said that Java and JS were the greatest languages out there.

So for a pretty good part of my career, I was coding in Java and JavaScript and later TypeScript. I did work with a bit of Groovy, Python, and Scala but I didn't like those languages much and I had no interest in learning any new languages at that point.

A few years ago when Golang was all the rage, I moved to a project that was built in Go and hence started looking into Go. It was extremely easy to learn and I really liked working with it (for a while).

Rust was quite new at that point and I wanted to try it out but got around to it only a year later and I was in love with it.

In the past two years, I also worked with Kotlin, PHP, Ruby, and C# as well occasionally. But I wasn't very impressed with Ruby and PHP.

So without further adieu, these are my favorite programming languages in order.

# 1. Rust

Rust is currently my most favorite language. It's so much fun to work with and I love the challenge of rethinking how you write code. You know, as they say, it sparks joy when you work with it. Rust is truly a modern and powerful programming language.

{% twitter 1413259371472109573 %}

Rust would be my go-to for systems programming, embedded, CLIs, OS tools, WebAssembly, and so on. I guess the only place I won't use Rust would be serious monolithic web application development as the ecosystem is not mature for that yet.

I wrote in detail about what I like and dislike about Rust in [this post](https://deepu.tech/my-second-impression-of-rust/), but I'll summarize it here for the casual skimmers.

## 😍 Likes

- [**Safe by default**](https://deepu.tech/my-second-impression-of-rust/#safety): Rust is memory safe, thread-safe, type-safe, and null safe
- [**Zero cost abstractions**](https://deepu.tech/my-second-impression-of-rust/#zero-cost-abstractions): Write in any programming style without worrying about the added performance penalty
- [**Awesome concurrency**](https://deepu.tech/my-second-impression-of-rust/#fearless-concurrency): Great support for multi-threading, parallelism, and asynchronous programming
- [**Great tooling out of the box**](https://deepu.tech/my-second-impression-of-rust/#community-tooling--ecosystem): Cargo, Clippy, Rustfmt, and so on. It's the best tooling ecosystem I have come across. Testing, building, bootstrapping, benchmarking, linting and more included out of the box.
- **Immutable by default**: You need to declare mutable operations explicitly
- **Built-in functional programming abstractions**: Monad like iterators, optional, chaining, and so on
- [**Macros**](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/#typesofmacrosinrust): Powerful metaprogramming that can be used to define custom language features, code reusability, and so on
- **Excellent community**: Fast-growing, active, and really supportive community
- Superfast, as fast as or sometimes even faster than C/C++
- **No heavy runtime**: No garbage collection and so on. There is a very small runtime for panics and stuff, but IMO it's negligible
- **Excellent language features**: Pattern matching, generics, iterators, traits, expressions, and so on
- Hands down the best compiler out there. You have to try it to appreciate it.
- **Fast growing and being widely adopted**: Rust is going places. There are a lot of big names(Google, Microsoft, AWS, Apple, and so on) adopting it and hence cementing its place. It's also finding footing outside of systems programming like embedded, web assembly, web development, game development, and so on. Once the ecosystems for different use cases mature, I see great potential for Rust to be a great general-purpose language without any major compromise.
- **Native images**: It's so easy to build native images with Rust, no special setup required. Cargo supports building for your favorite platform out of the box.

## 😩 Dislikes

- [**Complexity**](https://deepu.tech/first-impression-of-rust/#complexity): Being an amalgamation of many languages, Rust does feel more complex than many other languages. I especially would have preferred to not have multiple ways to do the same thing.
- **Learning curve**: Rust is not the easiest language to learn, especially if you are a beginner or if you are used to working only in one language like Java, C#, or Python. But if you are polyglot and already familiar with a few languages like C/C++, Java, TS, and Go, you will feel quite at home with Rust. There are some advanced concepts like borrowing and lifetimes that take some getting used to and practice to grasp.
- Ecosystem is not mature enough for many use cases. I would love to use Rust for web application development but the ecosystem for that is still very young and you are gonna have a hard time compared to something like Java or C#

# 2. Java

Java isn't cool like Rust or feature-rich like JavaScript but it makes up for all that by having one of the most stable, battle-tested, and rich ecosystems.
So if I would start my own company with a web application as the product, I would 100% go with JVM on the backend with either Java or Kotlin, and of course I will build it using [JHipster](https://www.jhipster.tech/).

If you like Java, it's hard not to like Kotlin. It feels like a modern version of Java and building Android apps using Kotlin was a nice experience. Unlike Scala, Kotlin doesn't go overboard with all the complexity and implicit stuff.

I might choose Kotlin over Java if building a new web app and if the team has experience with Kotlin.

Also, Java is close to my heart as it's the programming language that jump-started my career.

Here is what I like and dislike about Java

## 😍 Likes

- **Ecosystem**: The biggest strength of Java is its ecosystem. There are great frameworks and libraries for everything you can think of and most of these solutions are extremely stable with a lot of community and support. In reality, the ecosystem is whats keeping Java popular and growing.
- **Experienced community**: Java has a very mature and experienced community so even if you are a beginner there is a lot of resources to help you
- **Great tooling**: There are a lot of great tools out there for Java. IDEs like IntelliJ, Eclipse, NetBeans offer some of the best developer experiences, and build tools like Gradle and Maven are so powerful and feature-rich. There are also profilers, linters, and so on.
- Built-in [functional programming abstractions](https://deepu.tech/functional-programming-in-java-for-beginners/): Monad like iterators, streams, optional, functional interfaces, and so on
- **Fairly easy to learn**: Java is not very complex and hence is fairly easy to learn and get started even with its boilerplate.

## 😩 Dislikes

- **Boilerplate**: Java needs too much boilerplate. There is no nice way to say this. Compared to other languages in its league, Java feels too verbose. Lambdas have made it more digestible but there are other JVM languages like Kotlin or Scala that have got this part right. I really wish Java gets there one day where you don't have to write 20 lines of code to read a file.
- **Not so modern**: Language features in Java are, let's just say it doesn't spark joy, it's improving but if you are used to few other languages, then there is a lot to wish for, and compared to its peers Java feels old even though its just as old as JS, Ruby or Python
- **Baggage**: Java has great backward compatibility but that also means baggage. there is a lot of such baggage in Java and it's holding the language back in my humble opinion.
- **Virtual machine**: JVM was a great idea when Java was introduced as portability was not easy back then but in today's IT landscape containers and native images have made portability easy and that makes a Java Virtual Machine redundant. JVM still provides a lot of valuable features but it also takes up resources and space whereas languages like Go or Rust can just build tiny native binaries that can be deployed using docker to get better performance with less resource usage than a Java app running on JVM.

# 3. TypeScript/JavaScript

Most Java developers hate JavaScript but I have a [love-hate relationship](https://deepu.tech/reflections-on-javascript/) with it. JavaScript is one of the quirkiest languages around and like it or not it's the de-facto for the web and it gets the job done.

I like TypeScript a lot more than JavaScript and find it way nicer to work with than JS. So TS and by extension JS would tie with Java for the second spot for me.

TS/JS is still my go-to for quick scripting and building client-side apps and mobile apps (ReactNative/PWA)

I wrote in detail about what I like and dislike about JS in this post, here is the summary

## 😍 Likes

- [**Flexible**](https://deepu.tech/reflections-on-javascript/#dynamic--extremely-flexible): The dynamic nature of JS/TS makes it extremely flexible and powerful. It's also very forgiving language. If you know what you are doing, there is literally nothing you cant get done. Of course, the flexibility comes with its own price.
- [**Community**](https://deepu.tech/reflections-on-javascript/#biggest-community): JavaScript has the biggest community among programming languages. It's active, mature, and thriving. It's a huge strength as it helps beginners and experts alike in solving problems and improving the ecosystem on the whole.
- **Ecosystem**: JS has a huge ecosystem with a lot of libraries and frameworks. You will find anything you could imagine as a library. The ecosystem is so big that it has started to become an issue in terms of "yet another framework syndrome".
- **Asynchronous programming**: JS has one of the best ecosystems for asynchronous programming. It's so easy to write async code with Promises and async/await and it has become the de-facto way of programming in JS these days.
- **Great tooling**: JS has great tooling, thanks to NodeJS and its ecosystem. IDEs like VS Code, Atom, Webstorm, and so on provide great JS support. There are also so many wonderful tools like Webpack, Rollup, Jest, and so on.
- [**Functional programming**](https://deepu.tech/functional-programming-in-typescript/): JS is multi-paradigm and has a lot of support for functional programming. It's a great fit for functional programming.
- [**Easy to learn**](https://deepu.tech/reflections-on-javascript/#beginner-friendly-but-also-powerful): JS is a simple language to learn and get started. It's one of the most beginner-friendly languages and communities out there. Of course, there is complex stuff in JS but you don't need to know that to get started.
- **NodeJS**: NodeJS was the best thing to happen for software development. It not just revolutionized the JS world but also inspired other languages to take note and be more developer-friendly and build easy-to-use tooling and ecosystem. You can see this inspiration in Rust, Golang, and so on.
- **TypeScript**: TS is another best thing that happened to JS. It provides an answer to a lot of JS issues that bother people and makes it possible to use JS in a more developer-friendly way on a huge codebase.

## 😩 Dislikes

- [**Fragmentation**](https://deepu.tech/reflections-on-javascript/#fragmentation-browser-implementations-version-compatibility): This is the biggest issue with JS. There are standards and there is vendors and that's the perfect recipe for disaster. Most of the time a JS developer spends used to be to make it work across different browsers and platforms. The demise of IE has made this better but hey I heard Safari is the next IE so there is that.
- [**Error-prone**](https://deepu.tech/reflections-on-javascript/#error-prone-a-side-effect-of-flexibility): This is the side effect of being too flexible. JS code is extremely error-prone and unmanageable in huge code bases. TypeScript makes this much much better but still, it's so easy to shoot in your own foot with JS.
- [**Framework overload**](https://deepu.tech/reflections-on-javascript/#yet-another-framework-syndrome): Too many frameworks for the same thing, too many libraries for the same thing, and libraries for doing extremely trivial stuff like left-padding :( Competition is good but IMO what we have in the JS ecosystem is just too much. It causes mental drain and unnecessary fragmentation in the community.
- **Over-engineering in the ecosystem**: I have been doing JS for over 11 years now and I'm noticing a clear trend of over-engineering in the ecosystem. Look at the JS build tooling for example it has been over-engineered to the extend that setting that up feels like a project in itself.

# 4. Go

Go is the simplest language I have worked with and the easiest to learn. I like Golang for quickly putting something together and Go code is quite easy to read. But I would choose Rust over go for large codebase since Go becomes annoying due to its limited features after a while especially on large codebases. IMO go is still ideal for building small system utilities and microservices.

I wrote in detail about what I like and dislike about Go in [this post](https://deepu.tech/reflection-on-golang/), here is the summary

## 😍 Likes

- [**Simplicity**](https://deepu.tech/reflection-on-golang/#simplicity): Go is extremely simple. You could technically learn it in a day or two. It's easy to get started and be productive in Go. It's also easy to read and debug as there is only one way of doing anything so you know what is going on without having to ask the person who wrote the code. It's the easiest language for beginners as well.
- [**Built-in tooling and style guide**](https://deepu.tech/reflection-on-golang/#tooling): Go provides built-in tooling for all the basic stuff like dependency management, testing, build and so on. It also has an opinionated formatter that saves a lot of time.
- [**Goroutines**](https://deepu.tech/reflection-on-golang/#goroutines--channels): Goroutines are awesome. It's so easy to use and intuitive and the best concurrency experience you can find.
- **Native images**: It's so easy to build native images with Go, no special setup required. It supports building for your favorite platform out of the box.

## 😩 Dislikes

- [**Simplicity**](https://deepu.tech/reflection-on-golang/#simplicity-1): Go's simplicity is really nice when you are getting started but it starts to feel like an annoyance once you start writing more Go code. If you come from another language, you soon start to yearn for features like generics, error handling, default values, and so on. Keeping code DRY is a challenge in Go due to the lack of generics. IMO Go would be a great language if it had generics. Also, I dread writing `if err != nil` in Go.
- **Boilerplate**: Side effect of Go being too simple. In large codebases, you would be repeating stuff like finding an item from an array or map so many times that the boilerplate is just too much after a while.
- [**Implicit interfaces**](https://deepu.tech/reflection-on-golang/#weird-interface-construct): May it's just me. I don't like implicit interface implementations. It just feels wrong and confusing to me.

# Conclusion

These are my personal favorites among programming languages and doesn't mean the likes and dislikes would apply to anyone. make your own conclusions but do use the language before making a judgment about it.

In today's IT landscape, being a polyglot developer is becoming a requirement. And personally, I believe that being a polyglot makes you a better programmer and software engineer. I previously wrote about [how to be an effective polyglot developer](https://deepu.tech/how-to-be-an-effective-polyglot-developer/), do check it out if you are interested.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Photo by [Peter Herrmann](https://unsplash.com/@tama66) on [Unsplash](https://unsplash.com/s/photos/old-computer)
