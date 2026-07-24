# cv-bitacora

CV interactivo y bitácora de ingeniería. Portfolio personal construido con Astro 6, Tailwind CSS v4 y la Content Layer API.

## Stack

- **[Astro 6](https://astro.build)**: Framework de contenido estático con Content Layer API
- **[Tailwind CSS v4](https://tailwindcss.com)**: Estilos con design tokens en `@theme`
- **[Zod v4](https://zod.dev)**: Validación de esquemas para las colecciones de contenido
- **[Fuse.js](https://fusejs.io)**: Búsqueda híbrida en la bitácora (literal en DOM + fuzzy con pesos)
- **[@lucide/astro](https://lucide.dev/guide/astro)**: Iconos SVG tipados vía `Icon.astro` (registro nominal reducido)
- **[simple-icons](https://simpleicons.org/)**: Logos de marca del stack en el Hero (Lucide v1 no incluye brand icons)

## Estructura

```
src/
├── components/
│   ├── ui/
│   │   ├── Icon.astro        # Wrapper tipado sobre @lucide/astro
│   │   └── icons.ts          # Registro nominal IconName
│   ├── Hero.astro            # Carta de presentación principal
│   ├── Navigation.astro      # Sidebar (desktop) / Bottom Bar (mobile)
│   ├── ProjectCard.astro     # Tarjeta de proyecto (frontmatter + cuerpo markdown)
│   ├── ProjectsSection.astro # Grid Bento de proyectos con getCollection
│   ├── LogbookSection.astro  # Sección #bitacora, timeline e índice Fuse
│   ├── LogbookEntry.astro    # Entrada expandible (<details>/<summary>)
│   └── LogbookSearch.astro   # Custom Element <logbook-search>
├── content/
│   ├── logbook/              # Entradas de la bitácora (.md)
│   └── projects/             # Proyectos del portfolio (.md)
├── layouts/
│   └── Layout.astro          # Layout base con head SEO y fuentes
├── pages/
│   ├── index.astro           # Página principal
│   └── cv.astro              # Vista CV
├── styles/
│   └── global.css            # Design tokens, reset y utilidades globales
└── content.config.ts         # Colecciones Astro: projects + logbook
```

## Contenido

El contenido vive en `src/content/` como archivos Markdown con frontmatter validado por Zod.
El cuerpo markdown de cada proyecto se renderiza bajo el bloque «Por qué nace» en `ProjectCard`.

**Añadir un proyecto**: crear `src/content/projects/nombre.md`:

```md
---
title: Mi Proyecto          # Título de producto, no slug de repo
status: En Desarrollo       # Completado | En Desarrollo | Mantenimiento
description: Descripción corta.
technologies: [Angular, NestJS]
origin: Por qué nace el proyecto y a qué necesidad responde.
links:
  github: https://github.com/...
  demo: https://...
---

Notas técnicas opcionales en el cuerpo (markdown). Pueden incluir enlaces internos
a anclas de la bitácora, por ejemplo `/#logbook-YYYY-MM-DD-slug`.
```

**Añadir entrada de bitácora**: crear `src/content/logbook/YYYY-MM-DD-slug.md`:

```md
---
date: 2026-06-10
headline: Síntoma comprensible: causa o contexto técnico
summary: >
  Qué fallaba, por qué ocurría y qué se hizo, en una sola frase.
context: Contexto del problema.
technologies: [Astro, TypeScript]
error: Descripción del error o dificultad.
research: Proceso de investigación.
solution: Cómo se resolvió.
learning: Aprendizaje obtenido.
---
```

### Criterio editorial de la bitácora

- `headline`: descriptivo sin abrir el caso. Preferible `[síntoma]: [causa o contexto]`.
- `summary`: una frase (~120–220 caracteres) con fallo + causa + solución a alto nivel. Obligatorio en el schema.
- El tono creativo puede vivir en el desarrollo del caso, no como único titular.
- Cada entrada se ancla en la home como `/#logbook-{id}` (el `id` es el nombre del fichero sin `.md`). No hay páginas `/bitacora/[slug]`.

### UI de cada entrada (cerrada)

1. Fecha en `<time datetime>` (metadato secundario, mono).
2. Tecnologías como pills no interactivas.
3. Titular (`h3`) con mayor peso visual.
4. Resumen (`summary`) visible.
5. CTA textual: `Ver diagnóstico →` / `Ocultar diagnóstico ↑` (mismo `<summary>` nativo; sin botones anidados ni ARIA redundante).

### Búsqueda

`LogbookSection` serializa un índice plano al Custom Element. Fuse pondera, en este orden de prioridad: `headline`, `summary`, `error`, `context`, `technologies`, y el resto de campos del diagnóstico. La coincidencia literal en DOM tiene prioridad; el fuzzy solo resalta cuando hay `matches` aplicables.

### Iconos Lucide

Uso tipado vía `<Icon name="..." />` (`src/components/ui/`).

- Añadir un icono: import nominal en `icons.ts` + clave en `iconRegistry`. TypeScript rechaza nombres fuera de `IconName`.
- Props: `Omit<IconProps, ...>` de `@lucide/astro`; API oficial `stroke-width`; a11y controlada en el wrapper.
- Brand icons (GitHub filled, LinkedIn, logos del Hero): no van a Lucide; Hero usa `simple-icons`.

### Navegación

Los enlaces de sección usan rutas con hash en la raíz (`/#inicio`, `/#proyectos`, …) para funcionar también desde `/cv`. El highlight activo parsea el id desde cualquier `href` con `#`.

### Grid de proyectos

Bento con `align-items: start`: un item featured alto (p. ej. Slowork + landings) no estira las fichas vecinas de la misma fila.

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

## Memoria Engram

Decisiones técnicas y aprendizajes de este repo se documentan en Engram (`--project cv-bitacora`), se exportan con `engram sync` / `brain-push` hacia `cerebro-global`.
