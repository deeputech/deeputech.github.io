---
title: Easy functional programming techniques in TypeScript for everyone
published: true
description: Functional programming concepts in TypeScript for everyone.
tags: [typescript, functional, beginners, javascript]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/8sta9oosbpy9lxefm0lp.jpg
canonical_url: https://deepu.tech/functional-programming-in-typescript/
devto_url: https://dev.to/deepu105/easy-functional-programming-techniques-in-typescript-for-everyone-1bl2
devto_id: 163949
series: functional-programming
---

There is a lot of hype around functional programming(FP) and a lot of cool kids are doing it but it is not a silver bullet. Like other programming paradigms/styles, functional programming also has its pros and cons and one may prefer one paradigm over the other. If you are a TypeScript/JavaScript developer and wants to venture into functional programming, do not worry, you don't have to learn functional programming oriented languages like Haskell or Clojure since JavaScript and hence TypeScript has you covered and this post is for you.

If you are looking for functional programming in Java or Golang check other posts in the series.

I'm not gonna dive into all functional programming concepts in detail, instead, I'm gonna focus on things that you can do in TypeScript which are in line with functional programming concepts. I'm also not gonna discuss the pros and cons of functional programming in general.

Please keep in mind, though this post is about TypeScript, you can easily do the same in JavaScript as well since TypeScript is just a typed superset of JavaScript.

---

## What is functional programming?

As per Wikipedia,

> Functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

Hence in functional programming, there are two very important rules

-   **No Data mutations**: It means a data object should not be changed after it is created.
-   **No implicit state**: Hidden/Implicit state should be avoided. In functional programming state is not eliminated, instead, its made visible and explicit

This means:

-   **No side effects**: A function or operation should not change any state outside of its functional scope. I.e, A function should only return a value to the invoker and should not affect any external state. This means programs are easier to understand.
-   **Pure functions only**: Functional code is idempotent. A function should return values only based on the arguments passed and should not affect(side-effect) or depend on global state. Such functions always produce the same result for the same arguments.

Apart from these there are functional programming concepts below that can be applied in TypeScript, we will touch upon these further down.

-   [Higher-order-functions](https://en.wikipedia.org/wiki/Higher-order_function)
-   [Closures](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>)
-   [Currying](https://en.wikipedia.org/wiki/Currying)
-   [Recursion](<https://en.wikipedia.org/wiki/Recursion_(computer_science)>)
-   [Lazy evaluations](https://en.wikipedia.org/wiki/Evaluation_strategy)
-   [Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)

Using functional programming doesn't mean its all or nothing, you can always use functional programming concepts to complement Object-oriented concepts in TypeScript. The benefits of functional programming can be utilized whenever possible regardless of the paradigm or language you use. And that is exactly what we are going to see.

---

## Functional programming in TypeScript

TypeScript is not a purely functional language but offers a lot of concepts which are in line with functional languages, so let us see how we can apply some of the functional programming concepts above in TypeScript.

### First-class and higher-order functions

First-class functions(function as a first-class citizen) means you can assign functions to variables, pass a function as an argument to another function or return a function from another. TypeScript supports this and hence makes concepts like closures, currying, and higher-order-functions easy to write.

A function can be considered as a higher-order-function only if it takes one or more functions as parameters or if it returns another function as a result.

In TypeScript, this is quite easy to do

```typescript
type mapFn = (it: string) => number;

// The higher-order-function takes an array and a function as arguments
function mapForEach(arr: string[], fn: mapFn): number[] {
    const newArray: number[] = [];
    arr.forEach(it => {
        // We are executing the method passed
        newArray.push(fn(it));
    });
    return newArray;
}

const list = ["Orange", "Apple", "Banana", "Grape"];

// we are passing the array and a function as arguments to mapForEach method.
const out = mapForEach(list, (it: string): number => it.length);

console.log(out); // [6, 5, 6, 5]
```

But then in JavaScript/TypeScript we could also simply do it this way using built-in functional methods like map, reduce and so on.

```typescript
const list = ["Orange", "Apple", "Banana", "Grape"];

// we are passing a function as arguments to the built-in map method.
const out = list.map(it => it.length);

console.log(out); // [6, 5, 6, 5]
```

Closures and currying are also possible in TypeScript

```typescript
// this is a higher-order-function that returns a function
function add(x: number): (y: number) => number {
    // A function is returned here as closure
    // variable x is obtained from the outer scope of this method and memorized in the closure
    return (y: number): number => x + y;
}

// we are currying the add method to create more variations
var add10 = add(10);
var add20 = add(20);
var add30 = add(30);

console.log(add10(5)); // 15
console.log(add20(5)); // 25
console.log(add30(5)); // 35
```

There are also many built-in declarative higher-order-functions in TypeScript/JavaScript like `map`, `reduce`, `forEach`, `filter` and so on. There are also many libraries that provide functional interfaces to be used in TypeScript/JavaScript.

### Pure functions

As we saw already a pure function should return values only based on the arguments passed and should not affect or depend on global state. It is possible to do this in TypeScript easily.

This is quite simple, take the below this is a pure function. It will always return the same output for the given input and its behavior is highly predictable. We can safely cache the method if needed.

```typescript
function sum(a: number, b: number): number {
    return a + b;
}
```

If we add an extra line in this function, the behavior becomes unpredictable as it now has a side effect that affects an external state.

```typescript
const holder = {};

function sum(a: number, b: number): number {
    let c = a + b;
    holder[`${a}+${b}`] = c;
    return c;
}
```

So try to keep your functions pure and simple. Using tools like [ESLint](https://eslint.org/) and [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) it is possible to enforce these.

### Recursion

Functional programming favors recursion over looping. Let us see an example for calculating the factorial of a number.

In traditional iterative approach:

```typescript
function factorial(num: number): number {
    let result = 1;
    for (; num > 0; num--) {
        result *= num;
    }
    return result;
}

console.log(factorial(20)); // 2432902008176640000
```

The same can be done using recursion as below which is favored in functional programming.

```typescript
const factorial = (num: number): number =>
    num == 0 ? 1 : num * factorial(num - 1);

console.log(factorial(20)); // 2432902008176640000
```

The downside of the recursive approach is that it will be slower compared to an iterative approach most of the times(The advantage we are aiming for is code simplicity and readability) and might result in stack overflow errors since every function call needs to be saved as a frame to the stack. To avoid this tail recursion is preferred, especially when the recursion is done too many times. In tail recursion, the recursive call is the last thing executed by the function and hence the functions stack frame need not be saved by the compiler. Most compilers can optimize the tail recursion code the same way iterative code is optimized hence avoiding the performance penalty. Tail call optimization is part of the ECMAScript specs but unfortunately, most JavaScript engines do not support this yet.

Now using tail recursion the same function can be written as below, but depending on the engine this might not be optimized, though there are [workarounds](https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/), still it performed better in benchmarks.

```typescript
const factorialTailRec = (num: number): number => factorial(1, num);

const factorial = (accumulator: number, val: number): number =>
    val == 1 ? accumulator : factorial(accumulator * val, val - 1);

console.log(factorialTailRec(20)); // 2432902008176640000
```

Consider using recursion when writing TypeScript code for readability and immutability, but if performance is critical or if the number of iterations will be huge use standard loops.

### Lazy evaluation

Lazy evaluation or non-strict evaluation is the process of delaying evaluation of an expression until it is needed. In general, TypeScript does strict/eager evaluation but for operands like `&&`, `||` and `?:` it does a lazy evaluation. We can utilize short-circuiting, higher-order-functions, closures, and [memoization](https://en.wikipedia.org/wiki/Memoization) techniques to do lazy evaluations.

Take this example where TypeScript eagerly evaluates everything.

```typescript
function add(x: number): number {
    console.log("executing add"); // this is printed since the functions are evaluated first
    return x + x;
}

function multiply(x: number): number {
    console.log("executing multiply"); // this is printed since the functions are evaluated first
    return x * x;
}

function addOrMultiply(
    add: boolean,
    onAdd: number,
    onMultiply: number
): number {
    return add ? onAdd : onMultiply;
}

console.log(addOrMultiply(true, add(4), multiply(4))); // 8
console.log(addOrMultiply(false, add(4), multiply(4))); // 16
```

This will produce the below output and we can see that both functions are executed always

```
executing add
executing multiply
8
executing add
executing multiply
16
```

We can use higher-order-functions to rewrite this into a lazily evaluated version

```typescript
function add(x: number): number {
    console.log("executing add");
    return x + x;
}

function multiply(x: number): number {
    console.log("executing multiply");
    return x * x;
}

type fnType = (t: number) => number;
// This is now a higher-order-function hence evaluation of the functions are delayed in if-else
function addOrMultiply(
    add: boolean,
    onAdd: fnType,
    onMultiply: fnType,
    t: number
): number {
    return add ? onAdd(t) : onMultiply(t);
}
console.log(addOrMultiply(true, add, multiply, 4));
console.log(addOrMultiply(false, add, multiply, 4));
```

This outputs the below and we can see that only required functions were executed

```
executing add
8
executing multiply
16
```

Or by memoization like this

```typescript
const cachedAdded = {};
function add(x: number): number {
    if (cachedAdded[x]) {
        return cachedAdded[x];
    }
    console.log("executing add");
    const out = x + x;
    cachedAdded[x] = out;
    return out;
}

const cachedMultiplied = {};
function multiply(x: number): number {
    if (cachedMultiplied[x]) {
        return cachedMultiplied[x];
    }
    console.log("executing multiply");
    const out = x * x;
    cachedMultiplied[x] = out;
    return out;
}

function addOrMultiply(
    add: boolean,
    onAdd: number,
    onMultiply: number
): number {
    return add ? onAdd : onMultiply;
}

console.log(addOrMultiply(true, add(4), multiply(4))); // 8
console.log(addOrMultiply(false, add(4), multiply(4))); // 16
```

This outputs the below and we can see that functions were executed only once for the same values

```
executing add
executing multiply
8
16
```

Please note that memoization techniques will work only when your functions are pure and referentially transparent.

There are also other ways of doing Lazy evaluations like [this](https://thoughts.travelperk.com/optimizing-js-with-lazy-evaluation-and-memoization-9d0cd8c30cd4). Doing Lazy evaluations in TypeScript might not be worth the code complexity some of the times, but if the functions in question are heavy in terms of processing then its is absolutely worth it to lazy evaluate them.

### Type system

TypeScript has a strong type system and also has great type inference. While the underlying JavaScript itself is weakly typed, TypeScript along with a compatible IDE can bridge that gap.

### Referential transparency

From Wikipedia:

> Functional programs do not have assignment statements, that is, the value of a variable in a functional program never changes once defined. This eliminates any chances of side effects because any variable can be replaced with its actual value at any point of execution. So, functional programs are referentially transparent.

Unfortunately, there are not many ways to strictly limit data mutation in JavaScript, however by using pure functions and by explicitly avoiding data mutations and reassignment using other concepts we saw earlier this can be achieved. JavaScript by default passes primitive variables by value and objects by reference so we need to take care not to mutate data inside functions. Libraries like [Immutable JS](https://github.com/immutable-js/immutable-js) could also be considered. Use `const` as much as possible to avoid reassignments.

For example, the below will produce an error

```typescript
const list = ["Apple", "Orange", "Banana", "Grape"];

list = ["Earth", "Saturn"];
```

But this will not help when variables are holding references to other objects, for example, the below mutation will work irrespective of the `const` keyword.

```typescript
const list = ["Apple", "Orange", "Banana", "Grape"];

list.push("Earth"); // will mutate the list
list.push("Saturn"); // will mutate the list
```

`const` keyword allows the internal state of referenced variables to be mutated and hence from a functional programming perspective `const` keyword is useful only for primitive constants and to catch reassignments.

However, with TypeScript, we can use special mapped types to make objects read-only and hence avoiding accidental data mutations which are caught during compile time. Thanks to @stereobooster and @juliang for pointing it out. Read my post about mapped and conditional types [here](https://deepu.tech/react-done-right-with-typescript) to learn more.

```typescript
const list: Readonly<string[]> = ["Apple", "Orange", "Banana", "Grape"];

list.push("Earth"); // will cause compilation error
```

or

```typescript
const list: ReadonlyArray<string> = ["Apple", "Orange", "Banana", "Grape"];

list.push("Earth"); // will cause compilation error
```

Other techniques to follow are using [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) or built-in methods like map, reduce, filter and so on as they do not mutate the data. We can also use [this ESlint plugin](https://github.com/jfmengels/eslint-plugin-fp) to restrict mutations.

### [Data structures](https://en.wikipedia.org/wiki/Purely_functional_data_structure)

When using functional programming techniques it is encouraged to use data types such as Stacks, Maps and Queues which have functional implementations as well.
Hence maps are better than arrays or hash sets in functional programming as data stores.

---

## Conclusion

This is just an introduction for those who are trying to apply some functional programming techniques in TypeScript. There are a lot more that can be done in TypeScript and with the ever-evolving ECMAScript underneath, this should be even easier. As I said earlier functional programming is not a silver bullet but it offers a lot of useful techniques for more understandable, maintainable and testable code. It can co-exist perfectly well with imperative and object-oriented programming styles. In fact, we all should be using the best of everything.

---

I hope you find this useful. If you have any question or if you think I missed something please add a comment.

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
