---
title: CV interactivo y bitácora
status: En Desarrollo
description: CV interactivo y bitácora de ingeniería, portfolio vivo con design system dark-mode, grid Bento de proyectos y timeline de problemas técnicos resueltos con búsqueda difusa.
technologies:
  - Astro 6
  - Tailwind CSS v4
  - Zod
  - Fuse.js
  - TypeScript
origin: Un CV en PDF difícilmente refleja las decisiones técnicas, la forma de trabajar y la evolución profesional que hay detrás de cada proyecto. Este espacio nace para reunir portfolio y bitácora en una experiencia viva, visual y consultable.
links:
  github: https://github.com/Frozmiz/cv-bitacora
---

Contenido validado por Zod en `content.config.ts` (colecciones `projects` y `logbook`). Cada entrada de bitácora exige `headline` descriptivo y `summary` de una frase; el listado cerrado muestra fecha, tecnologías, titular, resumen y CTA textual dentro de `<details>`/`<summary>`. Anclas in-page: `/#logbook-{id}` (sin rutas por slug).

La bitácora usa un Web Component `<logbook-search>` embebido en Astro que serializa índices planos al cliente (incluye `summary`) y filtra el timeline con búsqueda híbrida: literal en DOM primero, Fuse.js ponderado después, sin re-renderizar el HTML del servidor. Las fichas de proyecto renderizan también el cuerpo markdown (enlaces internos a la bitácora incluidos).

Identidad visual definida en `DESIGN.md`: modo oscuro nativo, tipografía Inter + JetBrains Mono, acentos teal/violeta y grid Bento asimétrico sin box-shadows.
