---
title: 3 tips for clean & efficient code
description: 3 tips that can make your code cleaner, more efficient and easy to read
published: true
featured: false
tags: [beginners, codenewbie, codequality, programming]
canonical_url: https://deepu.tech/three-tips-for-clean-code/
devto_url: https://dev.to/deepu105/3-tips-for-clean-efficient-code-1ea8
devto_id: 220308
cover_image: https://i.imgur.com/GKIsoGc.jpg
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

One of the most important aspect of software engineering is code quality and one of the most important criteria should be readability and maintainability of your code, especially when working in teams where others have to read and understand your code. The best code in my opinion is that doesn't need any explanation or even documentation and that even a complete beginner can read and understand.

> It is easy to write complex and cryptic piece of code. It is much harder to write simple and readable code.

It is easy to get carried away and write long and complex functions and code that shows off how smart you are and how you can write something in the smartest way, especially when you area beginner and you are trying impress your peers. But the smartest way might not be the most readable and maintainable way. It doesn't take a lot of skill to do that IMO, but writing simple and clean code that is easy to read and maintain takes skill. Its not a skill that you can acquire overnight, its something you develop over the years.

Below are some tips to make your code more efficient, readable, easy to navigate and more maintainable. This is not an exhaustive list, its just some of them that could help.

## 1. Fail fast and early

When writing any logic try to do the failure assertions as early as possible and fail fast. It makes programs feel faster as you wouldn't execute a lot of stuff first just to fail at the end for something that you could have checked to begin with. This approach also makes your code easier to understand as it makes intent much clearer.

Consider the below function, let us use JavaScript on NodeJS for simplicity. Note that i'm using the syncrnous methods from the NodeJS FileSystem API for simplicity.

```js
function processFile(filePath) {
    if (fs.existsSync(filePath)) {
        // check if file exists
        var fileContent = fs.readFileSync(filePath, "utf8"); // read the file content

        if (fileContent !== "") {
            console.log("Content found");
            // do stuff
        } else {
            throw Error("No content found on file!");
        }
    } else {
        throw Error("File not found!");
    }
}
```

We are fetching the given file and doing some processing on it, if the file is not found or if the content is empty we throw an error. There is nothing wrong with this method but if you have a lot of steps in processing the reader has to go through all that first to see the error handling hence the intent is not that clear, also the [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) of the function is higher due to multiple if/else. Consider the below version of the same function

```js
function processFile(filePath) {
    if (!fs.existsSync(filePath)) {
        // check if file does not exist
        throw Error("File not found!");
    }

    var fileContent = fs.readFileSync(filePath, "utf8"); // read the file content

    if (fileContent === "") {
        throw Error("No content found on file!");
    }

    console.log("Content found");
    // do stuff
}
```

This does the same logic but is less complex and more readable. It has less cyclomatic complexity and the intent is clear

## 2. Return early

Similar to failing early it is also much nicer to return early, i.e use the language's ability to flow code based on returns to reduce the complexity of code and improve readability and intent. Consider the below logic added to our function

```js
function processFile(filePath) {
    ...
    console.log("Content found");

    // check if the file content is base64 encoded: Lib used https://github.com/miguelmota/is-base64
    if (isBase64(fileContent.trim())) {
        console.log("Decoding content");
        // check if the base64 content is image and return a placeholder
        if (isBase64(fileContent.trim(), { allowMime: true })) {
            return "Image content";
        } else {
            // decode to string
            var buffer = Buffer.from(fileContent, "base64");
            var decoded = buffer.toString("ascii");
            return decoded;
        }
    } else {
        return fileContent;
    }
}
```

The logic checks if the content is base64 encoded, and if not decodes it. Again the function works fine but consider the below version as well

```js
function processFile(filePath) {
    ...
    console.log("Content found");

    // check if the base64 content is image and return a placeholder
    if (isBase64(fileContent, { allowMime: true })) {
        return "Image content";
    }
    // check if the file content is not base64 encoded: Lib used https://github.com/miguelmota/is-base64
    if (!isBase64(fileContent.trim())) {
        return fileContent;
    }

    console.log("Decoding content");
    // decode to string
    var buffer = Buffer.from(fileContent, "base64");
    var decoded = buffer.toString("ascii");
    return decoded;
}
```

Isn't this much simpler and easier to reason with. So try to return early and keep the code flow simple.

## 3. Write small focused functions

Finally do not write huge functions, even if you are doing imperative style of programming try to break it down into small functions as much as possible. The above example is not a huge function, but still you could break it logically into two as below

```js
function decodeBase64(fileContent) {
    // check if the base64 content is image and return a placeholder
    if (isBase64(fileContent, { allowMime: true })) {
        return "Image content";
    }
    // check if the file content is not base64 encoded: Lib used https://github.com/miguelmota/is-base64
    if (!isBase64(fileContent.trim())) {
        return fileContent;
    }

    console.log("Decoding content");
    // decode to string
    var buffer = Buffer.from(fileContent, "base64");
    var decoded = buffer.toString("ascii");
    return decoded;
}

function processFile(filePath) {
    ...
    console.log("Content found");
    return decodeBase64(fileContent);
}
```

Having smaller focused functions helps with following

-   Unit testing becomes easier.
-   Functions become reuseable and composable.
-   Easier to focus and read, without having to build a mental model of the entire logic
-   Easier to change something in a small function than in a huge one, as you will have less cases to worry about.
-   Easier to debug and easier to spot bugs.
-   reduces side effects as the function does something very focused.

## Bonus: Write pure functions

This is not a functional programming thing, though it was made popular by FP. In general mutations are always tricky and could cause unwanted bugs. When we try to avoid side effects(includes external date mutations) by keeping small functions pure we also reduce the surface area for such bugs. So keep your pure functions separate from impure functions and try to write as much as pure functions. Do side-effects and external data/state mutations from within a unction only if its unavoidable. You can follow this regardless of programming paradigm you are following.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

---

Cover image credit: Photo by [Christopher Robin Ebbinghaus](https://unsplash.com/@cebbbinghaus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash
