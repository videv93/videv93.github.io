import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Vi Tran — Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "vi-VN",
    baseUrl: "videv93.github.io/notes",
    ignorePatterns: ["private", "templates", ".obsidian", "_archive-seed"],
    defaultDateType: "modified",
    theme: {
      // Local fonts only: the garden matches the CV, which is set in the serif
      // every system already has, so the page fetches nothing at runtime.
      // The names below are Tinos, which is metrically identical to Times New
      // Roman and — unlike Times — actually exists on Google Fonts, which is
      // where the OG-image generator fetches from at build time. The browser
      // never uses it: custom.scss puts real Times New Roman ahead of it.
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Tinos",
        body: "Tinos",
        code: "Cousine",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#d8d8d8",
          gray: "#8a8a8a",
          darkgray: "#000000",
          dark: "#000000",
          secondary: "#1a0dab",
          tertiary: "#1a0dab",
          highlight: "rgba(26, 13, 171, 0.07)",
          textHighlight: "#1a0dab22",
        },
        darkMode: {
          light: "#111111",
          lightgray: "#333333",
          gray: "#8a8a8a",
          darkgray: "#e8e8e8",
          dark: "#f5f5f5",
          secondary: "#8ab4f8",
          tertiary: "#8ab4f8",
          highlight: "rgba(138, 180, 248, 0.10)",
          textHighlight: "#8ab4f833",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
