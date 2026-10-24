import { IndustryScenario } from '../types';

export const SCENARIOS: IndustryScenario[] = [
  {
    id: 'streaming-churn',
    title: 'Plataformas de Streaming y TV Digital',
    badge: 'Media & Churn',
    category: 'Entretenimiento y Telecomunicaciones',
    description: 'Predicción de suscriptores con alta probabilidad de cancelar su membresía mensual (Churn).',
    positiveClass: 'El cliente cancelará la suscripción (Churn = Sí)',
    negativeClass: 'El cliente permanecerá suscrito (Churn = No)',
    preset: {
      tp: 320,  // Clientes que iban a cancelar y el modelo detectó a tiempo
      fn: 80,   // Falsos Negativos: clientes que cancelaron sin ser detectados
      fp: 150,  // Falsas alarmas: clientes fieles que recibieron oferta innecesaria
      tn: 1450, // Clientes fieles correctamente clasificados
    },
    defaultCostFP: 15,   // Costo de otorgar cupón/descuento preventivo a quien no pensaba irse
    defaultCostFN: 240,  // Valor del tiempo de vida del cliente (LTV anual) perdido para siempre
    defaultBenefitTP: 180,// Valor neto de retener exitosamente al cliente antes de su baja
    currency: 'USD',
    fpExplanation: 'Falso Positivo: Un cliente leal es clasificado erróneamente como en riesgo de baja. Se le envía un descuento innecesario de $15. No se pierde al cliente, solo un pequeño margen.',
    fnExplanation: 'Falso Negativo (Grave): Un cliente insatisfecho no es detectado por el modelo, abandona la plataforma y la empresa pierde $240 en suscripciones anuales.',
    recommendedMetric: 'recall',
    recommendationReason: 'Es preferible tener falsas alarmas (FP con costo de $15) que dejar escapar cancelaciones (FN con costo de $240). El Recall alto asegura no perder clientes valiosos.',
    realWorldStory: 'Netflix y Spotify utilizan modelos de retención donde la sensibilidad es prioritaria, ya que recuperar a un suscriptor que ya canceló cuesta 5 veces más que retenerlo.',
    teacherNote: 'En el material docente de UCH, este caso ilustra cómo el costo asimétrico entre FP y FN determina qué métrica debe priorizar el científico de datos.',
  },
  {
    id: 'health-cancer',
    title: 'Sector Salud: Diagnóstico Oncológico Temprano',
    badge: 'Medicina Preventiva',
    category: 'Salud y Biotecnología',
    description: 'Detección asistida por IA de tumores malignos en mamografías y tomografías.',
    positiveClass: 'Paciente presenta tumor maligno (Patología = Positiva)',
    negativeClass: 'Paciente está sano / tumor benigno (Patología = Negativa)',
    preset: {
      tp: 95,
      fn: 5,   // ¡Peligro de muerte!
      fp: 80,  // Biopsia de control
      tn: 1820,
    },
    defaultCostFP: 180,   // Costo de biopsia adicional y angustia temporal
    defaultCostFN: 50000, // Tratamiento oncológico tardío, secuelas irreversibles o fallecimiento
    defaultBenefitTP: 15000, // Detección a tiempo que salva la vida con tratamiento temprano
    currency: 'USD',
    fpExplanation: 'Falso Positivo: Una persona sana recibe un resultado sospechoso. Deberá realizarse una biopsia o resonancia complementaria que confirmará que no tiene nada.',
    fnExplanation: 'Falso Negativo (CATASTRÓFICO): Un paciente con cáncer en fase 1 recibe un resultado "negativo", vuelve a su casa sin tratamiento y el cáncer progresa a metástasis.',
    recommendedMetric: 'recall',
    recommendationReason: 'En medicina diagnóstica de tamizaje, el Recall debe superar el 95-98%. Un falso positivo se aclara con otro examen; un falso negativo puede costar una vida.',
    realWorldStory: 'Los sistemas de radiología con IA están calibrados con umbrales de decisión bajos para asegurar que casi ningún caso sospechoso pase desapercibido.',
    teacherNote: 'Clásico ejemplo donde el Error Tipo II (FN) es infinitamente más costoso e inaceptable que el Error Tipo I (FP).',
  },
  {
    id: 'banking-fraud',
    title: 'Finanzas: Detección de Fraude en Tarjetas',
    badge: 'Fintech & Seguridad',
    category: 'Banca y Pagos Digitales',
    description: 'Monitoreo en tiempo real de millones de transacciones con tarjeta para bloquear cargos clonados.',
    positiveClass: 'Transacción Fraudulenta (Fraude = Sí)',
    negativeClass: 'Transacción Legítima (Fraude = No)',
    preset: {
      tp: 42,
      fn: 8,
      fp: 35,
      tn: 9915, // Desbalance extremo de clases (99.5% legítimas)
    },
    defaultCostFP: 25,   // Molestia al cliente por llamada/bloqueo temporal
    defaultCostFN: 850,  // Monto del fraude cargado que el banco debe devolver
    defaultBenefitTP: 850, // Fraude detenido a tiempo
    currency: 'USD',
    fpExplanation: 'Falso Positivo: La tarjeta de un cliente legítimo es bloqueada en una tienda por sospecha. El cliente debe llamar al banco para autorizarla (fricción en la experiencia).',
    fnExplanation: 'Falso Negativo: Un ciberdelincuente sustrae $850 y la transacción pasa desapercibida. El banco y el comercio asumen la pérdida.',
    recommendedMetric: 'f1Score',
    recommendationReason: 'Con clases tan desbalanceadas, la Exactitud no sirve (decir siempre "no es fraude" daría 99.5% de exactitud). El F1-Score equilibra atrapar fraudes sin bloquear a todos los clientes.',
    realWorldStory: 'Visa y Mastercard procesan más de 65,000 transacciones por segundo. La Paradoja de la Exactitud es el enemigo #1 de los evaluadores junior en este rubro.',
    teacherNote: 'Demuestra la "Paradoja de la Exactitud": con 99.5% de transacciones legítimas, un modelo que no detecte ningún fraude tendría 99.5% de exactitud pero sería un desastre empresarial.',
  },
  {
    id: 'cybersecurity-spam',
    title: 'Ciberseguridad: Filtro Anti-Spam y Phishing',
    badge: 'Seguridad TI',
    category: 'Sistemas y Comunicaciones',
    description: 'Filtrado automatizado de correos corporativos que clasifican mensajes entrantes como legítimos o basura.',
    positiveClass: 'Correo Spam / Malicioso (Spam = Sí)',
    negativeClass: 'Correo Legítimo de Negocios (Spam = No)',
    preset: {
      tp: 720,
      fn: 60,
      fp: 5,   // ¡Muy pocos falsos positivos!
      tn: 2215,
    },
    defaultCostFP: 2500, // Un contrato o propuesta de cliente crucial termina en la carpeta de spam
    defaultCostFN: 10,   // Un spam molesto entra a la bandeja y el empleado tarda 2 seg en borrarlo
    defaultBenefitTP: 50,  // Tiempo y seguridad ahorrados
    currency: 'USD',
    fpExplanation: 'Falso Positivo (CRÍTICO): Un correo de un cliente con una orden de compra de $50,000 es clasificado como spam y nadie lo lee a tiempo.',
    fnExplanation: 'Falso Negativo (Leve): Un correo no deseado llega a la bandeja de entrada y el empleado lo borra manualmente sin consecuencias.',
    recommendedMetric: 'precision',
    recommendationReason: 'Aquí la prioridad es la PRECISIÓN. Cada vez que el modelo marque un correo como Spam y lo oculte, debemos estar 99.9% seguros de que realmente es spam.',
    realWorldStory: 'Google Workspace y Outlook ajustan deliberadamente sus filtros hacia máxima precisión: toleran que de vez en cuando pase un spam para evitar que se pierdan correos vitales.',
    teacherNote: 'En este caso, a diferencia de la medicina, el Error Tipo I (FP) es dramáticamente más costoso que el Error Tipo II (FN).',
  },
  {
    id: 'credit-risk',
    title: 'Riesgo Crediticio: Aprobación de Préstamos',
    badge: 'Crédito & Solvencia',
    category: 'Banca Tradicional',
    description: 'Evaluación del riesgo de incumplimiento o mora en solicitudes de créditos de consumo e hipotecas.',
    positiveClass: 'Cliente caerá en Mora (Default = Sí)',
    negativeClass: 'Cliente pagará puntualmente (Default = No)',
    preset: {
      tp: 110,
      fn: 30,
      fp: 75,
      tn: 785,
    },
    defaultCostFP: 1200, // Costo de oportunidad: intereses no ganados de un cliente solvente rechazado
    defaultCostFN: 15000,// Capital impago incobrable prestado a un deudor moroso
    defaultBenefitTP: 15000, // Pérdida evitada al rechazar oportunamente al moroso
    currency: 'USD',
    fpExplanation: 'Falso Positivo: Se rechaza la solicitud de crédito a una persona responsable que habría pagado todas sus cuotas e intereses.',
    fnExplanation: 'Falso Negativo: Se le aprueba un préstamo de $15,000 a un solicitante que dejará de pagar en el tercer mes.',
    recommendedMetric: 'f1Score',
    recommendationReason: 'Se requiere un balance óptimo entre minimizar el riesgo crediticio (FN) y mantener el volumen de negocio bancario (evitar excesivos FP).',
    realWorldStory: 'Las fintech de microcrédito utilizan modelos con matrices de costos dinámicas según la tasa de interés del mercado para definir el punto de corte.',
    teacherNote: 'Excelente para ejercicios de matriz de costos financieros donde se calcula la ganancia esperada por crédito otorgado.',
  },
];
