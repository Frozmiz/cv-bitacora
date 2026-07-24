---
date: 2026-07-03
headline: "Vercel bloqueaba el despliegue de Angular por errores de tipos de NestJS"
summary: >
  El pipeline de Vercel fallaba tras un `ng build` correcto porque
  typechequeaba NestJS/Prisma del monorepo; fijé Root Directory en `web`
  con Include outside enabled.
context: "Estaba cerrando el deploy de Finca El Sarao (monorepo pnpm: Angular 21 en `web/`, NestJS 11 + Prisma 7 en `api/`) tras la Fase A SEO. El frontend va a Vercel (`fincaelsarao.com`); la API y PostgreSQL corren en Railway (`api.fincaelsarao.com`). No hay proxy same-origin como en GTVMOTOR: la SPA llama cross-origin con cookies HttpOnly para refresh. El build local y `ng build` en Vercel pasaban; el pipeline fallaba en fases posteriores o al cambiar Root Directory."
technologies:
  - Vercel
  - pnpm
  - Angular 21
  - NestJS 11
  - Prisma 7
  - PostgreSQL
  - Railway
error: "Cadena de fallos en CI de Vercel: (1) `Command prisma:generate not found` al ejecutar scripts desde cwd incorrecto. (2) Con Root Directory = `./`, `ng build` terminaba bien pero después aparecían decenas de ciclos `Using TypeScript 5.9.3` y `TS2305: Module @prisma/client has no exported member UserRole` en `api/src/...`. Prisma sí generaba el cliente en postinstall. (3) Tras mover Root a `web` y desactivar «Include files outside the root directory», el install falló con `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND` en `/vercel` porque `cd ..` / `pnpm --dir ..` no veía el `package.json` raíz del monorepo."
research: "El log mostraba que el error TS2305 ocurría **después** de `Application bundle generation complete`, no durante `vercel-build`. Eso apunta a la fase de Serverless Functions de Vercel, no al script de build del repo. Con Root = `./`, Vercel reserva la carpeta `api/` para compilar NestJS como functions aunque el `buildCommand` solo ejecute Prisma + Angular. Con Root = `web`, `../api` queda fuera del proyecto Vercel (solo reservaría `web/api/`, que no existe). Pero un monorepo pnpm necesita el lockfile y workspaces en la raíz: sin «Include outside» el sandbox solo monta `web/` y `--dir ..` apunta a `/vercel` vacío. Documenté la cronología en `docs/DEPLOY.md` y contrasté con GTVMOTOR (Nginx same-origin) vs Finca (cross-origin + rewrite único de `/sitemap.xml`)."
solution: "Config validada en `main` (`ee3c489`): Root Directory = `web`, «Include files outside…» = **Enabled**, overrides del dashboard vacíos. `web/vercel.json`: `installCommand: HUSKY=0 pnpm install --dir ..`, `buildCommand: pnpm run vercel-build`. `web/package.json` delega: `vercel-build` → `pnpm --dir .. run vercel-build`. Script raíz: `pnpm --filter api exec prisma generate && pnpm --filter web run build` (sin `nest build`). `.npmrc`: `node-linker=hoisted` + hoist de `@prisma/client`. `api/package.json`: `postinstall: prisma generate` por si Vercel aísla installs sobre `api/`. Build ~1 min, deploy OK en `fincaelsarao.com`."
learning: "En monorepos en Vercel, Root Directory y «Include outside» son dos ejes independientes: el primero evita que carpetas hermanas (`api/`) se traten como serverless; el segundo permite que el install vea el `package.json` raíz. Un `ng build` verde no garantiza deploy verde si la plataforma compila más código después. Si Prisma generate pasa pero TS2305 aparece en `api/`, sospecha de Serverless Functions, no de schema. Para SPA + API en otro host, documentar cross-origin (CORS + `withCredentials`) y no asumir que la receta same-origin de un proyecto anterior aplica tal cual."
---

Secuencia de configuración (referencia):

```
Vercel Settings          web/vercel.json              package.json (raíz)
─────────────────        ─────────────────            ───────────────────
Root = web          →    pnpm install --dir ..   →    postinstall: prisma generate
Include outside ON       pnpm run vercel-build        vercel-build: filter api + web build
Overrides vacíos         output: dist/web/browser     (sin nest build)
```

Checklist post-deploy:

```bash
# Build local equivalente
pnpm install && pnpm vercel-build

# Producción
curl -I https://fincaelsarao.com
curl -I https://fincaelsarao.com/sitemap.xml
curl -s https://api.fincaelsarao.com/api/v1/blog | head
```
