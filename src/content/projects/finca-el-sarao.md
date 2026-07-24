---
title: Academia Digital Finca El Sarao
status: En Desarrollo
description: Plataforma EdTech para Academia Digital Finca El Sarao con cursos online, campus de alumnos, panel de administración, blog editorial y seguimiento de progreso por lección.
technologies:
  - Angular 21
  - NestJS 11
  - Prisma 7
  - PostgreSQL
  - Tailwind CSS v4
  - DaisyUI 5
origin: La academia necesitaba matrículas, progreso de lecciones, pagos y vídeo bajo su propia identidad, sin acoplarse a un LMS genérico. La Academia Digital Finca El Sarao nace para centralizar el campus, el blog editorial y la administración en una plataforma a medida.
links:
  demo: https://fincaelsarao.com
---

Monorepo pnpm con `api/` (NestJS 11 + Prisma 7) y `web/` (Angular 21 zoneless). Frontend en Vercel (`fincaelsarao.com`, Root = `web`); API y PostgreSQL en Railway (`api.fincaelsarao.com`). Arquitectura cross-origin (sin proxy Vercel salvo rewrite de `/sitemap.xml`). Proveedores desacoplados (`PaymentProvider`, `VideoProvider`) con mocks en desarrollo.

Fase I–II en curso: auth JWT, blog SEO (Fase A: `SeoService`, JSON-LD, sitemap dinámico), campus del alumno, panel admin con tema oscuro, toasts con `@starting-style` e iconografía vía `AppIcon`. Incidencia de deploy Vercel documentada en la bitácora (jul 2026: monorepo pnpm + Prisma + Root Directory).

El problema de las vistas previas al compartir enlaces en WhatsApp y otras redes quedó documentado como caso práctico en la [bitácora técnica](/#logbook-2026-07-22-finca-og-corporate-fallback).
