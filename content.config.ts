import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        include: "**",
        exclude: ["**/_drafts/**", "TONE.md", "projects/**"],
      },
      schema: z.object({
        summary: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
      }),
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/**",
      schema: z.object({
        repo: z.string(),
        website: z.string().optional(),
        icon: z.string().optional(),
        version: z.string().optional(),
        license: z.string().optional(),
      }),
    }),
  },
});
