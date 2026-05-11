// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://deepu.tech",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
    },
  },
  integrations: [
    expressiveCode({
      // Single theme for both light/dark site themes — code blocks are
      // always rendered in the dark Catppuccin Macchiato style (matches
      // the bash terminal vibe the user wanted).
      themes: ["catppuccin-macchiato"],
      // Plugin pulls in its own copy of @expressive-code/core via npm hoisting
      // quirks; types disagree at compile time but runtime is fine.
      plugins: [/** @type {any} */ (pluginLineNumbers())],
      defaultProps: /** @type {any} */ ({
        wrap: false,
        showLineNumbers: true,
      }),
      styleOverrides: {
        codeFontFamily:
          "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        borderRadius: "0.75rem",
        codeFontSize: "0.9rem",
        codeLineHeight: "1.55",
        codePaddingBlock: "1rem",
        codePaddingInline: "1.1rem",
        frames: {
          shadowColor: "transparent",
          editorBackground: "#181926",
          terminalBackground: "#181926",
          terminalTitlebarBackground: "#1e2030",
          terminalTitlebarBorderBottomColor: "#363a4f",
        },
      },
    }),
    icon({
      // Only bundle the iconify packs we explicitly use.
      include: {
        "simple-icons": [
          "bluesky",
          "mastodon",
          "github",
          "linkedin",
          "x",
          "devdotto",
          "speakerdeck",
          "ycombinator",
          "reddit",
        ],
        lucide: [
          "user",
          "rss",
          "book-open",
          "calendar",
          "search",
          "sun",
          "moon",
          "link-2",
          "copy",
          "chevron-right",
        ],
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    // Tailwind v4 vite plugin types differ slightly between Vite 6 (Astro) and Vite 7 (Tailwind dev dep);
    // runtime is fine — cast keeps astro check clean.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
