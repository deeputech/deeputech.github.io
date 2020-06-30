---
title: How to become an effective Polyglot Developer
description: >-
  What are the advantages and disadvantages of being a polyglot developer and
  how to be an effective polyglot developer
published: true
featured: false
tags:
  - programming
  - computerscience
  - languages
  - polyglot
series: languages
canonical_url: 'https://deepu.tech/how-to-be-an-effective-polyglot-developer/'
cover_image: 'https://i.imgur.com/3ereMQQ.jpg'
devto_id: 373867
devto_url: 'https://dev.to/deepu105/how-to-become-an-effective-polyglot-developer-3moe'
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

A polyglot developer is someone who can work with multiple languages with ease. In the strict interpretation, the vast majority of developers are polyglot as they would have worked with at least two languages in their lifetime, not counting markup/config/SQL languages. So in the IT industry when someone says s/he is a polyglot developer they mean they can work with a handful of languages at least and they don't have any particular strong preference for a single language.

I started my career as a Java & JavaScript developer but I never considered myself a polyglot developer until a few years ago. Why the shift you may ask. Even as a Java & JavaScript developer, I had a strong [affinity towards JavaScript](https://dev.to/deepu105/my-love-hate-relationship-with-javascript-3p66) as I used to enjoy building UI/UX. Later in my career, I started working a little bit with more languages like Groovy, Scala, TypeScript, Python. Even then I didn't consider myself a polyglot developer as I didn't dive deep into any of those languages, was mostly working on existing codebases where I had to do some work in that particular language and I always considered that a nuisance. Another reason was I naively believed that since I already knew JS and Java quite well, and since they are among the most popular languages, I didn't need to learn anything else or improve my skills further.

> A programming language is a tool that has profound influence on our thinking habits.
>
> ‒ E. Dijkstra

Things changed when I started working fulltime on a project written in Go and [I started learning Go](https://dev.to/deepu105/my-reflections-on-golang-38jk), which was extremely easy to learn, I realized how easy it was to learn a new language and enjoy working in it when I slightly changed my mindset and approach towards a programming language. Then I went on to learn, [still learning](https://dev.to/deepu105/my-first-impressions-of-rust-1a8o), Rust, Kotlin, and so on. I now consider myself a polyglot developer and I can comfortably work in Java, Kotlin, Groovy, JS/TS, Go, and Rust. I can also get by in Python, Scala, Bash, Ruby, and C#. Now I love deep diving into languages and enjoy working with various languages simultaneously and in this post, I'm gonna share how my change in mindset helped and how you can also be an effective polyglot developer.

## Advantages & Disadvantages of being polyglot

Before we proceed lets quickly see the advantages and disadvantages of being polyglot

### Advantages

-   You are not married to a single language and hence you have a bigger tool-belt with a more appropriate solution for the problem at hand
-   Wider Job market and options to choose from. Hence you have multiple career path and opportunities
-   Less fanboyism (Trust me its a good thing). You also become less biased. You also won't get bored with one language & its community
-   You don't have to worry about your favorite language dying out and you losing your job as you are not too invested in one ecosystem
-   You become more pragmatic and opt for simplicity as you are not trying to use every fancy feature of a language. And in the end, you will become a better developer as you become better at concepts and semantics rather than syntax and you will get rid of programming habits more common to people working predominantly in a single language.

### Disadvantages

-   You probably won't be expert in one particular language as you switch between languages
-   Some jobs might require a long time experience in one particular language
-   You might have to refer lang docs (let's be honest, Google it) more often than usual as you might not remember details of language APIs or certain syntax
-   Developer fatigue. More things to learn and keep up to, if you consider that sort thing a disadvantage
-   Mixing concepts from one language to another

## How to approach a language

Most programming languages are quite similar at their core. Any mainstream Turing complete language will have some basic semantic features like objects, conditionals, loops, variables, functions, and operations. When you encounter a new language, the best way to learn it would be to learn semantics rather than syntax. This is where your pattern recognition skills are needed. When you start learning the semantics of a language you quickly realize how similar it is to another language you already know, you start to see patterns. Once you familiarize yourself and understand that, learning the syntax becomes easier and in many cases, syntax might change and you will end up looking up syntax anyway.

> Programming is an art of seeing patterns in the world, the same pattern recognition can be applied to programming languages to transfer your knowledge from one language to another.

So when learning a new language I follow the below approach

1. Learn the goal and purpose of the language, so that you know when to use this language, this helps with making you more pragmatic. You stop treating a language like a hammer and every problem as a nail.
2. Learn semantics. See what basic features the language offers and compare it with what you already know. For example, I start by looking at how variables work, how are conditionals designed, how loops and iterators work and finally how functions work
3. Learn about additional features that might be unique to the language. Sometimes they are a variation of a feature you are familiar with, like Goroutines & coroutines or something unique like the Ownership model in Rust. Learn the similarities and differences of these features compared to languages you already know.
4. If the language uses a programming paradigm that you are not familiar with, learn that so that you can do justice to the language. No point using a pure functional language and trying to emulate OOP or imperative style with it. Even if the language is multi-paradigm, it is still beneficial to learn different paradigms and mix them based on the use-case.
5. Learn about [memory management and memory model](https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd) of the language as it will help you have a deeper understanding. You will be surprised how similar the concepts are between languages.

One thing not to do is learning a language by learning a particular framework, for example, learning Ruby on Rails rather than learning Ruby or Learning Spring rather than Java or learning React rather than JavaScript. This will do more harm than good as you will be learning the semantics of the framework more than the language.

## Being effective in a language

Now, learning a language and being effective in a language are two different things. One issue is that you might unconsciously try to emulate something from one language in another when the other language might have a better way to do it. For example, when I started with Go, I was trying to emulate JS callbacks in Go, instead of using Goroutines which can do a better job. One way to avoid this is to keep things as simple as possible.

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.
>
> ‒ Martin Fowler

Some of the things you can try are:

-   Stick to simple constructs as much as possible. Write clean code. Use advanced language features only when required. What matters is you solve the problem at hand simply and understandably without sacrificing efficiency or causing bugs.
-   Don't fall into the paradigm trap, for example, do not try to go full functional on an OOP or imperative language. Use what gets the job done, remember, unlike what some people might say, there is no problem with doing OOP or imperative code. Most of the time a simple `for` loop is better than recursion.
-   Choose the appropriate language for the situation. Don't pick a language for a problem because it's cool, pick based on the use -case, team composition, maintenance requirement, and business needs. Don't impose a language on others in the team.

{% twitter 1142967056150728708 %}

## keeping up

One of the issues with being a polyglot developer is keeping up with multiple language trends and communities. You might end up with Developer fatigue. It is important to keep up but it doesn't mean that you have to keep up with stuff like frameworks and libraries in a language.

> Googling something doesn't make you a bad developer, blindly copy-pasting from the first result does.

Here are some tips that could help

-   Learn programming basics. Learn about objects, collections, memory models, concurrency, and data structures. This knowledge can be applied to almost every language and the concepts around these don't change that often.
-   Use a good IDE/Editor/Plugins to take care of language syntax and style for you. A programmer shouldn't be worrying about inserting semicolons and commas or adding the right amount of tabs or spaces. Its 2020, these things should be the least of your concerns, let the IDEs or tools like prettier & linters take care of those. For the last time, it friggin doesn't matter if you use tab or space.
-   Before you start any project, choose the language you are going to use and spend few hours catching up on what is new in the language and what are the reliable frameworks/libraries that you might need.
-   Docs, Google, and forums are your friend. There is no shame in googling something when you are in doubt or when you have a bad memory like me. Trust me everyone does it and the ones who say they don't are lying. I still, almost always end up googling for array/string methods in almost all the languages I work with. The only thing to keep in mind is not to blindly copy the code from the first result. Read and compare at least two or three results from google. If its a stack overflow answer, read the entire thread, don't just read the answer. If its a blog, spend a few minutes and read it fully.
-   Contribute to some OSS projects if you have spare time or if your employer allows it during work hours. It is a great way to learn and keep up without having to actively track it.

## Conclusion

> A good programmer writes great code in a language. A great programmer is language independent.

As the saying goes don't keep all your eggs in a single basket. There are considerable efforts and some disadvantages in being a polyglot developer. But the advantages outweigh the disadvantages and knowing more than one programming language does more good than bad. IMO the effort is worth it. Most of you are already polyglot developers even if you don't realize it, so just stop hating the other language you often use and instead embrace it and appreciate the good parts, keep in mind the bad parts and use the language when it is a good fit for a use case. The IT landscape is changing fast. New languages are being invented more rapidly languages are also dying out faster. Being polyglot will be a very valuable skill in the future. So don't fight it, come to the dark side.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Andrés Gómez](https://unsplash.com/@andresloquesea?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/juggling?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

