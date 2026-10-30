# Motor de ocupação docente e ambientes — implementação piloto (2027, S1)

## O que foi implementado

**Código novo:** `backend_motor/engine.py` (preparação, modelo CP-SAT, verificador independente), `backend_motor/api.py` (FastAPI), `backend_motor/cli.py` (execução por arquivo), `src/components/SolverTab.tsx` (integração frontend). **Código legado preservado**, mas o botão de otimização anterior foi desativado: ele agora abre a aba do motor real, em vez de executar uma heurística que declarava sucesso sem homologação.

O sistema lê os oito CSVs de `src/data/raw/`; não usa o conjunto inicial de 149 alocações como fonte de verdade. As UCs são identificadas pela combinação de curso + termo + nome; essa chave é representada por um hash estável **desde que esses três nomes não mudem**. Para produção, substituí-la por `ID_UC` persistido e criar uma tabela relacional de homologação UC–Ambiente.

## Restrição obrigatória: dias e turnos fixos por turma

Os dias da semana e os turnos cadastrados são constantes para **todas** as turmas
e respectivas subturmas. As UCs devem ser distribuídas exclusivamente dentro
desses blocos, respeitando o calendário letivo e o período da turma.

Exemplo: uma turma com aulas de manhã e à tarde, segunda e terça, só admite
segunda de manhã, segunda à tarde, terça de manhã e terça à tarde. No cadastro
atual, `Integral` representa os dois turnos (Manhã e Tarde) nos dias informados.
Isso não autoriza aulas em outros dias ou turnos, nem mesmo para completar CH
ou resolver indisponibilidade de docente/ambiente. Se as horas não couberem,
o sistema deve informar a incompatibilidade, sem ampliar a grade da turma.
Os horários de relógio ainda dependem de cadastro específico; não são inventados.

A seleção de docentes deve respeitar o mapeamento por UC; referências docentes
na planilha de distribuição de turmas não constituem atribuição obrigatória.

## Formulação CP-SAT implementada

Bloco = **4 horas por turma e turno** (hipótese operacional configurada, precisa ser homologada). Para cada subturma `s`, dia letivo `d`, turno `t` e UC `u`, uma variável binária `x[s,d,t,u]` indica se a UC ocorre. Outras variáveis binárias `p[s,d,t,u,docente]` e `r[s,d,t,u,ambiente]` indicam recursos atribuídos.

Restrições:

1. `sum_u x[s,d,t,u] <= 1`: sem duas UCs no mesmo bloco/subturma.
2. `sum_{d,t} x[s,d,t,u] == horas_restantes[s,u]/4`: CH exata, com saldos explícitos quando o período da turma já começou.
3. `sum_docente p == x` e `sum_ambiente r == x`: uma seleção válida de docente e ambiente para cada aula.
4. Somente docentes `Elegivel_Cursos_Regulares = SIM`, com o turno habilitado e presentes nas duas fontes de habilitação (`06_matriz_ucs_ambientes.csv` e `08_aptidao_docente_por_uc.csv`).
5. Somente ambientes oficialmente listados na UC, com capacidade maior ou igual ao número de alunos da subturma. A lista é analisada reconhecendo nomes oficiais, inclusive os nomes que contêm `/`.
6. Docente e ambiente não podem ocupar duas subturmas simultaneamente. Bloqueios por data/turno e reservas externas são aceitos no JSON.
7. Limites de docência semanais são opcionais, por docente e em horas múltiplas de 4; nenhuma jornada contratual é presumida.
8. Alocações fixadas pela gestão são restrições obrigatórias, não sugestões.
9. Dias letivos, início e término da turma, dias da semana e turnos são fixos. A distribuição da UC é livre para intercalar matérias ao longo do semestre.

Função objetivo: maximiza aptidão/afinidade e escolha de ambiente prioritário, penaliza uso de muitos docentes distintos por UC, e suavemente incentiva distribuir as UCs pelas semanas. **Esses critérios são secundários: não relaxam as restrições anteriores.**

### Estados que a API retorna

- `OTIMA`: solução factível com otimalidade comprovada pelo CP-SAT.
- `VIAVEL_NAO_OTIMA`: grade completa e válida, mas sem prova de ótimo dentro do tempo.
- `INVIAVEL`: o solver comprovou que as restrições não podem ser atendidas.
- `SEM_RESPOSTA`: o limite de tempo terminou antes de encontrar ou descartar uma solução; **não equivale a INVIAVEL**.
- `DADOS_INCOMPLETOS`: faltam elementos obrigatórios ou existe incompatibilidade detectável antes do solver.

Antes de retornar uma grade, um verificador **separado das variáveis CP-SAT** reconta todas as horas e valida conflitos, habilitação, homologação, capacidade, horários, bloqueios, limites semanais e aulas fixas. Uma saída inválida gera erro de execução, jamais resposta de sucesso.

## Rodar localmente

1. Na pasta raiz extraída, com Python 3.10+ em ambiente virtual:

   ```bash
   python -m pip install -r backend_motor/requirements.txt
   python -m pytest -q tests/test_motor.py
   python -m backend_motor.cli validar backend_motor/piloto_exemplo.json --saida preflight.json
   python -m backend_motor.cli executar backend_motor/piloto_exemplo.json --saida grade_resultado.json
   ```

2. Iniciar API **apenas localmente**:

   ```bash
   uvicorn backend_motor.api:app --host 127.0.0.1 --port 8000
   ```

3. Em outro terminal, instalar dependências e executar o frontend:

   ```bash
   npm install
   npm run dev
   ```

4. Abrir `http://localhost:3000` na aba **Motor OR-Tools**. Em desenvolvimento o Vite faz proxy de `/api` para `127.0.0.1:8000`.

### Testar API separadamente

`POST http://127.0.0.1:8000/api/validar` ou `/api/executar` com o corpo de `backend_motor/piloto_exemplo.json`. `GET /api/catalogo` retorna IDs de subturmas e UCs. As configurações avançadas aceitam:

```json
{
  "inicio": "2027-01-25",
  "fim": "2027-06-23",
  "subturmas": ["M1EME-COM-1/27 (Única)"],
  "horas_restantes": {},
  "indisponibilidades_docentes": [{"docente_id": "DOC24", "data": "2027-01-25", "turno": "Manhã"}],
  "indisponibilidades_ambientes": [{"ambiente_id": "20480029", "data": "2027-01-25", "turno": "Manhã"}],
  "limites_semanais_docentes": {"DOC24": 20},
  "reservas_externas": [],
  "alocacoes_fixas": [],
  "limite_tempo_segundos": 60,
  "modo_demonstracao": true
}
```

Para turmas iniciadas antes de `inicio`, preencher **TODAS** as UCs de `horas_restantes`, incluindo aquelas com saldo de 0. Ex.: `"horas_restantes": {"SUBTURMA": {"UC-CHAVE": 40, "UC-OUTRA": 0}}`; obter `UC-CHAVE` do `/api/catalogo`. Essa informação não é dedutível dos CSVs.

## Lacunas reais da base antes de qualquer uso definitivo

- O calendário CSV cobre **somente 2027-01-25 a 2027-06-23**; não há S2. A API não inventa calendário fora desse intervalo.
- Turmas já em execução desde 2026 exigem a carga horária efetivamente pendente por UC, não simplesmente a carga completa da matriz.
- Ausências específicas, outros compromissos docentes, horas não dedicadas a aulas e limites semanais não estão cadastrados. O motor apenas usa a elegibilidade e os turnos declarados se não receber bloqueios adicionais.
- Horários reais de início/fim de cada turno não estão nos CSVs. O protótipo assume 1 bloco de 4h por manhã e outro por tarde para turmas integrais, mas não atribui hora de relógio sem tabela homologada.
- Divisão A/B: o motor trata cada subturma como entidade independente, exigindo um professor e um ambiente por bloco. A base **não identifica quando A/B devem ter aula conjunta**; a política de reunião de subturmas precisará ser definida.
- Algumas turmas exigem 400h e ocupam 100 blocos; outras têm 300h em mais blocos disponíveis. **Blocos sem UC são permitidos** e não são automaticamente classificados como ociosidade contratual do docente.
- A matriz de aptidão pode não refletir exceções/validações atuais. Não alterar elegibilidades silenciosamente para forçar uma grade.
- A API não salva alterações nem fornece autenticação. **Não publicar na internet** sem autenticação corporativa (por exemplo, Google Cloud IAP/OIDC), autorização por perfil, segurança da API, banco de dados, auditoria e remoção/segregação dos dados pessoais que estão embutidos no frontend legado.
- O resultado para seleção parcial **não considera as turmas não selecionadas**; inclua bloqueios de outros compromissos ou selecione todas as subturmas com dados completos.

## Escala / estratégia de produção

A modelagem de atribuição por data é explícita, com muitas variáveis. Testar primeiro uma e depois duas subturmas, capturando tempo e estados do CP-SAT. Para as 34 subturmas, benchmark e eventual decomposição por períodos ou grupos de turmas (com reservas explícitas) serão necessários. **Não há benchmark do conjunto completo neste pacote.**

## Qualidade verificada nesta entrega

A biblioteca OR-Tools não estava instalada no ambiente que preparou a entrega. Os testes de importação, parsing de ambientes, normalização, validação de carga/calendário, análise das turmas e rejeição de soluções incorretas foram executados. O teste de solver ponta a ponta está incluído e é **ignorado automaticamente** na ausência de OR-Tools; precisa ser executado no ambiente de implantação antes de confiar na grade.

## Jornada docente e complementação FIC — regras registradas

Fonte estruturada: `src/data/raw/regras_jornada_docente.json`.

- Priorizar a ocupação das turmas regulares nos seus dias e turnos fixos,
  respeitando habilitação/aptidão por UC; complementar a carga com FIC à noite
  e aos sábados, também com habilitação para a UC/curso.
- Pesos na ordem Manhã, Tarde, Noite: 0 proíbe; 2 prioriza; 1 permite
  complementação. Exemplos: (2,2,0) não permite noite; (2,2,1) permite noite.
- Máximo de dois turnos por dia: Manhã+Tarde ou Tarde+Noite. Proibir
  Manhã+Noite e os três turnos no mesmo dia.
- Mínimo de 11 horas entre o término de uma jornada e o início da seguinte,
  inclusive na transição entre semanas. Encerrar às 22h permite recomeçar
  somente às 9h ou depois; não às 7h30.
- Quem trabalha no sábado deve ter um dia inteiro de folga de segunda a sexta,
  sem atividades Regulares ou FIC em nenhum turno. Adota-se explicitamente a
  mesma semana (segunda a domingo) como referência para essa compensação.
  Se as aulas regulares já ocuparem os cinco dias, FIC no sábado não pode ser
  adicionada a esse docente sem uma redistribuição válida dessas aulas.
- Os horários podem ser configurados para o planejamento, mas as durações,
  conflitos e descanso devem ser verificados sobre os intervalos efetivos.
  Não preencher horários oficiais aleatoriamente. Ainda faltam os intervalos
  completos dos turnos, ofertas FIC e limites contratuais de carga.

**Estado:** regras registradas para a próxima extensão do motor. O piloto
atual modela apenas Regular, Manhã/Tarde em blocos de 4h; não aplica ainda
pesos de disponibilidade, combinações diárias, descanso de 11h, FIC ou folga
compensatória. Não apresentar uma grade conjunta como validada sem implementar
e testar essas restrições.

### Calendário de sábado — FIC

Sábados são exclusivos para FIC e não entram na contagem de dias letivos nem
na capacidade horária dos cursos regulares. Isso não altera as horas de 2027
já calculadas para as turmas regulares. Sábado que coincidir com feriado não
permite aulas, inclusive FIC. A disponibilidade de FIC deve usar calendário
próprio com verificação de feriados; um sábado ausente do calendário regular
não é automaticamente livre nem deve ser marcado como letivo regular.
Continuam obrigatórios o descanso de 11h e a folga compensatória semanal.
A implementação requer cobertura de feriados para todos os sábados do recorte.
