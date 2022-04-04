---
title: Golang Finally Gets Generics! Does It Make Go a Better Language?
published: true
description: Let's see if Golang became better with the addition of generics.
tags: [go, programming, languages, thepragmaticprogrammer]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/snu9zy2ywp0ftfcthda2.jpg
canonical_url: https://deepu.tech/go-impressions-part-2/
series: languages
---

So Golang finally made the sane decision to add support for generics, in version 1.18, after dragging it out for years and after multiple proposals. Well, simplicity is nice when you are a newbie in the language but becomes annoying really fast, in my personal experience, especially in large codebases.

{% twitter 1505784416471158788 %}

As a polyglot developer who has worked extensively in Golang for a few years, I have been quite critical of it [in a previous blog post titled "My reflections on Golang"](https://deepu.tech/reflection-on-golang/), written in 2019. If you are ready to be triggered, go ahead and read that post and come back here. One of my biggest gripes was that Go didn't have generics. So now that it has generics, I decided to re-evaluate my opinions about Go.

## Generics in Go

First, let's see how generics work in Go. Fortunately, generics in Go work pretty much the same way as in other languages like C++, Java, C#, and Rust. Of course, there will be some minor differences and some missing features since the Go version is, as you guessed, simpler. The design document for generics has some [comparisons with Java, C++, and Rust](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#comparison-with-java).
Though I would have preferred to see the `<>` syntax to keep in line with most other popular languages, there seem to be [pretty good reasons](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#why-not-use-the-syntax-like-c_and-java) to use `[]` instead, like avoiding ambiguity when mixed with channels and multiple variables assignments.

Let's look at some examples. One common use case where Go developers usually write duplicated code is array and map operations like find, filter, map, and reduce. I can remember being annoyed about this and for the lack of a library like [Lodash](https://lodash.com) for the same reason. With generics, you can finally write reusable utility code once and use it for all data types.

Let's write a findIndex method for arrays with and without generics.

### Without generics

Without generics, you would write a function for each type of data you want to use, and as you start using structs, you would need a function for every unique struct. In large codebases, it's common to find thousands and thousands of lines of code just covering utilities where the only difference would be the type of argument in the method signature. This is the complete opposite of the DRY (Don't repeat yourself) principle. Every time you have to use a new data type, you must write a new function or a new block of code. Yikes!

```go
func main() {
	a := FindIndexFromStringArray([]string{"a", "b", "c"}, "a")
	b := FindIndexFromIntArray([]int{1, 2, 3}, 2)
	c := FindIndexFromFloat64Array([]float64{1.1, 2.2, 3.3}, 3.3)
	println(a, b, c)
}

func FindIndexFromStringArray(arr []string, target string) int {
	for i, v := range arr {
		if v == target {
			return i
		}
	}
	return -1
}

func FindIndexFromIntArray(arr []int, target int) int {
	for i, v := range arr {
		if v == target {
			return i
		}
	}
	return -1
}

func FindIndexFromFloat64Array(arr []float64, target float64) int {
	for i, v := range arr {
		if v == target {
			return i
		}
	}
	return -1
}

// and more
```

### With generics

You can simplify the above code to one function with generics, and it will work for all possible data types you pass.

{% raw  %}
```go
func main() {
	type Foo struct {
		a string
		b bool
	}

	a := FindIndexFromArray([]string{"a", "b", "c"}, "a")
	b := FindIndexFromArray([]int{1, 2, 3}, 2)
	c := FindIndexFromArray([]float64{1.1, 2.2, 3.3}, 3.3)
	d := FindIndexFromArray([]Foo{{"a", true}, {"b", false}, {"c", true}}, Foo{"a", true})
	println(a, b, c, d)
}

func FindIndexFromArray[T comparable](arr []T, target T) int {
	for i, v := range arr {
		if v == target {
			return i
		}
	}
	return -1
}
```
{% endraw  %}

Generics would significantly reduce duplicated code in your codebase. You can also write other useful generic functions like map, reduce, filter, and so on for arrays and maps. Here are some [examples from the official design document](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#examples).

```go
// Map over any slice using the given mapping function.
func Map[T1, T2 any](s []T1, f func(T1) T2) []T2 {
  r := make([]T2, len(s))
  for i, v := range s {
    r[i] = f(v)
  }
  return r
}

floats := Map([]int{1, 2, 3}, func(i int) float64 { return float64(i) })

// Reduce any slice using the given reduction function.
func Reduce[T1, T2 any](s []T1, initializer T2, f func(T2, T1) T2) T2 {
  r := initializer
  for _, v := range s {
    r = f(r, v)
  }
  return r
}

sum := Reduce([]int{1, 2, 3}, 0, func(i, j int) int { return i + j })

// Filter any slice using the given predicate function.
func Filter[T any](s []T, f func(T) bool) []T {
  var r []T
  for _, v := range s {
    if f(v) {
      r = append(r, v)
    }
  }
  return r
}

evens := Filter([]int{1, 2, 3}, func(i int) bool { return i%2 == 0 })

// Keys returns a slice of keys from a map.
func Keys[K comparable, V any](m map[K]V) []K {
  r := make([]K, 0, len(m))
  for k := range m {
    r = append(r, k)
  }
  return r
}

keys := Keys(map[string]int{"a":2, "b":4})
```

When declaring generic types, the type can be specific (`T comparable`), any (`T any`), approximate (`T ~string`), or a union (`T int64 | float64 | int`). Type constraints can be defined as type aliases as well.

Like in Java or Rust, you can use generics in Go for functions, struct containers, interface implementations, etc. This can help to reduce boilerplate code and make writing Go code much more enjoyable.

## Does this make Go better?

Yes! Without a doubt, generics make Go much more enjoyable to write. While generics adds a bit of complexity, IMO the amount of boilerplate you can get rid of is worth that added complexity. For polyglot developers, who are used to languages like Java, TypeScript, Rust, C#, or C++, this is an excellent feature that might sway them to try Go. I talked about the things I liked in Go in my [previous post](https://deepu.tech/reflection-on-golang/), so I'm not going to reiterate that here. Let's see if what I didn't like remains the same and if generics help alleviate those pain points. Please note that this is very opinionated base on my tastes and experiences, especially as a polyglot developer.

- **Generics**: ✅ Finally here and works great
- **Error handling**: ❌ It is still tedious and needs boilerplate
- **Default values**: ❌ There is still no default values for methods
- **Too much boilerplate**: ✅ Introduction of generics will remove a lot of it
- **Dependency management**: ❌ Still not a fan of Go's dependency management and especially the way breaking versions are handled
- **Source code in GOPATH**: ✅ Not a problem anymore with Go modules
- **Confusing pointer behaviors**: ❌ Pointers are still confusing and need to be used with care
- **Struct hell**: ✅ Generics should help to make this pain point much less painful
- **Weird interface construct**: ❌ I'm still not a fan of this, and IMO Rust has a much better design here
- **Single GC algorithm**: ❌ Maybe I'm just spoiled by Java. Many testimonials detail how [the Go GC algorithm](https://deepu.tech/memory-management-in-golang/) doesn't work in some use cases.
- **Developer experience**: ✅ I would say this has improved over the years. Still not as good as Rust, but better than many other languages.

## Where does that leave Go?

Recently I was pretty interested in systems programming and CLIs. I would have used Go for those if I hadn't known Rust. Once I started using Rust, I gave up on Go, as [I didn't see much reason to use it over Rust](https://deepu.tech/my-second-impression-of-rust/) for the use cases that I was interested in. Honestly, the annoyance with Go was one reason that prompted me to learn Rust. I did use Go for some simple stuff like building a [CLI for the Elgato Keylights](https://github.com/deepu105/keylight), and probably if I had a use case of building microservices, then I might have given Go a thought along with Java. With generics making Go much better, IMO, I might give Go more weightage for microservices and simple CLIs.
