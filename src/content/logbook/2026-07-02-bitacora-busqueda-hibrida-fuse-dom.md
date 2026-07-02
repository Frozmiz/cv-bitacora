---
date: 2026-07-02
headline: "Fuse quería amigos en todas partes; el DOM solo invitaba a los de confianza"
context: "Buscador de la bitácora en `<logbook-search>`: Custom Element en Astro 6 que filtra entradas del timeline, expande `<details>` y resalta coincidencias con `<mark>`. Tras añadir titulares colapsables y resaltado literal, reapareció la tensión entre Fuse.js (índice JSON en `data-index`) y el HTML ya renderizado en el servidor."
technologies:
  - Astro
  - TypeScript
  - Fuse.js
  - DOM
error: "Con Fuse.js como único filtro (`threshold: 0.35`), búsquedas como `inje` abrían entradas sin ningún resaltado visible. Fuse devolvía similitudes difusas; el `<mark>` solo pintaba subcadenas literales del input. El contador decía «4 veces · 4 entradas» pero tres artículos no mostraban la palabra buscada. Al pasar a solo DOM literal se corrigió el falso positivo, pero se perdía la tolerancia a typos y la relevancia fuzzy que justificaba mantener Fuse en `package.json`."
research: "Se evaluaron tres caminos: (1) eliminar Fuse y quedarse con substring en el DOM, simple pero sin aproximaciones; (2) volver a fuzzy puro alineando resaltado con `includeMatches` de Fuse, sin mostrar el query literal cuando no existe; (3) híbrido: prioridad a coincidencia exacta en el DOM, fallback fuzzy solo si Fuse encuentra la entrada y el DOM puede resaltar los spans de `result.matches`. También hizo falta alinear índice y DOM: `research` y `learning` entraron al JSON y cada bloque largo lleva `data-search-field` para mapear campo → selector."
solution: "En `LogbookSearch.astro`, cada entrada pasa primero por `#highlightLiteral(query)` (teal). Si `hits === 0`, se consulta Fuse con `includeMatches: true` y `#highlightFuseMatches` pinta en ámbar el fragmento que Fuse emparejó, no el texto del input. Las aproximadas llevan badge `~aprox` en el summary. Si Fuse sugiere una entrada pero el DOM no puede marcar nada, se oculta. El contador desglosa exactas y aprox (`2 exactas · 1 aprox`). `LogbookSection.astro` serializa el índice completo; `LogbookEntry.astro` etiqueta investigación, solución y aprendizaje con `data-search-field`."
learning: "Filtro y resaltado deben compartir criterio o el usuario ve resultados fantasma. Un híbrido honesto: exacto primero (predecible), fuzzy como segunda capa con visual distinto (ámbar + `~aprox`) y highlight de lo que Fuse encontró, no de lo que el usuario escribió. Mantener Fuse tiene sentido si la segunda capa está acoplada a `matches`; si no, es dependencia muerta. Para pocos artículos el literal basta; el híbrido escala mejor cuando crezca la bitácora o haya typos en errores de consola largos."
---

El placeholder del input indica «exacta o ~aprox» para no prometer coincidencia literal cuando Fuse entra en juego. `#clearHighlights` y `#clearApproxBadges` se ejecutan al inicio de cada `input` para no acumular `<mark>` ni badges al borrar o reescribir la query.
