---
title: Easy functional programming techniques in Rust for everyone
published: true
description: Functional programming concepts in Rust for beginners.
tags: [rust, functional, beginners, programming]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/8jy8jkp8bwlufob52bgu.png
canonical_url: https://deepu.tech/functional-programming-in-rust/
devto_url: https://dev.to/deepu105/easy-functional-programming-techniques-in-rust-for-everyone-nae
devto_id: 205509
series: functional-programming
---

There is a lot of hype around functional programming(FP) and a lot of cool kids are doing it but it is not a silver bullet. Like other programming paradigms/styles, functional programming also has its pros and cons and one may prefer one paradigm over the other. If you are a Rust developer and wants to venture into functional programming, do not worry, you don't have to learn functional programming oriented languages like Haskell or Clojure(or even Scala or JavaScript though they are not pure functional programming languages) since Rust has you covered and this post is for you.

If you are looking for functional programming in Java, Golang or TypeScript check other posts in the series.

I'm not gonna dive into all functional programming concepts in detail, instead, I'm gonna focus on things that you can do in Rust which are in line with functional programming concepts. I'm also not gonna discuss the pros and cons of functional programming in general.

Please note that some introductions in this post are repeated from my other posts in the series for your ease of reading.

---

## What is functional programming?

As per Wikipedia,

> Functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

Hence in functional programming, there are two very important rules

-   **No Data mutations**: It means a data object should not be changed after it is created.
-   **No implicit state**: Hidden/Implicit state should be avoided. In functional programming state is not eliminated, instead, its made visible and explicit

This means:

-   **No side effects**: A function or operation should not change any state outside of its functional scope. I.e, A function should only return a value to the invoker and should not affect any external state. This means programs are easier to understand.
-   **Pure functions only**: Functional code is idempotent. A function should return values only based on the arguments passed and should not affect(side-effect) or depend on the global state. Such functions always produce the same result for the same arguments.

Apart from these there are functional programming concepts below that can be applied in Rust, we will touch upon these further down.

-   [Higher-order-functions](https://en.wikipedia.org/wiki/Higher-order_function)
-   [Closures](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>)
-   [Currying](https://en.wikipedia.org/wiki/Currying)
-   [Recursion](<https://en.wikipedia.org/wiki/Recursion_(computer_science)>)
-   [Lazy evaluations](https://en.wikipedia.org/wiki/Evaluation_strategy)
-   [Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)

Using functional programming doesn't mean its all or nothing, you can always use functional programming concepts to complement Object-oriented or imperative concepts in Rust. The benefits of functional programming can be utilized whenever possible regardless of the paradigm or language you use. And that is exactly what we are going to see.

---

## Functional programming in Rust

Rust is primarily geared towards procedural/imperative style of programming but it also lets you do a little bit of functional and object-oriented style of programming as well. And that is my favorite kind of mix. So let us see how we can apply some of the functional programming concepts above in Rust using the language features.

### First-class and higher-order functions

First-class functions(function as a first-class citizen) means you can assign functions to variables, pass a function as an argument to another function or return a function from another. Functions in Rust are a bit more complex than other languages, it's not as straightforward as in Go or JavaScript. There are different kinds of functions and two different ways of writing them. The first one is a function that cannot memoize its outer context and the second one is closures which can memoize its outer context. Hence concepts like currying and higher-order-functions are possible in Rust but may not be as easy to wrap your head around as in other languages. Also, functions that accept a closure can also accept a pointer to a function depending on the context. In many places, Rust functions and closures can be interchangeable. It would have been nicer if functions were simple and we could do all the below without having to rely on closures. But Rust chose these compromises for better memory safety and performance.

A function can be considered as a higher-order-function only if it takes one or more functions as parameters or if it returns another function as a result.
In Rust, this is quite easy to do with closures, it might look a bit verbose but if you are familiar with Rust then you should be fine.

```rust
fn main() {
    let list = vec![
        String::from("Orange"),
        String::from("Apple"),
        String::from("Banana"),
        String::from("Grape"),
    ];
    // we are passing the array and a closure as arguments to map_for_each method.
    let out = map_for_each(list, |it: &String| -> usize {
        return it.len();
    });

    println!("{:?}", out); // [6, 5, 6, 5]
}

// The higher-order-function takes an array and a closure as arguments
fn map_for_each(list: Vec<String>, fun: fn(&String) -> usize) -> Vec<usize> {
    let mut new_array: Vec<usize> = Vec::new();
    for it in list.iter() {
        // We are executing the closure passed
        new_array.push(fun(it));
    }
    return new_array;
}
```

There are also more complex versions that you can write with generics like below for an example

```rust
fn main() {
    let list = vec![2, 5, 8, 10];
    // we are passing the array and a closure as arguments to map_for_each method.
    let out = map_for_each(list, |it: &usize| -> usize {
        return it * it;
    });

    println!("{:?}", out); // [4, 25, 64, 100]
}

// The higher-order-function takes an array and a closure as arguments, but uses generic types
fn map_for_each<A, B>(list: Vec<A>, fun: fn(&A) -> B) -> Vec<B> {
    let mut new_array: Vec<B> = Vec::new();
    for it in list.iter() {
        // We are executing the closure passed
        new_array.push(fun(it));
    }
    return new_array;
}
```

But then we could also simply do it this way using built-in functional methods like map, fold(reduce) and so on which is much less verbose. Rust provides a lot of useful functional style methods for working on collections like `map`, `fold`, `for_each`, `filter` and so on.

```rust
fn main() {
    let list = ["Orange", "Apple", "Banana", "Grape"];

    // we are passing a closure as arguments to the built-in map method.
    let out: Vec<usize> = list.iter().map(|x| x.len()).collect();

    println!("{:?}", out); // [6, 5, 6, 5]
}
```

Closures in Rust can memorize and mutate its outer context but due to the concept of ownership in Rust, you cannot have multiple closures mutating the same variables in the outer context. Currying is also possible in Rust but again due to ownership and lifetime concepts, it might feel a bit more verbose.

```rust
fn main() {
    // this is a higher-order-function that returns a closure
    fn add(x: usize) -> impl Fn(usize) -> usize {
        // A closure is returned here
        // variable x is obtained from the outer scope of this method and memorized in the closure by moving ownership
        return move |y| -> usize { x + y };
    };

    // we are currying the add method to create more variations
    let add10 = add(10);
    let add20 = add(20);
    let add30 = add(30);

    println!("{}", add10(5)); // 15
    println!("{}", add20(5)); // 25
    println!("{}", add30(5)); // 35
}
```

### Pure functions

As we saw already a pure function should return values only based on the arguments passed and should not affect or depend on the global state. It is possible to do this in Rust easily.

Take the below, this is a pure function. It will always return the same output for the given input and its behavior is highly predictable. We can safely cache the method if needed.

```rust
fn sum(a: usize, b: usize) -> usize {
    return a + b;
}
```

But since Rust variables are immutable by default, unless specified a function cannot mutate any variables passed to it and cannot capture any variable in its context. So if we try to affect external state like below the compiler will complain "can't capture dynamic environment in a fn item"

```rust
use std::collections::HashMap;

fn main() {
    let mut holder = HashMap::new();

    fn sum(a: usize, b: usize) -> usize {
        let c = a + b;
        holder.insert(String::from(format!("${a}+${b}", a = a, b = b)), c);
        return c;
    }
}
```

In Rust, in order to capture external state, we would have to use closures, so we can rewrite the above as

```rust
use std::collections::HashMap;

fn main() {
    let mut holder = HashMap::new();

    let sum = |a: usize, b: usize| -> usize {
        let c = a + b;
        holder.insert(String::from(format!("${a}+${b}", a = a, b = b)), c);
        return c;
    };

    println!("{}", sum(10, 20));
}
```

But the compilation will still fail with the message "cannot borrow `sum` as mutable, as it is not declared as mutable". So in order to do external state mutation, we would have to explicitly specify the function as mutable like `let mut sum = ...`

So Rust will help you keep your functions pure and simple by default. Of course, that doesn't mean you can avoid side effects that don't involve variable mutations, for those you have to take care of it yourself.

### Recursion

Functional programming favors recursion over looping. Let us see an example for calculating the factorial of a number.

In traditional iterative approach:

```rust
fn main() {
    fn factorial(mut num: usize) -> usize {
        let mut result = 1;
        while num > 0 {
            result *= num;
            num = num - 1;
        }
        return result;
    }

    println!("{}", factorial(20)); // 2432902008176640000
}
```

The same can be done using recursion as below which is favored in functional programming -- But recursion is not the solution always, for some cases a simple loop is more readable.

```rust
fn main() {
    fn factorial(num: usize) -> usize {
        return match num {
            0 => 1,
            _ => num * factorial(num - 1),
        };
    }

    println!("{}", factorial(20)); // 2432902008176640000
}
```

The downside of the recursive approach is that it will be slower compared to an iterative approach most of the times(The advantage we are aiming for is code simplicity and readability) and might result in stack overflow errors since every function call needs to be saved as a frame to the stack. To avoid this tail recursion is preferred, especially when the recursion is done too many times. In tail recursion, the recursive call is the last thing executed by the function and hence the functions stack frame need not be saved by the compiler. Most compilers can optimize the tail recursion code the same way iterative code is optimized hence avoiding the performance penalty. But unfortunately, Rust does not support this yet.

Consider using recursion when writing Rust code for readability and immutability, but if performance is critical or if the number of iterations will be huge use the standard iterative approach.

### Lazy evaluation

Lazy evaluation or non-strict evaluation is the process of delaying the evaluation of an expression until it is needed. In general, Rust does strict/eager evaluation. We can utilize higher-order-functions, closures, and [memoization](https://en.wikipedia.org/wiki/Memoization) techniques to do lazy evaluations.

Take this example where Rust eagerly evaluates everything.

```rust
fn main() {
    fn add(x: usize) -> usize {
        println!("executing add"); // this is printed since the functions are evaluated first
        return x + x;
    }

    fn multiply(x: usize) -> usize {
        println!("executing multiply"); // this is printed since the functions are evaluated first
        return x * x;
    }

    fn add_or_multiply(add: bool, on_add: usize, on_multiply: usize) -> usize {
        if add {
            on_add
        } else {
            on_multiply
        }
    }
    println!("{}", add_or_multiply(true, add(4), multiply(4))); // 8
    println!("{}", add_or_multiply(false, add(4), multiply(4))); // 16
}
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

```rust
fn main() {
    fn add(x: usize) -> usize {
        println!("executing add"); // this is printed since the functions are evaluated first
        return x + x;
    }

    fn multiply(x: usize) -> usize {
        println!("executing multiply"); // this is printed since the functions are evaluated first
        return x * x;
    }

    type FnType = fn(t: usize) -> usize;

    // This is now a higher-order-function hence evaluation of the functions are delayed in if-else
    fn add_or_multiply(add: bool, on_add: FnType, on_multiply: FnType, t: usize) -> usize {
        if add {
            on_add(t)
        } else {
            on_multiply(t)
        }
    }
    println!("{}", add_or_multiply(true, add, multiply, 4)); // 8
    println!("{}", add_or_multiply(false, add, multiply, 4)); // 16
}
```

This outputs the below and we can see that only required functions were executed

```
executing add
8
executing multiply
16
```

You can also use memoization/caching techniques to avoid unwanted evaluations in pure and referentially transparent functions like below

```rust
use std::collections::HashMap;

fn main() {
    let mut cached_added = HashMap::new();

    let mut add = |x: usize| -> usize {
        return match cached_added.get(&x) {
            Some(&val) => val,
            _ => {
                println!("{}", "executing add");
                let out = x + x;
                cached_added.insert(x, out);
                out
            }
        };
    };

    let mut cached_multiplied = HashMap::new();

    let mut multiply = |x: usize| -> usize {
        return match cached_multiplied.get(&x) {
            Some(&val) => val,
            _ => {
                println!("executing multiply");
                let out = x * x;
                cached_multiplied.insert(x, out);
                out
            }
        };
    };

    fn add_or_multiply(add: bool, on_add: usize, on_multiply: usize) -> usize {
        if add {
            on_add
        } else {
            on_multiply
        }
    }

    println!("{}", add_or_multiply(true, add(4), multiply(4))); // 8
    println!("{}", add_or_multiply(false, add(4), multiply(4))); // 16
}

```

This outputs the below and we can see that functions were executed only once for the same values.

```
executing add
executing multiply
8
16
```

These may not look that elegant especially to seasoned Rust programmers. Fortunately, most of the functional APIs, like the iterators, provided by Rust do lazy evaluations and there are libraries like [rust-lazy](https://github.com/reem/rust-lazy) and [Thunk](https://docs.rs/thunk/0.3.0/thunk/) which can be used to make functions lazy. Also, Rust provides some advanced types with which lazy evaluations can be implemented.

Doing Lazy evaluations in Rust might not be worth the code complexity some of the times, but if the functions in question are heavy in terms of processing then it is absolutely worth it to lazy evaluate them.

### Type system

Rust is a strong statically typed language and also has great type inference. There are also advanced concepts like type aliasing and so on.

### Referential transparency

From Wikipedia:

> Functional programs do not have assignment statements, that is, the value of a variable in a functional program never changes once defined. This eliminates any chances of side effects because any variable can be replaced with its actual value at any point of execution. So, functional programs are referentially transparent.

Rust has great ways to ensure referential transparency, variables in Rust are immutable by default and even reference passing is immutable by default. So you would have to explicitly mark variables or references as mutable to do so. So in Rust, it is actually quite easy to avoid mutations.

For example, the below will produce an error

```rust
fn main() {
    let list = ["Apple", "Orange", "Banana", "Grape"];

    list = ["John", "Raju", "Sabi", "Vicky"];
}
```

And so does all of the below

```rust
fn main() {
    let list = vec![
        String::from("Orange"),
        String::from("Apple"),
        String::from("Banana"),
        String::from("Grape"),
    ];

    list.push(String::from("Strawberry")); // This will fail as the reference is immutable

    fn mutating_fn(val: String) {
        val.push('!'); // this will fail unless the argument is marked mutable reference or value passed is marked mutable reference
    }

    mutating_fn(String::from("Strawberry")); // this will fail if the reference is not passed as mutable
}
```

In order to compile these, we would have to riddle it with `mut` keywords

```rust
fn main() {
    let mut list = vec![
        String::from("Orange"),
        String::from("Apple"),
        String::from("Banana"),
        String::from("Grape"),
    ];

    list.push(String::from("Strawberry")); // This will work as the reference is mutable

    fn mutating_fn(val: &mut String) {
        val.push('!'); // this will work as the argument is marked as a mutable reference
    }

    mutating_fn(&mut String::from("Strawberry")); // this will work as the reference is passed as mutable
}

```

There are even more advanced concepts in Rust when it comes to data mutation and all that makes it easier to write immutable code.

### [Data structures](https://en.wikipedia.org/wiki/Purely_functional_data_structure)

When using functional programming techniques it is encouraged to use data types such as Stacks, Maps, and Queues as they also have functional implementations. Hence Hashmaps are better than arrays or hash sets as data stores in functional programming. Rust provides such data types and is hence conforms to the functional specifications regarding data structures.

---

## Conclusion

This is just an introduction for those who are trying to apply some functional programming techniques in Rust. There are a lot more that can be done in Rust. As I said earlier functional programming is not a silver bullet but it offers a lot of useful techniques for more understandable, maintainable and testable code. It can co-exist perfectly well with imperative and object-oriented programming styles. In fact, we all should be using the best of everything to solve the problem at hand instead of getting too obsessed about a single methodology.

---

I hope you find this useful. If you have any questions or if you think I missed something please add a comment.

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
