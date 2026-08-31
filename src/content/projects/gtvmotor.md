---
title: GTVMOTOR · Automotive Web Platform
kind: client
status: En Desarrollo
role: Angular Frontend Engineer · Sole Developer
period: Dec 2024 — Present
description: Plataforma web para concesionaria con catálogo, reservas, tasación, panel administrativo y SSR híbrido desplegado en AWS EC2.
technologies:
  - Angular
  - TypeScript
  - RxJS
  - Signals
  - Standalone Components
  - SSR
  - NestJS
  - Bun
  - Prisma
  - PostgreSQL
  - AWS EC2
  - AWS S3
  - Docker Compose
  - Nginx
  - Stripe
  - Technical SEO
highlights:
  - Angular SSR & hydration
  - AWS production deployment
  - Private S3 asset delivery
  - Stripe / SES integrations
image:
  src: /images/projects/gtvmotor.png
  alt: Panel de administración de GTVMOTOR con ingresos, citas pendientes y actividad reciente
  position: center top
  width: 2048
  height: 1020
origin: La gestión del inventario, las reservas y las operaciones se realizaba mediante hojas de cálculo y llamadas, provocando desajustes de stock y conflictos de agenda. GTVMOTOR centraliza el flujo operativo en una plataforma web a medida.
links:
  demo: https://gtvmotor.es
  caseStudy: https://github.com/Frozmiz/gtvmotor-case-study
---

Proyecto real como Angular Frontend Engineer / sole developer desde diciembre 2024. Multirepo (Master / Backend / Frontend) con API NestJS sobre runtime Bun y frontend Angular standalone: signals, interceptores funcionales y arquitectura por features lazy-loaded.

Trabajé en la modernización progresiva del frontend legacy hacia Angular con SSR manual, límites browser/server, `APP_INITIALIZER`, estabilidad de hidratación (NG0506), timers/gtag/NgZone, canonical/OG/JSON-LD seguros en SSR, LCP con `NgOptimizedImage` y entrega privada desde S3 con presigned URLs.

En producción: EC2 Ubuntu + Elastic IP, PostgreSQL 16 en Docker, Nginx como reverse proxy y servidor estático híbrido (browser + SSR vía systemd). Dominio canónico `gtvmotor.es` con redirecciones 301 y SSL Let's Encrypt. Integración con Stripe, Amazon SES y despliegue documentado en runbook operativo. El código fuente es privado; el case study público recoge el trabajo frontend y de despliegue.
