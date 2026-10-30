import React, { useState } from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  DIAS_SEMANA,
  TURNOS,
} from '../data/senaiData';
import {
  generateHeatmapGrid,
  HeatmapRow,
  HeatmapCell,
} from '../utils/academicEngine';
import {
  Grid,
  School,
  Users,
  Filter,
  Info,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface HeatmapTabProps {
  alocacoes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  onSelectAllocation: (aloc: AlocacaoAula) => void;
  onNewAllocationForSlot?: (dia: string, turno: 'Manhã' | 'Tarde', idTarget: string, tipo: 'ambiente' | 'docente') => void;
}

export const HeatmapTab: React.FC<HeatmapTabProps> = ({
  alocacoes,
  ambientes,
  docentes,
  onSelectAllocation,
  onNewAllocationForSlot,
}) => {
  const [heatmapType, setHeatmapType] = useState<'ambiente' | 'docente'>('ambiente');
  const [selectedBloco, setSelectedBloco] = useState<string>('TODOS');
  const [selectedTurnoFilter, setSelectedTurnoFilter] = useState<'TODOS' | 'Manhã' | 'Tarde'>('TODOS');
  const [selectedCell, setSelectedCell] = useState<{ row: HeatmapRow; cell: HeatmapCell } | null>(null);

  // Generate grid rows
  const gridRows = generateHeatmapGrid(
    alocacoes,
    ambientes,
    docentes,
    heatmapType,
    selectedBloco
  );

  // Unique blocks
  const blocosList = Array.from(new Set(ambientes.map((a) => a.Bloco))).sort();

  // Active slots to display based on turno filter
  const displayedTurnos = selectedTurnoFilter === 'TODOS' ? TURNOS : [selectedTurnoFilter];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Filter & Toggle Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => {
                setHeatmapType('ambiente');
                setSelectedCell(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                heatmapType === 'ambiente'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Mapa por Ambiente (Espaços)</span>
            </button>
            <button
              onClick={() => {
                setHeatmapType('docente');
                setSelectedCell(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                heatmapType === 'docente'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Mapa por Docente (Carga)</span>
            </button>
          </div>
        </div>

        {/* Secondary filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {heatmapType === 'ambiente' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filtrar Bloco:</span>
              <select
                value={selectedBloco}
                onChange={(e) => setSelectedBloco(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              >
                <option value="TODOS">Todos os Blocos ({ambientes.length})</option>
                {blocosList.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Turno:</span>
            <select
              value={selectedTurnoFilter}
              onChange={(e) => setSelectedTurnoFilter(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-red-500"
            >
              <option value="TODOS">Manhã & Tarde</option>
              <option value="Manhã">Apenas Manhã (07:30 - 11:30)</option>
              <option value="Tarde">Apenas Tarde (13:00 - 17:00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Heatmap Legend & Explanation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/40 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          <span>Matriz de Ocupação Semanal (Segunda a Sexta • 4h/turno)</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700" />
            <span>Livre / Ocioso (0%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600/80 border border-emerald-500" />
            <span>Ocupação Normal (1 Turma)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-600 border border-rose-400 animate-pulse" />
            <span className="text-rose-400 font-semibold">Conflito / Sobreposição (&gt;1 Turma)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700 text-xs text-slate-300 font-semibold">
                <th className="p-3.5 min-w-[220px] sticky left-0 z-20 bg-slate-900 shadow-md">
                  {heatmapType === 'ambiente' ? 'Ambiente / Bloco' : 'Docente / Cargo'}
                </th>
                <th className="p-3.5 text-center w-24">Taxa Ocup.</th>

                {/* Day Columns */}
                {DIAS_SEMANA.map((dia) => (
                  <th
                    key={dia}
                    colSpan={displayedTurnos.length}
                    className="p-2.5 text-center border-l border-slate-700/80 bg-slate-900/70"
                  >
                    <div className="font-bold text-white uppercase tracking-wider">{dia}</div>
                    <div className="text-[10px] text-slate-400 font-normal flex justify-center gap-4 mt-0.5">
                      {displayedTurnos.map((t) => (
                        <span key={t} className="w-16 text-center">
                          {t}
                        </span>
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs">
              {gridRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-700/30 transition-colors">
                  {/* Row Header (Ambiente or Docente) */}
                  <td className="p-3 sticky left-0 z-10 bg-slate-800/95 border-r border-slate-700/80 backdrop-blur-sm">
                    <div className="font-semibold text-slate-100 truncate max-w-[200px]" title={row.nome}>
                      {row.nome}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      {row.subtitulo}
                    </div>
                  </td>

                  {/* Average Occupancy Badge */}
                  <td className="p-3 text-center border-r border-slate-700/60 font-mono">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                        row.mediaOcupacao === 0
                          ? 'bg-slate-700/40 text-slate-400'
                          : row.mediaOcupacao > 80
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {row.mediaOcupacao}%
                    </span>
                  </td>

                  {/* Day & Shift Cells */}
                  {DIAS_SEMANA.map((dia) =>
                    displayedTurnos.map((turno) => {
                      const cell = row.cells.find(
                        (c) => c.diaSemana === dia && c.turno === turno
                      );

                      if (!cell) {
                        return <td key={`${dia}_${turno}`} className="p-2 border-l border-slate-700/40" />;
                      }

                      const isSelected =
                        selectedCell?.row.id === row.id &&
                        selectedCell?.cell.diaSemana === dia &&
                        selectedCell?.cell.turno === turno;

                      let cellBg = 'bg-slate-800/40 text-slate-500 hover:bg-slate-700/50';
                      if (cell.temConflito) {
                        cellBg = 'bg-rose-600 text-white font-bold animate-pulse hover:bg-rose-500 shadow-md shadow-rose-900/50';
                      } else if (cell.ocupado) {
                        cellBg = 'bg-emerald-600/90 text-white hover:bg-emerald-500 shadow-sm';
                      }

                      return (
                        <td
                          key={`${dia}_${turno}`}
                          className="p-1 border-l border-slate-700/40 text-center"
                        >
                          <button
                            onClick={() => setSelectedCell({ row, cell })}
                            className={`w-full h-11 rounded-lg flex flex-col items-center justify-center p-1 transition-all border ${
                              isSelected
                                ? 'ring-2 ring-white border-white scale-95'
                                : 'border-transparent'
                            } ${cellBg}`}
                            title={
                              cell.ocupado
                                ? `${cell.qtdAlocacoes} alocação(ões) em ${dia} (${turno})`
                                : `Livre - clique para detalhes ou alocação em ${dia} (${turno})`
                            }
                          >
                            {cell.temConflito ? (
                              <div className="flex items-center gap-1 text-[11px]">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>{cell.qtdAlocacoes}x CONFLITO</span>
                              </div>
                            ) : cell.ocupado ? (
                              <div className="w-full truncate px-1">
                                <span className="font-semibold block truncate text-[11px] leading-tight">
                                  {cell.alocacoes[0]?.idSubturma.replace(' (Única)', '')}
                                </span>
                                <span className="text-[9px] text-emerald-100/90 block truncate leading-tight">
                                  {heatmapType === 'ambiente'
                                    ? cell.alocacoes[0]?.docenteNome
                                    : cell.alocacoes[0]?.ambienteNome}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-mono">Livre</span>
                            )}
                          </button>
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Cell Detail Drawer / Card */}
      {selectedCell && (
        <div className="bg-slate-800 border-2 border-red-500/60 rounded-2xl p-5 shadow-2xl animate-slideUp">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                  {selectedCell.cell.diaSemana} • Turno {selectedCell.cell.turno}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedCell.cell.turno === 'Manhã' ? '07:30 às 11:30' : '13:00 às 17:00'} (4 Horas)
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                {selectedCell.row.nome}
              </h3>
              <p className="text-xs text-slate-300">{selectedCell.row.subtitulo}</p>
            </div>

            <button
              onClick={() => setSelectedCell(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 text-xs"
            >
              Fechar ✕
            </button>
          </div>

          <div className="mt-4">
            {selectedCell.cell.alocacoes.length === 0 ? (
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 text-center">
                <p className="text-sm text-slate-300 mb-2">
                  Nenhuma aula agendada para este horário. O espaço/docente está completamente livre!
                </p>
                {onNewAllocationForSlot && (
                  <button
                    onClick={() =>
                      onNewAllocationForSlot(
                        selectedCell.cell.diaSemana,
                        selectedCell.cell.turno,
                        selectedCell.row.id,
                        heatmapType
                      )
                    }
                    className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                  >
                    + Criar Alocação neste Horário
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCell.cell.temConflito && (
                  <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center gap-2.5 text-rose-300 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>
                      Atenção: Existem {selectedCell.cell.alocacoes.length} subturmas simultaneamente agendadas neste mesmo espaço/docente! Remaneje uma delas para resolver o choque.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCell.cell.alocacoes.map((aloc) => (
                    <div
                      key={aloc.id}
                      className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-600 transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                            {aloc.idSubturma}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {aloc.alunos} Alunos • Cap. {aloc.capacidadeAmbiente}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{aloc.curso}</h4>
                        <div className="text-xs text-slate-300 mb-2">
                          <strong>UC:</strong> {aloc.uc} ({aloc.cargaHorariaUC}h)
                        </div>
                        <div className="text-xs text-slate-400 space-y-1 font-mono">
                          <div>📍 Ambiente: {aloc.ambienteNome} ({aloc.bloco})</div>
                          <div>👨‍🏫 Docente: {aloc.docenteNomeCompleto || aloc.docenteNome} (NIF {aloc.docenteNif})</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => onSelectAllocation(aloc)}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-red-400" />
                          <span>Editar / Remanejar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
