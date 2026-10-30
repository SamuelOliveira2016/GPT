import React from 'react';
import {
  Calendar,
  Grid,
  BarChart3,
  SlidersHorizontal,
  FileSpreadsheet,
  Package,
  AlertTriangle,
  CheckCircle2,
  Wand2,
  RotateCcw,
  Download,
  School,
  GraduationCap,
  Users,
  Clock,
  Cpu,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'docentes' | 'heatmap' | 'calendar' | 'adjustments' | 'inventory' | 'reports' | 'motor';
  setActiveTab: (tab: 'dashboard' | 'docentes' | 'heatmap' | 'calendar' | 'adjustments' | 'inventory' | 'reports' | 'motor') => void;
  totalConflitos: number;
  onOpenConflicts: () => void;
  onOptimize: () => void;
  onReset: () => void;
  onExport: () => void;
  taxaMediaAmbientes: number;
  docentesAtivos: number;
  totalHorasSemana: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalConflitos,
  onOpenConflicts,
  onOptimize,
  onReset,
  onExport,
  taxaMediaAmbientes,
  docentesAtivos,
  totalHorasSemana,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur bg-opacity-95">
      {/* Top Banner / SENAI Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 tracking-tight">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                CFP 901 Araçatuba
              </span>
              <span className="text-xs text-slate-400 font-mono">1º Semestre 2027 • 100 Dias Letivos</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              OcupaDocente & Gestão de Espaços
            </h1>
          </div>
        </div>

        {/* Global Quick KPIs */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="hidden md:flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <School className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ocupação Ambientes:</span>
              <strong className="text-white font-mono">{taxaMediaAmbientes}%</strong>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Docentes Ativos:</span>
              <strong className="text-white font-mono">{docentesAtivos}</strong>
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Carga Semanal:</span>
              <strong className="text-white font-mono">{totalHorasSemana}h</strong>
            </div>
          </div>

          {/* Conflict Badge Button */}
          {totalConflitos > 0 ? (
            <button
              onClick={onOpenConflicts}
              className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors animate-pulse"
              title="Clique para ver e resolver conflitos"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{totalConflitos} Conflito{totalConflitos > 1 ? 's' : ''}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">0 Conflitos Operacionais</span>
            </div>
          )}

          {/* Quick Actions */}
          <button
            onClick={onOptimize}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
            title="Abrir o motor Python OR-Tools (não executa heurística legada)"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Motor CP-SAT</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs transition-colors border border-slate-700"
            title="Restaurar padrão inicial SENAI"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Restaurar</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar border-t border-slate-800/80">
        <nav className="flex space-x-1 sm:space-x-3 py-2">
          <button onClick={() => setActiveTab('motor')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'motor' ? 'bg-red-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}>
            <Cpu className="w-4 h-4" /> <span>Motor OR-Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Indicadores & Painel</span>
          </button>

          <button
            onClick={() => setActiveTab('docentes')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'docentes'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Docentes & Habilidades</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'heatmap'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Mapas de Calor</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendário Completo</span>
          </button>

          <button
            onClick={() => setActiveTab('adjustments')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'adjustments'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Ajustes Dinâmicos</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventário de Bens</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Relatórios & Otimização</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
