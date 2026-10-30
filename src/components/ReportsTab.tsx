import React, { useState } from 'react';
import {
  AlocacaoAula,
  Ambiente,
  Docente,
  Turma,
  Subturma,
  MatrizUC,
} from '../data/senaiData';
import {
  calculateEnvironmentOccupancy,
  calculateDocenteOccupancy,
  calculateExecutiveKPIs,
} from '../utils/academicEngine';
import {
  FileSpreadsheet,
  Download,
  Printer,
  TrendingUp,
  School,
  Users,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowDownToLine,
  Filter,
} from 'lucide-react';

interface ReportsTabProps {
  alocacoes: AlocacaoAula[];
  ambientes: Ambiente[];
  docentes: Docente[];
  turmas: Turma[];
  subturmas: Subturma[];
  ucs: MatrizUC[];
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  alocacoes,
  ambientes,
  docentes,
  turmas,
  subturmas,
  ucs,
}) => {
  const [activeReport, setActiveReport] = useState<'ambientes' | 'docentes' | 'diagnostico'>('ambientes');

  const envStats = calculateEnvironmentOccupancy(alocacoes, ambientes);
  const docStats = calculateDocenteOccupancy(alocacoes, docentes);
  const kpis = calculateExecutiveKPIs(alocacoes, ambientes, docentes);

  // Helper to trigger CSV download
  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export full allocations CSV
  const handleExportFullAllocations = () => {
    const headers = [
      'ID_Alocacao',
      'ID_Turma',
      'ID_Subturma',
      'Curso',
      'Termo',
      'Turno',
      'Horario',
      'Dia_Semana',
      'Unidade_Curricular',
      'Carga_Horaria_UC',
      'Cod_Ambiente',
      'Nome_Ambiente',
      'Bloco',
      'Capacidade_Ambiente',
      'Qtd_Alunos',
      'Docente_Nome',
      'Docente_NIF',
    ];

    const rows = alocacoes.map((a) => [
      a.id,
      `"${a.idTurma}"`,
      `"${a.idSubturma}"`,
      `"${a.curso}"`,
      `"${a.termo}"`,
      a.turno,
      `"${a.horario}"`,
      a.diaSemana,
      `"${a.uc}"`,
      a.cargaHorariaUC,
      a.ambienteId,
      `"${a.ambienteNome}"`,
      `"${a.bloco}"`,
      a.capacidadeAmbiente,
      a.alunos,
      `"${a.docenteNome}"`,
      a.docenteNif,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csvContent, 'SENAI_Aracatuba_2027_Alocacoes_Completas.csv');
  };

  // Export environments report CSV
  const handleExportEnvReport = () => {
    const headers = [
      'Cod_Ambiente',
      'Nome_Ambiente',
      'Bloco',
      'Area_Tecnologica',
      'Capacidade_Postos',
      'Aulas_Semana',
      'Horas_Ocupadas_Semana',
      'Horas_Ociosas_Semana',
      'Taxa_Ocupacao_Percent',
      'Status_Eficiencia',
    ];

    const rows = envStats.map((e) => [
      e.ambienteId,
      `"${e.nome}"`,
      `"${e.bloco}"`,
      `"${e.areaTecnologica}"`,
      e.capacidade,
      e.totalAulasSemana,
      e.horasSemana,
      40 - e.horasSemana,
      `${e.taxaOcupacaoPercent}%`,
      e.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csvContent, 'SENAI_Aracatuba_2027_Relatorio_Ambientes.csv');
  };

  // Export teachers report CSV
  const handleExportDocReport = () => {
    const headers = [
      'ID_Docente',
      'NIF',
      'Nome_Curto',
      'Nome_Completo',
      'Status_Alocacao',
      'Elegivel_Regular',
      'Aulas_Semana',
      'Horas_Semana',
      'Percentual_Carga_40h',
      'Status_Carga',
      'Turmas_Atendidas',
    ];

    const rows = docStats.map((d) => [
      d.docenteId,
      d.nif,
      `"${d.nomeCurto}"`,
      `"${d.nomeCompleto}"`,
      `"${d.statusAlocacao}"`,
      d.elegivelRegular ? 'SIM' : 'NÃO',
      d.totalAulasSemana,
      d.horasSemana,
      `${d.taxaCargaPercent}%`,
      d.statusCarga,
      `"${d.turmasDistintas.join('; ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csvContent, 'SENAI_Aracatuba_2027_Relatorio_Docentes.csv');
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Controls Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-red-600/20 text-red-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Auditoria & Inteligência Pedagógica
            </span>
            <span className="text-xs text-slate-400 font-mono">CFP 901 Araçatuba</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Relatórios Detalhados para Otimização de Recursos
          </h2>
        </div>

        {/* Export & Print Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={handleExportFullAllocations}
            className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-xs font-semibold border border-slate-600 transition"
            title="Download da grade completa em CSV"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar Grade CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/60 max-w-2xl">
        <button
          onClick={() => setActiveReport('ambientes')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeReport === 'ambientes'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Ocupação de Espaços
        </button>

        <button
          onClick={() => setActiveReport('docentes')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeReport === 'docentes'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Carga Docente
        </button>

        <button
          onClick={() => setActiveReport('diagnostico')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeReport === 'diagnostico'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Diagnóstico Estratégico
        </button>
      </div>

      {/* REPORT 1: AMBIENTES */}
      {activeReport === 'ambientes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">
              Taxa de ocupação calculada sobre 10 turnos semanais (Segunda a Sexta, Manhã e Tarde = 40 horas).
            </p>
            <button
              onClick={handleExportEnvReport}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Baixar Tabela em CSV
            </button>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-700 text-slate-300 font-semibold">
                    <th className="py-3 px-3.5">Ambiente</th>
                    <th className="py-3 px-3.5">Bloco</th>
                    <th className="py-3 px-3.5">Área Tecnológica</th>
                    <th className="py-3 px-3.5 text-center">Capacidade</th>
                    <th className="py-3 px-3.5 text-center">Horas em Uso</th>
                    <th className="py-3 px-3.5 text-center">Horas Ociosas</th>
                    <th className="py-3 px-3.5 text-center">Taxa Ocup.</th>
                    <th className="py-3 px-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {envStats.map((amb) => {
                    let statusBg = 'bg-slate-700/30 text-slate-400';
                    if (amb.status === 'Ideal') statusBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                    else if (amb.status === 'Alto') statusBg = 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
                    else if (amb.status === 'Sobrecarga') statusBg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold';
                    else if (amb.status === 'Ocioso') statusBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';

                    return (
                      <tr key={amb.ambienteId} className="hover:bg-slate-700/30 transition">
                        <td className="py-3 px-3.5 font-semibold text-white">
                          {amb.nome}
                        </td>
                        <td className="py-3 px-3.5 text-slate-300">{amb.bloco}</td>
                        <td className="py-3 px-3.5 text-slate-400">{amb.areaTecnologica}</td>
                        <td className="py-3 px-3.5 text-center font-mono text-slate-300">
                          {amb.capacidade} postos
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-white">
                          {amb.horasSemana}h
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono text-slate-400">
                          {40 - amb.horasSemana}h
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-extrabold text-cyan-400">
                          {amb.taxaOcupacaoPercent}%
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${statusBg}`}>
                            {amb.status}
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

      {/* REPORT 2: DOCENTES */}
      {activeReport === 'docentes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">
              Carga horária semanal individual comparada à base CLT integral (40 horas semanais).
            </p>
            <button
              onClick={handleExportDocReport}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Baixar Docentes em CSV
            </button>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-700 text-slate-300 font-semibold">
                    <th className="py-3 px-3.5">Docente</th>
                    <th className="py-3 px-3.5">NIF</th>
                    <th className="py-3 px-3.5">Categoria / Status</th>
                    <th className="py-3 px-3.5 text-center">Aulas / Sem</th>
                    <th className="py-3 px-3.5 text-center">Carga Total</th>
                    <th className="py-3 px-3.5 text-center">% Jornada (40h)</th>
                    <th className="py-3 px-3.5 text-center">Status Carga</th>
                    <th className="py-3 px-3.5">Turmas Atendidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {docStats.map((doc) => {
                    let statusBg = 'bg-slate-700/30 text-slate-400';
                    if (doc.statusCarga === 'Carga Balanceada' || doc.statusCarga === 'Carga Plena') {
                      statusBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                    } else if (doc.statusCarga === 'Sobrecarga') {
                      statusBg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold';
                    } else if (doc.statusCarga === 'Subutilizado') {
                      statusBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
                    }

                    return (
                      <tr key={doc.docenteId} className="hover:bg-slate-700/30 transition">
                        <td className="py-3 px-3.5 font-semibold text-white">
                          <div>{doc.nomeCurto}</div>
                          <div className="text-[10px] text-slate-400">{doc.nomeCompleto}</div>
                        </td>
                        <td className="py-3 px-3.5 font-mono text-slate-400">{doc.nif}</td>
                        <td className="py-3 px-3.5 text-slate-300 max-w-[160px] truncate" title={doc.statusAlocacao}>
                          {doc.statusAlocacao}
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono text-slate-300">
                          {doc.totalAulasSemana}
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-white">
                          {doc.horasSemana}h
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-extrabold text-cyan-400">
                          {doc.taxaCargaPercent}%
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${statusBg}`}>
                            {doc.statusCarga}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-slate-300 text-[11px] max-w-[200px] truncate" title={doc.turmasDistintas.join(', ')}>
                          {doc.turmasDistintas.length > 0 ? doc.turmasDistintas.join(', ') : 'Nenhuma turma'}
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

      {/* REPORT 3: DIAGNÓSTICO ESTRATÉGICO */}
      {activeReport === 'diagnostico' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Oportunidade 1: Ociosidade */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Otimização de Espaços Ociosos
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Foram identificados <strong className="text-amber-300">{kpis.ambientesOciosos} ambientes</strong> com ocupação menor ou igual a 30%.
                Espaços como salas de aula teóricas nos períodos da tarde possuem capacidade ociosa que pode absorver turmas de Formação Inicial e Continuada (FIC) ou treinamentos empresariais.
              </p>
            </div>

            {/* Oportunidade 2: Reserva Técnica */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Equilíbrio de Carga Docente
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A média geral de docentes em atividade é de <strong className="text-emerald-300">{kpis.mediaHorasDocentesAtivos}h semanais</strong>.
                {kpis.docentesSobrecarga > 0 ? (
                  <span className="text-rose-300">
                    {' '}Atenção para {kpis.docentesSobrecarga} docente(s) com mais de 40h/semana que requerem redistribuição de unidades curriculares.
                  </span>
                ) : (
                  <span> Nenhum docente do quadro regular ultrapassa a barreira CLT de 40h semanais.</span>
                )}
              </p>
            </div>

            {/* Oportunidade 3: Laboratórios Críticos */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Laboratórios de Alta Pressão
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                As Oficinas de Tornearia, Eletricidade e Laboratórios de Informática atingem pico de uso no turno matutino.
                A divisão em subturmas de 16 alunos garante conformidade com as normas NR-12 e preserva a integridade física dos postos de trabalho.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
