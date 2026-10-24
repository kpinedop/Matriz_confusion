import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Search,
  BookOpen,
  GraduationCap,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { METRIC_SUMMARY_ITEMS, ACADEMIC_NOTES } from '../data/glossary';

export const GlossaryModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const filteredMetrics = METRIC_SUMMARY_ITEMS.filter(
    (m) =>
      m.nameEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.synonyms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-800 via-cyan-900 to-slate-900 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Módulo 5</span> • <span>Guía de Referencia Rápida</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Glosario, Fórmulas & Ficha Técnica de Cátedra
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-3xl mt-1">
              Tabla comparativa de todas las métricas de evaluación, sinónimos en español e inglés, y aclaraciones pedagógicas del material universitario (Prof. Hugo Martínez, UCH).
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-teal-950 font-bold text-xs sm:text-sm shadow-md hover:bg-teal-50 transition-all no-print"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha Técnica</span>
          </button>
        </div>
      </div>

      {/* Academic University Notes Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {ACADEMIC_NOTES.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {ACADEMIC_NOTES.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {ACADEMIC_NOTES.points.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5"
            >
              <h3 className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
                {pt.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {pt.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Cheat Sheet Table & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Tabla Comparativa de Métricas de Evaluación
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulta cuándo utilizar cada métrica y cuál es su trampa común en la práctica.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64 no-print">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar métrica o fórmula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Table of metrics */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5 whitespace-nowrap">Métrica</th>
                <th className="p-3.5 whitespace-nowrap">Fórmula</th>
                <th className="p-3.5 whitespace-nowrap">¿Qué pregunta responde?</th>
                <th className="p-3.5 whitespace-nowrap">¿Cuándo usarla?</th>
                <th className="p-3.5 whitespace-nowrap">Riesgo o Trampa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMetrics.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{item.nameEs}</div>
                    <div className="text-[11px] font-normal text-slate-400">{item.nameEn}</div>
                    <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">
                      {item.synonyms.join(' • ')}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-blue-600 dark:text-blue-300 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{item.formula}</span>
                      <button
                        onClick={() => handleCopyFormula(item.formula)}
                        className="text-slate-400 hover:text-blue-500 p-1 no-print"
                        title="Copiar fórmula"
                      >
                        {copiedFormula === item.formula ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300">
                    {item.questionAnswered}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    {item.whenToUse}
                  </td>
                  <td className="p-3.5 text-rose-600 dark:text-rose-400">
                    {item.pitfall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
