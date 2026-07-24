---
date: 2026-07-22
headline: "El logo estaba en Angular, pero WhatsApp solo leía index.html"
context: " Tras completar la Fase A de SEO de Finca El Sarao, la aplicación Angular CSR
  ya estaba desplegada en Vercel. El siguiente objetivo era conseguir que los
  enlaces compartidos en WhatsApp y otras redes generasen una vista previa
  corporativa reconocible, con una imagen Open Graph de 1200 × 630 píxeles,
  el logo de la marca y metadatos coherentes, sin introducir todavía SSR ni
  prerenderizado."
technologies:
  - Angular 21
  - Open Graph
  - SEO
  - Vercel
  - CSR
error: "La imagen Open Graph por defecto seguía apuntando a hero-cover.jpg, una
  fotografía de paisaje sin identidad corporativa. Aunque Angular actualizaba
  los metadatos al navegar, los scrapers sociales recibían únicamente el HTML
  inicial y no ejecutaban JavaScript, por lo que nunca veían esos cambios.
  Además, definir un og:url o un canonical fijo en index.html habría atribuido
  incorrectamente la misma URL a todas las rutas profundas de la aplicación."
research: "Comparé los metadatos que mostraba el DOM después de arrancar Angular con los
  incluidos en la respuesta HTML original. El problema no era la disponibilidad
  de la imagen ni el funcionamiento del SeoService: Vercel entregaba el mismo
  index.html para todas las rutas y los scrapers sociales no ejecutaban el
  JavaScript encargado de modificarlo. También descarté construir la URL de la
  imagen con window.location.origin, porque el crawler necesita encontrar una
  URL absoluta antes de que la aplicación se ejecute."
solution: "Creé una tarjeta Open Graph corporativa de 1200 × 630 píxeles y dejé en
  index.html los metadatos invariantes que debían estar disponibles sin
  JavaScript. Convertí DEFAULT_OG_IMAGE en una URL absoluta, mantuve SITE_LOGO
  como recurso independiente para los datos estructurados y centralicé los
  metadatos variables de cada vista mediante SeoService.setPageMeta(). Evité
  declarar valores globales engañosos para og:url y canonical. La implementación
  y sus ajustes quedaron integrados en los PR #60 y #61."
learning: "En una aplicación CSR, lo que no está en el HTML inicial no existe para un
  scraper sin JavaScript. Una tarjeta social estática puede ser fiable; si cada
  URL necesita una vista previa propia, la solución no es añadir más JavaScript,
  sino generar HTML por ruta mediante SSR o prerenderizado."
---