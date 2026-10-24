import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Flame,
  Bike,
  Bell,
  CloudSun,
  FileSpreadsheet,
  Tv,
  HeartPulse,
  MailCheck,
} from 'lucide-react';
import { THEORY_STEPS, MATRIX_CELLS_THEORY, TheoryStep } from '../data/theory';

interface LearnModuleProps {
  onUnlockBadge: (badgeId: string) => void;
  onAddXp: (amount: number) => void;
  onGoToLab: () => void;
}

type ExampleScenarioKey = 'streaming' | 'health' | 'spam';

const EXAMPLE_SCENARIOS = {
  streaming: {
    title: 'Plataforma de Streaming (Churn)',
    positiveClass: 'Cancelará la suscripción',
    negativeClass: 'Permanecerá activo',
    icon: Tv,
    cells: {
      tp: 'El cliente iba a cancelar y el modelo predijo que cancelaría. Éxito: activamos campaña de retención a tiempo.',
      fn: 'El cliente canceló, pero el modelo predijo que no cancelaría. Error grave: el cliente se marchó sin aviso.',
      fp: 'El cliente está feliz, pero el modelo predijo que cancelaría. Falsa alarma: se le dio un cupón innecesario.',
      tn: 'El cliente está feliz y el modelo predijo que seguiría feliz. Éxito: operación normal sin fricción.',
    },
  },
  health: {
    title: 'Diagnóstico Oncológico (Cáncer)',
    positiveClass: 'Paciente enfermo (Maligno)',
    negativeClass: 'Paciente sano (Benigno)',
    icon: HeartPulse,
    cells: {
      tp: 'El paciente tiene cáncer y el modelo lo detectó oportunamente. Éxito vital: se inicia quimioterapia temprana.',
      fn: 'El paciente tiene cáncer, pero el modelo dijo que estaba sano. Error mortal: el tumor progresa sin tratamiento.',
      fp: 'El paciente está sano, pero el modelo sospechó tumor. Falsa alarma: se hace una biopsia de control.',
      tn: 'El paciente está sano y el modelo confirmó que está sano. Éxito: tranquilidad y alta médica.',
    },
  },
  spam: {
    title: 'Ciberseguridad y Correo Spam',
    positiveClass: 'Correo Spam / Phishing',
    negativeClass: 'Correo Legítimo de Negocios',
    icon: MailCheck,
    cells: {
      tp: 'Correo malicioso bloqueado y enviado a la papelera. Éxito: seguridad corporativa preservada.',
      fn: 'Spam molesto que se coló a la bandeja principal. Error leve: el usuario lo borra en 2 segundos.',
      fp: 'Correo crucial de un cliente clasificado erróneamente como spam. Error grave: pérdida de un contrato.',
      tn: 'Correo legítimo que llega sin problemas a la bandeja de entrada. Éxito: comunicación fluida.',
    },
  },
};

export const LearnModule: React.FC<LearnModuleProps> = ({
  onUnlockBadge,
  onAddXp,
  onGoToLab,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedCell, setSelectedCell] = useState<'tp' | 'fn' | 'fp' | 'tn'>('tp');
  const [scenario, setScenario] = useState<ExampleScenarioKey>('streaming');
  const [exploredCells, setExploredCells] = useState<Set<string>>(new Set(['tp']));

  const activeStep: TheoryStep = THEORY_STEPS[activeStepIndex];
  const activeScenario = EXAMPLE_SCENARIOS[scenario];
  const cellData = MATRIX_CELLS_THEORY[selectedCell];

  const handleSelectCell = (cell: 'tp' | 'fn' | 'fp' | 'tn') => {
    setSelectedCell(cell);
    setExploredCells((prev) => {
      const next = new Set(prev).add(cell);
      if (next.size === 4) {
        onUnlockBadge('badge-first-step');
        onAddXp(30);
      }
      return next;
    });
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bike':
        return <Bike className="w-5 h-5 text-blue-500" />;
      case 'Whistle':
      case 'Bell':
        return <Bell className="w-5 h-5 text-teal-500" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-amber-500" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-purple-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Module Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide uppercase">
            <span>Módulo 1</span> • <span>Fundamentos Conceptuales</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Aprende la Matriz de Confusión Desde Cero
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Domina paso a paso cómo evaluar modelos de Machine Learning, comprende la diferencia entre aciertos y tipos de error, y descubre la anatomía de los 4 cuadrantes.
          </p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Step Progress Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {THEORY_STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStepIndex(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeStepIndex === idx
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStepIndex === idx ? 'bg-white text-blue-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {step.number}
            </span>
            <span>{step.title}</span>
          </button>
        ))}
      </div>

      {/* Active Theory Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Paso {activeStep.number} de {THEORY_STEPS.length}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {activeStep.title}
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {activeStep.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 text-slate-700 dark:text-blue-100 text-sm leading-relaxed">
              {activeStep.summary}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Explicación Detallada
              </h3>
              <ul className="space-y-3">
                {activeStep.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key takeaway */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  Idea Clave para Recordar
                </span>
                <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 mt-0.5 font-medium">
                  {activeStep.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => prev - 1)}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                ← Anterior
              </button>

              {activeStepIndex < THEORY_STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStepIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                >
                  <span>Siguiente paso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onGoToLab}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <span>¡Ir al Laboratorio!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Analogy Card & Quick Fact */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                {getStepIcon(activeStep.analogy.icon)}
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  Analogía Cotidiana
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeStep.analogy.title}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
              "{activeStep.analogy.description}"
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-indigo-800/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Regla Mnemotécnica</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
              1. <strong>La segunda palabra</strong> (Positivo / Negativo) siempre te dice qué dijo el modelo.
              <br />
              2. <strong>La primera palabra</strong> (Verdadero / Falso) te dice si el modelo acertó o se equivocó.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: INTERACTIVE 2x2 MATRIX EXPLORER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Interactivo
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Explorador Anatómico de la Matriz 2 × 2
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Toca o haz clic en cualquier celda para descubrir su significado, tipo de error y consecuencias reales.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['streaming', 'health', 'spam'] as ExampleScenarioKey[]).map((key) => {
              const sc = EXAMPLE_SCENARIOS[key];
              const Icon = sc.icon;
              return (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    scenario === key
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{sc.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Positive Class Banner indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Escenario Activo:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{activeScenario.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400">Clase Positiva (+):</span>{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">{activeScenario.positiveClass}</strong>
            </div>
            <div>
              <span className="text-slate-400">Clase Negativa (-):</span>{' '}
              <strong className="text-slate-600 dark:text-slate-300">{activeScenario.negativeClass}</strong>
            </div>
          </div>
        </div>

        {/* Matrix & Detail View Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 2x2 Matrix Component */}
          <div className="lg:col-span-6 space-y-2">
            <div className="text-center pb-2">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Valores Predichos por el Modelo (Columnas)
              </span>
            </div>

            <div className="grid grid-cols-12 gap-2">
              {/* Row Header Label */}
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider -rotate-90 whitespace-nowrap">
                  Valores Reales (Filas)
                </span>
              </div>

              {/* The Matrix Body (10 cols) */}
              <div className="col-span-10 space-y-2">
                {/* Column Headers */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-600 dark:text-slate-300">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Predicho: Positivo (+)</div>
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">Predicho: Negativo (-)</div>
                </div>

                {/* Row 1: Real Positivo */}
                <div className="grid grid-cols-2 gap-2">
                  {/* TP Cell */}
                  <button
                    onClick={() => handleSelectCell('tp')}
                    className={`relative p-4 rounded-xl text-left border-2 transition-all ${
                      selectedCell === 'tp'
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                        : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-emerald-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">TP</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold">
                        Acierto
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">Verdadero Positivo</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Real: (+) | Pred: (+)
                    </div>
                  </button>

                  {/* FN Cell */}
                  <button
                    onClick={() => handleSelectCell('fn')}
                    className={`relative p-4 rounded-xl text-left border-2 transition-all ${
                      selectedCell === 'fn'
                        ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/40'
                        : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-rose-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">FN</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold">
                        Error Tipo II
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">Falso Negativo</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Real: (+) | Pred: (-)
                    </div>
                  </button>
                </div>

                {/* Row 2: Real Negativo */}
                <div className="grid grid-cols-2 gap-2">
                  {/* FP Cell */}
                  <button
                    onClick={() => handleSelectCell('fp')}
                    className={`relative p-4 rounded-xl text-left border-2 transition-all ${
                      selectedCell === 'fp'
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/40'
                        : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-amber-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">FP</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold">
                        Error Tipo I
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">Falso Positivo</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Real: (-) | Pred: (+)
                    </div>
                  </button>

                  {/* TN Cell */}
                  <button
                    onClick={() => handleSelectCell('tn')}
                    className={`relative p-4 rounded-xl text-left border-2 transition-all ${
                      selectedCell === 'tn'
                        ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/20 ring-2 ring-teal-500/40'
                        : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-teal-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">TN</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-bold">
                        Acierto
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">Verdadero Negativo</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Real: (-) | Pred: (-)
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-center text-slate-400 dark:text-slate-500 pt-2">
              Convención UCH (Prof. Hugo Martínez): Filas = Realidad | Columnas = Predicción
            </div>
          </div>

          {/* Cell Detail Card */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${cellData.badgeColor}`}>
                  {cellData.type}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                  {cellData.name} ({cellData.code})
                </h4>
              </div>
              <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                <div>Real: <strong className="text-slate-800 dark:text-slate-200">{cellData.realValue}</strong></div>
                <div>Predicho: <strong className="text-slate-800 dark:text-slate-200">{cellData.predictedValue}</strong></div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Definición Formal:</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{cellData.definition}</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
                <span className="font-bold text-blue-800 dark:text-blue-300">
                  En el Escenario Activo ({activeScenario.title}):
                </span>
                <p className="text-blue-900 dark:text-blue-200 mt-1 font-medium">
                  {activeScenario.cells[selectedCell]}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Consecuencias Reales:</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{cellData.consequences}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{cellData.howToRemember}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
