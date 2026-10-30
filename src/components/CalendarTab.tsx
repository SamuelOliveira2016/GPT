import React, { useState, useMemo } from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  DiaCalendario,
  Turma,
  Subturma,
  DIAS_SEMANA,
  TURNOS,
} from '../data/senaiData';
import {
  filterAllocations,
  CalendarFilters,
  detectConflicts,
} from '../utils/academicEngine';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  School,
  Users,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Layers,
  BookOpen,
} from 'lucide-react';

interface CalendarTabProps {
  alocacoes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  calendario: DiaCalendario[];
  turmas: Turma[];
  subturmas: Subturma[];
  onSelectAllocation: (aloc: AlocacaoAula) => void;
  initialFilters?: CalendarFilters;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  alocacoes,
  ambientes,
  docentes,
  calendario,
  turmas,
  subturmas,
  onSelectAllocation,
  initialFilters = {},
}) => {
  const [periodMode, setPeriodMode] = useState<'semanal' | 'mensal' | 'semestral'>('semanal');
  const [filters, setFilters] = useState<CalendarFilters>(initialFilters);
  const [selectedMonth, setSelectedMonth] = useState<string>('Março');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<DiaCalendario | null>(null);

  const conflitos = useMemo(() => detectConflicts(alocacoes, ambientes), [alocacoes, ambientes]);

  // Apply filters
  const filteredAlocacoes = useMemo(() => {
    return filterAllocations(alocacoes, filters, conflitos);
  }, [alocacoes, filters, conflitos]);

  // Unique lists for filter dropdowns
  const cursosList = useMemo(() => {
    return Array.from(new Set(turmas.map((t) => t.Curso))).sort();
  }, [turmas]);

  const mesesList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];

  // Dias do mês selecionado
  const diasDoMes = useMemo(() => {
    return calendario.filter((d) => d.Mes.toLowerCase() === selectedMonth.toLowerCase());
  }, [calendario, selectedMonth]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      docenteId: 'TODOS',
      ambienteId: 'TODOS',
      curso: 'TODOS',
      turmaId: 'TODOS',
      subturmaId: 'TODOS',
      turno: 'TODOS',
      diaSemana: 'TODOS',
      apenasConflitos: false,
      buscaTexto: '',
    });
  };

  const hasActiveFilters =
    (filters.docenteId && filters.docenteId !== 'TODOS') ||
    (filters.ambienteId && filters.ambienteId !== 'TODOS') ||
    (filters.curso && filters.curso !== 'TODOS') ||
    (filters.turno && filters.turno !== 'TODOS') ||
    (filters.diaSemana && filters.diaSemana !== 'TODOS') ||
    filters.apenasConflitos ||
    (filters.buscaTexto && filters.buscaTexto.trim() !== '');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Controls: Period Selector & Filters Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Period Selector Tabs */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setPeriodMode('semanal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                periodMode === 'semanal'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Visão Semanal (Grade)</span>
            </button>

            <button
              onClick={() => setPeriodMode('mensal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                periodMode === 'mensal'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Visão Mensal (Dias Letivos)</span>
            </button>

            <button
              onClick={() => setPeriodMode('semestral')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                periodMode === 'semestral'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Visão Semestral (100 Dias)</span>
            </button>
          </div>

          {/* Quick Counter */}
          <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
            <span>Aulas filtradas:</span>
            <strong className="text-white bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
              {filteredAlocacoes.length} de {alocacoes.length}
            </strong>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-3 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Docente Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Docente:</label>
            <select
              value={filters.docenteId || 'TODOS'}
              onChange={(e) => setFilters({ ...filters, docenteId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Todos os Docentes ({docentes.length})</option>
              {docentes
                .filter((d) => d.Elegivel_Cursos_Regulares === 'SIM')
                .map((d) => (
                  <option key={d.ID_Docente} value={d.ID_Docente}>
                    {d.Nome_Curto} ({d.NIF})
                  </option>
                ))}
            </select>
          </div>

          {/* Ambiente Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Ambiente:</label>
            <select
              value={filters.ambienteId || 'TODOS'}
              onChange={(e) => setFilters({ ...filters, ambienteId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Todos os Ambientes ({ambientes.length})</option>
              {ambientes.map((a) => (
                <option key={a.Cod_Localiz} value={a.Cod_Localiz}>
                  {a.Nome_Ambiente} ({a.Bloco})
                </option>
              ))}
            </select>
          </div>

          {/* Curso Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Curso:</label>
            <select
              value={filters.curso || 'TODOS'}
              onChange={(e) => setFilters({ ...filters, curso: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Todos os Cursos</option>
              {cursosList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Turno Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Turno:</label>
            <select
              value={filters.turno || 'TODOS'}
              onChange={(e) => setFilters({ ...filters, turno: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Todos os Turnos</option>
              <option value="Manhã">Manhã (07:30 - 11:30)</option>
              <option value="Tarde">Tarde (13:00 - 17:00)</option>
            </select>
          </div>

          {/* Dia da Semana */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Dia da Semana:</label>
            <select
              value={filters.diaSemana || 'TODOS'}
              onChange={(e) => setFilters({ ...filters, diaSemana: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Segunda a Sexta</option>
              {DIAS_SEMANA.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Busca Rápida:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="UC, turma, professor..."
                value={filters.buscaTexto || ''}
                onChange={(e) => setFilters({ ...filters, buscaTexto: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 pl-7 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2.5" />
            </div>
          </div>
        </div>

        {/* Bottom filter flags */}
        <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={filters.apenasConflitos || false}
              onChange={(e) => setFilters({ ...filters, apenasConflitos: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-red-600 focus:ring-0"
            />
            <span className="font-semibold text-rose-400">Exibir apenas aulas com conflito</span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Limpar Todos os Filtros
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: SEMANAL */}
      {periodMode === 'semanal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DIAS_SEMANA.map((dia) => {
              const alocsDoDia = filteredAlocacoes.filter((a) => a.diaSemana === dia);
              const manhaAlocs = alocsDoDia.filter((a) => a.turno === 'Manhã');
              const tardeAlocs = alocsDoDia.filter((a) => a.turno === 'Tarde');

              return (
                <div
                  key={dia}
                  className="bg-slate-800/70 border border-slate-700/60 rounded-2xl flex flex-col overflow-hidden shadow-lg"
                >
                  {/* Day Header */}
                  <div className="bg-slate-900/90 border-b border-slate-700/80 p-3.5 text-center">
                    <span className="text-sm font-bold text-white tracking-wide uppercase">
                      {dia}
                    </span>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {alocsDoDia.length} Aulas Agendadas
                    </div>
                  </div>

                  <div className="p-3 space-y-4 flex-1">
                    {/* Shift: Manhã */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-2 border-b border-slate-700/50 pb-1">
                        <span>☀️ Manhã (07:30 - 11:30)</span>
                        <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded font-mono">
                          {manhaAlocs.length}
                        </span>
                      </div>

                      {manhaAlocs.length === 0 ? (
                        <div className="p-3 text-center text-[11px] text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                          Nenhuma turma alocada
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {manhaAlocs.map((aloc) => {
                            const isConflict = conflitos.some((c) =>
                              c.alocacoesEnvolvidas.includes(aloc.id)
                            );

                            return (
                              <button
                                key={aloc.id}
                                onClick={() => onSelectAllocation(aloc)}
                                className={`w-full text-left p-2.5 rounded-xl border transition hover:scale-[1.02] ${
                                  isConflict
                                    ? 'bg-rose-950/60 border-rose-500 text-rose-100 shadow-rose-950/40'
                                    : 'bg-slate-900/80 border-slate-700/60 hover:border-slate-600 text-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[11px] font-bold text-red-400 truncate">
                                    {aloc.idSubturma.replace(' (Única)', '')}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {aloc.alunos} al.
                                  </span>
                                </div>
                                <div className="text-xs font-semibold text-white truncate" title={aloc.uc}>
                                  {aloc.uc}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                                  <School className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span className="truncate">{aloc.ambienteNome}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                  <Users className="w-3 h-3 text-cyan-400 shrink-0" />
                                  <span className="truncate">{aloc.docenteNome}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Shift: Tarde */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 mb-2 border-b border-slate-700/50 pb-1">
                        <span>🌤️ Tarde (13:00 - 17:00)</span>
                        <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded font-mono">
                          {tardeAlocs.length}
                        </span>
                      </div>

                      {tardeAlocs.length === 0 ? (
                        <div className="p-3 text-center text-[11px] text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                          Nenhuma turma alocada
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {tardeAlocs.map((aloc) => {
                            const isConflict = conflitos.some((c) =>
                              c.alocacoesEnvolvidas.includes(aloc.id)
                            );

                            return (
                              <button
                                key={aloc.id}
                                onClick={() => onSelectAllocation(aloc)}
                                className={`w-full text-left p-2.5 rounded-xl border transition hover:scale-[1.02] ${
                                  isConflict
                                    ? 'bg-rose-950/60 border-rose-500 text-rose-100 shadow-rose-950/40'
                                    : 'bg-slate-900/80 border-slate-700/60 hover:border-slate-600 text-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[11px] font-bold text-red-400 truncate">
                                    {aloc.idSubturma.replace(' (Única)', '')}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {aloc.alunos} al.
                                  </span>
                                </div>
                                <div className="text-xs font-semibold text-white truncate" title={aloc.uc}>
                                  {aloc.uc}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                                  <School className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span className="truncate">{aloc.ambienteNome}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                  <Users className="w-3 h-3 text-cyan-400 shrink-0" />
                                  <span className="truncate">{aloc.docenteNome}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: MENSAL */}
      {periodMode === 'mensal' && (
        <div className="space-y-6">
          {/* Month Navigator Header */}
          <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-400">Selecione o Mês:</span>
              <div className="flex gap-1.5 flex-wrap">
                {mesesList.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      setSelectedCalendarDay(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedMonth === m
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono hidden md:block">
              {diasDoMes.filter((d) => d.Dia_Letivo === 'SIM').length} Dias Letivos em {selectedMonth}
            </div>
          </div>

          {/* Calendar Grid of the Month */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {diasDoMes.map((diaItem) => {
              const isLetivo = diaItem.Dia_Letivo === 'SIM';
              const isSelected = selectedCalendarDay?.Data === diaItem.Data;
              const diaNome = diaItem.Dia_Semana;

              // Total classes that take place on this weekday
              const alocsDoDia = isLetivo
                ? filteredAlocacoes.filter((a) => a.diaSemana === diaNome)
                : [];

              return (
                <button
                  key={diaItem.Data}
                  onClick={() => setSelectedCalendarDay(diaItem)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[110px] ${
                    isSelected
                      ? 'ring-2 ring-red-500 border-red-500 bg-slate-800'
                      : isLetivo
                      ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-white">
                        {diaItem.Data.split('-')[2]}/{diaItem.Data.split('-')[1]}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {diaItem.Dia_Semana.substring(0, 3)}
                      </span>
                    </div>

                    <div className="text-[11px] leading-tight">
                      {isLetivo ? (
                        <span className="text-emerald-400 font-semibold block">
                          Dia Letivo #{diaItem.Numero_Dia_Letivo?.toFixed(0)}
                        </span>
                      ) : (
                        <span className="text-amber-400/90 font-medium block">
                          {diaItem.Status_Evento}
                        </span>
                      )}
                    </div>
                  </div>

                  {isLetivo && (
                    <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">{alocsDoDia.length} Aulas</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Day Inspection Drawer */}
          {selectedCalendarDay && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div>
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    Detalhamento do Dia
                  </div>
                  <h3 className="text-lg font-extrabold text-white">
                    {selectedCalendarDay.Data} ({selectedCalendarDay.Dia_Semana}) • {selectedCalendarDay.Status_Evento}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCalendarDay(null)}
                  className="text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕ Fechar
                </button>
              </div>

              {selectedCalendarDay.Dia_Letivo === 'SIM' ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredAlocacoes
                      .filter((a) => a.diaSemana === selectedCalendarDay.Dia_Semana)
                      .map((aloc) => (
                        <div
                          key={aloc.id}
                          onClick={() => onSelectAllocation(aloc)}
                          className="bg-slate-900 border border-slate-700/80 p-3 rounded-xl hover:border-red-500 cursor-pointer transition"
                        >
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="font-bold text-red-400">{aloc.idSubturma}</span>
                            <span className="text-slate-400 font-mono">{aloc.turno} ({aloc.horario})</span>
                          </div>
                          <div className="text-xs font-semibold text-white truncate">{aloc.uc}</div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            📍 {aloc.ambienteNome} • 👨‍🏫 {aloc.docenteNome}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-900 rounded-xl text-center text-slate-400 text-sm">
                  Dia não-letivo escolar ({selectedCalendarDay.Status_Evento}). Nenhuma aula regular programada.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: SEMESTRAL */}
      {periodMode === 'semestral' && (
        <div className="space-y-6">
          {/* Summary Box: 100 Dias Letivos */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-red-500" />
              Cronograma Semestral 2027/1 (100 Dias Letivos Oficiais)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Distribuição dos 100 dias letivos homologados no calendário SENAI Araçatuba de 25 de Janeiro a 23 de Junho de 2027.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {mesesList.map((m) => {
                const diasMes = calendario.filter((c) => c.Mes.toLowerCase() === m.toLowerCase());
                const letivos = diasMes.filter((c) => c.Dia_Letivo === 'SIM').length;
                const recessoOuFeriado = diasMes.filter((c) => c.Dia_Letivo === 'NÃO').length;

                return (
                  <div
                    key={m}
                    className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {m} 2027
                      </div>
                      <div className="text-2xl font-black text-white font-mono">{letivos}</div>
                      <div className="text-[11px] text-emerald-400 font-medium">Dias Letivos</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                      <span>{recessoOuFeriado} dias sem aula</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carga Horária Cumprida por Curso e Subturma */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Cumprimento da Carga Horária Semestral por Subturma
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Subturma</th>
                    <th className="py-2.5 px-3">Curso & Termo</th>
                    <th className="py-2.5 px-3">Turno</th>
                    <th className="py-2.5 px-3 text-center">Alunos</th>
                    <th className="py-2.5 px-3 text-center">Aulas/Semana</th>
                    <th className="py-2.5 px-3 text-center">Carga Semanal</th>
                    <th className="py-2.5 px-3 text-center">Carga Semestral</th>
                    <th className="py-2.5 px-3 text-center">Conformidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {subturmas.map((st) => {
                    const stAlocs = alocacoes.filter((a) => a.idSubturma === st.ID_Subturma);
                    const aulasSemana = stAlocs.length;
                    const horasSemana = aulasSemana * 4;
                    // Carga no semestre = horas semanais x ~20 semanas
                    const horasSemestre = horasSemana * 20;
                    const metaHoras = st.Turno === 'Integral' ? 320 : 400;
                    const percent = Math.min(100, Math.round((horasSemestre / metaHoras) * 100));

                    return (
                      <tr key={st.ID_Subturma} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-semibold text-white">{st.ID_Subturma}</td>
                        <td className="py-2.5 px-3 text-slate-300">{st.Curso}</td>
                        <td className="py-2.5 px-3 text-slate-400">{st.Turno}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-300">{st.Alunos}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-300">{aulasSemana}</td>
                        <td className="py-2.5 px-3 text-center font-mono font-semibold text-white">
                          {horasSemana}h/sem
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-cyan-400 font-bold">
                          {horasSemestre}h / {metaHoras}h
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              percent >= 100
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {percent}% Concluído
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
