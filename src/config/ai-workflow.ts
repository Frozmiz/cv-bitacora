/** Copy y estructura de la subsección IA en Perfil. */

export interface AiWorkflowPill {
  label: string;
  href?: string;
}

export interface AiWorkflowPillar {
  id: string;
  title: string;
  text: string;
  /** Término técnico mostrado en monospace */
  term: string;
  pills: readonly AiWorkflowPill[];
}

export interface AiWorkflowConfig {
  label: string;
  title: string;
  intro: string;
  closing: string;
  pillars: readonly AiWorkflowPillar[];
}

export const aiWorkflow = {
  label: 'IA en el flujo de trabajo',
  title: 'Contexto, memoria y aplicación diaria',
  intro:
    'Mi integración de la IA comenzó con el Spec-Driven Development: definir el qué antes del cómo me llevó a escribir prompts atómicos y contexto acotado. Eso evolucionó hacia Engram para memoria por proyecto y un Cerebro Global sincronizado con Git. Uso la IA como acelerador con reglas, no como sustituto de criterio: contexto persistente, trazabilidad y revisión humana de cada cambio.',
  closing:
    'El objetivo no es escribir más rápido: es mantener contexto, trazabilidad y criterio técnico cuando el asistente cambia en cada sesión.',
  pillars: [
    {
      id: 'spec-driven',
      title: 'Spec-Driven Development',
      text: 'Guío a la IA mediante prompts atómicos: una intención por mensaje, sin mezclar refactor, diseño y bugfix en la misma petición. Parto de specs breves (objetivo, restricciones, criterio de éxito) para que el asistente no improvise requisitos.',
      term: 'spec-driven',
      pills: [{ label: 'Cursor' }, { label: 'Prompts' }],
    },
    {
      id: 'engram-memory',
      title: 'Memoria de Proyecto',
      text: 'Documento decisiones técnicas, ADRs ligeros y aprendizajes de la bitácora en memoria que el agente puede consultar entre sesiones. Lo que resuelvo hoy queda registrado para no repetir el mismo error mañana.',
      term: 'engram-memory',
      pills: [
        { label: 'Engram', href: 'https://github.com/Gentleman-Programming/engram' },
        { label: 'Markdown' },
      ],
    },
    {
      id: 'cerebro-global',
      title: 'Cerebro Global',
      text: 'Centralizo mis reglas de desarrollo transversales, convenciones y preferencias de stack en un repositorio único versionado con Git. Cada proyecto hereda el mismo punto de partida y sincronizo cambios con scripts de Bash.',
      term: 'cerebro-global',
      pills: [{ label: 'Git' }, { label: 'Bash' }],
    },
    {
      id: 'diff-review',
      title: 'Revisión y Control',
      text: 'Mantengo el criterio de producto y la responsabilidad final del código que mergeo. Reviso diff, ejecuto el proyecto localmente y valido que la solución encaja con la spec antes de dar por cerrada una tarea.',
      term: 'diff-review',
      pills: [{ label: 'Code Review' }],
    },
  ],
} as const satisfies AiWorkflowConfig;
