/** Rutas y metadatos globales del sitio. */

export const site = {
  name: 'frozmiz.dev',
  email: 'contacto@frozmiz.dev',
} as const;

/**
 * CV en PDF servido desde `public/`.
 * Archivo: public/cv/CV_Alejandro_Gonzalez_Frontend_Product_Engineer_ES_v6.pdf
 */
export const cv = {
  file: '/cv/CV_Alejandro_Gonzalez_Frontend_Product_Engineer_ES_v6.pdf',
  label: 'Alejandro González López',
} as const;
