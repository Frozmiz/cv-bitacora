---
title: Slowork
status: En Desarrollo
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
---

Arquitectura en tres capas: presentación en Vercel (Astro 6 `output: 'server'`, i18n ES/EN, View Transitions), lógica en AWS (`slowork-api` con GraphQL, Sequelize, waitlist/welcome) y datos en RDS.

`slowork-landing-v2` concentra home, blog (posts vía GraphQL + `marked`), formularios BFF (`POST /api/waitlist/`, `/api/contact/`) con validación Zod y GA4 consolidado. `slowork-front` es el portal Angular 21 con Apollo Client, `signalStore` y módulos de blog, sites y admin. `slowork-content-creators` es una landing Astro estática con Content Layer, JSON-LD y proxy serverless para solicitudes de creadores.
