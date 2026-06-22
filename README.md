# cv-bitacora

CV interactivo y bitácora de ingeniería. Portfolio personal construido con Astro 6, Tailwind CSS v4 y la Content Layer API.

## Stack

- **[Astro 6](https://astro.build)**: Framework de contenido estático con Content Layer API
- **[Tailwind CSS v4](https://tailwindcss.com)**: Estilos con design tokens en `@theme`
- **[Zod v4](https://zod.dev)**: Validación de esquemas para las colecciones de contenido
- **[Fuse.js](https://fusejs.io)**: Búsqueda difusa (preparada para la bitácora)

## Estructura

```
src/
├── components/
│   ├── Hero.astro            # Carta de presentación principal
│   ├── Navigation.astro      # Sidebar (desktop) / Bottom Bar (mobile)
│   ├── ProjectCard.astro     # Tarjeta individual de proyecto (Bento)
│   └── ProjectsSection.astro # Grid Bento de proyectos con getCollection
├── content/
│   ├── logbook/              # Entradas de la bitácora (.md)
│   └── projects/             # Proyectos del portfolio (.md)
├── layouts/
│   └── Layout.astro          # Layout base con head SEO y fuentes
├── pages/
│   └── index.astro           # Página principal
├── styles/
│   └── global.css            # Design tokens, reset y utilidades globales
└── content.config.ts         # Colecciones Astro: projects + logbook
```

## Contenido

El contenido vive en `src/content/` como archivos Markdown con frontmatter validado por Zod.

**Añadir un proyecto**: crear `src/content/projects/nombre.md`:

```md
---
title: Mi Proyecto
status: En Desarrollo   # Completado | En Desarrollo | Mantenimiento
description: Descripción corta.
technologies: [Angular, NestJS]
problem: El problema que resuelve.
links:
  github: https://github.com/...
  demo: https://...
---
```

**Añadir entrada de bitácora**: crear `src/content/logbook/YYYY-MM-DD-slug.md`:

```md
---
date: 2026-06-10
context: Contexto del problema.
technologies: [Astro, TypeScript]
error: Descripción del error o dificultad.
research: Proceso de investigación.
solution: Cómo se resolvió.
learning: Aprendizaje obtenido.
---
```

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto con **pnpm**:

| Comando            | Acción                                         |
| :----------------- | :--------------------------------------------- |
| `pnpm install`     | Instala las dependencias                       |
| `pnpm run dev`     | Servidor de desarrollo en `localhost:4321`     |
| `pnpm run build`   | Build de producción en `./dist/`               |
| `pnpm run preview` | Preview del build antes de desplegar           |

## Diseño

Las directrices visuales están documentadas en [`DESIGN.md`](./DESIGN.md). Resumen:

- Modo oscuro nativo: fondo base `#0A0A0A`
- Tipografía: **Inter** para UI, **JetBrains Mono** para código y metadatos
- Diseño plano (flat): sin sombras, jerarquía visual por colores de surface y bordes finos
- Acento primario `#14B8A6` (teal), acento secundario `#8B5CF6` (violeta)
