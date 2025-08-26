// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-svgo",
  ],

  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  colorMode: {
    fallback: "dark",
    storage: "cookie",
    storageKey: "app-theme",
  },

  compatibilityDate: "2025-07-15",

  vite: {
    plugins: [tailwindcss()],
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
