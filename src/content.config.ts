import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Pages generated from the compiler README by scripts/sync-docs.mjs.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    group: z.string(),
    order: z.number(),
  }),
});

export const collections = { docs };
