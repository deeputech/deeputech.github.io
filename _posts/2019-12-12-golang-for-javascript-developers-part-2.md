---
title: Golang for JavaScript developers - Part 2
published: true
description: Introduction to Golang concepts for JavaScript developers - Part 2
tags: [go, javascript, beginners, languages]
canonical_url: https://deepu.tech/golang-for-javascript-developers-part-2/
devto_url: https://dev.to/deepu105/golang-for-javascript-developers-part-2-p3p
devto_id: 220183
cover_image: https://thepracticaldev.s3.amazonaws.com/i/eu6knwm6llwmgjr6yx59.png
series: Golang for JavaScript developers
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

If you are a JavaScript developer thinking about learning another programming language, then Golang is a great choice. It is simple, has a lot of momentum, is very performant and has some similarities to JavaScript.

This post is not a comparison of the languages or is stating that they are very similar. Its a guide for JavaScript developers to grasp Golang quickly. There are many aspects of Go that are entirely different from JavaScript. We will touch upon that as well.

In the previous [part](https://dev.to/deepu105/golang-for-javascript-developers-part-1-38je) of this series, we learned about things that are more similar between JS and Go. We touched upon:

-   Functions
-   Scope
-   Flow control
-   Memory management

In this part of the series, we will touch upon things that are more different between JS and Go. If you haven't read the previous part please read it first.

# Things that are more different

As you can see there are more things in this part than previous, but please also note that some differences are quite subtle so it would be easy to digest for a JavaScript developer.

## Types & Variables

This is one of the main differences. JavaScript is dynamic and loosely typed and Go is static and strictly typed.

**JavaScript**

```js
var foo = {
    message: "hello"
};

var bar = foo;

// mutate
bar.message = "world";
console.log(foo.message === bar.message); // prints 'true'

// reassign
bar = {
    message: "mars"
};
console.log(foo.message === bar.message); // prints 'false'
```

**Go**

```go
var foo = struct {
    message string
}{"hello"}

var bar = foo // will create a copy of foo and assign to bar

// mutates only bar
// note bar.message is short for (*bar).message
bar.message = "world"
fmt.Println(foo.message == bar.message) // prints "false"

// reassign bar
bar = struct {
    message string
}{"mars"}
fmt.Println(foo.message == bar.message) // prints "false"

var barPointer = &foo // assigns pointer to foo

// mutates foo
barPointer.message = "world"
fmt.Println(foo.message == barPointer.message) // prints "true"

// reassigns foo
*barPointer = struct {
    message string
}{"mars"}
fmt.Println(foo.message == bar.message) // prints "true"

```

### Similarities

-   There is no much similarity other than the name of keywords `var` and `const`. `var` keyword in Go is closer to `let` keyword in JS in terms of behavior.
-   Multiple `var` can be declared together like `var a, foo, bar int;` similar to JS. But in Go, you can go further and initialize them as well like `var a, foo, bar = true, 10, "hello"`. In JS you can do a destructuring assignment for similar effect like `var [a, foo, bar] = [true, 10, "hello"]`

### Differences

-   Go needs type information at compile time either by specified type or from type inference.
-   Go has value types(primitives, arrays, and structs), reference types(slice, map & channels) and pointers. JS has value types(primitives) and reference types(objects, arrays, functions).
-   The type of a variable cannot be changed after the declaration in Go.
-   Variables assignments cannot use short-circuit expressions in Go.
-   `var` has a shorthand syntax with `:=` inside Go functions.
-   Go strictly doesn't let you have unused variables, any unused variable must be named as `_`, which is a reserved character.
-   JS does not have `private/public` access modifiers(There is a proposal to add it), In Go, however, you can modify that using the naming convention. Starting a field, variable name with uppercase will make it public and lowercase will make it private.
-   `const` in Go is not the same as in JavaScript. Only primitives like character, string, boolean, or numeric values can be assigned to constants in Go.
-   Arrays in Go are different from JS as they are fixed length. JS arrays are dynamic and hence are more similar to Go slices which are slices of an array with dynamic length.

**JavaScript**

```js
const foo = ["Rick", "Morty"];

// Adds to the end of the array.
foo.push("Beth");

// Removes from the end of the array.
element = foo.pop();
```

**Go**

```go
foo := []string{"Rick", "Morty"} // creates a slice

// Adds to the end of the array.
foo = append(foo, "Beth")

// Removes from the end of the array.
n := len(foo) - 1 // index of last element
element := foo[n] // optionally also grab the last elemen
foo = foo[:n]     // remove the last element

```

-   JavaScript has Object, Map/Set and WeakMap/WeakSet that can be used as dictionaries and sets. Go has only a simple Map which is more similar to JavaScript Object and hence serves the purpose. Also, note that maps in Go are not ordered.

**JavaScript**

```js
const dict = {
    key1: 10,
    key2: "hello"
};

const stringMap = {
    key1: "hello",
    key2: "world"
};
```

**Go**

```go
var dict = map[string]interface{}{
    "key1": 10,
    "key2": "hello",
}

var stringMap = map[string]string{
    "key1": "hello",
    "key2": "world",
}
```

## Mutability

Another major difference between JS and Go is how variable mutations are handled. In JavaScript, every non-primitive variable is passed by reference and there is no way to change that behavior whereas in Go everything except slice, map & channels are passed by value and we can choose to change that by explicitly passing a pointer to a variable instead.

Because of this in Go, we have more control over mutability than in JS.

Another notable difference is that in Javascript we can prevent reassignment of variables using the `const` keyword which is not possible in Go.

We saw some mutability in action in the above section, let's see a bit more

**JavaScript**

```js
let foo = {
    msg: "hello"
};

function mutate(arg) {
    arg.msg = "world";
}
mutate(foo);
console.log(foo.msg); // prints 'world'
```

**Go**

```go
type Foo struct {
    msg string
}
var foo = Foo{"hello"}

var tryMutate = func(arg Foo) {
    arg.msg = "world"
}
tryMutate(foo)
fmt.Println(foo.msg) // prints 'hello'

var mutate = func(arg *Foo) {
    arg.msg = "world"
}
mutate(&foo)
fmt.Println(foo.msg) // prints 'world'

```

## Error handling

The only similarity in terms of error handling between Go and JS is that errors are also just value types. In both languages, you can pass errors as values.

Apart from the above error handling are quite different in both.
In JavaScript, we can either;

-   use a `try/catch` mechanism to catch errors from synchronous functions and asynchronous functions that use `async/await`
-   handle errors by passing them to callback functions or using promises for asynchronous functions.

In Go there is no `try/catch` mechanism, the only way to handle the error is by returning it as a value from a function or by halting execution with a `panic` function or using the `recover` function in a `defer` block to [rescue the execution](https://blog.golang.org/defer-panic-and-recover). This makes error handling quite verbose in Go and you will often see the famous `if err != nil` statement in Go.

**JavaScript**

```js
function errorCausingFunction() {
    throw Error("Oops");
}

try {
    errorCausingFunction();
} catch (err) {
    console.error(`Error: ${err}`);
} finally {
    console.log(`Done`);
}
// prints
// Error: Error: Oops
// Done

// or the async way

function asyncFn() {
    try {
        errorCausingFunction();
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

asyncFn()
    .then(res => console.log(`:)`))
    .catch(err => console.error(`Error: ${err}`))
    .finally(res => console.log(`Done`));
// prints
// Error: Error: Oops
// Done
```

**Go**

```go
var errorCausingFunction = func() error {
    return fmt.Errorf("Oops")
}

err := errorCausingFunction()

defer fmt.Println("Done") // Closest to finally, but executes only at end of the enclosing function
if err != nil {
    fmt.Printf("Error: %s\n", err.Error())
} else {
    fmt.Println(":)")
}
// prints
// Error: Oops
// Done

// or
err := errorCausingFunction()

defer func() { // Closest thing to finally behaviour, but executes only at end of the enclosing function
    if err := recover(); err != nil {
        fmt.Println("Recovered from err", err) // closest thing to catch behaviour
    }
    fmt.Println("Done")
}()
if err != nil {
    panic(err)
} else {
    fmt.Println(":)")
}
```

## Composition instead of inheritance

In JavaScript, we can use inheritance to extend or share behavior while Go choose composition instead. There is also prototype level inheritance in JavaScript and the possibility of doing composition due to the flexible nature of the language.

**JavaScript**

```js
class Animal {
    species;
    constructor(species) {
        this.species = species;
    }
    species() {
        return this.species;
    }
}

class Person extends Animal {
    name;
    constructor(name) {
        super("human");
        this.name = name;
    }
    name() {
        return this.name;
    }
}

var tom = new Person("Tom");

console.log(`${tom.name} is a ${tom.species}`); // prints 'Tom is a human'
```

**Go**

```go
type IAnimal interface {
	Species() string
}

type IPerson interface {
	IAnimal // composition of IAnimal interface
	Name() string
}

type Animal struct {
	species string
}

type Person struct {
	Animal // composition of Animal struct
	name   string
}

func (p *Person) Name() string {
	return p.name
}

func (p *Animal) Species() string {
	return p.species
}

func NewPerson(name string) IPerson {
	return &Person{Animal{"human"}, name}
}

func main() {
	var tom IPerson = NewPerson("Tom")
	fmt.Printf("%s is a %s\n", tom.Name(), tom.Species()) // prints 'Tom is a human'
}
```

## Concurrency

Concurrency is one of the most important features of Golang and this is where it really shines.

**JavaScript** technically is single-threaded and hence there is no real native concurrency there. The addition of service workers brings some support for parallelism but is still no match for the power and simplicity of `goroutines`. Concurrency is not the same as asynchronous or reactive programming for which JavaScript has great support.

```js
// Sequential
async function fetchSequential() {
    const a = await fetch("http://google.com/");
    console.log(a.status);
    await a.text();

    const b = await fetch("http://twitter.com/");
    console.log(b.status);
    await b.text();
}

// Concurrent but not multi threaded
async function fetchConcurrent() {
    const values = await Promise.all([
        fetch("http://google.com/"),
        fetch("http://twitter.com/")
    ]);

    values.forEach(async resp => {
        console.log(resp.status);
        await resp.text();
    });
}
```

**Go**, on the other hand, is fully geared towards concurrency and parallelism. The concepts are built into the language using `goroutines` and channels. It is also possible to do asynchronous programming in Go but it looks more verbose than the JS equivalent. This means you can write API as sync and use it in an async way using goroutines and Go community generally advocates against writing asynchronous APIs.

```go
// Sequential
func fetchSequential() {
	respA, _ := http.Get("http://google.com/")
	defer respA.Body.Close()
	fmt.Println(respA.Status)
	respB, _ := http.Get("http://twitter.com/")
	defer respB.Body.Close()
	fmt.Println(respB.Status)
}

// Concurrent and multithreaded
func fetchConcurrent() {
	resChanA := make(chan *http.Response, 0)

	go func(c chan *http.Response) {
		res, _ := http.Get("http://google.com/")
		c <- res
	}(resChanA)

	respA := <-resChanA
	defer respA.Body.Close()
	fmt.Println(respA.Status)

	resChanB := make(chan *http.Response, 0)

	go func(c chan *http.Response) {
		res, _ := http.Get("http://twitter.com/")
		c <- res
	}(resChanB)

	respB := <-resChanB
	defer respB.Body.Close()
	fmt.Println(respB.Status)
}
```

## Compilation

**JavaScript** is interpreted and not compiled. Some JS engines use JIT compilation but to developers, it doesn't matter as we do not have to compile JavaScript in order to run it. Transpiling using TypeScript or Babel doesn't count 😉

**Go** is compiled and hence offers compile-time type safety and to an extent memory safety.

## Paradigm

**JavaScript** is Object-oriented primarily but you can easily write imperative or functional-style code due to the flexibility of the language. The language is quite free form and really doesn't enforce anything. It is not opinionated and doesn't provide any tooling out of the box. The developer would need to set up his/her own tooling.

**Go** is imperative primarily, you can do a little bit of OOP and functional but is not as easy to do as in JavaScript. The language is quite strict and opinionated and enforces things like code style and formating. It also provides built-in capabilities for testing, formatting, building and so on.

# Conclusion

Someone asked me in the comments of the previous [part](https://dev.to/deepu105/golang-for-javascript-developers-part-1-38je) in the series that why should a JS developer choose Go among all the available options. In my [opinion](https://dev.to/deepu105/my-love-hate-relationship-with-javascript-3p66), JS is not a perfect language and hence learning few other languages will greatly benefit a JS developer to use JS more pragmatically and would help to cement her/his knowledge of fundamental programming concepts better. There are of course many options out there like Rust, Go, Haskel, Kotlin and so on, but I think Go is a great place to start as its one of the simplest among all the available options and has wide adoption. My second choice would be Kotlin or [Rust](https://dev.to/deepu105/my-first-impressions-of-rust-1a8o).

# References:

-   [http://www.pazams.com/Go-for-Javascript-Developers/](http://www.pazams.com/Go-for-Javascript-Developers/)
-   [https://github.com/miguelmota/golang-for-nodejs-developers](https://github.com/miguelmota/golang-for-nodejs-developers)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

---

Cover image photo created using images from [norfolkjs](https://norfolkjs.org/) (designed by [Lookmai Rattana](https://github.com/cosmicmeow)) and [juststickers](https://juststickers.in/product/ninja-go-lang-gopher-sticker/)
