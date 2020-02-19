---
title: Forget NodeJS! Build native TypeScript applications with Deno
description: "Deno is a modern JavaScript/TypeScript runtime & scripting environment. It is what NodeJS should have been according to Ryan Dahl who created both tools"
published: false
featured: false
tags: [typescript, javascript, nodejs, deno]
series:
canonical_url: https://deepu.tech/deno-runtime-for-typescript/
cover_image:
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

Have you heard of [Deno](https://deno.land/)? If not you should check it out. Deno is a modern JavaScript/TypeScript runtime & scripting environment. Deno is what NodeJS should have been according to Ryan Dahl who created NodeJS. Deno was also created by Ryan Dahl in 2018 and is built with [V8](https://v8.dev/), [Rust](https://www.rust-lang.org/) and [Tokio](https://github.com/tokio-rs/tokio) with a focus on security, performance and ease of use. Deno takes many inspirations from Go and Rust.

In this post let us see what Deno offers and how it compares to NodeJS. You can also watch the same in a talk format I did for Devoxx Ukraine below

{% youtube 8LZ0JmalhZE %}

Let us install Deno before we proceed.

# Install Deno

There are multiple ways to install Deno. If you are on Mac or Linux, you can install it via [Homebrew](https://formulae.brew.sh/formula/deno). On windows you can use [Chocolatey](https://chocolatey.org/packages/deno).

```sh
# Mac/Linux
brew install deno

# windows
choco install deno
```

Check [the official doc](https://deno.land/std/manual.md#setup) for other installation methods

Now that we have Deno installed, let us look at its features.

# Features

-   TypeScript supported out of the box without any transpiling setup
-   Can execute remote scripts
-   Secure by default. No file, network, or environment access by default unless explicitly enabled
-   Provides curated standard modules
-   Supports only ES modules. Modules are cached globally and are immutable
-   Built in tooling (format, lint, test, bundle and so on)
-   Deno applications can be browser compatible
-   Promise based API(Async/await supported) and no callback hell
-   Top level async support
-   Web assembly support
-   Subprocess using web workers
-   Lightweight multi-platform executable(~10MB)

> Deno does not use NPM for dependency management and hence there is no node_modules hell to deal with, which IMO is a huge selling point

![shut up and take my money](https://i.imgur.com/1DCgtUa.jpg)

## TypeScript support

Deno has native support for TypeScript and JavaScript. You can write Deno applications directly in TypeScript and Deno can execute them without any transpiling step from your side. Let us try it

```typescript
function hello(person: string) {
    return "Hello, " + person;
}

console.log(hello("John"));
```

Save this to a `.ts` file and execute `deno hello.ts`. You will see deno compiles the file and executes it.

Deno supports the latest version of TypeScript and keeps the support up to date.

## Remote script execution

With Deno you can run a local or remote script quite easily. Just point to the file or http URL of the script and Deno will download and execute it

```sh
deno https://deno.land/std/examples/welcome.ts
```

This means you can just point to a raw GitHub URL to execute a script, no hassle of installing something. The Deno default security model Deno is applied to remote scripts as well.

## Secure by default

By default a script run with Deno cannot access the file system, network, subprocess or environment. This creates a sandbox for the script and user has to explicitly provide permissions. This puts the control in the hands of end user.

-   Granular permissions
-   Permissions can be revoked
-   Permissions whitelist support

The permissions can be provided via command line flags during execution or programmatically when using sub process. If permission is not provided either way then Deno will prompt you to provide the permission during runtime.

The available flags are:

```
--allow-all
--allow-env
--allow-write
--allow-net
--allow-run
```

Let us see an example:

```typescript
console.info("Hello there!");

import { serve } from "https://deno.land/std/http/server.ts";

const server = serve(":8000");

console.info("Server created!");
```

The snippet tries to access the network and hence when you run the program with Deno it will prompt as below

![deno security](https://i.imgur.com/Y1GXViO.png)

To avoid prompts we can pass the `--allow-net` or `--allow-all` flag when running the program.

![deno security no prompt](https://i.imgur.com/nVgPoIl.png)

## Standard modules

Deno provides standard modules like NodeJS, Go or Rust. The list is growing as newer versions are released. Currently available modules are:

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

Deno supports only ES Modules using a remote or local URL. This keeps dependency management simple and light. Unlike NodeJS, Deno doesn't try to be too smart here, which means:

-   `require()` is not supported, so no confusion with import syntax
-   No "magical" module resolution
-   Third party modules are imported by URL(Local and remote)
-   Remote code is fetched only once and cached globally for later use
-   Remote code is considered immutaable and never updated unless --reload flag is used
-   Dynamic imports are supported
-   Supports [import maps](https://deno.land/std/manual.md#import-maps)
-   Third party modules in [https://deno.land/x/](https://deno.land/x/)
-   NPM modules can be used if required as simple local file URL or from [jspm.io](https://jspm.io/) or [pika.dev](https://www.pika.dev/)

Hence we can any import any library that is available from a URL

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

Run this with the `--importmap` flag `deno --importmap import-map.json deno_playground.ts`. Please note that the flag should be before the filename.

## Built in tooling

## Browser compatibility

## Promise API

## Top level await

## Web assembly support

## Subprocess using web workers

# A Deno proxy application in action

---

# Conclusion

## Why is Deno better than NodeJS

## Why does it matter

## Challenges

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit:
