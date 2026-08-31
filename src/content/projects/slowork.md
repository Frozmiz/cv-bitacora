---
title: Slowork · Frontend Platform & Web Ecosystem
kind: startup
status: En Desarrollo
role: Angular Frontend Engineer · Co-Founder
period: Jan 2024 — Present
description: Ecosistema digital para nómadas con sitio público SSR, blog editorial, portal Angular de operaciones y API GraphQL en AWS.
technologies:
  - Angular 21
  - TypeScript
  - RxJS
  - Signals
  - NgRx
  - SignalStore
  - GraphQL
  - Apollo
  - Astro 6
  - Tailwind CSS v4
  - OAuth 2.0
  - Vercel
  - AWS RDS
highlights:
  - Angular product frontend
  - GraphQL / Apollo
  - OAuth 2.0
  - Astro public ecosystem
image:
  src: /images/projects/slowork.png
  alt: Ecosistema Slowork con landing pública, login, blog y panel de administración
  position: center top
  width: 2048
  height: 1152
origin: La marca, el contenido editorial, la lista de espera y la operación interna vivían en stacks y rutas distintas. Slowork unifica experiencia pública y portal operativo en un mismo ecosistema, sin exponer la API al navegador ni duplicar lógica de negocio.
links:
  demo: https://www.slowork.app
  caseStudy: https://github.com/Frozmiz/slowork-frontend-case-study
landings:
  - id: landing-v2
    name: Public Site
    purpose: Landing principal de la marca en www.slowork.app. Home, blog editorial vía GraphQL, waitlist, formulario de contacto, páginas legales e i18n ES/EN con View Transitions.
    url: https://www.slowork.app
    technologies:
      - Astro 6 SSR
      - Zod
      - GraphQL
      - Vercel
    learning: "Consolidé React+Express y blog en un solo Astro 6 con patrón BFF: validación Zod en `src/models/`, rutas `src/pages/api/*` como proxy fino y cero acceso a BD desde el front. Presentación en Vercel, reglas de negocio en AWS, datos en RDS: cada capa escala sin arrastrar el stack entero."
  - id: content-creators
    name: Creator Landing
    purpose: Landing de captación para el programa de creadores de contenido. Copy bilingüe en Content Layer, FAQ con JSON-LD, formulario multipaso y envío serverless de solicitudes.
    url: https://www.slowork.app/es/creators/
    technologies:
      - Astro 6
      - Content Layer
      - DaisyUI 5
      - JSON-LD
    learning: "Separé producto en un deploy independiente con Content Layer + Zod por locale y BFF `POST /api/creator-applications/` para ocultar la API. El stepper valida por paso con Zod (no `reportValidity` nativo) y el markup vive en componentes `.astro`, nunca como JSX en el frontmatter."
  - id: hosts
    name: Hosts Landing
    purpose: Landing estática de captación de hosts del programa slow travel. Una sola ruta `/hosts/` con alternancia ES|EN en cliente, orientada a conversión sin routing i18n de Astro.
    url: https://landing-hosts.vercel.app/hosts/
    technologies:
      - Astro 6
      - Tailwind CSS v4
      - Static
    learning: "Para funnels acotados, un Astro estático de una ruta con toggle de idioma en cliente evita conflictos de `[lang]` y pantallas en blanco en deploys simples. No todo funnel necesita el mismo motor i18n que el sitio principal."
  - id: front-portal
    name: Operations Portal
    purpose: Portal de operaciones en Angular para revisión y gestión de creadores, anfitriones, alojamientos, experiencias y colaboraciones.
    url: https://portal.slowork.app/login
    technologies:
      - Angular 21
      - NgRx SignalStore
      - Apollo Angular
      - DaisyUI 5
    learning: "Al centralizar contadores admin en `AppStore` e inyectar `HostPendingService` en `withMethods`, apareció NG0200: Apollo lee el token del store en su factory y el store dependía de Apollo vía el servicio. Solución: `inject(Injector)` + `get()` perezoso dentro de la acción. Registrado en la bitácora (jun 2026, SignalStore + Apollo)."
---

Startup constituida con equipo multidisciplinar (~15 personas) y dos desarrolladores principales en producto. Como Angular Frontend Engineer & co-founder desde enero 2024, tengo ownership significativo del frontend: Angular 21, RxJS, Signals, NgRx/SignalStore, GraphQL con Apollo, OAuth 2.0, flujos de booking/calendario, notificaciones, Creator Panel, UX de control de acceso y colaboración con backend. El API está liderado por otro desarrollador.

Arquitectura en tres capas: presentación en Vercel (Astro 6 SSR, i18n ES/EN, View Transitions, landings y blog con SEO técnico y Core Web Vitals), lógica en AWS (`slowork-api` con GraphQL y Sequelize) y datos en RDS. El portal Angular concentra operaciones internas. Existen usuarios MVP en el flujo de content creators. El código fuente del producto es privado; el case study público documenta el trabajo frontend.
