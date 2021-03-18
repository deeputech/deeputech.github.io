---
title: What about Svelte? Should you care!
description: Learn why Svelte matters and if you should you care about it
published: true
featured: false
tags:
  - svelte
  - javascript
  - web
  - react
canonical_url: 'https://deepu.tech/what-about-svelte/'
cover_image: 'https://i.imgur.com/YZca3NW.jpg'
devto_id: 638352
devto_url: 'https://dev.to/deepu105/what-about-svelte-should-you-care-ni1'
---

_Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what you think about Svelte in the comments._

---

[Svelte](https://svelte.dev/) is one of the latest cool-and-shiny client-side frameworks in the JavaScript world. Svelte lets you write blazing fast web applications with minimal boilerplate, reduced complexity, and smaller bundle size.

Yes, we have heard the same promise many times before as well from other cool-and-shiny projects like Angular, React, Vue, and [others](https://en.wikipedia.org/wiki/Comparison_of_JavaScript_frameworks).

So how is Svelte any different and why should we care? Let's dive into that

## What is Svelte?

> Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.
>
> Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.
>
> -- Svelte docs

As per Svelte docs, Svelte is a component framework similar to React or Vue. But the most unique thing about Svelte is that it's a compiler first and a UI framework second.

You basically provide template files containing standard-compliant HTML, CSS, and JS/TS for your components with a `.svelte` extension. This is compiled by Svelte into highly-optimized vanilla JavaScript at build time that runs in a browser with minimal framework overhead.

Frameworks like React revolutionized client-side engineering by popularizing the concept of the [Virtual DOM](https://www.codecademy.com/articles/react-virtual-dom). This made web applications faster, more responsive, and slick. Gone were the days of JQuery and DOM manipulation hell. But this also meant doing a lot more work for the reconciliation of the DOM on the browser and using a lot more memory. This in turn means having to ship the library, like React, as well on your production code making bundles bigger and downloads slower.

Svelte on the other hand took a different route and introduced a compiler that does all of the heavy liftings during the build phase. It converts components into efficient imperative vanilla JS code that surgically updates the DOM at runtime. This removed the need for a middle man, like Virtual DOM, at the runtime making web applications faster and lighter. There are still some Svelte specific code that ends up on your application on the browser but it's very minimal when compared to React, Vue, or Angular

So let's see why you should give Svelte a chance

## Why Svelte?

Svelte may not be as revolutionary as AngularJS or React during our JQuery days, as in the end, it pretty much does the same job that most other MVVM frameworks like, React, Vue, or Angular does. To be fair, Svelte builds upon lessons learned from its predecessors. But that's not the point. What makes it different is the approach it takes and the advantages it hence provides which could be subtle or prominent based on your exact use case.

### Advantages

Let us see what are the advantages Svelte offers:

#### Compiler vs Virtual DOM

Being a compiler and getting rid of the VirtualDOM is the most important advantage of Svelte that facilitates many of the other advantages we will see below. The concept is becoming so popular that Angular and Ember have started moving towards compilation in their recent versions.

#### Lightweight & Performant

Svelte produces highly optimized vanilla JS with a very minimal overhead at runtime. This means small bundle sizes, a low memory footprint, and a fast-loading and fast-running application. Check the performance [benchmarks here](https://krausest.github.io/js-framework-benchmark/current.html) to see the difference. All this is out of the box without even having to do any tuning and there are many ways to improve performance even further.

#### Less boilerplate

With Svelte there is no need for adding glue code like hooks or complex state management and so on. The boilerplate required for components is very minimal and almost close to vanilla HTML/JS. Svelte also supports optional two-way bindings making it easier to build forms.

Below is a simple component in Svelte with a two-way input binding, it can't get simpler than this!

```html
<style>
  h1 {
    color: blue;
  }
</style>
<script>
  let name = "world";
</script>

<input bind:value="{name}" />

<h1>Hello {name}!</h1>
```

#### Truly reactive

Svelte is reactive by default. the DOM is automatically updated on state changes in any top-level variable on a component. You don't even have to add any special code for that. Only direct top-level assignments work this way and reference mutations like `array.push` won't work. This means mutations would be more explicit and easier to understand in my opinion.

Svelte also supports derived declarations and statements that are recomputed on state change with a special label (`$:`). Here is an example:

```html
<script>
  let count = 0; // reactive top-level variable
  $: doubled = count * 2; // derived declaration

  // derived statement
  $: {
    console.log(`the count is ${count}`);
  }

  // when variable is updated the DOM is updated accordingly
  function handleClick() {
    count += 1;
  }
</script>

<button on:click="{handleClick}">
  <p>{count} doubled is {doubled}</p>
</button>
```

#### Low learning curve

Unlike React or Angular, the learning curve for Svelte is quite low. There is no special syntax like JSX to learn or complex APIs like Angular to remember. Everything is written using standard-compliant JS/TS, CSS, and HTML with some additional syntax sugar for directives and template logic. The component API is simple and straightforward. The documentation is also quite good and easy to follow.

For example, it took me just a few days to get comfortable with Svelte even for advanced concepts like life cycles, composition, and so on. Whereas it took months for me to get really comfortable in React and I still don't know half of the Angular APIs even after using it for almost a year. Of course, knowing React or Angular does help in making it easier to learn Svelte as there are a lot of concepts that are similar.

#### Components pattern

Svelte follows a component first pattern which makes it ideal for building new web applications or for adding web components to existing applications. Styles are scoped to components by default making Svelte ideal for web components.

#### Built-in animations and effects

Svelte provides built-in animations and effects which makes it easier to build slick user interfaces and interactive visualizations. Well, the framework was originally created for building interactive graphics for The Guardian. This approach provides a much nicer developer experience than something like React and is way easier to use.

Here is a simple example of using a transition effect:

```html
<script>
  import { fade } from "svelte/transition";
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked="{visible}" />
  visible
</label>

{#if visible}
<p transition:fade>Fades in and out</p>
{/if}
```

#### Built-in Reactive store

Svelte provides both mutable and immutable reactive stores out of the box making it easier to do more complex state management in your application. The stores support manual and automatic subscriptions and two-way bindings making them very flexible. The implementation also makes it possible to switch to another state management solution like RxJS for example.

Let's see an example of a writable store:

```html
<script>
  // you can also use readable or derived stores
  import { writable } from "svelte/store";

  // ideally you should do this in a different file
  export const count = writable(0);

  // using manual subscription
  let count_value;
  const unsubscribe = count.subscribe((value) => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>
<!-- The same can be done with auto subscription like below -->
<h1>The count is {$count}</h1>
```

#### Multiple output targets

Being a compiler, it is easy to change output targets without having to change your component's code. For example, Svelte supports server-side rendering out of the box by providing a compiler mode for it (`dom` vs `ssr`). There is even a [NativeScript integration](https://github.com/halfnelson/svelte-native) for Svelte that makes use of this flexibility to produce targets beyond `dom` and `ssr`.

There is also the [new Sapper framework](https://svelte.dev/blog/sapper-towards-the-ideal-web-app-framework) from Svelte, which is similar to [Next.js](https://learnnextjs.com/) but optimized to work with Svelte's philosophy. Sapper supports SSR, Progressive Web Apps, code-splitting, and so on.

### Disadvantages

All those advantages we saw above don't mean there are no downsides, every framework makes tradeoffs. The major downsides of Svelte are:

#### Young framework

Svelte is very young and that means it is not as battle-tested as React or Angular and you might run into some walls at times. This means it's probably not suitable for very complex or mission-critical applications that are expected to scale.

This might not be a long-term problem as the framework is exploding in popularity and the introduction of Sapper would help with the scaling concerns.

#### Smaller community and ecosystem

Being a young framework means it has a smaller community and user base along with a smaller ecosystem. So you may not find as many tools or libraries as in React or as much help on Stack Overflow when you are stuck on some complex problem.

#### Compilation heavy

If you are involved in the front-end development space as well for a while, like me, you could look back and see that UX has improved miles, but the toolchain to produce that has grown to be very complex.

For example, at [JHipster](https://www.jhipster.tech/), we try to provide the best in class production-grade set up for a full stack web app with React/Vue/Angular front end and Java/Kotlin/.NET/NodeJS backend. When you create a new app and compile it, you will see that the front-end takes 10x more time than the backend to compile.

This is the new normal in any full-stack web apps these days and Svelte also has the same issue. It's compiler heavy and the more complex your app becomes the more complex and time-consuming the build will become. This also means you can't just drop a JS file into a webpage and expect to make it a Svelte app like you can do with Vue.

By the way, JHipster also has [Svelte support](https://github.com/jhipster/generator-jhipster-svelte).

#### Quirks

Svelte is web standards compliant, it doesn't introduce anything new like JSX. But it does change some of the standard semantics to work in a different way and this could be confusing for new users. For example, it uses `export` keyword differently and there are quirks like having to use `on:click` instead of `onClick` and so on.

But those are almost unavoidable in any framework. It also uses a JS label (`$:`) to make derived statements/declarations work, it could look alien as some JS developers probably don't even know that labels exist in JS as we rarely use it.

## Conclusion

Of course, all this just scratches the surface of what Svelte offers. If you are coming from other frameworks like React, Angular, or Vue, you will find that Svelte provides a lot of similar features that you are already familiar with. I'm glad that Svelte didn't just try to re-invent the wheel on everything.

I have built complex-mission-critical apps on production with JQuery, AngularJS, Angular, and React. I have also dabbed with Vue and few other lesser-known frameworks in the past. Having matured into a polyglot developer, I have stopped marrying languages/frameworks and hence I have no blind loyalty to any frameworks. I just pick what I think is the best fit for the problem at hand. I used to pick React for random stuff in the past but I think I'll give Svelte a chance next time.

In my opinion, React would continue to be a big challenger for Svelte, especially with the new [concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) that promises non-blocking rendering and hence no dropped frames.

If you already have an app on an MVVM framework like React, Vue, or Angular, there is no justifiable benefit for you to switch to Svelte as those frameworks can also get the job done with very similar performance. Each framework has its own pros and cons which could be situational based on your use case. But if you are going to build a new application or add web components to an existing application then Svelte could be a great choice, especially for web components due to Svelte's simple and lightweight nature.

If you are convinced and want to dive in [here](https://svelte.dev/tutorial/basics) is a great resource to get started. you can also [get started](https://sapper.svelte.dev/) directly with Sapper if you like.

So keep Svelte in your mind and consider giving it a chance for your next greenfield project.

---

## References

- [svelte.dev](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- [www.codecademy.com](https://www.codecademy.com/articles/react-virtual-dom)
- [blog.logrocket.com](https://blog.logrocket.com/should-you-switch-from-react-to-svelte)

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

