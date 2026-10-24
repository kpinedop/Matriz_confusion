import React from 'react';
import { Award, X, CheckCircle, Lock, Compass, FlaskConical, ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import { Badge } from '../types';

interface BadgesModalProps {
  badges: Badge[];
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ badges, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-blue-500" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-emerald-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-teal-500" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Galería de Insignias y Logros
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Has desbloqueado {unlockedCount} de {badges.length} medallas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.unlocked
                  ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/60 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div
                className={`p-3 rounded-2xl shrink-0 ${
                  badge.unlocked
                    ? 'bg-white dark:bg-slate-800 shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              >
                {badge.unlocked ? (
                  getBadgeIcon(badge.icon)
                ) : (
                  <Lock className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {badge.title}
                  </h3>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Ganada
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">Bloqueada</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-md shadow-purple-600/30"
        >
          Volver al Laboratorio
        </button>
      </div>
    </div>
  );
};
