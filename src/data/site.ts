/**
 * Site-wide identity facts. Everything here is static and shows up in the
 * JSON-LD graph that BaseLayout emits on every page, so search and AI engines
 * can resolve the author, the publisher, and the employers without guessing.
 */

export const SITE = {
  name: "Technorage",
  url: "https://deepu.tech",
  tagline: "Where I rant about technology and stuff!",
  description:
    "The personal site of Deepu K Sasidharan: posts on local LLMs, Rust, Java, Kubernetes, Linux, and OAuth, plus the terminal tools he maintains.",
  locale: "en_US",
  language: "en",
  logo: "/assets/images/logo.png",
  ogImage: "/assets/images/og-default.png",
};

const GRAVATAR = "https://www.gravatar.com/avatar/7f408bc67dc9ae3b288ee92d16d3c4c2?s=256&d=mm";

export const PERSON = {
  name: "Deepu K Sasidharan",
  alternateName: "deepu105",
  givenName: "Deepu",
  familyName: "Sasidharan",
  image: GRAVATAR,
  jobTitle: "Principal Developer Advocate",
  email: "deepu.k.sasidharan@gmail.com",
  url: `${SITE.url}/`,
  city: "Utrecht",
  country: "Netherlands",
  description:
    "Principal Developer Advocate at Auth0 (Okta), working on identity for AI agents. Creator of LlamaStash, KDash, and JWT UI. Java Champion and co-chair of JHipster. Writes about running local LLMs, Rust, Java, Kubernetes, and Linux.",
  // Short phrases first, canonical URLs for the topics with an official home.
  knowsAbout: [
    "local LLMs",
    "llama.cpp",
    "developer experience",
    "Rust (programming language)",
    "Java",
    "TypeScript",
    "Go (programming language)",
    "Kubernetes",
    "OAuth 2.0",
    "OpenID Connect",
    "Linux desktop",
    "JHipster",
    "https://www.rust-lang.org/",
    "https://www.java.com/",
    "https://www.typescriptlang.org/",
    "https://go.dev/",
    "https://kubernetes.io/",
    "https://github.com/ggml-org/llama.cpp",
    "https://oauth.net/2/",
    "https://openid.net/connect/",
    "https://www.archlinux.org/",
  ],
  knowsLanguage: ["en", "hi", "ml", "ta"],
  award: "Java Champion (2022)",
  sameAs: [
    "https://github.com/deepu105",
    "https://www.linkedin.com/in/deepu05",
    "https://bsky.app/profile/deepu105.bsky.social",
    "https://mastodon.social/@deepu105",
    "https://x.com/deepu105",
    "https://dev.to/deepu105",
    "https://speakerdeck.com/deepu105",
    "https://auth0.com/blog/authors/deepu-sasidharan/",
  ],
};

/** Organizations referenced from the Person node and as article publisher. */
export const ORGS = {
  // Publisher of this blog.
  publisher: {
    name: SITE.name,
    url: `${SITE.url}/`,
    description: "Technorage is the personal blog of Deepu K Sasidharan, covering local LLMs, Rust, Java, Kubernetes, Linux, and identity.",
    logo: `${SITE.url}${SITE.logo}`,
  },
  // Okta, Inc. is the legal employer; Auth0 is its customer identity platform.
  employer: {
    name: "Okta",
    alternateName: "Auth0",
    url: "https://www.okta.com",
    description: "Identity and access management company. Auth0 is Okta's customer identity platform.",
    sameAs: [
      "https://en.wikipedia.org/wiki/Okta,_Inc.",
      "https://github.com/okta",
      "https://www.linkedin.com/company/okta-inc-",
      "https://auth0.com",
    ],
  },
  community: {
    name: "JHipster",
    url: "https://www.jhipster.tech",
    description:
      "Open-source application development platform for modern Java and JavaScript applications. Deepu is co-chair and vice-president.",
    sameAs: ["https://github.com/jhipster", "https://x.com/jhipster"],
  },
};
