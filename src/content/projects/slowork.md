---
title: SloWork
status: Completado
description: Aplicación de gestión del flujo de trabajo para equipos pequeños, con tableros Kanban, seguimiento de tiempo y reportes de productividad semanales.
technologies:
  - React
  - Node.js
  - Socket.io
  - MongoDB
  - TailwindCSS
problem: Los equipos remotos de menos de 10 personas no tienen herramientas de gestión adaptadas a su escala — las existentes son demasiado complejas o demasiado caras. SloWork ofrece un tablero Kanban en tiempo real con seguimiento de tiempo integrado, sin suscripciones ni configuración compleja.
links:
  github: https://github.com/frozmiz/slowork
  demo: https://slowork.vercel.app
---

SloWork nació de la necesidad de gestionar proyectos freelance sin depender de herramientas como Jira o Asana. Las columnas del tablero son configurables, las tarjetas soportan estimaciones en horas y el sistema emite notificaciones en tiempo real mediante WebSockets cuando un compañero actualiza una tarea.

El módulo de reportes genera un resumen semanal en PDF con la distribución de tiempo por proyecto, útil para facturación a clientes.
