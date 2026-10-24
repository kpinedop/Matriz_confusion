import React from 'react';
import { Moon, Sun, Award, Zap, Menu, GraduationCap } from 'lucide-react';
import { Badge } from '../types';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  xp: number;
  levelInfo: { level: number; title: string; currentLevelXp: number; nextLevelXp: number };
  badges: Badge[];
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  xp,
  levelInfo,
  badges,
  onOpenBadges,
  onOpenCertificate,
  onToggleMobileSidebar,
}) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      ((xp - levelInfo.currentLevelXp) / (levelInfo.nextLevelXp - levelInfo.currentLevelXp)) * 100
    )
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-extrabold text-base tracking-wider">M2</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  Matriz<span className="text-blue-600 dark:text-blue-400">Lab</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <GraduationCap className="w-3 h-3" /> Cátedra ML UCH
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Laboratorio Interactivo de Matriz de Confusión
              </p>
            </div>
          </div>
        </div>

        {/* Right: Gamification HUD & Actions */}
        <div className="flex items-center gap-3">
          {/* XP & Level Widget */}
          <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{xp} XP</span>
            </div>
            <div className="hidden lg:flex flex-col w-24">
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                <span>Nivel {levelInfo.level}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Badges Button */}
          <button
            onClick={onOpenBadges}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
            title="Ver medallas e insignias"
          >
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Insignias:</span>
            <span className="font-bold">{unlockedCount}/{badges.length}</span>
          </button>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
            title="Certificado de Aprobación"
          >
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Certificado</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
