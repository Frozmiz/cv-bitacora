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
  title: 'Contexto, memoria, tests y aplicación diaria',
  intro:
    'Mi integración de la IA comenzó con Spec-Driven Development: definir el qué antes del cómo me llevó a prompts atómicos y contexto acotado. Eso evolucionó hacia Engram para memoria por proyecto, un Cerebro Global sincronizado con Git (`brain-push` / `brain-pull`) y reglas Cursor por repo (`.cursor/rules/*.mdc`). En features críticas el criterio de éxito de la spec incluye tests: el agente lee `docs/TESTING.md`, genera specs siguiendo patrones del monorepo y ejecuta la suite antes de cerrar. Uso la IA como acelerador con reglas, no como sustituto de criterio.',
  closing:
    'El objetivo no es escribir más rápido: es mantener contexto, trazabilidad, tests reproducibles y criterio técnico cuando el asistente cambia en cada sesión. Lo que el agente valida en local, CI lo confirma en cada PR.',
  pillars: [
    {
      id: 'spec-driven',
      title: 'Spec-Driven Development',
      text: 'Guío al agente con prompts tipo Tech Lead: una intención por mensaje, sin mezclar refactor, diseño y bugfix. La spec incluye objetivo, restricciones, archivos de referencia obligatorios (`.cursor/rules/project.mdc`, `DESIGN.md`) y criterio de éxito verificable (typecheck, lint, tests concretos).',
      term: 'spec-driven',
      pills: [{ label: 'Cursor' }, { label: 'Prompts' }, { label: 'Specs' }],
    },
    {
      id: 'agent-testing',
      title: 'Testing con el agente',
      text: 'Automatizo la calidad en el mismo hilo de implementación. El agente investiga el árbol de archivos, aplica patrones de `docs/TESTING.md` (Vitest + Angular Testing Library en web, Jest + Supertest en API), crea helpers reutilizables (`*.testing.ts`) y ejecuta suites acotadas (`ng test --include`, `pnpm --filter api run test`) antes de dar la tarea por cerrada. GitHub Actions replica el gate en cada PR.',
      term: 'agent-testing',
      pills: [
        { label: 'Vitest' },
        { label: 'Jest' },
        { label: 'GitHub Actions' },
      ],
    },
    {
      id: 'engram-memory',
      title: 'Memoria de Proyecto',
      text: 'Documento decisiones técnicas, ADRs ligeros y aprendizajes de la bitácora en Engram. Estrategias de testing, convenciones Angular o incidencias de deploy quedan en `~/.engram/engram.db` y se exportan con `engram sync` para que el agente retome contexto en la siguiente sesión.',
      term: 'engram-memory',
      pills: [
        { label: 'Engram', href: 'https://github.com/Gentleman-Programming/engram' },
        { label: 'Markdown' },
      ],
    },
    {
      id: 'cerebro-global',
      title: 'Cerebro Global',
      text: 'Centralizo memorias de agente en un repo Git aparte del código del producto (`cerebro-global`). Scripts Bash en `~/.zshrc` (`brain-push`, `brain-pull`, `brain-status`) sincronizan chunks entre la BD local, el export del proyecto y GitHub. Misma memoria en otra máquina sin copiar notas a mano.',
      term: 'cerebro-global',
      pills: [
        { label: 'Git' },
        { label: 'Bash' },
        {
          label: 'cerebro-global',
          href: 'https://github.com/Frozmiz/cerebro-global',
        },
      ],
    },
    {
      id: 'diff-review',
      title: 'Revisión y Control',
      text: 'Mantengo el criterio de producto y la responsabilidad final del código que mergeo. Reviso diff, corro lint/typecheck/tests en local y valido que la solución encaja con la spec. Las reglas del repo marcan qué es obligatorio testear (auth, permisos, dinero, validaciones); el resto no se fuerza por inercia.',
      term: 'diff-review',
      pills: [{ label: 'Code Review' }, { label: 'CI' }],
    },
  ],
} as const satisfies AiWorkflowConfig;
