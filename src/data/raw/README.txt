PACOTE DE DADOS BACKEND - SENAI CFP 901 ARAÇATUBA (2027)
=================================================================================
Este pacote contém exclusivamente as tabelas em formato CSV e o script do motor
em Python (Google OR-Tools CP-SAT) para download e integração no Google AI Studio.

DIRETRIZES ESTRUTURAIS APLICADAS:
- As turmas, horários e períodos são fixos e imutáveis:
  • Prefixo M: Turno da Manhã (Segunda a Sexta, 4h/dia = 20h/sem = 400h/semestre)
  • Prefixo T: Turno da Tarde (Segunda a Sexta, 4h/dia = 20h/sem = 400h/semestre)
  • Prefixo I: Período Integral (Manhã e Tarde nos 2 dias da semana = 16h/sem = 300h a 320h/semestre)
- Fim de rótulos artificiais de "teórico ou prático":
  • É a Unidade Curricular (UC) que determina o ambiente e os docentes aptos.
  • Todas as UCs de TI (Lógica, Banco de Dados, Redes, Modelagem, etc.) utilizam Laboratórios de Informática.
  • UCs de Comunicação, Matemática, Estatística e Gestão utilizam Salas de Aula (Salas 01, 02, 03 e 05).
  • UCs técnicas de mecânica, elétrica, usinagem, automotiva e agrícola utilizam seus respectivos laboratórios e oficinas.

RELAÇÃO DOS ARQUIVOS CSV:
1. 01_dim_turmas.csv: As 23 turmas base da unidade (sem turmas descentralizadas AND/MIR/GUA).
2. 02_dim_subturmas.csv: As 34 instâncias operacionais (subturmas A e B para >20 alunos, e SEDUC em turma cheia de 32 alunos).
3. 03_dim_ambientes.csv: Os 24 ambientes de ensino homologados com códigos patrimoniais oficiais e capacidades.
4. 04_dim_docentes.csv: Cadastro completo dos 35 docentes (22 regulares de Araçatuba + 13 exclusivos FIC/descentralizadas).
5. 05_dim_calendario_2027.csv: Os 100 dias letivos válidos do 1º Semestre de 2027.
6. 06_matriz_ucs_ambientes.csv: As 58 UCs oficiais com cargas horárias, ambientes homologados por UC e docentes habilitados.
7. 07_bens_patrimoniais_ambientes.csv: 1.290 agrupamentos de bens patrimoniais do PAT por ambiente.
8. 08_aptidao_docente_por_uc.csv: Matriz de aptidão docente por UC sem colunas de teoria/prática.
9. Base_Completa_Backend_SENAI_Araçatuba_2027.xlsx: Pasta de trabalho Excel com todas as abas limpas.
10. motor_ensalamento_aracatuba.py: Script Python do motor Google OR-Tools para execução local.
=================================================================================

ATUALIZAÇÃO — RECORTE DAS TURMAS INICIADAS EM 2026
As datas Inicio/Termino permanecem históricas. Para T3EME-RAI-2/25,
T3MMAV-RAI-2/25, T1MMAV-RAI-2/26 e I2MMAV-MATA/26, os campos
Inicio_Computo_2027, Termino_Computo_2027 e Horas_Computaveis_2027
registram somente a ocupação letiva de 2027: 68h, 68h, 192h e 216h.
São horas por subturma, calculadas pelo calendário existente, dias da semana
e blocos de 4h por turno. Não representam saldos conhecidos por UC.
Status_Distribuicao_UCs_2027=PENDENTE: o motor continua exigindo
horas_restantes por UC para calcular uma grade dessas turmas.
Campos vazios nas demais turmas significam recorte específico não definido.
A atribuição de docentes deve usar o mapeamento por UC, não Docente_Ref_*.

RESTRIÇÃO OBRIGATÓRIA — DIAS E TURNOS FIXOS
Aplica-se a todas as turmas e subturmas: Dias_Semana e Turno delimitam os únicos
blocos permitidos. Integral = Manhã e Tarde nos dias cadastrados. As UCs devem
caber nesses blocos; não mover aulas para dias/turnos adicionais para completar
carga horária ou resolver conflitos. Respeitar também datas e calendário letivo.
