"""API de demonstração. PROTEGER com autenticação corporativa antes de publicar.

Iniciar localmente: uvicorn backend_motor.api:app --host 127.0.0.1 --port 8000
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .engine import Catalog, prepare, solve

DATA_DIR = Path(os.getenv("MOTOR_DATA_DIR", str(Path(__file__).resolve().parents[1] / "src" / "data" / "raw")))
app = FastAPI(title="SENAI — Motor de Programação Acadêmica (Piloto)", version="0.1.0")
# Localhost por padrão. Defina explicitamente as origens de produção autorizadas.
origins = [o.strip() for o in os.getenv("MOTOR_CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])


class BlockedTeacher(BaseModel):
    docente_id: str
    data: str
    turno: str


class BlockedRoom(BaseModel):
    ambiente_id: str
    data: str
    turno: str


class ExternalReservation(BaseModel):
    docente_id: str | None = None
    ambiente_id: str | None = None
    data: str
    turno: str


class LockedAllocation(BaseModel):
    subturma_id: str
    data: str
    turno: str
    uc_id: str
    docente_id: str
    ambiente_id: str


class PlanRequest(BaseModel):
    inicio: str = "2027-01-25"
    fim: str = "2027-06-23"
    subturmas: list[str] = Field(default_factory=list)
    horas_restantes: dict[str, dict[str, int]] = Field(default_factory=dict)
    indisponibilidades_docentes: list[BlockedTeacher] = Field(default_factory=list)
    indisponibilidades_ambientes: list[BlockedRoom] = Field(default_factory=list)
    reservas_externas: list[ExternalReservation] = Field(default_factory=list)
    limites_semanais_docentes: dict[str, int] = Field(default_factory=dict)
    alocacoes_fixas: list[LockedAllocation] = Field(default_factory=list)
    limite_tempo_segundos: float = Field(default=30, ge=1, le=300)
    modo_demonstracao: bool = True

    def to_engine(self) -> dict[str, Any]:
        return self.model_dump(exclude_none=True)


def _catalog() -> Catalog:
    try:
        return Catalog(DATA_DIR)
    except (OSError, ValueError, KeyError) as exc:
        raise HTTPException(status_code=500, detail=f"Erro nos dados de origem: {exc}") from exc


def _public_preview(pre: dict[str, Any]) -> dict[str, Any]:
    return {k: v for k, v in pre.items() if not k.startswith("_")}


@app.get("/api/saude")
def health():
    return {"servico": "motor_or_tools", "status": "operacional", "nota": "Saúde da API não comprova execução do solver"}


@app.get("/api/catalogo")
def catalog():
    c = _catalog()
    return {"resumo": c.summary(), "subturmas": [
        {"id": sid, "turma_id": s["ID_Turma_Base"], "curso": s["Curso"], "turno": s["Turno"],
         "ucs": [{"id": uid, "nome": c.ucs[uid]["nome"], "horas": c.ucs[uid]["horas"]} for uid in c.class_ucs(sid)]}
        for sid, s in c.subgroups.items()]}


@app.post("/api/validar")
def preview(body: PlanRequest):
    try:
        return _public_preview(prepare(_catalog(), body.to_engine()))
    except (ValueError, KeyError) as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/api/executar")
def run(body: PlanRequest):
    try:
        return solve(_catalog(), body.to_engine())
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except (ValueError, KeyError) as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
