import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Info,
  Calculator,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Percent,
  CheckCircle,
  XCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { MatrixValues, MetricResult } from '../types';
import { calculateAllMetrics } from '../utils/metrics';

interface LabModuleProps {
  onUnlockBadge: (badgeId: string) => void;
  onIncrementExperiment: () => void;
  onAddXp: (amount: number) => void;
}

const DEFAULT_MATRIX: MatrixValues = {
  tp: 80,
  fn: 20,
  fp: 10,
  tn: 90,
};

const PRESETS = [
  {
    name: 'Equilibrado',
    desc: 'Buen balance general entre precisión y exhaustividad',
    values: { tp: 80, fn: 20, fp: 10, tn: 90 },
  },
  {
    name: 'Alta Sensibilidad (Recall)',
    desc: 'Casi ningún falso negativo (prioridad médica)',
    values: { tp: 98, fn: 2, fp: 45, tn: 55 },
  },
  {
    name: 'Alta Precisión (PPV)',
    desc: 'Casi ninguna falsa alarma (prioridad anti-spam)',
    values: { tp: 85, fn: 25, fp: 2, tn: 88 },
  },
  {
    name: 'Paradoja de la Exactitud',
    desc: 'Exactitud 99% pero Recall 0% (modelo inútil en fraude)',
    values: { tp: 0, fn: 10, fp: 0, tn: 990 },
  },
  {
    name: 'Caso Límite (División por Cero)',
    desc: 'Denominadores en cero para probar robustez matemática',
    values: { tp: 0, fn: 0, fp: 0, tn: 0 },
  },
];

export const LabModule: React.FC<LabModuleProps> = ({
  onUnlockBadge,
  onIncrementExperiment,
  onAddXp,
}) => {
  const [matrix, setMatrix] = useState<MatrixValues>(DEFAULT_MATRIX);
  const [activeMetricModal, setActiveMetricModal] = useState<MetricResult | null>(null);
  const [showSecondaryMetrics, setShowSecondaryMetrics] = useState(false);

  const metrics = calculateAllMetrics(matrix);

  const updateCell = (cell: keyof MatrixValues, delta: number) => {
    setMatrix((prev) => {
      const newVal = Math.max(0, prev[cell] + delta);
      const next = { ...prev, [cell]: newVal };
      onIncrementExperiment();
      checkBadgeTriggers(next);
      return next;
    });
  };

  const setCellValue = (cell: keyof MatrixValues, value: string) => {
    const num = parseInt(value, 10);
    const valid = isNaN(num) ? 0 : Math.max(0, num);
    setMatrix((prev) => {
      const next = { ...prev, [cell]: valid };
      onIncrementExperiment();
      checkBadgeTriggers(next);
      return next;
    });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setMatrix(preset.values);
    onIncrementExperiment();
    onAddXp(15);
    checkBadgeTriggers(preset.values);
  };

  const checkBadgeTriggers = (m: MatrixValues) => {
    if (m.tp === 0 && m.fn === 0 && m.fp === 0 && m.tn === 0) {
      onUnlockBadge('badge-zero-division');
    }
    if (m.tp === 0 && m.fp === 0 && m.tn >= 500 && m.fn > 0) {
      onUnlockBadge('badge-accuracy-paradox');
    }
  };

  const handleReset = () => {
    setMatrix(DEFAULT_MATRIX);
  };

  // Color classes for metric values
  const getMetricBadgeColor = (val: number | null) => {
    if (val === null) return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
    if (val >= 0.85) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300';
    if (val >= 0.70) return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300';
    if (val >= 0.50) return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300';
    return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300';
  };

  // Calculate percentages for the stacked visual breakdown
  const tpPct = metrics.total > 0 ? (matrix.tp / metrics.total) * 100 : 0;
  const fnPct = metrics.total > 0 ? (matrix.fn / metrics.total) * 100 : 0;
  const fpPct = metrics.total > 0 ? (matrix.fp / metrics.total) * 100 : 0;
  const tnPct = metrics.total > 0 ? (matrix.tn / metrics.total) * 100 : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Módulo 2</span> • <span>Laboratorio Experimental</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulador de Matriz & Cálculo de Métricas
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Modifica directamente los valores de TP, FN, FP y TN. Las 11 métricas y desgloses aritméticos se recalculan al instante.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restablecer Matriz</span>
        </button>
      </div>

      {/* Presets bar */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Cargar Escenarios Didácticos Predefinidos:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-left p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                {preset.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {preset.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid: Matrix Controls + Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2x2 Matrix Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Controles de la Matriz de Confusión
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Usa los botones (+/-) o escribe directamente cualquier número entero
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">
              Total N = {metrics.total}
            </div>
          </div>

          {/* Matrix Frame */}
          <div className="space-y-3">
            {/* Column Label */}
            <div className="text-center">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Predicción del Modelo (Columnas)
              </span>
            </div>

            <div className="grid grid-cols-12 gap-2">
              {/* Row Label */}
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider -rotate-90 whitespace-nowrap">
                  Realidad (Filas)
                </span>
              </div>

              {/* Grid 2x2 with inputs */}
              <div className="col-span-10 space-y-2">
                {/* Header Labels */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-600 dark:text-slate-300">
                  <div className="py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Pred: Positivo (+)</div>
                  <div className="py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Pred: Negativo (-)</div>
                </div>

                {/* Row 1: Real Positivo */}
                <div className="grid grid-cols-2 gap-2">
                  {/* TP Control */}
                  <div className="p-3.5 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        TP (Verdadero Positivo)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        Acierto (+)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCell('tp', -5)}
                        className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold text-sm hover:bg-emerald-200 transition-colors"
                        title="Restar 5"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateCell('tp', -1)}
                        className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold text-sm hover:bg-emerald-200 transition-colors"
                        title="Restar 1"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={matrix.tp}
                        onChange={(e) => setCellValue('tp', e.target.value)}
                        className="w-full text-center font-bold text-base bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/80 rounded-lg py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => updateCell('tp', 1)}
                        className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold text-sm hover:bg-emerald-200 transition-colors"
                        title="Sumar 1"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateCell('tp', 5)}
                        className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold text-sm hover:bg-emerald-200 transition-colors"
                        title="Sumar 5"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  {/* FN Control */}
                  <div className="p-3.5 rounded-xl border-2 border-rose-500/40 bg-rose-500/5 dark:bg-rose-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                        FN (Falso Negativo)
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300">
                        Error Tipo II
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCell('fn', -5)}
                        className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold text-sm hover:bg-rose-200 transition-colors"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateCell('fn', -1)}
                        className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold text-sm hover:bg-rose-200 transition-colors"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={matrix.fn}
                        onChange={(e) => setCellValue('fn', e.target.value)}
                        className="w-full text-center font-bold text-base bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700/80 rounded-lg py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        onClick={() => updateCell('fn', 1)}
                        className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold text-sm hover:bg-rose-200 transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateCell('fn', 5)}
                        className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold text-sm hover:bg-rose-200 transition-colors"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2: Real Negativo */}
                <div className="grid grid-cols-2 gap-2">
                  {/* FP Control */}
                  <div className="p-3.5 rounded-xl border-2 border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                        FP (Falso Positivo)
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                        Error Tipo I
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCell('fp', -5)}
                        className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold text-sm hover:bg-amber-200 transition-colors"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateCell('fp', -1)}
                        className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold text-sm hover:bg-amber-200 transition-colors"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={matrix.fp}
                        onChange={(e) => setCellValue('fp', e.target.value)}
                        className="w-full text-center font-bold text-base bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/80 rounded-lg py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => updateCell('fp', 1)}
                        className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold text-sm hover:bg-amber-200 transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateCell('fp', 5)}
                        className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold text-sm hover:bg-amber-200 transition-colors"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  {/* TN Control */}
                  <div className="p-3.5 rounded-xl border-2 border-teal-500/40 bg-teal-500/5 dark:bg-teal-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">
                        TN (Verdadero Negativo)
                      </span>
                      <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300">
                        Acierto (-)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCell('tn', -5)}
                        className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-bold text-sm hover:bg-teal-200 transition-colors"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateCell('tn', -1)}
                        className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-bold text-sm hover:bg-teal-200 transition-colors"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={matrix.tn}
                        onChange={(e) => setCellValue('tn', e.target.value)}
                        className="w-full text-center font-bold text-base bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/80 rounded-lg py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        onClick={() => updateCell('tn', 1)}
                        className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-bold text-sm hover:bg-teal-200 transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateCell('tn', 5)}
                        className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-bold text-sm hover:bg-teal-200 transition-colors"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Distribution Stacked Bar */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>Distribución de Muestras ({metrics.total})</span>
              <span>Aciertos: {metrics.correct} | Errores: {metrics.errors}</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
              <div style={{ width: `${tpPct}%` }} className="bg-emerald-500 transition-all" title={`TP: ${matrix.tp} (${tpPct.toFixed(1)}%)`} />
              <div style={{ width: `${fnPct}%` }} className="bg-rose-500 transition-all" title={`FN: ${matrix.fn} (${fnPct.toFixed(1)}%)`} />
              <div style={{ width: `${fpPct}%` }} className="bg-amber-500 transition-all" title={`FP: ${matrix.fp} (${fpPct.toFixed(1)}%)`} />
              <div style={{ width: `${tnPct}%` }} className="bg-teal-500 transition-all" title={`TN: ${matrix.tn} (${tnPct.toFixed(1)}%)`} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> TP: {matrix.tp}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> FN: {matrix.fn}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> FP: {matrix.fp}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500" /> TN: {matrix.tn}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Summary Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Diagnóstico Rápido del Modelo
            </h3>

            {metrics.total === 0 ? (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200">
                  <strong className="block font-bold">Matriz Vacía (N = 0)</strong>
                  Todas las observaciones son cero. Los denominadores matemáticos resultan indeterminados (0/0). Agrega valores con los controles numéricos.
                </div>
              </div>
            ) : matrix.tp === 0 && matrix.fp === 0 && matrix.tn > 0 ? (
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="text-xs text-purple-900 dark:text-purple-200">
                  <strong className="block font-bold">¡Paradoja de la Exactitud Detectada!</strong>
                  El modelo tiene <strong>{metrics.accuracy.percentage}</strong> de exactitud, pero un Recall de <strong>0.0%</strong>. Es un clasificador trivial que predice todo como negativo sin detectar ningún caso positivo.
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Total de Aciertos</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {metrics.correct} <span className="text-slate-400 font-normal">({metrics.total > 0 ? ((metrics.correct / metrics.total) * 100).toFixed(1) : 0}%)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Total de Errores</span>
                  </div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    {metrics.errors} <span className="text-slate-400 font-normal">({metrics.total > 0 ? ((metrics.errors / metrics.total) * 100).toFixed(1) : 0}%)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Prevalencia Positiva</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {metrics.prevalence.percentage}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* METRICS DASHBOARD CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Panel de Métricas Principales de Evaluación
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Haz clic en cualquier tarjeta de métrica para ver su fórmula matemática y sustitución numérica paso a paso.
            </p>
          </div>
          <button
            onClick={() => setShowSecondaryMetrics(!showSecondaryMetrics)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{showSecondaryMetrics ? 'Ocultar tasas secundarias' : 'Ver tasas secundarias (FPR, FNR)'}</span>
            {showSecondaryMetrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary 6 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            metrics.accuracy,
            metrics.precision,
            metrics.recall,
            metrics.specificity,
            metrics.f1Score,
            metrics.errorRate,
          ].map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMetricModal(m)}
              className="text-left bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    {m.synonyms[0]}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {m.name.split('(')[0]}
                  </h4>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold ${getMetricBadgeColor(m.value)}`}>
                  {m.percentage}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {m.interpretation}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                <span className="font-mono">{m.formula}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver detalle <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Secondary Metrics Expansion */}
        {showSecondaryMetrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
            {[metrics.fpr, metrics.fnr, metrics.prevalence].map((m, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMetricModal(m)}
                className="text-left bg-slate-50 dark:bg-slate-850 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{m.name}</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{m.percentage}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">{m.formula}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* METRIC STEP-BY-STEP MODAL */}
      {activeMetricModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Desglose Matemático Paso a Paso
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeMetricModal.name}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-xl text-sm font-extrabold ${getMetricBadgeColor(activeMetricModal.value)}`}>
                {activeMetricModal.percentage}
              </span>
            </div>

            <div className="space-y-4">
              {/* Formula & Substitution */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  1. Fórmula Algebraica:
                </span>
                <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-300">
                  {activeMetricModal.formula}
                </div>

                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block pt-2">
                  2. Sustitución con tus Valores Actuales:
                </span>
                <div className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {activeMetricModal.substitution}
                </div>
              </div>

              {/* Interpretation & Business decision */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <strong className="text-slate-900 dark:text-white">¿Qué significa de forma sencilla?</strong>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{activeMetricModal.interpretation}</p>
                </div>

                <div>
                  <strong className="text-slate-900 dark:text-white">Implicación para la toma de decisiones:</strong>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{activeMetricModal.businessImpact}</p>
                </div>

                {activeMetricModal.synonyms.length > 0 && (
                  <div className="pt-2 text-xs text-slate-400 dark:text-slate-500">
                    Sinónimos habituales: {activeMetricModal.synonyms.join(', ')}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveMetricModal(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors"
            >
              Cerrar Desglose
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
