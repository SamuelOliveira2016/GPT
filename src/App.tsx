/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  SENAI_TURMAS,
  SENAI_SUBTURMAS,
  SENAI_AMBIENTES,
  SENAI_DOCENTES,
  SENAI_CALENDARIO,
  SENAI_UCS,
  INITIAL_ALOCACOES,
  AlocacaoAula,
  Docente,
  MatrizUC,
} from './data/senaiData';
import {
  detectConflicts,
  calculateExecutiveKPIs,
  syncDocenteWithUCs,
  removeDocenteFromUCs,
  CalendarFilters,
} from './utils/academicEngine';
import { Header } from './components/Header';
import { SolverTab } from './components/SolverTab';
import { DashboardTab } from './components/DashboardTab';
import { DocentesTab } from './components/DocentesTab';
import { HeatmapTab } from './components/HeatmapTab';
import { CalendarTab } from './components/CalendarTab';
import { AdjustmentsTab } from './components/AdjustmentsTab';
import { InventoryTab } from './components/InventoryTab';
import { ReportsTab } from './components/ReportsTab';
import { AllocationModal } from './components/AllocationModal';
import { ConflictsModal } from './components/ConflictsModal';
import { DocenteModal } from './components/DocenteModal';
import { Check, Info, X } from 'lucide-react';

export default function App() {
  // Global synchronized state
  const [docentes, setDocentes] = useState<Docente[]>(SENAI_DOCENTES);
  const [ucs, setUcs] = useState<MatrizUC[]>(SENAI_UCS);
  const [alocacoes, setAlocacoes] = useState<AlocacaoAula[]>(INITIAL_ALOCACOES);

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'docentes' | 'heatmap' | 'calendar' | 'adjustments' | 'inventory' | 'reports' | 'motor'
  >('motor');

  // Allocation Modal states
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<AlocacaoAula | null>(null);

  // Docente Modal states
  const [isDocenteModalOpen, setIsDocenteModalOpen] = useState(false);
  const [editingDocente, setEditingDocente] = useState<Docente | null>(null);

  // Conflicts Modal state
  const [isConflictsModalOpen, setIsConflictsModalOpen] = useState(false);

  // Calendar filter state passed from other tabs
  const [calendarFilters, setCalendarFilters] = useState<CalendarFilters>({});

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Conflicts calculation
  const conflitos = useMemo(
    () => detectConflicts(alocacoes, SENAI_AMBIENTES),
    [alocacoes]
  );

  // Executive KPIs
  const kpis = useMemo(
    () => calculateExecutiveKPIs(alocacoes, SENAI_AMBIENTES, docentes),
    [alocacoes, docentes]
  );

  // =================== DOCENTE CRUD HANDLERS ===================
  const handleSaveDocente = (updatedDocente: Docente) => {
    // 1. Update docentes list
    setDocentes((prev) => {
      const exists = prev.some((d) => d.ID_Docente === updatedDocente.ID_Docente);
      if (exists) {
        return prev.map((d) => (d.ID_Docente === updatedDocente.ID_Docente ? updatedDocente : d));
      } else {
        return [updatedDocente, ...prev];
      }
    });

    // 2. Synchronize UCs matriz so Docentes_Habilitados stays 100% in sync
    setUcs((prevUcs) => syncDocenteWithUCs(updatedDocente, prevUcs));

    // 3. If teacher's name or NIF changed, update any existing allocations that refer to them
    setAlocacoes((prevAlocs) =>
      prevAlocs.map((a) => {
        if (a.docenteId === updatedDocente.ID_Docente) {
          return {
            ...a,
            docenteNome: updatedDocente.Nome_Curto,
            docenteNomeCompleto: updatedDocente.Nome_Completo,
            docenteNif: updatedDocente.NIF,
          };
        }
        return a;
      })
    );

    setIsDocenteModalOpen(false);
    setEditingDocente(null);
    showToast(
      `Docente ${updatedDocente.Nome_Curto} salvo com sucesso! ${updatedDocente.ucsHabilitadas.length} UCs homologadas na base.`,
      'success'
    );
  };

  const handleDeleteDocente = (docenteId: string) => {
    const docToDelete = docentes.find((d) => d.ID_Docente === docenteId);
    if (!docToDelete) return;

    // 1. Remove from docentes
    setDocentes((prev) => prev.filter((d) => d.ID_Docente !== docenteId));

    // 2. Remove from UCs habilitados
    setUcs((prevUcs) => removeDocenteFromUCs(docToDelete.Nome_Curto, prevUcs));

    // 3. Mark affected allocations as vacant / needing assignment
    setAlocacoes((prevAlocs) =>
      prevAlocs.map((a) => {
        if (a.docenteId === docenteId || a.docenteNome.toUpperCase() === docToDelete.Nome_Curto.toUpperCase()) {
          return {
            ...a,
            docenteNome: 'À Contratar',
            docenteNomeCompleto: 'Pendente de Atribuição Docente',
            docenteNif: 'A_DEFINIR',
          };
        }
        return a;
      })
    );

    showToast(`Docente ${docToDelete.Nome_Curto} removido. Aulas vinculadas foram marcadas para reatribuição.`, 'info');
  };

  const handleNewDocente = () => {
    setEditingDocente(null);
    setIsDocenteModalOpen(true);
  };

  const handleEditDocente = (doc: Docente) => {
    setEditingDocente(doc);
    setIsDocenteModalOpen(true);
  };

  // =================== ALLOCATION HANDLERS ===================
  const handleSaveAllocation = (newAloc: AlocacaoAula) => {
    setAlocacoes((prev) => {
      const exists = prev.some((a) => a.id === newAloc.id);
      if (exists) {
        return prev.map((a) => (a.id === newAloc.id ? newAloc : a));
      } else {
        return [newAloc, ...prev];
      }
    });

    setIsAllocationModalOpen(false);
    setEditingAllocation(null);
    showToast(`Alocação de ${newAloc.idSubturma} salva com sucesso!`, 'success');
  };

  const handleDeleteAllocation = (id: string) => {
    setAlocacoes((prev) => prev.filter((a) => a.id !== id));
    showToast('Alocação removida da grade.', 'info');
  };

  // Nunca mais aplicar a heurística antiga de remanejamento.
  // A execução real ocorre na aba Motor, via API Python OR-Tools.
  const handleOptimize = () => {
    setActiveTab('motor');
    showToast('Acesse o Motor CP-SAT para validar e calcular a grade semestral.', 'info');
    setIsConflictsModalOpen(false);
  };

  const handleReset = () => {
    setDocentes(SENAI_DOCENTES);
    setUcs(SENAI_UCS);
    setAlocacoes(INITIAL_ALOCACOES);
    showToast('Base acadêmica restaurada para o padrão oficial SENAI Araçatuba 2027.', 'info');
  };

  const handleNavigateTab = (
    tab: 'dashboard' | 'docentes' | 'heatmap' | 'calendar' | 'adjustments' | 'inventory' | 'reports' | 'motor',
    filter?: CalendarFilters
  ) => {
    if (filter) {
      setCalendarFilters(filter);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditAllocation = (aloc: AlocacaoAula) => {
    setEditingAllocation(aloc);
    setIsAllocationModalOpen(true);
  };

  const handleNewAllocation = () => {
    setEditingAllocation(null);
    setIsAllocationModalOpen(true);
  };

  const handleNewAllocationForSlot = (
    dia: string,
    turno: 'Manhã' | 'Tarde',
    idTarget: string,
    tipo: 'ambiente' | 'docente'
  ) => {
    const dummyAloc: AlocacaoAula = {
      id: `ALOC-${Date.now().toString().slice(-4)}`,
      idTurma: 'M1EME-COM-1/27',
      idSubturma: 'M1EME-COM-1/27 (Única)',
      curso: 'Eletricista de Manutenção Eletroeletrônica',
      termo: '1º',
      turno,
      horario: turno === 'Manhã' ? '07:30 - 11:30' : '13:00 - 17:00',
      diaSemana: dia as any,
      diaSemanaNum: 1,
      uc: ucs[0].Unidade_Curricular,
      cargaHorariaUC: 80,
      ambienteId: tipo === 'ambiente' ? idTarget : SENAI_AMBIENTES[0].Cod_Localiz,
      ambienteNome: tipo === 'ambiente' ? (SENAI_AMBIENTES.find((a) => a.Cod_Localiz === idTarget)?.Nome_Ambiente || '') : SENAI_AMBIENTES[0].Nome_Ambiente,
      bloco: SENAI_AMBIENTES[0].Bloco,
      capacidadeAmbiente: SENAI_AMBIENTES[0].Capacidade_Postos,
      alunos: 16,
      docenteId: tipo === 'docente' ? idTarget : docentes[3].ID_Docente,
      docenteNome: tipo === 'docente' ? (docentes.find((d) => d.ID_Docente === idTarget)?.Nome_Curto || '') : docentes[3].Nome_Curto,
      docenteNomeCompleto: docentes[3].Nome_Completo,
      docenteNif: docentes[3].NIF,
      pesoAfinidade: 30,
    };
    setEditingAllocation(dummyAloc);
    setIsAllocationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            toast.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-400'
              : toast.type === 'warning'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-cyan-500/20 text-cyan-400'
          }`}>
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalConflitos={conflitos.length}
        onOpenConflicts={() => setIsConflictsModalOpen(true)}
        onOptimize={handleOptimize}
        onReset={handleReset}
        onExport={() => setActiveTab('reports')}
        taxaMediaAmbientes={kpis.taxaMediaAmbientes}
        docentesAtivos={kpis.docentesAtivosCount}
        totalHorasSemana={kpis.totalHorasSemana}
      />

      {/* Aviso: as alocações de legado não foram confirmadas; nunca confundir com grade do CP-SAT. */}
      {activeTab !== 'motor' && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 text-xs text-amber-200 bg-amber-950/40 border border-amber-800/40 rounded-lg p-3">
          Dados demonstrativos do projeto original (149 alocações artificiais). Não utilizar indicadores ou conflitos dessas abas como grade oficial. Abra o Motor CP-SAT.
        </div>
      )}
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        {activeTab === 'motor' && <SolverTab />}

        {activeTab === 'dashboard' && (
          <DashboardTab
            alocacoes={alocacoes}
            ambientes={SENAI_AMBIENTES}
            docentes={docentes}
            ucs={ucs}
            onNavigateTab={handleNavigateTab}
            onOpenConflicts={() => setIsConflictsModalOpen(true)}
          />
        )}

        {activeTab === 'docentes' && (
          <DocentesTab
            docentes={docentes}
            ucs={ucs}
            alocacoes={alocacoes}
            onNewDocente={handleNewDocente}
            onEditDocente={handleEditDocente}
            onDeleteDocente={handleDeleteDocente}
            onFilterCalendarByDocente={(docId) => handleNavigateTab('calendar', { docenteId: docId })}
          />
        )}

        {activeTab === 'heatmap' && (
          <HeatmapTab
            alocacoes={alocacoes}
            ambientes={SENAI_AMBIENTES}
            docentes={docentes}
            onSelectAllocation={handleEditAllocation}
            onNewAllocationForSlot={handleNewAllocationForSlot}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarTab
            alocacoes={alocacoes}
            ambientes={SENAI_AMBIENTES}
            docentes={docentes}
            calendario={SENAI_CALENDARIO}
            turmas={SENAI_TURMAS}
            subturmas={SENAI_SUBTURMAS}
            onSelectAllocation={handleEditAllocation}
            initialFilters={calendarFilters}
          />
        )}

        {activeTab === 'adjustments' && (
          <AdjustmentsTab
            alocacoes={alocacoes}
            ambientes={SENAI_AMBIENTES}
            docentes={docentes}
            turmas={SENAI_TURMAS}
            subturmas={SENAI_SUBTURMAS}
            ucs={ucs}
            onEditAllocation={handleEditAllocation}
            onNewAllocation={handleNewAllocation}
            onDeleteAllocation={handleDeleteAllocation}
            onOptimize={handleOptimize}
            onReset={handleReset}
            onOpenConflicts={() => setIsConflictsModalOpen(true)}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryTab
            ambientes={SENAI_AMBIENTES}
            alocacoes={alocacoes}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            alocacoes={alocacoes}
            ambientes={SENAI_AMBIENTES}
            docentes={docentes}
            turmas={SENAI_TURMAS}
            subturmas={SENAI_SUBTURMAS}
            ucs={ucs}
          />
        )}
      </main>

      {/* Allocation Edit Modal */}
      <AllocationModal
        isOpen={isAllocationModalOpen}
        onClose={() => {
          setIsAllocationModalOpen(false);
          setEditingAllocation(null);
        }}
        onSave={handleSaveAllocation}
        initialAllocation={editingAllocation}
        alocacoesExistentes={alocacoes}
        ambientes={SENAI_AMBIENTES}
        docentes={docentes}
        turmas={SENAI_TURMAS}
        subturmas={SENAI_SUBTURMAS}
        ucs={ucs}
      />

      {/* Docente CRUD Modal */}
      <DocenteModal
        isOpen={isDocenteModalOpen}
        onClose={() => {
          setIsDocenteModalOpen(false);
          setEditingDocente(null);
        }}
        onSave={handleSaveDocente}
        initialDocente={editingDocente}
        ucsDisponiveis={ucs}
      />

      {/* Conflicts Modal */}
      <ConflictsModal
        isOpen={isConflictsModalOpen}
        onClose={() => setIsConflictsModalOpen(false)}
        conflitos={conflitos}
        alocacoes={alocacoes}
        onSelectAllocationToFix={handleEditAllocation}
        onAutoResolveAll={handleOptimize}
      />
    </div>
  );
}
