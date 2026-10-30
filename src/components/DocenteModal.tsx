import React, { useState, useMemo } from 'react';
import {
  Docente,
  MatrizUC,
} from '../data/senaiData';
import {
  X,
  GraduationCap,
  BookOpen,
  Search,
  CheckSquare,
  Square,
  AlertCircle,
  Save,
  Check,
  User,
  Mail,
  Hash,
  Briefcase,
  Clock,
  Layers,
} from 'lucide-react';

interface DocenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (docente: Docente) => void;
  initialDocente?: Docente | null;
  ucsDisponiveis: MatrizUC[];
}

export const DocenteModal: React.FC<DocenteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDocente,
  ucsDisponiveis,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialDocente);

  // Form states
  const [nomeCurto, setNomeCurto] = useState(initialDocente?.Nome_Curto || '');
  const [nomeCompleto, setNomeCompleto] = useState(initialDocente?.Nome_Completo || '');
  const [nif, setNif] = useState(initialDocente?.NIF || '');
  const [email, setEmail] = useState(
    initialDocente?.Email || `${(initialDocente?.Nome_Curto || 'docente').toLowerCase()}@sp.senai.br`
  );
  const [statusAlocacao, setStatusAlocacao] = useState(
    initialDocente?.Status_Alocacao || 'Quadro Regular Araçatuba + FIC'
  );
  const [elegivelRegular, setElegivelRegular] = useState<'SIM' | 'NÃO'>(
    (initialDocente?.Elegivel_Cursos_Regulares as 'SIM' | 'NÃO') || 'SIM'
  );
  const [turnosAtuacao, setTurnosAtuacao] = useState(
    initialDocente?.Turnos_Atuacao_Regular || 'Manhã, Tarde'
  );
  const [disponivelNoturno, setDisponivelNoturno] = useState<'SIM' | 'NÃO'>(
    (initialDocente?.Disponivel_FIC_Noturno as 'SIM' | 'NÃO') || 'SIM'
  );

  // Selected UCs list
  const [selectedUCs, setSelectedUCs] = useState<string[]>(
    initialDocente?.ucsHabilitadas || []
  );

  // Search filter for UCs
  const [searchUC, setSearchUC] = useState('');
  const [filterCurso, setFilterCurso] = useState('TODOS');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Group UCs by course
  const ucsByCourse = useMemo(() => {
    const map: { [curso: string]: MatrizUC[] } = {};
    for (const u of ucsDisponiveis) {
      if (!map[u.Curso]) map[u.Curso] = [];
      map[u.Curso].push(u);
    }
    return map;
  }, [ucsDisponiveis]);

  const cursosList = useMemo(() => Object.keys(ucsByCourse).sort(), [ucsByCourse]);

  // Filtered UCs
  const filteredCursos = useMemo(() => {
    const result: { [curso: string]: MatrizUC[] } = {};
    const q = searchUC.toLowerCase().trim();

    for (const [curso, ucList] of Object.entries(ucsByCourse)) {
      if (filterCurso !== 'TODOS' && curso !== filterCurso) continue;

      const matching = ucList.filter((u) => {
        if (!q) return true;
        return (
          u.Unidade_Curricular.toLowerCase().includes(q) ||
          u.Curso.toLowerCase().includes(q) ||
          u.Termo_Semestre.toLowerCase().includes(q)
        );
      });

      if (matching.length > 0) {
        result[curso] = matching;
      }
    }
    return result;
  }, [ucsByCourse, searchUC, filterCurso]);

  const toggleUC = (ucNome: string) => {
    setSelectedUCs((prev) => {
      if (prev.includes(ucNome)) {
        return prev.filter((name) => name !== ucNome);
      } else {
        return [...prev, ucNome];
      }
    });
  };

  const handleSelectAllInCourse = (curso: string) => {
    const cursoUCs = (ucsByCourse[curso] || []).map((u) => u.Unidade_Curricular);
    setSelectedUCs((prev) => {
      const set = new Set([...prev, ...cursoUCs]);
      return Array.from(set);
    });
  };

  const handleDeselectAllInCourse = (curso: string) => {
    const cursoUCs = new Set((ucsByCourse[curso] || []).map((u) => u.Unidade_Curricular));
    setSelectedUCs((prev) => prev.filter((name) => !cursoUCs.has(name)));
  };

  const handleSelectAll = () => {
    const all = ucsDisponiveis.map((u) => u.Unidade_Curricular);
    setSelectedUCs(Array.from(new Set(all)));
  };

  const handleDeselectAll = () => {
    setSelectedUCs([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCurto.trim()) {
      setErrorMsg('O Nome Curto (exibido na grade) é obrigatório.');
      return;
    }
    if (!nomeCompleto.trim()) {
      setErrorMsg('O Nome Completo do docente é obrigatório.');
      return;
    }
    if (!nif.trim()) {
      setErrorMsg('O NIF é obrigatório.');
      return;
    }

    // Determine cursos com aptidão
    const cursosComAptidaoSet = new Set<string>();
    for (const ucNome of selectedUCs) {
      const found = ucsDisponiveis.find((u) => u.Unidade_Curricular === ucNome);
      if (found) cursosComAptidaoSet.add(found.Curso);
    }
    const cursosComAptidaoStr = Array.from(cursosComAptidaoSet).join(' | ');

    const updatedDocente: Docente = {
      ID_Docente: initialDocente?.ID_Docente || `DOC${Date.now().toString().slice(-4)}`,
      NIF: nif.trim(),
      Nome_Curto: nomeCurto.trim().toUpperCase(),
      Nome_Completo: nomeCompleto.trim(),
      Email: email.trim() || `${nomeCurto.toLowerCase()}@sp.senai.br`,
      Status_Alocacao: statusAlocacao,
      Elegivel_Cursos_Regulares: elegivelRegular,
      Turnos_Atuacao_Regular: turnosAtuacao,
      Turnos_Declarados_Formulario: turnosAtuacao,
      Disponivel_FIC_Noturno: disponivelNoturno,
      Qtd_UCs_Habilitadas: selectedUCs.length,
      Cursos_Com_Aptidao: cursosComAptidaoStr || 'Geral / Regulares',
      ucsHabilitadas: selectedUCs,
    };

    onSave(updatedDocente);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative my-8 animate-scaleIn max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              {isEditing ? 'Gestão Cadastral & Habilitações' : 'Cadastro de Novo Docente'}
            </span>
            <span className="text-xs text-slate-400 font-mono">CFP 901 Araçatuba</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {isEditing ? `Editar Docente: ${initialDocente?.Nome_Curto}` : 'Cadastrar Novo Docente'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Defina os dados funcionais e selecione as Unidades Curriculares que este docente está qualificado a ministrar.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body - Scrollable */}
        <form id="docenteForm" onSubmit={handleSubmit} className="overflow-y-auto pr-1 py-4 space-y-6 flex-1 text-xs">
          {/* Seção 1: Dados Funcionais */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-700/50 pb-2">
              <User className="w-4 h-4 text-cyan-400" />
              Dados Funcionais & Identificação
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Nome Curto */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nome Curto / Rótulo Grade: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: ROBERTO"
                  value={nomeCurto}
                  onChange={(e) => setNomeCurto(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-bold focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              {/* NIF */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  NIF Funcional: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1098450"
                  value={nif}
                  onChange={(e) => setNif(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-mono focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  E-mail Institucional:
                </label>
                <input
                  type="email"
                  placeholder="nome@sp.senai.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Nome Completo */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">
                  Nome Completo: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Roberto da Silva Santos"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              {/* Status Alocação */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Status de Alocação:
                </label>
                <select
                  value={statusAlocacao}
                  onChange={(e) => setStatusAlocacao(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
                >
                  <option value="Quadro Regular Araçatuba + FIC">Quadro Regular Araçatuba + FIC</option>
                  <option value="Exclusivo FIC / Polos Descentralizados">Exclusivo FIC / Polos Descentralizados</option>
                  <option value="Horista / Especialista Convidado">Horista / Especialista Convidado</option>
                </select>
              </div>

              {/* Elegível Regulares */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Elegível para Cursos Regulares:
                </label>
                <select
                  value={elegivelRegular}
                  onChange={(e) => setElegivelRegular(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="SIM">SIM (Atua em CAI e Técnicos)</option>
                  <option value="NÃO">NÃO (Apenas FIC / Projetos)</option>
                </select>
              </div>

              {/* Turnos Atuação */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Turnos de Atuação Regular:
                </label>
                <select
                  value={turnosAtuacao}
                  onChange={(e) => setTurnosAtuacao(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500"
                >
                  <option value="Manhã, Tarde">Manhã e Tarde (Integral 40h)</option>
                  <option value="Manhã">Apenas Manhã (20h)</option>
                  <option value="Tarde">Apenas Tarde (20h)</option>
                  <option value="Noite">Apenas Noite (FIC)</option>
                </select>
              </div>

              {/* Disponível Noturno */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Disponível FIC Noturno:
                </label>
                <select
                  value={disponivelNoturno}
                  onChange={(e) => setDisponivelNoturno(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="SIM">SIM</option>
                  <option value="NÃO">NÃO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seção 2: Seleção de Unidades Curriculares Aptas */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/50 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Unidades Curriculares Habilitadas (Aptidão Técnica)
                </h3>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Marque as UCs que este docente está qualificado a ministrar. Esta matriz alimenta o otimizador, relatórios e seletores de horário.
                </p>
              </div>

              {/* Global Quick Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  Selecionar Todas ({ucsDisponiveis.length})
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
                >
                  Desmarcar Todas
                </button>
              </div>
            </div>

            {/* Filter and Search Bar for UCs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar UC por nome ou termo..."
                  value={searchUC}
                  onChange={(e) => setSearchUC(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-8 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>

              <div>
                <select
                  value={filterCurso}
                  onChange={(e) => setFilterCurso(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
                >
                  <option value="TODOS">Todos os Cursos ({cursosList.length})</option>
                  {cursosList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* UCs Grouped by Course */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {Object.keys(filteredCursos).length === 0 ? (
                <div className="p-6 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                  Nenhuma Unidade Curricular encontrada para a busca "{searchUC}".
                </div>
              ) : (
                Object.entries(filteredCursos).map(([curso, ucList]) => {
                  const cursoUCs = ucList.map((u) => u.Unidade_Curricular);
                  const selectedCount = cursoUCs.filter((name) => selectedUCs.includes(name)).length;
                  const allSelected = selectedCount === cursoUCs.length;

                  return (
                    <div
                      key={curso}
                      className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5 space-y-2.5"
                    >
                      {/* Course Header with Quick Course Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <h4 className="font-bold text-white text-xs">{curso}</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                            {selectedCount}/{cursoUCs.length} UCs
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectAllInCourse(curso)}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-0.5 rounded hover:bg-emerald-500/10 transition"
                          >
                            + Todas do Curso
                          </button>
                          <span className="text-slate-600">•</span>
                          <button
                            type="button"
                            onClick={() => handleDeselectAllInCourse(curso)}
                            className="text-[11px] text-slate-400 hover:text-rose-400 font-semibold px-2 py-0.5 rounded hover:bg-rose-500/10 transition"
                          >
                            Limpar
                          </button>
                        </div>
                      </div>

                      {/* UCs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ucList.map((u) => {
                          const isChecked = selectedUCs.includes(u.Unidade_Curricular);

                          return (
                            <label
                              key={u.Unidade_Curricular}
                              className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition select-none ${
                                isChecked
                                  ? 'bg-red-950/30 border-red-500/50 text-white shadow-sm'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleUC(u.Unidade_Curricular)}
                                className="mt-0.5 rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-0 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <span className={`font-semibold block truncate leading-snug ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                                  {u.Unidade_Curricular}
                                </span>
                                <div className="text-[10px] text-slate-500 flex items-center justify-between mt-0.5 font-mono">
                                  <span>{u.Termo_Semestre}</span>
                                  <span className="text-cyan-400 font-bold">{u.Carga_Horaria_UC}h</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total Habilitado:</span>
            <strong className="text-xs font-mono font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              {selectedUCs.length} de {ucsDisponiveis.length} UCs Selecionadas
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="docenteForm"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-600/30 transition text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Docente'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
