export type Author = {
  name: string;
  display_name: string;
  gravatar: string;
  email: string;
  web: string;
  twitter: string;
  mastodon: string;
  bsky?: string;
  github?: string;
  linkedin?: string;
  description: string;
};

export const authors: Record<string, Author> = {
  deepu: {
    name: "Deepu",
    display_name: "Deepu K Sasidharan",
    gravatar: "7f408bc67dc9ae3b288ee92d16d3c4c2",
    email: "deepu.k.sasidharan@gmail.com",
    web: "https://deepu.tech",
    twitter: "https://twitter.com/deepu105",
    mastodon: "https://mastodon.social/@deepu105",
    bsky: "https://bsky.app/profile/deepu105.bsky.social",
    github: "https://github.com/deepu105",
    linkedin: "https://www.linkedin.com/in/deepu05",
    description:
      "JHipster co-lead, Java Champion, Cloud Native Advocate, Developer Advocate, Author, Speaker, Software craftsman.",
  },
};

export const defaultAuthor = authors.deepu;
