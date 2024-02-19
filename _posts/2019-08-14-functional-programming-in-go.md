---
title: 7 Easy functional programming techniques in Go
published: true
description: Functional programming concepts in Go for beginners.
tags: [go, functional, beginners, programming]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/etyb3w5h4l4ade28jbws.jpg
canonical_url: https://deepu.tech/functional-programming-in-go/
devto_url: https://dev.to/deepu105/7-easy-functional-programming-techniques-in-go-3idp
devto_id: 156264
series: Functional Programming
---

There is a lot of hype around functional programming(FP) and a lot of cool kids are doing it but it is not a silver bullet. Like other programming paradigms/styles, functional programming also has its pros and cons and one may prefer one paradigm over the other. If you are a Go developer and wants to venture into functional programming, do not worry, you don't have to learn functional programming oriented languages like Haskell or Clojure(or even Scala or JavaScript though they are not pure functional programming languages) since Go has you covered and this post is for you.

If you are looking for functional programming in Java then check this out

{% link https://dev.to/deepu105/functional-programming-in-java-a-primer-13nb %}

I'm not gonna dive into all functional programming concepts in detail, instead, I'm gonna focus on things that you can do in Go which are in line with functional programming concepts. I'm also not gonna discuss the pros and cons of functional programming in general.

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

Apart from these there are functional programming concepts below that can be applied in Go, we will touch upon these further down.

-   [Higher-order-functions](https://en.wikipedia.org/wiki/Higher-order_function)
-   [Closures](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>)
-   [Currying](https://en.wikipedia.org/wiki/Currying)
-   [Recursion](<https://en.wikipedia.org/wiki/Recursion_(computer_science)>)
-   [Lazy evaluations](https://en.wikipedia.org/wiki/Evaluation_strategy)
-   [Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)

Using functional programming doesn't mean its all or nothing, you can always use functional programming concepts to complement Object-oriented or imperative concepts in Go. The benefits of functional programming can be utilized whenever possible regardless of the paradigm or language you use. And that is exactly what we are going to see.

---

## Functional programming in Go

Golang is a multi-paradigm language so let us see how we can apply some of the functional programming concepts above in Go.

### First-class and higher-order functions

First-class functions(function as a first-class citizen) means you can assign functions to variables, pass a function as an argument to another function or return a function from another. Go supports this and hence makes concepts like closures, currying, and higher-order-functions easy to write.

A function can be considered as a higher-order-function only if it takes one or more functions as parameters or if it returns another function as a result.

In Go, this is quite easy to do

```go
func main() {
	var list = []string{"Orange", "Apple", "Banana", "Grape"}
	// we are passing the array and a function as arguments to mapForEach method.
	var out = mapForEach(list, func(it string) int {
		return len(it)
	})
	fmt.Println(out) // [6, 5, 6, 5]

}

// The higher-order-function takes an array and a function as arguments
func mapForEach(arr []string, fn func(it string) int) []int {
	var newArray = []int{}
	for _, it := range arr {
		// We are executing the method passed
		newArray = append(newArray, fn(it))
	}
	return newArray
}
```

Closures and currying are also possible in Go

```go
// this is a higher-order-function that returns a function
func add(x int) func(y int) int {
	// A function is returned here as closure
	// variable x is obtained from the outer scope of this method and memorized in the closure
	return func(y int) int {
		return x + y
	}
}

func main() {

	// we are currying the add method to create more variations
	var add10 = add(10)
	var add20 = add(20)
	var add30 = add(30)

	fmt.Println(add10(5)) // 15
	fmt.Println(add20(5)) // 25
	fmt.Println(add30(5)) // 35
}
```

There are also many built-in higher-order-functions in Go standard libraries. There are also some functional style libraries like [this](https://github.com/wesovilabs/koazee) and [this](https://github.com/yanatan16/itertools) offering map-reduce like functional methods in Go.

### Pure functions

As we saw already a pure function should return values only based on the arguments passed and should not affect or depend on global state. It is possible to do this in Go easily.

This is quite simple, take the below this is a pure function. It will always return the same output for the given input and its behavior is highly predictable. We can safely cache the method if needed.

```go
func sum(a, b int) int {
	return a + b
}
```

If we add an extra line in this function, the behavior becomes unpredictable as it now has a side effect that affects an external state.

```go
var holder = map[string]int{}

func sum(a, b int) int {
	c := a + b
	holder[fmt.Sprintf("%d+%d", a, b)] = c
	return c
}
```

So try to keep your functions pure and simple.

### Recursion

Functional programming favors recursion over looping. Let us see an example for calculating the factorial of a number.

In traditional iterative approach:

```go
func factorial(num int) int {
	result := 1
	for ; num > 0; num-- {
		result *= num
	}
	return result
}

func main() {
	fmt.Println(factorial(20)) // 2432902008176640000
}
```

The same can be done using recursion as below which is favored in functional programming.

```go
func factorial(num int) int {
	if num == 0 {
		return 1
	}
	return num * factorial(num-1)
}
func main() {
	fmt.Println(factorial(20)) // 2432902008176640000
}
```

The downside of the recursive approach is that it will be slower compared to an iterative approach most of the times(The advantage we are aiming for is code simplicity and readability) and might result in stack overflow errors since every function call needs to be saved as a frame to the stack. To avoid this tail recursion is preferred, especially when the recursion is done too many times. In tail recursion, the recursive call is the last thing executed by the function and hence the functions stack frame need not be saved by the compiler. Most compilers can optimize the tail recursion code the same way iterative code is optimized hence avoiding the performance penalty. Go compiler, unfortunately, does not do this optimization.

Now using tail recursion the same function can be written as below, but Go doesn't optimize this, though there are [workarounds](https://www.reddit.com/r/golang/comments/3vndco/why_no_tail_call_elimination/cxphgqe/), still it performed better in benchmarks.

```go
func factorialTailRec(num int) int {
	return factorial(1, num)
}

func factorial(accumulator, val int) int {
	if val == 1 {
		return accumulator
	}
	return factorial(accumulator*val, val-1)
}

func main() {
	fmt.Println(factorialTailRec(20)) // 2432902008176640000
}
```

I ran some benchmarks with all 3 approaches and here is the result, as you can see looping is still the most performing followed by the tail recursion.

```
goos: linux
goarch: amd64
BenchmarkFactorialLoop-12       	100000000	        11.7 ns/op	       0 B/op	       0 allocs/op
BenchmarkFactorialRec-12        	30000000	        52.9 ns/op	       0 B/op	       0 allocs/op
BenchmarkFactorialTailRec-12    	50000000	        44.2 ns/op	       0 B/op	       0 allocs/op
PASS
ok  	_/home/deepu/workspace/deepu105.github.io/temp	5.072s
Success: Benchmarks passed.
```

Consider using recursion when writing Go code for readability and immutability, but if performance is critical or if the number of iterations will be huge use standard loops.

### Lazy evaluation

Lazy evaluation or non-strict evaluation is the process of delaying evaluation of an expression until it is needed. In general, Go does strict/eager evaluation but for operands like `&&` and `||` it does a lazy evaluation. We can utilize higher-order-functions, closures, goroutines, and channels to emulate lazy evaluations.

Take this example where Go eagerly evaluates everything.

```go
func main() {
	fmt.Println(addOrMultiply(true, add(4), multiply(4)))  // 8
	fmt.Println(addOrMultiply(false, add(4), multiply(4))) // 16
}

func add(x int) int {
	fmt.Println("executing add") // this is printed since the functions are evaluated first
	return x + x
}

func multiply(x int) int {
	fmt.Println("executing multiply") // this is printed since the functions are evaluated first
	return x * x
}

func addOrMultiply(add bool, onAdd, onMultiply int) int {
	if add {
		return onAdd
	}
	return onMultiply
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

```go
func add(x int) int {
	fmt.Println("executing add")
	return x + x
}

func multiply(x int) int {
	fmt.Println("executing multiply")
	return x * x
}

func main() {
	fmt.Println(addOrMultiply(true, add, multiply, 4))
	fmt.Println(addOrMultiply(false, add, multiply, 4))
}

// This is now a higher-order-function hence evaluation of the functions are delayed in if-else
func addOrMultiply(add bool, onAdd, onMultiply func(t int) int, t int) int {
	if add {
		return onAdd(t)
	}
	return onMultiply(t)
}
```

This outputs the below and we can see that only required functions were executed

```
executing add
8
executing multiply
16
```

There are also other ways of doing it using Sync & Futures like [this](https://blog.merovius.de/2015/07/17/lazy-evaluation-in-go.html) and using channels and goroutines like [this](https://gist.github.com/nickcarenza/0ac9057ad06036d1e934). Doing Lazy evaluations in Go might not be worth the code complexity most of the times, but if the functions in question are heavy in terms of processing then its is absolutely worth it to lazy evaluate them.

### Type system

Go has a strong type system and also has pretty decent type inference. The only thing missing compared to other functional programming languages are something like case classes and pattern matching.

### Referential transparency

From Wikipedia:

> Functional programs do not have assignment statements, that is, the value of a variable in a functional program never changes once defined. This eliminates any chances of side effects because any variable can be replaced with its actual value at any point of execution. So, functional programs are referentially transparent.

Unfortunately, there are not many ways to strictly limit data mutation in Go, however by using pure functions and by explicitly avoiding data mutations and reassignment using other concepts we saw earlier this can be achieved. Go by default passes variables by value, except for slices and maps. So, avoid passing them by reference(using pointers) as much as possible.

For example, the below will mutate external state as we are passing a parameter by reference and hence doesn't ensure referential transparency

```go
func main() {
	type Person struct {
		firstName string
		lastName  string
		fullName  string
		age       int
	}
	var getFullName = func(in *Person) string {
		in.fullName = in.firstName + in.lastName // data mutation
		return in.fullName
	}

	john := Person{
		"john", "doe", "", 30,
	}

	fmt.Println(getFullName(&john)) // johndoe
	fmt.Println(john) // {john doe johndoe 30}
}
```

If we pass parameters by the value we can ensure referential transparency even if there is an accidental mutation of passed data within the function

```go
func main() {
	type Person struct {
		firstName string
		lastName  string
		fullName  string
		age       int
	}
	var getFullName = func(in Person) string {
		in.fullName = in.firstName + in.lastName
		return in.fullName
	}

	john := Person{
		"john", "doe", "", 30,
	}

	fmt.Println(getFullName(john))
	fmt.Println(john)
}
```

We cannot rely on this when passed parameters are maps or slices.

### [Data structures](https://en.wikipedia.org/wiki/Purely_functional_data_structure)

When using functional programming techniques it is encouraged to use functional data types such as Stacks, Maps and Queues.
Hence maps are better than arrays or hash sets in functional programming as data stores.

---

## Conclusion

This is just an introduction for those who are trying to apply some functional programming techniques in Go. There are a lot more that can be done in Go and with the addition of generics in the next major version, this should be even easier. As I said earlier functional programming is not a silver bullet but it offers a lot of useful techniques for more understandable, maintainable and testable code. It can co-exist perfectly well with imperative and object-oriented programming styles. In fact, we all should be using the best of everything.

---

I hope you find this useful. If you have any question or if you think I missed something please add a comment.

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
