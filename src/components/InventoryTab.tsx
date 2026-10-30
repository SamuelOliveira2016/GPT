import React, { useState, useMemo } from 'react';
import {
  Ambiente,
  BemPatrimonial,
  SENAI_BENS_BY_AMBIENTE,
  AlocacaoAula,
} from '../data/senaiData';
import {
  Package,
  Search,
  School,
  Cpu,
  Layers,
  Wrench,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface InventoryTabProps {
  ambientes: Ambiente[];
  alocacoes: AlocacaoAula[];
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  ambientes,
  alocacoes,
}) => {
  const [selectedAmbienteId, setSelectedAmbienteId] = useState<string>(ambientes[0]?.Cod_Localiz || '');
  const [searchBem, setSearchBem] = useState('');

  const selectedAmbiente = useMemo(() => {
    return ambientes.find((a) => a.Cod_Localiz === selectedAmbienteId) || ambientes[0];
  }, [ambientes, selectedAmbienteId]);

  const bensList = useMemo(() => {
    if (!selectedAmbiente) return [];
    const all = SENAI_BENS_BY_AMBIENTE[selectedAmbiente.Cod_Localiz] || [];
    if (!searchBem.trim()) return all;
    const q = searchBem.toLowerCase();
    return all.filter((b) => b.denominacao.toLowerCase().includes(q));
  }, [selectedAmbiente, searchBem]);

  const totalItens = useMemo(() => {
    return bensList.reduce((acc, curr) => acc + curr.quantidade, 0);
  }, [bensList]);

  // Classes using this room
  const roomAlocs = useMemo(() => {
    if (!selectedAmbiente) return [];
    return alocacoes.filter((a) => a.ambienteId === selectedAmbiente.Cod_Localiz);
  }, [alocacoes, selectedAmbiente]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Base de Bens do PAT (SENAI CFP 901)
            </span>
            <span className="text-xs text-slate-400 font-mono">1.290 Agrupamentos Patrimoniais</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Inventário & Infraestrutura por Ambiente de Ensino
          </h2>
        </div>

        {/* Room selector dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-semibold">Selecione o Ambiente:</label>
          <select
            value={selectedAmbienteId}
            onChange={(e) => setSelectedAmbienteId(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-red-500 max-w-[280px]"
          >
            {ambientes.map((a) => (
              <option key={a.Cod_Localiz} value={a.Cod_Localiz}>
                {a.Nome_Ambiente} ({a.Bloco})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Room Overview Card */}
      {selectedAmbiente && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Room Specs */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>Cód. Patrimonial: #{selectedAmbiente.Cod_Localiz}</span>
                <span>•</span>
                <span className="text-red-400 font-bold">{selectedAmbiente.Bloco}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight">
                {selectedAmbiente.Nome_Ambiente}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                Área Tecnológica: {selectedAmbiente.Area_Tecnologica}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/60">
              <div className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-xl">
                <span className="text-[11px] text-slate-400 block">Capacidade Homologada</span>
                <strong className="text-xl font-mono text-emerald-400 font-bold">
                  {selectedAmbiente.Capacidade_Postos} Postos
                </strong>
              </div>

              <div className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-xl">
                <span className="text-[11px] text-slate-400 block">Bens Patrimoniados</span>
                <strong className="text-xl font-mono text-cyan-400 font-bold">
                  {totalItens} Unidades
                </strong>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                Equipamentos Chave Cadastrados:
              </h4>
              <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-700/50 leading-relaxed font-mono">
                {selectedAmbiente.Equipamentos_Chave || 'Equipamentos padrão conforme matriz pedagógica.'}
              </p>
            </div>

            {/* Classes using this room */}
            <div className="pt-3 border-t border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Ocupação na Grade Atual ({roomAlocs.length} Aulas/Semana):
              </h4>
              {roomAlocs.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-2 bg-slate-900/40 rounded-lg">
                  Ambiente livre em todos os turnos.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {roomAlocs.map((aloc) => (
                    <div
                      key={aloc.id}
                      className="text-xs p-2 bg-slate-900/70 border border-slate-700/40 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <strong className="text-white block font-mono">{aloc.diaSemana} ({aloc.turno})</strong>
                        <span className="text-[11px] text-slate-400 truncate max-w-[160px] block">
                          {aloc.idSubturma} • {aloc.docenteNome}
                        </span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        {aloc.alunos} alunos
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Asset List of Selected Room */}
          <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  Relação de Bens Patrimoniais ({bensList.length} Tipos de Bens)
                </h3>
                <p className="text-xs text-slate-400">
                  Dados sincronizados com o sistema patrimonial SENAI Araçatuba
                </p>
              </div>

              {/* Search in assets */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filtrar bem por denominação..."
                  value={searchBem}
                  onChange={(e) => setSearchBem(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              </div>
            </div>

            {/* Assets Table */}
            <div className="border border-slate-700/60 rounded-xl overflow-hidden max-h-[550px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-900 border-b border-slate-700 z-10 text-slate-300 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Denominação do Bem Patrimonial</th>
                    <th className="py-2.5 px-3 text-right">Qtd. no Ambiente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bensList.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500">
                        Nenhum bem patrimonial localizado para este filtro.
                      </td>
                    </tr>
                  ) : (
                    bensList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-700/20">
                        <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] w-12">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-200">
                          {item.denominacao}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-400 w-28">
                          {item.quantidade} un.
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
