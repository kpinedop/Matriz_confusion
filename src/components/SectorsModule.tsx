import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Tv,
  HeartPulse,
  CreditCard,
  MailCheck,
  Building2,
  Scale,
  Sparkles,
} from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { calculateAllMetrics, calculateBusinessImpact } from '../utils/metrics';

interface SectorsModuleProps {
  onUnlockBadge: (badgeId: string) => void;
  onAddXp: (amount: number) => void;
}

export const SectorsModule: React.FC<SectorsModuleProps> = ({
  onUnlockBadge,
  onAddXp,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCENARIOS[0].id);
  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  // Configurable cost parameters for the current scenario
  const [costFp, setCostFp] = useState(activeScenario.defaultCostFP);
  const [costFn, setCostFn] = useState(activeScenario.defaultCostFN);
  const [benefitTp, setBenefitTp] = useState(activeScenario.defaultBenefitTP);

  // Sync when scenario changes
  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    const target = SCENARIOS.find((s) => s.id === id);
    if (target) {
      setCostFp(target.defaultCostFP);
      setCostFn(target.defaultCostFN);
      setBenefitTp(target.defaultBenefitTP);
    }
  };

  const metrics = calculateAllMetrics(activeScenario.preset);
  const impact = calculateBusinessImpact(activeScenario.preset, costFp, costFn, benefitTp);

  const handleSimulate = () => {
    onUnlockBadge('badge-financial-strategist');
    onAddXp(25);
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'streaming-churn':
        return <Tv className="w-5 h-5 text-purple-500" />;
      case 'health-cancer':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'banking-fraud':
        return <CreditCard className="w-5 h-5 text-amber-500" />;
      case 'cybersecurity-spam':
        return <MailCheck className="w-5 h-5 text-blue-500" />;
      case 'credit-risk':
        return <Building2 className="w-5 h-5 text-teal-500" />;
      default:
        return <Briefcase className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-purple-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Módulo 3</span> • <span>Aplicación Empresarial & ROI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Explorador de Sectores Económicos & Matriz de Costos
        </h1>
        <p className="text-xs sm:text-sm text-purple-100 max-w-3xl mt-1">
          En la vida real, los errores no cuestan lo mismo. Descubre cómo las plataformas de streaming, hospitales y bancos toman decisiones financieras calibrando el costo de Falsos Positivos vs Falsos Negativos.
        </p>
      </div>

      {/* Industry Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeScenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {getScenarioIcon(scenario.id)}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {scenario.badge}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold line-clamp-1">{scenario.title.split(':')[0]}</h3>
              <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {scenario.category}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Sector Analysis & Cost Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Sector Story & Confusion Matrix (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Caso Real de Negocio
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeScenario.title}
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {activeScenario.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeScenario.description}
            </p>

            {/* Target definitions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Clase Positiva (+):</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{activeScenario.positiveClass}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400 block">Clase Negativa (-):</span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5 block">{activeScenario.negativeClass}</span>
              </div>
            </div>

            {/* Sector Matrix Snapshot */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Matriz de Prueba del Sector (N = {metrics.total}):
              </span>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-extrabold text-emerald-700 dark:text-emerald-300 text-lg">{activeScenario.preset.tp}</div>
                  <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">Verdaderos Positivos (TP)</div>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                  <div className="font-extrabold text-rose-700 dark:text-rose-300 text-lg">{activeScenario.preset.fn}</div>
                  <div className="text-[11px] font-semibold text-rose-800 dark:text-rose-400">Falsos Negativos (FN)</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <div className="font-extrabold text-amber-700 dark:text-amber-300 text-lg">{activeScenario.preset.fp}</div>
                  <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-400">Falsos Positivos (FP)</div>
                </div>
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
                  <div className="font-extrabold text-teal-700 dark:text-teal-300 text-lg">{activeScenario.preset.tn}</div>
                  <div className="text-[11px] font-semibold text-teal-800 dark:text-teal-400">Verdaderos Negativos (TN)</div>
                </div>
              </div>
            </div>

            {/* Error Asymmetry Explanations */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs">
                <strong className="text-amber-800 dark:text-amber-300 block font-bold">Consecuencia del Falso Positivo (FP):</strong>
                <p className="text-amber-900 dark:text-amber-200 mt-0.5">{activeScenario.fpExplanation}</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-xs">
                <strong className="text-rose-800 dark:text-rose-300 block font-bold">Consecuencia del Falso Negativo (FN):</strong>
                <p className="text-rose-900 dark:text-rose-200 mt-0.5">{activeScenario.fnExplanation}</p>
              </div>
            </div>

            {/* Teacher note */}
            {activeScenario.teacherNote && (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-start gap-2.5 text-xs">
                <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-900 dark:text-blue-200 block font-bold">Nota de Cátedra UCH:</strong>
                  <span className="text-blue-800 dark:text-blue-300">{activeScenario.teacherNote}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Financial Cost Calculator & Net ROI (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Simulador de Costos y Balance Financiero
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                Moneda: {activeScenario.currency}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ajusta los costos unitarios para evaluar si la implementación del modelo de Machine Learning es rentable para el negocio.
            </p>

            {/* Inputs sliders */}
            <div className="space-y-4">
              {/* Cost FP */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-600 dark:text-amber-400">Costo unitario por Falsa Alarma (FP):</span>
                  <span className="text-slate-900 dark:text-white font-mono">${costFp.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="5"
                  value={costFp}
                  onChange={(e) => {
                    setCostFp(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">
                  Total pérdidas por FP: {activeScenario.preset.fp} × ${costFp} = <strong>${(activeScenario.preset.fp * costFp).toLocaleString()}</strong>
                </span>
              </div>

              {/* Cost FN */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-rose-600 dark:text-rose-400">Costo unitario por Caso Omitido (FN):</span>
                  <span className="text-slate-900 dark:text-white font-mono">${costFn.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="100"
                  value={costFn}
                  onChange={(e) => {
                    setCostFn(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full accent-rose-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">
                  Total pérdidas por FN: {activeScenario.preset.fn} × ${costFn} = <strong>${(activeScenario.preset.fn * costFn).toLocaleString()}</strong>
                </span>
              </div>

              {/* Benefit TP */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">Beneficio unitario por Acierto Detectado (TP):</span>
                  <span className="text-slate-900 dark:text-white font-mono">${benefitTp.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="50"
                  value={benefitTp}
                  onChange={(e) => {
                    setBenefitTp(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">
                  Total ingresos por TP: {activeScenario.preset.tp} × ${benefitTp} = <strong>${(activeScenario.preset.tp * benefitTp).toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* Financial Result Summary Box */}
            <div
              className={`p-5 rounded-2xl border ${
                impact.netFinancialBalance >= 0
                  ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-slate-900/20 border-emerald-500/40'
                  : 'bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-slate-900/20 border-rose-500/40'
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Balance Financiero Neto del Modelo:
                </span>
                <span
                  className={`text-lg sm:text-xl font-extrabold font-mono ${
                    impact.netFinancialBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {impact.netFinancialBalance >= 0 ? '+' : ''}${impact.netFinancialBalance.toLocaleString()} {activeScenario.currency}
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {impact.summaryText}
              </p>
            </div>

            {/* Recommended Metric Verdict */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Métrica Técnica Recomendada para Optimizar:
                </span>
              </div>
              <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                {activeScenario.recommendedMetric === 'recall'
                  ? 'Sensibilidad / Recall (Maximizar TPR)'
                  : activeScenario.recommendedMetric === 'precision'
                  ? 'Precisión / PPV (Minimizar FPR)'
                  : 'F1-Score Balanceado'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {activeScenario.recommendationReason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
