---
date: 2026-06-27
headline: "Angular lanzaba NG0200: SignalStore y Apollo crearon una dependencia circular"
summary: >
  El bootstrap fallaba por el ciclo AppStore → HostPending → Apollo → AppStore;
  rompí la inyección eager con `Injector` y resolución perezosa en la acción.
context: "En el front de Slowork, el sidebar del admin muestra un badge con el total de solicitudes pendientes (creadores vía REST y hosts vía GraphQL). Ese número vive en `AppStore`, un NgRx SignalStore global. Tras tocar la carga de contadores en el store, la aplicación dejó de arrancar en `/login`: antes de poder validar si el badge volvía a funcionar, el bootstrap ya fallaba con un error de dependencias."
technologies:
  - "Angular 21"
  - "NgRx SignalStore"
  - "Apollo Angular"
  - "Dependency Injection"
error: "RuntimeError NG0200: dependencia circular detectada para `SignalStore`. Ruta: `_Auth` → `SignalStore` → `_HostPendingService` → `_Apollo` → `InjectionToken APOLLO_OPTIONS` → `SignalStore`. La app fallaba al cargar `/login` antes de que el sidebar pudiera pedir los contadores."
research: "Se trazó el ciclo completo en el grafo de DI. `AppStore` inyectaba `HostPendingService` en el bloque `withMethods` al **construir** el store. Ese servicio depende de `Apollo`. La factory de `provideApollo` (`apollo.config.ts`) a su vez hace `inject(AppStore)` para leer el token JWT y montar el `authLink`. Angular no puede instanciar dos tokens que se necesitan mutuamente durante la misma resolución. Se descartó mover la lógica a `CollaborationReviewService` (también inyecta `AppStore`). Como alternativa válida quedó usar `HttpClient` con POST GraphQL crudo, pero duplica la query ya definida en `host-pending.queries.ts`."
solution: "Inyección perezosa con `Injector`. En `withMethods` solo se resuelven dependencias seguras (`Router`, `HttpClient`, `Injector`). `HostPendingService` se obtiene **dentro** de `loadAdminPendingCounts()` con `injector.get(HostPendingService)`, cuando el store ya está creado. La llamada a Hosts sigue siendo `getPendingHosts(1, 1)` y se guarda `pageInfo.totalItems`; Creadores usa REST con `HttpClient`. Ambas peticiones van en `forkJoin` con `catchError(() => of(0))` para no romper el badge si una API falla."
learning: "Un store global no debe inyectar en su constructor servicios que dependan de infraestructura configurada con el propio store. El ciclo no aparece al ejecutar un método: aparece al **registrar** `inject(HostPendingService)` en `withMethods`. Regla práctica: estado central (token, usuario) ↔ cliente HTTP/GraphQL exige lazy resolution, un `TokenService` intermedio sin dependencias, o peticiones REST aisladas. En SignalStore, `inject(Injector)` + `get()` en la acción es el patrón mínimo para romper el ciclo sin duplicar queries."
---

Cadena del ciclo (referencia rápida):

```
AppStore (withMethods)
  └─ inject(HostPendingService)     ← eager, rompe aquí
       └─ Apollo
            └─ APOLLO_OPTIONS factory
                 └─ inject(AppStore)   ← necesita token para authLink
```

Patrón aplicado:

```typescript
withMethods((store) => {
  const injector = inject(Injector);

  return {
    loadAdminPendingCounts() {
      const hostPendingService = injector.get(HostPendingService);
      // forkJoin hosts + creators → patchState
    },
  };
});
```

Contexto de producto: el badge solo se carga si `store.isAdmin()` y el sidebar llama a la acción en `ngOnInit`. Tras aprobar/rechazar en `/dashboard/notifications`, conviene volver a invocar `loadAdminPendingCounts()` para refrescar el contador sin recargar la página.
