export interface MetricSummaryItem {
  nameEs: string;
  nameEn: string;
  synonyms: string[];
  formula: string;
  questionAnswered: string;
  whenToUse: string;
  pitfall: string;
}

export const METRIC_SUMMARY_ITEMS: MetricSummaryItem[] = [
  {
    nameEs: 'Exactitud',
    nameEn: 'Accuracy',
    synonyms: ['Tasa de Aciertos Global'],
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    questionAnswered: '¿Qué porcentaje de todas las predicciones fue correcto?',
    whenToUse: 'Cuando las clases están balanceadas (ej. 50% positivos y 50% negativos) y ambos tipos de error tienen costos similares.',
    pitfall: 'En datasets desbalanceados (fraude, enfermedades raras), es una métrica engañosa que puede ser 99% sin detectar ningún positivo (Paradoja de la Exactitud).',
  },
  {
    nameEs: 'Precisión',
    nameEn: 'Precision',
    synonyms: ['Valor Predictivo Positivo (PPV)', 'Certeza Positiva'],
    formula: 'TP / (TP + FP)',
    questionAnswered: 'De todo lo que el modelo predijo como positivo, ¿cuánto lo era realmente?',
    whenToUse: 'Cuando el costo de un Falso Positivo (falsa alarma) es muy perjudicial (ej. clasificar un correo de negocios como spam o acusar inocentes).',
    pitfall: 'No mide cuántos casos positivos reales se quedaron sin detectar (omisiones).',
  },
  {
    nameEs: 'Sensibilidad',
    nameEn: 'Recall / Exhaustividad / TPR',
    synonyms: ['Sensibilidad', 'Recall', 'True Positive Rate', 'Hit Rate'],
    formula: 'TP / (TP + FN)',
    questionAnswered: 'De todos los casos que eran verdaderamente positivos, ¿cuántos logró detectar el modelo?',
    whenToUse: 'Cuando un Falso Negativo es inaceptable o mortal (detección de cáncer, fugas de clientes de alto valor, fallas estructurales).',
    pitfall: 'Un modelo que prediga que "todo es positivo" tendrá 100% de Recall pero generará miles de falsas alarmas inútiles.',
  },
  {
    nameEs: 'Especificidad',
    nameEn: 'Specificity / TNR',
    synonyms: ['True Negative Rate', 'Selectividad'],
    formula: 'TN / (TN + FP)',
    questionAnswered: 'De todos los casos que eran realmente negativos, ¿cuántos descartó con acierto?',
    whenToUse: 'Para evaluar la capacidad del sistema de no molestar a usuarios normales o sanos.',
    pitfall: 'No informa sobre la capacidad de capturar la clase minoritaria de interés.',
  },
  {
    nameEs: 'F1-Score',
    nameEn: 'F1-Score (Balanced F-Measure)',
    synonyms: ['Media Armónica de Precisión y Sensibilidad'],
    formula: '2 × (Precision × Recall) / (Precision + Recall)',
    questionAnswered: '¿Qué tan equilibrado es el modelo entre falsas alarmas y casos omitidos?',
    whenToUse: 'La métrica reina cuando las clases están desbalanceadas y buscas un balance entre Precisión y Recall.',
    pitfall: 'Asume que Precisión y Recall tienen exactamente la misma importancia (si uno es más prioritario, se usa F-beta con β≠1).',
  },
  {
    nameEs: 'Tasa de Falsos Positivos (FPR)',
    nameEn: 'False Positive Rate',
    synonyms: ['Tasa de Falsa Alarma', '1 - Especificidad', 'Error Tipo I (α)'],
    formula: 'FP / (FP + TN)',
    questionAnswered: 'De todos los casos negativos reales, ¿qué porcentaje fue clasificado erróneamente?',
    whenToUse: 'Eje horizontal de la Curva ROC (Receiver Operating Characteristic). Se busca minimizar.',
    pitfall: 'A veces confundida con la Tasa de Falsos Descubrimientos (FDR = 1 - Precisión).',
  },
];

export const ACADEMIC_NOTES = {
  title: 'Guía de la Cátedra Universitaria (Prof. Hugo Martínez - UCH)',
  subtitle: 'Aclaraciones conceptuales, convenciones de rotulación y rigor estadístico',
  points: [
    {
      title: '1. Orientación de la Matriz (Filas vs. Columnas)',
      content: 'En la cátedra universitaria de la Universidad de Chile y en bibliotecas de estándar internacional como Scikit-Learn (Python), las FILAS representan la Realidad (Valores Reales) y las COLUMNAS representan la Predicción (Valores del Modelo). Atención: Algunos autores anglosajones antiguos invierten los ejes colocando la predicción en las filas. Para no equivocarte nunca, busca siempre los rótulos "Real" vs "Predicho" antes de leer los datos.',
    },
    {
      title: '2. Denominadores y Casos Matemáticos Indefinidos (División por Cero)',
      content: 'En el material didáctico suele asumirse que siempre hay observaciones en cada celda. Sin embargo, en un entorno de producción real, si un modelo nunca predice la clase positiva (TP = 0, FP = 0), el denominador de la Precisión es 0. Matemáticamente es una forma indeterminada (0/0 o n/0), no "0%" ni "100%". MatrizLab maneja estas condiciones indicando explícitamente "Indefinido" con advertencia educativa.',
    },
    {
      title: '3. Rigor en el Redondeo Porcentual',
      content: 'En ejercicios impresos de clase pueden encontrarse redondeos aproximados (por ejemplo, redondear 88.88% a 88% o a 89%). MatrizLab implementa redondeo estándar con 2 decimales de precisión para evitar inconsistencias algebraicas donde la suma de porcentajes complementarios difiera de 100%.',
    },
    {
      title: '4. Error Tipo I vs. Error Tipo II en la Toma de Decisiones',
      content: 'El Falso Positivo (FP) corresponde al Error Tipo I (rechazar una hipótesis nula verdadera, es decir, afirmar que algo ocurre cuando no es así). El Falso Negativo (FN) corresponde al Error Tipo II (no rechazar la hipótesis nula siendo falsa, es decir, no ver el evento). En ciencia de datos aplicada a negocios, la matriz de confusión debe traducirse siempre a una matriz de costos monetarios para determinar el umbral óptimo.',
    },
  ],
};
