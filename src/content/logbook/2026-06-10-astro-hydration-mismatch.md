---
date: 2026-06-10
context: CV Interactivo — configuración de la sección de proyectos con componentes React hidratados en Astro 6. El layout usa islas (islands architecture) con client:load para los filtros interactivos.
technologies:
  - Astro
  - React
  - TypeScript
error: "Hydration mismatch: el servidor renderizaba el listado de proyectos con 4 tarjetas, pero en el cliente React intentaba reconciliar un árbol vacío. Error en consola: Warning: Expected server HTML to contain a matching <div> in <div>. Esto rompía la interactividad de los filtros."
research: "El problema residía en que el componente React recibía como prop un array de objetos Entry<CollectionEntry> no serializables (contenían símbolos internos de Astro). Al pasar los datos completos de la colección directamente como prop, vite/React no podía serializar el objeto durante el SSR, generando un árbol de DOM distinto entre servidor y cliente. Se revisó la documentación de Astro sobre serialización de props y el RFC de la Content Layer API."
solution: "Se mapeó la colección a un array de objetos planos antes de pasarlo como prop al componente React: `const projectData = projects.map(p => ({ id: p.id, ...p.data }))`. Esto garantiza que solo viajan datos JSON-serializables a través del boundary de hidratación. El cuerpo del markdown (.render()) se procesó en el servidor y se pasó como string HTML usando set:html, fuera del componente React."
learning: "En arquitecturas de islas, las props que cruzan el boundary servidor→cliente deben ser siempre JSON puro. Los objetos CollectionEntry de Astro contienen metadatos internos no serializables; hay que destruirlos a plain objects antes de enviárselos a componentes con client:*. El cuerpo markdown debe vivir en el servidor, no en el estado del componente cliente."
---

Este bug tardó aproximadamente dos horas en diagnosticarse porque el error de React no indicaba claramente cuál prop era el problema. La clave fue activar el modo verbose de hidratación en el navegador e inspeccionar la diferencia entre el `__INITIAL_STATE__` del SSR y el árbol que React intentaba hidratar.

La solución de mapear a objetos planos es ahora un patrón estándar en este proyecto para cualquier colección que se pase a componentes interactivos.
