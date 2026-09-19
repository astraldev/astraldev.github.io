// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    // Symlinks into a local dotfiles repo; they don't resolve on CI.
    ignores: [".agents/**"],
  },
  {
    // Markdown is linted too, but without the @stylistic plugin; unscoped, these rules crash on .md files.
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/member-delimiter-style": "error",

      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
]);
