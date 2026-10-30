/**
 * SENAI CFP 901 Araçatuba - Base de Dados Acadêmica Integrada 2027
 * Gerado automaticamente a partir das dimensões oficiais do backend SENAI Araçatuba.
 */

export const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] as const;
export const TURNOS = ['Manhã', 'Tarde'] as const;

export interface Turma {
  ID_Turma: string;
  Curso: string;
  Modalidade_Secao: string;
  Atendimento: string;
  Termo: string;
  Dias_Semana: string;
  Turno: 'Manhã' | 'Tarde' | 'Integral';
  Inicio: string;
  Termino: string;
  Inicio_Computo_2027?: string;
  Termino_Computo_2027?: string;
  Horas_Computaveis_2027?: number | null;
  Status_Distribuicao_UCs_2027?: string;
  Matriculas: number;
  Modo_Divisao: string;
  Qtd_Subturmas: number;
  Docente_Ref_1: string;
  Docente_Ref_2: string;
  Docente_Ref_3: string;
}

export interface Subturma {
  ID_Subturma: string;
  ID_Turma_Base: string;
  Curso: string;
  Subturma: string;
  Alunos: number;
  Turno: 'Manhã' | 'Tarde' | 'Integral';
  Dias_Semana: string;
  Ambientes_Necessarios: number;
}

export interface Ambiente {
  Cod_Localiz: string;
  Nome_Ambiente: string;
  Bloco: string;
  Capacidade_Postos: number;
  Area_Tecnologica: string;
  Equipamentos_Chave: string;
}

export interface Docente {
  ID_Docente: string;
  NIF: string;
  Nome_Curto: string;
  Nome_Completo: string;
  Email: string;
  Status_Alocacao: string;
  Elegivel_Cursos_Regulares: string;
  Turnos_Atuacao_Regular: string;
  Turnos_Declarados_Formulario: string;
  Disponivel_FIC_Noturno: string;
  Qtd_UCs_Habilitadas: number;
  Cursos_Com_Aptidao: string;
  ucsHabilitadas: string[];
}

export interface DiaCalendario {
  Data: string;
  Dia_Semana: string;
  Mes: string;
  Dia_Letivo: 'SIM' | 'NÃO';
  Numero_Dia_Letivo: number | null;
  Status_Evento: string;
  Compensacao_Associada: string;
}

export interface MatrizUC {
  Curso: string;
  Termo_Semestre: string;
  Unidade_Curricular: string;
  Carga_Horaria_UC: number;
  Ambiente_Prioritario: string;
  Ambientes_Homologados: string[];
  Docentes_Habilitados: string[];
}

export interface BemPatrimonial {
  denominacao: string;
  quantidade: number;
}

export interface AlocacaoAula {
  id: string;
  idTurma: string;
  idSubturma: string;
  curso: string;
  termo: string;
  turno: 'Manhã' | 'Tarde' | 'Noite';
  horario: string;
  diaSemana: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
  diaSemanaNum: number;
  uc: string;
  cargaHorariaUC: number;
  ambienteId: string;
  ambienteNome: string;
  bloco: string;
  capacidadeAmbiente: number;
  alunos: number;
  docenteId: string;
  docenteNome: string;
  docenteNomeCompleto: string;
  docenteNif: string;
  pesoAfinidade: number;
  observacoes?: string;
}

export const SENAI_TURMAS: Turma[] = [
  {
    "ID_Turma": "M1EME-COM-1/27",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Modalidade_Secao": "TURMAS CAI - MANHÃ",
    "Atendimento": "COMUNIDADE",
    "Termo": "1º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Manhã",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 16,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Hálison",
    "Docente_Ref_2": "Aline",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "M1EME-ARA-1/27",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Modalidade_Secao": "TURMAS CAI - MANHÃ",
    "Atendimento": "ARALCO",
    "Termo": "1º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Manhã",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 16,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "À Contratar",
    "Docente_Ref_2": "Aline",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "M1MUSI-COM-1/27",
    "Curso": "Mecânico de Usinagem",
    "Modalidade_Secao": "TURMAS CAI - MANHÃ",
    "Atendimento": "COMUNIDADE",
    "Termo": "1º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Manhã",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Montibeller",
    "Docente_Ref_2": "Baron",
    "Docente_Ref_3": "Vinícius"
  },
  {
    "ID_Turma": "M1MMAV-ARA-1/27",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - MANHÃ",
    "Atendimento": "ARALCO",
    "Termo": "1º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Manhã",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 16,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Valter",
    "Docente_Ref_2": "Jonathas",
    "Docente_Ref_3": "Vera"
  },
  {
    "ID_Turma": "M3MMAV-RAI-1/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - MANHÃ",
    "Atendimento": "RAÍZEN",
    "Termo": "3º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Manhã",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 12,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Emerson",
    "Docente_Ref_2": "",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "T3EME-COM-1/26",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Modalidade_Secao": "TURMAS CAI - TARDE",
    "Atendimento": "COMUNIDADE",
    "Termo": "3º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Tarde",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 30,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Trevelim",
    "Docente_Ref_2": "Hálison",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "T3EME-RAI-2/25",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Modalidade_Secao": "TURMAS CAI - TARDE",
    "Atendimento": "RAÍZEN",
    "Termo": "3º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Tarde",
    "Inicio": "2026-08-10",
    "Termino": "2027-02-19",
    "Matriculas": 12,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "André",
    "Docente_Ref_2": "",
    "Docente_Ref_3": "",
    "Inicio_Computo_2027": "2027-01-25",
    "Termino_Computo_2027": "2027-02-19",
    "Horas_Computaveis_2027": 68,
    "Status_Distribuicao_UCs_2027": "PENDENTE"
  },
  {
    "ID_Turma": "T3MUSI-COM-1/26",
    "Curso": "Mecânico de Usinagem",
    "Modalidade_Secao": "TURMAS CAI - TARDE",
    "Atendimento": "COMUNIDADE",
    "Termo": "3º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Tarde",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 31,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Marcelo",
    "Docente_Ref_2": "Baron",
    "Docente_Ref_3": "Vinícius"
  },
  {
    "ID_Turma": "T3MMAV-RAI-2/25",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - TARDE",
    "Atendimento": "RAÍZEN",
    "Termo": "3º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Tarde",
    "Inicio": "2026-08-10",
    "Termino": "2027-02-19",
    "Matriculas": 13,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Charles",
    "Docente_Ref_2": "Willian",
    "Docente_Ref_3": "",
    "Inicio_Computo_2027": "2027-01-25",
    "Termino_Computo_2027": "2027-02-19",
    "Horas_Computaveis_2027": 68,
    "Status_Distribuicao_UCs_2027": "PENDENTE"
  },
  {
    "ID_Turma": "T1MMAV-RAI-2/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - TARDE",
    "Atendimento": "RAÍZEN",
    "Termo": "1º",
    "Dias_Semana": "Segunda a Sexta",
    "Turno": "Tarde",
    "Inicio": "2026-10-05",
    "Termino": "2027-04-06",
    "Matriculas": 20,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Willian",
    "Docente_Ref_2": "Jonthas",
    "Docente_Ref_3": "Vera",
    "Inicio_Computo_2027": "2027-01-25",
    "Termino_Computo_2027": "2027-04-06",
    "Horas_Computaveis_2027": 192,
    "Status_Distribuicao_UCs_2027": "PENDENTE"
  },
  {
    "ID_Turma": "I2MMAV-MATA/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - INTEGRAL",
    "Atendimento": "DA MATA",
    "Termo": "2º",
    "Dias_Semana": "Segunda e Terça",
    "Turno": "Integral",
    "Inicio": "2026-10-26",
    "Termino": "2027-05-03",
    "Matriculas": 15,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Willian",
    "Docente_Ref_2": "Charles",
    "Docente_Ref_3": "",
    "Inicio_Computo_2027": "2027-01-25",
    "Termino_Computo_2027": "2027-05-03",
    "Horas_Computaveis_2027": 216,
    "Status_Distribuicao_UCs_2027": "PENDENTE"
  },
  {
    "ID_Turma": "I1MMAV-VIT-1/27",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Modalidade_Secao": "TURMAS CAI - INTEGRAL",
    "Atendimento": "VITERRA",
    "Termo": "1º",
    "Dias_Semana": "Quarta e Quinta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 16,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Eduardo",
    "Docente_Ref_2": "Jonathas",
    "Docente_Ref_3": "Vera"
  },
  {
    "ID_Turma": "I1A-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "1º",
    "Dias_Semana": "Quinta e Sexta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Luis",
    "Docente_Ref_2": "Cleber",
    "Docente_Ref_3": "Aline"
  },
  {
    "ID_Turma": "I1B-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "1º",
    "Dias_Semana": "Quinta e Sexta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Josias",
    "Docente_Ref_2": "Érico",
    "Docente_Ref_3": "Murillo"
  },
  {
    "ID_Turma": "I2A-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "2º",
    "Dias_Semana": "Segunda e Terça",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Luis",
    "Docente_Ref_2": "Cleber",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "I2B-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "2º",
    "Dias_Semana": "Segunda e Terça",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Josias",
    "Docente_Ref_2": "Erico",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "I1-DEV-ATA-1/27",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "1º",
    "Dias_Semana": "Quinta e Sexta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Cezar",
    "Docente_Ref_2": "Heitor",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "I2-DEV-ATA-1/26",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "2º",
    "Dias_Semana": "Segunda e Terça",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Cezar",
    "Docente_Ref_2": "Heitor",
    "Docente_Ref_3": ""
  },
  {
    "ID_Turma": "I1MAUT-ATA-1/27",
    "Curso": "Técnico em Manutenção Automotiva",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "1º",
    "Dias_Semana": "Quinta e Sexta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Fernando",
    "Docente_Ref_2": "Felipe",
    "Docente_Ref_3": "Valter"
  },
  {
    "ID_Turma": "I2MAUT-ATA-1/26",
    "Curso": "Técnico em Manutenção Automotiva",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SESI",
    "Atendimento": "SESI ATA",
    "Termo": "2º",
    "Dias_Semana": "Segunda e Terça",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 31,
    "Modo_Divisao": "A_B",
    "Qtd_Subturmas": 2,
    "Docente_Ref_1": "Fernando",
    "Docente_Ref_2": "Felipe",
    "Docente_Ref_3": "Valter"
  },
  {
    "ID_Turma": "I1QUA-SEDUC/27",
    "Curso": "Técnico em Qualidade",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SEDUC",
    "Atendimento": "SEDUC",
    "Termo": "1º",
    "Dias_Semana": "Terça e Quarta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "CHEIA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Ferrarese",
    "Docente_Ref_2": "Murillo",
    "Docente_Ref_3": "Silvio"
  },
  {
    "ID_Turma": "I2QUA-SEDUC/26",
    "Curso": "Técnico em Qualidade",
    "Modalidade_Secao": "ITINERÁRIO FORMATIVO SEDUC",
    "Atendimento": "SEDUC",
    "Termo": "2º",
    "Dias_Semana": "Quinta e Sexta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-12-23",
    "Matriculas": 32,
    "Modo_Divisao": "CHEIA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Ferrarese",
    "Docente_Ref_2": "Murillo",
    "Docente_Ref_3": "Silvio"
  },
  {
    "ID_Turma": "I1ELE-COLOR/27",
    "Curso": "Técnico em Eletroeletrônica",
    "Modalidade_Secao": "TURMA CT - EMPRESA",
    "Atendimento": "COLORMAQ",
    "Termo": "1º",
    "Dias_Semana": "Quarta e Quinta",
    "Turno": "Integral",
    "Inicio": "2027-01-25",
    "Termino": "2027-06-23",
    "Matriculas": 16,
    "Modo_Divisao": "UNICA",
    "Qtd_Subturmas": 1,
    "Docente_Ref_1": "Trevelim",
    "Docente_Ref_2": "Hálison",
    "Docente_Ref_3": ""
  }
];

export const SENAI_SUBTURMAS: Subturma[] = [
  {
    "ID_Subturma": "M1EME-COM-1/27 (Única)",
    "ID_Turma_Base": "M1EME-COM-1/27",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Subturma": "Única",
    "Alunos": 16,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "M1EME-ARA-1/27 (Única)",
    "ID_Turma_Base": "M1EME-ARA-1/27",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Subturma": "Única",
    "Alunos": 16,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "M1MUSI-COM-1/27 - A",
    "ID_Turma_Base": "M1MUSI-COM-1/27",
    "Curso": "Mecânico de Usinagem",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "M1MUSI-COM-1/27 - B",
    "ID_Turma_Base": "M1MUSI-COM-1/27",
    "Curso": "Mecânico de Usinagem",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "M1MMAV-ARA-1/27 (Única)",
    "ID_Turma_Base": "M1MMAV-ARA-1/27",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 16,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "M3MMAV-RAI-1/26 (Única)",
    "ID_Turma_Base": "M3MMAV-RAI-1/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 12,
    "Turno": "Manhã",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3EME-COM-1/26 - A",
    "ID_Turma_Base": "T3EME-COM-1/26",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Subturma": "A",
    "Alunos": 15,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3EME-COM-1/26 - B",
    "ID_Turma_Base": "T3EME-COM-1/26",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Subturma": "B",
    "Alunos": 15,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3EME-RAI-2/25 (Única)",
    "ID_Turma_Base": "T3EME-RAI-2/25",
    "Curso": "Eletricista de Manutenção Eletroeletrônica",
    "Subturma": "Única",
    "Alunos": 12,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3MUSI-COM-1/26 - A",
    "ID_Turma_Base": "T3MUSI-COM-1/26",
    "Curso": "Mecânico de Usinagem",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3MUSI-COM-1/26 - B",
    "ID_Turma_Base": "T3MUSI-COM-1/26",
    "Curso": "Mecânico de Usinagem",
    "Subturma": "B",
    "Alunos": 15,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T3MMAV-RAI-2/25 (Única)",
    "ID_Turma_Base": "T3MMAV-RAI-2/25",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 13,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "T1MMAV-RAI-2/26 (Única)",
    "ID_Turma_Base": "T1MMAV-RAI-2/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 20,
    "Turno": "Tarde",
    "Dias_Semana": "Segunda a Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2MMAV-MATA/26 (Única)",
    "ID_Turma_Base": "I2MMAV-MATA/26",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 15,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1MMAV-VIT-1/27 (Única)",
    "ID_Turma_Base": "I1MMAV-VIT-1/27",
    "Curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "Subturma": "Única",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quarta e Quinta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1A-AUT-ATA/27 - A",
    "ID_Turma_Base": "I1A-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1A-AUT-ATA/27 - B",
    "ID_Turma_Base": "I1A-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1B-AUT-ATA/27 - A",
    "ID_Turma_Base": "I1B-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1B-AUT-ATA/27 - B",
    "ID_Turma_Base": "I1B-AUT-ATA/27",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2A-AUT-ATA/26 - A",
    "ID_Turma_Base": "I2A-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2A-AUT-ATA/26 - B",
    "ID_Turma_Base": "I2A-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2B-AUT-ATA/26 - A",
    "ID_Turma_Base": "I2B-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2B-AUT-ATA/26 - B",
    "ID_Turma_Base": "I2B-AUT-ATA/26",
    "Curso": "Técnico em Automação Industrial",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1-DEV-ATA-1/27 - A",
    "ID_Turma_Base": "I1-DEV-ATA-1/27",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1-DEV-ATA-1/27 - B",
    "ID_Turma_Base": "I1-DEV-ATA-1/27",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2-DEV-ATA-1/26 - A",
    "ID_Turma_Base": "I2-DEV-ATA-1/26",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2-DEV-ATA-1/26 - B",
    "ID_Turma_Base": "I2-DEV-ATA-1/26",
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1MAUT-ATA-1/27 - A",
    "ID_Turma_Base": "I1MAUT-ATA-1/27",
    "Curso": "Técnico em Manutenção Automotiva",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1MAUT-ATA-1/27 - B",
    "ID_Turma_Base": "I1MAUT-ATA-1/27",
    "Curso": "Técnico em Manutenção Automotiva",
    "Subturma": "B",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2MAUT-ATA-1/26 - A",
    "ID_Turma_Base": "I2MAUT-ATA-1/26",
    "Curso": "Técnico em Manutenção Automotiva",
    "Subturma": "A",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2MAUT-ATA-1/26 - B",
    "ID_Turma_Base": "I2MAUT-ATA-1/26",
    "Curso": "Técnico em Manutenção Automotiva",
    "Subturma": "B",
    "Alunos": 15,
    "Turno": "Integral",
    "Dias_Semana": "Segunda e Terça",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1QUA-SEDUC/27 (Cheia)",
    "ID_Turma_Base": "I1QUA-SEDUC/27",
    "Curso": "Técnico em Qualidade",
    "Subturma": "Cheia",
    "Alunos": 32,
    "Turno": "Integral",
    "Dias_Semana": "Terça e Quarta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I2QUA-SEDUC/26 (Cheia)",
    "ID_Turma_Base": "I2QUA-SEDUC/26",
    "Curso": "Técnico em Qualidade",
    "Subturma": "Cheia",
    "Alunos": 32,
    "Turno": "Integral",
    "Dias_Semana": "Quinta e Sexta",
    "Ambientes_Necessarios": 1
  },
  {
    "ID_Subturma": "I1ELE-COLOR/27 (Única)",
    "ID_Turma_Base": "I1ELE-COLOR/27",
    "Curso": "Técnico em Eletroeletrônica",
    "Subturma": "Única",
    "Alunos": 16,
    "Turno": "Integral",
    "Dias_Semana": "Quarta e Quinta",
    "Ambientes_Necessarios": 1
  }
];

export const SENAI_AMBIENTES: Ambiente[] = [
  {
    "Cod_Localiz": "20480015",
    "Nome_Ambiente": "Oficina de Tornearia",
    "Bloco": "Bloco 06",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Metalmecânica / Usinagem",
    "Equipamentos_Chave": "16 Tornos Romi, 16 Kits Iscar, 1 Torno CNC, 1 Retífica"
  },
  {
    "Cod_Localiz": "20480016",
    "Nome_Ambiente": "Oficina de Ajustagem",
    "Bloco": "Bloco 06",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Metalmecânica / Usinagem",
    "Equipamentos_Chave": "16 Morsas nº 6, 5 Fresadoras Universais, 7 Desempenos, Bancadas duplas"
  },
  {
    "Cod_Localiz": "20480008",
    "Nome_Ambiente": "Lab. Metrologia Dimensional",
    "Bloco": "Bloco 02",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Metrologia / Qualidade",
    "Equipamentos_Chave": "Máquina Tridimensional CNC, Projetor Perfil, Durômetro, Rugosímetro"
  },
  {
    "Cod_Localiz": "20480007",
    "Nome_Ambiente": "Lab. CAD / CAM",
    "Bloco": "Bloco 02",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Metalmecânica / Projetos",
    "Equipamentos_Chave": "Estações de trabalho CAD/CAM, Mesas Ártico, Softwares de usinagem"
  },
  {
    "Cod_Localiz": "20480048",
    "Nome_Ambiente": "Oficina de Soldagem",
    "Bloco": "Bloco 04",
    "Capacidade_Postos": 19,
    "Area_Tecnologica": "Metalmecânica / Caldeiraria",
    "Equipamentos_Chave": "16 Bancos Reguláveis, 13 Mesas Solda DC 1121, Fontes Multiprocesso, TIG/MIG"
  },
  {
    "Cod_Localiz": "20480017",
    "Nome_Ambiente": "Oficina de Eletricidade",
    "Bloco": "Bloco 06",
    "Capacidade_Postos": 18,
    "Area_Tecnologica": "Eletroeletrônica / Instalações",
    "Equipamentos_Chave": "Bancadas Industriais, Painéis de Montagem, Testadores de cabos"
  },
  {
    "Cod_Localiz": "20480040",
    "Nome_Ambiente": "Lab. Comandos Elétricos",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Eletroeletrônica / Automação",
    "Equipamentos_Chave": "8 Bancadas DCE 99, 8 Torres Motores, Soft-Starters, Inversores"
  },
  {
    "Cod_Localiz": "20480042",
    "Nome_Ambiente": "Lab. Eletrônica 01",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Eletrônica / Instrumentação",
    "Equipamentos_Chave": "11 Geradores Função, 11 Osciloscópios Tektronix, Fontes 0-30V, Protoboards"
  },
  {
    "Cod_Localiz": "20480044",
    "Nome_Ambiente": "Lab. Eletrônica 02 (Automação Predial)",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Eletrônica / Automação",
    "Equipamentos_Chave": "Bancadas Ensaios, Painéis Controle, Dispositivos Inteligentes"
  },
  {
    "Cod_Localiz": "20480043",
    "Nome_Ambiente": "Lab. CLP e Microcontroladores",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Automação Industrial",
    "Equipamentos_Chave": "8 Bancadas Ensaios, CLPs Festo, Redes Profinet/Profibus, Servomotores"
  },
  {
    "Cod_Localiz": "20480041",
    "Nome_Ambiente": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Automação / Mecânica",
    "Equipamentos_Chave": "Painéis Didáticos Festo Eletropneumáticos e Eletro-hidráulicos"
  },
  {
    "Cod_Localiz": "20480037",
    "Nome_Ambiente": "Lab. Máquinas Elétricas",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 17,
    "Area_Tecnologica": "Eletromecânica / Energia",
    "Equipamentos_Chave": "8 Bancadas Eletro 1500, Transformadores Didáticos, Motores Dahlander, Bobinadeiras"
  },
  {
    "Cod_Localiz": "20480066",
    "Nome_Ambiente": "Lab. Eletrônica Veicular (Autotrônica)",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Automotiva / Eletroeletrônica",
    "Equipamentos_Chave": "8 Bancadas Didáticas, Painel ABS, Simuladores Injeção/Trava/Alarme"
  },
  {
    "Cod_Localiz": "20480013",
    "Nome_Ambiente": "Oficina Mecânica Automotiva (Veículos Leves)",
    "Bloco": "Bloco 06",
    "Capacidade_Postos": 20,
    "Area_Tecnologica": "Automotiva",
    "Equipamentos_Chave": "3 Elevadores Elétricos 4.100kg, Alinhador Sun, Balanceador, Rampa Pneumática"
  },
  {
    "Cod_Localiz": "20480014",
    "Nome_Ambiente": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "Bloco": "Bloco 06",
    "Capacidade_Postos": 20,
    "Area_Tecnologica": "Automotiva Pesada / Agrícola",
    "Equipamentos_Chave": "Caminhão MB Atego 2425, Motores FPT Euro V, Pórtico com Talha, Cavaletes Raven"
  },
  {
    "Cod_Localiz": "20480064",
    "Nome_Ambiente": "Lab. de Informática 01",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 21,
    "Area_Tecnologica": "Tecnologia da Informação",
    "Equipamentos_Chave": "21 Notebooks Corporativos, 21 Cadeiras Giratórias, Carrinho Recarga"
  },
  {
    "Cod_Localiz": "20480065",
    "Nome_Ambiente": "Lab. de Informática 02",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 21,
    "Area_Tecnologica": "Tecnologia da Informação",
    "Equipamentos_Chave": "21 Notebooks Corporativos, 21 Cadeiras Giratórias, Carrinho Recarga"
  },
  {
    "Cod_Localiz": "20480068",
    "Nome_Ambiente": "Lab. Informática 03 / Inovação (FabLab)",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 21,
    "Area_Tecnologica": "TI / Inovação / Automação",
    "Equipamentos_Chave": "21 Desktops Corporativos, 8 Bancadas Móveis Automação, Impressora 3D"
  },
  {
    "Cod_Localiz": "20480029",
    "Nome_Ambiente": "Sala de Aula 01",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 36,
    "Area_Tecnologica": "Sala de Aula Geral",
    "Equipamentos_Chave": "35 Carteiras Ártico, 36 Cadeiras Azuis, Lousa 5m, Projetor Multimídia"
  },
  {
    "Cod_Localiz": "20480030",
    "Nome_Ambiente": "Sala de Aula 02",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 36,
    "Area_Tecnologica": "Sala de Aula Geral",
    "Equipamentos_Chave": "29 Carteiras MDF, 35 Cadeiras Azuis, Lousa 5m, Projetor Multimídia"
  },
  {
    "Cod_Localiz": "20480031",
    "Nome_Ambiente": "Sala de Aula 03 (Desenho Técnico)",
    "Bloco": "Bloco 01 Pav. Superior",
    "Capacidade_Postos": 32,
    "Area_Tecnologica": "Desenho Técnico / Sala de Aula",
    "Equipamentos_Chave": "32 Carteiras Reclináveis de Desenho, 31 Cadeiras Azuis, Projetor"
  },
  {
    "Cod_Localiz": "20480011",
    "Nome_Ambiente": "Sala de Aula 04",
    "Bloco": "Bloco 01 Pav. Térreo",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Sala de Aula Apoio",
    "Equipamentos_Chave": "16 Carteiras com porta-livros, 16 Cadeiras Fixas, Mesa e Computador"
  },
  {
    "Cod_Localiz": "20480038",
    "Nome_Ambiente": "Sala de Aula 05",
    "Bloco": "Bloco 01 Pav. Térreo",
    "Capacidade_Postos": 32,
    "Area_Tecnologica": "Sala de Aula Geral",
    "Equipamentos_Chave": "32 Carteiras Escolares, 32 Cadeiras, Quadro Branco, Projetor"
  },
  {
    "Cod_Localiz": "20480047",
    "Nome_Ambiente": "Sala de Aula da Marcenaria (Restrita)",
    "Bloco": "Bloco 01 Pav. Inferior",
    "Capacidade_Postos": 16,
    "Area_Tecnologica": "Sala de Aula Apoio",
    "Equipamentos_Chave": "16 Cadeiras Escolares, Lousa Móvel, Mesa (maquinário pesado isolado)"
  }
];

export const SENAI_DOCENTES: Docente[] = [
  {
    "ID_Docente": "DOC01",
    "NIF": "1097841",
    "Nome_Curto": "VINICIUS CAMARGO (FIC)",
    "Nome_Completo": "Vinicius Rodrigues Camargo",
    "Email": "vinicius.camargo@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 7,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC02",
    "NIF": "Sn 1083254",
    "Nome_Curto": "ADRIANA (FIC)",
    "Nome_Completo": "Adriana Rosa de Jesus",
    "Email": "adriana.jeus@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 0,
    "Cursos_Com_Aptidao": "Geral / FIC",
    "ucsHabilitadas": []
  },
  {
    "ID_Docente": "DOC03",
    "NIF": "1087599",
    "Nome_Curto": "FABIANA (FIC)",
    "Nome_Completo": "Fabiana otoboni molina",
    "Email": "fabiotoboni@gmail.com",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 3,
    "Cursos_Com_Aptidao": "Técnico em Qualidade",
    "ucsHabilitadas": [
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Custos da Qualidade e Produtividade"
    ]
  },
  {
    "ID_Docente": "DOC04",
    "NIF": "1078130",
    "Nome_Curto": "FERRARESE",
    "Nome_Completo": "Rodrigo Roberto Ferrareze",
    "Email": "rodrigo.ferrareze@so.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 12,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Eletroeletrônica | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Comunicação Oral e Escrita",
      "Comunicação e Relações Interpessoais",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade"
    ]
  },
  {
    "ID_Docente": "DOC05",
    "NIF": "1106210",
    "Nome_Curto": "ANDREY (MIR/FIC)",
    "Nome_Completo": "Andrey Marque Mendonça",
    "Email": "andrey.mendonca@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 8,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC06",
    "NIF": "SN1082551",
    "Nome_Curto": "MARCELO CORRÊA (MIR/FIC)",
    "Nome_Completo": "Marcelo Corrêa",
    "Email": "mcorrea@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 8,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC07",
    "NIF": "77763",
    "Nome_Curto": "TREVELIM",
    "Nome_Completo": "Joao Luiz Trevelim",
    "Email": "joao.trevelim@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Tarde",
    "Turnos_Declarados_Formulario": "Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 18,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Desenho Técnico Mecânico",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Sistemas Hidráulicos Avançados",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais"
    ]
  },
  {
    "ID_Docente": "DOC08",
    "NIF": "1076858",
    "Nome_Curto": "ÉRICO",
    "Nome_Completo": "Érico Rodrigo de Abreu Carvalho",
    "Email": "erico.carvalho@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 12,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais"
    ]
  },
  {
    "ID_Docente": "DOC09",
    "NIF": "73236",
    "Nome_Curto": "VALTER",
    "Nome_Completo": "Válter Aparecido Marin",
    "Email": "valter.marin@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 13,
    "Cursos_Com_Aptidao": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Técnico em Manutenção Automotiva",
    "ucsHabilitadas": [
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção"
    ]
  },
  {
    "ID_Docente": "DOC10",
    "NIF": "1095290",
    "Nome_Curto": "CHARLES",
    "Nome_Completo": "Charles Vinicius de Carvalho Ferreira",
    "Email": "charles.ferreira@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 57,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Comunicação Oral e Escrita",
      "Matemática Aplicada à Usinagem",
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Usinagem em Retificadora",
      "Fundamentos de CNC",
      "Comunicação e Relações Interpessoais",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Manutenção de Implementos e Sistemas Especiais",
      "Sistemas Hidráulicos Avançados",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção",
      "Transmissão Mecânica e Automatizada",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC11",
    "NIF": "1088784",
    "Nome_Curto": "CEZAR",
    "Nome_Completo": "Cezar Bertelli",
    "Email": "cbertelli@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 30,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Comunicação Oral e Escrita",
      "Matemática Aplicada à Usinagem",
      "Comunicação e Relações Interpessoais",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos"
    ]
  },
  {
    "ID_Docente": "DOC12",
    "NIF": "1049969",
    "Nome_Curto": "BARON",
    "Nome_Completo": "Carlos Eduardo Barom",
    "Email": "carlos.barom@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 9,
    "Cursos_Com_Aptidao": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Usinagem em Retificadora",
      "Fundamentos de CNC",
      "Metrologia Aplicada",
      "Metrologia e Ajustagem Mecânica",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC13",
    "NIF": "1028282",
    "Nome_Curto": "JONATHAS",
    "Nome_Completo": "Jonathas Arthur Quintiliano",
    "Email": "jonathas.quintiliano@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 18,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Matemática Aplicada à Usinagem",
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Comunicação e Relações Interpessoais",
      "Metrologia Aplicada",
      "Segurança e Meio Ambiente",
      "Desenho e Modelagem 2D/3D",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Metrologia e Ajustagem Mecânica",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC14",
    "NIF": "1023385",
    "Nome_Curto": "RONALDO (FIC)",
    "Nome_Completo": "Ronaldo Gon Bordin",
    "Email": "ronaldo.bordin@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 5,
    "Cursos_Com_Aptidao": "Mecânico de Usinagem (CAI) | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC15",
    "NIF": "1081547",
    "Nome_Curto": "FABIANO (AND/FIC)",
    "Nome_Completo": "Fabiano de Souza Marinho",
    "Email": "fabiano.marinho@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 13,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Comunicação e Relações Interpessoais",
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Estatística Básica Aplicada ao Processo"
    ]
  },
  {
    "ID_Docente": "DOC16",
    "NIF": "1089699",
    "Nome_Curto": "LUCIANO (GUA/FIC)",
    "Nome_Completo": "Luciano de Souza Andrade",
    "Email": "luciano.souza@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 8,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC17",
    "NIF": "1089692",
    "Nome_Curto": "LUCAS (GUA/FIC)",
    "Nome_Completo": "Lucas Silva Souto",
    "Email": "lucas.souto@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 7,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC18",
    "NIF": "SN1078058",
    "Nome_Curto": "FELIPE",
    "Nome_Completo": "Felipe Costa do Amaral",
    "Email": "felipe.camaral@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 30,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Matemática Aplicada à Usinagem",
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Manutenção de Implementos e Sistemas Especiais",
      "Sistemas Hidráulicos Avançados",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção",
      "Transmissão Mecânica e Automatizada",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC19",
    "NIF": "1094306",
    "Nome_Curto": "JAQUELINE (FIC)",
    "Nome_Completo": "Jaqueline Carvalho Fernandes Marques",
    "Email": "jaqueline.cmarques@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 11,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Eletroeletrônica | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Comunicação Oral e Escrita",
      "Comunicação e Relações Interpessoais",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade"
    ]
  },
  {
    "ID_Docente": "DOC20",
    "NIF": "SN1077147",
    "Nome_Curto": "JOSIAS",
    "Nome_Completo": "Josias Bartolomeu Costa Ribeiro",
    "Email": "josias.ribeiro@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 13,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais"
    ]
  },
  {
    "ID_Docente": "DOC21",
    "NIF": "1081494",
    "Nome_Curto": "HEITOR",
    "Nome_Completo": "Heitor Ilario Zucão",
    "Email": "heitor.zucao@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 15,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Estatística Básica Aplicada ao Processo",
      "Mapeamento e Padronização de Processos"
    ]
  },
  {
    "ID_Docente": "DOC22",
    "NIF": "1008155",
    "Nome_Curto": "CLEBER",
    "Nome_Completo": "Cleber Rodrigo Torres",
    "Email": "cleber.rtorres@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 20,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Algoritmos e Lógica de Programação",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Programação Orientada a Objetos",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Implementação de Sistemas Eletroeletrônicos Prediais"
    ]
  },
  {
    "ID_Docente": "DOC23",
    "NIF": "75073",
    "Nome_Curto": "SILVIO",
    "Nome_Completo": "Silvio Sergio Barbosa",
    "Email": "silvio.barbosa@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 13,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Comunicação Oral e Escrita",
      "Matemática Aplicada à Usinagem",
      "Comunicação e Relações Interpessoais",
      "Segurança e Meio Ambiente",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade"
    ]
  },
  {
    "ID_Docente": "DOC24",
    "NIF": "sn1091827",
    "Nome_Curto": "HÁLISON",
    "Nome_Completo": "Hálison Moreira Dorigan",
    "Email": "halison.moreira@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 26,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Desenvolvimento de Sistemas | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Usinagem em Retificadora",
      "Fundamentos de CNC",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Sistemas Hidráulicos Avançados",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Implementação de Sistemas Eletroeletrônicos Prediais",
      "Eletroeletrônica Automotiva Básica",
      "Metrologia e Ajustagem Mecânica"
    ]
  },
  {
    "ID_Docente": "DOC25",
    "NIF": "1083182",
    "Nome_Curto": "VINÍCIUS",
    "Nome_Completo": "Vinicius Castro Santos Giraldelli",
    "Email": "vinicius.castro@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 10,
    "Cursos_Com_Aptidao": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Usinagem em Retificadora",
      "Fundamentos de CNC",
      "Metrologia Aplicada",
      "Desenho e Modelagem 2D/3D",
      "Metrologia e Ajustagem Mecânica",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC26",
    "NIF": "1013629",
    "Nome_Curto": "ANDRÉ DONATONI (FIC)",
    "Nome_Completo": "André Luís Donatoni",
    "Email": "andre.donatoni@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 10,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica",
    "ucsHabilitadas": [
      "Fundamentos da Eletroeletrônica",
      "Fundamentos de Instalações Eletroeletrônicas",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Desenho Técnico Mecânico",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Segurança e Meio Ambiente",
      "Eletricidade Básica e Circuitos Elétricos",
      "Eletrônica Analógica e Digital Aplicada",
      "Implementação de Sistemas Eletroeletrônicos Prediais"
    ]
  },
  {
    "ID_Docente": "DOC27",
    "NIF": "1103728",
    "Nome_Curto": "WILLIAN",
    "Nome_Completo": "Willian Rodrigo Garcia De Jesus",
    "Email": "willian.jesus@edu.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 24,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Desenho Técnico Mecânico",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Manutenção de Implementos e Sistemas Especiais",
      "Sistemas Hidráulicos Avançados",
      "Desenho e Modelagem 2D/3D",
      "Eletricidade Básica e Circuitos Elétricos",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção",
      "Transmissão Mecânica e Automatizada",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC28",
    "NIF": "SN1097845",
    "Nome_Curto": "ANGELO (MIR/FIC)",
    "Nome_Completo": "Angelo Heleno Stevanelli",
    "Email": "angelo.heleno@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 7,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC29",
    "NIF": "sn1089425",
    "Nome_Curto": "RAPHAEL (AND/FIC)",
    "Nome_Completo": "Raphael José Anhussi da Cruz",
    "Email": "raphael.raphael@sp.senai.br",
    "Status_Alocacao": "Exclusivo FIC / Polos Descentralizados",
    "Elegivel_Cursos_Regulares": "NÃO",
    "Turnos_Atuacao_Regular": "Não Participa (Exclusivo FIC / Polos)",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 8,
    "Cursos_Com_Aptidao": "Técnico em Desenvolvimento de Sistemas",
    "ucsHabilitadas": [
      "Algoritmos e Lógica de Programação",
      "Análise e Modelagem de Sistemas",
      "Banco de Dados Relacional",
      "Fundamentos de Redes e Infraestrutura de TI",
      "Desenvolvimento de Aplicações Web (Front-End)",
      "Desenvolvimento Web Back-End e APIs",
      "Engenharia de Software e Métodos Ágeis",
      "Programação Orientada a Objetos"
    ]
  },
  {
    "ID_Docente": "DOC30",
    "NIF": "1089880",
    "Nome_Curto": "EMERSON",
    "Nome_Completo": "Emerson Santana Martins",
    "Email": "emerson.santana@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 27,
    "Cursos_Com_Aptidao": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Comunicação Oral e Escrita",
      "Desenho Técnico Mecânico",
      "Comunicação e Relações Interpessoais",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Manutenção de Implementos e Sistemas Especiais",
      "Sistemas Hidráulicos Avançados",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção",
      "Transmissão Mecânica e Automatizada",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC31",
    "NIF": "1071926",
    "Nome_Curto": "EDUARDO",
    "Nome_Completo": "Eduardo Silva Monteiro",
    "Email": "eduardo.monteiro@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde, Noite",
    "Disponivel_FIC_Noturno": "SIM",
    "Qtd_UCs_Habilitadas": 34,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Automação Industrial | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Letramento Digital",
      "Fundamentos da Eletroeletrônica",
      "Manutenção Elétrica Industrial",
      "Sistemas Automatizados de Manutenção",
      "Comunicação Oral e Escrita",
      "Matemática Aplicada à Usinagem",
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Comunicação e Relações Interpessoais",
      "Fundamentos de Eletricidade e Hidráulica Básica",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Segurança e Meio Ambiente",
      "Eletricidade Aplicada a Veículos Pesados",
      "Motores de Combustão Interna ciclo Diesel",
      "Sistemas de Transmissão Mecânica",
      "Eletroeletrônica Embarcada e Redes de Comunicação",
      "Manutenção de Implementos e Sistemas Especiais",
      "Sistemas Hidráulicos Avançados",
      "Eletricidade Básica e Circuitos Elétricos",
      "Fundamentos da Automação e Instrumentação",
      "Controladores Lógicos Programáveis (CLP)",
      "Eletrônica Analógica e Digital Aplicada",
      "Redes Industriais de Comunicação",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Eletroeletrônica Automotiva Básica",
      "Fundamentos da Tecnologia Automotiva",
      "Metrologia e Ajustagem Mecânica",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Gerenciamento Eletrônico de Motores",
      "Manutenção de Motores Ciclo Otto e Diesel",
      "Sistemas de Freios, Suspensão e Direção",
      "Transmissão Mecânica e Automatizada"
    ]
  },
  {
    "ID_Docente": "DOC32",
    "NIF": "SN1074128",
    "Nome_Curto": "MURILLO",
    "Nome_Completo": "Murillo Seraphim Rossi",
    "Email": "murillo.rossi@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 13,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Técnico em Eletroeletrônica | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Comunicação e Relações Interpessoais",
      "Segurança e Meio Ambiente",
      "Ferramentas Digitais para o Mercado de Trabalho",
      "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
      "Estatística Básica Aplicada ao Processo",
      "Ferramentas da Qualidade e Análise de Falhas",
      "Fundamentos da Gestão da Qualidade",
      "Mapeamento e Padronização de Processos",
      "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
      "Controle Estatístico de Processo (CEP)",
      "Custos da Qualidade e Produtividade",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC33",
    "NIF": "76101",
    "Nome_Curto": "MONTIBELLER",
    "Nome_Completo": "Marcelo Henrique Gonçalves Montibeller",
    "Email": "marcelo.montibeller@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 10,
    "Cursos_Com_Aptidao": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI) | Técnico em Manutenção Automotiva | Técnico em Qualidade",
    "ucsHabilitadas": [
      "Desenho Técnico Mecânico",
      "Fundamentos da Tecnologia Mecânica",
      "Fundamentos da Usinagem Mecânica",
      "Usinagem em Fresadora",
      "Usinagem em Retificadora",
      "Fundamentos de CNC",
      "Metrologia Aplicada",
      "Processos Mecânicos Básicos",
      "Metrologia e Ajustagem Mecânica",
      "Metrologia Dimensional e Análise de Sistemas de Medição"
    ]
  },
  {
    "ID_Docente": "DOC34",
    "NIF": "SN_ALINE",
    "Nome_Curto": "ALINE",
    "Nome_Completo": "Aline Cristina Garcia",
    "Email": "aline.garcia@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 3,
    "Cursos_Com_Aptidao": "Eletricista de Manutenção Eletroeletrônica (CAI) | Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI) | Mecânico de Usinagem (CAI)",
    "ucsHabilitadas": [
      "Desenvolvimento Profissional e Comunicação",
      "Comunicação Oral e Escrita",
      "Comunicação e Relações Interpessoais"
    ]
  },
  {
    "ID_Docente": "DOC35",
    "NIF": "SN_VERA",
    "Nome_Curto": "VERA",
    "Nome_Completo": "Vera Zolin",
    "Email": "vera.zolin@sp.senai.br",
    "Status_Alocacao": "Quadro Regular Araçatuba + FIC",
    "Elegivel_Cursos_Regulares": "SIM",
    "Turnos_Atuacao_Regular": "Manhã, Tarde",
    "Turnos_Declarados_Formulario": "Manhã, Tarde",
    "Disponivel_FIC_Noturno": "NÃO",
    "Qtd_UCs_Habilitadas": 1,
    "Cursos_Com_Aptidao": "Mecânico de Usinagem (CAI)",
    "ucsHabilitadas": [
      "Matemática Aplicada à Usinagem"
    ]
  }
];

export const SENAI_CALENDARIO: DiaCalendario[] = [
  {
    "Data": "2027-01-25",
    "Dia_Semana": "Segunda",
    "Mes": "Janeiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 1.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-26",
    "Dia_Semana": "Terça",
    "Mes": "Janeiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 2.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-27",
    "Dia_Semana": "Quarta",
    "Mes": "Janeiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 3.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-28",
    "Dia_Semana": "Quinta",
    "Mes": "Janeiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 4.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-29",
    "Dia_Semana": "Sexta",
    "Mes": "Janeiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 5.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-30",
    "Dia_Semana": "Sábado",
    "Mes": "Janeiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-01-31",
    "Dia_Semana": "Domingo",
    "Mes": "Janeiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-01",
    "Dia_Semana": "Segunda",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 6.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-02",
    "Dia_Semana": "Terça",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 7.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-03",
    "Dia_Semana": "Quarta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 8.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-04",
    "Dia_Semana": "Quinta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 9.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-05",
    "Dia_Semana": "Sexta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 10.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-06",
    "Dia_Semana": "Sábado",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-07",
    "Dia_Semana": "Domingo",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-08",
    "Dia_Semana": "Segunda",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Emenda de Terça (Carnaval) - Compensação",
    "Compensacao_Associada": "Sábado 20/02"
  },
  {
    "Data": "2027-02-09",
    "Dia_Semana": "Terça",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Feriado (Carnaval)",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-10",
    "Dia_Semana": "Quarta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Quarta-feira de Cinzas (Compensação)",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-11",
    "Dia_Semana": "Quinta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 11.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-12",
    "Dia_Semana": "Sexta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 12.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-13",
    "Dia_Semana": "Sábado",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-14",
    "Dia_Semana": "Domingo",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-15",
    "Dia_Semana": "Segunda",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 13.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-16",
    "Dia_Semana": "Terça",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 14.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-17",
    "Dia_Semana": "Quarta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 15.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-18",
    "Dia_Semana": "Quinta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 16.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-19",
    "Dia_Semana": "Sexta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 17.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-20",
    "Dia_Semana": "Sábado",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-21",
    "Dia_Semana": "Domingo",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-22",
    "Dia_Semana": "Segunda",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 18.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-23",
    "Dia_Semana": "Terça",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 19.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-24",
    "Dia_Semana": "Quarta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 20.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-25",
    "Dia_Semana": "Quinta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 21.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-26",
    "Dia_Semana": "Sexta",
    "Mes": "Fevereiro",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 22.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-27",
    "Dia_Semana": "Sábado",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-02-28",
    "Dia_Semana": "Domingo",
    "Mes": "Fevereiro",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-01",
    "Dia_Semana": "Segunda",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 23.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-02",
    "Dia_Semana": "Terça",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 24.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-03",
    "Dia_Semana": "Quarta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 25.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-04",
    "Dia_Semana": "Quinta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 26.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-05",
    "Dia_Semana": "Sexta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 27.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-06",
    "Dia_Semana": "Sábado",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-07",
    "Dia_Semana": "Domingo",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-08",
    "Dia_Semana": "Segunda",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 28.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-09",
    "Dia_Semana": "Terça",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 29.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-10",
    "Dia_Semana": "Quarta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 30.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-11",
    "Dia_Semana": "Quinta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 31.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-12",
    "Dia_Semana": "Sexta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 32.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-13",
    "Dia_Semana": "Sábado",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-14",
    "Dia_Semana": "Domingo",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-15",
    "Dia_Semana": "Segunda",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 33.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-16",
    "Dia_Semana": "Terça",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 34.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-17",
    "Dia_Semana": "Quarta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 35.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-18",
    "Dia_Semana": "Quinta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 36.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-19",
    "Dia_Semana": "Sexta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 37.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-20",
    "Dia_Semana": "Sábado",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-21",
    "Dia_Semana": "Domingo",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-22",
    "Dia_Semana": "Segunda",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 38.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-23",
    "Dia_Semana": "Terça",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 39.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-24",
    "Dia_Semana": "Quarta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 40.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-25",
    "Dia_Semana": "Quinta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 41.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-26",
    "Dia_Semana": "Sexta",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Feriado (Sexta-feira Santa)",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-27",
    "Dia_Semana": "Sábado",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-28",
    "Dia_Semana": "Domingo",
    "Mes": "Março",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-29",
    "Dia_Semana": "Segunda",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 42.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-30",
    "Dia_Semana": "Terça",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 43.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-03-31",
    "Dia_Semana": "Quarta",
    "Mes": "Março",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 44.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-01",
    "Dia_Semana": "Quinta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 45.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-02",
    "Dia_Semana": "Sexta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 46.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-03",
    "Dia_Semana": "Sábado",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-04",
    "Dia_Semana": "Domingo",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-05",
    "Dia_Semana": "Segunda",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 47.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-06",
    "Dia_Semana": "Terça",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 48.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-07",
    "Dia_Semana": "Quarta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 49.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-08",
    "Dia_Semana": "Quinta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 50.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-09",
    "Dia_Semana": "Sexta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 51.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-10",
    "Dia_Semana": "Sábado",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-11",
    "Dia_Semana": "Domingo",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-12",
    "Dia_Semana": "Segunda",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 52.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-13",
    "Dia_Semana": "Terça",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 53.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-14",
    "Dia_Semana": "Quarta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 54.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-15",
    "Dia_Semana": "Quinta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 55.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-16",
    "Dia_Semana": "Sexta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 56.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-17",
    "Dia_Semana": "Sábado",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-18",
    "Dia_Semana": "Domingo",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-19",
    "Dia_Semana": "Segunda",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 57.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-20",
    "Dia_Semana": "Terça",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 58.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-21",
    "Dia_Semana": "Quarta",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Feriado (Tiradentes)",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-22",
    "Dia_Semana": "Quinta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 59.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-23",
    "Dia_Semana": "Sexta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 60.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-24",
    "Dia_Semana": "Sábado",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-25",
    "Dia_Semana": "Domingo",
    "Mes": "Abril",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-26",
    "Dia_Semana": "Segunda",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 61.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-27",
    "Dia_Semana": "Terça",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 62.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-28",
    "Dia_Semana": "Quarta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 63.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-29",
    "Dia_Semana": "Quinta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 64.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-04-30",
    "Dia_Semana": "Sexta",
    "Mes": "Abril",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 65.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-01",
    "Dia_Semana": "Sábado",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-02",
    "Dia_Semana": "Domingo",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-03",
    "Dia_Semana": "Segunda",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 66.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-04",
    "Dia_Semana": "Terça",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 67.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-05",
    "Dia_Semana": "Quarta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 68.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-06",
    "Dia_Semana": "Quinta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 69.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-07",
    "Dia_Semana": "Sexta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 70.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-08",
    "Dia_Semana": "Sábado",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-09",
    "Dia_Semana": "Domingo",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-10",
    "Dia_Semana": "Segunda",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 71.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-11",
    "Dia_Semana": "Terça",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 72.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-12",
    "Dia_Semana": "Quarta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 73.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-13",
    "Dia_Semana": "Quinta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 74.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-14",
    "Dia_Semana": "Sexta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 75.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-15",
    "Dia_Semana": "Sábado",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-16",
    "Dia_Semana": "Domingo",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-17",
    "Dia_Semana": "Segunda",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 76.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-18",
    "Dia_Semana": "Terça",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 77.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-19",
    "Dia_Semana": "Quarta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 78.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-20",
    "Dia_Semana": "Quinta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 79.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-21",
    "Dia_Semana": "Sexta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 80.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-22",
    "Dia_Semana": "Sábado",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-23",
    "Dia_Semana": "Domingo",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-24",
    "Dia_Semana": "Segunda",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 81.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-25",
    "Dia_Semana": "Terça",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 82.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-26",
    "Dia_Semana": "Quarta",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 83.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-27",
    "Dia_Semana": "Quinta",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Feriado (Corpus Christi)",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-28",
    "Dia_Semana": "Sexta",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Emenda de Quinta (Corpus Christi) - Compensação",
    "Compensacao_Associada": "Sábado 22/05"
  },
  {
    "Data": "2027-05-29",
    "Dia_Semana": "Sábado",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-30",
    "Dia_Semana": "Domingo",
    "Mes": "Maio",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-05-31",
    "Dia_Semana": "Segunda",
    "Mes": "Maio",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 84.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-01",
    "Dia_Semana": "Terça",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 85.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-02",
    "Dia_Semana": "Quarta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 86.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-03",
    "Dia_Semana": "Quinta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 87.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-04",
    "Dia_Semana": "Sexta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 88.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-05",
    "Dia_Semana": "Sábado",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-06",
    "Dia_Semana": "Domingo",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-07",
    "Dia_Semana": "Segunda",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 89.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-08",
    "Dia_Semana": "Terça",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 90.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-09",
    "Dia_Semana": "Quarta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 91.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-10",
    "Dia_Semana": "Quinta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 92.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-11",
    "Dia_Semana": "Sexta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 93.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-12",
    "Dia_Semana": "Sábado",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-13",
    "Dia_Semana": "Domingo",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-14",
    "Dia_Semana": "Segunda",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 94.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-15",
    "Dia_Semana": "Terça",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 95.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-16",
    "Dia_Semana": "Quarta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 96.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-17",
    "Dia_Semana": "Quinta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 97.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-18",
    "Dia_Semana": "Sexta",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 98.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-19",
    "Dia_Semana": "Sábado",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-20",
    "Dia_Semana": "Domingo",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fim de Semana",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-21",
    "Dia_Semana": "Segunda",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 99.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-22",
    "Dia_Semana": "Terça",
    "Mes": "Junho",
    "Dia_Letivo": "SIM",
    "Numero_Dia_Letivo": 100.0,
    "Status_Evento": "Dia Letivo Regular",
    "Compensacao_Associada": ""
  },
  {
    "Data": "2027-06-23",
    "Dia_Semana": "Quarta",
    "Mes": "Junho",
    "Dia_Letivo": "NÃO",
    "Numero_Dia_Letivo": null,
    "Status_Evento": "Fechamento Semestral / Conselho de Classe",
    "Compensacao_Associada": ""
  }
];

export const SENAI_UCS: MatrizUC[] = [
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Desenvolvimento Profissional e Comunicação",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 04",
      "Sala de Aula 05"
    ],
    "Docentes_Habilitados": [
      "ALINE",
      "FERRARESE",
      "TREVELIM",
      "MURILLO",
      "SILVIO",
      "CHARLES",
      "CEZAR",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Letramento Digital",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "TREVELIM",
      "ÉRICO",
      "CHARLES",
      "CEZAR",
      "FELIPE",
      "JOSIAS",
      "HEITOR",
      "CLEBER",
      "EDUARDO",
      "JONATHAS",
      "HÁLISON",
      "WILLIAN"
    ]
  },
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Fundamentos da Eletroeletrônica",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Lab. Eletrônica 01",
    "Ambientes_Homologados": [
      "Lab. Eletrônica 01",
      "Lab. Eletrônica 02 (Automação Predial)",
      "Lab. Comandos Elétricos"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CHARLES",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "EDUARDO",
      "FELIPE",
      "HEITOR",
      "WILLIAN"
    ]
  },
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Fundamentos de Instalações Eletroeletrônicas",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina de Eletricidade",
    "Ambientes_Homologados": [
      "Oficina de Eletricidade",
      "Lab. Comandos Elétricos",
      "Lab. Máquinas Elétricas"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "CHARLES",
      "FELIPE"
    ]
  },
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Manutenção Elétrica Industrial",
    "Carga_Horaria_UC": 200,
    "Ambiente_Prioritario": "Oficina de Eletricidade",
    "Ambientes_Homologados": [
      "Oficina de Eletricidade",
      "Lab. Comandos Elétricos",
      "Lab. Máquinas Elétricas"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "CHARLES",
      "FELIPE",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Sistemas Automatizados de Manutenção",
    "Carga_Horaria_UC": 200,
    "Ambiente_Prioritario": "Lab. CLP e Microcontroladores",
    "Ambientes_Homologados": [
      "Lab. CLP e Microcontroladores",
      "Lab. Comandos Elétricos"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "EDUARDO",
      "CHARLES",
      "FELIPE"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Comunicação Oral e Escrita",
    "Carga_Horaria_UC": 40,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 04",
      "Sala de Aula 05"
    ],
    "Docentes_Habilitados": [
      "ALINE",
      "FERRARESE",
      "SILVIO",
      "EMERSON",
      "CHARLES",
      "CEZAR",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Matemática Aplicada à Usinagem",
    "Carga_Horaria_UC": 40,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 04",
      "Sala de Aula 05"
    ],
    "Docentes_Habilitados": [
      "VERA",
      "CHARLES",
      "JONATHAS",
      "FELIPE",
      "SILVIO",
      "CEZAR",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Desenho Técnico Mecânico",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 03 (Desenho Técnico)",
    "Ambientes_Homologados": [
      "Sala de Aula 03 (Desenho Técnico)",
      "Sala de Aula 01",
      "Sala de Aula 02"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "BARON",
      "JONATHAS",
      "FELIPE",
      "HÁLISON",
      "VINÍCIUS",
      "MONTIBELLER",
      "TREVELIM",
      "WILLIAN",
      "EMERSON",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Fundamentos da Tecnologia Mecânica",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Oficina de Ajustagem",
    "Ambientes_Homologados": [
      "Oficina de Ajustagem",
      "Oficina de Tornearia",
      "Sala de Aula 01"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "BARON",
      "FELIPE",
      "VINÍCIUS",
      "MONTIBELLER",
      "JONATHAS",
      "HÁLISON",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Fundamentos da Usinagem Mecânica",
    "Carga_Horaria_UC": 160,
    "Ambiente_Prioritario": "Oficina de Tornearia",
    "Ambientes_Homologados": [
      "Oficina de Tornearia",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "BARON",
      "VINÍCIUS",
      "MONTIBELLER",
      "FELIPE",
      "CHARLES",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Usinagem em Fresadora",
    "Carga_Horaria_UC": 160,
    "Ambiente_Prioritario": "Oficina de Tornearia",
    "Ambientes_Homologados": [
      "Oficina de Tornearia",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "BARON",
      "VINÍCIUS",
      "MONTIBELLER",
      "HÁLISON",
      "CHARLES"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Usinagem em Retificadora",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina de Tornearia",
    "Ambientes_Homologados": [
      "Oficina de Tornearia",
      "Lab. CAD",
      "CAM",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "BARON",
      "VINÍCIUS",
      "MONTIBELLER",
      "CHARLES",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Mecânico de Usinagem (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Fundamentos de CNC",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina de Tornearia",
    "Ambientes_Homologados": [
      "Oficina de Tornearia",
      "Lab. CAD",
      "CAM",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "BARON",
      "VINÍCIUS",
      "MONTIBELLER",
      "CHARLES",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Comunicação e Relações Interpessoais",
    "Carga_Horaria_UC": 40,
    "Ambiente_Prioritario": "Sala de Aula 04",
    "Ambientes_Homologados": [
      "Sala de Aula 04",
      "Sala de Aula 05",
      "Sala de Aula 01",
      "Sala de Aula da Marcenaria (Restrita)"
    ],
    "Docentes_Habilitados": [
      "ALINE",
      "FERRARESE",
      "CHARLES",
      "EDUARDO",
      "MURILLO",
      "JONATHAS",
      "SILVIO",
      "EMERSON",
      "CEZAR"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Fundamentos de Eletricidade e Hidráulica Básica",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. Eletrônica Veicular (Autotrônica)",
    "Ambientes_Homologados": [
      "Lab. Eletrônica Veicular (Autotrônica)",
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "HÁLISON",
      "WILLIAN",
      "EDUARDO",
      "TREVELIM",
      "CEZAR",
      "CLEBER",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Metrologia Aplicada",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. Metrologia Dimensional",
    "Ambientes_Homologados": [
      "Lab. Metrologia Dimensional",
      "Sala de Aula 04",
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "BARON",
      "FELIPE",
      "VINÍCIUS",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "MONTIBELLER",
      "JONATHAS",
      "HÁLISON",
      "VALTER"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Processos Mecânicos Básicos",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "MONTIBELLER",
      "VALTER",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "1º Termo",
    "Unidade_Curricular": "Segurança e Meio Ambiente",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 04",
    "Ambientes_Homologados": [
      "Sala de Aula 04",
      "Sala de Aula 05",
      "Sala de Aula 01",
      "Sala de Aula da Marcenaria (Restrita)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "MURILLO",
      "JONATHAS",
      "SILVIO",
      "VALTER"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "2º Termo",
    "Unidade_Curricular": "Eletricidade Aplicada a Veículos Pesados",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Lab. Eletrônica Veicular (Autotrônica)",
    "Ambientes_Homologados": [
      "Lab. Eletrônica Veicular (Autotrônica)",
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EDUARDO",
      "VALTER",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "2º Termo",
    "Unidade_Curricular": "Motores de Combustão Interna ciclo Diesel",
    "Carga_Horaria_UC": 160,
    "Ambiente_Prioritario": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "EDUARDO",
      "VALTER",
      "WILLIAN",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "2º Termo",
    "Unidade_Curricular": "Sistemas de Transmissão Mecânica",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "EDUARDO",
      "VALTER",
      "WILLIAN",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Eletroeletrônica Embarcada e Redes de Comunicação",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Sala de Aula 04",
    "Ambientes_Homologados": [
      "Sala de Aula 04",
      "Sala de Aula 05",
      "Sala de Aula 01",
      "Sala de Aula da Marcenaria (Restrita)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EDUARDO",
      "CEZAR",
      "CLEBER",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Manutenção de Implementos e Sistemas Especiais",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)",
      "Oficina de Ajustagem"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "EDUARDO",
      "WILLIAN",
      "EMERSON"
    ]
  },
  {
    "Curso": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
    "Termo_Semestre": "3º Termo",
    "Unidade_Curricular": "Sistemas Hidráulicos Avançados",
    "Carga_Horaria_UC": 160,
    "Ambiente_Prioritario": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "Ambientes_Homologados": [
      "Lab. Mecânica dos Fluidos (Pneumática",
      "Hidráulica)",
      "Oficina Mecânica Diesel (Veículos Pesados",
      "Agrícola)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "HÁLISON",
      "EDUARDO",
      "TREVELIM",
      "EMERSON",
      "WILLIAN"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Desenho e Modelagem 2D/3D",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 03 (Desenho Técnico)",
    "Ambientes_Homologados": [
      "Sala de Aula 03 (Desenho Técnico)",
      "Lab. CAD",
      "CAM",
      "Sala de Aula 01"
    ],
    "Docentes_Habilitados": [
      "JOSIAS",
      "HÁLISON",
      "VINÍCIUS",
      "JONATHAS",
      "FELIPE",
      "WILLIAN",
      "TREVELIM",
      "CHARLES",
      "CLEBER"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Eletricidade Básica e Circuitos Elétricos",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Lab. Eletrônica 01",
    "Ambientes_Homologados": [
      "Lab. Eletrônica 01",
      "Lab. Eletrônica 02 (Automação Predial)",
      "Lab. Comandos Elétricos"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "WILLIAN",
      "CHARLES",
      "EDUARDO",
      "FELIPE"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Fundamentos da Automação e Instrumentação",
    "Carga_Horaria_UC": 100,
    "Ambiente_Prioritario": "Lab. CLP e Microcontroladores",
    "Ambientes_Homologados": [
      "Lab. CLP e Microcontroladores",
      "Lab. Comandos Elétricos",
      "Lab. Mecânica dos Fluidos (Pneumática",
      "Hidráulica)"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "CEZAR",
      "JOSIAS",
      "HÁLISON",
      "ÉRICO",
      "CLEBER",
      "CHARLES",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Controladores Lógicos Programáveis (CLP)",
    "Carga_Horaria_UC": 100,
    "Ambiente_Prioritario": "Lab. CLP e Microcontroladores",
    "Ambientes_Homologados": [
      "Lab. CLP e Microcontroladores",
      "Lab. Comandos Elétricos",
      "Lab. Mecânica dos Fluidos (Pneumática",
      "Hidráulica)"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "CHARLES",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Eletrônica Analógica e Digital Aplicada",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Lab. Eletrônica 01",
    "Ambientes_Homologados": [
      "Lab. Eletrônica 01",
      "Lab. Eletrônica 02 (Automação Predial)",
      "Lab. Comandos Elétricos"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "CEZAR",
      "JOSIAS",
      "HEITOR",
      "CLEBER",
      "ÉRICO",
      "CHARLES",
      "HÁLISON",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Técnico em Automação Industrial",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Redes Industriais de Comunicação",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. CLP e Microcontroladores",
    "Ambientes_Homologados": [
      "Lab. CLP e Microcontroladores",
      "Lab. Comandos Elétricos",
      "Lab. Mecânica dos Fluidos (Pneumática",
      "Hidráulica)"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "CEZAR",
      "JOSIAS",
      "HÁLISON",
      "ÉRICO",
      "CLEBER",
      "CHARLES",
      "HEITOR",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Algoritmos e Lógica de Programação",
    "Carga_Horaria_UC": 100,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "CEZAR",
      "HEITOR",
      "HÁLISON",
      "CLEBER",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Análise e Modelagem de Sistemas",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CHARLES",
      "HÁLISON",
      "CEZAR"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Banco de Dados Relacional",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CEZAR",
      "CLEBER",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Fundamentos de Redes e Infraestrutura de TI",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CHARLES",
      "TREVELIM",
      "CEZAR",
      "CLEBER"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Desenvolvimento de Aplicações Web (Front-End)",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CEZAR",
      "CLEBER",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Desenvolvimento Web Back-End e APIs",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CEZAR",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Engenharia de Software e Métodos Ágeis",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CHARLES",
      "CEZAR"
    ]
  },
  {
    "Curso": "Técnico em Desenvolvimento de Sistemas",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Programação Orientada a Objetos",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "HEITOR",
      "CEZAR",
      "CLEBER",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Eletroeletrônica",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Ferramentas Digitais para o Mercado de Trabalho",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Lab. de Informática 01",
    "Ambientes_Homologados": [
      "Lab. de Informática 01",
      "Lab. de Informática 02",
      "Lab. Informática 03",
      "Inovação (FabLab)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "TREVELIM",
      "CEZAR",
      "JONATHAS",
      "JOSIAS",
      "HEITOR",
      "MURILLO",
      "CHARLES",
      "CLEBER",
      "ÉRICO",
      "EDUARDO"
    ]
  },
  {
    "Curso": "Técnico em Eletroeletrônica",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Fundamentos da Eletroeletrônica",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Lab. Eletrônica 01",
    "Ambientes_Homologados": [
      "Lab. Eletrônica 01",
      "Lab. Eletrônica 02 (Automação Predial)",
      "Lab. Comandos Elétricos"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "CHARLES",
      "EDUARDO",
      "FELIPE",
      "WILLIAN"
    ]
  },
  {
    "Curso": "Técnico em Eletroeletrônica",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Implementação de Sistemas Eletroeletrônicos Prediais",
    "Carga_Horaria_UC": 120,
    "Ambiente_Prioritario": "Oficina de Eletricidade",
    "Ambientes_Homologados": [
      "Oficina de Eletricidade",
      "Lab. Comandos Elétricos",
      "Lab. Máquinas Elétricas"
    ],
    "Docentes_Habilitados": [
      "TREVELIM",
      "ÉRICO",
      "CEZAR",
      "JOSIAS",
      "CLEBER",
      "HÁLISON",
      "CHARLES"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Eletroeletrônica Automotiva Básica",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. Eletrônica Veicular (Autotrônica)",
    "Ambientes_Homologados": [
      "Lab. Eletrônica Veicular (Autotrônica)",
      "Oficina Mecânica Automotiva (Veículos Leves)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EDUARDO",
      "VALTER",
      "EMERSON",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Fundamentos da Tecnologia Automotiva",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 03 (Desenho Técnico)",
      "Sala de Aula 05"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "VALTER"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Metrologia e Ajustagem Mecânica",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Lab. Metrologia Dimensional",
    "Ambientes_Homologados": [
      "Lab. Metrologia Dimensional",
      "Oficina de Ajustagem",
      "Oficina Mecânica Automotiva (Veículos Leves)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "BARON",
      "FELIPE",
      "VINÍCIUS",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "MONTIBELLER",
      "VALTER",
      "JONATHAS",
      "HÁLISON"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 03 (Desenho Técnico)",
      "Sala de Aula 05"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "MURILLO",
      "SILVIO",
      "VALTER"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Gerenciamento Eletrônico de Motores",
    "Carga_Horaria_UC": 100,
    "Ambiente_Prioritario": "Lab. Eletrônica Veicular (Autotrônica)",
    "Ambientes_Homologados": [
      "Lab. Eletrônica Veicular (Autotrônica)",
      "Oficina Mecânica Automotiva (Veículos Leves)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "VALTER"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Manutenção de Motores Ciclo Otto e Diesel",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Oficina Mecânica Automotiva (Veículos Leves)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Automotiva (Veículos Leves)",
      "Lab. Eletrônica Veicular (Autotrônica)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "EMERSON",
      "EDUARDO",
      "VALTER",
      "WILLIAN"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Sistemas de Freios, Suspensão e Direção",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Oficina Mecânica Automotiva (Veículos Leves)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Automotiva (Veículos Leves)",
      "Lab. Eletrônica Veicular (Autotrônica)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "WILLIAN",
      "EMERSON",
      "EDUARDO",
      "VALTER"
    ]
  },
  {
    "Curso": "Técnico em Manutenção Automotiva",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Transmissão Mecânica e Automatizada",
    "Carga_Horaria_UC": 40,
    "Ambiente_Prioritario": "Oficina Mecânica Automotiva (Veículos Leves)",
    "Ambientes_Homologados": [
      "Oficina Mecânica Automotiva (Veículos Leves)",
      "Lab. Eletrônica Veicular (Autotrônica)"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "FELIPE",
      "EDUARDO",
      "WILLIAN",
      "EMERSON"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Estatística Básica Aplicada ao Processo",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "MURILLO",
      "CHARLES",
      "HEITOR",
      "SILVIO",
      "EMERSON",
      "CEZAR",
      "JONATHAS"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Ferramentas da Qualidade e Análise de Falhas",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "SILVIO",
      "EMERSON",
      "CEZAR",
      "JONATHAS"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Fundamentos da Gestão da Qualidade",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "SILVIO",
      "EMERSON",
      "CEZAR",
      "JONATHAS"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "1º Semestre",
    "Unidade_Curricular": "Mapeamento e Padronização de Processos",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "HEITOR",
      "SILVIO",
      "EMERSON",
      "CEZAR",
      "JONATHAS"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Auditoria Interna e Sistemas de Gestão (ISO 9001)",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "JONATHAS",
      "SILVIO",
      "EMERSON"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Controle Estatístico de Processo (CEP)",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "JONATHAS",
      "SILVIO"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Custos da Qualidade e Produtividade",
    "Carga_Horaria_UC": 60,
    "Ambiente_Prioritario": "Sala de Aula 01",
    "Ambientes_Homologados": [
      "Sala de Aula 01",
      "Sala de Aula 02",
      "Sala de Aula 05",
      "Sala de Aula 03 (Desenho Técnico)"
    ],
    "Docentes_Habilitados": [
      "FERRARESE",
      "CHARLES",
      "MURILLO",
      "SILVIO",
      "JONATHAS"
    ]
  },
  {
    "Curso": "Técnico em Qualidade",
    "Termo_Semestre": "2º Semestre",
    "Unidade_Curricular": "Metrologia Dimensional e Análise de Sistemas de Medição",
    "Carga_Horaria_UC": 80,
    "Ambiente_Prioritario": "Lab. Metrologia Dimensional",
    "Ambientes_Homologados": [
      "Lab. Metrologia Dimensional",
      "Sala de Aula 01",
      "Sala de Aula 02"
    ],
    "Docentes_Habilitados": [
      "CHARLES",
      "BARON",
      "VINÍCIUS",
      "MONTIBELLER",
      "FELIPE",
      "WILLIAN",
      "MURILLO",
      "JONATHAS",
      "EMERSON"
    ]
  }
];

export const SENAI_BENS_BY_AMBIENTE: Record<string, BemPatrimonial[]> = {
  "20480007": [
    {
      "denominacao": "CADEIRA P/BIBLIOTECA AZUL/TIRMIS",
      "quantidade": 14
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO 24MB",
      "quantidade": 9
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 9
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 8
    },
    {
      "denominacao": "Monitor Dell de 23.8\" C2423H",
      "quantidade": 8
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO",
      "quantidade": 7
    },
    {
      "denominacao": "ARMÁRIO BAIXO C/PORTAS E GAVETAS DC 1811/LACHI",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA FIXA AZUL ROYAL ESTR.CONT./TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CONDICIONADOR DE AR 24.000 BTUS INVERTER/ MIDEA",
      "quantidade": 2
    },
    {
      "denominacao": "SENSOR ALINHAMENTO EM FRESADORA/VERTEX",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRAT.C/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "IMPRESSORA LASER MONO MEDIO PORTE/SAMSUNG",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO DC1663/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 1
    },
    {
      "denominacao": "REFRATÔMETRO PORTÁTIL / ATAGO",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS",
      "quantidade": 1
    }
  ],
  "20480008": [
    {
      "denominacao": "COMPASSO PONTAS P/TRAÇAR 150MM/PANTEC",
      "quantidade": 29
    },
    {
      "denominacao": "ESCALA DE AÇO INOXIDÁVEL 300MM 12P/STARRETT",
      "quantidade": 16
    },
    {
      "denominacao": "TRANSFERIDOR DE ÂNGULOS  UNIV./PANTEC",
      "quantidade": 13
    },
    {
      "denominacao": "MICRÔMETRO M.EXT.0A25MM-DIGITAL/MITUTOYO",
      "quantidade": 12
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150-0,01MM/STARRETT",
      "quantidade": 12
    },
    {
      "denominacao": "MICRÔMETRO M.EXT.50A75MM-DIG./MITUTOYO",
      "quantidade": 10
    },
    {
      "denominacao": "COMPASSO DE PONTAS 300MM / PANTEC",
      "quantidade": 9
    },
    {
      "denominacao": "BALCÃO TIPO VITRINE C/TAMPO DE GRANITO",
      "quantidade": 8
    },
    {
      "denominacao": "CADEIRA C/SAPATAS S/BRAÇOS VINIL AZUL",
      "quantidade": 7
    },
    {
      "denominacao": "ESCANTILHÃO MÉTRICO 60 GRAUS/PANTEC",
      "quantidade": 7
    },
    {
      "denominacao": "MICROMETRO INT.16-20MM C/ANEL MITUTOYO",
      "quantidade": 7
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA SEM BRAÇOS VINIL AZUL",
      "quantidade": 6
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150MM-0,01/MITUTOYO",
      "quantidade": 6
    },
    {
      "denominacao": "MICROMETRO INT.25-50MM 145-186 MITUTOYO",
      "quantidade": 5
    },
    {
      "denominacao": "CRONÔMETRO DIGITAL PORTÁTIL/CR 6Q",
      "quantidade": 4
    },
    {
      "denominacao": "MICRÔMETRO M.EXT.25A50MM-DIG./MITUTOYO",
      "quantidade": 4
    },
    {
      "denominacao": "CALIBRADOR TRAÇADOR ALT.300MM/MITUTOYO",
      "quantidade": 3
    },
    {
      "denominacao": "COMPARADOR DE DIÂM.INT.35/60MM/MITUTOYO",
      "quantidade": 3
    },
    {
      "denominacao": "BLOCO EM V MAGNÉTICO C/SUPERFÍCIES/MAHR",
      "quantidade": 2
    },
    {
      "denominacao": "BLOCO PARALELO DE GRANITO/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "BLOCO PARALELO EM GRANITO(PAR)/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRAT.C/BRAÇOS REGULÁV.PRETO/TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CALCO REGULAVEL COM MACACO STARRETT",
      "quantidade": 2
    },
    {
      "denominacao": "MICROMETRO INT.5-30MM 145-185 MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "MICRÔMETRO M.EXT.75A100MM-DIG./MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150MM-0,01/STARRETT",
      "quantidade": 2
    },
    {
      "denominacao": "RELÓGIO COMPARAD.DIG.12,7MM/0,5/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "RUGOSÍMETRO PORTÁTIL / MAHR",
      "quantidade": 2
    },
    {
      "denominacao": "RUGOSÍMETRO PORTÁTIL/ZEISS-TSK",
      "quantidade": 2
    },
    {
      "denominacao": "TRANSFERIDOR DE GRAUS: 0 A 180 GRAUS/STARRET",
      "quantidade": 2
    },
    {
      "denominacao": "APARELHO P/MEDIR DUREZA TIPO POLDI",
      "quantidade": 1
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO BAIXO - ÁRTICO DC 1648 / BARROS",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO P/ DURÔMETRO TAMPO E GRANITO",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO PARA PROJETOR DE PERFIS - DC 1466",
      "quantidade": 1
    },
    {
      "denominacao": "BLOCO PADRAO JG N 2 C 95 PECAS",
      "quantidade": 1
    },
    {
      "denominacao": "BLOCO PADRÃO PROTETOR-ESP.2MM/STARRET",
      "quantidade": 1
    },
    {
      "denominacao": "CALIBRADOR DE PAQUÍMETROS/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CALIBRADOR REL.COMP.CENTESIMAL/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CANTONEIRA EM GRANITO-PADR.90°/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "COMPARADOR DIÂM.INT.50/150MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CONDICIONADOR DE AR 24.000 BTU SPLIT / GREE",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.ACESSÓRIOS BLOCOS PADRÃO/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CONTADOR ROTACOES AUTOMATICAS MANUAL",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO DE GRANITO 300X500MM",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO GRANITO 630X630X120MM/DIGIMESS",
      "quantidade": 1
    },
    {
      "denominacao": "DURÔMETRO DIG.ROCKWELL BRINELL/FUTURE",
      "quantidade": 1
    },
    {
      "denominacao": "DURÔMETRO ELETRÔNICO DIG.PORTÁTIL/TIME",
      "quantidade": 1
    },
    {
      "denominacao": "FIEIRA P ARAME REF 188",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO DC 1698/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "JG AUXILIAR BLOCOS PADRAO NGB 002 20",
      "quantidade": 1
    },
    {
      "denominacao": "JG BLOCO PADRAO C DUAS PECAS GRAU 1",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO 3 ARAMES CALIBRADOS/HEXAGON",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO BLOCOS PADR.RETANG.122PÇS/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO PINOS CALIBRADOS DE PRECISÃO/MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "LUPA C CABO 60MM AUMENTO 2 VEZES",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR DE DUREZA PORTATIL POLDI",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR TENSÃO EM LÂM. DE SERRA/STARRET",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE SENO C/BASE MAGNÉTICA/ITAL",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE SENO SIMPLES-210X180X86MM/GIN",
      "quantidade": 1
    },
    {
      "denominacao": "MESA MED.C/BATENTE QUADR.90MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MESA PARA METROLOGIA 16 LUGARES",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO EXT DIG 0 A 25MM STARRETT",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO EXT RELOG COM 0A25MM MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO IMICRO 6 A 40MM TESA IT-87",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT IMICRO JG 11 A 20MM TESA",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT. 3 CONTATOS 40 A 50 MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.5-30MM 145/185 MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.PAQ.5A30MM-0,01/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.PAQUIM.5A30MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO INT. 2 CT-50A300MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.EXT.0A25MM-C/REL./MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.I. 3.CT.RET.20-50MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.INT. 3 CONT.-50 A 100MM(JG)/MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.INT. 3 CONT.6A100MM(JG)/MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.INT.3 CONT.6 A 12MM(JG)/MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "MICRÔMETRO M.INT.3CT.12A20MM(JG)/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR CORPORATIVO",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR DE VÍDEO 24 POLEGADAS - DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA MED.P/COORDENADAS CNC/HEXAGON",
      "quantidade": 1
    },
    {
      "denominacao": "NIVEL QUADRANGULAR 2,00X0,05MM",
      "quantidade": 1
    },
    {
      "denominacao": "NOTEBOOK ALTO DESEMPENHO",
      "quantidade": 1
    },
    {
      "denominacao": "NÍVEL A LASER LINHA VERDE",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUIMETRO DIG 150MM 500196 MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUIMETRO P MEDICAO ESPESSURA",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.RELOG.150-0,02/STARRETT",
      "quantidade": 1
    },
    {
      "denominacao": "PAR DE BLOCO EM V C/GRAMPO/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "PARALELOS ÓPT.INSP.MICRÔM.25MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "PENTE CALIBRADOR P/ROSCA MÉTRICA/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "PLANO ÓPTICO DE QUARTZO FUNDIDO/MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "PRISMA DUPLO ACO RETIF CAPAC 60X150 ALP",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA C/SUPORTE / EPSON",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR PERFIL VERT.DE BANCADA/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO 1.20X3.00/BOARD-NET",
      "quantidade": 1
    },
    {
      "denominacao": "RUGOSIMETRO PORTATIL-M4PI LITE-MAHR",
      "quantidade": 1
    },
    {
      "denominacao": "TRANSFERIDOR ANGULO UNIVERSAL",
      "quantidade": 1
    },
    {
      "denominacao": "TRAÇADOR DE ALT.300MM-0,02MM/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "WORKSTATION CORPORATIVO",
      "quantidade": 1
    },
    {
      "denominacao": "WORKSTATION CORPORATIVO COM 32GB DE RAM",
      "quantidade": 1
    }
  ],
  "20480011": [
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 16
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA MDF C/PORTA LIVROS",
      "quantidade": 13
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA C/ PORTA LIVROS ÁRTICO",
      "quantidade": 3
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CONDICIONADOR DE AR 22.000 BTUS INVERTER/ PHILCO",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE TRABALHO INF 1200X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 1
    }
  ],
  "20480013": [
    {
      "denominacao": "CAVALETE GIRATÓRIO P/MOTOR TRANSM/RAVEN",
      "quantidade": 11
    },
    {
      "denominacao": "CALIBRADOR P/VELAS/SNAP-ON FB301A",
      "quantidade": 4
    },
    {
      "denominacao": "CARRINHO PARA FERRAMENTAS C/7 GAVETAS",
      "quantidade": 4
    },
    {
      "denominacao": "CARRINHO PARA FERRAMENTAS MANUTENÇÃO",
      "quantidade": 4
    },
    {
      "denominacao": "JOGO CHAVES FIXAS EM MM 6A3/TRAMONTINA",
      "quantidade": 4
    },
    {
      "denominacao": "ARMÁRIO C/ PAINÉIS P/ FERRAMENTAS",
      "quantidade": 3
    },
    {
      "denominacao": "CHAVE FIXA 6 A 32MM/TRAMONTINA",
      "quantidade": 3
    },
    {
      "denominacao": "ELEVADOR AUTOMOTIVO ELÉTRICO 4100KG",
      "quantidade": 3
    },
    {
      "denominacao": "EXTRATORES P/ROLAMENTOS AUTOM./RAVEN",
      "quantidade": 3
    },
    {
      "denominacao": "SACA POLIA C/3 GARRAS ARTICUL. 200MM/GEDORE",
      "quantidade": 3
    },
    {
      "denominacao": "TORQUÍMETRO TIPO ESTALO 0A60NM/0A40LBFPÉ",
      "quantidade": 3
    },
    {
      "denominacao": "ANALISADOR VAZAMENTO DE CILINDROS/PLANA",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PARA VESTIÁRIO ÁRTICO - DC 1709",
      "quantidade": 2
    },
    {
      "denominacao": "BLOCO PRISMATICO 4 ENTALHES WENZEL",
      "quantidade": 2
    },
    {
      "denominacao": "BOMBA DE VÁCUO C/ADAPTADORES /PLANATC",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO FECHADO PORTA FERRAM./BEZAFER",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO P/FERRAM.MANUTENÇÃO/BEZAFER",
      "quantidade": 2
    },
    {
      "denominacao": "CHAVE FIXA MINI 14 PEÇAS/KS TOOLS",
      "quantidade": 2
    },
    {
      "denominacao": "CHAVE SOQUETE JG 27PÇS 10A32M/TRAMONTINA",
      "quantidade": 2
    },
    {
      "denominacao": "COMPARADOR DE DIÂM.INT.35/60MM/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "COMPARADOR DIÂM.INT.50/150MM/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "ENCOLHEDOR MOLA DA SUSP. DIANT./RAVEN",
      "quantidade": 2
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 2
    },
    {
      "denominacao": "JG.CHAVE SOQUETE 10 A 32MM 29PÇS/STANLEY",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO 38 SOQUETES E 5 ACESSÓRIOS/GEDORE",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVE COMBINADA 6 A 41MM/GEDORE",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVES FIXAS EM POLEGADAS/BELZER",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVES SOQ.C/CABO CANHÃO/TRAMONT",
      "quantidade": 2
    },
    {
      "denominacao": "MACACO HIDRÁULICO TIPO JACARÉ 2T/BOVENAU",
      "quantidade": 2
    },
    {
      "denominacao": "MANÔMETRO P/PRESS.ÓLEO DO MOTOR/KA005",
      "quantidade": 2
    },
    {
      "denominacao": "MANÔMETRO TESTE PRES.ÓLEO MOT./PLANATC",
      "quantidade": 2
    },
    {
      "denominacao": "MEDIDOR DE VAZÃO CILINDRO MOTOR/ PLANATC",
      "quantidade": 2
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA FIXA BANCADA N 5 SOMAR",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA UNIVERSAL NR. 5 SOMAR",
      "quantidade": 2
    },
    {
      "denominacao": "RELÓGIO COMPARADOR 1MM - 0,001MM/MITUTOYO",
      "quantidade": 2
    },
    {
      "denominacao": "ROUPEIRO DE AÇO C/20 PORTAS DR-2024",
      "quantidade": 2
    },
    {
      "denominacao": "TALHADEIRA/PUNÇÃO/SACA-PINO(JG)/GEDORE",
      "quantidade": 2
    },
    {
      "denominacao": "TORQUÍMETRO DE ESTALO 25 A 135NM/KSTOOLS",
      "quantidade": 2
    },
    {
      "denominacao": "TRANSFERIDOR DE ANGULOS STARRETT C493MB",
      "quantidade": 2
    },
    {
      "denominacao": "ALINHADOR COMPUTADORIZADO RODAS SUN",
      "quantidade": 1
    },
    {
      "denominacao": "ALINHADOR DE DIREÇÃO COMPUTADORIZADO",
      "quantidade": 1
    },
    {
      "denominacao": "ALINHADOR DE FAROL HELLA MOD. SEG IV",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO C/PAINEL P/FERRAMENTAS ÁRTICO DC1735",
      "quantidade": 1
    },
    {
      "denominacao": "ARRASTE PARAFUSO 28322 D-40 BROCTEL",
      "quantidade": 1
    },
    {
      "denominacao": "BALANCEADOR DE RODAS COMPUTAD.HOFMANN",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA 2 GAV.1680X660X900MM SECURIT",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 79996",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 86517",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 86518",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 86519",
      "quantidade": 1
    },
    {
      "denominacao": "BAU GABINETE COM 04 GAVETAS- KING TONY",
      "quantidade": 1
    },
    {
      "denominacao": "BEBEDOURO 200L C/ 4 TORNEIRAS",
      "quantidade": 1
    },
    {
      "denominacao": "BIGORNA DE ACO",
      "quantidade": 1
    },
    {
      "denominacao": "CALIBRADOR DE PNEUS MICROPROC./PLANATC",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO COM 05 GAVETAS - KING TONY",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE FUNCIONAM MOTORES DC 336",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE L TIPO RIBE 5 A 14/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "COMPARADOR DIÂM.INT.DIG.18A35MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. DE ELETROHIDRÁULICA INDUSTRIAL/FESTO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO DIDÁTICO AUTOMOTIVA: FREIO ABS",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO DIDÁTICO AUTOMOTIVA:DIREÇÃO HIDRÁULICA",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO DE FERRO FUNDIDO 60X800",
      "quantidade": 1
    },
    {
      "denominacao": "DESMONTADORA DE PNEUS/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "EIXO TRASEIRO CORSA SEDAN GM",
      "quantidade": 1
    },
    {
      "denominacao": "EIXO TRASEIRO GOL",
      "quantidade": 1
    },
    {
      "denominacao": "EIXO TRASEIRO SANTANA",
      "quantidade": 1
    },
    {
      "denominacao": "EQUIPAMENTO PARA SANGRIA DE FREIO",
      "quantidade": 1
    },
    {
      "denominacao": "EQUIPAMENTO TESTE SIST.ARREFEC./KA-036",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERILHADORA BANCADA J1 463",
      "quantidade": 1
    },
    {
      "denominacao": "ESTETOSCÓPIO KENT P/MOTORES/PLANATC",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR COM 7 GARRAS P ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR DE TERMINAL DE DIRECAO",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR DE TERMINAL DE DIREÇÃO/RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR DO VOLANTE DE DIRECAO A-33777",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR POLIA C 3 GARRAS",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR TERMINAL DE DIREÇÃO VW GM/RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA N.VW-5062 BASE DE PRESSAO",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA P/FIXACAO VW-004-V",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA P/TORQUEAR PORCA TRASEIRO",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA P/ZERAR O SUBTO",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAL P/CARBURADORES /PRIMAX",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE COLUNA 30MM/YADOYA",
      "quantidade": 1
    },
    {
      "denominacao": "GUINCHO HIDRÁULICO MÓVEL 1000KG/RIBEIRO",
      "quantidade": 1
    },
    {
      "denominacao": "INSTRUMENTO MED.ÂNG.TORÇÃO 1/2P/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "JG. SOQUETE SEXTAVADO 1/2 C/22PÇS KING TONY",
      "quantidade": 1
    },
    {
      "denominacao": "JG.ARCO DE SERRA 5LIMAS-TRENA-REGUA-RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "JG.CHAVE FIXA ESTRE.COMB.POLIG.AJUST.KING TONY",
      "quantidade": 1
    },
    {
      "denominacao": "JG.CHAVE SOQUETE  3/8 A 1 3/4P  22PÇS/ TRAMONTINA",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVE COMBINADA 6 A 22MM GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVES 30 SOQUETES E ACESS./GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVES ESTRELA 6A32MM/TRAMONTINA",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVES FIXAS 1/4 A 2P/BELZER",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO DE MICROMETRO REF S 436MC RL",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO DE MICROMETRO S 436 C RL",
      "quantidade": 1
    },
    {
      "denominacao": "KIT SIMULADOR AR CONDICIONADO VEICULAR",
      "quantidade": 1
    },
    {
      "denominacao": "MACACO HIDRÁULICO TELESCÓPICO/MARCON",
      "quantidade": 1
    },
    {
      "denominacao": "MARTELETE IMPACTO M.1/2 08 BITS  5/16-KING TONY",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR COMPRESSÃO DO MOTOR/PLANATC",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N 3 FIXO AZUL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N° 3",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA, FIXA, SOMAR N. 3",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA PARA BANCADA N.5",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE LAVAR PEÇAS 220V",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE LAVAR PEÇAS/BRUSQUE",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE LAVAR PEÇAS/MARCON",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA LIMP. TESTE INJETOR ALTA PRESSÃO",
      "quantidade": 1
    },
    {
      "denominacao": "PAINEL SIMULADOR ELETROHIDRÁULICA/FESTO",
      "quantidade": 1
    },
    {
      "denominacao": "PEDESTAL DE FERRO FUNDIDO SIC 612",
      "quantidade": 1
    },
    {
      "denominacao": "PRENSA HIDRÁULICA VERTICAL 15T/BOVENAU",
      "quantidade": 1
    },
    {
      "denominacao": "RAMPA PNEUMÁTICA P/ALINHAM.VEÍC./PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "REBITADOR LONAS FREIOS",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADORA P SEDE VALV BLACK BECKER",
      "quantidade": 1
    },
    {
      "denominacao": "SACA POLIA 3 GARRAS 5P 120MM",
      "quantidade": 1
    },
    {
      "denominacao": "SACA-FILTRO DE ÓLEO/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "SISTEMA DE EXAUSTÃO PORTÁTIL VEICULAR",
      "quantidade": 1
    },
    {
      "denominacao": "TELEVISÃO LED DE 42 POLEGADAS / LG",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO C/RELÓGIO 8 A 40NM/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO DE ESTALO 40 200NM",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO TIPO ESTALO",
      "quantidade": 1
    },
    {
      "denominacao": "UNIDADE TREINAMENTO HIDRAULICO VICKERS",
      "quantidade": 1
    },
    {
      "denominacao": "VEÍCULO LÍNEA 1.9 16V COR PRATA  -FIAT",
      "quantidade": 1
    },
    {
      "denominacao": "VW 156 SOQUETE ALLEN 8MM",
      "quantidade": 1
    },
    {
      "denominacao": "VW 163B SOQUETE SEXTAVADO 46MM",
      "quantidade": 1
    },
    {
      "denominacao": "VW 243 DISPOSITIVO P COL ROLAMENTOS",
      "quantidade": 1
    },
    {
      "denominacao": "VW 247 ANEL PADRAO 60MM",
      "quantidade": 1
    },
    {
      "denominacao": "VW 252D ANEL PADRAO 77MM",
      "quantidade": 1
    },
    {
      "denominacao": "VW 252E ANEL PADRAO 77 5MM",
      "quantidade": 1
    },
    {
      "denominacao": "VW 294 DISPOSITIVO P REGULAR GARFOS",
      "quantidade": 1
    },
    {
      "denominacao": "VW 295 TOCA PINO P REMOVER ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "VW 296 EXTRATOR CX MUDANCA DA CARCACA",
      "quantidade": 1
    },
    {
      "denominacao": "VW 311 DISPOSITIVO P REMOVER INST VALVU",
      "quantidade": 1
    },
    {
      "denominacao": "VW 401 PLACA BASE PARA A PRENSA",
      "quantidade": 1
    },
    {
      "denominacao": "VW 405 DISPOSITIVO",
      "quantidade": 1
    },
    {
      "denominacao": "VW 406 CALCO EM V 2 PECAS",
      "quantidade": 1
    },
    {
      "denominacao": "VW 407 TOCA PINO EXTRAIR E COLOC FLANGE",
      "quantidade": 1
    },
    {
      "denominacao": "VW 408 TOCA PINO P EXTRAIR E COLOC ROLA",
      "quantidade": 1
    },
    {
      "denominacao": "VW 409 TOCA PINO P EXTRAIR",
      "quantidade": 1
    },
    {
      "denominacao": "VW 411 TOCA PINO P EXTRAIR",
      "quantidade": 1
    },
    {
      "denominacao": "VW 452 SUPORTE MONTAG CX MUDANCAS SINCR",
      "quantidade": 1
    },
    {
      "denominacao": "VW 801 SUPORTE DA ARVORE MANIVELAS",
      "quantidade": 1
    },
    {
      "denominacao": "VW-053 (10-204) COLOCADOR DOS ANEIS",
      "quantidade": 1
    },
    {
      "denominacao": "VW-062 30-205 BASE DE PRESSAO",
      "quantidade": 1
    },
    {
      "denominacao": "VW-065 COLOCADOR VEDADOR LAT.TRANSMISSA",
      "quantidade": 1
    },
    {
      "denominacao": "VW-068 40-201 SOQUETE ESPECIAL",
      "quantidade": 1
    },
    {
      "denominacao": "VW-3039 LUVA DE INSTALACAO DOS MANCAIS",
      "quantidade": 1
    },
    {
      "denominacao": "VW-385 DISPOSITIVO AJUSTAR O PINHAO 4 P",
      "quantidade": 1
    },
    {
      "denominacao": "VW-5058 SACADOR DOS ANEIS",
      "quantidade": 1
    },
    {
      "denominacao": "VW-521 DISPOSITIVO P/AJUSTAGEM",
      "quantidade": 1
    },
    {
      "denominacao": "VW-5385/1",
      "quantidade": 1
    },
    {
      "denominacao": "VW-541 DISPOSITIVO FIXAR CABECOTE MOTOR",
      "quantidade": 1
    },
    {
      "denominacao": "VW-5456 SUPORTE P/SOLTAR A ARVORE",
      "quantidade": 1
    },
    {
      "denominacao": "VW-546 ALAVANCA P/COMPRIMIR TUCHOS VALV",
      "quantidade": 1
    },
    {
      "denominacao": "W 104B EXTRATOR ROLAMENTO PINHAO",
      "quantidade": 1
    },
    {
      "denominacao": "WFE 1 FERRAM P MEDIR PROFUND PINHAO",
      "quantidade": 1
    },
    {
      "denominacao": "WFE 1 FERRAMENTA P MEDIR PROFUNDIDADE",
      "quantidade": 1
    },
    {
      "denominacao": "WFE 7 SOQUETE 17 16P BELZER ITMA",
      "quantidade": 1
    }
  ],
  "20480014": [
    {
      "denominacao": "FERRAMENTAS ESPECIAIS",
      "quantidade": 6
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL",
      "quantidade": 5
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL AUTOMOTIVO /MINIPA",
      "quantidade": 5
    },
    {
      "denominacao": "PRATELEIRA MOVEL P MEC AUT DC 131",
      "quantidade": 5
    },
    {
      "denominacao": "CAVALETE C/CATRACA P/12 TON. CAMINHÃO/FORTCH",
      "quantidade": 4
    },
    {
      "denominacao": "MOCHILEIRO 6 PORTAS C/ CHAVES - DC 1618",
      "quantidade": 4
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO TRUE RMS- BLUETOOTH",
      "quantidade": 3
    },
    {
      "denominacao": "ARMARIO P/FERRAMENTAS ESPECIAIS DCE 117",
      "quantidade": 3
    },
    {
      "denominacao": "CAVALETE GIRATÓRIO P/MOTOR TRANSM/RAVEN",
      "quantidade": 3
    },
    {
      "denominacao": "CAVALETE UNIV. GIRAT.C/REDUTOR P/ MOTOR/MERCEDES B",
      "quantidade": 3
    },
    {
      "denominacao": "COMPARADOR DIÂM.INT.50/150MM/MITUTOYO",
      "quantidade": 3
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL AUTOMOTIVO/MINIPA",
      "quantidade": 3
    },
    {
      "denominacao": "PEÇA INTERMEDIARIA DE TUBO P/REMOÇÃO ROLAM.",
      "quantidade": 3
    },
    {
      "denominacao": "PRATELEIRA MOVEL DC 131",
      "quantidade": 3
    },
    {
      "denominacao": "SACA POLIA C/2 GARRAS DESLIZ. 170MM/TRAMONTINA",
      "quantidade": 3
    },
    {
      "denominacao": "ADAPTADOR P/SUBSTITUIR O SACADOR",
      "quantidade": 2
    },
    {
      "denominacao": "APOIO CUBO RODA W 9834458900630000 - MB",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA MÓVEL C/ MORSA NÚMERO 3",
      "quantidade": 2
    },
    {
      "denominacao": "CAIXA TRANSMISSÃO SINCRONIZADA CAMINHÃO/EATON",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO FECHADO PARA FERRAMENTAS",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO FECHADO PORTA FERRAM./BEZAFER",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO P/FERRAMENTAS C/4 GAVETAS/MARCON",
      "quantidade": 2
    },
    {
      "denominacao": "CAVALETE GIRATÓRIO P/CAIXA DE CÂMBIO",
      "quantidade": 2
    },
    {
      "denominacao": "CAVALETE GIRATÓRIO P/MOTORES DIESEL/RAVEN",
      "quantidade": 2
    },
    {
      "denominacao": "CAVALETE P MONTAGEM E DESMONT MOTOR",
      "quantidade": 2
    },
    {
      "denominacao": "DISPOSITIVO P/ DESMONTAR CORREIA",
      "quantidade": 2
    },
    {
      "denominacao": "EQUIP. P/TESTE DE BICO INJETOR",
      "quantidade": 2
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W63658900210000 MB",
      "quantidade": 2
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 000 589 16 33 MB",
      "quantidade": 2
    },
    {
      "denominacao": "JG CHAVE BOCA FIXA  6 A 32MM 12PÇS/TRAMONTINA",
      "quantidade": 2
    },
    {
      "denominacao": "JG.CHAVE COMB.(FIXA/ESTRELA) 6A41MM/TRAMONTINA",
      "quantidade": 2
    },
    {
      "denominacao": "JG.CHAVE ESTRELA 6 A 32MM/ TRAMONTINA",
      "quantidade": 2
    },
    {
      "denominacao": "JG.CHAVE SOQUETE 28PÇS 10 A 32MM / SATA",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVES COMBINADAS 6A32MM/CORNETA",
      "quantidade": 2
    },
    {
      "denominacao": "MACACO HIDRÁULICO TIPO GARRAFA 12 TON.",
      "quantidade": 2
    },
    {
      "denominacao": "MACACO HIDRÁULICO TIPO GARRAFA 12 TON./VONDER",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA DE BANCADA Nº 3/BRASFIXO",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA FIXA BANCADA N 5 SOMAR",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR DIESEL 4 CILINDROS  FPT-EURO V",
      "quantidade": 2
    },
    {
      "denominacao": "SOPRADOR TÉRMICO 127V /BLACK&DECKER",
      "quantidade": 2
    },
    {
      "denominacao": "SUPORTE EXTRAÇÃO P/PISTA INT. ROLAMENTO",
      "quantidade": 2
    },
    {
      "denominacao": "SUPORTE P/CAIXA DE CÂMBIO",
      "quantidade": 2
    },
    {
      "denominacao": "TORQUIMETRO TIPO ESTALO 10 A 50N.M",
      "quantidade": 2
    },
    {
      "denominacao": "ADAPTADOR C/ 6 PINOS P/CILINDRO HIDRAULICO",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR DE 1/2 X 3/4P BELZER",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR DE ROSCA C/PEÇA DE CONTRAPRESSÃO",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR M10X1X173 C/NIPLE DE ACOPLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR M65X2XM65X2 (RPSCA EXT.)P/EXTRATOR",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR M65X2XM65X2 (RPSCA) P/EXTRATOR",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR MED COMPRESSAO 403589002100MBB",
      "quantidade": 1
    },
    {
      "denominacao": "ADAPTADOR P/REMOVER O ROLAM.C/DISPOSITIVO",
      "quantidade": 1
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO DIGITAL  VA-350",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL 98 345 589 02 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL BIPART.P/EXTR. W9837058902340000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL BIPARTIDO 589 62 63 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL BUCHA FREIO W9835058902630000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL P/COLOC.GUARDA PÓ DO CUBO DA RODA TRAS.",
      "quantidade": 1
    },
    {
      "denominacao": "ANEL W 98 345 589 02 63 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "APARELHO DE COMPROVAÇÃO C/ VALVULA LIM.",
      "quantidade": 1
    },
    {
      "denominacao": "APOIO BUCHAS PINO W38958900630000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "APOIO CUBO RODA W 9834558901630000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "APOIO ESF. ENGREN W 9834558905630000-MB",
      "quantidade": 1
    },
    {
      "denominacao": "APOIO VED.PINO W38958901630000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "APOIO W 98 350 589 01 43 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "AQUECEDOR INDUTIVO PORTÁTIL/JAMO",
      "quantidade": 1
    },
    {
      "denominacao": "ARMARIO DE ACO VESTIARIO 4 LUG MOD 104",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO BAIXO 2 MTS - ÁRTICO",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO BAIXO ÁRTICO - DC1648",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO C/PAINEL P/FERRAMENTAS ÁRTICO DC1735",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO PAINEL P/FERR. - ÁRTICO DC-1735 / LCC",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA 2 GAV.1680X660X900MM SECURIT",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 79997",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADIERA C 2 GAVETAS 79998",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADIERA C 2 GAVETAS N 79973",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA P MONTAGEM DC 52",
      "quantidade": 1
    },
    {
      "denominacao": "BANDACA MADEIRA C 2 GAVETAS N 79995",
      "quantidade": 1
    },
    {
      "denominacao": "BARRA APOIO P/VALV. W9836658901310000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "BARRA DE APOIO P/MONTAG.E DESMONT.VALVULAS",
      "quantidade": 1
    },
    {
      "denominacao": "BASE W 98 350 589 01 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "BEBEDOURO DE PRESSÃO C/BRAILE 110V",
      "quantidade": 1
    },
    {
      "denominacao": "BLOCO MAGNETICO 361589002100 MBB",
      "quantidade": 1
    },
    {
      "denominacao": "BOMBA ELETRICA W98422589007100 MB",
      "quantidade": 1
    },
    {
      "denominacao": "BOMBA MANUAL",
      "quantidade": 1
    },
    {
      "denominacao": "BOMBA P/TESTE VAZAMENTO SIST.REFRIGERAÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "BUCHA",
      "quantidade": 1
    },
    {
      "denominacao": "BUCHA COL.VALVULA W9835258901430002 MB",
      "quantidade": 1
    },
    {
      "denominacao": "BUCHA P/MONTAR VEDADOR DIANT. DA ARVORE",
      "quantidade": 1
    },
    {
      "denominacao": "BUCHA W 98 350 589 00 43 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "CABO ARTICULADO C/ ENCAIXE DE 1/2P",
      "quantidade": 1
    },
    {
      "denominacao": "CABO DE FORÇA TIPO T 3287",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA  DE MUDANÇA G 210-16 M. B",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE CAMBIO MERCEDES",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE CAMBIO SEM BOMBA DE OLEO",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE MUDANCAS EATON FS-5306A",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE MUDANÇA G33",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE MUDANÇA GO190 6/8,2-1",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE REFRIGERACAO W 346 589 00 63 MB",
      "quantidade": 1
    },
    {
      "denominacao": "CAIXA DE TRANSFERENCIA 345 280 07 01 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "CALCOS DE FIXACAO 589 59 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "CAMBIO G 85-6 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "CAMBIO ZF",
      "quantidade": 1
    },
    {
      "denominacao": "CAMINHAO ATEGO 2425 MERCEDES DVN-1708",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO MANUT M 5 SECURIT C GAVETA",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P/FERRAM.MANUTENÇÃO/BEZAFER",
      "quantidade": 1
    },
    {
      "denominacao": "CATRACA SIMPLES DE 1/2P GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE FUNCIONAM MOTORES DC 336",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE GIRATORIO P/MOTOR OM 355",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE GIRATORIO PARA EIXOS DIANTEIRO",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE GIRATÓRIO P/MOTOR/TRANSMISSÃO",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE PARA MOTOR",
      "quantidade": 1
    },
    {
      "denominacao": "CAVALETE PATA MOTOR MOD. OM 906LA",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE COMBINADA JOGO 6 A 41MM TRAMONTINA",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE ESTRELA 6 A 32MM / TRAMONTINA",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE FIXA  6 A 32MM TRAMONTINA",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE P/ FLANGE",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE TETRAGONAL 74MM FIXA P/SOLTAR FILTRO",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE TIPO BIELA(PLP)JG C/11PÇS/KS TOOLS",
      "quantidade": 1
    },
    {
      "denominacao": "CINTA INSERÇÃO ANEIS 60A125MM/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "CJ CAMBIO 6752601600 MB",
      "quantidade": 1
    },
    {
      "denominacao": "CJ DIRECAO HIDR ZF 345468101 MB",
      "quantidade": 1
    },
    {
      "denominacao": "CJ DIRECAO HIDR ZF 3504600101 MB",
      "quantidade": 1
    },
    {
      "denominacao": "CJ ESTRANGULADOR CONST 98449589046300MBB",
      "quantidade": 1
    },
    {
      "denominacao": "COMPARADOR CAPAC 20MM 001589532100 MBB",
      "quantidade": 1
    },
    {
      "denominacao": "COMPARADOR DE DIÂM.INT.35/60MM/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO DE EIXO TRASEIRO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO EIXO DIANTEIRO 682 330 70 00 MB",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO EIXO TRASEIRO (HL 2)",
      "quantidade": 1
    },
    {
      "denominacao": "DIAGNOSTICO P/INJECAO TECNOMOTOR TM526",
      "quantidade": 1
    },
    {
      "denominacao": "DISP ANEL ELAST W 9835058903430000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISP CONEC TUBOS W 9838758900630000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISP CONEC TUBOS W38758903630000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISP EMBOLO W 9835058904430000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISP ROL CONICOS W35458900210000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISP VALV FREIO W 9835058900310000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOS AJUSTE PINHAO 385589042100 MBB",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOS ARV PRIM W 00058908350000-MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO 321 589 04 21 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO 321 589 12 33 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO 589 67 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO 98 352 589 00 21 0000",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO AJUSTE P/REGUL. ROLAMENTOS PINHÃO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO AJUSTE W9835458901210000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO BLOQUEADOR P/RODA ACIONAM.COMPRESS",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE AJUSTE MEDIÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE AJUSTE P/PROFUND.DO PINHÃO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE DESMONT. P/REMOVER A PARTE DIANT.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE DESMONTAGEM P/REMOVER DIANT.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE EXTRAÇÃO P/TAMPA DA CARCAÇA",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE IMOBILIZAÇÃO/FIXAR",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE MONTAGEM P/ ANEL RETENÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE MONTAGEM P/ANEL DE RETENÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO DE REMOÇÃO TAMPA TRAS. CAMBIO",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO ELEVADOR P/ CONJ. DE ARVORES",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO ELEVADOR P/ CONJ.DE ARVORES",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO ELEVADOR P/MONTAR-DESM.CABEÇOTE",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO MONTAGEM CONJ.ENGRENAGEM",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO P/ REMOÇÃO ARVORE INTERM./SECUND.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO P/COLOCAR RETENTOR",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO P/FIXAR A ARVORE PRIMARIA",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO REG.BOMBA W9835258900210000",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO REG.ROL.W35458900210000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 345 589 00 59 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 350 589 00 35 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 350 589 00 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 350 589 13 63 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 354 589 01 21 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W 98 370 589 00 59 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO W- 321 589 04 21 0000",
      "quantidade": 1
    },
    {
      "denominacao": "DÉCADA RESISTIVA/MINIPA MDR 611",
      "quantidade": 1
    },
    {
      "denominacao": "EIXO TRASEIRO HL7/025DC-13 29:24 D7 40698",
      "quantidade": 1
    },
    {
      "denominacao": "EQUIP. P/TESTE DE BICO INJETOR/RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "EQUIPAMENTO TESTE SIST.ARREFEC./KA-036",
      "quantidade": 1
    },
    {
      "denominacao": "EQUIPAMENTO W- 385 589 00 21 0000",
      "quantidade": 1
    },
    {
      "denominacao": "ESFERAS DE PRECISÃO JG C/75PÇS/HEXAGON",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERIL AR MOTOR 80000 R.P.M.",
      "quantidade": 1
    },
    {
      "denominacao": "ESPIGA QUADRADA 98 345 589 06 07 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "ESPIGA QUADRADA P/O ANEL DE REGUL.FOLGA",
      "quantidade": 1
    },
    {
      "denominacao": "ESTAÇÃO DE SOLDAGEM 180 A 450°C / WELLER",
      "quantidade": 1
    },
    {
      "denominacao": "EXT BRACO DIR HIDR. W 9835058902330000MB",
      "quantidade": 1
    },
    {
      "denominacao": "EXT EMBOLO ANEIS W9835058910330000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "EXTENSAO CURTA DE 1/2P BELZER",
      "quantidade": 1
    },
    {
      "denominacao": "EXTENSAO LONGA DE 1/2P BELZER",
      "quantidade": 1
    },
    {
      "denominacao": "EXTR DISCO W 9835058909330000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 4 W 98 350 589 00 33 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 98 321 589 02 35 0000 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 98 345 589 11 33 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 98 350 589 05 33 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 98 370 589 00 33",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR 98 370 589 01 33 0000",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR BÁSICO",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR DE ANTI-CAMARA",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR INT 30-37MM M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/ ANTICAMARA",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/ EIXO MARCHA RÉ E PINOS DAS MOLAS",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/ PORTA INJETOR",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/ REMOÇÃO (FLANGE ACLOPAM.CUBO RODA)",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/PISTA INT.ROLAM.DE ROLETES",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/RETENTOR DIANT.DA ARVORE",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR P/SUPORTE DE EXTRAÇÃO PISTA INT.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR PISTA INT.W9835058901330000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR PISTA ROL. W983505890130000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR PORTA INJETOR W35258900330000",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR W 98 344 589 00 33 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR W 98 345 589 12 33 0000 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR W 98 350 589 03 33 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR W 98 364 589 33 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESP M.B. 000 589 33 33 0000",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W 00058909050000-MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W 03558901330000 -MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W 10058904330000 -MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W 30558901150000 -MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W00058901130000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W00058968030000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W18758900530000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W31258901370000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W31258907330000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W315589903390000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W32158902070000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W32158904330000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W32658900150001 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W34358900400000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W35258900210000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W35258900430001 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W35258901430000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W63658902530000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA ESPECIAL W980058906030000  MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA P/MONTAR-DESMONT. VALVULAS MOTOR",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA W3528901310000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS 343 589 02 33 000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 305 589 01 15 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 312 589 00 03 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 314 589 00 03 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 314 589 00 07 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 321 589 01 07 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 321 589 08 15 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 343 589 00 33 0001",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 343 589 00 33 0002",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 589 07 33 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 589 09 05 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 589 11 05 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS 589 58 63 0000 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS M.B. 589 00 43",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 000 589 01 23 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 302 589 00 61 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 302 589 01 07",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 321 589 00 15 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 321 589 02 15 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 321 589 04 35",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 327 589 02 15 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS ESPECIAIS W 363 589 06 63 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTAS W- 000 589 89 33 0000",
      "quantidade": 1
    },
    {
      "denominacao": "FONTE ALIMENTAÇÃO AJUST.0 A 30V-5A/ POLITERM",
      "quantidade": 1
    },
    {
      "denominacao": "FUSO COL.CUBO RODA W9835058902430000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "FUSO HIDRÁULICO",
      "quantidade": 1
    },
    {
      "denominacao": "GABARITO REGUL 2 PECAS P W 001 589 41 21",
      "quantidade": 1
    },
    {
      "denominacao": "GANCHO REM.FLANGE  W31258904350000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "GARFO P/GIRAR MOTOR W36658900630000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 1
    },
    {
      "denominacao": "JG SOQUETES 3/4P - MARCA TOBU",
      "quantidade": 1
    },
    {
      "denominacao": "JG.CHAVE SOQUETE 10 A 32MM 29PÇS/STANLEY",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO  38 SOQUETES/ 6 ACESSORIOS 10MM-1.1/4P",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO 38 SOQUETES E 5 ACESSÓRIOS/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVE ESTRELA 10 PECAS GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVE SOQUETE 10 A 32MM ENC.1/2P",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO COMPARADOR C/PROLON.MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO DE REPARAÇÃO DE VELAS INCANDESCENTES",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO FERRAMENTAS P/ DESM.-MONTAR VALVULAS",
      "quantidade": 1
    },
    {
      "denominacao": "JUNTA UNIVERSAL DE 1/2P BELZER",
      "quantidade": 1
    },
    {
      "denominacao": "LUVA ENCAIXE W32258900070000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL DE MONTAG. A GOLPES P/INJETOR DE OLEO",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/ COLOC.OS VEDADORES NA SAÍDA FORÇA",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC. DO VEDADOR NA PORCA DO PINHÃO",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC. PISTA EXT.ROLAM.CÔNICO NA CARCAÇA",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC. VEDADOR DA ARVORE SECUND.",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC.DO RETENTOR DIANT.ARVORE",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC.E REMOÇÃO DA PISTA E ROLAM.",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOC.O VEDADOR DA ARVORE INTERM.",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOCAR O ROLAM. ARVORE INTERM.",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOCAR VEDADOR DA ARVORE INTERM.",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/COLOCAÇÃO  DO RETENTOR",
      "quantidade": 1
    },
    {
      "denominacao": "MANDRIL P/INSTALAR A TAMPA DA ARVORE INTERM.",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR COMPRESSAO P/MOTOR DIESEL PRIMAX",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR COMPRESSÃO DO MOTOR/PLANATC",
      "quantidade": 1
    },
    {
      "denominacao": "MEIA BANCADA P/TORNEIRO DC 1728/BRAS-MOVEL",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MOCAPE DE MOTOR DIESEL",
      "quantidade": 1
    },
    {
      "denominacao": "MONTAGEM-DESMONTAGEM DE VALVULAS DO MOTOR",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA ABERTURA 160MM N 6 SOMAR",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N 3 FIXO AZUL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA P/CX DIRECAO W9834558900310000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA PARA BANCADA N.5",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR 4.10T CAMINHAO 8000",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR COMPLETO OM 611LA",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR COMPLETO OM457LA MB",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR D229-4 MUELLER",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR MERCEDES BENZ OM 906 LA 11/27",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR MOD. OM 904 LA  M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "MULTIMETRO DIG AUTOM MOD 88/80 FLUKE",
      "quantidade": 1
    },
    {
      "denominacao": "MULTIPLICADORA DE TORQUE/RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "NOTEBOOK CORPORATIVO",
      "quantidade": 1
    },
    {
      "denominacao": "NOTEBOOK INFOWAY NOTE 8630-ITAUTEC",
      "quantidade": 1
    },
    {
      "denominacao": "OPACÍMETRO ANALISADOR FUMAÇA DIESEL/ALFATEST",
      "quantidade": 1
    },
    {
      "denominacao": "OSCILOSCÓPIO DIGITAL 60 MHZ/TEKTRONIX",
      "quantidade": 1
    },
    {
      "denominacao": "PARAFUSADEIRA PNEUMÁTICA/TRU",
      "quantidade": 1
    },
    {
      "denominacao": "PESO DE MEDIÇAO P/FOLGA AXIAL DE ENGRENAG.",
      "quantidade": 1
    },
    {
      "denominacao": "PINÇA P/REMOÇÃO ROLAM. ARVORE INTERM.",
      "quantidade": 1
    },
    {
      "denominacao": "PIREX 200MM DX120MM COLOREX",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA 98 345 589 00 35 0000 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA 98 350 589 05 35 0000",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA P/REMOÇÃO ROLAM.DE ROLETES DE PINHÃO",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA W 98 344 589 00 35 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA W- 98 345 589 02 35 0000",
      "quantidade": 1
    },
    {
      "denominacao": "PLACAS DE FIXAÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "PRENSA HIDRAULICA MANUAL 40 TONELADAS",
      "quantidade": 1
    },
    {
      "denominacao": "PROLONGADOR W 363 589 00 63 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "PÓRTICO, TALHA MANUAL E CARRO TROLE",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO MOVEL/DIDATICA",
      "quantidade": 1
    },
    {
      "denominacao": "SACA POLIA COM 3 GARRAS 200MM",
      "quantidade": 1
    },
    {
      "denominacao": "SACADOR",
      "quantidade": 1
    },
    {
      "denominacao": "SACADOR 98 345 589 08 33 0000",
      "quantidade": 1
    },
    {
      "denominacao": "SACADOR W 98 345 589 08 33 0000 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "SCANNER AUTOM. CAR/TRUCK/OFF-HIGHWAY",
      "quantidade": 1
    },
    {
      "denominacao": "SCANNER AUTOMOTIVO/KAPPTOR.COM",
      "quantidade": 1
    },
    {
      "denominacao": "SCANNER P/VEÍC. LEVES, UTIL. E PESADOS",
      "quantidade": 1
    },
    {
      "denominacao": "SISTEMA DE EXAUSTÃO PORTÁTIL VEICULAR",
      "quantidade": 1
    },
    {
      "denominacao": "SOPRADOR TÉRMICO 127V / DWT",
      "quantidade": 1
    },
    {
      "denominacao": "SOQUETE 422 589 00 09 0000",
      "quantidade": 1
    },
    {
      "denominacao": "SOQUETE REDUTOR 3/4P PARA 1/2P GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "SOQUETE SEXT W 9839558900090000 - MB",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE 98 370 589 01 34 0000 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE C/BLOCO W36358902210000 MB",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE DE EXTRACAO 98 370 589 00 34 M.B",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE DE EXTRAÇÃO P/PISTA INT.ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE EXTRACAO 98 345 589 01 34 M.B.",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE EXTRATOR ENGRENAG.DUPLA TOMADA",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE EXTRAÇÃO P/ PISTA INT.ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE EXTRAÇÃO P/PISTA INT.DO ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE GIRAT.P/MOTORES DIESEL / RAVEN",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE P/ ROLAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE P/COMP.W9844958900400000  MB",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE P/DESM.E MONTAGEM CAIXA SATELITE",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE SEXTAVADO 10MM ARTICUL.P/INJETOR",
      "quantidade": 1
    },
    {
      "denominacao": "TALHA MANUAL SC 1 TON. 3 METROS KOCH",
      "quantidade": 1
    },
    {
      "denominacao": "TERMOMETRO LASER  INFRAVERMELHO 574 FLUKE",
      "quantidade": 1
    },
    {
      "denominacao": "TESTE DE INDUZIDO / OKEI",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO  ESTALO 20 A 200 N.M TEC20R TORK",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO C/RELÓGIO 8 A 40NM/GEDORE",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO DE 14 A 760NM RAHSOL",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUIMETRO ESTALO 3 A 70NM ITAL1007 BLM",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUÍMETRO DE ESTALO 80A360NM/KSTOOLS",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUÍMETRO DIGITAL 500NM",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUÍMETRO TIPO ESTALO 0A60NM/0A40LBFPÉ",
      "quantidade": 1
    },
    {
      "denominacao": "TORQUÍMETRO TIPO ESTALO 25 A 135N.M",
      "quantidade": 1
    }
  ],
  "20480015": [
    {
      "denominacao": "CARRINHO P/FERRAMENTAS MANUTENÇÃO",
      "quantidade": 16
    },
    {
      "denominacao": "CONJ. FERRAMENTAS P/TORNO CONVENC./ ISCAR",
      "quantidade": 16
    },
    {
      "denominacao": "TORNO MECÂNICO PARAL.UNIV.500-750MM/ROMI",
      "quantidade": 16
    },
    {
      "denominacao": "PLACA UNIV 3 CASTANHAS VSC8 202MM VERTEX",
      "quantidade": 5
    },
    {
      "denominacao": "BUCHA DE REDUÇÃO CONE MORSE 4-3/ROCAST",
      "quantidade": 4
    },
    {
      "denominacao": "ARMÁRIO BAIXO 2 MTS - ÁRTICO",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO DE AÇO SÉRIE METÓDICA DR-2030",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PAINEL P/FERR. - ÁRTICO DC-1735 / LCC",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 2
    },
    {
      "denominacao": "MOCHILEIRO 6 PORTAS C/ CHAVES - DC 1618",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA P/ MÁQUINA DE LIMAR - DC 1465",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P/ FERRAMENTAS GEDORE 1576",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P/FERRAMENTAS C/4 GAVETAS/MARCON",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO PARA FERRAMENTAS MANUTENÇÃO",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERIL AR MOTOR 80000 R.P.M.",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERILHADORA BANCADA J1 459",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA CAP. 20-32MM/KONE",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE MALIBU - DC 1691",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 1
    },
    {
      "denominacao": "LÁPIS ELÉTRICO P/GRAVAR / DREMEL",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.20-25MM C/ANEL MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.30-35MM C/ANEL MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.5-30MM 145-185 MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N° 3 / BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MOTO ESMERIL DE BANCADA C/PEDESTAL/ THOR",
      "quantidade": 1
    },
    {
      "denominacao": "MOTO ESMERIL DE BANCADA C/PEDESTAL/CEL",
      "quantidade": 1
    },
    {
      "denominacao": "NOTEBOOK ALTO DESEMPENHO",
      "quantidade": 1
    },
    {
      "denominacao": "PEDESTAL DE FERRO FUNDIDO SIC 612",
      "quantidade": 1
    },
    {
      "denominacao": "PRESSETER DE FERRAMENTAS P/MÁQ.CNC/PWB",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADORA CILÍNDRICA UN.HIDR/FERDIMAT",
      "quantidade": 1
    },
    {
      "denominacao": "TORNO CNC INDL.BARRAMENTO HORIZ./ROMI",
      "quantidade": 1
    },
    {
      "denominacao": "TORNO CNC INDL.BARRAMENTO INCLIN./ROMI",
      "quantidade": 1
    }
  ],
  "20480016": [
    {
      "denominacao": "MORSA DE BANCADA Nº 6/BRASFIXO",
      "quantidade": 16
    },
    {
      "denominacao": "COMPASSO PONTAS P/TRAÇAR 150MM/PANTEC",
      "quantidade": 8
    },
    {
      "denominacao": "ARMÁRIO P/FRESADORA DC-1688 / LCC",
      "quantidade": 7
    },
    {
      "denominacao": "CALÇOS PARALELOS EM AÇO 10 A 32MM/VERTEX",
      "quantidade": 7
    },
    {
      "denominacao": "DESEMPENO F FUNDIDO DE 200X315",
      "quantidade": 7
    },
    {
      "denominacao": "REGULADOR DE ALTURA P/MORSA N.5",
      "quantidade": 7
    },
    {
      "denominacao": "ARMÁRIO BAIXO 2 MTS - ÁRTICO",
      "quantidade": 6
    },
    {
      "denominacao": "CEPO DE BANCADA DE F FUNDIDO",
      "quantidade": 6
    },
    {
      "denominacao": "FRESADORA UNIV.CABEÇOTE VERT.DIG/KONE",
      "quantidade": 5
    },
    {
      "denominacao": "MOCHILEIRO 6 PORTAS C/ CHAVES - DC 1618",
      "quantidade": 5
    },
    {
      "denominacao": "MORSA P/FURADEIRA DE BANCADA/BRASFIXO",
      "quantidade": 5
    },
    {
      "denominacao": "BANCADA P AJUSTADOR 2 LUGARES DC 761",
      "quantidade": 4
    },
    {
      "denominacao": "MÓDULO P/BANCADA C/7 GAVETAS/BEZAFER",
      "quantidade": 4
    },
    {
      "denominacao": "CALIBRADOR TRAÇADOR ALT.300MM/MITUTOYO",
      "quantidade": 3
    },
    {
      "denominacao": "ARMÁRIO BAIXO ÁRTICO - DC1648",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PARA FRESADORA - DC 1470",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PARA RETIFICADORA - DC 1468",
      "quantidade": 2
    },
    {
      "denominacao": "ASPIRADOR DE PÓ E LÍQUIDO 1400W",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA P/ MÁQUINA DE LIMAR - DC 1465",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA P/AJUSTADOR 2 LUGARES",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO P/FERRAMENTA-ÁRTICO DC-1656/CS",
      "quantidade": 2
    },
    {
      "denominacao": "CARRINHO PORTA CONES ALT.1100 A 1300MM",
      "quantidade": 2
    },
    {
      "denominacao": "DESEMPENO GRANITO 630X630X120MM/DIGIMESS",
      "quantidade": 2
    },
    {
      "denominacao": "FRESADORA UNIV. COMPACTA C/DIVISOR/ KONE",
      "quantidade": 2
    },
    {
      "denominacao": "GRAMINHO TRACADOR DE ALTURA",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CALÇOS PARALELOS AÇO 10 A 32M/VERTEX",
      "quantidade": 2
    },
    {
      "denominacao": "MONITOR DELL 23,8\" C2423H",
      "quantidade": 2
    },
    {
      "denominacao": "ACCESS POINT - INDOOR 2X2",
      "quantidade": 1
    },
    {
      "denominacao": "ARMARIO DE ACO 1 CORPO",
      "quantidade": 1
    },
    {
      "denominacao": "ARMARIO P FRESADORA DC 806",
      "quantidade": 1
    },
    {
      "denominacao": "ASPIRADOR INDUSTRIAL P/ÓLEO E CAVACOS",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA P/ AJUSTADOR 2 LUG DC-761",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA P/MÁQ. DE FURAR ÁRTICO DC-1705",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA PARA AJUSTADOR DC-761",
      "quantidade": 1
    },
    {
      "denominacao": "BLOCO DE ZERO ELETRÔNICO (PRESSETER)",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO FECHADO PARA FERRAMENTAS",
      "quantidade": 1
    },
    {
      "denominacao": "CENTRO DE USINAGEM CNC VERTICAL/ROMI",
      "quantidade": 1
    },
    {
      "denominacao": "CENTRO DE USINAGEM VERTICAL - 10.000 RPM",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. FERRAM. P/CENTRO USINAGEM/SANDVIK",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. FERRAMENTAS P/FRESADORA/KORLOY",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.PINÇAS RANHURADAS P/MANDRIL / VB",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.PINÇAS RANHURADAS P/MANDRIL /FREJOTH",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO PRESILHAS P/FIXAR PÇS/BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO BANCADA FERRO FUNDIDO",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO DE FERRO FUNDIDO 60X800",
      "quantidade": 1
    },
    {
      "denominacao": "DESEMPENO FERRO FUNDIDO200X315MM(DF-205",
      "quantidade": 1
    },
    {
      "denominacao": "ESCANTILHÃO MÉTRICO 60 GRAUS/PANTEC",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERILHADEIRA ANGUL.4 1/2P 220V/DEWALT",
      "quantidade": 1
    },
    {
      "denominacao": "FRESADORA FERRAMENTEIRA / KONE",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA 25MM / YADOYA",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA 25MM/KONE",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA CAP. 20-32MM/KONE",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE COLUNA 30MM/YADOYA",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA ELETRICA PROF.110V BOSCH",
      "quantidade": 1
    },
    {
      "denominacao": "LÁPIS ELÉTRICO P/GRAVAR / DREMEL",
      "quantidade": 1
    },
    {
      "denominacao": "MEIA BANCADA PARA TORNEIRO DC-862",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P/ INFORMATICA 120X73X74CM PROJETO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.16-20MM C/ANEL MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MICROMETRO INT.5-30MM 145-185 MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA BANCADA Nº4-BASE GIRAT/BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA COM BASE GIRATORIA ADRI MAD 3G",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N° 3/BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA GIRATORIA 90MM ADRI MAS-1G",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA GIRATORIA ABERTURA 85MM",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA PRECISÃO RETIFICADA P/MÁQ./BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA UNIVERSAL INCLINAVEL ADRI 85MM",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE MEDIÇÃO BIDIMENSIONAL",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA SERRAR METAIS FITA-VERT./ETT-SS450",
      "quantidade": 1
    },
    {
      "denominacao": "QUARTO EIXO P/CENTRO DE USINAGEM D800/ROMI",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADEIRA MANUAL PNEUMÁTICA 1/4P/SCHULZ",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADOR P ESMERIL C CABO E ROSETAS",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADORA PLANA,C/EIXO HORIZ./MELLO",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADORA SUP.PLANA EIXO H. HIDR. MELLO",
      "quantidade": 1
    },
    {
      "denominacao": "RUGOSIMETRO PORT SUFTEST SJ201 MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE PIZELOGIO COMPARADOR MITOTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "SUPORTE PLACA MAGNETICA ECLIPSE 965",
      "quantidade": 1
    },
    {
      "denominacao": "TESOURA DE CORTAR CHAPA  3/16P/MOTOMIL",
      "quantidade": 1
    },
    {
      "denominacao": "TRANSFERIDOR UNIVERSAL 200M M HELIOS",
      "quantidade": 1
    }
  ],
  "20480017": [
    {
      "denominacao": "ALICATE AUTOMÁT.P/TERM.TUBULARES/LEGRAN",
      "quantidade": 10
    },
    {
      "denominacao": "ARMÁRIO BAIXO ÁRTICO - DC1648",
      "quantidade": 9
    },
    {
      "denominacao": "ESCADA DUPLA C/PLATAF.07 DEGR./W.BERTOLO",
      "quantidade": 8
    },
    {
      "denominacao": "PARAFUSADEIRA/FURAD. IMPACTO S/FIO 18V",
      "quantidade": 5
    },
    {
      "denominacao": "BANCADA INDUSTRIAL 1200MM - DC 1736/LDM",
      "quantidade": 4
    },
    {
      "denominacao": "CORTA TUBO PEQUENO",
      "quantidade": 4
    },
    {
      "denominacao": "MORSA DE BANCADA Nº 3/BRASFIXO",
      "quantidade": 4
    },
    {
      "denominacao": "SISTEMA TREIN AUTOMAÇÃO ELETRICA PREDIAL",
      "quantidade": 4
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO DIGITAL/MINIPA",
      "quantidade": 3
    },
    {
      "denominacao": "FERRO SOLDA MACHADINHA 180W 220V/HIKARI",
      "quantidade": 3
    },
    {
      "denominacao": "SOPRADOR TÉRMICO 127V / DWT",
      "quantidade": 3
    },
    {
      "denominacao": "TESTADOR CABO DE VOZ, DADOS E VÍDEO /IDEAL",
      "quantidade": 3
    },
    {
      "denominacao": "CINTO PORTA FERRAMENTAS COURO FG 120",
      "quantidade": 2
    },
    {
      "denominacao": "CORTADOR TUBO DE PE TP ALICATE/TRAMONTINA",
      "quantidade": 2
    },
    {
      "denominacao": "DOBRA-TUBOS F.F.N. PESO LIQ. 1,1KG.",
      "quantidade": 2
    },
    {
      "denominacao": "FURADEIRA ELÉT. PORTÁTIL 13MM 127V -600W",
      "quantidade": 2
    },
    {
      "denominacao": "FURADEIRA ELÉTRICA PORTÁTIL 13MM 127V /DWT",
      "quantidade": 2
    },
    {
      "denominacao": "KIT GERADOR DE TOM / IDEAL",
      "quantidade": 2
    },
    {
      "denominacao": "MEIA BANCADA P/ TORNEIRO DC 862",
      "quantidade": 2
    },
    {
      "denominacao": "MOCHILEIRO 8 PORTAS C/CHAVES DC 1789/LCC",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA DE BANCADA Nº 6/BRASFIXO",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR TRIF.DE INDUÇÃO / VOGES",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR TRIF.INDUÇÃO 2 VELOCIDADES/VOGES",
      "quantidade": 2
    },
    {
      "denominacao": "MULTIMETRO ANALOGICO",
      "quantidade": 2
    },
    {
      "denominacao": "NÍVEL A LASER/ANVI PLS5",
      "quantidade": 2
    },
    {
      "denominacao": "SOPRADOR TERMICO 200  1500W 127VAC",
      "quantidade": 2
    },
    {
      "denominacao": "TERRÔMETRO DIGITAL / MEASTECH",
      "quantidade": 2
    },
    {
      "denominacao": "TESTADOR CABO DE VOZ,DADOS E VÍDEO/IDEAL",
      "quantidade": 2
    },
    {
      "denominacao": "TRENA LASER 100 METROS",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PAINEL P/FERR. - ÁRTICO DC-1735 / LCC",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRAT.C/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P/FERRAM.MANUTENÇÃO/BEZAFER",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO SERV SECURIT M404 N 94471",
      "quantidade": 1
    },
    {
      "denominacao": "CENTRAL TELEFÔNICA PEQ. PORTE/INTELBRAS",
      "quantidade": 1
    },
    {
      "denominacao": "CEPO DE BANCADA DE F FUNDIDO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. ACESSO HOTEL/HUIFAN",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. ATERRAMENTO TEMPOR.34,5KV/ POLITERM",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. DE CONTROLE DE ACESSO/HUIFAN",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.AUTOMAÇÃO PROGRAMÁVEL/HONEYWELL",
      "quantidade": 1
    },
    {
      "denominacao": "DETECTOR TENSÃO CONTATO 70V A 1KV/POLITERM",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA 25MM / YADOYA",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 1
    },
    {
      "denominacao": "LUXIMETRO PORTATIL GOSSEN PAN-LUX",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR ENERGIA ELÉTRICA RESIDENCIAL/NANSEN",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR ENERGIA ELÉTRICA TRIFÁSICO/NANSEN",
      "quantidade": 1
    },
    {
      "denominacao": "MESA PARA SOLDA OXIACETILÊNICA DC 1886",
      "quantidade": 1
    },
    {
      "denominacao": "NÍVEL DE PLANOS A LASER",
      "quantidade": 1
    },
    {
      "denominacao": "SOPRADOR TERMICO HL 1500 COMALA",
      "quantidade": 1
    },
    {
      "denominacao": "WATIMETRO 120/240V MOD.71 ENGRO",
      "quantidade": 1
    }
  ],
  "20480029": [
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 36
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA C/ PORTA LIVROS ÁRTICO",
      "quantidade": 35
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 2
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO BAIXO C/PORTAS E GAVETAS DC 1811/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR DE VÍDEO 21,5 POL - DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    }
  ],
  "20480030": [
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 35
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA MDF C/PORTA LIVROS",
      "quantidade": 29
    },
    {
      "denominacao": "ARMÁRIO BAIXO MALIBU - DC 1649",
      "quantidade": 3
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 2
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO BAIXO C/PORTAS E GAVETAS DC 1811/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA C/ PORTA LIVROS ÁRTICO",
      "quantidade": 1
    },
    {
      "denominacao": "GAVETEIRO VOLANTE ÁRTICO - DC 1698",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR DE VÍDEO 21,5 POL - DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    }
  ],
  "20480031": [
    {
      "denominacao": "CARTEIRA INDIVIDUAL P/ DESENHO C/ TAMPO RECLINÁVEL",
      "quantidade": 32
    },
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 31
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 2
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO BAIXO C/PORTAS E GAVETAS DC 1811/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO BAIXO MALIBU - DC 1649",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA C/SUPORTE / EPSON",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS - UNIDADES / CISCO",
      "quantidade": 1
    }
  ],
  "20480037": [
    {
      "denominacao": "MOTOR TRIF.DE INDUÇÃO / VOGES",
      "quantidade": 11
    },
    {
      "denominacao": "CADEIRA GIRATORIA C/SAPATAS- AZUL S/ BRAÇO",
      "quantidade": 10
    },
    {
      "denominacao": "CADEIRA PROF.GIRAT.POLIPROPILENO AZ/CAVAKETI",
      "quantidade": 10
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO TRUE RMS AC-DC/ FLUKE",
      "quantidade": 9
    },
    {
      "denominacao": "BANCADA ELETRO 1500 DC-1737 / LCC",
      "quantidade": 8
    },
    {
      "denominacao": "CARRINHO MOVEL COM 3 MOTORES ELETRICOS",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ. DIDÁTICO DE INVERSOR 1CV / EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "FERRO SOLDA MACHADINHA 180W 220V/HIKARI",
      "quantidade": 8
    },
    {
      "denominacao": "PAINEL P/ALIMENTAÇÃO DE BANCADA",
      "quantidade": 8
    },
    {
      "denominacao": "TRANSFORMADOR TRIFÁSICO DIDÁTICO/SILIVOLT",
      "quantidade": 8
    },
    {
      "denominacao": "VARIADOR TENSÃO MONOFÁSICO  0,5 KVA/EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "BOBINADEIRA",
      "quantidade": 6
    },
    {
      "denominacao": "MOTOR TRIF.INDUÇÃO 2 VELOCIDADES/VOGES",
      "quantidade": 6
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 5
    },
    {
      "denominacao": "MOTOR MONOF.C/CAPACITOR PERMAN./VOGES",
      "quantidade": 4
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL TRUE RMS/TEMP/ FLUKE",
      "quantidade": 4
    },
    {
      "denominacao": "PARAFUSADEIRA/FURAD. IMPACTO S/FIO 18V",
      "quantidade": 4
    },
    {
      "denominacao": "CONTAGIRO 5 ALGAR HENGSTLER UO 53",
      "quantidade": 3
    },
    {
      "denominacao": "CONTAGIRO DE 5 ALGARISMOS HENGSTLER",
      "quantidade": 3
    },
    {
      "denominacao": "BOBINADEIRA DES.DM-208",
      "quantidade": 2
    },
    {
      "denominacao": "CONJ. MOTORES ELÉTRICOS EM CORTE/SOMA",
      "quantidade": 2
    },
    {
      "denominacao": "CONTAGIRO 4 ALG. VEED ROOT 1669XX-005",
      "quantidade": 2
    },
    {
      "denominacao": "ESTANTE PRAT. AÇO MOD.925X2000X457MM",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR TRIF.INDUÇÃO 02 VELOCIDADES/VOGES",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR TRIFÁSICO DE INDUÇÃO 1750 RPM",
      "quantidade": 2
    },
    {
      "denominacao": "MOTOR TRIFÁSICO DE ROTOR BOBINADO/SOMA",
      "quantidade": 2
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO DIGITAL/MINIPA",
      "quantidade": 1
    },
    {
      "denominacao": "ARMARIO ALTO 793X500X1650MM POST FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO P/ FERRAMENTAS EM POST FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO FECHADO PARA FERRAMENTAS",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE FIXA 12 PEÇAS - 6 A 32MM / VONDER",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. DIDÁTICO DE INVERSOR 1CV/ FESTO",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE TRABALHO 1400X750X735 MM (L-022) MALIBU",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO 24MB",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR DE ROTOR BOBINADO 0,37 KW 1700RPM",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR TRIFÁSICO DE INDUÇÃO DAHLANDER",
      "quantidade": 1
    },
    {
      "denominacao": "Monitor Dell de 23.8\" C2423H",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150MM-0,01/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "PRATELEIRA ESTATOR ROTOR - ÁRTICO DC1732",
      "quantidade": 1
    },
    {
      "denominacao": "PRATELEIRA P ESTATOR ROTOR ELETRIC 681",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    },
    {
      "denominacao": "SOPRADOR TERMICO 200  1500W  127VAC",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS",
      "quantidade": 1
    }
  ],
  "20480038": [
    {
      "denominacao": "CADEIRA PARA SALA DE AULA",
      "quantidade": 32
    },
    {
      "denominacao": "CARTEIRA PARA SALA DE AULA",
      "quantidade": 32
    },
    {
      "denominacao": "CONDICIONADOR DE AR 30000 BTU T JANELA",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA C/BRAÇO AZUL /TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA C/SUPORTE / EPSON",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    }
  ],
  "20480040": [
    {
      "denominacao": "CADEIRA PROFISSIONAL SAPATA POLIPR. AZUL",
      "quantidade": 15
    },
    {
      "denominacao": "VARIADOR TENSÃO MONOFÁSICO  0,5 KVA/EDUTEC",
      "quantidade": 11
    },
    {
      "denominacao": "BANCADA PARA ELETROELETRONICA DCE 99",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ. DE TORRE DE MOTORES /ASTRAL-EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ. DIDÁTICO DE SOFT START / EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ.COMPONEMTES P/COMANDOS ELÉTRICOS",
      "quantidade": 8
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL TRUE RMS / FLUKE",
      "quantidade": 8
    },
    {
      "denominacao": "PAINEL ELÉTRICO ALIMENTADOR P/COMANDOS",
      "quantidade": 8
    },
    {
      "denominacao": "CHAVE PARTIDA SUAVE SOFT START",
      "quantidade": 6
    },
    {
      "denominacao": "FURADEIRA ELÉT. PORTÁTIL 13MM 127V -600W",
      "quantidade": 6
    },
    {
      "denominacao": "ALICATE AMPERIMETRO 3 3/4P DIGITOS",
      "quantidade": 5
    },
    {
      "denominacao": "PARAFUSADEIRA/FURADEIRA 1/2 S/FIO/MAKITA",
      "quantidade": 5
    },
    {
      "denominacao": "ESCALA DE AÇO INOXIDÁVEL 300MM 12P/PANTEC",
      "quantidade": 4
    },
    {
      "denominacao": "FASIMETRO TENSAO DE 100 A 600V 50A60HZ",
      "quantidade": 4
    },
    {
      "denominacao": "INVERSOR FREQUENCIA TRIFASICO 1 CV",
      "quantidade": 4
    },
    {
      "denominacao": "MULTIMETRO DIGITAL TRUE RMS",
      "quantidade": 4
    },
    {
      "denominacao": "SERRA TICO-TICO MANUAL 127V / MAKITA",
      "quantidade": 4
    },
    {
      "denominacao": "FURADEIRA PORTÁTIL ELÉT.13MM 110V/METABO",
      "quantidade": 3
    },
    {
      "denominacao": "MEGHOMETRO DIGITAL",
      "quantidade": 3
    },
    {
      "denominacao": "PARAFUSADEIRA/FURAD. IMPACTO S/FIO 18V",
      "quantidade": 3
    },
    {
      "denominacao": "PARAFUSADEIRA/FURADEIRA INDL S/FIO",
      "quantidade": 3
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO P/FERRAMENTAS DC-1674 / LCC",
      "quantidade": 2
    },
    {
      "denominacao": "DECIBELÍMETRO COM CALIBRADOR/SKF",
      "quantidade": 2
    },
    {
      "denominacao": "ESMERILHADEIRA ANGUL.4 1/2P 220V/DEWALT",
      "quantidade": 2
    },
    {
      "denominacao": "ESTANTE PRAT. AÇO MOD.925X2000X457MM",
      "quantidade": 2
    },
    {
      "denominacao": "FURADEIRA DE IMPACTO 13MM -1/2 110V-METABO",
      "quantidade": 2
    },
    {
      "denominacao": "FURADEIRA ELÉTRICA PORTÁTIL 13MM 127V /DWT",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVES FIXAS 1/4 A 2P/BELZER",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO DE SERRA COPO - 16 A 51MM /MASTERSAN",
      "quantidade": 2
    },
    {
      "denominacao": "MEDIDOR POTÊNCIA,FASE E FATOR/MEGABRAS",
      "quantidade": 2
    },
    {
      "denominacao": "SERRA TICO TICO T.INDUSTRIAL 390W BOSCH",
      "quantidade": 2
    },
    {
      "denominacao": "TERRÔMETRO DIGITAL / MEASTECH",
      "quantidade": 2
    },
    {
      "denominacao": "ALICATE AMPERIMETRO TRUE RMS",
      "quantidade": 1
    },
    {
      "denominacao": "ALICATE TERROMETRO DIGITAL",
      "quantidade": 1
    },
    {
      "denominacao": "BANCO DE ENSAIO DE TORRE DE RECALQUE D ÁGUA",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "DECADA CAPACITIVA",
      "quantidade": 1
    },
    {
      "denominacao": "DECADA CAPACITORES CU410A ENGINEERING",
      "quantidade": 1
    },
    {
      "denominacao": "DECADA DE RESISTORES 0 A 9999 OHMS 236A",
      "quantidade": 1
    },
    {
      "denominacao": "DECADA RESISTIVA",
      "quantidade": 1
    },
    {
      "denominacao": "EXTRATOR POLIA 300MM PROF 240MM",
      "quantidade": 1
    },
    {
      "denominacao": "FASIMETRO MONO PORTATIL 600 ENGRO",
      "quantidade": 1
    },
    {
      "denominacao": "FASÍMETRO / INSTRUTHERM",
      "quantidade": 1
    },
    {
      "denominacao": "FIEIRA P/ ARAME O-36 STARRETT",
      "quantidade": 1
    },
    {
      "denominacao": "FONTE DE ALIMENTACAO FSCC 30030 DAWER",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO C/9 SOQUETES POL E 7 ACESSORIOS",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVE FIXA 12 PECAS 6A32MM",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVE FIXA 8 PECAS",
      "quantidade": 1
    },
    {
      "denominacao": "KITS DE MANUTENCAO C/FERRAMENTA",
      "quantidade": 1
    },
    {
      "denominacao": "LUPA C/LUMINÁRIA 8X - ARTICUL./ INSTRUTHERM",
      "quantidade": 1
    },
    {
      "denominacao": "LUXIMETRO DIGITAL",
      "quantidade": 1
    },
    {
      "denominacao": "LUXÍMETRO/MIT MEASTECH",
      "quantidade": 1
    },
    {
      "denominacao": "MEGOMETRO ANALOG. 500V YOKOGAMA 2404-14",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MULTIMETRO ANALOGICO",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150MM-0,01/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "PARAFUSADEIRA DE 5MM/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "PONTE IMPEDANCIA RLC LEADER LC-740",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA C/SUPORTE / EPSON",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    },
    {
      "denominacao": "SENSOR DE TUBULAÇÃO HIDRAÚLICA / BOSCH",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA TICO TICO GTS 65 BOSCH",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA TICO-TICO 127V PROFISSIONAL / DWT",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA TICO-TICO-MANUAL 220V/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "TACOMETRO DIGITAL 5 DIGITOS TAKO-TD-301",
      "quantidade": 1
    },
    {
      "denominacao": "TACOMETRO DIGITAL PORTATIL C/MIRA LAZER",
      "quantidade": 1
    },
    {
      "denominacao": "TACÔMETRO DIG. MIRA A LASER/ INSTRUTHERM",
      "quantidade": 1
    },
    {
      "denominacao": "TERMOMETRO DIGITAL COM MIRA LASER",
      "quantidade": 1
    },
    {
      "denominacao": "TERROMETRO DIGITAL",
      "quantidade": 1
    },
    {
      "denominacao": "WATTIMETRO MONOF. 5A. H&B",
      "quantidade": 1
    },
    {
      "denominacao": "WATTIMETRO PORTATIL 5A-240V HB",
      "quantidade": 1
    }
  ],
  "20480041": [
    {
      "denominacao": "CADEIRA C/PÉS TRAPEZOIDAIS PRETA/TIRMIS",
      "quantidade": 16
    },
    {
      "denominacao": "MONITOR DE VÍDEO 21,5 POL - DELL",
      "quantidade": 16
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 9
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL - DELL",
      "quantidade": 8
    },
    {
      "denominacao": "MESA DE TRABALHO INF 1200X800X735MM",
      "quantidade": 7
    },
    {
      "denominacao": "CONDICIONADOR DE AR 30000 BTU T JANELA",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA DE BANCADA N° 3 / BRASFIXO",
      "quantidade": 2
    },
    {
      "denominacao": "PAINEL SIMULADOR DE PNUMATICA PPEP-2002",
      "quantidade": 2
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE FIXA 12 PEÇAS - 6 A 32MM / VONDER",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.COMPONENTES HIDRÁUL.EM CORTE/FESTO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.COMPONENTES PNEUMÁTICOS EM CORTE/MICRO",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO 24MB",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "Monitor Dell de 23.8\" C2423H",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS - UNIDADES / CISCO",
      "quantidade": 1
    }
  ],
  "20480042": [
    {
      "denominacao": "PROTOBOARD - 1600 PONTOS / ICEL",
      "quantidade": 19
    },
    {
      "denominacao": "CADEIRA PROFISSIONAL SAPATA POLIPR. AZUL",
      "quantidade": 16
    },
    {
      "denominacao": "FONTE ALIMENTAÇÃO AJUST.0 A 30V-5A/ POLITERM",
      "quantidade": 12
    },
    {
      "denominacao": "GERADOR DE FUNÇÃO DE BANCADA/ MINIPA",
      "quantidade": 11
    },
    {
      "denominacao": "OSCILOSCÓPIO DIGITAL 60 MHZ  / TEKTRONIK",
      "quantidade": 10
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 8
    },
    {
      "denominacao": "FONTE DE ALIMENTAÇÃO AJUSTÁVEL 0-30V /5A",
      "quantidade": 8
    },
    {
      "denominacao": "JOGO DE PINCAS C/ 3 DE 115MM CORNETA",
      "quantidade": 8
    },
    {
      "denominacao": "LUPA C/LUMINÁRIA 8X - ARTICUL./ INSTRUTHERM",
      "quantidade": 8
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL - DELL",
      "quantidade": 8
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL TRUE RMS / FLUKE",
      "quantidade": 8
    },
    {
      "denominacao": "PAINEL PARA ALIMENTAÇÃO DE BANCADA",
      "quantidade": 8
    },
    {
      "denominacao": "SISTEMA DE ESTUDO DE ELETRÔNICA DIGITAL/EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "SISTEMA DE ESTUDO ELETRÔNICA ANALÓGICA/EDUTEC",
      "quantidade": 8
    },
    {
      "denominacao": "BANCADA PARA ENSAIOS ELETROELETRONICOS",
      "quantidade": 7
    },
    {
      "denominacao": "MONITOR DE VÍDEO 21,5 POL - DELL",
      "quantidade": 7
    },
    {
      "denominacao": "VARIADOR TENSÃO MONOFÁSICO  0,5 KVA/EDUTEC",
      "quantidade": 5
    },
    {
      "denominacao": "ARMARIO ALTO 793X500X1650MM POST FORMING",
      "quantidade": 3
    },
    {
      "denominacao": "DÉCADA CAPACITIVA / MINIPA",
      "quantidade": 3
    },
    {
      "denominacao": "DÉCADA RESISTIVA / POLITERM",
      "quantidade": 3
    },
    {
      "denominacao": "MEDIDOR DE LCR PORTÁTIL / AMPROBE",
      "quantidade": 3
    },
    {
      "denominacao": "MICRO RETÍFICA 120V / ECCOFER",
      "quantidade": 3
    },
    {
      "denominacao": "ESTANTE PRAT. AÇO MOD.925X2000X457MM",
      "quantidade": 2
    },
    {
      "denominacao": "ESTAÇÃO DE SOLDAGEM 180 A 450°C / WELLER",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA C/BRAÇO AZUL /TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA PROFISS. GIRAT.POLIPROPILENO/SCISO",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO FECHADO PARA FERRAMENTAS",
      "quantidade": 1
    },
    {
      "denominacao": "INTERFACE DE COMANDO INDUSTRIAL/ EDUTEC",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR DE RCL PORTATIL",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR LED 21,5P / LG E2241V",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "OSCILOSCOPIO DIGITAL 60 MHZ",
      "quantidade": 1
    }
  ],
  "20480043": [
    {
      "denominacao": "CADEIRA GIRATORIA C/SAPATAS- AZUL S/ BRAÇO",
      "quantidade": 14
    },
    {
      "denominacao": "BANCADA PARA ENSAIOS ELETROELETRONICOS",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ. DIDÁTICO PROFINET/PROFIBUS/ASI",
      "quantidade": 8
    },
    {
      "denominacao": "DESKTOP CORPORATIVO",
      "quantidade": 8
    },
    {
      "denominacao": "MONITOR CORPORATIVO C/CÂMERA",
      "quantidade": 8
    },
    {
      "denominacao": "PAINEL P/ALIMENTAÇÃO DE BANCADA",
      "quantidade": 8
    },
    {
      "denominacao": "CONJ. DE SENSORES DE MANUFATURA/FESTO",
      "quantidade": 3
    },
    {
      "denominacao": "CJ MANIPULADOR ELETROPNEUMATICO",
      "quantidade": 2
    },
    {
      "denominacao": "MODULO DIDATICO ACONDIC CLP FESTO",
      "quantidade": 2
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRAT.C/SAPATA S/BRAÇO-MAQ-MOVEIS",
      "quantidade": 1
    },
    {
      "denominacao": "CHAVE FIXA 12 PEÇAS - 6 A 32MM / VONDER",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ DIDATICO MOTOR PASSO DIGIPLAN",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ. P/ESTUDO DE SERVOMOTOR CA/ BIT9",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.SIMULADOR PROCESSO PRESSAO/TEMPERAT",
      "quantidade": 1
    },
    {
      "denominacao": "CONJUNTO SIMULADOR DE PROCESSO DE NÍVEL",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR DE POTENCIA FASE E FATOR",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR CORPORATIVO 24MB",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL - DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR DELL 23,8\" C2423H",
      "quantidade": 1
    },
    {
      "denominacao": "PAQUÍMETRO QUADR.DIG.150MM-0,01/MITUTOYO",
      "quantidade": 1
    },
    {
      "denominacao": "PLANTA DIDÁTICA MULTIPROCESSO",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    },
    {
      "denominacao": "RETIFICADEIRA MANUAL PNEUMÁTICA 1/4P/SCHULZ",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS - UNIDADES / CISCO",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 26 PORTAS PADRAO 4500 -3COM",
      "quantidade": 1
    }
  ],
  "20480044": [
    {
      "denominacao": "BANCADA PARA ENSAIOS ELETROELETRONICOS",
      "quantidade": 1
    }
  ],
  "20480047": [
    {
      "denominacao": "CADEIRA PARA SALA DE AULA",
      "quantidade": 16
    },
    {
      "denominacao": "LIXADEIRA ORBITAL OSCILANTE 220V",
      "quantidade": 16
    },
    {
      "denominacao": "MARTELO DE UNHA PARA MARCENARIA/VONDER",
      "quantidade": 16
    },
    {
      "denominacao": "PLAINA MANUAL PROFISSIONAL N.3/VONDER",
      "quantidade": 16
    },
    {
      "denominacao": "BANCO DE MARCENEIRO DC-559",
      "quantidade": 12
    },
    {
      "denominacao": "SARGENTO PARA PECAS DE MADEIRA 600MM",
      "quantidade": 9
    },
    {
      "denominacao": "MONITOR 24 POLEGADAS",
      "quantidade": 6
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL - DELL",
      "quantidade": 5
    },
    {
      "denominacao": "FURADEIRA ELÉTRICA PORTÁTIL 13MM 127V /DWT",
      "quantidade": 4
    },
    {
      "denominacao": "FURADEIRA/PARAFUSADEIRA 1/2P SEM FIO",
      "quantidade": 4
    },
    {
      "denominacao": "GRAMPEADOR PNEUMÁTICO P/TAPECEIRO/FURIO",
      "quantidade": 4
    },
    {
      "denominacao": "LIXADEIRA ROTO ORBITAL /DEWALT",
      "quantidade": 4
    },
    {
      "denominacao": "SERRA TICO-TICO MANUAL 110V",
      "quantidade": 4
    },
    {
      "denominacao": "TUPIA ELÉTRICA PORTÁTIL /DEWALT",
      "quantidade": 4
    },
    {
      "denominacao": "TUPIA PORTÁTIL ELÉTRICA 127V",
      "quantidade": 4
    },
    {
      "denominacao": "FRESADORA DE JUNTAS P/MARCENARIA/MAKITA",
      "quantidade": 3
    },
    {
      "denominacao": "JOGO FRESA P/TUPIA PORTÁTIL/ SSS-71203",
      "quantidade": 3
    },
    {
      "denominacao": "LIXADEIRA OSCILANTE GSS 180 BOSCH",
      "quantidade": 3
    },
    {
      "denominacao": "PARAFUSADEIRA ANGULAR PORTÁTIL/MAKITA",
      "quantidade": 3
    },
    {
      "denominacao": "PINADOR / PUMA",
      "quantidade": 3
    },
    {
      "denominacao": "BANCO C/ARMARIO P/MODELADOR FUNDICAO",
      "quantidade": 2
    },
    {
      "denominacao": "FURADEIRA PNEUMÁTICA 10MM / PUMA",
      "quantidade": 2
    },
    {
      "denominacao": "LIXADEIRA CINTA ELÉTRICA PORTÁTIL 127V",
      "quantidade": 2
    },
    {
      "denominacao": "LIXADEIRA POLITRIZ ELÉTR.0 A 1000 / DEWALT",
      "quantidade": 2
    },
    {
      "denominacao": "PARAFUSADEIRA PNEUMÁTICA REVERSÍVEL/PUMA",
      "quantidade": 2
    },
    {
      "denominacao": "SARGENTO P PECAS MADEIRA DE 2000 MM",
      "quantidade": 2
    },
    {
      "denominacao": "SARGENTO PARA PECAS DE MADEIRA 1000MM",
      "quantidade": 2
    },
    {
      "denominacao": "SARGENTO PARA PECAS DE MADEIRA 1500MM",
      "quantidade": 2
    },
    {
      "denominacao": "SERRA CIRCULAR 185MM OU 7 1/4 BOSCH 1546",
      "quantidade": 2
    },
    {
      "denominacao": "SERRA ESQUADRIA BRAÇO TELESCÓPICO/INMES",
      "quantidade": 2
    },
    {
      "denominacao": "SERRA TICO-TICO MANUAL 127V / MAKITA",
      "quantidade": 2
    },
    {
      "denominacao": "SERRA TICO-TICO-MANUAL 220V/MAKITA",
      "quantidade": 2
    },
    {
      "denominacao": "TUPIA ELÉTR.PORTÁTIL MOLDUREIRA/DEWALT",
      "quantidade": 2
    },
    {
      "denominacao": "TUPIA ELÉTRICA PORT. MOLDUREIRA/DEWALT",
      "quantidade": 2
    },
    {
      "denominacao": "ACCESS POINT - INDOOR 4X4",
      "quantidade": 1
    },
    {
      "denominacao": "ALIMENTADOR PARA TUPIA INVICTA AI 50A711",
      "quantidade": 1
    },
    {
      "denominacao": "BEBEDOURO PRESSÃO ELÉTRICO PISO/KARINA",
      "quantidade": 1
    },
    {
      "denominacao": "BOMBA MANUAL JACTOIL MOD 500",
      "quantidade": 1
    },
    {
      "denominacao": "CABINE PINTURA VIA SECA 1 AVANCO LATERAL",
      "quantidade": 1
    },
    {
      "denominacao": "CEPO DE BANCADA DE F FUNDIDO",
      "quantidade": 1
    },
    {
      "denominacao": "COLADEIRA DE BORDO AUTOMÁTICA",
      "quantidade": 1
    },
    {
      "denominacao": "CONDICIONADOR DE AR 24.000 BTUS INVERTER/ MIDEA",
      "quantidade": 1
    },
    {
      "denominacao": "DISCO P/SERRA CIRCULAR ( KIT 10 UND)/HW LEITZ",
      "quantidade": 1
    },
    {
      "denominacao": "ESMERILHADORA BANCADA J1 458",
      "quantidade": 1
    },
    {
      "denominacao": "EXTINTOR DE INCENDIO CO2 6KGS",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA DE BANCADA CAP. 25MM/KONE",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA HORIZONTAL BLINDADA/BALDAN",
      "quantidade": 1
    },
    {
      "denominacao": "FURADEIRA P/DOBRADIÇAS E DISPOSITIVOS",
      "quantidade": 1
    },
    {
      "denominacao": "GARLOPA STANLEY N 6",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVES COMBINADAS 6A32MM/CORNETA",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO CHAVES COMBINADAS EM POL.CORNETA",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO DE SERRAS COPO 16MM A 51MM/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO FRESAS P/TUPIA ESTACIONÁRIA 15PÇS/ARTE",
      "quantidade": 1
    },
    {
      "denominacao": "JOGO SERRA COPO 16 A 51MM (9PÇS)/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "LIXADEIRA DE CINTA PORTÁTIL ELÉTRICA/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "LIXADEIRA ELÉTRICA PORT.182 A 230MM/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "LIXADEIRA FITA ARTICULADA C/DISCO/BALDAN",
      "quantidade": 1
    },
    {
      "denominacao": "MEDIDOR DE UMIDADE DA MADEIRA/LUTRON",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P MAQUINAS FURAR DC 648",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA Nº 6/BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MOTOR TRIFÁSICO DE INDUÇÃO DAHLANDER",
      "quantidade": 1
    },
    {
      "denominacao": "PEDESTAL DE FERRO FUNDIDO SIC 612",
      "quantidade": 1
    },
    {
      "denominacao": "PISTOLA DE PINTURA (SUCÇÃO)/PUMA",
      "quantidade": 1
    },
    {
      "denominacao": "PLACA UNIVERSAL 3 CAST 5P 130MM CUSHMAN",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA DE FERRO N7 STANLEY GARLOPA",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA DE FERRO STANLEY N 4",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA DESEMPENADEIRA / VIMA",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA DESENGROSSADEIRA / VIMA",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA ELETRICA PORT 1900B MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "PLAINA ELETRICA PORTATIL / DWT",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 1
    },
    {
      "denominacao": "REBOTE DE FERRO N. 5 STANLEY",
      "quantidade": 1
    },
    {
      "denominacao": "SECCIONADORA VERTICAL CN /PUTSCH MENICONI",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA CIRCULAR 300X30X3,5MM LEITZ",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA CIRCULAR ESQUADREJADEIRA/INMES",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA CIRCULAR PORT.P/MADEIRA/MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA COPO (JOGO DE 16 A 51MM) MAKITA",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA DE MEIA ESQUADRIA G (A24)",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA TICO-TICO 127V PROFISSIONAL / DWT",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH 24 PT 10/100 C/ 2 UPLINK UTP 1000/HP",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS - UNIDADES / CISCO",
      "quantidade": 1
    },
    {
      "denominacao": "TUPIA 610X480 1CV MONO 1 VEL. 1 EIXO/MAKSIWA",
      "quantidade": 1
    },
    {
      "denominacao": "TUPIA MOLDUREIRA C/EIXO INCLINÁVEL /VERRY",
      "quantidade": 1
    },
    {
      "denominacao": "UNIDADE MOVEL DE EXAUSTAO NEW JAPAN",
      "quantidade": 1
    }
  ],
  "20480048": [
    {
      "denominacao": "BANCO GIRATÓRIO REGULÁVEL DC-1139 MOD.C",
      "quantidade": 16
    },
    {
      "denominacao": "ESTUFA PORTÁTIL MODELO COCHICHO/45",
      "quantidade": 13
    },
    {
      "denominacao": "MESA P/SOLDA ELÉTRICA C/ ARMÁRIO DC 1121",
      "quantidade": 13
    },
    {
      "denominacao": "MAQUINA DE SOLDA MULTIPROCESSO",
      "quantidade": 10
    },
    {
      "denominacao": "ESMERILHADEIRA ANGULAR ELÉTRICA 5\"",
      "quantidade": 6
    },
    {
      "denominacao": "MÁQUINA SOLDA MULTIPROC.CONV./EUTECTIC",
      "quantidade": 6
    },
    {
      "denominacao": "ESMERILHADEIRA ANGULAR 7P 110V/MAKITA",
      "quantidade": 5
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 4
    },
    {
      "denominacao": "BANCADA CALDEIREIRO C/PAINEL-DC-833/LDM",
      "quantidade": 4
    },
    {
      "denominacao": "ESMERILHADEIRA ANGUL.4 1/2P 220V/DEWALT",
      "quantidade": 4
    },
    {
      "denominacao": "MAÇARICO P/SOLDA OXIACETILÊNICA/SM 201",
      "quantidade": 4
    },
    {
      "denominacao": "MORSA DE BANCADA N.6",
      "quantidade": 4
    },
    {
      "denominacao": "MÁQUINA DE SOLDA MULTIPRO.C/FONTE IGBT",
      "quantidade": 4
    },
    {
      "denominacao": "MÁQUINA SOLDA MULTIPROC.SINÉRG./EUTECTIC",
      "quantidade": 4
    },
    {
      "denominacao": "MARRETA 1KG-CABO FIBRA VIDRO/TRAMONTINA",
      "quantidade": 3
    },
    {
      "denominacao": "MASCARA COM FILTRO ALTO ESCURECIMNTO",
      "quantidade": 3
    },
    {
      "denominacao": "MESA P/SOLDA C/ARMÁRIO DC 1121/LLEIDA",
      "quantidade": 3
    },
    {
      "denominacao": "MESA P/SOLDA OXIACETILÊNICA DC-886/LDM",
      "quantidade": 3
    },
    {
      "denominacao": "PLACA DE MARTELAGEM-DC 736/JEA",
      "quantidade": 3
    },
    {
      "denominacao": "SUPORTE REGUL. C/ BASE DC-738 BRASFIXO",
      "quantidade": 3
    },
    {
      "denominacao": "AFIADOR P/ELETRODOS TUNGSTENIO/CARBOG.",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO PARA VESTIÁRIO ÁRTICO - DC 1709",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA P/ESMERILHAR DC-1452/LDM",
      "quantidade": 2
    },
    {
      "denominacao": "MEDIDOR DE SOLDA/CARBOGRAFITE",
      "quantidade": 2
    },
    {
      "denominacao": "MESA P/SIMULADOR DE SOLDA - DC-2148",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA DE BANCADA N 5",
      "quantidade": 2
    },
    {
      "denominacao": "MÁQUINA SOLDA TIG INVERSORA AF-AC/DC/CEA",
      "quantidade": 2
    },
    {
      "denominacao": "RETIFICADEIRA MANUAL PNEUMÁTICA 1/4P/SCHULZ",
      "quantidade": 2
    },
    {
      "denominacao": "SIMULADOR DE SOLDAGEM",
      "quantidade": 2
    },
    {
      "denominacao": "VÁLVULA AUTOMÁTICA CONTROLADORA DE FLUXO",
      "quantidade": 2
    },
    {
      "denominacao": "APARELHO PORTÁTIL DE ULTRA-SOM/AROTEC",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO BAIXO ÁRTICO - DC1648",
      "quantidade": 1
    },
    {
      "denominacao": "ARMÁRIO PASTA SUSPENSA - DC 1659",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MADEIRA C 2 GAVETAS N 79999",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA PARA OXI-CORTE DC 837",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA SECURIT 169X66X90CM C/2 GAVETAS",
      "quantidade": 1
    },
    {
      "denominacao": "BIGORNA FERREIRO 83KG ALTONA",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P EQUIPAMENTO SOLDA OXI ACETIL",
      "quantidade": 1
    },
    {
      "denominacao": "CEPO DE FERRO FUNDIDO SIC 611",
      "quantidade": 1
    },
    {
      "denominacao": "CILINDRO ACETILENO 4 KG",
      "quantidade": 1
    },
    {
      "denominacao": "CILINDRO OXIGENIO 6 6M3",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO CONTRA RETROCESSO CHAMAS AC",
      "quantidade": 1
    },
    {
      "denominacao": "DISPOSITIVO CONTRA RETROCESSO CHAMAS OX",
      "quantidade": 1
    },
    {
      "denominacao": "ESTANTE PRAT. AÇO MOD.925X2000X457MM",
      "quantidade": 1
    },
    {
      "denominacao": "FORNO P/RESSECAG.ELETRODOS/CARBOGRAF.",
      "quantidade": 1
    },
    {
      "denominacao": "GUILHOTINA MECANICA TM-5 NEWTON",
      "quantidade": 1
    },
    {
      "denominacao": "JG.CHAVE COMBINADA 6 A 32MM 27PÇS / BREMEN",
      "quantidade": 1
    },
    {
      "denominacao": "MACARICO PARA SOLDA EXT.1A6 PROSTAR",
      "quantidade": 1
    },
    {
      "denominacao": "MAQUINA DE CORTE POR PLASMA",
      "quantidade": 1
    },
    {
      "denominacao": "MAÇARICO P/CORTE OXIACETILÊNICO/SM531",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P SOLDA ELETRICA DC 726",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P SOLDA OXI ACETILENICA SIC 179",
      "quantidade": 1
    },
    {
      "denominacao": "MESA PARA OXI-CORTE CIRCULAR DC-1192",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA BANCADA Nº4-BASE GIRAT/BRASFIXO",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N 3 FIXO AZUL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N.3",
      "quantidade": 1
    },
    {
      "denominacao": "MOTO ESMERIL DE BANCADA C/PEDESTAL/CEL",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA  OXI-CORTE SEMI-AUTOM./TROLEYCUT",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE CORTE POR PLASMA/CEA",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE CORTE POR PLASMA/HYPERTHERM",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE SOLDA MULTIPROCESSO SINÉRGICA",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA DE SOLDA PONTO PORTÁTIL",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA P/ENSAIOS FRATURA E DOBRAMENTO",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA SERRAR METAIS DE FITA HORIZ./ETT",
      "quantidade": 1
    },
    {
      "denominacao": "MÁQUINA SOLDA MULTIPROC.-CONV./EUTECTIC",
      "quantidade": 1
    },
    {
      "denominacao": "PEDESTAL DE FERRO FUNDIDO SIC-612",
      "quantidade": 1
    },
    {
      "denominacao": "SERRA POLICORTE 220V",
      "quantidade": 1
    },
    {
      "denominacao": "SISTEMA DE EXAUSTÃO P/OFICINA DE SOLDA",
      "quantidade": 1
    },
    {
      "denominacao": "VALVULA SECA CORTA-CHAMA",
      "quantidade": 1
    },
    {
      "denominacao": "YOKE C/PERNAS ARTICULÁVEIS SERV END",
      "quantidade": 1
    }
  ],
  "20480064": [
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS TECIDO PRETO",
      "quantidade": 21
    },
    {
      "denominacao": "NOTEBOOK CORPORATIVO",
      "quantidade": 21
    },
    {
      "denominacao": "ARMÁRIO BAIXO PARA GUARDA DE MATERIAIS",
      "quantidade": 2
    },
    {
      "denominacao": "DESKTOP CORPORATIVO",
      "quantidade": 2
    },
    {
      "denominacao": "ARMARIO BAIXO 793X500MM POSDT FORMING",
      "quantidade": 1
    },
    {
      "denominacao": "CARRINHO P/RECARGA 24 NOTEBOOKS/TABLETS",
      "quantidade": 1
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P/ INFORMÁTICA 1000X750X735 MM",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR CORPORATIVO C/CÂMERA",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS",
      "quantidade": 1
    },
    {
      "denominacao": "WORKSTATION CORPORATIVO",
      "quantidade": 1
    }
  ],
  "20480065": [
    {
      "denominacao": "NOTEBOOK CORPORATIVO",
      "quantidade": 39
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS TECIDO PRETO",
      "quantidade": 21
    },
    {
      "denominacao": "CARRINHO P/RECARGA 24 NOTEBOOKS/TABLETS",
      "quantidade": 2
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 1
    },
    {
      "denominacao": "MESA P/ INFORMÁTICA 1000X750X735 MM",
      "quantidade": 1
    },
    {
      "denominacao": "MOCHILEIRO 6 PORTAS C/ CHAVES - DC 1618",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR CORPORATIVO C/CÂMERA",
      "quantidade": 1
    },
    {
      "denominacao": "QUADRO BRANCO MAGNETICO 3000X1200MM",
      "quantidade": 1
    }
  ],
  "20480066": [
    {
      "denominacao": "CADEIRA FIXA POLIPROPILENO AZUL",
      "quantidade": 15
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA MDF C/PORTA LIVROS",
      "quantidade": 14
    },
    {
      "denominacao": "BANCADA P/FERRAMENTEIRO DESENHO DC-863",
      "quantidade": 8
    },
    {
      "denominacao": "FONTE DE ALIMENTAÇÃO AJUSTÁVEL 0-30V /5A",
      "quantidade": 8
    },
    {
      "denominacao": "BANCO P CARTEIRA DESENHO A 2421",
      "quantidade": 7
    },
    {
      "denominacao": "MULTÍMETRO DIGITAL AUTOMOTIVO",
      "quantidade": 6
    },
    {
      "denominacao": "CONJUNTO P/ESTUDO ELETRONICA ANALOGICA",
      "quantidade": 5
    },
    {
      "denominacao": "FONTE ALIMENTAÇÃO AJUST.0 A 30V-5A/ POLITERM",
      "quantidade": 3
    },
    {
      "denominacao": "MOCHILEIRO 6 PORTAS C/ CHAVES - DC 1618",
      "quantidade": 3
    },
    {
      "denominacao": "MORSA DE BANCADA N 3 FIXO AZUL",
      "quantidade": 3
    },
    {
      "denominacao": "SACA POLIA C/2 GARRAS ARTICUL. 60 A 98MM/GEDORE",
      "quantidade": 3
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO TRUE RMS / AC-DC",
      "quantidade": 2
    },
    {
      "denominacao": "ALICATE AMPERÍMETRO TRUE RMS- BLUETOOTH",
      "quantidade": 2
    },
    {
      "denominacao": "ANALISADOR SIST.DE CARGA E PARTIDA/KITA",
      "quantidade": 2
    },
    {
      "denominacao": "BANCADA TESTE P/ELÉTR. AUTOMOTIVA/KITA",
      "quantidade": 2
    },
    {
      "denominacao": "CONDICIONADOR DE AR 27.000 BTU HI-WALL/FUJITSU",
      "quantidade": 2
    },
    {
      "denominacao": "CONJ. DIDÁTICO AUTOMOTIVA:SINALIZAÇÃO E ILUMINAÇÃO",
      "quantidade": 2
    },
    {
      "denominacao": "CONJ.DIDÁTICO AUTOMOT.: VIDRO, TRAVAS, SOM ALARME",
      "quantidade": 2
    },
    {
      "denominacao": "JOGO CHAVE COMBINADA 6 A 41MM/GEDORE",
      "quantidade": 2
    },
    {
      "denominacao": "MORSA DE BANCADA N° 3",
      "quantidade": 2
    },
    {
      "denominacao": "OSCILOSCÓPIO AUTOMOTIVO / MINIPA",
      "quantidade": 2
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 2
    },
    {
      "denominacao": "QUADRO BRANCO MAGNÉTICO/DIDATICA BOARD",
      "quantidade": 2
    },
    {
      "denominacao": "TESTE DE BATERIA DIGITAL",
      "quantidade": 2
    },
    {
      "denominacao": "ARMÁRIO BAIXO C/PORTAS E GAVETAS DC 1811/LACHI",
      "quantidade": 1
    },
    {
      "denominacao": "BANCADA MULTIFUNCIONAL P/ALTERNADORES",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA P/BIBLIOTECA AZUL/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CARREGADOR DE BATERIA 12V/LUFFE",
      "quantidade": 1
    },
    {
      "denominacao": "CARREGADOR DE BATERIA 24V / PLANATC",
      "quantidade": 1
    },
    {
      "denominacao": "CARTEIRA P/ SALA DE AULA C/ PORTA LIVROS ÁRTICO",
      "quantidade": 1
    },
    {
      "denominacao": "CONJ.DIDAT.ATIV.PRAT.ELETROSTATICA PROBI",
      "quantidade": 1
    },
    {
      "denominacao": "FERRAMENTA P RETIRAR PARAFUSOS BOSCH",
      "quantidade": 1
    },
    {
      "denominacao": "FERRO SOLDA MACHADINHA 180W 220V/HIKARI",
      "quantidade": 1
    },
    {
      "denominacao": "JG.CHAVE SOQUETE 28PÇS 10 A 32MM / SATA",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE INFORMÁTICA 1400 ÁRTICO - DC 1663",
      "quantidade": 1
    },
    {
      "denominacao": "MICROCOMPUTADOR EDUCACIONAL BÁSICO / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR PROFESSIONAL 23 POL. WIDESCREEN / DELL",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA N.3",
      "quantidade": 1
    },
    {
      "denominacao": "MORSA DE BANCADA, FIXA, SOMAR N. 3",
      "quantidade": 1
    },
    {
      "denominacao": "OSCILOSCÓPIO AUTOMOTIVO",
      "quantidade": 1
    },
    {
      "denominacao": "OSCILOSCÓPIO DIGITAL 60 MHZ/TEKTRONIX",
      "quantidade": 1
    },
    {
      "denominacao": "PAINEL DIDATICO DE FREIO ABS",
      "quantidade": 1
    },
    {
      "denominacao": "PAINEL DIDATICO DE ILUMINACAO",
      "quantidade": 1
    },
    {
      "denominacao": "PAINEL DIDÁTICO INJEÇÃO/IGNIÇÃO ELETRONICA",
      "quantidade": 1
    },
    {
      "denominacao": "TESTE DE INDUZIDO/KITA",
      "quantidade": 1
    }
  ],
  "20480068": [
    {
      "denominacao": "CADEIRA GIRATORIA  S/ BRAÇOS ROYAL-TIRMIS",
      "quantidade": 23
    },
    {
      "denominacao": "DESKTOP CORPORATIVO",
      "quantidade": 21
    },
    {
      "denominacao": "MONITOR CORPORATIVO C/CÂMERA",
      "quantidade": 20
    },
    {
      "denominacao": "BANCADA ENSAIO MÓVEL C/ROD.P/AUTOMAÇÃO DC-1810",
      "quantidade": 8
    },
    {
      "denominacao": "CADEIRA C/SAPATAS S/BRAÇOS VINIL AZUL",
      "quantidade": 3
    },
    {
      "denominacao": "CADEIRA GIRAT.C/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA C/ BRAÇO ROYAL-TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA S/BRAÇOS VINIL AZUL/TIRMIS",
      "quantidade": 2
    },
    {
      "denominacao": "CADEIRA C/SAPATAS S/BRAÇOS VINIL AZ./TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRAT.C/BRAÇOS REGULÁV.PRETO/TIRMIS",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRAT.C/SAPATA S/BRAÇO-MAQ-MOVEIS",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRATORIA P/INFORMATICA S/BRACOS",
      "quantidade": 1
    },
    {
      "denominacao": "CADEIRA GIRATÓRIA COM ENCOSTO EM TELA",
      "quantidade": 1
    },
    {
      "denominacao": "CONDICIONADOR DE AR 30000 BTU T JANELA",
      "quantidade": 1
    },
    {
      "denominacao": "MESA DE PROFESSOR 1400X800X735MM",
      "quantidade": 1
    },
    {
      "denominacao": "MONITOR DE VÍDEO 24 POLEGADAS - DELL",
      "quantidade": 1
    },
    {
      "denominacao": "PROJETOR MULTIMÍDIA P/SALAS",
      "quantidade": 1
    },
    {
      "denominacao": "SWITCH L2 - 24 PORTAS",
      "quantidade": 1
    }
  ]
};

export const INITIAL_ALOCACOES: AlocacaoAula[] = [
  {
    "id": "ALOC-0001",
    "idTurma": "M1EME-COM-1/27",
    "idSubturma": "M1EME-COM-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Desenvolvimento Profissional e Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-COM-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0002",
    "idTurma": "M1EME-COM-1/27",
    "idSubturma": "M1EME-COM-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Letramento Digital",
    "cargaHorariaUC": 80,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-COM-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0003",
    "idTurma": "M1EME-COM-1/27",
    "idSubturma": "M1EME-COM-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos da Eletroeletrônica",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-COM-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0004",
    "idTurma": "M1EME-COM-1/27",
    "idSubturma": "M1EME-COM-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos de Instalações Eletroeletrônicas",
    "cargaHorariaUC": 120,
    "ambienteId": "20480017",
    "ambienteNome": "Oficina de Eletricidade",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 18,
    "alunos": 16,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-COM-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0005",
    "idTurma": "M1EME-COM-1/27",
    "idSubturma": "M1EME-COM-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Desenvolvimento Profissional e Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-COM-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0006",
    "idTurma": "M1EME-ARA-1/27",
    "idSubturma": "M1EME-ARA-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Desenvolvimento Profissional e Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0007",
    "idTurma": "M1EME-ARA-1/27",
    "idSubturma": "M1EME-ARA-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Letramento Digital",
    "cargaHorariaUC": 80,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0008",
    "idTurma": "M1EME-ARA-1/27",
    "idSubturma": "M1EME-ARA-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos da Eletroeletrônica",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0009",
    "idTurma": "M1EME-ARA-1/27",
    "idSubturma": "M1EME-ARA-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos de Instalações Eletroeletrônicas",
    "cargaHorariaUC": 120,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0010",
    "idTurma": "M1EME-ARA-1/27",
    "idSubturma": "M1EME-ARA-1/27 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Desenvolvimento Profissional e Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1EME-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0011",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Comunicação Oral e Escrita",
    "cargaHorariaUC": 40,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC33",
    "docenteNome": "MONTIBELLER",
    "docenteNomeCompleto": "Marcelo Henrique Gonçalves Montibeller",
    "docenteNif": "76101",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0012",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Matemática Aplicada à Usinagem",
    "cargaHorariaUC": 40,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC33",
    "docenteNome": "MONTIBELLER",
    "docenteNomeCompleto": "Marcelo Henrique Gonçalves Montibeller",
    "docenteNif": "76101",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0013",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Desenho Técnico Mecânico",
    "cargaHorariaUC": 80,
    "ambienteId": "20480031",
    "ambienteNome": "Sala de Aula 03 (Desenho Técnico)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC33",
    "docenteNome": "MONTIBELLER",
    "docenteNomeCompleto": "Marcelo Henrique Gonçalves Montibeller",
    "docenteNif": "76101",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0014",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Tecnologia Mecânica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC33",
    "docenteNome": "MONTIBELLER",
    "docenteNomeCompleto": "Marcelo Henrique Gonçalves Montibeller",
    "docenteNif": "76101",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0015",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Usinagem Mecânica",
    "cargaHorariaUC": 160,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC33",
    "docenteNome": "MONTIBELLER",
    "docenteNomeCompleto": "Marcelo Henrique Gonçalves Montibeller",
    "docenteNif": "76101",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0016",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Matemática Aplicada à Usinagem",
    "cargaHorariaUC": 40,
    "ambienteId": "20480038",
    "ambienteNome": "Sala de Aula 05",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0017",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Desenho Técnico Mecânico",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0018",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos da Tecnologia Mecânica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0019",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Usinagem Mecânica",
    "cargaHorariaUC": 160,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0020",
    "idTurma": "M1MUSI-COM-1/27",
    "idSubturma": "M1MUSI-COM-1/27 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Comunicação Oral e Escrita",
    "cargaHorariaUC": 40,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MUSI-COM-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0021",
    "idTurma": "M1MMAV-ARA-1/27",
    "idSubturma": "M1MMAV-ARA-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Comunicação e Relações Interpessoais",
    "cargaHorariaUC": 40,
    "ambienteId": "20480047",
    "ambienteNome": "Sala de Aula da Marcenaria (Restrita)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MMAV-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0022",
    "idTurma": "M1MMAV-ARA-1/27",
    "idSubturma": "M1MMAV-ARA-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Fundamentos de Eletricidade e Hidráulica Básica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MMAV-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0023",
    "idTurma": "M1MMAV-ARA-1/27",
    "idSubturma": "M1MMAV-ARA-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Metrologia Aplicada",
    "cargaHorariaUC": 80,
    "ambienteId": "20480008",
    "ambienteNome": "Lab. Metrologia Dimensional",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MMAV-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0024",
    "idTurma": "M1MMAV-ARA-1/27",
    "idSubturma": "M1MMAV-ARA-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Processos Mecânicos Básicos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MMAV-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0025",
    "idTurma": "M1MMAV-ARA-1/27",
    "idSubturma": "M1MMAV-ARA-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Segurança e Meio Ambiente",
    "cargaHorariaUC": 80,
    "ambienteId": "20480038",
    "ambienteNome": "Sala de Aula 05",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma M1MMAV-ARA-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0026",
    "idTurma": "M3MMAV-RAI-1/26",
    "idSubturma": "M3MMAV-RAI-1/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletroeletrônica Embarcada e Redes de Comunicação",
    "cargaHorariaUC": 120,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 12,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma M3MMAV-RAI-1/26 | Subturma Única"
  },
  {
    "id": "ALOC-0027",
    "idTurma": "M3MMAV-RAI-1/26",
    "idSubturma": "M3MMAV-RAI-1/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Manutenção de Implementos e Sistemas Especiais",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 12,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma M3MMAV-RAI-1/26 | Subturma Única"
  },
  {
    "id": "ALOC-0028",
    "idTurma": "M3MMAV-RAI-1/26",
    "idSubturma": "M3MMAV-RAI-1/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Sistemas Hidráulicos Avançados",
    "cargaHorariaUC": 160,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma M3MMAV-RAI-1/26 | Subturma Única"
  },
  {
    "id": "ALOC-0029",
    "idTurma": "M3MMAV-RAI-1/26",
    "idSubturma": "M3MMAV-RAI-1/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletroeletrônica Embarcada e Redes de Comunicação",
    "cargaHorariaUC": 120,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 12,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma M3MMAV-RAI-1/26 | Subturma Única"
  },
  {
    "id": "ALOC-0030",
    "idTurma": "M3MMAV-RAI-1/26",
    "idSubturma": "M3MMAV-RAI-1/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Manutenção de Implementos e Sistemas Especiais",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 12,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma M3MMAV-RAI-1/26 | Subturma Única"
  },
  {
    "id": "ALOC-0031",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - A",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480017",
    "ambienteNome": "Oficina de Eletricidade",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 18,
    "alunos": 15,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0032",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - A",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0033",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - A",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480017",
    "ambienteNome": "Oficina de Eletricidade",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 18,
    "alunos": 15,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0034",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - A",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0035",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - A",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480017",
    "ambienteNome": "Oficina de Eletricidade",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 18,
    "alunos": 15,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0036",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - B",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0037",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - B",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0038",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - B",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0039",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - B",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0040",
    "idTurma": "T3EME-COM-1/26",
    "idSubturma": "T3EME-COM-1/26 - B",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 15,
    "docenteId": "DOC24",
    "docenteNome": "HÁLISON",
    "docenteNomeCompleto": "Hálison Moreira Dorigan",
    "docenteNif": "sn1091827",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0041",
    "idTurma": "T3EME-RAI-2/25",
    "idSubturma": "T3EME-RAI-2/25 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480037",
    "ambienteNome": "Lab. Máquinas Elétricas",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC26",
    "docenteNome": "ANDRÉ DONATONI (FIC)",
    "docenteNomeCompleto": "André Luís Donatoni",
    "docenteNif": "1013629",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0042",
    "idTurma": "T3EME-RAI-2/25",
    "idSubturma": "T3EME-RAI-2/25 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC26",
    "docenteNome": "ANDRÉ DONATONI (FIC)",
    "docenteNomeCompleto": "André Luís Donatoni",
    "docenteNif": "1013629",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0043",
    "idTurma": "T3EME-RAI-2/25",
    "idSubturma": "T3EME-RAI-2/25 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480037",
    "ambienteNome": "Lab. Máquinas Elétricas",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC26",
    "docenteNome": "ANDRÉ DONATONI (FIC)",
    "docenteNomeCompleto": "André Luís Donatoni",
    "docenteNif": "1013629",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0044",
    "idTurma": "T3EME-RAI-2/25",
    "idSubturma": "T3EME-RAI-2/25 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Sistemas Automatizados de Manutenção",
    "cargaHorariaUC": 200,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC26",
    "docenteNome": "ANDRÉ DONATONI (FIC)",
    "docenteNomeCompleto": "André Luís Donatoni",
    "docenteNif": "1013629",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0045",
    "idTurma": "T3EME-RAI-2/25",
    "idSubturma": "T3EME-RAI-2/25 (Única)",
    "curso": "Eletricista de Manutenção Eletroeletrônica",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Manutenção Elétrica Industrial",
    "cargaHorariaUC": 200,
    "ambienteId": "20480037",
    "ambienteNome": "Lab. Máquinas Elétricas",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 12,
    "docenteId": "DOC26",
    "docenteNome": "ANDRÉ DONATONI (FIC)",
    "docenteNomeCompleto": "André Luís Donatoni",
    "docenteNif": "1013629",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3EME-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0046",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Usinagem em Fresadora",
    "cargaHorariaUC": 160,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC06",
    "docenteNome": "MARCELO CORRÊA (MIR/FIC)",
    "docenteNomeCompleto": "Marcelo Corrêa",
    "docenteNif": "SN1082551",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0047",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Usinagem em Retificadora",
    "cargaHorariaUC": 120,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC06",
    "docenteNome": "MARCELO CORRÊA (MIR/FIC)",
    "docenteNomeCompleto": "Marcelo Corrêa",
    "docenteNif": "SN1082551",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0048",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos de CNC",
    "cargaHorariaUC": 120,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC06",
    "docenteNome": "MARCELO CORRÊA (MIR/FIC)",
    "docenteNomeCompleto": "Marcelo Corrêa",
    "docenteNif": "SN1082551",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0049",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Usinagem em Fresadora",
    "cargaHorariaUC": 160,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC06",
    "docenteNome": "MARCELO CORRÊA (MIR/FIC)",
    "docenteNomeCompleto": "Marcelo Corrêa",
    "docenteNif": "SN1082551",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0050",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - A",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Usinagem em Retificadora",
    "cargaHorariaUC": 120,
    "ambienteId": "20480015",
    "ambienteNome": "Oficina de Tornearia",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC06",
    "docenteNome": "MARCELO CORRÊA (MIR/FIC)",
    "docenteNomeCompleto": "Marcelo Corrêa",
    "docenteNif": "SN1082551",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0051",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Usinagem em Retificadora",
    "cargaHorariaUC": 120,
    "ambienteId": "20480007",
    "ambienteNome": "Lab. CAD / CAM",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0052",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Fundamentos de CNC",
    "cargaHorariaUC": 120,
    "ambienteId": "20480007",
    "ambienteNome": "Lab. CAD / CAM",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0053",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Usinagem em Fresadora",
    "cargaHorariaUC": 160,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0054",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Usinagem em Retificadora",
    "cargaHorariaUC": 120,
    "ambienteId": "20480007",
    "ambienteNome": "Lab. CAD / CAM",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0055",
    "idTurma": "T3MUSI-COM-1/26",
    "idSubturma": "T3MUSI-COM-1/26 - B",
    "curso": "Mecânico de Usinagem",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos de CNC",
    "cargaHorariaUC": 120,
    "ambienteId": "20480007",
    "ambienteNome": "Lab. CAD / CAM",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC12",
    "docenteNome": "BARON",
    "docenteNomeCompleto": "Carlos Eduardo Barom",
    "docenteNif": "1049969",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MUSI-COM-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0056",
    "idTurma": "T3MMAV-RAI-2/25",
    "idSubturma": "T3MMAV-RAI-2/25 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletroeletrônica Embarcada e Redes de Comunicação",
    "cargaHorariaUC": 120,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 13,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MMAV-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0057",
    "idTurma": "T3MMAV-RAI-2/25",
    "idSubturma": "T3MMAV-RAI-2/25 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Manutenção de Implementos e Sistemas Especiais",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 13,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MMAV-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0058",
    "idTurma": "T3MMAV-RAI-2/25",
    "idSubturma": "T3MMAV-RAI-2/25 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Sistemas Hidráulicos Avançados",
    "cargaHorariaUC": 160,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 13,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MMAV-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0059",
    "idTurma": "T3MMAV-RAI-2/25",
    "idSubturma": "T3MMAV-RAI-2/25 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletroeletrônica Embarcada e Redes de Comunicação",
    "cargaHorariaUC": 120,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 13,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MMAV-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0060",
    "idTurma": "T3MMAV-RAI-2/25",
    "idSubturma": "T3MMAV-RAI-2/25 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "3º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Manutenção de Implementos e Sistemas Especiais",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 13,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma T3MMAV-RAI-2/25 | Subturma Única"
  },
  {
    "id": "ALOC-0061",
    "idTurma": "T1MMAV-RAI-2/26",
    "idSubturma": "T1MMAV-RAI-2/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Comunicação e Relações Interpessoais",
    "cargaHorariaUC": 40,
    "ambienteId": "20480038",
    "ambienteNome": "Sala de Aula 05",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 32,
    "alunos": 20,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma T1MMAV-RAI-2/26 | Subturma Única"
  },
  {
    "id": "ALOC-0062",
    "idTurma": "T1MMAV-RAI-2/26",
    "idSubturma": "T1MMAV-RAI-2/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Fundamentos de Eletricidade e Hidráulica Básica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 20,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma T1MMAV-RAI-2/26 | Subturma Única"
  },
  {
    "id": "ALOC-0063",
    "idTurma": "T1MMAV-RAI-2/26",
    "idSubturma": "T1MMAV-RAI-2/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Metrologia Aplicada",
    "cargaHorariaUC": 80,
    "ambienteId": "20480008",
    "ambienteNome": "Lab. Metrologia Dimensional",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 20,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma T1MMAV-RAI-2/26 | Subturma Única"
  },
  {
    "id": "ALOC-0064",
    "idTurma": "T1MMAV-RAI-2/26",
    "idSubturma": "T1MMAV-RAI-2/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Processos Mecânicos Básicos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 20,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma T1MMAV-RAI-2/26 | Subturma Única"
  },
  {
    "id": "ALOC-0065",
    "idTurma": "T1MMAV-RAI-2/26",
    "idSubturma": "T1MMAV-RAI-2/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Segurança e Meio Ambiente",
    "cargaHorariaUC": 80,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 20,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma T1MMAV-RAI-2/26 | Subturma Única"
  },
  {
    "id": "ALOC-0066",
    "idTurma": "I2MMAV-MATA/26",
    "idSubturma": "I2MMAV-MATA/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletricidade Aplicada a Veículos Pesados",
    "cargaHorariaUC": 120,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MMAV-MATA/26 | Subturma Única"
  },
  {
    "id": "ALOC-0067",
    "idTurma": "I2MMAV-MATA/26",
    "idSubturma": "I2MMAV-MATA/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Motores de Combustão Interna ciclo Diesel",
    "cargaHorariaUC": 160,
    "ambienteId": "20480014",
    "ambienteNome": "Oficina Mecânica Diesel (Veículos Pesados / Agrícola)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 15,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MMAV-MATA/26 | Subturma Única"
  },
  {
    "id": "ALOC-0068",
    "idTurma": "I2MMAV-MATA/26",
    "idSubturma": "I2MMAV-MATA/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Motores de Combustão Interna ciclo Diesel",
    "cargaHorariaUC": 160,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MMAV-MATA/26 | Subturma Única"
  },
  {
    "id": "ALOC-0069",
    "idTurma": "I2MMAV-MATA/26",
    "idSubturma": "I2MMAV-MATA/26 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Sistemas de Transmissão Mecânica",
    "cargaHorariaUC": 120,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MMAV-MATA/26 | Subturma Única"
  },
  {
    "id": "ALOC-0070",
    "idTurma": "I1MMAV-VIT-1/27",
    "idSubturma": "I1MMAV-VIT-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Comunicação e Relações Interpessoais",
    "cargaHorariaUC": 40,
    "ambienteId": "20480011",
    "ambienteNome": "Sala de Aula 04",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MMAV-VIT-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0071",
    "idTurma": "I1MMAV-VIT-1/27",
    "idSubturma": "I1MMAV-VIT-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos de Eletricidade e Hidráulica Básica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MMAV-VIT-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0072",
    "idTurma": "I1MMAV-VIT-1/27",
    "idSubturma": "I1MMAV-VIT-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos de Eletricidade e Hidráulica Básica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MMAV-VIT-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0073",
    "idTurma": "I1MMAV-VIT-1/27",
    "idSubturma": "I1MMAV-VIT-1/27 (Única)",
    "curso": "Mecânico de Máquinas Agrícolas e Veículos Pesados",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Metrologia Aplicada",
    "cargaHorariaUC": 80,
    "ambienteId": "20480008",
    "ambienteNome": "Lab. Metrologia Dimensional",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MMAV-VIT-1/27 | Subturma Única"
  },
  {
    "id": "ALOC-0074",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Desenho e Modelagem 2D/3D",
    "cargaHorariaUC": 80,
    "ambienteId": "20480031",
    "ambienteNome": "Sala de Aula 03 (Desenho Técnico)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0075",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0076",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0077",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0078",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0079",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0080",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0081",
    "idTurma": "I1A-AUT-ATA/27",
    "idSubturma": "I1A-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Desenho e Modelagem 2D/3D",
    "cargaHorariaUC": 80,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC34",
    "docenteNome": "ALINE",
    "docenteNomeCompleto": "Aline Cristina Garcia",
    "docenteNif": "SN_ALINE",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1A-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0082",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Desenho e Modelagem 2D/3D",
    "cargaHorariaUC": 80,
    "ambienteId": "20480007",
    "ambienteNome": "Lab. CAD / CAM",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0083",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0084",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0085",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma A"
  },
  {
    "id": "ALOC-0086",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletricidade Básica e Circuitos Elétricos",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0087",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0088",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Automação e Instrumentação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0089",
    "idTurma": "I1B-AUT-ATA/27",
    "idSubturma": "I1B-AUT-ATA/27 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Desenho e Modelagem 2D/3D",
    "cargaHorariaUC": 80,
    "ambienteId": "20480031",
    "ambienteNome": "Sala de Aula 03 (Desenho Técnico)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1B-AUT-ATA/27 | Subturma B"
  },
  {
    "id": "ALOC-0090",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Controladores Lógicos Programáveis (CLP)",
    "cargaHorariaUC": 100,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0091",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0092",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0093",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC22",
    "docenteNome": "CLEBER",
    "docenteNomeCompleto": "Cleber Rodrigo Torres",
    "docenteNif": "1008155",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0094",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0095",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0096",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0097",
    "idTurma": "I2A-AUT-ATA/26",
    "idSubturma": "I2A-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Controladores Lógicos Programáveis (CLP)",
    "cargaHorariaUC": 100,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2A-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0098",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Controladores Lógicos Programáveis (CLP)",
    "cargaHorariaUC": 100,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0099",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0100",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480044",
    "ambienteNome": "Lab. Eletrônica 02 (Automação Predial)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0101",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - A",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC20",
    "docenteNome": "JOSIAS",
    "docenteNomeCompleto": "Josias Bartolomeu Costa Ribeiro",
    "docenteNif": "SN1077147",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma A"
  },
  {
    "id": "ALOC-0102",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Eletrônica Analógica e Digital Aplicada",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0103",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480043",
    "ambienteNome": "Lab. CLP e Microcontroladores",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0104",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Redes Industriais de Comunicação",
    "cargaHorariaUC": 80,
    "ambienteId": "20480041",
    "ambienteNome": "Lab. Mecânica dos Fluidos (Pneumática/Hidráulica)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0105",
    "idTurma": "I2B-AUT-ATA/26",
    "idSubturma": "I2B-AUT-ATA/26 - B",
    "curso": "Técnico em Automação Industrial",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Controladores Lógicos Programáveis (CLP)",
    "cargaHorariaUC": 100,
    "ambienteId": "20480040",
    "ambienteNome": "Lab. Comandos Elétricos",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2B-AUT-ATA/26 | Subturma B"
  },
  {
    "id": "ALOC-0106",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Algoritmos e Lógica de Programação",
    "cargaHorariaUC": 100,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0107",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Análise e Modelagem de Sistemas",
    "cargaHorariaUC": 60,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0108",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Análise e Modelagem de Sistemas",
    "cargaHorariaUC": 60,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0109",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Banco de Dados Relacional",
    "cargaHorariaUC": 80,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC11",
    "docenteNome": "CEZAR",
    "docenteNomeCompleto": "Cezar Bertelli",
    "docenteNif": "1088784",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0110",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Análise e Modelagem de Sistemas",
    "cargaHorariaUC": 60,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0111",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Banco de Dados Relacional",
    "cargaHorariaUC": 80,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0112",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Banco de Dados Relacional",
    "cargaHorariaUC": 80,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0113",
    "idTurma": "I1-DEV-ATA-1/27",
    "idSubturma": "I1-DEV-ATA-1/27 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos de Redes e Infraestrutura de TI",
    "cargaHorariaUC": 60,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1-DEV-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0114",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Desenvolvimento de Aplicações Web (Front-End)",
    "cargaHorariaUC": 80,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0115",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Desenvolvimento Web Back-End e APIs",
    "cargaHorariaUC": 80,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0116",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Desenvolvimento Web Back-End e APIs",
    "cargaHorariaUC": 80,
    "ambienteId": "20480068",
    "ambienteNome": "Lab. Informática 03 / Inovação (FabLab)",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0117",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - A",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Engenharia de Software e Métodos Ágeis",
    "cargaHorariaUC": 60,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC21",
    "docenteNome": "HEITOR",
    "docenteNomeCompleto": "Heitor Ilario Zucão",
    "docenteNif": "1081494",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0118",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Desenvolvimento Web Back-End e APIs",
    "cargaHorariaUC": 80,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0119",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Engenharia de Software e Métodos Ágeis",
    "cargaHorariaUC": 60,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0120",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Engenharia de Software e Métodos Ágeis",
    "cargaHorariaUC": 60,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0121",
    "idTurma": "I2-DEV-ATA-1/26",
    "idSubturma": "I2-DEV-ATA-1/26 - B",
    "curso": "Técnico em Desenvolvimento de Sistemas",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Programação Orientada a Objetos",
    "cargaHorariaUC": 80,
    "ambienteId": "20480065",
    "ambienteNome": "Lab. de Informática 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2-DEV-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0122",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Eletroeletrônica Automotiva Básica",
    "cargaHorariaUC": 80,
    "ambienteId": "20480013",
    "ambienteNome": "Oficina Mecânica Automotiva (Veículos Leves)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0123",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Tecnologia Automotiva",
    "cargaHorariaUC": 80,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0124",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Fundamentos da Tecnologia Automotiva",
    "cargaHorariaUC": 80,
    "ambienteId": "20480031",
    "ambienteNome": "Sala de Aula 03 (Desenho Técnico)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 32,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0125",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Metrologia e Ajustagem Mecânica",
    "cargaHorariaUC": 60,
    "ambienteId": "20480008",
    "ambienteNome": "Lab. Metrologia Dimensional",
    "bloco": "Bloco 02",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma A"
  },
  {
    "id": "ALOC-0126",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Tecnologia Automotiva",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0127",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Metrologia e Ajustagem Mecânica",
    "cargaHorariaUC": 60,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0128",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Metrologia e Ajustagem Mecânica",
    "cargaHorariaUC": 60,
    "ambienteId": "20480016",
    "ambienteNome": "Oficina de Ajustagem",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 16,
    "alunos": 16,
    "docenteId": "DOC10",
    "docenteNome": "CHARLES",
    "docenteNomeCompleto": "Charles Vinicius de Carvalho Ferreira",
    "docenteNif": "1095290",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0129",
    "idTurma": "I1MAUT-ATA-1/27",
    "idSubturma": "I1MAUT-ATA-1/27 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Saúde, Segurança e Meio Ambiente no Setor Automotivo",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1MAUT-ATA-1/27 | Subturma B"
  },
  {
    "id": "ALOC-0130",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Gerenciamento Eletrônico de Motores",
    "cargaHorariaUC": 100,
    "ambienteId": "20480013",
    "ambienteNome": "Oficina Mecânica Automotiva (Veículos Leves)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0131",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Manutenção de Motores Ciclo Otto e Diesel",
    "cargaHorariaUC": 80,
    "ambienteId": "20480013",
    "ambienteNome": "Oficina Mecânica Automotiva (Veículos Leves)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0132",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Manutenção de Motores Ciclo Otto e Diesel",
    "cargaHorariaUC": 80,
    "ambienteId": "20480013",
    "ambienteNome": "Oficina Mecânica Automotiva (Veículos Leves)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC18",
    "docenteNome": "FELIPE",
    "docenteNomeCompleto": "Felipe Costa do Amaral",
    "docenteNif": "SN1078058",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0133",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - A",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Sistemas de Freios, Suspensão e Direção",
    "cargaHorariaUC": 80,
    "ambienteId": "20480013",
    "ambienteNome": "Oficina Mecânica Automotiva (Veículos Leves)",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 20,
    "alunos": 16,
    "docenteId": "DOC09",
    "docenteNome": "VALTER",
    "docenteNomeCompleto": "Válter Aparecido Marin",
    "docenteNif": "73236",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma A"
  },
  {
    "id": "ALOC-0134",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Manutenção de Motores Ciclo Otto e Diesel",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0135",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Segunda",
    "diaSemanaNum": 1,
    "uc": "Sistemas de Freios, Suspensão e Direção",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC30",
    "docenteNome": "EMERSON",
    "docenteNomeCompleto": "Emerson Santana Martins",
    "docenteNif": "1089880",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0136",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Sistemas de Freios, Suspensão e Direção",
    "cargaHorariaUC": 80,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0137",
    "idTurma": "I2MAUT-ATA-1/26",
    "idSubturma": "I2MAUT-ATA-1/26 - B",
    "curso": "Técnico em Manutenção Automotiva",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Transmissão Mecânica e Automatizada",
    "cargaHorariaUC": 40,
    "ambienteId": "20480066",
    "ambienteNome": "Lab. Eletrônica Veicular (Autotrônica)",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 16,
    "alunos": 15,
    "docenteId": "DOC31",
    "docenteNome": "EDUARDO",
    "docenteNomeCompleto": "Eduardo Silva Monteiro",
    "docenteNif": "1071926",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2MAUT-ATA-1/26 | Subturma B"
  },
  {
    "id": "ALOC-0138",
    "idTurma": "I1QUA-SEDUC/27",
    "idSubturma": "I1QUA-SEDUC/27 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Ferramentas da Qualidade e Análise de Falhas",
    "cargaHorariaUC": 80,
    "ambienteId": "20480038",
    "ambienteNome": "Sala de Aula 05",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 32,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1QUA-SEDUC/27 | Subturma Cheia"
  },
  {
    "id": "ALOC-0139",
    "idTurma": "I1QUA-SEDUC/27",
    "idSubturma": "I1QUA-SEDUC/27 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Terça",
    "diaSemanaNum": 2,
    "uc": "Fundamentos da Gestão da Qualidade",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC32",
    "docenteNome": "MURILLO",
    "docenteNomeCompleto": "Murillo Seraphim Rossi",
    "docenteNif": "SN1074128",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1QUA-SEDUC/27 | Subturma Cheia"
  },
  {
    "id": "ALOC-0140",
    "idTurma": "I1QUA-SEDUC/27",
    "idSubturma": "I1QUA-SEDUC/27 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos da Gestão da Qualidade",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1QUA-SEDUC/27 | Subturma Cheia"
  },
  {
    "id": "ALOC-0141",
    "idTurma": "I1QUA-SEDUC/27",
    "idSubturma": "I1QUA-SEDUC/27 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Mapeamento e Padronização de Processos",
    "cargaHorariaUC": 80,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1QUA-SEDUC/27 | Subturma Cheia"
  },
  {
    "id": "ALOC-0142",
    "idTurma": "I2QUA-SEDUC/26",
    "idSubturma": "I2QUA-SEDUC/26 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Controle Estatístico de Processo (CEP)",
    "cargaHorariaUC": 80,
    "ambienteId": "20480038",
    "ambienteNome": "Sala de Aula 05",
    "bloco": "Bloco 01 Pav. Térreo",
    "capacidadeAmbiente": 32,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2QUA-SEDUC/26 | Subturma Cheia"
  },
  {
    "id": "ALOC-0143",
    "idTurma": "I2QUA-SEDUC/26",
    "idSubturma": "I2QUA-SEDUC/26 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Custos da Qualidade e Produtividade",
    "cargaHorariaUC": 60,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2QUA-SEDUC/26 | Subturma Cheia"
  },
  {
    "id": "ALOC-0144",
    "idTurma": "I2QUA-SEDUC/26",
    "idSubturma": "I2QUA-SEDUC/26 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "2º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Custos da Qualidade e Produtividade",
    "cargaHorariaUC": 60,
    "ambienteId": "20480030",
    "ambienteNome": "Sala de Aula 02",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2QUA-SEDUC/26 | Subturma Cheia"
  },
  {
    "id": "ALOC-0145",
    "idTurma": "I2QUA-SEDUC/26",
    "idSubturma": "I2QUA-SEDUC/26 (Cheia)",
    "curso": "Técnico em Qualidade",
    "termo": "2º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Sexta",
    "diaSemanaNum": 5,
    "uc": "Metrologia Dimensional e Análise de Sistemas de Medição",
    "cargaHorariaUC": 80,
    "ambienteId": "20480029",
    "ambienteNome": "Sala de Aula 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 36,
    "alunos": 32,
    "docenteId": "DOC04",
    "docenteNome": "FERRARESE",
    "docenteNomeCompleto": "Rodrigo Roberto Ferrareze",
    "docenteNif": "1078130",
    "pesoAfinidade": 30,
    "observacoes": "Turma I2QUA-SEDUC/26 | Subturma Cheia"
  },
  {
    "id": "ALOC-0146",
    "idTurma": "I1ELE-COLOR/27",
    "idSubturma": "I1ELE-COLOR/27 (Única)",
    "curso": "Técnico em Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Ferramentas Digitais para o Mercado de Trabalho",
    "cargaHorariaUC": 60,
    "ambienteId": "20480064",
    "ambienteNome": "Lab. de Informática 01",
    "bloco": "Bloco 01 Pav. Superior",
    "capacidadeAmbiente": 21,
    "alunos": 16,
    "docenteId": "DOC07",
    "docenteNome": "TREVELIM",
    "docenteNomeCompleto": "Joao Luiz Trevelim",
    "docenteNif": "77763",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1ELE-COLOR/27 | Subturma Única"
  },
  {
    "id": "ALOC-0147",
    "idTurma": "I1ELE-COLOR/27",
    "idSubturma": "I1ELE-COLOR/27 (Única)",
    "curso": "Técnico em Eletroeletrônica",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quarta",
    "diaSemanaNum": 3,
    "uc": "Fundamentos da Eletroeletrônica",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC08",
    "docenteNome": "ÉRICO",
    "docenteNomeCompleto": "Érico Rodrigo de Abreu Carvalho",
    "docenteNif": "1076858",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1ELE-COLOR/27 | Subturma Única"
  },
  {
    "id": "ALOC-0148",
    "idTurma": "I1ELE-COLOR/27",
    "idSubturma": "I1ELE-COLOR/27 (Única)",
    "curso": "Técnico em Eletroeletrônica",
    "termo": "1º",
    "turno": "Manhã",
    "horario": "07:30 - 11:30",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Fundamentos da Eletroeletrônica",
    "cargaHorariaUC": 120,
    "ambienteId": "20480042",
    "ambienteNome": "Lab. Eletrônica 01",
    "bloco": "Bloco 01 Pav. Inferior",
    "capacidadeAmbiente": 17,
    "alunos": 16,
    "docenteId": "DOC27",
    "docenteNome": "WILLIAN",
    "docenteNomeCompleto": "Willian Rodrigo Garcia De Jesus",
    "docenteNif": "1103728",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1ELE-COLOR/27 | Subturma Única"
  },
  {
    "id": "ALOC-0149",
    "idTurma": "I1ELE-COLOR/27",
    "idSubturma": "I1ELE-COLOR/27 (Única)",
    "curso": "Técnico em Eletroeletrônica",
    "termo": "1º",
    "turno": "Tarde",
    "horario": "13:00 - 17:00",
    "diaSemana": "Quinta",
    "diaSemanaNum": 4,
    "uc": "Implementação de Sistemas Eletroeletrônicos Prediais",
    "cargaHorariaUC": 120,
    "ambienteId": "20480017",
    "ambienteNome": "Oficina de Eletricidade",
    "bloco": "Bloco 06",
    "capacidadeAmbiente": 18,
    "alunos": 16,
    "docenteId": "DOC13",
    "docenteNome": "JONATHAS",
    "docenteNomeCompleto": "Jonathas Arthur Quintiliano",
    "docenteNif": "1028282",
    "pesoAfinidade": 30,
    "observacoes": "Turma I1ELE-COLOR/27 | Subturma Única"
  }
];
