import {
  House,
  User,
  Monitor,
  Code,
  FileText,
  Search,
  Compass,
  Swords,
  Lightbulb,
  ExternalLink,
  Diamond,
  Flag,
  CircleDot,
  Check,
} from '@lucide/astro';

/**
 * Registro explícito de iconos usados en la app.
 * Cada entrada es un import nominal: no se carga la colección completa,
 * pero el bundle incluye todos los iconos listados aquí.
 */
export const iconRegistry = {
  home: House,
  user: User,
  monitor: Monitor,
  code: Code,
  'file-text': FileText,
  search: Search,
  compass: Compass,
  swords: Swords,
  lightbulb: Lightbulb,
  'external-link': ExternalLink,
  diamond: Diamond,
  flag: Flag,
  'circle-dot': CircleDot,
  check: Check,
} as const;

export type IconName = keyof typeof iconRegistry;
