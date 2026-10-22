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
      "Impressions and comparisons of programming languages, and why I stay polyglot instead of picking a favorite.",
  },
  {
    id: "Memory Management",
    title: "Memory Management",
    description:
      "How memory management works, from the fundamentals up through the JVM, V8, Go, and Rust.",
  },
  {
    id: "Concurrency in Modern Programming Languages",
    title: "Concurrency in Modern Programming Languages",
    description:
      "Building and benchmarking the same concurrent web server in Rust, Go, Node.js, Deno, Java, and Kotlin to compare concurrency.",
  },
  {
    id: "Functional Programming",
    title: "Functional Programming",
    description: "Functional programming applied in Java, Go, TypeScript, and Rust, with real examples.",
  },
  {
    id: "Golang for JavaScript Developers",
    title: "Golang for JavaScript Developers",
    description: "Learning Go from a JavaScript developer's point of view, one concept at a time.",
  },
  {
    id: "Microservices with JHipster",
    title: "Microservices with JHipster",
    description:
      "Building microservice architectures with JHipster, Kubernetes, and Istio, end to end.",
  },
  {
    id: "GNU/Linux Environment for Developers",
    title: "GNU/Linux Environment for Developers",
    description: "My GNU/Linux setup for development: Arch, windowing, terminals, and the tools I use.",
  },
  {
    id: "Passkeys",
    title: "Passkeys",
    description: "How WebAuthn and passkeys work for developers, and how to add them to Java apps.",
  },
  {
    id: "Local AI",
    title: "Local AI",
    description:
      "Running LLMs on my own laptop for day-to-day coding: the setup, LlamaStash, benchmarks, and how local models compare with frontier cloud models.",
  },
];
