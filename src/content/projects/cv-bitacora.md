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

Contenido validado por Zod en `content.config.ts` (colecciones `projects` y `logbook`). Cada proyecto expone `origin` («Por qué nace») y un `title` de producto; cada entrada de bitácora exige `headline` descriptivo y `summary` de una frase. El listado cerrado muestra fecha, tecnologías, titular, resumen y CTA textual dentro de `<details>`/`<summary>`. Anclas in-page: `/#logbook-{id}` (sin rutas por slug).

Iconografía UI vía `@lucide/astro` y `<Icon />` tipado (`src/components/ui/`); brand logos del Hero con `simple-icons`. La bitácora usa un Web Component `<logbook-search>` que serializa índices planos al cliente (incluye `summary`) y filtra con búsqueda híbrida: literal en DOM primero, Fuse.js ponderado después. Navegación con `/#sección` para funcionar desde `/cv`; grid Bento con `align-items: start`.

Identidad visual definida en `DESIGN.md`: modo oscuro nativo, tipografía Inter + JetBrains Mono, acentos teal/violeta y grid Bento asimétrico sin box-shadows.
