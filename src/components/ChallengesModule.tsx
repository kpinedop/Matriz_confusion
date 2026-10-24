import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Award,
} from 'lucide-react';
import { CHALLENGES } from '../data/challenges';
import { Challenge } from '../types';

interface ChallengesModuleProps {
  completedChallenges: string[];
  onCompleteChallenge: (challengeId: string, rewardXp: number) => void;
  onOpenCertificate: () => void;
  xp: number;
}

export const ChallengesModule: React.FC<ChallengesModuleProps> = ({
  completedChallenges,
  onCompleteChallenge,
  onOpenCertificate,
  xp,
}) => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const challenge: Challenge = CHALLENGES[activeChallengeIndex];
  const isCompleted = completedChallenges.includes(challenge.id);
  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setHasSubmitted(true);
    if (selectedOption?.isCorrect) {
      onCompleteChallenge(challenge.id, challenge.xpReward);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowHint(false);
    if (activeChallengeIndex < CHALLENGES.length - 1) {
      setActiveChallengeIndex((prev) => prev + 1);
    }
  };

  const handleResetChallenge = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowHint(false);
  };

  const completedCount = completedChallenges.length;

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Módulo 4</span> • <span>Desafíos & Evaluación Gamificada</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Retos Prácticos & Certificación
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 max-w-2xl mt-1">
              Pon a prueba tus habilidades resolviendo casos reales. Cada respuesta correcta te otorga XP, desbloquea insignias y te permite emitir tu Certificado de Dominio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <div className="text-2xl font-extrabold">{completedCount}/{CHALLENGES.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Superados</div>
            </div>
            {completedCount >= 3 && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white text-amber-900 font-bold text-xs sm:text-sm shadow-lg hover:bg-orange-50 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <span>Ver Mi Certificado</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Challenge Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CHALLENGES.map((ch, idx) => {
          const isDone = completedChallenges.includes(ch.id);
          const isCurrent = activeChallengeIndex === idx;
          return (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChallengeIndex(idx);
                setSelectedOptionId(null);
                setHasSubmitted(false);
                setShowHint(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-500/40'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isCurrent ? 'bg-white text-amber-700' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  {idx + 1}
                </span>
              )}
              <span>{ch.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Challenge Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Header of Challenge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                Nivel {challenge.level}
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {challenge.scenario}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {challenge.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/60">
            <Sparkles className="w-4 h-4" />
            <span>+{challenge.xpReward} XP por acierto</span>
          </div>
        </div>

        {/* Story & Context */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
          {challenge.story}
        </div>

        {/* Question */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {challenge.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {challenge.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400';

            if (hasSubmitted) {
              if (option.isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200';
              } else if (isSelected && !option.isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
              }
            } else if (isSelected) {
              optionStyle = 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-2 ring-amber-500/30';
            }

            return (
              <button
                key={option.id}
                disabled={hasSubmitted}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <div className="mt-0.5 shrink-0">
                  {hasSubmitted && option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : hasSubmitted && isSelected && !option.isCorrect ? (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-semibold">{option.text}</span>
                  {hasSubmitted && (
                    <p className={`text-xs mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 leading-relaxed ${
                      option.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}>
                      {option.explanation}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint Disclosure */}
        {challenge.hint && (
          <div className="text-xs">
            {showHint ? (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Pista pedagógica:</strong> {challenge.hint}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>¿Necesitas una pista?</span>
              </button>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleResetChallenge}
            disabled={!hasSubmitted}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reintentar</span>
          </button>

          {!hasSubmitted ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/30 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Comprobar Respuesta
            </button>
          ) : activeChallengeIndex < CHALLENGES.length - 1 ? (
            <button
              onClick={handleNextChallenge}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all"
            >
              <span>Siguiente Desafío</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>¡Obtener Certificado de Dominio!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
