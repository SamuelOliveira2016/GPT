"""Entrada de compatibilidade — o motor oficial do pacote está em backend_motor/engine.py.

Execute a partir da raiz do projeto:
  python -m backend_motor.cli validar backend_motor/piloto_exemplo.json
  python -m backend_motor.cli executar backend_motor/piloto_exemplo.json

Ou, para usar a interface React:
  uvicorn backend_motor.api:app --host 127.0.0.1 --port 8000
"""
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(root))
from backend_motor.cli import main  # noqa: E402

if __name__ == "__main__":
    main()
