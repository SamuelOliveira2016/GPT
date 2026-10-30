import csv
import json

def clean_key(k):
    return k.strip().replace('\ufeff', '')

def load_csv(path):
    with open(path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        return [{clean_key(k): v.strip() for k, v in row.items()} for row in reader]

turmas = load_csv('src/data/raw/01_dim_turmas.csv')
subturmas = load_csv('src/data/raw/02_dim_subturmas.csv')
ambientes = load_csv('src/data/raw/03_dim_ambientes.csv')
docentes = load_csv('src/data/raw/04_dim_docentes.csv')
calendario = load_csv('src/data/raw/05_dim_calendario_2027.csv')
ucs = load_csv('src/data/raw/06_matriz_ucs_ambientes.csv')
bens = load_csv('src/data/raw/07_bens_patrimoniais_ambientes.csv')
aptidoes = load_csv('src/data/raw/08_aptidao_docente_por_uc.csv')

docentes_lookup = {}
for d in docentes:
    docentes_lookup[d['Nome_Curto'].upper()] = d

ambientes_lookup = {}
for a in ambientes:
    ambientes_lookup[a['Nome_Ambiente'].lower().strip()] = a

# Group aptidoes by docente
apt_by_doc = {}
for r in aptidoes:
    did = r['ID_Docente']
    uc_name = r['Unidade_Curricular']
    if did not in apt_by_doc:
        apt_by_doc[did] = []
    if uc_name not in apt_by_doc[did]:
        apt_by_doc[did].append(uc_name)

# If any docente is not in apt_by_doc, find their UCs from 06_matriz_ucs_ambientes
for d in docentes:
    did = d['ID_Docente']
    curto = d['Nome_Curto'].lower()
    if did not in apt_by_doc or len(apt_by_doc[did]) == 0:
        found_ucs = []
        for u in ucs:
            habs = [h.strip().lower() for h in u['Docentes_Habilitados'].split('/') if h.strip()]
            if any(curto in h or h in curto for h in habs):
                found_ucs.append(u['Unidade_Curricular'])
        apt_by_doc[did] = found_ucs

bens_by_ambiente = {}
for b in bens:
    cod = b['Cod_Localiz']
    if cod not in bens_by_ambiente:
        bens_by_ambiente[cod] = []
    bens_by_ambiente[cod].append({
        'denominacao': b['Denominacao_Bem'],
        'quantidade': int(b['Quantidade_Total']) if b['Quantidade_Total'].isdigit() else 1
    })

def get_matching_ucs(curso_raw, termo):
    clean_c = curso_raw.replace(' (CAI)', '').replace(' (CAI) ', '').strip()
    res = []
    for u in ucs:
        u_curso_clean = u['Curso'].replace(' (CAI)', '').replace(' (CAI) ', '').replace('Máq.', 'Máquinas').replace('Veíc.', 'Veículos').strip()
        if (clean_c.lower() in u_curso_clean.lower() or u_curso_clean.lower() in clean_c.lower()) and termo in u['Termo_Semestre']:
            res.append(u)
    return res

def get_ambiente_obj(ambiente_nome):
    amb_name_clean = ambiente_nome.split('/')[0].strip().lower()
    for k, v in ambientes_lookup.items():
        if amb_name_clean in k or k in amb_name_clean:
            return v
    return ambientes[0]

alocacoes = []
aloc_id_counter = 1
dias_semana_full = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

occupied_rooms = set()
occupied_docs = set()

for st in subturmas:
    id_sub = st['ID_Subturma']
    id_turma = st['ID_Turma_Base']
    curso = st['Curso']
    sub_label = st['Subturma']
    alunos = int(st['Alunos'])
    turno = st['Turno']
    dias_str = st['Dias_Semana']
    
    active_days = []
    if dias_str == 'Segunda a Sexta':
        active_days = dias_semana_full
    elif 'Segunda e Terça' in dias_str:
        active_days = ['Segunda', 'Terça']
    elif 'Quinta e Sexta' in dias_str:
        active_days = ['Quinta', 'Sexta']
    elif 'Quarta e Quinta' in dias_str:
        active_days = ['Quarta', 'Quinta']
    elif 'Terça e Quarta' in dias_str:
        active_days = ['Terça', 'Quarta']
    else:
        active_days = ['Segunda', 'Terça']

    turma_info = next((t for t in turmas if t['ID_Turma'] == id_turma), None)
    termo = turma_info['Termo'] if turma_info else '1º'
    
    doc_refs = []
    if turma_info:
        for r in [turma_info['Docente_Ref_1'], turma_info['Docente_Ref_2'], turma_info['Docente_Ref_3']]:
            if r and r.strip() and r.strip() != 'À Contratar':
                doc_refs.append(r.strip())
    
    course_ucs = get_matching_ucs(curso, termo)
    if not course_ucs:
        for u in ucs:
            if curso.lower() in u['Curso'].lower():
                course_ucs.append(u)
    if not course_ucs:
        course_ucs = [ucs[0]]

    sub_index = 0 if ('A' in sub_label or 'Única' in sub_label) else 1
    shifts_to_run = ['Manhã', 'Tarde'] if turno == 'Integral' else [turno]

    for day_idx, dia in enumerate(active_days):
        for shift_idx, s_turno in enumerate(shifts_to_run):
            uc_idx = (day_idx + shift_idx + sub_index) % len(course_ucs)
            target_uc = course_ucs[uc_idx]
            
            homologados = [h.strip() for h in target_uc['Ambientes_Homologados'].split('/') if h.strip()]
            
            chosen_room_obj = None
            candidate_room_names = homologados if homologados else [target_uc['Ambiente_Prioritario']]
            if sub_index == 1 and len(candidate_room_names) > 1:
                candidate_room_names = candidate_room_names[1:] + [candidate_room_names[0]]
            
            for rname in candidate_room_names:
                robj = get_ambiente_obj(rname)
                if (dia, s_turno, robj['Cod_Localiz']) not in occupied_rooms:
                    chosen_room_obj = robj
                    break
            if not chosen_room_obj:
                chosen_room_obj = get_ambiente_obj(candidate_room_names[0])
            
            occupied_rooms.add((dia, s_turno, chosen_room_obj['Cod_Localiz']))

            habilitados = [dh.strip() for dh in target_uc['Docentes_Habilitados'].split('/') if dh.strip()]
            chosen_doc_obj = None
            
            for dref in doc_refs:
                for d in docentes:
                    if dref.lower() in d['Nome_Curto'].lower() or d['Nome_Curto'].lower() in dref.lower():
                        if (dia, s_turno, d['ID_Docente']) not in occupied_docs:
                            chosen_doc_obj = d
                            break
                if chosen_doc_obj:
                    break
            
            if not chosen_doc_obj and habilitados:
                for hname in habilitados:
                    for d in docentes:
                        if hname.lower() in d['Nome_Curto'].lower() or d['Nome_Curto'].lower() in hname.lower():
                            if (dia, s_turno, d['ID_Docente']) not in occupied_docs:
                                chosen_doc_obj = d
                                break
                    if chosen_doc_obj:
                        break
            
            if not chosen_doc_obj:
                for d in docentes:
                    if d['Elegivel_Cursos_Regulares'] == 'SIM' and (dia, s_turno, d['ID_Docente']) not in occupied_docs:
                        chosen_doc_obj = d
                        break
            if not chosen_doc_obj:
                chosen_doc_obj = docentes[3]
            
            occupied_docs.add((dia, s_turno, chosen_doc_obj['ID_Docente']))

            horario = '07:30 - 11:30' if s_turno == 'Manhã' else ('13:00 - 17:00' if s_turno == 'Tarde' else '18:30 - 22:30')
            
            aloc = {
                'id': f'ALOC-{aloc_id_counter:04d}',
                'idTurma': id_turma,
                'idSubturma': id_sub,
                'curso': curso,
                'termo': termo,
                'turno': s_turno,
                'horario': horario,
                'diaSemana': dia,
                'diaSemanaNum': dias_semana_full.index(dia) + 1,
                'uc': target_uc['Unidade_Curricular'],
                'cargaHorariaUC': int(target_uc['Carga_Horaria_UC']),
                'ambienteId': chosen_room_obj['Cod_Localiz'],
                'ambienteNome': chosen_room_obj['Nome_Ambiente'],
                'bloco': chosen_room_obj['Bloco'],
                'capacidadeAmbiente': int(chosen_room_obj['Capacidade_Postos']),
                'alunos': alunos,
                'docenteId': chosen_doc_obj['ID_Docente'],
                'docenteNome': chosen_doc_obj['Nome_Curto'],
                'docenteNomeCompleto': chosen_doc_obj['Nome_Completo'],
                'docenteNif': chosen_doc_obj['NIF'],
                'pesoAfinidade': 30,
                'observacoes': f'Turma {id_turma} | Subturma {sub_label}'
            }
            alocacoes.append(aloc)
            aloc_id_counter += 1

# Format json objects
json_turmas = json.dumps([{**t, 'Matriculas': int(t['Matriculas']), 'Qtd_Subturmas': int(t['Qtd_Subturmas']), 'Horas_Computaveis_2027': int(t['Horas_Computaveis_2027']) if t.get('Horas_Computaveis_2027') else None} for t in turmas], ensure_ascii=False, indent=2)
json_subturmas = json.dumps([{**st, 'Alunos': int(st['Alunos']), 'Ambientes_Necessarios': int(st['Ambientes_Necessarios'])} for st in subturmas], ensure_ascii=False, indent=2)
json_ambientes = json.dumps([{**a, 'Capacidade_Postos': int(a['Capacidade_Postos'])} for a in ambientes], ensure_ascii=False, indent=2)
json_docentes = json.dumps([{
    **d,
    'Qtd_UCs_Habilitadas': len(apt_by_doc.get(d['ID_Docente'], [])),
    'ucsHabilitadas': apt_by_doc.get(d['ID_Docente'], [])
} for d in docentes], ensure_ascii=False, indent=2)

json_calendario = json.dumps([{**c, 'Numero_Dia_Letivo': float(c['Numero_Dia_Letivo']) if c['Numero_Dia_Letivo'] else None} for c in calendario], ensure_ascii=False, indent=2)
json_ucs = json.dumps([{
    **u,
    'Carga_Horaria_UC': int(u['Carga_Horaria_UC']),
    'Ambientes_Homologados': [x.strip() for x in u['Ambientes_Homologados'].split('/') if x.strip()],
    'Docentes_Habilitados': [x.strip() for x in u['Docentes_Habilitados'].split('/') if x.strip()]
} for u in ucs], ensure_ascii=False, indent=2)
json_bens = json.dumps(bens_by_ambiente, ensure_ascii=False, indent=2)
json_alocacoes = json.dumps(alocacoes, ensure_ascii=False, indent=2)

ts_content = f"""/**
 * SENAI CFP 901 Araçatuba - Base de Dados Acadêmica Integrada 2027
 * Gerado automaticamente a partir das dimensões oficiais do backend SENAI Araçatuba.
 */

export const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] as const;
export const TURNOS = ['Manhã', 'Tarde'] as const;

export interface Turma {{
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
}}

export interface Subturma {{
  ID_Subturma: string;
  ID_Turma_Base: string;
  Curso: string;
  Subturma: string;
  Alunos: number;
  Turno: 'Manhã' | 'Tarde' | 'Integral';
  Dias_Semana: string;
  Ambientes_Necessarios: number;
}}

export interface Ambiente {{
  Cod_Localiz: string;
  Nome_Ambiente: string;
  Bloco: string;
  Capacidade_Postos: number;
  Area_Tecnologica: string;
  Equipamentos_Chave: string;
}}

export interface Docente {{
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
}}

export interface DiaCalendario {{
  Data: string;
  Dia_Semana: string;
  Mes: string;
  Dia_Letivo: 'SIM' | 'NÃO';
  Numero_Dia_Letivo: number | null;
  Status_Evento: string;
  Compensacao_Associada: string;
}}

export interface MatrizUC {{
  Curso: string;
  Termo_Semestre: string;
  Unidade_Curricular: string;
  Carga_Horaria_UC: number;
  Ambiente_Prioritario: string;
  Ambientes_Homologados: string[];
  Docentes_Habilitados: string[];
}}

export interface BemPatrimonial {{
  denominacao: string;
  quantidade: number;
}}

export interface AlocacaoAula {{
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
}}

export const SENAI_TURMAS: Turma[] = {json_turmas};

export const SENAI_SUBTURMAS: Subturma[] = {json_subturmas};

export const SENAI_AMBIENTES: Ambiente[] = {json_ambientes};

export const SENAI_DOCENTES: Docente[] = {json_docentes};

export const SENAI_CALENDARIO: DiaCalendario[] = {json_calendario};

export const SENAI_UCS: MatrizUC[] = {json_ucs};

export const SENAI_BENS_BY_AMBIENTE: Record<string, BemPatrimonial[]> = {json_bens};

export const INITIAL_ALOCACOES: AlocacaoAula[] = {json_alocacoes};
"""

with open('src/data/senaiData.ts', 'w', encoding='utf-8') as out_f:
    out_f.write(ts_content)

print('Successfully regenerated src/data/senaiData.ts with ucsHabilitadas')
