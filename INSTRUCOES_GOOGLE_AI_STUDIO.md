# Atualização do projeto existente no Google AI Studio

O projeto original era um Vite/React puro, com alocações fabricadas pelo script `build_dataset.py`. **Um arquivo Python dentro de `src/data/raw` não executa automaticamente ao publicar uma página React.** A aplicação precisa de um serviço Python capaz de instalar OR-Tools e responder a HTTP.

## Estrutura alterada

- `src/components/SolverTab.tsx`: nova aba **Motor OR-Tools**; seleção de subturmas; configuração JSON de saldos, bloqueios, limites e aulas fixas; pré-validação; cálculo real via API; resultados detalhados por data; exportação de CSV.
- `src/App.tsx`: inicia pela nova aba. O `handleOptimize` antigo **não executa mais a heurística**; direciona para a nova aba. Outras telas, ainda usando alocações de demonstração, mostram aviso explícito.
- `src/components/Header.tsx`: navegação para o motor.
- `vite.config.ts`: proxy do frontend local `/api` para a API Python em `127.0.0.1:8000`.
- `backend_motor/engine.py`, `api.py`, `cli.py`: motor, verificação independente, API e CLI.
- `backend_motor/requirements.txt`: dependências Python.
- `tests/test_motor.py`: testes com casos reais e negativos.
- `legacy/motor_ensalamento_aracatuba_ORIGINAL_INCOMPLETO.py`: guardado o motor anterior, que não programava nada.

## Desenvolvimento local em dois terminais

No terminal 1 (na raiz do projeto):

```bash
python -m pip install -r backend_motor/requirements.txt
uvicorn backend_motor.api:app --host 127.0.0.1 --port 8000
```

No terminal 2:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`, aba **Motor OR-Tools**. No frontend pré-existente, as abas de dashboard, calendário e relatórios continuam representando as antigas alocações simuladas e **não refletem** a saída do motor, até migração posterior.

## Publicação na nuvem

**Não basta publicar apenas o projeto React no Google AI Studio.** Para operar online, implante a API Python em serviço que execute OR-Tools (por exemplo, Cloud Run) e aponte o frontend para ela, usando a variável Vite de compilação `VITE_MOTOR_API_URL`, ou um proxy `/api` na mesma origem.

O proxy definido em `vite.config.ts` vale para o servidor de desenvolvimento, não para uma hospedagem estática comum. **Não coloque chave de serviço/segredo em `VITE_`: qualquer visitante pode lê-la.** Antes de exposição pública, implementar autenticação corporativa e autorização por perfil, CORS restrito, isolamento da base de docentes, controle de acesso à API e persistência transacional de versões aprovadas.

O código incluído é um **protótipo técnico**, não uma solução de produção. Não possui banco de dados ou identidade de usuário; exportar CSV é a forma provisória de reter um resultado. A API recalcula a grade quando solicitada e não persiste versões.

## Teste de aceitação sugerido

1. Validar uma turma com 400 horas e confirmar 100 blocos de 4h e CH exata por UC.
2. Validar e calcular duas subturmas simultaneamente, confirmando ausência de choque docente e ambiente.
3. Incluir indisponibilidade docente, bloqueio de laboratório e alocação fixa; comprovar que nenhum é violado.
4. Inserir um saldo impossível; o pré-validador deve bloquear a execução.
5. Completar os saldos das quatro subturmas iniciadas em 2026 e revisar `I1MMAV-VIT-1/27`, para então executar a escola inteira.
6. Incluir segundo semestre no calendário antes de programar datas de julho a dezembro.

Consulte `IMPLEMENTACAO_MOTOR.md` para o modelo matemático e exemplos de JSON.
