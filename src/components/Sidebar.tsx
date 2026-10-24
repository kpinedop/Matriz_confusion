import React from 'react';
import {
  BookOpen,
  FlaskConical,
  Briefcase,
  Trophy,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';

export type NavTab = 'learn' | 'lab' | 'sectors' | 'challenges' | 'glossary';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  levelTitle: string;
  levelNumber: number;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  levelTitle,
  levelNumber,
  userName,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; description: string; badge?: string }[] = [
    {
      id: 'learn',
      label: 'Aprende Desde Cero',
      icon: BookOpen,
      description: 'Fundamentos, analogías y cuadrantes 2×2',
    },
    {
      id: 'lab',
      label: 'Laboratorio Interactivo',
      icon: FlaskConical,
      description: 'Simulador en tiempo real con 11 métricas',
      badge: 'Simulador',
    },
    {
      id: 'sectors',
      label: 'Sectores Económicos',
      icon: Briefcase,
      description: 'Streaming, Salud, Fraude y Matriz de Costos',
    },
    {
      id: 'challenges',
      label: 'Retos y Desafíos',
      icon: Trophy,
      description: 'Pruebas prácticas gamificadas con XP',
      badge: 'Gamificado',
    },
    {
      id: 'glossary',
      label: 'Glosario & Fórmulas',
      icon: FileText,
      description: 'Guía de cátedra, resumen y exportación',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 md:top-[61px] left-0 h-screen md:h-[calc(100vh-61px)] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 z-50 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Mobile close button */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-white">Menú Principal</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1.5" aria-label="Navegación del curso">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl flex items-start gap-3 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate">{item.label}</span>
                      {item.badge && !isActive && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User rank footer */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-blue-950/20 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Rango Académico
              </span>
            </div>
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300 truncate">
              {levelTitle}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Nivel {levelNumber} • {userName}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
