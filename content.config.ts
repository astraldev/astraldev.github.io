import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: {
        include: "**",
        exclude: ["**/_drafts/**", "TONE.md"],
      },
      schema: z.object({
        summary: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
      }),
    }),
  },
});
