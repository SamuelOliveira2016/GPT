import React, { useState, useMemo } from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  Turma,
  Subturma,
  MatrizUC,
} from '../data/senaiData';
import {
  detectConflicts,
  ConflitoAlocacao,
} from '../utils/academicEngine';
import {
  SlidersHorizontal,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Wand2,
  RotateCcw,
  Download,
  School,
  Users,
  Clock,
  Layers,
} from 'lucide-react';

interface AdjustmentsTabProps {
  alocacoes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  turmas: Turma[];
  subturmas: Subturma[];
  ucs: MatrizUC[];
  onEditAllocation: (aloc: AlocacaoAula) => void;
  onNewAllocation: () => void;
  onDeleteAllocation: (id: string) => void;
  onOptimize: () => void;
  onReset: () => void;
  onOpenConflicts: () => void;
}

export const AdjustmentsTab: React.FC<AdjustmentsTabProps> = ({
  alocacoes,
  ambientes,
  docentes,
  turmas,
  subturmas,
  ucs,
  onEditAllocation,
  onNewAllocation,
  onDeleteAllocation,
  onOptimize,
  onReset,
  onOpenConflicts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTurno, setFilterTurno] = useState('TODOS');
  const [filterDia, setFilterDia] = useState('TODOS');
  const [filterStatus, setFilterStatus] = useState<'TODOS' | 'CONFLITO' | 'REGULAR'>('TODOS');

  const conflitos = useMemo(() => detectConflicts(alocacoes, ambientes), [alocacoes, ambientes]);
  const conflictIds = useMemo(
    () => new Set(conflitos.flatMap((c) => c.alocacoesEnvolvidas)),
    [conflitos]
  );

  // Filtered list
  const filteredList = useMemo(() => {
    return alocacoes.filter((a) => {
      if (filterTurno !== 'TODOS' && a.turno !== filterTurno) return false;
      if (filterDia !== 'TODOS' && a.diaSemana !== filterDia) return false;

      const hasConflict = conflictIds.has(a.id);
      if (filterStatus === 'CONFLITO' && !hasConflict) return false;
      if (filterStatus === 'REGULAR' && hasConflict) return false;

      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const text = `${a.idSubturma} ${a.curso} ${a.uc} ${a.ambienteNome} ${a.docenteNome} ${a.bloco}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [alocacoes, filterTurno, filterDia, filterStatus, searchTerm, conflictIds]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Action Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Gestor de Ensalamento
            </span>
            <span className="text-xs text-slate-400 font-mono">Ajustes & Remanejamento em Tempo Real</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Grade Operacional de Aulas ({alocacoes.length} Alocações)
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {conflitos.length > 0 && (
            <button
              onClick={onOpenConflicts}
              className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{conflitos.length} Conflitos</span>
            </button>
          )}

          <button
            onClick={onOptimize}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition"
          >
            <Wand2 className="w-4 h-4" />
            <span>Otimizar Automaticamente</span>
          </button>

          <button
            onClick={onNewAllocation}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Alocação</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por turma, curso, professor, ambiente ou UC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-8 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status filter */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setFilterStatus('TODOS')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterStatus === 'TODOS' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({alocacoes.length})
            </button>
            <button
              onClick={() => setFilterStatus('CONFLITO')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterStatus === 'CONFLITO' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              Conflitos ({conflictIds.size})
            </button>
            <button
              onClick={() => setFilterStatus('REGULAR')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterStatus === 'REGULAR' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Regulares
            </button>
          </div>

          {/* Turno */}
          <select
            value={filterTurno}
            onChange={(e) => setFilterTurno(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="TODOS">Todos os Turnos</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
          </select>

          {/* Dia */}
          <select
            value={filterDia}
            onChange={(e) => setFilterDia(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="TODOS">Todos os Dias</option>
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-300 font-semibold">
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5">Dia & Turno</th>
                <th className="py-3 px-3.5">Subturma / Turma</th>
                <th className="py-3 px-3.5">Unidade Curricular (UC)</th>
                <th className="py-3 px-3.5">Ambiente Alocado</th>
                <th className="py-3 px-3.5">Docente Responsável</th>
                <th className="py-3 px-3.5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Nenhuma alocação encontrada para os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredList.map((aloc) => {
                  const hasConflict = conflictIds.has(aloc.id);
                  const isCapExceeded = aloc.alunos > aloc.capacidadeAmbiente && aloc.capacidadeAmbiente > 0;

                  return (
                    <tr
                      key={aloc.id}
                      className={`hover:bg-slate-700/30 transition-colors ${
                        hasConflict ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      {/* Status Badge */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {hasConflict ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            Conflito
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Regular
                          </span>
                        )}
                      </td>

                      {/* Dia & Turno */}
                      <td className="py-3 px-3.5 whitespace-nowrap font-mono">
                        <span className="font-bold text-white block">{aloc.diaSemana}</span>
                        <span className="text-slate-400 text-[11px]">{aloc.turno} ({aloc.horario})</span>
                      </td>

                      {/* Subturma & Curso */}
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-red-400">{aloc.idSubturma}</div>
                        <div className="text-slate-400 text-[11px] truncate max-w-[180px]">{aloc.curso}</div>
                      </td>

                      {/* UC */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-white truncate max-w-[200px]" title={aloc.uc}>
                          {aloc.uc}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          CH: {aloc.cargaHorariaUC}h
                        </div>
                      </td>

                      {/* Ambiente */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-200 flex items-center gap-1">
                          <School className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{aloc.ambienteNome}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {aloc.bloco} • Postos: {aloc.alunos}/{aloc.capacidadeAmbiente}
                          {isCapExceeded && (
                            <span className="text-rose-400 font-bold ml-1">(Capacidade excedida)</span>
                          )}
                        </div>
                      </td>

                      {/* Docente */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-200 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{aloc.docenteNome}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          NIF {aloc.docenteNif}
                        </div>
                      </td>

                      {/* Ações */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onEditAllocation(aloc)}
                            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-white transition"
                            title="Editar Alocação (trocar docente/ambiente)"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                          </button>
                          <button
                            onClick={() => onDeleteAllocation(aloc.id)}
                            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition"
                            title="Excluir Alocação"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
