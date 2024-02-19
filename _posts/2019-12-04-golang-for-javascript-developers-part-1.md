---
title: Golang for JavaScript developers - Part 1
published: true
description: Introduction to Golang concepts for JavaScript developers - Part 1
tags: [go, javascript, beginners, languages]
canonical_url: https://deepu.tech/golang-for-javascript-developers-part-1/
devto_url: https://dev.to/deepu105/golang-for-javascript-developers-part-1-38je
devto_id: 215285
cover_image: https://thepracticaldev.s3.amazonaws.com/i/eu6knwm6llwmgjr6yx59.png
series: Golang for JavaScript Developers
---

If you are a JavaScript developer thinking about learning another programming language, then Golang is a great choice. It is simple, has a lot of momentum, very performant and has some similarities to JavaScript.

**Edit**: Someone asked me in the comments that why should a JS developer choose Go among all the available options. In my [opinion](https://deepu.tech/reflections-on-javascript/), JS is not a perfect language and hence learning few other languages will greatly benefit a JS developer to use JS more pragmatically and would help to cement her/his knowledge of fundamental programming concepts better. There are of course many options out there like Rust, Go, Haskel, Kotlin and so on, but I think Go is a great place to start as its one of the simplest among all the available options and has wide adoption. My second choice would be Kotlin or [Rust](https://deepu.tech/first-impression-of-rust/).

This post is not a comparison of the languages or is stating that they are very similar. Its a guide for JavaScript developers to grasp Golang quickly. There are many aspects of Go that are entirely different from JavaScript we will touch upon that as well.

# Things that are more similar

There are many things in Go which are quite similar to concepts in JavaScript. Most are not the same but similar. let us get them out of our way first. In the first part of this series, we will see how they are similar and note any key differences as well.

## Functions

The most similar feature in JS and Go are the functions.

### Similarities

- Functions are first-class citizens.
- Functions can be assigned to variables.
- Functions can be passed as arguments to other functions and can be returned from functions.
- Functions can be nested.
- Functions can be curried(partial functions).
- Functions can memorize its surrounding context thus creating closures.
- Functions can be named or anonymous. Anonymous functions can be immediately invoked(IIFE)

**JavaScript**

```js
// A normal function with access to `this`
function standardFunction(arg1, arg2) {
  return `${arg1}:${arg2}`;
}

// A function assigned to a variable
const assignedFunction1 = standardFunction;

// An arrow function assigned to a variable
const assignedArrowFunction = (arg1, arg2) => {
  return `${arg1}:${arg2}`;
};

// A higher-order-function that accepts functions as argument and returns a function
function functionAsArgumentAndReturn(addFn, arg1, arg2) {
  const out = addFn(arg1, arg2);
  // This returns a closure
  return function (numArg) {
    return out + numArg;
  };
}

const out = functionAsArgumentAndReturn(
  (a, b) => {
    return a + b;
  },
  5,
  10
)(10);
// returns 25

// Nested functions
function nested() {
  console.log("outer fn");
  function nested2() {
    console.log("inner fn");
    const arrow = () => {
      console.log("inner arrow");
    };
    arrow();
  }
  nested2();
}

nested(); // prints:
// outer fn
// inner fn
// inner arrow

// this is a higher-order-function that returns a function
function add(x) {
  // A function is returned here as closure
  // variable x is obtained from the outer scope of this method and memorized in the closure
  return (y) => x + y;
}

// we are currying the add method to create more variations
var add10 = add(10);
var add20 = add(20);
var add30 = add(30);

console.log(add10(5)); // 15
console.log(add20(5)); // 25
console.log(add30(5)); // 35

// An anonymous function invoked immediately(IIFE)
(function () {
  console.log("anonymous fn");
})();
// prints: anonymous fn
```

**Go**

```go
// A normal function, this cannot be nested
func standardFunction(arg1 string, arg2 string) string {
	return fmt.Sprintf("%s:%s", arg1, arg2)
}

func main() {

	// A function assigned to a variable
	var assignedFunction1 = standardFunction

	// An anonymous function assigned to a variable and nested
	var assignedFunction2 = func(arg1 string, arg2 string) string {
		return fmt.Sprintf("%s:%s", arg1, arg2)
	}

	// A higher-order-function that accepts functions as argument and returns a function
	var functionAsArgumentAndReturn = func(addFn func(int, int) int, arg1 int, arg2 int) func(int) int {
		var out = addFn(arg1, arg2)
		// This returns a closure
		return func(numArg int) int {
			return out + numArg
		}
	}

	var out = functionAsArgumentAndReturn(
		func(a, b int) int {
			return a + b
		},
		5,
		10,
	)(10)
	fmt.Println(out) // prints 25

	// Nested anonymous functions
	var nested = func() {
		fmt.Println("outer fn")
		var nested2 = func() {
			fmt.Println("inner fn")
			var nested3 = func() {
				fmt.Println("inner arrow")
			}
			nested3()
		}
		nested2()
	}

	nested() // prints:
	// outer fn
	// inner fn
	// inner arrow

	// this is a higher-order-function that returns a function
	var add = func(x int) func(y int) int {
		// A function is returned here as closure
		// variable x is obtained from the outer scope of this method and memorized in the closure
		return func(y int) int {
			return x + y
		}
	}

	// we are currying the add method to create more variations
	var add10 = add(10)
	var add20 = add(20)
	var add30 = add(30)

	fmt.Println(add10(5)) // 15
	fmt.Println(add20(5)) // 25
	fmt.Println(add30(5)) // 35

	// An anonymous function invoked immediately(IIFE)
	(func() {
		fmt.Println("anonymous fn")
	})()
	// prints: anonymous fn

	assignedFunction1("a", "b")
	assignedFunction2("a", "b")
}

```

### Differences

- JavaScript Functions have two forms; regular functions, and arrow functions whereas in Go there is normal functions and interface functions. Normal Go functions do not have a `this` and hence are more similar to arrow functions whereas interface functions have something similar to a `this` and hence closer to normal functions in JavaScript. Go doesn't have the concept of a global `this`.

**JavaScript**

```js
function normalFnOutsideClass() {
  console.log(`I still can access global this: ${this}`);
}

const arrowFnOutsideClass = () => {
  console.log(`I don't have any this`);
};

class SomeClass {
  name = "Foo";
  normalFnInsideClass = function () {
    console.log(`I can access the callee as this: ${this.name}`);
  };
  arrowFnInsideClass = () => {
    console.log(`I can access the class reference as this: ${this.name}`);
  };
}

new SomeClass().normalFnInsideClass();
new SomeClass().arrowFnInsideClass();
```

**Go**

```go
type SomeStruct struct {
	name string
}

func (this *SomeStruct) normalFnInsideStruct() {
	// you can name the variable this or anything else
	fmt.Printf("I can access the struct reference as this\n: %s", this.name)
}

func main() {

	var normalFnOutsideStruct = func() {
		fmt.Println("I can access variables in my scope")
	}
	normalFnOutsideStruct()

	var structVal = SomeStruct{"Foo"}
	structVal.normalFnInsideStruct()
}
```

- JavaScript functions are the same as any other value type and hence can even hold additional attributes which is not possible in Go.
- Go functions can have implicit named returns.
- Only anonymous functions can be nested in Go.
- Go functions can return multiple values, whereas in JavaScript you can return only one value. However, in JS you can work around that by using destructuring so you can do similar looking functions in both

**JavaScript**

```js
function holdMyBeer() {
  return ["John", 2];
}

let [a, b] = holdMyBeer();
console.log(`Hey ${a}, hold my ${b} beer\n`);
```

**Go**

```go
func holdMyBeer() (string, int64) {
	return "John", 2
}

func main() {
	a, b := holdMyBeer()
	fmt.Printf("Hey %s, hold my %d beer\n", a, b)
}
```

## Scope

The scope is the context in which a variable is valid, this decides where a variable can be used and both JS and Go has many similarities here

### Similarities

- Both have function Scope and Functions can memorize their surrounding scope.
- Both have block scope.
- Both have a global scope.

### Differences

- Go doesn't have the concept of `this` which is a tricky concept in JavaScript. IMO this makes things much simpler in Go.
- Variables in the same scope cannot be re-declared in Go. Go `var` is closer to `let` keyword in JS.

## Flow control

Flow control in Golang is quite similar but simpler than JavaScript in many aspects.

### Similarities

- `for` loops are very similar in both.
- `while` loops are very similar, though Go uses the same `for` keyword.
- `forEach` is also similar in functionality but the syntax is quite different.
- You can break/continue from a loop. You can use labels to do so as well.
- `if/else` syntax is quite similar, Go version is a bit more powerful

**JavaScript**

```js
// For loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// While loop
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

// Do while

let j = 0;
do {
  j += 1;
  console.log(j);
} while (j < 5);

// ForEach loop
["John", "Sam", "Ram", "Sabi", "Deepu"].forEach((v, i) => {
  console.log(`${v} at index ${i}`);
});

// for of loop
for (let i of ["John", "Sam", "Ram", "Sabi", "Deepu"]) {
  console.log(i);
}

// For in loop
const obj = {
  a: "aVal",
  b: "bVal",
};

for (let i in obj) {
  console.log(obj[i]);
}
```

**Go**

```go
func main() {
	// For loop
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	// While loop
	i := 0
	for i < 10 {
		fmt.Println(i)
		i++
	}

	// Do while
	j := 0
	for {
		j += 1
		fmt.Println(j)
		if j == 5 {
			break
		}
	}

	// ForEach and for of loop
	for i, v := range []string{"John", "Sam", "Ram", "Sabi", "Deepu"} {
		fmt.Printf("%v at index %d\n", v, i)
	}

	// For in loop
	var obj = map[string]string{
		"a": "aVal",
		"b": "bVal",
	}

	for i, v := range obj {
		fmt.Printf("%v at index %s\n", v, i)
	}
}

```

### Differences

- There is no ternary operator in Go.
- `switch` statement syntax is similar but Go defaults to break and JS defaults to fall through. In Go, you can use the `fallthrough` keyword for that functionality while in JS, we have the `break` keyword.
- JS has many more ways of iterations, like `while`, `forEach`, `for in` & `for of` loops and so on which are not available in Go though most of them can be achieved using the `for` syntax.
- `if/else` can have an init assignment in Go. In the below code the assignment for `val` has scope only within the `if` and `else` blocks and not outside of it. This is not possible in JS.

**Go**

```go
if val := getVal(); val < 10 {
    return val
} else {
    return val + 1
}
```

## Memory management

Memory management is also quite similar except for details in both JS and Go.

### Similarities

- Both are garbage collected at runtime.
- Both have heap and stack memory which means the same in both.

### Differences

- Go has pointers that are exposed to users while their memory management is abstracted away whereas in JavaScript pointers are abstracted away completely and you only work with values and references.
- Go uses a concurrent tricolor mark-and-sweep algorithm with a focus on latency whereas JS engines normally implement different algorithms with Mark-Sweep being a very popular choice. V8 engine, for example, uses both Mark-Sweep and a Scavenge algorithm.

### Misc

- Commenting is same in both, with `//` and `/* */`
- Both JS and Go supports importing other modules, though the behavior is not the same
- SetTimeout is similar in both. `setTimeout(somefunction, 3*1000)` vs `time.AfterFunc(3*time.Second, somefunction)`.
- Both have a spread operator `console.log(...array)` vs `fmt.Println(array...)`. Go spread works only on interface arrays/slices though.
- Both have rest operator for method arguments `...nums` vs `nums ...int`.

# Conclusion

In this part, we saw concepts that are similar in both languages. In the next part of the series, we will see things that are more different between JS and Go. There are more things in the next part, that are different, than this, but please also note that some differences are quite subtle so it would be easy to digest for a JavaScript developer.

In the [next chapter](https://deepu.tech/golang-for-javascript-developers-part-2/) we will see:

- Types & Variables
- Error handling
- Mutability
- Composition instead of inheritance
- Concurrency
- Compilation
- Paradigm

# References:

- [http://www.pazams.com/Go-for-Javascript-Developers/](http://www.pazams.com/Go-for-Javascript-Developers/)
- [https://github.com/miguelmota/golang-for-nodejs-developers](https://github.com/miguelmota/golang-for-nodejs-developers)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

---

Cover image photo created using images from [norfolkjs](https://norfolkjs.org/) (designed by [Lookmai Rattana](https://github.com/cosmicmeow)) and [juststickers](https://juststickers.in/product/ninja-go-lang-gopher-sticker/)
