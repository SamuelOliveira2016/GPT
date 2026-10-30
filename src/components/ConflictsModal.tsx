import React from 'react';
import {
  ConflitoAlocacao,
} from '../utils/academicEngine';
import {
  AlocacaoAula,
} from '../data/senaiData';
import {
  AlertTriangle,
  CheckCircle2,
  X,
  Wand2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface ConflictsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conflitos: ConflitoAlocacao[];
  alocacoes: AlocacaoAula[];
  onSelectAllocationToFix: (aloc: AlocacaoAula) => void;
  onAutoResolveAll: () => void;
}

export const ConflictsModal: React.FC<ConflictsModalProps> = ({
  isOpen,
  onClose,
  conflitos,
  alocacoes,
  onSelectAllocationToFix,
  onAutoResolveAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative my-8 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              conflitos.length > 0
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {conflitos.length > 0 ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {conflitos.length > 0
                  ? `Central de Conflitos Operacionais (${conflitos.length})`
                  : 'Nenhum Conflito Operacional Detectado'}
              </h2>
              <p className="text-xs text-slate-400">
                Auditoria de sobreposição de salas, horários de professores e normas de capacidade do SENAI Araçatuba.
              </p>
            </div>
          </div>

          {conflitos.length > 0 && (
            <button
              onClick={onAutoResolveAll}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition"
            >
              <Wand2 className="w-4 h-4" />
              <span>Resolver Tudo com IA</span>
            </button>
          )}
        </div>

        {/* Conflicts List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {conflitos.length === 0 ? (
            <div className="p-8 text-center bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Grade 100% Homologada & Estável</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Todos os ambientes e docentes respeitam estritamente a matriz de aptidão, sem choque de turnos e sem sobrecarga física nas oficinas e laboratórios.
              </p>
            </div>
          ) : (
            conflitos.map((c) => {
              const involvedAlocs = alocacoes.filter((a) => c.alocacoesEnvolvidas.includes(a.id));

              return (
                <div
                  key={c.id}
                  className="bg-slate-800/80 border border-rose-500/30 rounded-2xl p-4 space-y-3 hover:border-rose-500/50 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
                        {c.tipo.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        {c.diaSemana} • Turno {c.turno} ({c.horario})
                      </span>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-rose-400 font-mono">
                      Gravidade {c.gravidade}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white leading-snug">
                    {c.descricao}
                  </p>

                  <div className="p-2.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-slate-300">
                    <strong className="text-emerald-400 block mb-0.5">Sugestão de Resolução:</strong>
                    {c.sugestao}
                  </div>

                  {/* List of involved allocations with quick fix buttons */}
                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Subturmas afetadas: {involvedAlocs.map((a) => a.idSubturma).join(', ')}
                    </span>

                    <div className="flex gap-2">
                      {involvedAlocs.map((aloc) => (
                        <button
                          key={aloc.id}
                          onClick={() => {
                            onClose();
                            onSelectAllocationToFix(aloc);
                          }}
                          className="bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
                        >
                          <span>Remanejar {aloc.idSubturma.replace(' (Única)', '')}</span>
                          <ArrowRight className="w-3 h-3 text-red-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">
            Regras de pesquisa operacional SENAI Araçatuba 2027
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
