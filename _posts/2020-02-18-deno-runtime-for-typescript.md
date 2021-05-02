---
title: Forget NodeJS! Build native TypeScript applications with Deno 🦖
description: "Deno is a modern JavaScript/TypeScript runtime & scripting environment. It is what NodeJS should have been according to Ryan Dahl who created both tools"
published: true
featured: false
tags:
  - typescript
  - javascript
  - nodejs
  - deno
canonical_url: 'https://deepu.tech/deno-runtime-for-typescript/'
cover_image: 'https://i.imgur.com/0FWtns5.jpg'
devto_id: 265496
devto_url: "https://dev.to/deepu105/forget-nodejs-build-native-typescript-applications-with-deno-kkb"
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

Have you heard of [Deno](https://deno.land/)? If not you should check it out. Deno is a modern JavaScript/TypeScript runtime & scripting environment. Deno is what NodeJS should have been according to Ryan Dahl who created NodeJS. Deno was also created by Ryan Dahl in 2018 and is built with [V8](https://v8.dev/), [Rust](https://www.rust-lang.org/) and [Tokio](https://github.com/tokio-rs/tokio) with a focus on security, performance, and ease of use. Deno takes many inspirations from Go and Rust.

In this post let us see what Deno offers and how it compares to NodeJS. You can also watch the same in a talk format I did for Devoxx Ukraine below

{% youtube 8LZ0JmalhZE %}

Let us install Deno before we proceed.

# Install Deno

There are multiple ways to install Deno. If you are on Mac or Linux, you can install it via [Homebrew](https://formulae.brew.sh/formula/deno). On Windows, you can use [Chocolatey](https://chocolatey.org/packages/deno).

```sh
# Mac/Linux
brew install deno

# windows
choco install deno
```

Check [the official doc](https://deno.land/std/manual.md#setup) for other installation methods

> Please note that Deno is still under active development and hence may not be ready for production use

Now that we have Deno installed, let us look at its features.

# Features

-   TypeScript supported out of the box without any transpiling setup
-   Can execute remote scripts
-   Secure by default. No file, network, or environment access by default unless explicitly enabled
-   Provides curated standard modules
-   Supports only ES modules. Modules are cached globally and are immutable
-   Built-in tooling (format, lint, test, bundle and so on)
-   Deno applications can be browser compatible
-   Promise based API(`async/await` supported) and no callback hell
-   Top-level `await` support
-   Sub-process using web workers
-   WebAssembly support
-   Lightweight multi-platform executable(~10MB)

> Deno does not use NPM for dependency management and hence there is no `node_modules` hell to deal with, which IMO is a huge selling point

![shut up and take my money](https://i.imgur.com/0FWtns5.jpg)

## TypeScript support

Deno has native support for TypeScript and JavaScript. You can write Deno applications directly in TypeScript and Deno can execute them without any transpiling step from your side. Let us try it

```typescript
function hello(person: string) {
    return "Hello, " + person;
}

console.log(hello("John"));
```

Save this to `hello.ts` file and execute `deno hello.ts`. You will see Deno compiles the file and executes it.

Deno supports the latest version of TypeScript and keeps the support up to date.

## Remote script execution

With Deno, you can run a local or remote script quite easily. Just point to the file or HTTP URL of the script and Deno will download and execute it

```bash
deno https://deno.land/std/examples/welcome.ts
```

This means you can just point to a raw GitHub URL to execute a script, no hassle of installing something. The default security model Deno is applied to remote scripts as well.

## Secure by default

By default, a script run with Deno cannot access the file system, network, sub-process, or environment. This creates a sandbox for the script and the user has to explicitly provide permissions. This puts control in the hands of the end-user.

-   Granular permissions
-   Permissions can be revoked
-   Permissions whitelist support

The permissions can be provided via command-line flags during execution or programmatically when using sub-processes.

The available flags are:

```
--allow-all | -A
--allow-env
--allow-hrtime
--allow-read=<whitelist>
--allow-write=<whitelist>
--allow-net=<whitelist>
--allow-plugin
--allow-run
```

> Please note that flags must be passed before the filename like `deno -A file.ts` or `deno run -A file.ts`. Anything passed after the filename will be considered as program arguments.

Let us see an example that creates a local HTTP server:

```typescript
console.info("Hello there!");

import { serve } from "https://deno.land/std/http/server.ts";

const server = serve(":8000");

console.info("Server created!");
```

The snippet tries to use the network and hence when you run the program with Deno it will fail with an error

To avoid the error we need to pass the `--allow-net` or `--allow-all` flag when running the program. You can also grant access to specific ports and domains as well using a whitelist. For example `deno --allow-net=:8000 security.ts`

![deno security no prompt](https://i.imgur.com/nVgPoIl.png)

## Standard modules

Deno provides [standard modules](https://deno.land/std/) like NodeJS, Go or Rust. The list is growing as newer versions are released. Currently available modules are:

-   `archive` - TAR archive handling
-   `colors` - ANSI colors on console
-   `datetime` - Datetime parse utilities
-   `encoding` - Encode/Decode CSV, YAML, HEX, Base32 & TOML
-   `flags` - CLI argument parser
-   `fs` - Filesystem API
-   `http` - HTTP server framework
-   `log` - Logging framework
-   `media_types` - Resolve media types
-   `prettier` - Prettier formatting API
-   `strings` - String utils
-   `testing` - Testing utils
-   `uuid` - UUID support
-   `ws` - Websocket client/server

The standard modules are available under `https://deno.land/std` namespace and are tagged in accordance with Deno releases.

```typescript
import { green } from "https://deno.land/std/fmt/colors.ts";
```

## ES Modules

Deno supports only [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) using a remote or local URL. This keeps dependency management simple and light. Unlike NodeJS, Deno doesn't try to be too smart here, which means:

-   `require()` is not supported, so no confusion with import syntax
-   No "magical" module resolution
-   Third-party modules are imported by URL(Local and remote)
-   Remote code is fetched only once and cached globally for later use
-   Remote code is considered immutable and never updated unless `--reload` flag is used
-   Dynamic imports are supported
-   Supports [import maps](https://deno.land/std/manual.md#import-maps)
-   Third-party modules are available in [https://deno.land/x/](https://deno.land/x/)
-   NPM modules can be used, if required, as simple local file URL or from [jspm.io](https://jspm.io/) or [pika.dev](https://www.pika.dev/)

Hence we can any import any library that is available from a URL. Let's build on our HTTP server example

```typescript
import { serve } from "https://deno.land/std/http/server.ts";
import { green } from "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/colors.ts";
import capitalize from "https://unpkg.com/lodash-es@4.17.15/capitalize.js";

const server = serve(":8000");

console.info(green(capitalize("server created!")));

const body = new TextEncoder().encode("Hello there\n");

(async () => {
    console.log(green("Listening on http://localhost:8000/"));
    for await (const req of server) {
        req.respond({ body });
    }
})();
```

The import paths can be made nicer by using an import map below

```json
{
    "imports": {
        "http/": "https://deno.land/std/http/",
        "fmt/": "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/",
        "lodash/": "https://unpkg.com/lodash-es@4.17.15/"
    }
}
```

Now we can simplify the paths as below

```typescript
import { serve } from "http/server.ts";
import { green } from "fmt/colors.ts";
import capitalize from "lodash/capitalize.js";

const server = serve(":8000");

console.info(green(capitalize("server created!")));

const body = new TextEncoder().encode("Hello there\n");

(async () => {
    console.log(green("Listening on http://localhost:8000/"));
    for await (const req of server) {
        req.respond({ body });
    }
})();
```

Run this with the `--importmap` flag `deno --allow-net=:8000 --importmap import-map.json server.ts`. Please note that the flags should be before the filename. Now you can access `http://localhost:8000` to verify this.

## Built-in tooling

Deno takes inspiration from Rust and Golang to provide built-in tooling, this IMO is great as it helps you get started without having to worry about setting up testing, linting and bundling frameworks. The below are tools currently available/planned

-   Dependency inspector (`deno info`): Provides information about cache and source files
-   Bundler (`deno bundle`): Bundle module and dependencies into a single JavaScript file
-   Installer (`deno install`): Install a Deno module globally, the equivalent of `npm install`
-   [Test runner](https://github.com/denoland/deno/tree/master/std/testing) (`deno test`): Run tests using the Deno built-in test framework
-   Type info (`deno types`): Get the Deno TypeScript API reference
-   Code formatter (`deno fmt`): Format source code using Prettier
-   Linter (planned) (`deno lint`): Linting support for source code
-   Debugger (planned) (`--debug`): Debug support for Chrome Dev tools

For example, with Deno, you can write test cases easily using provided utilities

Let's say we have `factorial.ts`

```typescript
export function factorial(n: number): number {
    return n == 0 ? 1 : n * factorial(n - 1);
}
```

We can write a test for this as below

```typescript
import { test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factorial } from "./factorial.ts";

test(function testFactorial(): void {
    assertEquals(factorial(5), 120);
});

test(function t2(): void {
    assertEquals("world", "worlds");
});
```

## Browser compatibility

Deno programs or modules can be run on a browser as well if they satisfy the below conditions

-   The program must are written completely in JavaScript and should not use the global Deno APIs
-   If the program is written in Typescript, it must be bundled as JavaScript using `deno bundle` and should not use the global Deno APIs

For browser compatibility Deno also supports `window.load` and `window.unload` events. `load` and `unload` events can be used with `window.addEventListener` as well.

Let us see below sample, this can be run using `deno run` or we can package it and execute in a browser

```typescript
import capitalize from "https://unpkg.com/lodash-es@4.17.15/capitalize.js";

export function main() {
    console.log(capitalize("hello from the web browser"));
}

window.onload = () => {
    console.info(capitalize("module loaded!"));
};
```

We can package this using `deno bundle example.ts browser_compatibility.js` and use the `browser_compatibility.js` in an HTML file and load it in a browser. Try it out and look at the browser console.

## Promise API

Another great thing about Deno is that all of its API is [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) based which means, unlike NodeJS we do not have to deal with callback hells. Also, the API is quite consistent across standard modules. Let us see an example:

```typescript
const filePromise: Promise<Deno.File> = Deno.open("dummyFile.txt");

filePromise.then((file: Deno.File) => {
    Deno.copy(Deno.stdout, file).then(() => {
        file.close();
    });
});
```

But we said no callbacks right, the good thing about Promise API is that we can use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax, so with that, we can rewrite above

```typescript
const filePromise: Promise<Deno.File> = Deno.open("dummyFile.txt");

filePromise.then(async (file: Deno.File) => {
    await Deno.copy(Deno.stdout, file);
    file.close();
});
```

Run `deno -A example.ts` to see it in action, don't forget to create the `dummyFile.txt` with some content

## Top-level `await`

The above code still uses a callback, what if we can use `await` for that as well, luckily Deno has support for the [top-level `await`](https://github.com/tc39/proposal-top-level-await) proposal(Not supported by TypeScript yet). With this, we can rewrite the above

```typescript
const fileName = Deno.args[0];

const file: Deno.File = await Deno.open(fileName);

await Deno.copy(Deno.stdout, file);

file.close();
```

Isn't that neat? Run it as `deno -A example.ts dummyFile.txt`

## Subprocess using web workers

Since Deno uses the V8 engine which is single-threaded, we have to use a sub-process like in NodeJS to spawn new threads(V8 instance). This is done using service workers in Deno. Here is an example, we are importing the code we used in the top-level `await` example in the subprocess here.

```typescript
const p = Deno.run({
    args: ["deno", "run", "--allow-read", "top_level_await.ts", "dummyFile.txt"],
    stdout: "piped",
    stderr: "piped"
});

const { code } = await p.status();

if (code === 0) {
    const rawOutput = await p.output();
    await Deno.stdout.write(rawOutput);
} else {
    const rawError = await p.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
}

Deno.exit(code);
```

You can run any CMD/Unix command as a subprocess like in NodeJS

## WebAssembly support

[WebAssembly](https://webassembly.org/) is one of the most innovative features to have landed on the JavaScript world. It lets us use programs written in any compatible language to be executed in a JS Engine. Deno has native support for WebAssembly. Let us see an example.

First, we need a WebAssembly(WASM) binary. Since we are focusing on Deno here, let's use a simple C program. You can also use Rust, Go or any other [supported language](https://github.com/appcypher/awesome-wasm-langs). In the end, you just need to provide a compiled `.wasm` binary file.

```c
int factorial(int n) {
	return n == 0 ? 1 : n * factorial(n - 1);
}
```

We can convert this to WASM binary using the online converter [here](https://wasdk.github.io/WasmFiddle/?pkku4) and import it in our TypeScript program below

```typescript
const mod = new WebAssembly.Module(await Deno.readFile("fact_c.wasm"));
const {
    exports: { factorial }
} = new WebAssembly.Instance(mod);

console.log(factorial(10));
```

Run `deno -A example.ts` and see the output from the C program.

---

# A Deno application in action

Now that we have an overview of Deno features, let's build a Deno CLI app

> Run `deno --help` and `deno run --help` to see all options that can be passed when you run a program. You can learn more about Deno features and API in the Deno [website](https://deno.land/) and [manual](https://deno.land/std/manual.md)

Let's build a simple proxy server that can be installed as a CLI tool. This is a really simple proxy, but you can add more features to make it smarter if you like

```typescript
console.info("Proxy server starting!");

import { serve } from "https://deno.land/std/http/server.ts";
import { green, yellow } from "https://deno.land/std/fmt/colors.ts";

const server = serve(":8000");

const url = Deno.args[0] || "https://deepu.tech";

console.info(green("proxy server created!"));

(async () => {
    console.log(green(`Proxy listening on http://localhost:8000/ for ${url}`));

    for await (const req of server) {
        let reqUrl = req.url.startsWith("http") ? req.url : `${url}${req.url}`;

        console.log(yellow(`URL requested: ${reqUrl}`));

        const res = await fetch(reqUrl);
        req.respond(res);
    }
})();
```

Run `deno --allow-net deno_app.ts https://google.com` and visit [http://localhost:8000/](http://localhost:8000/). You can now see all the traffic on your console. You can use any URL you like instead of Google.

Lets package and install the app.

```sh
deno install --allow-net my-proxy deno_app.ts
```

If you want to override the file use `deno install -f --allow-net my-proxy deno_app.ts`. You can also publish the script to an HTTP URL and install it from there.

Now just run `my-proxy https://google.com` and viola we have our own proxy app. Isn't that simple and neat.

---

# Conclusion

Let us see how Deno compares against NodeJS and why I believe it has great potential

## Why is Deno better than NodeJS

I consider Deno to be better than NodeJS for the following reasons. The creator of NodeJS thinks the same I guess

-   Easy to install - Single lightweight binary, built-in dependency management
-   Secure by default - Sandboxed, Fine-grained privileges and user-controlled
-   Simple ES module resolution - No smart(confusing) module system like NodeJS
-   Decentralized and globally cached third-party modules - No `node_modules` hell, efficient
-   No dependency on package managers or package registries(No NPM, No Yarn, No `node_modules`)
-   Native TypeScript support
-   Follows web standards and modern language features
-   Browser compatibility - Ability to reuse modules in browser and Deno apps
-   Remote script runner - Neat installation of scripts and tools
-   Built-in tooling - No hassle of setting up tooling, bundlers and so on

## Why does it matter

Why does it matter, why do we need another scripting environment? Isn't JavaScript ecosystem already bloated enough

-   NodeJS ecosystem has become too heavy and bloated and we need something to break the monopoly and force constructive improvements
-   Dynamic languages are still important especially in the below domains
    -   Data science
    -   Scripting
    -   Tooling
    -   CLI
-   Many Python/NodeJS/Bash use cases can be replaced with TypeScript using Deno
    -   TypeScript provides better developer experience
    -   Consistent and documentable API
    -   Easier to build and distribute
    -   Does not download the internet all the time
    -   More secure

## Challenges

This is not without challenges, for Deno to succeed it still has to overcome these issues

-   Fragmentation of libraries and modules
-   Not compatible with many of the NPM modules already out there
-   Library authors would have to publish a Deno compatible build(Not difficult but en extra step)
-   Migrating existing NodeJS apps will not be easy due to incompatible API
-   Bundles are not optimized so might need tooling or improvements there
-   Stability, since Deno is quite new (NodeJS is battle-tested)
-   Not production-ready

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Random image from the internet

