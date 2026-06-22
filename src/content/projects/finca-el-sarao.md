---
title: Finca El Sarao
status: En Desarrollo
description: Plataforma EdTech para Academia Digital Finca El Sarao con cursos online, campus de alumnos, panel de administración, blog editorial y seguimiento de progreso por lección.
technologies:
  - Angular 21
  - NestJS 11
  - Prisma 7
  - PostgreSQL
  - Tailwind CSS v4
  - DaisyUI 5
problem: La academia necesitaba centralizar matrículas, progreso de lecciones, pagos (Stripe) y vídeo (Bunny.net) sin depender de LMS genéricos que no encajaban con su modelo de negocio, su identidad visual ni el flujo editorial del blog.
links:
  demo: https://platform-web-hazel-pi.vercel.app
---

Monorepo pnpm con `api/` (NestJS 11 + Prisma 7) y `web/` (Angular 21 zoneless). El frontend despliega en Vercel; la API y PostgreSQL corren en Railway con Dockerfile dedicado. Arquitectura de proveedores desacoplada (`PaymentProvider`, `VideoProvider`) con mocks en desarrollo.

Fase I en curso según ROADMAP: auth JWT, CRUD de cursos y lecciones, campus del alumno, panel admin con tema oscuro propio, sistema global de toasts con animaciones nativas (`@starting-style` + `animate.leave`) e iconografía centralizada vía `AppIcon` y `@lucide/angular`.
