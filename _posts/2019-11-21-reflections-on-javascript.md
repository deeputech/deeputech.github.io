---
title: My love-hate relationship with JavaScript
published: true
description: After using JavaScript for more than 10 years, here is what I think of it
tags: [javascript, programming, languages, thepragmaticprogrammer]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/rpcyaes2mf3amw79lmr7.jpg
canonical_url: https://deepu.tech/reflections-on-javascript/
devto_url: https://dev.to/deepu105/my-love-hate-relationship-with-javascript-3p66
devto_id: 209286
series: languages
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

There are three types of programmers, the ones who love JavaScript, the ones who hate JavaScript and the ones who do both. JavaScript is the second language(First was C/C++) I learned when I was trying to run my Wordpress blog. It was even before I started my career. When I started my engineering career I started as a Java Web app developer, which meant I had the chance to work on JavaScript as well for the front-end part. I was pretty good at JS/HTML/CSS and soon I was doing a lot of front-end focused Java Web apps. I also learned JQuery and fell in love with it.

During the initial years of my career, JavaScript was undoubtedly the language I loved the most as I found it insanely flexible and easy, especially when I wanted to hack something together fast, even though I was doing an equal amount of coding in Java as well. My former immature self even used to believe that JavaScript was the best programming language in the world and I used to vehemently debate anyone who thought JavaScript wasn't good, I mean I did have some good reasons to think so. Fast forward to now and I think I know better and in my attempts at being more pragmatic, I started looking at languages and frameworks more objectively and without bias. Now I wouldn't say JavaScript is the best language out there, but its a very important one, I know its flaws and there are things I dislike in the JS ecosystem which now I'm mature enough to admit.

Don't get me wrong, I still love JavaScript(TypeScript even more) and I have seen the rise and fall of frameworks from JQuery to current MVVM frameworks and worked with most of them. JavaScript is one of the most loved and most hated language at the same time. You may notice that many of the things I like about JavaScript are the same I dislike as well and that's why the title. So after more than 10 years of working with JavaScript and its huge ecosystem here is what I think about the language. Please note that a lot of them are personal preference based opinions and hence might sound a bit biased.

---

# What I like about JavaScript

First, let us talk about things that I love in JavaScript

## Beginner friendly but also powerful

JavaScript is one of the easiest languages for beginners. Regardless of its quirks, it's easy to get started. You don't even need to install or set up anything. If you have a web browser on your computer that is all you need to write JavaScript. There is also an infinite amount of help available on the internet. The basic syntax is quite easy and the basic concepts are easy to follow as well. This doesn't mean it is a simple language, we will talk about that later.

JavaScript is also a really powerful language as you can get almost anything done with JavaScript like building a web page, a server app, a mobile app, a robot and so on (doesn't mean you should 😜). There is no other language that I have seen which is as versatile as JavaScript. But remember learning JavaScript is easy but becoming a good JavaScript developer is quite hard.

## Dynamic & Extremely flexible

JavaScript is the most dynamic language that I have used, there are things that you can do it JavaScript which is not even thinkable in many other languages. You can get away with a lot in JavaScript as its a very forgiving language. Changing the type of variables at runtime? no problem, add variables and methods to a class you have no control over? no problem, write code that generates code? no problem. The list just goes on. This kind of dynamic behavior is really useful for some use-cases, especially scripting or a templating engine for example.

But it's not without its costs. Flexibility is the biggest strength and biggest weakness of JavaScript, it is extremely handy when it comes to scripting and stuff but means makes maintenance harder in larger codebases, we will see about that in the dislike section.

I spend a good amount of time in my career creating prototypes and PoCs and the dynamic nature and flexibility of JavaScript made that productive and easy, but I would never recommend those for real applications that need to be maintained.

For example, you can do the below in JavaScript to build dynamic functions

```javascript
const functions = {};

for (let i = 0; i < 10; i++) {
    functions[`myAwesomeFunc${i}`] = new Function(
        "fnName",
        `console.log('Hello world from ' + fnName + ' fn created by index ${i}');`
    );
}

Object.values(functions).forEach(fn => {
    fn(fn.name);
});

// prints
// Hello world from anonymous fn created by index 0
// ...
// Hello world from anonymous fn created by index 9
```

## Multiparadigm

JavaScript started as an imperative scripting language and later added features to make OOP possible and due to a lot of features it has you can [use it as a functional programming language](https://dev.to/deepu105/easy-functional-programming-techniques-in-typescript-for-everyone-1bl2) as well. I like this in a language as you can use the best of all paradigms to get your work done efficiently.

## Functions as first-class citizens

Functions in JavaScript are first-class citizens and they don't differ from any other type of objects in JavaScript. You can pass them around, create them at runtime, change them, store them and so on. You can even add attributes to a function.

```javascript
function foo(msg) {
    console.log(`Hello world! ${msg}`);
}

foo.bar = "Yo";

foo(foo.bar); // prints 'Hello world! Yo'
```

## Useful syntax sugars(personal preference)

JavaScript provides a lot of useful syntax sugars like async/await, spread/rest operators, destructuring, ternary operator and so on and I really like them as they make code less verbose for trained eyes. Of course, if you are very new to JS they might seem a bit confusing.

## Metaprogramming

JavaScript has great support for Metaprogramming. It provides the `Proxy` and `Reflect` objects that allow you to intercept and define custom behavior to existing language operators. Definitely an advanced feature which has its own use-cases.

## Less verbose and clean syntax(personal preference)

I might be a bit biased here as JavaScript and Java are the languages I have worked with most and so when it comes to syntax I might be unconsciously finding them nicer. It definitely is possible to write unreadable code in JavaScript but at the same time you can write beautiful expressive code as well and I find the JS syntax more readable than many other languages.

## Can run anywhere

Technically JavaScript can run anywhere. It is undoubtedly the biggest programming platform in the world, especially due to the internet, as JavaScript is the language of the web. You can run JS in a browser, mobile devices, server-side, Desktop apps, OS, IoT, robots, virtual reality, smartwatches, from other languages like Java and so on.

[This](https://medium.com/@anildash/what-if-javascript-wins-84898e5341a) is an interesting article from [Anil Dash](https://twitter.com/anildash) about this topic.

## Biggest community

JavaScript has the biggest community out there, its the most popular programming language after all. The NPM repository has more packages than most other [languages combined](http://www.modulecounts.com/) and you will find help easily for anything related to JS on the web and there is a huge ecosystem around JavaScript making it really easy to work with. Whatever need you have, you can be sure there will be a JavaScript library or tool for that.

![Js module counts](https://thepracticaldev.s3.amazonaws.com/i/sgemskcd1bha7iwqqooh.png)

## As long as web browsers and internet is around JavaScript will be around

Whenever people say Java and JavaScript are like dinosaurs(old, outdated and bulky) I try to correct them. IMO, JS and Java are like cockroaches they can survive anything and I'm pretty sure JavaScript will be around for the foreseeable future unless there is a huge revolution in the internet industry making way to something else. So your skills in JS is gonna be pretty relevant and hence is an important skill to have.

## NodeJS

One of the reasons the JavaScript community grew is also because of NodeJS, It paved the way for JS to be considered outside of the web browser and boy did that explode. I like NodeJS as it lets anyone build and publish reusable packages to the community without having to spend too much effort. Of course, there are issues like fragmentation and bloat to address but NodeJS still is an important tool in a programmer's arsenal.

## Typescript

You might argue TypeScript is its own language, but technically its a syntax superset of JavaScript and hence I would rather place it here. TypeScript addresses a lot of common issues in JavaScript like support for static typing, scalability and so on. So this is definitely something I would put in the like column. I wish every JavaScript runtime had native support for TypeScript(like [Deno](https://deno.land/) for example) or that JS evolves into TypeScript(that would be super cool).

# What I don't like about JavaScript

Now let's talk about things that I don't like in JavaScript language and ecosystem.

## Fragmentation (Browser implementations, version compatibility)

For me the biggest issue for JavaScript is fragmentation. The JS model is that the end-user can choose the implementation, which means the programmer has very little control over what implementation her/his code will run against. There are two major parts at play here when it comes to implementation;

**Vendor**: There are so many different JS engines with slightly different implementations making the life of programmers hell. For example, there is the V8 engine used by Chrome, NodeJs, Opera and so on and SpiderMonkey from Mozilla, JavaScriptCore from apple and many more.
The problem is the ECMAScript standard for JS doesn't have any reference implementation and vendors slightly change implementation details to fit their needs making the same code behave differently in different engines. remember Internet explorer? A major share of the front-end code written in the last two decades is just for browser compatibility, as the huge portion of the JQuery codebase which was to make it work in Internet explorer. While I'm glad that the IE browser is finally EOL, there are still subtle bugs arising from these differing implementations every now and then for someone building JS apps.

**Version**: Another reason for fragmentation is the ECMAScript version, again vendors go ahead and implement versions as and when they like making it impossible for developers to rely on any particular version as they wouldn't know if end-user has a browser that supports this version. This leads way to an unwanted middleman like Babel transpiling your code to the common denominator, mostly to ES5 adding complexity and overhead.

One of the biggest issues even present today because of these factors is the JS module system, everyone uses a module system(requireJS, commonJS or ES modules) but still, there is no consensus on what should be the standard implementation and its quite frustrating.

This is probably why JS is the only language with such dedicated websites like [caniuse.com](https://caniuse.com/#search=modules)

I wish there was a single-engine managed by the community and used by all the browsers and runtimes thus making fragmentation less of an issue.

## Beauracracy

JavaScript being a huge community comes with its own Beauracracy and process layer similar to Java, there are different governing bodies like ECMA International, ISO, JS Foundation, W3C and so on which has stakes in the future of JavaScript, then there are different browser vendors like Google, Mozilla, and Apple with their own agenda, all this makes language evolution slow, messy and painful.

## Language quirks

Sometimes I wonder if JavaScript was designed by someone during an acid(LSD) + Ecstasy trip as there are quirks in the language that is mind-numbing. I don't think you will find so many quirks in any other languages and hence it gives criticizers of JavaScript a field day.

There is a whole repo dedicated to documenting this https://github.com/denysdovhan/wtfjs

Here is a sample, don't even try to understand what happens here.

```javascript
console.log(
    (![] + [])[+[]] +
        (![] + [])[+!+[]] +
        ([![]] + [][[]])[+!+[] + [+[]]] +
        (![] + [])[!+[] + !+[]]
);
// prints 'fail'
```

## Npm hell

NodeJS was like a blessing to JavaScript community and it brought NPM along which really has exploded and now it is kind of annoyance that JavaScript developers have learned to live with. Have you ever tried to find the number of files in a `node_modules` folder?

NPM is a good package manager and has some pretty great features like `npm link` for example but its nested dependency structure along with fluid versioning makes it a recipe for disaster and countless hours of painful debugging sessions. Also, there is the issue of a monolithic registry holding so many packages used by so many applications. Remember [leftpad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)?

## Error prone (a side effect of flexibility)

With JavaScript, it is too easy to shoot in the foot. Well, JavaScript will give you 100 different types of loaded guns, it will hold your hand while you point your gun and will pull the trigger if you hesitate and once you have shot at your foot, it will cut off your leg and make you eat it. I didn't want to go all cannibalistic here but that's how it is with JavaScript. A lot of it has to do with the fact that JavaScript was never designed for the scale that it has today. It was a simple dynamic scripting language. Since JavaScript is too dynamic and flexible it lets you do all sorts of stuff that many other languages will not allow and combine that with the huge list of quirks, bugs are just waiting to happen.

Today the situation is much better with newer versions and with many tools like ESList, VSCode, TypeScript and so on that help you a lot to avoid common mistakes, but even with all that it really takes experience and hard work to write large JavaScript programs without subtle bugs. In my career, most of the debugging sessions that I have done would be in JavaScript.

## Yet another framework syndrome

There is also the phenomena that is unique to JavaScript, its called **Yet another framework syndrome**, new frameworks and libraries are invented on a daily basis, almost, and the churn is so great that if you take a break of one year from JS world and comeback you won't be able to recognize anything and will find yourself learning some new framework. This means teams maintaining JavaScript applications are constantly spending time migrating to newer frameworks from obsolete ones and so on. I had to spend a lot of time migrating from JQuery to AngularJS, AngularJS to Angular, Angular to React and so on in my career. The churn rate in Java, for example, is extremely low compared to this. The JS community also seems to suffer from **not invented here** syndrome much more than other language communities, you will find at least a dozen options for everything here.

## Complexity

As I said earlier, JavaScript is very beginner-friendly and easy to learn but it is not a simple language at its current form. It has evolved a lot and along with all the simplicity on its cover has quite a lot of complex features underneath and it keeps on growing, and due to its legacy and dynamic nature it has too many ways to do the same thing, which I dislike in any language, and has a complex ecosystem that one must learn to use JavaScript at scale. You would have to learn stuff like Webpack, NodeJS, NPM, Babel, ESLint and so on to be productive.

It is also very easy to write complex unreadable code in JavaScript using callbacks and stuff, generally referred to as callback hell! Add to this the dynamic nature, legacy quirks and the complexity keeps on increasing.

## Scalability

JavaScript by itself is not scalable at all, you will be productive when the codebase is small but as it grows the issues starts to appear, due to the lack of a type system, large codebases become a nightmare to maintain unless you are using something like TypeScript on top. Even with that large JavaScript codebases are much more difficult to traverse and maintain compared to other languages, I have experience of this from [JHipster](https://github.com/jhipster/generator-jhipster) for example. Soon you will find yourself adding build tools, linters, transpilers and so on to ease maintenance.

# Nitpicks

Well, when it comes to JavaScript you either love it, hate it or both, there are no real nitpicks at least for me.

---

# Conclusion

If you search on the internet for opinions on JavaScript, you will find tons and tons of content, some praising it, some bashing it, and some objective. A lot can be said about JavaScript and its community. For most its a love-hate relationship, some are brave enough to admit that.

If you absolutely hate JavaScript then either you haven't worked with it a lot or you are holding some prejudice against it. Try it, its a fun language(at least it will keep you awake a lot 😜), it has its purpose and like it or not its the language of the modern web, and it does a pretty good job there. If you think you can be more productive on the web using any other language, then maybe you should try building a large website using that language, then learn JS and try the same. IMO JS is not going anywhere and if anything it is only getting more and more adoption, so it would be foolish not to know the most popular language. Every programmer should learn JavaScript, you never know when it would be handy.

If you absolutely love JavaScript and use JavaScript to everything, then maybe you should also learn few other languages like Java, Go or Rust and you would see why JavaScript is not ideal for many use-cases(It can, of course, do it, any Turing complete language can, that doesn't mean you should do it)

The key is not knowing how to use JavaScript, it is knowing when to use JavaScript and when not.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Made with [imgflip](https://imgflip.com/i/3h3srk)
