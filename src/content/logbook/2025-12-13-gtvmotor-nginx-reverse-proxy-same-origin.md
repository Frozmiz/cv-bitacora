---
date: 2025-12-13
headline: "0 coches en prod y la DB llena: plot twist, era localhost"
context: "Primer despliegue de GTVMOTOR en AWS EC2 (Ubuntu + Elastic IP). Stack en producción: NestJS/Bun y PostgreSQL 16 en Docker, frontend Angular servido por Nginx en el host, dominios gtvmotor.es y gtvmotor.co.uk con SSL Let's Encrypt. La infra de proxy se añadió el 12/12/2025; el 13/12/2025 se cerró el fallo que dejaba el catálogo vacío en prod."
technologies:
  - AWS EC2
  - Nginx
  - Docker
  - NestJS
  - Angular
  - Let's Encrypt
  - PostgreSQL
error: "Tras el deploy, la web cargaba pero el inventario mostraba 0 vehículos pese a tener datos en PostgreSQL. `environment.prod.ts` seguía apuntando a `http://localhost:3000/api`: en el navegador del usuario esa URL no existe. Además, con varios dominios (.es, .co.uk, www) un front que llamara a otro host habría forzado CORS, preflight y cookies cruzadas. La API en Docker estaba bien acotada (`127.0.0.1:3000`), pero el cliente no pasaba por el reverse proxy de Nginx."
research: "Se depuró por capas desde la EC2: `curl -s http://127.0.0.1:3000/api` devolvía JSON con datos, mientras `https://gtvmotor.es` mostraba el SPA vacío. Se revisó el Security Group (solo 80/443 públicos, 3000 cerrado), el vhost en `/etc/nginx/sites-available/gtvmotor` y la diferencia entre `/api` y `/api/` en `proxy_pass`. Se contrastó el enfoque Docker (`nginx-proxy.conf` con upstreams) con la estrategia final documentada en `SPECIFICATION_PROD.md`: Nginx en el host, estáticos en `/var/www/gtvmotor/`, proxy de `/api/` hacia el contenedor local. Para SSL inicial se usó `nginx-proxy.conf.temp-no-ssl` hasta que Certbot validó los dominios."
solution: "Se unificó todo bajo same-origin. En `environment.prod.ts`: `apiUrl: '/api'` e `imageUrl: '/api'`, de modo que el navegador siempre habla con `gtvmotor.es` y Nginx enruta internamente. Reglas de proxy: `/api/` → `127.0.0.1:3000/api/`, `/docs` y `/docs-json` al backend, `/` con `try_files $uri $uri/ /index.html` para el SPA. Redirect explícito `location = /api { return 301 /api/; }`. Dominio canónico `gtvmotor.es` con 301 desde www y .co.uk. API expuesta solo en loopback (`127.0.0.1:3000:3000` en docker-compose). Certbot en Nginx y HSTS en el vhost HTTPS."
learning: "Un reverse proxy no es solo terminar SSL: es la fachada única que alinea SPA, API y documentación bajo un dominio. Si prod usa `/api` relativo, el front en dev debe tener un proxy equivalente o URLs coherentes; si no, funciona en un entorno y falla en otro. No exponer el puerto del backend: Nginx + binding localhost es defensa en profundidad. Los detalles de Nginx importan (barra final en `proxy_pass`, redirect `/api` → `/api/`). Documentar la estrategia real en un runbook (`SPECIFICATION_PROD.md`) evita repetir la depuración en el siguiente deploy."
---

Arquitectura final (referencia rápida):

```
Navegador → Nginx (:443) → /           → /var/www/gtvmotor/ (Angular)
                         → /api/*      → 127.0.0.1:3000 (Docker API)
                         → /docs       → 127.0.0.1:3000 (Swagger)
```

Checklist post-deploy que quedó en el runbook:

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -I https://gtvmotor.es/api
curl -s http://127.0.0.1:3000/api
docker compose -f infrastructure/docker-compose.prod.yml ps
```
