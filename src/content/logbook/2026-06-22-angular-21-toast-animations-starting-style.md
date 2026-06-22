---
date: 2026-06-22
context: "Animación de entrada y salida de notificaciones Toast dentro de un bucle `@for` reactivo en una arquitectura Zoneless con Angular 21."
technologies:
  - "Angular 21"
  - "CSS Moderno"
  - "Signals"
error: "Colisión de animaciones y destrucción prematura de nodos en el DOM. Al expirar el tiempo del Toast, Angular destruye el nodo instantáneamente por el flujo de control `@for`, impidiendo que las transiciones CSS de salida se ejecuten o provocando cortes abruptos en la interfaz gráfica."
research: "Análisis del ciclo de vida del DOM moderno y evaluación de alternativas. Cargar el paquete tradicional `@angular/animations` añade una penalización de rendimiento innecesaria en aplicaciones Zoneless y va en contra de la optimización del Core Web Vitals (Lighthouse 100/100). Históricamente se retenía el nodo con JS, pero los estándares web actuales permiten delegar la carga directamente al motor de renderizado del navegador."
solution: "Implementación de una estrategia híbrida nativa. Para la entrada, se utiliza la propiedad de CSS moderno `@starting-style` para definir los estilos del elemento antes de su primer renderizado en el navegador (solucionando la animación desde `display: none`). Para la salida, se utiliza el hook de animación nativo del framework (`animate.leave`), deteniendo la destrucción física del nodo en el DOM hasta que la transición CSS declare su finalización."
learning: "Menos JavaScript, más CSS nativo. Descargar la lógica de transiciones en las APIs modernas del navegador mantiene el hilo principal libre y la aplicación ultra fluida. La evolución de las herramientas modernas prioriza los estándares web sobre las abstracciones pesadas del framework. Además, se inmuniza el entorno de desarrollo actualizando las reglas globales de contexto (`.cursor/rules` / `.mdc`) para asegurar que todo el equipo y los agentes adopten esta solución nativa en futuros componentes interactivos (modales, menús, etc.), evitando deuda técnica."
---
