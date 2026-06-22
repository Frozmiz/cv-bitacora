---
title: cv-bitacora
status: En Desarrollo
description: CV interactivo y bitácora de ingeniería, portfolio vivo con design system dark-mode, grid Bento de proyectos y timeline de problemas técnicos resueltos con búsqueda difusa.
technologies:
  - Astro 6
  - Tailwind CSS v4
  - Zod
  - Fuse.js
  - TypeScript
problem: Un CV en PDF no transmite decisiones arquitectónicas reales ni el estilo de trabajo. Hacía falta un sitio que combine portfolio visual con un registro honesto de errores, investigación y aprendizajes, la misma información que alimenta la memoria Engram del día a día.
links:
  github: https://github.com/Frozmiz/cv-bitacora
---

Contenido validado por Zod en `content.config.ts` (colecciones `projects` y `logbook`). La bitácora usa un Web Component `<logbook-search>` embebido en Astro que serializa índices planos al cliente y filtra entradas del timeline con Fuse.js sin re-renderizar el HTML del servidor.

Identidad visual definida en `DESIGN.md`: modo oscuro nativo, tipografía Inter + JetBrains Mono, acentos teal/violeta y grid Bento asimétrico sin box-shadows.
