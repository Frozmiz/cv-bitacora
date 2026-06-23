/** Referentes técnicos y filosofía de formación. */

export interface TechnicalRoot {
  title: string;
  mentor: string;
  linkedin: string;
  description: string;
}

export const technicalRoots = [
  {
    title: 'Arquitectura Frontend con Angular - Buenas Prácticas - Clean Architecture',
    mentor: 'Alan Buscaglia (ConquerBlocks Academy - Gentleman Programming)',
    linkedin: 'https://www.linkedin.com/in/alanbuscaglia/',
    description:
      'Evolución hacia la lógica estructural, Clean Architecture y adopción de Angular con tipado estricto como framework principal. También me introdujo a Engram y a una metodología de trabajo con agentes de IA.',
  },
  {
    title: 'Rigor Técnico - Semantica - SEO',
    mentor: 'Bienvenido Sáez (ConquerBlocks Academy)',
    linkedin: 'https://www.linkedin.com/in/bienvenidosaez/',
    description:
      'Construcción de cimientos técnicos robustos y adopción de un enfoque pragmático ante retos complejos. También me introdujo a la semantica y a la importancia del SEO en el desarrollo de aplicaciones web.',
  },
  {
    title: 'Metodología Base - Lógica de Programación - Estructuras de control',
    mentor: 'Elena Hernández (ConquerBlocks Academy)',
    linkedin: 'https://www.linkedin.com/in/elenahernandezmartinez/',
    description:
      'Asentamiento de la lógica de programación y el rigor algorítmico utilizando Python. Más que sintaxis, esta etapa forjó una disciplina metodológica esencial para aprender a abstraer problemas complejos y estructurar el pensamiento antes de escribir código en un lenguaje de programación.',
  },
  {
    title: 'Inmersión práctica en el ecosistema JavaScript',
    mentor: 'Santiago Corocotta (Upgrade-hub Academy)',
    linkedin: 'https://www.linkedin.com/in/santiago-corocotta-cabrera-escoriza-15671521b/',
    description:
      'Su mentoría en Upgrade-hub no solo me impulsó a desarrollar interfaces interactivas, sino que sentó las bases de mis aptitudes de organización de código y el uso profesional de Git para el control de versiones.',
  },
] as const satisfies readonly TechnicalRoot[];
