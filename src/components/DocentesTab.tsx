import React, { useState, useMemo } from 'react';
import {
  Docente,
  MatrizUC,
  AlocacaoAula,
} from '../data/senaiData';
import {
  calculateDocenteOccupancy,
} from '../utils/academicEngine';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  BookOpen,
  GraduationCap,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Hash,
} from 'lucide-react';

interface DocentesTabProps {
  docentes: Docente[];
  ucs: MatrizUC[];
  alocacoes: AlocacaoAula[];
  onNewDocente: () => void;
  onEditDocente: (docente: Docente) => void;
  onDeleteDocente: (id: string) => void;
  onFilterCalendarByDocente?: (docenteId: string) => void;
}

export const DocentesTab: React.FC<DocentesTabProps> = ({
  docentes,
  ucs,
  alocacoes,
  onNewDocente,
  onEditDocente,
  onDeleteDocente,
  onFilterCalendarByDocente,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'TODOS' | 'REGULAR' | 'FIC' | 'COM_AULAS' | 'LIVRES'>('TODOS');
  const [filterCursoAptidao, setFilterCursoAptidao] = useState('TODOS');
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const [docenteToDelete, setDocenteToDelete] = useState<Docente | null>(null);

  const docStats = useMemo(() => calculateDocenteOccupancy(alocacoes, docentes), [alocacoes, docentes]);
  const docStatsMap = useMemo(() => new Map(docStats.map((s) => [s.docenteId, s])), [docStats]);

  // Unique courses for filter
  const cursosList = useMemo(() => {
    const set = new Set<string>();
    for (const u of ucs) set.add(u.Curso);
    return Array.from(set).sort();
  }, [ucs]);

  // Filtered docentes
  const filteredDocentes = useMemo(() => {
    return docentes.filter((d) => {
      const stats = docStatsMap.get(d.ID_Docente);

      // Category filter
      if (filterCategory === 'REGULAR' && d.Elegivel_Cursos_Regulares !== 'SIM') return false;
      if (filterCategory === 'FIC' && d.Elegivel_Cursos_Regulares === 'SIM') return false;
      if (filterCategory === 'COM_AULAS' && (!stats || stats.totalAulasSemana === 0)) return false;
      if (filterCategory === 'LIVRES' && stats && stats.totalAulasSemana > 0) return false;

      // Curso aptidao filter
      if (filterCursoAptidao !== 'TODOS') {
        const ucsDoCurso = ucs.filter((u) => u.Curso === filterCursoAptidao).map((u) => u.Unidade_Curricular);
        const hasUCFromCourse = d.ucsHabilitadas?.some((uName) => ucsDoCurso.includes(uName));
        if (!hasUCFromCourse) return false;
      }

      // Search term
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const matchesName =
          d.Nome_Curto.toLowerCase().includes(q) ||
          d.Nome_Completo.toLowerCase().includes(q) ||
          d.NIF.toLowerCase().includes(q) ||
          d.Email.toLowerCase().includes(q) ||
          d.Status_Alocacao.toLowerCase().includes(q);
        const matchesUC = d.ucsHabilitadas?.some((u) => u.toLowerCase().includes(q));
        if (!matchesName && !matchesUC) return false;
      }

      return true;
    });
  }, [docentes, docStatsMap, filterCategory, filterCursoAptidao, searchTerm, ucs]);

  // Stats
  const totalRegulares = docentes.filter((d) => d.Elegivel_Cursos_Regulares === 'SIM').length;
  const totalFIC = docentes.filter((d) => d.Elegivel_Cursos_Regulares !== 'SIM').length;
  const mediaUCsPorDocente =
    docentes.length > 0
      ? Math.round(
          docentes.reduce((acc, curr) => acc + (curr.ucsHabilitadas?.length || 0), 0) / docentes.length
        )
      : 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner / Actions */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Gestão de Corpo Docente & Habilidades
            </span>
            <span className="text-xs text-slate-400 font-mono">CFP 901 Araçatuba</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Cadastro de Docentes & Matriz de Aptidão ({docentes.length} Docentes)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadastre novos professores, edite suas habilitações curriculares e gerencie a capacidade técnica da unidade.
          </p>
        </div>

        <button
          onClick={onNewDocente}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Docente</span>
        </button>
      </div>

      {/* Quick KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
          <span className="text-slate-400 block font-medium">Total Cadastrado</span>
          <strong className="text-2xl font-black text-white font-mono">{docentes.length}</strong>
          <span className="text-[10px] text-slate-500 block">Docentes no sistema</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
          <span className="text-slate-400 block font-medium">Quadro Regular</span>
          <strong className="text-2xl font-black text-emerald-400 font-mono">{totalRegulares}</strong>
          <span className="text-[10px] text-emerald-500/80 block">Elegíveis CAI/Técnicos</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
          <span className="text-slate-400 block font-medium">FIC & Descentralizados</span>
          <strong className="text-2xl font-black text-cyan-400 font-mono">{totalFIC}</strong>
          <span className="text-[10px] text-cyan-500/80 block">Polos e Noturno</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
          <span className="text-slate-400 block font-medium">Média de Aptidões</span>
          <strong className="text-2xl font-black text-amber-400 font-mono">{mediaUCsPorDocente}</strong>
          <span className="text-[10px] text-amber-500/80 block">UCs habilitadas/docente</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por nome, NIF, e-mail ou unidade curricular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-8 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category filter pills */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setFilterCategory('TODOS')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'TODOS' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({docentes.length})
            </button>
            <button
              onClick={() => setFilterCategory('REGULAR')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'REGULAR' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Regulares ({totalRegulares})
            </button>
            <button
              onClick={() => setFilterCategory('FIC')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterCategory === 'FIC' ? 'bg-cyan-600 text-white' : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              FIC ({totalFIC})
            </button>
          </div>

          {/* Filter by Curso */}
          <select
            value={filterCursoAptidao}
            onChange={(e) => setFilterCursoAptidao(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="TODOS">Todos os Cursos</option>
            {cursosList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teachers List / Table */}
      <div className="space-y-3">
        {filteredDocentes.length === 0 ? (
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 text-center text-slate-500">
            Nenhum docente encontrado para os critérios de busca.
          </div>
        ) : (
          filteredDocentes.map((doc) => {
            const stats = docStatsMap.get(doc.ID_Docente);
            const isExpanded = expandedDocId === doc.ID_Docente;
            const ucsList = doc.ucsHabilitadas || [];
            const isRegular = doc.Elegivel_Cursos_Regulares === 'SIM';

            return (
              <div
                key={doc.ID_Docente}
                className="bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-slate-600/80 transition-all shadow-md"
              >
                {/* Main Card Header */}
                <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                  {/* Left: Avatar & Basic Info */}
                  <div className="flex items-center gap-3.5 min-w-[240px]">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base font-extrabold shadow-md shrink-0 ${
                      isRegular
                        ? 'bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-red-900/40'
                        : 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-cyan-900/40'
                    }`}>
                      {doc.Nome_Curto.substring(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {doc.Nome_Curto}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                          NIF: {doc.NIF}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                          isRegular
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {isRegular ? 'Quadro Regular' : 'FIC / Polos'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 mt-0.5 font-medium">
                        {doc.Nome_Completo}
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{doc.Email}</span>
                        <span>•</span>
                        <span>Turnos: {doc.Turnos_Atuacao_Regular}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Workload and UCs count */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    {/* Workload */}
                    <div className="text-right font-mono">
                      <span className="text-[11px] text-slate-400 block font-sans">Carga Semanal</span>
                      <strong className={`text-base font-bold ${
                        (stats?.horasSemana || 0) > 40
                          ? 'text-rose-400'
                          : (stats?.horasSemana || 0) >= 20
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}>
                        {stats?.horasSemana || 0}h / 40h
                      </strong>
                      <span className="text-[10px] text-slate-500 block font-sans">
                        {stats?.totalAulasSemana || 0} aulas agendadas
                      </span>
                    </div>

                    {/* UCs count button */}
                    <button
                      onClick={() => setExpandedDocId(isExpanded ? null : doc.ID_Docente)}
                      className="bg-slate-900/90 border border-slate-700/80 hover:border-red-500/60 p-2.5 rounded-xl flex items-center gap-2 text-xs transition select-none"
                      title="Ver Unidades Curriculares que este docente pode ministrar"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <div className="text-left font-mono">
                        <strong className="text-white block leading-tight">{ucsList.length}</strong>
                        <span className="text-[10px] text-slate-400 font-sans">UCs Aptas</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                      )}
                    </button>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEditDocente(doc)}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-xl text-xs font-semibold border border-slate-600 transition flex items-center gap-1"
                        title="Editar cadastro e habilitar/desabilitar UCs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Editar & UCs</span>
                      </button>

                      <button
                        onClick={() => setDocenteToDelete(doc)}
                        className="bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 p-2 rounded-xl text-xs transition border border-slate-700"
                        title="Excluir docente"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer: List of Habilitated UCs */}
                {isExpanded && (
                  <div className="bg-slate-900/90 border-t border-slate-700/60 p-4 sm:p-5 space-y-3 animate-slideUp">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        Unidades Curriculares Homologadas para {doc.Nome_Curto} ({ucsList.length}):
                      </h4>
                      <button
                        onClick={() => onEditDocente(doc)}
                        className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> Alterar UCs Habilitadas
                      </button>
                    </div>

                    {ucsList.length === 0 ? (
                      <div className="p-3 bg-slate-900 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-500">
                        Nenhuma Unidade Curricular habilitada no momento. Clique em "Editar & UCs" para associar disciplinas a este docente.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                        {ucsList.map((ucNome) => {
                          const matchingUCObj = ucs.find((u) => u.Unidade_Curricular === ucNome);
                          return (
                            <div
                              key={ucNome}
                              className="bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span className="font-semibold">{ucNome}</span>
                              {matchingUCObj && (
                                <span className="text-[10px] text-cyan-400 font-mono bg-slate-900 px-1 py-0.2 rounded">
                                  {matchingUCObj.Carga_Horaria_UC}h
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {docenteToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirmar Exclusão</h3>
                <p className="text-xs text-slate-400">Esta ação atualizará a base em todas as telas.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tem certeza de que deseja remover o docente <strong className="text-white">{docenteToDelete.Nome_Curto} ({docenteToDelete.Nome_Completo})</strong>?
            </p>

            {alocacoes.some((a) => a.docenteId === docenteToDelete.ID_Docente || a.docenteNome.toUpperCase() === docenteToDelete.Nome_Curto.toUpperCase()) && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                <strong>Atenção:</strong> Este docente possui aulas agendadas na grade atual. Ao excluí-lo, suas aulas serão marcadas como pendentes de substituição docente.
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3 text-xs font-semibold">
              <button
                onClick={() => setDocenteToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDeleteDocente(docenteToDelete.ID_Docente);
                  setDocenteToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition shadow-lg shadow-rose-600/30"
              >
                Sim, Excluir Docente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
