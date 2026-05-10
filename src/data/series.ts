export type SeriesMeta = {
  id: string;
  title: string;
  description: string;
};

export const seriesMeta: SeriesMeta[] = [
  {
    id: "Languages",
    title: "Languages",
    description:
      "Posts about different languages, my impression of languages and polyglot development.",
  },
  {
    id: "Memory Management",
    title: "Memory Management",
    description:
      "In this multi-part series, I aim to demystify the concepts behind memory management and take a deeper look at memory management in some of the modern programming languages.",
  },
  {
    id: "Concurrency in Modern Programming Languages",
    title: "Concurrency in Modern Programming Languages",
    description:
      "A multi-part series talking about concurrency in modern programming languages — building and benchmarking a concurrent web server inspired by the Rust book example in Rust, Go, JavaScript (NodeJS), TypeScript (Deno), Kotlin and Java to compare concurrency performance across platforms.",
  },
  {
    id: "Functional Programming",
    title: "Functional Programming",
    description: "Learn functional programming in different languages.",
  },
  {
    id: "Golang for JavaScript Developers",
    title: "Golang for JavaScript Developers",
    description: "Learn Golang from a JavaScript developer's perspective.",
  },
  {
    id: "Microservices with JHipster",
    title: "Microservices with JHipster",
    description:
      "Learn about building microservice architectures with JHipster, Kubernetes and Istio.",
  },
  {
    id: "GNU/Linux Environment for Developers",
    title: "GNU/Linux Environment for Developers",
    description: "Posts covering GNU/Linux setup and tools for developers.",
  },
  {
    id: "Passkeys",
    title: "Passkeys",
    description: "Posts about WebAuthn and Passkeys.",
  },
];
