---
title: Finca El Sarao · Digital Platform & LMS
kind: client
status: En Desarrollo
role: Angular Frontend Engineer · Sole Developer
period: May 2026 — Present
description: Plataforma digital y LMS para un cliente real con web pública, catálogo de cursos, campus de alumnos, administración y reproducción de vídeo HLS.
technologies:
  - Angular 21
  - TypeScript
  - RxJS
  - Signals
  - NestJS
  - Prisma
  - PostgreSQL
  - Tailwind CSS
  - DaisyUI
  - HLS
  - hls.js
  - TUS
  - Bunny.net
  - Vercel
  - Railway
  - JWT
  - SSR
highlights:
  - LMS & Student Campus
  - Signed HLS video delivery
  - Hybrid rendering
  - Technical SEO
image:
  src: /images/projects/finca-el-sarao.png
  alt: Campus virtual de Finca El Sarao con catálogo de cursos y progreso del alumno
  position: center top
  width: 2048
  height: 1020
origin: La academia necesitaba matrículas, acceso a cursos, campus de alumnos, contenido editorial y vídeo bajo su propia identidad, sin acoplarse a un LMS genérico. Finca El Sarao centraliza web pública, catálogo, LMS y administración en una plataforma a medida.
links:
  demo: https://www.fincaelsarao.com/
  caseStudy: https://github.com/Frozmiz/finca-el-sarao-case-study
---

Proyecto real como Angular Frontend Engineer / sole developer desde mayo 2026. Monorepo pnpm con `api/` (NestJS + Prisma) y `web/` (Angular 21 zoneless). Frontend en Vercel; API y PostgreSQL en Railway. Arquitectura cross-origin con render híbrido (SSR, prerender y CSR) y SEO técnico.

Implementado y en curso: web pública, catálogo de cursos, LMS con módulos y lecciones, campus del alumno, interfaces de administración, matrículas y control de acceso, reproducción HLS con hls.js, subidas reanudables TUS hacia Bunny.net y acceso firmado al playback.

Auth JWT, blog con `SeoService`, JSON-LD, sitemap dinámico, toasts con `@starting-style` e iconografía vía `AppIcon`. El código fuente del producto es privado; el case study público documenta decisiones de arquitectura y despliegue.

El problema de las vistas previas al compartir enlaces en WhatsApp quedó documentado en la [bitácora técnica](/#logbook-2026-07-22-finca-og-corporate-fallback).
