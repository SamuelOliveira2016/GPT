import React, { useEffect, useMemo, useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle2, Download, RefreshCcw, Database, ShieldAlert } from 'lucide-react';

type CatalogSub = { id: string; turma_id: string; curso: string; turno: string; ucs: Array<{ id: string; nome: string; horas: number }> };
type Catalog = { resumo: { primeira_data: string; ultima_data: string }; subturmas: CatalogSub[] };
type Preview = { valido: boolean; erros: string[]; avisos: string[]; subturmas: number; blocos_disponiveis: number; blocos_necessarios: number; ucs: Array<{ subturma_id: string; uc_id: string; nome: string; horas_previstas: number }> };
type Lesson = { data: string; turno: string; subturma_id: string; uc_id: string; uc_nome: string; docente_id: string; docente_nome: string; ambiente_id: string; ambiente_nome: string; horas: number };
type Result = { status: string; diagnostico: Preview; alocacoes: Lesson[]; estatisticas?: { horas_alocadas?: number; tempo_segundos?: number; verificacao_independente?: string; nota?: string } };

const API_BASE = (import.meta.env.VITE_MOTOR_API_URL ?? '').replace(/\/$/, '');
const DEFAULT_ADVANCED = JSON.stringify({
  horas_restantes: {},
  indisponibilidades_docentes: [],
  indisponibilidades_ambientes: [],
  reservas_externas: [],
  limites_semanais_docentes: {},
  alocacoes_fixas: [],
  limite_tempo_segundos: 30,
  modo_demonstracao: true,
}, null, 2);

async function requestApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_BASE + path, options);
  const content = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof content.detail === 'string' ? content.detail : `API respondeu ${response.status}`);
  }
  return content as T;
}

function csvCell(input: string | number): string {
  let value = String(input ?? '');
  if (/^[\s]*[=+@\-]/.test(value)) value = "'" + value;
  return '"' + value.replace(/"/g, '""') + '"';
}

function exportPlan(rows: Lesson[]) {
  const fields: Array<keyof Lesson> = ['data', 'turno', 'subturma_id', 'uc_id', 'uc_nome', 'docente_id', 'docente_nome', 'ambiente_id', 'ambiente_nome', 'horas'];
  const csv = ['\ufeff' + fields.map(csvCell).join(';'), ...rows.map(r => fields.map(key => csvCell(r[key])).join(';'))].join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grade_calculada_nao_homologada.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export const SolverTab: React.FC = () => {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [selection, setSelection] = useState<string[]>([]);
  const [start, setStart] = useState('2027-01-25');
  const [end, setEnd] = useState('2027-06-23');
  const [settings, setSettings] = useState(DEFAULT_ADVANCED);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let current = true;
    requestApi<Catalog>('/api/catalogo').then(data => {
      if (!current) return;
      setCatalog(data);
      const pilots = ['M1EME-COM-1/27 (Única)', 'M1EME-ARA-1/27 (Única)'];
      setSelection(pilots.filter(id => data.subturmas.some(s => s.id === id)));
    }).catch(err => current && setMessage(`Falha na conexão com o motor Python: ${err.message}. Confirme se a API está rodando e configurada.`));
    return () => { current = false; };
  }, []);

  const selected = useMemo(() => new Set(selection), [selection]);
  const shown = useMemo(() => (catalog?.subturmas ?? []).filter(x => `${x.id} ${x.curso}`.toLocaleLowerCase('pt-BR').includes(filter.toLocaleLowerCase('pt-BR'))), [catalog, filter]);
  const toggle = (id: string) => {
    setSelection(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setPreview(null);
    setResult(null);
  };
  const run = async (execute: boolean) => {
    setBusy(true);
    setMessage(null);
    setResult(null);
    try {
      const advanced = JSON.parse(settings);
      if (advanced === null || Array.isArray(advanced) || typeof advanced !== 'object') throw new Error('Configuração avançada deve ser um objeto JSON.');
      const body = { ...advanced, inicio: start, fim: end, subturmas: selection };
      const route = execute ? '/api/executar' : '/api/validar';
      const outcome = await requestApi<Preview | Result>(route, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (execute) {
        const r = outcome as Result;
        setResult(r);
        setPreview(r.diagnostico);
        if (r.status !== 'OTIMA' && r.status !== 'VIAVEL_NAO_OTIMA') setMessage(`Motor não gerou uma grade válida: ${r.status}.`);
      } else {
        setPreview(outcome as Preview);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const hasValidResult = result?.status === 'OTIMA' || result?.status === 'VIAVEL_NAO_OTIMA';
  return (
    <section className="space-y-5 pb-12">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2"><Cpu className="text-red-400" /> Motor OR-Tools CP-SAT — grade semestral</h2>
        <p className="text-sm text-slate-300">Distribuição conjunta de UC, docente e ambiente por data e turno. O cálculo considera apenas os registros selecionados e as restrições informadas.</p>
        <div className="flex gap-2 items-start text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded-lg p-3"><ShieldAlert size={16} className="shrink-0" /> Ambiente piloto: o resultado ainda precisa de conferência de disponibilidade, saldo das UCs e aprovação institucional. Os indicadores legados das outras telas usam alocações de demonstração.</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-4 space-y-3">
          <h3 className="font-bold text-white flex items-center gap-2"><Database size={18} /> Base e período</h3>
          <p className="text-xs text-slate-400">Calendário carregado: {catalog ? `${catalog.resumo.primeira_data} a ${catalog.resumo.ultima_data}` : 'carregando...'}</p>
          <div className="flex flex-wrap gap-3">
            <label className="text-xs text-slate-300">Início <input type="date" className="block mt-1 p-2 bg-slate-950 border border-slate-600 rounded text-white" value={start} onChange={e => {setStart(e.target.value); setResult(null); setPreview(null);}} /></label>
            <label className="text-xs text-slate-300">Fim <input type="date" className="block mt-1 p-2 bg-slate-950 border border-slate-600 rounded text-white" value={end} onChange={e => {setEnd(e.target.value); setResult(null); setPreview(null);}} /></label>
          </div>
          <p className="text-xs text-slate-300">{selection.length} subturma(s) selecionada(s)</p>
          <input className="w-full rounded border border-slate-600 bg-slate-950 p-2 text-sm text-white" placeholder="Filtrar subturma ou curso" value={filter} onChange={e => setFilter(e.target.value)} />
          <div className="flex gap-2 text-xs">
            <button type="button" className="underline text-sky-300" onClick={() => {setSelection(catalog?.subturmas.map(x => x.id) ?? []);setPreview(null);setResult(null);}}>Selecionar todas</button>
            <button type="button" className="underline text-sky-300" onClick={() => {setSelection([]);setPreview(null);setResult(null);}}>Limpar</button>
          </div>
          <div className="max-h-64 overflow-auto space-y-1 pr-1">
            {shown.map(s => (
              <label key={s.id} className="flex gap-2 items-start p-2 rounded bg-slate-900 text-xs cursor-pointer">
                <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} className="mt-1" />
                <span className="text-slate-300"><strong className="text-white">{s.id}</strong><span className="block text-slate-400">{s.curso} · {s.turno} · {s.ucs.length} UCs</span></span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-4 space-y-3">
          <h3 className="font-bold text-white">Restrições adicionais (JSON)</h3>
          <p className="text-xs text-slate-400">Adicione indisponibilidades, limites semanais, reservas externas, aulas fixas e saldos em horas. Docentes, UCs e ambientes usam seus IDs oficiais/gerados.</p>
          <textarea value={settings} spellCheck={false} onChange={e => {setSettings(e.target.value);setResult(null);setPreview(null);}} rows={16} className="w-full rounded bg-slate-950 border border-slate-600 p-3 text-slate-200 font-mono text-xs" />
          <p className="text-xs text-amber-300">Sem essas informações, os turnos do cadastro são tratados como disponibilidade potencial, não como agenda confirmada.</p>
          <div className="flex flex-wrap gap-2">
            <button disabled={busy || !catalog} onClick={() => run(false)} className="rounded-xl px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-40 text-sm text-white font-semibold flex items-center gap-2"><RefreshCcw size={15} /> Validar dados</button>
            <button disabled={busy || !catalog || !selection.length} onClick={() => run(true)} className="rounded-xl px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-sm text-white font-semibold flex items-center gap-2"><Cpu size={15} /> {busy ? 'Processando...' : 'Executar OR-Tools'}</button>
          </div>
        </div>
      </div>

      {message && <div role="alert" className="bg-rose-950/40 border border-rose-700 rounded-xl p-4 text-rose-200 text-sm"><AlertTriangle className="inline-block mr-2" size={16} />{message}</div>}
      {preview && (
        <div className="rounded-2xl p-4 border border-slate-700 bg-slate-800/70 space-y-3">
          <h3 className="font-bold text-white flex gap-2 items-center">{preview.valido ? <CheckCircle2 className="text-emerald-400" /> : <AlertTriangle className="text-rose-400" />} Pré-validação: {preview.valido ? 'dados estruturais suficientes' : 'correções necessárias'}</h3>
          <p className="text-sm text-slate-300">{preview.blocos_necessarios} blocos necessários · {preview.blocos_disponiveis} blocos disponíveis · {preview.ucs.length} UCs com saldo. Isso não garante viabilidade simultânea.</p>
          {preview.erros?.map((e,i) => <p className="text-sm text-rose-300" key={`err-${i}`}>• {e}</p>)}
          {preview.avisos?.map((e,i) => <p className="text-xs text-amber-300" key={`warn-${i}`}>• {e}</p>)}
        </div>
      )}

      {result && <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div><h3 className="font-bold text-white">Resultado CP-SAT: {result.status}</h3><p className="text-xs text-slate-400">{result.estatisticas?.horas_alocadas ?? 0} horas atribuídas · verificação: {result.estatisticas?.verificacao_independente ?? 'não executada'} · tempo: {result.estatisticas?.tempo_segundos ?? '—'}s</p></div>
          {hasValidResult && <button type="button" className="flex gap-2 items-center px-3 py-2 rounded bg-emerald-700 text-sm text-white" onClick={() => exportPlan(result.alocacoes)}><Download size={16} /> Exportar CSV completo</button>}
        </div>
        {hasValidResult && <><p className="text-xs text-amber-300">Visualização dos primeiros 200 registros; o arquivo exportado contém todos. O resultado não foi salvo em banco de dados.</p>
          <div className="overflow-auto max-h-[450px]"><table className="w-full text-xs text-left text-slate-300"><thead className="sticky top-0 bg-slate-950"><tr>{['Data','Turno','Subturma','UC','Docente','Ambiente'].map(h => <th key={h} className="p-2 whitespace-nowrap">{h}</th>)}</tr></thead><tbody>{result.alocacoes.slice(0,200).map((a,i) => <tr key={`${a.subturma_id}-${a.data}-${a.turno}-${i}`} className="border-t border-slate-700"><td className="p-2 whitespace-nowrap">{a.data}</td><td className="p-2">{a.turno}</td><td className="p-2">{a.subturma_id}</td><td className="p-2">{a.uc_nome}</td><td className="p-2">{a.docente_nome}</td><td className="p-2">{a.ambiente_nome}</td></tr>)}</tbody></table></div>
        </>}
      </div>}
    </section>
  );
};
