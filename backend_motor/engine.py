"""Distribuição REAL de UCs, docentes e ambientes por data/turno.

O módulo de preparação/validação não requer OR-Tools; a instalação é obrigatória
para solve(). A grade usa blocos de 4h, configurados por turno, sem inventar os
horários de início/término que não constam na base.
"""
from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date, timedelta
from hashlib import sha256
from pathlib import Path
from typing import Any
import csv
import unicodedata

BLOCK_HOURS = 4
WEEKDAYS = {"Segunda": 0, "Terça": 1, "Quarta": 2, "Quinta": 3, "Sexta": 4}
COURSE_ALIASES = {
    "Eletricista de Manutenção Eletroeletrônica": "Eletricista de Manutenção Eletroeletrônica (CAI)",
    "Mecânico de Usinagem": "Mecânico de Usinagem (CAI)",
    "Mecânico de Máquinas Agrícolas e Veículos Pesados": "Mecânico de Máq. Agrícolas e Veíc. Pesados (CAI)",
}


def _read_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        raise ValueError(f"Arquivo de dados não encontrado: {path.name}")
    with path.open(encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def _norm(value: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", value.upper().strip()) if unicodedata.category(c) != "Mn")


def _uc_id(course: str, term: str, name: str) -> str:
    """ID reproduzível para intercâmbio; migrar a ID persistente ao importar base oficial."""
    key = "|".join([course, term, name]).encode("utf-8")
    return "UC-" + sha256(key).hexdigest()[:16].upper()


def _days(expr: str) -> set[int]:
    expr = expr.strip()
    if expr == "Segunda a Sexta":
        return set(range(5))
    parts = [x.strip() for x in expr.split(" e ")]
    if not parts or any(x not in WEEKDAYS for x in parts):
        raise ValueError(f"Dias da semana não reconhecidos: {expr!r}")
    return {WEEKDAYS[x] for x in parts}


def _periods(shift: str) -> tuple[str, ...]:
    return {"Manhã": ("Manhã",), "Tarde": ("Tarde",), "Integral": ("Manhã", "Tarde")}[shift]


def parse_rooms(value: str, official_rooms: list[str]) -> list[str]:
    """Lê a lista separada por ' / ' sem quebrar nomes oficiais com barras."""
    official = sorted(set(official_rooms), key=len, reverse=True)
    memo: dict[str, list[tuple[str, ...]]] = {}

    def variants(text: str) -> list[tuple[str, ...]]:
        if text in memo:
            return memo[text]
        if not text:
            return [()]
        result = []
        for room in official:
            if text == room:
                result.append((room,))
            elif text.startswith(room + " / "):
                result.extend([(room,) + other for other in variants(text[len(room) + 3:])])
        memo[text] = result[:2]
        return memo[text]

    matches = variants(value.strip())
    if len(matches) != 1:
        raise ValueError(f"Ambientes homologados ambíguos/não cadastrados: {value}")
    return list(matches[0])


@dataclass(frozen=True)
class Slot:
    subturma_id: str
    day: str
    shift: str


class Catalog:
    def __init__(self, folder: str | Path):
        folder = Path(folder)
        self.groups = {r["ID_Turma"]: r for r in _read_csv(folder / "01_dim_turmas.csv")}
        self.subgroups = {r["ID_Subturma"]: r for r in _read_csv(folder / "02_dim_subturmas.csv")}
        self.rooms = {r["Cod_Localiz"]: r for r in _read_csv(folder / "03_dim_ambientes.csv")}
        self.teachers = {r["ID_Docente"]: r for r in _read_csv(folder / "04_dim_docentes.csv")}
        self.calendar = {r["Data"]: r for r in _read_csv(folder / "05_dim_calendario_2027.csv")}
        self.uc_rows = _read_csv(folder / "06_matriz_ucs_ambientes.csv")
        self.affinity_rows = _read_csv(folder / "08_aptidao_docente_por_uc.csv")
        self.room_by_name = {r["Nome_Ambiente"]: id_ for id_, r in self.rooms.items()}
        if len(self.room_by_name) != len(self.rooms):
            raise ValueError("Nomes de ambientes duplicados; homologação exige IDs inequívocos")
        self.ucs: dict[str, dict[str, Any]] = {}
        self.ucs_by_class: dict[tuple[str, str], list[str]] = defaultdict(list)
        for row in self.uc_rows:
            course = row["Curso"]
            term = row["Termo_Semestre"]
            key = _uc_id(course, term, row["Unidade_Curricular"])
            if key in self.ucs:
                raise ValueError(f"UC duplicada na matriz: {course}/{term}/{row['Unidade_Curricular']}")
            names = parse_rooms(row["Ambientes_Homologados"], list(self.room_by_name))
            if row["Ambiente_Prioritario"] not in names:
                raise ValueError(f"Ambiente prioritário não homologado para {row['Unidade_Curricular']}")
            self.ucs[key] = {
                "id": key,
                "nome": row["Unidade_Curricular"],
                "curso": course,
                "termo": term,
                "horas": int(row["Carga_Horaria_UC"]),
                "ambientes": [self.room_by_name[n] for n in names],
                "preferido": self.room_by_name[row["Ambiente_Prioritario"]],
                "habilitados_matriz": {_norm(n) for n in row["Docentes_Habilitados"].split(" / ")},
            }
            self.ucs_by_class[(course, term)].append(key)
        self.affinity: dict[tuple[str, str], int] = {}
        for row in self.affinity_rows:
            uid = _uc_id(row["Curso"], row["Termo_Semestre"], row["Unidade_Curricular"])
            teacher_id = row["ID_Docente"]
            if teacher_id not in self.teachers or uid not in self.ucs:
                raise ValueError(f"Referência de afinidade inválida: {teacher_id}, {uid}")
            teacher = self.teachers[teacher_id]
            if _norm(teacher["Nome_Curto"]) not in self.ucs[uid]["habilitados_matriz"]:
                continue  # Requer confirmação nas duas matrizes oficiais.
            self.affinity[(uid, teacher_id)] = int(row["Peso_Afinidade_Motor"])
        self.min_date = min(self.calendar)
        self.max_date = max(self.calendar)

    def summary(self) -> dict[str, Any]:
        return {
            "turmas": len(self.groups), "subturmas": len(self.subgroups),
            "docentes": len(self.teachers), "ambientes": len(self.rooms),
            "ucs": len(self.ucs), "primeira_data": self.min_date,
            "ultima_data": self.max_date,
        }

    def class_ucs(self, subgroup_id: str) -> list[str]:
        s = self.subgroups[subgroup_id]
        t = self.groups[s["ID_Turma_Base"]]
        course = COURSE_ALIASES.get(t["Curso"], t["Curso"])
        term = t["Termo"].replace("º", "º ") + ("Termo" if "(CAI)" in course else "Semestre")
        return self.ucs_by_class.get((course, term), [])

    def authorized_teachers(self, uc_id: str, shift: str) -> dict[str, int]:
        result = {}
        for (uid, teacher_id), weight in self.affinity.items():
            if uid != uc_id:
                continue
            teacher = self.teachers[teacher_id]
            if _norm(teacher["Elegivel_Cursos_Regulares"]) != "SIM":
                continue
            allowed_shifts = [s.strip() for s in teacher["Turnos_Atuacao_Regular"].split(",")]
            if shift in allowed_shifts:
                result[teacher_id] = weight
        return result


def _set_of_blocked(items: list[dict[str, str]], key: str) -> set[tuple[str, str, str]]:
    return {(str(r.get(key, "")), str(r.get("data", "")), str(r.get("turno", ""))) for r in items if r.get(key)}


def prepare(catalog: Catalog, request: dict[str, Any]) -> dict[str, Any]:
    """Preflight que bloqueia execução com dados incompletos e reporta por UC."""
    errors: list[str] = []
    warnings: list[str] = []
    start = date.fromisoformat(request["inicio"])
    end = date.fromisoformat(request["fim"])
    if end < start:
        raise ValueError("Fim anterior ao início")
    if (end - start).days > 370:
        raise ValueError("Limite de horizonte: 370 dias")
    if start.isoformat() < catalog.min_date or end.isoformat() > catalog.max_date:
        errors.append(f"Calendário disponível apenas entre {catalog.min_date} e {catalog.max_date}; não inventar dias letivos.")
    ids = request.get("subturmas") or []
    if not ids:
        errors.append("Selecione ao menos uma subturma; a implantação completa exige selecionar todas.")
    if len(ids) != len(set(ids)):
        errors.append("Subturma repetida na seleção")
    remaining = request.get("horas_restantes", {})
    blocked_teachers = _set_of_blocked(request.get("indisponibilidades_docentes", []), "docente_id")
    blocked_rooms = _set_of_blocked(request.get("indisponibilidades_ambientes", []), "ambiente_id")
    external_teachers = _set_of_blocked(request.get("reservas_externas", []), "docente_id")
    external_rooms = _set_of_blocked(request.get("reservas_externas", []), "ambiente_id")
    if not request.get("indisponibilidades_docentes"):
        warnings.append("Indisponibilidades específicas dos docentes não informadas: somente turno regular foi considerado.")
    if not request.get("limites_semanais_docentes"):
        warnings.append("Limites de carga docente não informados: nenhuma jornada semanal contratual será presumida.")
    if len(ids) < len(catalog.subgroups) and not request.get("reservas_externas"):
        warnings.append("Planejamento parcial: outras turmas não estão representadas por reservas externas; não assumir ausência de conflitos com elas.")
    if request.get("modo_demonstracao", False):
        warnings.append("Resultado de demonstração, não é uma grade homologada.")

    slots: list[Slot] = []
    targets: dict[tuple[str, str], int] = {}
    blocked_all_teachers = blocked_teachers | external_teachers
    blocked_all_rooms = blocked_rooms | external_rooms
    for sid in ids:
        if sid not in catalog.subgroups:
            errors.append(f"Subturma inexistente: {sid}")
            continue
        s = catalog.subgroups[sid]
        t = catalog.groups.get(s["ID_Turma_Base"])
        if not t:
            errors.append(f"Turma-base ausente: {sid}")
            continue
        ucs = catalog.class_ucs(sid)
        if not ucs:
            errors.append(f"Sem UCs para turma {sid}: revisar correspondência curso/termo")
            continue
        if t["Inicio"] < request["inicio"] and sid not in remaining:
            errors.append(f"{sid}: turma iniciada antes do recorte; informe horas_restantes por UC, inclusive zero.")
            continue
        registered_days = _days(s["Dias_Semana"])
        periods = _periods(s["Turno"])
        class_start = max(start, date.fromisoformat(t["Inicio"]))
        class_end = min(end, date.fromisoformat(t["Termino"]))
        own_slots = []
        if class_end >= class_start:
            current = class_start
            while current <= class_end:
                if current.weekday() in registered_days:
                    cal = catalog.calendar.get(current.isoformat())
                    if cal is None:
                        errors.append(f"Calendário sem informação para {current.isoformat()} ({sid})")
                    elif cal["Dia_Letivo"] == "SIM":
                        own_slots.extend(Slot(sid, current.isoformat(), shift) for shift in periods)
                current += timedelta(days=1)
        slots.extend(own_slots)
        total_hours = 0
        for uid in ucs:
            uc = catalog.ucs[uid]
            hours = uc["horas"]
            if sid in remaining:
                if uid not in remaining[sid]:
                    errors.append(f"{sid}: informe saldo de {uc['nome']} ({uid}); não adivinhar horas restantes.")
                    continue
                hours = int(remaining[sid][uid])
            if hours < 0 or hours > uc["horas"] or hours % BLOCK_HOURS:
                errors.append(f"Saldo inválido de {sid}/{uc['nome']}: {hours}h (bloco de {BLOCK_HOURS}h)")
                continue
            targets[(sid, uid)] = hours // BLOCK_HOURS
            total_hours += hours
            if hours == 0:
                continue
            eligible_days = 0
            for slot in own_slots:
                has_teacher = any(
                    (doc, slot.day, slot.shift) not in blocked_all_teachers
                    for doc in catalog.authorized_teachers(uid, slot.shift)
                )
                has_room = any(
                    int(catalog.rooms[rid]["Capacidade_Postos"]) >= int(s["Alunos"])
                    and (rid, slot.day, slot.shift) not in blocked_all_rooms
                    for rid in uc["ambientes"]
                )
                if has_teacher and has_room:
                    eligible_days += 1
            if eligible_days < hours // BLOCK_HOURS:
                errors.append(f"{sid}/{uc['nome']}: demanda {hours // BLOCK_HOURS} blocos, apenas {eligible_days} horários com docente e ambiente elegíveis.")
        if total_hours > len(own_slots) * BLOCK_HOURS:
            errors.append(f"{sid}: demanda {total_hours}h excede {len(own_slots)*BLOCK_HOURS}h disponíveis no período.")
    for fixed in request.get("alocacoes_fixas", []):
        slot = Slot(fixed["subturma_id"], fixed["data"], fixed["turno"])
        if slot not in slots:
            errors.append(f"Alocação fixa fora da grade: {fixed}")
            continue
        uid, tid, rid = fixed["uc_id"], fixed["docente_id"], fixed["ambiente_id"]
        if (slot.subturma_id, uid) not in targets or targets[(slot.subturma_id, uid)] == 0:
            errors.append(f"Alocação fixa para UC sem saldo: {fixed}")
            continue
        if tid not in catalog.authorized_teachers(uid, slot.shift) or (tid, slot.day, slot.shift) in blocked_all_teachers:
            errors.append(f"Docente da alocação fixa não elegível/disponível: {fixed}")
        if rid not in catalog.ucs[uid]["ambientes"] or int(catalog.rooms[rid]["Capacidade_Postos"]) < int(catalog.subgroups[slot.subturma_id]["Alunos"]) or (rid, slot.day, slot.shift) in blocked_all_rooms:
            errors.append(f"Ambiente da alocação fixa não homologado/disponível ou sem capacidade: {fixed}")
    return {
        "valido": not errors, "erros": list(dict.fromkeys(errors)), "avisos": list(dict.fromkeys(warnings)),
        "subturmas": len(ids), "blocos_disponiveis": len(slots),
        "blocos_necessarios": sum(targets.values()),
        "ucs": [{"subturma_id": sid, "uc_id": uid, "nome": catalog.ucs[uid]["nome"],
                  "horas_previstas": BLOCK_HOURS * count}
                 for (sid, uid), count in targets.items()],
        "_slots": slots, "_targets": targets,
    }


def validate_assignments(catalog: Catalog, request: dict[str, Any], assignments: list[dict[str, Any]]) -> list[str]:
    """Verificador independente, inclusive para resultados de outros motores."""
    pre = prepare(catalog, request)
    if not pre["valido"]:
        return pre["erros"]
    errors = []
    all_slots = set(pre["_slots"])
    counts: Counter[tuple[str, str]] = Counter()
    occupied_sub = set()
    occupied_teacher = set()
    occupied_room = set()
    blocked_teacher = _set_of_blocked(request.get("indisponibilidades_docentes", []) + request.get("reservas_externas", []), "docente_id")
    blocked_room = _set_of_blocked(request.get("indisponibilidades_ambientes", []) + request.get("reservas_externas", []), "ambiente_id")
    teacher_week: Counter[tuple[str, int, int]] = Counter()
    for a in assignments:
        sid, uid, tid, rid, day, shift = (a[k] for k in ("subturma_id", "uc_id", "docente_id", "ambiente_id", "data", "turno"))
        slot = Slot(sid, day, shift)
        if slot not in all_slots:
            errors.append(f"Fora da grade: {slot}")
            continue
        if (sid, uid) not in pre["_targets"]:
            errors.append(f"UC não pertence à turma: {sid}/{uid}")
            continue
        for key, registry, label in [
            ((sid, day, shift), occupied_sub, "subturma"),
            ((tid, day, shift), occupied_teacher, "docente"),
            ((rid, day, shift), occupied_room, "ambiente")
        ]:
            if key in registry:
                errors.append(f"Choque de {label} em {day}/{shift}: {key[0]}")
            registry.add(key)
        if tid not in catalog.authorized_teachers(uid, shift) or (tid, day, shift) in blocked_teacher:
            errors.append(f"Docente inválido/indisponível: {tid} {uid} {day}/{shift}")
        uc = catalog.ucs[uid]
        if rid not in uc["ambientes"] or (rid, day, shift) in blocked_room:
            errors.append(f"Ambiente inválido/indisponível: {rid} {uid} {day}/{shift}")
        if rid in catalog.rooms and int(catalog.rooms[rid]["Capacidade_Postos"]) < int(catalog.subgroups[sid]["Alunos"]):
            errors.append(f"Ambiente sem capacidade: {rid} {sid}")
        counts[(sid, uid)] += 1
        iso = date.fromisoformat(day).isocalendar()
        teacher_week[(tid, iso.year, iso.week)] += 1
    for key, blocks in pre["_targets"].items():
        if counts[key] != blocks:
            errors.append(f"CH incorreta {key}: prevista {blocks*BLOCK_HOURS}h; encontrada {counts[key]*BLOCK_HOURS}h")
    for tid, limit in request.get("limites_semanais_docentes", {}).items():
        if limit < 0 or limit % BLOCK_HOURS:
            errors.append(f"Limite semanal inválido para {tid}: {limit}h")
            continue
        for (actual_tid, year, week), blocks in teacher_week.items():
            if tid == actual_tid and blocks * BLOCK_HOURS > limit:
                errors.append(f"Carga semanal acima do limite: {tid} {year}-W{week}: {blocks*BLOCK_HOURS}h > {limit}h")
    for fixed in request.get("alocacoes_fixas", []):
        if not any(all(a[field] == fixed[field] for field in ("subturma_id", "data", "turno", "uc_id", "docente_id", "ambiente_id")) for a in assignments):
            errors.append(f"Alocação fixa não preservada: {fixed}")
    return errors


def solve(catalog: Catalog, request: dict[str, Any]) -> dict[str, Any]:
    pre = prepare(catalog, request)
    public = {key: value for key, value in pre.items() if not key.startswith("_")}
    if not pre["valido"]:
        return {"status": "DADOS_INCOMPLETOS", "diagnostico": public, "alocacoes": []}
    try:
        from ortools.sat.python import cp_model
    except ImportError as error:
        raise RuntimeError("OR-Tools não instalado; instale backend_motor/requirements.txt") from error

    model = cp_model.CpModel()
    slots: list[Slot] = pre["_slots"]
    targets = pre["_targets"]
    teacher_blocked = _set_of_blocked(request.get("indisponibilidades_docentes", []) + request.get("reservas_externas", []), "docente_id")
    room_blocked = _set_of_blocked(request.get("indisponibilidades_ambientes", []) + request.get("reservas_externas", []), "ambiente_id")
    uc_vars: dict[tuple[int, str], Any] = {}
    teacher_vars: dict[tuple[int, str, str], Any] = {}
    room_vars: dict[tuple[int, str, str], Any] = {}
    teacher_choices: dict[tuple[int, str], list[tuple[str, Any]]] = defaultdict(list)
    room_choices: dict[tuple[int, str], list[tuple[str, Any]]] = defaultdict(list)
    per_teacher_slot: dict[tuple[str, str, str], list[Any]] = defaultdict(list)
    per_room_slot: dict[tuple[str, str, str], list[Any]] = defaultdict(list)
    per_teacher_week: dict[tuple[str, int, int], list[Any]] = defaultdict(list)
    per_uc: dict[tuple[str, str], list[Any]] = defaultdict(list)
    per_uc_week: dict[tuple[str, str, int, int], list[Any]] = defaultdict(list)
    used_teacher: dict[tuple[str, str, str], list[Any]] = defaultdict(list)
    affinity_expression = []
    room_expression = []
    for index, slot in enumerate(slots):
        possible = []
        iso = date.fromisoformat(slot.day).isocalendar()
        for sid, uid in targets:
            if sid != slot.subturma_id or targets[(sid, uid)] == 0:
                continue
            uc = catalog.ucs[uid]
            possible_teachers = {tid: weight for tid, weight in catalog.authorized_teachers(uid, slot.shift).items()
                                 if (tid, slot.day, slot.shift) not in teacher_blocked}
            possible_rooms = [rid for rid in uc["ambientes"]
                              if int(catalog.rooms[rid]["Capacidade_Postos"]) >= int(catalog.subgroups[sid]["Alunos"])
                              and (rid, slot.day, slot.shift) not in room_blocked]
            if not possible_rooms or not possible_teachers:
                continue
            var = model.NewBoolVar(f"uc_{index}_{uid}")
            uc_vars[(index, uid)] = var
            possible.append(var)
            per_uc[(sid, uid)].append(var)
            per_uc_week[(sid, uid, iso.year, iso.week)].append(var)
            ts, rs = [], []
            for tid, affinity in possible_teachers.items():
                sel = model.NewBoolVar(f"doc_{index}_{uid}_{tid}")
                teacher_vars[(index, uid, tid)] = sel
                teacher_choices[(index, uid)].append((tid, sel))
                ts.append(sel)
                per_teacher_slot[(tid, slot.day, slot.shift)].append(sel)
                per_teacher_week[(tid, iso.year, iso.week)].append(sel)
                used_teacher[(sid, uid, tid)].append(sel)
                affinity_expression.append(affinity * sel)
            for rid in possible_rooms:
                sel = model.NewBoolVar(f"room_{index}_{uid}_{rid}")
                room_vars[(index, uid, rid)] = sel
                room_choices[(index, uid)].append((rid, sel))
                rs.append(sel)
                per_room_slot[(rid, slot.day, slot.shift)].append(sel)
                if rid == uc["preferido"]:
                    room_expression.append(5 * sel)
            model.Add(sum(ts) == var)
            model.Add(sum(rs) == var)
        model.Add(sum(possible) <= 1)
    for key, target in targets.items():
        model.Add(sum(per_uc[key]) == target)
    for vars_ in per_teacher_slot.values():
        model.AddAtMostOne(vars_)
    for vars_ in per_room_slot.values():
        model.AddAtMostOne(vars_)
    for (tid, year, week), vars_ in per_teacher_week.items():
        limit_hours = request.get("limites_semanais_docentes", {}).get(tid)
        if limit_hours is not None:
            if limit_hours < 0 or limit_hours % BLOCK_HOURS:
                raise ValueError(f"Limite semanal inválido: {tid} {limit_hours}h")
            model.Add(sum(vars_) <= limit_hours // BLOCK_HOURS)

    # Aulas aprovadas são condições obrigatórias. Nenhuma heurística poderá movê-las.
    index_by_slot = {slot: i for i, slot in enumerate(slots)}
    for fixed in request.get("alocacoes_fixas", []):
        slot = Slot(fixed["subturma_id"], fixed["data"], fixed["turno"])
        i, uid = index_by_slot[slot], fixed["uc_id"]
        chosen = uc_vars.get((i, uid))
        chosen_doc = teacher_vars.get((i, uid, fixed["docente_id"]))
        chosen_room = room_vars.get((i, uid, fixed["ambiente_id"]))
        if any(x is None for x in (chosen, chosen_doc, chosen_room)):
            return {"status": "DADOS_INCOMPLETOS", "diagnostico": {**public,
                    "erros": public["erros"] + [f"Alocação fixa sem opção candidata: {fixed}"]}, "alocacoes": []}
        model.Add(chosen == 1)
        model.Add(chosen_doc == 1)
        model.Add(chosen_room == 1)

    teacher_count_penalty = []
    for (sid, uid, tid), vars_ in used_teacher.items():
        flag = model.NewBoolVar(f"used_{sid}_{uid}_{tid}")
        model.AddMaxEquality(flag, vars_)
        teacher_count_penalty.append(flag)

    # Intercalar UCs é permitido. Um objetivo fraco favorece espalhar as aulas
    # ao longo das semanas em vez de empilhar todo um componente no início.
    distribution_penalty = []
    weeks_by_sid: dict[str, set[tuple[int, int]]] = defaultdict(set)
    for slot in slots:
        iso = date.fromisoformat(slot.day).isocalendar()
        weeks_by_sid[slot.subturma_id].add((iso.year, iso.week))
    for (sid, uid), target in targets.items():
        if target == 0:
            continue
        all_weeks = sorted(weeks_by_sid[sid])
        count_weeks = len(all_weeks)
        if count_weeks == 0:
            continue
        for year, week in all_weeks:
            vals = per_uc_week.get((sid, uid, year, week), [])
            weekly = model.NewIntVar(0, len(vals), f"wk_{sid}_{uid}_{year}_{week}")
            model.Add(weekly == sum(vals))
            difference = model.NewIntVar(0, count_weeks * len(vals) + target, f"diff_{sid}_{uid}_{year}_{week}")
            model.AddAbsEquality(difference, count_weeks * weekly - target)
            distribution_penalty.append(difference)
    model.Maximize(sum(affinity_expression) + sum(room_expression)
                   - 60 * sum(teacher_count_penalty) - sum(distribution_penalty))

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = min(300.0, max(1.0, float(request.get("limite_tempo_segundos", 30.0))))
    solver.parameters.num_search_workers = 8
    status = solver.Solve(model)
    labels = {cp_model.OPTIMAL: "OTIMA", cp_model.FEASIBLE: "VIAVEL_NAO_OTIMA",
              cp_model.INFEASIBLE: "INVIAVEL", cp_model.MODEL_INVALID: "MODELO_INVALIDO", cp_model.UNKNOWN: "SEM_RESPOSTA"}
    label = labels.get(status, "SEM_RESPOSTA")
    if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        return {"status": label, "diagnostico": public, "alocacoes": [],
                "estatisticas": {"tempo_segundos": round(solver.WallTime(), 2),
                                "nota": "Não foi produzida grade; verifique recursos, saldos e restrições."}}
    result = []
    for (index, uid), var in uc_vars.items():
        if solver.Value(var) != 1:
            continue
        slot = slots[index]
        teacher = next(tid for tid, choice in teacher_choices[(index, uid)] if solver.Value(choice) == 1)
        room = next(rid for rid, choice in room_choices[(index, uid)] if solver.Value(choice) == 1)
        result.append({"data": slot.day, "turno": slot.shift, "subturma_id": slot.subturma_id,
                       "uc_id": uid, "uc_nome": catalog.ucs[uid]["nome"], "docente_id": teacher,
                       "docente_nome": catalog.teachers[teacher]["Nome_Curto"],
                       "ambiente_id": room, "ambiente_nome": catalog.rooms[room]["Nome_Ambiente"],
                       "horas": BLOCK_HOURS})
    result.sort(key=lambda x: (x["data"], x["turno"], x["subturma_id"]))
    verification = validate_assignments(catalog, request, result)
    if verification:
        raise RuntimeError("Falha no verificador independente: " + "; ".join(verification[:10]))
    return {"status": label, "diagnostico": public, "alocacoes": result,
            "estatisticas": {"tempo_segundos": round(solver.WallTime(), 2),
                            "objetivo": solver.ObjectiveValue(),
                            "limite_superior": solver.BestObjectiveBound(),
                            "blocos_alocados": len(result), "horas_alocadas": BLOCK_HOURS * len(result),
                            "verificacao_independente": "APROVADA"}}
