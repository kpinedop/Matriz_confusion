import React from 'react';
import { Award, Printer, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
  xp: number;
  levelTitle: string;
  badgesCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
  xp,
  levelTitle,
  badgesCount,
}) => {
  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const certificateId = `ML-UCH-${Math.abs(xp * 37 + 1042).toString(16).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto animate-scaleUp">
        {/* Header & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 no-print">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Acreditación Académica
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Certificado Oficial de Aprendizaje
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name input */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 no-print">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Nombre del Estudiante para el Certificado:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => onUpdateUserName(e.target.value)}
            placeholder="Ingresa tu nombre y apellido..."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* THE PRINTABLE CERTIFICATE CARD */}
        <div className="print-full relative overflow-hidden rounded-2xl border-8 border-double border-amber-600/30 bg-radial from-amber-50/40 via-white to-amber-100/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-8 sm:p-12 text-center shadow-lg space-y-6">
          {/* Subtle watermarks */}
          <div className="absolute top-4 left-4 text-xs font-bold font-mono text-amber-700/40 uppercase tracking-widest">
            UCH • MACHINE LEARNING LAB
          </div>
          <div className="absolute top-4 right-4 text-xs font-mono text-amber-700/40">
            ID: {certificateId}
          </div>

          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-white shadow-xl shadow-amber-500/30">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Certificado de Aprobación & Dominio Práctico
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Matriz de Confusión & Evaluación ML
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Cátedra Universitaria de Machine Learning • Referencia Prof. Hugo Martínez (UCH)
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
              Se otorga la presente constancia de excelencia y rigor metodológico a:
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 font-serif border-b-2 border-amber-500/40 pb-2 inline-block px-8">
              {userName || 'Estudiante Destacado'}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Por haber completado con éxito la exploración conceptual, el laboratorio experimental de 11 métricas, el análisis de costos asimétricos de negocio y los desafíos prácticos de evaluación de clasificadores.
          </p>

          {/* Stats Badges inside Certificate */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              ⚡ {xp} Puntos de Experiencia
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
              🎓 Rango: {levelTitle}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              🏅 {badgesCount} Insignias de Cátedra
            </span>
          </div>

          {/* Signature & Date */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="space-y-1">
              <div className="font-serif italic text-sm text-slate-800 dark:text-slate-200 font-bold">
                Prof. Hugo Martínez
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Cátedra Machine Learning UCH
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {today}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Fecha de Emisión Oficial
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
