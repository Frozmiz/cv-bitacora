import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Completado', 'En Desarrollo', 'Mantenimiento']),
    description: z.string(),
    technologies: z.array(z.string()),
    problem: z.string(),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
  }),
});

const logbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logbook' }),
  schema: z.object({
    date: z.coerce.date(),
    context: z.string(),
    technologies: z.array(z.string()),
    error: z.string(),
    research: z.string(),
    solution: z.string(),
    learning: z.string(),
  }),
});

export const collections = { projects, logbook };
