---
title: Ecosistema Slowork
status: En Desarrollo
featured: true
description: Ecosistema digital de alojamientos, experiencias y comunidad para nómadas y viajeros de larga estancia, con sitio público SSR, blog editorial, lista de espera, portal Angular de operaciones, landings de captación para creadores y anfitriones y API GraphQL desplegada en AWS.
technologies:
  - Astro 6
  - Angular 21
  - GraphQL
  - Tailwind CSS v4
  - DaisyUI 5
  - Vercel
  - AWS RDS
origin: La marca, el contenido editorial, la lista de espera y la operación interna vivían en stacks y rutas distintas. Slowork nace para unificar la experiencia pública y el portal operativo en un mismo ecosistema, sin exponer la API al navegador ni duplicar lógica de negocio.
links:
  github: https://github.com/frozmiz/slowork
  demo: https://www.slowork.app
landings:
  - id: landing-v2
    name: Landing pública, waiting list y blog
    purpose: Landing principal de la marca en www.slowork.app. Home, blog editorial vía GraphQL, waitlist, formulario de contacto, páginas legales e i18n ES/EN con View Transitions.
    url: https://www.slowork.app
    technologies:
      - Astro 6 SSR
      - Zod
      - GraphQL
      - Vercel
    learning: "Consolidé React+Express y blog en un solo Astro 6 con patrón BFF: validación Zod en `src/models/`, rutas `src/pages/api/*` como proxy fino y cero acceso a BD desde el front. Presentación en Vercel, reglas de negocio en AWS, datos en RDS: cada capa escala sin arrastrar el stack entero."
  - id: content-creators
    name: Landing de creadores
    purpose: Landing de captación para el programa de creadores de contenido. Copy bilingüe en Content Layer, FAQ con JSON-LD, formulario multipaso y envío serverless de solicitudes.
    url: https://www.slowork.app/es/creators/
    technologies:
      - Astro 6
      - Content Layer
      - DaisyUI 5
      - JSON-LD
    learning: "Separé producto en un deploy independiente con Content Layer + Zod por locale y BFF `POST /api/creator-applications/` para ocultar la API. El stepper valida por paso con Zod (no `reportValidity` nativo) y el markup vive en componentes `.astro`, nunca como JSX en el frontmatter."
  - id: hosts
    name: Landing de hosts
    purpose: Landing estática de captación de hosts del programa slow travel. Una sola ruta `/hosts/` con alternancia ES|EN en cliente, orientada a conversión sin routing i18n de Astro.
    url: https://landing-hosts.vercel.app/hosts/
    technologies:
      - Astro 6
      - Tailwind CSS v4
      - Static
    learning: "Para funnels acotados, un Astro estático de una ruta con toggle de idioma en cliente evita conflictos de `[lang]` y pantallas en blanco en deploys simples. No todo funnel necesita el mismo motor i18n que el sitio principal."
  - id: front-portal
    name: Slowork Portal
    purpose: Portal de operaciones desarrollado en Angular para centralizar la revisión y gestión de creadores, anfitriones, alojamientos, experiencias y colaboraciones dentro del ecosistema Slowork.
    url: https://portal.slowork.app/login
    technologies:
      - Angular 21
      - NgRx SignalStore
      - Apollo Angular
      - DaisyUI 5
    learning: "Al centralizar contadores admin en `AppStore` e inyectar `HostPendingService` en `withMethods`, apareció NG0200: Apollo lee el token del store en su factory y el store dependía de Apollo vía el servicio. Solución: `inject(Injector)` + `get()` perezoso dentro de la acción. Registrado en la bitácora (jun 2026, SignalStore + Apollo)."
---

Arquitectura en tres capas: presentación en Vercel (Astro 6 `output: 'server'`, i18n ES/EN, View Transitions), lógica en AWS (`slowork-api` con GraphQL, Sequelize, waitlist/welcome) y datos en RDS.

La web pública concentra home, blog (posts vía GraphQL + `marked`), formularios BFF (`POST /api/waitlist/`, `/api/contact/`) con validación Zod y GA4 consolidado. El portal de operaciones es Angular 21 con Apollo Client, `signalStore` y módulos de blog, sites y admin.
