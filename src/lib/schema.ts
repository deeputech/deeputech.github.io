import { ORGS, PERSON, SITE } from "~/data/site";

export type JsonLd = Record<string, unknown>;

/** Stable @id anchors so nodes can reference each other instead of repeating. */
export const IDS = {
  website: `${SITE.url}/#website`,
  blog: `${SITE.url}/#blog`,
  person: `${SITE.url}/#person`,
  publisher: `${SITE.url}/#publisher`,
  employer: `${SITE.url}/#employer`,
  community: `${SITE.url}/#community`,
  page: (url: string) => `${url}#webpage`,
  article: (url: string) => `${url}#article`,
};

const abs = (path: string) => (path.startsWith("http") ? path : new URL(path, `${SITE.url}/`).toString());

export function personNode(): JsonLd {
  return {
    "@type": "Person",
    "@id": IDS.person,
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    image: PERSON.image,
    url: PERSON.url,
    email: `mailto:${PERSON.email}`,
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.city,
      addressCountry: PERSON.country,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Developer Advocate",
      occupationalCategory: "Software development",
      skills:
        "Developer relations for identity and AI agents, Rust, Java, Spring, TypeScript, Kubernetes, Terraform, OAuth 2.0 and OpenID Connect, local LLMs on consumer hardware",
    },
    worksFor: { "@id": IDS.employer },
    memberOf: { "@id": IDS.community },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Anna University",
      description: "B.E., Electrical and Electronics Engineering, Chennai, India",
    },
    knowsAbout: PERSON.knowsAbout,
    knowsLanguage: PERSON.knowsLanguage,
    award: PERSON.award,
    sameAs: PERSON.sameAs,
  };
}

export function publisherOrgNode(): JsonLd {
  return {
    "@type": "Organization",
    "@id": IDS.publisher,
    name: ORGS.publisher.name,
    url: ORGS.publisher.url,
    description: ORGS.publisher.description,
    email: `mailto:${PERSON.email}`,
    logo: {
      "@type": "ImageObject",
      url: abs(SITE.logo),
      caption: `${SITE.name} logo`,
    },
    founder: { "@id": IDS.person },
  };
}

export function employerOrgNode(): JsonLd {
  return {
    "@type": "Organization",
    "@id": IDS.employer,
    name: ORGS.employer.name,
    alternateName: ORGS.employer.alternateName,
    url: ORGS.employer.url,
    description: ORGS.employer.description,
    sameAs: ORGS.employer.sameAs,
  };
}

export function communityOrgNode(): JsonLd {
  return {
    "@type": "Organization",
    "@id": IDS.community,
    name: ORGS.community.name,
    url: ORGS.community.url,
    description: ORGS.community.description,
    sameAs: ORGS.community.sameAs,
  };
}

export function websiteNode(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: `${SITE.name} by Deepu K Sasidharan`,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": IDS.publisher },
    about: { "@id": IDS.person },
  };
}

export function blogNode(): JsonLd {
  return {
    "@type": "Blog",
    "@id": IDS.blog,
    url: `${SITE.url}/blogs/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": IDS.publisher },
    author: { "@id": IDS.person },
    isPartOf: { "@id": IDS.website },
  };
}

/** Nodes that belong on every page of the site. */
export function identityNodes(): JsonLd[] {
  return [websiteNode(), blogNode(), publisherOrgNode(), employerOrgNode(), communityOrgNode(), personNode()];
}

export type Crumb = { name: string; url: string };

export function breadcrumbNode(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
}

export type PageNodeOptions = {
  url: string;
  name: string;
  description: string;
  image?: string;
  pageType?: "WebPage" | "ProfilePage" | "AboutPage" | "CollectionPage";
  mainEntity?: JsonLd;
  dateModified?: Date;
};

export function pageNode(opts: PageNodeOptions): JsonLd {
  const node: JsonLd = {
    "@type": opts.pageType ?? "WebPage",
    "@id": IDS.page(opts.url),
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.person },
    publisher: { "@id": IDS.publisher },
  };
  if (opts.pageType === "ProfilePage") node.mainEntity = { "@id": IDS.person };
  if (opts.mainEntity) node.mainEntity = opts.mainEntity;
  if (opts.image) {
    node.primaryImageOfPage = { "@type": "ImageObject", url: abs(opts.image) };
  }
  if (opts.dateModified) node.dateModified = opts.dateModified.toISOString();
  return node;
}

export type ArticleNodeOptions = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  date: Date;
  lastModified?: Date;
  tags?: string[];
  series?: string;
  wordCount?: number;
  readingMinutes?: number;
  canonical?: string;
};

export function articleNode(opts: ArticleNodeOptions): JsonLd {
  const modified = (opts.lastModified ?? opts.date).toISOString();
  const node: JsonLd = {
    "@type": "BlogPosting",
    "@id": IDS.article(opts.url),
    headline: opts.title,
    name: opts.title,
    description: opts.description ?? SITE.description,
    url: opts.url,
    image: opts.image ? abs(opts.image) : abs(SITE.ogImage),
    inLanguage: SITE.language,
    datePublished: opts.date.toISOString(),
    dateModified: modified,
    author: { "@id": IDS.person },
    publisher: { "@id": IDS.publisher },
    isPartOf: { "@id": IDS.blog },
    mainEntityOfPage: { "@id": IDS.page(opts.url) },
  };
  if (opts.tags?.length) node.keywords = opts.tags.join(", ");
  if (opts.series) node.articleSection = opts.series;
  if (opts.wordCount) {
    node.wordCount = opts.wordCount;
    node.timeRequired = `PT${opts.readingMinutes ?? Math.max(1, Math.round(opts.wordCount / 200))}M`;
  }
  if (opts.canonical) node.sameAs = opts.canonical;
  return node;
}

export type AppItem = {
  name: string;
  url: string;
  description: string;
  languages?: string[];
  category?: string;
  os?: string;
  // creator: author and maintainer. maintainer: maintains a project someone
  // else started (JHipster). contributor: contributed only.
  role?: "creator" | "maintainer" | "contributor";
};

const PERSON_REF = { "@id": IDS.person };

/** SoftwareApplication (+ SoftwareSourceCode for public repos) for a tool. */
export function appNode(item: AppItem): JsonLd {
  const isRepo = item.url.includes("github.com");
  const role = item.role ?? "creator";
  const node: JsonLd = {
    // Typed as source code too so `programmingLanguage` and `codeRepository`
    // are valid on the node.
    "@type": isRepo ? ["SoftwareApplication", "SoftwareSourceCode"] : "SoftwareApplication",
    name: item.name,
    url: abs(item.url),
    description: item.description,
    applicationCategory: item.category ?? "DeveloperApplication",
    operatingSystem: item.os ?? "Linux, macOS, Windows",
    ...(role === "creator" ? { author: PERSON_REF } : { contributor: PERSON_REF }),
    ...(role !== "contributor" ? { maintainer: PERSON_REF } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  if (isRepo) {
    node.codeRepository = abs(item.url);
    // Only valid on SoftwareSourceCode, which is why the node carries both types.
    if (item.languages?.length) {
      node.programmingLanguage = item.languages.map((name) => ({ "@type": "ComputerLanguage", name }));
    }
  }
  return node;
}

export type BookItem = {
  name: string;
  edition?: string;
  isbn: string;
  pages: number;
  datePublished: string;
  storeUrl: string;
  summary: string;
  coAuthors?: string[];
};

export function bookNode(item: BookItem): JsonLd {
  return {
    "@type": "Book",
    name: item.name,
    bookEdition: item.edition,
    isbn: item.isbn,
    numberOfPages: item.pages,
    datePublished: item.datePublished,
    inLanguage: SITE.language,
    summary: item.summary,
    author: [PERSON_REF, ...(item.coAuthors ?? []).map((name) => ({ "@type": "Person", name }))],
    publisher: {
      "@type": "Organization",
      name: "Packt Publishing",
      url: "https://www.packtpub.com",
    },
    sameAs: [item.storeUrl],
  };
}

export function itemListNode(items: JsonLd[], name: string): JsonLd {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item,
    })),
  };
}
