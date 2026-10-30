"""Uso: python -m backend_motor.cli validar|executar backend_motor/piloto_exemplo.json"""
import argparse
import json
import os
from pathlib import Path
from .engine import Catalog, prepare, solve


def main():
    parser = argparse.ArgumentParser(description="Motor real de ocupação docente e ambientes")
    parser.add_argument("acao", choices=("validar", "executar"))
    parser.add_argument("arquivo_json", help="Configuração das subturmas, período e bloqueios")
    parser.add_argument("--dados", default=os.getenv("MOTOR_DATA_DIR", "src/data/raw"))
    parser.add_argument("--saida", default="grade_resultado.json")
    args = parser.parse_args()
    with open(args.arquivo_json, encoding="utf-8") as stream:
        request = json.load(stream)
    catalog = Catalog(args.dados)
    if args.acao == "validar":
        pre = prepare(catalog, request)
        result = {k: v for k, v in pre.items() if not k.startswith("_")}
    else:
        result = solve(catalog, request)
    Path(args.saida).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: result.get(k) for k in ("status", "valido", "erros", "avisos", "estatisticas") if k in result}, ensure_ascii=False, indent=2))
    print(f"Saída: {args.saida}")
    if result.get("status") not in (None, "OTIMA", "VIAVEL_NAO_OTIMA") or result.get("valido") is False:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
