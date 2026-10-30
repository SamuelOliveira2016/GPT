import React, { useState, useMemo } from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  Turma,
  Subturma,
  MatrizUC,
  DIAS_SEMANA,
  TURNOS,
} from '../data/senaiData';
import {
  AlertTriangle,
  CheckCircle,
  X,
  School,
  Users,
  Clock,
  BookOpen,
} from 'lucide-react';

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (aloc: AlocacaoAula) => void;
  initialAllocation?: AlocacaoAula | null;
  alocacoesExistentes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  turmas: Turma[];
  subturmas: Subturma[];
  ucs: MatrizUC[];
}

export const AllocationModal: React.FC<AllocationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAllocation,
  alocacoesExistentes,
  ambientes,
  docentes,
  turmas,
  subturmas,
  ucs,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialAllocation);

  // Form state
  const [idSubturma, setIdSubturma] = useState<string>(
    initialAllocation?.idSubturma || subturmas[0]?.ID_Subturma || ''
  );
  const [diaSemana, setDiaSemana] = useState<'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta'>(
    initialAllocation?.diaSemana || 'Segunda'
  );
  const [turno, setTurno] = useState<'Manhã' | 'Tarde'>(
    (initialAllocation?.turno as 'Manhã' | 'Tarde') || 'Manhã'
  );
  const [uc, setUc] = useState<string>(
    initialAllocation?.uc || ucs[0]?.Unidade_Curricular || ''
  );
  const [ambienteId, setAmbienteId] = useState<string>(
    initialAllocation?.ambienteId || ambientes[0]?.Cod_Localiz || ''
  );
  const [docenteId, setDocenteId] = useState<string>(
    initialAllocation?.docenteId || docentes[0]?.ID_Docente || ''
  );

  // Current subturma object
  const currentSubturma = useMemo(() => {
    return subturmas.find((s) => s.ID_Subturma === idSubturma) || subturmas[0];
  }, [subturmas, idSubturma]);

  // Current turma object
  const currentTurma = useMemo(() => {
    return turmas.find((t) => t.ID_Turma === currentSubturma?.ID_Turma_Base);
  }, [turmas, currentSubturma]);

  // Available UCs for this course
  const availableUCs = useMemo(() => {
    if (!currentSubturma) return ucs;
    const cleanCurso = currentSubturma.Curso.replace(' (CAI)', '').trim().toLowerCase();
    const matching = ucs.filter((u) => u.Curso.toLowerCase().includes(cleanCurso) || cleanCurso.includes(u.Curso.toLowerCase()));
    return matching.length > 0 ? matching : ucs;
  }, [ucs, currentSubturma]);

  // Selected UC object
  const selectedUCObj = useMemo(() => {
    return ucs.find((u) => u.Unidade_Curricular === uc) || availableUCs[0] || ucs[0];
  }, [ucs, uc, availableUCs]);

  // Selected Ambiente object
  const selectedAmbienteObj = useMemo(() => {
    return ambientes.find((a) => a.Cod_Localiz === ambienteId) || ambientes[0];
  }, [ambientes, ambienteId]);

  // Selected Docente object
  const selectedDocenteObj = useMemo(() => {
    return docentes.find((d) => d.ID_Docente === docenteId) || docentes[0];
  }, [docentes, docenteId]);

  // Real-time conflict checks:
  // 1. Room collision: is this room occupied by another class on this day + shift?
  const roomCollision = useMemo(() => {
    return alocacoesExistentes.find(
      (a) =>
        a.ambienteId === ambienteId &&
        a.diaSemana === diaSemana &&
        a.turno === turno &&
        (!isEditing || a.id !== initialAllocation?.id)
    );
  }, [alocacoesExistentes, ambienteId, diaSemana, turno, isEditing, initialAllocation]);

  // 2. Docente collision: is this teacher busy with another class on this day + shift?
  const docCollision = useMemo(() => {
    return alocacoesExistentes.find(
      (a) =>
        a.docenteId === docenteId &&
        a.diaSemana === diaSemana &&
        a.turno === turno &&
        (!isEditing || a.id !== initialAllocation?.id)
    );
  }, [alocacoesExistentes, docenteId, diaSemana, turno, isEditing, initialAllocation]);

  // 3. Capacity overflow
  const capacityOverflow = useMemo(() => {
    const alunos = currentSubturma ? currentSubturma.Alunos : 16;
    const cap = selectedAmbienteObj ? selectedAmbienteObj.Capacidade_Postos : 16;
    return alunos > cap && cap > 0;
  }, [currentSubturma, selectedAmbienteObj]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const horario = turno === 'Manhã' ? '07:30 - 11:30' : '13:00 - 17:00';
    const diaNum = DIAS_SEMANA.indexOf(diaSemana) + 1;

    const newAloc: AlocacaoAula = {
      id: initialAllocation?.id || `ALOC-${Date.now().toString().slice(-4)}`,
      idTurma: currentSubturma?.ID_Turma_Base || 'M1EME-COM-1/27',
      idSubturma: currentSubturma?.ID_Subturma || idSubturma,
      curso: currentSubturma?.Curso || selectedUCObj?.Curso || '',
      termo: currentTurma?.Termo || '1º',
      turno,
      horario,
      diaSemana,
      diaSemanaNum: diaNum,
      uc: selectedUCObj?.Unidade_Curricular || uc,
      cargaHorariaUC: selectedUCObj?.Carga_Horaria_UC || 80,
      ambienteId: selectedAmbienteObj?.Cod_Localiz || ambienteId,
      ambienteNome: selectedAmbienteObj?.Nome_Ambiente || '',
      bloco: selectedAmbienteObj?.Bloco || '',
      capacidadeAmbiente: selectedAmbienteObj?.Capacidade_Postos || 16,
      alunos: currentSubturma?.Alunos || 16,
      docenteId: selectedDocenteObj?.ID_Docente || docenteId,
      docenteNome: selectedDocenteObj?.Nome_Curto || '',
      docenteNomeCompleto: selectedDocenteObj?.Nome_Completo || '',
      docenteNif: selectedDocenteObj?.NIF || '',
      pesoAfinidade: 30,
      observacoes: 'Ajuste manual realizado via interface.',
    };

    onSave(newAloc);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            {isEditing ? 'Editar Alocação Acadêmica' : 'Nova Alocação no Horário'}
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            {isEditing ? `Ajustar Horário de ${initialAllocation?.idSubturma}` : 'Cadastrar Nova Aula'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            O sistema valida em tempo real choque de horários, homologação de ambiente e aptidão docente.
          </p>
        </div>

        {/* Warnings / Collision Banners */}
        <div className="space-y-2 mb-5">
          {roomCollision && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                Aviso de Conflito de Ambiente: O ambiente "{selectedAmbienteObj?.Nome_Ambiente}" já está reservado para a subturma {roomCollision.idSubturma} neste mesmo turno!
              </span>
            </div>
          )}

          {docCollision && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                Aviso de Conflito de Docente: O professor {selectedDocenteObj?.Nome_Curto} já está ministrando aula para {docCollision.idSubturma} neste mesmo horário!
              </span>
            </div>
          )}

          {capacityOverflow && (
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Aviso de Capacidade: A subturma possui {currentSubturma?.Alunos} alunos para {selectedAmbienteObj?.Capacidade_Postos} postos homologados.
              </span>
            </div>
          )}
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Subturma Selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Subturma Operacional:</label>
            <select
              value={idSubturma}
              onChange={(e) => setIdSubturma(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
            >
              {subturmas.map((st) => (
                <option key={st.ID_Subturma} value={st.ID_Subturma}>
                  {st.ID_Subturma} • {st.Curso} ({st.Alunos} alunos)
                </option>
              ))}
            </select>
          </div>

          {/* Dia da Semana & Turno */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dia da Semana:</label>
              <select
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
              >
                {DIAS_SEMANA.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Turno de Aula:</label>
              <select
                value={turno}
                onChange={(e) => setTurno(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
              >
                <option value="Manhã">Manhã (07:30 - 11:30)</option>
                <option value="Tarde">Tarde (13:00 - 17:00)</option>
              </select>
            </div>
          </div>

          {/* Unidade Curricular */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Unidade Curricular (UC):</label>
            <select
              value={uc}
              onChange={(e) => setUc(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
            >
              {availableUCs.map((u, i) => (
                <option key={`${u.Unidade_Curricular}_${i}`} value={u.Unidade_Curricular}>
                  {u.Unidade_Curricular} ({u.Carga_Horaria_UC}h) • {u.Curso}
                </option>
              ))}
            </select>
          </div>

          {/* Ambiente */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">Ambiente / Laboratório:</label>
              <span className="text-[11px] text-slate-400 font-mono">
                Postos: {selectedAmbienteObj?.Capacidade_Postos} • {selectedAmbienteObj?.Bloco}
              </span>
            </div>
            <select
              value={ambienteId}
              onChange={(e) => setAmbienteId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
            >
              {ambientes.map((a) => {
                const isHomologated = selectedUCObj?.Ambientes_Homologados?.some((h) =>
                  a.Nome_Ambiente.toLowerCase().includes(h.toLowerCase())
                );
                return (
                  <option key={a.Cod_Localiz} value={a.Cod_Localiz}>
                    {a.Nome_Ambiente} ({a.Bloco} - Cap: {a.Capacidade_Postos}) {isHomologated ? '★ Homologado' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Docente */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">Docente Responsável:</label>
              <span className="text-[11px] text-slate-400 font-mono">
                {selectedDocenteObj?.Status_Alocacao}
              </span>
            </div>
            <select
              value={docenteId}
              onChange={(e) => setDocenteId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-red-500 font-medium"
            >
              {docentes
                .filter((d) => d.Elegivel_Cursos_Regulares === 'SIM' || d.ID_Docente === docenteId)
                .map((d) => {
                  const isHabilitado =
                    d.ucsHabilitadas?.some((u) => u.toLowerCase() === selectedUCObj?.Unidade_Curricular.toLowerCase()) ||
                    selectedUCObj?.Docentes_Habilitados?.some((h) =>
                      h.toLowerCase().includes(d.Nome_Curto.toLowerCase()) ||
                      d.Nome_Curto.toLowerCase().includes(h.toLowerCase())
                    );

                  return (
                    <option key={d.ID_Docente} value={d.ID_Docente}>
                      {d.Nome_Curto} ({d.Nome_Completo}) • NIF {d.NIF} {isHabilitado ? '✓ Habilitado' : ''}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-600/30 transition"
            >
              Salvar Alocação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
