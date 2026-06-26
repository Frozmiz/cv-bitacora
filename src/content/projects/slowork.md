---
title: Slowork
status: En Desarrollo
featured: true
description: Ecosistema de slow travel con sitio público SSR, blog editorial y waitlist, portal Angular para operaciones internas, landings de captación (creators/hosts) y API GraphQL en AWS.
technologies:
  - Astro 6
  - Angular 21
  - GraphQL
  - Tailwind CSS v4
  - DaisyUI 5
  - Vercel
  - AWS RDS
problem: Slowork arrancó con una landing React + Express y un blog separado, fragmentando stacks y rutas. Hacía falta unificar marca, contenido editorial, lista de espera y aplicación operativa sin exponer la API directamente al navegador ni duplicar lógica de negocio en el front.
links:
  github: https://github.com/frozmiz/slowork
  demo: https://www.slowork.app
landings:
  - id: landing-v2
    name: slowork-landing-v2
    purpose: Sitio oficial de marca en www.slowork.app. Home, blog editorial vía GraphQL, waitlist, formulario de contacto, páginas legales e i18n ES/EN con View Transitions.
    url: https://www.slowork.app
    technologies:
      - Astro 6 SSR
      - Zod
      - GraphQL
      - Vercel
    learning: "Consolidé React+Express y blog en un solo Astro 6 con patrón BFF: validación Zod en `src/models/`, rutas `src/pages/api/*` como proxy fino y cero acceso a BD desde el front. Presentación en Vercel, reglas de negocio en AWS, datos en RDS: cada capa escala sin arrastrar el stack entero."
  - id: content-creators
    name: slowork-content-creators
    purpose: Landing de captación para el programa de creadores de contenido. Copy bilingüe en Content Layer, FAQ con JSON-LD, formulario multipaso y envío serverless de solicitudes.
    url: https://www.slowork.app/es/creators/
    technologies:
      - Astro 6
      - Content Layer
      - DaisyUI 5
      - JSON-LD
    learning: "Separé producto en un deploy independiente con Content Layer + Zod por locale y BFF `POST /api/creator-applications/` para ocultar la API. El stepper valida por paso con Zod (no `reportValidity` nativo) y el markup vive en componentes `.astro`, nunca como JSX en el frontmatter."
  - id: hosts
    name: slowork-hosts
    purpose: Landing estática de captación de hosts del programa slow travel. Una sola ruta `/hosts/` con alternancia ES|EN en cliente, orientada a conversión sin routing i18n de Astro.
    technologies:
      - Astro 6
      - Tailwind CSS v4
      - Static
    learning: "Para funnels acotados, un Astro estático de una ruta con toggle de idioma en cliente evita conflictos de `[lang]` y pantallas en blanco en deploys simples. No todo funnel necesita el mismo motor i18n que el sitio principal."
  - id: front-portal
    name: sloWorkFront
    purpose: Portal Angular 21 para operaciones internas. Panel admin con inbox de pendientes (Creadores + Hosts), badge de notificaciones en sidebar, Apollo Client + NgRx SignalStore y convenciones de UI con Signals, i18n y DaisyUI.
    technologies:
      - Angular 21
      - NgRx SignalStore
      - Apollo Angular
      - DaisyUI 5
    learning: "Al centralizar contadores admin en `AppStore` e inyectar `HostPendingService` en `withMethods`, apareció NG0200: Apollo lee el token del store en su factory y el store dependía de Apollo vía el servicio. Solución: `inject(Injector)` + `get()` perezoso dentro de la acción. Registrado en la bitácora (jun 2026, SignalStore + Apollo)."
---

Arquitectura en tres capas: presentación en Vercel (Astro 6 `output: 'server'`, i18n ES/EN, View Transitions), lógica en AWS (`slowork-api` con GraphQL, Sequelize, waitlist/welcome) y datos en RDS.

`slowork-landing-v2` concentra home, blog (posts vía GraphQL + `marked`), formularios BFF (`POST /api/waitlist/`, `/api/contact/`) con validación Zod y GA4 consolidado. `slowork-front` es el portal Angular 21 con Apollo Client, `signalStore` y módulos de blog, sites y admin.
