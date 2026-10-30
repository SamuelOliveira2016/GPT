/**
 * SENAI CFP 901 Araçatuba - Motor de Regras e Indicadores Acadêmicos
 * Módulo de lógica pura descolada da UI para cálculo de indicadores de ocupação,
 * detecção de conflitos, geração de mapas de calor e otimização de recursos.
 */

import { AlocacaoAula, Ambiente, Docente, MatrizUC, DiaCalendario } from '../data/senaiData';

export interface AmbienteOccupancyStat {
  ambienteId: string;
  nome: string;
  bloco: string;
  capacidade: number;
  areaTecnologica: string;
  totalAulasSemana: number;
  horasSemana: number; // Cada aula = 4 horas
  taxaOcupacaoPercent: number; // baseado em 10 slots semanais (5 dias x 2 turnos de 4h = 40h)
  mediaAlunosPorAula: number;
  aproveitamentoCapacidadePercent: number; // Alunos alocados / capacidade
  status: 'Ocioso' | 'Baixo' | 'Ideal' | 'Alto' | 'Sobrecarga';
  diasOcupados: { [key: string]: { Manha: boolean; Tarde: boolean } };
}

export interface DocenteOccupancyStat {
  docenteId: string;
  nif: string;
  nomeCurto: string;
  nomeCompleto: string;
  statusAlocacao: string;
  elegivelRegular: boolean;
  totalAulasSemana: number;
  horasSemana: number; // Aulas * 4h
  turnosAtivos: { manha: number; tarde: number; noite: number };
  taxaCargaPercent: number; // Base 40h semanais CLT
  statusCarga: 'Sem Alocação' | 'Subutilizado' | 'Carga Balanceada' | 'Carga Plena' | 'Sobrecarga';
  turmasDistintas: string[];
  ucsMinistradas: string[];
}

export interface ConflitoAlocacao {
  id: string;
  tipo: 'ambiente_duplicado' | 'docente_duplicado' | 'capacidade_excedida' | 'ambiente_nao_homologado';
  gravidade: 'alta' | 'media' | 'baixa';
  diaSemana: string;
  turno: string;
  horario: string;
  descricao: string;
  alocacoesEnvolvidas: string[];
  sugestao: string;
}

export interface CalendarFilters {
  docenteId?: string;
  ambienteId?: string;
  curso?: string;
  turmaId?: string;
  subturmaId?: string;
  turno?: string;
  diaSemana?: string;
  apenasConflitos?: boolean;
  buscaTexto?: string;
}

export interface HeatmapCell {
  key: string;
  diaSemana: string;
  turno: 'Manhã' | 'Tarde';
  ocupado: boolean;
  qtdAlocacoes: number;
  temConflito: boolean;
  alocacoes: AlocacaoAula[];
  taxaUso: number; // 0 a 100
}

export interface HeatmapRow {
  id: string;
  nome: string;
  subtitulo: string;
  grupo: string; // Bloco ou Área
  capacidade?: number;
  cells: HeatmapCell[];
  mediaOcupacao: number;
}

export const DIAS_SEMANA: Array<'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta'> = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'
];

export const TURNOS: Array<'Manhã' | 'Tarde'> = ['Manhã', 'Tarde'];

/**
 * Calcula indicadores de ocupação detalhados por ambiente
 */
export function calculateEnvironmentOccupancy(
  alocacoes: AlocacaoAula[],
  ambientes: Ambiente[]
): AmbienteOccupancyStat[] {
  return ambientes.map((amb) => {
    const alocsDoAmbiente = alocacoes.filter((a) => a.ambienteId === amb.Cod_Localiz);
    const totalAulasSemana = alocsDoAmbiente.length;
    const horasSemana = totalAulasSemana * 4;
    // Base máxima regular semanal: 5 dias x 2 turnos = 10 blocos de 4h = 40h
    const taxaOcupacaoPercent = Math.min(100, Math.round((totalAulasSemana / 10) * 100));

    const totalAlunos = alocsDoAmbiente.reduce((acc, curr) => acc + (curr.alunos || 0), 0);
    const mediaAlunosPorAula = totalAulasSemana > 0 ? Math.round(totalAlunos / totalAulasSemana) : 0;
    const aproveitamentoCapacidadePercent =
      amb.Capacidade_Postos > 0 && totalAulasSemana > 0
        ? Math.round((mediaAlunosPorAula / amb.Capacidade_Postos) * 100)
        : 0;

    let status: AmbienteOccupancyStat['status'] = 'Ocioso';
    if (taxaOcupacaoPercent === 0) status = 'Ocioso';
    else if (taxaOcupacaoPercent < 40) status = 'Baixo';
    else if (taxaOcupacaoPercent <= 80) status = 'Ideal';
    else if (taxaOcupacaoPercent <= 100) status = 'Alto';
    else status = 'Sobrecarga';

    const diasOcupados: { [key: string]: { Manha: boolean; Tarde: boolean } } = {};
    for (const d of DIAS_SEMANA) {
      diasOcupados[d] = {
        Manha: alocsDoAmbiente.some((a) => a.diaSemana === d && a.turno === 'Manhã'),
        Tarde: alocsDoAmbiente.some((a) => a.diaSemana === d && a.turno === 'Tarde'),
      };
    }

    return {
      ambienteId: amb.Cod_Localiz,
      nome: amb.Nome_Ambiente,
      bloco: amb.Bloco,
      capacidade: amb.Capacidade_Postos,
      areaTecnologica: amb.Area_Tecnologica,
      totalAulasSemana,
      horasSemana,
      taxaOcupacaoPercent,
      mediaAlunosPorAula,
      aproveitamentoCapacidadePercent,
      status,
      diasOcupados,
    };
  });
}

/**
 * Calcula indicadores de carga horária e alocação por docente
 */
export function calculateDocenteOccupancy(
  alocacoes: AlocacaoAula[],
  docentes: Docente[]
): DocenteOccupancyStat[] {
  return docentes.map((doc) => {
    const alocsDoDocente = alocacoes.filter(
      (a) => a.docenteId === doc.ID_Docente || a.docenteNome.toUpperCase() === doc.Nome_Curto.toUpperCase()
    );

    const totalAulasSemana = alocsDoDocente.length;
    const horasSemana = totalAulasSemana * 4;

    const turnosAtivos = {
      manha: alocsDoDocente.filter((a) => a.turno === 'Manhã').length,
      tarde: alocsDoDocente.filter((a) => a.turno === 'Tarde').length,
      noite: alocsDoDocente.filter((a) => a.turno === 'Noite').length,
    };

    // Base regular CLT SENAI: 40h semanais
    const taxaCargaPercent = Math.round((horasSemana / 40) * 100);

    let statusCarga: DocenteOccupancyStat['statusCarga'] = 'Sem Alocação';
    if (horasSemana === 0) statusCarga = 'Sem Alocação';
    else if (horasSemana < 20) statusCarga = 'Subutilizado';
    else if (horasSemana <= 36) statusCarga = 'Carga Balanceada';
    else if (horasSemana <= 40) statusCarga = 'Carga Plena';
    else statusCarga = 'Sobrecarga';

    const turmasDistintas = Array.from(new Set(alocsDoDocente.map((a) => a.idTurma)));
    const ucsMinistradas = Array.from(new Set(alocsDoDocente.map((a) => a.uc)));

    return {
      docenteId: doc.ID_Docente,
      nif: doc.NIF,
      nomeCurto: doc.Nome_Curto,
      nomeCompleto: doc.Nome_Completo,
      statusAlocacao: doc.Status_Alocacao,
      elegivelRegular: doc.Elegivel_Cursos_Regulares === 'SIM',
      totalAulasSemana,
      horasSemana,
      turnosAtivos,
      taxaCargaPercent,
      statusCarga,
      turmasDistintas,
      ucsMinistradas,
    };
  });
}

/**
 * Detecção completa de conflitos em tempo real:
 * - Sobreposição de ambiente (mesmo ambiente, dia e turno)
 * - Sobreposição de docente (mesmo docente, dia e turno)
 * - Excesso de capacidade (alunos > capacidade)
 */
export function detectConflicts(
  alocacoes: AlocacaoAula[],
  ambientes: Ambiente[] = []
): ConflitoAlocacao[] {
  const conflitos: ConflitoAlocacao[] = [];
  const ambMap = new Map(ambientes.map((a) => [a.Cod_Localiz, a]));

  // Agrupar por (dia, turno, ambiente)
  const roomSlotMap = new Map<string, AlocacaoAula[]>();
  // Agrupar por (dia, turno, docente)
  const docSlotMap = new Map<string, AlocacaoAula[]>();

  for (const aloc of alocacoes) {
    const roomKey = `${aloc.diaSemana}_${aloc.turno}_${aloc.ambienteId}`;
    if (!roomSlotMap.has(roomKey)) roomSlotMap.set(roomKey, []);
    roomSlotMap.get(roomKey)!.push(aloc);

    const docKey = `${aloc.diaSemana}_${aloc.turno}_${aloc.docenteId || aloc.docenteNome}`;
    if (!docSlotMap.has(docKey)) docSlotMap.set(docKey, []);
    docSlotMap.get(docKey)!.push(aloc);

    // Validação de capacidade
    const amb = ambMap.get(aloc.ambienteId);
    const cap = amb ? amb.Capacidade_Postos : aloc.capacidadeAmbiente;
    if (aloc.alunos > cap && cap > 0) {
      conflitos.push({
        id: `CONF-CAP-${aloc.id}`,
        tipo: 'capacidade_excedida',
        gravidade: 'media',
        diaSemana: aloc.diaSemana,
        turno: aloc.turno,
        horario: aloc.horario,
        descricao: `Subturma ${aloc.idSubturma} possui ${aloc.alunos} alunos para o ambiente ${aloc.ambienteNome} (Capacidade máx: ${cap} postos).`,
        alocacoesEnvolvidas: [aloc.id],
        sugestao: `Remanejar a turma para uma sala com capacidade superior (ex: Sala de Aula 01 ou 02 com 36 lugares).`,
      });
    }
  }

  // Detectar colisões de ambiente
  for (const [key, alocs] of roomSlotMap.entries()) {
    if (alocs.length > 1) {
      const [dia, turno] = key.split('_');
      const ambNome = alocs[0].ambienteNome;
      conflitos.push({
        id: `CONF-ROOM-${key}`,
        tipo: 'ambiente_duplicado',
        gravidade: 'alta',
        diaSemana: dia,
        turno: turno,
        horario: alocs[0].horario,
        descricao: `Conflito de Ambiente: ${ambNome} está ocupado por ${alocs.length} subturmas simultâneas (${alocs.map((a) => a.idSubturma).join(', ')}).`,
        alocacoesEnvolvidas: alocs.map((a) => a.id),
        sugestao: `Remanejar uma das subturmas para um ambiente homologado alternativo no Bloco correspondente.`,
      });
    }
  }

  // Detectar colisões de docente
  for (const [key, alocs] of docSlotMap.entries()) {
    if (alocs.length > 1) {
      const [dia, turno] = key.split('_');
      const docNome = alocs[0].docenteNome;
      conflitos.push({
        id: `CONF-DOC-${key}`,
        tipo: 'docente_duplicado',
        gravidade: 'alta',
        diaSemana: dia,
        turno: turno,
        horario: alocs[0].horario,
        descricao: `Conflito de Docente: ${docNome} está escalado em ${alocs.length} subturmas no mesmo turno (${alocs.map((a) => `${a.idSubturma} em ${a.ambienteNome}`).join(' vs ')}).`,
        alocacoesEnvolvidas: alocs.map((a) => a.id),
        sugestao: `Substituir o docente em uma das subturmas por outro docente habilitado com carga livre.`,
      });
    }
  }

  return conflitos;
}

/**
 * Gera a matriz de mapa de calor por Ambiente ou por Docente
 */
export function generateHeatmapGrid(
  alocacoes: AlocacaoAula[],
  ambientes: Ambiente[],
  docentes: Docente[],
  tipo: 'ambiente' | 'docente',
  filtroGrupo?: string
): HeatmapRow[] {
  const conflitos = detectConflicts(alocacoes, ambientes);
  const alocacoesComConflitoSet = new Set(conflitos.flatMap((c) => c.alocacoesEnvolvidas));

  if (tipo === 'ambiente') {
    let filteredAmbientes = ambientes;
    if (filtroGrupo && filtroGrupo !== 'TODOS') {
      filteredAmbientes = ambientes.filter(
        (a) => a.Bloco.toLowerCase() === filtroGrupo.toLowerCase() || a.Area_Tecnologica.toLowerCase().includes(filtroGrupo.toLowerCase())
      );
    }

    return filteredAmbientes.map((amb) => {
      let totalOcupados = 0;
      const cells: HeatmapCell[] = [];

      for (const dia of DIAS_SEMANA) {
        for (const turno of TURNOS) {
          const matching = alocacoes.filter(
            (a) => a.ambienteId === amb.Cod_Localiz && a.diaSemana === dia && a.turno === turno
          );
          const isOcupado = matching.length > 0;
          if (isOcupado) totalOcupados++;

          const temConf = matching.some((m) => alocacoesComConflitoSet.has(m.id)) || matching.length > 1;

          cells.push({
            key: `${amb.Cod_Localiz}_${dia}_${turno}`,
            diaSemana: dia,
            turno,
            ocupado: isOcupado,
            qtdAlocacoes: matching.length,
            temConflito: temConf,
            alocacoes: matching,
            taxaUso: matching.length > 0 ? Math.min(100, matching.length * 100) : 0,
          });
        }
      }

      const mediaOcupacao = Math.round((totalOcupados / 10) * 100);

      return {
        id: amb.Cod_Localiz,
        nome: amb.Nome_Ambiente,
        subtitulo: `${amb.Bloco} • Cap: ${amb.Capacidade_Postos} postos`,
        grupo: amb.Bloco,
        capacidade: amb.Capacidade_Postos,
        cells,
        mediaOcupacao,
      };
    });
  } else {
    // Tipo: Docente
    let filteredDocentes = docentes.filter((d) => d.Elegivel_Cursos_Regulares === 'SIM' || d.Status_Alocacao.includes('Regular'));
    if (filtroGrupo && filtroGrupo !== 'TODOS') {
      filteredDocentes = docentes.filter(
        (d) => d.Status_Alocacao.toLowerCase().includes(filtroGrupo.toLowerCase()) || d.Turnos_Atuacao_Regular.toLowerCase().includes(filtroGrupo.toLowerCase())
      );
    }

    return filteredDocentes.map((doc) => {
      let totalOcupados = 0;
      const cells: HeatmapCell[] = [];

      for (const dia of DIAS_SEMANA) {
        for (const turno of TURNOS) {
          const matching = alocacoes.filter(
            (a) => (a.docenteId === doc.ID_Docente || a.docenteNome.toUpperCase() === doc.Nome_Curto.toUpperCase()) &&
                   a.diaSemana === dia && a.turno === turno
          );
          const isOcupado = matching.length > 0;
          if (isOcupado) totalOcupados++;

          const temConf = matching.some((m) => alocacoesComConflitoSet.has(m.id)) || matching.length > 1;

          cells.push({
            key: `${doc.ID_Docente}_${dia}_${turno}`,
            diaSemana: dia,
            turno,
            ocupado: isOcupado,
            qtdAlocacoes: matching.length,
            temConflito: temConf,
            alocacoes: matching,
            taxaUso: matching.length > 0 ? Math.min(100, matching.length * 100) : 0,
          });
        }
      }

      const mediaOcupacao = Math.round((totalOcupados / 10) * 100);

      return {
        id: doc.ID_Docente,
        nome: doc.Nome_Curto,
        subtitulo: `${doc.Nome_Completo} • NIF: ${doc.NIF}`,
        grupo: doc.Turnos_Atuacao_Regular,
        cells,
        mediaOcupacao,
      };
    });
  }
}

/**
 * Filtro avançado e pesquisa para visualização de calendário
 */
export function filterAllocations(
  alocacoes: AlocacaoAula[],
  filters: CalendarFilters,
  conflitos: ConflitoAlocacao[] = []
): AlocacaoAula[] {
  const alocacoesComConflitoSet = new Set(conflitos.flatMap((c) => c.alocacoesEnvolvidas));

  return alocacoes.filter((a) => {
    if (filters.docenteId && filters.docenteId !== 'TODOS') {
      if (a.docenteId !== filters.docenteId && a.docenteNome.toUpperCase() !== filters.docenteId.toUpperCase()) {
        return false;
      }
    }
    if (filters.ambienteId && filters.ambienteId !== 'TODOS') {
      if (a.ambienteId !== filters.ambienteId) return false;
    }
    if (filters.curso && filters.curso !== 'TODOS') {
      if (!a.curso.toLowerCase().includes(filters.curso.toLowerCase())) return false;
    }
    if (filters.turmaId && filters.turmaId !== 'TODOS') {
      if (a.idTurma !== filters.turmaId) return false;
    }
    if (filters.subturmaId && filters.subturmaId !== 'TODOS') {
      if (a.idSubturma !== filters.subturmaId) return false;
    }
    if (filters.turno && filters.turno !== 'TODOS') {
      if (a.turno !== filters.turno) return false;
    }
    if (filters.diaSemana && filters.diaSemana !== 'TODOS') {
      if (a.diaSemana !== filters.diaSemana) return false;
    }
    if (filters.apenasConflitos) {
      if (!alocacoesComConflitoSet.has(a.id)) return false;
    }
    if (filters.buscaTexto && filters.buscaTexto.trim() !== '') {
      const q = filters.buscaTexto.toLowerCase();
      const match =
        a.idSubturma.toLowerCase().includes(q) ||
        a.curso.toLowerCase().includes(q) ||
        a.uc.toLowerCase().includes(q) ||
        a.docenteNome.toLowerCase().includes(q) ||
        a.ambienteNome.toLowerCase().includes(q) ||
        a.bloco.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

/**
 * Otimizador Heurístico Automático:
 * Resolve conflitos automaticamente reatribuindo para salas homologadas livres,
 * salas com capacidade compatível e docentes habilitados disponíveis.
 */
export function optimizeAcademicSchedule(
  alocacoes: AlocacaoAula[],
  ambientes: Ambiente[],
  ucs: MatrizUC[],
  docentes: Docente[]
): { optimized: AlocacaoAula[]; mudancasRealizadas: number; relatorioMudancas: string[] } {
  const alocs = alocacoes.map((a) => ({ ...a }));
  let mudancasCount = 0;
  const relatorio: string[] = [];

  const ambMap = new Map(ambientes.map((a) => [a.Cod_Localiz, a]));

  // 1. Resolver excesso de capacidade
  for (const aloc of alocs) {
    const amb = ambMap.get(aloc.ambienteId);
    const cap = amb ? amb.Capacidade_Postos : aloc.capacidadeAmbiente;
    if (aloc.alunos > cap && cap > 0) {
      // Encontrar sala compatível com capacidade suficiente que esteja livre
      const matchingUC = ucs.find(
        (u) => u.Unidade_Curricular.toLowerCase().trim() === aloc.uc.toLowerCase().trim()
      );

      const candidateRooms: Ambiente[] = [];
      if (matchingUC) {
        for (const h of matchingUC.Ambientes_Homologados) {
          const found = ambientes.find(
            (a) => a.Nome_Ambiente.toLowerCase().includes(h.toLowerCase()) || h.toLowerCase().includes(a.Nome_Ambiente.toLowerCase())
          );
          if (found && found.Capacidade_Postos >= aloc.alunos) {
            candidateRooms.push(found);
          }
        }
      }

      // Adicionar salas gerais com capacidade >= alunos
      for (const a of ambientes) {
        if (a.Capacidade_Postos >= aloc.alunos && !candidateRooms.some((c) => c.Cod_Localiz === a.Cod_Localiz)) {
          candidateRooms.push(a);
        }
      }

      for (const candidate of candidateRooms) {
        const isFree = !alocs.some(
          (other) =>
            other.id !== aloc.id &&
            other.ambienteId === candidate.Cod_Localiz &&
            other.diaSemana === aloc.diaSemana &&
            other.turno === aloc.turno
        );

        if (isFree) {
          relatorio.push(
            `Ajustada capacidade de ${aloc.idSubturma}: transferido de "${aloc.ambienteNome}" (${cap} postos) para "${candidate.Nome_Ambiente}" (${candidate.Capacidade_Postos} postos).`
          );
          aloc.ambienteId = candidate.Cod_Localiz;
          aloc.ambienteNome = candidate.Nome_Ambiente;
          aloc.bloco = candidate.Bloco;
          aloc.capacidadeAmbiente = candidate.Capacidade_Postos;
          mudancasCount++;
          break;
        }
      }
    }
  }

  // 2. Resolver colisões de ambiente (sobreposições no mesmo dia e turno)
  for (let pass = 0; pass < 5; pass++) {
    const roomMap = new Map<string, AlocacaoAula[]>();
    for (const a of alocs) {
      const k = `${a.diaSemana}_${a.turno}_${a.ambienteId}`;
      if (!roomMap.has(k)) roomMap.set(k, []);
      roomMap.get(k)!.push(a);
    }

    let passChanges = 0;

    for (const [, group] of roomMap.entries()) {
      if (group.length > 1) {
        // Ordenar com turmas maiores primeiro: a turma maior permanece no ambiente original,
        // enquanto as turmas menores (com mais opções de salas) são remanejadas
        group.sort((a, b) => b.alunos - a.alunos);

        for (let i = 1; i < group.length; i++) {
          const conflictAloc = group[i];
          const matchingUC = ucs.find(
            (u) => u.Unidade_Curricular.toLowerCase().trim() === conflictAloc.uc.toLowerCase().trim()
          );

          const candidateRooms: Ambiente[] = [];

          // 1º: Ambientes homologados da própria UC
          if (matchingUC) {
            for (const h of matchingUC.Ambientes_Homologados) {
              const found = ambientes.find(
                (a) => a.Nome_Ambiente.toLowerCase().includes(h.toLowerCase()) || h.toLowerCase().includes(a.Nome_Ambiente.toLowerCase())
              );
              if (found && found.Cod_Localiz !== conflictAloc.ambienteId) {
                candidateRooms.push(found);
              }
            }
          }

          // 2º: Ambientes da mesma área tecnológica ou salas de aula gerais
          const currentAmb = ambMap.get(conflictAloc.ambienteId);
          if (currentAmb) {
            for (const a of ambientes) {
              if (
                a.Cod_Localiz !== conflictAloc.ambienteId &&
                !candidateRooms.some((c) => c.Cod_Localiz === a.Cod_Localiz) &&
                (a.Area_Tecnologica === currentAmb.Area_Tecnologica ||
                  a.Nome_Ambiente.toLowerCase().includes('sala de aula') ||
                  a.Nome_Ambiente.toLowerCase().includes('informática'))
              ) {
                candidateRooms.push(a);
              }
            }
          }

          // Testar candidatos livres
          for (const cand of candidateRooms) {
            if (cand.Capacidade_Postos >= conflictAloc.alunos) {
              const isFree = !alocs.some(
                (other) =>
                  other.id !== conflictAloc.id &&
                  other.ambienteId === cand.Cod_Localiz &&
                  other.diaSemana === conflictAloc.diaSemana &&
                  other.turno === conflictAloc.turno
              );

              if (isFree) {
                relatorio.push(
                  `Conflito resolvido: ${conflictAloc.idSubturma} remanejada de "${conflictAloc.ambienteNome}" para "${cand.Nome_Ambiente}" (${conflictAloc.diaSemana} - ${conflictAloc.turno}).`
                );
                conflictAloc.ambienteId = cand.Cod_Localiz;
                conflictAloc.ambienteNome = cand.Nome_Ambiente;
                conflictAloc.bloco = cand.Bloco;
                conflictAloc.capacidadeAmbiente = cand.Capacidade_Postos;
                mudancasCount++;
                passChanges++;
                break;
              }
            }
          }
        }
      }
    }

    if (passChanges === 0) break;
  }

  // 3. Resolver colisões de docente (mesmo docente em 2 turmas no mesmo horário)
  for (let pass = 0; pass < 5; pass++) {
    const docMap = new Map<string, AlocacaoAula[]>();
    for (const a of alocs) {
      const k = `${a.diaSemana}_${a.turno}_${a.docenteId}`;
      if (!docMap.has(k)) docMap.set(k, []);
      docMap.get(k)!.push(a);
    }

    let passChanges = 0;

    for (const [, group] of docMap.entries()) {
      if (group.length > 1) {
        for (let i = 1; i < group.length; i++) {
          const conflictAloc = group[i];
          const matchingUC = ucs.find(
            (u) => u.Unidade_Curricular.toLowerCase().trim() === conflictAloc.uc.toLowerCase().trim()
          );

          const candidateDocs: Docente[] = [];

          if (matchingUC) {
            for (const h of matchingUC.Docentes_Habilitados) {
              const found = docentes.find(
                (d) =>
                  d.Nome_Curto.toUpperCase() === h.toUpperCase() ||
                  d.Nome_Completo.toUpperCase().includes(h.toUpperCase())
              );
              if (found && found.ID_Docente !== conflictAloc.docenteId && found.Elegivel_Cursos_Regulares === 'SIM') {
                candidateDocs.push(found);
              }
            }
          }

          // Docentes regulares disponíveis
          for (const d of docentes) {
            if (
              d.Elegivel_Cursos_Regulares === 'SIM' &&
              d.ID_Docente !== conflictAloc.docenteId &&
              !candidateDocs.some((c) => c.ID_Docente === d.ID_Docente)
            ) {
              candidateDocs.push(d);
            }
          }

          for (const cand of candidateDocs) {
            const isFree = !alocs.some(
              (other) =>
                other.id !== conflictAloc.id &&
                other.docenteId === cand.ID_Docente &&
                other.diaSemana === conflictAloc.diaSemana &&
                other.turno === conflictAloc.turno
            );

            if (isFree) {
              relatorio.push(
                `Substituição docente: ${conflictAloc.idSubturma} transferida de "${conflictAloc.docenteNome}" para "${cand.Nome_Curto}" (${conflictAloc.diaSemana} - ${conflictAloc.turno}).`
              );
              conflictAloc.docenteId = cand.ID_Docente;
              conflictAloc.docenteNome = cand.Nome_Curto;
              conflictAloc.docenteNomeCompleto = cand.Nome_Completo;
              conflictAloc.docenteNif = cand.NIF;
              mudancasCount++;
              passChanges++;
              break;
            }
          }
        }
      }
    }

    if (passChanges === 0) break;
  }

  return {
    optimized: alocs,
    mudancasRealizadas: mudancasCount,
    relatorioMudancas: relatorio,
  };
}

/**
 * Resumo Geral Executivo para Cards do Topo
 */
export function calculateExecutiveKPIs(
  alocacoes: AlocacaoAula[],
  ambientes: Ambiente[],
  docentes: Docente[]
) {
  const envStats = calculateEnvironmentOccupancy(alocacoes, ambientes);
  const docStats = calculateDocenteOccupancy(alocacoes, docentes);
  const conflitos = detectConflicts(alocacoes, ambientes);

  // Taxa média de ocupação dos ambientes
  const taxaMediaAmbientes =
    envStats.length > 0
      ? Math.round(envStats.reduce((acc, curr) => acc + curr.taxaOcupacaoPercent, 0) / envStats.length)
      : 0;

  // Docentes ativos (com pelo menos 1 aula)
  const docentesAtivos = docStats.filter((d) => d.totalAulasSemana > 0);
  const mediaHorasDocentesAtivos =
    docentesAtivos.length > 0
      ? Math.round(docentesAtivos.reduce((acc, curr) => acc + curr.horasSemana, 0) / docentesAtivos.length)
      : 0;

  const docentesSobrecarga = docStats.filter((d) => d.statusCarga === 'Sobrecarga').length;
  const docentesSubutilizados = docStats.filter((d) => d.elegivelRegular && d.statusCarga === 'Subutilizado').length;

  const ambientesOciosos = envStats.filter((e) => e.status === 'Ocioso').length;
  const ambientesSobrecarga = envStats.filter((e) => e.status === 'Sobrecarga').length;

  const totalAulasSemana = alocacoes.length;
  const totalHorasSemana = totalAulasSemana * 4;

  return {
    taxaMediaAmbientes,
    docentesAtivosCount: docentesAtivos.length,
    totalDocentesCadastrados: docentes.length,
    mediaHorasDocentesAtivos,
    docentesSobrecarga,
    docentesSubutilizados,
    ambientesOciosos,
    ambientesSobrecarga,
    totalAmbientes: ambientes.length,
    totalAulasSemana,
    totalHorasSemana,
    totalConflitos: conflitos.length,
    conflitosAlta: conflitos.filter((c) => c.gravidade === 'alta').length,
  };
}

/**
 * Sincroniza as Unidades Curriculares quando um docente é criado ou editado,
 * garantindo que a lista Docentes_Habilitados de cada UC reflita a aptidão do docente.
 */
export function syncDocenteWithUCs(docente: Docente, ucs: MatrizUC[]): MatrizUC[] {
  const docNome = docente.Nome_Curto.trim().toUpperCase();
  const ucsHabilitadasSet = new Set(docente.ucsHabilitadas.map((u) => u.trim().toLowerCase()));

  return ucs.map((uc) => {
    const ucNomeLower = uc.Unidade_Curricular.trim().toLowerCase();
    const isDocHabilitadoParaEstaUC = ucsHabilitadasSet.has(ucNomeLower);

    const habList = [...uc.Docentes_Habilitados];
    const index = habList.findIndex((h) => h.trim().toUpperCase() === docNome);

    if (isDocHabilitadoParaEstaUC && index === -1) {
      // Adicionar docente à lista de habilitados da UC
      return {
        ...uc,
        Docentes_Habilitados: [...habList, docente.Nome_Curto],
      };
    } else if (!isDocHabilitadoParaEstaUC && index !== -1) {
      // Remover docente da lista de habilitados da UC
      return {
        ...uc,
        Docentes_Habilitados: habList.filter((_, idx) => idx !== index),
      };
    }

    return uc;
  });
}

/**
 * Remove completamente um docente das listas de habilitados de todas as UCs
 */
export function removeDocenteFromUCs(docenteNomeCurto: string, ucs: MatrizUC[]): MatrizUC[] {
  const nomeUpper = docenteNomeCurto.trim().toUpperCase();
  return ucs.map((uc) => ({
    ...uc,
    Docentes_Habilitados: uc.Docentes_Habilitados.filter(
      (h) => h.trim().toUpperCase() !== nomeUpper
    ),
  }));
}

/**
 * Verifica se um docente está apto a ministrar determinada UC
 */
export function isDocenteAptoParaUC(docente: Docente, uc: MatrizUC): boolean {
  if (docente.ucsHabilitadas && docente.ucsHabilitadas.length > 0) {
    const ucLower = uc.Unidade_Curricular.trim().toLowerCase();
    return docente.ucsHabilitadas.some((u) => u.trim().toLowerCase() === ucLower);
  }
  const nomeUpper = docente.Nome_Curto.trim().toUpperCase();
  return uc.Docentes_Habilitados.some((h) => h.trim().toUpperCase() === nomeUpper);
}

