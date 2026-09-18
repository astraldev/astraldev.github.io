// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-svgo",
    "nanime",
    "@nuxtjs/seo",
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      noscript: [{
        innerHTML: "<style>.reveal, .stagger-pending .stagger-in { opacity: 1 !important; translate: none !important; }</style>",
      }],
    },
  },

  site: {
    url: "https://astraldev.github.io",
    name: "astraldev",
    description: "Frontend and software developer, building for the web and the Linux desktop.",
    defaultLocale: "en",
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/base.css",
  ],
  colorMode: {
    fallback: "dark",
    storage: "cookie",
    storageKey: "app-theme",
  },

  runtimeConfig: {
    // NUXT_GITHUB_TOKEN — lifts the API rate limit while prerendering.
    githubToken: "",
    public: {
      siteUrl: "https://astraldev.github.io",
      followItUrl: "",
    },
  },

  compatibilityDate: "2025-07-15",

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/blog", "/projects"],
      failOnError: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  sitemap: {
    // Drafts are excluded from the collection query, so nothing extra leaks in.
    exclude: ["/_nuxt/**"],
  },

  robots: {
    disallow: [],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  svgo: {
    dts: true,
    svgo: false,
    autoImportPath: "./assets/illustrations",
    defaultImport: "component",
  },
});
