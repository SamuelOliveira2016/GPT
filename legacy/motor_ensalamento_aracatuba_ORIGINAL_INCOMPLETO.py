"""
MOTOR DE OTIMIZAÇÃO E ENSALAMENTO (SENAI CFP 901 - ARAÇATUBA 2027)
Algoritmo de Pesquisa Operacional utilizando Google OR-Tools CP-SAT.
Lê as tabelas em formato CSV e executa o ensalamento sem qualquer definição arbitrária de teórico/prático.
O que determina o ambiente e os docentes é estritamente a Unidade Curricular (UC).
"""

from ortools.sat.python import cp_model
import pandas as pd
import numpy as np

def carregar_dados_e_executar(caminho_pasta='.'):
    df_turmas = pd.read_csv(f"{caminho_pasta}/01_dim_turmas.csv")
    df_subturmas = pd.read_csv(f"{caminho_pasta}/02_dim_subturmas.csv")
    df_ambientes = pd.read_csv(f"{caminho_pasta}/03_dim_ambientes.csv")
    df_docentes = pd.read_csv(f"{caminho_pasta}/04_dim_docentes.csv")
    df_matriz = pd.read_csv(f"{caminho_pasta}/06_matriz_ucs_ambientes.csv")
    df_apt = pd.read_csv(f"{caminho_pasta}/08_aptidao_docente_por_uc.csv")

    model = cp_model.CpModel()
    dias_semana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
    turnos_regulares = ['Manhã', 'Tarde']

    print(f"Dados carregados: {len(df_subturmas)} subturmas, {len(df_ambientes)} ambientes, {len(df_docentes)} docentes.")
    return df_subturmas, df_ambientes, df_docentes, df_matriz, df_apt

if __name__ == '__main__':
    carregar_dados_e_executar()
"""
MOTOR DE OTIMIZAÇÃO E ENSALAMENTO AUTOMÁTICO (SENAI CFP 901 - ARAÇATUBA 2027)
Algoritmo de Pesquisa Operacional utilizando Google OR-Tools CP-SAT.
"""

import os
from ortools.sat.python import cp_model
import pandas as pd


def parse_dias_lista(dias_str):
  dias_str = str(dias_str).lower()
  if 'segunda a sexta' in dias_str:
    return ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  res = []
  if 'segunda' in dias_str:
    res.append('Segunda')
  if 'terça' in dias_str or 'terca' in dias_str:
    res.append('Terça')
  if 'quarta' in dias_str:
    res.append('Quarta')
  if 'quinta' in dias_str:
    res.append('Quinta')
  if 'sexta' in dias_str:
    res.append('Sexta')
  return res


def mapear_curso(c_str):
  c = c_str.upper()
  if 'ELETRICISTA' in c:
    return 'Eletricista de Manutenção Eletroeletrônica (CAI)'
  if 'USINAGEM' in c:
    return 'Mecânico de Usinagem (CAI)'
  if 'AGRÍCOLAS' in c:
    return 'Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)'
  if 'AUTOMAÇÃO' in c:
    return 'Técnico em Automação Industrial'
  if 'DESENVOLVIMENTO' in c:
    return 'Técnico em Desenvolvimento de Sistemas'
  if 'ELETROELETRÔNICA' in c:
    return 'Técnico em Eletroeletrônica'
  if 'AUTOMOTIVA' in c:
    return 'Técnico em Manutenção Automotiva'
  if 'QUALIDADE' in c:
    return 'Técnico em Qualidade'
  return c_str


def executar_otimizacao(caminho_dados='.'):
  df_turmas = pd.read_csv(os.path.join(caminho_dados, '01_dim_turmas.csv'))
  df_subturmas = pd.read_csv(
      os.path.join(caminho_dados, '02_dim_subturmas.csv')
  )
  df_ambientes = pd.read_csv(
      os.path.join(caminho_dados, '03_dim_ambientes.csv')
  )
  df_docentes = pd.read_csv(os.path.join(caminho_dados, '04_dim_docentes.csv'))
  df_matriz = pd.read_csv(
      os.path.join(caminho_dados, '06_matriz_ucs_ambientes.csv')
  )

  dias_semana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  turnos_regulares = ['Manhã', 'Tarde']

  # 1. Filtro dos docentes regulares com limite de carga horária e turnos permitidos
  df_doc_reg = df_docentes[
      df_docentes['Elegivel_Cursos_Regulares'] == 'SIM'
  ].copy()
  docentes_data = []
  for _, r in df_doc_reg.iterrows():
    t_reg = str(r['Turnos_Atuacao_Regular']).strip()
    jornada = int(r.get('Jornada_Semanal_Horas', 40))
    if 'apenas tarde' in t_reg.lower() or t_reg.lower() == 'tarde':
      turnos_p = ['Tarde']
      jornada = 20
    else:
      turnos_p = ['Manhã', 'Tarde']
      jornada = 40

    docentes_data.append({
        'nome': r['Nome_Curto'],
        'turnos_permitidos': turnos_p,
        'jornada_max_aulas': jornada // 4,
    })

  doc_names = [d['nome'] for d in docentes_data]
  ambientes_data = df_ambientes.to_dict('records')

  # 2. Mapeamento de UCs por turma
  ucs_por_turma = {}
  for _, r in df_turmas.iterrows():
    t_id = r['ID_Turma']
    c_nome = mapear_curso(r['Curso'])
    termo = str(r['Termo']).strip()[:2]
    sub_ucs = df_matriz[
        (df_matriz['Curso'] == c_nome)
        & (df_matriz['Termo_Semestre'].str.startswith(termo))
    ].copy()

    lista_ucs = []
    for _, u in sub_ucs.iterrows():
      ambs = [
          a.strip()
          for a in str(u['Ambientes_Homologados']).split('/')
          if a.strip()
      ]
      docs = [
          d.strip()
          for d in str(u['Docentes_Habilitados']).split('/')
          if d.strip() in doc_names
      ]
      lista_ucs.append({
          'nome': u['Unidade_Curricular'],
          'ch': int(u['Carga_Horaria_UC']),
          'ambientes': ambs,
          'docentes': docs,
      })
    ucs_por_turma[t_id] = lista_ucs

  # 3. Estruturação dos slots ativos por subturma
  subturmas = []
  for _, s in df_subturmas.iterrows():
    t_id = s['ID_Turma_Base']
    dias = parse_dias_lista(s['Dias_Semana'])
    turno = s['Turno']
    shifts = ['Manhã', 'Tarde'] if turno == 'Integral' else [turno]
    slots = [(d, sh) for d in dias for sh in shifts]

    ucs_list = ucs_por_turma.get(t_id, [])
    fila = list(ucs_list)
    if s['Subturma'] == 'B' and len(fila) > 1:
      fila = fila[1:] + fila[:1]

    mapa_uc = {}
    for idx, slot in enumerate(slots):
      mapa_uc[slot] = fila[idx % len(fila)]

    subturmas.append({
        'sub_id': s['ID_Subturma'],
        'turma_id': t_id,
        'curso': s['Curso'],
        'alunos': int(s['Alunos']),
        'turno': turno,
        'slots': slots,
        'mapa_uc': mapa_uc,
    })

  # 4. Criação do Modelo OR-Tools
  model = cp_model.CpModel()
  x_amb = {}
  x_doc = {}

  for i, s in enumerate(subturmas):
    for slot in s['slots']:
      d, sh = slot
      uc_info = s['mapa_uc'][slot]
      amb_validos = uc_info['ambientes']
      doc_validos = uc_info['docentes']

      for e_idx, env in enumerate(ambientes_data):
        if env['Nome_Ambiente'] in amb_validos and env['Capacidade_Postos'] >= s[
            'alunos'
        ]:
          x_amb[(i, d, sh, e_idx)] = model.NewBoolVar(
              f'amb_{i}_{d}_{sh}_{e_idx}'
          )

      for p_idx, prof in enumerate(docentes_data):
        # TRAVA RÍGIDA: só aloca se o turno pertencer aos turnos permitidos do docente
        if sh in prof['turnos_permitidos'] and (
            not doc_validos or prof['nome'] in doc_validos
        ):
          x_doc[(i, d, sh, p_idx)] = model.NewBoolVar(
              f'doc_{i}_{d}_{sh}_{p_idx}'
          )

  # Restrição 1: Cobertura total de ambiente e docente
  for i, s in enumerate(subturmas):
    for slot in s['slots']:
      d, sh = slot
      v_amb = [
          x_amb[(i, d, sh, e_idx)]
          for e_idx in range(len(ambientes_data))
          if (i, d, sh, e_idx) in x_amb
      ]
      model.Add(sum(v_amb) == 1)

      v_doc = [
          x_doc[(i, d, sh, p_idx)]
          for p_idx in range(len(docentes_data))
          if (i, d, sh, p_idx) in x_doc
      ]
      model.Add(sum(v_doc) == 1)

  # Restrição 2: Unicidade de Sala
  for d in dias_semana:
    for sh in turnos_regulares:
      for e_idx in range(len(ambientes_data)):
        ocup = [
            x_amb[(i, d, sh, e_idx)]
            for i in range(len(subturmas))
            if (i, d, sh, e_idx) in x_amb
        ]
        if ocup:
          model.Add(sum(ocup) <= 1)

  # Restrição 3: Unicidade Docente e Limite Contratual (20h vs 40h)
  trab = {}
  for p_idx, prof in enumerate(docentes_data):
    for d in dias_semana:
      for sh in turnos_regulares:
        trab[(p_idx, d, sh)] = model.NewBoolVar(f'trab_{p_idx}_{d}_{sh}')
        aulas = [
            x_doc[(i, d, sh, p_idx)]
            for i in range(len(subturmas))
            if (i, d, sh, p_idx) in x_doc
        ]
        if aulas:
          model.Add(sum(aulas) == trab[(p_idx, d, sh)])
        else:
          model.Add(trab[(p_idx, d, sh)] == 0)

      model.Add(trab[(p_idx, d, 'Manhã')] + trab[(p_idx, d, 'Tarde')] <= 2)

    # Limite contratual: Trevelim = máx 5 aulas (20h); Demais = máx 10 aulas (40h)
    turnos_semana = [
        trab[(p_idx, d, sh)] for d in dias_semana for sh in turnos_regulares
    ]
    model.Add(sum(turnos_semana) <= prof['jornada_max_aulas'])

  # Função Objetivo: Preferência suave vespertina e aderência ao ambiente prioritário
  obj = []
  for (i, d, sh, p_idx), var in x_doc.items():
    peso = 25 if sh == 'Tarde' else 15
    obj.append(peso * var)

  for (i, d, sh, e_idx), var in x_amb.items():
    env_nome = ambientes_data[e_idx]['Nome_Ambiente']
    uc_info = subturmas[i]['mapa_uc'][(d, sh)]
    peso_amb = (
        30
        if (uc_info['ambientes'] and env_nome == uc_info['ambientes'][0])
        else 15
    )
    obj.append(peso_amb * var)

  model.Maximize(sum(obj))

  solver = cp_model.CpSolver()
  solver.parameters.max_time_in_seconds = 20.0
  status = solver.Solve(model)

  if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
    resultado = []
    for i, s in enumerate(subturmas):
      for slot in s['slots']:
        d, sh = slot
        uc_info = s['mapa_uc'][slot]
        amb_alocado = next(
            ambientes_data[e_idx]['Nome_Ambiente']
            for e_idx in range(len(ambientes_data))
            if (i, d, sh, e_idx) in x_amb
            and solver.Value(x_amb[(i, d, sh, e_idx)]) == 1
        )
        doc_alocado = next(
            docentes_data[p_idx]['nome']
            for p_idx in range(len(docentes_data))
            if (i, d, sh, p_idx) in x_doc
            and solver.Value(x_doc[(i, d, sh, p_idx)]) == 1
        )
        resultado.append({
            'Dia': d,
            'Turno': sh,
            'Turma': s['turma_id'],
            'Subturma': s['sub_id'],
            'Curso': s['curso'],
            'UC': uc_info['nome'],
            'Carga_Horaria_UC': uc_info['ch'],
            'Ambiente': amb_alocado,
            'Docente': doc_alocado,
        })
    df_res = pd.DataFrame(resultado)
    ordem_dias = {
        'Segunda': 1,
        'Terça': 2,
        'Quarta': 3,
        'Quinta': 4,
        'Sexta': 5,
    }
    ordem_turnos = {'Manhã': 1, 'Tarde': 2}
    df_res['d_num'] = df_res['Dia'].map(ordem_dias)
    df_res['s_num'] = df_res['Turno'].map(ordem_turnos)
    return df_res.sort_values(by=['d_num', 's_num', 'Turma', 'Subturma']).drop(
        columns=['d_num', 's_num']
    )
  return None


if __name__ == '__main__':
  df_resultado = executar_otimizacao('.')
  if df_resultado is not None:
    print(f'Sucesso! {len(df_resultado)} sessões alocadas.')
    df_resultado.to_csv(
        '06_fato_ensalamento_semanal.csv', index=False, encoding='utf-8-sig'
    )