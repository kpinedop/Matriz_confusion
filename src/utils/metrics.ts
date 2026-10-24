import { AllMetrics, MatrixValues, MetricResult } from '../types';

/**
 * Safely format percentage or return 'Indefinido'
 */
function formatPercent(value: number | null): string {
  if (value === null || isNaN(value)) return 'Indefinido';
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Calculates all confusion matrix metrics with step-by-step arithmetic substitution
 */
export function calculateAllMetrics(matrix: MatrixValues): AllMetrics {
  const { tp, fn, fp, tn } = matrix;
  const total = tp + fn + fp + tn;
  const correct = tp + tn;
  const errors = fp + fn;

  // 1. Accuracy
  const accuracyVal = total > 0 ? correct / total : null;
  const accuracy: MetricResult = {
    name: 'Exactitud (Accuracy)',
    synonyms: ['Accuracy', 'Tasa de Aciertos Global'],
    value: accuracyVal,
    percentage: formatPercent(accuracyVal),
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    substitution: total > 0
      ? `(${tp} + ${tn}) / (${tp} + ${tn} + ${fp} + ${fn}) = ${correct} / ${total} = ${accuracyVal !== null ? (accuracyVal * 100).toFixed(2) : 0}%`
      : 'Total de observaciones es 0 (Indefinido)',
    interpretation: 'Porcentaje de todas las predicciones (tanto positivas como negativas) que el modelo acertó.',
    businessImpact: 'Útil solo cuando las clases están balanceadas. En datos desbalanceados puede ser engañoso (la "Paradoja de la Exactitud").',
    isPrimary: true,
  };

  // 2. Precision
  const precisionDenom = tp + fp;
  const precisionVal = precisionDenom > 0 ? tp / precisionDenom : null;
  const precision: MetricResult = {
    name: 'Precisión (Precision)',
    synonyms: ['Valor Predictivo Positivo (PPV)', 'Certeza Positiva'],
    value: precisionVal,
    percentage: formatPercent(precisionVal),
    formula: 'TP / (TP + FP)',
    substitution: precisionDenom > 0
      ? `${tp} / (${tp} + ${fp}) = ${tp} / ${precisionDenom} = ${precisionVal !== null ? (precisionVal * 100).toFixed(2) : 0}%`
      : 'El modelo no predijo ninguna clase positiva (TP + FP = 0)',
    interpretation: 'De todos los casos que el modelo predijo como POSITIVOS, ¿qué porcentaje realmente lo era?',
    businessImpact: 'Crucial cuando el costo de un Falso Positivo (falsa alarma) es sumamente alto (ej. clasificar un email legítimo como spam o acusar erróneamente de fraude).',
    isPrimary: true,
  };

  // 3. Recall
  const recallDenom = tp + fn;
  const recallVal = recallDenom > 0 ? tp / recallDenom : null;
  const recall: MetricResult = {
    name: 'Sensibilidad (Recall / Exhaustividad)',
    synonyms: ['Sensibilidad', 'Exhaustividad', 'Tasa de Verdaderos Positivos (TPR)', 'Hit Rate'],
    value: recallVal,
    percentage: formatPercent(recallVal),
    formula: 'TP / (TP + FN)',
    substitution: recallDenom > 0
      ? `${tp} / (${tp} + ${fn}) = ${tp} / ${recallDenom} = ${recallVal !== null ? (recallVal * 100).toFixed(2) : 0}%`
      : 'No existen casos reales positivos en la muestra (TP + FN = 0)',
    interpretation: 'De todos los casos que REALMENTE eran positivos, ¿qué porcentaje logró detectar el modelo?',
    businessImpact: 'Vital cuando omitir un positivo (Falso Negativo) es peligroso o inaceptable (ej. cáncer no diagnosticado, cliente clave que se fuga sin aviso).',
    isPrimary: true,
  };

  // 4. Specificity
  const specDenom = tn + fp;
  const specVal = specDenom > 0 ? tn / specDenom : null;
  const specificity: MetricResult = {
    name: 'Especificidad (Specificity)',
    synonyms: ['Tasa de Verdaderos Negativos (TNR)', 'Selectividad'],
    value: specVal,
    percentage: formatPercent(specVal),
    formula: 'TN / (TN + FP)',
    substitution: specDenom > 0
      ? `${tn} / (${tn} + ${fp}) = ${tn} / ${specDenom} = ${specVal !== null ? (specVal * 100).toFixed(2) : 0}%`
      : 'No existen casos reales negativos en la muestra (TN + FP = 0)',
    interpretation: 'De todos los casos que REALMENTE eran negativos, ¿qué porcentaje identificó correctamente como negativos?',
    businessImpact: 'Evalúa la capacidad de descartar sanos o transacciones normales sin levantar alarmas innecesarias.',
    isPrimary: true,
  };

  // 5. F1-Score
  let f1Val: number | null = null;
  let f1Sub = '';
  if (precisionVal !== null && recallVal !== null && (precisionVal + recallVal) > 0) {
    f1Val = (2 * precisionVal * recallVal) / (precisionVal + recallVal);
    f1Sub = `2 × (${(precisionVal * 100).toFixed(1)}% × ${(recallVal * 100).toFixed(1)}%) / (${(precisionVal * 100).toFixed(1)}% + ${(recallVal * 100).toFixed(1)}%) = ${(f1Val * 100).toFixed(2)}%`;
  } else {
    f1Sub = 'Indefinido (Precisión y Sensibilidad son 0 o no calculables)';
  }

  const f1Score: MetricResult = {
    name: 'F1-Score (Puntaje F1)',
    synonyms: ['Media Armónica F-Measure', 'F-Score balanceado'],
    value: f1Val,
    percentage: formatPercent(f1Val),
    formula: '2 × (Precision × Recall) / (Precision + Recall)',
    substitution: f1Sub,
    interpretation: 'Promedio armónico entre Precisión y Recall. Penaliza fuertemente si una de las dos métricas es muy baja.',
    businessImpact: 'La mejor métrica global única cuando buscas un equilibrio justo entre falsas alarmas y omisiones en clases desbalanceadas.',
    isPrimary: true,
  };

  // 6. Overall Error Rate
  const errVal = total > 0 ? errors / total : null;
  const errorRate: MetricResult = {
    name: 'Tasa de Error Global (Error Rate)',
    synonyms: ['Tasa de Mala Clasificación', 'Overall Error Rate'],
    value: errVal,
    percentage: formatPercent(errVal),
    formula: '(FP + FN) / Total  [ó 1 - Exactitud]',
    substitution: total > 0
      ? `(${fp} + ${fn}) / ${total} = ${errors} / ${total} = ${errVal !== null ? (errVal * 100).toFixed(2) : 0}%`
      : 'Total es 0',
    interpretation: 'Proporción de todas las decisiones en las que el modelo se equivocó.',
    businessImpact: 'Representa directamente el volumen porcentual de errores operativos del sistema de IA.',
  };

  // 7. False Positive Rate (FPR)
  const fprVal = specDenom > 0 ? fp / specDenom : null;
  const fpr: MetricResult = {
    name: 'Tasa de Falsos Positivos (FPR)',
    synonyms: ['Probabilidad de Falsa Alarma', '1 - Especificidad', 'Error Tipo I'],
    value: fprVal,
    percentage: formatPercent(fprVal),
    formula: 'FP / (FP + TN) = 1 - Especificidad',
    substitution: specDenom > 0
      ? `${fp} / (${fp} + ${tn}) = ${fp} / ${specDenom} = ${fprVal !== null ? (fprVal * 100).toFixed(2) : 0}%`
      : 'Denominador es 0',
    interpretation: 'De todos los casos realmente negativos, ¿qué porcentaje fue clasificado erróneamente como positivo?',
    businessImpact: 'Es el eje horizontal (eje X) de la famosa Curva ROC. Queremos que sea lo más cercana a 0% posible.',
  };

  // 8. False Negative Rate (FNR)
  const fnrVal = recallDenom > 0 ? fn / recallDenom : null;
  const fnr: MetricResult = {
    name: 'Tasa de Falsos Negativos (FNR)',
    synonyms: ['Tasa de Omisión', '1 - Sensibilidad', 'Error Tipo II'],
    value: fnrVal,
    percentage: formatPercent(fnrVal),
    formula: 'FN / (FN + TP) = 1 - Sensibilidad',
    substitution: recallDenom > 0
      ? `${fn} / (${fn} + ${tp}) = ${fn} / ${recallDenom} = ${fnrVal !== null ? (fnrVal * 100).toFixed(2) : 0}%`
      : 'Denominador es 0',
    interpretation: 'De todos los casos realmente positivos, ¿qué porcentaje se le escapó al modelo sin detectar?',
    businessImpact: 'Indica la tasa de "ciego" del modelo ante casos críticos.',
  };

  // 9. Prevalence
  const prevVal = total > 0 ? (tp + fn) / total : null;
  const prevalence: MetricResult = {
    name: 'Prevalencia de la Clase Positiva',
    synonyms: ['Frecuencia Base', 'Proporción Real Positiva'],
    value: prevVal,
    percentage: formatPercent(prevVal),
    formula: '(TP + FN) / Total',
    substitution: total > 0
      ? `(${tp} + ${fn}) / ${total} = ${tp + fn} / ${total} = ${prevVal !== null ? (prevVal * 100).toFixed(2) : 0}%`
      : 'Total es 0',
    interpretation: 'Qué tan común o escasa es la clase positiva en la población analizada.',
    businessImpact: 'Si es menor a 5% o 1%, nos encontramos en un problema fuertemente desbalanceado (Fraude, Cáncer raro, Falla de turbina).',
  };

  return {
    total,
    correct,
    errors,
    accuracy,
    precision,
    recall,
    specificity,
    f1Score,
    errorRate,
    fpr,
    fnr,
    prevalence,
  };
}

export interface BusinessImpactResult {
  costFpTotal: number;
  costFnTotal: number;
  benefitTpTotal: number;
  netFinancialBalance: number; // Benefit - (CostFP + CostFN)
  summaryText: string;
}

export function calculateBusinessImpact(
  matrix: MatrixValues,
  costFp: number,
  costFn: number,
  benefitTp: number
): BusinessImpactResult {
  const costFpTotal = matrix.fp * costFp;
  const costFnTotal = matrix.fn * costFn;
  const benefitTpTotal = matrix.tp * benefitTp;
  const netFinancialBalance = benefitTpTotal - (costFpTotal + costFnTotal);

  let summaryText = '';
  if (netFinancialBalance >= 0) {
    summaryText = `El modelo genera un balance POSITIVO neto de +$${netFinancialBalance.toLocaleString()} al capturar ${matrix.tp} casos valiosos, superando las pérdidas por errores.`;
  } else {
    summaryText = `El modelo genera una pérdida operativa neta de -$${Math.abs(netFinancialBalance).toLocaleString()} debido al alto impacto de los ${matrix.fn} falsos negativos y ${matrix.fp} falsas alarmas.`;
  }

  return {
    costFpTotal,
    costFnTotal,
    benefitTpTotal,
    netFinancialBalance,
    summaryText,
  };
}
