export interface TheoryStep {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
  analogy: {
    title: string;
    description: string;
    icon: string;
  };
}

export interface MatrixCellTheory {
  id: 'tp' | 'fn' | 'fp' | 'tn';
  code: string;
  name: string;
  type: 'Acierto' | 'Error Tipo I' | 'Error Tipo II';
  badgeColor: string;
  realValue: string;
  predictedValue: string;
  definition: string;
  simpleExplanation: string;
  dailyExample: string;
  consequences: string;
  howToRemember: string;
}

export const THEORY_STEPS: TheoryStep[] = [
  {
    id: 'intro-ml',
    number: 1,
    title: '¿Qué es Machine Learning?',
    subtitle: 'Aprender de los datos en lugar de programar reglas fijas',
    summary: 'Machine Learning (Aprendizaje Automático) es una rama de la Inteligencia Artificial que permite a las computadoras identificar patrones en datos históricos para tomar decisiones o hacer predicciones sobre datos nuevos sin estar explícitamente programadas con reglas rígidas.',
    content: [
      'En la programación tradicional, un humano escribe reglas fijas: "SI el saldo es menor a cero Y han pasado 90 días, ENTONCES bloquear cuenta".',
      'En Machine Learning, alimentamos al algoritmo con miles o millones de ejemplos pasados y el algoritmo descubre por sí mismo las complejas relaciones estadísticas que diferencian a un cliente cumplido de uno moroso.',
      'El modelo resultante es una función matemática que recibe nuevas características (variables de entrada o "features") y devuelve una estimación (variable de salida o "target").'
    ],
    keyTakeaway: 'Machine Learning no memoriza datos; generaliza patrones estadísticos para predecir situaciones futuras.',
    analogy: {
      title: 'Aprender a andar en bicicleta',
      description: 'Nadie aprende a montar en bicicleta leyendo un manual con 500 reglas físicas de torque y balance; aprendes intentándolo, cayéndote, ajustando tus reflejos y reconociendo el equilibrio con la práctica.',
      icon: 'Bike',
    },
  },
  {
    id: 'classification-model',
    number: 2,
    title: '¿Qué es un Modelo de Clasificación?',
    subtitle: 'El arte de etiquetar y categorizar',
    summary: 'Un modelo de clasificación es un tipo de aprendizaje supervisado cuyo objetivo es asignar cada observación a una categoría discreta predefinida (por ejemplo: Spam o No Spam, Tumor Maligno o Benigno, Pagará o No Pagará).',
    content: [
      'Se diferencia de la Regresión (que predice números continuos como el precio de una casa o la temperatura de mañana) porque su salida es una etiqueta o clase.',
      'Clasificación Binaria: Tiene exactamente 2 clases posibles (Positiva y Negativa). Por ejemplo: Churn Sí / Churn No.',
      'Clasificación Multiclase: Tiene 3 o más clases excluyentes (por ejemplo: Vehículo, Peatón, Señal de tránsito).',
      '¿Cómo decide el modelo? Internamente, el algoritmo calcula una probabilidad entre 0.0 y 1.0 (por ejemplo, "87% de probabilidad de ser fraude"). Luego aplica un "umbral de decisión" (habitualmente 0.5 o 50% por defecto) para convertir la probabilidad en una etiqueta final Sí/No.'
    ],
    keyTakeaway: 'Clasificar es responder preguntas cerradas: "¿Este correo es peligroso?" "¿Este cliente se va a ir?"',
    analogy: {
      title: 'El árbitro de fútbol',
      description: 'Ante una jugada dudosa en el área, el árbitro no responde con un número continuo; toma una decisión categórica binaria: ¡Es Penal o No es Penal!',
      icon: 'Bell',
    },
  },
  {
    id: 'real-vs-pred',
    number: 3,
    title: 'Valor Real vs. Valor Predicho',
    subtitle: 'La verdad objetiva frente a la opinión del algoritmo',
    summary: 'Para evaluar cualquier modelo necesitamos comparar dos realidades: lo que efectivamente ocurrió en el mundo real (Ground Truth) y lo que el modelo matemático dijo que ocurriría (Prediction).',
    content: [
      'Valor Real (Y real o Ground Truth): Es la verdad comprobada de los hechos. Por ejemplo, la biopsia de laboratorio confirmó que el paciente estaba sano, o el registro bancario confirmó que el cliente canceló su cuenta al final del mes.',
      'Valor Predicho (Y predicho o Ŷ): Es la inferencia calculada por el algoritmo cuando analizó los datos antes de conocer el desenlace.',
      'La coincidencia entre ambos significa un Éxito o Acierto.',
      'La discrepancia entre ambos significa una Equivocación o Error.'
    ],
    keyTakeaway: 'Un modelo perfecto tendría 100% de coincidencias; en el mundo real, los modelos siempre cometen algún grado de error que debemos medir y gestionar.',
    analogy: {
      title: 'El pronóstico del tiempo vs. la lluvia real',
      description: 'La app meteorológica predijo que llovería con 90% de probabilidad (predicción), pero tú sales a la calle a las 3:00 PM y hay un sol radiante sin una sola nube (valor real).',
      icon: 'CloudSun',
    },
  },
  {
    id: 'what-is-confusion-matrix',
    number: 4,
    title: '¿Qué es una Matriz de Confusión?',
    subtitle: 'La radiografía exhaustiva del rendimiento del modelo',
    summary: 'Una matriz de confusión es una tabla de contingencia de 2 × 2 (en problemas binarios) que desglosa detalladamente los aciertos y las distintas clases de errores cometidos por un clasificador.',
    content: [
      '¿Por qué se llama "de confusión"? Se llama así porque permite ver de manera visual e inmediata si el sistema está "confundiendo" una clase con la otra (por ejemplo, confundiendo correos normales con spam).',
      '¿Por qué no basta con una sola nota como la "Exactitud" (Accuracy)? Porque si tienes 99 clientes sanos y 1 enfermo, un modelo perezoso que diga "todos están sanos" tendrá un 99% de exactitud, ¡pero no descubrió a la persona enferma! La matriz revela la verdad completa.',
      'Convención Universitaria Estándar (Material Prof. Hugo Martínez, UCH): Las FILAS representan los Valores Reales de la muestra y las COLUMNAS representan los Valores Predichos por el modelo.',
      'Estructura: Cuatro cuadrantes que albergan TP, FN, FP y TN.'
    ],
    keyTakeaway: 'La matriz de confusión descompone el rendimiento para que ningún error quede oculto detrás de un promedio engañoso.',
    analogy: {
      title: 'El boletín de calificaciones desglosado',
      description: 'No es lo mismo que te digan "tu promedio escolar es 8.0" a ver el detalle: 10 en Historia, 10 en Deportes, pero 4 en Matemáticas. La matriz te muestra exactamente dónde fallaste.',
      icon: 'FileSpreadsheet',
    },
  },
  {
    id: 'how-to-interpret',
    number: 5,
    title: 'Interpretación de los 4 Cuadrantes',
    subtitle: 'Verdaderos Positivos, Falsos Positivos, Falsos Negativos y Verdaderos Negativos',
    summary: 'Cada cuadrante de la matriz responde a una combinación única entre la realidad y la predicción. Entenderlos es el superpoder de todo buen científico de datos.',
    content: [
      '1. Verdadero Positivo (TP): La realidad era positiva y el modelo acertó prediciendo positivo.',
      '2. Falso Negativo (FN): La realidad era positiva, pero el modelo falló diciendo negativo. También conocido como ERROR TIPO II.',
      '3. Falso Positivo (FP): La realidad era negativa, pero el modelo falló diciendo positivo. También conocido como ERROR TIPO I.',
      '4. Verdadero Negativo (TN): La realidad era negativa y el modelo acertó prediciendo negativo.',
      'Regla mnemotécnica infalible: La segunda palabra (Positivo/Negativo) indica lo que DIJO el modelo. La primera palabra (Verdadero/Falso) indica si el modelo ACERTÓ o SE EQUIVOCÓ.'
    ],
    keyTakeaway: 'Recuerda: Verdadero/Falso = ¿Acertó el modelo? | Positivo/Negativo = ¿Qué predijo el modelo?',
    analogy: {
      title: 'El detector de humo en la cocina',
      description: 'Si hay fuego y suena: TP. Si no hay fuego y está callado: TN. Si se queman unas tostadas sin peligro y suena a todo volumen: Falsa Alarma (FP). Si la cocina arde y la alarma no suena: Peligro Mortal (FN).',
      icon: 'Flame',
    },
  },
];

export const MATRIX_CELLS_THEORY: Record<'tp' | 'fn' | 'fp' | 'tn', MatrixCellTheory> = {
  tp: {
    id: 'tp',
    code: 'TP',
    name: 'Verdadero Positivo (True Positive)',
    type: 'Acierto',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    realValue: 'Positivo (+)',
    predictedValue: 'Positivo (+)',
    definition: 'El caso pertenece verdaderamente a la clase positiva y el modelo lo predijo correctamente como positivo.',
    simpleExplanation: '¡Acierto en el blanco! El evento de interés ocurrió y el sistema lo detectó oportunamente.',
    dailyExample: 'Una paciente está embarazada y el test de embarazo arroja dos rayas (positivo).',
    consequences: 'Permite tomar la acción correctiva o comercial oportuna (ej. iniciar tratamiento médico, aplicar campaña de retención a un cliente insatisfecho, bloquear un fraude en proceso).',
    howToRemember: 'Verdadero = El modelo acertó. Positivo = El modelo predijo que SÍ era el evento.',
  },
  fn: {
    id: 'fn',
    code: 'FN',
    name: 'Falso Negativo (False Negative)',
    type: 'Error Tipo II',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    realValue: 'Positivo (+)',
    predictedValue: 'Negativo (-)',
    definition: 'El caso pertenecía a la clase positiva, pero el modelo erróneamente predijo que era negativo (omisión).',
    simpleExplanation: '¡Peligro de omisión! Algo grave o importante estaba sucediendo y el sistema no lo vio.',
    dailyExample: 'Una persona tiene una enfermedad infecciosa, pero la prueba rápida da negativo y sale a la calle a contagiar.',
    consequences: 'Suele ser el error más peligroso y costoso en medicina, seguridad y churn. El cliente se marcha, el cáncer avanza o el fraude se concreta sin defensa.',
    howToRemember: 'Falso = El modelo se equivocó. Negativo = El modelo dijo que NO había problema, cuando sí lo había.',
  },
  fp: {
    id: 'fp',
    code: 'FP',
    name: 'Falso Positivo (False Positive)',
    type: 'Error Tipo I',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    realValue: 'Negativo (-)',
    predictedValue: 'Positivo (+)',
    definition: 'El caso pertenecía a la clase negativa, pero el modelo predijo incorrectamente que era positivo (falsa alarma).',
    simpleExplanation: '¡Falsa alarma! No había ningún problema ni evento, pero el sistema levantó la alerta.',
    dailyExample: 'La alarma del auto se activa escandalosamente por el paso de un perro callejero cerca de la rueda.',
    consequences: 'Genera costos operativos de revisión, fatiga de alertas en operadores humanos o fricción con clientes legítimos (ej. tarjeta bloqueada temporalmente o email de trabajo enviado a spam).',
    howToRemember: 'Falso = El modelo se equivocó. Positivo = El modelo gritó ¡HAY FUEGO! cuando era solo vapor de agua.',
  },
  tn: {
    id: 'tn',
    code: 'TN',
    name: 'Verdadero Negativo (True Negative)',
    type: 'Acierto',
    badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    realValue: 'Negativo (-)',
    predictedValue: 'Negativo (-)',
    definition: 'El caso pertenece legítimamente a la clase negativa y el modelo lo reconoció correctamente como tal.',
    simpleExplanation: '¡Paz y normalidad acertada! Todo estaba en orden y el sistema confirmó que todo estaba en orden.',
    dailyExample: 'Una persona sana se hace un test de dopaje y el resultado confirma que está completamente limpio.',
    consequences: 'Mantiene las operaciones fluidas sin interrupciones ni costos innecesarios, permitiendo que el 99% de los usuarios legítimos disfruten de una experiencia sin fricciones.',
    howToRemember: 'Verdadero = El modelo acertó. Negativo = El modelo predijo que NO ocurría nada anormal.',
  },
};
