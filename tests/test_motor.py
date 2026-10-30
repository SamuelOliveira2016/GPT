from pathlib import Path
import pytest

from backend_motor.engine import Catalog, _days, parse_rooms, prepare, validate_assignments, solve

ROOT = Path(__file__).resolve().parents[1]
CAT = Catalog(ROOT / "src" / "data" / "raw")
FIRST = "M1EME-COM-1/27 (Única)"
SECOND = "M1EME-ARA-1/27 (Única)"
BASE = {"inicio": "2027-01-25", "fim": "2027-06-23", "subturmas": [FIRST, SECOND]}


def test_catalog_recognizes_matrix():
    assert CAT.summary()["ucs"] == 58
    assert CAT.summary()["ambientes"] == 24
    assert CAT.summary()["docentes"] == 35
    assert len(CAT.class_ucs(FIRST)) == 4


def test_slashes_inside_official_names():
    official = list(CAT.room_by_name)
    value = "Lab. de Informática 01 / Lab. de Informática 02 / Lab. Informática 03 / Inovação (FabLab)"
    assert parse_rooms(value, official) == ["Lab. de Informática 01", "Lab. de Informática 02", "Lab. Informática 03 / Inovação (FabLab)"]
    assert parse_rooms("Oficina de Tornearia / Lab. CAD / CAM", official) == ["Oficina de Tornearia", "Lab. CAD / CAM"]
    with pytest.raises(ValueError):
        parse_rooms("Oficina Inexistente", official)


def test_day_parsing():
    assert _days("Segunda a Sexta") == {0, 1, 2, 3, 4}
    assert _days("Quinta e Sexta") == {3, 4}
    with pytest.raises(ValueError):
        _days("Todos")


def test_two_subgroups_with_100_blocks_each():
    pre = prepare(CAT, BASE)
    assert pre["valido"], pre["erros"]
    assert pre["blocos_disponiveis"] == 200
    assert pre["blocos_necessarios"] == 200
    assert sum(u["horas_previstas"] for u in pre["ucs"]) == 800


def test_old_turma_requires_balance():
    pre = prepare(CAT, {**BASE, "subturmas": ["T3EME-RAI-2/25 (Única)"]})
    assert not pre["valido"]
    assert any("horas_restantes" in err for err in pre["erros"])


def test_unavailable_calendar_is_rejected():
    pre = prepare(CAT, {**BASE, "fim": "2027-12-23"})
    assert not pre["valido"]
    assert any("Calendário disponível apenas" in e for e in pre["erros"])


def test_hours_over_capacity_rejected():
    pre = prepare(CAT, {**BASE, "fim": "2027-02-05"})
    assert not pre["valido"]
    assert any("excede" in e for e in pre["erros"])


def test_invalid_solution_rejected_even_with_valid_inputs():
    pre = prepare(CAT, {**BASE, "subturmas": [FIRST]})
    assert pre["valido"]
    assert any("CH incorreta" in x for x in validate_assignments(CAT, {**BASE, "subturmas": [FIRST]}, []))


def test_locked_allocation_must_be_legal():
    pre = prepare(CAT, {**BASE, "subturmas": [FIRST], "alocacoes_fixas": [{
        "subturma_id": FIRST, "data": "2027-01-25", "turno": "Manhã", "uc_id": CAT.class_ucs(FIRST)[0],
        "docente_id": "DOC01", "ambiente_id": "20480015"}]})
    assert not pre["valido"]
    assert any("não elegível" in x or "não homologado" in x for x in pre["erros"])


@pytest.mark.skipif(__import__("importlib").util.find_spec("ortools") is None,
                    reason="Instalar OR-Tools para executar teste de ponta a ponta")
def test_pilot_solver_creates_verified_plan():
    payload = {**BASE, "subturmas": [FIRST], "limite_tempo_segundos": 45}
    r = solve(CAT, payload)
    assert r["status"] in ("OTIMA", "VIAVEL_NAO_OTIMA"), r
    assert len(r["alocacoes"]) == 100
    assert not validate_assignments(CAT, payload, r["alocacoes"])


def _single_block():
    ucs = CAT.class_ucs(FIRST)
    remaining = {FIRST: {uid: (4 if uid == ucs[0] else 0) for uid in ucs}}
    request = {**BASE, "subturmas": [FIRST], "fim": "2027-01-25", "horas_restantes": remaining}
    uc_id = ucs[0]
    teacher_id = next(iter(CAT.authorized_teachers(uc_id, "Manhã")))
    room_id = CAT.ucs[uc_id]["preferido"]
    lesson = {"data": "2027-01-25", "turno": "Manhã", "subturma_id": FIRST,
              "uc_id": uc_id, "docente_id": teacher_id, "ambiente_id": room_id}
    return request, lesson


def test_independent_verifier_accepts_exact_one_block():
    req, lesson = _single_block()
    assert prepare(CAT, req)["valido"]
    assert validate_assignments(CAT, req, [lesson]) == []


def test_independent_verifier_catches_unhomologated_room():
    req, lesson = _single_block()
    invalid = {**lesson, "ambiente_id": "20480015"}
    assert any("Ambiente inválido" in error for error in validate_assignments(CAT, req, [invalid]))


def test_independent_verifier_catches_illegitimate_teacher():
    req, lesson = _single_block()
    invalid = {**lesson, "docente_id": "DOC01"}
    assert any("Docente inválido" in error for error in validate_assignments(CAT, req, [invalid]))


def test_independent_verifier_catches_wrong_weekly_limit():
    req, lesson = _single_block()
    req["limites_semanais_docentes"] = {lesson["docente_id"]: 0}
    assert any("Carga semanal acima do limite" in error for error in validate_assignments(CAT, req, [lesson]))


def test_independent_verifier_catches_absence():
    req, lesson = _single_block()
    req["indisponibilidades_docentes"] = [{"docente_id": lesson["docente_id"], "data": lesson["data"], "turno": lesson["turno"]}]
    assert any("Docente inválido" in error for error in validate_assignments(CAT, req, [lesson]))


def test_invalid_model_returns_status_without_solver():
    req = {**BASE, "subturmas": ["T3EME-RAI-2/25 (Única)"]}
    assert solve(CAT, req)["status"] == "DADOS_INCOMPLETOS"


@pytest.mark.parametrize("sid", list(CAT.subgroups))
def test_registered_weekdays_and_shifts_are_hard_constraints(sid):
    from datetime import date
    from backend_motor.engine import Slot

    subgroup = CAT.subgroups[sid]
    # Zero balances isolate the permitted timetable, including classes from 2026.
    request = {**BASE, "subturmas": [sid],
               "horas_restantes": {sid: {uid: 0 for uid in CAT.class_ucs(sid)}}}
    pre = prepare(CAT, request)
    assert pre["valido"], pre["erros"]
    slots = set(pre["_slots"])
    assert slots
    weekday_names = {"Segunda": 0, "Terça": 1, "Quarta": 2,
                     "Quinta": 3, "Sexta": 4}
    registered = subgroup["Dias_Semana"]
    allowed_days = set(range(5)) if registered == "Segunda a Sexta" else {
        weekday_names[name.strip()] for name in registered.split(" e ")}
    allowed_shifts = {"Manhã", "Tarde"} if subgroup["Turno"] == "Integral" else {subgroup["Turno"]}
    group = CAT.groups[subgroup["ID_Turma_Base"]]
    expected = {Slot(sid, day, shift)
                for day, record in CAT.calendar.items()
                if max(request["inicio"], group["Inicio"]) <= day <= min(request["fim"], group["Termino"])
                and record["Dia_Letivo"] == "SIM"
                and date.fromisoformat(day).weekday() in allowed_days
                for shift in allowed_shifts}
    assert slots == expected


@pytest.mark.parametrize("change", [{"data": "2027-01-30"}, {"turno": "Tarde"}])
def test_verifier_rejects_lessons_outside_registered_days_or_shift(change):
    request, lesson = _single_block()
    errors = validate_assignments(CAT, request, [{**lesson, **change}])
    assert any("Fora da grade" in error for error in errors)
