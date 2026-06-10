---
title: GTVMOTOR
status: En Desarrollo
description: Plataforma web para la gestión integral de concesionarias de vehículos, con módulos de inventario, reservas de citas y panel de administración.
technologies:
  - Angular
  - NestJS
  - PostgreSQL
  - TypeORM
  - TailwindCSS
problem: Las concesionarias dependían de hojas de cálculo y llamadas telefónicas para gestionar su inventario y agendar citas de servicio, generando errores de sincronización y pérdida de clientes potenciales. GTVMOTOR centraliza todo el flujo operativo en una sola plataforma con roles diferenciados (admin, agente, cliente).
links:
  github: https://github.com/frozmiz/gtvmotor
---

GTVMOTOR es una aplicación full-stack diseñada para modernizar la operativa interna de concesionarias de automóviles. El frontend en Angular consume una API REST construida con NestJS, con autenticación basada en JWT y gestión de roles por guardia de rutas.

El módulo de inventario permite filtrar vehículos por marca, modelo, año y estado de disponibilidad. El módulo de citas integra un calendario con detección de conflictos de horario en tiempo real.
