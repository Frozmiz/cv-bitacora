# DESIGN.md - CV Interactivo y Bitácora de Ingeniería

## 1. Visual Theme & Atmosphere
- **Atmósfera:** Tecnológica, altamente profesional, modo oscuro (dark-mode) nativo y minimalista. Debe sentirse como un entorno de desarrollo premium.
- **Filosofía de Diseño:** El contenido es la interfaz. Alta relación señal/ruido. Precisión arquitectónica en los espaciados. El portafolio debe ser visual e impactante, mientras que la bitácora debe evocar la estética de una terminal moderna o un IDE.
- **Densidad:** Espaciosa y fluida en las áreas de presentación; estructurada y densa en datos para la resolución de problemas (bitácora).

## 2. Color Palette & Roles
- **Backgrounds (Fondos):**
  - Base: `#0A0A0A` (Negro Vacío - Fondo principal)
  - Surface 1: `#111111` (Tarjetas, contenedores Bento)
  - Surface 2: `#1A1A1A` (Estados hover, fondos de etiquetas, divisores sutiles)
- **Text (Texto):**
  - Primary: `#EDEDED` (Blanco de alto contraste para títulos y cuerpo principal)
  - Secondary: `#A1A1AA` (Zinc-400, para fechas, metadatos, contexto secundario)
- **Accents (Acentos):**
  - Primary Accent: `#14B8A6` (Teal/Cian) - Para botones primarios, enlaces activos y acentos de terminal.
  - Secondary Accent: `#8B5CF6` (Violeta) - Para el botón de "Contexto IA" o elementos especiales.
  - Status/Logbook: `#EF4444` (Error detectado), `#F59E0B` (Investigando), `#10B981` (Solucionado).

## 3. Typography Rules
- **Sans-serif (UI & Headings):** `Inter` o la fuente del sistema (`system-ui`).
  - Pesos: 400 (Cuerpo), 500 (Botones/Navegación), 600 (Títulos).
  - Tracking (Espaciado): Muy ajustado en los títulos (`-0.02em` a `-0.04em`).
- **Monospace (Tech & Logbook):** `JetBrains Mono` o `Fira Code`.
  - Uso exclusivo para: Nombres de tecnologías, fragmentos de código, IDs de tickets, fechas de la bitácora.
  - Tamaño: Ligeramente más pequeño, `0.9em` relativo al texto base.

## 4. Component Stylings
- **Tarjetas de Proyecto (Bento Box):**
  - Fondo: Surface 1 (`#111111`).
  - Borde: Fino, 1px sólido `#27272A` (Zinc-800).
  - Radio de borde (Border-radius): `12px` (0.75rem).
  - Interacción: Al hacer hover, el borde transiciona suavemente a `#3F3F46`.
  - Bloque «Por qué nace» (`origin` en frontmatter): label mono uppercase Secondary; texto Secondary. No usar framing de «Problema».
  - Grid Bento: `align-items: start` para que un featured alto (tarjeta + landings) no estire fichas vecinas.
- **Iconos (Lucide):**
  - API: `<Icon name="…" />` en `src/components/ui/` sobre `@lucide/astro`.
  - Decorativos en nav/enlaces (`aria-hidden`); `label` solo si el icono es significativo por sí mismo.
  - Brand logos fuera de Lucide (`simple-icons` en Hero; SVG filled GitHub/LinkedIn donde aplique).
- **Botones:**
  - Primario: Fondo blanco (`#EDEDED`), texto negro (`#0A0A0A`), sin bordes, radio `6px`.
  - Secundario/Fantasma: Fondo transparente, texto Secondary, al hacer hover cambia el fondo a Surface 2.
- **Etiquetas / Filtros (Pills):**
  - Tipografía monospace, todo en mayúsculas.
  - Fondo Surface 2, Borde 1px sólido `#27272A`, radio `4px`.
- **Entradas de la Bitácora (Timeline):**
  - Línea vertical izquierda (`#27272A`) que conecta los casos.
  - Marcador de batalla (espadas Lucide) sobre la línea, con acento verde/teal; respeta `prefers-reduced-motion`.
  - Entrada cerrada (`<details>`/`<summary>`): fecha mono secundaria → pills de tecnología → titular (`h3`, mayor peso) → resumen (`summary`, texto Secondary) → CTA textual teal (`Ver diagnóstico →` / `Ocultar diagnóstico ↑`).
  - Sin chevron aislado ni botones anidados dentro del `<summary>`. Blurb y CTA como `<span>` (no `<p>` dentro de `<summary>`).
  - Entrada abierta: bloques Contexto / Error / Investigación / Solución / Aprendizaje con labels mono, colores Status/Logbook e iconos Lucide decorativos (`diamond`, `flag`, `circle-dot`, `check`, `lightbulb`; size 12, stroke-width 2).
  - Ancla por entrada: `id="logbook-{entry.id}"` con `scroll-margin-top` y borde teal discreto en `:target`.
- **Navegación:**
  - Enlaces de sección con hash en raíz (`/#inicio`, …) para funcionar desde `/cv` y otras rutas.
  - Sidebar desktop / bottom bar mobile; `aria-current` vía IntersectionObserver parseando el id del href.

## 5. Layout Principles
- **Grid:** Sistema de 12 columnas clásico para escritorio. Layout tipo "Bento" asimétrico para los proyectos.
- **Escala de Espaciado:** Basada en múltiplos de 4 (4px, 8px, 16px, 24px, 32px, 48px, 64px).
- **Ancho Máximo:** El contenido central no debe superar los `1024px` para mantener longitudes de línea legibles.
- **Respiración (Whitespace):** Uso generoso de padding entre las secciones principales (mínimo `96px` de separación).

## 6. Depth & Elevation
- **Diseño Plano (Flat):** Cero sombras paralelas (box-shadow). La jerarquía visual se construye exclusivamente mediante cambios en el color de fondo (Surfaces) y bordes finos.
- **Resplandor (Glow):** Solo permitido detrás del Hero principal, un desenfoque radial muy sutil (`blur-3xl`, opacidad 10%) usando el Color de Acento Primario.

## 7. Do's and Don'ts
- **SÍ:** Usa tipografía monospace para términos de ingeniería para enfatizar tu perfil técnico.
- **SÍ:** Mantén los bordes ultra finos (1px) para un look arquitectónico.
- **NO:** No uses fondos coloridos grandes. Mantén el lienzo oscuro y deja que el contenido destaque por contraste.
- **NO:** No centres bloques de texto largos. Alinea el texto a la izquierda para facilitar la lectura de la bitácora técnica.

## 8. Responsive Behavior
- **Móvil:** Colapsa el grid Bento en una sola columna. Reemplaza el menú lateral por una barra de navegación inferior (Bottom Bar) similar a una app nativa. Las líneas de tiempo de la bitácora pierden el margen izquierdo para maximizar el espacio de lectura.
- **Interacción:** Áreas táctiles amplias (min `44px`) en filtros y etiquetas.

## 9. Agent Prompt Guide
- Para crear la sección principal: "Usa Tailwind CSS siguiendo estrictamente el DESIGN.md. Crea un Hero component usando el fondo Base, texto Primary con fuente Inter. Añade dos botones según las reglas de Component Stylings."
- Para la bitácora: "Usa timeline con `<details>`/`<summary>` nativo (sin ARIA redundante). En el summary cerrado: `<time>`, pills mono de tecnologías, `h3` para el headline descriptivo, `<span>` para el summary editorial y CTA textual Ver/Ocultar diagnóstico. El panel abierto sigue el orden Contexto → Error → Investigación → Solución → Aprendizaje con iconos Lucide vía `<Icon />`. Conserva el lenguaje visual oscuro, flat y teal del DESIGN.md."
- Para iconos: "Usa `src/components/ui/Icon.astro` y el registro en `icons.ts`. Imports nominales de `@lucide/astro`. No añadas brand icons a Lucide; usa `simple-icons` o SVG filled de marca."
- Para fichas de proyecto: "Label «Por qué nace» con campo `origin`. Títulos de producto entendibles, no nombres de repo. Grid Bento con `align-items: start`."
