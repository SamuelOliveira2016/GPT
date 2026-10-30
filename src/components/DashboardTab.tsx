import React from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  MatrizUC,
} from '../data/senaiData';
import {
  calculateEnvironmentOccupancy,
  calculateDocenteOccupancy,
  calculateExecutiveKPIs,
} from '../utils/academicEngine';
import {
  School,
  Users,
  Clock,
  Layers,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Wrench,
  BookOpen,
} from 'lucide-react';

interface DashboardTabProps {
  alocacoes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  ucs: MatrizUC[];
  onNavigateTab: (tab: 'heatmap' | 'calendar' | 'adjustments' | 'reports', filter?: any) => void;
  onOpenConflicts: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  alocacoes,
  ambientes,
  docentes,
  ucs,
  onNavigateTab,
  onOpenConflicts,
}) => {
  const kpis = calculateExecutiveKPIs(alocacoes, ambientes, docentes);
  const envStats = calculateEnvironmentOccupancy(alocacoes, ambientes);
  const docStats = calculateDocenteOccupancy(alocacoes, docentes);

  // Group by Bloco
  const blocosMap: { [bloco: string]: { total: number; occupiedSlots: number; ambientesCount: number } } = {};
  for (const stat of envStats) {
    const b = stat.bloco;
    if (!blocosMap[b]) {
      blocosMap[b] = { total: 0, occupiedSlots: 0, ambientesCount: 0 };
    }
    blocosMap[b].total += 10; // 10 slots
    blocosMap[b].occupiedSlots += stat.totalAulasSemana;
    blocosMap[b].ambientesCount += 1;
  }

  // Group by Room Category
  const categoryStats = {
    oficinas: { nome: 'Oficinas Técnicas (Metalmecânica, Eletro, Auto)', count: 0, occupied: 0, capacity: 0 },
    labsTI: { nome: 'Laboratórios de Informática / TI', count: 0, occupied: 0, capacity: 0 },
    labsEspec: { nome: 'Laboratórios Especializados (CLP, Eletro, Metrologia)', count: 0, occupied: 0, capacity: 0 },
    salasAula: { nome: 'Salas de Aula Gerais e Desenho', count: 0, occupied: 0, capacity: 0 },
  };

  for (const s of envStats) {
    const name = s.nome.toLowerCase();
    let cat = categoryStats.salasAula;
    if (name.includes('oficina')) {
      cat = categoryStats.oficinas;
    } else if (name.includes('informática') || name.includes('ti') || name.includes('cad')) {
      cat = categoryStats.labsTI;
    } else if (name.includes('lab.')) {
      cat = categoryStats.labsEspec;
    }
    cat.count++;
    cat.occupied += s.totalAulasSemana;
    cat.capacity += 10;
  }

  // Top occupied rooms
  const sortedEnv = [...envStats].sort((a, b) => b.taxaOcupacaoPercent - a.taxaOcupacaoPercent);
  const topOccupiedEnv = sortedEnv.slice(0, 5);
  const idleEnv = sortedEnv.filter((e) => e.taxaOcupacaoPercent <= 30);

  // Docentes com maior e menor carga regular
  const regularDocStats = docStats.filter((d) => d.elegivelRegular);
  const sortedDoc = [...regularDocStats].sort((a, b) => b.horasSemana - a.horasSemana);
  const topLoadedDocs = sortedDoc.slice(0, 6);
  const availableDocs = sortedDoc.filter((d) => d.horasSemana < 20);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Alert if conflicts exist */}
      {kpis.totalConflitos > 0 && (
        <div className="bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-slate-900 border border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl shadow-rose-950/20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">
                {kpis.totalConflitos} Alertas de Ocupação & Conflito Detectados
              </h3>
              <p className="text-rose-200/80 text-xs sm:text-sm">
                Existem salas com alocações sobrepostas ou docentes com choque de horário que precisam de intervenção.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenConflicts}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-rose-600/30 flex items-center gap-2"
          >
            <span>Examinar & Resolver</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Taxa Ocupação Ambientes */}
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ocupação de Ambientes
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <School className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.taxaMediaAmbientes}%
            </span>
            <span className="text-xs text-emerald-400 font-medium">Capacidade Média</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${kpis.taxaMediaAmbientes}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>24 Ambientes Oficiais</span>
            <button
              onClick={() => onNavigateTab('heatmap')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              Ver Mapa <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Docentes Regulares */}
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Docentes em Atividade
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.docentesAtivosCount}
            </span>
            <span className="text-xs text-slate-400">de {kpis.totalDocentesCadastrados} cadastrados</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((kpis.docentesAtivosCount / kpis.totalDocentesCadastrados) * 100)}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Média {kpis.mediaHorasDocentesAtivos}h/semana</span>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Cargas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Carga Horária e Aulas */}
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Volume Semanal de Ensino
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {kpis.totalHorasSemana}h
            </span>
            <span className="text-xs text-amber-400 font-medium">{kpis.totalAulasSemana} blocos/sem</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-2 rounded-full w-full" />
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>34 Subturmas Operacionais</span>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Calendário <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Otimização & Conflitos */}
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Conformidade Acadêmica
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              kpis.totalConflitos === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {kpis.totalConflitos === 0 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight font-mono ${
              kpis.totalConflitos === 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {kpis.totalConflitos === 0 ? '100%' : `${Math.max(0, 100 - kpis.totalConflitos * 4)}%`}
            </span>
            <span className="text-xs text-slate-400">
              {kpis.totalConflitos === 0 ? 'Ensalamento Estável' : `${kpis.totalConflitos} Conflitos`}
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                kpis.totalConflitos === 0 ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-3/4'
              }`}
            />
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>{kpis.ambientesOciosos} Ambientes Ociosos</span>
            <button
              onClick={() => onNavigateTab('adjustments')}
              className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
            >
              Ajustar <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Ocupação por Bloco & Categorias de Ambiente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 & 2: Ocupação por Bloco e Tipo de Ambiente */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Ocupação por Bloco Físico */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  Taxa de Ocupação por Bloco Físico
                </h3>
                <p className="text-xs text-slate-400">
                  Capacidade utilizada baseada em slots semanais por pavilhão da unidade Araçatuba
                </p>
              </div>
              <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full font-mono">
                {envStats.length} Ambientes
              </span>
            </div>

            <div className="space-y-3.5">
              {Object.entries(blocosMap).map(([bloco, bData]) => {
                const percent = Math.min(100, Math.round((bData.occupiedSlots / bData.total) * 100));
                let colorClass = 'from-emerald-500 to-teal-400';
                if (percent > 85) colorClass = 'from-rose-500 to-red-600';
                else if (percent > 65) colorClass = 'from-amber-500 to-yellow-400';
                else if (percent > 40) colorClass = 'from-blue-500 to-cyan-400';

                return (
                  <div key={bloco} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{bloco}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-400">
                          {bData.occupiedSlots * 4}h ocupadas ({bData.ambientesCount} salas)
                        </span>
                        <strong className="text-white font-bold">{percent}%</strong>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-700/50">
                      <div
                        className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card: Ocupação por Tipo de Espaço */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Distribuição por Tipologia de Ambiente
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(categoryStats).map(([key, cat]) => {
                const percent = cat.capacity > 0 ? Math.round((cat.occupied / cat.capacity) * 100) : 0;
                return (
                  <div
                    key={key}
                    className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{cat.count} Ambientes</span>
                        <span className="font-mono text-cyan-400 font-bold">{percent}%</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200 leading-snug">{cat.nome}</h4>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-slate-400 flex justify-between font-mono">
                        <span>{cat.occupied * 4}h em uso</span>
                        <span>{cat.capacity * 4 - cat.occupied * 4}h ociosas</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Coluna 3: Destaques de Docentes e Ambientes Críticos */}
        <div className="space-y-6">
          {/* Card: Monitoramento de Carga Docente */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                Carga Docente Regular
              </h3>
              <span className="text-xs text-slate-400">Meta: 40h/sem</span>
            </div>

            <div className="space-y-3">
              {topLoadedDocs.map((doc) => {
                const isOverload = doc.horasSemana > 40;
                const isBalanced = doc.horasSemana >= 20 && doc.horasSemana <= 40;

                return (
                  <div
                    key={doc.docenteId}
                    className="p-3 bg-slate-900/50 border border-slate-700/40 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-sm text-white font-semibold">{doc.nomeCurto}</strong>
                        {isOverload && (
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded font-mono">
                            Sobrecarga
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {doc.totalAulasSemana} aulas • {doc.turmasDistintas.length} turmas
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <strong className={`text-sm ${isOverload ? 'text-rose-400' : isBalanced ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {doc.horasSemana}h
                      </strong>
                      <div className="text-[10px] text-slate-500">{doc.taxaCargaPercent}% carga</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs">
              <span className="text-slate-400">{availableDocs.length} docentes com carga &lt;20h</span>
              <button
                onClick={() => onNavigateTab('reports')}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                Ver Relatório Completo <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card: Ambientes com Maior Demanda */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <School className="w-4 h-4 text-emerald-400" />
              Ambientes de Alta Utilização
            </h3>

            <div className="space-y-2.5">
              {topOccupiedEnv.map((amb) => (
                <div
                  key={amb.ambienteId}
                  className="p-2.5 bg-slate-900/50 border border-slate-700/40 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <span className="font-semibold text-slate-200 block truncate">{amb.nome}</span>
                    <span className="text-slate-500">{amb.bloco} • Cap {amb.capacidade}</span>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <span className="font-bold text-emerald-400">{amb.taxaOcupacaoPercent}%</span>
                    <div className="text-[10px] text-slate-400">{amb.horasSemana}h/sem</div>
                  </div>
                </div>
              ))}
            </div>

            {idleEnv.length > 0 && (
              <div className="mt-4 p-3 bg-slate-900/80 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                <strong className="block text-amber-200 mb-1">Oportunidade de Otimização:</strong>
                {idleEnv.length} ambientes estão operando com &le;30% de ocupação. Ideal para realocação ou novas turmas FIC.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
