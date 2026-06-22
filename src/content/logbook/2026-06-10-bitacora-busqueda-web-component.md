---
date: 2026-06-10
context: CV Interactivo con búsqueda difusa en la sección de bitácora mediante un Web Component (`<logbook-search>`) embebido en Astro 6. La interactividad vive en un `<script>` procesado por Vite, sin añadir React ni `@astrojs/react` al proyecto.
technologies:
  - Astro
  - TypeScript
  - Fuse.js
error: "Al transportar el resultado de `getCollection('logbook')` al cliente, el índice de búsqueda llegaba vacío. Los objetos `CollectionEntry` de Astro contienen metadatos internos (símbolos, referencias a `.render()`) que no son JSON-serializables. `JSON.stringify` sobre la colección completa producía `{}` o fallaba en silencio, y Fuse.js no encontraba coincidencias aunque las entradas estuvieran en el DOM."
research: "Se revisó la documentación de Astro sobre el boundary servidor→cliente en islas y scripts de componente. La serialización de props con `client:*` exige datos planos; el mismo criterio aplica al pasar datos vía `data-*` attributes en un Custom Element. Se evaluó `@astrojs/react` con `client:load`, pero la interacción solo filtra nodos del DOM, así que no justifica el peso extra del runtime. Se optó por un `HTMLElement` con Fuse.js y manipulación directa de `[data-entry-id]`."
solution: "En `LogbookSection.astro` se mapeó la colección a objetos planos antes de serializar: `entries.map(e => ({ id: e.id, context: e.data.context, error: e.data.error, technologies: e.data.technologies, solution: e.data.solution }))`. El JSON viaja al cliente como `data-index` en `<logbook-search>`. El Web Component parsea el atributo en `connectedCallback`, inicializa Fuse.js y muestra u oculta los `<li>` del timeline con `display: none`, sin re-renderizar el HTML generado en el servidor."
learning: "En Astro, cualquier dato que cruce el boundary servidor→cliente, ya sea como prop de `client:*` o como atributo `data-*`, debe ser JSON puro. Los `CollectionEntry` hay que destruirlos a plain objects en el servidor. Para interacciones puntuales (filtrar, toggles, contadores), un Web Component en el `<script>` del `.astro` suele ser suficiente y evita dependencias de UI innecesarias."
---

El registro del custom element es idempotente (`if (!customElements.get('logbook-search'))`) para evitar errores si Vite evalúa el script más de una vez en desarrollo. La línea vertical del timeline vive en el `<ul>` padre, no en cada `<li>`, así que ocultar entradas no rompe la continuidad visual del borde izquierdo.
