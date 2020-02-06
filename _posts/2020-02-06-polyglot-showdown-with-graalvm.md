---
title: "Polyglot inception with GraalVM. Why? Because it's fun \U0001F3C4"
description: >-
  Let's test drive GraalVM with a program that uses many languages together.
  Why? Because it's fun!
published: true
featured: false
tags:
  - java
  - python
  - javascript
  - rust
canonical_url: 'https://deepu.tech/polyglot-showdown-with-graalvm/'
cover_image: 'https://i.imgur.com/SHMvb6A.jpg'
devto_id: 256804
devto_url: >-
  https://dev.to/deepu105/polyglot-inception-with-graalvm-why-because-it-s-fun-aa
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

Have you heard of [GraalVM](https://www.graalvm.org/)? If you haven't you should check it out. It is an exciting technology, you know the kind that gets a polyglot developer going 😉

From the website:

> GraalVM is a universal virtual machine for running applications written in JavaScript, Python, Ruby, R, JVM-based languages like Java, Scala, Groovy, Kotlin, Clojure, and LLVM-based languages such as C and C++.

GraalVM is one of its kind. It is a polyglot VM developed at Oracle and apart from its polyglot capabilities it also has been proven to be quite performant and has a smaller memory footprint. It has support for building native images and some modern Java microservice frameworks like [Micronaut](https://micronaut.io/) and [Quarkus](https://quarkus.io/) support GraalVM as it provides faster startup and smaller footprint which is ideal in microservice architectures.

So what are the capabilities of GraalVM? Let us take a quick look

## GraalVM features

-   [Drop in JDK replacement](https://www.graalvm.org/docs/why-graal/#for-java-programs) - Some benchmarks show GraalVM to be faster and less memory hungry than other JDK vendors, I haven't personally run any benchmarks
-   [Drop in NodeJS replacement](https://www.graalvm.org/docs/why-graal/#for-nodejs-programs) - Uses GraalVM instead of V8 as the engine for NodeJS
-   Faster runtime for [Ruby](https://pragtob.wordpress.com/2017/01/24/benchmarking-a-go-ai-in-ruby-cruby-vs-rubinius-vs-jruby-vs-truffle-a-year-later/) and [R](https://medium.com/graalvm/faster-r-with-fastr-4b8db0e0dceb) than the default implementations
-   [Ahead-of-time(AOT) compiled native images](https://www.graalvm.org/docs/why-graal/#for-microservices-frameworks)
-   [Polyglot capabilities](https://www.graalvm.org/docs/why-graal/#for-ruby-r-or-python) - Java(Any JVM language), JavaScript, Ruby, Python, R, C/C++/Rust(LLVM) along with language interoperability
-   [The Truffle Language Implementation framework](https://www.graalvm.org/docs/why-graal/#for-your-languages-and-tools) to implement third-party language support

## Install GraalVM

Before we start, let us setup GraalVM. I used SDKMAN, you can also follow [this](https://www.graalvm.org/docs/getting-started/) if you like to install it manually.

1. First [install SDKMAN](https://sdkman.io/install) if you don't have it already

```sh
sdk list java
# you can use a newer version if available
sdk install java 19.3.1.r11-grl
sdk use java 19.3.1.r11-grl
# Check everything
java -version
node -v
lli --version
```

The above will install GraalVM and set it up as `java`, `node` and `lli` context. **Please note**: If you start a new terminal session, you would have to run `sdk use java 19.3.1.r11-grl` again.

2. Install LLVM toolchain, Python and Ruby support

```sh
gu install llvm-toolchain
export LLVM_TOOLCHAIN=\$(lli --print-toolchain-path)

gu install python
gu install ruby
```

3. Install Rust

```sh
curl https://sh.rustup.rs -sSf | sh
```

That's it we are ready to roll!

# Lets have some fun

As a polyglot developer, GraalVM is quite interesting to me as I can use many languages I love together making use of the best parts from each. Let's explore the polyglot capabilities offered by GraalVM, please note that support for Python, Ruby, R, and Rust are still in the experimental stage and hence your mileage may vary. We will build a program today using Java, JavaScript, Ruby, Python, and C++.

> I wanted to use Rust and Go as well. While Rust mostly works via the GraalVM `lli` command line, it has a lot of limitations when embedded in polyglot mode. After a lot of fiddling around, I did manage to get it working. For Golang, it might be possible with [this](https://github.com/zegl/tre) Go LLVM compiler as shown [here](https://gist.github.com/eginez/d69e3e1c4045eb692a274bd2bd5d31d6), but it's having its own set of issues as well when I tried. So I have given up on Golang for now. Let me know if any of you got it working.

We will have a simple(silly 😉) application written in Java that composes methods from different languages for each step from within Java

1.  **Python**: Filters out the Fibonacci numbers from the given input array
2.  **JavaScript**: Find the cube of each number in the output array from the previous step
3.  **C++**: Get the sum of the numbers in the output array from the previous step
4.  **Rust**: Find the cube-root of the number from the previous step
5.  **Ruby**: Find factorial of the number from the previous step
6.  **Java**: Finally print the result(this is also the wrapper program)

If you prefer a more complex example, check [this](https://github.com/graalvm/examples/tree/master/weather_predictor) out.

### Step 1: Java

Let's start with our Java wrapper program `Polyglot.java`

```java
import java.io.*;
import org.graalvm.polyglot.*;

class Polyglot {
    // We create a polyglot context to evaluate source files
    static Context polyglotCtx = Context.newBuilder().allowAllAccess(true).build();

    // Utility method to load and evaluate a source file
    static Value loadSource(String language, String fileName) throws IOException {
        File file = new File(fileName);
        Source source = Source.newBuilder(language, file).build();
        return polyglotCtx.eval(source);
    }

    // Utility method to convert arrays between languages
    static int[] getIntArrayFromValue(Value val) {
        int[] out = new int[(int) val.getArraySize()];
        if (val.hasArrayElements()) {
            for (int i = 0; i < val.getArraySize(); i++) {
                out[i] = val.getArrayElement(i).asInt();
            }
        }
        return out;
    }

    public static void main(String[] args) throws IOException {

        int[] input = new int[] { 4, 2, 8, 5, 20, 1, 40, 13, 23 };

        /* PYTHON: Get the Fibonacci numbers from the array */
        loadSource("python", "pythonpart.py");
        Value getFibonacciNumbersFn = polyglotCtx.getBindings("python").getMember("getFibonacciNumbers");
        int[] fibNumbers = getIntArrayFromValue(getFibonacciNumbersFn.execute(input));

        /* JAVASCRIPT: Find cube of numbers in the output array */
        loadSource("js", "jspart.js");
        Value findCubeOfNumbersFn = polyglotCtx.getBindings("js").getMember("findCubeOfNumbers");
        int[] sqrNumbers = getIntArrayFromValue(findCubeOfNumbersFn.execute(fibNumbers));

        /* C++: Get the sum of the numbers in the output array */
        loadSource("llvm", "cpppart");
        Value getSumOfArrayFn = polyglotCtx.getBindings("llvm").getMember("getSumOfArray");
        int sum = getSumOfArrayFn.execute(sqrNumbers, sqrNumbers.length).asInt();

        /* Rust: Find the cube root of sum */
        Value cubeRootFn = loadSource("llvm", "rustpart.bc").getMember("cube_root");
        // println! macro does not work from Rust when embedded, some issue with mangling
        System.out.println("Rust => Find cube root of the number");
        Double cubeRoot = cubeRootFn.execute(sum).asDouble();

        /* RUBY: Find factorial of the number */
        Value factorialFn = loadSource("ruby", "rubypart.rb");
        long out = factorialFn.execute(cubeRoot).asLong();

        System.out.println("Sum: " + sum);
        System.out.println("Cube Root: " + cubeRoot);
        System.out.println("Factorial: " + out);
    }
}
```

The utility functions are to simplify the code, now let's look at each step where it composes the functions.

### Step 2: Python

We are executing the `getFibonacciNumbers` function located in file `pythonpart.py` and passing it our input array.

```java
/* PYTHON: Get the Fibonacci numbers from the array */
loadSource("python", "pythonpart.py");
Value getFibonacciNumbersFn = polyglotCtx.getBindings("python").getMember("getFibonacciNumbers");
int[] fibNumbers = getIntArrayFromValue(getFibonacciNumbersFn.execute(input));
```

Let's look at `pythonpart.py`, it is a standard python program that takes an array and filters out the Fibonacci numbers from it and returns the resulting array.

```python
import math

def isPerfectSquare(num):
    n = int(math.sqrt(num))
    return (n * n == num)

# Function to check if the number is in Fibonacci or not
def getFibonacciNumbers(array):
    print("Python => Filtering Fibonacci number from the array");

    out = []
    n = len(array)
    count = 0
    for i in range(n):
        if (isPerfectSquare(5 * array[i] * array[i] + 4) or
            isPerfectSquare(5 * array[i] * array[i] - 4)):

            out.append(array[i]);
            count = count + 1

    if (count == 0):
        print("None present");

    return out
```

### Step 3: JavaScript

We are executing the `findCubeOfNumbers` function located in file `jspart.js` and passing the result from the Python function.

```java
/* JAVASCRIPT: Find cube of numbers in the output array */
loadSource("js", "jspart.js");
Value findCubeOfNumbersFn = polyglotCtx.getBindings("js").getMember("findCubeOfNumbers");
int[] sqrNumbers = getIntArrayFromValue(findCubeOfNumbersFn.execute(fibNumbers));
```

Let's look at `jspart.js`, it is a standard JavaScript function that takes an array and maps over the elements and returns the array. But we had to call `Array.prototype.map.call` instead of just `array.map` as the array passed by Java is not standard JS array.

```js
function findCubeOfNumbers(array) {
    console.log("JS => Getting cube of numbers in the array");

    return Array.prototype.map.call(array, it => Math.pow(it, 3));
}
```

### Step 4: C++

We are executing the `getSumOfArray` function located in the `cpppart` binary file. We pass the result from JS function and the length of the array here. We have to use compiled binary here unlike Python, Ruby, and JavaScript which are interpreted languages.

```java
/* C++: Get the sum of the numbers in the output array */
loadSource("llvm", "cpppart");
Value getSumOfArrayFn = polyglotCtx.getBindings("llvm").getMember("getSumOfArray");
int sum = getSumOfArrayFn.execute(sqrNumbers, sqrNumbers.length).asInt();
```

The source of the binary is in `cpppart.cpp` file. Which is compiled using the below

```sh
export LLVM_TOOLCHAIN=$(lli --print-toolchain-path)
$LLVM_TOOLCHAIN/clang++ -shared cpppart.cpp -lpolyglot-mock -o cpppart
```

Let's look at `cpppart.cpp`, it is a standard C++ program that exports a function. It takes an array and its length as the arguments and returns a number

```c++
#include<iostream>
using namespace std;

// Function to find the sum of integer array
// extern "C" is required to suppress mangling
extern "C" int getSumOfArray(int array[], int size) {
    printf("C++ => Find sum of numbers in an array\n");

    int i, sum = 0;
    for(i = 0; i < size; i++) {
        sum += array[i];
    }
    return sum;
}
```

### Step 5: Rust

We are executing the `cube_root` function located in file `rustpart.bc`, compiled from `rustpart.rs`. We pass the result from C++ function here.

```java
/* Rust: Find the cube root of sum */
Value cubeRootFn = loadSource("llvm", "rustpart.bc").getMember("cube_root");
// println! macro does not work from Rust when embedded, some issue with mangling
System.out.println("Rust => Find cube root of the number");
Double cubeRoot = cubeRootFn.execute(sum).asDouble();
```

Let's look at `rustpart.rs`, it is a standard Rust function that takes a number finds its cube root and returns it. But we do have to specify `#[no_mangle]` annotation and we cannot use any crates as well apparently. Simples functions with primitive args/output seem to work but more complex functions do not work when embedded.

```rust
#[no_mangle]
fn cube_root(arg: f64) -> f64 {
    arg.cbrt()
}

fn main(){}
```

We compile the Rust source to binary code using `rustc` compiler with the `--emit=llvm-bc` flag

```sh
rustc --emit=llvm-bc rustpart.rs
```

### Step 6: Ruby

We are executing the `factorial` function located in file `rubypart.rb`. We are passing the result from the Rust function here.

```java
/* RUBY: Find factorial of the number */
Value factorialFn = loadSource("ruby", "rubypart.rb");
long out = factorialFn.execute(cubeRoot).asLong();
```

Let's look at `rubypart.rb`, it is a standard Ruby lambda function that takes a number and returns its factorial.

```ruby
factorial = -> (num) {
    puts "Ruby => Find factorial of the number"
    (1..num).inject {|product, num| product * num }
}
```

And Finally, we print the outputs with Java.

### Run the program

To run this program we need to compile the C++, Rust and Java files first, and then run it using the JVM provided by GraalVM. Below are the steps, you can save this as `run.sh` and execute it.

```sh
export LLVM_TOOLCHAIN=$(lli --print-toolchain-path)
$LLVM_TOOLCHAIN/clang++ -shared cpppart.cpp -lpolyglot-mock -o cpppart || exit

rustc --emit=llvm-bc rustpart.rs || exit

javac Polyglot.java && java Polyglot
```

It will produce the below output:

![Command output](https://i.imgur.com/azYHYGy.png)

---

# Conclusion

Wasn't this fun? So is such a polyglot capability useful? Well that depends, the polyglot capabilities of GraalVM are still not production-ready but it is still useful as it opens up the door for real language interoperability, imagine being able to use a library from any language from your program, this is already possible for many C, Ruby, R, JS and Java libraries with GraalVM but as support becomes better we would be able to break free from being limited to one language. GraalVM seems to be much faster for languages like Ruby than the standard CRuby or JRuby for example and that is promising as it would mean you wouldn't have to worry much about overheads when embedding multiple languages in your program.

GraalVM is one of the most revolutionary technologies I have encountered in recent times and I hope the polyglot language support becomes production-ready soon combined with its native image capabilities it would be a very powerful platform for truly polyglot applications.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Based on official logos of respective projects.

