import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEnvironmentOccupancy,
  calculateDocenteOccupancy,
  detectConflicts,
  generateHeatmapGrid,
  filterAllocations,
  optimizeAcademicSchedule,
  calculateExecutiveKPIs,
  syncDocenteWithUCs,
  removeDocenteFromUCs,
} from './academicEngine';
import {
  SENAI_AMBIENTES,
  SENAI_DOCENTES,
  SENAI_UCS,
  INITIAL_ALOCACOES,
  AlocacaoAula,
} from '../data/senaiData';

test('calculateEnvironmentOccupancy calculates correct stats', () => {
  const stats = calculateEnvironmentOccupancy(INITIAL_ALOCACOES, SENAI_AMBIENTES);
  assert.equal(stats.length, SENAI_AMBIENTES.length);

  // Each stat must have non-negative hours and valid status
  for (const s of stats) {
    assert.ok(s.horasSemana >= 0);
    assert.ok(s.taxaOcupacaoPercent >= 0 && s.taxaOcupacaoPercent <= 100);
    assert.ok(['Ocioso', 'Baixo', 'Ideal', 'Alto', 'Sobrecarga'].includes(s.status));
    assert.equal(s.totalAulasSemana * 4, s.horasSemana);
  }
});

test('calculateDocenteOccupancy calculates load and weekly hours', () => {
  const stats = calculateDocenteOccupancy(INITIAL_ALOCACOES, SENAI_DOCENTES);
  assert.equal(stats.length, SENAI_DOCENTES.length);

  for (const s of stats) {
    assert.ok(s.horasSemana >= 0);
    assert.equal(s.totalAulasSemana * 4, s.horasSemana);
    assert.ok(['Sem Alocação', 'Subutilizado', 'Carga Balanceada', 'Carga Plena', 'Sobrecarga'].includes(s.statusCarga));
  }
});

test('detectConflicts identifies room collision, teacher collision, and capacity overflow', () => {
  const dummyAmbientes = [
    {
      Cod_Localiz: 'AMB-TEST-1',
      Nome_Ambiente: 'Sala Teste 1',
      Bloco: 'Bloco 01',
      Capacidade_Postos: 15,
      Area_Tecnologica: 'Geral',
      Equipamentos_Chave: 'Projetor',
    },
  ];

  // Create intentional collisions
  const testAlocs: AlocacaoAula[] = [
    {
      id: 'A1',
      idTurma: 'T1',
      idSubturma: 'T1-A',
      curso: 'Curso A',
      termo: '1º',
      turno: 'Manhã',
      horario: '07:30 - 11:30',
      diaSemana: 'Segunda',
      diaSemanaNum: 1,
      uc: 'UC 1',
      cargaHorariaUC: 80,
      ambienteId: 'AMB-TEST-1',
      ambienteNome: 'Sala Teste 1',
      bloco: 'Bloco 01',
      capacidadeAmbiente: 15,
      alunos: 16, // Exceeds capacity 15!
      docenteId: 'DOC-1',
      docenteNome: 'PROF A',
      docenteNomeCompleto: 'Professor A',
      docenteNif: '123',
      pesoAfinidade: 30,
    },
    {
      id: 'A2',
      idTurma: 'T2',
      idSubturma: 'T2-A',
      curso: 'Curso B',
      termo: '1º',
      turno: 'Manhã',
      horario: '07:30 - 11:30',
      diaSemana: 'Segunda', // Same day and shift!
      diaSemanaNum: 1,
      uc: 'UC 2',
      cargaHorariaUC: 80,
      ambienteId: 'AMB-TEST-1', // Same room collision!
      ambienteNome: 'Sala Teste 1',
      bloco: 'Bloco 01',
      capacidadeAmbiente: 15,
      alunos: 10,
      docenteId: 'DOC-1', // Same teacher collision!
      docenteNome: 'PROF A',
      docenteNomeCompleto: 'Professor A',
      docenteNif: '123',
      pesoAfinidade: 30,
    },
  ];

  const conflicts = detectConflicts(testAlocs, dummyAmbientes);
  assert.ok(conflicts.length >= 3);

  const roomColl = conflicts.find((c) => c.tipo === 'ambiente_duplicado');
  assert.ok(roomColl, 'Should detect room duplicate collision');

  const docColl = conflicts.find((c) => c.tipo === 'docente_duplicado');
  assert.ok(docColl, 'Should detect teacher duplicate collision');

  const capColl = conflicts.find((c) => c.tipo === 'capacidade_excedida');
  assert.ok(capColl, 'Should detect capacity exceeded');
});

test('generateHeatmapGrid builds matrix with 10 slots per item', () => {
  const ambGrid = generateHeatmapGrid(INITIAL_ALOCACOES, SENAI_AMBIENTES, SENAI_DOCENTES, 'ambiente');
  assert.equal(ambGrid.length, SENAI_AMBIENTES.length);
  assert.equal(ambGrid[0].cells.length, 10); // 5 days x 2 shifts

  const docGrid = generateHeatmapGrid(INITIAL_ALOCACOES, SENAI_AMBIENTES, SENAI_DOCENTES, 'docente');
  assert.ok(docGrid.length > 0);
  assert.equal(docGrid[0].cells.length, 10);
});

test('filterAllocations filters by teacher, room, and search query', () => {
  const filteredDoc = filterAllocations(INITIAL_ALOCACOES, { docenteId: 'DOC04' });
  for (const a of filteredDoc) {
    assert.ok(a.docenteId === 'DOC04' || a.docenteNome.toUpperCase() === 'FERRARESE');
  }

  const filteredSearch = filterAllocations(INITIAL_ALOCACOES, { buscaTexto: 'Usinagem' });
  for (const a of filteredSearch) {
    const text = `${a.idSubturma} ${a.curso} ${a.uc} ${a.ambienteNome}`.toLowerCase();
    assert.ok(text.includes('usinagem'));
  }
});

test('optimizeAcademicSchedule resolves 100% of initial conflicts', () => {
  const initialConflicts = detectConflicts(INITIAL_ALOCACOES, SENAI_AMBIENTES);
  assert.ok(initialConflicts.length > 0);

  const result = optimizeAcademicSchedule(INITIAL_ALOCACOES, SENAI_AMBIENTES, SENAI_UCS, SENAI_DOCENTES);
  assert.ok(result.mudancasRealizadas > 0);

  const remaining = detectConflicts(result.optimized, SENAI_AMBIENTES);
  assert.equal(remaining.length, 0, 'Should resolve all conflicts completely');
});

test('syncDocenteWithUCs and removeDocenteFromUCs update UC habilitados properly', () => {
  const newDoc = {
    ID_Docente: 'DOC99',
    NIF: '999999',
    Nome_Curto: 'TESTE_NOVO',
    Nome_Completo: 'Professor Teste Novo',
    Email: 'teste@sp.senai.br',
    Status_Alocacao: 'Quadro Regular',
    Elegivel_Cursos_Regulares: 'SIM',
    Turnos_Atuacao_Regular: 'Manhã, Tarde',
    Turnos_Declarados_Formulario: 'Manhã',
    Disponivel_FIC_Noturno: 'SIM',
    Qtd_UCs_Habilitadas: 1,
    Cursos_Com_Aptidao: 'TI',
    ucsHabilitadas: [SENAI_UCS[0].Unidade_Curricular],
  };

  const syncedUCs = syncDocenteWithUCs(newDoc, SENAI_UCS);
  const targetUC = syncedUCs.find((u) => u.Unidade_Curricular === SENAI_UCS[0].Unidade_Curricular);
  assert.ok(targetUC?.Docentes_Habilitados.includes('TESTE_NOVO'));

  const removedUCs = removeDocenteFromUCs('TESTE_NOVO', syncedUCs);
  const targetUCAfterRemove = removedUCs.find((u) => u.Unidade_Curricular === SENAI_UCS[0].Unidade_Curricular);
  assert.ok(!targetUCAfterRemove?.Docentes_Habilitados.includes('TESTE_NOVO'));
});

