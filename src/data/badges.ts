import { Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'Primer Diagnóstico',
    description: 'Exploraste los 4 cuadrantes interactivos en el módulo Aprende Desde Cero.',
    icon: 'Compass',
    unlocked: false,
  },
  {
    id: 'badge-lab-experimenter',
    title: 'Científico de Datos Práctico',
    description: 'Modificaste los valores de la matriz en el Laboratorio y probaste diferentes configuraciones.',
    icon: 'FlaskConical',
    unlocked: false,
  },
  {
    id: 'badge-zero-division',
    title: 'Dominio de Casos Límite',
    description: 'Exploraste una matriz vacía o con denominadores cero y comprendiste la indeterminación matemática.',
    icon: 'ShieldAlert',
    unlocked: false,
  },
  {
    id: 'badge-accuracy-paradox',
    title: 'Cazador de Paradojas',
    description: 'Descubriste y resolviste la Paradoja de la Exactitud en datos fuertemente desbalanceados.',
    icon: 'Zap',
    unlocked: false,
  },
  {
    id: 'badge-financial-strategist',
    title: 'Estratega de ROI y Costos',
    description: 'Calculaste el impacto económico en dólares en el módulo de Sectores Económicos.',
    icon: 'TrendingUp',
    unlocked: false,
  },
  {
    id: 'badge-quiz-champion',
    title: 'Maestro de la Matriz',
    description: 'Completaste con éxito todos los desafíos prácticos del módulo de evaluación.',
    icon: 'Award',
    unlocked: false,
  },
];
