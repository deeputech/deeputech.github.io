// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
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
      themes: ["github-light", "github-dark-dimmed"],
      themeCssSelector: (theme) => `[data-theme="${theme.name === "github-light" ? "light" : "dark"}"]`,
      defaultProps: { wrap: false },
      styleOverrides: {
        codeFontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        borderRadius: "0.75rem",
        frames: { shadowColor: "transparent" },
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
