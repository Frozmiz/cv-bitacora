import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const landingSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  url: z.url().optional(),
  technologies: z.array(z.string()).optional(),
  learning: z.string(),
});

const projectImageSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string(),
  position: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['client', 'startup', 'personal']),
    status: z.enum(['Completado', 'En Desarrollo', 'Mantenimiento']),
    role: z.string().optional(),
    period: z.string().optional(),
    featured: z.boolean().optional(),
    description: z.string(),
    technologies: z.array(z.string()),
    highlights: z.array(z.string()).optional(),
    image: projectImageSchema.optional(),
    origin: z.string(),
    landings: z.array(landingSchema).optional(),
    links: z
      .object({
        github: z.url().optional(),
        demo: z.url().optional(),
        caseStudy: z.url().optional(),
      })
      .optional(),
  }),
});

const logbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logbook' }),
  schema: z.object({
    date: z.coerce.date(),
    headline: z.string(),
    summary: z.string(),
    context: z.string(),
    technologies: z.array(z.string()),
    error: z.string(),
    research: z.string(),
    solution: z.string(),
    learning: z.string(),
  }),
});

export const collections = { projects, logbook };
