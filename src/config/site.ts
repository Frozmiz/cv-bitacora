/** Rutas y metadatos globales del sitio. */

export const site = {
  name: 'Alejandro González López',
  role: 'Angular Frontend Engineer',
  url: 'https://alejandrogl.is-a.dev',
  email: 'AlejandroGL92_IT@outlook.es',
  linkedin: 'https://www.linkedin.com/in/alex-gonzalez-lopez/',
  github: 'https://github.com/Frozmiz',
} as const;

export const defaultDescription =
  'Angular Frontend Engineer especializado en Angular 21, TypeScript, RxJS, Signals y NgRx. SSR, arquitectura frontend, rendimiento y desarrollo de productos web reales.';

export const defaultTitle = `${site.name} · ${site.role}`;

/** CV en PDF servidos desde `public/cv/`. */
export const cv = {
  label: site.name,
  defaultLocale: 'es' as const,
  files: {
    es: {
      path: '/cv/CV_Alejandro_Gonzalez_Angular_Frontend_Engineer_ES_2026.pdf',
      label: 'CV Español',
      lang: 'es',
    },
    en: {
      path: '/cv/CV_Alejandro_Gonzalez_Angular_Frontend_Engineer_EN_2026_FINAL.pdf',
      label: 'CV English',
      lang: 'en',
    },
  },
} as const;

export type CvLocale = keyof typeof cv.files;
