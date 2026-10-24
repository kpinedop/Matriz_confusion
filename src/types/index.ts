export interface MatrixValues {
  tp: number; // Verdaderos Positivos
  fn: number; // Falsos Negativos (Error Tipo II)
  fp: number; // Falsos Positivos (Error Tipo I)
  tn: number; // Verdaderos Negativos
}

export interface MetricResult {
  value: number | null; // null if division by zero
  percentage: string;
  formula: string;
  substitution: string;
  interpretation: string;
  businessImpact: string;
  name: string;
  synonyms: string[];
  isPrimary?: boolean;
}

export interface AllMetrics {
  total: number;
  correct: number;
  errors: number;
  accuracy: MetricResult;
  precision: MetricResult;
  recall: MetricResult;
  specificity: MetricResult;
  f1Score: MetricResult;
  errorRate: MetricResult;
  fpr: MetricResult;
  fnr: MetricResult;
  prevalence: MetricResult;
}

export interface IndustryScenario {
  id: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  positiveClass: string;
  negativeClass: string;
  preset: MatrixValues;
  defaultCostFP: number; // Cost of False Alarm
  defaultCostFN: number; // Cost of Missed Target
  defaultBenefitTP: number; // Benefit of Caught Target
  currency: string;
  fpExplanation: string;
  fnExplanation: string;
  recommendedMetric: 'precision' | 'recall' | 'f1Score' | 'accuracy';
  recommendationReason: string;
  realWorldStory: string;
  teacherNote?: string;
}

export interface Challenge {
  id: string;
  title: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  scenario: string;
  story: string;
  targetMatrix?: MatrixValues;
  question: string;
  options: {
    id: string;
    text: string;
    explanation: string;
    isCorrect: boolean;
  }[];
  xpReward: number;
  hint?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  completedChallenges: string[];
  unlockedBadges: string[];
  matrixExperimentsCount: number;
  userName: string;
}
