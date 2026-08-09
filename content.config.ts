import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "**",
      schema: z.object({
        date: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    }),
  },
});
