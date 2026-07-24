---
title: Plataforma GTVMOTOR
status: En Desarrollo
description: Plataforma integral para concesionarias de vehículos (compra, alquiler, lavado, tasación y panel administrativo), con SSR híbrido y despliegue en producción en AWS EC2.
technologies:
  - Angular 18
  - NestJS
  - Bun
  - PostgreSQL
  - Prisma
  - Tailwind CSS
  - SSR
origin: La gestión del inventario, las reservas y las operaciones se realizaba mediante hojas de cálculo y llamadas, provocando desajustes de stock, conflictos de agenda y pérdida de oportunidades. GTVMOTOR nace para centralizar todo el flujo operativo en una única plataforma.
links:
  github: https://github.com/frozmiz/gtvmotor
  demo: https://gtvmotor.es
---

Multirepo (Master / Backend / Frontend) con API NestJS sobre runtime Bun y frontend Angular 100 % standalone: signals, interceptores funcionales, Lucide y Clean Architecture por features lazy-loaded.

En producción: EC2 Ubuntu + Elastic IP, PostgreSQL 16 en Docker con volumen persistente, Nginx como reverse proxy y servidor estático híbrido (browser + SSR en `:4000` vía systemd). Dominio canónico `gtvmotor.es` con redirecciones 301 y SSL Let's Encrypt. Runbook operativo documentado en `SPECIFICATION_PROD.md`. Migración a Angular 21 en curso.
